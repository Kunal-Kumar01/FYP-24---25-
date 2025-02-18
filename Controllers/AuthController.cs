//using System;
//using System.Collections.Generic;
//using System.Security.Claims;
//using System.Threading.Tasks;
//using BCrypt.Net;
//using FYP.Models;
//using Microsoft.AspNetCore.Authentication;
//using Microsoft.AspNetCore.Authentication.Cookies;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using Org.BouncyCastle.Crypto.Generators;

//namespace FYP.Controllers
//{
//    public class HomeController : Controller
//    {
//        private readonly AppDbContext _context;

//        public HomeController(AppDbContext context)
//        {
//            _context = context;
//        }

//        // GET: Home/Login
//        public IActionResult Login()
//        {
//            return View();
//        }

//        // POST: Home/Login
//        [HttpPost]
//        [ValidateAntiForgeryToken]
//        public async Task<IActionResult> Login(LoginViewModel model)
//        {
//            if (ModelState.IsValid)
//            {
//                var user = await _context.Users
//                    .Include(u => u.Role)
//                    .Include(u => u.Client)
//                    .FirstOrDefaultAsync(u => u.Email == model.Email);

//                if (user != null && BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash))
//                {
//                    var claims = new List<Claim>
//            {
//                new Claim(ClaimTypes.Name, user.Username),
//                new Claim(ClaimTypes.Email, user.Email),
//                new Claim(ClaimTypes.Role, user.Role.RoleName)
//            };

//                    var claimsIdentity = new ClaimsIdentity(claims, "CookieAuth");
//                    var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

//                    await HttpContext.SignInAsync("CookieAuth", claimsPrincipal);

//                    // Redirect based on the user's role
//                    if (user.Role.RoleName.Equals("Admin", StringComparison.OrdinalIgnoreCase))
//                        return RedirectToAction("AdminDashboard", "Dashboard");
//                    else if (user.Role.RoleName.Equals("DataEngineer", StringComparison.OrdinalIgnoreCase))
//                        return RedirectToAction("EngineerDashboard", "Dashboard");
//                    else // Viewer
//                        return RedirectToAction("ViewerDashboard", "Dashboard");
//                }
//                ModelState.AddModelError("", "Invalid email or password.");
//            }
//            return View(model);
//        }


//        // GET: Home/Register
//        public async Task<IActionResult> Register()
//        {
//            ViewBag.Clients = await _context.Clients.ToListAsync();
//            ViewBag.Roles = await _context.Roles.ToListAsync();
//            return View();
//        }


//        // POST: Home/Register
//        [HttpPost]
//        [ValidateAntiForgeryToken]
//        public async Task<IActionResult> Register(RegisterViewModel model)
//        {
//            if (ModelState.IsValid)
//            {
//                // Check if the email already exists
//                var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
//                if (existingUser != null)
//                {
//                    ModelState.AddModelError("", "Email is already in use.");
//                    return View(model);
//                }

//                // If the ClientId is not provided (or is 0), assign a default valid client
//                if (model.ClientId == 0)
//                {
//                    // Option: retrieve the first client from the database.
//                    var defaultClient = await _context.Clients.FirstOrDefaultAsync();
//                    if (defaultClient == null)
//                    {
//                        ModelState.AddModelError("", "No client exists. Please contact support.");
//                        return View(model);
//                    }
//                    model.ClientId = defaultClient.ClientId;
//                }

//                // Create the new user
//                var newUser = new User
//                {
//                    Username = model.Username,
//                    Email = model.Email,
//                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password),
//                    CreatedAt = DateTime.Now,
//                    ClientId = model.ClientId,
//                    RoleId = model.RoleId  // Ensure that the RoleId provided also exists!
//                };

//                _context.Users.Add(newUser);
//                await _context.SaveChangesAsync();

//                // Optionally, sign the user in immediately or redirect to the login page
//                return RedirectToAction("Login");
//            }
//            return View(model);
//        }


//        // GET: Home/Logout
//        public async Task<IActionResult> Logout()
//        {
//            await HttpContext.SignOutAsync("CookieAuth");
//            return RedirectToAction("Login");
//        }
//    }
//}


using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FYP.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;

using BCrypt.Net;

namespace FYP.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/Auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _context.Users
                    .Include(u => u.Role)
                    .Include(u => u.Client)
                    .FirstOrDefaultAsync(u => u.Email == model.Email);
                if (user != null && BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash))
                {
                    var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Name, user.Username),
                        new Claim(ClaimTypes.Email, user.Email),
                        new Claim(ClaimTypes.Role, user.Role.RoleName)
                    };

                    var claimsIdentity = new ClaimsIdentity(claims, "CookieAuth");
                    var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

                    await HttpContext.SignInAsync("CookieAuth", claimsPrincipal);

                    // Return user info so the React app can route appropriately.
                    return Ok(new
                    {
                        username = user.Username,
                        role = user.Role?.RoleName ?? ""
                    });
                }
                return Unauthorized("Invalid email or password.");
            }
            return BadRequest(ModelState);
        }

        // POST: api/Auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
                if (existingUser != null)
                {
                    // Return JSON for conflict
                    return Conflict(new { message = "Email is already in use." });
                }

                if (model.ClientId == 0)
                {
                    var defaultClient = await _context.Clients.FirstOrDefaultAsync();
                    if (defaultClient == null)
                        // Return JSON for missing client
                        return BadRequest(new { message = "No client exists. Please contact support." });
                    model.ClientId = defaultClient.ClientId;
                }

                var newUser = new User
                {
                    Username = model.Username,
                    Email = model.Email,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password),
                    CreatedAt = DateTime.Now,
                    ClientId = model.ClientId,
                    RoleId = model.RoleId
                };

                _context.Users.Add(newUser);
                await _context.SaveChangesAsync();

                // Success response
                return Ok(new
                {
                    success = true,
                    message = "Registration successful.",
                    user = new { newUser.Username, newUser.Email } // Optional: include user data
                });
            }

            // Return validation errors in JSON format
            return BadRequest(new
            {
                success = false,
                errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
            });
        }

        // POST: api/Auth/logout
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync("CookieAuth");
            return Ok("Logged out successfully.");
        }
    }
}



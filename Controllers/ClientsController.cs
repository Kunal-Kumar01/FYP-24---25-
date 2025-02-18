//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.Mvc.Rendering;
//using Microsoft.EntityFrameworkCore;
//using FYP.Models;

//namespace FYP.Controllers
//{
//    public class ClientsController : Controller
//    {
//        private readonly AppDbContext _context;

//        public ClientsController(AppDbContext context)
//        {
//            _context = context;
//        }

//        // GET: Clients
//        public async Task<IActionResult> Index()
//        {
//            return View(await _context.Clients.ToListAsync());
//        }

//        // GET: Clients/Details/5
//        public async Task<IActionResult> Details(int? id)
//        {
//            if (id == null)
//            {
//                return NotFound();
//            }

//            var client = await _context.Clients
//                .FirstOrDefaultAsync(m => m.ClientId == id);
//            if (client == null)
//            {
//                return NotFound();
//            }

//            return View(client);
//        }

//        // GET: Clients/Create
//        public IActionResult Create()
//        {
//            return View();
//        }

//        // POST: Clients/Create
//        // To protect from overposting attacks, enable the specific properties you want to bind to.
//        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
//        [HttpPost]
//        [ValidateAntiForgeryToken]
//        public async Task<IActionResult> Create([Bind("ClientId,Name,ContactEmail,CreatedAt")] Client client)
//        {
//            if (ModelState.IsValid)
//            {
//                _context.Add(client);
//                await _context.SaveChangesAsync();
//                return RedirectToAction(nameof(Index));
//            }
//            return View(client);
//        }

//        // GET: Clients/Edit/5
//        public async Task<IActionResult> Edit(int? id)
//        {
//            if (id == null)
//            {
//                return NotFound();
//            }

//            var client = await _context.Clients.FindAsync(id);
//            if (client == null)
//            {
//                return NotFound();
//            }
//            return View(client);
//        }

//        // POST: Clients/Edit/5
//        // To protect from overposting attacks, enable the specific properties you want to bind to.
//        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
//        [HttpPost]
//        [ValidateAntiForgeryToken]
//        public async Task<IActionResult> Edit(int id, [Bind("ClientId,Name,ContactEmail,CreatedAt")] Client client)
//        {
//            if (id != client.ClientId)
//            {
//                return NotFound();
//            }

//            if (ModelState.IsValid)
//            {
//                try
//                {
//                    _context.Update(client);
//                    await _context.SaveChangesAsync();
//                }
//                catch (DbUpdateConcurrencyException)
//                {
//                    if (!ClientExists(client.ClientId))
//                    {
//                        return NotFound();
//                    }
//                    else
//                    {
//                        throw;
//                    }
//                }
//                return RedirectToAction(nameof(Index));
//            }
//            return View(client);
//        }

//        // GET: Clients/Delete/5
//        public async Task<IActionResult> Delete(int? id)
//        {
//            if (id == null)
//            {
//                return NotFound();
//            }

//            var client = await _context.Clients
//                .FirstOrDefaultAsync(m => m.ClientId == id);
//            if (client == null)
//            {
//                return NotFound();
//            }

//            return View(client);
//        }

//        // POST: Clients/Delete/5
//        [HttpPost, ActionName("Delete")]
//        [ValidateAntiForgeryToken]
//        public async Task<IActionResult> DeleteConfirmed(int id)
//        {
//            var client = await _context.Clients.FindAsync(id);
//            if (client != null)
//            {
//                _context.Clients.Remove(client);
//            }

//            await _context.SaveChangesAsync();
//            return RedirectToAction(nameof(Index));
//        }

//        private bool ClientExists(int id)
//        {
//            return _context.Clients.Any(e => e.ClientId == id);
//        }
//    }
//}



using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FYP.Models;

namespace FYP.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ClientsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Clients
        [HttpGet]
        public async Task<IActionResult> GetClients()
        {
            var clients = await _context.Clients.ToListAsync();
            return Ok(clients);
        }

        // GET: api/Clients/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetClient(int id)
        {
            var client = await _context.Clients.FirstOrDefaultAsync(c => c.ClientId == id);
            if (client == null)
                return NotFound();
            return Ok(client);
        }

        // POST: api/Clients
        [HttpPost]
        public async Task<IActionResult> CreateClient([FromBody] Client client)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Clients.Add(client);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetClient), new { id = client.ClientId }, client);
        }

        // PUT: api/Clients/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClient(int id, [FromBody] Client client)
        {
            if (id != client.ClientId)
                return BadRequest();

            _context.Entry(client).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Clients.Any(c => c.ClientId == id))
                    return NotFound();
                else
                    throw;
            }
            return NoContent();
        }

        // DELETE: api/Clients/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClient(int id)
        {
            var client = await _context.Clients.FindAsync(id);
            if (client == null)
                return NotFound();

            _context.Clients.Remove(client);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}


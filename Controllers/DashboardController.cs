//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;

//namespace FYP.Controllers
//{
//    public class DashboardController : Controller
//    {
//        // Only Admins can access this action
//        [Authorize(Roles = "Admin")]
//        public IActionResult AdminDashboard()
//        {
//            return View();
//        }

//        // Only Data Engineers can access this action
//        [Authorize(Roles = "DataEngineer")]
//        public IActionResult EngineerDashboard()
//        {
//            return View();
//        }

//        // Only Viewers can access this action
//        [Authorize(Roles = "Viewer")]
//        public IActionResult ViewerDashboard()
//        {
//            return View();
//        }
//    }
//}


using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FYP.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        // GET: api/Dashboard/admin
        [Authorize(Roles = "Admin")]
        [HttpGet("admin")]
        public IActionResult GetAdminDashboard()
        {
            return Ok(new { Message = "Welcome to the Admin Dashboard" });
        }

        // GET: api/Dashboard/engineer
        [Authorize(Roles = "DataEngineer")]
        [HttpGet("engineer")]
        public IActionResult GetEngineerDashboard()
        {
            return Ok(new { Message = "Welcome to the Data Engineer Dashboard" });
        }

        // GET: api/Dashboard/viewer
        [Authorize(Roles = "Viewer")]
        [HttpGet("viewer")]
        public IActionResult GetViewerDashboard()
        {
            return Ok(new { Message = "Welcome to the Viewer Dashboard" });
        }
    }
}

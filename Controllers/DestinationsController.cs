//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using FYP.Models;


//namespace FYP.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class DestinationsController : ControllerBase
//    {
//        private readonly AppDbContext _context;
//        public DestinationsController(AppDbContext context)
//        {
//            _context = context;
//        }

//        // GET: api/Destinations
//        [HttpGet]
//        public async Task<IActionResult> GetDestinations()
//        {
//            var destinations = await _context.Destinations.Include(d => d.Client).ToListAsync();
//            return Ok(destinations);
//        }

//        // GET: api/Destinations/{id}
//        [HttpGet("{id}")]
//        public async Task<IActionResult> GetDestination(int id)
//        {
//            var destination = await _context.Destinations.Include(d => d.Client)
//                                                         .FirstOrDefaultAsync(d => d.DestinationsId == id);
//            if (destination == null)
//                return NotFound();
//            return Ok(destination);
//        }

//        // POST: api/Destinations
//        [HttpPost]
//        public async Task<IActionResult> CreateDestination([FromBody] Destinations destination)
//        {
//            if (!ModelState.IsValid)
//                return BadRequest(ModelState);

//            _context.Destinations.Add(destination);
//            await _context.SaveChangesAsync();
//            return CreatedAtAction(nameof(GetDestination), new { id = destination.DestinationsId }, destination);
//        }

//        // PUT: api/Destinations/{id}
//        [HttpPut("{id}")]
//        public async Task<IActionResult> UpdateDestination(int id, [FromBody] Destinations destination)
//        {
//            if (id != destination.DestinationsId)
//                return BadRequest();

//            _context.Entry(destination).State = EntityState.Modified;
//            try
//            {
//                await _context.SaveChangesAsync();
//            }
//            catch (DbUpdateConcurrencyException)
//            {
//                if (!_context.Destinations.Any(d => d.DestinationsId == id))
//                    return NotFound();
//                else
//                    throw;
//            }
//            return NoContent();
//        }

//        // DELETE: api/Destinations/{id}
//        [HttpDelete("{id}")]
//        public async Task<IActionResult> DeleteDestination(int id)
//        {
//            var destination = await _context.Destinations.FindAsync(id);
//            if (destination == null)
//                return NotFound();

//            _context.Destinations.Remove(destination);
//            await _context.SaveChangesAsync();
//            return NoContent();
//        }
//    }
//}

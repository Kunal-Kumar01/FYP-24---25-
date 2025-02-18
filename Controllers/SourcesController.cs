//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using FYP.Models;

//using Elfie.Serialization;

//namespace FYP.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class SourcesController : ControllerBase
//    {
//        private readonly AppDbContext _context;
//        public SourcesController(AppDbContext context)
//        {
//            _context = context;
//        }

//        // GET: api/Sources
//        [HttpGet]
//        public async Task<IActionResult> GetSources()
//        {
//            var sources = await _context.Sources.Include(s => s.Client).ToListAsync();
//            return Ok(sources);
//        }

//        // GET: api/Sources/{id}
//        [HttpGet("{id}")]
//        public async Task<IActionResult> GetSource(int id)
//        {
//            var source = await _context.Sources.Include(s => s.Client)
//                                               .FirstOrDefaultAsync(s => s.SourcesId == id);
//            if (source == null)
//                return NotFound();
//            return Ok(source);
//        }

//        // POST: api/Sources
//        [HttpPost]
//        public async Task<IActionResult> CreateSource([FromBody] Sources source)
//        {
//            if (!ModelState.IsValid)
//                return BadRequest(ModelState);

//            _context.Sources.Add(source);
//            await _context.SaveChangesAsync();
//            return CreatedAtAction(nameof(GetSource), new { id = source.SourcesId }, source);
//        }

//        // PUT: api/Sources/{id}
//        [HttpPut("{id}")]
//        public async Task<IActionResult> UpdateSource(int id, [FromBody] Sources source)
//        {
//            if (id != source.SourcesId)
//                return BadRequest();

//            _context.Entry(source).State = EntityState.Modified;
//            try
//            {
//                await _context.SaveChangesAsync();
//            }
//            catch (DbUpdateConcurrencyException)
//            {
//                if (!_context.Sources.Any(s => s.SourcesId == id))
//                    return NotFound();
//                else
//                    throw;
//            }
//            return NoContent();
//        }

//        // DELETE: api/Sources/{id}
//        [HttpDelete("{id}")]
//        public async Task<IActionResult> DeleteSource(int id)
//        {
//            var source = await _context.Sources.FindAsync(id);
//            if (source == null)
//                return NotFound();

//            _context.Sources.Remove(source);
//            await _context.SaveChangesAsync();
//            return NoContent();
//        }
//    }
//}

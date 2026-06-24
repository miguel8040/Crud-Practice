using Cruds_Practice.Data;
using Cruds_Practice.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Cruds_Practice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        public readonly ApplicationDbContext _db;
        public MovieController(ApplicationDbContext db) {
            _db = db;
        }

        // GET: api/<MovieController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                List<CT_Movie> movies = await _db.CT_Movie.AsNoTracking().ToListAsync();
                return Ok(new {message = "OK", data = movies });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        [Route("get-movies-director")]
        public async Task<IActionResult> GetMoviesDirector()
        {
            try
            {
                List<CT_Movie> movies = await _db.CT_Movie.Include(q=> q.Director).AsNoTracking().ToListAsync();
                return Ok(new {message = "OK", data = movies });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // GET api/<MovieController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                CT_Movie? movie = await _db.CT_Movie.FirstOrDefaultAsync(q => q.PKMovie == id);
                if (movie == null) return NotFound(new { message = "MOvie does not ecists" });

                return Ok(new {message = "Ok", data = movie});
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<MovieController>
        [HttpPost]
        public async Task<IActionResult> Post(CT_Movie movie)
        {
            using var trasaction = _db.Database.BeginTransaction();
            try
            {
                bool alreadyExist = await _db.CT_Movie.AnyAsync(q => q.Name == movie.Name && q.Duration == movie.Duration);
                if (alreadyExist) return BadRequest(new { messgae = "This movie name and duration si already registed" });

                await _db.CT_Movie.AddAsync(movie);
                await _db.SaveChangesAsync();
                await trasaction.CommitAsync();
                return Ok(new { message = "Ok", data = movie });
            }
            catch (Exception ex)
            {
                await trasaction.RollbackAsync();
                return BadRequest(new { message = ex.Message });
            }
        }

        // PUT api/<MovieController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(CT_Movie movie)
        {
            using var transaction = _db.Database.BeginTransaction();
            try
            {
                bool found = await _db.CT_Movie.AnyAsync(q => q.PKMovie == movie.PKMovie);
                if (!found) return NotFound(new { message = $"Movie {movie.Name} was not found. please check it" });

                _db.CT_Movie.Update(movie);
                await _db.SaveChangesAsync();
                await transaction.CommitAsync();

                return Ok(new {message = "OK", data = movie});
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return BadRequest(new { message = ex.Message });
            }
        }

        // DELETE api/<MovieController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            using var trasaction = _db.Database.BeginTransaction();
            try
            {
                CT_Movie? found = await _db.CT_Movie.FirstOrDefaultAsync(q => q.PKMovie == id);
                if (found == null) return NotFound(new { message = "Movie was not found. please check it" });

                _db.CT_Movie.Remove(found);
                await _db.SaveChangesAsync();

                return Ok(new {message = "Mvoie has been deleted succesfully"});
            }
            catch (Exception ex)
            {
                await trasaction.RollbackAsync();
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}

using Cruds_Practice.Data;
using Cruds_Practice.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Cruds_Practice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DirectorController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public DirectorController(ApplicationDbContext db)
        {
            _db = db;
        }

        // GET: api/<DirectorController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                List<CT_Director> directors = await _db.CT_Director.AsNoTracking().ToListAsync();
                return Ok(new {message = "Ok", data = directors});
            }
            catch(Exception ex)
            {
                return BadRequest(new {message = ex.Message});
            }
        }

        // GET api/<DirectorController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                CT_Director? director = await _db.CT_Director.AsNoTracking().FirstOrDefaultAsync(d => d.PKDirector == id);
                return Ok(new {message = "OK", data = director});
            }
            catch (Exception ex) 
            { 
                return BadRequest(new { message = ex.Message });
            }
        }

        // POST api/<DirectorController>
        [HttpPost]
        public async Task<IActionResult> Post(CT_Director director)
        {
            using var transaction = _db.Database.BeginTransaction(); 
            try
            {
                await _db.CT_Director.AddAsync(director);
                await _db.SaveChangesAsync();
                await transaction.CommitAsync();

                return Ok(new {message = $"Dorector : {director.Name} has been saved successfully", data = director});
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return BadRequest(new { message = ex.Message });
            }
        }

        // PUT api/<DirectorController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(CT_Director director)
        {
            using var transaction = _db.Database.BeginTransaction();
            try 
            { 
                bool existingDirector = await _db.CT_Director.AnyAsync(d => d.PKDirector == director.PKDirector);
                if(!existingDirector) return NotFound(new { message = "Director not found" });

                _db.CT_Director.Update(director);
                await _db.SaveChangesAsync();
                await transaction.CommitAsync();
                return Ok(new { message = $"Director : {director.Name} has been updated successfully" });
            }
            catch(Exception ex) 
            {
                await transaction.RollbackAsync();
                return BadRequest(new { message = ex.Message });
            }
        }

        // DELETE api/<DirectorController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            using var trasaction = _db.Database.BeginTransaction();
            try 
            {
                CT_Director? existingDirector = _db.CT_Director.AsNoTracking().FirstOrDefault(d => d.PKDirector == id);
                if (existingDirector == null) return NotFound(new { message = "Director not found" });

                _db.CT_Director.Remove(existingDirector);
                _db.SaveChanges();
                trasaction.Commit();
                return Ok(new { message = "Director deleted" });
            }
            catch(Exception ex)
            {
                trasaction.Rollback();
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}

using Cruds_Practice.Data;
using Cruds_Practice.Models;
using Microsoft.AspNetCore.Mvc;
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
                List<CT_Director> directors = _db.CT_Director.ToList();
                return Ok(directors);
            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }

        // GET api/<DirectorController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<DirectorController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<DirectorController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<DirectorController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

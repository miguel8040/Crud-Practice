using Cruds_Practice.Models;
using Microsoft.EntityFrameworkCore;

namespace Cruds_Practice.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<CT_Director> CT_Director { get; set; }
        public DbSet<CT_Movie> CT_Movie { get; set; }

    }
}

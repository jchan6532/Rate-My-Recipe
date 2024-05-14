using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace backend.Data
{
    public class AppDataContext : DbContext
    {
        protected readonly IConfiguration Configuration;
    
        public AppDataContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public class AppDataContext : DbContext
        {
            protected override void OnConfiguring(DbContextOptionsBuilder options){
                options.UseNpgsql(Configuration.GetConnectionString(""));
            }
        }

        public DbSet<> Recipes { get; set; }
        public DbSet<> Users { get; set; }
    }
}
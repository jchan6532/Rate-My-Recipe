using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using backend.Models;

namespace backend.Data
{
    public class AppDataContext : DbContext
    {
        protected readonly IConfiguration Configuration;
    
        public AppDataContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder options){
            options.UseNpgsql(Configuration.GetConnectionString(""));
        }

        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
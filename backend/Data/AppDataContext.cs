using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using backend.Models;

namespace backend.Data
{
    public class AppDataContext : DbContext, IDbContext
    {
        protected readonly IConfiguration Configuration;

        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Comment> Comments { get; set; }
    
        public AppDataContext(DbContextOptions<AppDataContext> options, IConfiguration configuration)
            : base(options)
        {
            Configuration = configuration;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Recipes)
                .WithOne(r => r.User)
                .HasForeignKey(r => r.UserId);
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return base.SaveChangesAsync(cancellationToken);
        }
    }
}
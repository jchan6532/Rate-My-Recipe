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
        public DbSet<Like> Likes { get; set; }
    
        public AppDataContext(DbContextOptions<AppDataContext> options, IConfiguration configuration)
            : base(options)
        {
            Configuration = configuration;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(user => {
                user.HasKey(u => u.Id);

                user.Property(u => u.Id)
                    .HasColumnType("character varying(255)");

                user.HasMany(u => u.Recipes)
                    .WithOne(r => r.User)
                    .HasForeignKey(r => r.UserId);

                user.HasMany(u => u.Likes)
                    .WithOne(l => l.User)
                    .HasForeignKey(l => l.UserId);
            });

            modelBuilder.Entity<Recipe>(recipe => {
                recipe.HasKey(r => r.Id);

                recipe.Property(r => r.Id)
                .HasColumnType("character varying(255)");

                recipe.HasOne(r => r.User)
                    .WithMany(u => u.Recipes)
                    .HasForeignKey(r => r.UserId);

                recipe.HasMany(r => r.Likes)
                    .WithOne(l => l.Recipe)
                    .HasForeignKey(l => l.RecipeId);
            });

            modelBuilder.Entity<Like>(like => {
                like.HasKey(l => new { l.UserId, l.RecipeId });

                like.HasOne(l => l.User)
                    .WithMany(u => u.Likes)
                    .HasForeignKey(l => l.UserId);

                like.HasOne(l => l.Recipe)
                    .WithMany(r => r.Likes)
                    .HasForeignKey(l => l.RecipeId);
            });
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return base.SaveChangesAsync(cancellationToken);
        }
    }
}
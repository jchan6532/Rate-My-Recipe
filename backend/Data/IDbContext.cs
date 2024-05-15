using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public interface IDbContext
    {
        DbSet<Recipe> Recipes { get; set; }
        DbSet<User> Users { get; set; }
        DbSet<Comment> Comments { get; set; }
        int SaveChanges();
        int SaveChanges(bool acceptAllChangesOnSuccess);
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
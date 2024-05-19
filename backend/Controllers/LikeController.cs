using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LikeController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IDbContext _context;

        public LikeController(ILogger<UserController> logger, IDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpPost(template: "new", Name = "NewLike")]
        public async Task<IActionResult> CreateLike([FromBody] Like like) {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _context.Likes.Add(like);
            int result = await _context.SaveChangesAsync();
            if (result != 1) return BadRequest(new { result = result, error = "Like was unable to be saved" });
            return Created();
        }

        [HttpDelete(template: "remove", Name = "RemoveLike")]
        public async Task<IActionResult> DeleteLike([FromBody] Like like) {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var deleted = await _context.Likes.FindAsync(like.UserId, like.RecipeId);
            if (deleted is null) return NotFound();

            _context.Likes.Remove(deleted);
            int result = await _context.SaveChangesAsync();
            if (result != 1) return BadRequest(new { result = result, error = "Like was unable to be deleted" });
            return NoContent();
        }
    }
}
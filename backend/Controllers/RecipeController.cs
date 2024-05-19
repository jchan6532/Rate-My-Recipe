using Microsoft.AspNetCore.Mvc;
using backend.Data;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Controllers{

    [ApiController]
    [Route("[controller]")]
    public class RecipeController : ControllerBase
    {
        private readonly ILogger<RecipeController> _logger;
        private readonly IDbContext _context;

        public RecipeController(ILogger<RecipeController> logger, IDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet(template: "all", Name = "GetAllRecipes")]
        public async Task<IActionResult> GetAllRecipes()
        {
            var recipes = await _context.Recipes.ToListAsync();
            var sortedRecipes = recipes.OrderByDescending(recipe => recipe.CreatedAt);
            return Ok(new {recipes = sortedRecipes});
        }

        [HttpGet("{recipeId}", Name = "GetRecipe")]
        public async Task<IActionResult> GetRecipe([FromRoute] int recipeId)
        {
            var recipe = await _context.Recipes.FindAsync(recipeId);
            if (recipe is null) return NotFound(recipeId);
            return Ok(new {recipes = recipe});
        }

        [HttpPost(template: "new", Name = "InsertRecipe")]
        public async Task<IActionResult> InsertRecipe([FromBody] Recipe recipe, [FromQuery] string userId)
        {
            if (recipe is null) return BadRequest();
            if (!ModelState.IsValid) return BadRequest(ModelState);
            
            recipe.Id ??= Guid.NewGuid().ToString();
            recipe.UserId = userId;
            recipe.CreatedAt = DateTime.UtcNow;
            _context.Recipes.Add(recipe);
            int result = await _context.SaveChangesAsync();
            if (result != 1) return BadRequest(new { result = result, error = "Recipe was unable to be saved" });
            return NoContent();
        }

        [HttpGet(template: "none", Name = "GetNoneRecipes")]
        public IActionResult Getnone()
        {
            return new ObjectResult(new {a = 0});
        }
    }
}

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
            var recipes = _context.Recipes.ToListAsync();
            return Ok(new {recipes = recipes});
        }

        [HttpPost(template: "new", Name = "InsertRecipe")]
        public async Task<IActionResult> InsertRecipe(Recipe recipe)
        {
            _context.Recipes.Add(recipe);
            int result = await _context.SaveChangesAsync();
            if (result != 1) return BadRequest(result);
            return NoContent();
        }

        [HttpGet(template: "none", Name = "GetNoneRecipes")]
        public IActionResult Getnone()
        {
            return new ObjectResult(new {a = 0});
        }
    }
}

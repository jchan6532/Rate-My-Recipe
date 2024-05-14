using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public class RecipeController : ControllerBase
{
    private readonly ILogger<RecipeController> _logger;

    public RecipeController(ILogger<RecipeController> logger)
    {
        _logger = logger;
    }

    [HttpGet(template: "all", Name = "GetAllRecipes")]
    public IActionResult Get()
    {
        return new ObjectResult(new {a = 1});
    }

    [HttpGet(template: "all", Name = "GetAllRecipes")]
    public IActionResult Get()
    {
        return new ObjectResult(new {a = 1});
    }
}

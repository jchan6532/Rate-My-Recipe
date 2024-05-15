using Microsoft.AspNetCore.Mvc;
using backend.Data;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IDbContext _context;

        public UserController(ILogger<UserController> logger, IDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpPost(template: "new", Name = "CreateUser")]
        public async Task<IActionResult> CreateUser(User user) {
            if (user == null) return BadRequest();

            _context.Users.Add(user);
            int result = await _context.SaveChangesAsync();
            if(result != 1) return BadRequest(result);
            return Created("", user);
        }
    }
}
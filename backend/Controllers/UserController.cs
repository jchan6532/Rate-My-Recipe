using Microsoft.AspNetCore.Mvc;
using backend.Data;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Services.UserService;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IDbContext _context;
        private readonly IUserAuthService _userAuthService;

        public UserController(ILogger<UserController> logger, IDbContext context, IUserAuthService userAuthService)
        {
            _logger = logger;
            _context = context;
            _userAuthService = userAuthService;
        }

        [HttpGet("{userId}", Name = "GetUser")]
        public async Task<IActionResult> GetUser([FromRoute] string userId) 
        {
            var user = await _context.Users.FindAsync(userId);
            if (user is null) return NotFound(userId);
            return Ok(user);
        }

        // TODO: Add login and signup

        [HttpPost(template: "new", Name = "CreateUser")]
        public async Task<IActionResult> CreateUser([FromBody] User user, [FromQuery] string? provider) {
            if (user is null) return BadRequest();
            if (!ModelState.IsValid) return BadRequest(ModelState);

            user.CreatedAt = DateTime.UtcNow;

            if (!string.IsNullOrEmpty(provider)) {
                if (user.Id is null) return BadRequest(new {error = "user ID from the provider is required"});
            }
            else {
                var emailResult = _userAuthService.CheckEmail(user.Email);
                if (!emailResult?.success) return BadRequest(new {error = emailResult?.message});

                if (user.Password is null) return BadRequest(new {error = "password is empty"});
                var passwordResult = _userAuthService.CheckPassword(user.Password);
                if (!passwordResult?.success) return BadRequest(new {error = passwordResult?.message});

                user.Id ??= Guid.NewGuid().ToString();
            }

            _context.Users.Add(user);
            int result = await _context.SaveChangesAsync();
            if (result != 1) return BadRequest(result);

            var userUri = Url.Link("GetUser", new { userId = user.Id });
            return Created(userUri, user);
        }
    }
}
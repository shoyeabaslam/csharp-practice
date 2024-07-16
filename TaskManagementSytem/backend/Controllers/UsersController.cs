using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Entities;
using backend.Repositories.UserRepo;
using backend.Dtos.UserDto;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly TaskDbContext _context;
        private readonly IUserRepo _userRepo;
        public UsersController(TaskDbContext context,IUserRepo userRepo)
        {
            _context = context;
            _userRepo = userRepo;
        }

        // GET: Users
         [HttpPost("login")]
        public async Task<ActionResult<User>> GetUsers([FromBody] GetUserDto getUser)
        {
            try
            {
                var user = await _userRepo.GetUserByEmailAsync(getUser.UserEmail, getUser.UserPassword);
                if(user == null)
                {
                    return Unauthorized();
                }
                return Ok(user);
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<User>> PostUser([FromBody] AddUserDto userDto)
        {
            try
            {
                var user = await  _userRepo.AddUserAsync(userDto);
                return CreatedAtAction(nameof(PostUser), new { userId = user.UserId }, user);
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Something went wrong: {ex.Message}");
            }
        }

    }
}

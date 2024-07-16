using backend.Data;
using backend.Dtos.UserDto;
using backend.Entities;
using backend.Mapping;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.UserRepo
{
    public class UserRepo : IUserRepo
    {
        private readonly TaskDbContext _taskDbContext;
        public UserRepo(TaskDbContext taskDbContext)
        {
            _taskDbContext = taskDbContext;
        }

        public async Task<UserSummary> AddUserAsync(AddUserDto addUserDto)
        {
            var userEntity = addUserDto.ToUser();
            _taskDbContext.Users.Add(userEntity);
            await _taskDbContext.SaveChangesAsync();
            return userEntity.ToUserSummary();
        }

        public async Task<UserSummary?> GetUserByEmailAsync(string email, string passsword)
        {
            var User = await _taskDbContext.Users.Where((u)=> u.UserEmail ==  email && u.UserPassword == passsword).FirstOrDefaultAsync();
            return User?.ToUserSummary() ?? null;
        }
    }
}

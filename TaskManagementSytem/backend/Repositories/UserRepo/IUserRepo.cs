using backend.Dtos.UserDto;
using backend.Entities;

namespace backend.Repositories.UserRepo
{
    public interface IUserRepo
    {
        Task<UserSummary> AddUserAsync(AddUserDto addUserDto);
        Task<UserSummary?> GetUserByEmailAsync(string email,string passsword);
    }
}

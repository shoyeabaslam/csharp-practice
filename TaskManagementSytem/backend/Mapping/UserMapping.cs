using backend.Dtos.UserDto;
using backend.Entities;

namespace backend.Mapping
{
    public static class UserMapping
    {
        public static User ToUser(this AddUserDto dto)
        {
            return new User()
            {
                UserName = dto.UserName,
                UserEmail = dto.UserEmail,
                UserPassword = dto.UserPassword,
                Categories = null,
                UserTasks = null
            };
        }

        public static UserSummary ToUserSummary(this User user)
        {
            return new UserSummary()
            {
                UserId = user.UserId,
                UserName = user.UserName,
                UserEmail = user.UserEmail,
            };
        }
    }
}

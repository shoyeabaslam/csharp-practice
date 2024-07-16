using backend.Dtos.UserTaskDto;
using backend.Entities;

namespace backend.Repositories.TaskSqlRepo
{
    public interface ITaskSqlRepo
    {
        Task<IEnumerable<TaskDto>> GetTaskByUserIdAsync(int UserId);
        Task<UserTask> AddTasksAsync(CreateTaskDto task);
        Task<UpdateTaskDto> UpdateUserTaskAsync(int taskId,UpdateTaskDto updateTask);
        Task DeleteUserTaskAsync(UserTask userTask);

    }
}

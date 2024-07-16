using backend.Data;
using backend.Dtos.UserTaskDto;
using backend.Entities;
using backend.Mapping;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.TaskSqlRepo
{
    public class TaskSqlRepo : ITaskSqlRepo
    {
        private readonly TaskDbContext _taskDbContext;

        public TaskSqlRepo(TaskDbContext taskDbContext)
        {
            _taskDbContext = taskDbContext;
        }
        public async Task<UserTask> AddTasksAsync(CreateTaskDto userTask)
        {
            UserTask userTaskEntity = userTask.ToUserTaskEntity(); // mapping From CreateTaskDto to UserTask Entity

            _taskDbContext.UserTasks.Add(userTaskEntity);
            await _taskDbContext.SaveChangesAsync();
            return userTaskEntity;
        }

       

        public async Task<IEnumerable<TaskDto>> GetTaskByUserIdAsync(int UserId)
        {
            var userTasks = await _taskDbContext.UserTasks
                             .Where(ut => ut.UserId == UserId)
                             .Select(ut => new
                             {
                                 UserTask = ut,
                                 CategoryName = ut.Category.CategoryName
                             })
                             .ToListAsync();
            var results = userTasks.Select((ut) =>
            {
                var taskDto = ut.UserTask.ToTaskDto();
                taskDto.CategoryName = ut.CategoryName;
                return taskDto;
            });

            return results; 
        }

        public async Task<UpdateTaskDto> UpdateUserTaskAsync(int taskId, UpdateTaskDto updateTask)
        {
            var userTaskEntity = updateTask.ToUserTaskEntity(taskId);
             _taskDbContext.UserTasks.Update(userTaskEntity);
            await _taskDbContext.SaveChangesAsync();
            return userTaskEntity.ToUpdateTaskDto();
        }

        public async Task DeleteUserTaskAsync(UserTask userTask)
        {
            _taskDbContext.UserTasks.Remove(userTask);
             await _taskDbContext.SaveChangesAsync();
        }
    }
}

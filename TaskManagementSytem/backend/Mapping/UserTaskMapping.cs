using backend.Dtos.UserTaskDto;
using backend.Entities;

namespace backend.Mapping
{
    public static class UserTaskMapping
    {

        public static UserTask ToUserTaskEntity(this CreateTaskDto taskDto)
        {
            UserTask userTaskEntity = new UserTask()
            {
                TaskName = taskDto.TaskName,
                TaskDescription = taskDto.TaskDescription,
                UserId = taskDto.UserId,
                CategoryId = taskDto.CategoryId,
                CreatedAt = taskDto.CreatedAt,
                DueDate = taskDto.DueDate,
                Status = taskDto.Status,
                Priority = taskDto.Priority,
                User = null,  // Navigation properties are set to null
                Category = null

            };
            return userTaskEntity;
        }

        public static UserTask ToUserTaskEntity(this UpdateTaskDto updateTask, int taskId)
        {
            UserTask userTaskEntity = new UserTask()
            {
                TaskId = taskId,
                TaskName = updateTask.TaskName,
                TaskDescription = updateTask.TaskDescription,
                UserId = updateTask.UserId,
                CategoryId = updateTask.CategoryId,
                CreatedAt = updateTask.CreatedAt,
                DueDate = updateTask.DueDate,
                Status = updateTask.Status,
                Priority = updateTask.Priority,
                User = null,  // Navigation properties are set to null
                Category = null

            };
            return userTaskEntity;
        }
        public static TaskDto ToTaskDto(this UserTask userTask)
        {
            return new TaskDto()
            {
                TaskId = userTask.TaskId,
                UserId = userTask.UserId,
                TaskName = userTask.TaskName,
                CategoryName = "",
                TaskDescription = userTask.TaskDescription,
                CreatedAt = userTask.CreatedAt,
                DueDate = userTask.DueDate,
                Status = userTask.Status,
                Priority = userTask.Priority
            };
        }

        public static UpdateTaskDto ToUpdateTaskDto(this UserTask userTask)
        {
            return new UpdateTaskDto()
            {
                UserId = userTask.UserId,
                CategoryId = userTask.CategoryId,
                TaskName = userTask.TaskName,
                TaskDescription = userTask.TaskDescription,
                CreatedAt = userTask.CreatedAt,
                DueDate = userTask.DueDate,
                Status = userTask.Status,
                Priority = userTask.Priority
            };
        }
    }
}

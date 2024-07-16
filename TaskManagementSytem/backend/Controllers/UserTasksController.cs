
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Entities;
using backend.Repositories.TaskSqlRepo;
using backend.Dtos.UserTaskDto;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserTasksController : ControllerBase
    {
        private readonly TaskDbContext _context;
        private readonly ITaskSqlRepo _taskSqlRepo;
        public UserTasksController(TaskDbContext context, ITaskSqlRepo taskSqlRepo)
        {
            _context = context;
            _taskSqlRepo = taskSqlRepo;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserTask(int id)
        {
            var userTasks = await _taskSqlRepo.GetTaskByUserIdAsync(id);
            if (userTasks == null || !userTasks.Any())
            {
                return NotFound($"No tasks found for UserId {id}");
            }
            return Ok(userTasks);
        }

        [HttpPost]
        public async Task<ActionResult<UserTask>> PostUserTask(CreateTaskDto userTask)
        {
            if (userTask == null)
            {
                return BadRequest("Task data is null.");
            }

            var userExists = await _context.Users.AnyAsync(u => u.UserId == userTask.UserId);
            if (!userExists)
            {
                return BadRequest("Invalid UserId.");
            }

            var userTaskEntity = await _taskSqlRepo.AddTasksAsync(userTask);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(PostUserTask), new { id = userTaskEntity.TaskId }, userTaskEntity);
        }


        [HttpPut("{taskId}")]
        public async Task<ActionResult<CreateTaskDto>> UpdateUserTask(int taskId,[FromBody] UpdateTaskDto updateTask) 
        { 
            if(updateTask == null)
            {
                return BadRequest("Missing Fields");
            }

            
            try
            {
                var result = await _taskSqlRepo.UpdateUserTaskAsync(taskId,updateTask); // Assuming _taskSqlRepo handles update logic
                return Ok(result);
            }
            catch (DbUpdateException ex)
            {
                // Log the exception
                return StatusCode(StatusCodes.Status500InternalServerError, $"Database update error: {ex.Message}");
            }
            catch (Exception ex)
            {
                // Handle other unexpected exceptions
                return StatusCode(StatusCodes.Status500InternalServerError, $"An unexpected error occurred: {ex.Message}");
            }

        }


        [HttpDelete("{taskId}")]
        public async Task<ActionResult> DeleteUserTask(int taskId)
        {
            var userTask = await _context.UserTasks.FindAsync(taskId);
            if (userTask == null)
            {
                return NotFound();
            }
            try
            {
                await _taskSqlRepo.DeleteUserTaskAsync(userTask);
                return NoContent(); // HTTP 204 No Content
            }catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occured: ${ex}");
            }
        }
    
    }
}

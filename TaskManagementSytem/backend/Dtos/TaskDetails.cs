namespace backend.Dtos
{
    public record class TaskDetails(
        int Id,
        string TaskName,
        string TaskDescription,
        int UserId,
        int CategoryId,
        DateTime CreatedAt,
        DateTime DueDate,
        string Status,
        string Priority  
     );
}

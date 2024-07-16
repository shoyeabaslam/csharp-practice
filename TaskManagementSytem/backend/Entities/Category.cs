
namespace backend.Entities
{
    public class Category
    {
        public int CategoryId { get; set; }
        public int UserId { get; set; }
        public string CategoryName { get; set; } = string.Empty;

        // Navigation property
        public User User { get; set; }

        public ICollection<UserTask> UserTasks = new List<UserTask>();
    }
}

using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class UserTask
    {
        [Key]
        public int taskId { get; set; }
        public string taskName { get; set; } 
        public string description {  get; set; }    
        public DateTime createDate { get; set; }   
        public DateTime dueDate { get; set; }
        public string status { get; set; }
        public string priority { get; set; }

        public User user { get; set; }
    }
}

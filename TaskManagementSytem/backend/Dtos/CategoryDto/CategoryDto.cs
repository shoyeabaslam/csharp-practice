using backend.Entities;

namespace backend.Dtos.CategoryDto
{
    public class CategoryDto
    {
        public int UserId { get; set; }
        public string CategoryName { get; set; } = string.Empty;

    }
}

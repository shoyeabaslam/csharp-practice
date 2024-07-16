namespace backend.Dtos.CategoryDto
{
    public class UpdateCategoryDto
    {
        public int UserId { get; set; }
        public string CategoryName { get; set; } = string.Empty;
    }
}

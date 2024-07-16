using backend.Dtos.CategoryDto;
using backend.Entities;

namespace backend.Repositories.CategoryRepo
{
    public interface ICategoryRepo
    {
        Task<IEnumerable<Category>> GetCategoriesByUserIdAsync(int userId);
        Task<Category> AddCategoryAsync(CategoryDto categoryDto);
        Task<CategoryDto> UpdateCategoryAsync(int categoryId, CategoryDto updateCategoryDto);
        Task DeleteCategoryAsync(Category category);

    }
}

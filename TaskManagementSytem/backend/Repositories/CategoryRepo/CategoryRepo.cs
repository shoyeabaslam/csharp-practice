
using backend.Data;
using backend.Dtos.CategoryDto;
using backend.Entities;
using backend.Mapping;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.CategoryRepo
{
    public class CategoryRepo : ICategoryRepo
    {
        private readonly TaskDbContext _taskDbContext;
        public CategoryRepo(TaskDbContext taskDbContext)
        {
            _taskDbContext = taskDbContext;
        }

        public async Task<Category> AddCategoryAsync(CategoryDto categoryDto)
        {
            var CategoryEntity = categoryDto.ToCategoryEntity();
            _taskDbContext.Categories.Add(CategoryEntity);
            await _taskDbContext.SaveChangesAsync();
            return CategoryEntity;
        }

     

        public async Task<IEnumerable<Category>> GetCategoriesByUserIdAsync(int userId)
        {
            var categories = await _taskDbContext.Categories
                                           .Where(c => c.UserId == userId)
                                           .ToListAsync();
            return categories;
        }

        public async Task<CategoryDto> UpdateCategoryAsync(int categoryId, CategoryDto updateCategoryDto)
        {
            var categoryEntity = updateCategoryDto.ToCategoryEntity(categoryId);
            _taskDbContext.Categories.Update(categoryEntity);
            await _taskDbContext.SaveChangesAsync();
            return categoryEntity.ToUpdateDto();
        }

        
        public async Task DeleteCategoryAsync(Category category)
        {
            _taskDbContext.Categories.Remove(category);
            await _taskDbContext.SaveChangesAsync();
        }
    }
}

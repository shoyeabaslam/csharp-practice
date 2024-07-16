using backend.Dtos.CategoryDto;
using backend.Entities;

namespace backend.Mapping
{
    public static class CategoryMapping
    {
        public static Category ToCategoryEntity(this CategoryDto dto)
        {
            return new Category()
            {
                CategoryName = dto.CategoryName,
                UserId = dto.UserId,
                User = null,
                UserTasks = null
            };
        }

        public static Category ToCategoryEntity(this CategoryDto dto,int CategoryId)
        {
            return new Category()
            {
                CategoryId = CategoryId,
                CategoryName = dto.CategoryName,
                UserId = dto.UserId,
                User = null,
                UserTasks = null
            };
        }

        public static CategoryDto ToUpdateDto(this Category category)
        {
            return new CategoryDto()
            {
                UserId = category.UserId,
                CategoryName = category.CategoryName,
            };
        }

    }
}

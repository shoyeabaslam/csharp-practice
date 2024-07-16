using backend.Entities;

namespace backend.Repositories.CategoryRepo
{
    public interface ICategory
    {
        Task<IEnumerable<Category>> GetCategoriesByUserIdAsync(int id);
        Category AddCategory(Category category);
        Category UpdateCategory(Category category);
        void DeleteCategory(Category category);

    }
}

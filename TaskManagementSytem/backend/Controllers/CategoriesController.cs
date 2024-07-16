using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Entities;
using backend.Dtos.CategoryDto;
using backend.Repositories.CategoryRepo;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly TaskDbContext _context;
        private readonly ICategoryRepo _categoryRepo;
        public CategoriesController(TaskDbContext context,ICategoryRepo categoryRepos)
        {
            _context = context;
            _categoryRepo = categoryRepos;
        }

        // GET: api/Categories
        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategoriesByUserId(int userId)
        {
            try
            {
               var listOfCategories = await _categoryRepo.GetCategoriesByUserIdAsync(userId);
                return Ok(listOfCategories);
            }catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Something went wrong: ${ex.Message}");
            }
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<Category>>> PostCategory(CategoryDto categoryDto)
        {
            try
            {
                var category = await _categoryRepo.AddCategoryAsync(categoryDto);
                return CreatedAtAction(nameof(PostCategory), new { CategoryId = category.CategoryId},category);
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Something went wrong :${ex}");
            }
        }

        [HttpPut("{categoryId}")]
        public async Task<ActionResult<CategoryDto>> UpdateCategory(int categoryId,[FromBody] CategoryDto update)
        {
            try
            {
                var category = await _categoryRepo.UpdateCategoryAsync(categoryId, update);
                return Ok(new
                {
                    categoryId,
                    category.UserId,
                    category.CategoryName
                });
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Somthing went wrong: ${ex.Message}");
            }
        }

        [HttpDelete("{categoryId}")]
        public async Task<ActionResult> DeleteCategory(int categoryId)
        {
            var category = await _context.Categories.FindAsync(categoryId);
            if(category == null)
            {
                return BadRequest();
            }
            try
            {
                await _categoryRepo.DeleteCategoryAsync(category);
                return NoContent();
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Something went wrong: {ex.Message}");
            }
        }
    }
}

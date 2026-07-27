using ECommerce.Application.DTOs.Categories;

namespace ECommerce.Application.Services.Categories;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoryService(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync()
    {
        var categories = await _categoryRepository.GetAllAsync();
        return categories.Select(c => new CategoryDto(c.Id, c.Name, c.DisplayOrder));
    }

    public async Task<CategoryDto> GetCategoryByIdAsync(int id)
    {
        var category = await _categoryRepository.GetByIdAsync(id);
        if (category == null)
        {
            throw new KeyNotFoundException($"Category with ID {id} not found.");
        }
        return new CategoryDto(category.Id, category.Name, category.DisplayOrder);
    }

    public async Task<CategoryDto> CreateCategoryAsync(CreateCategoryDto createCategoryDto)
    {
        var category = new Category
        {
            Name = createCategoryDto.Name,
            DisplayOrder = createCategoryDto.DisplayOrder
        };
        await _categoryRepository.AddAsync(category);
        await _categoryRepository.SaveChangesAsync();
        return new CategoryDto(category.Id, category.Name, category.DisplayOrder);
    }

    public async Task<CategoryDto> UpdateCategoryAsync(int id, UpdateCategoryDto updateCategoryDto)
    {
        var category = await _categoryRepository.GetByIdAsync(id);
        if (category == null)
        {
            throw new KeyNotFoundException($"Category with ID {id} not found.");
        }
        category.Name = updateCategoryDto.Name;
        category.DisplayOrder = updateCategoryDto.DisplayOrder;
        _categoryRepository.Update(category);
        await _categoryRepository.SaveChangesAsync();
        return new CategoryDto(category.Id, category.Name, category.DisplayOrder);
    }

    public async Task<bool> DeleteCategoryAsync(int id)
    {
        var category = await _categoryRepository.GetByIdAsync(id);
        if (category == null)
        {
            throw new KeyNotFoundException($"Category with ID {id} not found.");
        }
        _categoryRepository.Delete(category);
        await _categoryRepository.SaveChangesAsync();
        return true;
    }


}
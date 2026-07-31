using System.ComponentModel.DataAnnotations;

namespace ECommerce.Application.DTOs.Categories;

public sealed record CreateCategoryDto(
    [Required, MaxLength(100)] string Name,
    [Range(0, int.MaxValue)] int DisplayOrder);
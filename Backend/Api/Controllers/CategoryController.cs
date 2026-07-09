using Api.Dtos;
using Application.Features.Category.CreateCategory;
using Application.Features.Category.EditCategory;
using Application.Features.Category.GetCategory;
using Azure.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoryController : ControllerBase
{
    private readonly IMediator _mediator;

    public CategoryController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetCategories(int pageSize =10, int pageNumber= 1, string? search= null)
    {
        if (pageSize > 10)
            pageSize = 10;
        if (pageNumber < 1)
            pageNumber = 1;

        var result = await _mediator.Send(new GetCategoriesQuery(pageSize, pageNumber, search));

        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryCommand command)
    {
        var category = await _mediator.Send(command);

        return Ok(category);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditCategory(Guid id, EditCategoryRequest command)
    {
        var commandd = new EditCategoryCommand(id, command.Name, command.Status);

        await _mediator.Send(commandd);

        return Ok();
    }
}

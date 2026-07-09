using Application.Features.Product.CreateProduct;
using Application.Features.Product.DeleteProduct;
using Application.Features.Product.EditProduct;
using Application.Features.Product.GetByIdProduct;
using Application.Features.Product.GetProducts;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly IMediator _mediator;

    public ProductController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetProducts(int pageNumber = 1, int pageSize = 10, string? search = null)
    {
        if (pageSize > 10)
            pageSize = 10;
        if (pageNumber < 1)
            pageNumber = 1;

        var result = await _mediator.Send(new GetProductQuery(pageSize, pageNumber, search));

        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProductById(Guid id)
    {
        var result = await _mediator.Send(new GetProductByIdQuery(id));
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(Guid id)
    {
        await _mediator.Send(new DeleteProductCommand(id));
        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> CreateProduct([FromBody] CreateProductCommand command)
    {
        var product = await _mediator.Send(command);

        return Ok(product);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditProduct([FromBody] EditProductCommand command, Guid id)
    {
        var product = new EditProductCommand(id, command.Image, command.Name, command.CategoryId, command.Unit, command.Price, command.Stock, command.Status, command.Description);

        await _mediator.Send(product);

        return Ok();
    }
}

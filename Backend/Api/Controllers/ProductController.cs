using Api.Dtos;
using Application.Features.Product.CreateProduct;
using Application.Features.Product.DeleteProduct;
using Application.Features.Product.EditProduct;
using Application.Features.Product.GetByIdProduct;
using Application.Features.Product.GetProducts;
using Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IFileService _fileService;
    public ProductController(IMediator mediator, IFileService fileService)
    {
        _mediator = mediator;
        _fileService = fileService;
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
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> CreateProduct([FromForm] CreateProductDto dto)
    {
        var imagePath = await _fileService.SaveImageAsync(dto.Image, "products");
        var command = new CreateProductCommand(
            imagePath,
            dto.Name,
            dto.CategoryName,
            dto.Unit,
            dto.Price,
            dto.Stock,
            dto.Description
        );

        var productId = await _mediator.Send(command);

        return Ok(new {id = productId});
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditProduct([FromForm] EditProductDto dto, Guid id)
    {
        string? imagePath = null;

        // فقط اگه فایل جدید فرستاده شده بود، ذخیره‌اش کن
        if (dto.Image != null && dto.Image.Length > 0)
        {
            imagePath = await _fileService.SaveImageAsync(dto.Image, "products");
        }

        var command = new EditProductCommand(
            id,
            imagePath, // اگه فایل نیومده بود null می‌مونه
            dto.Name,
            dto.CategoryId,
            dto.Unit,
            dto.Price,
            dto.Stock,
            dto.Status,
            dto.Description
        );

        try
        {
            await _mediator.Send(command);
            return NoContent();
        }
        catch
        {
            if (imagePath != null)
                _fileService.DeleteImage(imagePath); // rollback عکس جدید اگه خطا خورد
            throw;
        }
    }
}

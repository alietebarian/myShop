using Application.Features.Cart.AddItem;
using Application.Features.Product.CreateProduct;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CartController : ControllerBase
{
    private readonly IMediator _mediator;

    public CartController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> CreateCart([FromBody] AddItemCommand command)
    {
         await _mediator.Send(command);

        return Ok();
    }
}

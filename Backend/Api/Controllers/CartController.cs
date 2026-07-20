using Api.Dtos;
using Application.Features.Cart.AddItem;
using Application.Features.Cart.ClearCart;
using Application.Features.Cart.GetCart;
using Application.Features.Cart.RemoveItem;
using Application.Features.Cart.UpdateCart;
using Application.Features.Product.CreateProduct;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class CartController : ControllerBase
{
    private readonly IMediator _mediator;

    public CartController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetCart()
    {
        return Ok(await _mediator.Send(new GetCartQuery()));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateQuantity(Guid id, [FromBody] UpdateQuantityDto dto)
    {
        await _mediator.Send(new UpdateQuantityCommand(id, dto.Quantity));

        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> AddItem([FromBody] AddItemCommand command)
    {
         await _mediator.Send(command);

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> RemoveItem(Guid id)
    {
        await _mediator.Send(new RemoveItemCommand(id));

        return Ok();
    }

    [HttpDelete]
    public async Task<IActionResult> ClearCart()
    {
        await _mediator.Send(new ClearCartCommand());
        
        return Ok();
    }
}

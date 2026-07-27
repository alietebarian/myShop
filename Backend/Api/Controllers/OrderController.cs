using Application.Features.Order.CancelOrder;
using Application.Features.Order.Checkout;
using Application.Features.Order.GetMyOrders;
using Application.Features.Order.GetOrderById;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class OrderController : ControllerBase
{
    private readonly IMediator _mediator;

    public OrderController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetMyOrders(int pageSize = 10, int pageNumber = 1)
    {
        var result = await _mediator.Send(new GetMyOrdersQuery(pageSize, pageNumber));

        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var result =
            await _mediator.Send(
                new GetOrderByIdQuery(id));

        return Ok(result);
    }

    [HttpPatch("{id:guid}/cancel")]
    public async Task<IActionResult> Cancel(Guid id)
    {
        await _mediator.Send(new CancelOrderComand(id));

        return NoContent();
    }

    [HttpPost("checkout")]
    public async Task<IActionResult> Checkout()
    {
        var orderId = await _mediator.Send(new CheckoutCommand());

        return CreatedAtAction(nameof(GetById), new { id = orderId }, orderId);
    }
}

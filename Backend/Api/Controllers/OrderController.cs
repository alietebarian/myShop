using Application.Features.Order.GetMyOrders;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

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
    public async Task<IActionResult> GetMyOrders()
    {
        var result = await _mediator.Send(new GetMyOrdersQuery());

        return Ok(result);
    }
}

using FluentValidation;

namespace Application.Features.Order.CancelOrder;

public class CancelOrderValidator : AbstractValidator<CancelOrderComand>
{
    public CancelOrderValidator()
    {
        RuleFor(x => x.OrderId)
            .NotEmpty();
    }
}

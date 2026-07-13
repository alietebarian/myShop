using FluentValidation;

namespace Application.Features.Cart.UpdateCart;

public class UpdateQuantityValidator : AbstractValidator<UpdateQuantityCommand>
{
    public UpdateQuantityValidator()
    {
        RuleFor(x => x.CartItemId)
           .NotEmpty();

        RuleFor(x => x.Quantity)
            .GreaterThan(0)
            .WithMessage("Quantity must be greater than zero.");
    }
}

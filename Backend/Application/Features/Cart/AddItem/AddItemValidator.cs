using FluentValidation;

namespace Application.Features.Cart.AddItem;

public class AddItemValidator : AbstractValidator<AddItemCommand>
{
    public AddItemValidator()
    {
        RuleFor(x => x.ProductId)
            .NotEmpty()
            .WithMessage("Product is required.");

        RuleFor(x => x.Quantity)
            .GreaterThan(0)
            .WithMessage("Quantity must be greater than zero.");
    }
}

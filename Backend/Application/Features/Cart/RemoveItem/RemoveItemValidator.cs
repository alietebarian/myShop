using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Features.Cart.RemoveItem;

public class RemoveItemValidator : AbstractValidator<RemoveItemCommand>
{
    public RemoveItemValidator()
    {
        RuleFor(x => x.CartItemId)
           .NotEmpty()
           .WithMessage("Cart item id is required.");
    }
}

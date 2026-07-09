using FluentValidation;

namespace Application.Features.Product.EditProduct;

public class EditProductValidator : AbstractValidator<EditProductCommand>
{
    public EditProductValidator()
    {
        RuleFor(x => x.Image)
            .NotEmpty().WithMessage("Image is required.")
            .MaximumLength(500);

        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name is required.")
            .MaximumLength(150);

        RuleFor(x => x.Unit)
            .NotEmpty().WithMessage("Unit is required.")
            .MaximumLength(50);

        RuleFor(x => x.Price)
            .GreaterThan(0).WithMessage("Price must be greater than 0.");

        RuleFor(x => x.Stock)
            .GreaterThanOrEqualTo(0).WithMessage("Stock cannot be negative.");

        RuleFor(x => x.Status)
            .NotNull();

        RuleFor(x => x.Description)
            .NotEmpty().WithMessage("Description is required.")
            .MaximumLength(1000);
    }
}

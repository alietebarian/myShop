using FluentValidation;

namespace Application.Features.Category.CreateCategory;

public class CreateCategoryValidator : AbstractValidator<CreateCategoryCommand>
{
    public CreateCategoryValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("نام دسته بندی الزامی است")
            .MaximumLength(100);
    }
}

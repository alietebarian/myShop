    using Domain.Entities;

    namespace Application.Features.Category.GetCategory;

    public class GetCategoriesDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public bool Status { get; set; }
        public int ProductCount { get; set; }
}

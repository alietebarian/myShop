using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.Product.EditProduct;

public class EditProductHandler : IRequestHandler<EditProductCommand>
{
    private readonly AppDbContext _context;
    private readonly IFileService _fileService;

    public EditProductHandler(AppDbContext context, IFileService fileService)
    {
        _context = context;
        _fileService = fileService;
    }

    public async Task Handle(EditProductCommand request, CancellationToken cancellationToken)
    {
        var product = await _context.Products
             .FirstOrDefaultAsync(x => x.Id == request.id, cancellationToken);

        if (product is null)
            throw new KeyNotFoundException("Product not found");

        var categoryExists = await _context.Categories
            .AnyAsync(x => x.Id == request.CategoryId, cancellationToken);

        if (!categoryExists)
            throw new KeyNotFoundException("Category not found");

        if (!string.IsNullOrWhiteSpace(request.Image) && request.Image != product.Image)
        {
            var oldImage = product.Image;
            product.Image = request.Image;
            _fileService.DeleteImage(oldImage);
        }

        product.Description = request.Description;
        product.Name = request.Name;
        product.Price = request.Price;
        product.Unit = request.Unit;
        product.Stock = request.Stock;
        product.Status = request.Status;
        product.CategoryId = request.CategoryId;

        await _context.SaveChangesAsync(cancellationToken);
    }
}

using Microsoft.AspNetCore.Http;

namespace Application.Interfaces;

public interface IFileService
{
    Task<string> SaveImageAsync(IFormFile file, string folderName);
    void DeleteImage(string imagePath);
}

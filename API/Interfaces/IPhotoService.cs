using System.Threading.Tasks;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace API.Interfaces
{
    public interface IPhotoService
    {
        Task<ImageUploadResult> AddPhotoASync(IFormFile file);
        Task<DeletionResult> DeletePhotoASync(string publicId);
    }
}
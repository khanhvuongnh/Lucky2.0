using System.Threading.Tasks;
using lucky_api._Services.Services;
using Microsoft.AspNetCore.Http;

namespace lucky_api._Services.Interfaces
{
    public interface IEmpService
    {
        Task<OperationResult> UploadEmployee(IFormFile file);
        Task<int> GetEmployeeCount();
        Task<bool> ClearEmployeeList();
    }
}
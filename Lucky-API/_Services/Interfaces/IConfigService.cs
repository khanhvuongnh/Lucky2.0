using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace lucky_api._Services.Interfaces
{
    public interface IConfigService
    {
        Task<object> GetBackground();
        Task<bool> ChangeBackground(IFormFile file);
        Task<int> GetWatingTime();
        Task<bool> ChangeWatingTime(int watingTime);
    }
}
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using lucky_api._Repositories.Interfaces;
using lucky_api._Services.Interfaces;
using lucky_api.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace lucky_api._Services.Services
{
    public class ConfigService : IConfigService
    {
        private readonly IConfigRepository _configRepository;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ConfigService(IConfigRepository configRepository, IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
            _configRepository = configRepository;
        }

        public async Task<bool> ChangeBackground(IFormFile file)
        {
            if (file == null)
                return false;

            var extension = Path.GetExtension(file.FileName).ToLower();
            var uploadImage = $"main-bg{extension}";
            string pathImages = @"images";
            string folder = Path.Combine(_webHostEnvironment.WebRootPath, pathImages);

            if (!Directory.Exists(folder))
                Directory.CreateDirectory(folder);

            string filePath = Path.Combine(folder, uploadImage);

            if (System.IO.File.Exists(filePath))
                System.IO.File.Delete(filePath);

            var item = await _configRepository.FindAll().FirstOrDefaultAsync();
            if (item != null)
            {
                item.Background = Path.Combine(pathImages, uploadImage);
            }
            else
            {
                var model = new Config();
                model.Background = Path.Combine(pathImages, uploadImage);
                _configRepository.Add(model);
            }

            try
            {
                using (FileStream fs = System.IO.File.Create(filePath))
                {
                    await file.CopyToAsync(fs);
                    await fs.FlushAsync();
                }
                await _configRepository.Save();

                return true;
            }
            catch (System.Exception)
            {
                return false;
            }
        }

        public async Task<bool> ChangeWatingTime(int watingTime)
        {
            var model = await _configRepository.FindAll().FirstOrDefaultAsync();
            model.WatingTime = watingTime;
            return await _configRepository.Save();
        }

        public async Task<object> GetBackground()
        {
            var item = await _configRepository.FindAll().FirstOrDefaultAsync();
            if (item != null)
            {
                return new { background = item.Background };
            }
            return new { background = string.Empty };
        }

        public async Task<int> GetWatingTime()
        {
            var item = await _configRepository.FindAll().FirstOrDefaultAsync();
            return item.WatingTime.Value;
        }
    }
}
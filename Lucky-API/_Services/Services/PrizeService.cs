using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using lucky_api._Repositories.Interfaces;
using lucky_api._Services.Interfaces;
using lucky_api.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;

namespace lucky_api._Services.Services
{
    public class PrizeService : IPrizeService
    {
        private readonly IPrizeRepository _prizeRepository;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public PrizeService(IPrizeRepository prizeRepository, IWebHostEnvironment webHostEnvironment)
        {
            _prizeRepository = prizeRepository;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<OperationResult> AddPrize(Prize prize)
        {
            var fileName = await UploadPicture(prize.Image);
            prize.Image = fileName;
            _prizeRepository.Add(prize);
            try
            {
                await _prizeRepository.Save();
                return new OperationResult { Success = true, Message = "Prize was successfully added." };
            }
            catch (System.Exception)
            {
                return new OperationResult { Success = false, Message = "Adding prize failed on save." };
            }
        }

        public async Task<bool> DeletePrize(int prizeID)
        {
            var model = await _prizeRepository.FindSingle(x => x.PrizeID == prizeID);

            // Xoá ảnh nếu có
            if (model.Image != null)
            {
                var filePath = Path.Combine(_webHostEnvironment.WebRootPath, "images", model.Image);
                if (File.Exists(filePath))
                    File.Delete(filePath);
            }

            // Xoá model
            _prizeRepository.Remove(model);
            return await _prizeRepository.Save();
        }

        public async Task<List<Prize>> GetAllPrizes(bool hasInvisibleItems)
        {
            if (hasInvisibleItems)
                return await _prizeRepository.FindAll().OrderBy(x => x.Seq).ToListAsync();
            else
                return await _prizeRepository.FindAll(x => x.Visible.Value).OrderBy(x => x.Seq).ToListAsync();
        }

        public async Task<bool> SwitchPrizeVisible(int prizeID)
        {
            var model = await _prizeRepository.FindSingle(x => x.PrizeID == prizeID);
            model.Visible = model.Visible == null ? true : !model.Visible;
            _prizeRepository.Update(model);
            return await _prizeRepository.Save();
        }

        public async Task<OperationResult> UpdatePrize(Prize prize)
        {
            var model = await _prizeRepository.FindAll(x => x.PrizeID == prize.PrizeID).AsNoTracking().FirstOrDefaultAsync();

            // Kiểm tra tồn tại
            if (model == null)
                return new OperationResult { Success = false, Message = "Prize not found." };

            // Trường hợp cập nhật ảnh mới
            if (model.Image != prize.Image && !string.IsNullOrEmpty(prize.Image))
            {
                // Xoá ảnh cũ
                var filePath = Path.Combine(_webHostEnvironment.WebRootPath, "images", model.Image);
                if (File.Exists(filePath))
                    File.Delete(filePath);

                // Thêm ảnh mới
                var fileName = await UploadPicture(prize.Image);
                if (!string.IsNullOrEmpty(fileName))
                    prize.Image = fileName;
            }
            _prizeRepository.Update(prize);

            try
            {
                await _prizeRepository.Save();
                return new OperationResult { Success = true, Message = "Prize was successfully updated." };
            }
            catch (System.Exception)
            {
                return new OperationResult { Success = false, Message = "Updating prize failed on save." };
            }
        }

        public async Task<string> UploadPicture(string file)
        {
            string folderImage = _webHostEnvironment.WebRootPath + @"\images";

            if (!string.IsNullOrEmpty(file))
            {
                string base64 = "";
                var fileName = "";
                var source = file;

                base64 = source.Substring(source.IndexOf(',') + 1);
                base64 = base64.Trim('\0');
                fileName = Guid.NewGuid() + ".jpg";

                byte[] imageData = Convert.FromBase64String(base64);
                if (!Directory.Exists(folderImage))
                {
                    Directory.CreateDirectory(folderImage);
                }
                string filePathImages = Path.Combine(folderImage, fileName);
                System.IO.File.WriteAllBytes(filePathImages, imageData);
                return await Task.FromResult(fileName);
            }
            else
            {
                return await Task.FromResult(string.Empty);
            }
        }
    }
}
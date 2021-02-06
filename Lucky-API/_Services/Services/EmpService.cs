using System.IO;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using lucky_api._Repositories.Interfaces;
using lucky_api._Services.Interfaces;
using lucky_api.Dtos;
using lucky_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using Microsoft.AspNetCore.Hosting;
using System.Linq;

namespace lucky_api._Services.Services
{
    public class EmpService : IEmpService
    {
        private readonly IEmpRepository _empRepository;
        private readonly IMapper _mapper;
        private readonly MapperConfiguration _mapperConfiguration;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public EmpService(IEmpRepository empRepository, IMapper mapper, MapperConfiguration mapperConfiguration,
            IWebHostEnvironment webHostEnvironment)
        {
            _mapperConfiguration = mapperConfiguration;
            _webHostEnvironment = webHostEnvironment;
            _mapper = mapper;
            _empRepository = empRepository;
        }

        public async Task<bool> ClearEmployeeList()
        {
            var data = await _empRepository.FindAll().ToListAsync();
            _empRepository.RemoveMultiple(data);

            try
            {
                await _empRepository.Save();
                return true;
            }
            catch (System.Exception)
            {
                return false;
            }
        }

        public async Task<int> GetEmployeeCount()
        {
            return await _empRepository.FindAll().CountAsync();
        }

        public async Task<OperationResult> UploadEmployee(IFormFile file)
        {
            // B1: Lưu file vào wwwroot
            if (file == null)
                return new OperationResult { Success = false, Message = "File not found." };

            var extension = Path.GetExtension(file.FileName).ToLower();
            var uploadFile = $"Lucky_Emp_Data{extension}";
            string uploadPath = @"uploads";
            string folder = Path.Combine(_webHostEnvironment.WebRootPath, uploadPath);

            if (!Directory.Exists(folder))
                Directory.CreateDirectory(folder);

            string filePath = Path.Combine(folder, uploadFile);

            if (System.IO.File.Exists(filePath))
                System.IO.File.Delete(filePath);

            try
            {
                using (FileStream fs = System.IO.File.Create(filePath))
                {
                    await file.CopyToAsync(fs);
                    await fs.FlushAsync();
                }
            }
            catch (System.Exception)
            {
                return new OperationResult { Success = false, Message = "File upload failed." };
            }

            // B2: Đọc file và lưu dữ liệu vào DB
            FileInfo fileInfo = new FileInfo(filePath);
            ExcelPackage package = new ExcelPackage(fileInfo);
            ExcelWorksheet worksheet = package.Workbook.Worksheets.FirstOrDefault();

            int rows = worksheet.Dimension.Rows;
            var models = new List<Emp>();

            // B2.1: Kiểm tra file có đúng định dạng hay không
            if (worksheet.Cells[1, 1].Value.ToString() != "EmpCode" ||
                worksheet.Cells[1, 2].Value.ToString() != "EmpDept" ||
                worksheet.Cells[1, 3].Value.ToString() != "EmpName")
                return new OperationResult { Success = false, Message = "File format is not valid. Make sure file begins with 'EmpCode', 'EmpDept', 'EmpName'" };

            for (int i = 2; i <= rows; i++)
            {
                var model = new Emp();
                model.EmpCode = worksheet.Cells[i, 1].Value.ToString();
                model.EmpDept = worksheet.Cells[i, 2].Value.ToString();
                model.EmpName = worksheet.Cells[i, 3].Value.ToString();

                models.Add(model);
            }

            _empRepository.AddMultiple(models);

            try
            {
                await _empRepository.Save();
                return new OperationResult { Success = true, Message = "Employee data was successfully uploaded" };
            }
            catch (System.Exception)
            {
                return new OperationResult { Success = false, Message = "Uploading employee data failed on save." };
            }
        }
    }

    public class OperationResult
    {
        public bool Success { get; set; }
        public string Message { get; set; }
    }
}
using System.IO;
using System.Reflection;
using System.Threading.Tasks;
using lucky_api._Services.Interfaces;
using lucky_api.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace lucky_api.Controllers
{
    public class AdminController : ApiController
    {
        private readonly IConfigService _configService;
        private readonly IEmpService _empService;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IPrizeService _prizeService;
        private readonly IRecordService _recordService;

        public AdminController(IConfigService configService, IEmpService empService,
            IWebHostEnvironment webHostEnvironment, IPrizeService prizeService, IRecordService recordService)
        {
            _recordService = recordService;
            _webHostEnvironment = webHostEnvironment;
            _prizeService = prizeService;
            _empService = empService;
            _configService = configService;
        }

        [HttpGet("GetBackground")]
        public async Task<IActionResult> GetBackground()
        {
            return Ok(await _configService.GetBackground());
        }

        [HttpGet("GetWatingTime")]
        public async Task<IActionResult> GetWatingTime()
        {
            return Ok(await _configService.GetWatingTime());
        }

        [HttpPost("ChangeBackground")]
        public async Task<IActionResult> ChangeBackground([FromForm] IFormFile file)
        {
            return Ok(await _configService.ChangeBackground(file));
        }

        [HttpPost("ChangeWatingTime")]
        public async Task<IActionResult> ChangeWatingTime([FromBody] int watingTime)
        {
            return Ok(await _configService.ChangeWatingTime(watingTime));
        }

        [HttpPost("UploadEmployee")]
        public async Task<IActionResult> UploadEmployee([FromForm] IFormFile file)
        {
            return Ok(await _empService.UploadEmployee(file));
        }

        [HttpGet("GetEmployeeCount")]
        public async Task<IActionResult> GetEmployeeCount()
        {
            return Ok(await _empService.GetEmployeeCount());
        }

        [HttpGet("ClearEmployeeList")]
        public async Task<IActionResult> ClearEmployeeList()
        {
            return Ok(await _empService.ClearEmployeeList());
        }

        [HttpPost("AddPrize")]
        public async Task<IActionResult> AddPrize(Prize prize)
        {
            return Ok(await _prizeService.AddPrize(prize));
        }

        [HttpPost("UpdatePrize")]
        public async Task<IActionResult> UpdatePrize(Prize prize)
        {
            return Ok(await _prizeService.UpdatePrize(prize));
        }

        [HttpGet("GetAllPrizes")]
        public async Task<IActionResult> GetAllPrizes(bool hasInvisibleItems = true)
        {
            return Ok(await _prizeService.GetAllPrizes(hasInvisibleItems));
        }

        [HttpGet("DeletePrize")]
        public async Task<IActionResult> DeletePrize(int prizeID)
        {
            return Ok(await _prizeService.DeletePrize(prizeID));
        }

        [HttpGet("SwitchPrizeVisible")]
        public async Task<IActionResult> SwitchPrizeVisible(int prizeID)
        {
            return Ok(await _prizeService.SwitchPrizeVisible(prizeID));
        }

        [HttpGet("ClearResultRecords")]
        public async Task<IActionResult> ClearResultRecords()
        {
            return Ok(await _recordService.ClearResultRecords());
        }
    }
}
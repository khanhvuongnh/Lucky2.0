using System.Threading.Tasks;
using lucky_api._Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace lucky_api.Controllers
{
    public class MainController : ApiController
    {
        private readonly IRecordService _recordService;
        public MainController(IRecordService recordService)
        {
            _recordService = recordService;
        }

        [HttpGet("GetRandomPrizeRecords")]
        public async Task<IActionResult> GetRandomPrizeRecords(int prizeID, int numberOfSpinAreas)
        {
            await _recordService.UpdatePrizeVisible(prizeID);
            return Ok(await _recordService.GetRandomPrizeRecords(prizeID, numberOfSpinAreas));
        }

        [HttpGet("CheckSpinRemain")]
        public async Task<IActionResult> CheckSpinRemain(int prizeID)
        {
            return Ok(await _recordService.CheckSpinRemain(prizeID));
        }

        [HttpGet("GetPrizeRecords")]
        public async Task<IActionResult> GetPrizeRecords(int prizeID, bool isShowAllRecords)
        {
            return Ok(await _recordService.GetPrizeRecords(prizeID, isShowAllRecords));
        }
    }
}
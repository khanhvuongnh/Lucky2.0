using System.Collections.Generic;
using System.Threading.Tasks;
using lucky_api.Dtos;

namespace lucky_api._Services.Interfaces
{
    public interface IRecordService
    {
        Task<List<RecordDto>> GetRandomPrizeRecords(int prizeID, int numberOfSpinAreas);
        Task<bool> UpdatePrizeVisible(int prizeID);
        Task<SpinRemainDto> CheckSpinRemain(int prizeID);
        Task<bool> ClearResultRecords();
        Task<List<RecordDto>> GetPrizeRecords(int prizeID, bool isShowAllRecords);
    }
}
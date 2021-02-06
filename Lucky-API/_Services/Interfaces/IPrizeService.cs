using System.Collections.Generic;
using System.Threading.Tasks;
using lucky_api._Services.Services;
using lucky_api.Models;

namespace lucky_api._Services.Interfaces
{
    public interface IPrizeService
    {
        Task<OperationResult> AddPrize(Prize prize);
        Task<string> UploadPicture(string file);
        Task<List<Prize>> GetAllPrizes(bool hasInvisibleItems);
        Task<bool> DeletePrize(int prizeID);
        Task<OperationResult> UpdatePrize(Prize prize);
        Task<bool> SwitchPrizeVisible(int prizeID);
    }
}
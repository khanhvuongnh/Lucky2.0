using lucky_api._Repositories.Interfaces;
using lucky_api._Services.Interfaces;

namespace lucky_api._Services.Services
{
    public class RecordService : IRecordService
    {
        private readonly IRecordRepository _recordRepository;

        public RecordService(IRecordRepository recordRepository)
        {
            _recordRepository = recordRepository;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using lucky_api._Repositories.Interfaces;
using lucky_api._Services.Interfaces;
using lucky_api.Dtos;
using lucky_api.Models;
using Microsoft.EntityFrameworkCore;

namespace lucky_api._Services.Services
{
    public class RecordService : IRecordService
    {
        private readonly IRecordRepository _recordRepository;
        private readonly IEmpRepository _empRepository;
        private readonly IPrizeRepository _prizeRepository;

        public RecordService(IRecordRepository recordRepository, IEmpRepository empRepository, IPrizeRepository prizeRepository)
        {
            _prizeRepository = prizeRepository;
            _empRepository = empRepository;
            _recordRepository = recordRepository;
        }

        public async Task<SpinRemainDto> CheckSpinRemain(int prizeID)
        {
            var prize = await _prizeRepository.FindSingle(x => x.PrizeID == prizeID);
            var recordCount = await _recordRepository.FindAll(x => x.PrizeID == prizeID).CountAsync();
            if (prize != null)
                return new SpinRemainDto
                {
                    Current = recordCount,
                    Total = prize.Qty.Value,
                    IsValid = recordCount < prize.Qty.Value ? true : false
                };
            else
                return new SpinRemainDto();
        }

        public async Task<bool> ClearResultRecords()
        {
            var records = await _recordRepository.FindAll().ToListAsync();
            if (records.Count > 0)
            {
                _recordRepository.RemoveMultiple(records);
                return await _recordRepository.Save();
            }
            return true;
        }

        public async Task<List<RecordDto>> GetPrizeRecords(int prizeID, bool isShowAllRecords)
        {
            var empQuery = _empRepository.FindAll();
            if (isShowAllRecords)
            {
                return await _recordRepository.FindAll(x => x.PrizeID == prizeID)
                    .Join(empQuery, r => r.EmpCode, e => e.EmpCode, (r, e) => new RecordDto
                    {
                        EmpCode = e.EmpCode,
                        EmpDept = e.EmpDept,
                        EmpName = e.EmpName,
                        ID = r.ID,
                        PrizeID = r.PrizeID,
                        Visible = r.Visible
                    }).ToListAsync();
            }
            else
            {
                return await _recordRepository.FindAll(x => x.PrizeID == prizeID && x.Visible == true)
                    .Join(empQuery, r => r.EmpCode, e => e.EmpCode, (r, e) => new RecordDto
                    {
                        EmpCode = e.EmpCode,
                        EmpDept = e.EmpDept,
                        EmpName = e.EmpName,
                        ID = r.ID,
                        PrizeID = r.PrizeID,
                        Visible = r.Visible
                    }).ToListAsync();
            }
        }

        public async Task<List<RecordDto>> GetRandomPrizeRecords(int prizeID, int numberOfSpinAreas)
        {
            var flag = true;
            var currentQty = 0;
            var result = new List<RecordDto>();
            var models = new List<Record>();
            while (flag)
            {
                var emp = await _empRepository.FindAll(x => x.EmpCode != null).OrderBy(x => Guid.NewGuid()).FirstOrDefaultAsync();
                if (emp == null)
                    continue;

                var isWinner = await _recordRepository.FindAll().AnyAsync(x => x.EmpCode == emp.EmpCode);
                if (isWinner)
                    continue;

                var model = new Record
                {
                    EmpCode = emp.EmpCode,
                    PrizeID = prizeID,
                    Visible = true
                };
                models.Add(model);
                currentQty += 1;

                var record = new RecordDto
                {
                    EmpCode = emp.EmpCode,
                    PrizeID = prizeID,
                    Visible = true,
                    EmpDept = emp.EmpDept,
                    EmpName = emp.EmpName
                };
                result.Add(record);

                if (currentQty == numberOfSpinAreas)
                    flag = false;
            }

            _recordRepository.AddMultiple(models);
            try
            {
                await _recordRepository.Save();
                return result;
            }
            catch (System.Exception)
            {
                return new List<RecordDto>();
            }

        }

        public async Task<bool> UpdatePrizeVisible(int prizeID)
        {
            var records = await _recordRepository.FindAll(x => x.PrizeID == prizeID && x.Visible == true).ToListAsync();
            records.ForEach(record => record.Visible = false);
            _recordRepository.UpdateMultiple(records);
            return await _recordRepository.Save();
        }
    }
}
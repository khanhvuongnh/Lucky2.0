using lucky_api._Repositories.Interfaces;
using lucky_api.Data;
using lucky_api.Models;

namespace lucky_api._Repositories.Repositories
{
    public class EmpRepository : Repository<Emp>, IEmpRepository
    {
        public EmpRepository(DBContext context) : base(context)
        {
        }
    }
}
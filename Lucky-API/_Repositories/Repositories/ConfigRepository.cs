using lucky_api._Repositories.Interfaces;
using lucky_api.Data;
using lucky_api.Models;

namespace lucky_api._Repositories.Repositories
{
    public class ConfigRepository : Repository<Config>, IConfigRepository
    {
        public ConfigRepository(DBContext context) : base(context)
        {
        }
    }
}
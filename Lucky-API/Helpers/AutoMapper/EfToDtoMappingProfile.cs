using AutoMapper;
using lucky_api.Dtos;
using lucky_api.Models;

namespace lucky_api.Helpers.AutoMapper
{
    public class EfToDtoMappingProfile : Profile
    {
        public EfToDtoMappingProfile()
        {
            CreateMap<Emp, EmpDto>();
        }
    }
}
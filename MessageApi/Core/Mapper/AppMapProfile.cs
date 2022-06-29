using AutoMapper;
using Core.DTO.Account;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Mapper
{
    public class AppMapProfile : Profile
    {
        public AppMapProfile()
        {
            CreateMap<RegisterUserDTO, ApplicationUser>()
                .ForMember(x => x.Image, opt => opt.Ignore())
                .ForMember(x => x.UserName, opt => opt.MapFrom(x=>x.Email));
        }
    }
}

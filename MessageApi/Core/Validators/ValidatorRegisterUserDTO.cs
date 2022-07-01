using Core.DTO.Account;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Validators
{
    public class ValidatorRegisterUserDTO : AbstractValidator<RegisterUserDTO>
    {
        public ValidatorRegisterUserDTO()
        {
            RuleFor(x => x.Email)
               .NotEmpty().WithMessage("Поле пошта є обов'язковим!")
               .EmailAddress().WithMessage("Пошта є не коректною!");
            //RuleFor(x => x.Password)
            //    .NotEmpty()
            //        .WithName("Password")
            //        .WithMessage("Поле пароль є обов'язковим!")
            //    .MinimumLength(5)
            //        .WithName("Password")
            //        .WithMessage("Поле пароль має містити міннімум 5 символів!");
            //RuleFor(x => x.ConfirmPassword)
            //    .NotEmpty()
            //        .WithName("ConfirmPassword")
            //        .WithMessage("Поле є обов'язковим!")
            //    .Equal(x => x.Password).WithMessage("Поролі не співпадають!");
        }
    }
}

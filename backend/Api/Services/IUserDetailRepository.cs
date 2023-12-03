using Api.Models;
using System.Collections.Generic;
using System;

namespace Api.Services
{
    public interface IUserDetailRepository
    {
        List<UserDetailVM> GetAll();
        UserDetailVM GetById(Guid id);
        UserDetailVM Add(UserDetailVM user);
        void Update(UserDetailVM user);
        void Delete(Guid id);
    }
}

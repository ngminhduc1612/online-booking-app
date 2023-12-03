using Api.Models;
using System.Collections.Generic;
using System;

namespace Api.Services
{
    public interface IUserRepository
    {
        List<UserVM> GetAll();
        UserVM GetById(Guid id);
        UserVM Add(UserVM user);
        void Update(UserVM user);
        void Delete(Guid id);
    }
}

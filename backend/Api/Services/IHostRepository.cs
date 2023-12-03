using Api.Models;
using System.Collections.Generic;
using System;

namespace Api.Services
{
    public interface IHostRepository
    {
        List<HostVM> GetAll();
        HostVM GetById(Guid id);
        HostVM Add(HostVM user);
        void Update(HostVM user);
        void Delete(Guid id);
    }
}

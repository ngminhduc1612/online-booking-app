using Api.Models;
using System.Collections.Generic;
using System;

namespace Api.Services
{
    public interface IInfrasRepository
    {
        List<InfrasVM> GetAll();
        
        InfrasVM GetById(Guid id);
        InfrasVM Add(InfrasVM Infras);
        void Update(InfrasVM Infras);
        void Delete(Guid Id);
    }
}

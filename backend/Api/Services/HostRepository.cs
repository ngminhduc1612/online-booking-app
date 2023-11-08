using Api.Database;
using Api.Models;
using System;
using System.Collections.Generic;

namespace Api.Services
{
    public class HostRepository : IHostRepository
    {
        private readonly MyDbContext _context;

        public HostRepository(MyDbContext context)
        {
            _context = context;
        }
        public HostVM Add(HostVM host)
        {
            var _host = new Host
            {
                HostId = Guid.NewGuid(),
                Username = host.Username,
                Password = host.Password,
            };

            _context.Add(_host);
            _context.SaveChanges();

            return new HostVM
            {
                Id = _host.HostId,
                Password = _host.Password,
                Username = _host.Username,
            };
        }

        public void Delete(Guid id)
        {
            throw new NotImplementedException();
        }

        public List<HostVM> GetAll()
        {
            throw new NotImplementedException();
        }

        public HostVM GetById(Guid id)
        {
            throw new NotImplementedException();
        }

        public void Update(HostVM user)
        {
            throw new NotImplementedException();
        }
    }
}

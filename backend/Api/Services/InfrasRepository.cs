using Api.Database;
using Api.Models;
using System.Collections.Generic;
using System;
using System.Linq;

namespace Api.Services
{
    public class InfrasRepository : IInfrasRepository
    {
        private readonly MyDbContext _context;
        public InfrasRepository(MyDbContext context)
        {
            _context = context;
        }
        public InfrasVM Add(InfrasVM infras)
        {
            var _infras = new Infras
            {
                InfrasId = Guid.NewGuid(),
                NameItem = infras.NameItem,
                Status = infras.Status,
                Description = infras.Description
            };

            _context.Add(_infras);
            _context.SaveChanges();

            return new InfrasVM
            {
                InfrasId = _infras.InfrasId,
                NameItem = _infras.NameItem,
                Status = _infras.Status,
                Description = _infras.Description
            };
        }

        public void Delete(Guid id)
        {
            var infras = _context.Infrases.SingleOrDefault(b => b.InfrasId == id);

            if (infras != null)
            {
                _context.Remove(infras);
                _context.SaveChanges();
            }
        }

        public List<InfrasVM> GetAll()
        {
            var infrases = _context.Infrases.Select(_infras => new InfrasVM
            {
                InfrasId = _infras.InfrasId,
                NameItem = _infras.NameItem,
                Status = _infras.Status,
                Description = _infras.Description

            });

            return infrases.ToList();
        }

        public InfrasVM GetById(Guid id)
        {
            var _infras = _context.Infrases.SingleOrDefault(b => b.InfrasId == id);
            if (_infras != null)
            {
                return new InfrasVM
                {
                    InfrasId = _infras.InfrasId,
                    NameItem = _infras.NameItem,
                    Status = _infras.Status,
                    Description = _infras.Description
                };
            }

            return null;
        }
        public void Update(InfrasVM infras)
        {
            var _infras = _context.Infrases.SingleOrDefault(b => b.InfrasId == infras.InfrasId);
            _infras.NameItem = infras.NameItem;
            _infras.Status = infras.Status;
            _infras.Description = infras.Description;
            _context.SaveChanges();
        }
    }
}

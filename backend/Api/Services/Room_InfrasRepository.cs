using Api.Database;
using Api.Models;
using System.Collections.Generic;
using System.Linq;
using System;

namespace Api.Services
{
    public class Room_InfrasRepository : IRoom_InfrasRepository
    {
        private readonly MyDbContext _context;
        public Room_InfrasRepository(MyDbContext context)
        {
            _context = context;
        }
        public Room_InfrasVM Add(Room_InfrasVM detail)
        {
            var _detail = new Room_Infras
            {
                RoomID = detail.RoomID,
                InfrasId = detail.InfrasId,
                Count = detail.Count,
            };

            _context.Add(_detail);
            _context.SaveChanges();

            return new Room_InfrasVM
            {
                RoomID = _detail.RoomID,
                InfrasId = _detail.InfrasId,
                Count = _detail.Count,

            };
        }

        public void Delete(Guid? RoomID, Guid? InfrasID)
        {
            var detail = _context.Room_Infrases.SingleOrDefault(b => b.RoomID == RoomID &&
             b.InfrasId == InfrasID);

            if (detail != null)
            {
                _context.Remove(detail);
                _context.SaveChanges();
            }
        }

        public List<Room_InfrasVM> GetAll()
        {
            var details = _context.Room_Infrases.Select(_Room_Infras => new Room_InfrasVM
            {
                RoomID = _Room_Infras.RoomID,   
                InfrasId = _Room_Infras.InfrasId,
                Count= _Room_Infras.Count

            });
            return details.ToList();
        }

        public List<Room_InfrasVM> GetAll(Guid? RoomID, Guid? InfrasID)
        {
            var allRoom_Infras = _context.Room_Infrases.AsQueryable();

            if (RoomID.HasValue)
            {
                allRoom_Infras = (IQueryable<Room_Infras>)allRoom_Infras.SingleOrDefault(b => b.RoomID.Equals(RoomID.Value));
            }
            if (InfrasID.HasValue)
            {
                allRoom_Infras = (IQueryable<Room_Infras>)allRoom_Infras.SingleOrDefault(b => b.InfrasId.Equals(InfrasID.Value));
            }

            var results = allRoom_Infras.Select(_r => new Room_InfrasVM
            {
                RoomID = _r.RoomID,
                InfrasId= _r.InfrasId,
                Count = _r.Count
            });

            return results.ToList();
        }
        public void Update(Room_InfrasVM detail)
        {
            var _r = _context.Room_Infrases.SingleOrDefault(b => b.RoomID == detail.RoomID
            && b.InfrasId == detail.InfrasId );
            _r.Count = detail.Count;
            _context.SaveChanges();
        }
    }
}

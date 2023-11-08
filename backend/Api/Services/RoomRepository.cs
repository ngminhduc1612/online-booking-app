using Api.Database;
using Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Services
{
    public class RoomRepository : IRoomRepository
    {
        private readonly MyDbContext _context;

        public static int PAGESIZE { get; set; } = 10;
        public RoomRepository(MyDbContext context)
        {
            _context = context;
        }
        public RoomVM Add(RoomVM room)
        {
       
            var _room = new Room
            {
                RoomID = Guid.NewGuid(),
                RoomNumber = room.RoomNumber,
                Price = room.Price,
                Status = room.Status,
                Style = room.Style,
                Description = room.Description,
                HotelID = room.HotelID,
                
            };

            _context.Add(_room);
            _context.SaveChanges();

            return new RoomVM
            {
                RoomID = _room.RoomID,
                RoomNumber = _room.RoomNumber,
                Price = _room.Price,
                Status = _room.Status,
                Style = _room.Style,
                Description = _room.Description,
                HotelID= room.HotelID,
                
            };
        }

        public void Delete(Guid id)
        {
            var room = _context.Rooms.SingleOrDefault(r => r.RoomID == id);

            if(room != null)
            {
                _context.Remove(room);
                _context.SaveChanges();
            }
        }

        public List<RoomVM> GetAll()
        {
            var rooms = _context.Rooms.Select(r => new RoomVM
            {
                RoomID = r.RoomID,
                RoomNumber = r.RoomNumber,
                Price = r.Price,
                Status = r.Status,
                Style = r.Style,
                Description = r.Description,
                HotelID = r.HotelID,
                
                
        });

            return rooms.ToList();
        }

        public List<RoomSearch> GetAll(string search, int? from, int? to, string? sortBy, int page = 1)
        {
            var allRooms = _context.Rooms.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                allRooms = allRooms.Where(r => r.RoomNumber.Contains(search));
            }

            #region Filtering

            if (from.HasValue)
            {
                allRooms = allRooms.Where(r => r.Price >= from);
            }
            if (to.HasValue)
            {
                allRooms = allRooms.Where(r => r.Price <= to);
            }

            #endregion

            #region sort
            if (!string.IsNullOrEmpty(sortBy))
            {
                switch (sortBy)
                {   
                    case "roomNumber_desc": allRooms = allRooms.OrderByDescending(r => r.RoomNumber); break;
                    case "roomNumber_asc": allRooms = allRooms.OrderBy(r => r.RoomNumber); break;
                    case "priceNumber_desc": allRooms = allRooms.OrderByDescending(r => r.Price); break;
                    case "priceNumber_asc": allRooms = allRooms.OrderBy(r => r.Price); break;
                }
            }
            #endregion

            #region Paging
            allRooms = allRooms.Skip( (page - 1) * PAGESIZE).Take(PAGESIZE);
            #endregion

            var results = allRooms.Select(r => new RoomSearch
            {
                RoomNumber = r.RoomNumber,
                Price = r.Price,
                Status = r.Status,
                Style = r.Style,
                Description = r.Description,
            });

            return results.ToList();

        }

        public RoomVM GetById(Guid id)
        {
            var room = _context.Rooms.SingleOrDefault(r => r.RoomID == id);
            if(room != null)
            {
                return new RoomVM
                {
                    RoomID = room.RoomID,
                    RoomNumber = room.RoomNumber,
                    Price = room.Price,
                    Status = room.Status,
                    Style = room.Style,
                    Description = room.Description,
                    HotelID = room.HotelID,
                };
            }

            return null;
        }
        public void Update(RoomVM room)
        {
            var _room = _context.Rooms.SingleOrDefault(r => r.RoomID == room.RoomID);
            _room.RoomNumber = room.RoomNumber;
            _room.Status = room.Status;
            _room.Style = room.Style;
            _room.Price = room.Price;
            _room.Description = room.Description;
            _room.HotelID = room.HotelID;
            _context.SaveChanges();
        }
    }
}

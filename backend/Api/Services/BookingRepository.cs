using Api.Database;
using Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Services
{
    public class BookingRepository : IBookingRepository
    {
        private readonly MyDbContext _context;
        public BookingRepository(MyDbContext context)
        {
            _context = context;
        }
        public BookingVM Add(BookingVM booking)
        {
            var _booking = new Booking
            {
                BookingId = Guid.NewGuid(),
                BookingDate = booking.BookingDate,
                status = booking.status,
                TotalCost = booking.TotalCost,             
            };

            _context.Add(_booking);
            _context.SaveChanges();

            return new BookingVM
            {
                BookingId = _booking.BookingId,
                BookingDate = _booking.BookingDate,
                status = _booking.status,
                TotalCost = _booking.TotalCost

            };
        }

        public void Delete(Guid id)
        {
            var booking = _context.Bookings.SingleOrDefault(b => b.BookingId == id);

            if (booking != null)
            {
                _context.Remove(booking);
                _context.SaveChanges();
            }
        }

        public List<BookingVM> GetAll()
        {
            var bookings = _context.Bookings.Select(_booking => new BookingVM
            {
                BookingId = _booking.BookingId,
                BookingDate = _booking.BookingDate,
                status = _booking.status,
                TotalCost = _booking.TotalCost

            });

            return bookings.ToList();
        }

        public List<BookingSearch> GetAll(DateTime? from, DateTime? to, string sortBy, int page)
        {
            var allBookings = _context.Bookings.AsQueryable();

            #region Filtetring
            if (from.HasValue)
            {
                allBookings = allBookings.Where(b => b.BookingDate >= from);
            }
            if (to.HasValue)
            {
                allBookings = allBookings.Where(b => b.BookingDate <= to);
            }
            #endregion

            if (!string.IsNullOrEmpty(sortBy))
            {
                switch (sortBy)
                {
                    case "date_desc": allBookings.OrderByDescending(b => b.BookingDate); break;
                    case "date_asc": allBookings.OrderBy(b => b.BookingDate); break;
                }
            }

            var results = allBookings.Select(_booking => new BookingSearch
            {
                BookingId = _booking.BookingId,
                BookingDate = _booking.BookingDate,
                status = _booking.status,
                TotalCost = _booking.TotalCost
            });

            return results.ToList();
        }

        public BookingVM GetById(Guid id)
        {
            var _booking = _context.Bookings.SingleOrDefault(b => b.BookingId == id);
            if (_booking != null)
            {
                return new BookingVM
                {
                    BookingId = _booking.BookingId,
                    BookingDate = _booking.BookingDate,
                    status = _booking.status,
                    TotalCost = _booking.TotalCost
                };
            }

            return null;
        }
        public void Update(BookingVM booking)
        {
            var _booking = _context.Bookings.SingleOrDefault(b => b.BookingId == booking.BookingId);
            _booking.BookingDate = booking.BookingDate;
            _booking.status = booking.status;
            _booking.TotalCost = booking.TotalCost;
            _context.SaveChanges();
        }
    }
}

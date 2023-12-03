using Api.Database;
using Api.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace Api.Services
{
    public class BookingDetailRepository : IBookingDetailRepository
    {
        private readonly MyDbContext _context;
        public BookingDetailRepository(MyDbContext context)
        {
            _context = context;
        }
        public BookingDetailVM Add(BookingDetailVM detail)
        {
            var _detail = new BookingDetail
            {
                 BookingId = detail.BookingId,
                 RoomID = detail.RoomID,
                 Id = detail.Id,
                 Start = detail.Start,
                 End = detail.End,
                 NumPeple = detail.NumPeple,

            };

            _context.Add(_detail);
            _context.SaveChanges();

            return new BookingDetailVM
            {
                BookingId = _detail.BookingId,
                RoomID = _detail.RoomID,
                Id = _detail.Id,
                Start = _detail.Start,
                End = _detail.End,
                NumPeple = _detail.NumPeple,

            };
        }

        public void Delete(Guid RoomID, Guid UserID, Guid BookingID)
        {
            var detail = _context.BookingDetails.SingleOrDefault(b => b.BookingId == BookingID &&
             b.RoomID == RoomID && b.Id == UserID );

            if (detail != null)
            {
                _context.Remove(detail);
                _context.SaveChanges();
            }
        }

        public List<BookingDetailVM> GetAll()
        {
            var details = _context.BookingDetails.Select(_bookingDetail => new BookingDetailVM
            {
                BookingId = _bookingDetail.BookingId,
                RoomID = _bookingDetail.RoomID,
                Id = _bookingDetail.Id,
                Start = _bookingDetail.Start,
                End = _bookingDetail.End,
                NumPeple = _bookingDetail.NumPeple,

            });

            return details.ToList();
        }

        public List<BookingDetailSearch> GetAll(Guid? RoomID, Guid? UserID, Guid? BookingID)
        {
            var allBookings = _context.BookingDetails.AsQueryable();

            if (RoomID.HasValue)
            {
                allBookings = (IQueryable<BookingDetail>)allBookings.SingleOrDefault(b => b.RoomID.Equals(RoomID.Value));
            }
            if (UserID.HasValue)
            {
                allBookings = (IQueryable<BookingDetail>)allBookings.SingleOrDefault(b => b.Id.Equals(UserID.Value));
            }
            if (BookingID.HasValue)
            {
                allBookings = (IQueryable<BookingDetail>)allBookings.SingleOrDefault(b => b.BookingId.Equals(BookingID.Value));
            }

            var results = allBookings.Select(_bookingDetail => new BookingDetailSearch
            {
                BookingId = _bookingDetail.BookingId,
                RoomID = _bookingDetail.RoomID,
                UserId = _bookingDetail.Id,
                Start = _bookingDetail.Start,
                End = _bookingDetail.End,
                NumPeple = _bookingDetail.NumPeple,
            });

            return results.ToList();
        }

        /*public BookingVM GetById(Guid id)
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
        }*/
        public void Update(BookingDetailVM detail)
        {
            var _bookingDetail = _context.BookingDetails.SingleOrDefault(b => b.BookingId == detail.BookingId
            && b.Id == detail.Id && b.RoomID == detail.RoomID);
            _bookingDetail.Start = detail.Start;
            _bookingDetail.End = detail.End;
            _bookingDetail.NumPeple = detail.NumPeple;
            _context.SaveChanges();
        }
    }
}

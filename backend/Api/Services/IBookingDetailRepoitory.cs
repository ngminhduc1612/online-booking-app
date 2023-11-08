using Api.Models;
using System.Collections.Generic;
using System;

namespace Api.Services
{
    public interface IBookingDetailRepository
    {
        List<BookingDetailVM> GetAll();
        List<BookingDetailSearch> GetAll(Guid? RoomID, Guid? UserID, Guid? BookingID);
        BookingDetailVM Add(BookingDetailVM booking);
        void Update(BookingDetailVM booking);
        void Delete(Guid RoomID, Guid UserID, Guid BookingID);
    }
}

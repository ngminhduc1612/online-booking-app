using Api.Models;
using System.Collections.Generic;
using System;

namespace Api.Services
{
    public interface IHotelRepository
    {
        List<HotelVM> GetAll();
        HotelVM GetById(Guid id);
        HotelVM Add(HotelVM hotel);
        void Update(HotelVM hotel);
        void Delete(Guid Id);
    }
}

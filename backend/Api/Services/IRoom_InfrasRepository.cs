using Api.Models;
using System.Collections.Generic;
using System;

namespace Api.Services
{
    public interface IRoom_InfrasRepository
    {
        List<Room_InfrasVM> GetAll();
        List<Room_InfrasVM> GetAll(Guid? RoomID, Guid? InfrasID);
        Room_InfrasVM Add(Room_InfrasVM Room_Infras);
        void Update(Room_InfrasVM Room_Infras);
        void Delete(Guid? RoomID, Guid? InfrasID);
    }
}

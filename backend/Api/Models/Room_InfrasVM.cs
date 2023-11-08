using System;

namespace Api.Models
{
    public class Room_InfrasVM
    {
        public Guid InfrasId { get; set; }
        public Guid RoomID { get; set; }
        public int Count { get; set; }
    }
}

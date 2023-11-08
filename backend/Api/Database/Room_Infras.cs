using System;

namespace Api.Database
{
    public class Room_Infras
    {
        public Guid InfrasId { get; set; }
        public Guid RoomID { get; set; }
        public int Count { get; set; }

        //relationship
        public Room Room { get; set; }
        public Infras Infras { get; set; }

    }
}

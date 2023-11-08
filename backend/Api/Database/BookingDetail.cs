using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Database
{
    public class BookingDetail
    {
        public Guid BookingId { get; set; }
        public Guid RoomID { get; set; }
        public Guid Id { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public int NumPeple { get; set; }

        //relationship
        public Booking Booking { get; set; }
        public Room Room { get; set; }
        public User User { get; set; }
    }
}

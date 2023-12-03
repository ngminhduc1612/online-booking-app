using System;

namespace Api.Models
{
    public class BookingDetailVM
    {
        public Guid BookingId { get; set; }
        public Guid RoomID { get; set; }
        public Guid Id { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public int NumPeple { get; set; }
    }

    public class BookingDetailSearch
    {
        public Guid BookingId { get; set; }
        public Guid RoomID { get; set; }
        public Guid UserId { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public int NumPeple { get; set; }
    }
}

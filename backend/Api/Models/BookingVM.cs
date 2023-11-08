using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
    public class BookingVM
    {
        public Guid BookingId { get; set; }
        public byte status { get; set; }
        public DateTime BookingDate { get; set; }
        public int TotalCost { get; set; }
    }

    public class BookingSearch
    {
        public Guid BookingId { get; set; }
        public byte status { get; set; }
        public DateTime BookingDate { get; set; }
        public int TotalCost { get; set; }
    }
}

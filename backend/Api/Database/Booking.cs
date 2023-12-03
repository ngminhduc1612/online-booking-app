using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime;

namespace Api.Database
{
    [Table("Booking")]
    public class Booking
    {
        [Key]
        public Guid BookingId { get; set; }
        [Required]
        public byte status { get; set; }
        [Required]
        public DateTime BookingDate { get; set; }
        public int TotalCost { get; set; }
        public ICollection<BookingDetail> BookingDetails { get; set; }

        public Booking()
        {
            BookingDetails = new List<BookingDetail>();
        }

    }
}

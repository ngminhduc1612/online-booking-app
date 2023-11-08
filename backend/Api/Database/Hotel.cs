using Api.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Database
{
    [Table("Hotel")]
    public class Hotel
    {
        [Key]
        public Guid HotelID { get; set; }
        [Required]
        public string HotelName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Description { get; set; }
        public string HotelRule { get; set; }
        public string Style { get; set; }
        public Guid HostId { get; set; }

        public Host Host { get; set; }
        public ICollection<Room> Rooms { get; set; }
        public Hotel() {
            Rooms = new List<Room>();
        }

    }
}

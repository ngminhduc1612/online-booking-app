using Api.Database;
using System;
using System.Collections.Generic;

namespace Api.Models
{
    public class HotelVM
    {
        public Guid HotelID { get; set; }
        public string HotelName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Description { get; set; }
        public string HotelRule { get; set; }
        public string Styles { get; set; }
        public int MinPrice { get; set; }
        public List<RoomVM> Rooms { get; set; }
        public Guid HostId { get; set; }
    }
}

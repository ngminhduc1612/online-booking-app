using Api.Database;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
    public class RoomVM
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public Guid RoomID { get; set; }
        public string RoomNumber { get; set; }
        public int Price { get; set; }
        public byte Status { get; set; }
        public byte Style { get; set; }
        public string Description { get; set; }
        public Guid HotelID { get; set; }
        //public List<IFormFile> roomPictures { get; set; }
    }

    public class RoomSearch
    {
        public string RoomNumber { get; set; }
        public int Price { get; set; }
        public byte Status { get; set; }
        public byte Style { get; set; }
        public string LinkImg { get; set; }
        public string Description { get; set; }
    }
}

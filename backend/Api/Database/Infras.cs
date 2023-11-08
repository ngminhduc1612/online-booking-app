using Api.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Database
{
    [Table("Infras")]
    public class Infras
    {
        public Guid InfrasId { get; set; }
        public string NameItem { get; set; }
        public byte Status { get; set; }
        public string Description { get; set; }

        public ICollection<Room_Infras> Room_Infras { get; set; }

        public Infras()
        {
            Room_Infras = new List<Room_Infras>();
        }


    }
}

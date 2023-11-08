using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System;

namespace Api.Database
{
    public class Host
    {
        [Key]
        public Guid HostId { get; set; }
        [Required]
        [MaxLength(50)]
        public string Username { get; set; }
        [Required]
        [MaxLength(250)]
        public string Password { get; set; }
        public ICollection<Hotel> Hotels { get; set; }
        public Host()
        {
            Hotels = new List<Hotel>();
        }
    }
}

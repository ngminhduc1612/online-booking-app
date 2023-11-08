using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Database
{
    [Table("User")]
    public class User
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Username { get; set; }
        [Required]
        [MaxLength(250)]
        public string Password { get; set; }
        public int Role {get; set; }
        public ICollection<BookingDetail> BookingDetails { get; set; }
        public ICollection<UserDetail> UserDetails { get; set; }
        public User()
        {
            BookingDetails = new List<BookingDetail>();
            UserDetails = new List<UserDetail>();
        }
    }
}

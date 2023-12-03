using System.ComponentModel.DataAnnotations;
using System;

namespace Api.Models
{
    public class UserVM
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int Role { get; set; }
    }
}

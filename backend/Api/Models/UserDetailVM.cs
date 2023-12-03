using Api.Database;
using System;

namespace Api.Models
{
    public class UserDetailVM
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string FoneNumber { get; set; }
        public User User { get; set; }
    }
}

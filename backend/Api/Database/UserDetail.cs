using System;

namespace Api.Database
{
    public class UserDetail
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string FoneNumber { get; set; }
        public User User { get; set; }
    }
}

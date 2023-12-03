using Api.Database;
using Api.Models;
using System.Collections.Generic;
using System;
using System.Linq;

namespace Api.Services
{
    public class UserRepository : IUserRepository
    {
        private readonly MyDbContext _context;
        public UserRepository(MyDbContext context)
        {
            _context = context;
        }
        public UserVM Add(UserVM user)
        {
            var _user = new User
            {
                Id = Guid.NewGuid(),
                Username = user.Username,
                Password = user.Password,

            };

            _context.Add(_user);
            _context.SaveChanges();

            return new UserVM
            {
                Id= _user.Id,
                Password= _user.Password,
                Username= _user.Username,
            };
        }

        public void Delete(Guid id)
        {
            var user = _context.Users.SingleOrDefault(b => b.Id == id);

            if (user != null)
            {
                _context.Remove(user);
                _context.SaveChanges();
            }
        }

        public List<UserVM> GetAll()
        {
            var users = _context.Users.Select(_user => new UserVM
            {
                Id=_user.Id,
                Password = _user.Password,
                Username = _user.Username,

            });

            return users.ToList();
        }

        public UserVM GetById(Guid id)
        {
            var _user = _context.Users.SingleOrDefault(b => b.Id == id);
            if (_user != null)
            {
                return new UserVM
                {
                    Id = _user.Id,
                    Username = _user.Username,
                    Password = _user.Password,
                };
            }

            return null;
        }
        public void Update(UserVM user)
        {
            var _user = _context.Users.SingleOrDefault(b => b.Id == user.Id);
            _user.Username = user.Username;
            _user.Password = user.Password;
            _context.SaveChanges();
        }
    }
}

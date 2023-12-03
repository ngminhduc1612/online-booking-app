using Api.Database;
using Api.Models;
using System.Collections.Generic;
using System;
using System.Linq;

namespace Api.Services
{
    public class UserDetailRepository : IUserDetailRepository
    {
        private readonly MyDbContext _context;
        public UserDetailRepository(MyDbContext context)
        {
            _context = context;
        }
        public UserDetailVM Add(UserDetailVM user)
        {
            var _userDetail = new UserDetail
            {
                Id = user.Id,
                FullName = user.FullName,
                FoneNumber = user.FoneNumber,

            };

            _context.Add(_userDetail);
            _context.SaveChanges();

            return new UserDetailVM
            {
                Id = _userDetail.Id,
                FullName= _userDetail.FullName,
                FoneNumber= _userDetail.FoneNumber,
            };
        }

        public void Delete(Guid id)
        {
            var user = _context.UserDetails.SingleOrDefault(b => b.Id == id);

            if (user != null)
            {
                _context.Remove(user);
                _context.SaveChanges();
            }
        }

        public List<UserDetailVM> GetAll()
        {
            var users = _context.UserDetails.Select(_user => new UserDetailVM
            {
                Id = _user.Id,
                FoneNumber = _user.FoneNumber,
                FullName = _user.FullName,

            });

            return users.ToList();
        }

        public UserDetailVM GetById(Guid id)
        {
            var _user = _context.UserDetails.SingleOrDefault(b => b.Id == id);
            if (_user != null)
            {
                return new UserDetailVM
                {
                    Id = _user.Id,
                    FoneNumber = _user.FoneNumber,
                    FullName = _user.FullName,
                };
            }

            return null;
        }
        public void Update(UserDetailVM user)
        {
            var _user = _context.UserDetails.SingleOrDefault(b => b.Id == user.Id);
            _user.FoneNumber = user.FoneNumber;
            _user.FullName = user.FullName;
            _context.SaveChanges();
        }

    }
}

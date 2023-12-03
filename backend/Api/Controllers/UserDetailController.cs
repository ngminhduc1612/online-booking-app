using Api.Models;
using Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserDetailController : ControllerBase
    {
        private readonly IUserDetailRepository _userRep;
        public UserDetailController(IUserDetailRepository userRepository)
        {
            _userRep = userRepository;
        }

        [HttpGet]
        public IActionResult getAll()
        {
            try
            {
                return Ok(_userRep.GetAll());
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("{id}")]
        public IActionResult getById(Guid id)
        {
            try
            {
                var data = _userRep.GetById(id);
                if (data != null)
                {
                    return Ok(data);
                }
                else return NotFound();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(Guid id, UserDetailVM user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            try
            {
                _userRep.Update(user);
                return NoContent();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            try
            {
                _userRep.Delete(id);
                return Ok();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        public IActionResult Add(UserDetailVM user)
        {
            try
            {
                return Ok(_userRep.Add(user));
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}

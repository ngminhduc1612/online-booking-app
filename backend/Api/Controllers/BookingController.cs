using Api.Models;
using Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingRepository _bookingRep;
        public BookingController(IBookingRepository bookingRepository)
        {
            _bookingRep = bookingRepository;
        }

        [HttpGet]
        public IActionResult getAll()
        {
            try
            {
                return Ok(_bookingRep.GetAll());
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet( "sortBy")]
        public IActionResult getAll(DateTime? from, DateTime? to, string? sortBy, int page)
        {
            try
            {
                var result = _bookingRep.GetAll( from, to, sortBy, page);
                return Ok(result);
            }
            catch
            {
                return BadRequest("No Data");
            }
        }

        [HttpGet("{id}")]
        public IActionResult getById(Guid id)
        {
            try
            {
                var data = _bookingRep.GetById(id);
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
        public IActionResult Update(Guid id, BookingVM booking)
        {
            if (id != booking.BookingId)
            {
                return BadRequest();
            }

            try
            {
                _bookingRep.Update(booking);
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
                _bookingRep.Delete(id);
                return Ok();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        public IActionResult Add(BookingVM booking)
        {
            try
            {
                return Ok(_bookingRep.Add(booking));
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}

using Api.Models;
using Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingDetailController : ControllerBase
    {
        private readonly IBookingDetailRepository _DetailRep;
        public BookingDetailController(IBookingDetailRepository bookingDetailRepository)
        {
            _DetailRep = bookingDetailRepository;
        }

        [HttpGet]
        public IActionResult getAll()
        {
            try
            {
                return Ok(_DetailRep.GetAll());
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        public IActionResult Add(BookingDetailVM booking)
        {
            try
            {
                return Ok(_DetailRep.Add(booking));
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("{RoomId} {UseId} {BookingId}")]
        public IActionResult Update(Guid RoomID, Guid UserID, Guid BookingID, BookingDetailVM booking)
        {
            if (RoomID != booking.BookingId || UserID != booking.Id || BookingID != booking.BookingId)
            {
                return BadRequest();
            }

            try
            {
                _DetailRep.Update(booking);
                return NoContent();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("id")]
        public IActionResult getAll(Guid? RoomID, Guid? UserID, Guid? BookingID)
        {
            try
            {
                var result = _DetailRep.GetAll(RoomID, UserID, BookingID);
                return Ok(result);
            }
            catch
            {
                return BadRequest("No Data");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid RoomID, Guid UserID, Guid BookingID)
        {
            try
            {
                _DetailRep.Delete(RoomID, UserID,BookingID);
                return Ok();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

    }
}

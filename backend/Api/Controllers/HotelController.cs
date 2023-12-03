using Api.Models;
using Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelController : ControllerBase
    {

        private readonly IHotelRepository _HotelRep;
        public HotelController(IHotelRepository HotelRepository)
        {
            _HotelRep = HotelRepository;
        }

        [HttpGet]
        public IActionResult getAll()
        {
            try
            {
                return Ok(_HotelRep.GetAll());
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
                var data = _HotelRep.GetById(id);
                
                if (data != null)
                {
                    string new_data = JsonSerializer.Serialize(data, new JsonSerializerOptions
                    {
                        ReferenceHandler = ReferenceHandler.IgnoreCycles,
                        WriteIndented = true
                    });
                    return Ok(new_data);
                }
                else return NotFound();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(Guid id, HotelVM hotel)
        {
            if (id != hotel.HotelID)
            {
                return BadRequest();
            }

            try
            {
                _HotelRep.Update(hotel);
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
                _HotelRep.Delete(id);
                return Ok();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        public IActionResult Add(HotelVM hotel)
        {
            try
            {
                return Ok(_HotelRep.Add(hotel));
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}

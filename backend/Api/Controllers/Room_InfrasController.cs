using Api.Models;
using Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Room_InfrasController : ControllerBase
    {
        private readonly IRoom_InfrasRepository _room_InfrasRep;
        public Room_InfrasController(IRoom_InfrasRepository _room_InfraslRepository)
        {
            _room_InfrasRep = _room_InfraslRepository;
        }

        [HttpGet]
        public IActionResult getAll()
        {
            try
            {
                return Ok(_room_InfrasRep.GetAll());
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        public IActionResult Add(Room_InfrasVM _room_Infras)
        {
            try
            {
                return Ok(_room_InfrasRep.Add(_room_Infras));
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("{RoomId} {InfrasID}")]
        public IActionResult Update(Guid RoomID, Guid InfrasID, Room_InfrasVM _room_Infras)
        {
            if (RoomID != _room_Infras.RoomID || InfrasID == _room_Infras.InfrasId)
            {
                return BadRequest();
            }

            try
            {
                _room_InfrasRep.Update(_room_Infras);
                return NoContent();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("id")]
        public IActionResult getAll(Guid? RoomID, Guid? InfrasID)
        {
            try
            {
                var result = _room_InfrasRep.GetAll(RoomID, InfrasID);
                return Ok(result);
            }
            catch
            {
                return BadRequest("No Data");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid RoomID, Guid InfrasID)
        {
            try
            {
                _room_InfrasRep.Delete(RoomID, InfrasID);
                return Ok();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}

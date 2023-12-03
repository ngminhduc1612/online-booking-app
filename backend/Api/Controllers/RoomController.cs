using Api.Models;
using Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly IRoomRepository _roomRep;
        private readonly AppSettings _appSettings;
        public RoomController(IRoomRepository roomRepository, IOptionsMonitor<AppSettings> optionsMonitor)
        {
            _roomRep = roomRepository;
            _appSettings = optionsMonitor.CurrentValue;
        }

        [HttpGet]
        public IActionResult getAll()
        {
            try
            {
                return Ok(_roomRep.GetAll());
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("search")]
        public IActionResult getListSearch(string search, int? from, int? to, string? sortBy, int page = 1)
        {
            try
            {
                var result =_roomRep.GetAll(search, from, to, sortBy,page);
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
                var data = _roomRep.GetById(id);
                if(data != null)
                {
                    return Ok(data);
                }else return NotFound();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(Guid id, RoomVM room)
        {
            if(id != room.RoomID)
            {
                return BadRequest();
            }

            try
            {
                _roomRep.Update(room);
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
                _roomRep.Delete(id);
                return Ok();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost , DisableRequestSizeLimit]

        public Task<IActionResult> AddAsync(RoomVM roomInfo)
        {
            try
            {
               
                _roomRep.Add(roomInfo);

                return Task.FromResult<IActionResult>(Ok());
            }
            catch
            {
                return Task.FromResult<IActionResult>(StatusCode(StatusCodes.Status500InternalServerError));
            }
        }
    }
}

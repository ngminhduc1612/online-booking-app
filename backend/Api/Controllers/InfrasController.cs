using Api.Models;
using Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InfrasController : ControllerBase
    {
        private readonly IInfrasRepository _infrasRep;
        public InfrasController(IInfrasRepository infrasRepository)
        {
            _infrasRep = infrasRepository;
        }

        [HttpGet]
        public IActionResult getAll()
        {
            try
            {
                return Ok(_infrasRep.GetAll());
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
                var data = _infrasRep.GetById(id);
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
        public IActionResult Update(Guid id, InfrasVM infras)
        {
            if (id != infras.InfrasId)
            {
                return BadRequest();
            }

            try
            {
                _infrasRep.Update(infras);
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
                _infrasRep.Delete(id);
                return Ok();
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        public IActionResult Add(InfrasVM infras)
        {
            try
            {
                return Ok(_infrasRep.Add(infras));
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}

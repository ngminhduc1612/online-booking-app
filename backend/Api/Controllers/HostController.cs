using Api.Models;
using Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HostController : Controller
    {
        private readonly IHostRepository _hostRep;
        public HostController(IHostRepository hostRep)
        {
            _hostRep = hostRep;
        }

        [HttpPost]
        public IActionResult Add(HostVM host)
        {
            try
            {
                return Ok(_hostRep.Add(host));
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}

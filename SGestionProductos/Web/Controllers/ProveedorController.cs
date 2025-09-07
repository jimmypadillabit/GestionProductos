using Microsoft.AspNetCore.Mvc;
using SGestionProductos.Application.Common.Interfaces;
using SGestionProductos.Application.Common.Models;

namespace SGestionProductos.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProveedorController(IProveedorService proveedorService) : ControllerBase
    {
        private readonly IProveedorService _proveedorService = proveedorService;

        [HttpGet("get")]
        public async Task<IActionResult> Get()
        => Ok(await _proveedorService.Get());

        [HttpGet("getid")]
        public async Task<IActionResult> GetId(Guid id)
        => Ok(await _proveedorService.GetId(id));

        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody] ProveedorDTO request)
        {

            await _proveedorService.Add(request);
            return Ok(new { mensaje = "Registro guardado" });
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] ProveedorDTO request)
        {
            await _proveedorService.Update(request);
            return Ok(new { mensaje = "Registro actualizado" });
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _proveedorService.Delete(id);
            return Ok(new { mensaje = "Registro eliminado" });
        }

    }
}

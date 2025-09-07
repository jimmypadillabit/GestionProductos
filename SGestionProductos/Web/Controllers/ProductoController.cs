using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SGestionProductos.Application.Common.Interfaces;
using SGestionProductos.Application.Common.Models;

namespace SGestionProductos.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductoController(IProductoService productoService) : ControllerBase
    {
        private readonly IProductoService _productoService = productoService;

        [HttpGet("get")]
        public async Task<IActionResult> Get()
        => Ok(await _productoService.Get());

        [HttpGet("getid")]
        public async Task<IActionResult> GetId(Guid id)
        => Ok(await _productoService.GetId(id));

        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody] ProductoDTO request)
        {

            await _productoService.Add(request);
            return Ok(new { mensaje = "Registro guardado" });
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] ProductoDTO request)
        {
            await _productoService.Update(request);
            return Ok(new { mensaje = "Registro actualizado" });
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _productoService.Delete(id);
            return Ok(new { mensaje = "Registro eliminado" });
        }

        [HttpPut("actualizarstock")]
        public async Task<IActionResult> ActualizarPrecios([FromBody] List<ProductoStockDTO> productosDto)
        {
            await _productoService.UpdateStock(productosDto);

            return Ok(new { mensaje = "Productos actualizados correctamente" });
        }
    }
}

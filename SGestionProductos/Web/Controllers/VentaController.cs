using Microsoft.AspNetCore.Mvc;
using SGestionProductos.Application.Common.Interfaces;
using SGestionProductos.Application.Common.Models;
using SGestionProductos.Application.Services;

namespace SGestionProductos.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VentaController(IVentaService ventaService) : ControllerBase
    {
        private readonly IVentaService _ventaService = ventaService;

        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody] List<VentaDTO> request)
        {

            foreach (var item in request)
            {
                item.Fecha = DateTime.Now;
            }

            await _ventaService.AddRange(request);
            return Ok(new { mensaje = "Venta exitosa" });
        }

        [HttpGet("reporteventas")]
        public async Task<IActionResult> ReporteVenta(DateTime inicio,DateTime fin)
        => Ok(await _ventaService.ReporteVenta(inicio,fin));

        [HttpGet("reportemasvendidos")]
        public async Task<IActionResult> ReporteMasVendidos(int cantidad,DateTime inicio, DateTime fin)
        => Ok(await _ventaService.ReporteMasVendidos(cantidad,inicio, fin));
    }
}

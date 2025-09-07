using SGestionProductos.Application.Common.Models;
using SGestionProductos.Domain.Entities;

namespace SGestionProductos.Infraestructure.Interface
{
    public interface IVentaRepository
    {
        Task AddRangeAsync(IEnumerable<Venta> entities);

        Task<List<ReporteVentaDto>> ObtenerReporteVentasAsync(DateTime fechaInicio, DateTime fechaFin);

        Task<List<ReporteVentaDto>> ObtenerReporteMasVendidosAsync(int cantidad,DateTime fechaInicio, DateTime fechaFin);
    }
}

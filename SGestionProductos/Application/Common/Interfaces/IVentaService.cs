using SGestionProductos.Application.Common.Models;
using SGestionProductos.Domain.Entities;

namespace SGestionProductos.Application.Common.Interfaces
{
    public interface IVentaService
    {
        Task AddRange(List<VentaDTO> request);

        Task<List<ReporteVentaDto>> ReporteVenta(DateTime fechaInicio, DateTime fechaFin);

        Task<List<ReporteVentaDto>> ReporteMasVendidos(int cantidad ,DateTime fechaInicio, DateTime fechaFin);
    }
}

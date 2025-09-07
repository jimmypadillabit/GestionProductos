using AutoMapper;
using SGestionProductos.Application.Common.Interfaces;
using SGestionProductos.Application.Common.Models;
using SGestionProductos.Domain.Entities;

namespace SGestionProductos.Application.Services
{
    public class VentaService(IUnitOfWork unitOfWork, IMapper mapper) : IVentaService
    {
        private readonly IUnitOfWork _unitOfWork = unitOfWork;
        private readonly IMapper _mapper = mapper;

        public async Task AddRange(List<VentaDTO> request)
        {
            var items = _mapper.Map<List<Venta>>(request);
            await _unitOfWork.ExecuteTransactionAsync(async () => await _unitOfWork.VentaRepository.AddRangeAsync(items.ToList()));
        }

        public async Task<List<ReporteVentaDto>> ReporteVenta(DateTime fechaInicio, DateTime fechaFin)
        {
            var reporte = await _unitOfWork.VentaRepository.ObtenerReporteVentasAsync(fechaInicio,fechaFin);
            return reporte;
        }

        public async Task<List<ReporteVentaDto>> ReporteMasVendidos(int cantidad,DateTime fechaInicio, DateTime fechaFin)
        {
            var reporte = await _unitOfWork.VentaRepository.ObtenerReporteMasVendidosAsync(cantidad,fechaInicio, fechaFin);
            return reporte;
        }
    }
}

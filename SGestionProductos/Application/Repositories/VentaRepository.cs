using Microsoft.EntityFrameworkCore;
using SGestionProductos.Application.Common.Models;
using SGestionProductos.Domain.Entities;
using SGestionProductos.Infraestructure.Data;
using SGestionProductos.Infraestructure.Interface;

namespace SGestionProductos.Application.Repositories
{
    public class VentaRepository(ApplicationDbContext context) : IVentaRepository
    {
        protected DbSet<Venta> _dbSet = context.Set<Venta>();

        public async Task AddRangeAsync(IEnumerable<Venta> entities)
        => await _dbSet.AddRangeAsync(entities);

        public async Task<List<ReporteVentaDto>> ObtenerReporteVentasAsync(DateTime fechaInicio, DateTime fechaFin)
        {
            return await context.Venta
                .Where(v => v.Fecha.Date >= fechaInicio.Date && v.Fecha.Date <= fechaFin.Date)
                .GroupBy(v => new { v.Producto.Nombre, v.Producto.Precio })
                .Select(g => new ReporteVentaDto
                {
                    Nombre = g.Key.Nombre,
                    CantidadTotal = g.Sum(v => v.Cantidad),
                    TotalVentas = g.Sum(v => v.Total),
                    Ganancia = g.Sum(v => v.Total) - (g.Key.Precio * g.Sum(v => v.Cantidad))
                })
                .ToListAsync();
        }

        public async Task<List<ReporteVentaDto>> ObtenerReporteMasVendidosAsync(int cantidad,DateTime fechaInicio, DateTime fechaFin)
        {
               return await context.Venta
                .Where(v => v.Fecha.Date >= fechaInicio.Date && v.Fecha.Date <= fechaFin.Date)
                .GroupBy(v => new { v.Producto.Nombre, v.Producto.Precio })
                .Select(g => new ReporteVentaDto
                {
                    Nombre = g.Key.Nombre,
                    CantidadTotal = g.Sum(v => v.Cantidad),
                    TotalVentas = g.Sum(v => v.Total),
                    Ganancia = g.Sum(v => v.Total) - (g.Key.Precio * g.Sum(v => v.Cantidad))
                })
                .OrderByDescending(r => r.CantidadTotal)
                .Take(cantidad)
                .ToListAsync();
        }

    }
}

using Microsoft.EntityFrameworkCore;
using SGestionProductos.Domain.Entities;

namespace SGestionProductos.Infraestructure.Data
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
    {
        public DbSet<Proveedor> Proveedor { get; set; }
        public DbSet<Producto> Producto { get; set; }
        public DbSet<Venta> Venta { get; set; }
    }
}

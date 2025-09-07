using SGestionProductos.Application.Common.Interfaces;
using SGestionProductos.Application.Services;

namespace SGestionProductos.Application
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddApplicationService(this IServiceCollection services)
        {
            services.AddScoped<IProveedorService, ProveedorService>();
            services.AddScoped<IProductoService, ProductoService>();
            services.AddScoped<IVentaService, VentaService>();

            return services;
        }
    }
}

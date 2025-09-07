using SGestionProductos.Application;
using SGestionProductos.Application.Repositories;
using SGestionProductos.Infraestructure.Interface;

namespace SGestionProductos.Infraestructure
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddInfrastructuresService(this IServiceCollection services)
        {
            //if (configuration.UseInMemoryDatabase)
            //{
            //    services.AddDbContext<ApplicationDbContext>(options =>
            //        options.UseInMemoryDatabase("CleanArchitecture"));
            //}
            //else
            //{
            //    services.AddDbContext<ApplicationDbContext>(options =>
            //        options.UseSqlServer(configuration.ConnectionStrings.DefaultConnection));
            //}

            // register services
            services.AddScoped<IProveedorRepository, ProveedorRepository>();
            services.AddScoped<IProductoRepository, ProductoRepository>();
            services.AddScoped<IVentaRepository, VentaRepository>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            return services;
        }
    }
}

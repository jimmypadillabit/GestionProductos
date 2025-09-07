using SGestionProductos.Application.Common.Models;
using SGestionProductos.Domain.Entities;
using System.Linq.Expressions;

namespace SGestionProductos.Infraestructure.Interface
{
    public interface IProductoRepository
    {
        Task<List<Producto>> GetAllAsync();
        Task AddAsync(Producto entity);
        Task<Producto> GetByIdAsync(Guid id);

        Task<Producto?> FirstOrDefaultAsync(
           Expression<Func<Producto, bool>> filter,
           Func<IQueryable<Producto>, IQueryable<Producto>>? include = null);
        void Update(Producto entity);

        void Delete(Producto entity);
        Task Delete(Guid id);

        Task<List<Producto>> ObtenerPorIdsAsync(List<Guid> ids);
    }
}

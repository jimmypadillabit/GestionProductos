using SGestionProductos.Domain.Entities;
using System.Linq.Expressions;

namespace SGestionProductos.Infraestructure.Interface
{
    public interface IProveedorRepository
    {
        Task<List<Proveedor>> GetAllAsync();
        Task AddAsync(Proveedor entity);
        Task<Proveedor> GetByIdAsync(Guid id);
       
        Task<Proveedor?> FirstOrDefaultAsync(
           Expression<Func<Proveedor, bool>> filter,
           Func<IQueryable<Proveedor>, IQueryable<Proveedor>>? include = null);
        void Update(Proveedor entity);
      
        void Delete(Proveedor entity);
        Task Delete(Guid id);


    }
}

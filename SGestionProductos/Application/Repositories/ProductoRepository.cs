using Microsoft.EntityFrameworkCore;
using SGestionProductos.Application.Common.Models;
using SGestionProductos.Domain.Entities;
using SGestionProductos.Infraestructure.Data;
using SGestionProductos.Infraestructure.Interface;
using System.Linq.Expressions;

namespace SGestionProductos.Application.Repositories
{
    public class ProductoRepository(ApplicationDbContext context) : IProductoRepository
    {
        protected DbSet<Producto> _dbSet = context.Set<Producto>();


        public async Task<List<Producto>> GetAllAsync()
        {
            return await _dbSet.AsNoTracking().ToListAsync();
        }


        public async Task AddAsync(Producto entity)
        => await _dbSet.AddAsync(entity);



        public async Task<Producto?> FirstOrDefaultAsync(
    Expression<Func<Producto, bool>> filter,
    Func<IQueryable<Producto>, IQueryable<Producto>>? include = null)
        {
            IQueryable<Producto> query = _dbSet.IgnoreQueryFilters().AsNoTracking();

            if (include != null)
            {
                query = include(query);
            }

            return await query.FirstOrDefaultAsync(filter);
        }

        public void Update(Producto entity)
        => _dbSet.Update(entity);

        public void Delete(Producto entity)
        => _dbSet.Remove(entity);

        public async Task Delete(Guid id)
        {
            Producto entity = await GetByIdAsync(id);
            Delete(entity);
        }

        public async Task<Producto> GetByIdAsync(Guid id)
       => await _dbSet.FindAsync(id);

        public async Task<List<Producto>> ObtenerPorIdsAsync(List<Guid> ids)
        {

            return await _dbSet
                .Where(p => ids.Contains(p.Id))
                .ToListAsync();
        }
    }
}

using Microsoft.EntityFrameworkCore;
using SGestionProductos.Domain.Entities;
using SGestionProductos.Infraestructure.Data;
using SGestionProductos.Infraestructure.Interface;
using System.Linq.Expressions;

namespace SGestionProductos.Application.Repositories
{
    public class ProveedorRepository(ApplicationDbContext context) : IProveedorRepository
    {
        protected DbSet<Proveedor> _dbSet = context.Set<Proveedor>();


        public async Task<List<Proveedor>> GetAllAsync()
        {
            return await _dbSet.AsNoTracking().ToListAsync();
        }


        public async Task AddAsync(Proveedor entity)
        => await _dbSet.AddAsync(entity);

        

        public async Task<Proveedor?> FirstOrDefaultAsync(
    Expression<Func<Proveedor, bool>> filter,
    Func<IQueryable<Proveedor>, IQueryable<Proveedor>>? include = null)
        {
            IQueryable<Proveedor> query = _dbSet.IgnoreQueryFilters().AsNoTracking();

            if (include != null)
            {
                query = include(query);
            }

            return await query.FirstOrDefaultAsync(filter);
        }

        public void Update(Proveedor entity)
        => _dbSet.Update(entity);

        public void Delete(Proveedor entity)
        => _dbSet.Remove(entity);

        public async Task Delete(Guid id)
        {
            Proveedor entity = await GetByIdAsync(id);
            Delete(entity);
        }

        public async Task<Proveedor> GetByIdAsync(Guid id)
       => await _dbSet.FindAsync(id);

    }
}

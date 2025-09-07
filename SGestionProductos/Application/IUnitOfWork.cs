using SGestionProductos.Infraestructure.Interface;

namespace SGestionProductos.Application
{
    public interface IUnitOfWork
    {
        IProveedorRepository ProveedorRepository { get; }
        IProductoRepository ProductoRepository { get; }
        IVentaRepository VentaRepository { get; }

        int SaveChanges();
        
        Task<int> SaveChangesAsync();
        
        void BeginTransaction();
        
        void Commit();
        
        Task CommitAsync();
        
        void Rollback();
        //Task ExecuteTransactionAsync();
        Task ExecuteTransactionAsync(Func<Task> action);
    }
}

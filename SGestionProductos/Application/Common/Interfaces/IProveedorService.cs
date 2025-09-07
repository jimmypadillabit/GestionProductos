using SGestionProductos.Application.Common.Models;
using SGestionProductos.Domain.Entities;

namespace SGestionProductos.Application.Common.Interfaces
{
    public interface IProveedorService
    {
        Task<List<Proveedor>> Get();
        Task<Proveedor> GetId(Guid id);
        Task Add(ProveedorDTO request);
        Task Update(ProveedorDTO request);
        Task Delete(Guid id);
    }
}

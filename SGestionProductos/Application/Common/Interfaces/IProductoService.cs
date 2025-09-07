using SGestionProductos.Application.Common.Models;
using SGestionProductos.Domain.Entities;

namespace SGestionProductos.Application.Common.Interfaces
{
    public interface IProductoService
    {
        Task<List<Producto>> Get();
        Task<Producto> GetId(Guid id);
        Task Add(ProductoDTO request);
        Task Update(ProductoDTO request);
        Task Delete(Guid id);

        Task UpdateStock(List<ProductoStockDTO> items);
    }
}

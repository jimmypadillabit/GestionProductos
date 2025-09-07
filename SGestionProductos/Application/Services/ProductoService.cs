using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SGestionProductos.Application.Common.Interfaces;
using SGestionProductos.Application.Common.Models;
using SGestionProductos.Domain.Entities;

namespace SGestionProductos.Application.Services
{
    public class ProductoService(IUnitOfWork unitOfWork, IMapper mapper) : IProductoService
    {
        private readonly IUnitOfWork _unitOfWork = unitOfWork;
        private readonly IMapper _mapper = mapper;
        public async Task<List<Producto>> Get()
        {
            var producto= await _unitOfWork.ProductoRepository.GetAllAsync();
            return producto;
        }

        public async Task<Producto> GetId(Guid id)
        {
            var producto = await _unitOfWork.ProductoRepository.GetByIdAsync(id);
            return producto;
        }

        public async Task Add(ProductoDTO request)
        {
            var producto = _mapper.Map<Producto>(request);
            await _unitOfWork.ExecuteTransactionAsync(async () => await _unitOfWork.ProductoRepository.AddAsync(producto));
        }

        public async Task Update(ProductoDTO request)
        {
            var producto = await _unitOfWork.ProductoRepository.FirstOrDefaultAsync(x => x.Id == request.Id);

            var entity = _mapper.Map(request, producto);
            await _unitOfWork.ExecuteTransactionAsync(async () => _unitOfWork.ProductoRepository.Update(entity));
        }

        public async Task Delete(Guid id)
        {

            var producto = await _unitOfWork.ProductoRepository.FirstOrDefaultAsync(x => x.Id == id);
            await _unitOfWork.ExecuteTransactionAsync(async () => _unitOfWork.ProductoRepository.Delete(producto));
        }

        public async Task UpdateStock(List<ProductoStockDTO> items)
        {
            List<Guid> ids = new List<Guid>();

            foreach (var item in items)
            {
                ids.Add(item.Id);
            }

            var productos = await _unitOfWork.ProductoRepository.ObtenerPorIdsAsync(ids);

            foreach (var producto in productos)
            {
                var dto = items.First(p => p.Id == producto.Id);
                producto.Stock = producto.Stock - dto.Cantidad;
            }

            _unitOfWork.SaveChangesAsync();

        }
    }
}

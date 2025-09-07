using AutoMapper;
using SGestionProductos.Application.Common.Interfaces;
using SGestionProductos.Application.Common.Models;
using SGestionProductos.Domain.Entities;

namespace SGestionProductos.Application.Services
{
    public class ProveedorService(IUnitOfWork unitOfWork, IMapper mapper) : IProveedorService
    {
        private readonly IUnitOfWork _unitOfWork = unitOfWork;
        private readonly IMapper _mapper = mapper;
        public async Task<List<Proveedor>> Get()
        {
            var proveedor = await _unitOfWork.ProveedorRepository.GetAllAsync();
            return proveedor;
        }

        public async Task<Proveedor> GetId(Guid id)
        {
            var proveedor = await _unitOfWork.ProveedorRepository.GetByIdAsync(id);
            return proveedor;
        }

        public async Task Add(ProveedorDTO request)
        {
            var proveedor = _mapper.Map<Proveedor>(request);
            await _unitOfWork.ExecuteTransactionAsync(async () => await _unitOfWork.ProveedorRepository.AddAsync(proveedor));
        }

        public async Task Update(ProveedorDTO request)
        {
            var proveedor = await _unitOfWork.ProveedorRepository.FirstOrDefaultAsync(x => x.Id == request.Id);

            var entity = _mapper.Map(request, proveedor);
            await _unitOfWork.ExecuteTransactionAsync(async () => _unitOfWork.ProveedorRepository.Update(entity));
        }

        public async Task Delete(Guid id)
        {

            var proveedor = await _unitOfWork.ProveedorRepository.FirstOrDefaultAsync(x => x.Id == id);
            await _unitOfWork.ExecuteTransactionAsync(async () => _unitOfWork.ProveedorRepository.Delete(proveedor));
        }
    }
}

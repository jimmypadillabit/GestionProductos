using AutoMapper;
using SGestionProductos.Application.Common.Models;
using SGestionProductos.Domain.Entities;

namespace SGestionProductos.Application.Common.Mappings
{
    public class MapProfile : Profile
    {
        public MapProfile() {

            CreateMap<Proveedor, ProveedorDTO>().ReverseMap();
            CreateMap<Producto, ProductoDTO>().ReverseMap();
            CreateMap<Venta, VentaDTO>().ReverseMap();
        }
        
    }
}

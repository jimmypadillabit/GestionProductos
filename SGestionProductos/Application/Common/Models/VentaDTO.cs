namespace SGestionProductos.Application.Common.Models
{
    public class VentaDTO
    {
        public Guid Id { get; set; }
        public DateTime Fecha { get; set; }

        public Guid ProductoId { get; set; }

        public int Cantidad { get; set; }

        public float Total { get; set; }

        public string Estado { get; set; }
    }
}

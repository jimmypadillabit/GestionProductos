namespace SGestionProductos.Domain.Entities
{
    public class Producto
    {
        public Guid Id { get; set; }

        public string Nombre { get; set; }

        public string Descripcion { get; set; }

        public float Precio { get; set; }

        public int  Stock { get; set; }

        public string  Categoria { get; set; }

        public Guid IdProveedor { get; set; }

        public float Pvp { get; set; }

        public float Utilidad { get; set; }
    }
}

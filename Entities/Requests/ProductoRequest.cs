using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Requests
{
    public class ProductoRequest
    {
        public int? Id { get; set; }
        public string? Nombre { get; set; }
        public string? Descripcion { get; set; }
        public decimal? PrecioBase { get; set; }
        public decimal? PrecioDescuento { get; set; }
        public string? Imagen { get; set; }
        
    }
}

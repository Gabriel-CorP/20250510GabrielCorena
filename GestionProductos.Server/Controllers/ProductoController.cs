using BAL.UseCases;
using Entities.entities;
using Entities.Requests;
using Entities.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GestionProductos.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private readonly ProductoUseCase _productosUseCase;

        public ProductoController(ProductoUseCase productosUseCase)
        {
            _productosUseCase = productosUseCase;
        }

        [HttpPost("PostProducto")]
        public async Task<Response> PostProducto([FromBody] ProductoRequest request)
        {
            return await _productosUseCase.InsertarProducto(request);
        }

        [HttpPut("PutProducto")]
        public async Task<Response> PutProducto([FromBody] ProductoRequest request)
        {
            return await _productosUseCase.EditarProducto(request);
        }

        [HttpDelete("DeleteProducto/{IdProducto}")]
        public async Task<Response> DeleteProducto(int IdProducto)
        {
            return await _productosUseCase.EliminarProducto(IdProducto);
        }

        [HttpGet("GetProductos")]
        public async Task<Response<List<Producto>>> ObtenerProductos()
        {
            return await _productosUseCase.ObtenerProductos(null);
        }

        [HttpGet("GetProductoById")]
        public async Task<Response<List<Producto>>> ObtenerProductoById([FromQuery] int IdProducto)
        {
            return await _productosUseCase.ObtenerProductos(IdProducto);
        }
    }
}

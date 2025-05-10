using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Commands.Productos;
using DAL.Querys;
using Entities.entities;
using Entities.Requests;
using Entities.Responses;

namespace BAL.UseCases
{
    public class ProductoUseCase
    {
        private readonly ProductoCommand _productoCommand;
        private readonly ConsultarProductoQuery _consultarProductoQuery;

        public ProductoUseCase(ProductoCommand ProductoCommand, ConsultarProductoQuery consultarProductoQuery)
        {
            _productoCommand = ProductoCommand;
            _consultarProductoQuery = consultarProductoQuery;
        }

        public async Task<Response> InsertarProducto(ProductoRequest productoRequest)
        {
            return await _productoCommand.InsertarProducto(productoRequest);
        }

        public async Task<Response> EditarProducto(ProductoRequest productoRequest)
        {
            return await _productoCommand.EditarProducto(productoRequest);
        }

        public async Task<Response> EliminarProducto(int IdProducto)
        {
            return await _productoCommand.EliminarProducto(new ProductoRequest()
            {
                Id = IdProducto
            });
        }
        public async Task<Response<List<Producto>>> ObtenerProductos(int? IdProducto)
        {
            return await _consultarProductoQuery.ObtenerProductos(IdProducto);
        }
    }
}

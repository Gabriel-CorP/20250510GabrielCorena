using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using DAL.Connection;
using Entities.Responses;
using Entities.entities;
using Entities.Requests;

namespace DAL.Commands.Productos
{
    public class ProductoCommand
    {
        private readonly DBConnection _dbConnect;

        public ProductoCommand(DBConnection dbConnect)
        {
            _dbConnect = dbConnect;
        }

        public async Task<Response> InsertarProducto(ProductoRequest request)
        {
            return await EjecutarSPGestionDeProductos(request, "I");
        }

        public async Task<Response> EditarProducto(ProductoRequest request)
        {
            return await EjecutarSPGestionDeProductos(request, "U");
        }

        public async Task<Response> EliminarProducto(ProductoRequest request)
        {
            return await EjecutarSPGestionDeProductos(request, "D");
        }

     
        private async Task<Response> EjecutarSPGestionDeProductos(ProductoRequest request, string Modo)
        {
            Response response = new();

            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@pModo", Modo, DbType.String);
                parameters.Add("@pId", request.Id, DbType.Int64);
                parameters.Add("@pNombre", request.Nombre, DbType.String);
                parameters.Add("@pDescripcion", request.Descripcion, DbType.String);
                parameters.Add("@pPrecioBase", request.PrecioBase, DbType.Decimal);
                parameters.Add("@pPrecioDescuento", request.PrecioDescuento, DbType.Decimal);
                parameters.Add("@pImagen", request.Imagen, DbType.String);
                parameters.Add("@pCodigo", dbType: DbType.String, direction: ParameterDirection.Output, size: 1);
                parameters.Add("@pMensaje", dbType: DbType.String, direction: ParameterDirection.Output, size: 250);

                using var connection = _dbConnect.GetConnection();
                await connection.ExecuteAsync("SpProductos", parameters, commandType: CommandType.StoredProcedure);

                string mensaje = parameters.Get<string>("@pMensaje");
                string codigo = parameters.Get<string>("@pCodigo");

                response.Code = int.Parse(codigo);
                response.Message = mensaje;

            }
            catch (Exception ex)
            {
                response.Code = 0;
                response.Message = $"Error: {ex.Message}";
            }

            return response;
        }

    }
}

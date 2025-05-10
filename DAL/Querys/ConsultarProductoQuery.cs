using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Connection;
using Dapper;
using Entities.entities;
using Entities.Requests;
using Entities.Responses;

namespace DAL.Querys
{
    public class ConsultarProductoQuery
    {

        private readonly DBConnection _dbConnect;

        public ConsultarProductoQuery(DBConnection dbConnect)
        {
            _dbConnect = dbConnect;
        }


        public async Task<Response<List<Producto>>> ObtenerProductos(int? IdProducto)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@pId", IdProducto, DbType.Int64);

                using var connection = _dbConnect.GetConnection();
                var datos = await connection.QueryAsync<Producto>("SpListadoProductos", parameters, commandType: CommandType.StoredProcedure);

                return new Response<List<Producto>>()
                {
                    Code = 1,
                    Message = "OK",
                    Model = datos.ToList()
                };
            }
            catch (Exception ex)
            {
                return new Response<List<Producto>>()
                {
                    Code = 0,
                    Message = ex.Message,
                    Model = []
                };
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;

namespace DAL.Connection
{
    public class DBConnection
    {
        private readonly string _connectionString;

        public DBConnection(string connectionString)
        {
            _connectionString = connectionString;
        }

        public IDbConnection GetConnection()
        {
            return new SqlConnection(_connectionString);
        }
    }
}

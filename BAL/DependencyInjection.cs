using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BAL.UseCases;
using DAL.Commands.Productos ;
using DAL.Connection;
using DAL.Querys;
using Microsoft.Extensions.DependencyInjection;

namespace BAL
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddMyDependencies(this IServiceCollection services, string connection)
        {
            services.AddScoped<ProductoUseCase>();
            services.AddScoped<ProductoCommand>();
            services.AddScoped<ConsultarProductoQuery>();
            services.AddSingleton(new DBConnection(connection));

            return services;
        }
    }
}

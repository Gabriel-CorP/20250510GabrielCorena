using BAL.UseCases;
using DAL.Commands;
using DAL.Commands.Productos;
using DAL.Connection;
using DAL.Querys;
using Microsoft.Extensions.DependencyInjection;
namespace Pruebas
{
    public class Tests
    {
        
        private ServiceProvider _serviceProvider;
        private ProductoUseCase _productos;
      

        [SetUp]
        public void Setup()
        {
            var services = new ServiceCollection();


            services.AddTransient<ProductoCommand>();
            services.AddTransient<ConsultarProductoQuery>();
            services.AddTransient<ProductoUseCase>();
            services.AddTransient<DBConnection>(provider => new DBConnection("Server=(localdb)\\MSSQLLocalDB;Database=ProductosDB;Trusted_Connection=True;MultipleActiveResultSets=true"));

            _serviceProvider = services.BuildServiceProvider();

            _productos = _serviceProvider.GetRequiredService<ProductoUseCase>();
        }

        [Test]
        public async Task CrearProducto()
        {
            var resultado = await _productos.InsertarProducto(new Entities.Requests.ProductoRequest()
            {
                Nombre = "Lavadora",
                Descripcion = "13 pies con tecnologia inverter",
                PrecioBase = 500.23M
            });

            Assert.IsNotNull(resultado);
        }

        [Test]
        public async Task ObtenerProductos()
        {
            var resultado = await _productos.ObtenerProductos(null);
            Assert.IsNotNull(resultado);
        }


        [TearDown]
        public void TearDown()
        {
            _serviceProvider?.Dispose();
        }
    }
}
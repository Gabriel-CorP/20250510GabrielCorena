using BAL;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.FileProviders;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("localdb");
builder.Services.AddMyDependencies(connectionString);

builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 10485760; 
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("cor", app =>
    {
        app.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});


var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "Resources", "Images")),
    RequestPath = "/Images"
});
app.UseCors("cor");
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();

using backend.Data;
using backend.Repositories.CategoryRepo;
using backend.Repositories.TaskSqlRepo;
using backend.Repositories.UserRepo;
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
string connectionString = builder.Configuration.GetConnectionString("DefaultConnection")!;
builder.Services.AddDbContext<TaskDbContext>(connection => connection.UseSqlServer(connectionString));

builder.Services.AddScoped<ITaskSqlRepo, TaskSqlRepo>();
builder.Services.AddScoped<ICategoryRepo, CategoryRepo>();
builder.Services.AddScoped<IUserRepo, UserRepo>();




var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(x => x
.AllowAnyOrigin()
.AllowAnyMethod()
.AllowAnyHeader());
app.UseAuthorization();
app.UseAuthorization();

app.MapControllers();

app.Run();

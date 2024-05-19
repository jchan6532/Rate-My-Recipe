using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Services.UserService;

var builder = WebApplication.CreateBuilder(args);
{
    // Add services to the container.
    builder.Services.AddDbContext<IDbContext, AppDataContext>(options => 
        options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultParam")));
    builder.Services.AddTransient<IUserAuthService, UserAuthService>();
    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
    builder.Services.AddCors(options => {
        options.AddPolicy("AllowFrontEnd", 
        builder => {
            builder.WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
    });
}

var app = builder.Build();
{
    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();

    app.UseCors("AllowFrontEnd");

    app.UseAuthorization();

    app.MapControllers();

    app.Run();
}

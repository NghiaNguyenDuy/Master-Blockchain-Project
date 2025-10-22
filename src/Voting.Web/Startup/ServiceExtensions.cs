using Microsoft.EntityFrameworkCore;
using Voting.Application.Interfaces;
using Voting.Application.Services;
using Voting.Core.Configuration;
using Voting.Infrastructure;
using Voting.Infrastructure.Repositories;

namespace Voting.Web.Startup;

public static class ServiceExtensions
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        var databaseSettings = configuration
           .GetSection("DatabaseSettings")
           .Get<DatabaseSettings>();
        if (databaseSettings == null || string.IsNullOrWhiteSpace(databaseSettings.DefaultConnection))
        {
            throw new ArgumentNullException(nameof(databaseSettings.DefaultConnection),
                "Database connection string is not configured.");
        }

        services.AddDbContext<VotingDbContext>(options =>
        {
            options.UseNpgsql(databaseSettings.DefaultConnection,
                builder =>
                    builder.MigrationsAssembly(typeof(VotingDbContext).Assembly.FullName));
            //options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
            // Enable sensitive logging only in Development
            if (configuration.GetValue<string>("ASPNETCORE_ENVIRONMENT") == "Development")
            {
                options.EnableSensitiveDataLogging();
            }
        });

        services.ConfigureApplicationCookie(options =>
        {
            options.LoginPath = "/Auth/Login";
            options.Cookie.Name = "VotingApp.Cookie";
            options.AccessDeniedPath = new PathString("/Auth/Denied");
            options.ExpireTimeSpan = TimeSpan.FromDays(30);
            options.LogoutPath = new PathString("/Auth/Logout");
        });

        services.AddSingleton<AppConfiguration>();

        services.AddScoped<VotingDbContextMigrate>();
        services.AddScoped<VoteRepository>();
        services.AddScoped<ProposalRepostiory>();
        services.AddScoped<UserRepository>();

        services.AddScoped<IUnitOfWork, UnitOfWork>();

        services.AddScoped<IBlockchainService, BlockchainService>();
        services.AddScoped<IAuthService, AuthService>();


        return services;
    }
}

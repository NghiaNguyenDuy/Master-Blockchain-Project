
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace Voting.Infrastructure;

public class VotingDbContextMigrate
{
    private readonly ILogger _logger;
    private readonly VotingDbContext _context;

    public VotingDbContextMigrate(ILogger logger, VotingDbContext context)
    {
        _logger = logger;
        _context = context;
    }
    public async Task InitialiseAsync()
    {
        try
        {
            if (_context.Database.IsNpgsql())
            {
                await _context.Database.MigrateAsync();
            }
        }
        catch (Exception ex)
        {
            _logger.Error(ex, "An error occurred while initialising the database.");
            throw;
        }
    }
}

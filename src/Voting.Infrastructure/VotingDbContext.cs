using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Voting.Core.Models;

namespace Voting.Infrastructure;

public class VotingDbContext: DbContext
{
    public VotingDbContext(DbContextOptions<VotingDbContext> options) : base(options) { }

    public DbSet<Proposal> Proposals { get; set; }
    public DbSet<Vote> Votes { get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}

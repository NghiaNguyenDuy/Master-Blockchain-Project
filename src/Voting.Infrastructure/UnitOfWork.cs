using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Voting.Infrastructure.Repositories;

namespace Voting.Infrastructure;

public class UnitOfWork : IUnitOfWork
{
    private readonly VotingDbContext _dbContext;
    public UnitOfWork(
        VotingDbContext dbContext,
        VoteRepository voteRepository,
        ProposalRepostiory proposalRepostiory)
    {
        _dbContext = dbContext;
        VoteRepository = voteRepository;
        ProposalRepostiory = proposalRepostiory;
    }

    public VoteRepository VoteRepository { get; set; }
    public ProposalRepostiory ProposalRepostiory { get; set; }

    public async Task<int> SaveChangesAsync()
    {
        return await _dbContext.SaveChangesAsync();
    }
}

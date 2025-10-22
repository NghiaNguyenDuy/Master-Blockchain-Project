using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Voting.Infrastructure.Repositories;

namespace Voting.Infrastructure;

public interface IUnitOfWork
{
    VoteRepository VoteRepository { get; set; }
    ProposalRepostiory ProposalRepostiory { get; set; }

    Task<int> SaveChangesAsync();
}

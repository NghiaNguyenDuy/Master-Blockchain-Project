using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;
using Voting.Core.Models;

namespace Voting.Core.Interfaces;

public interface IBlockchainService
{
    Task<List<Proposal>> GetAllProposalsAsync();
    Task<string> VoteAsync(BigInteger proposalId, bool support, string privateKey);
}

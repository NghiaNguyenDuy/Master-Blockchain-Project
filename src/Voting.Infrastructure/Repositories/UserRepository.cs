using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Voting.Core.Models;

namespace Voting.Infrastructure.Repositories;

public class UserRepository (VotingDbContext dbContext)
{
    public User FindByUsername(string userName)
    {
        return dbContext.Users.FirstOrDefault(u => u.Username == userName);
    }
}

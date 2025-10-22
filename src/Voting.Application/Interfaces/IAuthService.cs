using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Voting.Application.Dtos;

namespace Voting.Application.Interfaces;

public interface IAuthService
{
    Task LoginAsync(LoginDto loginDto);
}

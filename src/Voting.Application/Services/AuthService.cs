
using Voting.Application.Dtos;
using Voting.Application.Interfaces;
using Voting.Infrastructure.Repositories;

namespace Voting.Application.Services;

public class AuthService(UserRepository userRepository) : IAuthService
{
    
    public async Task LoginAsync(LoginDto loginDto)
    {
        var user = userRepository.FindByUsername(loginDto.Username);
        
        throw new NotImplementedException();
    }
}

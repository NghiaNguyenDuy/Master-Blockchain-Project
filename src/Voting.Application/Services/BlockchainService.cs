using Microsoft.Extensions.Configuration;
using Nethereum.Contracts;
using Nethereum.Web3;
using Nethereum.Web3.Accounts;
using System.Numerics;
using Voting.Core.Configuration;
using Voting.Core.Interfaces;
using Voting.Core.Models;

namespace Voting.Application.Services;

public class BlockchainService : IBlockchainService
{
    private readonly string _rpcUrl;
    private readonly string _abi;
    private readonly string _contractAddress;

    // read-only Web3 + contract for calls
    private readonly Web3 _web3Read;
    private readonly Contract _contractRead;

    public BlockchainService(AppConfiguration appConfiguration)
    {
        _rpcUrl = appConfiguration.BlockchainSettings.RpcUrl;
        _abi = appConfiguration.BlockchainSettings.AbiPath;
        _contractAddress = appConfiguration.BlockchainSettings.ContractAddress;

        _web3Read = new Web3(_rpcUrl);                       // read-only client
        _contractRead = _web3Read.Eth.GetContract(_abi, _contractAddress);
    }

    public async Task<List<Proposal>> GetAllProposalsAsync()
    {
        var fn = _contractRead.GetFunction("getAllProposals");
        // If this throws due to tuple deserialization, switch to a DTO with [FunctionOutput] attributes,
        // or use: var result = await fn.CallAsync<dynamic>();
        var result = await fn.CallDeserializingToObjectAsync<List<Proposal>>();
        return result;
    }

    public async Task<string> VoteAsync(BigInteger proposalId, bool support, string privateKey)
    {
        // If you're on Sepolia, set chainId to 11155111 to avoid EIP-155 errors:
        // var account = new Account(privateKey, 11155111);
        var account = new Account(privateKey);

        // Create a signer-bound Web3 using the SAME RPC URL (not the old client property)
        var web3WithAccount = new Web3(account, _rpcUrl);

        // Rebuild the contract with the signer
        var contractWithSigner = web3WithAccount.Eth.GetContract(_abi, _contractAddress);

        var fn = contractWithSigner.GetFunction("castVote");
        // Gas will be estimated automatically; pass overrides if you need
        var txHash = await fn.SendTransactionAsync(account.Address, new object[] { proposalId, support });
        return txHash;
    }
}

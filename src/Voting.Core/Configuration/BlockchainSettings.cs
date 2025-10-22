using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Voting.Core.Configuration;

public class BlockchainSettings
{
    public string RpcUrl { get; set; }
    public string ContractAddress { get; set; }
    public string AbiPath { get; set; }

    
}

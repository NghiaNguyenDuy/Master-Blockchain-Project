using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Voting.Core.Configuration;

public class AppConfiguration
{
    private readonly IConfiguration _configuration;
    public AppConfiguration(IConfiguration configuration, IWebHostEnvironment webHostEnvironment)
    {
        DatabaseSettings = configuration.GetSection("DatabaseSettings").Get<DatabaseSettings>();
        BlockchainSettings = configuration.GetSection("BlockchainSettings").Get<BlockchainSettings>();
    }

    public DatabaseSettings DatabaseSettings { get; set; }
    //BlockchainSettings
    public BlockchainSettings BlockchainSettings { get; set; }
}

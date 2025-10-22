using Microsoft.Extensions.Hosting;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Voting.Core.Logging;

public static class SeriLogger
{
    public static Action<HostBuilderContext, LoggerConfiguration> Configure =>
        (context, configuration) =>
        {
            var applicationName = context.HostingEnvironment.ApplicationName?.ToLower().Replace(".", "-");
            var environmentName = context.HostingEnvironment.EnvironmentName ?? "Development";

            configuration
                .WriteTo.Debug()
                .WriteTo.Console(outputTemplate:
                    "[{Timestamp:HH:mm:ss} {Level}] {SourceContext}{NewLine}{Message:lj}{NewLine}{Exception}{NewLine}")
                .WriteTo.File(
                    path: "logs/colx-allocation-.log",
                    rollingInterval: RollingInterval.Day,        // daily files
                    retainedFileCountLimit: 30,                  // keep last 30 days (optional)
                    rollOnFileSizeLimit: true,                   // start a new file if too large (optional)
                    fileSizeLimitBytes: 20 * 1024 * 1024,        //20MB per file,  null == unlimited size per day (optional)
                    shared: true                                 // helpful in Docker/VS hot-reload scenarios
                    )
                //.WriteTo.RollingFile("colx-allocation-{Date}.log", shared: true)
                .Enrich.FromLogContext()
                .Enrich.WithMachineName()
                .Enrich.WithProperty("Environment", environmentName)
                .Enrich.WithProperty("Application", applicationName)
                .ReadFrom.Configuration(context.Configuration);
        };
}

using Microsoft.AspNetCore.Mvc;
using Voting.Application.Interfaces;
using Voting.Core.Interfaces;

namespace Voting.Web.Controllers;

public class ProposalController : Controller
{
    private readonly IBlockchainService _chain;

    public ProposalController(IBlockchainService chain) => _chain = chain;

    public async Task<IActionResult> Index()
    {
        var proposals = await _chain.GetAllProposalsAsync();
        return View(proposals);
    }

    public async Task<IActionResult> Details(long id)
    {
        var proposals = await _chain.GetAllProposalsAsync();
        var p = proposals.FirstOrDefault(x => x.Id == id);
        return View(p);
    }
}

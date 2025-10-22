using Microsoft.AspNetCore.Mvc;

namespace Voting.Web.Controllers;

public class VoteController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}

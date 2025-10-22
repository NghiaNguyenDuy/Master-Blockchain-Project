using Microsoft.AspNetCore.Mvc;
using Voting.Application.Dtos;
using Voting.Application.Interfaces;


namespace Voting.Web.Controllers;

public class AuthController (IAuthService authService) : Controller
{
    public IActionResult Login()
    {
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> Login([FromForm] LoginDto loginDto)
    {
        await authService.LoginAsync(loginDto);
        return RedirectPermanent("/");
    }

    public IActionResult Logout()
    {
        return RedirectToActionPermanent("Login");
    }
}

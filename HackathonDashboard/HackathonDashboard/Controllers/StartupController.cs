using Microsoft.Owin;
using Owin;
using System.Web.Mvc;

[assembly: OwinStartup(typeof(HackathonDashboard.Controllers.StartupController))]
namespace HackathonDashboard.Controllers
{
    public class StartupController : Controller
    {
        public void Configuration(IAppBuilder app)
        {
            // Any connection or hub wire up and configuration should go here
            app.MapSignalR();
        }
    }
}
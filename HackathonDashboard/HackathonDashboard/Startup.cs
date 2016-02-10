using Owin;
using Microsoft.Owin;


[assembly: OwinStartup(typeof(HackathonDashboard.Startup))]
namespace HackathonDashboard
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // Any connection or hub wire up and configuration should go here
            app.MapSignalR();
        }
    }
}
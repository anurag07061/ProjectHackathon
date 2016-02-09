using System;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Web.Mvc;

namespace HackathonDashboard.Controllers
{
    public class ChatHub : Hub
    {
        public void Send(String name, string message)
        {
            // Call the broadcastMessage method to update clients.
            Clients.All.broadcastMessage(name, message);
        }
    }
}
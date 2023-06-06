using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Inv.WebUI
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
        

            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                    defaults: new { controller = "Home", action = "AllPagesIndex", id = UrlParameter.Optional } 
                    //defaults: new { controller = "Home", action = "Home_New_Index", id = UrlParameter.Optional } 
            );
        }
    }
}

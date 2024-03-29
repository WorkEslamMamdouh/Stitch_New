﻿using Inv.WebUI.Filter;
using System.Web.Mvc;

namespace Inv.WebUI.Controllers
{

    [AuthorizeUserAttribute()]
    public class HomeController : Controller
    {



        //    GET: Home
        public ActionResult HomeIndex()
        {

            //Session["ErrorUrl"] = "";//Url.Action("LoginIndex", "Login");
            //SessionManager.SessionRecord.CompanyNameAr = "";

            //Session["SystemProperties"] = SessionManager.SessionRecord;

            return View("HomeIndex");
        }  
        public ActionResult AllPagesIndex()
        {
             
            return View("AllPagesIndex");
        }

        public ActionResult DownladIndex(string D, string N)
        { 
            return View("DownladIndex");
        }

        public ActionResult Admin()
        {
            return View();
        }

        public ActionResult AdminHome()
        {
            return View();
        }
  
        public ActionResult HomeIndexPackage()
        {


            return View("HomeIndex");
        }

        //public JsonResult GetSystemProperties()
        //{
        //    SessionRecord jsonObject = (SessionRecord)Session["SystemProperties"];
        //    string data = Newtonsoft.Json.JsonConvert.SerializeObject(jsonObject, Newtonsoft.Json.Formatting.Indented);
        //    return Shared.JsonObject(data);
        //}

        public ActionResult Logout()
        {

            //SessionManager.Me = null;
            //SessionManager.ModelCount = 0;
            //SessionManager.PageIndex = 0;
            //SessionManager.SessionRecord = null;

            return RedirectToAction("Loginindex", "Login");
        }

        public ViewResult Help()
        {

            return View();
        }


        public ActionResult OpenView(string ModuleCode)
        {


            if (ModuleCode == "ImagPopUp")
            {
                return PartialView("~/Views/Shared/ImagePopup.cshtml");

            }
            if (ModuleCode == "Messages_screen")
            {
                return PartialView("~/Views/Shared/Messages_screen.cshtml");
            }
            if (ModuleCode == "ImagePopupiupload")
            {
                return PartialView("~/Views/Shared/ImagePopupiupload.cshtml");
            }

            return PartialView("");

        }

        #region Open Pages 
 
        public ActionResult QuotationIndex()
        {
            return View("~/Views/Quotation/QuotationIndex.cshtml");
        }

        public ActionResult QuotationViewIndex()
        {
            return View("~/Views/Quotation/QuotationViewIndex.cshtml");
        }

        public ActionResult ProfileIndex()
        {
            return View("~/Views/Customer/ProfileIndex.cshtml");
        }       
        public ActionResult NotesIndex()
        {
            return View("~/Views/Customer/NotesIndex.cshtml");
        }

        public ActionResult Page_Get_Views()
        {
            return View("~/Views/Customer/Get_ViewsIndex.cshtml");
        }


        public ActionResult Page_Money_Wallet()
        {
            return View("~/Views/Customer/Money_WalletIndex.cshtml");
        }
        public ActionResult TestIndex()
        {
            return View("~/Views/Customer/TestIndex.cshtml");
        }    
        
        public ActionResult Home_New_Index()
        {
            return View("~/Views/Customer/HomeIndex.cshtml");
        }

        public ActionResult UsersIndex()
        {
            return View("~/Views/USERS/USERSIndex.cshtml");
        }  
        
  

        public ActionResult ReportsPopup()
        {
            return View("~/Views/Partial/ReportsPopup.cshtml");
        }

        #endregion  Open Pages 

    }
}
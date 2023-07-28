using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace Inv.WebUI.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {



            bundles.Add(new StyleBundle("~/Bundles/AppStyle1")
                .Include(
                 "~/NewStyle/css/bootstrap.min.css",
                 "~/NewStyle/css/font-awesome.min.css",
                 "~/NewStyle/css/adminpro-custon-icon.css",
                 "~/NewStyle/css/meanmenu.min.css",
                 "~/NewStyle/css/jquery.mCustomScrollbar.min.css",
                  "~/NewStyle/css/animate.css",
                  "~/NewStyle/css/summernote.css",
                  "~/NewStyle/css/data-table/bootstrap-table.css",
                  "~/NewStyle/css/data-table/bootstrap-editable.css",
                  "~/NewStyle/css/c3.min.css",
                  "~/NewStyle/style.css",
                  "~/NewStyle/animate.min.css"
                   //"~/NewStyle/LodBut/font-awesome.min.css" 
                ).Include("~/NewStyle/LodBut/font-awesome.min.css"));




            bundles.Add(new ScriptBundle("~/Bundles/AppScript1")
            .Include(
            "~/NewStyle/js/vendor/modernizr-2.8.3.min.js",
            "~/Scripts/jquery-3.1.1.min.js",
            "~/NewStyle/js/vendor/jquery-1.11.3.min.js",
            "~/NewStyle/js/data-table/bootstrap-table.js",
            "~/NewStyle/js/data-table/tableExport.js",
            "~/NewStyle/js/data-table/data-table-active.js",
            "~/NewStyle/js/data-table/bootstrap-table-resizable.js",
            "~/NewStyle/js/data-table/colResizable-1.5.source.js",
            "~/NewStyle/js/data-table/bootstrap-table-export.js",
            "~/Scripts/DataTables/jquery.dataTables.min.js",
             "~/Scripts/DataTables/dataTables.bootstrap.js",
             "~/ClientApp/Entities.js",
            "~/ClientApp/App.js",
           "~/ClientApp/SystemTools.js",
           "~/ClientApp/Shared.js",
           "~/ClientApp/DataTable.js",
            "~/ClientApp/EslamGrid.js",
            "~/NewStyle/LodBut/Loder.js",
            "~/Scripts/jsgrid/jsgrid.js",
            "~/Scripts/jsgrid/jsgrid.min.js",
            "~/ClientApp/IgGrid.js",
            "~/ClientApp/JsGrid.js",
            "~/ClientApp/MessageBox.js"
            ));








            bundles.Add(new ScriptBundle("~/Bundles/AppScript2")
             .Include(
               "~/js/my_js.js",
               "~/NewStyle/js/bootstrap.min.js",
               "~/NewStyle/js/jquery.meanmenu.js",
               "~/NewStyle/js/jquery.mCustomScrollbar.concat.min.js",
               "~/NewStyle/js/jquery.sticky.js",
               "~/NewStyle/js/jquery.scrollUp.min.js",
               "~/NewStyle/js/counterup/jquery.counterup.min.js",
               "~/NewStyle/js/counterup/waypoints.min.js",
               //"~/NewStyle/js/dropzone.js",
               "~/NewStyle/js/multiple-email/multiple-email-active.js",
               "~/NewStyle/js/summernote.min.js",
               "~/NewStyle/js/summernote-active.js"));



        }
    }
}
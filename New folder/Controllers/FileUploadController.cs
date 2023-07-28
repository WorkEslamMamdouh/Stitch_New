using System.IO;
using System.Web;
using System.Web.Mvc;

public class FileUploadController : Controller
{
    [HttpPost]
    public ActionResult Upload(HttpPostedFileBase fileUpload)
    {
        if (fileUpload != null && fileUpload.ContentLength > 0)
        {
            string fileName = Path.GetFileName(fileUpload.FileName);
            string serverPath = Server.MapPath("/SavePath/Dropbox/FileUpload/"); // Specify the server location to save the file
            //string serverPath =   System.Web.HttpContext.Current.Server.UrlPathEncode(@"/SavePath/Dropbox/FileUpload/");

            // Create the directory if it doesn't exist
            Directory.CreateDirectory(serverPath);

            string filePath = Path.Combine(serverPath, fileName);
            fileUpload.SaveAs(filePath);
        }

        return RedirectToAction("Index", "Home"); // Redirect to another page after successful upload
    }
}

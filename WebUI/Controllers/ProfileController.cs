
using Inv.WebUI.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Configuration;
using System.Web.Mvc;
using System.Text;
using System.Data;
using System.Dynamic;
using System.Data.SqlClient;
using System;
using System.Reflection;
using Newtonsoft.Json.Linq;
using System.Globalization;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
using NPOI.SS.Formula.Functions;
using System.Web.Script.Serialization;
using System.Web;
using System.Collections;

namespace Inv.WebUI.Controllers
{//eslam 1 dec 2020
    public class ProfileController : Controller
    {

        public class DataAll
        {
            public int ID { get; set; }
            public string TrDate { get; set; }
            public string Type { get; set; }
            public string Title { get; set; }
            public string Remars { get; set; }
            public decimal Amount { get; set; }
        }

        public class Wallet_Data
        {
            public int ID { get; set; }
            public string TrDate { get; set; }
            public string Type { get; set; }
            public string TypeTo { get; set; }
            public string Title { get; set; }
            public string Remars { get; set; }
            public decimal Amount { get; set; }
            public decimal Prc { get; set; } 
            public string DueDate { get; set; } 
            public string TypePeriod { get; set; } 
            public string CUSTOM1 { get; set; }
            public string CUSTOM2 { get; set; }
            public string CUSTOM3 { get; set; }
            public string CUSTOM4 { get; set; }
        }


        public class Wallet_Definitions
        {
            public int ID { get; set; } 
            public int Serial { get; set; } 
            public string Type { get; set; }
            public string Remars { get; set; } 
            public string NameBal { get; set; }
            public decimal Amount { get; set; }
            public string CUSTOM1 { get; set; }
            public string CUSTOM2 { get; set; }
            public string CUSTOM3 { get; set; }
            public string CUSTOM4 { get; set; }
            public string CUSTOM5 { get; set; }
        }
        
        public class Wallet_HedDef
        { 
            public string CUSTOM1 { get; set; }
            public string CUSTOM2 { get; set; }
            public string CUSTOM3 { get; set; }
            public string CUSTOM4 { get; set; }
            public string CUSTOM5 { get; set; }
            public string CUSTOM6 { get; set; }
            public string CUSTOM7 { get; set; }
            public string CUSTOM8 { get; set; }
            public string CUSTOM9 { get; set; }
        }

         

        public class Settings_Users
        {
            public int ID { get; set; }
            public string Type { get; set; }
            public string NameUesr { get; set; }
            public string PassUesr { get; set; }
            public string Title { get; set; }
            public string Remars { get; set; }
            public int Status { get; set; }
        }



        public class DataDetails
        {
            public int ID { get; set; }
            public int MasterID { get; set; }
            public int Ser { get; set; }
            public string Desc { get; set; }
            public string Remark { get; set; }
            public string Url { get; set; }
            public string Ex_Field { get; set; }
            public string StatusFlag { get; set; }
        }

        public class DataNotes
        {
            public int ID { get; set; }
            public int MasterID { get; set; }
            public string Remark { get; set; }
            public string Ex_Field { get; set; }
        }
        
        public class All_Definitions
        { 
            public string Wallet_HedDef { get; set; }
            public string Wallet_Definitions { get; set; }
        }

 

        public class Send_Data
        {
            public int ID { get; set; }
            public string Model { get; set; }
            public string ModelDetails { get; set; }
            public string Name_Txt_Master { get; set; }
            public string Name_Txt_Detail { get; set; }
            public string TypeDataSouce { get; set; }
            public string StatusFlag { get; set; }
        }


        public List<T> GetListClass(string jsonData, string NameClass)
        {
            Type type = AppDomain.CurrentDomain.GetAssemblies()
                     .SelectMany(x => x.GetTypes())
                     .FirstOrDefault(x => x.Name == "" + NameClass + "");

            object NewObj = JsonConvert.DeserializeObject("{}", type,
            new JsonSerializerSettings() { TypeNameHandling = TypeNameHandling.Objects });

            var genericListType = typeof(List<>).MakeGenericType(new[] { NewObj.GetType() });

            //var ObjClass = JsonConvert.DeserializeObject(jsonData, genericListType);

            var obj = JsonConvert.DeserializeObject<List<T>>(jsonData);
            return obj.ToList();

            //return ObjClass;
        }

        public JsonResult GetPathFileUpload()
        {

            string Path = Server.MapPath("/SavePath/Dropbox/FileUpload/");


            return Json(Path, JsonRequestBehavior.AllowGet);

        }

        public string GetData(string Name_txt)
        {

            string Str = Server.MapPath("/SavePath/Dropbox/");

            string jsonData = "";

            try
            {

                jsonData = System.IO.File.ReadAllText(System.Web.HttpContext.Current.Server.UrlPathEncode(Str + "" + Name_txt + ".txt"));
            }
            catch (Exception)
            {

                return "Error";
            }


            string base64Encoded = jsonData;
            string base64Decoded;
            byte[] data = System.Convert.FromBase64String(base64Encoded);
            base64Decoded = Encoding.UTF8.GetString(data);


            return base64Decoded;

        }

        public void SetData(string Name_txt, string Model)
        {

            string originalString = Model;
            byte[] bytes = Encoding.UTF8.GetBytes(originalString);
            string base64EncodedString = Convert.ToBase64String(bytes);

            string Str = Server.MapPath("/SavePath/Dropbox/");

            System.IO.File.WriteAllText(System.Web.HttpContext.Current.Server.UrlPathEncode(Str + "" + Name_txt + ".txt"), base64EncodedString);


        }

        public JsonResult Get_Data(string Name_txt)
        {


            var jsonData = GetData(Name_txt);

            return Json(jsonData, JsonRequestBehavior.AllowGet);

        }

        public JsonResult Get_Two_Data(string Name_txt1 , string Name_txt2)
        {


            var jsonData1 = GetData(Name_txt1);
            var jsonData2 = GetData(Name_txt2);

            All_Definitions Data = new All_Definitions();

            Data.Wallet_HedDef = jsonData1;
            Data.Wallet_Definitions = jsonData2;

            var All_jsonData = JsonConvert.SerializeObject(Data);

            return Json(All_jsonData, JsonRequestBehavior.AllowGet);

        }


        public JsonResult Get_All_Notes(string Name_txt)
        {

            var List_Notes = new List<DataNotes>();

            for (int i = 0; i < 1000; i++)
            {
                var Model_Notes = new DataNotes();

                try
                {
                    var jsonData = GetData(Name_txt + i);
                    if (jsonData == "Error")
                    {
                        break;
                    }
                    Model_Notes.ID = i;
                    Model_Notes.Remark = jsonData;
                    List_Notes.Add(Model_Notes);
                }
                catch
                {

                    break;
                }

            }

            var All_Notes = JsonConvert.SerializeObject(List_Notes);

            return Json(All_Notes, JsonRequestBehavior.AllowGet);

        }

        public ActionResult Update_DataSetting(string Data)
        {

            var rp = JsonConvert.DeserializeObject<Send_Data>(Data);

            //******************************************Master*************************

            var jsonData = GetData(rp.Name_Txt_Master);

            List<Settings_Users> Data_List = JsonConvert.DeserializeObject<List<Settings_Users>>(jsonData);

            var NewList = Data_List.Where(x => x.ID != rp.ID).ToList();

            if (rp.StatusFlag != "d")
            {
                Settings_Users Data_Obj = JsonConvert.DeserializeObject<Settings_Users>(rp.Model);

                NewList.Add(Data_Obj);
            }

            var New_Data = JsonConvert.SerializeObject(NewList);

            SetData(rp.Name_Txt_Master, New_Data);

            //******************************************Get_Master*************************

            var json = GetData(rp.Name_Txt_Master);

            return Json(json, JsonRequestBehavior.AllowGet);

        }

        public ActionResult Update_Data(string Data)
        {

            var rp = JsonConvert.DeserializeObject<Send_Data>(Data);

            //******************************************Master*************************

            var jsonData = GetData(rp.Name_Txt_Master);

            List<DataAll> NewList = new List<DataAll>();
            try
            {
            List<DataAll> Data_List = JsonConvert.DeserializeObject<List<DataAll>>(jsonData);
                NewList = Data_List.Where(x => x.ID != rp.ID).ToList();

            }
            catch (Exception Ex)
            {

            }

            if (rp.StatusFlag != "d")
            {
                DataAll Data_Obj = JsonConvert.DeserializeObject<DataAll>(rp.Model);

                NewList.Add(Data_Obj);
            }

            var New_Data = JsonConvert.SerializeObject(NewList);

            SetData(rp.Name_Txt_Master, New_Data);

            //******************************************Detail*************************

            var jsonDataDetail = GetData(rp.Name_Txt_Detail);


            List<DataDetails> NewDetail_List = new List<DataDetails>();
            try
            {
            List<DataDetails> Detail_Data_List = JsonConvert.DeserializeObject<List<DataDetails>>(jsonDataDetail);
                NewDetail_List = Detail_Data_List.Where(x => x.MasterID != rp.ID).ToList();
            }
            catch (Exception Ex)
            {

            }
            if (rp.ModelDetails != "[]" && rp.StatusFlag != "d")
            {
                List<DataDetails> DetailsData_Obj = JsonConvert.DeserializeObject<List<DataDetails>>(rp.ModelDetails);

                foreach (var item in DetailsData_Obj)
                {
                    NewDetail_List.Add(item);
                }
            }

            var NewDetail_Data = JsonConvert.SerializeObject(NewDetail_List);

            SetData(rp.Name_Txt_Detail, NewDetail_Data);


            //******************************************Get_Master*************************

            var json = GetData(rp.Name_Txt_Master);

            return Json(json, JsonRequestBehavior.AllowGet);

        }



        public ActionResult Update_Data_Wallet_Def(string Data)
        {

            var rp = JsonConvert.DeserializeObject<Send_Data>(Data);

            //******************************************Master*************************
              
            Wallet_HedDef Data_Obj = JsonConvert.DeserializeObject<Wallet_HedDef>(rp.Model); 

            var New_Data = JsonConvert.SerializeObject(Data_Obj);

            SetData(rp.Name_Txt_Master, New_Data);



            //******************************************Detail*************************

            var jsonDataDetail = GetData(rp.Name_Txt_Detail);


            List<Wallet_Definitions> NewDetail_List = new List<Wallet_Definitions>();
        

            if (rp.ModelDetails != "[]" && rp.StatusFlag != "d")
            {
                List<Wallet_Definitions> DetailsData_Obj = JsonConvert.DeserializeObject<List<Wallet_Definitions>>(rp.ModelDetails);

                foreach (var item in DetailsData_Obj)
                {
                    NewDetail_List.Add(item);
                }
            }

            var NewDetail_Data = JsonConvert.SerializeObject(NewDetail_List);

            SetData(rp.Name_Txt_Detail, NewDetail_Data);


            //******************************************Get_Detail*************************

            var json = GetData(rp.Name_Txt_Detail);

            return Json(json, JsonRequestBehavior.AllowGet);

        }



        public ActionResult Add_Trans(string Data)
        {

            var rp = JsonConvert.DeserializeObject<Send_Data>(Data);

            //******************************************Master*************************

            var jsonData = GetData(rp.Name_Txt_Master);


            List<Wallet_Data> NewList = new List<Wallet_Data>();
            try
            {
            List<Wallet_Data> Data_List = JsonConvert.DeserializeObject<List<Wallet_Data>>(jsonData);
                NewList = Data_List.Where(x => x.ID != rp.ID).ToList();

            }
            catch (Exception Ex)
            {

            }

            if (rp.StatusFlag != "d")
            {
                Wallet_Data Data_Obj = JsonConvert.DeserializeObject<Wallet_Data>(rp.Model);

                NewList.Add(Data_Obj);
            }

            var New_Data = JsonConvert.SerializeObject(NewList);

            SetData(rp.Name_Txt_Master, New_Data);

            //******************************************Get_Master*************************

            var json = GetData(rp.Name_Txt_Master);

            return Json(json, JsonRequestBehavior.AllowGet);
        }



        public ActionResult Set_Data_Notes(string Data)
        {

            var rp = JsonConvert.DeserializeObject<Send_Data>(Data);

            //******************************************Master*************************

            SetData(rp.Name_Txt_Master, rp.Model);


            return Json("", JsonRequestBehavior.AllowGet);
        }




    }
}
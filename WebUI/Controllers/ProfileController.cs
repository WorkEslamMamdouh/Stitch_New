
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

         var  obj = JsonConvert.DeserializeObject<List<T>>(jsonData);
            return obj.ToList();

            //return ObjClass;
        }

        public string GetData(string Name_txt)
        {

            string Str = Server.MapPath("/SavePath/");

            var jsonData = System.IO.File.ReadAllText(System.Web.HttpContext.Current.Server.UrlPathEncode(Str + "" + Name_txt + ".txt"));

            return jsonData;

        }

        public void SetData(string Name_txt, string Model)
        {

            string Str = Server.MapPath("/SavePath/");

            System.IO.File.WriteAllText(System.Web.HttpContext.Current.Server.UrlPathEncode(Str + "" + Name_txt + ".txt"), Model);


        }

        public JsonResult Get_Data(string Name_txt)
        {


            var jsonData = GetData(Name_txt);

            return Json(jsonData, JsonRequestBehavior.AllowGet);

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

        public JsonResult Update_Data(string Data)
        { 

            var rp = JsonConvert.DeserializeObject<Send_Data>(Data);

            //******************************************Master*************************

            var jsonData = GetData(rp.Name_Txt_Master);
             
            List<DataAll> Data_List = JsonConvert.DeserializeObject<List<DataAll>>(jsonData);

            var NewList = Data_List.Where(x => x.ID != rp.ID).ToList();

            if (rp.StatusFlag != "d")
            {
                DataAll Data_Obj = JsonConvert.DeserializeObject<DataAll>(rp.Model);

                NewList.Add(Data_Obj);
            }
           
            var New_Data = JsonConvert.SerializeObject(NewList);

            SetData(rp.Name_Txt_Master, New_Data);

            //******************************************Detail*************************
             
            var jsonDataDetail = GetData(rp.Name_Txt_Detail);

            List<DataDetails>  Detail_Data_List = JsonConvert.DeserializeObject<List<DataDetails>>(jsonDataDetail);

            var NewDetail_List = Detail_Data_List.Where(x => x.MasterID != rp.ID).ToList();

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

            var json  = GetData(rp.Name_Txt_Master);

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

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

namespace Inv.WebUI.Controllers
{//eslam 1 dec 2020
    public class GeneralSQLController : Controller
    {

        public class ModelSql
        {
            public SqlTables sqlTables = new SqlTables();
            public SqlEnt sqlEnt = new SqlEnt();
            public object Model = new object();
        }
        public class ClassName
        {
            public Dictionary<string, object> Dictionary { get; set; }
        }

        SqlEntities db = new SqlEntities();
        dynamic newobj = new ExpandoObject();



        //public string Find(string TableName, string Condition, string Columns, string orderBy)
        //{
        //    SqlConnection connection = new SqlConnection(db.Database.Connection.ConnectionString);
        //    connection.Open();

        //    var pageSize = db.G_SearchForm.FirstOrDefault(f => f.DataSourceName == TableName).PageSize;

        //    string cond = Condition;

        //    SqlCommand command = new SqlCommand();
        //    command.Connection = connection;
        //    if (pageSize == 0)
        //        command.CommandText = "Select " + Columns + " From " + TableName + cond + " Order By " + orderBy;
        //    else
        //        command.CommandText = "Select Top " + pageSize.ToString() + " " + Columns + " From " + TableName + cond + " Order By " + orderBy;

        //    //if (pageSize == 0)
        //    //    command.CommandText = "Select RowIndex," + Columns + " From (Select Row_Number() Over (Order By (Select 0)) As RowIndex, * From " + TableName + ") t2" + cond + " Order By " + orderBy;
        //    //else
        //    //    command.CommandText = "Select Top " + pageSize.ToString() + " RowIndex," + Columns + " From (Select Row_Number() Over (Order By (Select 0)) As RowIndex, * From " + TableName + ") t2" + cond + " Order By " + orderBy;

        //    DataTable table = new DataTable();
        //    table.Load(command.ExecuteReader());
        //    connection.Close();
        //    connection.Dispose();
        //    command.Dispose();
        //    var jsonResult = JsonConvert.SerializeObject(table);

        //    return jsonResult;

        //}


        private struct ColumnObjectStruct
        {
            public string headerText { get; set; }
            public bool hidden { get; set; }
            public string key { get; set; }
            public string dataType { get; set; }
            public string width { get; set; }
            public bool filterable { get; set; }
        }


        public JsonResult GetNameData(SqlEnt rp)
        {
            //ModelSql rp = JsonConvert.DeserializeObject<ModelSql>(rp);

            db.Server = rp.Server;
            //db.Database = rp.Database;
            db.User = rp.User;
            db.Password = rp.Password;
            //string NameTable = rp.name;

            StringBuilder models = new StringBuilder();
            DataTable tbl = new DataTable();

            List<string> Liset_NameData = new List<string>();

            using (SqlConnection connection = new SqlConnection("Data source = " + db.Server + " ; Initial catalog = master ; User id = " + db.User + "; Password = " + db.Password + ";"))
            {

                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connection;

                    connection.Open();


                    using (SqlCommand cmd = new SqlCommand("SELECT name from sys.databases", connection))
                    {
                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                Liset_NameData.Add(dr[0].ToString());
                            }
                        }
                    }




                    //SqlDataReader reader1 = command.ExecuteReader();
                    //while (reader1.Read())
                    //{
                    //    NameData = reader1["name"].ToString();

                    //    Liset_NameData.Add(NameData);
                    //}
                    connection.Close();
                    command.Dispose();
                    connection.Dispose();


                }




            }


            var resultObject = new
            {
                TableName = Liset_NameData,
                success = true

            };

            return Json(resultObject, JsonRequestBehavior.AllowGet);


        }



        public JsonResult GetColumnsTable(string RepP)
        {
            ModelSql rp = JsonConvert.DeserializeObject<ModelSql>(RepP);

            db.Server = rp.sqlEnt.Server;
            db.Database = rp.sqlEnt.Database;
            db.User = rp.sqlEnt.User;
            db.Password = rp.sqlEnt.Password;
            string New_Query = rp.sqlEnt.New_Query;
            string TablesName = rp.sqlTables.name;




            //-------------------------------------------------------------------------------


            StringBuilder models = new StringBuilder();
             
            List<SqlColumns> columns = new List<SqlColumns>();


            using (SqlConnection connection = new SqlConnection("Data source = " + db.Server + " ; Initial catalog = " + db.Database + " ; User id = " + db.User + "; Password = " + db.Password + ";"))
            {
                using (SqlCommand command = new SqlCommand())
                {


                    //----------------------------------------------------get Table columns name--------------------------
                    command.Connection = connection;
                    connection.Open();


                    command.CommandText = @"SELECT  name 
                                                  , system_type_name 
                                            FROM    sys.dm_exec_describe_first_result_set (N' Select Top(1)* from " + TablesName + " ', null, 1) ";

                    try
                    {

                        SqlDataReader reader1 = command.ExecuteReader();
                        while (reader1.Read())
                        {
                            SqlColumns column = new SqlColumns();

                            column.name = reader1["name"].ToString();
                            column.system_type = reader1["system_type_name"].ToString();

                            columns.Add(column);
                        }
                    }
                    catch (Exception ex)
                    {
                         
                    }

                    connection.Close();
                    //---------------------------------------------------------------------------------------------------------------
                     

                }


            }



            //-------------------------------------------------------------------------------

             
             

            return Json(columns, JsonRequestBehavior.AllowGet);

     
             

        }


        public JsonResult FindModels(string RepP)
        {
            ModelSql rp = JsonConvert.DeserializeObject<ModelSql>(RepP);

            db.Server = rp.sqlEnt.Server;
            db.Database = rp.sqlEnt.Database;
            db.User = rp.sqlEnt.User;
            db.Password = rp.sqlEnt.Password;
            string New_Query = rp.sqlEnt.New_Query;
            string TablesName = rp.sqlTables.name;




            //-------------------------------------------------------------------------------


            StringBuilder models = new StringBuilder();

            string Result = "";
            int cnt = 0;
            List<SqlColumns> columns = new List<SqlColumns>();


            using (SqlConnection connection = new SqlConnection("Data source = " + db.Server + " ; Initial catalog = " + db.Database + " ; User id = " + db.User + "; Password = " + db.Password + ";"))
            {
                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connection;

                    connection.Open();
                    command.CommandText = New_Query;

                    DataTable Dtable = new DataTable();
                    Dtable.Load(command.ExecuteReader());
                    connection.Close();

                    if (Dtable.Columns.Count == 0)
                    {
                        New_Query = "Select * from " + TablesName + "";
                        connection.Open();
                        command.CommandText = New_Query;
                        Dtable.Load(command.ExecuteReader());
                        connection.Close();
                    }

                    //----------------------------------------------------get Table columns name--------------------------

                    connection.Open();


                    command.CommandText = @"SELECT  name 
                                                  , system_type_name 
                                            FROM    sys.dm_exec_describe_first_result_set (N'" + New_Query + "', null, 1) ";



                    SqlDataReader reader1 = command.ExecuteReader();
                    while (reader1.Read())
                    {
                        SqlColumns column = new SqlColumns();

                        column.name = reader1["name"].ToString();
                        column.system_type = reader1["system_type_name"].ToString();

                        columns.Add(column);
                    }
                    connection.Close();
                    //---------------------------------------------------------------------------------------------------------------



                    connection.Dispose();
                    command.Dispose();
                    Result = JsonConvert.SerializeObject(Dtable);

                }


            }



            //-------------------------------------------------------------------------------

            var obj = "";

            List<ColumnObjectStruct> columnsObject = new List<ColumnObjectStruct>();
            columnsObject.Add(new ColumnObjectStruct()
            {
                dataType = "number",
                headerText = "",
                hidden = true,
                key = "RowIndex",
                width = ""
            });

            //var columns = db.SqlColumns.Where(f => f.object_id == rp.sqlTables.object_id).ToList();


            foreach (SqlColumns colum in columns)
            {

                ColumnObjectStruct colObj = new ColumnObjectStruct();

                string typeName = colum.ColumnTypeGet(this.db);


                colObj.dataType = typeName;


                colObj.headerText = colum.name;

                colObj.hidden = false;
                colObj.filterable = false;
                colObj.key = colum.name;
                colObj.width = "100px";

                columnsObject.Add(colObj);
            }

            //-------------------------------------------------------------------------------


            StringBuilder models_1 = new StringBuilder();
            var table = rp.sqlTables;

            models_1.AppendLine("{");
            models_1.Append(GenerateColumns(table, columns));
            models_1.AppendLine("}");

            //-------------------------------------------------------------------------------
            string[] Data = new string[] { models_1.ToString() };

            var resultObject = new
            {
                TableName = TablesName,
                Condition = "",
                DataResult = Result,
                Settings = rp.sqlTables,
                Columns = columnsObject,
                Columns_Models = Data

            };



            var jsonResult = Json(resultObject, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

            //return Json(resultObject, JsonRequestBehavior.AllowGet);


        }


        private string GenerateColumns(SqlTables table, List<SqlColumns> columns)
        {
            StringBuilder models = new StringBuilder();
            //models.AppendLine("constructor()")
            //    .AppendLine("{");
            int falgfrist = 0;


            foreach (SqlColumns column in columns)
            {
                string typeName = column.ColumnTypeNew(this.db);
                //string typeName = column.ColumnType(this.db);
                string value = string.Empty;
                switch (typeName)
                {
                    case "any":
                        value = " : \"\" ";
                        break;
                    case "string":
                        value = " : \"\" ";
                        break;
                    case "number":
                        value = " : 0";
                        break;
                    case "boolean":
                        value = " : false";
                        break;
                    default:
                        break;
                }

                if (falgfrist == 0)
                {
                    models.AppendLine("\"" + column.name + "\"" + value);
                }
                else
                {
                    models.AppendLine(",\"" + column.name + "\"" + value);
                }

                falgfrist = 1;
            }
            //models.AppendLine("}");

            return models.ToString();

        }


        public JsonResult GenerateModelsNew(string RepP)
        {
            ModelSql rp = JsonConvert.DeserializeObject<ModelSql>(RepP);

            db.Server = rp.sqlEnt.Server;
            db.Database = rp.sqlEnt.Database;
            db.User = rp.sqlEnt.User;
            db.Password = rp.sqlEnt.Password;
            string New_Query = rp.sqlEnt.New_Query;

            //------------------------------------------------------------------------------- 
            StringBuilder models_1 = new StringBuilder();
            var table = rp.sqlTables;

            models_1.AppendLine("{");
            models_1.Append(GenerateConstructorCast(table));
            models_1.AppendLine("}");


            //-------------------------------------------------------------------------------



            //-------------------------------------------------------------------------------


            StringBuilder models = new StringBuilder();

            string NameTable = "Grad1";
            int cnt = 0;

            using (SqlConnection connection = new SqlConnection("Data source = " + db.Server + " ; Initial catalog = " + db.Database + " ; User id = " + db.User + "; Password = " + db.Password + ";"))
            {
                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connection;

                    connection.Open();
                    command.CommandText = New_Query;

                    SqlDataReader reader = command.ExecuteReader();

                    var columns = db.SqlColumns.Where(f => f.object_id == rp.sqlTables.object_id).ToList();

                    while (reader.Read())
                    {


                        models.AppendLine("<tr id=\"No_Row_" + NameTable + cnt + "\" > ");

                        //btn_Copy
                        models.AppendLine("<td id=\"td_btn_Copy_" + NameTable + cnt + "\"   class=\" Edit_But td_btn_Copy_" + NameTable + "\"  > ");
                        models.AppendLine("<button id=\"btn_Copy_" + NameTable + cnt + "\"  Data_cnt=\"" + cnt + "\"    type=\"button\" class=\" Edit_But btn_Copy btn btn-custon-four btn-danger\" style=\"background-color: cornflowerblue; font-weight: bold; font-size: 22PX; width: 34px; padding: unset; \"><i class=\"fa fa-copy\"></i></button>");
                        models.AppendLine("</td>");


                        //btn_minus_
                        models.AppendLine("<td id=\"td_btn_minus_" + NameTable + cnt + "\"   class=\" Edit_But td_btn_minus_" + NameTable + "\"  > ");
                        models.AppendLine("<button id=\"btn_minus_" + NameTable + cnt + "\" Data_cnt=\"" + cnt + "\"    type=\"button\" class=\" Edit_But btn_minus btn btn-custon-four btn-danger\" style=\"font-weight: bold;font-size: 22PX;width: 34px;padding: unset; \"><i class=\"fa fa-minus-circle\"></i></button>");
                        models.AppendLine("</td>");


                        //StatusFlag
                        models.AppendLine("<td id=\"td_StatusFlag_" + NameTable + cnt + "\"   style=\"display:none !important;\"  > ");
                        models.AppendLine("<input  disabled=\"disabled\" id=\"StatusFlag_" + NameTable + "_" + cnt + "\" value=\"\" type=\"hidden\" class=\"form-control \" placeholder=\"flag\" />");
                        models.AppendLine("</td>");

                        //Ser_
                        models.AppendLine("<td id=\"td_Ser_" + NameTable + cnt + "\"   style=\"display:none !important;\"  > ");
                        models.AppendLine("<input  disabled=\"disabled\" id=\"Ser_" + NameTable + "_" + cnt + "\" value=\"\" type=\"hidden\" class=\"form-control \" placeholder=\"flag\" />");
                        models.AppendLine("</td>");

                        //Ser_
                        models.AppendLine("<td id=\"Ser_" + NameTable + cnt + "\"   style=\"display:none !important;\" > ");
                        models.AppendLine("" + cnt + "");
                        models.AppendLine("</td>");


                        foreach (SqlColumns column in columns)
                        {

                            models.AppendLine("<td id=\"td_" + NameTable + "_" + column.name + cnt + "\" > ");

                            models.AppendLine("<textarea Data_idStatus=\"StatusFlag_" + NameTable + "_" + cnt + "\" style=\"height: 35px;\" disabled id=\"" + NameTable + "_" + column.name + cnt + "\"    class=\"form-control Input_Text Edit_ \" >" + reader["" + column.name + ""] + "</textarea> ");

                            models.AppendLine("</td>");


                        }


                        models.AppendLine("</tr>");


                        cnt = cnt + 1;
                    }



                    connection.Close();
                    command.Dispose();
                    connection.Dispose();

                }


            }



            //-------------------------------------------------------------------------------




            //string[] Data = { models_1.ToString() };
            string[] Data = new string[] { models_1.ToString(), models.ToString() };

            Data[0] = Data[0].Replace("_", "");
            return Json(Data, JsonRequestBehavior.AllowGet);


        }

        public JsonResult InsetDataNew(string RepP)
        {
            ModelSql rp = JsonConvert.DeserializeObject<ModelSql>(RepP);

            db.Server = rp.sqlEnt.Server;
            db.Database = rp.sqlEnt.Database;
            db.User = rp.sqlEnt.User;
            db.Password = rp.sqlEnt.Password;
            //string NameTable = rp.sqlTables.name;
            var table = rp.sqlTables;
            string New_Query = rp.sqlEnt.New_Query;
            string TablesName = rp.sqlTables.name;

            string jsonString = rp.Model.ToString();

            var json = JObject.Parse(jsonString);
            List<object> NewModel = json["Model"].AsJEnumerable()
                                                                    .Select(t => t.ToObject<object>())
                                                                    .ToList();

            StringBuilder models = new StringBuilder();

            string NameTable = "Grad1";
            int cnt = 0;
            List<SqlColumns> columns = new List<SqlColumns>();


            using (SqlConnection connection = new SqlConnection("Data source = " + db.Server + " ; Initial catalog = " + db.Database + " ; User id = " + db.User + "; Password = " + db.Password + ";"))
            {

                using (SqlCommand command = new SqlCommand())
                {
                    try
                    {


                        //--------------------------------------------------InsetData---------------------------------------
                        command.Connection = connection;


                        foreach (Object obj in NewModel)
                        {


                            //----------------------------------------------------Cheak_on_ID IN Table--------------------------

                            connection.Open();

                            string ID = "";
                            command.CommandText = @"select C.COLUMN_NAME FROM  
                                                INFORMATION_SCHEMA.TABLE_CONSTRAINTS T  
                                                JOIN INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE C  
                                                ON C.CONSTRAINT_NAME=T.CONSTRAINT_NAME  
                                                WHERE  
                                                C.TABLE_NAME='" + table.name + "'  and T.CONSTRAINT_TYPE='PRIMARY KEY'  ";


                            List<string> Liset_ID = new List<string>();

                            SqlDataReader reader1 = command.ExecuteReader();
                            while (reader1.Read())
                            {
                                ID = reader1["COLUMN_NAME"].ToString();

                                Liset_ID.Add(ID);
                            }
                            connection.Close();

                            //----------------------------------------------------Cheak_on_ID IS IDENTITY--------------------------


                            connection.Open();

                            int Cheak_IDENTITY = 0;
                            command.CommandText = @"SELECT OBJECTPROPERTY(OBJECT_ID('" + table.name + "') , 'TableHasIdentity') as Cheak_IDENTITY;";

                            SqlDataReader reader2 = command.ExecuteReader();
                            while (reader2.Read())
                            {
                                Cheak_IDENTITY = Convert.ToInt16(reader2["Cheak_IDENTITY"].ToString());
                            }
                            connection.Close();


                            //----------------------------------------------------Chack_on_computed column--------------------------


                            connection.Open();

                            string NameColumn = "";
                            command.CommandText = @"  SELECT 
                                                c.name AS column_name
                                                FROM sys.computed_columns c
                                                JOIN sys.objects o ON o.object_id = c.object_id
                                                where OBJECT_NAME(c.object_id) = '" + table.name + @"'
                                                ORDER BY column_id;  ";


                            List<string> Liset_NameColumn = new List<string>();

                            SqlDataReader reader3 = command.ExecuteReader();
                            while (reader3.Read())
                            {
                                NameColumn = reader3["column_name"].ToString();

                                Liset_NameColumn.Add(NameColumn);
                            }
                            connection.Close();



                            //----------------------------------------------------get Table columns name--------------------------

                            connection.Open();


                            command.CommandText = @"SELECT  name 
                                                  , system_type_name 
                                            FROM    sys.dm_exec_describe_first_result_set (N'" + New_Query + "', null, 1) ";



                            SqlDataReader readerC = command.ExecuteReader();
                            while (readerC.Read())
                            {
                                SqlColumns column = new SqlColumns();

                                column.name = readerC["name"].ToString();
                                column.system_type = readerC["system_type_name"].ToString();

                                columns.Add(column);
                            }
                            connection.Close();
                            //---------------------------------------------------------------------------------------------------------------

                            //-----------------------------------------Create Query----------------------------------------------



                            string qury = returnQueryInsert(obj, table, Liset_ID, Liset_NameColumn, Cheak_IDENTITY, columns);



                            connection.Open();
                            command.CommandText = qury;
                            try
                            {
                                command.ExecuteNonQuery();

                            }
                            catch (Exception EX)
                            {

                                return Json(EX.ToString(), JsonRequestBehavior.AllowGet);
                            }
                            connection.Close();
                            //command.Dispose();
                            //connection.Dispose();


                        }

                        //AssignAndSave(NewModel, table);


                        //------------------------------------------------ShowData--------------------------------------------

                        //-------------------------------------------------------------------------------

                        string Result = "";


                        command.Connection = connection;

                        connection.Open();
                        command.CommandText = New_Query;

                        DataTable Dtable = new DataTable();
                        Dtable.Load(command.ExecuteReader());
                        connection.Close();




                        connection.Dispose();
                        command.Dispose();
                        Result = JsonConvert.SerializeObject(Dtable);




                        List<ColumnObjectStruct> columnsObject = new List<ColumnObjectStruct>();
                        columnsObject.Add(new ColumnObjectStruct()
                        {
                            dataType = "number",
                            headerText = "",
                            hidden = true,
                            key = "RowIndex",
                            width = ""
                        });

                        //var columns = db.SqlColumns.Where(f => f.object_id == rp.sqlTables.object_id).ToList();

                        foreach (SqlColumns column in columns)
                        {

                            ColumnObjectStruct colObj = new ColumnObjectStruct();
                            string typeName = column.ColumnTypeGet(this.db);


                            colObj.dataType = typeName;



                            colObj.headerText = column.name;

                            colObj.hidden = false;
                            colObj.filterable = false;
                            colObj.key = column.name;
                            colObj.width = "100px";

                            columnsObject.Add(colObj);
                        }

                        //-------------------------------------------------------------------------------


                        StringBuilder models_1 = new StringBuilder();
                        //var table = rp.sqlTables;

                        models_1.AppendLine("{");
                        models_1.Append(GenerateColumns(table, columns));
                        models_1.AppendLine("}");

                        //-------------------------------------------------------------------------------
                        string[] Data = new string[] { models_1.ToString() };

                        var resultObject = new
                        {
                            TableName = TablesName,
                            Condition = "",
                            DataResult = Result,
                            Settings = rp.sqlTables,
                            Columns = columnsObject,
                            Columns_Models = Data,
                            success = true

                        };

                        //return Json(resultObject, JsonRequestBehavior.AllowGet);
                        var jsonResult = Json(resultObject, JsonRequestBehavior.AllowGet);
                        jsonResult.MaxJsonLength = int.MaxValue;
                        return jsonResult;
                    }
                    catch (Exception Ex)
                    {
                        return Json(Ex, JsonRequestBehavior.AllowGet);
                    }

                }


            }





            return Json("", JsonRequestBehavior.AllowGet);


        }




        public JsonResult CounactData(SqlEnt rp)
        {


            db.Server = rp.Server;
            db.Database = rp.Database;
            db.User = rp.User;
            db.Password = rp.Password;

            List<SqlTables> Tab = new List<SqlTables>();

            Tab = db.SqlTables;

            return Json(Tab, JsonRequestBehavior.AllowGet);

        }






        public JsonResult GenerateModelsTest(string RepP)
        {
            ModelSql rp = JsonConvert.DeserializeObject<ModelSql>(RepP);

            db.Server = rp.sqlEnt.Server;
            db.Database = rp.sqlEnt.Database;
            db.User = rp.sqlEnt.User;
            db.Password = rp.sqlEnt.Password;
            string NameTable = rp.sqlTables.name;
            string New_Query = rp.sqlEnt.New_Query;

            //------------------------------------------------------------------------------- 
            StringBuilder models_1 = new StringBuilder();
            var table = rp.sqlTables;

            models_1.AppendLine("{");
            models_1.Append(GenerateConstructorCast(table));
            models_1.AppendLine("}");


            //-------------------------------------------------------------------------------



            //-------------------------------------------------------------------------------


            StringBuilder models = new StringBuilder();


            using (SqlConnection connection = new SqlConnection("Data source = " + db.Server + " ; Initial catalog = " + db.Database + " ; User id = " + db.User + "; Password = " + db.Password + ";"))
            {
                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connection;

                    connection.Open();
                    command.CommandText = New_Query;

                    SqlDataReader reader = command.ExecuteReader();

                    var columns = db.SqlColumns.Where(f => f.object_id == rp.sqlTables.object_id).ToList();

                    int falgfrist = 0;
                    int falgfristM = 0;


                    models.AppendLine("  [ ");
                    while (reader.Read())
                    {

                        if (falgfristM == 0)
                        {
                            models.AppendLine("{");

                        }
                        else
                        {
                            models.AppendLine(",{");
                        }

                        falgfrist = 0;
                        foreach (SqlColumns column in columns)
                        {

                            if (falgfrist == 0)
                            {
                                models.AppendLine("\"" + column.name + "\"" + " : " + "\"" + reader["" + column.name + ""] + "\"");
                            }
                            else
                            {
                                models.AppendLine(",\"" + column.name + "\"" + " : " + "\"" + reader["" + column.name + ""] + "\"");
                            }

                            falgfrist = 1;

                        }

                        models.AppendLine("}");
                        falgfristM = 1;
                    }

                    models.AppendLine(" ] ");

                    connection.Close();
                    command.Dispose();
                    connection.Dispose();

                }


            }



            //-------------------------------------------------------------------------------




            //string[] Data = { models_1.ToString() };
            string[] Data = new string[] { models_1.ToString(), models.ToString() };


            return Json(Data, JsonRequestBehavior.AllowGet);


        }

        public JsonResult ShowData(string RepP)
        {
            ModelSql rp = JsonConvert.DeserializeObject<ModelSql>(RepP);

            db.Server = rp.sqlEnt.Server;
            db.Database = rp.sqlEnt.Database;
            db.User = rp.sqlEnt.User;
            db.Password = rp.sqlEnt.Password;
            string NameTable = rp.sqlTables.name;

            StringBuilder models = new StringBuilder();


            using (SqlConnection connection = new SqlConnection("Data source = " + db.Server + " ; Initial catalog = " + db.Database + " ; User id = " + db.User + "; Password = " + db.Password + ";"))
            {
                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connection;

                    connection.Open();
                    command.CommandText = "select * from " + NameTable + "";

                    SqlDataReader reader = command.ExecuteReader();

                    var columns = db.SqlColumns.Where(f => f.object_id == rp.sqlTables.object_id).ToList();

                    int falgfrist = 0;
                    int falgfristM = 0;


                    models.AppendLine("  [ ");
                    while (reader.Read())
                    {

                        if (falgfristM == 0)
                        {
                            models.AppendLine("{");

                        }
                        else
                        {
                            models.AppendLine(",{");
                        }

                        falgfrist = 0;
                        foreach (SqlColumns column in columns)
                        {

                            if (falgfrist == 0)
                            {
                                models.AppendLine("\"" + column.name + "\"" + " : " + "\"" + reader["" + column.name + ""] + "\"");
                            }
                            else
                            {
                                models.AppendLine(",\"" + column.name + "\"" + " : " + "\"" + reader["" + column.name + ""] + "\"");
                            }

                            falgfrist = 1;

                        }

                        models.AppendLine("}");
                        falgfristM = 1;
                    }

                    models.AppendLine(" ] ");

                    connection.Close();
                    command.Dispose();
                    connection.Dispose();

                }


            }





            return Json(models.ToString(), JsonRequestBehavior.AllowGet);


        }



        public void AddProperty(ExpandoObject expando, string propertyName, object propertyValue)
        {
            var exDict = expando as IDictionary<string, object>;
            if (exDict.ContainsKey(propertyName))
                exDict[propertyName] = propertyValue;
            else
                exDict.Add(propertyName, propertyValue);
        }









        public JsonResult GenerateModels(string RepP)
        {
            ModelSql rp = JsonConvert.DeserializeObject<ModelSql>(RepP);

            db.Server = rp.sqlEnt.Server;
            db.Database = rp.sqlEnt.Database;
            db.User = rp.sqlEnt.User;
            db.Password = rp.sqlEnt.Password;

            List<SqlTables> Tab = new List<SqlTables>();

            Tab = db.SqlTables;


            StringBuilder models = new StringBuilder();
            var table = rp.sqlTables;

            // as List<SqlTables>;// db.SqlTables;
            //foreach (SqlTables table in tables)
            //{

            models.Append("class ").Append(table.name).AppendLine("{");


            models.Append(GenerateConstructor(table));

            var columns = db.SqlColumns.Where(f => f.object_id == table.object_id).ToList();
            foreach (SqlColumns column in columns)
            {
                models.Append("public ").Append(column.name).Append(":").Append(column.ColumnType(this.db)).Append(";").AppendLine();
            }

            //models.AppendLine("}").AppendLine();
            //}

            //txtModels.Text = models.ToString();

            return Json(models.ToString(), JsonRequestBehavior.AllowGet);


        }

        public JsonResult InsetData(string RepP)
        {
            ModelSql rp = JsonConvert.DeserializeObject<ModelSql>(RepP);

            db.Server = rp.sqlEnt.Server;
            db.Database = rp.sqlEnt.Database;
            db.User = rp.sqlEnt.User;
            db.Password = rp.sqlEnt.Password;
            string NameTable = rp.sqlTables.name;
            var table = rp.sqlTables;
            string New_Query = rp.sqlEnt.New_Query;

            string jsonString = rp.Model.ToString();

            var json = JObject.Parse(jsonString);
            List<object> NewModel = json["Model"].AsJEnumerable()
                                                                    .Select(t => t.ToObject<object>())
                                                                    .ToList();

            StringBuilder models = new StringBuilder();



            using (SqlConnection connection = new SqlConnection("Data source = " + db.Server + " ; Initial catalog = " + db.Database + " ; User id = " + db.User + "; Password = " + db.Password + ";"))
            {

                using (SqlCommand command = new SqlCommand())
                {

                    //--------------------------------------------------InsetData---------------------------------------




                    AssignAndSave(NewModel, table);


                    //------------------------------------------------ShowData--------------------------------------------

                    command.Connection = connection;

                    connection.Open();
                    command.CommandText = New_Query;

                    SqlDataReader reader = command.ExecuteReader();

                    var columns = db.SqlColumns.Where(f => f.object_id == rp.sqlTables.object_id).ToList();

                    int falgfrist = 0;
                    int falgfristM = 0;


                    models.AppendLine("  [ ");
                    while (reader.Read())
                    {

                        if (falgfristM == 0)
                        {
                            models.AppendLine("{");

                        }
                        else
                        {
                            models.AppendLine(",{");
                        }

                        falgfrist = 0;
                        foreach (SqlColumns column in columns)
                        {

                            if (falgfrist == 0)
                            {
                                models.AppendLine("\"" + column.name + "\"" + " : " + "\"" + reader["" + column.name + ""] + "\"");
                            }
                            else
                            {
                                models.AppendLine(",\"" + column.name + "\"" + " : " + "\"" + reader["" + column.name + ""] + "\"");
                            }

                            falgfrist = 1;

                        }

                        models.AppendLine("}");
                        falgfristM = 1;
                    }

                    models.AppendLine(" ] ");

                    connection.Close();
                    command.Dispose();
                    connection.Dispose();

                }


            }





            return Json(models.ToString(), JsonRequestBehavior.AllowGet);


        }


        private void AssignAndSave(List<object> Model, SqlTables table)
        {
            //List<object> Modell = Model;


            foreach (Object obj in Model)
            {
                using (SqlConnection connection = new SqlConnection("Data source = " + db.Server + " ; Initial catalog = " + db.Database + " ; User id = " + db.User + "; Password = " + db.Password + ";"))
                {

                    using (SqlCommand command = new SqlCommand())
                    {

                        command.Connection = connection;

                        connection.Open();

                        string ID = "";
                        command.CommandText = @"select C.COLUMN_NAME FROM  
                                                INFORMATION_SCHEMA.TABLE_CONSTRAINTS T  
                                                JOIN INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE C  
                                                ON C.CONSTRAINT_NAME=T.CONSTRAINT_NAME  
                                                WHERE  
                                                C.TABLE_NAME='" + table.name + "'  and T.CONSTRAINT_TYPE='PRIMARY KEY'  ";

                        SqlDataReader reader = command.ExecuteReader();
                        while (reader.Read())
                        {
                            ID = reader["COLUMN_NAME"].ToString();
                        }
                        connection.Close();

                        //string qury = returnQueryInsert(obj, table, ID);



                        connection.Open();
                        //command.CommandText = qury;
                        command.ExecuteNonQuery();
                        connection.Close();
                        command.Dispose();
                        connection.Dispose();

                    }
                }
            }


        }


        private string returnQueryInsert(object obj, SqlTables table, List<string> ID, List<string> Liset_NameColumn, int Cheak_IDENTITY, List<SqlColumns> columns)
        {
            int flagfrist = 0;
            int flagfrist_ID = 0;
            StringBuilder models = new StringBuilder();
            StringBuilder where = new StringBuilder();
            var json_serializer = new JavaScriptSerializer();
            var routes_list = (IDictionary<string, object>)json_serializer.DeserializeObject(obj.ToString());

            //var columns = db.SqlColumns.Where(f => f.object_id == table.object_id).ToList();

            string StatusFlag = routes_list["StatusFlag"].ToString();
            //string TableID = routes_list[ID].ToString();

            if (StatusFlag == "i") //insert
            {
                models.AppendLine("insert into " + table.name + " values( ");
                foreach (SqlColumns column in columns)
                {
                    bool Is_computed_column = false;
                    for (int i = 0; i < Liset_NameColumn.Count; i++)
                    {

                        if (column.name == Liset_NameColumn[i])
                        {

                            Is_computed_column = true;
                            break;

                        }
                    }

                    if (Is_computed_column)
                    {
                        continue;
                    }


                    string propertyName = column.name;
                    var type = obj.GetType();
                    string value = "";



                    if (Cheak_IDENTITY == 1)
                    {
                        bool Is_Id = false;
                        for (int i = 0; i < ID.Count; i++)
                        {
                            if (column.name == ID[i])
                            {
                                Is_Id = true;
                                break;
                            }
                        }
                        if (Is_Id)
                        {
                            continue;
                        }
                    }

                    value = routes_list[column.name].ToString();


                    if (value.Trim() == "")
                    {
                        string typeName = column.ColumnTypeInsert(this.db);

                        switch (typeName)
                        {
                            case "any":
                                value = "Null";
                                break;
                            case "string":
                                value = "";
                                break;
                            case "number":
                                value = "0";
                                break;
                            case "boolean":
                                value = "false";
                                break;
                            default:
                                break;
                        }
                    }


                    if (flagfrist == 0)
                    {
                        if (value == "Null" || value == "0"|| value == ""|| value == "NaN-NaN-NaN")
                        {
                            models.Append("Null");
                        }
                        else { 
                        models.Append("'" + value.ToString() + "'");
                        }

                    }
                    else
                    {
                        if (value == "Null" || value == "0" || value == "" || value == "NaN-NaN-NaN")

                        {
                            models.Append(",Null");

                        }
                        else
                        {
                            models.Append(",'" + value.ToString() + "'");

                        }
                    }

                    flagfrist = 1;
                }
                models.Append(" ) ");

            }
            if (StatusFlag == "u")//update
            {

                models.AppendLine("update " + table.name + " set ");
                //where.AppendLine("where " + TableID + " = ");
                foreach (SqlColumns column in columns)
                {

                    bool Is_computed_column = false;
                    for (int i = 0; i < Liset_NameColumn.Count; i++)
                    {

                        if (column.name == Liset_NameColumn[i])
                        {

                            Is_computed_column = true;
                            break;

                        }
                    }

                    if (Is_computed_column)
                    {
                        continue;
                    }


                    string propertyName = column.name;
                    var type = obj.GetType();
                    string value = "";


                    value = routes_list[column.name].ToString();

                    if (value.Trim() == "")
                    {
                        string typeName = column.ColumnTypeInsert(this.db);

                        switch (typeName)
                        {
                            case "any":
                                value = "Null";
                                break;
                            case "string":
                                value = "";
                                break;
                            case "number":
                                value = "0";
                                break;
                            case "boolean":
                                value = "false";
                                break;
                            default:
                                break;
                        }
                    }




                    bool Is_Id = false;
                    for (int i = 0; i < ID.Count; i++)
                    {
                        if (column.name == ID[i])
                        {
                            Is_Id = true;
                            break;
                        }
                    }
                    if (Is_Id == false)
                    {


                        if (flagfrist == 0)
                        {
                            if (value == "Null" || value == "0" || value == "" || value == "NaN-NaN-NaN") 
                            {
                                models.Append("" + column.name + " = Null");
                            }
                            else
                            {
                                models.Append("" + column.name + " = '" + value.ToString() + "'");

                            }

                        }
                        else
                        {
                            if (value == "Null" || value == "0" || value == "" || value == "NaN-NaN-NaN") 
                            {
                                models.Append("," + column.name + " = Null");
                            }
                            else
                            {
                                models.Append("," + column.name + " = '" + value.ToString() + "'");

                            }
                        }
                        flagfrist = 1;
                    }
                    else
                    {
                        if (flagfrist_ID == 0)
                        {
                            where.Append(" where " + column.name + " = '" + value.ToString() + "'");

                        }
                        else
                        {
                            where.Append(" and " + column.name + " = '" + value.ToString() + "'");
                        }
                        flagfrist_ID = 1;
                    }


                }
                models.Append(where);

            }
            if (StatusFlag == "d")
            {
                models.AppendLine("delete " + table.name + "  ");
                //where.AppendLine("where " + TableID + " = ");
                foreach (SqlColumns column in columns)
                {

                    string propertyName = column.name;
                    var type = obj.GetType();
                    string value = "";


                    value = routes_list[column.name].ToString();


                    bool Is_Id = false;
                    for (int i = 0; i < ID.Count; i++)
                    {
                        if (column.name == ID[i])
                        {
                            Is_Id = true;
                            break;
                        }
                    }
                    if (Is_Id)
                    {
                        if (flagfrist_ID == 0)
                        {
                            where.Append(" where " + column.name + " = '" + value.ToString() + "'");

                        }
                        else
                        {
                            where.Append(" and " + column.name + " = '" + value.ToString() + "'");
                        }
                        flagfrist_ID = 1;

                    }




                }
                models.Append(where);

            }






            return models.ToString();

        }



        public object ToClassString(string base64String)
        {
            byte[] bytes = Convert.FromBase64String(base64String);
            using (MemoryStream ms = new MemoryStream(bytes, 0, bytes.Length))
            {
                ms.Write(bytes, 0, bytes.Length);
                ms.Position = 0;
                return new BinaryFormatter().Deserialize(ms);
            }
        }

        public string GetPropertyValue(string propertyName)
        {
            try
            {
                return this.GetType().GetProperty(propertyName).GetValue(this, null) as string;
            }
            catch { return null; }
        }
        private string GenerateConstructorCast(SqlTables table)
        {
            StringBuilder models = new StringBuilder();
            //models.AppendLine("constructor()")
            //    .AppendLine("{");
            int falgfrist = 0;

            var columns = db.SqlColumns.Where(f => f.object_id == table.object_id).ToList();
            foreach (SqlColumns column in columns)
            {
                string typeName = column.ColumnType(this.db);
                string value = string.Empty;
                switch (typeName)
                {
                    case "string":
                        value = " : \"\" ";
                        break;
                    case "number":
                        value = " : 0";
                        break;
                    case "boolean":
                        value = " : false";
                        break;
                    default:
                        break;
                }

                if (falgfrist == 0)
                {
                    models.AppendLine("\"" + column.name + "\"" + value);
                }
                else
                {
                    models.AppendLine(",\"" + column.name + "\"" + value);
                }

                falgfrist = 1;
            }
            //models.AppendLine("}");

            return models.ToString();

        }




        private string GenerateConstructor(SqlTables table)
        {
            StringBuilder models = new StringBuilder();
            models.AppendLine("constructor()")
                .AppendLine("{");
            var columns = db.SqlColumns.Where(f => f.object_id == table.object_id).ToList();
            foreach (SqlColumns column in columns)
            {
                string typeName = column.ColumnType(this.db);
                string value = string.Empty;
                switch (typeName)
                {
                    case "string":
                        value = " = \"\";";
                        break;
                    case "number":
                        value = " = 0;";
                        break;
                    case "boolean":
                        value = " = false;";
                        break;
                    default:
                        break;
                }

                models.AppendLine("this." + column.name + value);
            }
            models.AppendLine("}");

            return models.ToString();

        }


    }
}
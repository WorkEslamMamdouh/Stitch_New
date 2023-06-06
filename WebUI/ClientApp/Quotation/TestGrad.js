$(document).ready(function () {
    var Grid = new ESGrid();
    //var ShowData: HTMLButtonElement; 
    var GenerateModels;
    var ConactServer;
    var Conact;
    var DataSours;
    var Database;
    var top;
    TestGradInitalizeComponent();
    function TestGradInitalizeComponent() {
        //ShowData = document.getElementById('ShowData') as HTMLButtonElement 
        GenerateModels = document.getElementById('GenerateModels');
        Conact = document.getElementById('Conact');
        ConactServer = document.getElementById('ConactServer');
        Database = document.getElementById('Database');
        DataSours = document.getElementById('DataSours');
        top = document.getElementById('top');
        //Ajax.Callsync({
        //    type: "Get",
        //    url: sys.apiUrl("SlsTrSales", "GetAllUOM"),
        //    success: (d) => {
        //        let result = d as BaseResponse;
        //        if (result.IsSuccess) {
        //            I_D_UOMDetails = result.Response as Array<I_D_UOM>;
        //        }
        //    }
        //});
        //InitializeGridControl(); 
        Conact.onclick = Conact_onclick;
        ConactServer.onclick = ConactServer_onclick;
        GenerateModels.onclick = GenerateModels_onclick;
        DataSours.onchange = DataSours_onchange;
        top.onchange = DataSours_onchange;
        //ShowData.onclick = ShowData_onclick;
        InitializeGridControl();
    }
    function Conact_onclick() {
        var rp = new SqlEnt();
        //rp.Database = $('#Database').val();
        rp.Server = $('#Server').val();
        rp.Password = $('#Password').val();
        rp.User = $('#User').val();
        Ajax.CallAsync({
            url: Url.Action("GetNameData", "GeneralSQL"),
            data: rp,
            success: function (d) {
                var result = d;
                debugger;
                //let res = result as SqlTables;
                if (result.success) {
                    Database.innerHTML = '';
                    for (var i = 0; i < result.TableName.length; i++) {
                        if (result.TableName[i] != 'tempdb' && result.TableName[i] != 'master' && result.TableName[i] != 'msdb' && result.TableName[i] != 'model') {
                            $('#Database').append('<option value="' + result.TableName[i] + '">' + result.TableName[i] + '</option>');
                            //Database.append("<option value=" + result.TableName[i] + '">Select ' + result.TableName[i] + '</option>")
                        }
                    }
                    //DocumentActions.FillCombowithdefult(result.TableName, Database, 'name', 'name', "Select Data Sours");
                }
                else {
                    alert('يوجد خطأ في الاتصال في الداته بيز');
                }
            }
        });
    }
    function DataSours_onchange() {
        if (DataSours.value == 'null') {
            $('#New_Query').val('');
        }
        else {
            $('#New_Query').val('Select TOP (' + $('#top').val() + ') * from ' + $("#DataSours option:selected").text() + '');
        }
    }
    function ConactServer_onclick() {
        $('#New_Query').val('');
        GetsqlData();
    }
    function GenerateModels_onclick() {
        if (DataSours.value.trim() == '' || $('#New_Query').val().trim() == '') {
            Errorinput(DataSours);
            Errorinput($('#New_Query'));
            return;
        }
        GenerateMode();
    }
    function ShowData_onclick() {
        var model = new SqlTables();
        var modelSql = new ModelSql();
        var rp = new SqlEnt();
        rp.Database = $('#Database').val();
        rp.Server = $('#Server').val();
        rp.Password = $('#Password').val();
        rp.User = $('#User').val();
        model.name = $("#DataSours option:selected").text();
        model.object_id = $('#DataSours').val();
        modelSql.sqlTables = model;
        modelSql.sqlEnt = rp;
        var _Data = JSON.stringify(modelSql);
        Ajax.CallAsync({
            url: Url.Action("ShowData", "GeneralSQL"),
            data: { RepP: _Data },
            success: function (d) {
                var result = d;
                debugger;
                var res = result;
                var Model = JSON.parse(res);
                Grid.ESG.LastCounter = 0;
                Grid.ESG.LastCounterAdd = 0;
                DisplayDataGridControl(Model, Grid);
            }
        });
    }
    function GetsqlData() {
        var rp = new SqlEnt();
        rp.Database = $('#Database').val();
        rp.Server = $('#Server').val();
        rp.Password = $('#Password').val();
        rp.User = $('#User').val();
        Ajax.CallAsync({
            url: Url.Action("CounactData", "GeneralSQL"),
            data: rp,
            success: function (d) {
                var result = d;
                debugger;
                var res = result;
                DocumentActions.FillCombowithdefult(result, DataSours, 'object_id', 'name', "Select Table");
            }
        });
    }
    function GenerateMode() {
        var model = new SqlTables();
        var modelSql = new ModelSql();
        var rp = new SqlEnt();
        rp.Database = $('#Database').val();
        rp.Server = $('#Server').val();
        rp.Password = $('#Password').val();
        rp.User = $('#User').val();
        rp.New_Query = $('#New_Query').val();
        model.name = $("#DataSours option:selected").text();
        model.object_id = $('#DataSours').val();
        modelSql.sqlTables = model;
        modelSql.sqlEnt = rp;
        var _Data = JSON.stringify(modelSql);
        Ajax.CallAsync({
            url: Url.Action("FindModels", "GeneralSQL"),
            data: { RepP: _Data },
            success: function (d) {
                debugger;
                var res = d;
                Display_All(res, model.name);
            }
        });
    }
    function Display_All(res, NameTaple) {
        debugger;
        var Model = JSON.parse(res.Columns_Models[0]);
        Grid.Column = new Array();
        var properties = Object.getOwnPropertyNames(Model);
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var property = properties_1[_i];
            var Colum = new Column();
            Colum.Name = "" + property + "";
            Colum.title = "" + property + "";
            var NameTyp = res.Columns.filter(function (x) { return x.headerText == property; });
            if (NameTyp[0].dataType == "boolean") {
                Colum.ColumnType.NameType = "checkbox";
            }
            if (NameTyp[0].dataType == "date") {
                Colum.ColumnType.NameType = "date";
            }
            if (NameTyp[0].dataType == "number") {
                Colum.ColumnType.NameType = "number";
            }
            Grid.Column.push(Colum);
        }
        debugger;
        Model['StatusFlag'] = '';
        Grid.ESG.object = Model;
        Grid.ESG.LastCounter = 0;
        Grid.ESG.LastCounterAdd = 0;
        BindGridControl(Grid);
        Display_Data(res, NameTaple, function () {
            debugger;
            var values = SearchGrid.SearchDataGrid.SelectedKey;
            Grid.ESG.Model;
            EditGridControl(Grid);
            Grid.ESG.LastCounter = 0;
            Grid.ESG.LastCounterAdd = 0;
            $('#tbody_' + Grid.ESG.NameTable + '').html('');
            BuildGridControl(true, Grid);
            Grid.ESG.LastCounterAdd = 1;
            var NameTable = Grid.ESG.NameTable;
            debugger;
            for (var u = 0; u < Grid.Column.length; u++) {
                //$('#' + NameTable + '_' + Grid.Column[u].Name + 0 + '').val(values[u]);
                debugger;
                if (Grid.Column[u].ColumnType.NameType == 'checkbox') {
                    if (values[u] == "1" || values[u] == "true") {
                        $('#' + NameTable + '_' + Grid.Column[u].Name + 0 + '').prop('checked', true);
                    }
                    else {
                        $('#' + NameTable + '_' + Grid.Column[u].Name + 0 + '').prop('checked', false);
                    }
                }
                else if (Grid.Column[u].ColumnType.NameType == 'date') {
                    debugger;
                    if (values[u] == null || values[u] == '') {
                        $('#' + NameTable + '_' + Grid.Column[u].Name + 0 + '').val(GetDate());
                    }
                    else {
                        $('#' + NameTable + '_' + Grid.Column[u].Name + 0 + '').val(DateFormat(values[u]));
                    }
                }
                else {
                    $('#' + NameTable + '_' + Grid.Column[u].Name + 0 + '').val(values[u]);
                }
            }
            $('#StatusFlag_' + NameTable + '_0').val("");
        });
        debugger;
    }
    function Display_Data(res, NameTable, OnSearchSelected) {
        debugger;
        var response = res;
        var columns = response.Columns;
        var result = JSON.parse(response.DataResult);
        SearchGrid.SearchDataGrid = new DataTable();
        SearchGrid.SearchDataGrid.Columns = columns;
        SearchGrid.SearchDataGrid.dataScr = result;
        SearchGrid.SearchDataGrid.ElementName = "SearchDataTable";
        SearchGrid.SearchDataGrid.PageSize = 10; // < 50 ? 50 : settings.PageSize;
        SearchGrid.SearchDataGrid.PrimaryKey = "ID"; //"RowIndex";
        var boxWidth = "100%";
        var boxHeight = "100%";
        var boxLeft = "100%";
        var boxTop = "100%";
        $("#SearchBox").css("width", boxWidth);
        $("#SearchBox").css("height", boxHeight);
        $("#SearchBox").css("left", boxLeft);
        $("#SearchBox").css("top", boxTop);
        SearchGrid.SearchDataGrid.Bind();
        SearchGrid.SearchDataGrid.OnDoubleClick = function () {
            console.log(SearchGrid.SearchDataGrid.SelectedKey);
            //salert(SearchGrid.SearchDataGrid.SelectedKey)
            $("#SearchBox").modal("hide"); //.css("display", "none");
            OnSearchSelected();
        };
        document.getElementById("searchTitle").innerText = NameTable;
        $(".ui-igedit-input").keyup(function (e) {
        });
        $("#SearchBox").modal("show"); //.css("display", "");//
        // $("#SearchBox").addClass("in");//.css("display", "");//
        $("#SearchDataTable").css("width", "100%");
        $("#SearchDataTable").css("height", "100%");
    }
    function GenerateModeOld() {
        var model = new SqlTables();
        var modelSql = new ModelSql();
        var rp = new SqlEnt();
        rp.Database = $('#Database').val();
        rp.Server = $('#Server').val();
        rp.Password = $('#Password').val();
        rp.User = $('#User').val();
        rp.New_Query = $('#New_Query').val();
        model.name = $("#DataSours option:selected").text();
        model.object_id = $('#DataSours').val();
        modelSql.sqlTables = model;
        modelSql.sqlEnt = rp;
        var _Data = JSON.stringify(modelSql);
        Ajax.CallAsync({
            url: Url.Action("FindModels", "GeneralSQL"),
            data: { RepP: _Data },
            success: function (d) {
                var result = d;
                var res = result;
                debugger;
                var Model = JSON.parse(res[0]);
                Grid.Column = new Array();
                var properties = Object.getOwnPropertyNames(Model);
                for (var _i = 0, properties_2 = properties; _i < properties_2.length; _i++) {
                    var property = properties_2[_i];
                    var Colum = new Column();
                    Colum.Name = "" + property + "";
                    Colum.title = "" + property + "";
                    var NameTyp = res.Columns.filter(function (x) { return x.headerText == property; });
                    if (NameTyp[0].dataType == "boolean") {
                        Colum.ColumnType.NameType = "checkbox";
                    }
                    if (NameTyp[0].dataType == "date") {
                        Colum.ColumnType.NameType = "date";
                    }
                    if (NameTyp[0].dataType == "number") {
                        Colum.ColumnType.NameType = "number";
                    }
                    Grid.Column.push(Colum);
                }
                debugger;
                Model['StatusFlag'] = '';
                Grid.ESG.object = Model;
                Grid.ESG.LastCounter = 0;
                Grid.ESG.LastCounterAdd = 0;
                BindGridControl(Grid);
                //-------------------------------------------------------------
                debugger;
                var Model_2 = res[1];
                showGridData(Grid, Model_2.toString());
                //$("table_Grad1").each(function () {
                //    var $this = $(this);
                //    var newrows = [];
                //    $this.find("tr").each(function () {
                //        var i = 0;
                //        $(this).find("td").each(function () {
                //            i++;
                //            if (newrows[i] === undefined) { newrows[i] = $("<tr></tr>"); }
                //            newrows[i].append($(this));
                //        });
                //    });
                //    $this.find("tr").remove();
                //    $.each(newrows, function () {
                //        $this.append(this);
                //    });
                //});
            }
        });
    }
    function InitializeGridControl() {
        Grid.ESG.NameTable = 'Grad1';
        Grid.ESG.OnfunctionSave = SaveNew;
        Grid.ESG.OnfunctionTotal = computeTotal;
        Grid.ESG.OnRowDoubleClicked = DoubleClicked;
        //DisplayDataGridControl(I_D_UOMDetails, Grid);
    }
    function SaveNew() {
        debugger;
        //alert(Grid.ESG.Model)
        console.log(Grid.ESG.Model);
        var model = new SqlTables();
        var modelSql = new ModelSql();
        var rp = new SqlEnt();
        rp.Database = $('#Database').val();
        rp.Server = $('#Server').val();
        rp.Password = $('#Password').val();
        rp.User = $('#User').val();
        rp.New_Query = $('#New_Query').val();
        model.name = $("#DataSours option:selected").text();
        model.object_id = $('#DataSours').val();
        modelSql.sqlTables = model;
        modelSql.sqlEnt = rp;
        modelSql.Model = Grid.ESG.Model;
        var _Data = JSON.stringify(modelSql);
        debugger;
        if (Grid.ESG.CountModel == 0) {
            alert('لا يوجد اي تعديل للحفظ');
            return;
        }
        Ajax.CallAsync({
            url: Url.Action("InsetDataNew", "GeneralSQL"),
            data: { RepP: _Data },
            success: function (d) {
                debugger;
                var res = d;
                if (res.success == true) {
                    Display_All(res, model.name);
                }
                else {
                    alert(res);
                }
            }
        });
    }
    function computeTotal() {
        console.log(Grid.ESG.TotalModel);
    }
    function DoubleClicked() {
        //alert(Grid.ESG.SelectedKey);
    }
});
//# sourceMappingURL=TestGrad.js.map
$(document).ready(function () {
    var Grid = new ESGrid();
    //var ShowData: HTMLButtonElement; 
    var SelectText;
    var GenerateModels;
    //var ConactServer: HTMLButtonElement;
    var Conact;
    var DataSours;
    var Columns_Table;
    var ORDER_Table;
    var Database;
    var top;
    var New_Query;
    var autocompleteList;
    var List_Data_Columns_Table;
    TestGradInitalizeComponent();
    var List_DataSours = new Array();
    function TestGradInitalizeComponent() {
        $("#layout_Refresh").removeClass('display_none');
        $("#layout_Back").removeClass('display_none');
        //ShowData = document.getElementById('ShowData') as HTMLButtonElement 
        New_Query = document.getElementById('New_Query');
        SelectText = document.getElementById('SelectText');
        GenerateModels = document.getElementById('GenerateModels');
        Conact = document.getElementById('Conact');
        //ConactServer = document.getElementById('ConactServer') as HTMLButtonElement
        Database = document.getElementById('Database');
        DataSours = document.getElementById('DataSours');
        Columns_Table = document.getElementById('Columns_Table');
        ORDER_Table = document.getElementById('ORDER_Table');
        top = document.getElementById('top');
        autocompleteList = document.getElementById("autocompleteList");
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
        //ConactServer.onclick = ConactServer_onclick;
        SelectText.onclick = SelectText_Onclick;
        GenerateModels.onclick = GenerateModels_onclick;
        Database.onchange = ConactServer_onclick;
        DataSours.onchange = DataSours_onchange;
        top.onchange = function () { $('#New_Query').val(''); };
        Columns_Table.onchange = function () { $('#New_Query').val(''); };
        ORDER_Table.onchange = function () { $('#New_Query').val(''); };
        //ShowData.onclick = ShowData_onclick;
        InitializeGridControl();
        New_Query.addEventListener("input", handleInput);
        Event_key('Enter', 'New_Query', 'SelectText');
    }
    function handleInput() {
        var textArray = New_Query.value.toLowerCase().split(' ');
        var lastWord = textArray[textArray.length - 1];
        var suggestions = List_Data_Columns_Table.filter(function (item) { return item.name.toLowerCase().startsWith(lastWord); });
        renderSuggestions(suggestions);
    }
    function renderSuggestions(suggestions) {
        autocompleteList.innerHTML = "";
        suggestions.forEach(function (suggestion) {
            var listItem = document.createElement("li");
            listItem.textContent = suggestion.name;
            listItem.addEventListener("click", function () {
                var textArray = New_Query.value.toLowerCase().split(' ');
                textArray[textArray.length - 1] = suggestion.name;
                New_Query.value = textArray.join(' ');
                autocompleteList.innerHTML = "";
            });
            autocompleteList.appendChild(listItem);
        });
    }
    function SelectText_Onclick() {
        var itemList = document.getElementById("autocompleteList");
        var firstItem = itemList.querySelector("li:first-child");
        if (firstItem) {
            firstItem.click();
        }
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
                    Database.innerHTML = '<option value="null">Select Database</option>';
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
            $('#Columns_Table').html('');
        }
        else {
            $('#New_Query').val('');
            GetColumnsTable();
            //$('#New_Query').val('Select TOP (' + $('#top').val() + ') * from ' + $("#DataSours option:selected").text() + '')
        }
    }
    function ConactServer_onclick() {
        debugger;
        $('#New_Query').val('');
        $('#Columns_Table').html('');
        GetsqlData();
    }
    function GenerateModels_onclick() {
        if (Database.value.trim() == '' || Database.value == 'null') {
            Errorinput(Database);
            return;
        }
        if (DataSours.value.trim() == '' || DataSours.value == 'null') {
            Errorinput(DataSours);
            return;
        }
        if ($('#New_Query').val().trim() == '') {
            if (Columns_Table.value.trim() == '' || Columns_Table.value == 'null') {
                $('#New_Query').val('Select TOP (' + $('#top').val() + ') * from ' + $("#DataSours option:selected").text() + '');
            }
            if (Columns_Table.value.trim() != '' && Columns_Table.value != 'null') {
                $('#New_Query').val('Select TOP (' + $('#top').val() + ') * from ' + $("#DataSours option:selected").text() + ' ORDER BY ' + Columns_Table.value + ' ' + ORDER_Table.value + '');
            }
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
                List_DataSours = res;
                DocumentActions.FillCombowithdefult(result, DataSours, 'object_id', 'name', "Select Table");
            }
        });
    }
    function GetColumnsTable() {
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
        List_Data_Columns_Table = new Array();
        Ajax.CallAsync({
            url: Url.Action("GetColumnsTable", "GeneralSQL"),
            data: { RepP: _Data },
            success: function (d) {
                debugger;
                var res = d;
                List_Data_Columns_Table = res;
                DocumentActions.FillCombowithdefult(res, Columns_Table, 'name', 'name', "Select Columns");
                for (var i = 0; i < List_DataSours.length; i++) {
                    var List_Name_table = new Data_Columns_Table();
                    List_Name_table.name = List_DataSours[i].name;
                    List_Data_Columns_Table.push(List_Name_table);
                }
                var List0 = new Data_Columns_Table();
                List0.name = "Select * From ";
                List_Data_Columns_Table.push(List0);
                var List = new Data_Columns_Table();
                List.name = "Select ";
                List_Data_Columns_Table.push(List);
                var List1 = new Data_Columns_Table();
                List1.name = "insert into  ";
                List_Data_Columns_Table.push(List1);
                var List2 = new Data_Columns_Table();
                List2.name = "Update ";
                List_Data_Columns_Table.push(List2);
                var List3 = new Data_Columns_Table();
                List3.name = "From ";
                List_Data_Columns_Table.push(List3);
                var List4 = new Data_Columns_Table();
                List4.name = "inner join ";
                List_Data_Columns_Table.push(List4);
                var List5 = new Data_Columns_Table();
                List5.name = "outer join ";
                List_Data_Columns_Table.push(List5);
                var List6 = new Data_Columns_Table();
                List6.name = "left join ";
                List_Data_Columns_Table.push(List6);
                var List7 = new Data_Columns_Table();
                List7.name = "right join ";
                List_Data_Columns_Table.push(List7);
                var List8 = new Data_Columns_Table();
                List8.name = "set ";
                List_Data_Columns_Table.push(List8);
                var List9 = new Data_Columns_Table();
                List9.name = "null ";
                List_Data_Columns_Table.push(List9);
                var List10 = new Data_Columns_Table();
                List10.name = "where ";
                List_Data_Columns_Table.push(List10);
                var List11 = new Data_Columns_Table();
                List11.name = "isnull(,0) ";
                List_Data_Columns_Table.push(List11);
                var List12 = new Data_Columns_Table();
                List12.name = "year() ";
                List_Data_Columns_Table.push(List12);
                var List13 = new Data_Columns_Table();
                List13.name = "Sum() ";
                List_Data_Columns_Table.push(List13);
                var List14 = new Data_Columns_Table();
                List14.name = "Max() ";
                List_Data_Columns_Table.push(List14);
                var List15 = new Data_Columns_Table();
                List15.name = "ORDER BY  ";
                List_Data_Columns_Table.push(List15);
                var List16 = new Data_Columns_Table();
                List16.name = "count(*) ";
                List_Data_Columns_Table.push(List16);
                var List17 = new Data_Columns_Table();
                List17.name = "group by ";
                List_Data_Columns_Table.push(List17);
                var List18 = new Data_Columns_Table();
                List18.name = "DESC ";
                List_Data_Columns_Table.push(List18);
                var List19 = new Data_Columns_Table();
                List19.name = "ASC ";
                List_Data_Columns_Table.push(List19);
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
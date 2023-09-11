//*************************************************Page_Ts*********************
$(document).ready(function () {
    var Grid = new ESGrid();
    var Display_AllRes;
    //var ShowData: HTMLButtonElement; 
    var SelectText;
    var RefreshDisplay;
    var GenerateModels;
    var ConactServer;
    var ConactUser;
    var ConactPassword;
    var Conact;
    var DataSours;
    var Columns_Table;
    var ORDER_Table;
    var Database;
    var top;
    var New_Query;
    var autocompleteList;
    var List_Data_Columns_Table;
    //var Cnt = Number(sessionStorage.getItem('Cnt_Page'));
    var Cnt = Number($("#Cnt_Page").val());
    TestGradInitalizeComponent();
    var List_DataSours = new Array();
    var _lastWord = "";
    var ListLike = ["Select * From ", "Select ", "insert into  ", "Update ", "From ",
        "inner join ", "outer join ", "left join ", "right join ", "set ", "null ", "year() ",
        "where ", "isnull(,0) ", "Sum() ", "Max() ", "ORDER BY  ", "count(*) ", "group by ", "DESC ", "ASC ",
        "Top(100)"];
    function TestGradInitalizeComponent() {
        $("#layout_Refresh").removeClass('display_none');
        $("#layout_Back").removeClass('display_none');
        $("#layout_Refresh").addClass('display_none');
        $("#layout_Back").addClass('display_none');
        ConactServer = document.getElementById('Server' + Cnt);
        ConactUser = document.getElementById('User' + Cnt);
        ConactPassword = document.getElementById('Password' + Cnt);
        //ShowData = document.getElementById('ShowData') as HTMLButtonElement 
        debugger;
        New_Query = document.getElementById('New_Query' + Cnt);
        SelectText = document.getElementById('SelectText' + Cnt);
        RefreshDisplay = document.getElementById('RefreshDisplay' + Cnt);
        GenerateModels = document.getElementById('GenerateModels' + Cnt);
        Conact = document.getElementById('Conact' + Cnt);
        Database = document.getElementById('Database' + Cnt);
        DataSours = document.getElementById('DataSours' + Cnt);
        Columns_Table = document.getElementById('Columns_Table' + Cnt);
        ORDER_Table = document.getElementById('ORDER_Table' + Cnt);
        top = document.getElementById('top' + Cnt);
        autocompleteList = document.getElementById("autocompleteList" + Cnt);
        ConactServer.onchange = SetSession;
        ConactUser.onchange = SetSession;
        ConactPassword.onchange = SetSession;
        ConactServer.onkeyup = SetSession;
        ConactUser.onkeyup = SetSession;
        ConactPassword.onkeyup = SetSession;
        Conact.onclick = Conact_onclick;
        debugger;
        SelectText.onclick = SelectText_Onclick;
        RefreshDisplay.onclick = RefreshDisplay_All;
        GenerateModels.onclick = GenerateModels_onclick;
        Database.onchange = ConactServer_onclick;
        DataSours.onchange = DataSours_onchange;
        top.onchange = function () { $('#New_Query' + Cnt).val(''); };
        Columns_Table.onchange = function () { $('#New_Query' + Cnt).val(''); };
        ORDER_Table.onchange = function () { $('#New_Query' + Cnt).val(''); };
        InitializeGridControl();
        New_Query.addEventListener("input", handleInput);
        New_Query.addEventListener("mouseup", handleMouseUp);
        New_Query.addEventListener("select", handleMouseUp);
        New_Query.addEventListener("click", handleMouseUp);
        Event_key('Enter', 'New_Query' + Cnt, 'SelectText' + Cnt);
        setTimeout(function () { $('#Body_animated').removeClass('animate__bounceInLeft'); }, 500);
        SetSession();
    }
    function SetSession() {
        sessionStorage.setItem('Server', $('#Server' + (Cnt - 1)).val());
        sessionStorage.setItem('User', $('#User' + (Cnt - 1)).val());
        sessionStorage.setItem('Password', $('#Password' + (Cnt - 1)).val());
        sessionStorage.setItem('Database', $('#Database' + (Cnt - 1)).val());
    }
    function handleMouseUp() {
        debugger;
        var selection = window.getSelection();
        var selectedText = selection.toString();
        var startPosition = selection.anchorOffset;
        var endPosition = selection.focusOffset;
        var textContent = New_Query.value.toLowerCase();
        var words = textContent.split(/\s+/); // Split by spaces
        var lastWord = "";
        for (var i = words.length - 1; i >= 0; i--) {
            if (words[i].trim() == selectedText) {
                lastWord = words[i];
                break;
            }
        }
        _lastWord = lastWord;
        var suggestions = List_Data_Columns_Table.filter(function (item) { return item.name.toLowerCase().includes(lastWord); });
        renderSuggestions(suggestions);
    }
    function handleInput() {
        debugger;
        var textContent = New_Query.value.toLowerCase();
        var words = textContent.split(/\s+/); // Split by spaces
        var lastWord = words[words.length - 1];
        _lastWord = lastWord;
        var suggestions = List_Data_Columns_Table.filter(function (item) { return item.name.toLowerCase().includes(lastWord); });
        renderSuggestions(suggestions);
    }
    function renderSuggestions(suggestions) {
        autocompleteList.innerHTML = "";
        suggestions.forEach(function (suggestion) {
            debugger;
            var listItem = document.createElement("li");
            listItem.textContent = suggestion.name;
            listItem.addEventListener("click", function () {
                debugger;
                var textContent = New_Query.value.toLowerCase();
                var words = textContent.split(/\s+/);
                debugger;
                var lastWord = "";
                for (var i = words.length - 1; i >= 0; i--) {
                    if (words[i].trim() == _lastWord) {
                        lastWord = words[i];
                        break;
                    }
                }
                debugger;
                var last_text = textContent;
                try {
                    var newText = textContent.replace(new RegExp("\\" + lastWord, "ig"), suggestion.name);
                    New_Query.value = newText;
                    if (last_text == newText) {
                        var newText_1 = textContent.replace(new RegExp(lastWord, "ig"), suggestion.name);
                        New_Query.value = newText_1;
                    }
                }
                catch (e) {
                    var newText = textContent.replace(new RegExp(lastWord + "$", "i"), suggestion.name);
                    New_Query.value = newText;
                }
                debugger;
                autocompleteList.innerHTML = "";
            });
            autocompleteList.appendChild(listItem);
        });
    }
    function SelectText_Onclick() {
        var itemList = document.getElementById("autocompleteList" + Cnt);
        var firstItem = itemList.querySelector("li:first-child");
        if (firstItem) {
            firstItem.click();
        }
    }
    function Conact_onclick() {
        var rp = new SqlEnt();
        rp.Server = $('#Server' + Cnt).val();
        rp.Password = $('#Password' + Cnt).val();
        rp.User = $('#User' + Cnt).val();
        debugger;
        //rp.Server = sessionStorage.getItem('Server');
        //rp.Password = sessionStorage.getItem('Password');  
        //rp.User = sessionStorage.getItem('User'); 
        Ajax.CallAsync({
            url: Url.Action("GetNameData", "GeneralSQL"),
            data: rp,
            success: function (d) {
                var result = d;
                debugger;
                if (result.success) {
                    Database.innerHTML = '<option value="null">Select Database</option>';
                    for (var i = 0; i < result.TableName.length; i++) {
                        if (result.TableName[i] != 'tempdb' && result.TableName[i] != 'master' && result.TableName[i] != 'msdb' && result.TableName[i] != 'model') {
                            $('#Database' + Cnt).append('<option value="' + result.TableName[i] + '">' + result.TableName[i] + '</option>');
                        }
                    }
                    SetSession();
                }
                else {
                    alert('يوجد خطأ في الاتصال في الداته بيز');
                }
            }
        });
    }
    function DataSours_onchange() {
        if (DataSours.value == 'null') {
            $('#New_Query' + Cnt).val('');
            $('#Columns_Table' + Cnt).html('');
        }
        else {
            $('#New_Query' + Cnt).val('');
            GetColumnsTable();
        }
    }
    function ConactServer_onclick() {
        debugger;
        $('#New_Query' + Cnt).val('');
        $('#Columns_Table' + Cnt).html('');
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
        if ($('#New_Query' + Cnt).val().trim() == '') {
            if (Columns_Table.value.trim() == '' || Columns_Table.value == 'null') {
                $('#New_Query' + Cnt).val('Select TOP (' + $('#top' + Cnt).val() + ') * from ' + $("#DataSours" + Cnt + " option:selected").text() + '');
            }
            if (Columns_Table.value.trim() != '' && Columns_Table.value != 'null') {
                $('#New_Query' + Cnt).val('Select TOP (' + $('#top' + Cnt).val() + ') * from ' + $("#DataSours" + Cnt + " option:selected").text() + ' ORDER BY ' + Columns_Table.value + ' ' + ORDER_Table.value + '');
            }
        }
        GenerateMode();
    }
    function GetsqlData() {
        var rp = new SqlEnt();
        rp.Database = $('#Database' + Cnt).val();
        rp.Server = $('#Server' + Cnt).val();
        rp.Password = $('#Password' + Cnt).val();
        rp.User = $('#User' + Cnt).val();
        //rp.Server = sessionStorage.getItem('Server');
        //rp.Password = sessionStorage.getItem('Password');
        //rp.User = sessionStorage.getItem('User'); 
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
        rp.Database = $('#Database' + Cnt).val();
        rp.Server = $('#Server' + Cnt).val();
        rp.Password = $('#Password' + Cnt).val();
        rp.User = $('#User' + Cnt).val();
        //rp.Server = sessionStorage.getItem('Server');
        //rp.Password = sessionStorage.getItem('Password');
        //rp.User = sessionStorage.getItem('User'); 
        rp.New_Query = $('#New_Query' + Cnt).val();
        model.name = $("#DataSours" + Cnt + " option:selected").text();
        model.object_id = $('#DataSours' + Cnt).val();
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
                for (var p = 0; p < ListLike.length; p++) {
                    var List = new Data_Columns_Table();
                    List.name = ListLike[p];
                    List_Data_Columns_Table.push(List);
                }
                for (var i = 0; i < List_DataSours.length; i++) {
                    var List_Name_table = new Data_Columns_Table();
                    List_Name_table.name = List_DataSours[i].name;
                    List_Data_Columns_Table.push(List_Name_table);
                }
            }
        });
    }
    function GenerateMode() {
        var model = new SqlTables();
        var modelSql = new ModelSql();
        var rp = new SqlEnt();
        rp.Database = $('#Database' + Cnt).val();
        rp.Server = $('#Server' + Cnt).val();
        rp.Password = $('#Password' + Cnt).val();
        rp.User = $('#User' + Cnt).val();
        //rp.Server = sessionStorage.getItem('Server');
        //rp.Password = sessionStorage.getItem('Password');
        //rp.User = sessionStorage.getItem('User'); 
        rp.New_Query = $('#New_Query' + Cnt).val();
        model.name = $("#DataSours" + Cnt + " option:selected").text();
        model.object_id = $('#DataSours' + Cnt).val();
        modelSql.sqlTables = model;
        modelSql.sqlEnt = rp;
        var _Data = JSON.stringify(modelSql);
        Ajax.CallAsync({
            url: Url.Action("FindModels", "GeneralSQL"),
            data: { RepP: _Data },
            success: function (d) {
                debugger;
                Display_AllRes = d;
                Display_All(Display_AllRes, model.name);
            }
        });
    }
    function RefreshDisplay_All() {
        var model = new SqlTables();
        var modelSql = new ModelSql();
        var rp = new SqlEnt();
        rp.Database = $('#Database' + Cnt).val();
        rp.Server = $('#Server' + Cnt).val();
        rp.Password = $('#Password' + Cnt).val();
        rp.User = $('#User' + Cnt).val();
        //rp.Server = sessionStorage.getItem('Server');
        //rp.Password = sessionStorage.getItem('Password');
        //rp.User = sessionStorage.getItem('User'); 
        rp.New_Query = $('#New_Query' + Cnt).val();
        model.name = $("#DataSours" + Cnt + " option:selected").text();
        model.object_id = $('#DataSours' + Cnt).val();
        modelSql.sqlTables = model;
        modelSql.sqlEnt = rp;
        if (Display_AllRes != undefined && Display_AllRes != 'undefined' && Display_AllRes != null) {
            Display_All(Display_AllRes, model.name);
        }
    }
    function Display_All(res, NameTaple) {
        debugger;
        var Model;
        try {
            Model = JSON.parse(res.Columns_Models[0]);
        }
        catch (e) {
            return false;
        }
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
            //let _SearchGrid: SearchGrid = new SearchGrid();
            var values = SearchGrid.SearchDataGrid.SelectedKey;
            Grid.ESG.Model;
            Grid.ESG.NameTable = 'Grad1' + Cnt;
            EditGridControl(Grid);
            Grid.ESG.LastCounter = 0;
            Grid.ESG.LastCounterAdd = 0;
            $('#tbody_' + Grid.ESG.NameTable + '').html('');
            BuildGridControl(true, Grid);
            Grid.ESG.LastCounterAdd = 1;
            var NameTable = Grid.ESG.NameTable;
            debugger;
            for (var u = 0; u < Grid.Column.length; u++) {
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
        //let _SearchGrid: SearchGrid = new SearchGrid();
        SearchGrid.SearchDataGrid = new DataTable();
        SearchGrid.SearchDataGrid.Columns = columns;
        SearchGrid;
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
        SearchGrid.SearchDataGrid.Bind(Cnt);
        SearchGrid.SearchDataGrid.OnDoubleClick = function () {
            debugger;
            console.log(SearchGrid.SearchDataGrid.SelectedKey);
            //salert(SearchGrid.SearchDataGrid.SelectedKey)
            $("#SearchBox").modal("hide"); //.css("display", "none");
            OnSearchSelected();
        };
        document.getElementById("searchTitle" + Cnt).innerText = NameTable;
        $(".ui-igedit-input").keyup(function (e) {
        });
        $("#SearchBox").modal("show"); //.css("display", "");// 
        $("#SearchDataTable").css("width", "100%");
        $("#SearchDataTable").css("height", "100%");
    }
    function InitializeGridControl() {
        Grid = new ESGrid();
        Grid = JSON.parse(JSON.stringify(Grid));
        Grid.ESG.NameTable = 'Grad1' + Cnt;
        Grid.ESG.OnfunctionSave = SaveNew;
        Grid.ESG.OnfunctionTotal = computeTotal;
        Grid.ESG.OnRowDoubleClicked = DoubleClicked;
        //DisplayDataGridControl(I_D_UOMDetails, Grid);
    }
    function SaveNew() {
        console.log(Grid.ESG.Model);
        var model = new SqlTables();
        var modelSql = new ModelSql();
        var rp = new SqlEnt();
        rp.Database = $('#Database' + Cnt).val();
        rp.Server = $('#Server' + Cnt).val();
        rp.Password = $('#Password' + Cnt).val();
        rp.User = $('#User' + Cnt).val();
        //rp.Server = sessionStorage.getItem('Server');
        //rp.Password = sessionStorage.getItem('Password');
        //rp.User = sessionStorage.getItem('User'); 
        rp.New_Query = $('#New_Query' + Cnt).val();
        model.name = $("#DataSours" + Cnt + " option:selected").text();
        model.object_id = $('#DataSours' + Cnt).val();
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
                    Display_AllRes = d;
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
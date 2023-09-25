
//*************************************************Page_Ts*********************

$(document).ready(() => {

    var Grid: ESGrid = new ESGrid();
    var Display_AllRes;
    //var ShowData: HTMLButtonElement; 
    var SelectText: HTMLButtonElement;
    var RefreshDisplay: HTMLButtonElement;
    var GenerateModels: HTMLButtonElement;
    var ConactServer: HTMLButtonElement;
    var ConactUser: HTMLButtonElement;
    var ConactPassword: HTMLButtonElement;
    var Conact: HTMLButtonElement;
    var DataSours: HTMLSelectElement;
    var Columns_Table: HTMLSelectElement;
    var ORDER_Table: HTMLSelectElement;
    var Database: HTMLSelectElement;
    var top: HTMLSelectElement;
    var New_Query: HTMLTextAreaElement;
    var autocompleteList;
    var List_Data_Columns_Table;
    //var Cnt = Number(sessionStorage.getItem('Cnt_Page'));
    var Cnt = Number($("#Cnt_Page").val());

    TestGradInitalizeComponent();
    var List_DataSours: Array<SqlTables> = new Array<SqlTables>();
    var _lastWord = "";


    var ListLike = ["Select * From ", "Select ", "insert into  ", "Update ", "From ",
        "inner join ", "outer join ", "left join ", "right join ", "set ", "null ", "year() ",
        "where ", "isnull(,0) ", "Sum() ", "Max() ", "ORDER BY  ", "count(*) ", "group by ", "DESC ", "ASC ",
        "Top(100)"]

    function TestGradInitalizeComponent() {


        $("#layout_Refresh").removeClass('display_none');
        $("#layout_Back").removeClass('display_none');


        $("#layout_Refresh").addClass('display_none');
        $("#layout_Back").addClass('display_none');


        ConactServer = document.getElementById('Server' + Cnt) as HTMLButtonElement
        ConactUser = document.getElementById('User' + Cnt) as HTMLButtonElement
        ConactPassword = document.getElementById('Password' + Cnt) as HTMLButtonElement

        //ShowData = document.getElementById('ShowData') as HTMLButtonElement 
        debugger
        New_Query = document.getElementById('New_Query' + Cnt) as HTMLTextAreaElement
        SelectText = document.getElementById('SelectText' + Cnt) as HTMLButtonElement
        RefreshDisplay = document.getElementById('RefreshDisplay' + Cnt) as HTMLButtonElement
        GenerateModels = document.getElementById('GenerateModels' + Cnt) as HTMLButtonElement
        Conact = document.getElementById('Conact' + Cnt) as HTMLButtonElement
        Database = document.getElementById('Database' + Cnt) as HTMLSelectElement
        DataSours = document.getElementById('DataSours' + Cnt) as HTMLSelectElement
        Columns_Table = document.getElementById('Columns_Table' + Cnt) as HTMLSelectElement
        ORDER_Table = document.getElementById('ORDER_Table' + Cnt) as HTMLSelectElement
        top = document.getElementById('top' + Cnt) as HTMLSelectElement

        autocompleteList = document.getElementById("autocompleteList" + Cnt);


        ConactServer.onchange = SetSession;
        ConactUser.onchange = SetSession;
        ConactPassword.onchange = SetSession;

        ConactServer.onkeyup = SetSession;
        ConactUser.onkeyup = SetSession;
        ConactPassword.onkeyup = SetSession;


        Conact.onclick = Conact_onclick;
        debugger
        SelectText.onclick = SelectText_Onclick;
        RefreshDisplay.onclick = RefreshDisplay_All;
        GenerateModels.onclick = GenerateModels_onclick;
        Database.onchange = ConactServer_onclick;
        DataSours.onchange = DataSours_onchange;
        top.onchange = () => { $('#New_Query' + Cnt).val('') };
        Columns_Table.onchange = () => { $('#New_Query' + Cnt).val('') };
        ORDER_Table.onchange = () => { $('#New_Query' + Cnt).val('') };

        InitializeGridControl();

        New_Query.addEventListener("input", handleInput);
        New_Query.addEventListener("mouseup", handleMouseUp);
        New_Query.addEventListener("select", handleMouseUp);
        New_Query.addEventListener("click", handleMouseUp);

        Event_key('Enter', 'New_Query' + Cnt, 'SelectText' + Cnt);

        setTimeout(function () { $('#Body_animated' + Cnt).removeClass('animate__bounceInLeft') }, 500);

        SetSession();

    }

    function SetSession() {
        sessionStorage.setItem('Server', $('#Server' + (Cnt - 1)).val());
        sessionStorage.setItem('User', $('#User' + (Cnt - 1)).val());
        sessionStorage.setItem('Password', $('#Password' + (Cnt - 1)).val());
        sessionStorage.setItem('Database', $('#Database' + (Cnt - 1)).val());
        sessionStorage.setItem('DataSours', $('#DataSours' + (Cnt - 1)).val());
    }

    function handleMouseUp() {
        debugger
        const selection = window.getSelection();
        const selectedText = selection.toString();
        const startPosition = selection.anchorOffset;
        const endPosition = selection.focusOffset;

        const textContent = New_Query.value.toLowerCase();
        const words = textContent.split(/\s+/); // Split by spaces

        let lastWord = "";
        for (let i = words.length - 1; i >= 0; i--) {
            if (words[i].trim() == selectedText) {
                lastWord = words[i];
                break;
            }
        }

        _lastWord = lastWord

        const suggestions = List_Data_Columns_Table.filter(item => item.name.toLowerCase().includes(lastWord));

        renderSuggestions(suggestions);


    }

    function handleInput() {
        debugger
        const textContent = New_Query.value.toLowerCase();
        const words = textContent.split(/\s+/); // Split by spaces

        const lastWord = words[words.length - 1];

        _lastWord = lastWord

        const suggestions = List_Data_Columns_Table.filter(item => item.name.toLowerCase().includes(lastWord));

        renderSuggestions(suggestions);
    }

    function renderSuggestions(suggestions) {
        autocompleteList.innerHTML = "";

        suggestions.forEach(suggestion => {
            debugger
            const listItem = document.createElement("li");
            listItem.textContent = suggestion.name;

            listItem.addEventListener("click", () => {
                debugger
                const textContent = New_Query.value.toLowerCase();
                const words = textContent.split(/\s+/);
                debugger
                let lastWord = "";
                for (let i = words.length - 1; i >= 0; i--) {
                    if (words[i].trim() == _lastWord) {
                        lastWord = words[i];
                        break;
                    }
                }

                debugger

                let last_text = textContent;
                try {
                    const newText = textContent.replace(new RegExp("\\" + lastWord, "ig"), " "+suggestion.name);
                    New_Query.value = newText;
                    if (last_text == newText) {
                        const newText = textContent.replace(new RegExp(lastWord, "ig"), " " + suggestion.name);
                        New_Query.value = newText;
                    }
                } catch (e) {
                    const newText = textContent.replace(new RegExp(lastWord + "$", "i"), " " + suggestion.name);
                    New_Query.value = newText;
                }


                debugger
                autocompleteList.innerHTML = "";
            });

            autocompleteList.appendChild(listItem);
        });
    }


    function SelectText_Onclick() {
        const itemList = document.getElementById("autocompleteList" + Cnt);
        const firstItem = itemList.querySelector("li:first-child") as HTMLLIElement;
        if (firstItem) {
            firstItem.click();
        }

    }


    function Conact_onclick() {

        let rp: SqlEnt = new SqlEnt();

        rp.Server = $('#Server' + Cnt).val();
        rp.Password = $('#Password' + Cnt).val();
        rp.User = $('#User' + Cnt).val();
        debugger
        //rp.Server = sessionStorage.getItem('Server');
        //rp.Password = sessionStorage.getItem('Password');  
        //rp.User = sessionStorage.getItem('User'); 

        Ajax.CallAsync({
            url: Url.Action("GetNameData", "GeneralSQL"),
            data: rp,
            success: (d) => {
                let result = d
                debugger

                if (result.success) {
                    Database.innerHTML = '<option value="null">Select Database</option>';
                    for (var i = 0; i < result.TableName.length; i++) {
                        if (result.TableName[i] != 'tempdb' && result.TableName[i] != 'master' && result.TableName[i] != 'msdb' && result.TableName[i] != 'model') {
                            $('#Database' + Cnt).append('<option value="' + result.TableName[i] + '">' + result.TableName[i] + '</option>')

                        }
                    }

                    SetSession();

                }
                else {
                    alert('يوجد خطأ في الاتصال في الداته بيز')
                }


            }
        })

    }
    function DataSours_onchange() {

        if (DataSours.value == 'null') {

            $('#New_Query' + Cnt).val('')
            $('#Columns_Table' + Cnt).html('')
        }
        else {
            $('#New_Query' + Cnt).val('')
            GetColumnsTable();

        }

    }
    function ConactServer_onclick() {
        debugger
        $('#New_Query' + Cnt).val('')
        $('#Columns_Table' + Cnt).html('')
        GetsqlData();

    }

    function GenerateModels_onclick() {

        if (Database.value.trim() == '' || Database.value == 'null') {
            Errorinput(Database)
            return
        }
        if (DataSours.value.trim() == '' || DataSours.value == 'null') {
            Errorinput(DataSours)
            return
        }

        if ($('#New_Query' + Cnt).val().trim() == '') {

            if (Columns_Table.value.trim() == '' || Columns_Table.value == 'null') {
                $('#New_Query' + Cnt).val('Select TOP (' + $('#top' + Cnt).val() + ') * from ' + $("#DataSours" + Cnt + " option:selected").text() + '')
            }

            if (Columns_Table.value.trim() != '' && Columns_Table.value != 'null') {
                $('#New_Query' + Cnt).val('Select TOP (' + $('#top' + Cnt).val() + ') * from ' + $("#DataSours" + Cnt + " option:selected").text() + ' ORDER BY ' + Columns_Table.value + ' ' + ORDER_Table.value + '')
            }
        }



        GenerateMode();
    }

    function GetsqlData() {

        let rp: SqlEnt = new SqlEnt();

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
            success: (d) => {
                let result = d
                debugger
                let res = result as Array<SqlTables>;

                List_DataSours = res;

                DocumentActions.FillCombowithdefult(result, DataSours, 'object_id', 'name', "Select Table");


            }
        })

    }


    function GetColumnsTable() {

        let model: SqlTables = new SqlTables();
        let modelSql: ModelSql = new ModelSql();

        let rp: SqlEnt = new SqlEnt();

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

        let _Data: string = JSON.stringify(modelSql);
        List_Data_Columns_Table = new Array<Data_Columns_Table>();
        Ajax.CallAsync({
            url: Url.Action("GetColumnsTable", "GeneralSQL"),
            data: { RepP: _Data },
            success: (d) => {
                debugger
                let res = d
                List_Data_Columns_Table = res;

                DocumentActions.FillCombowithdefult(res, Columns_Table, 'name', 'name', "Select Columns");


                for (var p = 0; p < ListLike.length; p++) {
                    let List: Data_Columns_Table = new Data_Columns_Table();
                    List.name = ListLike[p];
                    List_Data_Columns_Table.push(List);
                }

                for (var i = 0; i < List_DataSours.length; i++) {
                    let List_Name_table: Data_Columns_Table = new Data_Columns_Table();
                    List_Name_table.name = List_DataSours[i].name;
                    List_Data_Columns_Table.push(List_Name_table);
                }




            }
        })

    }


    function GenerateMode() {

        let model: SqlTables = new SqlTables();
        let modelSql: ModelSql = new ModelSql();

        let rp: SqlEnt = new SqlEnt();

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

        let _Data: string = JSON.stringify(modelSql);

        Ajax.CallAsync({
            url: Url.Action("FindModels", "GeneralSQL"),
            data: { RepP: _Data },
            success: (d) => {
                debugger
                Display_AllRes = d

                Display_All(Display_AllRes, model.name)

            }
        })

    }

    function RefreshDisplay_All() {

        let model: SqlTables = new SqlTables();
        let modelSql: ModelSql = new ModelSql();

        let rp: SqlEnt = new SqlEnt();

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
            Display_All(Display_AllRes, model.name)
        }
    }


    function Display_All(res, NameTaple) {
        debugger
        var Model: any;
        try {
            Model = JSON.parse(res.Columns_Models[0]);

        } catch (e) {
            return false
        }

        Grid.Column = new Array<Column>();

        let properties = Object.getOwnPropertyNames(Model);
        for (var property of properties) {

            let Colum: Column = new Column();
            Colum.Name = "" + property + "";
            Colum.title = "" + property + "";

            let NameTyp = res.Columns.filter(x => x.headerText == property);
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
        debugger
        Model['StatusFlag'] = '';
        Grid.ESG.object = Model;
        Grid.ESG.LastCounter = 0;
        Grid.ESG.LastCounterAdd = 0;
        BindGridControl(Grid);

        Display_Data(res, NameTaple, () => {
            debugger
            //let _SearchGrid: SearchGrid = new SearchGrid();
            var values = SearchGrid.SearchDataGrid.SelectedKey;
            Grid.ESG.Model
            Grid.ESG.NameTable = 'Grad1' + Cnt;
            EditGridControl(Grid);

            Grid.ESG.LastCounter = 0;
            Grid.ESG.LastCounterAdd = 0;





            $('#tbody_' + Grid.ESG.NameTable + '').html('');


            BuildGridControl(true, Grid);

            Grid.ESG.LastCounterAdd = 1;

            let NameTable = Grid.ESG.NameTable;
            debugger
            for (let u = 0; u < Grid.Column.length; u++) {


                debugger
                if (Grid.Column[u].ColumnType.NameType == 'checkbox') {
                    if (values[u] == "1" || values[u] == "true") {

                        $('#' + NameTable + '_' + Grid.Column[u].Name + 0 + '').prop('checked', true)
                    }
                    else {

                        $('#' + NameTable + '_' + Grid.Column[u].Name + 0 + '').prop('checked', false)
                    }
                }
                else if (Grid.Column[u].ColumnType.NameType == 'date') {
                    debugger
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

        debugger

    }

    function Display_Data(res: any, NameTable: string, OnSearchSelected: () => void) {
        debugger
        var response: any = res;

        let columns = response.Columns as Array<datatableColumn>;
        let result = JSON.parse(response.DataResult);

        //let _SearchGrid: SearchGrid = new SearchGrid();

        SearchGrid.SearchDataGrid = new DataTable();
        SearchGrid.SearchDataGrid.Columns = columns;
        SearchGrid
        SearchGrid.SearchDataGrid.dataScr = result;
        SearchGrid.SearchDataGrid.ElementName = "SearchDataTable";
        SearchGrid.SearchDataGrid.PageSize = 10;// < 50 ? 50 : settings.PageSize;
        SearchGrid.SearchDataGrid.PrimaryKey = "ID"; //"RowIndex";

        let boxWidth: string = "100%";
        let boxHeight: string = "100%";
        let boxLeft: string = "100%";
        let boxTop: string = "100%";

        $("#SearchBox").css("width", boxWidth);
        $("#SearchBox").css("height", boxHeight);
        $("#SearchBox").css("left", boxLeft);
        $("#SearchBox").css("top", boxTop);

        SearchGrid.SearchDataGrid.Bind(Cnt);


        SearchGrid.SearchDataGrid.OnDoubleClick = () => {

            debugger
            console.log(SearchGrid.SearchDataGrid.SelectedKey);

            //salert(SearchGrid.SearchDataGrid.SelectedKey)

            $("#SearchBox").modal("hide");//.css("display", "none");
            OnSearchSelected();
        };


        document.getElementById("searchTitle" + Cnt).innerText = NameTable;


        $(".ui-igedit-input").keyup((e) => {

        });

        $("#SearchBox").modal("show");//.css("display", "");// 

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

        console.log(Grid.ESG.Model)






        let model: SqlTables = new SqlTables();
        let modelSql: ModelSql = new ModelSql();

        let rp: SqlEnt = new SqlEnt();

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

        let _Data: string = JSON.stringify(modelSql);

        debugger


        if (Grid.ESG.CountModel == 0) {
            alert('لا يوجد اي تعديل للحفظ')
            return;
        }

        Ajax.CallAsync({
            url: Url.Action("InsetDataNew", "GeneralSQL"),
            data: { RepP: _Data },
            success: (d) => {

                debugger
                let res = d
                if (res.success == true) {
                    Display_AllRes = d
                    Display_All(res, model.name)

                }
                else {
                    alert(res)
                }

            }
        })



    }
    function computeTotal() {
        console.log(Grid.ESG.TotalModel);
    }
    function DoubleClicked() {
        //alert(Grid.ESG.SelectedKey);
    }


})
















$(document).ready(() => {

    var Grid: ESGrid = new ESGrid();

    //var ShowData: HTMLButtonElement; 
    var SelectText: HTMLButtonElement;
    var GenerateModels: HTMLButtonElement;
    //var ConactServer: HTMLButtonElement;
    var Conact: HTMLButtonElement;
    var DataSours: HTMLSelectElement;
    var Columns_Table: HTMLSelectElement;
    var ORDER_Table: HTMLSelectElement;
    var Database: HTMLSelectElement;
    var top: HTMLSelectElement;
    var New_Query: HTMLTextAreaElement;
    var autocompleteList;
    var List_Data_Columns_Table;
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



        //ShowData = document.getElementById('ShowData') as HTMLButtonElement 
        New_Query = document.getElementById('New_Query') as HTMLTextAreaElement
        SelectText = document.getElementById('SelectText') as HTMLButtonElement
        GenerateModels = document.getElementById('GenerateModels') as HTMLButtonElement
        Conact = document.getElementById('Conact') as HTMLButtonElement
        //ConactServer = document.getElementById('ConactServer') as HTMLButtonElement
        Database = document.getElementById('Database') as HTMLSelectElement
        DataSours = document.getElementById('DataSours') as HTMLSelectElement
        Columns_Table = document.getElementById('Columns_Table') as HTMLSelectElement
        ORDER_Table = document.getElementById('ORDER_Table') as HTMLSelectElement
        top = document.getElementById('top') as HTMLSelectElement

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
        top.onchange = () => { $('#New_Query').val('') };
        Columns_Table.onchange = () => { $('#New_Query').val('') };
        ORDER_Table.onchange = () => { $('#New_Query').val('') };
        //ShowData.onclick = ShowData_onclick;

        InitializeGridControl();

        New_Query.addEventListener("input", handleInput);
        New_Query.addEventListener("mouseup", handleMouseUp);
        New_Query.addEventListener("select", handleMouseUp);  
        New_Query.addEventListener("click", handleMouseUp);

        Event_key('Enter', 'New_Query', 'SelectText');
         
        setTimeout(function () { $('#Body_animated').removeClass('animate__bounceInLeft') }, 500);
       
        
    }


    //function handleInput() {
    //    const textArray = New_Query.value.toLowerCase().split(' ');
    //    const lastWord = textArray[textArray.length - 1];

    //    const suggestions = List_Data_Columns_Table.filter(item => item.name.toLowerCase().startsWith(lastWord));

    //    renderSuggestions(suggestions);
    //}

    //function renderSuggestions(suggestions) {
    //    autocompleteList.innerHTML = "";

    //    suggestions.forEach(suggestion => {
    //        const listItem = document.createElement("li");
    //        listItem.textContent = suggestion.name;

    //        listItem.addEventListener("click", () => {
    //            const textArray = New_Query.value.toLowerCase().split(' ');
    //            textArray[textArray.length - 1] = suggestion.name;
    //            New_Query.value = textArray.join(' ');
    //            autocompleteList.innerHTML = "";
    //        });

    //        autocompleteList.appendChild(listItem);
    //    });
    //}

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
                //const lastWord = words[words.length - 1];
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
                    const newText = textContent.replace(new RegExp("\\" + lastWord, "ig"), suggestion.name);
                    New_Query.value = newText;
                    if (last_text == newText) {
                        const newText = textContent.replace(new RegExp(lastWord, "ig"), suggestion.name);
                        New_Query.value = newText;
                    }
                } catch (e) {
                    const newText = textContent.replace(new RegExp(lastWord + "$", "i"), suggestion.name);
                    New_Query.value = newText;
                }
              
              
                debugger
                autocompleteList.innerHTML = "";
            });

            autocompleteList.appendChild(listItem);
        });
    }


    function SelectText_Onclick() {
        const itemList = document.getElementById("autocompleteList");
        const firstItem = itemList.querySelector("li:first-child") as HTMLLIElement;
        if (firstItem) {
            firstItem.click();
        }

    }


    function Conact_onclick() {

        let rp: SqlEnt = new SqlEnt();

        //rp.Database = $('#Database').val();
        rp.Server = $('#Server').val();
        rp.Password = $('#Password').val();
        rp.User = $('#User').val();

        Ajax.CallAsync({
            url: Url.Action("GetNameData", "GeneralSQL"),
            data: rp,
            success: (d) => {
                let result = d
                debugger
                //let res = result as SqlTables;

                if (result.success) {
                    Database.innerHTML = '<option value="null">Select Database</option>';
                    for (var i = 0; i < result.TableName.length; i++) {
                        if (result.TableName[i] != 'tempdb' && result.TableName[i] != 'master' && result.TableName[i] != 'msdb' && result.TableName[i] != 'model') {
                            $('#Database').append('<option value="' + result.TableName[i] + '">' + result.TableName[i] + '</option>')
                            //Database.append("<option value=" + result.TableName[i] + '">Select ' + result.TableName[i] + '</option>")
                        }
                    }

                    //DocumentActions.FillCombowithdefult(result.TableName, Database, 'name', 'name', "Select Data Sours");
                }
                else {
                    alert('يوجد خطأ في الاتصال في الداته بيز')
                }


            }
        })

    }
    function DataSours_onchange() {

        if (DataSours.value == 'null') {

            $('#New_Query').val('')
            $('#Columns_Table').html('')
        }
        else {
            $('#New_Query').val('')
            GetColumnsTable();
            //$('#New_Query').val('Select TOP (' + $('#top').val() + ') * from ' + $("#DataSours option:selected").text() + '')
        }

    }
    function ConactServer_onclick() {
        debugger
        $('#New_Query').val('')
        $('#Columns_Table').html('')
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

        if ($('#New_Query').val().trim() == '') {

            if (Columns_Table.value.trim() == '' || Columns_Table.value == 'null') {
                $('#New_Query').val('Select TOP (' + $('#top').val() + ') * from ' + $("#DataSours option:selected").text() + '')
            }

            if (Columns_Table.value.trim() != '' && Columns_Table.value != 'null') {
                $('#New_Query').val('Select TOP (' + $('#top').val() + ') * from ' + $("#DataSours option:selected").text() + ' ORDER BY ' + Columns_Table.value + ' ' + ORDER_Table.value + '')
            }
        }



        GenerateMode();
    }

    function ShowData_onclick() {



        let model: SqlTables = new SqlTables();
        let modelSql: ModelSql = new ModelSql();

        let rp: SqlEnt = new SqlEnt();

        rp.Database = $('#Database').val();
        rp.Server = $('#Server').val();
        rp.Password = $('#Password').val();
        rp.User = $('#User').val();

        model.name = $("#DataSours option:selected").text();
        model.object_id = $('#DataSours').val();


        modelSql.sqlTables = model;
        modelSql.sqlEnt = rp;

        let _Data: string = JSON.stringify(modelSql);

        Ajax.CallAsync({
            url: Url.Action("ShowData", "GeneralSQL"),
            data: { RepP: _Data },
            success: (d) => {
                let result = d
                debugger
                let res = result

                var Model: Array<any> = JSON.parse(res);

                Grid.ESG.LastCounter = 0;
                Grid.ESG.LastCounterAdd = 0;
                DisplayDataGridControl(Model, Grid);


            }
        })


    }

    function GetsqlData() {

        let rp: SqlEnt = new SqlEnt();

        rp.Database = $('#Database').val();
        rp.Server = $('#Server').val();
        rp.Password = $('#Password').val();
        rp.User = $('#User').val();

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

        rp.Database = $('#Database').val();
        rp.Server = $('#Server').val();
        rp.Password = $('#Password').val();
        rp.User = $('#User').val();
        rp.New_Query = $('#New_Query').val();

        model.name = $("#DataSours option:selected").text();
        model.object_id = $('#DataSours').val();


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

        rp.Database = $('#Database').val();
        rp.Server = $('#Server').val();
        rp.Password = $('#Password').val();
        rp.User = $('#User').val();
        rp.New_Query = $('#New_Query').val();

        model.name = $("#DataSours option:selected").text();
        model.object_id = $('#DataSours').val();


        modelSql.sqlTables = model;
        modelSql.sqlEnt = rp;

        let _Data: string = JSON.stringify(modelSql);

        Ajax.CallAsync({
            url: Url.Action("FindModels", "GeneralSQL"),
            data: { RepP: _Data },
            success: (d) => {
                debugger
                let res = d

                Display_All(res, model.name)

            }
        })

    }

    function Display_All(res, NameTaple) {
        debugger

        var Model: any = JSON.parse(res.Columns_Models[0]);

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
            var values = SearchGrid.SearchDataGrid.SelectedKey;
            Grid.ESG.Model
            EditGridControl(Grid);

            Grid.ESG.LastCounter = 0;
            Grid.ESG.LastCounterAdd = 0;





            $('#tbody_' + Grid.ESG.NameTable + '').html('');


            BuildGridControl(true, Grid);

            Grid.ESG.LastCounterAdd = 1;

            let NameTable = Grid.ESG.NameTable;
            debugger
            for (let u = 0; u < Grid.Column.length; u++) {

                //$('#' + NameTable + '_' + Grid.Column[u].Name + 0 + '').val(values[u]);
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

        SearchGrid.SearchDataGrid = new DataTable();
        SearchGrid.SearchDataGrid.Columns = columns;

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

        SearchGrid.SearchDataGrid.Bind();


        SearchGrid.SearchDataGrid.OnDoubleClick = () => {

            console.log(SearchGrid.SearchDataGrid.SelectedKey);

            //salert(SearchGrid.SearchDataGrid.SelectedKey)

            $("#SearchBox").modal("hide");//.css("display", "none");
            OnSearchSelected();
        };


        document.getElementById("searchTitle").innerText = NameTable;


        $(".ui-igedit-input").keyup((e) => {

        });

        $("#SearchBox").modal("show");//.css("display", "");//
        // $("#SearchBox").addClass("in");//.css("display", "");//

        $("#SearchDataTable").css("width", "100%");
        $("#SearchDataTable").css("height", "100%");

    }


    function GenerateModeOld() {

        let model: SqlTables = new SqlTables();
        let modelSql: ModelSql = new ModelSql();

        let rp: SqlEnt = new SqlEnt();

        rp.Database = $('#Database').val();
        rp.Server = $('#Server').val();
        rp.Password = $('#Password').val();
        rp.User = $('#User').val();
        rp.New_Query = $('#New_Query').val();

        model.name = $("#DataSours option:selected").text();
        model.object_id = $('#DataSours').val();


        modelSql.sqlTables = model;
        modelSql.sqlEnt = rp;

        let _Data: string = JSON.stringify(modelSql);

        Ajax.CallAsync({
            url: Url.Action("FindModels", "GeneralSQL"),
            data: { RepP: _Data },
            success: (d) => {
                let result = d

                let res = result;

                debugger
                var Model: any = JSON.parse(res[0]);



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


                //-------------------------------------------------------------
                debugger
                var Model_2: string = res[1];


                showGridData(Grid, Model_2.toString())

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
        })

    }






    function InitializeGridControl() {

        Grid.ESG.NameTable = 'Grad1';
        Grid.ESG.OnfunctionSave = SaveNew;
        Grid.ESG.OnfunctionTotal = computeTotal;
        Grid.ESG.OnRowDoubleClicked = DoubleClicked;

        //DisplayDataGridControl(I_D_UOMDetails, Grid);
    }



    function SaveNew() {
        debugger
        //alert(Grid.ESG.Model)

        console.log(Grid.ESG.Model)






        let model: SqlTables = new SqlTables();
        let modelSql: ModelSql = new ModelSql();

        let rp: SqlEnt = new SqlEnt();

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













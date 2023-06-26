 
$(document).ready(() => {

    var AllDisplay: Array<Settings_Users> = new Array<Settings_Users>();
    var Display: Array<Settings_Users> = new Array<Settings_Users>();
    var Model: Settings_Users = new Settings_Users();
    var JGrid: JsGrid = new JsGrid();
      

    var btnShow: HTMLButtonElement;
    var btnAdd: HTMLButtonElement;
    var btnSave: HTMLButtonElement;
    var btnUpdate: HTMLButtonElement;  
    var btnBack: HTMLButtonElement; 
    var txtSearch: HTMLInputElement; 

    var dbTypeF: HTMLSelectElement;
    var dbTypeH: HTMLSelectElement;

    var Flag_IsNew = false;  
    var NameModel ="";
    SettingsInitalizeComponent();
    function SettingsInitalizeComponent() {

        

        $("#layout_Refresh").removeClass('display_none');
        $("#layout_Back").removeClass('display_none');

         
        $('#Page_Profile').removeClass('display_none');
        debugger
        NameModel = "Settings/Settings_Users";

        InitalizeControls();
        InitalizeEvents(); 
        InitializeGrid();
        btnShow_onclick();


    }

    function InitalizeControls() {
        btnShow = document.getElementById("btnShow") as HTMLButtonElement;
        btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;
        btnSave = document.getElementById("btnSave") as HTMLButtonElement;
        btnUpdate = document.getElementById("btnUpdate") as HTMLButtonElement;  
        btnBack = document.getElementById("btnBack") as HTMLButtonElement; 
        ////////  
        dbTypeF = document.getElementById("dbTypeF") as HTMLSelectElement;
        dbTypeH = document.getElementById("dbTypeH") as HTMLSelectElement;
        ////////
        txtSearch = document.getElementById("txtSearch") as HTMLInputElement; 


    }
    function InitalizeEvents() {
        //********************************Btn****************************
        btnShow.onclick = btnShow_onclick;
        btnAdd.onclick = btnAdd_onclick;
        btnSave.onclick = btnSave_onClick;
        btnBack.onclick = btnBack_onclick;
        btnUpdate.onclick = btnUpdate_onclick;  
        //********************************onchange****************************
        txtSearch.onkeyup = txtSearch_change;

      
 
         
    }
    function InitializeGrid() {
        JGrid.ElementName = "JGrid";
        JGrid.PrimaryKey = "ID";
        JGrid.OnRowDoubleClicked = GridDoubleClick;
        JGrid.Paging = true;
        JGrid.PageSize = 10;
        JGrid.Sorting = true;
        JGrid.InsertionMode = JsGridInsertionMode.Binding;
        JGrid.Editing = false;
        JGrid.Inserting = false;
        JGrid.SelectedIndex = 1;
        JGrid.OnItemEditing = () => { };
        JGrid.Columns = [
            { title: "ID", name: "ID", type: "text", width: " ", visible: false },
            { title: "TrNo", name: "ID", type: "text"  }, 
            { title: "NameUesr", name: "NameUesr", type: "text"  },
            { title: "Type", name: "Type", type: "text"  },
            { title: "Title", name: "Title", type: "text" },
              
        ];
        //JGrid.Bind();

         
    }
   
    function Display_Grid(_Display: Array<Settings_Users>) {

        AllDisplay = _Display;
        AllDisplay = AllDisplay.sort(dynamicSortNew("ID"));

        Display = _Display;

        if (dbTypeF.value != "All") {
            Display = Display.filter(x => x.Type == dbTypeF.value);
        } 

        Display = Display.sort(dynamicSortNew("ID"));
        JGrid.DataSource = Display;
        JGrid.Bind();

    }
    function txtSearch_change() {


        $("#JGrid").jsGrid("option", "pageIndex", 1);


        if (txtSearch.value != "") {

            let search: string = txtSearch.value.toLowerCase();
            let SearchDetails = Display.filter(x => x.ID.toString().search(search) >= 0 || x.Title.toLowerCase().search(search) >= 0
                || x.Type.toLowerCase().search(search) >= 0 || x.Remars.toLowerCase().search(search) >= 0);

            JGrid.DataSource = SearchDetails;
            JGrid.Bind();
        } else {
            JGrid.DataSource = Display;
            JGrid.Bind();
        }

    }
     
    function btnShow_onclick() {

        Ajax.CallAsync({
            url: Url.Action("Get_Data", "Profile"),
            data: { Name_txt: NameModel },
            success: (d) => {
                let result = JSON.parse(d)

                let res = result as Array<Settings_Users>;

                $('#Div_control').addClass('display_none');
                disabled();
                Display_Grid(res)


            }
        })


    }
     
    function btnSave_onClick() {

        setTimeout(function () {

            //if (!Validation()) {
            //    return;
            //}

            Assign();
            Update('u');

        }, 100);
    }
    function btnAdd_onclick() {
        CleanDetails();
        Enabled();
        Flag_IsNew = true; 
        $("#div_Data").html('');

    }
    function btnBack_onclick() {

        if (Flag_IsNew == true) {
            $('#Div_control').addClass('display_none');
            disabled();
        }
        else {
            GridDoubleClick();
        }
    }
    function btnUpdate_onclick() {

        Enabled();

    }
    function GridDoubleClick() {
        CleanDetails();
        DisplayMaster(JGrid.SelectedItem)
        disabled();
    }
    function DisplayMaster(Selecteditem: Settings_Users) {
        DocumentActions.RenderFromModel(Selecteditem);  
        Flag_IsNew = false;
        btnUpdate.focus();

        debugger
        if (Selecteditem.Status == 1) { 
            $('#txtStatus').prop('checked', true);
        }
        else { 
            $('#txtStatus').prop('checked', false);
        } 

    }

    //***********************************************Grid Controls*******************************************//
 
    function Enabled() {
        $('._dis').removeAttr('disabled')
        $('._Cont').removeClass('display_none')
        $('#id_div_Filter').addClass('disabledDiv')
        $('#btnBack').removeClass('display_none')
        $('#btnSave').removeClass('display_none')
        $('#btnUpdate').addClass('display_none')

    }
    function disabled() {
        $('._dis').attr('disabled', 'disabled')
        $('._Cont').addClass('display_none')
        $('#id_div_Filter').removeClass('disabledDiv')
        $('#btnBack').addClass('display_none')
        $('#btnSave').addClass('display_none')
        $('#btnUpdate').removeClass('display_none')
        btnUpdate.focus();

    }
    function CleanDetails() {
        $('#Div_control').removeClass('display_none');
        $("#Div_control :input").val(""); 
        dbTypeH.selectedIndex = 0;

        if (AllDisplay.length > 0) {
            let MaxID = AllDisplay[0].ID;
            $('#txtTrNo').val(MaxID + 1);
        }
        else {
            $('#txtTrNo').val('1');
        }
       

        $('#txtTitle').focus();

        document.body.scrollTop = 800;
        document.documentElement.scrollTop = 800;
    } 
    function Assign() {
        debugger
        Model = new Settings_Users();

        DocumentActions.AssignToModel(Model);//Insert Update  
        debugger
        if ($('#txtStatus').prop('checked') == true ) {
            Model.Status = 1; 
        }
        else {
            Model.Status = 0;
        }
        

    } 
    function Update(StatusFlag: string) {

        let Data = new Send_Data();

        Data.ID = Number($('#txtTrNo').val());
        Data.Name_Txt_Master = NameModel; 
        Data.Model = JSON.stringify(Model); 
        Data.TypeDataSouce = "Settings_Users";
        Data.StatusFlag = StatusFlag;

        debugger
        $.ajax({
            url: Url.Action("Update_DataSetting", "Profile"),
            type: "POST",
            dataType: 'json',
            async: false,
            data: { Data: JSON.stringify(Data) },
            success: (d) => {
                let result = JSON.parse(d)

                let res = result as Array<Settings_Users>;
                Display_Grid(res)

                JGrid.SelectedItem = Model;
                GridDoubleClick();

            }
        })
    }
   
})













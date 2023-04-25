
$(document).ready(() => {
    Profile.InitalizeComponent();
})

namespace Profile {

    var AllDisplay: Array<DataAll> = new Array<DataAll>();
    var Display: Array<DataAll> = new Array<DataAll>();
    var Model: DataAll = new DataAll();
    var JGrid: JsGrid = new JsGrid();


    var AllDisplayDetails: Array<DataDetails> = new Array<DataDetails>();
    var DisplayDetails: Array<DataDetails> = new Array<DataDetails>();
    var ModelDetails: Array<DataDetails> = new Array<DataDetails>();
    var SingModelDetails: DataDetails = new DataDetails();

    //var GridNew: NewEslamGrid.ESGrid = new NewEslamGrid.ESGrid();

    var btnShow: HTMLButtonElement;
    var btnAdd: HTMLButtonElement;
    var btnSave: HTMLButtonElement;
    var btnUpdate: HTMLButtonElement;
    var btnBack: HTMLButtonElement;
    var btnLogin: HTMLButtonElement;
    var btnAddDetails: HTMLButtonElement;

    var txtPassword: HTMLInputElement;
    var txtSearch: HTMLInputElement;
    var txtDateFrom: HTMLInputElement;
    var txtDateTo: HTMLInputElement;
    var txtTrDate: HTMLInputElement;

    var dbTypeF: HTMLSelectElement;
    var dbTypeH: HTMLSelectElement;

    var Flag_IsNew = false;
    var CountGrid = 0;
    let DetMaxLast = 0;

    export function InitalizeComponent() {

        btnLogin = document.getElementById("btnLogin") as HTMLButtonElement;
        txtPassword = document.getElementById("txtPassword") as HTMLInputElement;

        btnLogin.onclick = btnLogin_onclick;

        Event_key('Enter', 'txtPassword', 'btnLogin');


    }

    function InitalizeControls() {
        btnShow = document.getElementById("btnShow") as HTMLButtonElement;
        btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;
        btnSave = document.getElementById("btnSave") as HTMLButtonElement;
        btnUpdate = document.getElementById("btnUpdate") as HTMLButtonElement;
        btnBack = document.getElementById("btnBack") as HTMLButtonElement;
        btnAddDetails = document.getElementById("btnAddDetails") as HTMLButtonElement;
        ////////  
        dbTypeF = document.getElementById("dbTypeF") as HTMLSelectElement;
        dbTypeH = document.getElementById("dbTypeH") as HTMLSelectElement;
        ////////
        txtSearch = document.getElementById("txtSearch") as HTMLInputElement;
        txtDateFrom = document.getElementById("txtDateFrom") as HTMLInputElement;
        txtDateTo = document.getElementById("txtDateTo") as HTMLInputElement;
        txtTrDate = document.getElementById("txtTrDate") as HTMLInputElement;


    }
    function InitalizeEvents() {
        //********************************Btn****************************
        btnShow.onclick = btnShow_onclick;
        btnAdd.onclick = btnAdd_onclick;
        btnSave.onclick = btnSave_onClick;
        btnBack.onclick = btnBack_onclick;
        btnUpdate.onclick = btnUpdate_onclick;
        btnAddDetails.onclick = AddNewRow;
        
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
            { title: "TrNo", name: "ID", type: "text", width: "5%" },
            { title: "TrDate", name: "TrDate", type: "text", width: "6%" },
            { title: "Type", name: "Type", type: "text", width: "7%" },
            { title: "Title", name: "Title", type: "text", width: "11%" },
            {
                title: "Delete",
                width: "5%",
                itemTemplate: (s: string, item: DataAll): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("Delete");
                    txt.id = "butDelete" + item.ID;
                    txt.className = "btn btn-custon-four btn-danger ";

                    txt.onclick = (e) => {
                        Delete(item.ID);
                    };
                    return txt;
                }
            },
            {
                title: "Copy",
                width: "5%",
                itemTemplate: (s: string, item: DataAll): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("Copy");
                    txt.id = "butCopy" + item.ID;
                    txt.className = "btn btn-custon-four btn-info ";

                    txt.onclick = (e) => {
                        Copy(item.ID);
                    };
                    return txt;
                }
            },


        ];
        //JGrid.Bind();
    }

    function Display_Grid(_Display: Array<DataAll>) {

        AllDisplay = _Display;
        AllDisplay = AllDisplay.sort(dynamicSortNew("ID"));

        Display = _Display;

        if (dbTypeF.value != "All") {
            Display = Display.filter(x => x.Type == dbTypeF.value);
        }
        Display = Display.filter(x => x.TrDate >= txtDateFrom.value && x.TrDate <= txtDateTo.value);

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
    function btnLogin_onclick() {
        if (txtPassword.value.trim() == "619619Aa619606") {

            $('#Pass').addClass('display_none');
            $('#Page_Profile').removeClass('display_none');

            InitalizeControls();
            InitalizeEvents();
            txtDateFrom.value = DateStartMonth();
            txtDateTo.value = GetDate();
            InitializeGrid();
            btnShow_onclick();
        }
        else {
            Errorinput(txtPassword);
        }

           
    }
    function btnShow_onclick() {

        Ajax.CallAsync({
            url: Url.Action("Get_Data", "Profile"),
            data: { Name_txt: "All_Data" },
            success: (d) => {
                let result = JSON.parse(d)

                let res = result as Array<DataAll>;

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
    function DisplayMaster(Selecteditem: DataAll) {
        DocumentActions.RenderFromModel(Selecteditem);
        txtTrDate.value = Selecteditem.TrDate;
        GetDetails(Selecteditem.ID)
        Flag_IsNew = false;
    }

    //***********************************************Grid Controls*******************************************//
    function GetDetails(MasterID: number) {

        debugger
        Ajax.CallAsync({
            url: Url.Action("Get_Data", "Profile"),
            data: { Name_txt: "Data_Details" },
            success: (d) => {
                let result = JSON.parse(d)

                let res = result as Array<DataDetails>;

                debugger

                AllDisplayDetails = res;
                AllDisplayDetails = AllDisplayDetails.sort(dynamicSortNew("ID"));

                  DetMaxLast = AllDisplayDetails[0].ID + 1;

                DisplayDetails = res;
                DisplayDetails = DisplayDetails.filter(x => x.MasterID == MasterID);
                DisplayDetails = DisplayDetails.sort(dynamicSort("Ser"));
                debugger
                CountGrid = 0;
                $("#div_Data").html('');
                for (var i = 0; i < DisplayDetails.length; i++) {
                    debugger
                    BuildControls(i);
                    DisplayDetailsControls(i, DisplayDetails[i])
                    CountGrid++;
                }


            }
        })

    }
    function DisplayDetailsControls(cnt: number, DataDet: DataDetails) {

        $("#ID" + cnt).val(DataDet.ID);
        $("#MasterID" + cnt).val(DataDet.MasterID);
        $("#txtSerial" + cnt).val(DataDet.Ser);
        $("#txtDesc" + cnt).val(DataDet.Desc);
        $("#txtRemars" + cnt).val(DataDet.Remark);
        $("#txtUrl" + cnt).val(DataDet.Url);


    }
    function BuildControls(cnt: number) {

        var html = "";
        html = `<tr id= "No_Row${cnt}" class="animated animate slideInDown">
                    <input id="txtCollectDetailID${cnt}" type="hidden" class="form-control display_none"  />
                    <td>
		                <div class="form-group">
			               <button id="btn_minus${cnt}" type="button" class="_Cont display_none btn btn-custon-four btn-danger" style="font-weight: bold;font-size: 22PX;width: 34px;padding: unset;"><i class="fa fa-minus-circle" ></i></button>
		                </div>
	                </td> 
                    <td>
		                <div class="form-group">
                            <input id="txtSerial${cnt}" type="text" disabled class=" _dis form-control" name=""  />
		                </div>
	                </td>
                    <td>
		                <div class="form-group">
                            <input id="txtDesc${cnt}" type="text" disabled class=" _dis form-control condisa" name=""   />
		                </div>
	                </td>
                    <td>
		                <div class="form-group"> 
                            <textarea id="txtRemars${cnt}" type="text"  disabled class="_dis form-control " style="height: 43px;" ></textarea>
		                </div>
	                </td>
                    <td>
		                <div class="form-group">
                            <input id="txtUrl${cnt}" type="text" disabled class="_dis form-control" name=""  />
		                </div>
	                </td>
                    <td>
		                <div class="form-group">
			               <button id="btn_Open${cnt}" type="button"   class="_dis btn btn-custon-four btn-info" style="font-weight: bold;font-size: 22PX;width: 34px;padding: unset;"><i class="fa fa-folder-open" ></i></button>
		                </div>
	                </td>
                    
               <input id="txt_StatusFlag${cnt}" type="hidden"   />
               <input id="ID${cnt}" type="hidden"   />
               <input id="MasterID${cnt}" type="hidden"   />
                </tr>`;
        $("#div_Data").append(html);


        $("#btn_minus" + cnt).on('click', function () {
            DeleteRow(cnt);
        });

        $("#btn_Open" + cnt).on('click', function () {
            window.open($("#txtUrl" + cnt).val().trim(), "_blank");
        });


    }
    function AddNewRow() {

        BuildControls(CountGrid);
        $("#txt_StatusFlag" + CountGrid).val("i"); //In Insert mode 
        CountGrid++;
        Insert_Serial();
        $(".btn-minus").removeClass("display_none");
        $('._dis').removeAttr('disabled')
        $('._Cont').removeClass('display_none')

        
        $("#ID" + CountGrid).val(DetMaxLast)
        DetMaxLast++;
    }
    function DeleteRow(RecNo: number) {
        var statusFlag = $("#txt_StatusFlag" + RecNo).val();
        if (statusFlag == "i")
            $("#txt_StatusFlag" + RecNo).val("m");
        else
            $("#txt_StatusFlag" + RecNo).val("d");

        $("#No_Row" + RecNo).attr("hidden", "true");

    }
    function Insert_Serial() {

        let Chack_Flag = false;
        let flagval = "";
        let Ser = 1;
        for (let i = 0; i < CountGrid; i++) {
            flagval = $("#txt_StatusFlag" + i).val();
            if (flagval != "d" && flagval != "m") {
                $("#txtSerial" + i).val(Ser);
                Ser++;
            }
            if (flagval == 'd' || flagval == 'm' || flagval == 'i') {
                Chack_Flag = true
            }
            if (Chack_Flag) {
                if ($("#txt_StatusFlag" + i).val() != 'i' && $("#txt_StatusFlag" + i).val() != 'm' && $("#txt_StatusFlag" + i).val() != 'd') {
                    $("#txt_StatusFlag" + i).val('u');
                }
            }
        }

    }

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


    }
    function CleanDetails() {
        $('#Div_control').removeClass('display_none');
        $("#Div_control :input").val("");
        txtTrDate.value = GetDate();
        dbTypeH.selectedIndex = 0;

        let MaxID = AllDisplay[0].ID;
        $('#txtTrNo').val(MaxID + 1);

        $('#txtTitle').focus();

        document.body.scrollTop = 800;
        document.documentElement.scrollTop = 800;
    }

    function Assign() {
        debugger
        Model = new DataAll();

        DocumentActions.AssignToModel(Model);//Insert Update 
        Model.TrDate = DateFormatRep(txtTrDate.value)

        ModelDetails = new Array<DataDetails>();


        for (var i = 0; i < CountGrid; i++) {
            SingModelDetails = new DataDetails();

            if ($("#txt_StatusFlag" + i).val() == '' || $("#txt_StatusFlag" + i).val() == 'i' || $("#txt_StatusFlag" + i).val() == 'u') {

                SingModelDetails.ID = Number($("#ID" + i).val());
                SingModelDetails.MasterID = Number($("#txtTrNo").val());
                SingModelDetails.Ser = Number($("#txtSerial" + i).val());
                SingModelDetails.Desc = $("#txtDesc" + i).val();
                SingModelDetails.Remark = $("#txtRemars" + i).val();
                SingModelDetails.Url = $("#txtUrl" + i).val();
                SingModelDetails.Ex_Field = "";

                ModelDetails.push(SingModelDetails);
            }

        }

    }

    function Update(StatusFlag: string) {

        let Data = new Send_Data();

        Data.ID = Number($('#txtTrNo').val());
        Data.Name_Txt_Master = "All_Data";
        Data.Name_Txt_Detail = "Data_Details";
        Data.Model = JSON.stringify(Model);
        Data.ModelDetails = JSON.stringify(ModelDetails);
        Data.TypeDataSouce = "DataAll";
        Data.StatusFlag = StatusFlag;

        debugger
        Ajax.CallAsync({
            url: Url.Action("Update_Data", "Profile"),
            data: { Data: JSON.stringify(Data) },
            success: (d) => {
                let result = JSON.parse(d)

                let res = result as Array<DataAll>;
                Display_Grid(res)

                JGrid.SelectedItem = Model;
                GridDoubleClick();

            }
        })
    }
    function Delete(ID: number) {

        JGrid.SelectedItem = Display.filter(x => x.ID == ID)[0];

        CleanDetails();
        DisplayMaster(JGrid.SelectedItem)
        disabled();


        Assign();

        let Data = new Send_Data();

        debugger

        Data.ID = Number($('#txtTrNo').val());
        Data.Name_Txt_Master = "All_Data";
        Data.Name_Txt_Detail = "Data_Details";
        Data.Model = JSON.stringify(Model);
        Data.ModelDetails = JSON.stringify(ModelDetails);
        Data.TypeDataSouce = "DataAll";
        Data.StatusFlag = "d";

        debugger
        Ajax.CallAsync({
            url: Url.Action("Update_Data", "Profile"),
            data: { Data: JSON.stringify(Data) },
            success: (d) => {
                let result = JSON.parse(d)

                let res = result as Array<DataAll>;
                Display_Grid(res)

                $('#Div_control').addClass('display_none');
                disabled();

            }
        })


    }
    function Copy(ID: number) {

        debugger

        JGrid.SelectedItem = Display.filter(x => x.ID == ID)[0];

        CleanDetails();
        DisplayMaster(JGrid.SelectedItem)
        disabled();




        setTimeout(function () {


            let MaxID = AllDisplay[0].ID;

            JGrid.SelectedItem.ID = MaxID + 1;

            $('#txtTrNo').val(MaxID + 1)

            Assign();

            let Data = new Send_Data();
             

            debugger

            let DetMaxID = AllDisplayDetails[0].ID + 1;

            for (var i = 0; i < ModelDetails.length; i++) {

                ModelDetails[i].ID = DetMaxID;
                DetMaxID++;
            }

            debugger
             
                debugger

                Data.ID = Number($('#txtTrNo').val());
                Data.Name_Txt_Master = "All_Data";
                Data.Name_Txt_Detail = "Data_Details";
                Data.Model = JSON.stringify(Model);
                Data.ModelDetails = JSON.stringify(ModelDetails);
                Data.TypeDataSouce = "DataAll";
                Data.StatusFlag = "u";

                debugger
                Ajax.CallAsync({
                    url: Url.Action("Update_Data", "Profile"),
                    data: { Data: JSON.stringify(Data) },
                    success: (d) => {
                        let result = JSON.parse(d)

                        let res = result as Array<DataAll>;
                        Display_Grid(res)


                    }
                })
                 
        }, 500);

    }
}













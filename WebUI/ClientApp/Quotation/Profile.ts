 
$(document).ready(() => {

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
    var btnUpload: HTMLButtonElement;
    var btnBack_Up: HTMLButtonElement;
    var btnDownload_Up: HTMLButtonElement;
    var btnShare_Up: HTMLButtonElement;
    var btnBack: HTMLButtonElement;
    var btnLogin: HTMLButtonElement;
    var btnAddDetails: HTMLButtonElement;
    //var btnPage_Get_Views: HTMLButtonElement;

    var txtPassword: HTMLInputElement;
    var txtCopy: HTMLInputElement;
    var txtSearch: HTMLInputElement;
    var txtDateFrom: HTMLInputElement;
    var txtDateTo: HTMLInputElement;
    var txtTrDate: HTMLInputElement;

    var dbTypeF: HTMLSelectElement;
    var dbTypeH: HTMLSelectElement;

    var Flag_IsNew = false;
    var CountGrid = 0;
    let DetMaxLast = 0; 
    var GloplePath = "";
    var NameFile = "";
    ProfileInitalizeComponent();

    function ProfileInitalizeComponent() {

        

        $("#layout_Refresh").removeClass('display_none');
        $("#layout_Back").removeClass('display_none');


        btnLogin = document.getElementById("btnLogin") as HTMLButtonElement;
        txtPassword = document.getElementById("txtPassword") as HTMLInputElement;

        btnLogin.onclick = btnLogin_onclick;

        txtPassword.focus();

        Event_key('Enter', 'txtPassword', 'btnLogin');

        debugger
        let pass = sessionStorage.getItem("EslamPasswordProfile");
        if (pass != null) {
            txtPassword.value = pass;
            btnLogin_onclick();
        }
        else {
            $('#Pass').removeClass('display_none');
            txtPassword.focus();
        }

    }

    function InitalizeControls() {
        btnShow = document.getElementById("btnShow") as HTMLButtonElement;
        btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;
        btnSave = document.getElementById("btnSave") as HTMLButtonElement;
        btnUpdate = document.getElementById("btnUpdate") as HTMLButtonElement;
        btnUpload = document.getElementById("btnUpload") as HTMLButtonElement;
        btnBack_Up = document.getElementById("btnBack_Up") as HTMLButtonElement;
        btnDownload_Up = document.getElementById("btnDownload_Up") as HTMLButtonElement;
        btnShare_Up = document.getElementById("btnShare_Up") as HTMLButtonElement;
        btnBack = document.getElementById("btnBack") as HTMLButtonElement;
        btnAddDetails = document.getElementById("btnAddDetails") as HTMLButtonElement;
        //btnPage_Get_Views = document.getElementById("btnPage_Get_Views") as HTMLButtonElement;

        ////////  
        dbTypeF = document.getElementById("dbTypeF") as HTMLSelectElement;
        dbTypeH = document.getElementById("dbTypeH") as HTMLSelectElement;
        ////////
        txtCopy = document.getElementById("txtCopy") as HTMLInputElement;
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
        //btnUpload.onclick = Upload;
        //btnUpload.onclick = () => { window.open('https://app.mediafire.com/myfiles', "_blank");  };
        btnBack_Up.onclick = () => { $('#Upload').addClass('display_none'); $('#Page_Profile').removeClass('display_none'); $('#Page').html(''); };
        btnDownload_Up.onclick = Download; 
        btnShare_Up.onclick = Share;
        //********************************onchange****************************
        txtSearch.onkeyup = txtSearch_change;

        $("._copy").on('dblclick', function () {
            copyToClipboard(this.id);
        });
 
         
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
            { title: "TrDate", name: "TrDate", type: "text" },
            { title: "Type", name: "Type", type: "text"  },
            { title: "Title", name: "Title", type: "text" },
            {
                title: "Delete", 
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
    function Share() {

        debugger 

        txtCopy.value = GloplePath

        copyToClipboard('txtCopy');

        //txtCopy.focus();
        //txtCopy.select();

        //try {
        //    var successful = document.execCommand('copy');
        //    var msg = successful ? 'successful' : 'unsuccessful';
        //    console.log('Copying text command was ' + msg);
        //} catch (err) {
        //    console.log('Oops, unable to copy');
        //}

        alert(GloplePath);

    }
    function Download() {

        var imageUrl = GloplePath;
        var filename = NameFile;

        var link = document.createElement('a');
        link.href = imageUrl;
        link.download = filename;

        // Trigger the download
        link.click();


    }
    function Upload(Path: string) {

        debugger

        //let newWindow = open('https://app.mediafire.com/myfiles', 'example', 'width=800,height=800')
        //newWindow.focus();
        //PageFile.innerHTML = ' <iframe src="http://localhost:61563/SavePath/Dropbox/FileUpload/Screenshot (1).png" frameborder="0" scrolling="auto" width="1000" height="1000" style="margin-left: 2%;"></iframe>';

          GloplePath = Path;

        var PageFile = document.getElementById('PageFile');
        PageFile.innerHTML = ' <iframe src="' + Path +'" frameborder="0" scrolling="auto" width="1000" height="1000" style=" width: 101%; margin-left: 2%;margin-left: -1% !important;"></iframe>';

        $('#Pass').addClass('display_none');
        $('#Page_Profile').addClass('display_none');
        $('#Upload').removeClass('display_none');

    }

 

    function btnPage_Get_Views_onclick() {

        debugger

        //window.open('http://www.example.com?ReportID=1', '_blank');

        //window.open(Url.Action("Page_Get_Views", "Home"), "_blank");




        //var guestName = $('#List_Url').val();
        //var listData = guestName.split('\n');

        //window.sessionStorage.setItem("Url_Data", JSON.stringify(listData));

        //document.cookie = JSON.stringify(listData);


        //var Url_Data = localStorage.getItem("Url_Data");

        //for (var i = 0; i < listData.length; i++) {
        //    alert(listData[i])
        //}

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

        if (txtPassword.value.trim() == "619606") {

            $('#Pass').addClass('display_none');
            $('#Page_Profile').removeClass('display_none');

            InitalizeControls();
            InitalizeEvents();
            txtDateFrom.value = DateStartYear();
            txtDateTo.value = GetDate();
            InitializeGrid();
            btnShow_onclick();
            sessionStorage.setItem("EslamPasswordProfile", "619606");

            //setTimeout(function () {

            //    $("#Btn_fileUpload").val('Upload')
            //    //GetPathFileUpload();
            //}, 800);
             
        }
        else {
            Errorinput(txtPassword);
            $('#Pass').removeClass('display_none');
            txtPassword.focus();
        }




    }
    function btnShow_onclick() {

        Ajax.CallAsync({
            url: Url.Action("Get_Data", "Profile"),
            data: { Name_txt: "Profile_Master" },
            success: (d) => {
                let result = JSON.parse(d)

                let res = result as Array<DataAll>;

                $('#Div_control').addClass('display_none');
                disabled();
                Display_Grid(res)


            }
        })


    }

    //function GetPathFileUpload() {

    //    Ajax.CallAsync({
    //        url: Url.Action("GetPathFileUpload", "Profile"), 
    //        success: (d) => {
    //            debugger
    //            GlopPathFile = d;
    //        }
    //    })


    //}
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
        CountGrid = 0;
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
    function DisplayMaster(Selecteditem: DataAll) {
        DocumentActions.RenderFromModel(Selecteditem);
        txtTrDate.value = Selecteditem.TrDate;
        GetDetails(Selecteditem.ID)
        Flag_IsNew = false;
        btnUpdate.focus();
    }

    //***********************************************Grid Controls*******************************************//
    function GetDetails(MasterID: number) {

        debugger
        Ajax.CallAsync({
            url: Url.Action("Get_Data", "Profile"),
            data: { Name_txt: "Profile_Details" },
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

                $("#Btn_fileUpload").val('Upload')
                $("#Btn_fileUpload").addClass('display_none');
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
        $("#txtFile" + cnt).val(DataDet.Ex_Field);


    }
    function BuildControls(cnt: number) {

        var html = "";
        html = `<tr id= "No_Row${cnt}" class="">
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
                            <input id="txtDesc${cnt}" type="text" disabled class="wid _copy _dis form-control condisa" name=""   />
		                </div>
	                </td>
                    <td>
		                <div class="form-group"> 
                            <textarea id="txtRemars${cnt}" type="text"  disabled class="wid _copy _dis form-control " style="height: 43px;" ></textarea>
		                </div>
	                </td>
                    <td>
		                <div class="form-group">
                            <input id="txtUrl${cnt}" type="text" disabled class="wid _dis form-control" name=""  />
		                </div>
	                </td>   
                    <td>
		                <div class="form-group">
			               <button id="btn_Open${cnt}" type="button"   class="_dis btn btn-custon-four btn-info" style="font-weight: bold;font-size: 22PX;width: 34px;padding: unset;"><i class="fa fa-window-maximize" ></i></button>
		                </div>
	                </td>
                    <td>
		                <div class="form-group">
			               <button id="btn_Upload${cnt}" type="button"  disabled  class="_dis btn btn-custon-four btn-info" style="font-weight: bold;font-size: 22PX;width: 34px;padding: unset;background-color: #0ba70a;"><i class="fa fa-cloud-upload" ></i></button>
                            
		                </div>
	                </td> 
                    <td>
		                <div class="form-group">
			               <button id="btn_OpenFile${cnt}" type="button"   class="_dis btn btn-custon-four btn-info" style="font-weight: bold;font-size: 22PX;width: 34px;padding: unset;background-color: #c47000;"><i class="fa fa-folder-open" ></i></button>
		                </div>
	                </td>
                    <td>
		                <div class="form-group">
			               <input id="txtFile${cnt}" type="text" disabled class="_Name_file   form-control" name=""  />
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

        $("#btn_Upload" + cnt).on('click', function () {
            $("#Btn_fileUpload").click();
             
            setTimeout(function () {

            $("#txtFile" + cnt).val($("#fileName").val());

            }, 500);
             
        }); 

        $("#btn_OpenFile" + cnt).on('click', function () {

              NameFile = $("#txtFile" + cnt).val();
            let path = location.origin + "/SavePath/Dropbox/FileUpload/" + NameFile;
             
            //window.open(path, "_blank");   

            Upload(path);
             
        }); 

        $("._copy").on('dblclick', function () {
            copyToClipboard(this.id);
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
        btnUpdate.focus();

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
                SingModelDetails.Ex_Field = $("#txtFile" + i).val();

                ModelDetails.push(SingModelDetails);
            }

        }

    }

    function Update(StatusFlag: string) {

        let Data = new Send_Data();

        Data.ID = Number($('#txtTrNo').val());
        Data.Name_Txt_Master = "Profile_Master";
        Data.Name_Txt_Detail = "Profile_Details";
        Data.Model = JSON.stringify(Model);
        Data.ModelDetails = JSON.stringify(ModelDetails);
        Data.TypeDataSouce = "DataAll";
        Data.StatusFlag = StatusFlag;

        debugger
        $.ajax({
            url: Url.Action("Update_Data", "Profile"),
            type: "POST",
            dataType: 'json',
            async: false,
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
        Data.Name_Txt_Master = "Profile_Master";
        Data.Name_Txt_Detail = "Profile_Details";
        Data.Model = JSON.stringify(Model);
        Data.ModelDetails = JSON.stringify(ModelDetails);
        Data.TypeDataSouce = "DataAll";
        Data.StatusFlag = "d";

        debugger
        $.ajax({
            url: Url.Action("Update_Data", "Profile"),
            type: "POST",
            dataType: 'json',
            async: false,
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
            Data.Name_Txt_Master = "Profile_Master";
            Data.Name_Txt_Detail = "Profile_Details";
                Data.Model = JSON.stringify(Model);
                Data.ModelDetails = JSON.stringify(ModelDetails);
                Data.TypeDataSouce = "DataAll";
                Data.StatusFlag = "u";

                debugger
            $.ajax({
                url: Url.Action("Update_Data", "Profile"),
                type: "POST",
                dataType: 'json',
                async: false,
                data: { Data: JSON.stringify(Data) },
                success: (d) => {
                        let result = JSON.parse(d)

                        let res = result as Array<DataAll>;
                        Display_Grid(res)


                    }
                })
                 
        }, 500);

    }
})













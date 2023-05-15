/// <reference path="../iggrid.ts" /> 
$(document).ready(function () {
    Profile.InitalizeComponent();
});
var Profile;
(function (Profile) {
    var AllDisplay = new Array();
    var Display = new Array();
    var Model = new DataAll();
    var JGrid = new JsGrid();
    var AllDisplayDetails = new Array();
    var DisplayDetails = new Array();
    var ModelDetails = new Array();
    var SingModelDetails = new DataDetails();
    //var GridNew: NewEslamGrid.ESGrid = new NewEslamGrid.ESGrid();
    var btnShow;
    var btnAdd;
    var btnSave;
    var btnUpdate;
    var btnUpload;
    var btnBack_Up;
    var btnBack;
    var btnLogin;
    var btnAddDetails;
    //var btnPage_Get_Views: HTMLButtonElement;
    var txtPassword;
    var txtSearch;
    var txtDateFrom;
    var txtDateTo;
    var txtTrDate;
    var dbTypeF;
    var dbTypeH;
    var Flag_IsNew = false;
    var CountGrid = 0;
    var DetMaxLast = 0;
    function InitalizeComponent() {
        btnLogin = document.getElementById("btnLogin");
        txtPassword = document.getElementById("txtPassword");
        btnLogin.onclick = btnLogin_onclick;
        txtPassword.focus();
        Event_key('Enter', 'txtPassword', 'btnLogin');
    }
    Profile.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        btnShow = document.getElementById("btnShow");
        btnAdd = document.getElementById("btnAdd");
        btnSave = document.getElementById("btnSave");
        btnUpdate = document.getElementById("btnUpdate");
        btnUpload = document.getElementById("btnUpload");
        btnBack_Up = document.getElementById("btnBack_Up");
        btnBack = document.getElementById("btnBack");
        btnAddDetails = document.getElementById("btnAddDetails");
        //btnPage_Get_Views = document.getElementById("btnPage_Get_Views") as HTMLButtonElement;
        ////////  
        dbTypeF = document.getElementById("dbTypeF");
        dbTypeH = document.getElementById("dbTypeH");
        ////////
        txtSearch = document.getElementById("txtSearch");
        txtDateFrom = document.getElementById("txtDateFrom");
        txtDateTo = document.getElementById("txtDateTo");
        txtTrDate = document.getElementById("txtTrDate");
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
        btnUpload.onclick = function () { window.open('https://app.mediafire.com/myfiles', "_blank"); };
        btnBack_Up.onclick = function () { $('#Upload').addClass('display_none'); $('#Page_Profile').removeClass('display_none'); $('#Page').html(''); };
        //btnPage_Get_Views.onclick = btnPage_Get_Views_onclick; 
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
        JGrid.OnItemEditing = function () { };
        JGrid.Columns = [
            { title: "ID", name: "ID", type: "text", width: " ", visible: false },
            { title: "TrNo", name: "ID", type: "text" },
            { title: "TrDate", name: "TrDate", type: "text" },
            { title: "Type", name: "Type", type: "text" },
            { title: "Title", name: "Title", type: "text" },
            {
                title: "Delete",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("Delete");
                    txt.id = "butDelete" + item.ID;
                    txt.className = "btn btn-custon-four btn-danger ";
                    txt.onclick = function (e) {
                        Delete(item.ID);
                    };
                    return txt;
                }
            },
            {
                title: "Copy",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("Copy");
                    txt.id = "butCopy" + item.ID;
                    txt.className = "btn btn-custon-four btn-info ";
                    txt.onclick = function (e) {
                        Copy(item.ID);
                    };
                    return txt;
                }
            },
        ];
        //JGrid.Bind();
    }
    function Upload() {
        var Page = document.getElementById('Page');
        Page.innerHTML = ' <iframe src="https://app.mediafire.com/" frameBorder="0" scrolling="auto" width="1000" height="1000" style="margin-left: 2%;"></iframe>';
        $('#Pass').addClass('display_none');
        $('#Page_Profile').addClass('display_none');
        $('#Upload').removeClass('display_none');
    }
    function btnPage_Get_Views_onclick() {
        debugger;
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
    function Display_Grid(_Display) {
        AllDisplay = _Display;
        AllDisplay = AllDisplay.sort(dynamicSortNew("ID"));
        Display = _Display;
        if (dbTypeF.value != "All") {
            Display = Display.filter(function (x) { return x.Type == dbTypeF.value; });
        }
        Display = Display.filter(function (x) { return x.TrDate >= txtDateFrom.value && x.TrDate <= txtDateTo.value; });
        Display = Display.sort(dynamicSortNew("ID"));
        JGrid.DataSource = Display;
        JGrid.Bind();
    }
    function txtSearch_change() {
        $("#JGrid").jsGrid("option", "pageIndex", 1);
        if (txtSearch.value != "") {
            var search_1 = txtSearch.value.toLowerCase();
            var SearchDetails = Display.filter(function (x) { return x.ID.toString().search(search_1) >= 0 || x.Title.toLowerCase().search(search_1) >= 0
                || x.Type.toLowerCase().search(search_1) >= 0 || x.Remars.toLowerCase().search(search_1) >= 0; });
            JGrid.DataSource = SearchDetails;
            JGrid.Bind();
        }
        else {
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
            success: function (d) {
                var result = JSON.parse(d);
                var res = result;
                $('#Div_control').addClass('display_none');
                disabled();
                Display_Grid(res);
            }
        });
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
        DisplayMaster(JGrid.SelectedItem);
        disabled();
    }
    function DisplayMaster(Selecteditem) {
        DocumentActions.RenderFromModel(Selecteditem);
        txtTrDate.value = Selecteditem.TrDate;
        GetDetails(Selecteditem.ID);
        Flag_IsNew = false;
    }
    //***********************************************Grid Controls*******************************************//
    function GetDetails(MasterID) {
        debugger;
        Ajax.CallAsync({
            url: Url.Action("Get_Data", "Profile"),
            data: { Name_txt: "Data_Details" },
            success: function (d) {
                var result = JSON.parse(d);
                var res = result;
                debugger;
                AllDisplayDetails = res;
                AllDisplayDetails = AllDisplayDetails.sort(dynamicSortNew("ID"));
                DetMaxLast = AllDisplayDetails[0].ID + 1;
                DisplayDetails = res;
                DisplayDetails = DisplayDetails.filter(function (x) { return x.MasterID == MasterID; });
                DisplayDetails = DisplayDetails.sort(dynamicSort("Ser"));
                debugger;
                CountGrid = 0;
                $("#div_Data").html('');
                for (var i = 0; i < DisplayDetails.length; i++) {
                    debugger;
                    BuildControls(i);
                    DisplayDetailsControls(i, DisplayDetails[i]);
                    CountGrid++;
                }
            }
        });
    }
    function DisplayDetailsControls(cnt, DataDet) {
        $("#ID" + cnt).val(DataDet.ID);
        $("#MasterID" + cnt).val(DataDet.MasterID);
        $("#txtSerial" + cnt).val(DataDet.Ser);
        $("#txtDesc" + cnt).val(DataDet.Desc);
        $("#txtRemars" + cnt).val(DataDet.Remark);
        $("#txtUrl" + cnt).val(DataDet.Url);
    }
    function BuildControls(cnt) {
        var html = "";
        html = "<tr id= \"No_Row" + cnt + "\" class=\"animated animate slideInDown\">\n                    <input id=\"txtCollectDetailID" + cnt + "\" type=\"hidden\" class=\"form-control display_none\"  />\n                    <td>\n\t\t                <div class=\"form-group\">\n\t\t\t               <button id=\"btn_minus" + cnt + "\" type=\"button\" class=\"_Cont display_none btn btn-custon-four btn-danger\" style=\"font-weight: bold;font-size: 22PX;width: 34px;padding: unset;\"><i class=\"fa fa-minus-circle\" ></i></button>\n\t\t                </div>\n\t                </td> \n                    <td>\n\t\t                <div class=\"form-group\">\n                            <input id=\"txtSerial" + cnt + "\" type=\"text\" disabled class=\" _dis form-control\" name=\"\"  />\n\t\t                </div>\n\t                </td>\n                    <td>\n\t\t                <div class=\"form-group\">\n                            <input id=\"txtDesc" + cnt + "\" type=\"text\" disabled class=\"wid _copy _dis form-control condisa\" name=\"\"   />\n\t\t                </div>\n\t                </td>\n                    <td>\n\t\t                <div class=\"form-group\"> \n                            <textarea id=\"txtRemars" + cnt + "\" type=\"text\"  disabled class=\"wid _copy _dis form-control \" style=\"height: 43px;\" ></textarea>\n\t\t                </div>\n\t                </td>\n                    <td>\n\t\t                <div class=\"form-group\">\n                            <input id=\"txtUrl" + cnt + "\" type=\"text\" disabled class=\"wid _dis form-control\" name=\"\"  />\n\t\t                </div>\n\t                </td>\n                    <td>\n\t\t                <div class=\"form-group\">\n\t\t\t               <button id=\"btn_Open" + cnt + "\" type=\"button\"   class=\"_dis btn btn-custon-four btn-info\" style=\"font-weight: bold;font-size: 22PX;width: 34px;padding: unset;\"><i class=\"fa fa-folder-open\" ></i></button>\n\t\t                </div>\n\t                </td>\n                    \n               <input id=\"txt_StatusFlag" + cnt + "\" type=\"hidden\"   />\n               <input id=\"ID" + cnt + "\" type=\"hidden\"   />\n               <input id=\"MasterID" + cnt + "\" type=\"hidden\"   />\n                </tr>";
        $("#div_Data").append(html);
        $("#btn_minus" + cnt).on('click', function () {
            DeleteRow(cnt);
        });
        $("#btn_Open" + cnt).on('click', function () {
            window.open($("#txtUrl" + cnt).val().trim(), "_blank");
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
        $('._dis').removeAttr('disabled');
        $('._Cont').removeClass('display_none');
        $("#ID" + CountGrid).val(DetMaxLast);
        DetMaxLast++;
    }
    function DeleteRow(RecNo) {
        var statusFlag = $("#txt_StatusFlag" + RecNo).val();
        if (statusFlag == "i")
            $("#txt_StatusFlag" + RecNo).val("m");
        else
            $("#txt_StatusFlag" + RecNo).val("d");
        $("#No_Row" + RecNo).attr("hidden", "true");
    }
    function Insert_Serial() {
        var Chack_Flag = false;
        var flagval = "";
        var Ser = 1;
        for (var i = 0; i < CountGrid; i++) {
            flagval = $("#txt_StatusFlag" + i).val();
            if (flagval != "d" && flagval != "m") {
                $("#txtSerial" + i).val(Ser);
                Ser++;
            }
            if (flagval == 'd' || flagval == 'm' || flagval == 'i') {
                Chack_Flag = true;
            }
            if (Chack_Flag) {
                if ($("#txt_StatusFlag" + i).val() != 'i' && $("#txt_StatusFlag" + i).val() != 'm' && $("#txt_StatusFlag" + i).val() != 'd') {
                    $("#txt_StatusFlag" + i).val('u');
                }
            }
        }
    }
    function Enabled() {
        $('._dis').removeAttr('disabled');
        $('._Cont').removeClass('display_none');
        $('#id_div_Filter').addClass('disabledDiv');
        $('#btnBack').removeClass('display_none');
        $('#btnSave').removeClass('display_none');
        $('#btnUpdate').addClass('display_none');
    }
    function disabled() {
        $('._dis').attr('disabled', 'disabled');
        $('._Cont').addClass('display_none');
        $('#id_div_Filter').removeClass('disabledDiv');
        $('#btnBack').addClass('display_none');
        $('#btnSave').addClass('display_none');
        $('#btnUpdate').removeClass('display_none');
    }
    function CleanDetails() {
        $('#Div_control').removeClass('display_none');
        $("#Div_control :input").val("");
        txtTrDate.value = GetDate();
        dbTypeH.selectedIndex = 0;
        var MaxID = AllDisplay[0].ID;
        $('#txtTrNo').val(MaxID + 1);
        $('#txtTitle').focus();
        document.body.scrollTop = 800;
        document.documentElement.scrollTop = 800;
    }
    function Assign() {
        debugger;
        Model = new DataAll();
        DocumentActions.AssignToModel(Model); //Insert Update 
        Model.TrDate = DateFormatRep(txtTrDate.value);
        ModelDetails = new Array();
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
    function Update(StatusFlag) {
        var Data = new Send_Data();
        Data.ID = Number($('#txtTrNo').val());
        Data.Name_Txt_Master = "All_Data";
        Data.Name_Txt_Detail = "Data_Details";
        Data.Model = JSON.stringify(Model);
        Data.ModelDetails = JSON.stringify(ModelDetails);
        Data.TypeDataSouce = "DataAll";
        Data.StatusFlag = StatusFlag;
        debugger;
        $.ajax({
            url: Url.Action("Update_Data", "Profile"),
            type: "POST",
            dataType: 'json',
            async: false,
            data: { Data: JSON.stringify(Data) },
            success: function (d) {
                var result = JSON.parse(d);
                var res = result;
                Display_Grid(res);
                JGrid.SelectedItem = Model;
                GridDoubleClick();
            }
        });
    }
    function Delete(ID) {
        JGrid.SelectedItem = Display.filter(function (x) { return x.ID == ID; })[0];
        CleanDetails();
        DisplayMaster(JGrid.SelectedItem);
        disabled();
        Assign();
        var Data = new Send_Data();
        debugger;
        Data.ID = Number($('#txtTrNo').val());
        Data.Name_Txt_Master = "All_Data";
        Data.Name_Txt_Detail = "Data_Details";
        Data.Model = JSON.stringify(Model);
        Data.ModelDetails = JSON.stringify(ModelDetails);
        Data.TypeDataSouce = "DataAll";
        Data.StatusFlag = "d";
        debugger;
        $.ajax({
            url: Url.Action("Update_Data", "Profile"),
            type: "POST",
            dataType: 'json',
            async: false,
            data: { Data: JSON.stringify(Data) },
            success: function (d) {
                var result = JSON.parse(d);
                var res = result;
                Display_Grid(res);
                $('#Div_control').addClass('display_none');
                disabled();
            }
        });
    }
    function Copy(ID) {
        debugger;
        JGrid.SelectedItem = Display.filter(function (x) { return x.ID == ID; })[0];
        CleanDetails();
        DisplayMaster(JGrid.SelectedItem);
        disabled();
        setTimeout(function () {
            var MaxID = AllDisplay[0].ID;
            JGrid.SelectedItem.ID = MaxID + 1;
            $('#txtTrNo').val(MaxID + 1);
            Assign();
            var Data = new Send_Data();
            debugger;
            var DetMaxID = AllDisplayDetails[0].ID + 1;
            for (var i = 0; i < ModelDetails.length; i++) {
                ModelDetails[i].ID = DetMaxID;
                DetMaxID++;
            }
            debugger;
            debugger;
            Data.ID = Number($('#txtTrNo').val());
            Data.Name_Txt_Master = "All_Data";
            Data.Name_Txt_Detail = "Data_Details";
            Data.Model = JSON.stringify(Model);
            Data.ModelDetails = JSON.stringify(ModelDetails);
            Data.TypeDataSouce = "DataAll";
            Data.StatusFlag = "u";
            debugger;
            $.ajax({
                url: Url.Action("Update_Data", "Profile"),
                type: "POST",
                dataType: 'json',
                async: false,
                data: { Data: JSON.stringify(Data) },
                success: function (d) {
                    var result = JSON.parse(d);
                    var res = result;
                    Display_Grid(res);
                }
            });
        }, 500);
    }
})(Profile || (Profile = {}));
//# sourceMappingURL=Profile.js.map
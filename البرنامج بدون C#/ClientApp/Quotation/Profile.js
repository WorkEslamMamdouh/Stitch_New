$(document).ready(function () {
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
    var btnDownload_Up;
    var btnShare_Up;
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
    var GloplePath = "";
    var NameFile = "";
    var NameModelMaster = "";
    var NameModelDetails = "";
    ProfileInitalizeComponent();
    function ProfileInitalizeComponent() {
        debugger;
        $("#layout_Refresh").removeClass('display_none');
        $("#layout_Back").removeClass('display_none');
        $('#Page_Profile').removeClass('display_none');
        var ID = sessionStorage.getItem("AddUserID");
        NameModelMaster = "Profile/Profile_Master_" + ID + "";
        NameModelDetails = "Profile/Profile_Details_" + ID + "";
        InitalizeControls();
        InitalizeEvents();
        txtDateFrom.value = DateStartYear();
        txtDateTo.value = GetDate();
        InitializeGrid();
        btnShow_onclick();
        //setTimeout(function () {
        //    $("#Btn_fileUpload").val('Upload')
        //    //GetPathFileUpload();
        //}, 800);
    }
    function InitalizeControls() {
        btnShow = document.getElementById("btnShow");
        btnAdd = document.getElementById("btnAdd");
        btnSave = document.getElementById("btnSave");
        btnUpdate = document.getElementById("btnUpdate");
        btnUpload = document.getElementById("btnUpload");
        btnBack_Up = document.getElementById("btnBack_Up");
        btnDownload_Up = document.getElementById("btnDownload_Up");
        btnShare_Up = document.getElementById("btnShare_Up");
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
        //btnUpload.onclick = () => { window.open('https://app.mediafire.com/myfiles', "_blank");  };
        btnBack_Up.onclick = function () { debugger; $('#Upload').addClass('display_none'); $('#Page_Profile').removeClass('display_none'); $('#Page').html(''); };
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
    function Share() {
        var url = window.location.origin + '/Downlad/?D=' + GloplePath + '&N=' + NameFile;
        $('#txtShare').val(url);
        copyToClipboard('txtShare');
        alert("تم أخذ اللينك نسخ يمكنك ارساله الان");
    }
    function Download() {
        debugger;
        var url = GloplePath;
        var filename = NameFile;
        //var link = document.createElement('a');
        //link.href = imageUrl;
        //link.download = filename;
        //link.click();
        fetch(url)
            .then(function (response) { return response.blob(); })
            .then(function (blob) {
            var downloadLink = document.createElement("a");
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = filename;
            downloadLink.click();
            URL.revokeObjectURL(downloadLink.href);
            alert('Done Download');
        })
            .catch(function (error) {
            console.error("Error:", error);
        });
        //downloadFileWithProgress(url, filename)
    }
    function downloadFileWithProgress(url, filename) {
        debugger;
        fetch(url)
            .then(function (response) { return response.blob(); })
            .then(function (blob) {
            var anchor = document.createElement('a');
            anchor.href = URL.createObjectURL(blob);
            anchor.download = filename;
            anchor.style.display = 'none'; // Hide the anchor element
            document.body.appendChild(anchor); // Append the anchor element to the document body
            anchor.click(); // Trigger a click event on the anchor element
            document.body.removeChild(anchor); // Remove the anchor element from the document body after the download starts
            URL.revokeObjectURL(anchor.href); // Clean up the URL object
        })
            .catch(function (error) {
            console.error('Error downloading file:', error);
        });
    }
    function downloadFile(url, filename) {
        debugger;
        var link = document.createElement('a');
        link.href = url;
        link.download = filename;
        // Simulate a click event on the link element to start the download
        link.dispatchEvent(new MouseEvent('click'));
    }
    function Upload(Path) {
        debugger;
        //let newWindow = open('https://app.mediafire.com/myfiles', 'example', 'width=800,height=800')
        //newWindow.focus();
        //PageFile.innerHTML = ' <iframe src="http://localhost:61563/SavePath/Dropbox/FileUpload/Screenshot (1).png" frameborder="0" scrolling="auto" width="1000" height="1000" style="margin-left: 2%;"></iframe>';
        GloplePath = Path;
        var PageFile = document.getElementById('PageFile');
        PageFile.innerHTML = ' <iframe src="' + Path + '" frameborder="0" scrolling="auto" width="1000" height="1000" style=" width: 101%; margin-left: 2%;margin-left: -1% !important;"></iframe>';
        $('#Pass').addClass('display_none');
        $('#Page_Profile').addClass('display_none');
        $('#Upload').removeClass('display_none');
        localStorage.setItem('NameFile', NameFile);
        localStorage.setItem('GloplePath', GloplePath);
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
    function btnShow_onclick() {
        Ajax.CallAsync({
            url: Url.Action("Get_Data", "Profile"),
            data: { Name_txt: NameModelMaster },
            success: function (Pro) {
                debugger;
                if (Pro != "Error") {
                    var result = JSON.parse(Pro);
                    var res = result;
                    $('#Div_control').addClass('display_none');
                    disabled();
                    Display_Grid(res);
                }
                else {
                    var res = void 0;
                    $('#Div_control').addClass('display_none');
                    disabled();
                    JGrid.DataSource = res;
                    JGrid.Bind();
                }
            }
        });
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
        DisplayMaster(JGrid.SelectedItem);
        disabled();
    }
    function DisplayMaster(Selecteditem) {
        DocumentActions.RenderFromModel(Selecteditem);
        txtTrDate.value = Selecteditem.TrDate;
        GetDetails(Selecteditem.ID);
        Flag_IsNew = false;
        btnUpdate.focus();
    }
    //***********************************************Grid Controls*******************************************//
    function GetDetails(MasterID) {
        debugger;
        Ajax.CallAsync({
            url: Url.Action("Get_Data", "Profile"),
            data: { Name_txt: NameModelDetails },
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
                $("#Btn_fileUpload").val('Upload');
                $("#Btn_fileUpload").addClass('display_none');
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
        $("#txtFile" + cnt).val(DataDet.Ex_Field);
    }
    function BuildControls(cnt) {
        var html = "";
        html = "<tr id= \"No_Row" + cnt + "\" class=\"\">\n                    <input id=\"txtCollectDetailID" + cnt + "\" type=\"hidden\" class=\"form-control display_none\"  />\n                    <td>\n\t\t                <div class=\"form-group\">\n\t\t\t               <button id=\"btn_minus" + cnt + "\" type=\"button\" class=\"_Cont display_none btn btn-custon-four btn-danger\" style=\"font-weight: bold;font-size: 22PX;width: 34px;padding: unset;\"><i class=\"fa fa-minus-circle\" ></i></button>\n\t\t                </div>\n\t                </td> \n                    <td>\n\t\t                <div class=\"form-group\">\n                            <input id=\"txtSerial" + cnt + "\" type=\"text\" disabled class=\" _dis form-control\" name=\"\"  />\n\t\t                </div>\n\t                </td>\n                    <td>\n\t\t                <div class=\"form-group\">\n                            <input id=\"txtDesc" + cnt + "\" type=\"text\" disabled class=\"wid _copy _dis form-control condisa\" name=\"\"   />\n\t\t                </div>\n\t                </td>\n                    <td>\n\t\t                <div class=\"form-group\"> \n                            <textarea id=\"txtRemars" + cnt + "\" type=\"text\"  disabled class=\"wid _copy _dis form-control \" style=\"height: 43px;\" ></textarea>\n\t\t                </div>\n\t                </td>\n                    <td>\n\t\t                <div class=\"form-group\">\n                            <input id=\"txtUrl" + cnt + "\" type=\"text\" disabled class=\"wid _dis form-control\" name=\"\"  />\n\t\t                </div>\n\t                </td>   \n                    <td>\n\t\t                <div class=\"form-group\">\n\t\t\t               <button id=\"btn_Open" + cnt + "\" type=\"button\"   class=\"_dis btn btn-custon-four btn-info\" style=\"font-weight: bold;font-size: 22PX;width: 34px;padding: unset;\"><i class=\"fa fa-window-maximize\" ></i></button>\n\t\t                </div>\n\t                </td>\n                    <td>\n\t\t                <div class=\"form-group\">\n\t\t\t               <button id=\"btn_Upload" + cnt + "\" type=\"button\"  disabled  class=\"_dis btn btn-custon-four btn-info\" style=\"font-weight: bold;font-size: 22PX;width: 34px;padding: unset;background-color: #0ba70a;\"><i class=\"fa fa-cloud-upload\" ></i></button>\n                            \n\t\t                </div>\n\t                </td> \n                    <td>\n\t\t                <div class=\"form-group\">\n\t\t\t               <button id=\"btn_OpenFile" + cnt + "\" type=\"button\"   class=\"_dis btn btn-custon-four btn-info\" style=\"font-weight: bold;font-size: 22PX;width: 34px;padding: unset;background-color: #c47000;\"><i class=\"fa fa-folder-open\" ></i></button>\n\t\t                </div>\n\t                </td>\n                    <td>\n\t\t                <div class=\"form-group\">\n\t\t\t               <input id=\"txtFile" + cnt + "\" type=\"text\" disabled class=\"_Name_file   form-control\" name=\"\"  />\n\t\t                </div>\n\t                </td>\n                    \n               <input id=\"txt_StatusFlag" + cnt + "\" type=\"hidden\"   />\n               <input id=\"ID" + cnt + "\" type=\"hidden\"   />\n               <input id=\"MasterID" + cnt + "\" type=\"hidden\"   />\n                </tr>";
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
            var Url = location.origin + "/SavePath/Dropbox/FileUpload/" + NameFile;
            //var path = window.location.origin + '/Downlad/?D=' + Url + '&N=' + NameFile;
            //window.open(path, "_blank");   
            Upload(Url);
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
        btnUpdate.focus();
    }
    function CleanDetails() {
        $('#Div_control').removeClass('display_none');
        $("#Div_control :input").val("");
        txtTrDate.value = GetDate();
        dbTypeH.selectedIndex = 0;
        if (AllDisplay.length > 0) {
            var MaxID = AllDisplay[0].ID;
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
                SingModelDetails.Ex_Field = $("#txtFile" + i).val();
                ModelDetails.push(SingModelDetails);
            }
        }
    }
    function Update(StatusFlag) {
        var Data = new Send_Data();
        Data.ID = Number($('#txtTrNo').val());
        Data.Name_Txt_Master = NameModelMaster;
        Data.Name_Txt_Detail = NameModelDetails;
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
        Data.Name_Txt_Master = NameModelMaster;
        Data.Name_Txt_Detail = NameModelDetails;
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
            Data.Name_Txt_Master = NameModelMaster;
            Data.Name_Txt_Detail = NameModelDetails;
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
});
//# sourceMappingURL=Profile.js.map
$(document).ready(function () {
    Profile.InitalizeComponent();
});
var Profile;
(function (Profile) {
    var AllDisplay = new Array();
    var Display = new Array();
    var Model = new DataAll();
    var JGrid = new JsGrid();
    var btnShow;
    var btnAdd;
    var btnSave;
    var btnUpdate;
    var btnBack;
    var txtDateFrom;
    var txtDateTo;
    var txtTrDate;
    var dbTypeF;
    var dbTypeH;
    var Flag_IsNew = false;
    function InitalizeComponent() {
        InitalizeControls();
        InitalizeEvents();
        txtDateFrom.value = DateStartMonth();
        txtDateTo.value = GetDate();
        InitializeGrid();
        btnShow_onclick();
    }
    Profile.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        btnShow = document.getElementById("btnShow");
        btnAdd = document.getElementById("btnAdd");
        btnSave = document.getElementById("btnSave");
        btnUpdate = document.getElementById("btnUpdate");
        btnBack = document.getElementById("btnBack");
        ////////  
        dbTypeF = document.getElementById("dbTypeF");
        dbTypeH = document.getElementById("dbTypeH");
        ////////
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
        //********************************onchange****************************
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
            { title: "TrNo", name: "ID", type: "text", width: "5%" },
            { title: "TrDate", name: "TrDate", type: "text", width: "6%" },
            { title: "Type", name: "Type", type: "text", width: "7%" },
            { title: "Remars", name: "Remars", type: "text", width: "11%" },
            {
                title: "Delete",
                width: "5%",
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
                width: "5%",
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
    function btnShow_onclick() {
        Ajax.CallAsync({
            url: Url.Action("Get_Data", "Profile"),
            data: { Name_txt: "All_Data" },
            success: function (d) {
                var result = JSON.parse(d);
                var res = result;
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
        DisplayDetails(JGrid.SelectedItem);
        disabled();
    }
    function DisplayDetails(Selecteditem) {
        DocumentActions.RenderFromModel(Selecteditem);
        txtTrDate.value = Selecteditem.TrDate;
        Flag_IsNew = false;
    }
    function Enabled() {
        $('._dis').removeAttr('disabled');
        $('#id_div_Filter').addClass('disabledDiv');
        $('#btnBack').removeClass('display_none');
        $('#btnSave').removeClass('display_none');
        $('#btnUpdate').addClass('display_none');
    }
    function disabled() {
        $('._dis').attr('disabled', 'disabled');
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
    }
    function Update(StatusFlag) {
        var Data = new Send_Data();
        Data.ID = Number($('#txtTrNo').val());
        Data.Name_Txt = "All_Data";
        Data.Model = JSON.stringify(Model);
        Data.TypeDataSouce = "DataAll";
        Data.StatusFlag = StatusFlag;
        debugger;
        Ajax.CallAsync({
            url: Url.Action("Update_Data", "Profile"),
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
        var Data = new Send_Data();
        Data.ID = ID;
        Data.Name_Txt = "All_Data";
        Data.Model = JSON.stringify(Model);
        Data.TypeDataSouce = "DataAll";
        Data.StatusFlag = "d";
        debugger;
        Ajax.CallAsync({
            url: Url.Action("Update_Data", "Profile"),
            data: { Data: JSON.stringify(Data) },
            success: function (d) {
                var result = JSON.parse(d);
                var res = result;
                Display_Grid(res);
            }
        });
    }
    function Copy(ID) {
        var Data = new Send_Data();
        debugger;
        var MaxID = AllDisplay[0].ID;
        var NewData = JGrid.DataSource.filter(function (x) { return x.ID == ID; });
        NewData[0].ID = MaxID + 1;
        Data.Model = JSON.stringify(NewData[0]);
        Data.ID = MaxID + 1;
        Data.Name_Txt = "All_Data";
        Data.TypeDataSouce = "DataAll";
        Data.StatusFlag = "u";
        debugger;
        Ajax.CallAsync({
            url: Url.Action("Update_Data", "Profile"),
            data: { Data: JSON.stringify(Data) },
            success: function (d) {
                var result = JSON.parse(d);
                var res = result;
                Display_Grid(res);
            }
        });
    }
})(Profile || (Profile = {}));
//# sourceMappingURL=Profile.js.map
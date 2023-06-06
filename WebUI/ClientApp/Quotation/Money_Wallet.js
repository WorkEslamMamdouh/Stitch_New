$(document).ready(function () {
    Money_Wallet.InitalizeComponent();
});
var Money_Wallet;
(function (Money_Wallet) {
    var AllDisplay = new Array();
    var Display = new Array();
    var Model = new DataAll();
    var JGrid = new JsGrid();
    var btnShow;
    var btnExchange;
    var btnReceipt;
    var a_Expans;
    var a_Resive;
    var a_View;
    var txtAmount;
    var txtSearch;
    var btnLogin;
    var txtDateFrom;
    var txtDateTo;
    var txtPassword;
    var Glopl_Type = 'Exchange';
    var flagSave = 0;
    var totalAmount = 0;
    var DataCatch_Receipt = "";
    function InitalizeComponent() {
        debugger;
        $('#Pass').removeClass('display_none');
        $('#Page_mone').addClass('display_none');
        btnLogin = document.getElementById("btnLogin");
        txtPassword = document.getElementById("txtPassword");
        btnLogin.onclick = btnLogin_onclick;
        txtPassword.focus();
        Event_key('Enter', 'txtPassword', 'btnLogin');
        var pass = sessionStorage.getItem("EslamPassword");
        if (pass != null) {
            txtPassword.value = pass;
            btnLogin_onclick();
        }
        else {
            $('#Pass').removeClass('display_none');
            txtPassword.focus();
        }
    }
    Money_Wallet.InitalizeComponent = InitalizeComponent;
    function btnLogin_onclick() {
        var Done = false;
        if (txtPassword.value.trim() == "619606") {
            DataCatch_Receipt = "Catch_Receipt_01";
            Done = true;
        }
        else if (txtPassword.value.trim() == "619") {
            DataCatch_Receipt = "Catch_Receipt_02";
            Done = true;
        }
        else if (txtPassword.value.trim() == "619619") {
            DataCatch_Receipt = "Catch_Receipt_03";
            Done = true;
        }
        else {
            Errorinput(txtPassword);
            Done = false;
        }
        if (Done) {
            $('#layout_Back').addClass('display_none');
            $('#layout_Refresh').addClass('display_none');
            $('#Pass').addClass('display_none');
            $('#Page_mone').removeClass('display_none');
            Tabs_click();
            InitializeGrid();
            txtDateFrom = document.getElementById("txtDateFrom");
            txtDateTo = document.getElementById("txtDateTo");
            txtSearch = document.getElementById("txtSearch");
            txtAmount = document.getElementById("txtAmount");
            btnShow = document.getElementById("btnShow");
            btnExchange = document.getElementById("btnExchange");
            btnReceipt = document.getElementById("btnReceipt");
            a_Expans = document.getElementById("a_Expans");
            a_Resive = document.getElementById("a_Resive");
            a_View = document.getElementById("a_View");
            btnExchange.onclick = function () { AppTans(Glopl_Type); };
            btnReceipt.onclick = function () { AppTans(Glopl_Type); };
            a_Expans.onclick = function () { $('#Rec_Exch_Tab').removeClass('display_none'); $('#Views_Tab').addClass('display_none'); Glopl_Type = 'Exchange'; };
            a_Resive.onclick = function () { $('#Rec_Exch_Tab').removeClass('display_none'); $('#Views_Tab').addClass('display_none'); Glopl_Type = 'Receipt'; };
            a_View.onclick = function () { $('#Views_Tab').removeClass('display_none'); $('#Rec_Exch_Tab').addClass('display_none'); };
            txtDateFrom.value = DateStartYear();
            txtDateTo.value = GetDate();
            txtSearch.onkeyup = txtSearch_change;
            btnShow.onclick = DisplayAll;
            DisplayAll();
            sessionStorage.setItem("EslamPassword", txtPassword.value);
        }
    }
    function Tabs_click() {
        $('body').on('click', '.scrollable-tabs li', function () {
            debugger;
            $('li').removeClass('actTab');
            $('.scrollable-tabs li a.active').removeClass('active');
            if ($(this).html() != '<a class="" data-toggle="tab" href=""><i class="fa fa-plus-circle Add"></i></a>' && $(this).html() != '<a class="" data-toggle="tab" href="" aria-expanded="true"><i class="fa fa-plus-circle Add"></i></a>' && $(this).html() != '<a class="" data-toggle="tab" href="" aria-expanded="false"><i class="fa fa-plus-circle Add"></i></a>') {
                $(this).addClass('actTab');
                Clean();
            }
        });
    }
    function InitializeGrid() {
        JGrid.ElementName = "JGrid";
        JGrid.PrimaryKey = "ID";
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
            { title: "Remars", name: "Remars", type: "text" },
            { title: "Amount", name: "Amount", type: "text" },
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
                title: "Delete", visible: false,
                itemTemplate: function (s, item) {
                    var txt = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("Delete");
                    txt.className = "btn btn-custon-four btn-danger ";
                    totalAmount = totalAmount + item.Amount;
                    return txt;
                }
            },
        ];
        //JGrid.Bind();
    }
    function txtSearch_change() {
        $("#JGrid").jsGrid("option", "pageIndex", 1);
        if (txtSearch.value != "") {
            var search_1 = txtSearch.value.toLowerCase();
            var SearchDetails = Display.filter(function (x) { return x.ID.toString().search(search_1) >= 0 || x.Amount.toString().search(search_1) >= 0 || x.Title.toLowerCase().search(search_1) >= 0
                || x.Type.toLowerCase().search(search_1) >= 0 || x.Remars.toLowerCase().search(search_1) >= 0; });
            JGrid.DataSource = SearchDetails;
            JGrid.Bind();
        }
        else {
            JGrid.DataSource = Display;
            JGrid.Bind();
        }
    }
    function DisplayAll() {
        Ajax.CallAsync({
            url: Url.Action("Get_Data", "Profile"),
            data: { Name_txt: DataCatch_Receipt },
            success: function (d) {
                var result = JSON.parse(d);
                var res = result;
                Display_Grid(res);
            }
        });
    }
    function Display_Grid(_Display) {
        debugger;
        totalAmount = 0;
        AllDisplay = _Display;
        AllDisplay = AllDisplay.sort(dynamicSortNew("ID"));
        Display = _Display;
        if ($('#TypeSoursF').val() != "All") {
            Display = Display.filter(function (x) { return x.Type == $('#TypeSoursF').val(); });
        }
        if ($('#TrType').val() != "All") {
            Display = Display.filter(function (x) { return x.Title == $('#TrType').val(); });
        }
        Display = Display.filter(function (x) { return x.TrDate >= txtDateFrom.value && x.TrDate <= txtDateTo.value; });
        Display = Display.sort(dynamicSortNew("ID"));
        JGrid.DataSource = Display;
        JGrid.Bind();
        Clean();
        for (var i = 0; i < Display.length; i++) {
            totalAmount = totalAmount + Display[i].Amount;
        }
        $('#txtTotal').val(totalAmount.toFixed(2));
    }
    function AppTans(Type) {
        debugger;
        if (flagSave == 1) {
            setTimeout(function () { flagSave = 0; }, 800);
            return false;
        }
        if ($('#txtRemark').val().trim() == '') {
            Errorinput($('#txtRemark'));
            //alert('برجاء ادخال الملاخظات')
            return false;
        }
        if ($('#txtAmount').val().trim() == '') {
            Errorinput($('#txtAmount'));
            //alert('برجاء ادخال المبلغ')
            return false;
        }
        Model = new DataAll();
        var Val = txtAmount.value;
        txtAmount.value = eval(Val);
        DocumentActions.AssignToModel(Model); //Insert Update 
        Model.TrDate = DateFormatRep($('#txtdate').val());
        Model.Type = $('#TypeSours').val();
        Model.Title = Type;
        Model.Amount = eval(Val);
        Model.ID = Number($('#txtTrNo').val());
        //Model.ID = 666;
        var Data = new Send_Data();
        Data.ID = Number($('#txtTrNo').val());
        Data.Name_Txt_Master = DataCatch_Receipt;
        Data.Model = JSON.stringify(Model);
        Data.StatusFlag = 'u';
        debugger;
        $.ajax({
            url: Url.Action("Add_Trans", "Profile"),
            type: "POST",
            dataType: 'json',
            async: false,
            data: { Data: JSON.stringify(Data) },
            success: function (d) {
                var result = JSON.parse(d);
                var res = result;
                Display_Grid(res);
                Clean();
                flagSave = 1;
            }
        });
    }
    function Delete(ID) {
        JGrid.SelectedItem = Display.filter(function (x) { return x.ID == ID; })[0];
        Model = new DataAll();
        Model.ID = ID;
        var Data = new Send_Data();
        Data.ID = ID;
        Data.Name_Txt_Master = DataCatch_Receipt;
        Data.Model = JSON.stringify(Model);
        Data.StatusFlag = 'd';
        debugger;
        $.ajax({
            url: Url.Action("Add_Trans", "Profile"),
            type: "POST",
            dataType: 'json',
            async: false,
            data: { Data: JSON.stringify(Data) },
            success: function (d) {
                var result = JSON.parse(d);
                var res = result;
                Display_Grid(res);
                Clean();
            }
        });
    }
    function Clean() {
        $('#TypeSours').val('Cash');
        $('#txtRemark').val('');
        $('#txtdate').val(GetDate());
        $('#txtAmount').val('');
        setTimeout(function () { $('#txtRemark').focus(); }, 150);
        $('#btnReceipt').addClass('display_none');
        $('#btnExchange').addClass('display_none');
        if (Glopl_Type == 'Exchange') {
            $('#btnExchange').removeClass('display_none');
            Event_key('Enter', 'txtAmount', 'btnExchange');
        }
        else {
            $('#btnReceipt').removeClass('display_none');
            Event_key('Enter', 'txtAmount', 'btnReceipt');
        }
        AllBalance();
    }
    function AllBalance() {
        debugger;
        var MaxID = 0;
        if (AllDisplay.length > 0) {
            MaxID = AllDisplay[0].ID;
        }
        $('#txtTrNo').val(MaxID + 1);
        $('#TrNoLab').html('TrNo ( ' + (Number(MaxID) + 1) + ' )');
        var Exchange = AllDisplay.filter(function (x) { return x.Title == 'Exchange'; });
        var Receipt = AllDisplay.filter(function (x) { return x.Title == 'Receipt'; });
        var Amount_Exch = 0;
        for (var i = 0; i < Exchange.length; i++) {
            Amount_Exch = Amount_Exch + Exchange[i].Amount;
        }
        var Amount_Rec = 0;
        for (var i = 0; i < Receipt.length; i++) {
            Amount_Rec = Amount_Rec + Receipt[i].Amount;
        }
        $('#BalanceLab').html('All Balance ( ' + (Number(Amount_Rec) - Number(Amount_Exch)) + ' ) $');
    }
})(Money_Wallet || (Money_Wallet = {}));
//# sourceMappingURL=Money_Wallet.js.map
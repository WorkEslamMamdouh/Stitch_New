$(document).ready(function () {
    Money_Wallet.InitalizeComponent();
});
var Money_Wallet;
(function (Money_Wallet) {
    var AllDisplay = new Array();
    var Display = new Array();
    var Model = new DataAll();
    var JGrid = new JsGrid();
    var btnExchange;
    var btnReceipt;
    var a_Expans;
    var a_Resive;
    var a_View;
    var txtSearch;
    var Glopl_Type = 'Exchange';
    var flagSave = 0;
    function InitalizeComponent() {
        Tabs_click();
        InitializeGrid();
        txtSearch = document.getElementById("txtSearch");
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
        txtSearch.onkeyup = txtSearch_change;
        DisplayAll();
    }
    Money_Wallet.InitalizeComponent = InitalizeComponent;
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
            data: { Name_txt: "Catch_Receipt" },
            success: function (d) {
                var result = JSON.parse(d);
                var res = result;
                Display_Grid(res);
            }
        });
    }
    function Display_Grid(_Display) {
        debugger;
        AllDisplay = _Display;
        AllDisplay = AllDisplay.sort(dynamicSortNew("ID"));
        Display = _Display;
        //if (dbTypeF.value != "All") {
        //    Display = Display.filter(x => x.Type == dbTypeF.value);
        //}
        //Display = Display.filter(x => x.TrDate >= txtDateFrom.value && x.TrDate <= txtDateTo.value);
        Display = Display.sort(dynamicSortNew("ID"));
        JGrid.DataSource = Display;
        JGrid.Bind();
        Clean();
    }
    function AppTans(Type) {
        debugger;
        if (flagSave == 1) {
            setTimeout(function () { flagSave = 0; }, 1000);
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
        DocumentActions.AssignToModel(Model); //Insert Update 
        Model.TrDate = DateFormatRep($('#txtdate').val());
        Model.Type = $('#TypeSours').val();
        Model.Title = Type;
        Model.ID = Number($('#txtTrNo').val());
        //Model.ID = 666;
        var Data = new Send_Data();
        Data.ID = Number($('#txtTrNo').val());
        Data.Name_Txt_Master = "Catch_Receipt";
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
        Data.Name_Txt_Master = "Catch_Receipt";
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
        var MaxID = AllDisplay[0].ID;
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
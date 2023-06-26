$(document).ready(function () {
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
    var txtDateFrom;
    var txtDateTo;
    var Glopl_Type = 'Exchange';
    var flagSave = 0;
    var totalAmount = 0;
    var DataCatch_Receipt = "";
    WalletInitalizeComponent();
    var FlagUpdate = false;
    function WalletInitalizeComponent() {
        debugger;
        $("#App_Ref").on('click', function () {
            var glopalBtn = localStorage.getItem('glopalBtn');
            $("#" + glopalBtn + "").click();
        });
        $("#Back").on('click', function () {
            $('#Home_Page').removeClass('display_none');
            $('#Body_Page').addClass('display_none');
            $("#layout_Refresh").addClass('display_none');
            $("#layout_Back").addClass('display_none');
            $("#layout_Refresh").attr('style', '');
        });
        var ID = sessionStorage.getItem("AddUserID");
        DataCatch_Receipt = "Wallet/Wallet_0" + ID;
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
        $('.jsgrid-grid-body').scrollLeft(300);
        var coll = document.getElementsByClassName("Balance");
        var i;
        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function () {
                this.classList.toggle("active_Balance");
                var content = this.nextElementSibling;
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                }
                else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
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
        JGrid.OnRowDoubleClicked = GridDoubleClick;
        JGrid.PrimaryKey = "ID";
        JGrid.Paging = true;
        JGrid.PageSize = 15;
        JGrid.Sorting = true;
        JGrid.InsertionMode = JsGridInsertionMode.Binding;
        JGrid.Editing = false;
        JGrid.Inserting = false;
        JGrid.SelectedIndex = 1;
        JGrid.OnItemEditing = function () { };
        JGrid.Columns = [
            { title: "ID", name: "ID", type: "text", width: " ", visible: false },
            { title: "TrNo", name: "ID", type: "number" },
            { title: "TrDate", name: "TrDate", type: "text" },
            { title: "Type", name: "Type", type: "text" },
            { title: "Title", name: "Title", type: "text" },
            { title: "Remars", name: "Remars", type: "text", width: "300px" },
            {
                title: "Amount", css: "ColumPadding", name: "Amount", width: "120px",
                itemTemplate: function (s, item) {
                    var txt = document.createElement("label");
                    txt.innerHTML = "( " + item.Amount.toString() + " ) $";
                    if (item.Title == "Exchange") {
                        if (item.Type == "Debt") {
                            txt.style.color = "#ea8813";
                        }
                        else {
                            txt.style.color = "Red";
                        }
                    }
                    else {
                        if (item.Type == "Debt") {
                            txt.style.color = "#a11dda";
                        }
                        else {
                            txt.style.color = "#00b020";
                        }
                    }
                    return txt;
                }
            },
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
    function GridDoubleClick() {
        debugger;
        FlagUpdate = true;
        txtAmount.value = JGrid.SelectedItem.Amount;
        $('#txtdate').val(DateFormat(JGrid.SelectedItem.TrDate));
        $('#txtTrNo').val(JGrid.SelectedItem.ID);
        $('#TypeSours').val(JGrid.SelectedItem.Type);
        $('#txtRemark').val(JGrid.SelectedItem.Remars);
        if (JGrid.SelectedItem.Title == "Exchange") {
            $('#a_Expans').click();
        }
        else {
            $('#a_Resive').click();
        }
        setTimeout(function () {
            FlagUpdate = false;
        }, 500);
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
            success: function (Pro) {
                if (Pro != "Error") {
                    var result = JSON.parse(Pro);
                    var res = result;
                    Display_Grid(res);
                }
                else {
                    var res = void 0;
                    JGrid.DataSource = res;
                    JGrid.Bind();
                    Clean();
                }
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
        var DisplayEx = Display.filter(function (x) { return x.Type != 'Debt' && x.Title == 'Exchange'; });
        var DisplayRec = Display.filter(function (x) { return x.Type != 'Debt' && x.Title == 'Receipt'; });
        var AmountEx = 0;
        for (var i = 0; i < DisplayEx.length; i++) {
            AmountEx = AmountEx + DisplayEx[i].Amount;
        }
        var AmountRec = 0;
        for (var i = 0; i < DisplayRec.length; i++) {
            AmountRec = AmountRec + DisplayRec[i].Amount;
        }
        $('#txtTotalExchange').val(AmountEx.toFixed(2));
        $('#txtTotalReceipt').val(AmountRec.toFixed(2));
        $('#txtTotal').val((AmountRec - AmountEx).toFixed(2));
        $('.jsgrid-grid-body').scrollLeft(500);
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
        if (!FlagUpdate) {
            $('#TypeSours').val('Cash');
            $('#txtRemark').val('');
            $('#txtdate').val(GetDate());
            $('#txtAmount').val('');
        }
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
        if (!FlagUpdate) {
            var MaxID = 0;
            if (AllDisplay.length > 0) {
                MaxID = AllDisplay[0].ID;
            }
            $('#txtTrNo').val(MaxID + 1);
            $('#txtTrNo').attr('style', 'text-align: center;background: #004895;color: white;');
        }
        else {
            $('#txtTrNo').attr('style', 'text-align: center;background: #009563;color: white;');
        }
        //******************************************* Exchange********************************
        var DebtAmountEx = 0; //مديونيه
        var CashAmountEx = 0;
        var Cairo_BankAmountEx = 0;
        var Al_ahly_BankAmountEx = 0;
        var Bal_HomeAmountEx = 0;
        var AAIBAmountEx = 0;
        var CashEx = AllDisplay.filter(function (x) { return x.Type == 'Cash' && x.Title == 'Exchange'; });
        var Cairo_BankEx = AllDisplay.filter(function (x) { return x.Type == 'Cairo Bank' && x.Title == 'Exchange'; });
        var Al_ahly_BankEx = AllDisplay.filter(function (x) { return x.Type == 'Al ahly Bank' && x.Title == 'Exchange'; });
        var DebtEx = AllDisplay.filter(function (x) { return x.Type == 'Debt' && x.Title == 'Exchange'; });
        var Bal_HomeEx = AllDisplay.filter(function (x) { return x.Type == 'Bal Home' && x.Title == 'Exchange'; });
        var AAIBEx = AllDisplay.filter(function (x) { return x.Type == 'AAIB' && x.Title == 'Exchange'; });
        for (var i = 0; i < DebtEx.length; i++) {
            DebtAmountEx = DebtAmountEx + DebtEx[i].Amount;
        }
        for (var i = 0; i < CashEx.length; i++) {
            CashAmountEx = CashAmountEx + CashEx[i].Amount;
        }
        for (var i = 0; i < Cairo_BankEx.length; i++) {
            Cairo_BankAmountEx = Cairo_BankAmountEx + Cairo_BankEx[i].Amount;
        }
        for (var i = 0; i < Al_ahly_BankEx.length; i++) {
            Al_ahly_BankAmountEx = Al_ahly_BankAmountEx + Al_ahly_BankEx[i].Amount;
        }
        for (var i = 0; i < Bal_HomeEx.length; i++) {
            Bal_HomeAmountEx = Bal_HomeAmountEx + Bal_HomeEx[i].Amount;
        }
        for (var i = 0; i < AAIBEx.length; i++) {
            AAIBAmountEx = AAIBAmountEx + AAIBEx[i].Amount;
        }
        //**************************************************** Receipt**************************************
        var DebtAmountRec = 0; //مديونيه
        var CashAmountRec = 0; //كاش
        var Cairo_BankAmountRec = 0; //بنك القاهره
        var Al_ahly_BankAmountRec = 0; //بنك الاهلي
        var Bal_HomeAmountRec = 0; // رصيد البيت
        var AAIBAmountRec = 0; //بنك العربي الافريقي
        var CashRec = AllDisplay.filter(function (x) { return x.Type == 'Cash' && x.Title == 'Receipt'; });
        var Cairo_BankRec = AllDisplay.filter(function (x) { return x.Type == 'Cairo Bank' && x.Title == 'Receipt'; });
        var Al_ahly_BankRec = AllDisplay.filter(function (x) { return x.Type == 'Al ahly Bank' && x.Title == 'Receipt'; });
        var DebtRec = AllDisplay.filter(function (x) { return x.Type == 'Debt' && x.Title == 'Receipt'; });
        var Bal_HomeRec = AllDisplay.filter(function (x) { return x.Type == 'Bal Home' && x.Title == 'Receipt'; });
        var AAIBRec = AllDisplay.filter(function (x) { return x.Type == 'AAIB' && x.Title == 'Receipt'; });
        for (var i = 0; i < DebtRec.length; i++) {
            DebtAmountRec = DebtAmountRec + DebtRec[i].Amount;
        }
        for (var i = 0; i < CashRec.length; i++) {
            CashAmountRec = CashAmountRec + CashRec[i].Amount;
        }
        for (var i = 0; i < Cairo_BankRec.length; i++) {
            Cairo_BankAmountRec = Cairo_BankAmountRec + Cairo_BankRec[i].Amount;
        }
        for (var i = 0; i < Al_ahly_BankRec.length; i++) {
            Al_ahly_BankAmountRec = Al_ahly_BankAmountRec + Al_ahly_BankRec[i].Amount;
        }
        for (var i = 0; i < Bal_HomeRec.length; i++) {
            Bal_HomeAmountRec = Bal_HomeAmountRec + Bal_HomeRec[i].Amount;
        }
        for (var i = 0; i < AAIBRec.length; i++) {
            AAIBAmountRec = AAIBAmountRec + AAIBRec[i].Amount;
        }
        //****************************************Total***********************************************
        $('#InDebtLab').html('InDebt ( ' + (Number(DebtAmountRec)) + ' ) $');
        $('#OutDebtLab').html('OutDebt ( ' + (Number(DebtAmountEx)) + ' ) $');
        $('#CashLab').html('Cash ( ' + (Number(CashAmountRec) - Number(CashAmountEx)) + ' ) $');
        $('#Bal_HomeLab').html('Home ( ' + (Number(Bal_HomeAmountRec) - Number(Bal_HomeAmountEx)) + ' ) $');
        $('#CairoLab').html('Cairo ( ' + (Number(Cairo_BankAmountRec) - Number(Cairo_BankAmountEx)) + ' ) $');
        $('#Al_ahlyLab').html('Al_ahly ( ' + (Number(Al_ahly_BankAmountRec) - Number(Al_ahly_BankAmountEx)) + ' ) $');
        $('#AAIBLab').html('AAIB ( ' + (Number(AAIBAmountRec) - Number(AAIBAmountEx)) + ' ) $');
        //****************************************AllTotal***********************************************
        var AllTotal_Rec = CashAmountRec + Cairo_BankAmountRec + Al_ahly_BankAmountRec;
        var AllTotal_Exch = CashAmountEx + Cairo_BankAmountEx + Al_ahly_BankAmountEx;
        $('#BalanceLab').html('All Bal ( ' + (Number(AllTotal_Rec) - Number(AllTotal_Exch)) + ' ) $');
    }
});
//# sourceMappingURL=Money_Wallet.js.map
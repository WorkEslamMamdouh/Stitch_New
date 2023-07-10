$(document).ready(function () {
    var Wallet_Def = new Array();
    var ModelDetails = new Array();
    var AllDisplay = new Array();
    var Display = new Array();
    var Model = new Wallet_Data();
    var JGrid = new JsGrid();
    var btnExchange;
    var btnReceipt;
    var btnTransfers;
    var a_Expans;
    var a_Resive;
    var a_Transfers;
    var a_View;
    var a_Definitions;
    var a_Shahadat;
    var txtAmount;
    var txtSearch;
    var txtDateFrom;
    var txtDateTo;
    var btnShow;
    var btnSave;
    var btnUpdate;
    var btnBack;
    var btnAddDetails;
    var Glopl_Type = 'Exchange';
    var flagSave = 0;
    var totalAmount = 0;
    var CountGrid = 0;
    var DetMaxLast = 0;
    var Comp_Wallet = "";
    var Comp_Definitions = "";
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
        Comp_Wallet = "Wallet/Wallet_0" + ID;
        Comp_Definitions = "Wallet/Def_Wallet_0" + ID;
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
        btnAddDetails = document.getElementById("btnAddDetails");
        btnSave = document.getElementById("btnSave");
        btnUpdate = document.getElementById("btnUpdate");
        btnBack = document.getElementById("btnBack");
        btnExchange = document.getElementById("btnExchange");
        btnReceipt = document.getElementById("btnReceipt");
        btnTransfers = document.getElementById("btnTransfers");
        a_Expans = document.getElementById("a_Expans");
        a_Resive = document.getElementById("a_Resive");
        a_Transfers = document.getElementById("a_Transfers");
        a_View = document.getElementById("a_View");
        a_Definitions = document.getElementById("a_Definitions");
        a_Shahadat = document.getElementById("a_Shahadat");
        btnExchange.onclick = function () { AppTans(Glopl_Type); };
        btnReceipt.onclick = function () { AppTans(Glopl_Type); };
        btnTransfers.onclick = function () { AppTans(Glopl_Type); };
        a_Expans.onclick = function () { $('.Hid_Rec').removeClass('display_none'); $('.Hid_Ex').addClass('display_none'); $('#Rec_Exch_Tab').removeClass('display_none'); $('#Views_Tab').addClass('display_none'); $('#Definitions_Tab').addClass('display_none'); Glopl_Type = 'Exchange'; };
        a_Resive.onclick = function () { $('.Hid_Ex').removeClass('display_none'); $('.Hid_Rec').addClass('display_none'); $('#Rec_Exch_Tab').removeClass('display_none'); $('#Views_Tab').addClass('display_none'); $('#Definitions_Tab').addClass('display_none'); Glopl_Type = 'Receipt'; };
        a_Transfers.onclick = function () { $('.Hid_Rec').removeClass('display_none'); $('.Hid_Ex').removeClass('display_none'); $('#Rec_Exch_Tab').removeClass('display_none'); $('#Views_Tab').addClass('display_none'); $('#Definitions_Tab').addClass('display_none'); Glopl_Type = 'Transfers'; };
        a_View.onclick = function () { $('#Views_Tab').removeClass('display_none'); $('#Rec_Exch_Tab').addClass('display_none'); $('#Definitions_Tab').addClass('display_none'); $('#Shahadat_Tab').addClass('display_none'); };
        a_Definitions.onclick = function () { $('#Definitions_Tab').removeClass('display_none'); $('#Rec_Exch_Tab').addClass('display_none'); $('#Views_Tab').addClass('display_none'); $('#Shahadat_Tab').addClass('display_none'); };
        a_Shahadat.onclick = function () { $('#Shahadat_Tab').removeClass('display_none'); $('#Rec_Exch_Tab').addClass('display_none'); $('#Views_Tab').addClass('display_none'); $('#Definitions_Tab').addClass('display_none'); };
        txtDateFrom.value = DateStartYear();
        txtDateTo.value = GetDate();
        txtSearch.onkeyup = txtSearch_change;
        btnShow.onclick = DisplayAll;
        btnSave.onclick = btnSave_onClick;
        btnUpdate.onclick = btnUpdate_onclick;
        btnBack.onclick = btnBack_onclick;
        btnAddDetails.onclick = AddNewRow;
        GetDefinitions();
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
                    else if (item.Title == "Receipt") {
                        if (item.Type == "Debt") {
                            txt.style.color = "#a11dda";
                        }
                        else {
                            txt.style.color = "#00b020";
                        }
                    }
                    else if (item.Title == "Transfers") {
                        txt.style.color = "rgb(91 192 222)";
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
    function fillddTypeSours() {
        $('#TypeSoursF').html('<option value="All">All</option>');
        $('#TypeSours').html("");
        $('#TypeSoursTrans').html("");
        for (var u = 0; u < Wallet_Def.length; u++) {
            $('#TypeSoursF').append('<option value="' + Wallet_Def[u].NameBal + '">' + Wallet_Def[u].NameBal + '</option>');
            var Nameclass = '';
            $('.Hid_Rec').removeClass('display_none');
            $('.Hid_Ex').removeClass('display_none');
            if (Wallet_Def[u].CUSTOM1 != "true") {
                Nameclass = ' Hid_Rec';
            }
            if (Wallet_Def[u].CUSTOM2 != "true") {
                Nameclass = Nameclass + ' Hid_Ex';
            }
            if (Wallet_Def[u].CUSTOM4 == "true") {
                $('#TypeSours').append('<option class="' + Nameclass + '" value="' + Wallet_Def[u].NameBal + '">' + Wallet_Def[u].NameBal + '</option>');
                $('#TypeSoursTrans').append('<option class="' + Nameclass + '" value="' + Wallet_Def[u].NameBal + '">To ' + Wallet_Def[u].NameBal + '</option>');
            }
        }
    }
    function GridDoubleClick() {
        debugger;
        FlagUpdate = true;
        txtAmount.value = JGrid.SelectedItem.Amount;
        $('#txtdate').val(DateFormat(JGrid.SelectedItem.TrDate));
        $('#txtTrNo').val(JGrid.SelectedItem.ID);
        $('#TypeSours').val(JGrid.SelectedItem.Type);
        $('#TypeSoursTrans').val(JGrid.SelectedItem.TypeTo);
        $('#txtRemark').val(JGrid.SelectedItem.Remars);
        if (JGrid.SelectedItem.Title == "Exchange") {
            $('#a_Expans').click();
        }
        else if (JGrid.SelectedItem.Title == "Receipt") {
            $('#a_Resive').click();
        }
        else if (JGrid.SelectedItem.Title == "Transfers") {
            $('#a_Resive').click();
            $('#a_Transfers').click();
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
            data: { Name_txt: Comp_Wallet },
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
            return false;
        }
        if ($('#TypeSours').val() == $('#TypeSoursTrans').val() && Type == 'Transfers') {
            Errorinput($('#TypeSoursTrans'));
            return false;
        }
        if ($('#txtAmount').val().trim() == '') {
            Errorinput($('#txtAmount'));
            return false;
        }
        Model = new Wallet_Data();
        var Val = txtAmount.value;
        txtAmount.value = eval(Val);
        DocumentActions.AssignToModel(Model); //Insert Update 
        Model.TrDate = DateFormatRep($('#txtdate').val());
        Model.Type = $('#TypeSours').val();
        Model.TypeTo = $('#TypeSoursTrans').val();
        Model.Title = Type;
        Model.Amount = eval(Val);
        Model.ID = Number($('#txtTrNo').val());
        //Model.ID = 666;
        var Data = new Send_Data();
        Data.ID = Number($('#txtTrNo').val());
        Data.Name_Txt_Master = Comp_Wallet;
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
        Model = new Wallet_Data();
        Model.ID = ID;
        var Data = new Send_Data();
        Data.ID = ID;
        Data.Name_Txt_Master = Comp_Wallet;
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
            $('#TypeSours').prop('selectedIndex', 0);
            $('#TypeSoursTrans').prop('selectedIndex', 0);
            $('#txtRemark').val('');
            $('#txtdate').val(GetDate());
            $('#txtAmount').val('');
        }
        setTimeout(function () { $('#txtRemark').focus(); }, 150);
        $('#btnReceipt').addClass('display_none');
        $('#btnExchange').addClass('display_none');
        $('#btnTransfers').addClass('display_none');
        $('.Not_Trans').removeClass('display_none');
        $('.ToTransfers').addClass('display_none');
        $('#AreaAmount').attr('class', 'col-xs-6 col-lg-6 col-sm-6');
        if (Glopl_Type == 'Exchange') {
            $('#btnExchange').removeClass('display_none');
            Event_key('Enter', 'txtAmount', 'btnExchange');
        }
        else if (Glopl_Type == 'Receipt') {
            $('#btnReceipt').removeClass('display_none');
            Event_key('Enter', 'txtAmount', 'btnReceipt');
        }
        else if (Glopl_Type == 'Transfers') {
            $('#btnTransfers').removeClass('display_none');
            Event_key('Enter', 'txtAmount', 'btnTransfers');
            $('.Not_Trans').addClass('display_none');
            $('.ToTransfers').removeClass('display_none');
            $('#AreaAmount').attr('class', 'col-xs-12 col-lg-12 col-sm-12');
        }
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
        //AllBalance(); 
        Sum_AllBalance();
    }
    //*************************************************Display_AllBalance****************************************
    function AllBalance() {
        debugger;
        //******************************************* Exchange********************************
        var DebtAmountEx = 0; //مديونيه
        var CashAmountEx = 0;
        var Cairo_BankAmountEx = 0;
        var Al_ahly_BankAmountEx = 0;
        var Bal_HomeAmountEx = 0;
        var AAIBAmountEx = 0;
        debugger;
        var CashEx = AllDisplay.filter(function (x) { return x.Type == 'Cash' && (x.Title == 'Exchange' || x.Title == 'Transfers'); });
        var Cairo_BankEx = AllDisplay.filter(function (x) { return x.Type == 'Cairo Bank' && (x.Title == 'Exchange' || x.Title == 'Transfers'); });
        var Al_ahly_BankEx = AllDisplay.filter(function (x) { return x.Type == 'Al ahly Bank' && (x.Title == 'Exchange' || x.Title == 'Transfers'); });
        var DebtEx = AllDisplay.filter(function (x) { return x.Type == 'Debt' && x.Title == 'Exchange'; });
        var Bal_HomeEx = AllDisplay.filter(function (x) { return x.Type == 'Bal Home' && (x.Title == 'Exchange' || x.Title == 'Transfers'); });
        debugger;
        var AAIBEx = AllDisplay.filter(function (x) { return x.Type == 'AAIB' && (x.Title == 'Exchange' || x.Title == 'Transfers'); });
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
        debugger;
        var CashRec = AllDisplay.filter(function (x) { return x.Type == 'Cash' && x.Title == 'Receipt' || (x.TypeTo == 'Cash' && x.Title == 'Transfers'); });
        var Cairo_BankRec = AllDisplay.filter(function (x) { return x.Type == 'Cairo Bank' && x.Title == 'Receipt' || (x.TypeTo == 'Cairo Bank' && x.Title == 'Transfers'); });
        var Al_ahly_BankRec = AllDisplay.filter(function (x) { return x.Type == 'Al ahly Bank' && x.Title == 'Receipt' || (x.TypeTo == 'Al ahly Bank' && x.Title == 'Transfers'); });
        var DebtRec = AllDisplay.filter(function (x) { return x.Type == 'Debt' && x.Title == 'Receipt'; });
        var Bal_HomeRec = AllDisplay.filter(function (x) { return x.Type == 'Bal Home' && x.Title == 'Receipt' || (x.TypeTo == 'Bal Home' && x.Title == 'Transfers'); });
        debugger;
        var AAIBRec = AllDisplay.filter(function (x) { return x.Type == 'AAIB' && x.Title == 'Receipt' || (x.TypeTo == 'AAIB' && x.Title == 'Transfers'); });
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
        debugger;
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
    function Sum_AllBalance() {
        $('#Div_Show_Balance').html('');
        debugger;
        var AllTotal = 0;
        var Wallet_Def_IsActive = Wallet_Def.filter(function (x) { return x.CUSTOM4 == "true"; });
        for (var xx = 0; xx < Wallet_Def_IsActive.length; xx++) {
            debugger;
            //**********************************************Build**********************************
            var idBal = Wallet_Def_IsActive[xx].NameBal;
            idBal = idBal.replace(/ /g, "_");
            var html_Balance_1 = " \n                    <div class=\"col-xs-6 col-lg-6 col-sm-6 \">\n                            <label id=\"" + idBal + "\"> ( 0 )</label>\n                    </div>";
            $('#Div_Show_Balance').append(html_Balance_1);
            //******************************************* Sum Exchange********************************
            var EXAmount = 0;
            var Exchange = AllDisplay.filter(function (x) { return x.Type == '' + Wallet_Def_IsActive[xx].NameBal + '' && (x.Title == 'Exchange' || x.Title == 'Transfers'); });
            if (Wallet_Def_IsActive[xx].CUSTOM2 == "true") {
                for (var i1 = 0; i1 < Exchange.length; i1++) {
                    EXAmount = EXAmount + Exchange[i1].Amount;
                }
            }
            //**************************************************** Receipt**************************************
            var RecAmount = 0;
            var Receipt = AllDisplay.filter(function (x) { return x.Type == '' + Wallet_Def_IsActive[xx].NameBal + '' && x.Title == 'Receipt' || (x.TypeTo == '' + Wallet_Def_IsActive[xx].NameBal + '' && x.Title == 'Transfers'); });
            if (Wallet_Def_IsActive[xx].CUSTOM1 == "true") {
                for (var i2 = 0; i2 < Receipt.length; i2++) {
                    RecAmount = RecAmount + Receipt[i2].Amount;
                }
            }
            RecAmount = RecAmount + Wallet_Def_IsActive[xx].Amount;
            //****************************************Total***********************************************
            $('#' + idBal + '').html('' + Wallet_Def_IsActive[xx].NameBal + ' ( ' + (Number(RecAmount) - Number(EXAmount)) + ' ) $');
            if (Wallet_Def_IsActive[xx].CUSTOM3 == "true") {
                AllTotal = AllTotal + (Number(RecAmount) - Number(EXAmount));
            }
        }
        //****************************************AllTotal***********************************************
        var html_Balance = " \n                    <div class=\"col-xs-6 col-lg-6 col-sm-6 \">\n                            <label id=\"BalanceLab\"> ( 0 )</label>\n                    </div>";
        $('#Div_Show_Balance').append(html_Balance);
        $('#BalanceLab').html('All Bal ( ' + (Number(AllTotal.toFixed(2))) + ' ) $');
    }
    //*************************************************Def****************************************
    function GetDefinitions() {
        debugger;
        Ajax.CallAsync({
            url: Url.Action("Get_Data", "Profile"),
            data: { Name_txt: Comp_Definitions },
            success: function (Pro) {
                debugger;
                if (Pro != "Error") {
                    var result = JSON.parse(Pro);
                    debugger;
                    Wallet_Def = result;
                    Wallet_Def = Wallet_Def.sort(dynamicSortNew("ID"));
                    DetMaxLast = Wallet_Def[0].ID + 1;
                    Wallet_Def = Wallet_Def.sort(dynamicSort("Serial"));
                    DisplayDetails();
                    fillddTypeSours();
                }
            }
        });
    }
    function BuildControls(cnt) {
        var html = "";
        html = "<tr id= \"No_Row" + cnt + "\" class=\"\"> \n                    <td>\n\t\t                <div class=\"form-group\">\n\t\t\t               <button id=\"btn_minus" + cnt + "\" type=\"button\" class=\"_Cont display_none btn btn-custon-four btn-danger\" style=\"font-weight: bold;font-size: 22PX;width: 34px;padding: unset;\"><i class=\"fa fa-minus-circle\" ></i></button>\n\t\t                </div>\n\t                </td> \n                    <td>\n\t\t                <div class=\"form-group\">\n                            <input id=\"txtSerial" + cnt + "\" type=\"text\" disabled class=\" _dis form-control\" name=\"\"  />\n\t\t                </div>\n\t                </td>\n                    <td>\n\t\t                <div class=\"form-group\">\n                            <input id=\"txtNameBal" + cnt + "\" type=\"text\" disabled class=\"wid _copy _dis form-control condisa\" name=\"\"   />\n\t\t                </div>\n\t                </td>\n                    <td>\n\t\t                <div class=\"form-group\">\n                            <input id=\"txtAmount" + cnt + "\" type=\"number\" disabled class=\"  _copy _dis form-control condisa\" name=\"\"   />\n\t\t                </div>\n\t                </td>\n                    <td>\n\t\t                <div class=\"form-group\"> \n                            <textarea id=\"txtRemars" + cnt + "\" type=\"text\"  disabled class=\"wid _copy _dis form-control \" style=\"height: 43px;\" ></textarea>\n\t\t                </div>\n\t                </td>\n                    <td>\n\t\t                <div class=\"form-group\">\n                            <input id=\"CH_Sum_Receipt" + cnt + "\" type=\"checkbox\" disabled class=\" _dis form-control\" name=\"\"  />\n\t\t                </div>\n\t                </td>\n                    <td>\n\t\t                <div class=\"form-group\">\n                            <input id=\"CH_Sum_Exchange" + cnt + "\" type=\"checkbox\" disabled class=\" _dis form-control\" name=\"\"  />\n\t\t                </div>\n\t                </td> \n                    <td>\n\t\t                <div class=\"form-group\">\n                            <input id=\"CH_Sum_AllTotal" + cnt + "\" type=\"checkbox\" disabled class=\" _dis form-control\" name=\"\"  />\n\t\t                </div>\n\t                </td>\n                     <td>\n\t\t                <div class=\"form-group\">\n                            <input id=\"CH_Active" + cnt + "\" type=\"checkbox\" disabled class=\" _dis form-control\" name=\"\"  />\n\t\t                </div>\n\t                </td>\n                    \n                    \n                    \n               <input id=\"txt_StatusFlag" + cnt + "\" type=\"hidden\"   />\n               <input id=\"ID" + cnt + "\" type=\"hidden\"   />\n               <input id=\"MasterID" + cnt + "\" type=\"hidden\"   />\n                </tr>";
        $("#div_Data_Def").append(html);
        $("#btn_minus" + cnt).on('click', function () {
            DeleteRow(cnt);
        });
    }
    function DisplayDetailsControls(cnt, DataDet) {
        $("#ID" + cnt).val(DataDet.ID);
        $("#txtSerial" + cnt).val(DataDet.Serial);
        $("#txtNameBal" + cnt).val(DataDet.NameBal);
        $("#txtRemars" + cnt).val(DataDet.Remars);
        $("#txtAmount" + cnt).val(DataDet.Amount);
        $("#CH_Sum_Receipt" + cnt).prop('checked', DataDet.CUSTOM1 == "false" ? false : true);
        $("#CH_Sum_Exchange" + cnt).prop('checked', DataDet.CUSTOM2 == "false" ? false : true);
        $("#CH_Sum_AllTotal" + cnt).prop('checked', DataDet.CUSTOM3 == "false" ? false : true);
        $("#CH_Active" + cnt).prop('checked', DataDet.CUSTOM4 == "false" ? false : true);
        $("#txt_StatusFlag" + cnt).val('');
    }
    function DisplayDetails() {
        CountGrid = 0;
        $("#div_Data_Def").html('');
        for (var i = 0; i < Wallet_Def.length; i++) {
            debugger;
            BuildControls(i);
            DisplayDetailsControls(i, Wallet_Def[i]);
            CountGrid++;
        }
        disabled();
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
        Insert_Serial();
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
    function btnSave_onClick() {
        setTimeout(function () {
            //if (!Validation()) {
            //    return;
            //}
            Assign();
            Update('u');
        }, 100);
    }
    function btnBack_onclick() {
        DisplayDetails();
    }
    function btnUpdate_onclick() {
        Enabled();
    }
    function Assign() {
        debugger;
        ModelDetails = new Array();
        for (var i = 0; i < CountGrid; i++) {
            var SingModelDetails = new Wallet_Definitions();
            if ($("#txt_StatusFlag" + i).val() == '' || $("#txt_StatusFlag" + i).val() == 'i' || $("#txt_StatusFlag" + i).val() == 'u') {
                SingModelDetails.ID = Number($("#ID" + i).val());
                SingModelDetails.Serial = Number($("#txtSerial" + i).val());
                SingModelDetails.NameBal = $("#txtNameBal" + i).val().trim();
                SingModelDetails.Amount = Number($("#txtAmount" + i).val());
                SingModelDetails.Remars = $("#txtRemars" + i).val();
                SingModelDetails.CUSTOM1 = "" + ($("#CH_Sum_Receipt" + i).prop('checked')) + "";
                SingModelDetails.CUSTOM2 = "" + ($("#CH_Sum_Exchange" + i).prop('checked')) + "";
                SingModelDetails.CUSTOM3 = "" + ($("#CH_Sum_AllTotal" + i).prop('checked')) + "";
                SingModelDetails.CUSTOM4 = "" + ($("#CH_Active" + i).prop('checked')) + "";
                ModelDetails.push(SingModelDetails);
            }
        }
    }
    function Update(StatusFlag) {
        var Data = new Send_Data();
        Data.Name_Txt_Detail = Comp_Definitions;
        console.log(ModelDetails);
        Data.ModelDetails = JSON.stringify(ModelDetails);
        Data.TypeDataSouce = "Wallet_Definitions";
        Data.StatusFlag = StatusFlag;
        debugger;
        $.ajax({
            url: Url.Action("Update_Data_Wallet_Def", "Profile"),
            type: "POST",
            dataType: 'json',
            async: false,
            data: { Data: JSON.stringify(Data) },
            success: function (d) {
                var result = JSON.parse(d);
                Wallet_Def = result;
                Wallet_Def = Wallet_Def.sort(dynamicSortNew("ID"));
                DetMaxLast = Wallet_Def[0].ID + 1;
                Wallet_Def = Wallet_Def.sort(dynamicSort("Serial"));
                DisplayDetails();
                Clean();
                fillddTypeSours();
            }
        });
    }
    function Enabled() {
        $('._dis').removeAttr('disabled');
        $('._Cont').removeClass('display_none');
        $('#btnBack').removeClass('display_none');
        $('#btnSave').removeClass('display_none');
        $('#btnUpdate').addClass('display_none');
    }
    function disabled() {
        $('._dis').attr('disabled', 'disabled');
        $('._Cont').addClass('display_none');
        $('#btnBack').addClass('display_none');
        $('#btnSave').addClass('display_none');
        $('#btnUpdate').removeClass('display_none');
    }
});
//# sourceMappingURL=Money_Wallet.js.map
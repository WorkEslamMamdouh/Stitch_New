
$(document).ready(() => {

    var Wal_HedDef: Wallet_HedDef = new Wallet_HedDef();
    var Wallet_Def: Array<Wallet_Definitions> = new Array<Wallet_Definitions>();
    var ModelDetails: Array<Wallet_Definitions> = new Array<Wallet_Definitions>();
    var AllDisplay: Array<Wallet_Data> = new Array<Wallet_Data>();
    var Display: Array<Wallet_Data> = new Array<Wallet_Data>();
    var Model: Wallet_Data = new Wallet_Data();
    var Model_Wal_HedDef: Wallet_HedDef = new Wallet_HedDef();
    var JGrid: JsGrid = new JsGrid();

    var btnExchange: HTMLButtonElement;
    var btnReceipt: HTMLButtonElement;
    var btnTransfers: HTMLButtonElement;
    var a_Expans: HTMLButtonElement;
    var a_Resive: HTMLButtonElement;
    var a_Transfers: HTMLButtonElement;
    var a_View: HTMLButtonElement;
    var a_Definitions: HTMLButtonElement;
    var a_Shahadat: HTMLButtonElement;
    var txtAmount: HTMLInputElement;
    var txtSearch: HTMLInputElement;
    var txtDateFrom: HTMLInputElement;
    var txtDateTo: HTMLInputElement;

    var btnShow: HTMLButtonElement;
    var btnSave: HTMLButtonElement;
    var btnUpdate: HTMLButtonElement;
    var btnBack: HTMLButtonElement;
    var btnAddDetails: HTMLButtonElement;

    var Glopl_Type = 'Exchange';

    var flagSave = 0;
    var totalAmount = 0;
    var CountGrid = 0;
    var DetMaxLast = 0;
    var Comp_Wallet = "";
    var Comp_Definitions = "";
    var Comp_HedDef = "";

    WalletInitalizeComponent();

    var FlagUpdate = false

    function WalletInitalizeComponent() {

        debugger



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






        let ID = sessionStorage.getItem("AddUserID");

        Comp_Wallet = "Wallet/Wallet_0" + ID;
        Comp_Definitions = "Wallet/Def_Wallet_0" + ID;
        Comp_HedDef = "Wallet/Def_Wallet_Hed_0" + ID;








        $('#layout_Back').addClass('display_none')
        $('#layout_Refresh').addClass('display_none')

        $('#Pass').addClass('display_none');
        $('#Page_mone').removeClass('display_none');

        Tabs_click();
        InitializeGrid();

        txtDateFrom = document.getElementById("txtDateFrom") as HTMLInputElement;
        txtDateTo = document.getElementById("txtDateTo") as HTMLInputElement;
        txtSearch = document.getElementById("txtSearch") as HTMLInputElement;
        txtAmount = document.getElementById("txtAmount") as HTMLInputElement;
        btnShow = document.getElementById("btnShow") as HTMLButtonElement;
        btnAddDetails = document.getElementById("btnAddDetails") as HTMLButtonElement;
        btnSave = document.getElementById("btnSave") as HTMLButtonElement;
        btnUpdate = document.getElementById("btnUpdate") as HTMLButtonElement;
        btnBack = document.getElementById("btnBack") as HTMLButtonElement;
        btnExchange = document.getElementById("btnExchange") as HTMLButtonElement;
        btnReceipt = document.getElementById("btnReceipt") as HTMLButtonElement;
        btnTransfers = document.getElementById("btnTransfers") as HTMLButtonElement;
        a_Expans = document.getElementById("a_Expans") as HTMLButtonElement;
        a_Resive = document.getElementById("a_Resive") as HTMLButtonElement;
        a_Transfers = document.getElementById("a_Transfers") as HTMLButtonElement;
        a_View = document.getElementById("a_View") as HTMLButtonElement;
        a_Definitions = document.getElementById("a_Definitions") as HTMLButtonElement;
        a_Shahadat = document.getElementById("a_Shahadat") as HTMLButtonElement;

        btnExchange.onclick = () => { AppTans(Glopl_Type) };
        btnReceipt.onclick = () => { AppTans(Glopl_Type) };
        btnTransfers.onclick = () => { AppTans(Glopl_Type) };
        a_Expans.onclick = () => { $('.Hid_Rec').removeClass('display_none'); $('.Hid_Ex').addClass('display_none'); $('#Rec_Exch_Tab').removeClass('display_none'); $('#Views_Tab').addClass('display_none'); $('#Definitions_Tab').addClass('display_none'); Glopl_Type = 'Exchange'; };
        a_Resive.onclick = () => { $('.Hid_Ex').removeClass('display_none'); $('.Hid_Rec').addClass('display_none'); $('#Rec_Exch_Tab').removeClass('display_none'); $('#Views_Tab').addClass('display_none'); $('#Definitions_Tab').addClass('display_none'); Glopl_Type = 'Receipt'; };
        a_Transfers.onclick = () => { $('.Hid_Rec').removeClass('display_none'); $('.Hid_Ex').removeClass('display_none'); $('#Rec_Exch_Tab').removeClass('display_none'); $('#Views_Tab').addClass('display_none'); $('#Definitions_Tab').addClass('display_none'); Glopl_Type = 'Transfers'; };
        a_View.onclick = () => { $('#Views_Tab').removeClass('display_none'); $('#Rec_Exch_Tab').addClass('display_none'); $('#Definitions_Tab').addClass('display_none'); $('#Shahadat_Tab').addClass('display_none'); };
        a_Definitions.onclick = () => { $('#Definitions_Tab').removeClass('display_none'); $('#Rec_Exch_Tab').addClass('display_none'); $('#Views_Tab').addClass('display_none'); $('#Shahadat_Tab').addClass('display_none'); };
        a_Shahadat.onclick = () => { $('#Shahadat_Tab').removeClass('display_none'); $('#Rec_Exch_Tab').addClass('display_none'); $('#Views_Tab').addClass('display_none'); $('#Definitions_Tab').addClass('display_none'); };

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
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        }




    }


    function Tabs_click() {


        $('body').on('click', '.scrollable-tabs li', function () {
            debugger
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
        JGrid.OnItemEditing = () => { };
        JGrid.Columns = [
            { title: "ID", name: "ID", type: "text", width: " ", visible: false },
            { title: "TrNo", name: "ID", type: "number" },
            { title: "TrDate", name: "TrDate", type: "text" },
            { title: "Type", name: "Type", type: "text" },
            { title: "Title", name: "Title", type: "text" },
            { title: "Remars", name: "Remars", type: "text", width: "300px" },
            {
                title: "Amount", css: "ColumPadding", name: "Amount", width: "120px",
                itemTemplate: (s: string, item: Wallet_Data): HTMLLabelElement => {
                    let txt: HTMLLabelElement = document.createElement("label");

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
                itemTemplate: (s: string, item: Wallet_Data): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("Delete");
                    txt.id = "butDelete" + item.ID;
                    if (item.ID == -1) {
                        txt.className = " display_none btn btn-custon-four btn-danger ";

                    }
                    else {
                        txt.className = "btn btn-custon-four btn-danger ";

                    }

                    txt.onclick = (e) => {
                        Delete(item.ID);
                    };
                    return txt;
                }
            },





        ];
        //JGrid.Bind();
    }
    function fillddTypeSours() {

        $('#TypeSoursF').html('<option value="All">All</option>')
        $('#TypeSours').html("")
        $('#TypeSoursTrans').html("")
        for (var u = 0; u < Wallet_Def.length; u++) {
            $('#TypeSoursF').append('<option value="' + Wallet_Def[u].NameBal + '">' + Wallet_Def[u].NameBal + '</option>');

            let Nameclass = '';

            $('.Hid_Rec').removeClass('display_none')
            $('.Hid_Ex').removeClass('display_none')

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

        debugger
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

            let search: string = txtSearch.value.toLowerCase();
            let SearchDetails = Display.filter(x => x.ID.toString().search(search) >= 0 || x.Amount.toString().search(search) >= 0 || x.Title.toLowerCase().search(search) >= 0
                || x.Type.toLowerCase().search(search) >= 0 || x.Remars.toLowerCase().search(search) >= 0);

            JGrid.DataSource = SearchDetails;
            JGrid.Bind();
        } else {
            JGrid.DataSource = Display;
            JGrid.Bind();
        }

    }
    function DisplayAll() {

        Ajax.CallAsync({
            url: Url.Action("Get_Data", "Profile"),
            data: { Name_txt: Comp_Wallet },
            success: (Pro) => {
                if (Pro != "Error") {
                    let result = JSON.parse(Pro)

                    let res = result as Array<Wallet_Data>;

                    Display_Grid(res)
                }
                else {
                    let res: Array<Wallet_Data>;

                    JGrid.DataSource = res;
                    JGrid.Bind();

                    Clean();
                }

            }
        })


    }

    function Display_Grid(_Display: Array<Wallet_Data>) {
        debugger
        totalAmount = 0;
        AllDisplay = _Display;
        AllDisplay = AllDisplay.sort(dynamicSortNew("ID"));

        Display = _Display;

        debugger
        for (var d = 0; d < Wallet_Def.length; d++) {
            debugger
            if (Wallet_Def[d].Amount > 0) {

                let DisOpen_ball: Wallet_Data = new Wallet_Data();
                DisOpen_ball.ID = -1;
                DisOpen_ball.Amount = Wallet_Def[d].Amount
                DisOpen_ball.Type = Wallet_Def[d].NameBal
                DisOpen_ball.Title = "Receipt"
                DisOpen_ball.Remars = "Open Balance " + Wallet_Def[d].NameBal;
                DisOpen_ball.TrDate = "2023-01-01";
                Display.push(DisOpen_ball)
            }

        }
        debugger

        if ($('#TypeSoursF').val() != "All") {
            Display = Display.filter(x => x.Type == $('#TypeSoursF').val());
        }
        if ($('#TrType').val() != "All") {
            Display = Display.filter(x => x.Title == $('#TrType').val());
        }
        Display = Display.filter(x => x.TrDate >= txtDateFrom.value && x.TrDate <= txtDateTo.value);

        Display = Display.sort(dynamicSortNew("ID"));

        $("#JGrid").jsGrid("option", "pageIndex", 1);
        JGrid.DataSource = Display;
        JGrid.Bind();

        Clean();

        let DisplayEx = Display.filter(x => x.Type != 'Debt' && x.Title == 'Exchange');
        let DisplayRec = Display.filter(x => x.Type != 'Debt' && x.Title == 'Receipt');

        let AmountEx = 0
        for (var i = 0; i < DisplayEx.length; i++) {
            AmountEx = AmountEx + DisplayEx[i].Amount;
        }

        let AmountRec = 0
        for (var i = 0; i < DisplayRec.length; i++) {
            AmountRec = AmountRec + DisplayRec[i].Amount;
        }

        $('#txtTotalExchange').val(AmountEx.toFixed(2));
        $('#txtTotalReceipt').val(AmountRec.toFixed(2));
        $('#txtTotal').val((AmountRec - AmountEx).toFixed(2));

        $('.jsgrid-grid-body').scrollLeft(500);
    }

    function AppTans(Type: string) {

        debugger

        if (flagSave == 1) {
            setTimeout(function () { flagSave = 0; }, 800);

            return false
        }

        if ($('#txtRemark').val().trim() == '') {
            Errorinput($('#txtRemark'))
            return false
        }


        if ($('#TypeSours').val() == $('#TypeSoursTrans').val() && Type == 'Transfers') {
            Errorinput($('#TypeSoursTrans'))
            return false
        }

        if ($('#txtAmount').val().trim() == '') {
            Errorinput($('#txtAmount'))
            return false
        }



        Model = new Wallet_Data();

        let Val = txtAmount.value;

        txtAmount.value = eval(Val);

        DocumentActions.AssignToModel(Model);//Insert Update 
        Model.TrDate = DateFormatRep($('#txtdate').val())
        Model.Type = $('#TypeSours').val();
        Model.TypeTo = $('#TypeSoursTrans').val();
        Model.Title = Type;
        Model.Amount = eval(Val);
        Model.ID = Number($('#txtTrNo').val());
        //Model.ID = 666;

        let Data = new Send_Data();

        Data.ID = Number($('#txtTrNo').val());
        Data.Name_Txt_Master = Comp_Wallet;
        Data.Model = JSON.stringify(Model);
        Data.StatusFlag = 'u';

        debugger
        $.ajax({
            url: Url.Action("Add_Trans", "Profile"),
            type: "POST",
            dataType: 'json',
            async: false,
            data: { Data: JSON.stringify(Data) },
            success: (d) => {
                let result = JSON.parse(d)

                let res = result as Array<Wallet_Data>;
                Display_Grid(res)
                Clean();

                flagSave = 1;



            }
        })
    }

    function Delete(ID: number) {

        JGrid.SelectedItem = Display.filter(x => x.ID == ID)[0];



        Model = new Wallet_Data();


        Model.ID = ID;

        let Data = new Send_Data();

        Data.ID = ID;
        Data.Name_Txt_Master = Comp_Wallet;
        Data.Model = JSON.stringify(Model);
        Data.StatusFlag = 'd';

        debugger
        $.ajax({
            url: Url.Action("Add_Trans", "Profile"),
            type: "POST",
            dataType: 'json',
            async: false,
            data: { Data: JSON.stringify(Data) },
            success: (d) => {
                let result = JSON.parse(d)

                let res = result as Array<Wallet_Data>;
                Display_Grid(res)
                Clean();

            }
        })


    }


    function Clean() {

        if (!FlagUpdate) {
            $('#TypeSours').prop('selectedIndex', 0)
            $('#TypeSoursTrans').prop('selectedIndex', 0)
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
            let MaxID = 0;
            if (AllDisplay.length > 0) {
                MaxID = AllDisplay[0].ID;
            }
            $('#txtTrNo').val(MaxID + 1);
            $('#txtTrNo').attr('style', 'text-align: center;background: #004895;color: white;')
        }
        else {
            $('#txtTrNo').attr('style', 'text-align: center;background: #009563;color: white;')
        }

        //AllBalance(); 
        Sum_AllBalance();
    }

    //*************************************************Display_AllBalance****************************************

    function AllBalance() {

        debugger

        //******************************************* Exchange********************************
        let DebtAmountEx = 0; //مديونيه
        let CashAmountEx = 0;
        let Cairo_BankAmountEx = 0
        let Al_ahly_BankAmountEx = 0;
        let Bal_HomeAmountEx = 0;
        let AAIBAmountEx = 0;
        debugger
        let CashEx = AllDisplay.filter(x => x.Type == 'Cash' && (x.Title == 'Exchange' || x.Title == 'Transfers'));
        let Cairo_BankEx = AllDisplay.filter(x => x.Type == 'Cairo Bank' && (x.Title == 'Exchange' || x.Title == 'Transfers'));
        let Al_ahly_BankEx = AllDisplay.filter(x => x.Type == 'Al ahly Bank' && (x.Title == 'Exchange' || x.Title == 'Transfers'));
        let DebtEx = AllDisplay.filter(x => x.Type == 'Debt' && x.Title == 'Exchange');
        let Bal_HomeEx = AllDisplay.filter(x => x.Type == 'Bal Home' && (x.Title == 'Exchange' || x.Title == 'Transfers'));
        debugger
        let AAIBEx = AllDisplay.filter(x => x.Type == 'AAIB' && (x.Title == 'Exchange' || x.Title == 'Transfers'));


        for (var i = 0; i < DebtEx.length; i++) {
            DebtAmountEx = DebtAmountEx + DebtEx[i].Amount
        }

        for (var i = 0; i < CashEx.length; i++) {
            CashAmountEx = CashAmountEx + CashEx[i].Amount
        }

        for (var i = 0; i < Cairo_BankEx.length; i++) {
            Cairo_BankAmountEx = Cairo_BankAmountEx + Cairo_BankEx[i].Amount
        }

        for (var i = 0; i < Al_ahly_BankEx.length; i++) {
            Al_ahly_BankAmountEx = Al_ahly_BankAmountEx + Al_ahly_BankEx[i].Amount
        }


        for (var i = 0; i < Bal_HomeEx.length; i++) {
            Bal_HomeAmountEx = Bal_HomeAmountEx + Bal_HomeEx[i].Amount
        }

        for (var i = 0; i < AAIBEx.length; i++) {
            AAIBAmountEx = AAIBAmountEx + AAIBEx[i].Amount
        }


        //**************************************************** Receipt**************************************
        let DebtAmountRec = 0; //مديونيه
        let CashAmountRec = 0; //كاش
        let Cairo_BankAmountRec = 0 //بنك القاهره
        let Al_ahly_BankAmountRec = 0; //بنك الاهلي
        let Bal_HomeAmountRec = 0; // رصيد البيت
        let AAIBAmountRec = 0; //بنك العربي الافريقي

        debugger
        let CashRec = AllDisplay.filter(x => x.Type == 'Cash' && x.Title == 'Receipt' || (x.TypeTo == 'Cash' && x.Title == 'Transfers'));
        let Cairo_BankRec = AllDisplay.filter(x => x.Type == 'Cairo Bank' && x.Title == 'Receipt' || (x.TypeTo == 'Cairo Bank' && x.Title == 'Transfers'));
        let Al_ahly_BankRec = AllDisplay.filter(x => x.Type == 'Al ahly Bank' && x.Title == 'Receipt' || (x.TypeTo == 'Al ahly Bank' && x.Title == 'Transfers'));
        let DebtRec = AllDisplay.filter(x => x.Type == 'Debt' && x.Title == 'Receipt');
        let Bal_HomeRec = AllDisplay.filter(x => x.Type == 'Bal Home' && x.Title == 'Receipt' || (x.TypeTo == 'Bal Home' && x.Title == 'Transfers'));
        debugger
        let AAIBRec = AllDisplay.filter(x => x.Type == 'AAIB' && x.Title == 'Receipt' || (x.TypeTo == 'AAIB' && x.Title == 'Transfers'));

        for (var i = 0; i < DebtRec.length; i++) {
            DebtAmountRec = DebtAmountRec + DebtRec[i].Amount
        }

        for (var i = 0; i < CashRec.length; i++) {
            CashAmountRec = CashAmountRec + CashRec[i].Amount
        }

        for (var i = 0; i < Cairo_BankRec.length; i++) {
            Cairo_BankAmountRec = Cairo_BankAmountRec + Cairo_BankRec[i].Amount
        }

        for (var i = 0; i < Al_ahly_BankRec.length; i++) {
            Al_ahly_BankAmountRec = Al_ahly_BankAmountRec + Al_ahly_BankRec[i].Amount
        }

        for (var i = 0; i < Bal_HomeRec.length; i++) {
            Bal_HomeAmountRec = Bal_HomeAmountRec + Bal_HomeRec[i].Amount
        }

        for (var i = 0; i < AAIBRec.length; i++) {
            AAIBAmountRec = AAIBAmountRec + AAIBRec[i].Amount
        }

        //****************************************Total***********************************************
        debugger
        $('#InDebtLab').html('InDebt ( ' + (Number(DebtAmountRec)) + ' ) $');

        $('#OutDebtLab').html('OutDebt ( ' + (Number(DebtAmountEx)) + ' ) $');

        $('#CashLab').html('Cash ( ' + (Number(CashAmountRec) - Number(CashAmountEx)) + ' ) $');

        $('#Bal_HomeLab').html('Home ( ' + (Number(Bal_HomeAmountRec) - Number(Bal_HomeAmountEx)) + ' ) $');

        $('#CairoLab').html('Cairo ( ' + (Number(Cairo_BankAmountRec) - Number(Cairo_BankAmountEx)) + ' ) $');

        $('#Al_ahlyLab').html('Al_ahly ( ' + (Number(Al_ahly_BankAmountRec) - Number(Al_ahly_BankAmountEx)) + ' ) $');

        $('#AAIBLab').html('AAIB ( ' + (Number(AAIBAmountRec) - Number(AAIBAmountEx)) + ' ) $');

        //****************************************AllTotal***********************************************
        let AllTotal_Rec = CashAmountRec + Cairo_BankAmountRec + Al_ahly_BankAmountRec;
        let AllTotal_Exch = CashAmountEx + Cairo_BankAmountEx + Al_ahly_BankAmountEx;

        $('#BalanceLab').html('All Bal ( ' + (Number(AllTotal_Rec) - Number(AllTotal_Exch)) + ' ) $');


    }

    function Sum_AllBalance() {

        $('#Div_Show_Balance').html('')
        debugger
        let AllTotal = 0;
        let Wallet_Def_IsActive = Wallet_Def.filter(x => x.CUSTOM4 == "true");
        for (var xx = 0; xx < Wallet_Def_IsActive.length; xx++) {
            debugger

            //**********************************************Build**********************************
            let idBal = Wallet_Def_IsActive[xx].NameBal
            idBal = idBal.replace(/ /g, "_");
            let html_Balance = ` 
                    <div class="col-xs-6 col-lg-6 col-sm-6 ">
                            <label id="${idBal}"> ( 0 )</label>
                    </div>`;

            $('#Div_Show_Balance').append(html_Balance)

            //******************************************* Sum Exchange********************************
            let EXAmount = 0;
            let Exchange = AllDisplay.filter(x => x.Type == '' + Wallet_Def_IsActive[xx].NameBal + '' && (x.Title == 'Exchange' || x.Title == 'Transfers'));

            if (Wallet_Def_IsActive[xx].CUSTOM2 == "true") {
                for (var i1 = 0; i1 < Exchange.length; i1++) {
                    EXAmount = EXAmount + Exchange[i1].Amount
                }
            }


            //**************************************************** Receipt**************************************

            let RecAmount = 0;
            let Receipt = AllDisplay.filter(x => x.Type == '' + Wallet_Def_IsActive[xx].NameBal + '' && x.Title == 'Receipt' || (x.TypeTo == '' + Wallet_Def_IsActive[xx].NameBal + '' && x.Title == 'Transfers'));

            if (Wallet_Def_IsActive[xx].CUSTOM1 == "true") {
                for (var i2 = 0; i2 < Receipt.length; i2++) {
                    RecAmount = RecAmount + Receipt[i2].Amount
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
        let html_Balance = ` 
                    <div class="col-xs-6 col-lg-6 col-sm-6 ">
                            <label id="BalanceLab"> ( 0 )</label>
                    </div>`;

        $('#Div_Show_Balance').append(html_Balance)
        $('#BalanceLab').html('All Bal ( ' + (Number(AllTotal.toFixed(2))) + ' ) $');
    }

    //*************************************************Def****************************************



    function GetDefinitions() {
        debugger
        Ajax.CallAsync({
            url: Url.Action("Get_Two_Data", "Profile"),
            data: { Name_txt1: Comp_HedDef, Name_txt2: Comp_Definitions },
            success: (Pro) => {
                debugger
                if (Pro != "Error") {
                    let result = JSON.parse(Pro)
                    debugger
                    let _Def = result as All_Definitions;

                    if (_Def.Wallet_HedDef != "Error") {

                        let Data_hed = JSON.parse(_Def.Wallet_HedDef)
                        Wal_HedDef = Data_hed as Wallet_HedDef;

                        DisplayHedDef(Wal_HedDef)
                    }

                    if (_Def.Wallet_Definitions != "Error") {
                        let Detal = JSON.parse(_Def.Wallet_Definitions)

                        Wallet_Def = Detal as Array<Wallet_Definitions>;
                        Wallet_Def = Wallet_Def.sort(dynamicSortNew("ID"));

                        DetMaxLast = Wallet_Def[0].ID + 1;

                        Wallet_Def = Wallet_Def.sort(dynamicSort("Serial"));

                        DisplayDetails();

                        fillddTypeSours();

                    }
                    disabled();
                        Set_Roll_HedDef();
                }

            }
        })


    }

    function Set_Roll_HedDef() {

        debugger

        $('.Hed').addClass('display_none')
        if (Wal_HedDef.CUSTOM1 == "true") {
            $('#a_Resive').removeClass('display_none')
        }
        if (Wal_HedDef.CUSTOM2 == "true") {
            $('#a_Expans').removeClass('display_none')
        }
        if (Wal_HedDef.CUSTOM3 == "true") {
            $('#a_Transfers').removeClass('display_none')
        }
        if (Wal_HedDef.CUSTOM4 == "true") {
            $('#a_Shahadat').removeClass('display_none')
        }
        if (Wal_HedDef.CUSTOM5 == "true") {
            $('#a_View').removeClass('display_none')
        }

        DisplayOneTap();
    }


    function DisplayOneTap() {

        debugger
        if ($('#a_Expans').is(':visible')) {
            $('#a_Expans').click();
            return
        }
        else if ($('#a_Resive').is(':visible')) {
            $('#a_Resive').click();
            return
        }
        else if ($('#a_Transfers').is(':visible')) {
            $('#a_Transfers').click();
            return
        }
        else if ($('#a_Shahadat').is(':visible')) {
            $('#a_Shahadat').click();
            return
        }
        else if ($('#a_View').is(':visible')) {
            $('#a_View').click();
            return
        }
        else {
            $('#a_Definitions').click();
        }
    }


    function DisplayHedDef(Data: Wallet_HedDef) {


        $("#CH_Hed_Receipt").prop('checked', Data.CUSTOM1 == "false" ? false : true);
        $("#CH_Hed_Exchange").prop('checked', Data.CUSTOM2 == "false" ? false : true);
        $("#CH_Hed_Transfers").prop('checked', Data.CUSTOM3 == "false" ? false : true);
        $("#CH_Hed_Shahadat").prop('checked', Data.CUSTOM4 == "false" ? false : true);
        $("#CH_Hed_Report").prop('checked', Data.CUSTOM5 == "false" ? false : true);


    }

    function BuildControls(cnt: number) {

        var html = "";
        html = `<tr id= "No_Row${cnt}" class=""> 
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
                            <input id="txtNameBal${cnt}" type="text" disabled class="wid _copy _dis form-control condisa" name=""   />
		                </div>
	                </td>
                    <td>
		                <div class="form-group">
                            <input id="txtAmount${cnt}" type="number" disabled class="  _copy _dis form-control condisa" name=""   />
		                </div>
	                </td>
                    <td>
		                <div class="form-group"> 
                            <textarea id="txtRemars${cnt}" type="text"  disabled class="wid _copy _dis form-control " style="height: 43px;" ></textarea>
		                </div>
	                </td>
                    <td>
		                <div class="form-group">
                            <input id="CH_Sum_Receipt${cnt}" type="checkbox" disabled class=" _dis form-control" name=""  />
		                </div>
	                </td>
                    <td>
		                <div class="form-group">
                            <input id="CH_Sum_Exchange${cnt}" type="checkbox" disabled class=" _dis form-control" name=""  />
		                </div>
	                </td> 
                    <td>
		                <div class="form-group">
                            <input id="CH_Sum_AllTotal${cnt}" type="checkbox" disabled class=" _dis form-control" name=""  />
		                </div>
	                </td>
                     <td>
		                <div class="form-group">
                            <input id="CH_Active${cnt}" type="checkbox" disabled class=" _dis form-control" name=""  />
		                </div>
	                </td>
                    
                    
                    
               <input id="txt_StatusFlag${cnt}" type="hidden"   />
               <input id="ID${cnt}" type="hidden"   />
               <input id="MasterID${cnt}" type="hidden"   />
                </tr>`;
        $("#div_Data_Def").append(html);


        $("#btn_minus" + cnt).on('click', function () {
            DeleteRow(cnt);
        });



    }
    function DisplayDetailsControls(cnt: number, DataDet: Wallet_Definitions) {

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
            debugger
            BuildControls(i);
            DisplayDetailsControls(i, Wallet_Def[i])
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

        Insert_Serial();

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

        DisplayHedDef(Wal_HedDef)
        DisplayDetails();
    }
    function btnUpdate_onclick() {

        Enabled();

    }


    function Assign() {
        debugger

        ModelDetails = new Array<Wallet_Definitions>();
        Model_Wal_HedDef = new Wallet_HedDef();

        Model_Wal_HedDef.CUSTOM1 = "" + ($("#CH_Hed_Receipt").prop('checked')) + "";
        Model_Wal_HedDef.CUSTOM2 = "" + ($("#CH_Hed_Exchange").prop('checked')) + "";
        Model_Wal_HedDef.CUSTOM3 = "" + ($("#CH_Hed_Transfers").prop('checked')) + "";
        Model_Wal_HedDef.CUSTOM4 = "" + ($("#CH_Hed_Shahadat").prop('checked')) + "";
        Model_Wal_HedDef.CUSTOM5 = "" + ($("#CH_Hed_Report").prop('checked')) + "";

        for (var i = 0; i < CountGrid; i++) {
            let SingModelDetails = new Wallet_Definitions();

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

    function Update(StatusFlag: string) {

        let Data = new Send_Data();


        Data.Name_Txt_Master = Comp_HedDef;
        Data.Name_Txt_Detail = Comp_Definitions;
        console.log(ModelDetails);
        Data.Model = JSON.stringify(Model_Wal_HedDef);
        Data.ModelDetails = JSON.stringify(ModelDetails);
        Data.TypeDataSouce = "Wallet_Definitions";
        Data.StatusFlag = StatusFlag;

        debugger
        $.ajax({
            url: Url.Action("Update_Data_Wallet_Def", "Profile"),
            type: "POST",
            dataType: 'json',
            async: false,
            data: { Data: JSON.stringify(Data) },
            success: (d) => {
                let result = JSON.parse(d)

                Wallet_Def = result as Array<Wallet_Definitions>;

                Wallet_Def = Wallet_Def.sort(dynamicSortNew("ID"));

                DetMaxLast = Wallet_Def[0].ID + 1;

                Wallet_Def = Wallet_Def.sort(dynamicSort("Serial"));

                Wal_HedDef = Model_Wal_HedDef;

                DisplayDetails();

                Clean();

                fillddTypeSours();

                Set_Roll_HedDef();
            }
        })
    }


    function Enabled() {
        $('._dis').removeAttr('disabled')
        $('._Cont').removeClass('display_none')
        $('#btnBack').removeClass('display_none')
        $('#btnSave').removeClass('display_none')
        $('#btnUpdate').addClass('display_none')

    }
    function disabled() {
        $('._dis').attr('disabled', 'disabled')
        $('._Cont').addClass('display_none')
        $('#btnBack').addClass('display_none')
        $('#btnSave').addClass('display_none')
        $('#btnUpdate').removeClass('display_none')

    }

})













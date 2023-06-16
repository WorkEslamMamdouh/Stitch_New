
$(document).ready(() => {

    var AllDisplay: Array<DataAll> = new Array<DataAll>();
    var Display: Array<DataAll> = new Array<DataAll>();
    var Model: DataAll = new DataAll();
    var JGrid: JsGrid = new JsGrid();

    var btnShow: HTMLButtonElement;
    var btnExchange: HTMLButtonElement;
    var btnReceipt: HTMLButtonElement;
    var a_Expans: HTMLButtonElement;
    var a_Resive: HTMLButtonElement;
    var a_View: HTMLButtonElement;
    var txtAmount: HTMLInputElement;
    var txtSearch: HTMLInputElement;
    var btnLogin: HTMLButtonElement;
    var txtDateFrom: HTMLInputElement;
    var txtDateTo: HTMLInputElement;

    var txtPassword: HTMLInputElement;
    var Glopl_Type = 'Exchange';

    var flagSave = 0;
    var totalAmount = 0;
    var DataCatch_Receipt = "";

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


        $('#Pass').removeClass('display_none');
        $('#Page_mone').addClass('display_none');

        $('#layout_Back').removeClass('display_none')
        $('#layout_Refresh').removeClass('display_none')

        btnLogin = document.getElementById("btnLogin") as HTMLButtonElement;
        txtPassword = document.getElementById("txtPassword") as HTMLInputElement;

        btnLogin.onclick = btnLogin_onclick;

        txtPassword.focus();

        Event_key('Enter', 'txtPassword', 'btnLogin');

        let pass = sessionStorage.getItem("EslamPassword");
        if (pass != null) {
            txtPassword.value = pass;
            btnLogin_onclick();
        }
        else {
            $('#Pass').removeClass('display_none');
            txtPassword.focus();
        }


    }

    function btnLogin_onclick() {
        let Done = false;
        if (txtPassword.value.trim() == "619606") {

            DataCatch_Receipt = "Wallet_01";
            Done = true

        }
        else if (txtPassword.value.trim() == "619619") {

            DataCatch_Receipt = "Wallet_02";
            Done = true

        }
        else if (txtPassword.value.trim() == "619") {

            DataCatch_Receipt = "Wallet_03";
            Done = true
        }
        else if (txtPassword.value.trim() == "123") {

            DataCatch_Receipt = "Wallet_04";
            Done = true
        }
        else if (txtPassword.value.trim() == "1") {

            DataCatch_Receipt = "Wallet_05";
            Done = true
        }
        else {
            Errorinput(txtPassword);
            Done = false
        }


        if (Done) {

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
            btnExchange = document.getElementById("btnExchange") as HTMLButtonElement;
            btnReceipt = document.getElementById("btnReceipt") as HTMLButtonElement;
            a_Expans = document.getElementById("a_Expans") as HTMLButtonElement;
            a_Resive = document.getElementById("a_Resive") as HTMLButtonElement;
            a_View = document.getElementById("a_View") as HTMLButtonElement;
             
            btnExchange.onclick = () => { AppTans(Glopl_Type) };
            btnReceipt.onclick = () => { AppTans(Glopl_Type) };
            a_Expans.onclick = () => { $('#Rec_Exch_Tab').removeClass('display_none'); $('#Views_Tab').addClass('display_none'); Glopl_Type = 'Exchange'; };
            a_Resive.onclick = () => { $('#Rec_Exch_Tab').removeClass('display_none'); $('#Views_Tab').addClass('display_none'); Glopl_Type = 'Receipt'; };
            a_View.onclick = () => { $('#Views_Tab').removeClass('display_none'); $('#Rec_Exch_Tab').addClass('display_none'); };

            txtDateFrom.value = DateStartYear();
            txtDateTo.value = GetDate();

            txtSearch.onkeyup = txtSearch_change;
            btnShow.onclick = DisplayAll;

            DisplayAll();

            sessionStorage.setItem("EslamPassword", txtPassword.value);

            $('.jsgrid-grid-body').scrollLeft(300);
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
            { title: "TrNo", name: "ID", type: "text" },
            { title: "TrDate", name: "TrDate", type: "text" },
            { title: "Type", name: "Type", type: "text" },
            { title: "Title", name: "Title", type: "text" },
            { title: "Remars", name: "Remars", type: "text", width: "300px" },
            {
                title: "Amount", css: "ColumPadding", name: "Amount", width: "120px",
                itemTemplate: (s: string, item: DataAll): HTMLLabelElement => {
                    let txt: HTMLLabelElement = document.createElement("label");

                    txt.innerHTML = "( " + item.Amount.toString()+" ) $";
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





        ];
        //JGrid.Bind();
    }

    function GridDoubleClick() {

        debugger
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
            data: { Name_txt: DataCatch_Receipt },
            success: (d) => {
                let result = JSON.parse(d)

                let res = result as Array<DataAll>;

                Display_Grid(res)


            }
        })


    }

    function Display_Grid(_Display: Array<DataAll>) {
        debugger
        totalAmount = 0;
        AllDisplay = _Display;
        AllDisplay = AllDisplay.sort(dynamicSortNew("ID"));

        Display = _Display;

        if ($('#TypeSoursF').val() != "All") {
            Display = Display.filter(x => x.Type == $('#TypeSoursF').val());
        }
        if ($('#TrType').val() != "All") {
            Display = Display.filter(x => x.Title == $('#TrType').val());
        }
        Display = Display.filter(x => x.TrDate >= txtDateFrom.value && x.TrDate <= txtDateTo.value);

        Display = Display.sort(dynamicSortNew("ID"));
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
            //alert('برجاء ادخال الملاخظات')
            return false
        }

        if ($('#txtAmount').val().trim() == '') {
            Errorinput($('#txtAmount'))
            //alert('برجاء ادخال المبلغ')
            return false
        }

        Model = new DataAll();

        let Val = txtAmount.value;

        txtAmount.value = eval(Val);

        DocumentActions.AssignToModel(Model);//Insert Update 
        Model.TrDate = DateFormatRep($('#txtdate').val())
        Model.Type = $('#TypeSours').val();
        Model.Title = Type;
        Model.Amount = eval(Val);
        Model.ID = Number($('#txtTrNo').val());
        //Model.ID = 666;

        let Data = new Send_Data();

        Data.ID = Number($('#txtTrNo').val());
        Data.Name_Txt_Master = DataCatch_Receipt;
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

                let res = result as Array<DataAll>;
                Display_Grid(res)
                Clean();

                flagSave = 1;

            }
        })
    }

    function Delete(ID: number) {

        JGrid.SelectedItem = Display.filter(x => x.ID == ID)[0];



        Model = new DataAll();


        Model.ID = ID;

        let Data = new Send_Data();

        Data.ID = ID;
        Data.Name_Txt_Master = DataCatch_Receipt;
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

                let res = result as Array<DataAll>;
                Display_Grid(res)
                Clean();

            }
        })


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

        AllBalance()
    }

    function AllBalance() {

        debugger
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
        //******************************************* Exchange********************************
        let DebtAmountEx = 0; //مديونيه
        let CashAmountEx = 0;
        let Cairo_BankAmountEx = 0
        let Al_ahly_BankAmountEx = 0;

        let CashEx = AllDisplay.filter(x => x.Type == 'Cash' && x.Title == 'Exchange');
        let Cairo_BankEx = AllDisplay.filter(x => x.Type == 'Cairo Bank' && x.Title == 'Exchange');
        let Al_ahly_BankEx = AllDisplay.filter(x => x.Type == 'Al ahly Bank' && x.Title == 'Exchange');
        let DebtEx = AllDisplay.filter(x => x.Type == 'Debt' && x.Title == 'Exchange');

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

        //**************************************************** Receipt**************************************
        let DebtAmountRec = 0; //مديونيه
        let CashAmountRec = 0; //كاش
        let Cairo_BankAmountRec = 0 //بنك القاهره
        let Al_ahly_BankAmountRec = 0; //بنك الاهلي

        let CashRec = AllDisplay.filter(x => x.Type == 'Cash' && x.Title == 'Receipt');
        let Cairo_BankRec = AllDisplay.filter(x => x.Type == 'Cairo Bank' && x.Title == 'Receipt');
        let Al_ahly_BankRec = AllDisplay.filter(x => x.Type == 'Al ahly Bank' && x.Title == 'Receipt');
        let DebtRec = AllDisplay.filter(x => x.Type == 'Debt' && x.Title == 'Receipt');

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
        //****************************************Total***********************************************
        $('#InDebtLab').html('InDebt ( ' + (Number(DebtAmountRec)) + ' ) $');

        $('#OutDebtLab').html('OutDebt ( ' + (Number(DebtAmountEx)) + ' ) $');

        $('#CashLab').html('Cash ( ' + (Number(CashAmountRec) - Number(CashAmountEx)) + ' ) $');

        $('#CairoLab').html('Cairo ( ' + (Number(Cairo_BankAmountRec) - Number(Cairo_BankAmountEx)) + ' ) $');

        $('#Al_ahlyLab').html('Al_ahly ( ' + (Number(Al_ahly_BankAmountRec) - Number(Al_ahly_BankAmountEx)) + ' ) $');

        //****************************************AllTotal***********************************************
        let AllTotal_Rec = CashAmountRec + Cairo_BankAmountRec + Al_ahly_BankAmountRec;
        let AllTotal_Exch = CashAmountEx + Cairo_BankAmountEx + Al_ahly_BankAmountEx;

        $('#BalanceLab').html('All ( ' + (Number(AllTotal_Rec) - Number(AllTotal_Exch)) + ' ) $');


    }



})













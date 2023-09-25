
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
    var btnAdjustment: HTMLButtonElement;
    var btnFreeze: HTMLButtonElement;
    var a_Expans: HTMLButtonElement;
    var a_Resive: HTMLButtonElement;
    var a_Transfers: HTMLButtonElement;
    var a_View: HTMLButtonElement;
    var a_Definitions: HTMLButtonElement;
    var a_Adjustment: HTMLButtonElement;
    var a_Shahadat: HTMLButtonElement;
    var txtAmount: HTMLInputElement;
    var txtPrcSH: HTMLInputElement;
    var txtdateDueSH: HTMLInputElement;
    var txtAmountSH: HTMLInputElement;
    var txtSearch: HTMLInputElement;
    var txtDateFrom: HTMLInputElement;
    var txtDateTo: HTMLInputElement;
    var txtAdjustmentAmountDone: HTMLInputElement;

    var btnShow: HTMLButtonElement;
    var btnSave: HTMLButtonElement;
    var btnUpdate: HTMLButtonElement;
    var btnBack: HTMLButtonElement;
    var btnAddDetails: HTMLButtonElement;
    var TypePeriod: HTMLSelectElement;
    var TypeSours: HTMLSelectElement;



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

        TypeSours = document.getElementById("TypeSours") as HTMLSelectElement;
        TypePeriod = document.getElementById("TypePeriod") as HTMLSelectElement;
        txtDateFrom = document.getElementById("txtDateFrom") as HTMLInputElement;
        txtAdjustmentAmountDone = document.getElementById("txtAdjustmentAmountDone") as HTMLInputElement;
        txtDateTo = document.getElementById("txtDateTo") as HTMLInputElement;
        txtSearch = document.getElementById("txtSearch") as HTMLInputElement;
        txtAmount = document.getElementById("txtAmount") as HTMLInputElement;
        txtdateDueSH = document.getElementById("txtdateDueSH") as HTMLInputElement;
        txtAmountSH = document.getElementById("txtAmountSH") as HTMLInputElement;
        txtPrcSH = document.getElementById("txtPrcSH") as HTMLInputElement;
        btnShow = document.getElementById("btnShow") as HTMLButtonElement;
        btnAddDetails = document.getElementById("btnAddDetails") as HTMLButtonElement;
        btnSave = document.getElementById("btnSave") as HTMLButtonElement;
        btnUpdate = document.getElementById("btnUpdate") as HTMLButtonElement;
        btnBack = document.getElementById("btnBack") as HTMLButtonElement;
        btnExchange = document.getElementById("btnExchange") as HTMLButtonElement;
        btnReceipt = document.getElementById("btnReceipt") as HTMLButtonElement;
        btnTransfers = document.getElementById("btnTransfers") as HTMLButtonElement;
        btnAdjustment = document.getElementById("btnAdjustment") as HTMLButtonElement;
        btnFreeze = document.getElementById("btnFreeze") as HTMLButtonElement;
        a_Expans = document.getElementById("a_Expans") as HTMLButtonElement;
        a_Resive = document.getElementById("a_Resive") as HTMLButtonElement;
        a_Transfers = document.getElementById("a_Transfers") as HTMLButtonElement;
        a_View = document.getElementById("a_View") as HTMLButtonElement;
        a_Definitions = document.getElementById("a_Definitions") as HTMLButtonElement;
        a_Adjustment = document.getElementById("a_Adjustment") as HTMLButtonElement;
        a_Shahadat = document.getElementById("a_Shahadat") as HTMLButtonElement;

        txtAdjustmentAmountDone.onkeyup = Settlement_difference;
        TypeSours.onchange = () => { Glopl_Type == 'Adjustment' ? SelectAdjustmentAmount() : null };
        btnExchange.onclick = () => { AppTans(Glopl_Type) };
        btnReceipt.onclick = () => { AppTans(Glopl_Type) };
        btnTransfers.onclick = () => { AppTans(Glopl_Type) };
        btnAdjustment.onclick = () => { AppTans(Glopl_Type) };
        btnFreeze.onclick = () => { AppTansShahada(Glopl_Type) };
        a_Expans.onclick = () => { $('.Shaha_Ex').removeClass('display_none'); $('.Hid_Rec').removeClass('display_none'); $('.Hid_Ex').addClass('display_none'); $('#Rec_Exch_Tab').removeClass('display_none'); $('#Views_Tab').addClass('display_none'); $('#Shahadat_Tab').addClass('display_none'); $('#Definitions_Tab').addClass('display_none'); Glopl_Type = 'Exchange'; };
        a_Resive.onclick = () => { $('.Shaha_Ex').removeClass('display_none'); $('.Hid_Ex').removeClass('display_none'); $('.Hid_Rec').addClass('display_none'); $('#Rec_Exch_Tab').removeClass('display_none'); $('#Views_Tab').addClass('display_none'); $('#Shahadat_Tab').addClass('display_none'); $('#Definitions_Tab').addClass('display_none'); Glopl_Type = 'Receipt'; };
        a_Transfers.onclick = () => { $('.Shaha_Ex').removeClass('display_none'); $('.Hid_Rec').removeClass('display_none'); $('.Hid_Ex').removeClass('display_none'); $('#Rec_Exch_Tab').removeClass('display_none'); $('#Views_Tab').addClass('display_none'); $('#Shahadat_Tab').addClass('display_none'); $('#Definitions_Tab').addClass('display_none'); Glopl_Type = 'Transfers'; };
        a_Adjustment.onclick = () => { $('.Shaha_Ex').removeClass('display_none'); $('.Hid_Rec').removeClass('display_none'); $('.Hid_Ex').removeClass('display_none'); $('#Rec_Exch_Tab').removeClass('display_none'); $('#Views_Tab').addClass('display_none'); $('#Shahadat_Tab').addClass('display_none'); $('#Definitions_Tab').addClass('display_none'); Glopl_Type = 'Adjustment'; };
        a_View.onclick = () => { $('#Views_Tab').removeClass('display_none'); $('#Rec_Exch_Tab').addClass('display_none'); $('#Definitions_Tab').addClass('display_none'); $('#Shahadat_Tab').addClass('display_none'); };
        a_Definitions.onclick = () => { $('#Definitions_Tab').removeClass('display_none'); $('#Rec_Exch_Tab').addClass('display_none'); $('#Views_Tab').addClass('display_none'); $('#Shahadat_Tab').addClass('display_none'); };
        a_Shahadat.onclick = () => { $('.Hid_Rec').removeClass('display_none'); $('.Hid_Ex').removeClass('display_none'); $('.Shaha_Ex').addClass('display_none'); $('#Shahadat_Tab').removeClass('display_none'); $('#Rec_Exch_Tab').addClass('display_none'); $('#Views_Tab').addClass('display_none'); $('#Definitions_Tab').addClass('display_none'); Glopl_Type = 'Shahadat'; };

        txtDateFrom.value = DateStartYear();
        txtDateTo.value = GetDate();

        TypePeriod.onchange = SumPrc;
        txtdateDueSH.onchange = SumPrc;
        txtAmountSH.onkeyup = SumPrc;
        txtPrcSH.onkeyup = SumPrc;

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


        setTimeout(function () { $('#Page_Loding').removeClass("display_none") }, 500);


    }


    function Tabs_click() {


        $('body').on('click', '.scrollable-tabs li', function () {

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

                    txt.innerHTML = "( " + item.Amount.toLocaleString('en-US', { maximumFractionDigits: 1 }) + " ) $";
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
                    else if (item.Title == "Adjustment") {
                        txt.style.color = "#cea307";
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
        $('#TypeSoursSH').html("")
        for (var u = 0; u < Wallet_Def.length; u++) {
            $('#TypeSoursF').append('<option value="' + Wallet_Def[u].NameBal + '">' + Wallet_Def[u].Remars + '</option>');

            let Nameclass = '';

            $('.Hid_Rec').removeClass('display_none')
            $('.Hid_Ex').removeClass('display_none')

            if (Wallet_Def[u].CUSTOM1 != "true") {
                Nameclass = ' Hid_Rec';
            }

            if (Wallet_Def[u].CUSTOM2 != "true") {
                Nameclass = Nameclass + ' Hid_Ex';
            }

            if (Wallet_Def[u].CUSTOM5 != "true") {
                Nameclass = Nameclass + ' Shaha_Ex';
            }


            if (Wallet_Def[u].CUSTOM4 == "true") {
                $('#TypeSours').append('<option class="' + Nameclass + '" value="' + Wallet_Def[u].NameBal + '">' + Wallet_Def[u].Remars + '</option>');
                $('#TypeSoursTrans').append('<option class="' + Nameclass + '" value="' + Wallet_Def[u].NameBal + '">To ' + Wallet_Def[u].Remars + '</option>');
                $('#TypeSoursSH').append('<option class="' + Nameclass + '" value="' + Wallet_Def[u].NameBal + '">' + Wallet_Def[u].Remars + '</option>');
                //$('#TypeSoursAdjus').append('<option class="" value="' + Wallet_Def[u].NameBal + '">To ' + Wallet_Def[u].Remars + '</option>');
            }



        }

    }
    function GridDoubleClick() {


        FlagUpdate = true;


        if (JGrid.SelectedItem.Title == "Exchange") {
            $('#a_Expans').click();
        }
        else if (JGrid.SelectedItem.Title == "Receipt") {
            $('#a_Resive').click();
        }
        else if (JGrid.SelectedItem.Title == "Transfers") {

            $('#a_Transfers').click();
        }

        else if (JGrid.SelectedItem.Title == "Shahadat") {

            $('#a_Shahadat').click();
        }
        else if (JGrid.SelectedItem.Title == "Adjustment") {

            $('#a_Adjustment').click();
        }


        if (JGrid.SelectedItem.Title != "Shahadat") {

            setTimeout(function () {
                txtAmount.value = JGrid.SelectedItem.Amount;
                $('#txtdate').val(DateFormat(JGrid.SelectedItem.TrDate));
                $('#txtTrNo').val(JGrid.SelectedItem.ID);
                $('#TypeSours').val(JGrid.SelectedItem.Type);
                $('#TypeSoursTrans').val(JGrid.SelectedItem.TypeTo);
                $('#txtRemark').val(JGrid.SelectedItem.Remars);
                $('#txtAdjustmentAmount').val(JGrid.SelectedItem.Prc);
                $('#txtAdjustmentAmountDone').val(JGrid.SelectedItem.CUSTOM4);
            }, 100);

            setTimeout(function () {
                FlagUpdate = false;
            }, 500);

        }


        if (JGrid.SelectedItem.Title == "Shahadat") {

            setTimeout(function () {
                $('#txtAmountSH').val(JGrid.SelectedItem.Amount);
                $('#txtPrcSH').val(JGrid.SelectedItem.Prc);
                $('#txtdateSH').val(DateFormat(JGrid.SelectedItem.TrDate));
                $('#txtdateDueSH').val(DateFormat(JGrid.SelectedItem.DueDate));
                $('#txtTrNoSH').val(JGrid.SelectedItem.ID);
                $('#TypeSoursSH').val(JGrid.SelectedItem.Type);
                $('#txtRemarkSH').val(JGrid.SelectedItem.Remars);
                $('#TypePeriod').val(JGrid.SelectedItem.TypePeriod);
                $("#ActiveSH").prop('checked', JGrid.SelectedItem.CUSTOM1 == "false" ? false : true);
                $('#txtAmountDuePay').val(JGrid.SelectedItem.CUSTOM2);
                $('#txtAllDue').val(JGrid.SelectedItem.CUSTOM3);
                $('#txtAllAmountDue').val(Number(JGrid.SelectedItem.CUSTOM3) + Number(JGrid.SelectedItem.Amount));
                SumPrc();
            }, 100);

            setTimeout(function () {
                FlagUpdate = false;
            }, 500);

        }


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
                    setTimeout(function () {
                    Display = new Array<Wallet_Data>();

                    for (var d = 0; d < Wallet_Def.length; d++) {

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
                    AllDisplay = Display;
                    JGrid.DataSource = Display;
                    JGrid.Bind();

                        TotalGrid();
                    }, 400);

                  Clean();  
                }

            }
        })


    }

    function Display_Grid(_Display: Array<Wallet_Data>) {

        totalAmount = 0;
        AllDisplay = _Display;
        AllDisplay = AllDisplay.sort(dynamicSortNew("ID"));

        Display = _Display;


        for (var d = 0; d < Wallet_Def.length; d++) {

            if (Wallet_Def[d].Amount > 0) {

                let DisOpen_ball: Wallet_Data = new Wallet_Data();
                DisOpen_ball.ID = -1;
                DisOpen_ball.Amount = Wallet_Def[d].Amount
                DisOpen_ball.Type = Wallet_Def[d].NameBal
                DisOpen_ball.Title = "Receipt"
                DisOpen_ball.Remars = "Open Balance " + Wallet_Def[d].Remars;
                var today: Date = new Date();
                var yyyy = today.getFullYear();
                DisOpen_ball.TrDate = "" + yyyy + "-01-01";
                Display.push(DisOpen_ball)


            }

        }


        if ($('#TypeSoursF').val() != "All") {
            Display = Display.filter(x => x.Type == $('#TypeSoursF').val());
        }
        if ($('#TrType').val() != "All" && $('#TrType').val() != "Open_Bal") {
            Display = Display.filter(x => x.Title == $('#TrType').val());
        }
        if ($('#TrType').val() == "Open_Bal") {
            Display = Display.filter(x => x.ID == -1);
        }
        Display = Display.filter(x => x.TrDate >= txtDateFrom.value && x.TrDate <= txtDateTo.value);

        Display = Display.sort(dynamicSortNew("ID"));

        $("#JGrid").jsGrid("option", "pageIndex", 1);
        JGrid.DataSource = Display;
        JGrid.Bind();

        Clean();

        TotalGrid();

        $('.jsgrid-grid-body').scrollLeft(500);
    }
    function TotalGrid() {

        let DisplayEx = Display.filter(x => x.Title == 'Exchange');
        let DisplayRec = Display.filter(x => x.Title == 'Receipt');

        let AmountEx = 0
        for (var i = 0; i < DisplayEx.length; i++) {
            AmountEx = AmountEx + DisplayEx[i].Amount;
        }

        let AmountRec = 0
        for (var i = 0; i < DisplayRec.length; i++) {
            AmountRec = AmountRec + DisplayRec[i].Amount;
        }

        $('#txtTotalExchange').val(Number(AmountEx.toFixed(2)).toLocaleString('en-US', { maximumFractionDigits: 1 }));
        $('#txtTotalReceipt').val(Number(AmountRec.toFixed(2)).toLocaleString('en-US', { maximumFractionDigits: 1 }));
        $('#txtTotal').val(Number((AmountRec - AmountEx).toFixed(2)).toLocaleString('en-US', { maximumFractionDigits: 1 }));

    }
    function AppTans(Type: string) {



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

       

        if ($('#txtAdjustmentAmountDone').val().trim() == '' && Type == 'Adjustment') {
            Errorinput($('#txtAdjustmentAmountDone'))
            return false
        }

        if ($('#txtAdjustmentAmountDone').val() == $('#txtAdjustmentAmount').val() && Type == 'Adjustment') {
            Errorinput($('#txtAdjustmentAmountDone'))
            Errorinput($('#txtAdjustmentAmount'))
            return false
        }

        if ($('#txtAmount').val().trim() == '') {
            Errorinput($('#txtAmount'))
            return false
        }



        Model = new Wallet_Data();

        let Val = txtAmount.value;

        txtAmount.value = eval(Val);
        let AmountDone = eval($('#txtAdjustmentAmountDone').val());

        DocumentActions.AssignToModel(Model);//Insert Update 
        Model.TrDate = DateFormatRep($('#txtdate').val())
        Model.Type = $('#TypeSours').val();
        Model.TypeTo = $('#TypeSoursTrans').val();
        Model.Title = Type;
        Model.Amount = eval(Val);
        Model.Prc = Number($('#txtAdjustmentAmount').val());
        Model.CUSTOM4 = AmountDone;
        Model.ID = Number($('#txtTrNo').val());
        //Model.ID = 666;

        let Data = new Send_Data();

        Data.ID = Number($('#txtTrNo').val());
        Data.Name_Txt_Master = Comp_Wallet;
        Data.Model = JSON.stringify(Model);
        Data.StatusFlag = 'u';


        $.ajax({
            url: Url.Action("Add_Trans", "Profile"),
            type: "POST",
            dataType: 'json',
            async: false,
            data: { Data: JSON.stringify(Data) },
            success: (d) => {
                let result = JSON.parse(d)

                if (Type == "Receipt") {
                    ShowMessage('تم اضافة مبلغ بمقدار ( ' + eval(Val).toLocaleString('en-US', { maximumFractionDigits: 1 }) + ' ) في حساب (' + $("#TypeSours option:selected").text() + ')ـ ');
                }

                if (Type == "Exchange") {
                    ShowMessage('تم خصم مبلغ بمقدار ( ' + eval(Val).toLocaleString('en-US', { maximumFractionDigits: 1 }) + ' ) من حساب ـ(' + $("#TypeSours option:selected").text() + ')ـ ');
                }

                if (Type == "Transfers") {
                    ShowMessage('تم تحويل مبلغ بمقدار ( ' + eval(Val).toLocaleString('en-US', { maximumFractionDigits: 1 }) + ' ) من حساب ـ(' + $("#TypeSours option:selected").text() + ')ـ الي حساب ـ(' + $("#TypeSoursTrans option:selected").text() + ') ');
                }




                let res = result as Array<Wallet_Data>;
                Display_Grid(res)
                Clean();

                flagSave = 1;

                setTimeout(function () { flagSave = 0; }, 800);

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
            //$('#TypeSours').prop('selectedIndex', 0)
            //$('#TypeSoursTrans').prop('selectedIndex', 0)
            SelectFristRow('TypeSours');
            SelectFristRow('TypeSoursTrans');
            $('#txtRemark').val('');
            $('#txtdate').val(GetDate());
            $('#txtAmount').val('');
            $('#txtAdjustmentAmountDone').val('');
            $('#txtAdjustmentAmount').val('');
            //**********************************Shahada**************************       
            $('#txtTrNoSH').val('');
            SelectFristRow('TypeSoursSH');

            //$('#TypeSoursSH').prop('selectedIndex', 0)
            $('#TypePeriod').prop('selectedIndex', 0)
            $('#txtRemarkSH').val('');
            $('#txtdateSH').val(GetDate());
            $('#txtdateDueSH').val(GetDateyyyy_1());
            $('#txtAmountSH').val('');
            $('#txtPrcSH').val('');
            $("#ActiveSH").prop('checked', true);
            $('#txtAmountDuePay').val('');
            $('#txtAllDue').val('');
            $('#txtAllAmountDue').val('');

            $('#txtPaid_up').val('');
            $('#txtResidual').val('');
        }

        setTimeout(function () {
            if ($('#txtRemark').is(":hidden")) {
                $('#txtRemarkSH').focus();
            }
            else {
                $('#txtRemark').focus();
            }
        }, 150);

        $('#btnReceipt').addClass('display_none');
        $('#btnExchange').addClass('display_none');
        $('#btnTransfers').addClass('display_none');
        $('#btnAdjustment').addClass('display_none');
        $('.Not_Trans').removeClass('display_none');
        $('.ToTransfers').addClass('display_none');
        $('.ToAdjustment').addClass('display_none');
        $('#AreaAmount').attr('class', 'col-xs-6 col-lg-6 col-sm-6');
        $('#txtAmount').removeAttr('disabled');

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
        else if (Glopl_Type == 'Adjustment') {
            $('#btnAdjustment').removeClass('display_none');
            Event_key('Enter', 'txtAdjustmentAmountDone', 'btnAdjustment');

            $('.Not_Trans').addClass('display_none');
            $('.ToTransfers').addClass('display_none');
            $('.ToAdjustment').removeClass('display_none');
            $('#AreaAmount').attr('class', 'col-xs-6 col-lg-6 col-sm-6');
            $('#txtAmount').attr('disabled', 'disabled');
            SelectAdjustmentAmount();
        }


        if (!FlagUpdate) {
            let MaxID = 0;
            if (AllDisplay.length > 0) {
                MaxID = AllDisplay[0].ID;
            }
            $('#txtTrNo').val(MaxID + 1);
            $('#txtTrNo').attr('style', 'text-align: center;background: #004895;color: white;')

            $('#txtTrNoSH').val(MaxID + 1);
            $('#txtTrNoSH').attr('style', 'text-align: center;background: #004895;color: white;')
        }
        else {
            $('#txtTrNo').attr('style', 'text-align: center;background: #009563;color: white;')

            $('#txtTrNoSH').attr('style', 'text-align: center;background: #009563;color: white;')
        }

        //AllBalance(); 
        setTimeout(function () { Sum_AllBalance(); }, 50);

    }

    function SelectAdjustmentAmount() {

        debugger

        let idBal = $('#TypeSours').val()
        idBal = idBal.replace(/ /g, "_");

        var text = $('#' + idBal + '').html()

        // Use regular expression to match numbers with optional comma separators
        var numbers = text.match(/[0-9,]+/g);

        // Loop through the matched numbers and remove commas, then convert to numbers
        var extractedNumbers = numbers.map(function (number) {
            return parseInt(number.replace(/,/g, ''));
        });

        // Print the extracted numbers
        $('#txtAdjustmentAmount').val(extractedNumbers[0])

    }
    function Settlement_difference() {
        let AmountCorrect = txtAdjustmentAmountDone.value;
        let AmountCorrectDone = 0
        AmountCorrect = eval(AmountCorrect);
        AmountCorrectDone = Number(AmountCorrect);
        let AmountExisting = Number($('#txtAdjustmentAmount').val());
        let difference = (AmountCorrectDone - AmountExisting).toFixed(2);
        $('#txtAmount').val(difference)
    }
    //*************************************************Display_AllBalance**************************************** 
    function AllBalance() {



        //******************************************* Exchange********************************
        let DebtAmountEx = 0; //مديونيه
        let CashAmountEx = 0;
        let Cairo_BankAmountEx = 0
        let Al_ahly_BankAmountEx = 0;
        let Bal_HomeAmountEx = 0;
        let AAIBAmountEx = 0;

        let CashEx = AllDisplay.filter(x => x.Type == 'Cash' && (x.Title == 'Exchange' || x.Title == 'Transfers'));
        let Cairo_BankEx = AllDisplay.filter(x => x.Type == 'Cairo Bank' && (x.Title == 'Exchange' || x.Title == 'Transfers'));
        let Al_ahly_BankEx = AllDisplay.filter(x => x.Type == 'Al ahly Bank' && (x.Title == 'Exchange' || x.Title == 'Transfers'));
        let DebtEx = AllDisplay.filter(x => x.Type == 'Debt' && x.Title == 'Exchange');
        let Bal_HomeEx = AllDisplay.filter(x => x.Type == 'Bal Home' && (x.Title == 'Exchange' || x.Title == 'Transfers'));

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


        let CashRec = AllDisplay.filter(x => x.Type == 'Cash' && x.Title == 'Receipt' || (x.TypeTo == 'Cash' && x.Title == 'Transfers'));
        let Cairo_BankRec = AllDisplay.filter(x => x.Type == 'Cairo Bank' && x.Title == 'Receipt' || (x.TypeTo == 'Cairo Bank' && x.Title == 'Transfers'));
        let Al_ahly_BankRec = AllDisplay.filter(x => x.Type == 'Al ahly Bank' && x.Title == 'Receipt' || (x.TypeTo == 'Al ahly Bank' && x.Title == 'Transfers'));
        let DebtRec = AllDisplay.filter(x => x.Type == 'Debt' && x.Title == 'Receipt');
        let Bal_HomeRec = AllDisplay.filter(x => x.Type == 'Bal Home' && x.Title == 'Receipt' || (x.TypeTo == 'Bal Home' && x.Title == 'Transfers'));

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

        let AllTotal = 0;
        let Wallet_Def_IsActive = Wallet_Def.filter(x => x.CUSTOM4 == "true");
        for (var xx = 0; xx < Wallet_Def_IsActive.length; xx++) {


            //**********************************************Build**********************************
            let idBal = Wallet_Def_IsActive[xx].NameBal
            idBal = idBal.replace(/ /g, "_");
            let html_Balance = ` 
                    <div class="col-xs-6 col-lg-6 col-sm-6 ">
                            <label id="${idBal}"> ( 0 )</label>
                    </div>`;

            $('#Div_Show_Balance').append(html_Balance)

            //******************************************* Sum Shahadat********************************
            debugger
            let SHAmount = 0;
            let SHchange = AllDisplay.filter(x => x.Type == '' + Wallet_Def_IsActive[xx].NameBal + '' && (x.Title == 'Shahadat') && x.CUSTOM1 == 'true');
            if (Wallet_Def_IsActive[xx].CUSTOM5 == "true") {
                debugger
                for (var i0 = 0; i0 < SHchange.length; i0++) {
                    SHAmount = SHAmount + SHchange[i0].Amount
                }


                //alert(BalansCalculatorShahadat(SHchange))
                //alert(SHAmount)
                debugger
                SHAmount = SHAmount - BalansCalculatorShahadat(SHchange);

            }


            //******************************************* Sum Adjustment********************************
            let AdjAmount = 0;
            let Adjchange = AllDisplay.filter(x => x.Type == '' + Wallet_Def_IsActive[xx].NameBal + '' && (x.Title == 'Adjustment'));

            for (var i99 = 0; i99 < Adjchange.length; i99++) {
                AdjAmount = AdjAmount + Adjchange[i99].Amount
            }
             
            //******************************************* Sum Exchange********************************
            let EXAmount = 0;
            let Exchange = AllDisplay.filter(x => x.Type == '' + Wallet_Def_IsActive[xx].NameBal + '' && (x.Title == 'Exchange' || x.Title == 'Transfers'));

            if (Wallet_Def_IsActive[xx].CUSTOM2 == "true") {
                for (var i1 = 0; i1 < Exchange.length; i1++) {
                    EXAmount = EXAmount + Exchange[i1].Amount
                }
            }
             
            EXAmount = EXAmount + SHAmount;

            //****************************************************Sum Receipt**************************************

            let RecAmount = 0;
            let Receipt = AllDisplay.filter(x => x.Type == '' + Wallet_Def_IsActive[xx].NameBal + '' && x.Title == 'Receipt' || (x.TypeTo == '' + Wallet_Def_IsActive[xx].NameBal + '' && x.Title == 'Transfers'));

            if (Wallet_Def_IsActive[xx].CUSTOM1 == "true") {
                for (var i2 = 0; i2 < Receipt.length; i2++) {
                    RecAmount = RecAmount + Receipt[i2].Amount
                }
            }
            //RecAmount = RecAmount + Wallet_Def_IsActive[xx].Amount;
            //***************************************************************SetValHtml*********************************************  

            $('#' + idBal + '').html('' + Wallet_Def_IsActive[xx].Remars + ' ( ' + ((Number(RecAmount) - Number(EXAmount)) + AdjAmount).toLocaleString('en-US', { maximumFractionDigits: 1 }) + ' ) $');

            //****************************************Total***********************************************
            if (Wallet_Def_IsActive[xx].CUSTOM3 == "true") {
                AllTotal = AllTotal + ((Number(RecAmount) - Number(EXAmount)) + AdjAmount);
            }

        }
        //****************************************AllTotal***********************************************
        let html_Balance = ` 
                    <div class="col-xs-6 col-lg-6 col-sm-6 ">
                            <label id="BalanceLab"> ( 0 )</label>
                    </div>`;

        $('#Div_Show_Balance').append(html_Balance)
        $('#BalanceLab').html('All Bal ( ' + (Number(AllTotal.toFixed(2))).toLocaleString('en-US', { maximumFractionDigits: 1 }) + ' ) $');
    }

    //*************************************************Shahadat****************************************

    function BalansCalculatorShahadat(Shahadat: Array<Wallet_Data>) {

        debugger
        let AllAomuntDue = 0;


        for (let b = 0; b < Shahadat.length; b++) {
            let AomuntDue = 0;
            let AllMonth = getMonthsDifference(Shahadat[b].TrDate, Shahadat[b].DueDate)


            let NumPriod = 1;
            if (Shahadat[b].TypePeriod != '0') {
                NumPriod = AllMonth / Number(Shahadat[b].TypePeriod)
            }



            let NumMonth = getMonthsDifference(Shahadat[b].TrDate, GetDate())



            for (let Pr = 0; Pr < NumPriod; Pr++) {


                var AllDue = parseFloat(Shahadat[b].CUSTOM3.replace(/,/g, ''));
                if (AomuntDue == AllDue) {

                    AomuntDue = AomuntDue + Shahadat[b].Amount
                    AllAomuntDue = AllAomuntDue + AomuntDue;
                    break;
                }

                if (Number(Shahadat[b].TypePeriod) <= NumMonth) {

                    var numberString = Shahadat[b].CUSTOM2;


                    var Due = parseFloat(numberString.replace(/,/g, ''));
                    AomuntDue = (AomuntDue + Due)
                    AomuntDue = parseFloat(AomuntDue.toFixed(1))
                    AllAomuntDue = AllAomuntDue + AomuntDue;
                    NumMonth = NumMonth - Number(Shahadat[b].TypePeriod)
                }
                else {

                    if (AomuntDue == AllDue) {

                        AomuntDue = AomuntDue + Shahadat[b].Amount
                        AllAomuntDue = AllAomuntDue + AomuntDue;
                        break;
                    }

                    break;
                }


                if (AomuntDue == AllDue) {

                    AomuntDue = AomuntDue + Shahadat[b].Amount
                    AllAomuntDue = AllAomuntDue + AomuntDue;
                    break;
                }

            }
        }

        debugger
        //if (AomuntDue != 0) {

        //    PushNotification(' تم اضافة فائدة بمقدار (' + AomuntDue + ') في بنك (' + Shahadat[0].Type+') ');
        //}

        return AllAomuntDue
    }

    function returnBalansCalculatorShahadat(Shahadat: Array<Wallet_Data>) {

        let AomuntDue = 0;

        for (let b = 0; b < Shahadat.length; b++) {

            let AllMonth = getMonthsDifference(Shahadat[b].TrDate, Shahadat[b].DueDate)


            let NumPriod = 1;
            if (Shahadat[b].TypePeriod != '0') {
                NumPriod = AllMonth / Number(Shahadat[b].TypePeriod)
            }



            let NumMonth = getMonthsDifference(Shahadat[b].TrDate, GetDate())



            for (let Pr = 0; Pr < NumPriod; Pr++) {


                var AllDue = parseFloat(Shahadat[b].CUSTOM3.replace(/,/g, ''));
                if (AomuntDue == AllDue) {

                    break;
                }

                if (Number(Shahadat[b].TypePeriod) <= NumMonth) {

                    var numberString = Shahadat[b].CUSTOM2;


                    var Due = parseFloat(numberString.replace(/,/g, ''));
                    AomuntDue = (AomuntDue + Due)
                    AomuntDue = parseFloat(AomuntDue.toFixed(1))

                    NumMonth = NumMonth - Number(Shahadat[b].TypePeriod)
                }
                else {

                    if (AomuntDue == AllDue) {

                        break;
                    }

                    break;
                }


                if (AomuntDue == AllDue) {

                    break;
                }

            }

        }



        return AomuntDue
    }

    function SumPrc() {


        let Amount = Number($('#txtAmountSH').val())
        let Prc = (Number($('#txtPrcSH').val()) / 100)
        //let NumYear = getYearDifference($('#txtdateSH').val(), $('#txtdateDueSH').val())

        let AllMonth = getMonthsDifference($('#txtdateSH').val(), $('#txtdateDueSH').val())

        let NumPriod = 1;
        if ($('#TypePeriod').val() != '0') {
            NumPriod = AllMonth / Number($('#TypePeriod').val())
        }

        let calacul = Amount * Prc  //حساب الفائده علي السنه


        let period = Number($('#TypePeriod').val());


        let AmountDue = 0;
        let allAmount = 0;


        if (period != 0) {
            AmountDue = (calacul / 12) * period;
        }
        else {
            let NumMonths = getMonthsDifference($('#txtdateSH').val(), $('#txtdateDueSH').val())
            AmountDue = (calacul / 12) * NumMonths;
        }


        allAmount = Number(AmountDue.toFixed(1)) * NumPriod;


        $('#txtAmountDuePay').val(Number(Number(AmountDue).toFixed(4)).toLocaleString('en-US', { maximumFractionDigits: 1 }))

        $('#txtAllDue').val(Number(Number(allAmount).toFixed(4)).toLocaleString('en-US', { maximumFractionDigits: 1 }))

        $('#txtAllAmountDue').val(Number((allAmount + Amount).toFixed(4)).toLocaleString('en-US', { maximumFractionDigits: 1 }))


        // Remove commas from the number string to convert it to a valid number format
        //var numberString = "1,583.3";

        //var number = parseFloat(numberString.replace(/,/g, ''));


        setTimeout(function () {

            let chackDateMakeShahada = AllDisplay.filter(x => (x.Title == 'Shahadat') && x.ID == Number($('#txtTrNoSH').val()));
            if (chackDateMakeShahada.length > 0) {
                let returnBalans = returnBalansCalculatorShahadat(chackDateMakeShahada);
                $('#txtPaid_up').val(returnBalans.toLocaleString('en-US', { maximumFractionDigits: 1 }))
                $('#txtResidual').val((Number(Number(allAmount).toFixed(4)) - returnBalans).toLocaleString('en-US', { maximumFractionDigits: 1 }))
            }
            else {

                $('#txtPaid_up').val(0)
                $('#txtResidual').val((Number(Number(allAmount).toFixed(4))).toLocaleString('en-US', { maximumFractionDigits: 1 }))
            }


        }, 300);
    }


    function AppTansShahada(Type: string) {



        if (flagSave == 1) {
            setTimeout(function () { flagSave = 0; }, 800);

            return false
        }

        if ($('#txtRemarkSH').val().trim() == '') {
            Errorinput($('#txtRemarkSH'))
            return false
        }




        if (Number($('#txtPrcSH').val()) == 0) {
            Errorinput($('#txtPrcSH'))
            return false
        }

        if (Number($('#txtAmountSH').val()) == 0) {
            Errorinput($('#txtAmountSH'))
            return false
        }



        Model = new Wallet_Data();

        let Val = $('#txtAmountSH').val();

        $('#txtAmountSH').val(eval(Val));

        //DocumentActions.AssignToModel(Model);//Insert Update 
        Model.ID = Number($('#txtTrNoSH').val());
        Model.TrDate = DateFormatRep($('#txtdateSH').val())
        Model.Type = $('#TypeSoursSH').val();
        Model.TypeTo = '';
        Model.Title = Type;
        Model.Remars = $('#txtRemarkSH').val();;
        Model.Amount = Number($('#txtAmountSH').val());
        Model.Prc = Number($('#txtPrcSH').val());
        Model.DueDate = DateFormatRep($('#txtdateDueSH').val())
        Model.TypePeriod = $('#TypePeriod').val();
        Model.CUSTOM1 = "" + ($("#ActiveSH").prop('checked')) + "";
        Model.CUSTOM2 = $('#txtAmountDuePay').val()
        Model.CUSTOM3 = $('#txtAllDue').val()
        Model.CUSTOM4 = '';



        let Data = new Send_Data();

        Data.ID = Number($('#txtTrNoSH').val());
        Data.Name_Txt_Master = Comp_Wallet;
        Data.Model = JSON.stringify(Model);
        Data.StatusFlag = 'u';


        //let chackDateMakeShahada = AllDisplay.filter(x => x.Type == '' + $('#TypeSoursSH').val() + '' && (x.Title == 'Shahadat') && x.CUSTOM1 == 'true' && x.DueDate >= DateFormatRep($('#txtdateSH').val()) && x.ID != Number($('#txtTrNoSH').val()));
        //if (chackDateMakeShahada.length > 0) {

        //    alert('في شهاده معموله في هذه الفتره')
        //    Errorinput($('#txtdateSH'))
        //    return
        //}
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

                setTimeout(function () { flagSave = 0; }, 800);

            }
        })
    }


    //*************************************************Definitions****************************************


    function GetDefinitions() {

        Ajax.CallAsync({
            url: Url.Action("Get_Two_Data", "Profile"),
            data: { Name_txt1: Comp_HedDef, Name_txt2: Comp_Definitions },
            success: (Pro) => {

                if (Pro != "Error") {
                    let result = JSON.parse(Pro)

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
        if (Wal_HedDef.CUSTOM6 == "true") {
            $('#a_Adjustment').removeClass('display_none')
        }
        if (Wal_HedDef.CUSTOM5 == "true") {
            $('#a_View').removeClass('display_none')
        }

        DisplayOneTap();
    }
    function DisplayOneTap() {


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
        else if ($('#a_Adjustment').is(':visible')) {
            $('#a_Adjustment').click();
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
        $("#CH_Hed_Adjustment").prop('checked', Data.CUSTOM6 == "false" ? false : true);
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
                            <input id="CH_Shahadat${cnt}" type="checkbox" disabled class=" _dis form-control" name=""  />
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
        $("#CH_Shahadat" + cnt).prop('checked', DataDet.CUSTOM5 == "false" ? false : true);
        $("#txt_StatusFlag" + cnt).val('');



    }
    function DisplayDetails() {

        CountGrid = 0;
        $("#div_Data_Def").html('');
        for (var i = 0; i < Wallet_Def.length; i++) {

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

        $('.fixed-table-body').scrollTop(100000);
        $("#btnAddDetails").focus();

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


        ModelDetails = new Array<Wallet_Definitions>();
        Model_Wal_HedDef = new Wallet_HedDef();

        Model_Wal_HedDef.CUSTOM1 = "" + ($("#CH_Hed_Receipt").prop('checked')) + "";
        Model_Wal_HedDef.CUSTOM2 = "" + ($("#CH_Hed_Exchange").prop('checked')) + "";
        Model_Wal_HedDef.CUSTOM3 = "" + ($("#CH_Hed_Transfers").prop('checked')) + "";
        Model_Wal_HedDef.CUSTOM4 = "" + ($("#CH_Hed_Shahadat").prop('checked')) + "";
        Model_Wal_HedDef.CUSTOM6 = "" + ($("#CH_Hed_Adjustment").prop('checked')) + "";
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
                SingModelDetails.CUSTOM5 = "" + ($("#CH_Shahadat" + i).prop('checked')) + "";

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













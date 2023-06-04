$(document).ready(function () {
    Money_Wallet.InitalizeComponent();
});
var Money_Wallet;
(function (Money_Wallet) {
    var AllDisplay = new Array();
    var Display = new Array();
    var Model = new DataAll();
    var btnExchange;
    var btnReceipt;
    var a_Expans;
    var a_Resive;
    var a_View;
    var Glopl_Type = '1';
    function InitalizeComponent() {
        Tabs_click();
        $('#txtdate').val(GetDate());
        btnExchange = document.getElementById("btnExchange");
        btnReceipt = document.getElementById("btnReceipt");
        a_Expans = document.getElementById("a_Expans");
        a_Resive = document.getElementById("a_Resive");
        btnExchange.onclick = function () { AppTans(Glopl_Type); };
        btnReceipt.onclick = function () { AppTans(Glopl_Type); };
        a_Expans.onclick = function () { Glopl_Type = '1'; };
        a_Resive.onclick = function () { Glopl_Type = '0'; };
        //a_View.onclick = () => { };
        Clean();
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
    function AppTans(Type) {
        debugger;
        Model = new DataAll();
        DocumentActions.AssignToModel(Model); //Insert Update 
        Model.TrDate = DateFormatRep($('#txtdate').val());
        Model.Type = $('#TypeSours').val();
        Model.Title = Type;
        //Model.ID = Number($('#txtTrNo').val());
        Model.ID = 666;
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
                Clean();
                var res = result;
                //Display_Grid(res)
                //JGrid.SelectedItem = Model;
                //GridDoubleClick();
            }
        });
    }
    function Clean() {
        $('#TypeSours').val('0');
        $('#txtRemark').val('');
        $('#txtdate').val(GetDate());
        $('#txtAmount').val('');
        setTimeout(function () { $('#txtRemark').focus(); }, 150);
        $('#btnReceipt').addClass('display_none');
        $('#btnExchange').addClass('display_none');
        if (Glopl_Type == '1') {
            $('#btnExchange').removeClass('display_none');
        }
        else {
            $('#btnReceipt').removeClass('display_none');
        }
    }
})(Money_Wallet || (Money_Wallet = {}));
//# sourceMappingURL=Money_Wallet.js.map

$(document).ready(() => {
    Money_Wallet.InitalizeComponent();
})

namespace Money_Wallet {

    var AllDisplay: Array<DataAll> = new Array<DataAll>();
    var Display: Array<DataAll> = new Array<DataAll>();
    var Model: DataAll = new DataAll();

    var btnExchange: HTMLButtonElement;
    var btnReceipt: HTMLButtonElement;
    var a_Expans: HTMLButtonElement;
    var a_Resive: HTMLButtonElement;
    var a_View: HTMLButtonElement;

    var Glopl_Type = '1';

    export function InitalizeComponent() { 
        Tabs_click();
        $('#txtdate').val(GetDate());

        btnExchange = document.getElementById("btnExchange") as HTMLButtonElement;
        btnReceipt = document.getElementById("btnReceipt") as HTMLButtonElement;
        a_Expans = document.getElementById("a_Expans") as HTMLButtonElement;
        a_Resive = document.getElementById("a_Resive") as HTMLButtonElement;

        btnExchange.onclick = () => { AppTans(Glopl_Type) };
        btnReceipt.onclick = () => { AppTans(Glopl_Type) };
        a_Expans.onclick = () => { Glopl_Type = '1'; };
        a_Resive.onclick = () => { Glopl_Type = '0'; };
        //a_View.onclick = () => { };

        Clean();

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

   

    function AppTans(Type: string) {

        debugger
        Model = new DataAll();

        DocumentActions.AssignToModel(Model);//Insert Update 
        Model.TrDate = DateFormatRep($('#txtdate').val())
        Model.Type = $('#TypeSours').val();
        Model.Title = Type;

        //Model.ID = Number($('#txtTrNo').val());
        Model.ID = 666;

        let Data = new Send_Data();

        Data.ID = Number($('#txtTrNo').val());
        Data.Name_Txt_Master = "Catch_Receipt";
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

                Clean();
                let res = result as Array<DataAll>;


                //Display_Grid(res)

                //JGrid.SelectedItem = Model;
                //GridDoubleClick();

            }
        })
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
     
}














$(document).ready(() => {

    var AllDisplay: Array<DataNotes> = new Array<DataNotes>();

    var DetMaxLast = 0;
    var CountGrid = 0;
     
    var NameModel = "";
    NotesInitalizeComponent();

    function NotesInitalizeComponent() {

        $("#layout_Refresh").removeClass('display_none');

        //$("#layout_Refresh").on('click', function () {
        //    var glopalBtn = localStorage.getItem('glopalBtn');
        //    $("#" + glopalBtn + "").click();
        //});

        $("#layout_Refresh").attr('style','top: 17.5%;');
        

        $("#Back").on('click', function () {
            $('#Home_Page').removeClass('display_none');
            $('#Body_Page').addClass('display_none');


            $("#layout_Refresh").addClass('display_none');
            $("#layout_Back").addClass('display_none');

            $("#layout_Refresh").attr('style', '');
        });



        let ID = sessionStorage.getItem("AddUserID");

        NameModel = "Notepad/Notepad_" + ID+"_";


        Tabs_click(); 
        Get_All_Notes();
        AddButtonApp_Tap();
    } 
    function Tabs_click() {

        $('body').on('click', '.scrollable-tabs li', function () {
            debugger
            $('li').removeClass('actTab');
            $('.scrollable-tabs li a.active').removeClass('active');


            if ($(this).html() != '<a class="" data-toggle="tab" href=""><i class="fa fa-plus-circle Add"></i></a>' && $(this).html() != '<a class="" data-toggle="tab" href="" aria-expanded="true"><i class="fa fa-plus-circle Add"></i></a>' && $(this).html() != '<a class="" data-toggle="tab" href="" aria-expanded="false"><i class="fa fa-plus-circle Add"></i></a>') {

                $(this).addClass('actTab');
                let id_Remark = $(this).attr('Data_Remark');

                setTimeout(function () { $('#' + id_Remark + '').focus(); }, 150);
            }


        });

    } 

    function Get_All_Notes() {

        debugger
        Ajax.CallAsync({
            url: Url.Action("Get_All_Notes", "Profile"),
            data: { Name_txt: NameModel },
            success: (d) => {
                debugger
                let result = JSON.parse(d)

                AllDisplay = result as Array<DataNotes>;  
                AllDisplay = AllDisplay.sort(dynamicSort("ID"));
                 
                debugger
                CountGrid = 0;
                for (var i = 0; i < AllDisplay.length; i++) {
                    debugger
                    BuildControls(i);
                    DisplayDetailsControls(i, AllDisplay[i])
                    CountGrid++;
                }
                AddButtonApp_Tap();


            }
        })

    }
    function DisplayDetailsControls(cnt: number, DataDet: DataNotes) {

        $("#ID" + cnt).val("0");
        $("#tab_" + cnt + "_Remark").html(DataDet.Remark);
    }
    function BuildControls(cnt: number) {


        var label_Html = "";
        label_Html = `
            <li class="nav-item" Data_Remark="tab_${cnt}_Remark">
                <a id="a_Tab_${cnt}" class="nav-link active" data-toggle="tab" href="#Tab_${cnt}">Tab ( ${cnt + 1} )</a>
            </li>`;

        $("#label_Tab").append(label_Html);

        var Area_Html = "";
        Area_Html = `
            <div class="tab-pane   active" id="Tab_${cnt}">
                <div class="card">
                    <input id="ID${cnt}" type="hidden" value="0" />
                    <textarea class="tearea display_none" id="tab_${cnt}_Remark" cols="2" rows="32">  </textarea>
                </div>
            </div>`;

        $("#Area_Tab").append(Area_Html);


        //$("#btn_minus" + cnt).on('click', function () {
        //    DeleteRow(cnt);
        //});

        $("#tab_" + cnt + "_Remark").on('change', function () {

            //Set_Notes(cnt);
                
        });

        $("#tab_" + cnt + "_Remark").on('keyup', function () {

            //alert('keyup')
            debugger
            if ($("#ID" + cnt ).val() == "0") {
                setTimeout(function () {
                    Set_Notes(cnt);
                    $("#ID" + cnt).val("0")
                }, 2000);
                $("#ID" + cnt).val("1")
            }

          

        });


    }
    function AddNewRow() {

        BuildControls(CountGrid); 
        CountGrid++;

    


       
        AddButtonApp_Tap();
    } 
    function AddButtonApp_Tap() {

        setTimeout(function () {
            let a_Tab = document.getElementById("a_Tab_" + (CountGrid - 1));
            a_Tab.click();
            a_Tab.focus();

            $(".tearea").removeClass('display_none');

             
        }, 20);

        //**********************************************************App_Tap*************************
        const element = document.getElementById("App_Tap");
        element.remove();

        $("#label_Tab").append('<li id="App_Tap" class=""><a class="" data-toggle="tab" href=""><i class="fa fa-plus-circle Add"></i></a></li>');

        $("#App_Tap").on('click', function () {
            AddNewRow();
        });

        const label_Tab = document.getElementById("label_Tab"); 
        label_Tab.scrollLeft = 1000;
    }

    function Set_Notes(cnt: number) {

        let Data = new Send_Data();

        Data.ID = Number($('#ID' + cnt).val());
        Data.Name_Txt_Master = NameModel + cnt;
        Data.Model = $("#tab_" + cnt + "_Remark").val();
        Data.TypeDataSouce = NameModel + cnt;

        debugger
        $.ajax({
            url: Url.Action("Set_Data_Notes", "Profile"),
            type: "POST",
            dataType: 'json',
            async: false,
            data: { Data: JSON.stringify(Data) },
            success: (d) => {
                
                //alert(100)
            }
        })
    }

    function DeleteRow(RecNo: number) {
        var statusFlag = $("#txt_StatusFlag" + RecNo).val();
        if (statusFlag == "i")
            $("#txt_StatusFlag" + RecNo).val("m");
        else
            $("#txt_StatusFlag" + RecNo).val("d");

        $("#No_Row" + RecNo).attr("hidden", "true");

    }

})













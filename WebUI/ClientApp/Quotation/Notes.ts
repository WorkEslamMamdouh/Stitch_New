﻿
$(document).ready(() => {
    Notes.InitalizeComponent();
})

namespace Notes {

    var AllDisplay: Array<DataNotes> = new Array<DataNotes>();

    var DetMaxLast = 0;
    var CountGrid = 0;
     

     

    export function InitalizeComponent() {

        InitalizeControls();
        InitalizeEvents();

        CountGrid = 0;
        $("#label_Tab").html('');
        $("#Area_Tab").html('');
        for (var i = 0; i < 5; i++) {
            debugger
            BuildControls(i);
            //DisplayDetailsControls(i, AllDisplay[i])
            CountGrid++;
        }
        let a_Tab = document.getElementById("a_Tab_" + (CountGrid - 1));
        a_Tab.click();
        a_Tab.focus();
    }

    function InitalizeControls() {
        //btnShow = document.getElementById("btnShow") as HTMLButtonElement;
        //btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;
        //btnSave = document.getElementById("btnSave") as HTMLButtonElement;
        //btnUpdate = document.getElementById("btnUpdate") as HTMLButtonElement;
        //btnBack = document.getElementById("btnBack") as HTMLButtonElement;
        //btnAddDetails = document.getElementById("btnAddDetails") as HTMLButtonElement;
        //////////  
        //dbTypeF = document.getElementById("dbTypeF") as HTMLSelectElement;
        //dbTypeH = document.getElementById("dbTypeH") as HTMLSelectElement;
        //////////
        //txtSearch = document.getElementById("txtSearch") as HTMLInputElement;
        //txtDateFrom = document.getElementById("txtDateFrom") as HTMLInputElement;
        //txtDateTo = document.getElementById("txtDateTo") as HTMLInputElement;
        //txtTrDate = document.getElementById("txtTrDate") as HTMLInputElement;


    }
    function InitalizeEvents() {
        //********************************Btn****************************
        //btnShow.onclick = btnShow_onclick;
        //btnAdd.onclick = btnAdd_onclick;
        //btnSave.onclick = btnSave_onClick;
        //btnBack.onclick = btnBack_onclick;
        //btnUpdate.onclick = btnUpdate_onclick;
        //btnAddDetails.onclick = AddNewRow;
        
        ////********************************onchange****************************
        //txtSearch.onkeyup = txtSearch_change;

    }


    function GetDetails(MasterID: number) {

        debugger
        Ajax.CallAsync({
            url: Url.Action("Get_Data", "Profile"),
            data: { Name_txt: "Data_Notes" },
            success: (d) => {
                let result = JSON.parse(d)

                AllDisplay = result as Array<DataNotes>; 
                AllDisplay = AllDisplay.sort(dynamicSortNew("ID")); 
                DetMaxLast = DetMaxLast[0].ID + 1;
                AllDisplay = AllDisplay.sort(dynamicSort("ID"));
                 
                debugger
                CountGrid = 0;
                $("#Area_Tab").html('');
                for (var i = 0; i < AllDisplay.length; i++) {
                    debugger
                    BuildControls(i);
                    DisplayDetailsControls(i, AllDisplay[i])
                    CountGrid++;
                }


            }
        })

    }
    function DisplayDetailsControls(cnt: number, DataDet: DataNotes) {

        $("#ID" + cnt).val(DataDet.ID); 
        $("#txtRemars" + cnt).val(DataDet.Remark);  
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
                    <input id="ID${cnt}" type="hidden" />
                    <textarea id="tab_${cnt}_Remark" cols="2" rows="25">  </textarea>
                </div>
            </div>`;

        $("#Area_Tab").append(Area_Html);


        $("#btn_minus" + cnt).on('click', function () {
            DeleteRow(cnt);
        });

        $("#btn_Open" + cnt).on('click', function () {
            window.open($("#txtUrl" + cnt).val().trim(), "_blank");
        });


    }
    function AddNewRow() {

        //BuildControls(CountGrid);
        //$("#txt_StatusFlag" + CountGrid).val("i"); //In Insert mode 
        //CountGrid++;
        //Insert_Serial();
        //$(".btn-minus").removeClass("display_none");
        //$('._dis').removeAttr('disabled')
        //$('._Cont').removeClass('display_none')


        //$("#ID" + CountGrid).val(DetMaxLast)
        //DetMaxLast++;
    }
    function DeleteRow(RecNo: number) {
        var statusFlag = $("#txt_StatusFlag" + RecNo).val();
        if (statusFlag == "i")
            $("#txt_StatusFlag" + RecNo).val("m");
        else
            $("#txt_StatusFlag" + RecNo).val("d");

        $("#No_Row" + RecNo).attr("hidden", "true");

    }


     
}













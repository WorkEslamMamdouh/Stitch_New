$(document).ready(function () {
    Notes.InitalizeComponent();
});
var Notes;
(function (Notes) {
    var AllDisplay = new Array();
    var DetMaxLast = 0;
    var CountGrid = 0;
    function InitalizeComponent() {
        Tabs_click();
        Get_All_Notes();
        AddButtonApp_Tap();
    }
    Notes.InitalizeComponent = InitalizeComponent;
    function Tabs_click() {
        $('body').on('click', '.scrollable-tabs li', function () {
            debugger;
            $('li').removeClass('actTab');
            $('.scrollable-tabs li a.active').removeClass('active');
            if ($(this).html() != '<a class="" data-toggle="tab" href=""><i class="fa fa-plus-circle Add"></i></a>' && $(this).html() != '<a class="" data-toggle="tab" href="" aria-expanded="true"><i class="fa fa-plus-circle Add"></i></a>' && $(this).html() != '<a class="" data-toggle="tab" href="" aria-expanded="false"><i class="fa fa-plus-circle Add"></i></a>') {
                $(this).addClass('actTab');
                var id_Remark_1 = $(this).attr('Data_Remark');
                setTimeout(function () { $('#' + id_Remark_1 + '').focus(); }, 150);
            }
        });
    }
    function Get_All_Notes() {
        debugger;
        Ajax.CallAsync({
            url: Url.Action("Get_All_Notes", "Profile"),
            data: { Name_txt: "Note_" },
            success: function (d) {
                debugger;
                var result = JSON.parse(d);
                AllDisplay = result;
                AllDisplay = AllDisplay.sort(dynamicSort("ID"));
                debugger;
                CountGrid = 0;
                for (var i = 0; i < AllDisplay.length; i++) {
                    debugger;
                    BuildControls(i);
                    DisplayDetailsControls(i, AllDisplay[i]);
                    CountGrid++;
                }
                AddButtonApp_Tap();
            }
        });
    }
    function DisplayDetailsControls(cnt, DataDet) {
        $("#ID" + cnt).val(DataDet.ID);
        $("#tab_" + cnt + "_Remark").html(DataDet.Remark);
    }
    function BuildControls(cnt) {
        var label_Html = "";
        label_Html = "\n            <li class=\"nav-item\" Data_Remark=\"tab_" + cnt + "_Remark\">\n                <a id=\"a_Tab_" + cnt + "\" class=\"nav-link active\" data-toggle=\"tab\" href=\"#Tab_" + cnt + "\">Tab ( " + (cnt + 1) + " )</a>\n            </li>";
        $("#label_Tab").append(label_Html);
        var Area_Html = "";
        Area_Html = "\n            <div class=\"tab-pane   active\" id=\"Tab_" + cnt + "\">\n                <div class=\"card\">\n                    <input id=\"ID" + cnt + "\" type=\"hidden\" />\n                    <textarea class=\"tearea display_none\" id=\"tab_" + cnt + "_Remark\" cols=\"2\" rows=\"32\">  </textarea>\n                </div>\n            </div>";
        $("#Area_Tab").append(Area_Html);
        //$("#btn_minus" + cnt).on('click', function () {
        //    DeleteRow(cnt);
        //});
        $("#tab_" + cnt + "_Remark").on('change', function () {
            Set_Notes(cnt);
        });
    }
    function AddNewRow() {
        BuildControls(CountGrid);
        CountGrid++;
        AddButtonApp_Tap();
    }
    function AddButtonApp_Tap() {
        setTimeout(function () {
            var a_Tab = document.getElementById("a_Tab_" + (CountGrid - 1));
            a_Tab.click();
            a_Tab.focus();
            $(".tearea").removeClass('display_none');
        }, 20);
        //**********************************************************App_Tap*************************
        var element = document.getElementById("App_Tap");
        element.remove();
        $("#label_Tab").append('<li id="App_Tap" class=""><a class="" data-toggle="tab" href=""><i class="fa fa-plus-circle Add"></i></a></li>');
        $("#App_Tap").on('click', function () {
            AddNewRow();
        });
        var label_Tab = document.getElementById("label_Tab");
        label_Tab.scrollLeft = 1000;
    }
    function Set_Notes(cnt) {
        var Data = new Send_Data();
        Data.ID = Number($('#ID' + cnt).val());
        Data.Name_Txt_Master = "Note_" + cnt;
        Data.Model = $("#tab_" + cnt + "_Remark").val();
        Data.TypeDataSouce = "Note_" + cnt;
        debugger;
        $.ajax({
            url: Url.Action("Set_Data_Notes", "Profile"),
            type: "POST",
            dataType: 'json',
            async: false,
            data: { Data: JSON.stringify(Data) },
            success: function (d) {
                alert(100);
            }
        });
    }
    function DeleteRow(RecNo) {
        var statusFlag = $("#txt_StatusFlag" + RecNo).val();
        if (statusFlag == "i")
            $("#txt_StatusFlag" + RecNo).val("m");
        else
            $("#txt_StatusFlag" + RecNo).val("d");
        $("#No_Row" + RecNo).attr("hidden", "true");
    }
})(Notes || (Notes = {}));
//# sourceMappingURL=Notes.js.map
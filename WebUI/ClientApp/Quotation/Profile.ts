
$(document).ready(() => {
    Profile.InitalizeComponent();
})

namespace Profile {

    var Model: DataAll = new DataAll();
    var JGrid: JsGrid = new JsGrid();

    var btnShow: HTMLButtonElement;
    var btnAdd: HTMLButtonElement;
    var btnSave: HTMLButtonElement; 
    var btnUpdate: HTMLButtonElement;
    var btnBack: HTMLButtonElement;

    var txtDateFrom: HTMLInputElement;
    var txtDateTo: HTMLInputElement;
    var txtTrDate: HTMLInputElement;

    var dbTypeF: HTMLSelectElement;
    var dbTypeH: HTMLSelectElement;

    var Flag_IsNew = false;

    export function InitalizeComponent() {


        InitalizeControls();
        InitalizeEvents();
        txtDateFrom.value = DateStartMonth();
        txtDateTo.value = GetDate();
        InitializeGrid();
        btnShow_onclick();

    }

    function InitalizeControls() {
        btnShow = document.getElementById("btnShow") as HTMLButtonElement;
        btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;
        btnSave = document.getElementById("btnSave") as HTMLButtonElement; 
        btnUpdate = document.getElementById("btnUpdate") as HTMLButtonElement;
        btnBack = document.getElementById("btnBack") as HTMLButtonElement; 
        ////////  
        dbTypeF = document.getElementById("dbTypeF") as HTMLSelectElement;
        dbTypeH = document.getElementById("dbTypeH") as HTMLSelectElement;
        ////////
        txtDateFrom = document.getElementById("txtDateFrom") as HTMLInputElement;
        txtDateTo = document.getElementById("txtDateTo") as HTMLInputElement;
        txtTrDate = document.getElementById("txtTrDate") as HTMLInputElement;


    }
    function InitalizeEvents() {
        //********************************Btn****************************
        btnShow.onclick = btnShow_onclick;
        btnAdd.onclick = btnAdd_onclick;
        btnSave.onclick = btnSave_onClick; 
        btnBack.onclick = btnBack_onclick;
        btnUpdate.onclick = btnUpdate_onclick; 
        //********************************onchange****************************

    }
    function InitializeGrid() {
        JGrid.ElementName = "JGrid";
        JGrid.PrimaryKey = "ID";
        JGrid.OnRowDoubleClicked = GridDoubleClick;
        JGrid.Paging = true;
        JGrid.PageSize = 10;
        JGrid.Sorting = true;
        JGrid.InsertionMode = JsGridInsertionMode.Binding;
        JGrid.Editing = false;
        JGrid.Inserting = false;
        JGrid.SelectedIndex = 1;
        JGrid.OnItemEditing = () => { };
        JGrid.Columns = [
            { title: "ID", name: "ID", type: "text", width: " ", visible: false },
            { title: "TrNo", name: "ID", type: "text", width: "5%" },
            { title: "TrDate", name: "TrDate", type: "text", width: "6%" },
            { title: "Type", name: "Type", type: "text", width: "7%" },
            { title: "Remars", name: "Remars", type: "text", width: "11%" },
            {
                title: "Delete",
                width: "5%",
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
            {
                title: "Copy",
                width: "5%",
                itemTemplate: (s: string, item: DataAll): HTMLInputElement => {
                    let txt: HTMLInputElement = document.createElement("input");
                    txt.type = "button";
                    txt.value = ("Copy");
                    txt.id = "butCopy" + item.ID;
                    txt.className = "btn btn-custon-four btn-info ";

                    txt.onclick = (e) => {
                        Copy(item.ID);
                    };
                    return txt;
                }
            },


        ];
        //JGrid.Bind();
    }

    function btnShow_onclick() {

        Ajax.CallAsync({
            url: Url.Action("Get_Data", "Profile"),
            data: { Name_txt: "All_Data" },
            success: (d) => {
                let result = JSON.parse(d)
                let res = result as Array<DataAll>;
                res = res.sort(dynamicSortNew("ID"));
                JGrid.DataSource = res;
                JGrid.Bind();


            }
        })


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
    function btnAdd_onclick() {
        CleanDetails();
        Enabled();
        Flag_IsNew = true;
        

    }
    function btnBack_onclick() {

        if (Flag_IsNew == true) {
            $('#Div_control').addClass('display_none');
            disabled();
        }
        else {
            GridDoubleClick();
        }
    } 
    function btnUpdate_onclick() {

        Enabled();

    }
    function GridDoubleClick() {
        CleanDetails();
        DisplayDetails(JGrid.SelectedItem)
        disabled();
    }
    function DisplayDetails(Selecteditem: DataAll) {
        DocumentActions.RenderFromModel(Selecteditem);
        txtTrDate.value = Selecteditem.TrDate;
        Flag_IsNew = false;
    }

    function Enabled() {
        $('._dis').removeAttr('disabled') 
        $('#id_div_Filter').addClass('disabledDiv')
        $('#btnBack').removeClass('display_none')
        $('#btnSave').removeClass('display_none')
        $('#btnUpdate').addClass('display_none')

    }
    function disabled() {
        $('._dis').attr('disabled', 'disabled') 
        $('#id_div_Filter').removeClass('disabledDiv')
        $('#btnBack').addClass('display_none')
        $('#btnSave').addClass('display_none')
        $('#btnUpdate').removeClass('display_none')


    }
    function CleanDetails() {
        $('#Div_control').removeClass('display_none');
        $("#Div_control :input").val(""); 
        txtTrDate.value = GetDate();
        dbTypeH.selectedIndex = 0; 
        let MaxID = JGrid.DataSource[0].ID;
        $('#txtTrNo').val(MaxID + 1);
        $('#txtTitle').focus();

        document.body.scrollTop = 800;
        document.documentElement.scrollTop = 800;
    }

    function Assign() {
        debugger
        Model = new DataAll();

        DocumentActions.AssignToModel(Model);//Insert Update 
        Model.TrDate = DateFormatRep(txtTrDate.value)
    }

    function Update(StatusFlag: string) {

        let Data = new Send_Data();

        Data.ID = Number($('#txtTrNo').val());
        Data.Name_Txt = "All_Data";
        Data.Model = JSON.stringify(Model);
        Data.TypeDataSouce = "DataAll";
        Data.StatusFlag = StatusFlag;

        debugger
        Ajax.CallAsync({
            url: Url.Action("Update_Data", "Profile"),
            data: { Data: JSON.stringify(Data) },
            success: (d) => {
                let result = JSON.parse(d)
                let res = result as Array<DataAll>;
                res = res.sort(dynamicSortNew("ID"));
                JGrid.DataSource = res;
                JGrid.Bind();

                JGrid.SelectedItem = Model;
                GridDoubleClick();

            }
        })
    }
    function Delete(ID: number) {

        let Data = new Send_Data();

        Data.ID = ID;
        Data.Name_Txt = "All_Data";
        Data.Model = JSON.stringify(Model);
        Data.TypeDataSouce = "DataAll";
        Data.StatusFlag = "d";

        debugger
        Ajax.CallAsync({
            url: Url.Action("Update_Data", "Profile"),
            data: { Data: JSON.stringify(Data) },
            success: (d) => {
                let result = JSON.parse(d)
                let res = result as Array<DataAll>;
                res = res.sort(dynamicSortNew("ID"));
                JGrid.DataSource = res;
                JGrid.Bind();


            }
        })

    }
    function Copy(ID: number) {

        let Data = new Send_Data();

        debugger
         

        let MaxID = JGrid.DataSource[0].ID;

        let NewData = JGrid.DataSource.filter(x => x.ID == ID);
        NewData[0].ID = MaxID + 1;
        Data.Model = JSON.stringify(NewData[0]);
        Data.ID = MaxID + 1;
        Data.Name_Txt = "All_Data";
        Data.TypeDataSouce = "DataAll";
        Data.StatusFlag = "u";

        debugger
        Ajax.CallAsync({
            url: Url.Action("Update_Data", "Profile"),
            data: { Data: JSON.stringify(Data) },
            success: (d) => {
                let result = JSON.parse(d)
                let res = result as Array<DataAll>;
                res = res.sort(dynamicSortNew("ID"));
                JGrid.DataSource = res;
                JGrid.Bind();


            }
        })

    }
}













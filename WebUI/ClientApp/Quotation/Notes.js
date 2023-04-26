$(document).ready(function () {
    Notes.InitalizeComponent();
});
var Notes;
(function (Notes) {
    var AllDisplay = new Array();
    function InitalizeComponent() {
        InitalizeControls();
        InitalizeEvents();
    }
    Notes.InitalizeComponent = InitalizeComponent;
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
})(Notes || (Notes = {}));
//# sourceMappingURL=Notes.js.map
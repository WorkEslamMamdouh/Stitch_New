﻿enum ScreenModes {
    Query, Add, Edit, Start, DisableMenu
}

const JsGridHeaderCenter: string = "JsGridHeaderCenter";
const TransparentButton: string = "TransparentButton";
var Modules = {
    Home: "Home",
    QuotationView: "QuotationView",
    Profile: "Profile",
    Users: "Users",
    Test: "Test",
    Quotation: "Quotation"


};
var MessageType = {
    Error: '2',
    Succeed: '1',
    Worning: '3',
}





var Keys = {
    Enter: "Enter"
};

function IsNullOrEmpty(value: string): boolean {
    if (value == null || value == "")
        return true;
    else
        return false;
}

function GetIndexByUseCode(idValue: string, BaseTableName: string, idFieldName: string, condition: string): string {
    let result = "";
    if (IsNullOrEmpty(idValue.toString()) || IsNullOrEmpty(BaseTableName) || IsNullOrEmpty(idFieldName)) {
        return result;
    } else {
        let result = Ajax.Call<string>({
            url: Url.Action("GetIndexByUseCode", "ClientTools"),
            data: { idValue: idValue.toString(), BaseTableName: BaseTableName, idFieldName: idFieldName, condition: condition }
        });
        return result;
    }
}

var SearchModulesNames = {
    cashCustomer: "cashCustomer",
    cashCustomerCategory: "cashCustomerCategory",
    categories: "categories",
    colours: "colours",
    CostCenter: "CostCenter",
    CustAdjType: "CustAdjType",
    customerInformation: "customerInformation",
    customers: "customers",
    groups: "groups",
    Icustomers: "Icustomers",
    items: "items",
    Items2: "Items2",
    marks: "marks",
    movements: "movements",
    nations: "nations",
    salesMan: "salesMan",
    TrReceipt: "TrReceipt",
    types: "types",
    uoms: "uoms",
    store: "store"
};

function Numeric(value: number): number {
    let result: number = 0;
    if (!isNaN(value)) {
        let strValue = value.toFixed(2);
        result = Number(strValue);// value;
    }
    return result;
}
function Fixed(value: number): number {
    return Number(value.toFixed(2));
}

interface JQuery {
    igGrid: any;
    igGridPaging: any;
    jsGrid: any;
    modal: any;
    waitMe: any;
    igGridFiltering: any;
    DataTable?: any;
    dataTable?: any;
}

interface JQueryStatic {
    event: any;
}

interface IIgGridColumn {
    key?: string;
    dataType?: string;
    headerText?: string;
    width?: string;
    template?: string;
    hidden?: boolean;
    filterable?: boolean;
}

interface datatableColumn {
    key?: string;
    dataType?: any;
    headerText?: string;
    width?: string;
    hidden?: boolean;
    data?: any;
    visible?: boolean;
    name?: string;
    title?: string;
}

interface IJsGridColumn {
    name?: string;
    nameDesc?: string;
    type?: string;
    title?: string;
    width?: string;
    validate?: any;
    id?: string;

    items?: any;
    valueField?: string;
    textField?: string;

    itemTemplate?: any;
    editTemplate?: any;
    insertTemplate?: any;
    headerTemplate?: any;

    css?: string;
    visible?: boolean;
    deleteButton?: boolean;
    cellRenderer?: any;
    formatter?: any,
}


namespace App {

   

    function AppendStyleSheet(fileName: string) {
        var lnk = document.createElement('link');
        lnk.href = "../css/" + fileName + ".css";
        lnk.rel = 'stylesheet';
        lnk.type = 'text/css';
        var $head = $("head");
        var $headlinklast = $head.find("link[rel='stylesheet']:first");
        $headlinklast.after(lnk);
        //document.getElementsByTagName("head")[0].appendChild(lnk);
    }
    function RemoveStyleSheet(fileName: string) {
        let href = "../css/" + fileName + ".css";
        $("link[rel=stylesheet][href~='" + href + "']").remove();
    }

}


function EnableBranchSelected() {
    let ddlBrachs: HTMLSelectElement = DocumentActions.GetElementById<HTMLSelectElement>("ddlBrachs");
    ddlBrachs.removeAttribute("disabled");
}



class GQ_GetUserBranch {
    public USER_CODE: string;
    public COMP_CODE: number;
    public BRA_CODE: number;
    public BRA_DESCL: string;
    public BRA_DESCE: string;
    public BRA_DESC: string;
    constructor() {
        this.USER_CODE = "";
        this.COMP_CODE = 0;
        this.BRA_CODE = 0;
        this.BRA_DESCL = "";
        this.BRA_DESCE = "";
        this.BRA_DESC = "";
    }
}

function InitalizeLayout() {
    //ControlsButtons.ModuleEffects();
}

function GetParameterByName(name) {
    let url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function CloseSearchBox() {
    $("#SearchBox").modal("hide");//.css("display", "none");
}
// mahroos
function NavigateToSearchResultKey(IndexNo: number, Navigate: () => void) {
    //    CloseSearchBox();
    //    SharedWork.PageIndex = IndexNo;
    //    Navigate();
    //    SharedWork.Render();
}
function NavigateToSearchResult(Navigate: () => void) {
    //    CloseSearchBox();
    //    let index = SearchGrid.SearchDataGrid.SelectedKey;
    //    SharedWork.PageIndex = Number(index);
    //    Navigate();
    //    SharedWork.Render();
}

//var Url = {
//    Action: (actionName: string, controllerName: string) => ($.ajax({
//        url: $("#GetActionUrl").val(),
//        async: false,
//        data: { actionName: actionName, controllerName: controllerName }
//    }).responseJSON).result as string
//};
var Url = {

    Action: (actionName: string, controllerName: string) => (
        location.origin + "/" + controllerName + "/" + actionName
    )
};

var Ajax = {
    Call: <T>(settings: JQueryAjaxSettings): T => {
        try {
            ////debugger
            let json = $.ajax({
                url: settings.url,
                data: settings.data,
                cache: false,
                async: false
            }).responseJSON;
            let result = json.result as T;
            return result;
        } catch (e) {
            $(".waitMe").removeAttr("style").fadeOut(200);
            return null;
        }
    },
    CallAsync: <T>(settings: JQueryAjaxSettings) => {
  
        //run_waitMe();
        $.ajax({
            type: settings.type,
            url: settings.url,
            data: settings.data,
            cache: false,
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            success: (d) => {
                settings.success(d, "", null);
                $(".waitMe").removeAttr("style").fadeOut(200);



            },
            error: () => { $(".waitMe").removeAttr("style").fadeOut(200); }
        })
    },
    Callsync: <T>(settings: JQueryAjaxSettings) => {
    
        //run_waitMe();
        $.ajax({

            type: settings.type,
            url: settings.url,
            data: settings.data,
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            cache: false,
            async: false,
            success: (d) => {
                settings.success(d, "", null);
                $(".waitMe").removeAttr("style").fadeOut(2500);



            },
            error: () => { $(".waitMe").removeAttr("style").fadeOut(2500); }
        })
    }
    ,
    Callsyncstart: <T>(settings: JQueryAjaxSettings) => {
        $.ajax({

            type: settings.type,
            url: settings.url,
            data: settings.data,
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            cache: false,
            async: false,
            success: (d) => {
                settings.success(d, "", null);
                $(".waitMe").removeAttr("style").fadeOut(2500);



            },
            error: () => { $(".waitMe").removeAttr("style").fadeOut(2500); }
        })
    }

};



function GetView(controllerName: string, ModuleCode: string) {
    //////debugger;
    //HomeComponent.UserAcsses(ModuleCode);

    let json = Ajax.CallAsync({

        //type: "GET",
        url: "OpenView",
        data: { controllerName: controllerName, ModuleCode: ModuleCode },
        cache: true,
        async: true,
        success: function (response) {
            window.open(Url.Action(controllerName + "Index", controllerName), "_self");

            //$("#cont").html(response);
        }
    });
    //back to home 
    //SysSession.ModuleCode = "Home";
}
function OpenPartial(ModuleCode: string, DivName: string) {

    let jsonf = $.ajax({
        type: "GET", //HTTP POST Method
        url: "OpenView", // Controller/View 
        data: { ModuleCode: ModuleCode },
        cache: false,
        async: false,
        success: function (response) {

            $("#" + DivName).html(response);
        }
    }).responseJSON;
}



function run_waitMe() {

    $('.please_wait').waitMe({
        effect: "win8",
        text: `...Pleasewait`,
        color: '#fff',
        sizeW: '80px',
        sizeH: '80px',
        textPos: "horizontal"
    });

    $('.please_wait').waitMe({
        effect: "win8",
        text: `...Pleasewait`,
        color: '#fff',
        sizeW: '400',
        waitTime: '40000',
        sizeH: '400'
    });
}

var RequiredClassName = " required";
var RequiredElements: Array<HTMLElement> = new Array<HTMLElement>();
var exchangeElements: Array<HTMLInputElement> = new Array<HTMLInputElement>();
var DocumentActions = {

    SetRequiredElements: (...elements: Array<HTMLElement>): void => {
        RequiredElements = new Array<HTMLElement>();
        for (var element of elements) {
            //element.className += RequiredClassName;
            RequiredElements.push(element);
        }
    },
    SetExchangeElements: (ArElement: HTMLInputElement, EnElement: HTMLInputElement) => {
        exchangeElements = new Array<HTMLInputElement>();
        exchangeElements.push(ArElement);
        exchangeElements.push(EnElement);
    },
    ValidateRequired: (): boolean => {
        //let result: boolean = false;
        let bools: Array<boolean> = new Array<boolean>();

        let elements = RequiredElements;// Array.prototype.slice.call(document.getElementsByClassName("required")) as Array<HTMLElement>;
        for (var element of elements) {
            switch (element.tagName.toUpperCase()) {
                case "INPUT":
                    if ((element as HTMLInputElement).type == "check") {
                        if ((element as HTMLInputElement).checked == false) {
                            bools.push(false);
                            element.style.borderColor = "red";
                        }
                        else {
                            bools.push(true);
                            element.style.borderColor = "";
                        }
                    }
                    else {
                        if ((element as HTMLInputElement).value == "") {
                            bools.push(false);
                            element.style.borderColor = "red";
                        }
                        else {
                            bools.push(true);
                            element.style.borderColor = "";
                        }
                    }
                    break;

                case "SELECT":
                    if ((element as HTMLSelectElement).value == "") {
                        bools.push(false);
                        element.style.borderColor = "red";
                    }
                    else {
                        bools.push(true);
                        element.style.borderColor = "";
                    }
                    break;


                default:
            }
        }

        if (exchangeElements.length > 0) {
            if (exchangeElements[0].value == "" && exchangeElements[1].value == "") {
                bools.push(false);
                exchangeElements[0].style.borderColor = "orange";
                exchangeElements[1].style.borderColor = "orange";
            }
            else {
                bools.push(true);
                exchangeElements[0].style.borderColor = "";
                exchangeElements[1].style.borderColor = "";
            }
        }
        let count = bools.filter(f => f == false).length;
        if (count > 0)
            return false;
        else
            return true;
    },

    RenderFromModel: (dataSource: any): void => {
        try {

            let properties = Object.getOwnPropertyNames(dataSource);
            for (var property of properties) {
                let element = document.getElementsByName(property)[0] as HTMLInputElement;
                if (element == null)
                    continue;
                if (property == "CreatedAt" || property == "UpdatedAt") {

                    if (String(dataSource[property]).indexOf("Date") > -1) {
                        element.value = DateTimeFormat(dataSource[property]);
                    }
                    else {
                        element.value = dataSource[property];
                    }
                    continue;
                }

                if (property == "CreatedBy" || property == "UpdatedBy") {
                    let value = String(dataSource[property]).toString();
                    if (value != null)
                        element.value = value;
                    else
                        element.value = "";
                    continue;
                }
                if (dataSource[property] == null) {
                    try {
                        element.value = dataSource[property]
                    } catch (e) {

                    }
                    finally {
                        continue;
                    }

                }
                if (element.type == "checkbox")
                    element.checked = <boolean>(dataSource[property]);
                else if (element.type == "date") {
                    element.value = dataSource[property];
                }
                else
                    element.value = dataSource[property];

            }
        } catch (e) {

        }
    },
    AssignToModel: <T>(model: T): T => {
        let properties = Object.getOwnPropertyNames(model);
        for (var property of properties) {
            let element = document.getElementsByName(property)[0] as HTMLInputElement;
            if (element != null) {
                if (element.type == "checkbox")
                    model[property] = element.checked;
                else
                    model[property] = element.value;
            }
        }
        return model;
    },
    //eslam elassal
    FillComboSingular: (dataSource: Array<any>, combo: HTMLSelectElement) => {
        if (combo != null) {
            for (let i: number = combo.length; i >= 0; i--) {
                combo.remove(i);
            }
            for (let i: number = 0; i < dataSource.length; i++) {
                //let code = dataSource[i][i];
                //let name = dataSource[i][dataSource[i]];
                combo.add(new Option(dataSource[i], i.toString()));
            }
        }

    },

    FillCombo: (dataSource: Array<any>, combo: HTMLSelectElement, codeField: any, textField: any) => {
        if (combo != null) {
            for (let i: number = combo.length; i >= 0; i--) {
                combo.remove(i);
            }
            for (let i: number = 0; i < dataSource.length; i++) {
                let code = dataSource[i][codeField];
                let name = dataSource[i][textField];
                combo.add(new Option(name, code));
            }
        }

    },
    FillComboFirstvalue: (dataSource: Array<any>, combo: HTMLSelectElement, codeField: any, textField: any, Name: any, Code: any) => {
        if (combo != null) {

            for (let i: number = combo.length; i >= 0; i--) {
                combo.remove(i);
            }
            combo.add(new Option(Name, Code));

            for (let i: number = 0; i < dataSource.length; i++) {
                let code = dataSource[i][codeField];
                let name = dataSource[i][textField];

                combo.add(new Option(name, code));
                if (name == Name && code == Code) {
                    combo.remove(i + 1);
                }
            }
        }

    },


    FillCombowithdefultAndEmptyChoice: (dataSource: Array<any>, combo: HTMLSelectElement, codeField: any, textField: any, NameDefult: any, EmptyChoiceName: any) => {
        if (combo != null) {
            for (let i: number = combo.length; i >= 0; i--) {
                combo.remove(i);
            }
            combo.add(new Option(NameDefult, null));
            for (let i: number = 0; i < dataSource.length; i++) {
                let code = dataSource[i][codeField];
                let name = dataSource[i][textField];
                let id = dataSource[i][codeField];

                combo.add(new Option(name, code));

            }

            //add empty
            combo.add(new Option(EmptyChoiceName, "-1"));

        }
    },

    FillCombowithdefult: (dataSource: Array<any>, combo: HTMLSelectElement, codeField: any, textField: any, NameDefult: any) => {
        if (combo != null) {
            for (let i: number = combo.length; i >= 0; i--) {
                combo.remove(i);
            }
            combo.add(new Option(NameDefult, null));
            for (let i: number = 0; i < dataSource.length; i++) {
                let code = dataSource[i][codeField];
                let name = dataSource[i][textField];
                let id = dataSource[i][codeField];
                //var x = true;
                //if (x==true) {
                //    $("#name").attr('id', id);

                //}
                //let test = 


                combo.add(new Option(name, code));
                //




            }

        }
    },
    //Filldefult: (combo: HTMLSelectElement, codeField: any, textField: any, NameDefult: any) => {
    //    if (combo != null) {
    //        for (let i: number = combo.length; i >= 0; i--) {
    //            combo.remove(i);
    //        }
    //        combo.add(new Option(NameDefult, null));              

    //    }
    //},
    FillComboWithEmpty: (dataSource: Array<any>, combo: HTMLSelectElement, codeField: any, textField: any) => {
        for (let i: number = combo.length; i >= 0; i--) {
            combo.remove(i);
        }
        combo.add(new Option("", ""));
        for (let i: number = 0; i < dataSource.length; i++) {
            let code = dataSource[i][codeField];
            let name = dataSource[i][textField];
            combo.add(new Option(name, code));
        }
    },

    GetElementById: <T extends HTMLElement>(id: string): T => {
        let element: T = document.getElementById(id) as T;
        return element;
    },
    CreateElement: <T extends HTMLElement>(id: string) => {
        let element: T = document.createElement(id) as T;
        return element;
    }
};

function DateFormatNew(dateForm: string): string {

    try {
        var date: Date = new Date();
        let myDate: string = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(dateForm);
        }


        let yy = date.getFullYear();
        let mm = (date.getMonth() + 1);
        let dd = date.getDate();

        let year = yy;
        let month = (mm < 10) ? ("0" + mm.toString()) : mm.toString();
        let day = (dd < 10) ? ("0" + dd.toString()) : dd.toString();

        //The specified value "'2018-01-15'" does not conform to the required format, "yyyy-MM-dd".
        var startDate = year + "-" + day + "-" + month ;
        let form_date = startDate;
        return form_date;
    } catch (e) {
        return DateFormatNew((new Date()).toString());
    }
}


function DateFormat(dateForm: string): string {

    try {
        var date: Date = new Date();
        let myDate: string = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(dateForm);
        }


        let yy = date.getFullYear();
        let mm = (date.getMonth() + 1);
        let dd = date.getDate();

        let year = yy;
        let month = (mm < 10) ? ("0" + mm.toString()) : mm.toString();
        let day = (dd < 10) ? ("0" + dd.toString()) : dd.toString();

        //The specified value "'2018-01-15'" does not conform to the required format, "yyyy-MM-dd".
        var startDate = year + "-" + month + "-" + day;
        let form_date = startDate;
        return form_date;
    } catch (e) {
        return DateFormat((new Date()).toString());
    }
}

function DateFormatRep(dateForm: string): string {

    try {
        var date: Date = new Date();
        let myDate: string = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(dateForm);
        }


        let yy = date.getFullYear();
        let mm = (date.getMonth() + 1);
        let dd = date.getDate();

        let year = yy;
        let month = (mm < 10) ? ("0" + mm.toString()) : mm.toString();
        let day = (dd < 10) ? ("0" + dd.toString()) : dd.toString();

        //The specified value "'2018-01-15'" does not conform to the required format, "dd/MM/yyyy".
        var startDate = year+ "-" + month + "-" + day;



        return startDate;
    } catch (e) {
        return DateFormatRep((new Date()).toString());
    }
}

 

function DateStartMonth() {

    var today: Date = new Date();
    var dd: string = today.getDate().toString();
    var ReturnedDate: string;
    var mm: string = (today.getMonth() + 1).toString();
    var yyyy = today.getFullYear();
    if (Number(dd) < 10) {
        dd = ('0' + dd);
    }
    if (Number(mm) < 10) {
        mm = ('0' + mm);
    }
    ReturnedDate = yyyy + '-' + mm + '-' + '01';
    return ReturnedDate;
} 

function GetTime() {
    var date: Date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? 0 + minutes : minutes;
    //var strTime = hours + ':' + minutes + ' ' + ampm;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    let TrTime = strTime;
    return TrTime;
}




function DateTimeFormat(dateForm: string): string {
    try {

        var date: Date = new Date();
        let myDate: string = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(dateForm);
        }


        let yy = date.getFullYear();
        let mm = (date.getMonth() + 1);
        let dd = date.getDate();

        let hh = (date.getHours());
        let mn = (date.getMinutes());
        let ss = (date.getSeconds());

        let year = yy;
        let month = (mm < 10) ? ("0" + mm.toString()) : mm.toString();
        let day = (dd < 10) ? ("0" + dd.toString()) : dd.toString();
        let hour = (hh < 10) ? ("0" + hh.toString()) : hh.toString();
        let Minute = (mn < 10) ? ("0" + mn.toString()) : mn.toString();
        let Second = (ss < 10) ? ("0" + ss.toString()) : ss.toString();


        var startDate = year + "-" + month + "-" + day + "T" + hour + ":" + Minute; //+ ":" + Second;
        let form_date = startDate;
        return form_date;
    } catch (e) {
        return DateFormat((new Date()).toString());
    }
}

 
  
function DateTimeFormatWithoutT(dateForm: string): string {
    try {

        var date: Date = new Date();
        let myDate: string = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(dateForm);
        }


        let yy = date.getFullYear();
        let mm = (date.getMonth() + 1);
        let dd = date.getDate();

        let hh = (date.getHours());
        let mn = (date.getMinutes());
        let ss = (date.getSeconds());

        let year = yy;
        let month = (mm < 10) ? ("0" + mm.toString()) : mm.toString();
        let day = (dd < 10) ? ("0" + dd.toString()) : dd.toString();
        let hour = (hh < 10) ? ("0" + hh.toString()) : hh.toString();
        let Minute = (mn < 10) ? ("0" + mn.toString()) : mn.toString();
        let Second = (ss < 10) ? ("0" + ss.toString()) : ss.toString();


        var startDate = year + "-" + month + "-" + day + " " + hour + ":" + Minute; //+ ":" + Second;
        let form_date = new Date(startDate);
        return form_date.toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
    } catch (e) {
        return DateFormat(new Date().toString());
    }
}

 

function ClearGrid<T>(_Grid: JsGrid = new JsGrid(), arr: Array<T>) {
    arr = new Array();
    _Grid.DataSource = arr;
    _Grid.Bind();
}



function HeaderTemplate(headerTitle: string, element: HTMLElement): HTMLTableElement {
    let tbl = DocumentActions.CreateElement<HTMLTableElement>("table");
    tbl.style.width = "100%";
    let headerTr = DocumentActions.CreateElement<HTMLTableRowElement>("tr");
    headerTr.innerHTML = "<td style='text-align:center;'>" + headerTitle + "</td>";

    let cellTr = DocumentActions.CreateElement<HTMLTableRowElement>("tr");
    let cell = DocumentActions.CreateElement<HTMLTableCellElement>("td");
    cell.style.textAlign = "center";
    cell.appendChild(element);
    cellTr.appendChild(cell);

    tbl.appendChild(headerTr);
    tbl.appendChild(cellTr);

    return tbl;
}
//eslam 25 oct 2020
function HeaderTemplate_ThreeElements(headerTitle: string, element_1: HTMLElement, element_2: HTMLElement): HTMLTableElement {
    let tbl = DocumentActions.CreateElement<HTMLTableElement>("table");

    tbl.style.width = "100%";
    let headerTr = DocumentActions.CreateElement<HTMLTableRowElement>("tr");
    headerTr.innerHTML = "<td style='text-align:center;'>" + headerTitle + "</td>";

    let cellTr = DocumentActions.CreateElement<HTMLTableRowElement>("tr");
    let cell = DocumentActions.CreateElement<HTMLTableCellElement>("td");

    cell.style.textAlign = "center";
    cell.appendChild(element_1);
    cell.appendChild(element_2);
    cellTr.appendChild(cell);


    tbl.appendChild(headerTr);
    tbl.appendChild(cellTr);

    return tbl;
}
class Resources {
    key: string;
    value: string;
}


function CreateElement(typeElement: string, className: string, defaultValue: string, minValue: string, id: string, step: string): HTMLInputElement {
    typeElement = typeElement.toLocaleLowerCase();
    let element = DocumentActions.CreateElement<HTMLInputElement>("input");
    element.className = className;
    element.id = "h_" + id;
    element.type = typeElement;
    element.value = defaultValue;
    element.min = minValue;
    element.step = step;
    return element;
}
//eslam 25 oct 2020
function CreateLabelElement(defaultValue: string, id: string): HTMLElement {
    let element = DocumentActions.CreateElement<HTMLElement>("label");
    element.style.textAlign = "center";
    element.id = id;
    element.innerText = defaultValue;
    return element;
}


function SetSearchControlName(id: string) {
    $("#SearchControlName").val(id);
}

class CodeDesciptionModel {
    public Code: string;
    public Description: string;
}

function WorningMessage(msg_Ar: string, msg_En: string, tit_ar: string = "تنبيه", tit_en: string = "Worning", OnOk?: () => void) {
 
    switch ("ar") {

        case "ar":
            MessageBox.Show(msg_En, tit_en, OnOk);
            focus();
            break;
       
    }
}

function DisplayMassage(msg_Ar: string, msg_En: string, msg_type: string, OnOk?: () => void) {
 
        $('#Text_Massage').html(msg_Ar);

    if (msg_type == '1') {


        $('#DivMassage').attr('class', 'col-lg-12  margingred  borderred');
        $('#DivMassage').attr('style', ' border-style: solid;border: solid;border-color: #5cb702; background-color : #009605 !important	');
        $('#Text_Massage').attr('style', 'text-align: center;font-weight: bold;color: #ffffff;margin-top: 14px; font-size: 24px; margin-left: 10%; margin-right: 6%;');

        setTimeout(function () { $('#DivMassage').attr('style', ' border-style: solid;border: solid;border-color: #5cb702; display: none; '); }, 6000);


    }
    else if (msg_type == '2') {

        //$('#DivMassage').attr('class', 'col-lg-12  margingred  borderred');
        //$('#DivMassage').attr('style', ' border-style: solid;border: solid;border-color: #e41b1b; background-color : #4612128f !important	');
        //$('#Text_Massage').attr('style', 'text-align: center;font-weight: bold;color: #e41b1b;margin-top: 14px; font-size: 24px; margin-left: 10%;  margin-right: 6%;');

        //setTimeout(function () { $('#DivMassage').attr('style', ' border-style: solid;border: solid;border-color: #e41b1b; display: none; '); }, 6000);

        $('#DivMassage').attr('class', 'col-lg-12  margingred  borderred');
        $('#DivMassage').attr('style', ' border-style: solid;border: solid;border-color: #e41b1b; background-color : #de0000 !important	');
        $('#Text_Massage').attr('style', 'text-align: center;font-weight: bold;color: #ffffff;margin-top: 14px; font-size: 24px; margin-left: 10%;  margin-right: 6%;');

        setTimeout(function () { $('#DivMassage').attr('style', ' border-style: solid;border: solid;border-color: #e41b1b; display: none; '); }, 6000);
    }
    else if (msg_type == '3') {

        //$('#DivMassage').attr('class', 'col-lg-12  margingred  borderred');
        //$('#DivMassage').attr('style', ' border-style: solid;border: solid;border-color: #f0ad4e; background-color : #123a468f !important	');
        //$('#Text_Massage').attr('style', 'text-align: center;font-weight: bold;color: #f0ad4e;margin-top: 14px; font-size: 24px; margin-left: 10%;  margin-right: 6%;');

        //setTimeout(function () { $('#DivMassage').attr('style', ' border-style: solid;border: solid;border-color: #e41b1b; display: none; '); }, 6000);


        $('#DivMassage').attr('class', 'col-lg-12  margingred  borderred');
        $('#DivMassage').attr('style', ' border-style: solid;border: solid;border-color: #f0ad4e; background-color : #FF7900 !important	');
        $('#Text_Massage').attr('style', 'text-align: center;font-weight: bold;color: #ffffff;margin-top: 14px; font-size: 24px; margin-left: 10%;  margin-right: 6%;');

        setTimeout(function () { $('#DivMassage').attr('style', ' border-style: solid;border: solid;border-color: #e41b1b; display: none; '); }, 6000);

    }
}


function DisplayMassage_Processes(msg_Ar: string, msg_En: string, msg_type: string, OnOk?: () => void) {
 
        $('#Text_Massage').html(msg_Ar);

    if (msg_type == '1') {
        $('#DivMassage').attr('class', 'col-lg-12  margingred  borderred');
        $('#DivMassage').attr('style', ' border-style: solid;border: solid;border-color: #5cb702; background-color : #000000 !important	');
        $('#Text_Massage').attr('style', 'text-align: center;font-weight: bold;color: #5cb702;margin-top: 14px; font-size: 24px; margin-left: 10%; margin-right: 6%;');

        setTimeout(function () { $('#DivMassage').attr('style', ' border-style: solid;border: solid;border-color: #5cb702; display: none; '); }, 7000);


    }
    else if (msg_type == '2') {
        $('#DivMassage').attr('class', 'col-lg-12  margingred  borderred');
        $('#DivMassage').attr('style', ' border-style: solid;border: solid;border-color: #e41b1b; background-color : #000000 !important	');
        $('#Text_Massage').attr('style', 'text-align: center;font-weight: bold;color: #e41b1b;margin-top: 14px; font-size: 24px; margin-left: 10%;  margin-right: 6%;');

        setTimeout(function () { $('#DivMassage').attr('style', ' border-style: solid;border: solid;border-color: #e41b1b; display: none; '); }, 7000);
    }
    else if (msg_type == '3') {
        $('#DivMassage').attr('class', 'col-lg-12  margingred  borderred');
        $('#DivMassage').attr('style', ' border-style: solid;border: solid;border-color: #f0ad4e; background-color : #000000 !important	');
        $('#Text_Massage').attr('style', 'text-align: center;font-weight: bold;color: #f0ad4e;margin-top: 14px; font-size: 24px; margin-left: 10%;  margin-right: 6%;');

        setTimeout(function () { $('#DivMassage').attr('style', ' border-style: solid;border: solid;border-color: #e41b1b; display: none; '); }, 7000);

    }
}

function Errorinput(input: any) {

    if (input.selector != null) {

        $('' + input.selector + '').addClass('text_Mandatory');
        $('' + input.selector + '').focus();
        setTimeout(function () { $('' + input.selector + '').removeClass('text_Mandatory'); }, 5000);
    }
    else {
        input.classList.add('text_Mandatory');
        input.focus();
        setTimeout(function () { input.classList.remove('text_Mandatory'); }, 5000);
    }

}

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($('#'+element).val()).select();
    document.execCommand("copy");
    $temp.remove();
    $('#' + element).focus();
}

function findIndexInData(data, property, value) {
    var result = -1;
    data.some(function (item, i) {
        if (item[property] === value) {
            result = i;
            return true;
        }
    });
    return result;
}


function ConfirmMessage(msg_Ar: string = "تمت عملية الحفظ  بنجاح", msg_En: string = "Data Saved Successfully", tit_ar: string = "تأكيد", tit_en: string = "Confirm", OnOk?: () => void) {
 
    switch ("ar") {
        case "ar":
            MessageBox.Show(msg_Ar, tit_ar, OnOk);
            break;
       
    }
}
function ConfirmMessagee(msg_Ar: string = "تمت عملية الحفظ  بنجاح", msg_En: string = "Data Saved Successfully", tit_ar: string = "تأكيد", tit_en: string = "Confirm", OnOk?: () => number) {
    
    switch ("ar") {
        case "ar":
            MessageBox.Show(msg_Ar, tit_ar, OnOk);
            return 1;
      
    }

}
function WorningMessageDailog(msg_Ar: string, msg_En: string, tit_ar: string = "تنبيه", tit_en: string = "Worning", OnOk?: () => void, OnCancel?: () => void) {
 
    switch ("ar") {
        case "ar":
            MessageBox.Ask(msg_Ar, tit_ar, OnOk, OnCancel);
            break;
     
    }
}
//function MessageDailog(msg_Ar: string, msg_En: string, tit_ar: string = "تنبيه", tit_en: string = "Worning") {
//     
//    switch (SysSession.CurrentEnvironment.ScreenLanguage) {
//        case "ar":
//            MessageBox.MSgBox(msg_Ar, tit_ar);
//            break;
//        case "en":
//            MessageBox.MSgBox(msg_En, tit_en);
//            break;
//    }
//}
function AddDate(prd: Number, Sdate: Date, count: number): Date {

    let Tdate: Date;
    Tdate = Sdate; //new Date();
    switch (prd) {
        case 1: //hours

            Tdate.setHours(Sdate.getHours() + count);
            break;
        case 2: //Days
            Tdate.setDate(Sdate.getDate() + (count - 1));
            break;
        case 3: //week
            Tdate.setDate(Sdate.getDate() + ((7 * count) - 1));
            break;
        case 4: //month
            // Loop from cur month with Qty * Prd times 
            Tdate = Sdate;
            Tdate.setMonth(Tdate.getMonth() + count);
            Tdate.setDate(Tdate.getDate() + - 1);
            break;
        case 5: //year
            // add 365 or 366 days 
            Tdate = Sdate;
            Tdate.setFullYear(Tdate.getFullYear() + count);
            Tdate.setDate(Tdate.getDate() + - 1);
            break;
    }
    return Tdate;
}


function GetResourceByName(Sourcekey: string): string {
    var result: string = "";
    Ajax.Callsync({
        url: Url.Action("GetResourceByName", "ClientTools"),
        data: { key: Sourcekey },
        success: (d) => {
            result = d.result as string;
        }
    });
    return result;
}

function GetResourceList(Sourcekey: string): any {

    var result = Ajax.Call<any>({
        url: Url.Action("GetResourceNames", "ClientTools"),
        data: { _prefix: Sourcekey },
        success: (d) => {

            result = JSON.parse(d.result) as any;
        }
    });
    return result;
}
  
function GetDate() {
    var today: Date = new Date();
    var dd: string = today.getDate().toString();
    var ReturnedDate: string;
    var mm: string = (today.getMonth() + 1).toString();
    var yyyy = today.getFullYear();
    if (Number(dd) < 10) {
        dd = ('0' + dd);
    }
    if (Number(mm) < 10) {
        mm = ('0' + mm);
    }
    ReturnedDate = yyyy + '-' + mm + '-' + dd;
    return ReturnedDate;
}

function GetDateyyyy_1() {
    var today: Date = new Date();
    var dd: string = today.getDate().toString();
    var ReturnedDate: string;
    var mm: string = (today.getMonth() + 1).toString();
    var yyyy = Number(today.getFullYear()) + 1
    if (Number(dd) < 10) {
        dd = ('0' + dd);
    }
    if (Number(mm) < 10) {
        mm = ('0' + mm);
    }
    ReturnedDate = yyyy + '-' + mm + '-' + dd;
    return ReturnedDate;
}

function SelectFristRow(NameID) { 
    var dropdown: HTMLSelectElement = document.getElementById('' + NameID + '') as HTMLSelectElement;

    // Loop through the options and find the first visible option
    for (var i = 0; i < dropdown.options.length; i++) { 
        var option = dropdown.options[i];
        let ch_none = false;
        for (var u = 0; u < option.classList.length; u++) {

            if (option.classList[u] == 'display_none') {
                ch_none = true;
            }
        }

        if (ch_none == false) { 
            // Set the "selected" property to true for the first visible option
            option.selected = true;
            break; // Break the loop once the first visible option is found
        }

    }
}

function PushNotification(Message: string) {
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        var notification = new Notification(Message);
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission(function (permission) {
            // If the user is okay, let's create a notification
            if (permission === "granted") {
                var notification = new Notification(Message);
            }
        });
    }
}

function showNonfictionMessage(message) {
    debugger
    const nonfictionMessageContainer = document.getElementById("nonfictionMessageContainer");
    const nonfictionMessage = document.getElementById("nonfictionMessage");

    if (nonfictionMessageContainer && nonfictionMessage) {
        nonfictionMessage.textContent = message;
        nonfictionMessageContainer.style.display = "block";

        // Hide the message after a certain time (e.g., 5 seconds)
        setTimeout(function () {
            nonfictionMessageContainer.style.display = "none";
        }, 10000); // 5000 milliseconds = 5 seconds
    }
}


function ShowMessage(Message: string) {
    const toastContainer = document.getElementById('toastContainer');

    // Create a new toast element
    const toastElement = document.createElement('div');
    toastElement.classList.add('toast');
    toastElement.textContent = Message+' !';

    // Append the toast element to the container
    toastContainer.appendChild(toastElement);

    // Display the toast using CSS animations
    setTimeout(function () {
        toastElement.style.opacity = '1';
        toastElement.style.transform = 'translateY(0)';
    }, 100);

    // Hide the toast after a delay (adjust as needed)
    setTimeout(function () {
        hideToast(toastElement);
    }, 5000);
}

function hideToast(toastElement) {
    toastElement.style.opacity = '0';
    toastElement.style.transform = 'translateY(100%)';

    // Remove the toast element from the container after the animation ends
    toastElement.addEventListener('transitionend', function () {
        toastElement.remove();
    });
}


// Call the showAlert() function with your desired message


// Call the showAlert() function to display the alert


// Show the alert with a custom message


//function CreateListMaleFemale(): HTMLSelectElement {
//    var offDay = [
//        {
//            Name_Ar: "ولد",
//            Name_En: "Male",
//            Id: 1
//        },
//        {
//            Name_Ar: "بنت",
//            Name_En: "Female",
//            Id: 0
//        },
//    ];
//    let element = document.createElement("select") as HTMLSelectElement;
//    element.className = "form-control input-sm";
//    switch (SharedWork.Session.Language) {
//        case "ar":
//            for (var item of offDay) {
//                element.options.add(new Option(item.Name_Ar, item.Id.toString()));
//            }
//            break;
//        case "en":
//            for (var item of offDay) {
//                element.options.add(new Option(item.Name_En, item.Id.toString()));
//            }
//            break;
//    }
//    return element;
//}

function OpenPopUp(moduleCode: string, PopupBody: string, PopupDialog: string) {

    let json = $.ajax({

        type: "GET",
        url: "OpenView",
        data: { ModuleCode: moduleCode },
        cache: false,
        async: false,
        success: function (response) {
            $("#" + PopupBody).html(response);
            //$("#PopupDialog").modal("show");
            $("#" + PopupDialog).modal('show');
            $("#" + PopupDialog).modal({
                refresh: true
            });

            //var val = $("#rpTitle").text();
            //$("#TitleSpanRep").html(val);
        }
    });

}
//to be validated  in insert / update all trnasacations 
function CheckDate(TrDate: string, StDt: string, EdDt: string): boolean {


    ////debugger
    var check = Date.parse(TrDate);
    var from = Date.parse(StDt);
    var to = Date.parse(EdDt);

    if ((check <= to && check >= from))
        return (true);
    else
        return false;



}

function ThousandsSeparator(num: number): string {
    let numAsString = num.toString();

    let characters = numAsString.split("").reverse();

    let parts = [];

    for (let i = 0; i < characters.length; i += 3) {
        let part = characters.slice(i, i + 3).reverse().join("");

        parts.unshift(part);
    }

    return parts.join(",");
}
  
//    // msgtype : 1 : Sucess , 2: Fetal Error , 3: Data Entry Error 
//    if (Env.ScreenLanguage == "en")
//        $('#Text_Massage').html(msg_En);
//    else
//        $('#Text_Massage').html(msg_Ar);


//        $('#DivMassage').attr('class', 'col-lg-12  margingred  borderred');
//        $('#DivMassage').attr('style', ' border-style: solid;border: solid;border-color: #e41b1b; background-color : #de0000 !important	');
//        $('#Text_Massage').attr('style', 'text-align: center;font-weight: bold;color: #ffffff;margin-top: 14px; font-size: 24px; margin-left: 10%;  margin-right: 6%;');

//    setTimeout(function () { $('#DivMassage').attr('style', ' border-style: solid;border: solid;border-color: #e41b1b; display: none; '); }, 2000);
//    document.cookie = "Inv1_systemProperties=" + null + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
//    document.cookie = "Inv1_Privilage=" + null + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
//    document.cookie = "Privilage=" + null + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
//   HomeComponent.LogoutUserApi();
//   window.open(Url.Action("LoginIndex", "Login"), "_self");

//}



function SetCustomerType(Transcode: number, Iscredit: number, SlsType: string) {

    var Ct: CustomerType = new CustomerType();

    Ct.IsCredit = Iscredit;

    if (Transcode == 1) { //  Standard
        Ct.IsPersonal = false;
    }
    if (Transcode == 2) { //  Simplified
        Ct.IsPersonal = true;
    }
    if (SlsType == 'W') { //  Wholesale 
        Ct.SalesInvoiceNature = 1;
    }
    if (SlsType == 'R') { //  Retail
        Ct.SalesInvoiceNature = 2;
    }

    return Ct;

}



function dynamicSortNew(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (b, a) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}



function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}


function CompareTime(t1: string, t2: string): number {
    // add days 
    ////debugger;

    var h1: number = Number(t1.slice(0, 2));
    var m1: number = Number(t1.slice(3, 5));

    var h2: number = Number(t2.slice(0, 2));
    var m2: number = Number(t2.slice(3, 5));
    var h3: number = (h1 - h2) * 60 + (m1 - m2);

    return h3;

}



function DateStartYear() {

    var today: Date = new Date();
    var dd: string = today.getDate().toString();
    var ReturnedDate: string;
    var mm: string = (today.getMonth() + 1).toString();
    var yyyy = today.getFullYear();
    if (Number(dd) < 10) {
        dd = ('0' + dd);
    }
    if (Number(mm) < 10) {
        mm = ('0' + mm);
    }
    ReturnedDate = yyyy + '-' + '01' + '-' + '01';
    return ReturnedDate;
}


function getMonthsDifference(date1, date2) {
    // Create Date objects from the input 
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    // Calculate the difference in years and months
    let yearsDiff = d2.getFullYear() - d1.getFullYear();
    let monthsDiff = d2.getMonth() - d1.getMonth();

    // Handle cases where the dates are not on the same day of the month
    if (d2.getDate() < d1.getDate()) {
        monthsDiff -= 1;
    }

    // Convert years difference to months and add to the months difference
    monthsDiff += yearsDiff * 12;

    return monthsDiff;
}


function getYearDifference(date1, date2) {
    // Create Date objects from the input
    debugger
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    // Calculate the difference in years and months
    let yearsDiff = d2.getFullYear() - d1.getFullYear();
  

    // Convert years difference to months and add to the months difference 

    return yearsDiff;
}



function Event_key(key: string, Nameinput: string, NameBtnEvent: string) {

    var input = document.getElementById(Nameinput);
    input.addEventListener("keypress", function (event) {
        if (event.key === key) {
            event.preventDefault();
            document.getElementById(NameBtnEvent).click();
        }
    });
}
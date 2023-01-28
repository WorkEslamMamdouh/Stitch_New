var ScreenModes;
(function (ScreenModes) {
    ScreenModes[ScreenModes["Query"] = 0] = "Query";
    ScreenModes[ScreenModes["Add"] = 1] = "Add";
    ScreenModes[ScreenModes["Edit"] = 2] = "Edit";
    ScreenModes[ScreenModes["Start"] = 3] = "Start";
    ScreenModes[ScreenModes["DisableMenu"] = 4] = "DisableMenu";
})(ScreenModes || (ScreenModes = {}));
var JsGridHeaderCenter = "JsGridHeaderCenter";
var TransparentButton = "TransparentButton";
var Modules = {
    Home: "Home",
    QuotationView: "QuotationView",
    Companies: "Companies",
    Users: "Users",
    Test: "Test",
    Quotation: "Quotation"
};
var MessageType = {
    Error: '2',
    Succeed: '1',
    Worning: '3',
};
var Keys = {
    Enter: "Enter"
};
function IsNullOrEmpty(value) {
    if (value == null || value == "")
        return true;
    else
        return false;
}
function GetIndexByUseCode(idValue, BaseTableName, idFieldName, condition) {
    var result = "";
    if (IsNullOrEmpty(idValue.toString()) || IsNullOrEmpty(BaseTableName) || IsNullOrEmpty(idFieldName)) {
        return result;
    }
    else {
        var result_1 = Ajax.Call({
            url: Url.Action("GetIndexByUseCode", "ClientTools"),
            data: { idValue: idValue.toString(), BaseTableName: BaseTableName, idFieldName: idFieldName, condition: condition }
        });
        return result_1;
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
function Numeric(value) {
    var result = 0;
    if (!isNaN(value)) {
        var strValue = value.toFixed(2);
        result = Number(strValue); // value;
    }
    return result;
}
function Fixed(value) {
    return Number(value.toFixed(2));
}
var App;
(function (App) {
    function AppendStyleSheet(fileName) {
        var lnk = document.createElement('link');
        lnk.href = "../css/" + fileName + ".css";
        lnk.rel = 'stylesheet';
        lnk.type = 'text/css';
        var $head = $("head");
        var $headlinklast = $head.find("link[rel='stylesheet']:first");
        $headlinklast.after(lnk);
        //document.getElementsByTagName("head")[0].appendChild(lnk);
    }
    function RemoveStyleSheet(fileName) {
        var href = "../css/" + fileName + ".css";
        $("link[rel=stylesheet][href~='" + href + "']").remove();
    }
})(App || (App = {}));
function EnableBranchSelected() {
    var ddlBrachs = DocumentActions.GetElementById("ddlBrachs");
    ddlBrachs.removeAttribute("disabled");
}
var GQ_GetUserBranch = /** @class */ (function () {
    function GQ_GetUserBranch() {
        this.USER_CODE = "";
        this.COMP_CODE = 0;
        this.BRA_CODE = 0;
        this.BRA_DESCL = "";
        this.BRA_DESCE = "";
        this.BRA_DESC = "";
    }
    return GQ_GetUserBranch;
}());
function InitalizeLayout() {
    //ControlsButtons.ModuleEffects();
}
function GetParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function CloseSearchBox() {
    $("#SearchBox").modal("hide"); //.css("display", "none");
}
// mahroos
function NavigateToSearchResultKey(IndexNo, Navigate) {
    //    CloseSearchBox();
    //    SharedWork.PageIndex = IndexNo;
    //    Navigate();
    //    SharedWork.Render();
}
function NavigateToSearchResult(Navigate) {
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
    Action: function (actionName, controllerName) { return (location.origin + "/" + controllerName + "/" + actionName); }
};
var Ajax = {
    Call: function (settings) {
        try {
            ////debugger
            var json = $.ajax({
                url: settings.url,
                data: settings.data,
                cache: false,
                async: false
            }).responseJSON;
            var result = json.result;
            return result;
        }
        catch (e) {
            $(".waitMe").removeAttr("style").fadeOut(200);
            return null;
        }
    },
    CallAsync: function (settings) {
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
            success: function (d) {
                settings.success(d, "", null);
                $(".waitMe").removeAttr("style").fadeOut(200);
            },
            error: function () { $(".waitMe").removeAttr("style").fadeOut(200); }
        });
    },
    Callsync: function (settings) {
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
            success: function (d) {
                settings.success(d, "", null);
                $(".waitMe").removeAttr("style").fadeOut(2500);
            },
            error: function () { $(".waitMe").removeAttr("style").fadeOut(2500); }
        });
    },
    Callsyncstart: function (settings) {
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
            success: function (d) {
                settings.success(d, "", null);
                $(".waitMe").removeAttr("style").fadeOut(2500);
            },
            error: function () { $(".waitMe").removeAttr("style").fadeOut(2500); }
        });
    }
};
function GetView(controllerName, ModuleCode) {
    //////debugger;
    //HomeComponent.UserAcsses(ModuleCode);
    var json = Ajax.CallAsync({
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
function OpenPartial(ModuleCode, DivName) {
    var jsonf = $.ajax({
        type: "GET",
        url: "OpenView",
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
        text: "...Pleasewait",
        color: '#fff',
        sizeW: '80px',
        sizeH: '80px',
        textPos: "horizontal"
    });
    $('.please_wait').waitMe({
        effect: "win8",
        text: "...Pleasewait",
        color: '#fff',
        sizeW: '400',
        waitTime: '40000',
        sizeH: '400'
    });
}
var RequiredClassName = " required";
var RequiredElements = new Array();
var exchangeElements = new Array();
var DocumentActions = {
    SetRequiredElements: function () {
        var elements = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            elements[_i] = arguments[_i];
        }
        RequiredElements = new Array();
        for (var _a = 0, elements_1 = elements; _a < elements_1.length; _a++) {
            var element = elements_1[_a];
            //element.className += RequiredClassName;
            RequiredElements.push(element);
        }
    },
    SetExchangeElements: function (ArElement, EnElement) {
        exchangeElements = new Array();
        exchangeElements.push(ArElement);
        exchangeElements.push(EnElement);
    },
    ValidateRequired: function () {
        //let result: boolean = false;
        var bools = new Array();
        var elements = RequiredElements; // Array.prototype.slice.call(document.getElementsByClassName("required")) as Array<HTMLElement>;
        for (var _i = 0, elements_2 = elements; _i < elements_2.length; _i++) {
            var element = elements_2[_i];
            switch (element.tagName.toUpperCase()) {
                case "INPUT":
                    if (element.type == "check") {
                        if (element.checked == false) {
                            bools.push(false);
                            element.style.borderColor = "red";
                        }
                        else {
                            bools.push(true);
                            element.style.borderColor = "";
                        }
                    }
                    else {
                        if (element.value == "") {
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
                    if (element.value == "") {
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
        var count = bools.filter(function (f) { return f == false; }).length;
        if (count > 0)
            return false;
        else
            return true;
    },
    RenderFromModel: function (dataSource) {
        try {
            var properties = Object.getOwnPropertyNames(dataSource);
            for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
                var property = properties_1[_i];
                var element = document.getElementsByName(property)[0];
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
                    var value = String(dataSource[property]).toString();
                    if (value != null)
                        element.value = value;
                    else
                        element.value = "";
                    continue;
                }
                if (dataSource[property] == null) {
                    try {
                        element.value = dataSource[property];
                    }
                    catch (e) {
                    }
                    finally {
                        continue;
                    }
                }
                if (element.type == "checkbox")
                    element.checked = (dataSource[property]);
                else if (element.type == "date") {
                    element.value = dataSource[property];
                }
                else
                    element.value = dataSource[property];
            }
        }
        catch (e) {
        }
    },
    AssignToModel: function (model) {
        var properties = Object.getOwnPropertyNames(model);
        for (var _i = 0, properties_2 = properties; _i < properties_2.length; _i++) {
            var property = properties_2[_i];
            var element = document.getElementsByName(property)[0];
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
    FillComboSingular: function (dataSource, combo) {
        if (combo != null) {
            for (var i = combo.length; i >= 0; i--) {
                combo.remove(i);
            }
            for (var i = 0; i < dataSource.length; i++) {
                //let code = dataSource[i][i];
                //let name = dataSource[i][dataSource[i]];
                combo.add(new Option(dataSource[i], i.toString()));
            }
        }
    },
    FillCombo: function (dataSource, combo, codeField, textField) {
        if (combo != null) {
            for (var i = combo.length; i >= 0; i--) {
                combo.remove(i);
            }
            for (var i = 0; i < dataSource.length; i++) {
                var code = dataSource[i][codeField];
                var name_1 = dataSource[i][textField];
                combo.add(new Option(name_1, code));
            }
        }
    },
    FillComboFirstvalue: function (dataSource, combo, codeField, textField, Name, Code) {
        if (combo != null) {
            for (var i = combo.length; i >= 0; i--) {
                combo.remove(i);
            }
            combo.add(new Option(Name, Code));
            for (var i = 0; i < dataSource.length; i++) {
                var code = dataSource[i][codeField];
                var name_2 = dataSource[i][textField];
                combo.add(new Option(name_2, code));
                if (name_2 == Name && code == Code) {
                    combo.remove(i + 1);
                }
            }
        }
    },
    FillCombowithdefultAndEmptyChoice: function (dataSource, combo, codeField, textField, NameDefult, EmptyChoiceName) {
        if (combo != null) {
            for (var i = combo.length; i >= 0; i--) {
                combo.remove(i);
            }
            combo.add(new Option(NameDefult, null));
            for (var i = 0; i < dataSource.length; i++) {
                var code = dataSource[i][codeField];
                var name_3 = dataSource[i][textField];
                var id = dataSource[i][codeField];
                combo.add(new Option(name_3, code));
            }
            //add empty
            combo.add(new Option(EmptyChoiceName, "-1"));
        }
    },
    FillCombowithdefult: function (dataSource, combo, codeField, textField, NameDefult) {
        if (combo != null) {
            for (var i = combo.length; i >= 0; i--) {
                combo.remove(i);
            }
            combo.add(new Option(NameDefult, null));
            for (var i = 0; i < dataSource.length; i++) {
                var code = dataSource[i][codeField];
                var name_4 = dataSource[i][textField];
                var id = dataSource[i][codeField];
                //var x = true;
                //if (x==true) {
                //    $("#name").attr('id', id);
                //}
                //let test = 
                combo.add(new Option(name_4, code));
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
    FillComboWithEmpty: function (dataSource, combo, codeField, textField) {
        for (var i = combo.length; i >= 0; i--) {
            combo.remove(i);
        }
        combo.add(new Option("", ""));
        for (var i = 0; i < dataSource.length; i++) {
            var code = dataSource[i][codeField];
            var name_5 = dataSource[i][textField];
            combo.add(new Option(name_5, code));
        }
    },
    GetElementById: function (id) {
        var element = document.getElementById(id);
        return element;
    },
    CreateElement: function (id) {
        var element = document.createElement(id);
        return element;
    }
};
function DateFormatNew(dateForm) {
    try {
        var date = new Date();
        var myDate = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(dateForm);
        }
        var yy = date.getFullYear();
        var mm = (date.getMonth() + 1);
        var dd = date.getDate();
        var year = yy;
        var month = (mm < 10) ? ("0" + mm.toString()) : mm.toString();
        var day = (dd < 10) ? ("0" + dd.toString()) : dd.toString();
        //The specified value "'2018-01-15'" does not conform to the required format, "yyyy-MM-dd".
        var startDate = year + "-" + day + "-" + month;
        var form_date = startDate;
        return form_date;
    }
    catch (e) {
        return DateFormatNew((new Date()).toString());
    }
}
function DateFormat(dateForm) {
    try {
        var date = new Date();
        var myDate = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(dateForm);
        }
        var yy = date.getFullYear();
        var mm = (date.getMonth() + 1);
        var dd = date.getDate();
        var year = yy;
        var month = (mm < 10) ? ("0" + mm.toString()) : mm.toString();
        var day = (dd < 10) ? ("0" + dd.toString()) : dd.toString();
        //The specified value "'2018-01-15'" does not conform to the required format, "yyyy-MM-dd".
        var startDate = year + "-" + month + "-" + day;
        var form_date = startDate;
        return form_date;
    }
    catch (e) {
        return DateFormat((new Date()).toString());
    }
}
function DateFormatRep(dateForm) {
    try {
        var date = new Date();
        var myDate = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(dateForm);
        }
        var yy = date.getFullYear();
        var mm = (date.getMonth() + 1);
        var dd = date.getDate();
        var year = yy;
        var month = (mm < 10) ? ("0" + mm.toString()) : mm.toString();
        var day = (dd < 10) ? ("0" + dd.toString()) : dd.toString();
        //The specified value "'2018-01-15'" does not conform to the required format, "dd/MM/yyyy".
        var startDate = day + "/" + month + "/" + year;
        return startDate;
    }
    catch (e) {
        return DateFormatRep((new Date()).toString());
    }
}
function GetTime() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? 0 + minutes : minutes;
    //var strTime = hours + ':' + minutes + ' ' + ampm;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    var TrTime = strTime;
    return TrTime;
}
function DateTimeFormat(dateForm) {
    try {
        var date = new Date();
        var myDate = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(dateForm);
        }
        var yy = date.getFullYear();
        var mm = (date.getMonth() + 1);
        var dd = date.getDate();
        var hh = (date.getHours());
        var mn = (date.getMinutes());
        var ss = (date.getSeconds());
        var year = yy;
        var month = (mm < 10) ? ("0" + mm.toString()) : mm.toString();
        var day = (dd < 10) ? ("0" + dd.toString()) : dd.toString();
        var hour = (hh < 10) ? ("0" + hh.toString()) : hh.toString();
        var Minute = (mn < 10) ? ("0" + mn.toString()) : mn.toString();
        var Second = (ss < 10) ? ("0" + ss.toString()) : ss.toString();
        var startDate = year + "-" + month + "-" + day + "T" + hour + ":" + Minute; //+ ":" + Second;
        var form_date = startDate;
        return form_date;
    }
    catch (e) {
        return DateFormat((new Date()).toString());
    }
}
function DateTimeFormatWithoutT(dateForm) {
    try {
        var date = new Date();
        var myDate = "";
        if (dateForm.indexOf("Date(") > -1) {
            myDate = dateForm.split('(')[1].split(')')[0];
            date = new Date(Number(myDate));
        }
        else {
            date = new Date(dateForm);
        }
        var yy = date.getFullYear();
        var mm = (date.getMonth() + 1);
        var dd = date.getDate();
        var hh = (date.getHours());
        var mn = (date.getMinutes());
        var ss = (date.getSeconds());
        var year = yy;
        var month = (mm < 10) ? ("0" + mm.toString()) : mm.toString();
        var day = (dd < 10) ? ("0" + dd.toString()) : dd.toString();
        var hour = (hh < 10) ? ("0" + hh.toString()) : hh.toString();
        var Minute = (mn < 10) ? ("0" + mn.toString()) : mn.toString();
        var Second = (ss < 10) ? ("0" + ss.toString()) : ss.toString();
        var startDate = year + "-" + month + "-" + day + " " + hour + ":" + Minute; //+ ":" + Second;
        var form_date = new Date(startDate);
        return form_date.toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
    }
    catch (e) {
        return DateFormat(new Date().toString());
    }
}
function ClearGrid(_Grid, arr) {
    if (_Grid === void 0) { _Grid = new JsGrid(); }
    arr = new Array();
    _Grid.DataSource = arr;
    _Grid.Bind();
}
function HeaderTemplate(headerTitle, element) {
    var tbl = DocumentActions.CreateElement("table");
    tbl.style.width = "100%";
    var headerTr = DocumentActions.CreateElement("tr");
    headerTr.innerHTML = "<td style='text-align:center;'>" + headerTitle + "</td>";
    var cellTr = DocumentActions.CreateElement("tr");
    var cell = DocumentActions.CreateElement("td");
    cell.style.textAlign = "center";
    cell.appendChild(element);
    cellTr.appendChild(cell);
    tbl.appendChild(headerTr);
    tbl.appendChild(cellTr);
    return tbl;
}
//eslam 25 oct 2020
function HeaderTemplate_ThreeElements(headerTitle, element_1, element_2) {
    var tbl = DocumentActions.CreateElement("table");
    tbl.style.width = "100%";
    var headerTr = DocumentActions.CreateElement("tr");
    headerTr.innerHTML = "<td style='text-align:center;'>" + headerTitle + "</td>";
    var cellTr = DocumentActions.CreateElement("tr");
    var cell = DocumentActions.CreateElement("td");
    cell.style.textAlign = "center";
    cell.appendChild(element_1);
    cell.appendChild(element_2);
    cellTr.appendChild(cell);
    tbl.appendChild(headerTr);
    tbl.appendChild(cellTr);
    return tbl;
}
var Resources = /** @class */ (function () {
    function Resources() {
    }
    return Resources;
}());
function CreateElement(typeElement, className, defaultValue, minValue, id, step) {
    typeElement = typeElement.toLocaleLowerCase();
    var element = DocumentActions.CreateElement("input");
    element.className = className;
    element.id = "h_" + id;
    element.type = typeElement;
    element.value = defaultValue;
    element.min = minValue;
    element.step = step;
    return element;
}
//eslam 25 oct 2020
function CreateLabelElement(defaultValue, id) {
    var element = DocumentActions.CreateElement("label");
    element.style.textAlign = "center";
    element.id = id;
    element.innerText = defaultValue;
    return element;
}
function SetSearchControlName(id) {
    $("#SearchControlName").val(id);
}
var CodeDesciptionModel = /** @class */ (function () {
    function CodeDesciptionModel() {
    }
    return CodeDesciptionModel;
}());
function WorningMessage(msg_Ar, msg_En, tit_ar, tit_en, OnOk) {
    if (tit_ar === void 0) { tit_ar = "تنبيه"; }
    if (tit_en === void 0) { tit_en = "Worning"; }
    switch ("ar") {
        case "ar":
            MessageBox.Show(msg_En, tit_en, OnOk);
            focus();
            break;
    }
}
function DisplayMassage(msg_Ar, msg_En, msg_type, OnOk) {
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
function DisplayMassage_Processes(msg_Ar, msg_En, msg_type, OnOk) {
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
function Errorinput(input) {
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
function ConfirmMessage(msg_Ar, msg_En, tit_ar, tit_en, OnOk) {
    if (msg_Ar === void 0) { msg_Ar = "تمت عملية الحفظ  بنجاح"; }
    if (msg_En === void 0) { msg_En = "Data Saved Successfully"; }
    if (tit_ar === void 0) { tit_ar = "تأكيد"; }
    if (tit_en === void 0) { tit_en = "Confirm"; }
    switch ("ar") {
        case "ar":
            MessageBox.Show(msg_Ar, tit_ar, OnOk);
            break;
    }
}
function ConfirmMessagee(msg_Ar, msg_En, tit_ar, tit_en, OnOk) {
    if (msg_Ar === void 0) { msg_Ar = "تمت عملية الحفظ  بنجاح"; }
    if (msg_En === void 0) { msg_En = "Data Saved Successfully"; }
    if (tit_ar === void 0) { tit_ar = "تأكيد"; }
    if (tit_en === void 0) { tit_en = "Confirm"; }
    switch ("ar") {
        case "ar":
            MessageBox.Show(msg_Ar, tit_ar, OnOk);
            return 1;
    }
}
function WorningMessageDailog(msg_Ar, msg_En, tit_ar, tit_en, OnOk, OnCancel) {
    if (tit_ar === void 0) { tit_ar = "تنبيه"; }
    if (tit_en === void 0) { tit_en = "Worning"; }
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
function AddDate(prd, Sdate, count) {
    var Tdate;
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
            Tdate.setDate(Tdate.getDate() + -1);
            break;
        case 5: //year
            // add 365 or 366 days 
            Tdate = Sdate;
            Tdate.setFullYear(Tdate.getFullYear() + count);
            Tdate.setDate(Tdate.getDate() + -1);
            break;
    }
    return Tdate;
}
function GetResourceByName(Sourcekey) {
    var result = "";
    Ajax.Callsync({
        url: Url.Action("GetResourceByName", "ClientTools"),
        data: { key: Sourcekey },
        success: function (d) {
            result = d.result;
        }
    });
    return result;
}
function GetResourceList(Sourcekey) {
    var result = Ajax.Call({
        url: Url.Action("GetResourceNames", "ClientTools"),
        data: { _prefix: Sourcekey },
        success: function (d) {
            result = JSON.parse(d.result);
        }
    });
    return result;
}
// Doha
function GetDate() {
    var today = new Date();
    var dd = today.getDate().toString();
    var ReturnedDate;
    var mm = (today.getMonth() + 1).toString();
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
function OpenPopUp(moduleCode, PopupBody, PopupDialog) {
    var json = $.ajax({
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
function CheckDate(TrDate, StDt, EdDt) {
    ////debugger
    var check = Date.parse(TrDate);
    var from = Date.parse(StDt);
    var to = Date.parse(EdDt);
    if ((check <= to && check >= from))
        return (true);
    else
        return false;
}
function ThousandsSeparator(num) {
    var numAsString = num.toString();
    var characters = numAsString.split("").reverse();
    var parts = [];
    for (var i = 0; i < characters.length; i += 3) {
        var part = characters.slice(i, i + 3).reverse().join("");
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
function SetCustomerType(Transcode, Iscredit, SlsType) {
    var Ct = new CustomerType();
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
function CompareTime(t1, t2) {
    // add days 
    ////debugger;
    var h1 = Number(t1.slice(0, 2));
    var m1 = Number(t1.slice(3, 5));
    var h2 = Number(t2.slice(0, 2));
    var m2 = Number(t2.slice(3, 5));
    var h3 = (h1 - h2) * 60 + (m1 - m2);
    return h3;
}
//# sourceMappingURL=App.js.map
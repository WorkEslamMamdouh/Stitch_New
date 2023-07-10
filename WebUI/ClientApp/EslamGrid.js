//----------------------------------------------------------------ESGrid--------------------------------------
//class I_D_UOM {
//    constructor() {
//        this.UomID = 0;
//        this.UomCode = "";
//        this.DescA = "";
//        this.DescE = "";
//        this.CompCode = 0;
//        this.Remarks = "";
//        this.CreatedAt = "";
//        this.CreatedBy = "";
//        this.UpdatedAt = "";
//        this.UpdatedBy = "";
//        this.StatusFlag = "";
//    }
//    public UomID: number;
//    public UomCode: string;
//    public DescA: string;
//    public DescE: string;
//    public CompCode: number;
//    public Remarks: string;
//    public CreatedAt: string;
//    public CreatedBy: string;
//    public UpdatedAt: string;
//    public UpdatedBy: string;
//    public StatusFlag: string;
//}
var ESGrid = /** @class */ (function () {
    function ESGrid() {
        this.ESG = new ESG();
        this.Column = new Array();
    }
    return ESGrid;
}());
var ESG = /** @class */ (function () {
    function ESG() {
        this.PrimaryKey = "";
        this.NameTable = "";
        this.NewDataSours = "";
        this.Save = true;
        this.Back = true;
        this.DeleteRow = true;
        this.CopyRow = true;
        this.Add = true;
        this.Edit = true;
        this.SelectedKey;
        this.LastCounter = 0;
        this.LastCounterAdd = 0;
        this.RowCnt = 0;
        this.CountModel = 0;
        this.Right = true;
        this.object = new Object();
        this.TotalModel = new Object();
        this.Model = {
            Model: []
        };
        this.OnfunctionSave;
        this.OnfunctionTotal;
        this.OnRowDoubleClicked;
    }
    return ESG;
}());
var Column = /** @class */ (function () {
    function Column() {
        this.style = "width: 100%";
        this.title = "";
        this.Name = "";
        this.value = "";
        this.Type = "text";
        this.visible = true;
        this.Edit = true;
        this.Validation = new Valid_Con;
        this.ColumnType = new ControlEvents;
    }
    return Column;
}());
var Valid_Con = /** @class */ (function () {
    function Valid_Con() {
        this.valid = false;
        this.conation = new Con;
        this.Con_Value = '';
        this.Mess = '';
    }
    return Valid_Con;
}());
var Con = /** @class */ (function () {
    function Con() {
    }
    return Con;
}());
var ControlEvents = /** @class */ (function () {
    function ControlEvents() {
        this.NameType = 'Input';
        this.textField = '';
        this.onclick;
        this.onkeyup;
        this.onchange;
        this.dataSource;
    }
    return ControlEvents;
}());
var Valid = {
    Set: function (valid, Mess, conation, Value) {
        var Valid_Co = new Valid_Con();
        Valid_Co.valid = valid;
        Valid_Co.conation = conation;
        Valid_Co.Con_Value = Value;
        Valid_Co.Mess = Mess;
        return Valid_Co;
    },
};
var ControlType;
(function (ControlType) {
    String.prototype.Get_Val = function (Grid) {
        var NameFild = this;
        var value = $('#' + Grid.ESG.NameTable + '_' + NameFild + Grid.ESG.RowCnt + '').val();
        return (value);
    };
    String.prototype.Set_Val = function (value, Grid) {
        var NameFild = this;
        if (value == true || value == false) {
            $('#' + Grid.ESG.NameTable + '_' + NameFild + Grid.ESG.RowCnt + '').prop("checked", value);
        }
        else {
            $('#' + Grid.ESG.NameTable + '_' + NameFild + Grid.ESG.RowCnt + '').val(value);
        }
        return (value);
    };
    String.prototype.Get_Num = function (Grid) {
        var NameFild = this;
        var value = $('#' + Grid.ESG.NameTable + '_' + NameFild + Grid.ESG.RowCnt + '').val();
        return (Number(value));
    };
    String.prototype.Get_Cheak = function (Grid) {
        debugger;
        var NameFild = this;
        var value = $('#' + Grid.ESG.NameTable + '_' + NameFild + Grid.ESG.RowCnt + '').is(":checked");
        return (value);
    };
    String.prototype.html = function (value, Grid) {
        var NameFild = this;
        $('#' + Grid.ESG.NameTable + '_' + NameFild + Grid.ESG.RowCnt + '').html(value);
        return (value);
    };
    String.prototype.append = function (value, Grid) {
        var NameFild = this;
        $('#' + Grid.ESG.NameTable + '_' + NameFild + Grid.ESG.RowCnt + '').append(value);
        return (value);
    };
    var ControlEvent = new ControlEvents();
    function Input(onchange, onkeyup, onclick) {
        ControlEvent = new ControlEvents();
        ControlEvent.onchange = onchange;
        ControlEvent.onkeyup = onkeyup;
        ControlEvent.onclick = onclick;
        ControlEvent.dataSource = null;
        ControlEvent.NameType = 'Input';
        return ControlEvent;
    }
    ControlType.Input = Input;
    function checkbox(onchange, onkeyup, onclick) {
        ControlEvent = new ControlEvents();
        ControlEvent.onchange = onchange;
        ControlEvent.onkeyup = onkeyup;
        ControlEvent.onclick = onclick;
        ControlEvent.dataSource = null;
        ControlEvent.NameType = 'checkbox';
        return ControlEvent;
    }
    ControlType.checkbox = checkbox;
    function Button(onchange, onkeyup, onclick) {
        ControlEvent = new ControlEvents();
        ControlEvent.onchange = onchange;
        ControlEvent.onkeyup = onkeyup;
        ControlEvent.onclick = onclick;
        ControlEvent.dataSource = null;
        ControlEvent.NameType = 'Button';
        return ControlEvent;
    }
    ControlType.Button = Button;
    function Dropdown(dataSourc, textField, onchange, onkeyup, onclick) {
        ControlEvent = new ControlEvents();
        ControlEvent.onchange = onchange;
        ControlEvent.onkeyup = onkeyup;
        ControlEvent.onclick = onclick;
        ControlEvent.dataSource = dataSourc;
        ControlEvent.NameType = 'Dropdown';
        ControlEvent.textField = textField;
        return ControlEvent;
    }
    ControlType.Dropdown = Dropdown;
})(ControlType || (ControlType = {}));
var flagNotClick = false;
var flagBack = false;
var FlagValid = true;
var NewDataSours = '';
var classs = $('<style> .display_hidden {display:none !important; }  .Text_right {text-align: right; }  .Text_left {text-align: left; } .Search_grid { background-position: 10px 10px;background-repeat: no-repeat;width: 100%;font-size: 16px;padding: 12px 20px 12px 40px;border: 1px solid #ddd;margin-bottom: 12px;} </style>');
$('head:first').append(classs);
function BindGridControl(Grid) {
    var NameTable = Grid.ESG.NameTable;
    var style_Text = '';
    if (Grid.ESG.Right == true) {
        $("#" + NameTable).attr('style', 'direction: rtl;');
        style_Text = 'Text_right';
    }
    else {
        $("#" + NameTable).attr('style', 'direction: ltr;');
        style_Text = 'Text_left';
    }
    $("#" + NameTable).html("");
    var table; // بناء هيكل الجدوا
    table = '' +
        '<div class="sparkline8-graph" style="border-radius: 50px;">' +
        '<div class="datatable-dashv1-list custom-datatable-overright">' +
        '<div class="button-ap-list responsive-btn">' +
        '<button id="btnEdit_' + NameTable + '" type="button" class="btn btn-custon-four btn-success"><i class="fa fa-save"></i>&nbsp; Edit</button>' +
        '<button id="btnsave_' + NameTable + '" type="button" class="btn btn-custon-four btn-success"><i class="fa fa-save"></i>&nbsp; save</button>' +
        '<button id="btnClean_' + NameTable + '" type="button" class="btn btn-custon-four btn-danger" style="background-color: sandybrown;"><i class="fa fa-refresh"></i>  Back</button>' +
        '</div>' +
        '<br />' +
        '<div class=" btn-group project-list-action">' +
        '<button id="btnAdd_' + NameTable + '" class="btn btn-custon-four btn-success oo"><i class="fa fa-plus"></i></button>' +
        '</div>' +
        '<div class=" btn-group project-list-action" style="width: 20%;">' +
        '</div>' +
        '<div id="DivMassage_' + NameTable + '"  class=" btn-group project-list-action" style="width: 55%;background-color: brown;color: white;font-weight: bold;text-align: center;border-radius: 50px;">' +
        '<h3 id="TextMassage_' + NameTable + '">Message</h3> ' +
        '</div>' +
        '<br />' +
        '<br />' +
        '<div class=" btn-group project-list-action"  >' +
        '<input type="text" id="Search_' + NameTable + '"  class="Search_grid" placeholder="Search for names.." title="Type in a name">' +
        '</div>' +
        '<table id="table_' + NameTable + '" data-toggle="table"   data-page-number="2" data-page-size="5"   data-pagination="true" data-resizable="true" data-cookie="true" data-cookie-id-table="saveId" data-show-export="false" data-click-to-select="true" data-toolbar="#toolbar">' +
        '<thead id="thead_' + NameTable + '">' +
        '<tr id="tr_' + NameTable + '">' +
        '<th class=" Edit_But ' + NameTable + '_Delete" style="width: 1%;" data-field=""></th>' +
        '<th class=" Edit_But ' + NameTable + '_Copy"  style="width: 1%;" data-field=""></th>' +
        '</tr>' +
        '</thead>' +
        '<tbody id="tbody_' + NameTable + '">' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '</div>';
    $("#" + NameTable).append(table);
    $('#DivMassage_' + NameTable).addClass('display_hidden');
    $('#btnAdd_' + NameTable).click(function (e) {
        BuildGridControl(true, Grid);
        Grid.ESG.LastCounterAdd = Grid.ESG.LastCounter;
    });
    if (flagBack == false) {
        $('#btnClean_' + NameTable).click(function (e) {
            CleanGridControl(null, Grid);
        });
    }
    $('#btnsave_' + NameTable).click(function (e) {
        if (!ValidationGrid(Grid, Grid.ESG.object))
            return;
        AssignGridControl(Grid, Grid.ESG.object);
    });
    $('#btnEdit_' + NameTable).click(function (e) {
        EditGridControl(Grid);
    });
    $('#Search_' + NameTable).keyup(function (e) {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("Search_" + NameTable);
        filter = input.value.toUpperCase();
        table = document.getElementById("table_" + NameTable);
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            debugger;
            var tds = tr[i].getElementsByTagName("td");
            for (var u = 0; u < tds.length; u++) {
                td = tr[i].getElementsByTagName("td")[u];
                if (td) {
                    try {
                        debugger;
                        td = document.getElementById(td.children[0].id);
                        txtValue = td.value;
                        if (txtValue.toUpperCase().indexOf(filter) > -1) {
                            //alert(txtValue)
                            tr[i].style.display = "";
                            break;
                        }
                        else {
                            tr[i].style.display = "none";
                        }
                    }
                    catch (e) {
                    }
                }
            }
        }
    });
    for (var i = 0; i < Grid.Column.length; i++) {
        var visible = "";
        if (Grid.Column[i].visible == false) {
            visible = 'hidden';
        }
        var thead = //بناء عناوين الجدول
         void 0; //بناء عناوين الجدول
        thead = '<th data-field="number" class=" ' + style_Text + '  ' + NameTable + '_' + i + '"   ' + visible + ' id="th_' + i + NameTable + '"  data-editable="false">______' + Grid.Column[i].title + '______</th>';
        $("#tr_" + NameTable).append(thead);
    }
    //------------------------------------------------------------تنظيم الجريد
    Resizable(NameTable);
    //----------------------------------------------------------------------------------
    $('.' + NameTable + '_Delete').attr('style', 'width: 1% !important;');
    $('.' + NameTable + '_Copy').attr('style', 'width: 1% !important;');
    //---------------------------------------------------------------------------------اضافة هيكل body 
    for (var u = 0; u < Grid.Column.length; u++) {
        //--------------------------------------------اضافة style -----------------------------------
        if (Grid.Column[u].style.trim() != '') {
            Grid.Column[u].style = 'width: 10%';
        }
        ;
        if (Grid.Column[u].visible == false) {
            Grid.Column[u].style = ' display:none;';
        }
        ;
        var title = $('.' + NameTable + '_' + u + '');
        title.attr('style', '' + Grid.Column[u].style + '  !important;');
        var _Delete = $('.' + NameTable + '_Delete');
        _Delete.attr('style', 'display:none !important;');
        var _Copy = $('.' + NameTable + '_Copy');
        _Copy.attr('style', 'display:none !important;');
        $('#btnClean_' + NameTable).attr('style', 'display:none !important;');
        $('#btnAdd_' + NameTable).attr('style', 'display:none !important;');
        $('#btnsave_' + NameTable).attr('style', 'display:none !important;');
        $('#btnEdit_' + NameTable).attr('style', 'display:none !important;');
        if (Grid.ESG.DeleteRow == false) {
            var _Delete_1 = $('.' + NameTable + '_Delete');
            _Delete_1.addClass('display_hidden');
        }
        ;
        if (Grid.ESG.CopyRow == false) {
            var _Copy_1 = $('.' + NameTable + '_Copy');
            _Copy_1.addClass('display_hidden');
        }
        ;
        if (Grid.ESG.Back == false) {
            $('#btnClean_' + NameTable).addClass('display_hidden');
        }
        ;
        if (Grid.ESG.Add == false) {
            $('#btnAdd_' + NameTable).addClass('display_hidden');
        }
        ;
        if (Grid.ESG.Edit == false) {
            $('#btnEdit_' + NameTable).addClass('display_hidden');
        }
        else {
            $('#btnEdit_' + NameTable).attr('style', '');
        }
        //------------------------------------------------------------------------------------------
    }
    $('.fixed-table-body').attr('style', 'height: 460px; overflow: scroll;');
}
function DisplayDataGridControl(List, Grid) {
    flagBack = true;
    BindGridControl(Grid);
    var NameTable = Grid.ESG.NameTable;
    $('#btnClean_' + NameTable).click(function (e) {
        CleanGridControl(List, Grid);
    });
    if (List != null) {
        for (var i = 0; i < List.length; i++) {
            BuildGridControl(false, Grid);
            DisplayData(List[i], Grid);
        }
    }
    flagBack = false;
    //let x =`   <link href="https://unpkg.com/bootstrap-table@1.20.2/dist/bootstrap-table.min.css" rel="stylesheet">
    //<script src="https://unpkg.com/bootstrap-table@1.20.2/dist/bootstrap-table.min.js"></script>`
    //$('#main-menu').append(x);
}
function DisplayData(List, Grid) {
    var NameTable = Grid.ESG.NameTable;
    var cnt = Grid.ESG.LastCounter - 1;
    var _Delete = $('.' + NameTable + '_Delete');
    _Delete.attr('style', 'display:none !important;');
    var btn_minus = $('#td_btn_minus_' + NameTable + cnt);
    btn_minus.attr('style', 'display:none !important;');
    var _Copy = $('.' + NameTable + '_Copy');
    _Copy.attr('style', 'display:none !important;');
    var btn_Copy = $('#td_btn_Copy_' + NameTable + cnt);
    btn_Copy.attr('style', 'display:none !important;');
    debugger;
    for (var u = 0; u < Grid.Column.length; u++) {
        try {
            debugger;
            var values = Object["values"](List);
            if (Grid.Column[u].ColumnType.NameType == 'Input' || Grid.Column[u].ColumnType.NameType == 'date' || Grid.Column[u].ColumnType.NameType == 'number') {
                $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').val(values[u]);
            }
            if (Grid.Column[u].ColumnType.NameType == 'Dropdown') {
                $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').val(values[u]);
            }
            if (Grid.Column[u].ColumnType.NameType == 'Button') {
                $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').val(values[u]);
            }
            if (Grid.Column[u].ColumnType.NameType == 'checkbox') {
                if (values[u] == 1 || values[u] == true) {
                    $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').prop('checked', true);
                }
                else {
                    $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').prop('checked', false);
                }
            }
        }
        catch (e) {
        }
    }
}
function BuildGridControl(flagDisplay, Grid) {
    debugger;
    var NameTable = Grid.ESG.NameTable;
    var cnt = Grid.ESG.LastCounter;
    if (Grid.ESG.LastCounter == 0) {
        $('#tbody_' + NameTable + '').html('');
    }
    var classDisplay = flagDisplay == false ? "" : "animated animate__slideInDown";
    var tbody = '<tr id= "No_Row_' + NameTable + cnt + '" class="' + classDisplay + '">' +
        '<td id="td_btn_Copy_' + NameTable + cnt + '" class="td_btn_Copy_' + NameTable + '" ><button id="btn_Copy_' + NameTable + cnt + '" type="button" class="btn btn-custon-four btn-danger" style="background-color: cornflowerblue;font-weight: bold;font-size: 22PX;width: 34px;padding: unset;"><i class="fa fa-copy"></i></button></td>' +
        '<td id="td_btn_minus_' + NameTable + cnt + '" class="td_btn_minus_' + NameTable + '" ><button id="btn_minus_' + NameTable + cnt + '" type="button" class="btn btn-custon-four btn-danger" style="font-weight: bold;font-size: 22PX;width: 34px;padding: unset;"><i class="fa fa-minus-circle" ></i></button></td>' +
        '<td id="td_StatusFlag_' + NameTable + '' + cnt + '" style="display:none !important;" ><input  disabled="disabled" id="StatusFlag_' + NameTable + '_' + cnt + '" value="" type="hidden" class="form-control " placeholder="flag" /></td>' +
        '<td id="td_Ser_' + NameTable + '' + cnt + '" style="display:none !important;" ><input  disabled="disabled" id="Ser_' + NameTable + '_' + cnt + '" value="' + cnt + '" type="hidden" class="form-control " placeholder="flag" /></td>' +
        '<td id="Ser_' + NameTable + '' + cnt + '" style="display:none !important;" >' + cnt + '</td>';
    //'<td id="up_' + NameTable + '' + cnt + '"   > <a class="up" href="#">⇑</a></td>'+
    //'<td id="down_' + NameTable + '' + cnt + '"   ><a class="down" href="#">⇓</a></td>';
    '</tr>';
    $('#tbody_' + NameTable + '').append(tbody);
    //$('.up,.down').click(function () {
    //    var row = $(this).parents('tr:first');
    //    if ($(this).is('.up')) { 
    //        row.prev().prev().before(row)
    //    } else {
    //        row.next().next().after(row)
    //    }
    //});
    //var $tbody = $('#tbody_' + NameTable + '');
    //var selected = null;
    //$tbody.children().on("click", function () {
    //    if (selected == null)
    //        selected = this;
    //    else {
    //        $(selected).insertAfter(this);
    //        selected = null;
    //    }
    //});
    if (Grid.ESG.DeleteRow == false) {
        var btn_minus = $('#td_btn_minus_' + NameTable + cnt);
        btn_minus.attr('style', 'display:none !important;');
    }
    ;
    if (Grid.ESG.CopyRow == false) {
        var btn_Copy = $('#td_btn_Copy_' + NameTable + cnt);
        btn_Copy.attr('style', 'display:none !important;');
    }
    ;
    $('#btn_minus_' + NameTable + cnt).click(function (e) {
        flagNotClick = true;
        DeleteRow('No_Row_' + NameTable + cnt, cnt, NameTable);
    });
    $('#btn_Copy_' + NameTable + cnt).click(function (e) {
        flagNotClick = true;
        CopyRow(Grid, cnt);
        //$("#StatusFlag_" + NameTable + '_' + cnt+1).val('i');
    });
    var _loop_1 = function (u) {
        var td = '';
        var classEdit = '';
        if (Grid.Column[u].Edit == true) {
            classEdit = 'Edit_' + NameTable;
        }
        ;
        if (Grid.Column[u].ColumnType.NameType == 'Input') {
            td = '<td id="td_' + NameTable + '_' + Grid.Column[u].Name + cnt + '" >' +
                //'<input  disabled="disabled" id = "' + NameTable + '_' + Grid.Column[u].Name + cnt + '" value = "' + Grid.Column[u].value + '" type = "' + Grid.Column[u].Type + '" class="form-control ' + classEdit + '" placeholder = "' + Grid.Column[u].value + '" /> ' +
                '<textarea style="height: 35px;" disabled="disabled" id = "' + NameTable + '_' + Grid.Column[u].Name + cnt + '"  class="form-control ' + classEdit + '" placeholder = "' + Grid.Column[u].value + '"  >' + Grid.Column[u].value + '</textarea> ' +
                '</td>';
            $('#No_Row_' + NameTable + cnt + '').append(td);
        }
        if (Grid.Column[u].ColumnType.NameType == 'Dropdown') {
            td = '<td id="td_' + NameTable + '_' + Grid.Column[u].Name + cnt + '" ><select disabled="disabled"  id="' + NameTable + '_' + Grid.Column[u].Name + cnt + '" class="form-control ' + classEdit + '">  </select></td>';
            $('#No_Row_' + NameTable + cnt + '').append(td);
            var ddlFilter = document.getElementById('' + NameTable + '_' + Grid.Column[u].Name + cnt + '');
            DocumentActions.FillCombowithdefult(Grid.Column[u].ColumnType.dataSource, ddlFilter, Grid.Column[u].Name, Grid.Column[u].ColumnType.textField, "Select");
        }
        if (Grid.Column[u].ColumnType.NameType == 'Button') {
            td = '<td id="td_' + NameTable + '_' + Grid.Column[u].Name + cnt + '" style="text-align: center;" ><button id="' + NameTable + '_' + Grid.Column[u].Name + cnt + '" type="' + Grid.Column[u].Type + '" class="btn btn-custon-four btn-success classEdit"> ' + Grid.Column[u].value + ' </button></td>';
            $('#No_Row_' + NameTable + cnt + '').append(td);
        }
        if (Grid.Column[u].ColumnType.NameType == 'checkbox') {
            td = '<td id="td_' + NameTable + '_' + Grid.Column[u].Name + cnt + '" ><input  disabled="disabled" id="' + NameTable + '_' + Grid.Column[u].Name + cnt + '" value="' + Grid.Column[u].value + '" type="checkbox" class="form-control ' + classEdit + '" placeholder="' + Grid.Column[u].value + '" /></td>';
            $('#No_Row_' + NameTable + cnt + '').append(td);
        }
        if (Grid.Column[u].ColumnType.NameType == 'date') {
            td = '<td id="td_' + NameTable + '_' + Grid.Column[u].Name + cnt + '" >' +
                '<input  disabled="disabled" id = "' + NameTable + '_' + Grid.Column[u].Name + cnt + '" value = "' + Grid.Column[u].value + '" type = "date" class="form-control ' + classEdit + '" placeholder = "' + Grid.Column[u].value + '" /> ' +
                '</td>';
            $('#No_Row_' + NameTable + cnt + '').append(td);
            $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').val(GetDate());
        }
        if (Grid.Column[u].ColumnType.NameType == 'number') {
            td = '<td id="td_' + NameTable + '_' + Grid.Column[u].Name + cnt + '" >' +
                '<input  disabled="disabled" id = "' + NameTable + '_' + Grid.Column[u].Name + cnt + '" value = "' + Grid.Column[u].value + '" type = "number" class="form-control ' + classEdit + '" placeholder = "' + Grid.Column[u].value + '" /> ' +
                '</td>';
            $('#No_Row_' + NameTable + cnt + '').append(td);
        }
        $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').focus(function () {
            Grid.ESG.RowCnt = Number($("#Ser_" + NameTable + '_' + cnt).val());
        });
        $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').click(function () {
            if ($("#StatusFlag_" + NameTable + '_' + cnt).val() != "i")
                $("#StatusFlag_" + NameTable + '_' + cnt).val("u");
            if (Grid.Column[u].ColumnType.onclick != null) {
                Grid.Column[u].ColumnType.onclick();
            }
        });
        $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').on('keyup', function (e) {
            if ($("#StatusFlag_" + NameTable + '_' + cnt).val() != "i")
                $("#StatusFlag_" + NameTable + '_' + cnt).val("u");
            if (Grid.Column[u].ColumnType.onkeyup != null) {
                Grid.Column[u].ColumnType.onkeyup();
            }
        });
        $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').on('change', function (e) {
            if ($("#StatusFlag_" + NameTable + '_' + cnt).val() != "i")
                $("#StatusFlag_" + NameTable + '_' + cnt).val("u");
            if (Grid.Column[u].ColumnType.onchange != null) {
                Grid.Column[u].ColumnType.onchange();
            }
            ComputeTotalGridControl(Grid, Grid.ESG.object);
        });
        //--------------------------------------------اضافة style -----------------------------------
        if (Grid.ESG.LastCounter == 0) {
            if (Grid.Column[u].style.trim() != '') {
                Grid.Column[u].style = 'width: 10%';
            }
            ;
            if (Grid.Column[u].visible == false) {
                Grid.Column[u].style = ' display:none;';
            }
            ;
            var title = $('.' + NameTable + '_' + u + '');
            title.attr('style', '' + Grid.Column[u].style + '  !important;');
            var DeleteRow_1 = $('.' + NameTable + '_Delete');
            DeleteRow_1.attr('style', 'width: 3% !important;');
            var copyRow = $('.' + NameTable + '_Copy');
            copyRow.attr('style', 'width: 3% !important;');
        }
        if (Grid.ESG.DeleteRow == false) {
            var title = $('.' + NameTable + '_Delete');
            title.attr('style', 'display:none !important;');
        }
        ;
        if (Grid.ESG.DeleteRow == false) {
            var title = $('.' + NameTable + '_Copy');
            title.attr('style', 'display:none !important;');
        }
        ;
        if (Grid.Column[u].visible == false) {
            Grid.Column[u].style = ' display:none;';
            var Column_td = $('#td_' + NameTable + '_' + Grid.Column[u].Name + cnt);
            Column_td.attr('style', '' + Grid.Column[u].style + '  !important;');
        }
        ;
    };
    for (var u = 0; u < Grid.Column.length; u++) {
        _loop_1(u);
    }
    $('#No_Row_' + NameTable + cnt + '').dblclick(function () {
        if (flagNotClick != true) {
            Grid.ESG.SelectedKey = $('#' + NameTable + '_' + Grid.ESG.PrimaryKey + cnt + '').val();
            Grid.ESG.OnRowDoubleClicked();
        }
        flagNotClick = false;
    });
    if ($('#btnsave_' + NameTable).attr('style').trim() == '') {
        $('.Edit_' + NameTable).removeAttr('disabled');
    }
    ;
    debugger;
    $('#No_Row_' + NameTable + (Grid.ESG.LastCounterAdd - 1) + '').before($('#No_Row_' + NameTable + (cnt) + ''));
    $('#btn_minus_' + NameTable + (cnt) + '').focus();
    debugger;
    if (flagDisplay == true) {
        $("#StatusFlag_" + NameTable + '_' + cnt).val('i');
    }
    Grid.ESG.LastCounter++;
    Grid.ESG.LastCounterAdd++;
}
function DeleteRow(ID, cnt, NameTable) {
    WorningMessage("Do you want to delete?", "Do you want to delete?", "warning", "warning", function () {
        debugger;
        $("#" + ID + "").attr("hidden", "true");
        $("#StatusFlag_" + NameTable + '_' + cnt).val() == 'i' ? $("#StatusFlag_" + NameTable + '_' + cnt).val('m') : $("#StatusFlag_" + NameTable + '_' + cnt).val('d');
    });
}
var DetailsModel = {
    Model: []
};
function addToArray(name, index, value) {
    DetailsModel[name][index] = value;
}
function AssignGridControl(Grid, Newobject) {
    debugger;
    var obj = Grid.ESG.object;
    var NameTable = Grid.ESG.NameTable;
    var LastCountGrid = Grid.ESG.LastCounter;
    //var DetailsModel = new Array<any>();
    DetailsModel = {
        Model: []
    };
    debugger;
    var Model = JSON.parse(JSON.stringify(obj));
    var index = 0;
    Grid.ESG.CountModel = 0;
    for (var i = 0; i < LastCountGrid; i++) {
        debugger;
        var cnt = i;
        var StatusFlag = $("#StatusFlag_" + NameTable + '_' + cnt).val();
        if (StatusFlag != "") {
            Grid.ESG.CountModel = Grid.ESG.CountModel + 1;
        }
        Model = JSON.parse(JSON.stringify(obj));
        if (StatusFlag == "i") {
            GActions.AssignToModel(Model, NameTable, cnt, StatusFlag);
            Model.StatusFlag = StatusFlag;
            addToArray('Model', index, Model);
            //DetailsModel.push(Model);
            index++;
        }
        if (StatusFlag == "u") {
            GActions.AssignToModel(Model, NameTable, cnt, StatusFlag);
            Model.StatusFlag = StatusFlag;
            //DetailsModel.push(Model);
            addToArray('Model', index, Model);
            index++;
        }
        if (StatusFlag == "d") {
            GActions.AssignToModel(Model, NameTable, cnt, StatusFlag);
            Model.StatusFlag = StatusFlag;
            //DetailsModel.push(Model);
            addToArray('Model', index, Model);
            index++;
        }
    }
    debugger;
    Grid.ESG.Model = DetailsModel;
    Grid.ESG.OnfunctionSave();
    return DetailsModel;
}
function ErrorinputGrid(input, NameTable, Mess) {
    $('#DivMassage_' + NameTable).removeClass('display_hidden');
    $('#TextMassage_' + NameTable).html(Mess);
    if (input.selector != null) {
        $('' + input.selector + '').addClass('text_Mandatory');
        $('' + input.selector + '').focus();
        setTimeout(function () {
            $('' + input.selector + '').removeClass('text_Mandatory');
            $('#DivMassage_' + NameTable).addClass('display_hidden');
        }, 5000);
    }
    else {
        input.classList.add('text_Mandatory');
        input.focus();
        setTimeout(function () {
            input.classList.remove('text_Mandatory');
            $('#DivMassage_' + NameTable).addClass('display_hidden');
        }, 5000);
    }
}
function ValidationGrid(Grid, Newobject) {
    var obj = Grid.Column;
    var NameTable = Grid.ESG.NameTable;
    var LastCountGrid = Grid.ESG.LastCounter;
    obj = obj.filter(function (x) { return x.Validation.valid == true; });
    FlagValid = true;
    for (var i = 0; i < LastCountGrid; i++) {
        var cnt = i;
        for (var u = 0; u < obj.length; u++) {
            var Model = JSON.parse(JSON.stringify(obj[u]));
            var element = document.getElementById('' + NameTable + '_' + Model.Name + cnt);
            if (element != null) {
                var con = Model.Validation.conation;
                var Con_Value = Model.Validation.Con_Value;
                var Mess = Model.Validation.Mess;
                if (Model.ColumnType.NameType == 'Input') {
                    if (con[0] == '>') {
                        if (Number(element.value) > Number(Con_Value)) {
                            ErrorinputGrid(element, NameTable, Mess);
                            FlagValid = false;
                            break;
                        }
                    }
                    else if (con[0] == '>=') {
                        if (Number(element.value) >= Number(Con_Value)) {
                            ErrorinputGrid(element, NameTable, Mess);
                            FlagValid = false;
                            break;
                        }
                    }
                    else if (con[0] == '<=') {
                        if (Number(element.value) <= Number(Con_Value)) {
                            ErrorinputGrid(element, NameTable, Mess);
                            FlagValid = false;
                            break;
                        }
                    }
                    else if (con[0] == '<') {
                        if (Number(element.value) < Number(Con_Value)) {
                            ErrorinputGrid(element, NameTable, Mess);
                            FlagValid = false;
                            break;
                        }
                    }
                    else if (con[0] == '==') {
                        if (element.value == Con_Value) {
                            ErrorinputGrid(element, NameTable, Mess);
                            FlagValid = false;
                            break;
                        }
                    }
                    else if (con[0] == '=') {
                        if (element.value == Con_Value) {
                            ErrorinputGrid(element, NameTable, Mess);
                            FlagValid = false;
                            break;
                        }
                    }
                    else {
                        if (Number(element.value) >= 0) {
                            ErrorinputGrid(element, NameTable, Mess);
                            FlagValid = false;
                            break;
                        }
                    }
                }
                if (Model.ColumnType.NameType == 'Dropdown') {
                    if (element.value == 'null') {
                        ErrorinputGrid(element, NameTable, 'يبجب ان يكون فيها قيمه');
                        FlagValid = false;
                        break;
                    }
                }
            }
        }
        if (FlagValid == false) {
            break;
        }
    }
    return FlagValid;
}
function ComputeTotalGridControl(Grid, Newobject) {
    var obj = Grid.ESG.object;
    var NameTable = Grid.ESG.NameTable;
    var LastCountGrid = Grid.ESG.LastCounter;
    var _obj = JSON.parse(JSON.stringify(obj));
    var _keys = Object.keys(_obj).filter(function (this_fruit) { return _obj[this_fruit] !== "" && _obj[this_fruit] !== true && _obj[this_fruit] !== false; });
    var Model = {};
    _keys.forEach(function (key) { return Model[key] = _obj[key]; });
    Model["Ser"] = 0;
    for (var i = 0; i < LastCountGrid; i++) {
        var cnt = i;
        var StatusFlag = $("#StatusFlag_" + NameTable + '_' + cnt).val();
        if (StatusFlag != "d" && StatusFlag != "m") {
            GActions.ComputeTotalToModel(Model, NameTable, cnt, StatusFlag);
        }
        Model["Ser"] += 1;
    }
    Grid.ESG.TotalModel = Model;
    Grid.ESG.OnfunctionTotal();
    return Grid.ESG.TotalModel;
}
function EditGridControl(Grid) {
    var NameTable = Grid.ESG.NameTable;
    $('.Edit_').removeAttr('disabled');
    $('#btnsave_' + NameTable).attr('style', '');
    if (Grid.ESG.DeleteRow == true) {
        var btn_minus = $('.td_btn_minus_' + NameTable + '');
        btn_minus.attr('style', ' ');
        var nam = NameTable + '_Delete';
        var title = $('.' + nam + '');
        title.attr('style', ' ');
        var btn_Copy = $('.td_btn_Copy_' + NameTable + '');
        btn_Copy.attr('style', ' ');
        var name_1 = NameTable + '_Copy';
        var titlee = $('.' + name_1 + '');
        titlee.attr('style', ' ');
    }
    ;
    $('#btnClean_' + NameTable).attr('style', '');
    $('#btnAdd_' + NameTable).attr('style', '');
    $('#btnEdit_' + NameTable).attr('style', 'display:none !important;');
    $('.Edit_But').attr('style', '');
    $('.btn_Copy ').attr('style', 'background-color: cornflowerblue; font-weight: bold; font-size: 22PX; width: 34px; padding: unset; ');
    $('.btn_minus').attr('style', 'font-weight: bold;font-size: 22PX;width: 34px;padding: unset; ');
    Resizable(NameTable);
}
function SetDataSours(data) {
    NewDataSours = data;
}
function CleanGridControl(List, Grid) {
    var NameTable = Grid.ESG.NameTable;
    $('#btnEdit_' + NameTable).attr('style', '');
    $('#btnsave_' + NameTable).attr('style', 'display:none !important;');
    $('.' + NameTable + '_Delete').attr('style', 'display:none !important;');
    $('#btnClean_' + NameTable).attr('style', 'display:none !important;');
    $('#btnAdd_' + NameTable).attr('style', 'display:none !important;');
    Grid.ESG.LastCounter = 0;
    Grid.ESG.LastCounterAdd = 0;
    //DisplayDataGridControl(List, Grid)
    showGridData(Grid, Grid.ESG.NewDataSours);
}
function CopyRow(Grid, index) {
    var obj = Grid.ESG.object;
    var NameTable = Grid.ESG.NameTable;
    var LastCountGrid = Grid.ESG.LastCounter;
    var RowCopy = 0;
    debugger;
    for (var i = 0; i < LastCountGrid; i++) {
        debugger;
        var CopyModel = JSON.parse(JSON.stringify(obj));
        var cnt = i;
        var StatusFlag = $("#StatusFlag_" + NameTable + '_' + cnt).val();
        if (cnt == index) {
            GActions.AssignToModel(CopyModel, NameTable, cnt, StatusFlag);
            CopyModel.Ser = LastCountGrid;
            //CopyModel.StatusFlag = 'i';
            BuildGridControl(true, Grid);
            BuildCopy(Grid, CopyModel, LastCountGrid);
            RowCopy = LastCountGrid;
            //$("#StatusFlag_" + NameTable + '_' + (cnt + 1)).val('i');
            //Grid.ESG.LastCounter++; 
            Grid.ESG.LastCounterAdd = Grid.ESG.LastCounterAdd - 1;
            break;
        }
    }
    $('#No_Row_' + NameTable + index + '').after($('#No_Row_' + NameTable + RowCopy + ''));
}
function BuildCopy(Grid, List, cnt) {
    debugger;
    var NameTable = Grid.ESG.NameTable;
    var properties = Object.getOwnPropertyNames(List);
    for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
        var property = properties_1[_i];
        var element = document.getElementById('' + NameTable + '_' + property + cnt);
        if (element != null) {
            if (element.type == "checkbox")
                if (List[property] == 1 || List[property] == true) {
                    element.checked = true;
                }
                else {
                    element.checked = false;
                }
            else
                element.value = List[property];
        }
    }
    //for (let u = 0; u < List.length; u++) {
    //    debugger
    //    try {
    //        //var values: Array<any> = Object["values"](List);
    //        //if (Grid.Column[u].ColumnType.NameType == 'Input') {
    //        //    $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').val(values[u]);
    //        //}
    //        //if (Grid.Column[u].ColumnType.NameType == 'Dropdown') {
    //        //    $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').val(values[u]);
    //        //}
    //        //if (Grid.Column[u].ColumnType.NameType == 'Button') {
    //        //    $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').val(values[u]);
    //        //}
    //        //if (Grid.Column[u].ColumnType.NameType == 'checkbox') {
    //        //    if (values[u] == 1 || values[u] == true) {
    //        //        $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').prop('checked', true)
    //        //    }
    //        //    else {
    //        //        $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').prop('checked', false)
    //        //        $('#' + NameTable + '_' + Grid.Column[u].Name + cnt + '').prop('checked', true)
    //        //    }
    //        //}
    //    } catch (e) {
    //    }
    //}
}
function showGridData(Grid, Modelstring) {
    Grid.ESG.LastCounter = 0;
    Grid.ESG.LastCounterAdd = 0;
    Grid.ESG.NewDataSours = Modelstring;
    //SetDataSours(Model_2.toString())
    $('#tbody_' + Grid.ESG.NameTable + '').html('');
    $('#tbody_' + Grid.ESG.NameTable + '').append(Modelstring);
    Resizable(Grid.ESG.NameTable);
    $('[data-toggle="table"]').bootstrapTable();
    //DisplayDataGridControl(Model_2, Grid);
    //-------------------------------------------------------------
    var count = $('#table_' + Grid.ESG.NameTable + ' tr').length;
    count = count - 1;
    Grid.ESG.LastCounter = count;
    Grid.ESG.LastCounterAdd = 1;
    $('.Edit_But').attr('style', 'display:none !important;');
    $('.Edit_But').attr('style', 'display:none !important;');
    $('.btn_minus').click(function (e) {
        flagNotClick = true;
        var cnt = Number($(this).attr('Data_cnt'));
        DeleteRow('No_Row_' + Grid.ESG.NameTable + cnt, cnt, Grid.ESG.NameTable);
    });
    $('.btn_Copy').click(function (e) {
        flagNotClick = true;
        debugger;
        var cnt = Number($(this).attr('Data_cnt'));
        CopyRow(Grid, cnt);
        debugger;
        $("#StatusFlag_" + Grid.ESG.NameTable + '_' + cnt + 1).val('i');
    });
    $('.Input_Text').change(function (e) {
        debugger;
        var idStatusFlag = $(this).attr('Data_idStatus');
        if ($("#" + idStatusFlag + "").val() != "i")
            $("#" + idStatusFlag + "").val("u");
    });
}
var GActions = {
    AssignToModel: function (Model, NameTable, cnt, StatusFlag) {
        debugger;
        var properties = Object.getOwnPropertyNames(Model);
        for (var _i = 0, properties_2 = properties; _i < properties_2.length; _i++) {
            var property = properties_2[_i];
            var element = document.getElementById('' + NameTable + '_' + property + cnt);
            if (element != null) {
                if (element.type == "checkbox") {
                    Model[property] = element.checked;
                }
                else if (element.type == "date") {
                    Model[property] = DateFormatNew(element.value);
                }
                else {
                    Model[property] = element.value;
                }
                //addToArray('Model', property, element.value)
            }
        }
        return Model;
    },
    ComputeTotalToModel: function (Model, NameTable, cnt, StatusFlag) {
        var properties = Object.getOwnPropertyNames(Model);
        for (var _i = 0, properties_3 = properties; _i < properties_3.length; _i++) {
            var property = properties_3[_i];
            var element = document.getElementById('' + NameTable + '_' + property + cnt);
            if (element != null) {
                if (element.type != "checkbox")
                    try {
                        Model[property] += Number(element.value);
                    }
                    catch (e) {
                    }
            }
        }
        return Model;
    },
};
function pageSize() {
    $('#table_Grad1').bootstrapTable({
        cache: false,
        height: 400,
        striped: true,
        pagination: true,
        pageSize: 5,
        pageList: [5, 10, 25, 50, 100, 200] //list can be specified here
    });
}
function Resizable(NameTable) {
    $('.' + NameTable + '_Delete').attr('style', 'width: 1% !important;');
    $('.' + NameTable + '_Copy').attr('style', 'width: 1% !important;');
    $('[data-toggle="table"]').bootstrapTable();
}
//# sourceMappingURL=EslamGrid.js.map
var DataTable = /** @class */ (function () {
    function DataTable() {
        this.dataScr = new Array();
        this.Columns = new Array();
        this.column_defs = new Array();
        this.EnableSorting = false;
        this.EnableFiltring = false;
        this.EnablePaging = false;
        this.PageSize = 50;
        this.Initalized = false;
        this.Env = GetSystemEnvironment();
    }
    DataTable.prototype.InitalizeEvents = function (e) {
        var row = $("#SearchDataTable tbody tr td").DataTable();
        var currentIndex = row.index;
        var index = 0;
        if (this.EnablePaging == true) {
            var currentPageIndex = $("#SearchDataTable").DataTable('option', 'currentPageIndex');
            var prevPagesCount = currentPageIndex - 1;
            index = (currentPageIndex * this.PageSize) + currentIndex;
        }
        else
            index = currentIndex;
        this.SelectedItem = this.dataScr[index];
        this.SelectedIndex = index;
        this.SelectedKey = row.id;
    };
    DataTable.prototype.Initalize = function () {
    };
    DataTable.prototype.Dispose = function () {
        $("#" + this.ElementName).off();
    };
    DataTable.prototype.Bind = function () {
        debugger;
        this.Initalize();
        var selectionCloumn = SearchGrid.SearchDataGrid.PrimaryKey;
        this.Columns = this.Columns.filter(function (row) { return row.hidden != true; });
        for (var index = 0; index < this.Columns.length; index++) {
            var ss = this.Columns[index].key;
            if (ss.indexOf('Date') > -1 || ss.indexOf('date') > -1) {
                debugger;
                //for (var itm of this.dataScr) {
                //    alert(ss)
                //    debugger 
                //    itm[ss] = DateFormat(itm[ss]);
                //}
            }
            var newColumn = {
                "data": this.Columns[index].key,
                "title": this.Columns[index].headerText,
                "visible": !this.Columns[index].hidden,
                "width": this.Columns[index].width,
                "dataType": this.Columns[index].dataType,
            };
            this.column_defs.push(newColumn);
        }
        this.dataScr = this.dataScr.filter(function (row) { return row.hidden != true; });
        var tableHeaders = "";
        this.column_defs.forEach(function (col) {
            var _width = "style = 'width: " + col.width + ";max-width: " + col.width + ";min-width: " + col.width + ";'";
            tableHeaders += "<th " + _width + ">" + col.title + "</th>";
        });
        this.language_app =
            {
                "sProcessing": "جارٍ التحميل...",
                "sLengthMenu": "أظهر _MENU_ مدخلات",
                "sZeroRecords": "لم يعثر على أية سجلات",
                "sInfo": "إظهار _START_ إلى _END_ من أصل _TOTAL_ مدخل",
                "sInfoEmpty": "يعرض 0 إلى 0 من أصل 0 سجل",
                "sInfoFiltered": "(منتقاة من مجموع _MAX_ مُدخل)",
                "sInfoPostFix": "",
                "sSearch": "ابحث:",
                "sUrl": "",
                "oPaginate": {
                    "sFirst": "الأول",
                    "sPrevious": "السابق",
                    "sNext": "التالي",
                    "sLast": "الأخير"
                }
            };
        $("#tableDiv").empty();
        $("#tableDiv").append('  <table id="SearchDataTable" class="display" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead></table>');
        debugger;
        var table = $('#SearchDataTable').dataTable({
            "destroy": true,
            "data": this.dataScr,
            "columns": this.column_defs,
            language: this.language_app
        });
        $('#tableDiv .row .col-sm-12').addClass("table-responsive");
        $('#tableDiv .sorting').addClass("px-5");
        $('#tableDiv td').addClass("px-5");
        $('#SearchDataTable tbody').on('click', 'tr', function () {
            debugger;
            var tableData = $(this).children("td").map(function () {
                return $(this).text();
            }).get();
            //alert("Your data is: " + tableData[0] + " , " + tableData[1] );
            //console.log(table.row(this).data());
            //var data1 = this.dataScr()
            //var data = table.row(this).dataScr()
            //console.log(data)
            //console.log("SelectedKey: " + SearchGrid.SearchDataGrid.PrimaryKey);
            //console.log(SearchGrid.SearchDataGrid.SelectedKey);
            try {
                SearchGrid.SearchDataGrid.SelectedKey = tableData;
                //SearchGrid.SearchDataGrid.SelectedKey = table.row(this).data()[SearchGrid.SearchDataGrid.PrimaryKey];
                SearchGrid.SearchDataGrid.OnDoubleClick();
            }
            catch (e) {
            }
        });
    };
    DataTable.prototype.closeSearch = function () {
        $('#btnCloseSearch').click(function () {
            this.Initalize();
        });
    };
    return DataTable;
}());
//# sourceMappingURL=DataTable.js.map
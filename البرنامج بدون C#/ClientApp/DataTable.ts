﻿
class DataTable {

    public ElementName: string;
    public dataScr: Array<any> = new Array<any>();
    public Columns: Array<datatableColumn> = new Array<datatableColumn>();
    public column_defs: Array<datatableColumn> = new Array<datatableColumn>();

    public OnRowSlected: () => void;
    public OnDoubleClick: () => void;

    public SelectedIndex: number;
    public SelectedKey: any;
    public SelectedItem: any;

    public EnableSorting: boolean = false;
    public EnableFiltring: boolean = false;
    public EnablePaging: boolean = false;
    public PageSize: number = 50;
    public language_app:any;

    public PrimaryKey: string;
    public OnFiltering: (evt, ui) => void;

    private Initalized: boolean = false;
    public Env = GetSystemEnvironment();
    private InitalizeEvents(e: JQueryEventObject) {
         
        let row = $("#SearchDataTable tbody tr td").DataTable();

        let currentIndex: number = row.index;
        let index: number = 0;
        if (this.EnablePaging == true) {
            let currentPageIndex: number = $("#SearchDataTable").DataTable('option', 'currentPageIndex');
            let prevPagesCount: number = currentPageIndex - 1;
            index = (currentPageIndex * this.PageSize) + currentIndex;
        }
        else
            index = currentIndex;
        this.SelectedItem = this.dataScr[index];
        this.SelectedIndex = index;
        this.SelectedKey = row.id;
    }

    private Initalize() {

    }

    public Dispose() {
        $("#" + this.ElementName).off();
    }

    public Bind() {
         

        debugger

        this.Initalize();

        var selectionCloumn: string = SearchGrid.SearchDataGrid.PrimaryKey;

        this.Columns = this.Columns.filter(row => row.hidden != true);

        for (var index = 0; index < this.Columns.length; index++) {
            let ss = this.Columns[index].key;
            if (ss.indexOf('Date') > -1 || ss.indexOf('date') > -1) {
                debugger
                //for (var itm of this.dataScr) {
                //    alert(ss)
                //    debugger 
                //    itm[ss] = DateFormat(itm[ss]);
                //}
            }
            var newColumn: datatableColumn = {
                "data": this.Columns[index].key,
                "title": this.Columns[index].headerText,
                "visible": !this.Columns[index].hidden,
                "width": this.Columns[index].width,
                "dataType": this.Columns[index].dataType,
            };
            this.column_defs.push(newColumn);
        }
         

        this.dataScr = this.dataScr.filter(row => row.hidden != true);

        var tableHeaders = "";
        this.column_defs.forEach(col => {
            var _width: string = "style = 'width: " + col.width + ";max-width: " + col.width + ";min-width: " + col.width + ";'";
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
                } 


        $("#tableDiv").empty();
        $("#tableDiv").append('  <table id="SearchDataTable" class="display" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead></table>');
        debugger
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

            debugger
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
            } catch (e) {
            }
        });

    }

    public closeSearch() {
        $('#btnCloseSearch').click(function () {
            this.Initalize();
           
        });
    }
}



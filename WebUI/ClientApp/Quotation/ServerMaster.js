$(document).ready(function () {
    var AllDisplay = new Array();
    var DetMaxLast = 0;
    var CountGrid = 0;
    var NameModel = "";
    var Html_DataServer_Page = "\n\n      \n\n<style>\n\n    .des {\n        width: 22% !important;\n    }\n\n    .uom {\n        width: 11% !important;\n    }\n\n    .Zero {\n        width: 0% !important;\n    }\n\n    .Price {\n        width: 9% !important;\n    }\n\n    .odd {\n        background-color: lightcoral;\n        font-weight: bold;\n        font-size: 16px;\n        color: black;\n    }\n    .even {\n        background-color: #fff2ce;\n        font-weight: bold;\n        font-size: 16px;\n        color: black;\n    }\n    tr {\n        background-color: #b9b9b9;\n        color: black;\n    }\n\n    .px-5 {\n        padding-left: 3rem !important;\n        padding-right: 3rem !important;\n    }\n\n.dropdown {\n  max-width: 13em;\n  margin: 80px auto 0;\n  position: relative;\n  width: 100%;\n}\n\n.dropdown-btn {\n  background: #1d1f24;\n  font-size: 18px;\n  width: 100%;\n  border: none;\n  color: #fff;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.7em 0.5em;\n  border-radius: 0.5em;\n  cursor: pointer;\n}\n\n.arrow {\n  border-left: 5px solid transparent;\n  border-right: 5px solid transparent;\n  border-top: 6px solid #fff;\n  transition: transform ease-in-out 0.3s;\n}\n\n.dropdown-content {\n  border-radius: 0.5em !important;\n    height: 20px;\n    position: absolute;\n    z-index: 99999;\nwidth: 300px; height: 100px; overflow: auto;\n}\n\n.dropdown-content li {\n  background: #000000bf;\n\n  position: relative; \n  transition: 0.5s;\n  transition-delay: calc(60ms * var(--delay));\n    color: wheat;\nfont-weight: bold;\n}\n\n.dropdown-btn:focus + .dropdown-content li {\n  left: 0;\n}\n\n.dropdown-btn:focus + .dropdown-content {\n  visibility: visible;\n}\n\n.dropdown-btn:focus > .arrow {\n  transform: rotate(180deg);\n}\n\n.dropdown-content li:hover {\n  background: #1d1f24;\n}\n\n.dropdown-content li a {\n  display: block; \n  color: #fff; \n  text-decoration: none;\n}\n \n\n</style>\n<body class=\"materialdesign\">\n    <div id=\"Body_animated\"  class=\"content-inner-all animate__animated animate__bounceInLeft\">\n        <div class=\"sparkline8-graph col-xs-12\" style=\"border-radius: 50px;\">\n\n\n         \n\n            <div class=\"col-xs-12 col-lg-1 col-sm-12 \">\n                <label>Server</label>\n            </div>\n            <div class=\"col-xs-12 col-lg-3 col-sm-12 \">\n\n                <input id=\"Server\" type=\"text\" class=\"form-control \" value=\"108.181.197.82\" name=\"Server\" list=\"ServerName\">\n                <datalist id=\"ServerName\">\n\n                    <option value=\"108.181.197.82\">\n                    <option value=\"192.168.1.50\\SQL2014\">\n                </datalist>\n            </div>\n\n            <div class=\"col-xs-12 col-lg-1 col-sm-12\">\n                <label>User</label>\n            </div>\n            <div class=\"col-xs-12 col-lg-3 col-sm-12\">\n                <input id=\"User\" type=\"text\" class=\"form-control \" value=\"SYSUSER\" name=\"Server\" list=\"UserName\">\n                <datalist id=\"UserName\">\n\n                    <option value=\"SYSUSER\">\n                </datalist>\n            </div>\n\n            <div class=\"col-xs-12 col-lg-1 col-sm-12\">\n                <label>Password</label>\n            </div>\n            <div class=\"col-xs-12 col-lg-3 col-sm-12 animated animate backInDown\">\n                <input id=\"Password\" type=\"text\" class=\"form-control \" value=\"SYSUSER2020\" name=\"Password\" list=\"PasswordName\">\n                <datalist id=\"PasswordName\">\n                    <option value=\"SYSUSER2020\">\n                    <option value=\"SYSUSER\">\n                </datalist>\n            </div>\n\n            <div class=\"col-xs-12\">\n                <br />\n            </div>\n\n            <div class=\"col-xs-12 col-lg-1 col-sm-12\">\n\n            </div>\n\n            <div class=\"col-xs-12 col-lg-3 col-sm-12\">\n                <button id=\"Conact\" value=\"Conact\" class=\"col-xs-12 col-lg-12 col-sm-12 btn btn-custon-four btn-success\">   Conact </button>\n            </div>\n\n\n            <div class=\"col-xs-12 col-lg-1 col-sm-12\">\n                <label>Database</label>\n            </div>\n            <div class=\"col-xs-12 col-lg-3 col-sm-12\">\n                <select id=\"Database\" class=\"form-control \"></select>\n            </div>\n\n\n               <div class=\"col-xs-12 col-lg-1 col-sm-12\">\n                <label>Data Sours</label>\n            </div>\n            <div class=\"col-xs-12 col-lg-3 col-sm-12\">\n                <select id=\"DataSours\" class=\"form-control \"></select>\n            </div>\n\n            <div class=\"col-xs-12\">\n                <br />\n            </div>\n\n       \n\n\n           <div class=\"col-xs-12 col-lg-1 col-sm-12\">\n                <label>Columns Table</label>\n            </div>\n            <div class=\"col-xs-12 col-lg-3 col-sm-12\">\n                <select id=\"Columns_Table\" class=\"form-control \"></select>\n            </div>\n\n            <div class=\"col-xs-12 col-lg-1 col-sm-12\">\n                <label>Order</label>\n            </div>\n            <div class=\"col-xs-12 col-lg-3 col-sm-12\">\n                <select id=\"ORDER_Table\" class=\"form-control \">\n                    <option value=\"DESC\">DESC</option>\n                    <option value=\"ASC\">ASC</option>\n                </select>\n            </div>\n\n            <div class=\"col-xs-12 col-lg-1 col-sm-12\">\n                <label>Top</label>\n            </div>\n            <div class=\"col-xs-12 col-lg-3 col-sm-12\">\n                <select id=\"top\" class=\"form-control \">\n                    <option value=\"100\">100</option>\n                    <option value=\"200\">200</option>\n                    <option value=\"300\">300</option>\n                    <option value=\"400\">400</option>\n                    <option value=\"500\">500</option>\n                    <option value=\"1000\">1000</option>\n                    <option value=\"1500\">1500</option>\n                    <option value=\"2000\">2000</option>\n                    <option value=\"2500\">2500</option>\n                    <option value=\"3000\">3000</option>\n                    <option value=\"4000\">4000</option>\n                    <option value=\"5000\">5000</option>\n                </select>\n            </div>\n\n            <div class=\"col-xs-12\">\n                <br />\n            </div>\n\n           \n\n            <div class=\"col-xs-12 col-lg-1 col-sm-12\">\n                <label>New Query</label>\n            </div>\n            <div class=\"col-xs-12 col-lg-11 col-sm-12\">\n                <button id=\"SelectText\"  class=\"form-control display_none\" value=\"\"  ></button>\n                <textarea id=\"New_Query\" type=\"text\" class=\"form-control \" value=\"\" style=\"height: 150px;\"></textarea>\n                <ul class=\"dropdown-content\" role=\"menu\" id=\"autocompleteList\"></ul>\n            </div>\n\n         \n\n                        <div class=\"col-xs-12\">\n                            <br />\n                        </div>\n             <div class=\"col-xs-12\">\n                            <br />\n                        </div>\n             <div class=\"col-xs-12\">\n                            <br />\n                        </div>\n             <div class=\"col-xs-12\">\n                            <br />\n                        </div>\n             <div class=\"col-xs-12\">\n                            <br />\n                        </div> \n            <div class=\"col-xs-12 col-lg-12 col-sm-12\">\n                <button id=\"GenerateModels\" value=\"Generate Models\" class=\"col-xs-12 col-lg-12 col-sm-12 btn btn-custon-four btn-danger\">    Execute </button>\n            </div>\n\n\n\n\n        </div>\n\n\n\n\n        <div class=\"sparkline8-graph col-xs-12\" style=\"border-radius: 50px;\">\n\n            <div class=\"inside-table my-4\">\n                <h2 id=\"searchTitle\"></h2>\n                <div id=\"tableDiv\">\n\n                </div>\n            </div>\n\n        </div>\n\n        <div id=\"Grad1\" class=\"sparkline8-graph col-xs-12\" style=\"border-radius: 50px;\">\n\n        </div>\n\n\n\n\n    </div>\n     \n\n</body>\n";
    NotesInitalizeComponent();
    function NotesInitalizeComponent() {
        $("#layout_Refresh").addClass('display_none');
        $("#layout_Refresh").attr('style', 'top: 17.5%;');
        $("#Back").on('click', function () {
            $('#Home_Page').removeClass('display_none');
            $('#Body_Page').addClass('display_none');
            $("#layout_Refresh").addClass('display_none');
            $("#layout_Back").addClass('display_none');
            $("#layout_Refresh").attr('style', '');
        });
        var ID = sessionStorage.getItem("AddUserID");
        NameModel = "Notepad/Notepad_" + ID + "_";
        Tabs_click();
        BuildControls(0);
        CountGrid++;
        AddButtonApp_Tap();
    }
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
    function BuildControls(cnt) {
        debugger;
        var label_Html = "";
        label_Html = "\n            <li class=\"nav-item\" Data_Remark=\"tab_" + cnt + "_Server\">\n                <a id=\"a_Tab_" + cnt + "\" class=\"nav-link active\" data-toggle=\"tab\" href=\"#Tab_" + cnt + "\">Server ( " + (cnt + 1) + " )</a>\n            </li>";
        $("#label_Tab").append(label_Html);
        var Area_Html = "";
        Area_Html = "\n            <div class=\"tab-pane   active\" id=\"Tab_" + cnt + "\">\n                <div class=\"card\">\n                    <input id=\"ID" + cnt + "\" type=\"hidden\" value=\"0\" />\n                    <iframe class=\"tearea display_none\" id=\"tab_" + cnt + "_Server\" frameBorder=\"0\"scrolling=\"auto\" width=\"100%\" height=\"650\"></iframe> \n                </div>\n            </div>";
        $("#Area_Tab").append(Area_Html);
        if (cnt != 0) {
            var iframe = document.getElementById('tab_' + cnt + '_Server');
            var x = Url.Action("TestIndex", "Home");
            var UrlPdf = x + "/";
            iframe.src = UrlPdf;
        }
        else {
            LodePage(Html_DataServer_Page, 'ClientApp/Quotation/TestGrad.js');
        }
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
    function LodePage(page, Pathscript) {
        $('#Tab_0').html('');
        var container = document.createElement('div');
        // Step 2: Set the HTML content of the element
        container.innerHTML = page;
        // Step 3: Create a new <script> element
        var scriptElement = document.createElement('script');
        // Step 4: Set the src attribute of the <script> element
        scriptElement.src = Pathscript;
        //scriptElement.src = 'ClientApp/Quotation/Notes.js';
        scriptElement.onload = function () {
        };
        // Step 5: Append the <script> element to the HTML element
        container.appendChild(scriptElement);
        // Append the container element to the desired location on the page
        var bodyPage = document.getElementById('Tab_0');
        bodyPage.appendChild(container);
    }
});
//# sourceMappingURL=ServerMaster.js.map
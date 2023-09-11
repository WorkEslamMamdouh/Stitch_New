
$(document).ready(() => {

    var AllDisplay: Array<DataNotes> = new Array<DataNotes>();

    var DetMaxLast = 0;
    var CountGrid = 0;
    var CountPage = 0;

    var NameModel = "";

    var Html_DataServer_Page = ``

    SetPageServer();

    NotesInitalizeComponent();

    function SetPageServer() {

        Html_DataServer_Page = `

      

<style>

    .des {
        width: 22% !important;
    }

    .uom {
        width: 11% !important;
    }

    .Zero {
        width: 0% !important;
    }

    .Price {
        width: 9% !important;
    }

    .odd {
        background-color: lightcoral;
        font-weight: bold;
        font-size: 16px;
        color: black;
    }
    .even {
        background-color: #fff2ce;
        font-weight: bold;
        font-size: 16px;
        color: black;
    }
    tr {
        background-color: #b9b9b9;
        color: black;
    }

    .px-5 {
        padding-left: 3rem !important;
        padding-right: 3rem !important;
    }

.dropdown {
  max-width: 13em;
  margin: 80px auto 0;
  position: relative;
  width: 100%;
}

.dropdown-btn {
  background: #1d1f24;
  font-size: 18px;
  width: 100%;
  border: none;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7em 0.5em;
  border-radius: 0.5em;
  cursor: pointer;
}

.arrow {
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid #fff;
  transition: transform ease-in-out 0.3s;
}

.dropdown-content {
  border-radius: 0.5em !important;
    height: 20px;
    position: absolute;
    z-index: 99999;
width: 300px; height: 100px; overflow: auto;
}

.dropdown-content li {
  background: #000000bf;

  position: relative; 
  transition: 0.5s;
  transition-delay: calc(60ms * var(--delay));
    color: wheat;
font-weight: bold;
}

.dropdown-btn:focus + .dropdown-content li {
  left: 0;
}

.dropdown-btn:focus + .dropdown-content {
  visibility: visible;
}

.dropdown-btn:focus > .arrow {
  transform: rotate(180deg);
}

.dropdown-content li:hover {
  background: #1d1f24;
}

.dropdown-content li a {
  display: block; 
  color: #fff; 
  text-decoration: none;
}
 

</style>
<body class="materialdesign">
    <div id="Body_animated"  class="content-inner-all animate__animated animate__bounceInLeft">
        <div class="sparkline8-graph col-xs-12" style="border-radius: 50px;">


         

         
            <div class="col-xs-12 col-lg-1 col-sm-12">
                <label>Database</label>
            </div>
            <div class="col-xs-12 col-lg-3 col-sm-12">
                <select id="Database${CountPage}" class="form-control "></select>
            </div>


               <div class="col-xs-12 col-lg-1 col-sm-12">
                <label>Tables</label>
            </div>
            <div class="col-xs-12 col-lg-3 col-sm-12">
                <select id="DataSours${CountPage}" class="form-control "></select>
            </div>

            
           <div class="col-xs-12 col-lg-1 col-sm-12">
                <label>Columns</label>
            </div>
            <div class="col-xs-12 col-lg-3 col-sm-12">
                <select id="Columns_Table${CountPage}" class="form-control "></select>
            </div>

            <div class="col-xs-12">
                <br />
            </div>
            <div class="col-xs-12 col-lg-1 col-sm-12">
                <label>Order</label>
            </div>
            <div class="col-xs-12 col-lg-3 col-sm-12">
                <select id="ORDER_Table${CountPage}" class="form-control ">
                    <option value="DESC">DESC</option>
                    <option value="ASC">ASC</option>
                </select>
            </div>

            <div class="col-xs-12 col-lg-1 col-sm-12">
                <label>Top</label>
            </div>
            <div class="col-xs-12 col-lg-3 col-sm-12">
                <select id="top${CountPage}" class="form-control ">
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="400">400</option>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
                    <option value="1500">1500</option>
                    <option value="2000">2000</option>
                    <option value="2500">2500</option>
                    <option value="3000">3000</option>
                    <option value="4000">4000</option>
                    <option value="5000">5000</option>
                </select>
            </div>

            <div class="col-xs-12">
                <br />
            </div>

           

            <div class="col-xs-12 col-lg-1 col-sm-12">
                <label>New Query</label>
            </div>
            <div class="col-xs-12 col-lg-11 col-sm-12">
                <button id="SelectText${CountPage}"  class="form-control display_none" value=""  ></button>
                <textarea id="New_Query${CountPage}" type="text" class="form-control " value="" style="height: 150px;"></textarea>
                <ul class="dropdown-content" role="menu" id="autocompleteList${CountPage}"></ul>
            </div>

         

                        <div class="col-xs-12">
                            <br />
                        </div>
             <div class="col-xs-12">
                            <br />
                        </div>
             <div class="col-xs-12">
                            <br />
                        </div>
             <div class="col-xs-12">
                            <br />
                        </div>
             <div class="col-xs-12">
                            <br />
                        </div> 
            <div class="col-xs-12 col-lg-12 col-sm-12">
                <button id="GenerateModels${CountPage}" value="Generate Models" class="col-xs-12 col-lg-12 col-sm-12 btn btn-custon-four btn-danger">    Execute </button>
                <button id="RefreshDisplay${CountPage}" value="Generate Models" class="display_none  col-xs-12 col-lg-12 col-sm-12 btn btn-custon-four btn-danger">    RefreshDisplay </button>
            </div>




        </div>




        <div class="sparkline8-graph col-xs-12" style="border-radius: 50px;">

            <div class="inside-table my-4">
                <h2 id="searchTitle${CountPage}"></h2>
                <div id="tableDiv${CountPage}">

                </div>
            </div>

        </div>

        <div id="Grad1${CountPage}" class="sparkline8-graph col-xs-12" style="border-radius: 50px;">

        </div>




    </div>
     

</body>
`;


    }

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



        let ID = sessionStorage.getItem("AddUserID");

        NameModel = "Notepad/Notepad_" + ID + "_";


        Tabs_click();
        BuildControls(0);
        CountGrid++;

        AddButtonApp_Tap();

        var coll = document.getElementsByClassName("Balance");
        var i;

        for (i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function () {
                this.classList.toggle("active_Balance");
                var content = this.nextElementSibling;
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";

                }
            });
        }
    }
    function Tabs_click() {

        $('body').on('click', '.scrollable-tabs li', function () {
            debugger
            $('li').removeClass('actTab');
            $('.scrollable-tabs li a.active').removeClass('active');


            if ($(this).html() != '<a class="" data-toggle="tab" href=""><i class="fa fa-plus-circle Add"></i></a>' && $(this).html() != '<a class="" data-toggle="tab" href="" aria-expanded="true"><i class="fa fa-plus-circle Add"></i></a>' && $(this).html() != '<a class="" data-toggle="tab" href="" aria-expanded="false"><i class="fa fa-plus-circle Add"></i></a>') {

                $(this).addClass('actTab');
                let id_Remark = $(this).attr('Data_Remark');

                setTimeout(function () { $('#' + id_Remark + '').focus(); }, 150);

                let Cnt_Page = Number($(this).attr("data_Cnt_Page"));
                Cnt_Page = Cnt_Page.toString() == 'NaN' ? 0 : Cnt_Page;
                //alert(Cnt_Page) 
                $(".AllButConact").addClass("display_none");
                $("#Div_Conact" + Cnt_Page).removeClass("display_none");

                setTimeout(function () { $("#RefreshDisplay" + Cnt_Page).click(); }, 300);
                
            }


        });

    }

    function BuildControls(cnt: number) {

        debugger

        var label_Html = "";
        label_Html = `
            <li class="nav-item"  data_Cnt_Page="${cnt}" Data_Remark="tab_${cnt}_Server">
                <a id="a_Tab_${cnt}" class="nav-link active" data-toggle="tab" href="#Tab_${cnt}">Server ( ${cnt + 1} )</a>
            </li>`;

        $("#label_Tab").append(label_Html);

        var Area_Html = "";
        Area_Html = `
            <div class="tab-pane   active" id="Tab_${cnt}">
                <div class="card">
                    <input id="ID${cnt}" type="hidden" value="0" />
                    <iframe class="tearea display_none" id="tab_${cnt}_Server" frameBorder="0"scrolling="auto" width="100%" height="650"></iframe> 
                </div>
            </div>`;

        $("#Area_Tab").append(Area_Html);

        debugger
        //if (cnt !=0) {
        //    //var iframe: HTMLIFrameElement = document.getElementById('tab_' + cnt + '_Server') as HTMLIFrameElement;

        //    //let x = Url.Action("TestIndex", "Home");

        //    //let UrlPdf = x + "/";

        //    //iframe.src = UrlPdf;

        //    //sessionStorage.SetItem('Cnt_Page', "" + 1+"");

        //}
        //else {
        //    LodePage(Html_DataServer_Page, 'ClientApp/Quotation/TestGrad.js', cnt)
        //}

        CountPage = cnt;
        $("#Cnt_Page").val(cnt);
        SetPageServer();

        Add_Div_Conact(cnt);
     
        LodePage(Html_DataServer_Page, 'ClientApp/Quotation/TestGrad.js', cnt)

   


        setTimeout(function () {

            if (sessionStorage.getItem('Server') != 'undefined' && sessionStorage.getItem('Server').trim() != '' && sessionStorage.getItem('Server') != undefined) {
                $("#Server" + cnt).val(sessionStorage.getItem('Server'))
                $("#User" + cnt).val(sessionStorage.getItem('User'))
                $("#Password" + cnt).val(sessionStorage.getItem('Password'))
            }

            $("#Conact" + cnt).click();

            setTimeout(function () {
                 
      
                let Database = sessionStorage.getItem('Database');
                //alert(Database)
                if (Database != 'undefined' && Database != 'null' && Database != undefined) {
                    $('#Database' + cnt + ' option[value=' + Database + ']').prop('selected', 'selected').change();
                }

                

            }, 300);

            $(".AllButConact").addClass("display_none");
            $("#Div_Conact" + cnt).removeClass("display_none");
        }, 800);


    }
    function Add_Div_Conact(cnt: number) {
        let Div_Conact = `

           <div id="Div_Conact${cnt}" class="AllButConact">
           <div class="col-xs-12 col-lg-1 col-sm-12 ">
                <label class="_LabelColor">Server</label>
            </div>
            <div class="col-xs-12 col-lg-3 col-sm-12 ">

                <input id="Server${cnt}" type="text" class="form-control _LabelColor" value="108.181.197.82" name="Server" list="ServerName${cnt}">
                <datalist id="ServerName${cnt}">

                    <option value="108.181.197.82">
                    <option value="192.168.1.50\\SQL2014">
                </datalist>
            </div>

            <div class="col-xs-12 col-lg-1 col-sm-12">
                <label class="_LabelColor">User </label>
            </div>
            <div class="col-xs-12 col-lg-3 col-sm-12">
                <input id="User${cnt}" type="text" class="form-control _LabelColor" value="SYSUSER" name="Server" list="UserName${cnt}">
                <datalist id="UserName${cnt}">

                    <option value="SYSUSER">
                </datalist>
            </div>

            <div class="col-xs-12 col-lg-1 col-sm-12">
                <label class="_LabelColor">Password</label>
            </div>
            <div class="col-xs-12 col-lg-3 col-sm-12 animated animate backInDown">
                <input id="Password${cnt}" type="text" class="form-control _LabelColor" value="SYSUSER2020" name="Password" list="PasswordName${cnt}">
                <datalist id="PasswordName${cnt}">
                    <option value="SYSUSER2020">
                    <option value="SYSUSER">
                </datalist>
            </div>



            <div   class="col-xs-12 col-lg-12 col-sm-12">
                 <button id="Conact${cnt}"   class=" col-xs-12 col-lg-12 col-sm-12 btn btn-custon-four btn-success">   Conact </button>
            </div>

         </div>

         `

        $("#Div_Show_Balance").append(Div_Conact);
       
    }
    function AddNewRow() {

        BuildControls(CountGrid);
        CountGrid++;

        AddButtonApp_Tap();
    }
    function AddButtonApp_Tap() {

        setTimeout(function () {
            let a_Tab = document.getElementById("a_Tab_" + (CountGrid - 1));
            a_Tab.click();
            a_Tab.focus();

            $(".tearea").removeClass('display_none');


        }, 20);

        //**********************************************************App_Tap*************************
        const element = document.getElementById("App_Tap");
        element.remove();

        $("#label_Tab").append('<li id="App_Tap" class=""><a class="" data-toggle="tab" href=""><i class="fa fa-plus-circle Add"></i></a></li>');

        $("#App_Tap").on('click', function () {
            AddNewRow();
        });

        const label_Tab = document.getElementById("label_Tab");
        label_Tab.scrollLeft = 1000;
    }
    function LodePage(page: string, Pathscript: string, cnt) {


        $('#Tab_' + cnt).html('');


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
        var bodyPage = document.getElementById('Tab_' + cnt);
        bodyPage.appendChild(container);


    }

})













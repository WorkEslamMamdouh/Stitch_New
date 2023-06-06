
$(document).ready(() => {
    AllPages.InitalizeComponent();
})

namespace AllPages {


    var Html_Home = `
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

    .px-top {
        padding-bottom: 10% !important;
    }

</style>
<body class="materialdesign"  >
    <div class="content-inner-all">
        <div class="sparkline8-graph col-xs-12 animate__animated animate__backInLeft" style=" border-radius: 50px;background-color: #000000b3;color: aliceblue;font-weight: bold; ">


            <div class="col-xs-12 col-lg-12 col-sm-12  ">
                <h1 class="col-xs-12 col-lg-12 col-sm-12 animate__animated animate__jackInTheBox">Eslam Mamdouh</h1>
            </div>

            <div class="col-xs-12 col-lg-6 col-sm-12 px-top">
                <button id="Open_Profile" value="Generate Models" class="col-xs-12 col-lg-12 col-sm-12 btn btn-custon-four btn-success animate__animated animate__fadeInBottomRight">      Profile </button>
            </div>
            <div class="col-xs-12 col-lg-6 col-sm-12 px-top">
                <button id="Open_Notes" value="Generate Models" class="col-xs-12 col-lg-12 col-sm-12 btn btn-custon-four btn-warning  animate__animated animate__fadeInBottomRight">      Notes </button>
            </div>
            <div class="col-xs-12 col-lg-6 col-sm-12 px-top">
                <button id="Open_Data_Server" value="Generate Models" class="col-xs-12 col-lg-12 col-sm-12 btn btn-custon-four btn-info animate__animated animate__fadeInBottomRight ">      Data Server </button>
            </div>
            <div class="col-xs-12 col-lg-6 col-sm-12 px-top">
                <button id="Open_Get_Views" value="Generate Models" class="col-xs-12 col-lg-12 col-sm-12 btn btn-custon-four btn-danger  animate__animated animate__fadeInBottomRight">    Work </button>
            </div>
            <div class="col-xs-12 col-lg-6 col-sm-12 px-top">
                <button id="Open_Test_Code" value="Generate Models" class="col-xs-12 col-lg-12 col-sm-12 btn btn-custon-four btn-info  animate__animated animate__fadeInBottomRight" style="background-color: burlywood;">    Test Code </button>
            </div>

            <div class="col-xs-12 col-lg-6 col-sm-12 px-top">
                <button id="Open_Money_Wallet" value="Generate Models" class="col-xs-12 col-lg-12 col-sm-12 btn btn-custon-four btn-info  animate__animated animate__fadeInBottomRight" style="background-color: #002980;">    Money Wallet </button>
            </div>

            <div id="Pages" class="col-xs-12 col-lg-12 col-sm-12">

            </div>



        </div>





    </div>



    <script>

       


    </script>
</body> `;

    var Html_Notes = `
 
<body class="materialdesign"> 
    <div class="responsive__tabs animate__animated animate__backInLeft"> 
        <ul id="label_Tab" class="scrollable-tabs ">
      <li id="Back" onclick="history.back()" class="nav-item">
                    <a id="Back" class="nav-link" data-toggle="tab" href="">
                        <i id="Back" class="fa-solid fa-reply-all fa-fade back" style="font-size: 40px;color: #df0303;"></i>
                    </a>
                </li>
            <li id="App_Tap" class=""><a class="" data-toggle="tab" href=""><i class="fa fa-plus-circle Add"></i></a></li>
 
        </ul>
 
        <div id="Area_Tab" class="tab-content">
 
        </div>
    </div> 
</body>
`;


    var Html_Wallet = `

<body class="materialdesign sparkline8-graph col-xs-12  ">
 

    <div id="Pass" class="display_none content-inner-all animate__animated animate__backInLeft">
        <div id=" " class="sparkline8-graph col-xs-12  " style="border-radius: 50px;">
            <div class="col-xs-12 col-lg-12 col-sm-12">
                <br />
            </div>
            <div class="col-xs-12 col-lg-12 col-sm-12">
                <h1>Password</h1>
            </div>
            <div class="col-xs-12 col-lg-5 col-sm-12">
            </div>
            <div class="col-xs-12 col-lg-2 col-sm-12">
                <input id="txtPassword" type="password" pattern="[0-9]*" inputmode="numeric" class="  form-control  " placeholder="Password" style="text-align: center;">

            </div>
            <div class="col-xs-12 col-lg-12 col-sm-12">
            </div>
            <div class="col-xs-12 col-lg-5 col-sm-12">
            </div>
            <div class="col-xs-12 col-lg-2 col-sm-12">
                <button id="btnLogin" class="col-xs-12 col-lg-12 col-sm-12 btn btn-custon-four btn-info"> Login </button>
            </div>

            <div class="col-xs-12 col-lg-12 col-sm-12">
                <br />
            </div>
        </div>
    </div>

    <div id="Page_mone" class="responsive__tabs animate__animated animate__backInLeft display_none">
 
        <ul id="label_Tab" class="scrollable-tabs ">
            <li id="Back" onclick="history.back()" class="nav-item">
                <a id="Back" class="nav-link" data-toggle="tab" href=""> 
                    <i id="Back" class="fa-solid fa-reply-all fa-fade back" style="font-size: 40px;color: #df0303;"></i>
                </a>
            </li>

            <li id="a_Expans" class="nav-item actTab active Respon_width" data_remark="tab_0_Remark">
                <a id="a_Expans" class="nav-link" data-toggle="tab" href="#Tab_0" aria-expanded="true">مصروفات  </a>
            </li>

            <li id="a_Resive" class="nav-item Respon_width" data_remark="tab_1_Remark">
                <a id="a_Resive" class="nav-link" data-toggle="tab" href="#Tab_1"> ايرادات  </a>
            </li>

            <li id="a_View" class="nav-item Respon_width" data_remark="tab_2_Remark">
                <a id="a_View" class="nav-link" data-toggle="tab" href="#Tab_2">  الماليات</a>
            </li>

            <li id="App_Ref" onclick="location.reload()" class="">
                <a class="" data-toggle="tab" href="">
                    <i class="fa-solid fa-clock-rotate-left fa-beat Refresh"></i>
                </a>

            </li>





        </ul>


        <div class="col-xs-12 col-lg-12 col-sm-12 ">
            <br />
        </div>

        <div class="col-xs-12 col-lg-6 col-sm-12 ">
            <label id="BalanceLab">All Balance ( 0 )</label>
        </div>


        <div class="col-xs-12 col-lg-6 col-sm-12 ">
            <label id="TrNoLab">TrNo ( 0 )</label>
            <input id="txtTrNo" type="hidden" class="form-control " name="ID" />
        </div>

 
        <div id="Rec_Exch_Tab" class="tab-content ">


            <div class="col-xs-12 col-lg-12 col-sm-12 ">
                <br />
            </div>


            <div class="col-xs-12 col-lg-1 col-sm-12 ">
                <label>Type</label>
            </div>
            <div class="col-xs-12 col-lg-5 col-sm-12 ">
                <select id="TypeSours" class="form-control ">
                    <option value="Cash">Cash</option>
                    <option value="Al ahly Bank">Al-ahly Bank</option>
                    <option value="Cairo Bank">Cairo Bank</option>
                </select>
            </div>

            <div class="col-xs-12 col-lg-1 col-sm-12 ">
                <label>Date</label>
            </div>
            <div class="col-xs-12 col-lg-5 col-sm-12 ">
                <input id="txtdate" type="date" name="TrDate" class="form-control " />
            </div>


            <div class="col-xs-12 col-lg-12 col-sm-12 ">
                <br />
            </div>

            <div class="col-xs-12 col-lg-1 col-sm-12 ">
                <label>Remark</label>
            </div>
            <div class="col-xs-12 col-lg-11 col-sm-12 ">
                <textarea id="txtRemark" type="text" class="form-control " value="" name="Remars" spellcheck="false"></textarea>
            </div>

            <div class="col-xs-12 col-lg-12 col-sm-12 ">
                <br />
            </div>

            <div class="col-xs-12 col-lg-1 col-sm-12 ">
                <label>Amount</label>
            </div>
            <div class="col-xs-12 col-lg-11 col-sm-12 ">
                <input id="txtAmount" type="tel" inputmode="numeric" name="Amount" class="form-control " />
            </div>


            <div class="col-xs-12 col-lg-12 col-sm-12 ">
                <br />
            </div>

            <div class="col-xs-12 col-lg-12 col-sm-12 ">
                <button id="btnExchange" class="col-xs-12 col-lg-12 col-sm-12 btn btn-custon-four btn-danger">    Exchange </button>
                <button id="btnReceipt" class="col-xs-12 col-lg-12 col-sm-12 btn btn-custon-four btn-success">    Receipt </button>
            </div>

        </div>


        <div id="Views_Tab" class="tab-content display_none ">
            <div class="col-xs-12 col-lg-12 col-sm-12 ">
                <br />
            </div>

            <div class="col-xs-2 col-lg-1 col-sm-2 ">
                <label>TrTrans</label>
            </div>
            <div class="col-xs-4 col-lg-5 col-sm-4 ">
                <select id="TypeSoursF" class="form-control ">
                    <option value="All">All</option>
                    <option value="Cash">Cash</option>
                    <option value="Al ahly Bank">Al-ahly Bank</option>
                    <option value="Cairo Bank">Cairo Bank</option>
                </select>
            </div>

            <div class="col-xs-2 col-lg-1 col-sm-2 ">
                <label>TrType</label>
            </div>

            <div class="col-xs-4 col-lg-5 col-sm-4 ">
                <select id="TrType" class="form-control ">
                    <option value="All">All</option>
                    <option value="Receipt">Receipt</option>
                    <option value="Exchange">Exchange</option>
                </select>
            </div>


            <div class="col-xs-12 col-lg-12 col-sm-12">
                <br />
            </div>

            <div class="col-xs-12 col-lg-1 col-sm-12">
                <label>From Data</label>
            </div>
            <div class="col-xs-12 col-lg-5 col-sm-12">
                <input id="txtDateFrom" type="date" class="form-control ">
            </div>

            <div class="col-xs-12 col-lg-1 col-sm-12">
                <label>To Data</label>
            </div>
            <div class="col-xs-12 col-lg-5 col-sm-12">
                <input id="txtDateTo" type="date" class="form-control ">
            </div>

            <div class="col-xs-12 col-lg-12 col-sm-12 ">
                <br />
            </div>



            <div class="col-xs-12 col-lg-12 col-sm-12">
                <button id="btnShow" class="col-xs-12 col-lg-12 col-sm-12 btn btn-custon-four btn-info">    Show </button>
            </div>

            <div class="sparkline8-graph col-xs-12" style="border-radius: 50px;">

                <div class="inside-table my-4">
                    <div class="col-xs-12 col-lg-1 col-sm-12">
                        <label style="font-weight: bold;font-size: 17px;"> Search 🔎</label>
                    </div>
                    <div class="col-xs-12 col-lg-4 col-sm-12">
                        <input id="txtSearch" type="text" class="  form-control " placeholder="Search : ">
                    </div>


                    <h2 id="searchTitle">  <br /></h2>
                    <div id="JGrid">

                    </div>

                    <div class="col-xs-12 col-lg-2 col-sm-12">
                    </div>
                    <div class="col-xs-12 col-lg-2 col-sm-12">
                        <label style="font-weight: bold;font-size: 17px;"> Total Amount </label>
                    </div>

                    <div class="col-xs-12 col-lg-4 col-sm-12">
                        <input id="txtTotal" type="text" class="  form-control " placeholder="Amount : ">
                    </div>

                </div>

            </div>

        </div>

    </div>


</body>
`;


    var Html_Profile = `



<body class="materialdesign">
    <div id="Pass" class="display_none content-inner-all animate__animated animate__backInLeft">
        <div id=" " class="sparkline8-graph col-xs-12  " style="border-radius: 50px;">
            <div class="col-xs-12 col-lg-12 col-sm-12">
                <br />
            </div>
            <div class="col-xs-12 col-lg-12 col-sm-12">
                <h1>Password</h1>
            </div>
            <div class="col-xs-12 col-lg-5 col-sm-12">
            </div>
            <div class="col-xs-12 col-lg-2 col-sm-12">
                <input id="txtPassword" type="password" pattern="[0-9]*" inputmode="numeric" class="  form-control  " placeholder="Password" style="text-align: center;">

            </div>
            <div class="col-xs-12 col-lg-12 col-sm-12">
            </div>
            <div class="col-xs-12 col-lg-5 col-sm-12">
            </div>
            <div class="col-xs-12 col-lg-2 col-sm-12">
                <button id="btnLogin" class="col-xs-12 col-lg-12 col-sm-12 btn btn-custon-four btn-info"> Login </button>
            </div>

            <div class="col-xs-12 col-lg-12 col-sm-12">
                <br />
            </div>
        </div>
    </div>
    <div id="Page_Profile" class="content-inner-all display_none animate__animated animate__backInLeft">
        <div id="id_div_Filter" class="sparkline8-graph col-xs-12" style="border-radius: 50px;">

            <div class="col-xs-12 col-lg-12 col-sm-12">

                <h1 class="col-xs-12 col-lg-12 col-sm-12">My Profile</h1>
            </div>

            <div class="col-xs-12 col-lg-1 col-sm-12 ">
                <label>Type</label>
            </div>
            <div class="col-xs-12 col-lg-3 col-sm-12 ">
                <select id="dbTypeF" class="form-control ">
                    <option value="All">All</option>
                    <option value="Notes">Notes</option>
                    <option value="Email">Email</option>
                    <option value="Work Out">Work Out</option>
                    <option value="Credit">Credit</option>
                </select>
            </div>

            <div class="col-xs-12 col-lg-1 col-sm-12">
                <label>From Data</label>
            </div>
            <div class="col-xs-12 col-lg-3 col-sm-12">
                <input id="txtDateFrom" type="date" class="form-control ">
            </div>

            <div class="col-xs-12 col-lg-1 col-sm-12">
                <label>To Data</label>
            </div>
            <div class="col-xs-12 col-lg-3 col-sm-12 animated animate backInDown">
                <input id="txtDateTo" type="date" class="form-control ">
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
            <div class="col-xs-6 col-lg-6 col-sm-6">
                <button id="btnShow" class="col-xs-12 col-lg-12 col-sm-12 btn btn-custon-four btn-info">    Show </button>
            </div>
            <div class="col-xs-6 col-lg-6 col-sm-6">
                <button id="btnAdd" class="col-xs-12 col-lg-12 col-sm-12 btn btn-custon-four btn-success">    Add </button>
            </div>




            <div class="sparkline8-graph col-xs-12" style="border-radius: 50px;">

                <div class="inside-table my-4">
                    <div class="col-xs-12 col-lg-1 col-sm-12">
                        <label style="font-weight: bold;font-size: 17px;"> Search 🔎</label>
                    </div>
                    <div class="col-xs-12 col-lg-4 col-sm-12">
                        <input id="txtSearch" type="text" class="  form-control " placeholder="Search : ">
                    </div>


                    <h2 id="searchTitle">  <br /></h2>
                    <div id="JGrid">

                    </div>
                </div>

            </div>


        </div>










        <div id="Div_control" class="sparkline8-graph col-xs-12 display_none" style="border-radius: 50px;">


            <div class="col-xs-12 col-lg-1 col-sm-12 ">
                <label>TrNo</label>
            </div>
            <div class="col-xs-12 col-lg-3 col-sm-12 ">
                <input id="txtTrNo" type="number" name="ID" disabled="disabled" class="  form-control ">
            </div>

            <div class="col-xs-12 col-lg-1 col-sm-12">
                <label>TrData</label>
            </div>
            <div class="col-xs-12 col-lg-3 col-sm-12">
                <input id="txtTrDate" type="date" name="TrData" class="_dis form-control ">
            </div>

            <div class="col-xs-12 col-lg-1 col-sm-12 ">
                <label>Type</label>
            </div>
            <div class="col-xs-12 col-lg-3 col-sm-12 ">
                <select id="dbTypeH" class="form-control _dis" name="Type">
                    <option value="Notes">Notes</option>
                    <option value="Email">Email</option>
                    <option value="Work Out">Work Out</option>
                    <option value="Credit">Credit</option>
                </select>
            </div>
            <div class="col-xs-12 col-lg-12 col-sm-12">
                <br />
            </div>

            <div class="col-xs-12 col-lg-1 col-sm-12">
                <label>Title</label>
            </div>
            <div class="col-xs-12 col-lg-7 col-sm-12">
                <input id="txtTitle" type="text" name="Title" class="_copy _dis form-control ">
            </div>

            <div class="col-xs-12 col-lg-12 col-sm-12">
                <br />
            </div>

            <div class="col-xs-12 col-lg-1 col-sm-12">
                <label>Remars</label>
            </div>
            <div class="col-xs-12 col-lg-11 col-sm-12">
                <textarea id="txtRemars" type="text" name="Remars" class="_copy _dis form-control "></textarea>
            </div>

            <div class="col-xs-12 col-lg-12 col-sm-12">
                <br />
            </div>
            <div class="col-xs-12 col-lg-12 col-sm-12">
                <button id="btnUpdate" class="col-xs-12 col-lg-12 col-sm-12 btn btn-custon-four btn-info">     Update </button>
            </div>
            <div class="col-xs-6 col-lg-6 col-sm-6">
                <button id="btnBack" class="col-xs-12 col-lg-12 col-sm-12 btn btn-custon-four btn-warning">     Back </button>
            </div>
            <div class="col-xs-6 col-lg-6 col-sm-6">
                <button id="btnSave" class="col-xs-12 col-lg-12 col-sm-12 btn btn-custon-four btn-success">    Save </button>
            </div>

            <div class="col-xs-12 col-lg-12 col-sm-12">

            </div>
            <div class="col-xs-12 col-lg-12 col-sm-12">
                <br />
            </div>


            <div class="bootstrap-table">
                <div class="fixed-table-toolbar">
                    <div class="bs-bars pull-left">
                    </div>
                </div>
                <div class="fixed-table-container" style="padding-bottom: 0px;">
                    <div class="fixed-table-header" style="display: none;">
                        <table></table>
                    </div>
                    <div class="fixed-table-body" style="height: 460px; overflow: scroll;">
                        <div class="fixed-table-loading" style="top: 41px;">Loading, please wait...</div>
                        <table id="table_Grad1" data-toggle="table" data-page-number="2" data-page-size="5" data-pagination="true" data-resizable="true" data-cookie="true" data-cookie-id-table="saveId" data-show-export="false" data-click-to-select="true" data-toolbar="#toolbar" class="table table-hover">
                            <thead id="thead_Grad1">
                                <tr>
                                    <th class=" Text_right Delet" style="width: 0.1% !important;" data-field="number" tabindex="0"><div class="th-inner ">  </div><div class="fht-cell"></div></th>
                                    <th class=" Text_right Ser" style="width: 0.7% !important;" data-field="number" tabindex="0"><div class="th-inner ">Ser</div><div class="fht-cell"></div></th>
                                    <th class=" Text_right Decs" style="width: 5% !important;" data-field="number" tabindex="0"><div class="th-inner ">Description</div><div class="fht-cell"></div></th>
                                    <th class=" Text_right Rem" style="width: 10%  !important;" data-field="number" tabindex="0"><div class="th-inner ">Remark</div><div class="fht-cell"></div></th>
                                    <th class=" Text_right Url" style="width: 5% !important;" data-field="number" tabindex="0"><div class="th-inner ">Url</div><div class="fht-cell"></div></th>
                                    <th class=" Text_right Ope" style="width: 2% !important;" data-field="number" tabindex="0"><div class="th-inner ">Open</div><div class="fht-cell"></div></th>

                                </tr>
                            </thead>
                            <tbody id="div_Data"></tbody>
                        </table>
                        <div class="d-flex justify-content-start mr-1">
                            <button id="btnAddDetails" class="_Cont btn btn-custon-four btn-success oo"><i class="fa fa-plus"></i></button>
                        </div>
                    </div>
                    <div class="fixed-table-footer" style="display: none;">
                        <table><tbody><tr></tr></tbody></table>
                    </div><div class="fixed-table-pagination" style="display: none;"><div class="pull-left pagination-detail"><span class="pagination-info">Showing 6 to 0 of 0 rows</span><span class="page-list" style="display: none;"><span class="btn-group dropup"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span class="page-size">5</span> <span class="caret"></span></button><ul class="dropdown-menu" role="menu"><li role="menuitem"><a href="#">10</a></li></ul></span> rows per page</span></div><div class="pull-right pagination" style="display: none;"><ul class="pagination"><li class="page-pre"><a href="#">‹</a></li><li class="page-next"><a href="#">›</a></li></ul></div></div>

                </div>
            </div>



        </div>




    </div>

    <div id="Upload" class="content-inner-all display_none animate__animated animate__backInLeft">
        <div id=" " class="sparkline8-graph col-xs-12  " style="border-radius: 50px;">
            <div class="col-xs-12 col-lg-12 col-sm-12">
                <br />
            </div>
            <div class="col-xs-12 col-lg-12 col-sm-12">
                <h1>Upload</h1>
            </div>
            <div class="col-xs-12 col-lg-12 col-sm-12">
                <button id="btnBack_Up" class="col-xs-12 col-lg-12 col-sm-12 btn btn-custon-four btn-warning"> Back </button>
            </div>
            <div class="col-xs-12 col-lg-12 col-sm-12">
                <br />
            </div>
            <div id="Page" class="col-xs-12 col-lg-12 col-sm-12">

            </div>

            <div class="col-xs-12 col-lg-12 col-sm-12">
                <br />
            </div>
        </div>
    </div>



</body>`;

    var Html_DataServer = `

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

</style>
<body class="materialdesign">
    <div class="content-inner-all animate__animated animate__backInLeft">
        <div class="sparkline8-graph col-xs-12" style="border-radius: 50px;">


            <div class="col-xs-12 col-lg-12 col-sm-12">
                <h1 class="col-xs-12 col-lg-12 col-sm-12">Data Server</h1>
            </div>

            <div class="col-xs-12 col-lg-1 col-sm-12 ">
                <label>Server</label>
            </div>
            <div class="col-xs-12 col-lg-3 col-sm-12 ">

                <input id="Server" type="text" class="form-control " value="172.106.161.82" name="Server" list="ServerName">
                <datalist id="ServerName">

                    <option value="172.106.161.82">
                </datalist>
            </div>

            <div class="col-xs-12 col-lg-1 col-sm-12">
                <label>User</label>
            </div>
            <div class="col-xs-12 col-lg-3 col-sm-12">
                <input id="User" type="text" class="form-control " value="SYSUSER" name="Server" list="UserName">
                <datalist id="UserName">

                    <option value="SYSUSER">
                </datalist>
            </div>

            <div class="col-xs-12 col-lg-1 col-sm-12">
                <label>Password</label>
            </div>
            <div class="col-xs-12 col-lg-3 col-sm-12 animated animate backInDown">
                <input id="Password" type="text" class="form-control " value="SYSUSER2020" name="Password" list="PasswordName">
                <datalist id="PasswordName">
                    <option value="SYSUSER2020">
                </datalist>
            </div>

            <div class="col-xs-12">
                <br />
            </div>

            <div class="col-xs-12 col-lg-1 col-sm-12">

            </div>

            <div class="col-xs-12 col-lg-3 col-sm-12">
                <button id="Conact" value="Conact" class="col-xs-12 col-lg-12 col-sm-12 btn btn-custon-four btn-success">   Conact </button>
            </div>


            <div class="col-xs-12 col-lg-1 col-sm-12">
                <label>Database</label>
            </div>
            <div class="col-xs-12 col-lg-3 col-sm-12">
                <select id="Database" class="form-control "></select>
            </div>


            <div class="col-xs-12 col-lg-1 col-sm-12">

            </div>
            <div class="col-xs-12 col-lg-3 col-sm-12">
                <button id="ConactServer" value="Conact" class="col-xs-12 col-lg-12 col-sm-12 btn btn-custon-four btn-success">   Action Data </button>
            </div>


            <div class="col-xs-12">
                <br />
            </div>

            <div class="col-xs-12 col-lg-1 col-sm-12">
                <label>Data Sours</label>
            </div>
            <div class="col-xs-12 col-lg-3 col-sm-12">
                <select id="DataSours" class="form-control "></select>
            </div>



            <div class="col-xs-12 col-lg-1 col-sm-12">
                <label>New Query</label>
            </div>
            <div class="col-xs-12 col-lg-5 col-sm-12">
                <textarea id="New_Query" type="text" class="form-control " value=""></textarea>
            </div>

            <div class="col-xs-12 col-lg-1 col-sm-12">
                <label>Top</label>
            </div>
            <div class="col-xs-12 col-lg-1 col-sm-12">
                <select id="top" class="form-control ">
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="400">400</option>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
                </select>
            </div>

            <div class="col-xs-12">
                <br />
            </div>

            <div class="col-xs-12 col-lg-12 col-sm-12">
                <button id="GenerateModels" value="Generate Models" class="col-xs-12 col-lg-12 col-sm-12 btn btn-custon-four btn-danger">    Execute </button>
            </div>




        </div>




        <div class="sparkline8-graph col-xs-12" style="border-radius: 50px;">

            <div class="inside-table my-4">
                <h2 id="searchTitle"></h2>
                <div id="tableDiv">

                </div>
            </div>

        </div>

        <div id="Grad1" class="sparkline8-graph col-xs-12" style="border-radius: 50px;">

        </div>




    </div>




</body>
`;



    export function InitalizeComponent() {
 
        LodePageHome();


    }

    function LodePageHome() {

        Home();

        $("#Open_Profile").on('click', function () {
            Profile();
        });

        $("#Open_Notes").on('click', function () {
            Notes();
        });

        $("#Open_Data_Server").on('click', function () {
            Data_Server();
        });

        $("#Open_Money_Wallet").on('click', function () {
            Wallet();

        });

        $("#Open_Get_Views").on('click', function () {
            //alert('تحت الانشاء')
            window.open(Url.Action("Page_Get_Views", "Home"), "_self");
        });

        $("#Open_Test_Code").on('click', function () {
            //alert('تحت الانشاء')
            window.open("https://onecompiler.com/javascript", "_self");
        });



    }


    function Home() {
        $('#Body_Page').html('');

        $('#Body_Page').append(Html_Home);
    }


    function Profile() {
        LodePage(Html_Profile, 'ClientApp/Quotation/Profile.js')
    }

    function Notes() {
        debugger 
        LodePage(Html_Notes, 'ClientApp/Quotation/Notes.js')

        $('#layout_Back').addClass('display_none')
    }

    function Data_Server() {
        debugger
        LodePage(Html_DataServer, 'ClientApp/Quotation/TestGrad.js')
    }

    function Wallet() {
        debugger
        LodePage(Html_Wallet, 'ClientApp/Quotation/Money_Wallet.js')
    }


    function LodePage(page: string, Pathscript: string) {

        $('#Body_Page').html('');

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
        var bodyPage = document.getElementById('Body_Page');
        bodyPage.appendChild(container);

    }

}













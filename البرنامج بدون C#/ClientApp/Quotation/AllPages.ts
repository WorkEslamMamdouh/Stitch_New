﻿ 
$(document).ready(() => {
    AllPages.InitalizeComponent();
})

namespace AllPages {

     

    var Html_Notes = `
 
<body class="materialdesign"> 
    <div class="responsive__tabs animate__animated animate__zoomIn"> 
        <ul id="label_Tab" class="scrollable-tabs ">
      <li id="Back" class="nav-item"> 
                    <span id="Back" class="nav-link" data-toggle="tab" href="">
                        <i id="Back" class="fa-solid fa-reply-all fa-fade back" style="font-size: 40px;color: #df0303;"></i>
                    </span>
                </li>
            <li id="App_Tap" class="">
  <br/>
<span class="" data-toggle="tab" href=""><i class="fa fa-plus-circle Add"></i></span>
</li>
 
        </ul>
 
        <div id="Area_Tab" class="tab-content">
 
        </div>
    </div> 
</body>
`;


    var Html_Wallet = `

<body class="materialdesign sparkline8-graph col-xs-12  ">
 

  

    <div id="Page_mone" class="responsive__tabs animate__animated animate__zoomIn display_none">
 
        <ul id="label_Tab" class="scrollable-tabs ">
            <li id="Back"   class="nav-item">
                <br/>
                <span id="Back" class="nav-link" data-toggle="tab" href=""> 
                    <i id="Back" class="fa-solid fa-reply-all fa-fade back" style="font-size: 40px;color: #df0303;"></i>
                </span>
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

            <li id="App_Ref" class="">
                <br/>
                <span id="App_Ref" class="" data-toggle="tab" href="">
                    <i id="App_Ref" class="fa-solid fa-clock-rotate-left fa-beat Refresh"></i>
                </span>

            </li>





        </ul>
 
        <button class="Balance">Show Balance $</button>
        <div class="col-xs-12 col-lg-12 col-sm-12 content "  >
                 
                    <div class="col-xs-6 col-lg-6 col-sm-6 ">
                            <label id="CairoLab"> ( 0 )</label>
                    </div>
                    <div class="col-xs-6 col-lg-6 col-sm-6 ">
                            <label id="Al_ahlyLab"> ( 0 )</label>
                    </div>
                    <div class="col-xs-6 col-lg-6 col-sm-6 ">
                            <label id="Bal_HomeLab"> ( 0 )</label>
                    </div>
                    <div class="col-xs-6 col-lg-6 col-sm-6 ">
                            <label id="AAIBLab"> ( 0 )</label>
                    </div>
                    <div class="col-xs-6 col-lg-6 col-sm-6 ">
                            <label id="OutDebtLab"> ( 0 )</label>
                    </div>
                    <div class="col-xs-6 col-lg-6 col-sm-6 ">
                            <label id="InDebtLab"> ( 0 )</label>
                    </div>
                    <div class="col-xs-6 col-lg-6 col-sm-6 ">
                            <label id="CashLab"> ( 0 )</label>
                    </div>
                   <div class="col-xs-6 col-lg-6 col-sm-6 ">
                            <label id="BalanceLab"> ( 0 )</label>
                    </div>
        </div>

    
 

 
        <div id="Rec_Exch_Tab" class="tab-content ">

 



            <div class="col-xs-6 col-lg-6 col-sm-6 ">
                <input id="txtdate" type="date" name="TrDate" class="form-control  "  />
            </div>
             <div class="col-xs-6 col-lg-6 col-sm-6 ">
                <input id="txtTrNo" type="number" disabled class="form-control " name="ID" />
            </div>

            <div class="col-xs-12 col-lg-12 col-sm-12 ">
                <br />
            </div>

            <div class="col-xs-12 col-lg-1 col-sm-12 ">
                <label>Remark</label>
            </div>
            <div class="col-xs-12 col-lg-11 col-sm-12 ">
                <textarea id="txtRemark" type="text" class="form-control " value="" name="Remars" placeholder="Remars"  spellcheck="false"></textarea>
            </div>

            <div class="col-xs-12 col-lg-12 col-sm-12 ">
                <br />
            </div>
 
            <div class="col-xs-6 col-lg-6 col-sm-6 ">
                <select id="TypeSours" class="form-control ">
                    <option value="Cash">Cash</option>
                    <option value="Debt">Debt</option>
                    <option value="Bal Home">Bal Home</option>
                    <option value="Cairo Bank">Cairo Bank</option>
                    <option value="Al ahly Bank">Al-ahly Bank</option>
                    <option value="AAIB">AAIB</option>
                </select>
            </div> 
            <div class="col-xs-6 col-lg-6 col-sm-6 ">
                <input id="txtAmount" type="tel" inputmode="numeric" name="Amount" placeholder="Amount" class="form-control " />
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
          

            <div class="col-xs-2 col-lg-1 col-sm-2 ">
                <label>TrTrans</label>
            </div>
            <div class="col-xs-4 col-lg-5 col-sm-4 ">
                <select id="TypeSoursF" class="form-control ">
                    <option value="All">All</option>
                    <option value="Cash">Cash</option>
                    <option value="Debt">Debt</option>
                    <option value="Bal Home">Bal Home</option>
                    <option value="Cairo Bank">Cairo Bank</option>
                    <option value="Al ahly Bank">Al-ahly Bank</option>
                    <option value="AAIB">AAIB</option>
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

                       <div class="col-xs-12 col-lg-4 col-sm-12">
                            <div class="col-xs-5 col-lg-4 col-sm-5">
                                <label style="font-weight: bold;font-size: 17px;"> Total Rece </label>
                            </div>

                            <div class="col-xs-7 col-lg-8 col-sm-7">
                                <input id="txtTotalReceipt" type="text" disabled class="  form-control " placeholder="Amount : " style="background-color: aquamarine;">
                            </div>

                      </div>

                     <div class="col-xs-12 col-lg-4 col-sm-12">
                   

                            <div class="col-xs-5 col-lg-4 col-sm-5">
                                <label style="font-weight: bold;font-size: 17px;"> Total Exch </label>
                            </div>

                            <div class="col-xs-7 col-lg-8 col-sm-7">
                                <input id="txtTotalExchange" type="text" disabled class="  form-control " placeholder="Amount : " style="background-color: #ff7f7f;">
                            </div>

                     </div>

                    
                      <div class="col-xs-12 col-lg-4 col-sm-12">
                            <div class="col-xs-5 col-lg-4 col-sm-5">
                                <label style="font-weight: bold;font-size: 17px;"> Total All </label>
                            </div>

                            <div class="col-xs-7 col-lg-8 col-sm-7">
                                <input id="txtTotal" type="text" disabled class="  form-control " placeholder="Amount : ">
                            </div>
                     </div>
                  

                </div>

            </div>

        </div>

    </div>


</body>
`;


    var Html_Profile = `



<body class="materialdesign">
    
    <div id="Page_Profile" class="content-inner-all display_none animate__animated animate__zoomIn">
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
                   <form method="post" enctype="multipart/form-data">
                            <div class="col-xs-8 col-lg-8 col-sm-8">
                                <input type="file" name="fileUpload" id="fileUploadInput" class="_dis" disabled  style="background: #0051a3;color: aliceblue;font-weight: bold;" />
                                <input type="hidden"   id="fileName"   />
                            </div>
                            <div class="col-xs-8 col-lg-4 col-sm-8">
                                <input type="button" value="Upload" id="Btn_fileUpload"  class=" btn btn-custon-four btn-success"  onclick="uploadFile()" /> 
                            </div>
                    </form>
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
                                    <th class=" Text_right Ope" style="width: 2% !important;" data-field="number" tabindex="0"><div class="th-inner ">Open Url</div><div class="fht-cell"></div></th>
                                    <th class=" Text_right Ope" style="width: 2% !important;" data-field="number" tabindex="0"><div class="th-inner ">Upload</div><div class="fht-cell"></div></th>
                                    <th class=" Text_right Ope" style="width: 2% !important;" data-field="number" tabindex="0"><div class="th-inner ">Open File</div><div class="fht-cell"></div></th>
                                    <th class=" Text_right Url" style="width: 2% !important;" data-field="number" tabindex="0"><div class="th-inner ">Name File</div><div class="fht-cell"></div></th>

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
                    </div><div class="fixed-table-pagination" style="display: none;"><div class="pull-left pagination-detail"><span class="pagination-info">Showing 6 to 0 of 0 rows</span><span class="page-list" style="display: none;"><span class="btn-group dropup"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span class="page-size">5</span> <span class="caret"></span></button><ul class="dropdown-menu" role="menu"><li role="menuitem"><a href="#">10</a></li></ul></span> rows per page</span></div><div class="pull-right pagination" style="display: none;"><ul class="pagination"><li class="page-pre"><a href="">‹</a></li><li class="page-next"><a href="#">›</a></li></ul></div></div>

                </div>
            </div>



        </div>




    </div>

    <div id="Upload" class="content-inner-all display_none animate__animated animate__zoomIn">
        <div id=" " class="sparkline8-graph col-xs-12  " style="border-radius: 50px;">
            
            <div class="col-xs-12 col-lg-12 col-sm-12">
                <h1>Upload</h1>
            </div>
            <div class="col-xs-4 col-lg-4 col-sm-4">
                <button id="btnBack_Up" class="col-xs-12 col-lg-12 col-sm-12 btn btn-custon-four btn-warning"> Back </button>
            </div>
            <div class="col-xs-4 col-lg-4 col-sm-4">
                <button id="btnDownload_Up" class="col-xs-12 col-lg-12 col-sm-12 btn btn-custon-four btn-success"   >Download</button>
            </div>
            <div class="col-xs-4 col-lg-4 col-sm-4">
                <button id="btnShare_Up" class="col-xs-12 col-lg-12 col-sm-12 btn btn-custon-four btn-info"> Share </button>
                <input id="txtShare" type="hidden" class="_copy _dis form-control ">
            </div>
            <div class="col-xs-12 col-lg-12 col-sm-12">
                <br />
            </div>
            <div id="PageFile" class="col-xs-12 col-lg-12 col-sm-12">

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
    <div class="content-inner-all animate__animated animate__zoomIn">
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



    var Html_Settings = `



<body class="materialdesign">
    
    <div id="Page_Profile" class="content-inner-all display_none animate__animated animate__zoomIn">
        <div id="id_div_Filter" class="sparkline8-graph col-xs-12" style="border-radius: 50px;">

            <div class="col-xs-12 col-lg-12 col-sm-12">

                <h1 class="col-xs-12 col-lg-12 col-sm-12">My Setting</h1>
            </div>

            <div class="col-xs-12 col-lg-1 col-sm-12 ">
                <label>Type</label>
            </div>
            <div class="col-xs-12 col-lg-3 col-sm-12 ">
                <select id="dbTypeF" class="form-control ">
                   <option value="All">All</option>
                   <option value="Admin">Admin</option>
                    <option value="User All">User All</option>
                    <option value="Profile">Profile</option>
                    <option value="Wallet">Wallet</option>
                    <option value="Notes">Notes</option>
                    <option value="Work">Work</option>
                </select>
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
                <br />
            </div>
            <div class="col-xs-12 col-lg-1 col-sm-12 ">
                <label>TrNo</label>
            </div>
            <div class="col-xs-12 col-lg-3 col-sm-12 ">
                <input id="txtTrNo" type="number" name="ID" disabled="disabled" class="  form-control ">
            </div>

            
            <div class="col-xs-12 col-lg-1 col-sm-12 ">
                <label>Type</label>
            </div>
            <div class="col-xs-12 col-lg-3 col-sm-12 ">
                <select id="dbTypeH" class="form-control _dis" name="Type">
                    <option value="Admin">Admin</option>
                    <option value="User All">User All</option>
                    <option value="Profile">Profile</option>
                    <option value="Wallet">Wallet</option>
                    <option value="Notes">Notes</option>
                    <option value="Work">Work</option>
                </select>
            </div>

            <div class="col-xs-12 col-lg-1 col-sm-12">
                <label>Title</label>
            </div>
            <div class="col-xs-12 col-lg-3 col-sm-12">
                <input id="txtTitle" type="text" name="Title" class="_copy _dis form-control ">
            </div>

            <div class="col-xs-12 col-lg-12 col-sm-12">
                <br />
            </div>

            <div class="col-xs-12 col-lg-1 col-sm-12">
                <label>NameUesr</label>
            </div>
            <div class="col-xs-12 col-lg-4 col-sm-12">
                <input id="txtNameUesr" type="text" name="NameUesr" class="_copy _dis form-control ">
            </div>

            <div class="col-xs-12 col-lg-1 col-sm-12">
                <label>PassUesr</label>
            </div>
            <div class="col-xs-12 col-lg-4 col-sm-12">
                <input id="txtPassUesr" type="text" name="PassUesr" class="_copy _dis form-control ">
            </div>
            <div class="col-xs-5 col-lg-1 col-sm-5">
                <label>Status</label>
            </div>
            <div class="col-xs-5 col-lg-1 col-sm-5">
               <input id="txtStatus" type="checkbox" name="Status" class="_copy _dis form-control ">
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
 
  

        </div>




    </div>

   

</body>`;



    var glopalBtn = "";
    var btnLogin: HTMLButtonElement;

    var txtPassword: HTMLInputElement;
    var txtUser: HTMLInputElement;

    var _Users: Array<Settings_Users>;


     

    export function InitalizeComponent() {

        debugger  


        btnLogin = document.getElementById("btnLogin") as HTMLButtonElement;
        txtPassword = document.getElementById("txtPassword") as HTMLInputElement;
        txtUser = document.getElementById("txtUser") as HTMLInputElement;

        btnLogin.onclick = GetUsers;

        txtPassword.focus();
        txtUser.focus();

        Event_key('Enter', 'txtUser', 'btnLogin');
        Event_key('Enter', 'txtPassword', 'btnLogin');

        debugger
        let pass = sessionStorage.getItem("AddUserPass");
        let Name = sessionStorage.getItem("AddUserName");
        let ID = sessionStorage.getItem("AddUserID");

        $("#layout_Refresh").addClass('display_none');
        $("#layout_Back").addClass('display_none');

        if (pass != null && pass != "") {
            txtPassword.value = pass;
            txtUser.value = Name;
            GetUsers();
        }
        else {
            $('#Home_Pass').removeClass('display_none');
            txtPassword.focus();
            txtUser.focus();
           
        }

        //**************************************************************

     
    }
    function GetUsers() {

        debugger
        alert(Url.Action("Get_Data", "Profile"))

        Ajax.CallAsync({ 
            url: Url.Action("Get_Data", "Profile"),
            data: { Name_txt: "Settings/Settings_Users" },
            success: function (d) { 
                let result = JSON.parse(d) 
                  _Users = result as Array<Settings_Users>;

                let User = _Users.filter(x => x.PassUesr == txtPassword.value.trim() && x.NameUesr == txtUser.value.trim() && x.Status == 1)

                if (User.length > 0) {

                    $('#Home_Pass').addClass('display_none');
                    $('#Home_Page').removeClass('display_none');


                    LodePageHome();


                    $("#layout_Refresh").attr('style', '');

                    $("#layout_Refresh").addClass('display_none');
                    $("#layout_Back").addClass('display_none');


                    $("#layout_Refresh").on('click', function () {
                        debugger
                        var glopalBtn = localStorage.getItem('glopalBtn');
                        $("#" + glopalBtn + "").click();
                    });


                    $("#layout_Back").on('click', function () {
                        debugger
                        $('#Home_Page').removeClass('display_none');
                        $('#Body_Page').addClass('display_none');


                        $("#layout_Refresh").addClass('display_none');
                        $("#layout_Back").addClass('display_none');

                        $("#layout_Refresh").attr('style', '');
                    });



                    sessionStorage.setItem("AddUserPass", txtPassword.value.trim());
                    sessionStorage.setItem("AddUserName", txtUser.value.trim());
                    sessionStorage.setItem("AddUserID", User[0].ID.toString());


                    if (User[0].Type == "Admin") {
                        $("#_Profile").removeClass('display_none');
                        $("#_Notes").removeClass('display_none');
                        $("#_Server").removeClass('display_none');
                        $("#_Work").removeClass('display_none');
                        $("#_Wallet").removeClass('display_none');
                        $("#_Settings").removeClass('display_none');

                    }
                    if (User[0].Type == "User All") {
                        $("#_Profile").removeClass('display_none');
                        $("#_Notes").removeClass('display_none');
                        $("#_Server").removeClass('display_none');
                        $("#_Work").removeClass('display_none');
                        $("#_Wallet").removeClass('display_none');

                    }
                    if (User[0].Type == "Profile") {
                        $("#_Profile").removeClass('display_none');
                    }
                    if (User[0].Type == "Wallet") {
                        $("#_Wallet").removeClass('display_none');
                    }
                    if (User[0].Type == "Notes") {
                        $("#_Notes").removeClass('display_none');
                    }
                    if (User[0].Type == "Work") {
                        $("#_Work").removeClass('display_none');
                    }

                }
                else {
                    Errorinput(txtPassword);
                    Errorinput(txtUser); 
                    $('#Home_Pass').removeClass('display_none');
                    txtPassword.focus();
                }

            }
        });
         
    }
     

    function LodePageHome() {

        let NumOpen = localStorage.getItem('HomePage');
        if (NumOpen != '1') {
            Home(); 
        }

        $("#Open_Profile").on('click', function () {
            Profile();
            glopalBtn = "Open_Profile";
            localStorage.setItem('glopalBtn', glopalBtn);
        });

        $("#Open_Notes").on('click', function () {
            Notes();
            glopalBtn = "Open_Notes";
            localStorage.setItem('glopalBtn', glopalBtn);
        });

        $("#Open_Data_Server").on('click', function () {
            Data_Server();
            glopalBtn = "Open_Data_Server";
            localStorage.setItem('glopalBtn', glopalBtn);
        });

        $("#Open_Money_Wallet").on('click', function () {
            Wallet(); 
            glopalBtn = "Open_Money_Wallet";
            localStorage.setItem('glopalBtn', glopalBtn);
        });

        $("#Open_Get_Views").on('click', function () {
            //alert("تحت")
            window.open(Url.Action("Page_Get_Views", "Home"), "_self");
        });

        $("#Open_Settings").on('click', function () {
            Settings();
            glopalBtn = "Open_Settings";
            localStorage.setItem('glopalBtn', glopalBtn);
        });

         


        

    }
     

    function Home() {

        localStorage.setItem('HomePage', '1');

        $('#Home_Page').removeClass('display_none');
        $('#Body_Page').addClass('display_none');


    }


    function Profile() {
        LodePage(Html_Profile, 'ClientApp/Quotation/Profile.js')


        //var container1 = document.createElement('div');

        //// Step 2: Set the HTML content of the element
        ////container.innerHTML = page;

        //// Step 3: Create a new <script> element
        //var scriptElement1 = document.createElement('script');

        //// Step 4: Set the src attribute of the <script> element
        //scriptElement1.src = 'ClientApp/Quotation/FileSaver.min.js';
        ////scriptElement.src = 'ClientApp/Quotation/Notes.js';

        //scriptElement1.onload = function () {
        //};

        //// Step 5: Append the <script> element to the HTML element
        //container1.appendChild(scriptElement1);

        //// Append the container element to the desired location on the page
        //var bodyPage1 = document.getElementById('Body_Page');
        //bodyPage1.appendChild(container1);



        var container = document.createElement('div');

        // Step 2: Set the HTML content of the element
        //container.innerHTML = page;

        // Step 3: Create a new <script> element
        var scriptElement = document.createElement('script');

        // Step 4: Set the src attribute of the <script> element
        scriptElement.src = 'ClientApp/Quotation/uploadFile.js';
        //scriptElement.src = 'ClientApp/Quotation/Notes.js';

        scriptElement.onload = function () {
        };

        // Step 5: Append the <script> element to the HTML element
        container.appendChild(scriptElement);

        // Append the container element to the desired location on the page
        var bodyPage = document.getElementById('Body_Page');
        bodyPage.appendChild(container);
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

    function  Settings() {
        debugger
        LodePage(Html_Settings, 'ClientApp/Quotation/Settings.js')
    }

    function LodePage(page: string, Pathscript: string) {

        debugger
        $('#Body_Page').html('');

        $('#Home_Page').addClass('display_none');
        $('#Body_Page').removeClass('display_none');

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













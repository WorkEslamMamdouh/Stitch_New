﻿
class SecurityClass {
    public UserCode: string;
    public Token: string;
}

class FavModules {//
    public MODULE_CODE: string;
    public MODULE_DESCE: string;
    public MODULE_DESCA: string;
    public OPTIONORDER: string;
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public USER_CODE: string;
}

class SystemParameters {
    public CompanyNameA: string;
    public CompanyNameE: string;
    public CompanyCode: string;
    public IsActive: boolean;
}

class APISessionRecord {

    private SetAPISession(key: string, value: string) {
        $.ajax({
            url: Url.Action("SetSessionRecordValue", "Session"),
            data: { propertyName: key, value: value },
            async: false
        });

    }
    private GetAPISession(key: string): string {

        let value = $.ajax({
            url: Url.Action("GetSessionRecordValue", "Session"),
            data: { propertyName: key },
            async: false
        }).responseJSON.result;
        return value;
    }
    public set SystemCode(value: string) {
        this.SetAPISession("SystemCode", value);
    }
    public get SystemCode(): string {
        return this.GetAPISession("SystemCode");
    }

    public set SubSystemCode(value: string) {
        this.SetAPISession("SubSystemCode", value);
    }
    public get SubSystemCode(): string {
        return this.GetAPISession("SubSystemCode");
    }

    public set Modulecode(value: string) {
        this.SetAPISession("Modulecode", value);
    }
    public get Modulecode(): string {
        return this.GetAPISession("Modulecode");
    }

    public set UserCode(value: string) {
        this.SetAPISession("UserCode", value);
    }
    public set Token(value: string) {
        this.SetAPISession("Token", value);
    }
    public get UserCode(): string {
        return this.GetAPISession("UserCode");
    }
    public get Token(): string {
        return this.GetAPISession("Token");
    }
    public set CompCode(value: string) {
        this.SetAPISession("CompCode", value);
    }
    public get CompCode(): string {
        return this.GetAPISession("CompCode");
    }

    public set BranchCode(value: string) {
        this.SetAPISession("BranchCode", value);
    }
    public get BranchCode(): string {
        return this.GetAPISession("BranchCode");
    }


    public set CurrentYear(value: string) {
        this.SetAPISession("CurrentYear", value);
    }
    public get CurrentYear(): string {
        return this.GetAPISession("CurrentYear");
    }

    public set ScreenLanguage(value: string) {
        this.SetAPISession("ScreenLanguage", value);
    }
    public get ScreenLanguage(): string {
        return this.GetAPISession("ScreenLanguage");
    }

}
class SlsInvoiceMasterDetails extends SecurityClass {
    constructor() {
        super();
        this.Sls_Ivoice = new Sls_Ivoice();
        this.Sls_InvoiceDetail = new Array<Sls_InvoiceDetail>();
    }
    public Sls_Ivoice: Sls_Ivoice;
    public Sls_InvoiceDetail: Array<Sls_InvoiceDetail>;


}
class Customcustomer extends SecurityClass {
    constructor() {
        super();
        this.Customer = new Customer();                        
    }
    public Customer: Customer;


}

abstract class EntityContext {
    public RowIndex: number;
}
class ResponseResult {
    public ResponseState: boolean;
    public ResponseMessage: string;
    public ResponseData: any;
}

class BaseResponse {
    public IsSuccess: boolean;
    public ErrorMessage: string;
    public StatusCode: Number;
    public Response: any;
}


class ReportParameters {

    public CompCode: string;
    public CompNameA: string;
    public CompNameE: string;
    public BraNameA: string;
    public BraNameE: string;
    public UserCode: string;
    public BranchCode: string;
    public ScreenLanguage: String;
    public SystemCode: String;
    public SubSystemCode: String;
    public Tokenid: String;
    public LoginUser: string;

    public FromDt: string;// { get; set; }--
    public ToDt: string;// { get; set; }--
    public stat: number;
    public MemId: number;
    public Shift: number;
    public CatId: number;//---
    public ExpID: number;//---
    public SrvId: number;
    public SrvCatId: number;

    public ShiftId: number;
    public Sex: number;
    public PeriodId: number;
    public User: string;
    public CashType: number;
    public PeriodDays: number;
    public PurchId: number;
    public JobID: number;
    public NatId: number;
    public TRId: number;
    public Empid: number;
    public EmpStat1: number;
    public EmpStat2: number;
    public EmpStat3: number;
    public EmpStat5: number;
    public Typ: number;
    public SimID: number;
    public DisCatID: number;
    public Mail: number;
    public Femail: number;
    public total: number;
    public Type: number;
    public id1: number;
    public id2: number;
    public id3: number;
    public id4: number;
    public ISQR: boolean;
    public id: number;
    public ExpenseStatementID: number;
    public User_Code: string;
    public FromDate: string;
    public ToDate: string
    public BoxId: number;
    public RepType: number;
    public TrType: number;
    public RecType: number;
    public BnfID: string;
    public BnfDesc: string;
    public Status: number;
    public Repdesign: number;
    public AdjDebit: number;
    public AdjId: number;
    public CustomerID: number;
    public VendorId: number;
    public SalesmanID: number;
    public SalesmanDSA1: number;
    public PaymentType: number;
    public CashBoxID: number;
    public Groupid: number;
    public IsCredit: number;
    public BalStatus: number;
    public MobileNo: string;
    public slip: number;
    public VendType: number;
    public check: number;
    public BalType: number;
    public ItemFamId: number;
    public ItemID: number;
    public cc_code: string;
    public AccCode: string;
    public exzero: number;
    public IsAuthVchr: number;
    public IsNewVchr: number;
    public Level: number;
    public OpenType: number;
    public PrdType: number;
    public EndType: number;
    public VchrSource: number;
    public VchrType: number;
    public fromacc: string;
    public toacc: string;
    public storeID: number;
    public TfType: number;
    public FromstoreID: number;
    public ToStoreID: number;
    public FromBra: number;
    public ToBra: number;
    public src: number;
    public OperationId: number;
    public FromSls: number;
    public ToSls: number;
    public ISimport: number;
    public CustomercatID: number;
    public CustomerGrpID: number;
    public checkedprint: boolean;


    public cusCatID: number;
    public cusGroupid: number;
    public cusid: number;
    public SLStype: number;
    public dtccCode: string;
    public TransCode: string;
    public SysCode: string;

    public Vattype: number;
    public VatBraCode: number;
    public vatyear: number;
    public prdcode: number;
    public SalesInvoiceNature: number;
    public Ispersonal: number;

    public DocPDFFolder: string;
}

class G_BRANCH extends SecurityClass {
    constructor() {
        super();
        this.COMP_CODE = 0;
        this.BRA_CODE = 0;
        this.BRA_DESC = "";
        this.BRA_TYPE = 0;
        this.BRA_DESCL = "";
        this.BRA_SHORTA = "";
        this.BRA_SHORTL = "";
        this.REGION_CODE = "";
        this.City = "";
        this.Address = "";
        this.Tel = "";
        this.Fax = "";
        this.Email = "";
        this.WebSite = "";
        this.BranchManager = "";
        this.HRResponsible = "";
        this.FinanceResponsible = "";
        this.SalesManager = "";
        this.CUSTOM1 = "";
        this.CUSTOM2 = "";
        this.CUSTOM3 = "";
        this.CUSTOM4 = "";
        this.CUSTOM5 = "";
        this.CUSTOMFLAG1 = false;
        this.CUSTOMFLAG2 = false;
        this.CUSTOMNUM1 = 0;
        this.CUSTOMNUM2 = 0;
        this.CUSTOMDATE = "";
        this.BRA_DESCE = "";
        this.GroupVatNo = "";
        this.VndIDTypeCode = 0;
        this.IDNo
        this.Address_Street = "";
        this.Address_Str_Additional = "";
        this.Address_BuildingNo = "";
        this.Address_Build_Additional = "";
        this.Address_City = "";
        this.Address_Postal = "";
        this.Address_Province = "";
        this.Address_District = "";
        this.NationalityID = 0;
        this.Currencyid = 0;
        this.InvoiceTypeCode = 0;
        this.ReturnTypeCode = 0;
        this.SlsInvType = 0;
        this.RetailInvoiceTransCode = 0;
        this.WholeInvoiceTransCode = 0;
        this.RetailInvoicePayment = 0;
        this.WholeInvoicePayment = 0;
        this.ServiceInvoiceTransCode = 0;
    }
    public COMP_CODE: number;
    public BRA_CODE: number;
    public BRA_DESC: string;
    public BRA_TYPE: number;
    public BRA_DESCL: string;
    public BRA_SHORTA: string;
    public BRA_SHORTL: string;
    public REGION_CODE: string;
    public City: string;
    public Address: string;
    public Tel: string;
    public Fax: string;
    public Email: string;
    public WebSite: string;
    public BranchManager: string;
    public HRResponsible: string;
    public FinanceResponsible: string;
    public SalesManager: string;
    public CUSTOM1: string;
    public CUSTOM2: string;
    public CUSTOM3: string;
    public CUSTOM4: string;
    public CUSTOM5: string;
    public CUSTOMFLAG1: boolean;
    public CUSTOMFLAG2: boolean;
    public CUSTOMNUM1: number;
    public CUSTOMNUM2: number;
    public CUSTOMDATE: string;
    public BRA_DESCE: string;
    public GroupVatNo: string;
    public VndIDTypeCode: number;
    public IDNo: any;
    public Address_Street: string;
    public Address_Str_Additional: string;
    public Address_BuildingNo: string;
    public Address_Build_Additional: string;
    public Address_City: string;
    public Address_Postal: string;
    public Address_Province: string;
    public Address_District: string;
    public NationalityID: number;
    public Currencyid: number;
    public InvoiceTypeCode: number;
    public ReturnTypeCode: number;
    public SlsInvType: number;
    public RetailInvoiceTransCode: number;
    public WholeInvoiceTransCode: number;
    public RetailInvoicePayment: number;
    public WholeInvoicePayment: number;
    public ServiceInvoiceTransCode: number;
}
class G_LnkVarBranch extends SecurityClass {
    constructor() {
        super();
        this.CompCode = 0;
        this.BraCode = 0;
        this.Lnktype = "";
        this.Ser = 0;
        this.LnkCode = "";
        this.GLAccountCode = "";
        this.CC_Code = "";
    }
    public CompCode: number;
    public BraCode: number;
    public Lnktype: string;
    public Ser: number;
    public LnkCode: string;
    public GLAccountCode: string;
    public CC_Code: string;

}

class Customer extends SecurityClass {
    constructor() {
        super();
        this.CustomerId = 0;
        this.CustomerCODE = "";
        this.CatID = 0;
        this.GroupId = 0;
        this.NAMEA = "";
        this.NAMEE = "";
        this.SHORTNAME = "";
        this.TEL = "";
        this.FAX = "";
        this.EMAIL = "";
        this.CURCODE = "";
        this.REMARKS = "";
        this.STATUS = false;
        this.MOBILE = "";
        this.Bank = "";
        this.AccountNo = "";
        this.ManagerName = "";
        this.NationalityID = 0;
        this.BranchCode = 0;
        this.CompCode = 0;
        this.CREATED_BY = "";
        this.CREATED_AT = "";
        this.UPDATED_AT = "";
        this.UPDATED_BY = "";
        this.Employer = "";
        this.JobName = "";
        this.WorkTel = "";
        this.WorkAddress = "";
        this.VATType = 0;
        this.AddDedType = 0;
        this.AddDedNo = "";
        this.VatNo = "";
        this.Isactive = false;
        this.IsAuthorized = false;
        this.CreditLimit = 0;
        this.CreditLimitFC = 0;
        this.CreditPeriod = 0;
        this.OpenBalanceFC = 0;
        this.Openbalance = 0;
        this.Debit = 0;
        this.DebitFC = 0;
        this.Credit = 0;
        this.CreditFC = 0;
        this.PaymentType = 0;
        this.FCRate = 0;
        this.CreditExpiryDate = "";
        this.RefCode2 = "";
        this.RefCode1 = "";
        this.IsCreditCustomer = false;
        this.DiscountplanID = 0;
        this.SalesmanId = 0;
        this.Address_postal = "";
        this.Address_Province = "";
        this.GroupVatNo = "";
        this.Address_Street = "";
        this.Address_Str_Additional = "";
        this.Address_BuildingNo = "";
        this.Address_Build_Additional = "";
        this.Address_City = "";
        this.Address_District = "";
    }
    public CustomerId: number;
    public CustomerCODE: string;
    public CatID: number;
    public GroupId: number;
    public NAMEA: string;
    public NAMEE: string;
    public SHORTNAME: string;
    public TEL: string;
    public FAX: string;
    public EMAIL: string;
    public CURCODE: string;
    public REMARKS: string;
    public STATUS: boolean;
    public MOBILE: string;
    public Bank: string;
    public AccountNo: string;
    public ManagerName: string;
    public NationalityID: number;
    public BranchCode: number;
    public CompCode: number;
    public CREATED_BY: string;
    public CREATED_AT: string;
    public UPDATED_AT: string;
    public UPDATED_BY: string;
    public Employer: string;
    public JobName: string;
    public WorkTel: string;
    public WorkAddress: string;
    public VATType: number;
    public AddDedType: number;
    public AddDedNo: string;
    public VatNo: string;
    public Isactive: boolean;
    public IsAuthorized: boolean;
    public CreditLimit: number;
    public CreditLimitFC: number;
    public CreditPeriod: number;
    public OpenBalanceFC: number;
    public Openbalance: number;
    public Debit: number;
    public DebitFC: number;
    public Credit: number;
    public CreditFC: number;
    public PaymentType: number;
    public FCRate: number;
    public CreditExpiryDate: string;
    public RefCode2: string;
    public RefCode1: string;
    public IsCreditCustomer: boolean;
    public DiscountplanID: number;
    public SalesmanId: number;
    public Address_postal: string;
    public Address_Province: string;
    public GroupVatNo: string;
    public Address_Street: string;
    public Address_Str_Additional: string;
    public Address_BuildingNo: string;
    public Address_Build_Additional: string;
    public Address_City: string;
    public Address_District: string;
}
class GQ_GetLnkVarBranch extends SecurityClass {
    constructor() {
        super();
        this.CompCode = 0;
        this.BraCode = 0;
        this.Lnktype = "";
        this.Ser = 0;
        this.LnkCode = "";
        this.GLAccountCode = "";
        this.Acc_DescA = "";
        this.Acc_DescE = "";
        this.CC_Code = "";
        this.GSt_DescA = "";
        this.GSt_DescE = "";
        this.GLAcc_DescA = "";
        this.GLAcc_DescE = "";


    }
    public CompCode: number;
    public BraCode: number;
    public Lnktype: string;
    public Ser: number;
    public LnkCode: string;
    public GLAccountCode: string;
    public Acc_DescA: string;
    public Acc_DescE: string;
    public CC_Code: string;
    public GSt_DescA: string;
    public GSt_DescE: string;
    public GLAcc_DescA: string;
    public GLAcc_DescE: string;

}
       
class I_VW_GetCompStatus extends SecurityClass {
    constructor() {
        super();
        this.CompCode = 0;
        this.AddAble = false;
        this.Editable = false;
        this.CompStatus = 0;
        this.LoginMsg;
        this.LastDate = "";
        this.FirstDate = "";
        this.INV_STATUS = 0;
        this.ACC_STATUS = 0;
        this.ProfitAcc_Code = "";
        this.OpenAccVoucheNo = 0;
        this.OpenInvAdjNo = 0;
    }
    public CompCode: number;
    public AddAble: boolean;
    public Editable: boolean;
    public CompStatus: number;
    public LoginMsg: any;
    public FIN_YEAR: number;
    public ACC_STATUS: number;
    public INV_STATUS: number;
    public FirstDate: string;
    public LastDate: string;
    public ProfitAcc_Code: string;
    public OpenAccVoucheNo: number;
    public OpenInvAdjNo: number;
}


class G_COMPANY extends SecurityClass {
    constructor() {
        super();
        this.COMP_CODE = 0;
        this.NameA = "";
        this.NameE = "";
        this.Systems = "";
        this.MOI_ID
        this.CRT_NO
        this.City = "";
        this.Address = "";
        this.Tel = "";
        this.Fax = "";
        this.Email = "";
        this.WebSite = "";
        this.GMName = "";
        this.HRResponsible = "";
        this.FinanceResponsible = "";
        this.SalesManager = "";
        this.CUSTOM1 = "";
        this.CUSTOM2 = "";
        this.CUSTOM3 = "";
        this.CUSTOM4 = "";
        this.CUSTOM5 = "";
        this.CUSTOMFLAG1 = false;
        this.CUSTOMFLAG2 = false;
        this.CUSTOMNUM1 = 0;
        this.CUSTOMNUM2 = 0;
        this.CUSTOMDATE = "";
        this.NameActive = "";
        this.IsActive = false;
        this.IsReadOnly = false;
        this.LogoIcon = "";
        this.BkImage1 = "";
        this.BkImage2 = "";
        this.GroupVatNo = "";
        this.VATNO = "";
        this.VndIDTypeCode = 0;
        this.IDNo
        this.Address_Street = "";
        this.Address_Str_Additional = "";
        this.Address_BuildingNo = "";
        this.Address_Build_Additional = "";
        this.Address_City = "";
        this.Address_Postal = "";
        this.Address_Province = "";
        this.Address_District = "";
        this.NationalityID = 0;
        this.Currencyid = 0;
    }
    public COMP_CODE: number;
    public NameA: string;
    public NameE: string;
    public Systems: string;
    public MOI_ID: any;
    public CRT_NO: any;
    public City: string;
    public Address: string;
    public Tel: string;
    public Fax: string;
    public Email: string;
    public WebSite: string;
    public GMName: string;
    public HRResponsible: string;
    public FinanceResponsible: string;
    public SalesManager: string;
    public CUSTOM1: string;
    public CUSTOM2: string;
    public CUSTOM3: string;
    public CUSTOM4: string;
    public CUSTOM5: string;
    public CUSTOMFLAG1: boolean;
    public CUSTOMFLAG2: boolean;
    public CUSTOMNUM1: number;
    public CUSTOMNUM2: number;
    public CUSTOMDATE: string;
    public NameActive: string;
    public IsActive: boolean;
    public IsReadOnly: boolean;
    public LogoIcon: string;
    public BkImage1: string;
    public BkImage2: string;
    public GroupVatNo: string;
    public VATNO: string;
    public VndIDTypeCode: number;
    public IDNo: any;
    public Address_Street: string;
    public Address_Str_Additional: string;
    public Address_BuildingNo: string;
    public Address_Build_Additional: string;
    public Address_City: string;
    public Address_Postal: string;
    public Address_Province: string;
    public Address_District: string;
    public NationalityID: number;
    public Currencyid: number;
}

class G_MODULES extends SecurityClass {
    constructor() {
        super();
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.MODULE_CODE = "";
        this.MENU_NO = "";
        this.MENU_NAME = "";
        this.MODULE_DESCE = "";
        this.MODULE_DESCA = "";
        this.CREATE = false;
        this.EDIT = false;
        this.DELETE = false;
        this.PRINT = false;
        this.VIEW = false;
        this.CUSTOM1 = false;
        this.CUSTOM2 = false;
        this.CUSTOM3 = false;
        this.CUSTOM1_DESC = "";
        this.CUSTOM2_DESC = "";
        this.CUSTOM3_DESC = "";
        this.CUSTOM4 = false;
        this.CUSTOM5 = false;
        this.CUSTOM6 = false;
        this.CUSTOM4_DESC = "";
        this.CUSTOM5_DESC = "";
        this.CUSTOM6_DESC = "";
        this.CUSTOM7 = false;
        this.CUSTOM8 = false;
        this.CUSTOM9 = false;
        this.CUSTOM7_DESC = "";
        this.CUSTOM8_DESC = "";
        this.CUSTOM9_DESC = "";
        this.AVAILABLE = false;
        this.MODULE_TYPE
        this.Images_Enabled = false;
        this.SYSTEM_CODE_Desc = "";
        this.SUB_SYSTEM_CODE_Desc = "";
    }
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public MODULE_CODE: string;
    public MENU_NO: string;
    public MENU_NAME: string;
    public MODULE_DESCE: string;
    public MODULE_DESCA: string;
    public CREATE: boolean;
    public EDIT: boolean;
    public DELETE: boolean;
    public PRINT: boolean;
    public VIEW: boolean;
    public CUSTOM1: boolean;
    public CUSTOM2: boolean;
    public CUSTOM3: boolean;
    public CUSTOM1_DESC: string;
    public CUSTOM2_DESC: string;
    public CUSTOM3_DESC: string;
    public CUSTOM4: boolean;
    public CUSTOM5: boolean;
    public CUSTOM6: boolean;
    public CUSTOM4_DESC: string;
    public CUSTOM5_DESC: string;
    public CUSTOM6_DESC: string;
    public CUSTOM7: boolean;
    public CUSTOM8: boolean;
    public CUSTOM9: boolean;
    public CUSTOM7_DESC: string;
    public CUSTOM8_DESC: string;
    public CUSTOM9_DESC: string;
    public AVAILABLE: boolean;
    public MODULE_TYPE: any;
    public Images_Enabled: boolean;
    public SYSTEM_CODE_Desc: string;
    public SUB_SYSTEM_CODE_Desc: string;
}

class G_ModuleHelp extends SecurityClass {
    constructor() {
        super();

        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.MODULE_CODE = "";
        this.HelpBody_Ar = "";
        this.HelpBody_En = "";
    }
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public MODULE_CODE: string;
    public HelpBody_Ar: string;
    public HelpBody_En: string;
}

class GQ_GetUserModule extends SecurityClass {
    constructor() {
        super();

        this.USER_CODE = "";
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.MODULE_CODE = "";
        this.EXECUTE = false;
        this.CREATE = false;
        this.EDIT = false;
        this.DELETE = false;
        this.PRINT = false;
        this.VIEW = false;
        this.CUSTOM1 = false;
        this.CUSTOM2 = false;
        this.CUSTOM3 = false;
        this.CUSTOM4 = false;
        this.CUSTOM5 = false;
        this.CUSTOM6 = false;
        this.CUSTOM7 = false;
        this.CUSTOM8 = false;
        this.CUSTOM9 = false;
        this.ViewImages = false;
        this.EditImages = false;
        this.MENU_NO = "";
        this.MODULE_DESCE = "";
        this.MODULE_DESCA = "";
        this.M_CREATE = false;
        this.M_EDIT = false;
        this.M_DELETE = false;
        this.M_VIEW = false;
        this.M_PRINT = false;
        this.M_CUSTOM1 = false;
        this.M_CUSTOM2 = false;
        this.M_CUSTOM3 = false;
        this.M_CUSTOM4 = false;
        this.M_CUSTOM5 = false;
        this.M_CUSTOM6 = false;
        this.M_CUSTOM7 = false;
        this.M_CUSTOM8 = false;
        this.M_CUSTOM9 = false;
        this.CUSTOM1_DESC = "";
        this.CUSTOM2_DESC = "";
        this.CUSTOM3_DESC = "";
        this.CUSTOM4_DESC = "";
        this.CUSTOM5_DESC = "";
        this.CUSTOM6_DESC = "";
        this.CUSTOM7_DESC = "";
        this.CUSTOM8_DESC = "";
        this.CUSTOM9_DESC = "";
        this.AVAILABLE = false;
        this.M_images_enabled = false;
    }
    public USER_CODE: string;
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public MODULE_CODE: string;
    public EXECUTE: boolean;
    public CREATE: boolean;
    public EDIT: boolean;
    public DELETE: boolean;
    public PRINT: boolean;
    public VIEW: boolean;
    public CUSTOM1: boolean;
    public CUSTOM2: boolean;
    public CUSTOM3: boolean;
    public CUSTOM4: boolean;
    public CUSTOM5: boolean;
    public CUSTOM6: boolean;
    public CUSTOM7: boolean;
    public CUSTOM8: boolean;
    public CUSTOM9: boolean;
    public ViewImages: boolean;
    public EditImages: boolean;
    public MENU_NO: string;
    public MODULE_DESCE: string;
    public MODULE_DESCA: string;
    public M_CREATE: boolean;
    public M_EDIT: boolean;
    public M_DELETE: boolean;
    public M_VIEW: boolean;
    public M_PRINT: boolean;
    public M_CUSTOM1: boolean;
    public M_CUSTOM2: boolean;
    public M_CUSTOM3: boolean;
    public M_CUSTOM4: boolean;
    public M_CUSTOM5: boolean;
    public M_CUSTOM6: boolean;
    public M_CUSTOM7: boolean;
    public M_CUSTOM8: boolean;
    public M_CUSTOM9: boolean;
    public CUSTOM1_DESC: string;
    public CUSTOM2_DESC: string;
    public CUSTOM3_DESC: string;
    public CUSTOM4_DESC: string;
    public CUSTOM5_DESC: string;
    public CUSTOM6_DESC: string;
    public CUSTOM7_DESC: string;
    public CUSTOM8_DESC: string;
    public CUSTOM9_DESC: string;
    public AVAILABLE: boolean;
    public M_images_enabled: boolean;
}

class G_Noteifications extends SecurityClass {
    constructor() {
        super();

        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.MODULE_CODE = "";
        this.MODULE_DESCE = "";
        this.MODULE_DESCA = "";
        this.Remarks = "";
        this.ISActive = false;
        this.ActiveIcon = "";
        this.InActiveIcon = "";
        this.PageName = "";
        this.DisplayOrder = 0;
    }

    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public MODULE_CODE: string;
    public MODULE_DESCE: string;
    public MODULE_DESCA: string;
    public Remarks: string;
    public ISActive: boolean;
    public ActiveIcon: string;
    public InActiveIcon: string;
    public PageName: string;
    public DisplayOrder: number;
}

class G_NotificationCompany extends SecurityClass {
    constructor() {
        super();

        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.MODULE_CODE = "";
        this.CompCode = 0;
        this.BranchCode = 0;
        this.ISActive = false;
        this.NoteCount = 0;

    }
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public MODULE_CODE: string;
    public CompCode: number;
    public BranchCode: number;
    public ISActive: boolean;
    public NoteCount: number;
}
class NoteificationsModel extends SecurityClass {
    constructor() {
        super();

        this.MODULE_CODE = "";
        this.MODULE_DESCE = "";
        this.MODULE_DESCA = "";
        this.NoteCount = 0;

    }
    public MODULE_CODE: string;
    public MODULE_DESCE: string;
    public MODULE_DESCA: string;
    public NoteCount: number;
}

class G_RoleUsers extends SecurityClass {
    constructor() {
        super();
        this.USER_CODE = "";
        this.RoleId = 0;
        this.ISActive = false;
        this.StatusFlag = "";


    }
    public USER_CODE: string;
    public StatusFlag: string;
    public RoleId: number;
    public ISActive: boolean;
}
class G_USERS extends SecurityClass {
    constructor() {
        super();
        this.LoginUrl = false;
        this.Email = "";
        this.FirstLogin = "";
        this.Remarks = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.CashBoxID = 0;
        this.SalesManID = 0;
        this.USER_CODE = "";
        this.USER_PASSWORD = "";
        this.USER_ACTIVE = false;
        this.USER_NAME = "";
        this.CompCode = 0;
        this.GRP_CODE = "";
        this.REGION_CODE = "";
        this.USER_PASSWORD2 = "";
        this.CHANGE_PASS_DATE = "";
        this.City = "";
        this.Address = "";
        this.Tel = "";
        this.Fax = "";
        this.Mobile = "";
        this.DepartmentName = "";
        this.JobTitle = "";
        this.USER_TYPE = 0;
        this.ManagedBy = "";
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.Tokenid = "";
        this.LastLogin = "";
        this.Flag_Mastr = "";
        this.StoreID = 0;


    }
    public LoginUrl: boolean;
    public Email: string;
    public FirstLogin: string;
    public Remarks: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public CashBoxID: number;
    public SalesManID: number;
    public USER_CODE: string;
    public USER_PASSWORD: string;
    public USER_ACTIVE: boolean;
    public USER_NAME: string;
    public CompCode: number;
    public GRP_CODE: string;
    public REGION_CODE: string;
    public USER_PASSWORD2: string;
    public CHANGE_PASS_DATE: string;
    public City: string;
    public Address: string;
    public Tel: string;
    public Fax: string;
    public Mobile: string;
    public DepartmentName: string;
    public JobTitle: string;
    public USER_TYPE: number;
    public ManagedBy: string;
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public LastLogin: string;
    public Tokenid: string;
    public Flag_Mastr: string;
    public StoreID: number;
}

class GQ_GetUsers extends SecurityClass {
    constructor() {
        super();
        this.LoginUrl = false;
        this.USER_CODE = "";
        this.USER_PASSWORD = "";
        this.USER_ACTIVE = false;
        this.USER_NAME = "";
        this.CompCode = 0;
        this.CashBoxID = 0;
        this.SalesManID = 0;
        this.REGION_CODE = "";
        this.GRP_CODE = "";
        this.USER_PASSWORD2 = "";
        this.CHANGE_PASS_DATE = "";
        this.City = "";
        this.Address = "";
        this.Tel = "";
        this.Fax = "";
        this.Mobile = "";
        this.Email = "";
        this.DepartmentName = "";
        this.JobTitle = "";
        this.USER_TYPE = 0;
        this.ManagedBy = "";
        this.Tokenid = "";
        this.LastLogin = "";
        this.FirstLogin = "";
        this.Remarks = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.Type_DescA = "";
        this.Type_DescE = "";
        this.CodeType = "";
        this.IsActiveDesc = "";
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.Flag_Mastr = "";
        this.StoreID = 0;

    }
    public LoginUrl: boolean;
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public USER_CODE: string;
    public USER_PASSWORD: string;
    public USER_ACTIVE: boolean;
    public USER_NAME: string;
    public CompCode: number;
    public CashBoxID: number;
    public SalesManID: number;
    public REGION_CODE: string;
    public GRP_CODE: string;
    public USER_PASSWORD2: string;
    public CHANGE_PASS_DATE: string;
    public City: string;
    public Address: string;
    public Tel: string;
    public Fax: string;
    public Mobile: string;
    public Email: string;
    public DepartmentName: string;
    public JobTitle: string;
    public USER_TYPE: number;
    public ManagedBy: string;
    public Tokenid: string;
    public LastLogin: string;
    public FirstLogin: string;
    public Remarks: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public Type_DescA: string;
    public Type_DescE: string;
    public CodeType: string;
    public IsActiveDesc: string;
    public Flag_Mastr: string;
    public StoreID: number;
}
class GQ_GetUserRole extends SecurityClass {
    constructor() {
        super();
        this.USER_CODE = "";
        this.ISActive = false;
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
        this.RoleId = 0;
        this.IsActiveDesc = "";
        this.IsAvailable = false;
        this.IsShowable = false;
    }
    public USER_CODE: string;
    public ISActive: boolean;
    public DescA: string;
    public DescE: string;
    public Remarks: string;
    public RoleId: number;
    public IsActiveDesc: string;
    public IsAvailable: boolean;
    public IsShowable: boolean;
}
class G_Role extends SecurityClass {
    constructor() {
        super();
        this.RoleId = 0;
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
        this.IsAvailable = false;
        this.IsShowable = false;
    }
    public RoleId: number;
    public DescA: string;
    public DescE: string;
    public Remarks: string;
    public IsAvailable: boolean;
    public IsShowable: boolean;
}
class G_CONTROL extends SecurityClass {
    constructor() {
        super();
        this.COMP_CODE = 0;
        this.FIN_YEAR = 0;
        this.ACC_STATUS = 0;
        this.INV_STATUS = 0;
        this.FirstDate = "";
        this.LastDate = "";
        this.ProfitAcc_Code = "";
        this.OpenAccVoucheNo = 0;
        this.OpenInvAdjNo = 0;
    }
    public COMP_CODE: number;
    public FIN_YEAR: number;
    public ACC_STATUS: number;
    public INV_STATUS: number;
    public FirstDate: string;
    public LastDate: string;
    public ProfitAcc_Code: string;
    public OpenAccVoucheNo: number;
    public OpenInvAdjNo: number;
}


class G_SearchForm extends SecurityClass {
    constructor() {
        super();
        this.SearchFormCode = "";
        this.ReturnDataPropertyName = "";
        this.Description = "";
        this.SerachFormTitle = "";
        this.IsFullScreen = false;
        this.Left = 0;
        this.Top = 0;
        this.Height = 0;
        this.Width = 0;
        this.PageSize = 0;
        this.DataSourceName = "";
        this.SearchInterval = 0;
        this.SerachFormTitleA = "";
    }
    public SearchFormCode: string;
    public ReturnDataPropertyName: string;
    public Description: string;
    public SerachFormTitle: string;
    public IsFullScreen: boolean;
    public Left: number;
    public Top: number;
    public Height: number;
    public Width: number;
    public PageSize: number;
    public DataSourceName: string;
    public SearchInterval: number;
    public SerachFormTitleA: string;
}

class G_SearchFormModule extends SecurityClass {
    constructor() {
        super();
        this.SystemCode = "";
        this.SubSystemCode = "";
        this.ModuleCode = "";
        this.ControlCode = "";
        this.SearchFormCode = "";
    }
    public SystemCode: string;
    public SubSystemCode: string;
    public ModuleCode: string;
    public ControlCode: string;
    public SearchFormCode: string;
}

class G_SearchFormSetting extends SecurityClass {
    constructor() {
        super();
        this.SearchFormSettingID = 0;
        this.SearchFormCode = "";
        this.FieldSequence = 0;
        this.DataMember = "";
        this.AlternateDataMember = "";
        this.FieldTitle = "";
        this.IsReadOnly = false;
        this.Datatype = 0;
        this.FieldWidth = 0;
        this.UseSelectionOperator = false;
        this.Language = 0;
        this.FieldTitleA = "";
    }
    public SearchFormSettingID: number;
    public SearchFormCode: string;
    public FieldSequence: number;
    public DataMember: string;
    public AlternateDataMember: string;
    public FieldTitle: string;
    public IsReadOnly: boolean;
    public Datatype: number;
    public FieldWidth: number;
    public UseSelectionOperator: boolean;
    public Language: number;
    public FieldTitleA: string;
}



class CustomerType {
    constructor() {
        this.IsCredit = null;
        this.SalesInvoiceNature = null;
        this.IsPersonal = null;
    }
    public IsCredit: number;
    public SalesInvoiceNature: number;
    public IsPersonal: boolean;
}


class G_USER_BRANCH extends SecurityClass {
    constructor() {
        super();
        this.USER_CODE = "";
        this.COMP_CODE = 0;
        this.BRA_CODE = 0;
        this.EXECUTE = false;
        this.CREATE = false;
        this.EDIT = false;
        this.DELETE = false;
        this.PRINT = false;
        this.VIEW = false;
        this.StatusFlag = "";
    }
    public USER_CODE: string;
    public COMP_CODE: number;
    public BRA_CODE: number;
    public EXECUTE: boolean;
    public CREATE: boolean;
    public EDIT: boolean;
    public DELETE: boolean;
    public PRINT: boolean;
    public VIEW: boolean;
    public StatusFlag: string;
}

class G_USER_COMPANY extends SecurityClass {
    constructor() {
        super();
        this.USER_CODE = "";
        this.COMP_CODE = 0;
        this.EXECUTE = false;
        this.CREATE = false;
        this.EDIT = false;
        this.DELETE = false;
        this.PRINT = false;
        this.VIEW = false;
    }
    public USER_CODE: string;
    public COMP_CODE: number;
    public EXECUTE: boolean;
    public CREATE: boolean;
    public EDIT: boolean;
    public DELETE: boolean;
    public PRINT: boolean;
    public VIEW: boolean;
}

class G_USER_LOG extends SecurityClass {
    constructor() {
        super();
        this.USER_CODE = "";
        this.SYSTEM_CODE
        this.SYSTEM_YEAR = 0;
        this.MODULE_CODE = "";
        this.COMP_CODE = 0;
        this.LOG_DATE = "";
    }
    public USER_CODE: string;
    public SYSTEM_CODE: any;
    public SYSTEM_YEAR: number;
    public MODULE_CODE: string;
    public COMP_CODE: number;
    public LOG_DATE: string;
}


class G_USER_MODULE extends SecurityClass {
    constructor() {
        super();
        this.USER_CODE = "";
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.MODULE_CODE = "";
        this.EXECUTE = false;
        this.CREATE = false;
        this.EDIT = false;
        this.DELETE = false;
        this.PRINT = false;
        this.VIEW = false;
        this.CUSTOM1 = false;
        this.CUSTOM2 = false;
        this.CUSTOM3 = false;
        this.CUSTOM4 = false;
        this.CUSTOM5 = false;
        this.CUSTOM6 = false;
        this.CUSTOM7 = false;
        this.CUSTOM8 = false;
        this.CUSTOM9 = false;
        this.ViewImages = false;
        this.EditImages = false;
    }
    public USER_CODE: string;
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public MODULE_CODE: string;
    public EXECUTE: boolean;
    public CREATE: boolean;
    public EDIT: boolean;
    public DELETE: boolean;
    public PRINT: boolean;
    public VIEW: boolean;
    public CUSTOM1: boolean;
    public CUSTOM2: boolean;
    public CUSTOM3: boolean;
    public CUSTOM4: boolean;
    public CUSTOM5: boolean;
    public CUSTOM6: boolean;
    public CUSTOM7: boolean;
    public CUSTOM8: boolean;
    public CUSTOM9: boolean;
    public ViewImages: boolean;
    public EditImages: boolean;
}

class G_USER_SUB_SYSTEM extends SecurityClass {
    constructor() {
        super();
        this.USER_CODE = "";
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.EXECUTE = false;
        this.FILTER_STRING = "";
    }
    public USER_CODE: string;
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public EXECUTE: boolean;
    public FILTER_STRING: string;
}

class G_USER_SYSTEM extends SecurityClass {
    constructor() {
        super();
        this.USER_CODE = "";
        this.SYSTEM_CODE = "";
        this.EXECUTE = false;
        this.FILTER_STRING = "";
    }
    public USER_CODE: string;
    public SYSTEM_CODE: string;
    public EXECUTE: boolean;
    public FILTER_STRING: string;
}
class I_Control {
    constructor() {
        this.CompCode = 0;
        this.DefSlsVatType = 0;
        this.DefPurVatType = 0;
        this.IsVat = false;
        this.MobileLength = 0;
        this.IDLength = 0;
        this.SendSMS = false;
        this.SendPublicSMS = false;
        this.NotePeriodinSec = 0;
        this.DashBoardPeriodinSec = 0;
        this.MaxYearlyMSGs = 0;
        this.UsedMSGs = 0;
        this.UserTimeZoneUTCDiff = 0;
        this.ServerTimeZoneUTCDiff = 0;
        this.SaudiNationID = 0;
        this.WebCustomerWebsite = false;
        this.MembeshiptStartDate = "";
        this.MembeshipEndDate = "";
        this.MembershipAllanceDays = 0;
        this.MembershipreadOnlyDays = 0;
        this.IsFreePurchaseReturn = false;
        this.IsFreeSalesReturn = false;
        this.ExceedMinPricePassword = "";
        this.GL_VoucherCCType = 0;
        this.GL_VoucherCCDT_Type = 0;
        this.Gl_JournalOpenType = 0;
        this.GL_JournalMonthlyNo = false;
        this.GL_JournalMonthlyNoWidth = 0;
        this.GL_JournalSaveUnbalanced = false;
        this.IsLocalBranchCustomer = false;
        this.SysTimeOut = 0;
        this.NationalityID = 0;
        this.Currencyid = 0;
        this.InvoiceWithoutCust = false;
        this.IvoiceDateEditable = false;
        this.InvoiceLineDiscount = false;
        this.InvoiceLineAllowance = false;
        this.InvoiceTotalAllowance = false;
        this.InvoiceTotalCharge = false;
        this.OperationPriceWithVAT = false;
        this.SalesPriceWithVAT = false;
        this.DocPDFFolder = "";
        this.ISCustVendorInGL = false;
    }
    public CompCode: number;
    public DefSlsVatType: number;
    public DefPurVatType: number;
    public IsVat: boolean;
    public MobileLength: number;
    public IDLength: number;
    public SendSMS: boolean;
    public SendPublicSMS: boolean;
    public NotePeriodinSec: number;
    public DashBoardPeriodinSec: number;
    public MaxYearlyMSGs: number;
    public UsedMSGs: number;
    public UserTimeZoneUTCDiff: number;
    public ServerTimeZoneUTCDiff: number;
    public SaudiNationID: number;
    public WebCustomerWebsite: boolean;
    public MembeshiptStartDate: string;
    public MembeshipEndDate: string;
    public MembershipAllanceDays: number;
    public MembershipreadOnlyDays: number;
    public IsFreePurchaseReturn: boolean;
    public IsFreeSalesReturn: boolean;
    public ExceedMinPricePassword: string;
    public GL_VoucherCCType: number;
    public GL_VoucherCCDT_Type: number;
    public Gl_JournalOpenType: number;
    public GL_JournalMonthlyNo: boolean;
    public GL_JournalMonthlyNoWidth: number;
    public GL_JournalSaveUnbalanced: boolean;
    public IsLocalBranchCustomer: boolean;
    public SysTimeOut: number;
    public NationalityID: number;
    public Currencyid: number;
    public InvoiceWithoutCust: boolean;
    public IvoiceDateEditable: boolean;
    public InvoiceLineDiscount: boolean;
    public InvoiceLineAllowance: boolean;
    public InvoiceTotalAllowance: boolean;
    public InvoiceTotalCharge: boolean;
    public OperationPriceWithVAT: boolean;
    public SalesPriceWithVAT: boolean;
    public DocPDFFolder: string;
    public ISCustVendorInGL: boolean;
}



class KQ_GetAlertNoteLog extends SecurityClass {
    constructor() {
        super();
        this.NoteType = 0;
        this.NoteSubType = 0;
        this.MemberID = 0;
        this.MsgDate = "";
        this.MsgText = "";
        this.IsSent = false;
        this.AlertID = 0;
    }
    public NoteType: number;
    public NoteSubType: number;
    public MemberID: number;
    public MsgDate: string;
    public MsgText: string;
    public IsSent: boolean;
    public AlertID: number;
}

class G_Nationality extends SecurityClass {
    constructor() {
        super();
        this.NationalityID = 0;
        this.NationalityCode = "";
        this.DescA = "";
        this.DescL = "";
        this.Remarks = "";
        this.StatusFlag = "";
    }
    public NationalityID: number;
    public NationalityCode: string;
    public DescA: string;
    public DescL: string;
    public Remarks: string;
    public StatusFlag: string;
}        


class A_RecPay_D_Group extends SecurityClass {
    constructor() {
        super();
        this.GroupID = 0;
        this.AccountType = 0;
        this.CompCode = 0;
        this.GroupCode = "";
        this.Group_DescA = "";
        this.Group_DescE = "";
        this.Remarks = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.StatusFlag = "";
    }
    public GroupID: number;
    public AccountType: number;
    public CompCode: number;
    public GroupCode: string;
    public Group_DescA: string;
    public Group_DescE: string;
    public Remarks: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public StatusFlag: string;
}
class Sls_Ivoice extends SecurityClass {
    constructor() {
        super();
        this.InvoiceID = 0;
        this.TrNo = 0;
        this.RefNO = "";
        this.RefTrID = 0;
        this.TrDate = "";
        this.TrDateH = "";
        this.TrType = 0;
        this.IsCash = false;
        this.SlsInvType = 0;
        this.SlsInvSrc = 0;
        this.CashBoxID = 0;
        this.CustomerId = 0;
        this.CustomerName = "";
        this.CustomerMobileNo = "";
        this.SalesmanId = 0;
        this.StoreId = 0;
        this.OperationId = 0;
        this.TotalAmount = 0;
        this.VatAmount = 0;
        this.VatType = 0;
        this.DiscountAmount = 0;
        this.DiscountPrc = 0;
        this.NetAfterVat = 0;
        this.CommitionAmount = 0;
        this.CashAmount = 0;
        this.CardAmount = 0;
        this.BankTfAmount = 0;
        this.BankAccount = "";
        this.TotalPaidAmount = 0;
        this.RemainAmount = 0;
        this.Remark = "";
        this.Status = 0;
        this.IsPosted = false;
        this.VoucherNo = 0;
        this.VoucherType = 0;
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.CompCode = 0;
        this.BranchCode = 0;
        this.DocNo = "";
        this.DocUUID = "";
        this.TrTime = "";
        this.InvoiceTypeCode = 0;
        this.InvoiceTransCode = 0;
        this.TaxNotes = "";
        this.TaxCurrencyID = 0;
        this.InvoiceCurrenyID = 0;
        this.ContractNo = "";
        this.PurchaseorderNo = "";
        this.GlobalInvoiceCounter = 0;
        this.PrevInvoiceHash
        this.QRCode
        this.CryptographicStamp
        this.DeliveryDate = "";
        this.DeliveryEndDate = "";
        this.PaymentMeansTypeCode = 0;
        this.CRDBReasoncode = 0;
        this.PaymentTerms = "";
        this.PaymentTermsID = 0;
        this.AllowAmount = 0;
        this.AllowPrc = 0;
        this.AllowBase = 0;
        this.AllowVatNatID = 0;
        this.AllowVatPrc = 0;
        this.AllowAfterVat = 0;
        this.AllowReason = "";
        this.AllowCode = 0;
        this.ChargeAmount = 0;
        this.ChargePrc = 0;
        this.ChargeBase = 0;
        this.ChargeVatNatID = 0;
        this.ChargeVatPrc = 0;
        this.ChargeAfterVat = 0;
        this.ChargeReason = "";
        this.ChargeCode = 0;
        this.ItemTotal = 0;
        this.ItemAllowTotal = 0;
        this.ItemDiscountTotal = 0;
        this.ItemVatTotal = 0;
        this.RoundingAmount = 0;
    }
    public InvoiceID: number;
    public TrNo: number;
    public RefNO: string;
    public RefTrID: number;
    public TrDate: string;
    public TrDateH: string;
    public TrType: number;
    public IsCash: boolean;
    public SlsInvType: number;
    public SlsInvSrc: number;
    public CashBoxID: number;
    public CustomerId: number;
    public CustomerName: string;
    public CustomerMobileNo: string;
    public SalesmanId: number;
    public StoreId: number;
    public OperationId: number;
    public TotalAmount: number;
    public VatAmount: number;
    public VatType: number;
    public DiscountAmount: number;
    public DiscountPrc: number;
    public NetAfterVat: number;
    public CommitionAmount: number;
    public CashAmount: number;
    public CardAmount: number;
    public BankTfAmount: number;
    public BankAccount: string;
    public TotalPaidAmount: number;
    public RemainAmount: number;
    public Remark: string;
    public Status: number;
    public IsPosted: boolean;
    public VoucherNo: number;
    public VoucherType: number;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public CompCode: number;
    public BranchCode: number;
    public DocNo: string;
    public DocUUID: string;
    public TrTime: string;
    public InvoiceTypeCode: number;
    public InvoiceTransCode: number;
    public TaxNotes: string;
    public TaxCurrencyID: number;
    public InvoiceCurrenyID: number;
    public ContractNo: string;
    public PurchaseorderNo: string;
    public GlobalInvoiceCounter: number;
    public PrevInvoiceHash: any;
    public QRCode: any;
    public CryptographicStamp: any;
    public DeliveryDate: string;
    public DeliveryEndDate: string;
    public PaymentMeansTypeCode: number;
    public CRDBReasoncode: number;
    public PaymentTerms: string;
    public PaymentTermsID: number;
    public AllowAmount: number;
    public AllowPrc: number;
    public AllowBase: number;
    public AllowVatNatID: number;
    public AllowVatPrc: number;
    public AllowAfterVat: number;
    public AllowReason: string;
    public AllowCode: number;
    public ChargeAmount: number;
    public ChargePrc: number;
    public ChargeBase: number;
    public ChargeVatNatID: number;
    public ChargeVatPrc: number;
    public ChargeAfterVat: number;
    public ChargeReason: string;
    public ChargeCode: number;
    public ItemTotal: number;
    public ItemAllowTotal: number;
    public ItemDiscountTotal: number;
    public ItemVatTotal: number;
    public RoundingAmount: number;
}

class Sls_InvoiceDetail extends SecurityClass {
    constructor() {
        super();
        this.InvoiceItemID = 0;
        this.InvoiceID = 0;
        this.ItemID = 0;
        this.UomID = 0;
        this.InvoiceSoldQty = 0;
        this.SoldQty = 0;
        this.Unitprice = 0;
        this.DiscountPrc = 0;
        this.DiscountAmount = 0;
        this.NetUnitPrice = 0;
        this.ItemTotal = 0;
        this.VatPrc = 0;
        this.VatAmount = 0;
        this.NetAfterVat = 0;
        this.StockSoldQty = 0;
        this.StockUnitCost = 0;
        this.VatApplied = 0;
        this.TotRetQty = 0;
        this.Serial = 0;
        this.AllowAmount = 0;
        this.AllowancePrc = 0;
        this.AllowanceBase = 0;
        this.AllowReason = "";
        this.AllowCode = 0;
        this.BaseQty = 0;
        this.BaseQtyUomid = 0;
        this.BaseQtyPrice = 0;
        this.BaseQtyDiscount = 0;
        this.DiscountPrcBase = 0;
        this.DiscountVatNatID = 0;
        this.Discountreason = "";
        this.DiscountCode = 0;
        this.ItemNetAmount = 0;
        this.ChargeAmount = 0;
        this.ChargePrc = 0;
        this.ChargeBase = 0;
        this.ChargeVatNatID = 0;
        this.ChargeVatPrc = 0;
        this.ChargeAfterVat = 0;
        this.ChargeReason = "";
        this.ChargeCode = 0;
        this.VatNatID = 0;
        this.UnitpriceWithVat = 0;
        this.NetUnitPriceWithVat = 0;
        this.Name_Item = "";
        this.MinUnitPrice = 0;
        this.ItemFamilyID = 0;
        this.Name_ItemFamily = "";
        this.OnhandQty = 0;
        this.StatusFlag = "";
        this.Itemdesc = "";

    }
    public InvoiceItemID: number;
    public InvoiceID: number;
    public ItemID: number;
    public UomID: number;
    public InvoiceSoldQty: number;
    public SoldQty: number;
    public Unitprice: number;
    public DiscountPrc: number;
    public DiscountAmount: number;
    public NetUnitPrice: number;
    public ItemTotal: number;
    public VatPrc: number;
    public VatAmount: number;
    public NetAfterVat: number;
    public StockSoldQty: number;
    public StockUnitCost: number;
    public VatApplied: number;
    public TotRetQty: number;
    public Serial: number;
    public AllowAmount: number;
    public AllowancePrc: number;
    public AllowanceBase: number;
    public AllowReason: string;
    public AllowCode: number;
    public BaseQty: number;
    public BaseQtyUomid: number;
    public BaseQtyPrice: number;
    public BaseQtyDiscount: number;
    public DiscountPrcBase: number;
    public DiscountVatNatID: number;
    public Discountreason: string;
    public DiscountCode: number;
    public ItemNetAmount: number;
    public ChargeAmount: number;
    public ChargePrc: number;
    public ChargeBase: number;
    public ChargeVatNatID: number;
    public ChargeVatPrc: number;
    public ChargeAfterVat: number;
    public ChargeReason: string;
    public ChargeCode: number;
    public VatNatID: number;
    public UnitpriceWithVat: number;
    public NetUnitPriceWithVat: number;
    public Name_Item: string;
    public Name_ItemFamily: string;
    public MinUnitPrice: number;
    public ItemFamilyID: number;
    public OnhandQty: number;
    public StatusFlag: string;
    public Itemdesc: string;
}


class I_D_UOM {
    constructor() {
        this.UomID = 0;
        this.UomCode = "";
        this.DescA = "";
        this.DescE = "";
        this.CompCode = 0;
        this.Remarks = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.StatusFlag = "";
        this.Cheack = false;
    }
    public UomID: number;
    public UomCode: string;
    public DescA: string;
    public DescE: string;
    public CompCode: number;
    public Remarks: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public StatusFlag: string;
    public Cheack: boolean;
}
 
class SqlEnt {
    constructor() { 
        this.Server = "";
        this.Database = "";
        this.User = "";
        this.Password = '';
        this.New_Query = '';
       
    }
    public Server: string;
    public Database: string;
    public User: string;
    public Password: string;
    public New_Query: string;
   
}

class SqlTables {
    constructor() { 
        this.name = "";
        this.object_id = 0;  
    }
    public name: string;
    public object_id: number; 
   
}


class ModelSql  {
    constructor() { 
        this.sqlTables = new SqlTables();
        this.sqlEnt = new SqlEnt();
        this.Model = new Array<any>();
    }
    public sqlTables: SqlTables;
    public sqlEnt: SqlEnt;
    public Model: Array<any>;
}

 
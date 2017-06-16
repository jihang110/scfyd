package com.ut.scf.reqbean.bpm;

import com.ut.scf.reqbean.BaseReqBean;
/**
 * 立项管理-项目立项
 * @author zhangyx
 *
 */
public class ProjectAddReqBean extends BaseReqBean {
	
	/**
	 * 工作流流程名称
	 */
	private String workflowNm;
	
	/**
	 * 工作项id
	 */
	private Long workItemId;
	
	/**
	 * 项目名称
	 */
	private String proName;
	
	/**
	 * 是否有追
	 */
	private String chaseFlg;
	
	/**
	 * 保理类型
	 */
	private String factorType;
	
	/**
	 * 立项发起日期
	 */
	private String proMakeDate;
	
	/**
	 * 关联买方名称
	 */
	private String relBuyName;
	
	/**
	 * 关联买方名称ID
	 */
	private String relBuyId;
	
	/**
	 * 关联卖方名称
	 */
	private String relSaleName;
	
	/**
	 * 关联卖方名称ID
	 */
	private String relSaleId;
	
	/**
	 * 关联企业名称
	 */
	private String relSaleCorpName;
	
	/**
	 * 备注
	 */
	private String note;
	
	/**
	 * 合同
	 */
	private String contract;
	
	/**
	 * 订单
	 */
	private String order;
	
	/**
	 * 发货单
	 */
	private String delivery;
	
	/**
	 * 收货单
	 */
	private String receipt;
	
	/**
	 * 入库单
	 */
	private String godownEntry;
	
	/**
	 * 榜单(保险)
	 */
	private String list;
	
	/**
	 * 仓储单
	 */
	private String storage;
	
	/**
	 * 发票
	 */
	private String invoice;
	
	/**
	 * 合同/订单编号
	 */
	private String billNo;
	
	/**
	 * 合同名称/订单
	 */
	private String billName;
	
	/**
	 * 合同/订单金额
	 */
	private String billAmount;
	
	/**
	 * 付款方式
	 */
	private String payType;
	
	/**
	 * 合同/订单约定账期
	 */
	private String accountPeriod;
	/**
	 * 是否开立发票
	 */
	private String hasInv;
	
	/**
	 * 发票编号
	 */
	private String invNo;
	/**
	 * 发票金额
	 */
	private String invAmt;
	/**
	 * 应收账款余额
	 */
	private String arBal;
	/**
	 * 拟申请保理金额
	 */
	private String aplFacAmt;
	/**
	 * 申请账期
	 */
	private String aplPeriod;
	/**
	 * 应收账款受让比例
	 */
	private String arPct;
	/**
	 * 中登网查询截屏
	 */
	private String srchPrtSc;
	
	public String getWorkflowNm() {
		return workflowNm;
	}
	public void setWorkflowNm(String workflowNm) {
		this.workflowNm = workflowNm;
	}
	public Long getWorkItemId() {
		return workItemId;
	}
	public void setWorkItemId(Long workItemId) {
		this.workItemId = workItemId;
	}
	public String getProName() {
		return proName;
	}
	public void setProName(String proName) {
		this.proName = proName;
	}
	public String getChaseFlg() {
		return chaseFlg;
	}
	public void setChaseFlg(String chaseFlg) {
		this.chaseFlg = chaseFlg;
	}
	public String getFactorType() {
		return factorType;
	}
	public void setFactorType(String factorType) {
		this.factorType = factorType;
	}
	public String getProMakeDate() {
		return proMakeDate;
	}
	public void setProMakeDate(String proMakeDate) {
		this.proMakeDate = proMakeDate;
	}
	public String getRelBuyName() {
		return relBuyName;
	}
	public void setRelBuyName(String relBuyName) {
		this.relBuyName = relBuyName;
	}
	public String getRelSaleName() {
		return relSaleName;
	}
	public void setRelSaleName(String relSaleName) {
		this.relSaleName = relSaleName;
	}
	public String getRelSaleCorpName() {
		return relSaleCorpName;
	}
	public void setRelSaleCorpName(String relSaleCorpName) {
		this.relSaleCorpName = relSaleCorpName;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public String getContract() {
		return contract;
	}
	public void setContract(String contract) {
		this.contract = contract;
	}
	public String getOrder() {
		return order;
	}
	public void setOrder(String order) {
		this.order = order;
	}
	public String getDelivery() {
		return delivery;
	}
	public void setDelivery(String delivery) {
		this.delivery = delivery;
	}
	public String getReceipt() {
		return receipt;
	}
	public void setReceipt(String receipt) {
		this.receipt = receipt;
	}
	public String getGodownEntry() {
		return godownEntry;
	}
	public void setGodownEntry(String godownEntry) {
		this.godownEntry = godownEntry;
	}
	public String getList() {
		return list;
	}
	public void setList(String list) {
		this.list = list;
	}
	public String getStorage() {
		return storage;
	}
	public void setStorage(String storage) {
		this.storage = storage;
	}
	public String getInvoice() {
		return invoice;
	}
	public void setInvoice(String invoice) {
		this.invoice = invoice;
	}
	public String getBillNo() {
		return billNo;
	}
	public void setBillNo(String billNo) {
		this.billNo = billNo;
	}
	public String getBillName() {
		return billName;
	}
	public void setBillName(String billName) {
		this.billName = billName;
	}
	public String getBillAmount() {
		return billAmount;
	}
	public void setBillAmount(String billAmount) {
		this.billAmount = billAmount;
	}
	public String getHasInv() {
		return hasInv;
	}
	public void setHasInv(String hasInv) {
		this.hasInv = hasInv;
	}
	public String getInvNo() {
		return invNo;
	}
	public void setInvNo(String invNo) {
		this.invNo = invNo;
	}
	public String getInvAmt() {
		return invAmt;
	}
	public void setInvAmt(String invAmt) {
		this.invAmt = invAmt;
	}
	public String getArPct() {
		return arPct;
	}
	public void setArPct(String arPct) {
		this.arPct = arPct;
	}
	public String getSrchPrtSc() {
		return srchPrtSc;
	}
	public void setSrchPrtSc(String srchPrtSc) {
		this.srchPrtSc = srchPrtSc;
	}
	public String getPayType() {
		return payType;
	}
	public void setPayType(String payType) {
		this.payType = payType;
	}
	public String getAccountPeriod() {
		return accountPeriod;
	}
	public void setAccountPeriod(String accountPeriod) {
		this.accountPeriod = accountPeriod;
	}
	public String getArBal() {
		return arBal;
	}
	public void setArBal(String arBal) {
		this.arBal = arBal;
	}
	public String getAplFacAmt() {
		return aplFacAmt;
	}
	public void setAplFacAmt(String aplFacAmt) {
		this.aplFacAmt = aplFacAmt;
	}
	public String getAplPeriod() {
		return aplPeriod;
	}
	public void setAplPeriod(String aplPeriod) {
		this.aplPeriod = aplPeriod;
	}
	public String getRelBuyId() {
		return relBuyId;
	}
	public void setRelBuyId(String relBuyId) {
		this.relBuyId = relBuyId;
	}
	public String getRelSaleId() {
		return relSaleId;
	}
	public void setRelSaleId(String relSaleId) {
		this.relSaleId = relSaleId;
	}
	
}

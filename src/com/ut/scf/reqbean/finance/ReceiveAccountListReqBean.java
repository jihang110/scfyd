package com.ut.scf.reqbean.finance;

import com.ut.scf.reqbean.PageReqBean;

public class ReceiveAccountListReqBean extends PageReqBean {
	/**
	 * 企业Id
	 */
	private String corpId;
	/**
	 * 发票编号
	 */
	private String invoiceNo;
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}
	public String getInvoiceNo() {
		return invoiceNo;
	}
	public void setInvoiceNo(String invoiceNo) {
		this.invoiceNo = invoiceNo;
	}
	
}

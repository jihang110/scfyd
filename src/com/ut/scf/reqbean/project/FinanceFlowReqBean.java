package com.ut.scf.reqbean.project;

import com.ut.scf.reqbean.BaseReqBean;

public class FinanceFlowReqBean extends BaseReqBean {

	private String userId;

	private String activitiKey;

	private String agree;

	private String advice;

	private String histroyAdvice;

	private String taskId;

	private String procInstId;

	// 融资申请信息
	private String financeId;
	
	private String financeStatus;
	
	private String applyDate;

	private String corpId;
	
	private String agencyName;

	private String agencyNum;

	private String maxCredit;

	private String availableCredit;

	private String financeRate;

	private String cashRate;

	private String financeStartDate;

	private String financeEndDate;

	private String financeAmount;

	private String expense;

	// DYK备注信息
	private String remark;

	private String interestListInfo;
	
	// 保证金登记信息
	private String guaranteeRate;
	
	private String payAbleGuarantee;
	
	private String guaranteePayDate;
	
	private String payActGuarantee;
	
	private String guaranteePayHis;
	
	// 登记保证金备注
	private String note;
	
	private String guaranteeAccountAmt;
	
	private String backTarget;
	
	// "0":融资申请；"1":登记保证金
	private String handleType;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getActivitiKey() {
		return activitiKey;
	}

	public void setActivitiKey(String activitiKey) {
		this.activitiKey = activitiKey;
	}

	public String getAgree() {
		return agree;
	}

	public void setAgree(String agree) {
		this.agree = agree;
	}

	public String getAdvice() {
		return advice;
	}

	public void setAdvice(String advice) {
		this.advice = advice;
	}

	public String getHistroyAdvice() {
		return histroyAdvice;
	}

	public void setHistroyAdvice(String histroyAdvice) {
		this.histroyAdvice = histroyAdvice;
	}

	public String getTaskId() {
		return taskId;
	}

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}

	public String getProcInstId() {
		return procInstId;
	}

	public void setProcInstId(String procInstId) {
		this.procInstId = procInstId;
	}

	public String getFinanceId() {
		return financeId;
	}

	public void setFinanceId(String financeId) {
		this.financeId = financeId;
	}

	public String getFinanceStatus() {
		return financeStatus;
	}

	public void setFinanceStatus(String financeStatus) {
		this.financeStatus = financeStatus;
	}

	public String getApplyDate() {
		return applyDate;
	}

	public void setApplyDate(String applyDate) {
		this.applyDate = applyDate;
	}

	public String getCorpId() {
		return corpId;
	}

	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}

	public String getAgencyName() {
		return agencyName;
	}

	public void setAgencyName(String agencyName) {
		this.agencyName = agencyName;
	}

	public String getAgencyNum() {
		return agencyNum;
	}

	public void setAgencyNum(String agencyNum) {
		this.agencyNum = agencyNum;
	}

	public String getMaxCredit() {
		return maxCredit;
	}

	public void setMaxCredit(String maxCredit) {
		this.maxCredit = maxCredit;
	}

	public String getAvailableCredit() {
		return availableCredit;
	}

	public void setAvailableCredit(String availableCredit) {
		this.availableCredit = availableCredit;
	}

	public String getFinanceRate() {
		return financeRate;
	}

	public void setFinanceRate(String financeRate) {
		this.financeRate = financeRate;
	}

	public String getCashRate() {
		return cashRate;
	}

	public void setCashRate(String cashRate) {
		this.cashRate = cashRate;
	}

	public String getFinanceStartDate() {
		return financeStartDate;
	}

	public void setFinanceStartDate(String financeStartDate) {
		this.financeStartDate = financeStartDate;
	}

	public String getFinanceEndDate() {
		return financeEndDate;
	}

	public void setFinanceEndDate(String financeEndDate) {
		this.financeEndDate = financeEndDate;
	}

	public String getFinanceAmount() {
		return financeAmount;
	}

	public void setFinanceAmount(String financeAmount) {
		this.financeAmount = financeAmount;
	}

	public String getExpense() {
		return expense;
	}

	public void setExpense(String expense) {
		this.expense = expense;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getInterestListInfo() {
		return interestListInfo;
	}

	public void setInterestListInfo(String interestListInfo) {
		this.interestListInfo = interestListInfo;
	}

	public String getGuaranteeRate() {
		return guaranteeRate;
	}

	public void setGuaranteeRate(String guaranteeRate) {
		this.guaranteeRate = guaranteeRate;
	}

	public String getPayAbleGuarantee() {
		return payAbleGuarantee;
	}

	public void setPayAbleGuarantee(String payAbleGuarantee) {
		this.payAbleGuarantee = payAbleGuarantee;
	}

	public String getGuaranteePayDate() {
		return guaranteePayDate;
	}

	public void setGuaranteePayDate(String guaranteePayDate) {
		this.guaranteePayDate = guaranteePayDate;
	}

	public String getPayActGuarantee() {
		return payActGuarantee;
	}

	public void setPayActGuarantee(String payActGuarantee) {
		this.payActGuarantee = payActGuarantee;
	}

	public String getGuaranteePayHis() {
		return guaranteePayHis;
	}

	public void setGuaranteePayHis(String guaranteePayHis) {
		this.guaranteePayHis = guaranteePayHis;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public String getGuaranteeAccountAmt() {
		return guaranteeAccountAmt;
	}

	public void setGuaranteeAccountAmt(String guaranteeAccountAmt) {
		this.guaranteeAccountAmt = guaranteeAccountAmt;
	}

	public String getBackTarget() {
		return backTarget;
	}

	public void setBackTarget(String backTarget) {
		this.backTarget = backTarget;
	}

	public String getHandleType() {
		return handleType;
	}

	public void setHandleType(String handleType) {
		this.handleType = handleType;
	}

}

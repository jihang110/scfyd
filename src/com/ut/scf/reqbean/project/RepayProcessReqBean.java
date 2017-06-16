package com.ut.scf.reqbean.project;

import com.ut.scf.reqbean.BaseReqBean;

public class RepayProcessReqBean extends BaseReqBean {

	private String userId;

	private String activitiKey;

	private String agree;

	private String advice;

	private String histroyAdvice;

	private String taskId;

	private String procInstId;

	// 还款信息
	private boolean interestDate;

	private String repaymentDate;

	private String repaySumAmt;

	private String repayCapitalAmt;

	private String repayInterestAmt;

	private String carStolenCertificate;

	private String note;

	private String carListInfo;

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

	public boolean isInterestDate() {
		return interestDate;
	}

	public void setInterestDate(boolean interestDate) {
		this.interestDate = interestDate;
	}

	public String getRepaymentDate() {
		return repaymentDate;
	}

	public void setRepaymentDate(String repaymentDate) {
		this.repaymentDate = repaymentDate;
	}

	public String getRepaySumAmt() {
		return repaySumAmt;
	}

	public void setRepaySumAmt(String repaySumAmt) {
		this.repaySumAmt = repaySumAmt;
	}

	public String getRepayCapitalAmt() {
		return repayCapitalAmt;
	}

	public void setRepayCapitalAmt(String repayCapitalAmt) {
		this.repayCapitalAmt = repayCapitalAmt;
	}

	public String getRepayInterestAmt() {
		return repayInterestAmt;
	}

	public void setRepayInterestAmt(String repayInterestAmt) {
		this.repayInterestAmt = repayInterestAmt;
	}

	public String getCarStolenCertificate() {
		return carStolenCertificate;
	}

	public void setCarStolenCertificate(String carStolenCertificate) {
		this.carStolenCertificate = carStolenCertificate;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public String getCarListInfo() {
		return carListInfo;
	}

	public void setCarListInfo(String carListInfo) {
		this.carListInfo = carListInfo;
	}

}

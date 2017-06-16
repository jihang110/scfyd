package com.ut.scf.reqbean.crm;

import java.util.Date;

import com.ut.scf.reqbean.BaseReqBean;

public class CreditReportAddReqBean extends BaseReqBean{
	
    private String corpId;
    private String creditSituation;
    private String ratingType;
    private String ratingAgency;
    private Date ratingTime;
    private String ratingResult;
    private String note;
    private String loanCardNo;
    private String inquiryPassword;
    private Date inquiryTime;
    private String summaryOfCreditReport;
    private String otherChannelInfo;
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}
	public String getCreditSituation() {
		return creditSituation;
	}
	public void setCreditSituation(String creditSituation) {
		this.creditSituation = creditSituation;
	}
	public String getRatingType() {
		return ratingType;
	}
	public void setRatingType(String ratingType) {
		this.ratingType = ratingType;
	}
	public String getRatingAgency() {
		return ratingAgency;
	}
	public void setRatingAgency(String ratingAgency) {
		this.ratingAgency = ratingAgency;
	}
	public Date getRatingTime() {
		return ratingTime;
	}
	public void setRatingTime(Date ratingTime) {
		this.ratingTime = ratingTime;
	}
	public String getRatingResult() {
		return ratingResult;
	}
	public void setRatingResult(String ratingResult) {
		this.ratingResult = ratingResult;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public String getLoanCardNo() {
		return loanCardNo;
	}
	public void setLoanCardNo(String loanCardNo) {
		this.loanCardNo = loanCardNo;
	}
	public String getInquiryPassword() {
		return inquiryPassword;
	}
	public void setInquiryPassword(String inquiryPassword) {
		this.inquiryPassword = inquiryPassword;
	}
	public Date getInquiryTime() {
		return inquiryTime;
	}
	public void setInquiryTime(Date inquiryTime) {
		this.inquiryTime = inquiryTime;
	}
	public String getSummaryOfCreditReport() {
		return summaryOfCreditReport;
	}
	public void setSummaryOfCreditReport(String summaryOfCreditReport) {
		this.summaryOfCreditReport = summaryOfCreditReport;
	}
	public String getOtherChannelInfo() {
		return otherChannelInfo;
	}
	public void setOtherChannelInfo(String otherChannelInfo) {
		this.otherChannelInfo = otherChannelInfo;
	}
    
}
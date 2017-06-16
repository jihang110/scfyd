package com.ut.scf.reqbean.crm;

import org.hibernate.validator.constraints.NotBlank;

import com.ut.scf.reqbean.BaseReqBean;

public class PurchasingRiskAnalyAddReqBean extends BaseReqBean{
	@NotBlank(message = "{corp.corpId.notblank}")
	 private String corpId;

	 private String purchaseRiskPoint;

	 private String generateAnalysis;

	 private String multipleAnalysis;

	public String getCorpId() {
		return corpId;
	}

	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}

	public String getPurchaseRiskPoint() {
		return purchaseRiskPoint;
	}

	public void setPurchaseRiskPoint(String purchaseRiskPoint) {
		this.purchaseRiskPoint = purchaseRiskPoint;
	}

	public String getGenerateAnalysis() {
		return generateAnalysis;
	}

	public void setGenerateAnalysis(String generateAnalysis) {
		this.generateAnalysis = generateAnalysis;
	}

	public String getMultipleAnalysis() {
		return multipleAnalysis;
	}

	public void setMultipleAnalysis(String multipleAnalysis) {
		this.multipleAnalysis = multipleAnalysis;
	}
	    
	 
}

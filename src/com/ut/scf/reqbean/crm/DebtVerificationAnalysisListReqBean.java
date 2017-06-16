package com.ut.scf.reqbean.crm;

import com.ut.scf.reqbean.PageReqBean;

public class DebtVerificationAnalysisListReqBean extends PageReqBean{
    private String corpName;
    private String corpId;
    
	public String getCorpId() {
		return corpId;
	}

	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}

	public String getCorpName() {
		return corpName;
	}

	public void setCorpName(String corpName) {
		this.corpName = corpName;
	}


    
}
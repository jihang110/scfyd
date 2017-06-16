package com.ut.scf.reqbean.crm;

import com.ut.scf.reqbean.BaseReqBean;

public class DebtVerificationAnalysisUpdateReqBean extends BaseReqBean{
	
	private String debtVaId;
    private String corpId;
    private String operYear;
    private String rigidDebtAnalysis;
    private String implicitDebtAnalysis;
    private String comprehensiveEvaluation;
	public String getDebtVaId() {
		return debtVaId;
	}
	public void setDebtVaId(String debtVaId) {
		this.debtVaId = debtVaId;
	}
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}
	public String getRigidDebtAnalysis() {
		return rigidDebtAnalysis;
	}
	public void setRigidDebtAnalysis(String rigidDebtAnalysis) {
		this.rigidDebtAnalysis = rigidDebtAnalysis;
	}
	public String getImplicitDebtAnalysis() {
		return implicitDebtAnalysis;
	}
	public void setImplicitDebtAnalysis(String implicitDebtAnalysis) {
		this.implicitDebtAnalysis = implicitDebtAnalysis;
	}
	public String getComprehensiveEvaluation() {
		return comprehensiveEvaluation;
	}
	public void setComprehensiveEvaluation(String comprehensiveEvaluation) {
		this.comprehensiveEvaluation = comprehensiveEvaluation;
	}
	public String getOperYear() {
		return operYear;
	}
	public void setOperYear(String operYear) {
		this.operYear = operYear;
	}
    
}
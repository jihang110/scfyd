package com.ut.scf.pojo;

import java.util.Date;

public class DebtVerificationAnalysis {
    
    private String debtVaId;
    private String corpId;
    private String operYear;
    private String relaCorpId;
    private Date createTime;
    private String createUserId;
    private String rigidDebtAnalysis;
    private String implicitDebtAnalysis;
    private String comprehensiveEvaluation;

    

	public String getOperYear() {
		return operYear;
	}


	public void setOperYear(String operYear) {
		this.operYear = operYear;
	}


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

    
    public String getRelaCorpId() {
        return relaCorpId;
    }

    
    public void setRelaCorpId(String relaCorpId) {
        this.relaCorpId = relaCorpId;
    }

    
    public Date getCreateTime() {
        return createTime;
    }

    
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    
    public String getCreateUserId() {
        return createUserId;
    }

    
    public void setCreateUserId(String createUserId) {
        this.createUserId = createUserId;
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
}
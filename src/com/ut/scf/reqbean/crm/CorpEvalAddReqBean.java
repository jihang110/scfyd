package com.ut.scf.reqbean.crm;

import org.hibernate.validator.constraints.NotBlank;

import com.ut.scf.reqbean.BaseReqBean;

/**
 * 
 * @author changxin
 *
 */
public class CorpEvalAddReqBean extends BaseReqBean {

	@NotBlank(message = "{corp.corpId.notblank}")
	private String corpId;

	private String financeComprehensiveEval;

	private String financeIndicatorsAnaly;

	

	private String wholeRiskEval;

	

	public String getCorpId() {
		return corpId;
	}

	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}

	public String getFinanceComprehensiveEval() {
		return financeComprehensiveEval;
	}

	public void setFinanceComprehensiveEval(String financeComprehensiveEval) {
		this.financeComprehensiveEval = financeComprehensiveEval;
	}

	public String getFinanceIndicatorsAnaly() {
		return financeIndicatorsAnaly;
	}

	public void setFinanceIndicatorsAnaly(String financeIndicatorsAnaly) {
		this.financeIndicatorsAnaly = financeIndicatorsAnaly;
	}

	

	public String getWholeRiskEval() {
		return wholeRiskEval;
	}

	public void setWholeRiskEval(String wholeRiskEval) {
		this.wholeRiskEval = wholeRiskEval;
	}

	

}

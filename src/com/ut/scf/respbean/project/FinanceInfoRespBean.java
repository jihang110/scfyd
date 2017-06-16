package com.ut.scf.respbean.project;

import java.math.BigDecimal;

import com.ut.scf.respbean.ListRespBean;

public class FinanceInfoRespBean extends ListRespBean {

	private Double guaranteeRate;

	private BigDecimal costRate;
	
	private String receptionDate;

	public Double getGuaranteeRate() {
		return guaranteeRate;
	}

	public void setGuaranteeRate(Double guaranteeRate) {
		this.guaranteeRate = guaranteeRate;
	}

	public BigDecimal getCostRate() {
		return costRate;
	}

	public void setCostRate(BigDecimal costRate) {
		this.costRate = costRate;
	}

	public String getReceptionDate() {
		return receptionDate;
	}

	public void setReceptionDate(String receptionDate) {
		this.receptionDate = receptionDate;
	}

}

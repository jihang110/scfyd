package com.ut.scf.respbean.project;

import java.math.BigDecimal;
import java.util.List;

import com.ut.scf.respbean.BaseRespBean;

public class GetCarInfoByFinanceIdRespBean extends BaseRespBean {
	/**
	 * 集合
	 */
	private List<?> dataList;
	private BigDecimal carActualPriceTotal;
	public List<?> getDataList() {
		return dataList;
	}
	public void setDataList(List<?> dataList) {
		this.dataList = dataList;
	}
	public BigDecimal getCarActualPriceTotal() {
		return carActualPriceTotal;
	}
	public void setCarActualPriceTotal(BigDecimal carActualPriceTotal) {
		this.carActualPriceTotal = carActualPriceTotal;
	}
	
}

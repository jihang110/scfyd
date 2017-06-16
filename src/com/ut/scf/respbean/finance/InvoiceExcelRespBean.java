package com.ut.scf.respbean.finance;

import java.util.List;
import java.util.Map;

import com.ut.scf.respbean.BaseRespBean;

public class InvoiceExcelRespBean  extends BaseRespBean{
	private String excelPath;
	private List<Map<String, Object>> dataList;
	public String getExcelPath() {
		return excelPath;
	}
	public void setExcelPath(String excelPath) {
		this.excelPath = excelPath;
	}
	public List<Map<String, Object>> getDataList() {
		return dataList;
	}
	public void setDataList(List<Map<String, Object>> dataList) {
		this.dataList = dataList;
	}
	
	
}

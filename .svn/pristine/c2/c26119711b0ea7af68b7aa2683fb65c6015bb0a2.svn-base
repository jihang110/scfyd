package com.ut.scf.reqbean;

import java.util.Map;

import org.hibernate.validator.constraints.NotBlank;

public class HtmlToWordReqBean extends BaseReqBean {

	@NotBlank(message = "{fileName.notblank}")
	private String fileName;
	
	private Map<?, ?> paramMap;

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public Map<?, ?> getParamMap() {
		return paramMap;
	}

	public void setParamMap(Map<?, ?> paramMap) {
		this.paramMap = paramMap;
	}

}

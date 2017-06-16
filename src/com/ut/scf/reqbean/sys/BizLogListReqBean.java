package com.ut.scf.reqbean.sys;

import javax.validation.constraints.Pattern;

import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.reqbean.PageReqBean;

public class BizLogListReqBean extends PageReqBean {

	/**
	 * 用户名
	 */
	private String username;

	/**
	 * 企业Id
	 */
	private String corpId;

	/**
	 * 开始日期
	 */
	@Pattern(regexp = ScfConsts.REGEX_DATE, message = "{date.regexp.notpattern}")
	private String startDate;

	/**
	 * 结束日期
	 */
	@Pattern(regexp = ScfConsts.REGEX_DATE, message = "{date.regexp.notpattern}")
	private String endDate;

	/**
	 * 日志类别
	 */
	private String logType;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getCorpId() {
		return corpId;
	}

	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getLogType() {
		return logType;
	}

	public void setLogType(String logType) {
		this.logType = logType;
	}

}

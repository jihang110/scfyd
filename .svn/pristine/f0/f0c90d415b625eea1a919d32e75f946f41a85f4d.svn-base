package com.ut.scf.reqbean.sys;

import javax.validation.constraints.Pattern;

import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.reqbean.PageReqBean;

public class NotepadFlowListReqBean extends PageReqBean{
	
	
	/**
	 * 用户Id
	 */
	private String userId;
	
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
	 * 是否分页，0：否，1：是，默认为0.
	 */
	private Integer isPage = 0;
	
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
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

	public Integer getIsPage() {
		return isPage;
	}

	public void setIsPage(Integer isPage) {
		this.isPage = isPage;
	}
	
	
}

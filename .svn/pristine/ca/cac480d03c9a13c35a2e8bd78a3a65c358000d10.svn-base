package com.ut.scf.reqbean.sys;

import javax.validation.constraints.Pattern;

import com.ut.scf.core.dict.ScfConsts;

public class NotepadFlowUpdateReqBean {
	/**
	 * 记录Id,主键
	 */
	private String recUid;
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
	 * 行程时间
	 */
	private String operTime;
	/**
	 * 备注
	 */
	private String note;
	public String getRecUid() {
		return recUid;
	}
	public void setRecUid(String recUid) {
		this.recUid = recUid;
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
	public String getOperTime() {
		return operTime;
	}
	public void setOperTime(String operTime) {
		this.operTime = operTime;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	
}

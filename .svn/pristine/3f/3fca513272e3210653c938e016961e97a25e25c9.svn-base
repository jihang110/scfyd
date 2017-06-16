package com.ut.scf.core.dict;

import java.io.Serializable;

import org.apache.commons.lang.builder.ToStringBuilder;

/**
 * Page
 * 
 * @author zyx
 *
 */
public class PageInfoBean implements Serializable {

	private static final long serialVersionUID = 1L;

	/*
	 * 当前页, 默认为第1页
	 */
	protected int pageNumber = 1;

	/*
	 * 每页记录数
	 */
	protected int pageSize = 10;

	/*
	 * 总记录数, 默认为-1, 表示需要查询
	 */
	protected int totalRecord = -1;

	/*
	 * 总页数, 默认为-1, 表示需要计算
	 */
	protected int totalPage = -1;

	public int getPageNumber() {
		return pageNumber;
	}

	public void setPageNumber(int pageNumber) {
		this.pageNumber = pageNumber;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getTotalRecord() {
		return totalRecord;
	}

	public void setTotalRecord(int totalRecord) {
		this.totalRecord = totalRecord;
		computeTotalPage();
	}

	public int getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}

	protected void computeTotalPage() {
		if (getPageSize() > 0 && getTotalRecord() > -1) {
			this.totalPage = (getTotalRecord() - 1) / getPageSize() + 1;
		}
	}
}

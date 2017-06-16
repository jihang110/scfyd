package com.ut.scf.respbean;

import java.util.List;

/**
 * 带分页的基础响应Bean
 * 
 * @author sunll
 *
 */
public class PageRespBean extends BaseRespBean {

	/**
	 * 总共记录数，分页用到的，如不是分页，不用返回此值
	 */
	private int records = 0;

	/**
	 * 总共页数，分页用到的，如不是分页，不用返回此值
	 */
	private int pages = 0;

	/**
	 * 分页的集合
	 */
	private List<?> dataList;

	public int getRecords() {
		return records;
	}

	public void setRecords(int records) {
		this.records = records;
	}

	public int getPages() {
		return pages;
	}

	public void setPages(int pages) {
		this.pages = pages;
	}

	public List<?> getDataList() {
		return dataList;
	}

	public void setDataList(List<?> dataList) {
		this.dataList = dataList;
	}

}

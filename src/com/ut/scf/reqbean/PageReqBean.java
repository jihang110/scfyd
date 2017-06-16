package com.ut.scf.reqbean;

import javax.validation.constraints.Min;

/**
 * 带分页的基础请求Bean
 * 
 * @author sunll
 *
 */
public class PageReqBean extends BaseReqBean {

	/**
	 * 分页的当前页码，默认为1，如果请求不需要分页，不需要此参数
	 */
	@Min(value = 1, message = "{page.pageNumber.min}")
	private int pageNumber = 1;

	/**
	 * 分页的每页记录数，默认为10，如果请求不需要分页，不需要此参数
	 */
	private int pageSize = 10;

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

}

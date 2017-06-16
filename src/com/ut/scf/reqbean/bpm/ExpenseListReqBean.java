package com.ut.scf.reqbean.bpm;

import com.ut.scf.reqbean.PageReqBean;

/**
 * @author jihang
 *
 */
public class ExpenseListReqBean extends PageReqBean{
	/**
	 * 项目名称
	 */
	private String projectName;
	/**
	 * 企业Id
	 */
	private String corpId;
	/**
	 * 合同编号
	 */
	private String contractNo;
	/**
	 * 关联企业名称
	 */
	private String relSaleCorpName;
	/**
	 * 立项人员名称id
	 */
	private String proMembId;
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}
	public String getContractNo() {
		return contractNo;
	}
	public void setContractNo(String contractNo) {
		this.contractNo = contractNo;
	}
	public String getProMembId() {
		return proMembId;
	}
	public void setProMembId(String proMembId) {
		this.proMembId = proMembId;
	}
	public String getRelSaleCorpName() {
		return relSaleCorpName;
	}
	public void setRelSaleCorpName(String relSaleCorpName) {
		this.relSaleCorpName = relSaleCorpName;
	}
	
}

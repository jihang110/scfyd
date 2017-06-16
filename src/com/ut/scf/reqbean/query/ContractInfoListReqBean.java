package com.ut.scf.reqbean.query;

import java.util.Date;

import com.ut.scf.reqbean.PageReqBean;

public class ContractInfoListReqBean extends PageReqBean {
	/**
	 * 合同
	 * **/
	private String contractNo;//合同编号
	private Date signDate;// 签约日期
	private Date contractValDate;// 合同生效日期
	private Date contractDueDate;// 合同到期日期
	private byte fileNum; // 附件数
	private String fileInfo;// 附件信息
	private String contractType;//合同类型
    private String agencyCorpName;//买方名称
    private String coreCorpName;//卖方名称
	private String agencyOrgnNum;//企业组织代码机构证
	private String coreOrgnNum;//企业组织代码机构证
	/*private String agencyCorpName;// 经销商名称
	private String agencyOrgnNum;// 经销商组织代码机构
*/	private String productType;//产品类型
	private String pmFileInfo;// 项目经理附件
    
	private String remark;// 备注
	private String coreCorpId;
	private String agencyCorpId;

	public String getContractNo() {
		return contractNo;
	}

	public void setContractNo(String contractNo) {
		this.contractNo = contractNo;
	}

	public Date getSignDate() {
		return signDate;
	}

	public void setSignDate(Date signDate) {
		this.signDate = signDate;
	}

	public Date getContractValDate() {
		return contractValDate;
	}

	public void setContractValDate(Date contractValDate) {
		this.contractValDate = contractValDate;
	}

	public Date getContractDueDate() {
		return contractDueDate;
	}

	public void setContractDueDate(Date contractDueDate) {
		this.contractDueDate = contractDueDate;
	}

      



	public String getAgencyCorpName() {
		return agencyCorpName;
	}

	public void setAgencyCorpName(String agencyCorpName) {
		this.agencyCorpName = agencyCorpName;
	}

	public String getCoreCorpName() {
		return coreCorpName;
	}

	public void setCoreCorpName(String coreCorpName) {
		this.coreCorpName = coreCorpName;
	}

	public String getAgencyOrgnNum() {
		return agencyOrgnNum;
	}

	public void setAgencyOrgnNum(String agencyOrgnNum) {
		this.agencyOrgnNum = agencyOrgnNum;
	}

	public String getCoreOrgnNum() {
		return coreOrgnNum;
	}

	public void setCoreOrgnNum(String coreOrgnNum) {
		this.coreOrgnNum = coreOrgnNum;
	}

	public byte getFileNum() {
		return fileNum;
	}

	public void setFileNum(byte fileNum) {
		this.fileNum = fileNum;
	}

	public String getFileInfo() {
		return fileInfo;
	}

	public void setFileInfo(String fileInfo) {
		this.fileInfo = fileInfo;
	}

	public String getContractType() {
		return contractType;
	}

	public void setContractType(String contractType) {
		this.contractType = contractType;
	}

	public String getPmFileInfo() {
		return pmFileInfo;
	}

	public void setPmFileInfo(String pmFileInfo) {
		this.pmFileInfo = pmFileInfo;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getProductType() {
		return productType;
	}

	public void setProductType(String productType) {
		this.productType = productType;
	}

	public String getCoreCorpId() {
		return coreCorpId;
	}

	public void setCoreCorpId(String coreCorpId) {
		this.coreCorpId = coreCorpId;
	}

	public String getAgencyCorpId() {
		return agencyCorpId;
	}

	public void setAgencyCorpId(String agencyCorpId) {
		this.agencyCorpId = agencyCorpId;
	}
    

}

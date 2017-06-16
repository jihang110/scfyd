package com.ut.scf.reqbean.crm;

import java.math.BigDecimal;

import org.hibernate.validator.constraints.NotBlank;

import com.ut.scf.reqbean.BaseReqBean;

/**
 * 
 * @author sunll
 *
 */
public class AffiliatedEnterpriseUpdateReqBean extends BaseReqBean{
	
	@NotBlank(message = "{recUid.notblank}")
	private String recUid;
	
	private String enterpriseName;
	
	private Integer enterpriseType;
	
	private Integer relationType;
	
    private String busiScope;
	
    private String industry;
	
    private String ccy;
	
	private BigDecimal regCap;
	
    private String shareName;
	
    private String shareType;
	
    private String shareholdingPattern;
    
    private BigDecimal shareProportion;

	public String getRecUid() {
		return recUid;
	}

	public void setRecUid(String recUid) {
		this.recUid = recUid;
	}

	public String getEnterpriseName() {
		return enterpriseName;
	}

	public void setEnterpriseName(String enterpriseName) {
		this.enterpriseName = enterpriseName;
	}

	public Integer getEnterpriseType() {
		return enterpriseType;
	}

	public void setEnterpriseType(Integer enterpriseType) {
		this.enterpriseType = enterpriseType;
	}

	public Integer getRelationType() {
		return relationType;
	}

	public void setRelationType(Integer relationType) {
		this.relationType = relationType;
	}

	public String getBusiScope() {
		return busiScope;
	}

	public void setBusiScope(String busiScope) {
		this.busiScope = busiScope;
	}

	public String getIndustry() {
		return industry;
	}

	public void setIndustry(String industry) {
		this.industry = industry;
	}

	public String getCcy() {
		return ccy;
	}

	public void setCcy(String ccy) {
		this.ccy = ccy;
	}

	public BigDecimal getRegCap() {
		return regCap;
	}

	public void setRegCap(BigDecimal regCap) {
		this.regCap = regCap;
	}

	public String getShareName() {
		return shareName;
	}

	public void setShareName(String shareName) {
		this.shareName = shareName;
	}

	public String getShareType() {
		return shareType;
	}

	public void setShareType(String shareType) {
		this.shareType = shareType;
	}

	public String getShareholdingPattern() {
		return shareholdingPattern;
	}

	public void setShareholdingPattern(String shareholdingPattern) {
		this.shareholdingPattern = shareholdingPattern;
	}

	public BigDecimal getShareProportion() {
		return shareProportion;
	}

	public void setShareProportion(BigDecimal shareProportion) {
		this.shareProportion = shareProportion;
	}
    
}

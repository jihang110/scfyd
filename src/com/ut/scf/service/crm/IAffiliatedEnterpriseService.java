package com.ut.scf.service.crm;

import java.util.Map;

import com.ut.scf.respbean.BaseRespBean;
/**
 * 
 * @author sunll
 *
 */
public interface IAffiliatedEnterpriseService {
	
	public BaseRespBean getAffiliatedEnterpriseList(Map<String, Object> paramMap);

	public BaseRespBean addAffiliatedEnterprise(Map<String, Object> paramMap);

	public BaseRespBean updateAffiliatedEnterprise(Map<String, Object> paramMap);

	public BaseRespBean deleteAffiliatedEnterprise(String recUid);
	
}

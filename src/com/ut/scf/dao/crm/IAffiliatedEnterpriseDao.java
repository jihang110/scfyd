package com.ut.scf.dao.crm;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface IAffiliatedEnterpriseDao {
	
	List<Map<String, Object>> selectAffiliatedEnterpriseList(Map<String, Object> paramMap, PageInfoBean page);
	
	List<Map<String, Object>> selectAffiliatedEnterpriseList(Map<String, Object> paramMap);

	int insertAffiliatedEnterprise(Map<String, Object> paramMap);

	int deleteAffiliatedEnterprise(String recUid);

	int updateAffiliatedEnterprise(Map<String, Object> paramMap);
	
}

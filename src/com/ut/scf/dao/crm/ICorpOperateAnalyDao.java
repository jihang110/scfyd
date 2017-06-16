package com.ut.scf.dao.crm;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;

public interface ICorpOperateAnalyDao {
    
    List<Map<String, Object>> selectCorpOperateAnalyList(Map<String, Object> paramMap, PageInfoBean page);

	int insertCorpOperateAnaly(Map<String, Object> paramMap);

	int deleteCorpOperateAnaly(String recUid);

	int updateCorpOperateAnaly(Map<String, Object> paramMap);

}

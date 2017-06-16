package com.ut.scf.service.crm;

import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.respbean.BaseRespBean;

/**
 * 
 * @author changxin
 *
 */
public interface ICorpEvalService {
	
	public BaseRespBean getCorpEvalList(Map<String, Object> paramMap, PageInfoBean page);

	public BaseRespBean addCorpEval(Map<String, Object> paramMap);
	
	public BaseRespBean updateCorpEval(Map<String, Object> paramMap);

}
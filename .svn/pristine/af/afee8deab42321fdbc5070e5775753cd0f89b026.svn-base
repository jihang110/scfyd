package com.ut.scf.service.crm;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.pojo.NegativeInfo;
import com.ut.scf.respbean.BaseRespBean;

public interface INegativeInfoService {

	public BaseRespBean getNegativeInfoList(Map<String, Object> paramMap, PageInfoBean page);

	public List<Map<String, Object>> getNegativeInfoList(Map<String, Object> paramMap);
	
	public BaseRespBean addNegativeInfo(Map<String, Object> paramMap);

	public BaseRespBean updateNegativeInfo(Map<String, Object> paramMap);

	public BaseRespBean deleteNegativeInfo(Map<String, Object> paramMap);
	
	public BaseRespBean insertNegativeInfoBatch(List<NegativeInfo> list);
	
	/**
	 * 查询需要参与计算的值
	 * @return
	 */
	public BaseRespBean selectParams(Map<String, Object> paramMap);

}

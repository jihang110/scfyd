package com.ut.scf.service.crm;

import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.respbean.BaseRespBean;

public interface IShareHolderService {

	public BaseRespBean getShareHolderInfoList(Map<String, Object> paramMap, PageInfoBean page);

	public BaseRespBean addShareHolderInfo(Map<String, Object> paramMap);

	public BaseRespBean updateShareHolderInfo(Map<String, Object> paramMap);

	public BaseRespBean deleteShareHolderInfo(Map<String, Object> paramMap);

}

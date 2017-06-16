package com.ut.scf.service.asset;

import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.respbean.BaseRespBean;

public interface ITransferManagerService {
	public BaseRespBean getTransferList(Map<String, Object> paramMap, PageInfoBean page);

	public BaseRespBean addTransfer(Map<String, Object> paramMap);

	public BaseRespBean updateTransfer(Map<String, Object> paramMap);

	public BaseRespBean deleteTransfer(String recUid);
}

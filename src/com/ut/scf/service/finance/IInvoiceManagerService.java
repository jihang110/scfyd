package com.ut.scf.service.finance;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.respbean.BaseRespBean;

public interface IInvoiceManagerService {
	public BaseRespBean getInvoiceManagerList(Map<String, Object> paramMap, PageInfoBean page);

	public List<Map<String, Object>> getInvoiceManagerList(Map<String, Object> paramMap);
	
	public BaseRespBean addInvoiceManager(Map<String, Object> paramMap);

	public BaseRespBean updateInvoiceManager(Map<String, Object> paramMap);

	public BaseRespBean deleteInvoiceManager(String recUid);
}

package com.ut.scf.dao.finance;

import java.util.List;
import java.util.Map;

import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.pojo.Invoice;

public interface IInvoiceManagerDao {
	List<Map<String, Object>> selectInvoiceManagerList(Map<String, Object> paramMap, PageInfoBean page);

	List<Map<String, Object>> selectInvoiceManagerList(Map<String, Object> paramMap);

	int insertInvoiceManager(Map<String, Object> paramMap);

	int deleteInvoiceManager(String recUid);

	int updateInvoiceManager(Map<String, Object> paramMap);

	int addInvoiceRecordBatch(List<Invoice> list);
}

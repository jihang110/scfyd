package com.ut.scf.service.finance.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.finance.IInvoiceManagerDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.finance.IInvoiceManagerService;
@Service("invoiceManagerService")
public class InvoiceManagerServiceImpl implements IInvoiceManagerService{
	private static final Logger log = LoggerFactory
			.getLogger(InvoiceManagerServiceImpl.class);
	@Resource
	private IInvoiceManagerDao InvoiceManagerDao;
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getInvoiceManagerList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = InvoiceManagerDao.selectInvoiceManagerList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}
	
	@Transactional(readOnly = true)
	public List<Map<String, Object>> getInvoiceManagerList(Map<String, Object> paramMap) {
		return InvoiceManagerDao.selectInvoiceManagerList(paramMap);
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addInvoiceManager(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		// 生成主键Id
		paramMap.put("recUid", ScfUUID.generate());
		int insertNum = InvoiceManagerDao.insertInvoiceManager(paramMap);
		log.debug("insert InvoiceManager num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateInvoiceManager(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int updateNum = InvoiceManagerDao.updateInvoiceManager(paramMap);
		log.debug("update InvoiceManager num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteInvoiceManager(String recUid) {
		BaseRespBean respBean = new BaseRespBean();
		int deleteNum = InvoiceManagerDao.deleteInvoiceManager(recUid);
		log.debug("delete InvoiceManager num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}
}

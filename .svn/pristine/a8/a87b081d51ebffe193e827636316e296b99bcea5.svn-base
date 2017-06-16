package com.ut.scf.service.bpm.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.bpm.IExpenseDao;
import com.ut.scf.dao.bpm.IPriProjectDao;
import com.ut.scf.dao.finance.IRecManageDao;
import com.ut.scf.dao.sys.ICorpDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.bpm.IExpenseService;

@Service("expenseService")
public class ExpenseServiceImpl implements IExpenseService {
	private static final Logger log = LoggerFactory.getLogger(ExpenseServiceImpl.class);
	
	@Resource private IExpenseDao expenseDao;
	@Resource private IPriProjectDao priProjectDao;
	@Resource private IRecManageDao recManageDao;
	@Resource private ICorpDao corpDao;
	
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getExpenseList(Map<String, Object> paramMap) {
		List<Map<String, Object>> list = expenseDao.selectExpenseList(paramMap);
		PageRespBean respBean = new PageRespBean();
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addExpense(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		if (expenseDao.countProjectName(paramMap) > 0) {
			respBean.setResult(ErrorCodeEnum.PROJECT_NAME_EXIST);
			return respBean;
		}
		// 生成主键Id
		paramMap.put("recUid", ScfUUID.generate());
		int insertNum = expenseDao.insertExpense(paramMap);
		log.debug("insert Expense num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addPriProject(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int insertNum = priProjectDao.insertPriProject(paramMap);
		log.debug("insert PriProject num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean hasProNm(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		if (expenseDao.countProjectName(paramMap) > 0) {
			respBean.setResult(ErrorCodeEnum.PROJECT_NAME_EXIST);
			return respBean;
		}
		return respBean;
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean hasPriProNm(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		if (priProjectDao.countProjectName(paramMap) > 0) {
			respBean.setResult(ErrorCodeEnum.PROJECT_NAME_EXIST);
			return respBean;
		}
		return respBean;
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean checkExpense(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		if (expenseDao.countProjectName(paramMap) <= 0) {
			respBean.setResult(ErrorCodeEnum.PROJECT_NAME_NOT_EXIST);
			return respBean;
		}
		return respBean;
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateExpense(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int updateNum = expenseDao.updateExpense(paramMap);
		log.debug("update Expense num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteExpense(String recUid) {
		BaseRespBean respBean = new BaseRespBean();
		int deleteNum = expenseDao.deleteExpense(recUid);
		log.debug("delete Expense num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean checkCorpName(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		if (corpDao.countCorpByName(paramMap) <= 0) {
			String sysType = paramMap.get("sysType").toString();
			// 买方
			if ("4".equals(sysType)) {
				respBean.setResult(ErrorCodeEnum.BUY_CORP_NAME_NOT_EXIST);
				// 卖方
			} else if ("5".equals(sysType)) {
				respBean.setResult(ErrorCodeEnum.SALE_CORP_NAME_NOT_EXIST);
			}
			
			return respBean;
		}
		return respBean;
	}
}

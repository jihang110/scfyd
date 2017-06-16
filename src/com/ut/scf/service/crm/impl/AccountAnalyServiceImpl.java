package com.ut.scf.service.crm.impl;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.HashMap;
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
import com.ut.scf.dao.crm.IAccountAnalyDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.crm.IAccountAnalyService;

@Service("accountAnalyService")
public class AccountAnalyServiceImpl implements IAccountAnalyService {

	private static final Logger log = LoggerFactory.getLogger(BankStreamServiceImpl.class);

	@Resource
	private IAccountAnalyDao accountAnalyDao;

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getAccountAnalyList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = accountAnalyDao.selectAccountAnalyList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean insertAccountAnaly(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		// 生成主键Id
		paramMap.put("recUid", ScfUUID.generate());
		int insertNum = accountAnalyDao.insertAccountAnaly(paramMap);
		log.debug("insert AccountAnaly num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateAccountAnaly(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		int updateNum = accountAnalyDao.updateAccountAnaly(paramMap);
		log.debug("update AccountAnaly num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteAccountAnaly(String recUid) {
		BaseRespBean respBean = new BaseRespBean();
		int deleteNum = accountAnalyDao.deleteAccountAnaly(recUid);
		log.debug("delete AccountAnaly num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}

		return respBean;
	}

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean AccountAnalyProportion(Map<String, Object> paramMap) {
		List<Map<String, Object>> list = accountAnalyDao.accountAnalyProportion(paramMap);

		List<Map<String, Object>> accountlList = new ArrayList<Map<String, Object>>();
		Map<String, Object> accountMap = new HashMap<String, Object>();
		BigDecimal totalAmount = BigDecimal.ZERO;
		BigDecimal amount0 = BigDecimal.ZERO;
		BigDecimal amount1 = BigDecimal.ZERO;
		BigDecimal amount2 = BigDecimal.ZERO;
		BigDecimal amount3 = BigDecimal.ZERO;
		BigDecimal amount4 = BigDecimal.ZERO;
		BigDecimal amount6 = BigDecimal.ZERO;
		BigDecimal amount12 = BigDecimal.ZERO;
		BigDecimal percent = BigDecimal.ZERO;
		if (null != list && !list.isEmpty()) {
			for (Map<String, Object> map : list) {
				int level = (int) map.get("level");
				BigDecimal amount = (BigDecimal) map.get("amount");
				totalAmount = amount.add(totalAmount);
				if (level == 0) {
					amount0 = amount;
				} else if (level == 1) {
					amount1 = amount;
				} else if (level == 2) {
					amount2 = amount;
				} else if (level == 3) {
					amount3 = amount;
				} else if (level > 3 && level <= 6) {
					amount4 = amount.add(amount4);
				} else if (level > 6 && level <= 12) {
					amount6 = amount.add(amount6);
				} else {
					amount12 = amount.add(amount12);
				}

			}
		}
		if (totalAmount.equals(BigDecimal.ZERO)) {
			totalAmount = BigDecimal.ONE;
		}
		percent = amount0.divide(totalAmount, 4, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(100));
		accountMap = new HashMap<String, Object>();
		accountMap.put("analyDays", "0-30");
		accountMap.put("amount", amount0);
		accountMap.put("percent", percent);
		accountlList.add(accountMap);

		percent = amount1.divide(totalAmount, 4, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(100));
		accountMap = new HashMap<String, Object>();
		accountMap.put("analyDays", "30-60");
		accountMap.put("amount", amount1);
		accountMap.put("percent", percent);
		accountlList.add(accountMap);

		percent = amount2.divide(totalAmount, 4, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(100));
		accountMap = new HashMap<String, Object>();
		accountMap.put("analyDays", "60-90");
		accountMap.put("amount", amount2);
		accountMap.put("percent", percent);
		accountlList.add(accountMap);

		percent = amount3.divide(totalAmount, 4, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(100));
		accountMap = new HashMap<String, Object>();
		accountMap.put("analyDays", "90-120");
		accountMap.put("amount", amount3);
		accountMap.put("percent", percent);
		accountlList.add(accountMap);

		percent = amount4.divide(totalAmount, 4, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(100));
		accountMap = new HashMap<String, Object>();
		accountMap.put("analyDays", "120-180");
		accountMap.put("amount", amount4);
		accountMap.put("percent", percent);
		accountlList.add(accountMap);

		percent = amount6.divide(totalAmount, 4, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(100));
		accountMap = new HashMap<String, Object>();
		accountMap.put("analyDays", "180-360");
		accountMap.put("amount", amount6);
		accountMap.put("percent", percent);
		accountlList.add(accountMap);

		percent = amount12.divide(totalAmount, 4, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(100));
		accountMap = new HashMap<String, Object>();
		accountMap.put("analyDays", "≥360");
		accountMap.put("amount", amount12);
		accountMap.put("percent", percent);
		accountlList.add(accountMap);
		PageRespBean respBean = new PageRespBean();
		respBean.setDataList(accountlList);
		return respBean;
	}

}

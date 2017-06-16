package com.ut.scf.service.pub.impl;

import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.dao.auto.GuaranteeMoneyManagementMapper;
import com.ut.scf.dao.pub.IGaranteeMoneyDao;
import com.ut.scf.pojo.auto.GuaranteeMoneyManagement;
import com.ut.scf.pojo.auto.GuaranteeMoneyManagementExample;
import com.ut.scf.pojo.auto.ProductInfo;
import com.ut.scf.pojo.auto.GuaranteeMoneyManagementExample.Criteria;
import com.ut.scf.reqbean.pub.GaranteeMoneyUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.pub.IGaranteeMoneyService;


@Service("garanteeMoneyService")
public class GaranteeMoneyServiceImpl implements IGaranteeMoneyService{
	
	private static final Logger log = LoggerFactory
			.getLogger(GaranteeMoneyServiceImpl.class);
	
	@Resource
	private IGaranteeMoneyDao garanteeMoneyDao;

	@Resource
	private GuaranteeMoneyManagementMapper gMMM;

	
	/**
	 * 条件查询 分页获取GuaranteeMoney
	 * 
	 * @param paramMap
	 * @param page
	 */
	@Override
	public BaseRespBean getGaranteeMoneyList(Map<String, Object> paramMap,
			PageInfoBean page) {
		List<Map<String, Object>> list = garanteeMoneyDao.getGaranteeMoneyPageList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		paramMap.get("productId");
		paramMap.get("productName");
		paramMap.get("guaranteeMoneyRate");
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	/**
	 * 新增 GaranteeMoney
	 * 
	 * @param paramMap
	 * 
	 */
	@Override
	public BaseRespBean insertGaranteeMoney(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		
		// 产品名称不能重复。
		GuaranteeMoneyManagementExample gMME = new GuaranteeMoneyManagementExample();
		Criteria criteria = gMME.createCriteria();
		criteria.andProductNameEqualTo((String) paramMap.get("productName"));
		if (gMMM.countByExample(gMME) > 0) {
			respBean.setResult(ErrorCodeEnum.PRODUCT_NAME_EXIST);
			return respBean;
		}
//		paramMap.put("productId", ScfUUID.generate());
		GuaranteeMoneyManagement record = new GuaranteeMoneyManagement();
		BeanUtil.mapToBean(paramMap, record);
		int insertNum = gMMM.insert(record);
		log.debug("insert GMMdata num {}", insertNum);

		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		
		return respBean;
	}

	/**
	 * 删除   GaranteeMoney
	 * 
	 * @param productId
	 */
	@Override
	public BaseRespBean deleteGaranteeMoney(String productId) {
		BaseRespBean respBean = new BaseRespBean();
		ProductInfo record = new ProductInfo();
		record.setProductId(productId);
		int deleteNum = gMMM.deleteByPrimaryKey(productId);
		log.debug("delete GMMdata num {}", deleteNum);
		if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}

	/**
	 * 修改   GaranteeMoney
	 * 
	 * @param GaranteeMoneyUpdateReqBean
	 */
	@Override
	public BaseRespBean updateGaranteeMoney(GaranteeMoneyUpdateReqBean reqBean) {
		BaseRespBean respBean = new BaseRespBean();
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		GuaranteeMoneyManagement record = new GuaranteeMoneyManagement();
		BeanUtil.mapToBean(paramMap, record);
		int updateNum = gMMM.updateByPrimaryKeySelective(record);
		log.debug("update GMMdata num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	}

}

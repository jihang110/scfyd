package com.ut.scf.service.pub.impl;

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
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.auto.GuaranteeMoneyManagementMapper;
import com.ut.scf.dao.auto.InterestManagementMapper;
import com.ut.scf.dao.auto.ProductInfoMapper;
import com.ut.scf.dao.pub.IPrdInfoDao;
import com.ut.scf.pojo.auto.GuaranteeMoneyManagementExample;
import com.ut.scf.pojo.auto.InterestManagementExample;
import com.ut.scf.pojo.auto.ProductInfo;
import com.ut.scf.pojo.auto.ProductInfoExample;
import com.ut.scf.pojo.auto.ProductInfoExample.Criteria;
import com.ut.scf.reqbean.pub.PrdUpdateReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.pub.IPrdManagerService;

@Service("prdManagerService")
public class PrdManagerServiceImpl implements IPrdManagerService{
	
	private static final Logger log = LoggerFactory
			.getLogger(PrdManagerServiceImpl.class);
	
	@Resource
	private IPrdInfoDao prdInfoDao;

	@Resource
	private ProductInfoMapper productInfoMapper;
	
	@Resource
	private InterestManagementMapper interestManagementMapper;
	
	@Resource
	private GuaranteeMoneyManagementMapper gMMM;

	/**
	 * 条件查询 分页获取product
	 * 
	 * @param paramMap
	 * @param page
	 */
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getProductList(Map<String, Object> paramMap,
			PageInfoBean page) {
		List<Map<String, Object>> list = prdInfoDao.getProductIfnoPageList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		paramMap.get("productName");
		paramMap.get("productDesc");
		paramMap.get("attachment");
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	/**
	 * 新增 product
	 * 
	 * @param paramMap
	 * 
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean insertProduct(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();
		ProductInfoExample productInfoExample = new ProductInfoExample();
		Criteria criteria = productInfoExample.createCriteria();
		criteria.andProductNameEqualTo((String) paramMap.get("productName"));
		
		if(productInfoMapper.countByExample(productInfoExample) > 0){
			respBean.setResult(ErrorCodeEnum.INTEREST_EXIST);
			return respBean;
		}
		ProductInfo record = new ProductInfo();
		paramMap.put("productId", ScfUUID.generate());
		BeanUtil.mapToBean(paramMap, record);
		int insertNum = productInfoMapper.insert(record);
		log.debug("insert product num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}

		return respBean;
	}

	/**
	 * 删除   product
	 * 
	 * @param productId
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteProduct(String productId) {
		BaseRespBean respBean = new BaseRespBean();
		ProductInfo record = new ProductInfo();
		ProductInfoExample productInfoExample = new ProductInfoExample();
		GuaranteeMoneyManagementExample gMME = new GuaranteeMoneyManagementExample();
		InterestManagementExample iME = new InterestManagementExample();
		com.ut.scf.pojo.auto.GuaranteeMoneyManagementExample.Criteria gMMCriteria = gMME.createCriteria();
		com.ut.scf.pojo.auto.InterestManagementExample.Criteria iMCriteria = iME.createCriteria();
		gMMCriteria.andProductIdEqualTo(productId);
		iMCriteria.andProductIdEqualTo(productId);
		record.setProductId(productId);
		int prdNum = productInfoMapper.countByExample(productInfoExample);
		int gMMENum = gMMM.countByExample(gMME);
		int iMENum = interestManagementMapper.countByExample(iME);
		int deleteNum = 0;
		if(prdNum >0 && gMMENum==0 && iMENum==0){
			deleteNum = productInfoMapper.deleteByPrimaryKey(productId);
		}
		log.debug("delete product num {}", deleteNum);
		if(gMMENum > 0|| iMENum>0){
			respBean.setResult(ErrorCodeEnum.GUARANTEE_MONEY_EXIST);
			return respBean;
		}else if (deleteNum <= 0) {
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}

	/**
	 * 修改   product
	 * 
	 * @param PrdUpdateReqBean
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateProduct(PrdUpdateReqBean reqBean) {
		BaseRespBean respBean = new BaseRespBean();
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		ProductInfo record = new ProductInfo();
		BeanUtil.mapToBean(paramMap, record);
		int updateNum = productInfoMapper.updateByPrimaryKeySelective(record);
		log.debug("update product num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
		return respBean;
	}

}

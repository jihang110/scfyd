package com.ut.scf.service.sys.impl;

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
import com.ut.scf.core.dict.ScfBizConsts;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.sys.ICommonWebDao;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.sys.ICommonWebService;
/**
 * 
 * @author changxin
 *
 */
@Service("CommonWebService")
public class CommonWebServiceImpl implements ICommonWebService{
	private static final Logger log = LoggerFactory
			.getLogger(CommonWebServiceImpl.class);
	@Resource
	private ICommonWebDao commonWebdao;
	
	
	
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getCommonWebList(Map<String, Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = commonWebdao.selectCommonWebList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
		}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addCommonWeb(Map<String, Object> paramMap) {
		BaseRespBean respBean = new BaseRespBean();

		// 生成主键Id
		paramMap.put("recUid", ScfUUID.generate());
		int insertNum = commonWebdao.insertCommonWeb(paramMap);
		log.debug("insert CommonWeb num {}", insertNum);
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}

		return respBean;
	}
	
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean updateCommonWeb(Map<String, Object> paramMap,String roleId) {
		BaseRespBean respBean = new BaseRespBean();
		
		
		if(ScfBizConsts.ROLE_ID_ROOT.equals(roleId)){
			respBean.setResult(ErrorCodeEnum.SYS_ROLE_NO_PERMISSION);
			return respBean;
		}

		int updateNum = commonWebdao.updateCommonWeb(paramMap);
		log.debug("update CommonWeb num {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}

		return respBean;
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean deleteCommonWeb(String recUid) {
		BaseRespBean respBean = new BaseRespBean();
		int resultnum = commonWebdao.deleteCommonWeb(recUid);
		log.debug("insert CommonWeb num {}", resultnum);
		if(resultnum<=0){
			respBean.setResult(ErrorCodeEnum.DELETE_FAILED);
			return respBean;
		}
		return respBean;
	}
	
}

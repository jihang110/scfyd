package com.ut.scf.service.project.impl;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.impl.util.json.JSONArray;
import org.activiti.engine.impl.util.json.JSONObject;
import org.activiti.engine.runtime.ProcessInstance;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.exception.BizException;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.auto.CorpInfoMapper;
import com.ut.scf.dao.auto.LimitInfoMapper;
import com.ut.scf.dao.project.IAgencyDao;
import com.ut.scf.pojo.auto.CorpInfo;
import com.ut.scf.pojo.auto.LimitInfo;
import com.ut.scf.reqbean.project.AgencyFlowReqBean;
import com.ut.scf.reqbean.project.AgencySearchPageReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.service.project.IAgencyService;
@Service("agencyService")
public class AgencyServiceImpl implements IAgencyService {
	
	@Resource
	private IAgencyDao agencyDao;
	
	@Resource
	private ProcessEngine processEngine;
	
	@Resource
	private RuntimeService runtimeService;
	
	@Resource
	private TaskService taskService;
	
	@Resource
	private RepositoryService repositoryService;
	
	@Resource
	private CorpInfoMapper corpInfoMapper;
	
	@Resource
	private LimitInfoMapper limitInfoMapper;
	
	/**
	 * 条件查询 分页获取user
	 * 
	 * @param paramMap
	 * @param page
	 */
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean agencyList(AgencySearchPageReqBean searchPage) {

		Map<String, Object> paramMap = BeanUtil.beanToMap(searchPage);

		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(searchPage.getPageNumber());
		page.setPageSize(searchPage.getPageSize());

		List<Map<String, Object>> resultList = agencyDao.agencyList(paramMap,
				page);

		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(resultList);
		return respBean;
	}
		
	@Override
	public boolean doAgree(JSONObject jsonObject) {
		
		// 1.获取taskId和当前用户
		String procInstId = (String) jsonObject.get("procInstId");
		String taskId = (String) jsonObject.get("taskId");
		String userId = (String) jsonObject.get("userId");
		String agree = (String) jsonObject.get("agree");
		boolean flag = agree.equals("0") ? true : false;
		
		// 2.拾取用户
		taskService.claim(taskId, userId);
		// 3.设置变量
		taskService.setVariableLocal(taskId, "agencyJson", jsonObject.toString());
		// 4.流程走向
		taskService.setVariable(taskId, "agree", flag);
		// 5.完成流程
		taskService.complete(taskId);
		// 6.查看流程状态
		ProcessInstance pi = runtimeService.createProcessInstanceQuery()
			.processInstanceId(procInstId).singleResult();
		if (pi == null) { //流程已结束
			return true;
		}
		
		return false;
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addAgency(AgencyFlowReqBean reqBean) {
		BaseRespBean respBean = new BaseRespBean();
		String agencyListInfo = reqBean.getAgencyListInfo();
		
		if (StringUtils.isNotEmpty(agencyListInfo)) {
			JSONArray jsonArray = new JSONArray(agencyListInfo);
			for (int i = 0; i < jsonArray.length(); i++) {
				JSONObject obj = jsonArray.getJSONObject(i);
				CorpInfo corpInfo = new CorpInfo();
				corpInfo.setCorpId(ScfUUID.generate());
				corpInfo.setCorpName(obj.getString("corpName"));
				corpInfo.setAgencyNum(obj.getString("agencyNum"));
				corpInfo.setSysType((short) 4);
				corpInfo.setMaxCreditAmount(new BigDecimal(obj.getString("maxCreditAmount")));
				corpInfo.setOfficeAddress(obj.getString("officeAddress"));
				corpInfo.setContactInfo(obj.getString("contactInfo"));
				corpInfo.setFixedPhone(obj.getString("fixedPhone"));
				corpInfo.setArea((byte) obj.getInt("area"));
				corpInfo.setRepresent((byte) obj.getInt("represent"));
				corpInfo.setFirstTwoYearsPickupNum(obj.getInt("firstTwoYearsPickupNum"));
				corpInfo.setFirstTwoYearsRetailNum(obj.getInt("firstTwoYearsRetailNum"));
				corpInfo.setFirstTwoYearsSaleRank((byte) obj.getInt("firstTwoYearsSaleRank"));
				corpInfo.setThisYearPlanPickupNum(obj.getInt("thisYearPlanPickupNum"));
				corpInfo.setThisYearPlanSales(new BigDecimal(obj.getString("thisYearPlanSales")));
				corpInfo.setNote(obj.getString("note"));
				corpInfo.setCreateTime(new Date());
				corpInfo.setStatus((byte) 1);
				int result = corpInfoMapper.insert(corpInfo);
				if (result < 1) {
					throw new BizException(ErrorCodeEnum.ADD_FAILED);
				}
				
				// 额度表
				LimitInfo limitInfo = new LimitInfo();
				limitInfo.setCorpId(corpInfo.getCorpId());
				limitInfo.setMaxCreditAmount(new BigDecimal(obj.getString("maxCreditAmount")));
				limitInfo.setUseAbleCreditAmt(new BigDecimal(obj.getString("maxCreditAmount")));
				int result1 = limitInfoMapper.insert(limitInfo);
				if (result1 < 1) {
					throw new BizException(ErrorCodeEnum.ADD_FAILED);
				}
			}
		}
		
		return respBean;
	}
}

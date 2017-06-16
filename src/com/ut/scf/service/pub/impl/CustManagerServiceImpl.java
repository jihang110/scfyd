package com.ut.scf.service.pub.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.impl.util.json.JSONObject;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.dict.ScfBizConsts;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.auto.CorpInfoMapper;
import com.ut.scf.dao.auto.LimitInfoMapper;
import com.ut.scf.dao.crm.IShareHolderInfoDao;
import com.ut.scf.dao.pub.ICustDao;
import com.ut.scf.dao.pub.IUploadFileRelaDao;
import com.ut.scf.pojo.auto.CorpInfo;
import com.ut.scf.pojo.auto.CorpInfoExample;
import com.ut.scf.pojo.auto.CorpInfoExample.Criteria;
import com.ut.scf.pojo.auto.LimitInfo;
import com.ut.scf.reqbean.pub.CorpInfoReqBean;
import com.ut.scf.reqbean.pub.CustProcessReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.respbean.StringRespBean;
import com.ut.scf.service.pub.ICustManagerService;
@Service("custManagerService ")
public class CustManagerServiceImpl implements ICustManagerService {
	private static final Logger log = LoggerFactory
			.getLogger(CustManagerServiceImpl.class);
	@Resource private ICustDao custDao;
	@Resource private CorpInfoMapper corpInfoMapper;
	@Resource private IShareHolderInfoDao shareHolderInfoDao;
	@Resource private IUploadFileRelaDao uploadFileRelaDao;
	@Resource ProcessEngine processEngine;
	@Resource RuntimeService runtimeService;
	@Resource TaskService taskService;
	@Resource RepositoryService repositoryService;
	@Resource LimitInfoMapper limitInfoMapper;

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getcorpList(Map<String,Object> paramMap, PageInfoBean page) {
		List<Map<String, Object>> list = custDao.getCorpInfoList(paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	@Transactional(propagation = Propagation.REQUIRED)
	@Override
	public BaseRespBean addCorp(CorpInfoReqBean corpInfo) {
		BaseRespBean respBean = new BaseRespBean();
		
		//企业名称不能重复
		CorpInfoExample corpInfoExample = new CorpInfoExample();
		Criteria criteria = corpInfoExample.createCriteria();
		criteria.andCorpNameEqualTo(corpInfo.getCorpName());
		int exampleNum = corpInfoMapper.countByExample(corpInfoExample);
		
		if(exampleNum > 0){
			respBean.setResult(ErrorCodeEnum.CORP_NAME_EXIST);
			return respBean;
		}
				
		//组织机构代码唯一性验证
		if(!StringUtils.isEmpty(corpInfo.getOrgnNum())) {
			corpInfoExample = new CorpInfoExample();
			criteria = corpInfoExample.createCriteria();
			criteria.andOrgnNumEqualTo(corpInfo.getOrgnNum());
			exampleNum = corpInfoMapper.countByExample(corpInfoExample);
			if(exampleNum>0){
				respBean.setResult(ErrorCodeEnum.ORGN_NUM_EXIST);
				return respBean;
			}
		}
		
//		1.添加到corp_info数据库
		String corpId = ScfUUID.generate();
				
		corpInfo.setCorpId(corpId);
		corpInfo.setStatus((byte) ScfBizConsts.STATUS_NORMAL);
		corpInfo.setCreateTime(new Date());
		CorpInfo corpInfoAuto = new CorpInfo();
		BeanUtil.BeanToBean(corpInfoAuto, corpInfo);
		int insertNum =  corpInfoMapper.insert(corpInfoAuto);
		log.debug("insertMenuNum : {}", insertNum);
		
		if (insertNum <= 0) {
			respBean.setResult(ErrorCodeEnum.ADD_FAILED);
			return respBean;
		}
		
//		插入到额度信息表
		LimitInfo limitInfo = new LimitInfo();
		limitInfo.setCorpId(corpId);
		limitInfo.setMaxCreditAmount(corpInfo.getMaxCreditAmount());
		limitInfo.setUseAbleCreditAmt(corpInfo.getMaxCreditAmount());
		limitInfoMapper.insert(limitInfo);
//		2.添加到share_holder_info数据库
//		循环插入
		
		@SuppressWarnings("unchecked")
		List<Map<String,Object>> shareInfoList = (List<Map<String, Object>>) corpInfo.getShareInfoList();
		if(shareInfoList.size()>0){
			for(Map<String,Object> map:shareInfoList){
				map.put("shareHolderId", ScfUUID.generate());
				map.put("corpId", corpId);
				map.put("relaCorpId", corpInfo.getRelaCorpId());
				shareHolderInfoDao.insertShareHolder(map);
			}
		}
		
//		3.添加到upload_file_rela表中
		@SuppressWarnings("unchecked")
		List<Map<String,Object>> attachInfoList = (List<Map<String, Object>>) corpInfo.getAttachInfoList();
		if(shareInfoList.size()>0){
			for(Map<String,Object> attachMap:attachInfoList){
				attachMap.put("fileId", ScfUUID.generate());
				attachMap.put("corpId", corpId);
//				attachMap.put("relaCorpId", corpInfo.getRelaCorpId());
				uploadFileRelaDao.insertFileRela(attachMap);
			}
		}
		return respBean;
	}

	@SuppressWarnings("unchecked")
	@Transactional(propagation = Propagation.REQUIRED)
	@Override
	public BaseRespBean updateCorp(CorpInfoReqBean corpInfo) {
		BaseRespBean respBean = new BaseRespBean();
//		1.修改corp_info的信息
		CorpInfo corpInfoAuto = new CorpInfo();
		BeanUtil.BeanToBean(corpInfoAuto, corpInfo);
		int updateNum =  corpInfoMapper.updateByPrimaryKeySelective(corpInfoAuto);
		log.debug("updateMenuNum : {}", updateNum);
		if (updateNum <= 0) {
			respBean.setResult(ErrorCodeEnum.UPDATE_FAILED);
			return respBean;
		}
//		修改额度信息表
		LimitInfo limitInfo = new LimitInfo();
		limitInfo.setCorpId(corpInfo.getCorpId());
		limitInfo.setMaxCreditAmount(corpInfo.getMaxCreditAmount());
		limitInfo.setUseAbleCreditAmt(corpInfo.getMaxCreditAmount());
		limitInfoMapper.updateByPrimaryKeySelective(limitInfo);
//		2.修改share_holder_info表
//		1)先删除
		Map<String,Object> paramMap = new HashMap<String,Object>();
		if(!corpInfo.getCorpId().equals(null)||!corpInfo.getCorpId().equals("")){
			paramMap.put("corpId", corpInfo.getCorpId());
			shareHolderInfoDao.deleteShareHolder(paramMap);
		}
//		2)后添加
		List<Map<String,Object>> shareInfoList = (List<Map<String, Object>>) corpInfo.getShareInfoList();
		if(shareInfoList.size()>0){
			for(Map<String,Object> map:shareInfoList){
				map.put("shareHolderId", ScfUUID.generate());
				map.put("corpId", corpInfo.getCorpId());
				map.put("relaCorpId", corpInfo.getRelaCorpId());
				shareHolderInfoDao.insertShareHolder(map);
			}
		}
//		3.修改upload_file_rela表
//		1)先删除
		if(!corpInfo.getCorpId().equals(null)||!corpInfo.getCorpId().equals("")){
			uploadFileRelaDao.deleteFileRela(corpInfo.getCorpId());
		}
//		2)后添加
		List<Map<String,Object>> attachInfoList = (List<Map<String, Object>>) corpInfo.getAttachInfoList();
		if(shareInfoList.size()>0){
			for(Map<String,Object> attachMap:attachInfoList){
				attachMap.put("fileId", ScfUUID.generate());
				attachMap.put("corpId", corpInfo.getCorpId());
//				attachMap.put("relaCorpId", corpInfo.getRelaCorpId());
				uploadFileRelaDao.insertFileRela(attachMap);
			}
		}
		return respBean;
	}
	
	@Transactional(propagation = Propagation.REQUIRED)
	@Override
	public BaseRespBean checkAgencyNum(CustProcessReqBean corpProcessInfo) {
		BaseRespBean respBean = new BaseRespBean();
		
		//企业名称不能重复
		CorpInfoExample corpInfoExample = new CorpInfoExample();
		Criteria criteria = corpInfoExample.createCriteria();
		criteria.andCorpNameEqualTo(corpProcessInfo.getCorpName());
		int exampleNum = corpInfoMapper.countByExample(corpInfoExample);
		
		if(exampleNum > 0){
			respBean.setResult(ErrorCodeEnum.CORP_NAME_EXIST);
			return respBean;
		}
			
		corpInfoExample = new CorpInfoExample();
		criteria = corpInfoExample.createCriteria();
		criteria.andAgencyNumEqualTo(corpProcessInfo.getAgencyNum());
		log.info("agencyNum:"+corpProcessInfo.getAgencyNum());
		exampleNum = corpInfoMapper.countByExample(corpInfoExample);
		log.info("exampleNum"+exampleNum);
		
		if(exampleNum > 0){
			respBean.setResult(ErrorCodeEnum.AGENCY_NUM_EXIST);
			return respBean;
		}
		
		JSONObject corpInfoStr = new JSONObject(corpProcessInfo);
		startProcess(corpInfoStr);
		
		return respBean;
	}

	/**
	 * 发起流程
	 */
	public void startProcess(JSONObject jsonObject) {		
		String userName = (String) jsonObject.get("userId");
		String key = (String) jsonObject.get("activitiKey");
//		加上当前用户
		ProcessInstance pi = processEngine.getRuntimeService()//管理流程实例和执行对象，也就是表示正在执行的操作  
		            .startProcessInstanceByKey(key);
//		TaskService taskService = processEngine.getTaskService();//获取任务的Service，设置和获取流程变量  
		Task task = taskService.createTaskQuery().processInstanceId(pi.getId()).singleResult();
//		获取所有的候选人
//		List<IdentityLink> identityLinksForTask = taskService.getIdentityLinksForTask(task.getId());
//		判断候选人

//		拾取用户
		taskService.claim(task.getId(), userName);
//		设置变量
		taskService.setVariableLocal(task.getId(), "agencyJson", jsonObject.toString());
//		完成节点
		taskService.complete(task.getId());
		
		System.out.println("完成任务"+task.getId());
	}
	

	@Override
	public BaseRespBean doAgree(JSONObject jsonObject) {
		// TODO Auto-generated method stub
		boolean flag;
		StringRespBean respBean = new StringRespBean(); 
//		1.获取taskId和当前用户
		String taskId = (String) jsonObject.get("taskId");
		String agree = (String) jsonObject.get("agree");
		String userId = (String) jsonObject.get("userId");
		
//		2.拾取用户
		taskService.claim(taskId, userId);
//		3.设置变量
		taskService.setVariableLocal(taskId, "agencyJson", jsonObject.toString());
//		4.流程走向
		if(agree.equals("0")){
			flag = 	true;
		}else{
			flag = 	false;
		}
		taskService.setVariable(taskId, "agree", flag);
//		5.完成流程
		taskService.complete(taskId);
		respBean.setStr(jsonObject.toString());
		return respBean;
	}

	@Override
	public BaseRespBean reApply(JSONObject jsonObject) {
		// TODO Auto-generated method stub
		BaseRespBean respBean = new BaseRespBean(); 
//		1.获取taskId和userId
		String taskId = (String) jsonObject.get("taskId");
		String userId = (String) jsonObject.get("userId");
//		2.拾取用户
		taskService.claim(taskId, userId);
//		3.设置流程变量
		taskService.setVariableLocal(taskId, "agencyJson", jsonObject.toString());
//		4.完成流程
		taskService.complete(taskId);
		return respBean;
	}

}

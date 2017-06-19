package com.ut.scf.service.project.impl;

import java.io.File;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.impl.util.json.JSONObject;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.apache.commons.collections.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ut.scf.core.dict.ErrorCodeEnum;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.exception.BizException;
import com.ut.scf.core.util.MoneyUtil;
import com.ut.scf.core.util.PDFUtil;
import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.auto.DykRateMapper;
import com.ut.scf.dao.auto.FinanceInfoMapper;
import com.ut.scf.dao.auto.GuaranteeInfoMapper;
import com.ut.scf.dao.auto.GuaranteeMoneyManagementMapper;
import com.ut.scf.dao.auto.InterestManagementMapper;
import com.ut.scf.dao.auto.WarningInfoMapper;
import com.ut.scf.dao.project.IFinanceInfoDao;
import com.ut.scf.pojo.auto.DykRate;
import com.ut.scf.pojo.auto.DykRateExample;
import com.ut.scf.pojo.auto.FinanceInfo;
import com.ut.scf.pojo.auto.GuaranteeInfo;
import com.ut.scf.pojo.auto.GuaranteeMoneyManagement;
import com.ut.scf.pojo.auto.InterestManagement;
import com.ut.scf.pojo.auto.InterestManagementExample;
import com.ut.scf.pojo.auto.InterestManagementExample.Criteria;
import com.ut.scf.pojo.auto.WarningInfo;
import com.ut.scf.reqbean.project.FinDataReqBean;
import com.ut.scf.reqbean.project.FinanceFlowReqBean;
import com.ut.scf.reqbean.project.FinanceInfoListReqBean;
import com.ut.scf.reqbean.pub.TaskInfoReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.respbean.PageRespBean;
import com.ut.scf.respbean.StringRespBean;
import com.ut.scf.respbean.project.FinanceInfoRespBean;
import com.ut.scf.service.project.IFinanceInfoService;
import com.ut.scf.service.sys.ISequenceService;

@Service("financeInfoService")
public class FinanceInfoServiceImpl implements IFinanceInfoService {

	private static final Logger log = LoggerFactory.getLogger(FinanceInfoServiceImpl.class);

	@Resource
	private IFinanceInfoDao financeInfoDao;
	
	@Resource
	private GuaranteeMoneyManagementMapper guaranteeMapper;
	
	@Resource
	private WarningInfoMapper warningInfoMapper;
	
	@Resource
	private InterestManagementMapper interestMapper;
	
	@Resource
	private DykRateMapper dykRateMapper;
	
	@Resource
	private ProcessEngine processEngine;
	
	@Resource
	private TaskService taskService;
	
	@Resource
	private RuntimeService runtimeService;
	
	@Resource
	private FinanceInfoMapper financeInfoMapper;
	
	@Resource
	private GuaranteeInfoMapper guaranteeInfoMapper;
	
	@Resource
	private ISequenceService sequenceService;
	
	private static SimpleDateFormat SDF = new SimpleDateFormat("yyyy-MM-dd");

	/**
	 * 条件查询 分页获取financeInfo
	 * 
	 * @param paramMap
	 * @param page
	 */
	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getFinanceInfoList(Map<String, Object> paramMap,
			PageInfoBean page) {
		List<Map<String, Object>> list = financeInfoDao.getFinanceInfoList(
				paramMap, page);
		PageRespBean respBean = new PageRespBean();
		respBean.setPages(page.getTotalPage());
		respBean.setRecords(page.getTotalRecord());
		respBean.setDataList(list);
		return respBean;
	}

	@Override
	public BaseRespBean getProGuarantee(FinanceInfoListReqBean reqBean) {
		FinanceInfoRespBean respBean = new FinanceInfoRespBean();
		// 保证金比例取得
		GuaranteeMoneyManagement guaranteeMoneyManagement = guaranteeMapper.selectByPrimaryKey(reqBean.getProductId());
		if (guaranteeMoneyManagement != null) {
			respBean.setGuaranteeRate(guaranteeMoneyManagement.getGuaranteeMoneyRate());
		}
		
		// 费率,收息日取得
		InterestManagementExample interestExample = new InterestManagementExample();
		Criteria criteria = interestExample.createCriteria();
		criteria.andProductIdEqualTo(reqBean.getProductId());
		List<InterestManagement> list = interestMapper.selectByExample(interestExample);
		if (CollectionUtils.isNotEmpty(list)) {
			respBean.setCostRate(list.get(0).getCostRate());
			respBean.setReceptionDate(list.get(0).getReceptionDate());
		}
		
		// 利息列表取得
		DykRateExample dykRateExample = new DykRateExample();
		com.ut.scf.pojo.auto.DykRateExample.Criteria criteria1 = dykRateExample.createCriteria();
		criteria1.andProductIdEqualTo(reqBean.getProductId());
		List<DykRate> list1 = dykRateMapper.selectByExample(dykRateExample);
		if (CollectionUtils.isNotEmpty(list1)) {
			respBean.setDataList(list1);
		}
		
		return respBean;
	}

	@Override
	public BaseRespBean getFinanceInfo(TaskInfoReqBean reqBean) {
		// 根据taskId获取流程数据
		String values = (String) taskService.getVariable(reqBean.getTaskId(),
				reqBean.getVarName());
		StringRespBean respBean = new StringRespBean();
		respBean.setStr(values);
		return respBean;
	}

	@Override
	public void applyGuarantee(FinanceFlowReqBean flowReqBean) {
		// 获取taskId和userId
		String taskId = flowReqBean.getTaskId();
		String userName = flowReqBean.getUserId();
		String values = (String) taskService.getVariable(taskId, "payApplyJson");
		JSONObject jsonObject = new JSONObject(values);
		jsonObject.put("guaranteePayDate", flowReqBean.getGuaranteePayDate());
		jsonObject.put("payAbleGuarantee", flowReqBean.getPayAbleGuarantee());
		jsonObject.put("payActGuarantee", flowReqBean.getPayActGuarantee());
		jsonObject.put("guaranteePayHis", flowReqBean.getGuaranteePayHis());
		jsonObject.put("note", flowReqBean.getNote());
		jsonObject.put("agree", "");

		// 拾取用户
		taskService.claim(taskId, userName);
		// 设置变量
		taskService.setVariable(taskId, "payApplyJson", jsonObject.toString());
		taskService.setVariableLocal(taskId, "agencyJson",
				jsonObject.toString());
		// 完成节点
		taskService.complete(taskId);
	}

	@Override
	public boolean doAgree(FinanceFlowReqBean reqBean) {
		
		// 1.获取taskId和当前用户
		String procInstId = reqBean.getProcInstId();
		String taskId = reqBean.getTaskId();
		String userId = reqBean.getUserId();
		String agree = reqBean.getAgree();
		String backTarget = reqBean.getBackTarget();
		String advice = reqBean.getAdvice();
		
		String values = (String) taskService
				.getVariable(taskId, "payApplyJson");
		JSONObject jsonObject = new JSONObject(values);
		jsonObject.put("agree", agree);
		jsonObject.put("backTarget", backTarget);
		jsonObject.put("advice", advice);
		jsonObject.put("guaranteeAccountAmt", reqBean.getGuaranteeAccountAmt());
		
		// 2.拾取用户
		taskService.claim(taskId, userId);
		// 3.设置变量
		taskService.setVariable(taskId, "payApplyJson", jsonObject.toString());
		taskService.setVariableLocal(taskId, "agencyJson",
				jsonObject.toString());
		// 4.流程走向
		if ("1".equals(agree)) {
			if ("0".equals(backTarget)) {
				agree = "2";
			} else if ("1".equals(backTarget)) {
				agree = "1";
			}
		}
		taskService.setVariable(taskId, "agree", agree);
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
	public void reApply(FinanceFlowReqBean reqBean) {
		// 1.获取taskId和userId
		String taskId = reqBean.getTaskId();
		String userId = reqBean.getUserId();
		JSONObject jsonObject = new JSONObject(reqBean);
		String values = (String) taskService.getVariable(taskId, "payApplyJson");
		JSONObject oldObj = new JSONObject(values);
		jsonObject.put("guaranteePayHis", oldObj.getString("guaranteePayHis"));
		
		// 2.拾取用户
		taskService.claim(taskId, userId);
		// 3.设置流程变量
		taskService.setVariable(taskId, "payApplyJson", jsonObject.toString());
		taskService.setVariableLocal(taskId, "agencyJson",
				jsonObject.toString());
		// 4.完成流程
		taskService.complete(taskId);
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public BaseRespBean addFinance(FinanceFlowReqBean reqBean, HttpSession httpSession) {
		BaseRespBean respBean = new BaseRespBean();
		// 新增融资情报
		FinanceInfo financeInfo = new FinanceInfo();
		String financeId = sequenceService.getNextSequence(reqBean.getCorpId(), "rz");
		try {
			financeInfo.setFinanceId(financeId);
			financeInfo.setApplyDate(SDF.parse(reqBean.getApplyDate()));
			financeInfo.setCorpId(reqBean.getCorpId());
			financeInfo.setFinanceRate(new BigDecimal(reqBean.getFinanceRate()));
			financeInfo.setCashRate(new BigDecimal(reqBean.getCashRate()));
			financeInfo.setFinanceStartDate(SDF.parse(reqBean.getFinanceStartDate()));
			financeInfo.setFinanceEndDate(SDF.parse(reqBean.getFinanceEndDate()));
			financeInfo.setFinanceAmount(new BigDecimal(reqBean.getFinanceAmount()));
			financeInfo.setExpense(new BigDecimal(reqBean.getExpense()));
			financeInfo.setFinanceStatus("1");
			financeInfo.setNote(reqBean.getRemark());
		} catch (Exception e) {
			log.error(e.getMessage());
		}
		int recFinance = financeInfoMapper.insert(financeInfo);
		if (recFinance < 1) {
			throw new BizException(ErrorCodeEnum.ADD_FAILED);
		}
		
		// 新增保证金情报
		GuaranteeInfo guaranteeInfo = new GuaranteeInfo();
		try {
			guaranteeInfo.setFinanceId(financeId);
			guaranteeInfo.setGuaranteeMoneyRate(new BigDecimal(reqBean.getGuaranteeRate()));
			guaranteeInfo.setPayAbleGuarantee(new BigDecimal(reqBean.getPayAbleGuarantee()));
			guaranteeInfo.setGuaranteePayDate(SDF.parse(reqBean.getGuaranteePayDate()));
			guaranteeInfo.setPayActGuarantee(new BigDecimal(reqBean.getGuaranteeAccountAmt()));
			guaranteeInfo.setGuaranteeBalance(new BigDecimal(reqBean.getGuaranteeAccountAmt()));
			guaranteeInfo.setGuaranteePayHis(reqBean.getGuaranteePayHis());
		} catch (Exception e) {
			log.error(e.getMessage());
		}
		int recGuarantee = guaranteeInfoMapper.insert(guaranteeInfo);
		if (recGuarantee < 1) {
			throw new BizException(ErrorCodeEnum.ADD_FAILED);
		}
		
		// 融资承诺函
		String templetPath = "/importTemp/应收账款融资承诺函模板.pdf";
		templetPath = httpSession.getServletContext().getRealPath(templetPath);
		
		String uploadFilePath = "uploadFile/common/";// 文件服务器存储目录
		String toPath = httpSession.getServletContext().getRealPath(uploadFilePath);
		String pdfName = ScfUUID.generate() + ".pdf";
		File dir = new File(toPath);
		if (!dir.exists()) {
			dir.mkdirs();
		}
		toPath = toPath + "/" + pdfName;
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("financeNo", financeId);// 融资编号
		paramMap.put("agencyName", reqBean.getAgencyName());// 经销商名称
		BigDecimal financeAmt = new BigDecimal(reqBean.getFinanceAmount());// 融资金额
		financeAmt = financeAmt.divide(new BigDecimal(10000), 0, RoundingMode.HALF_UP);// 转成万元
		String financeAmtStr = MoneyUtil.toChinese(financeAmt.toString());// 金额小写转大写
		paramMap.put("money", financeAmtStr.substring(0, financeAmtStr.length() - 1));
		
		try {
			PDFUtil.exportToPDF(templetPath, toPath, paramMap);
			WarningInfo warningInfo = new WarningInfo();
			warningInfo.setRecUid(ScfUUID.generate());
			// 通知类型,1.收息预警,2.融资逾期预警,3.订单逾期预警,4.融资承诺函,5.付款承诺函'
			warningInfo.setWarnType((byte) 4);
			warningInfo.setSendTime(new Date());
			warningInfo.setWarnStatus((byte) 0);// 未阅
			warningInfo.setWarnMsg("融资承诺函已发送，请查收！");
			warningInfo.setFilePath(httpSession.getServletContext().getContextPath()
					+ "/" + uploadFilePath + pdfName);
			warningInfoMapper.insert(warningInfo);
		} catch (Exception e) {
			log.error(e.getMessage());
			e.printStackTrace();
		}
		
		return respBean;
	}

	@Override
	public void startProcess(JSONObject jsonObject) {
		String userName = (String) jsonObject.get("userId");
		String key = (String) jsonObject.get("activitiKey");

		ProcessInstance pi = processEngine.getRuntimeService()// 管理流程实例和执行对象，也就是表示正在执行的操作
				.startProcessInstanceByKey(key);
		Task task = taskService.createTaskQuery().processInstanceId(pi.getId())
				.singleResult();

		// 拾取用户
		taskService.claim(task.getId(), userName);
		// 设置变量
		taskService.setVariable(task.getId(), "payApplyJson",
				jsonObject.toString());
		taskService.setVariableLocal(task.getId(), "agencyJson",
				jsonObject.toString());
		// 完成节点
		taskService.complete(task.getId());
	}
	

	@Override
	@Transactional(readOnly = true)
	public BaseRespBean getFinanceList(Map<String, Object> paramMap) {
		List<Map<String, Object>> list = financeInfoDao.getFinanceList(
				paramMap);
		FinDataReqBean respBean = new FinDataReqBean();
		respBean.setDataList(list);
		return respBean;
	}
}


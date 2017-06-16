package com.ut.scf.web.scheduled;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.activiti.engine.impl.util.json.JSONArray;
import org.activiti.engine.impl.util.json.JSONObject;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import com.ut.scf.core.util.ScfUUID;
import com.ut.scf.dao.auto.DykRateMapper;
import com.ut.scf.dao.auto.FinanceInfoMapper;
import com.ut.scf.dao.auto.OrderBatchInfoMapper;
import com.ut.scf.dao.auto.OrderInfoMapper;
import com.ut.scf.dao.auto.RepaymentPlanInfoMapper;
import com.ut.scf.dao.auto.RevenueManagementMapper;
import com.ut.scf.dao.auto.StuFileInfoMapper;
import com.ut.scf.dao.auto.StuInfoMapper;
import com.ut.scf.dao.auto.WarningInfoMapper;
import com.ut.scf.pojo.auto.BatchHndlInfo;
import com.ut.scf.pojo.auto.DykRate;
import com.ut.scf.pojo.auto.DykRateExample;
import com.ut.scf.pojo.auto.FinanceInfo;
import com.ut.scf.pojo.auto.FinanceInfoExample;
import com.ut.scf.pojo.auto.FinanceInfoExample.Criteria;
import com.ut.scf.pojo.auto.OrderBatchInfo;
import com.ut.scf.pojo.auto.OrderInfo;
import com.ut.scf.pojo.auto.RepaymentPlanInfo;
import com.ut.scf.pojo.auto.RepaymentPlanInfoExample;
import com.ut.scf.pojo.auto.RevenueManagement;
import com.ut.scf.pojo.auto.StuFileInfo;
import com.ut.scf.pojo.auto.StuInfo;
import com.ut.scf.pojo.auto.WarningInfo;
import com.ut.scf.reqbean.project.OrderManagerReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.project.IActivitiService;
import com.ut.scf.service.sys.IBatchService;

@Component
@Lazy(value = false)
public class InterfaceSyncJob {

	private static final Logger log = LoggerFactory
			.getLogger(InterfaceSyncJob.class);

	private static String DATE_FORMAT = "yyyy-MM-dd";
	private static String SUCCESS = "批处理执行成功";
	private static String FAIL = "批处理执行失败";

	private int age;// 年龄
	private String birthday;// 出生日期
	private String gender;// 性别

	private static SimpleDateFormat dateFormat = new SimpleDateFormat(
			DATE_FORMAT);

	@Resource
	private OrderBatchInfoMapper orderBatchInfoMapper;

	@Resource
	private OrderInfoMapper orderInfoMapper;

	@Resource
	private StuInfoMapper stuInfoMapper;

	@Resource
	private StuFileInfoMapper stuFileInfoMapper;

	@Resource
	private RepaymentPlanInfoMapper repaymentPlanInfoMapper;

	@Resource
	private IBatchService iBatchService;

	@Resource
	private IActivitiService activitiService;

	@Resource
	private FinanceInfoMapper financeInfoMapper;

	@Resource
	private DykRateMapper dykRateMapper;

	@Resource
	private RevenueManagementMapper revenueManagementMapper;

	@Resource
	private WarningInfoMapper warningInfoMapper;

	// @Scheduled(cron="*/5 * * * * ?")
	/*
	 * 订单信息同步
	 * 
	 * batchId 批处理id
	 */
	private BaseRespBean startProcess(String batchId) throws Exception {
		// 发起流程
		BaseRespBean respBean = new BaseRespBean();
		OrderManagerReqBean reqBean = new OrderManagerReqBean();
		// 获取当前用户

		// reqBean.setOrderId("order_1,order_2");
		reqBean.setOrderBatchId(batchId);
		reqBean.setUserId("sys");
		reqBean.setActivitiKey("orderManagerProcess");
		JSONObject contactInfo = new JSONObject(reqBean);
		log.debug("contactInfo: {}", contactInfo);
		activitiService.startProcess(contactInfo);
		return respBean;
	}

	// 自动 定时任务
	public void orderInfoSyncTask() {
		orderInfoSync("0");
	}

	// 批量处理 手动
	public void orderInfoSyncBatch() {
		orderInfoSync("1");
	}

	private void orderInfoSync(String type) {
		int dataNum = 0;
		try {
			String url = "http://api.fenqichaoren.com/p2p/order.php";
			Map<String, String> paramMap = new HashMap<String, String>();
			paramMap.put("keyCode", "");
			paramMap.put("StatPayTime", "");
			paramMap.put("EndPayTime", "");
			paramMap.put("StatTime", "");
			paramMap.put("EndTime", "");

			String result = httpURLConnectionPOST(paramMap, url);

			// 每日定时同步新增订单以及大学生信息存入平台
			dataNum = insertOrderInfo(result);
			insertBatchHndlInfo(dataNum, "1", type);// 成功
		} catch (Exception e) {
			log.error(e.getMessage());
			insertBatchHndlInfo(dataNum, "0", type);// 失败
		}

		// 记录批处理

	}

	// 记录批处理
	private void insertBatchHndlInfo(int dataNum, String result, String type) {
		BatchHndlInfo batchHndlInfo = new BatchHndlInfo();
		batchHndlInfo.setBatchName("同步订单信息接口");
		// batchHndlInfo.setBatchNo("");// 批次
		batchHndlInfo.setBatchId(ScfUUID.generate());
		batchHndlInfo.setClassName(this.getClass().toString());// 类名称
		batchHndlInfo.setDataNum(dataNum);// 数据量
		batchHndlInfo.setBatchType(type);
		batchHndlInfo.setResult(result);
		batchHndlInfo.setMethodName("orderInfoSyncBatch");// 当前方法名
		iBatchService.insertBathInfo(batchHndlInfo);
	}

	// 还款信息同步
	public void repaymentInfoSync(String batchId) {
		String url = "http://api.fenqichaoren.com/p2p/finance/temp_finance_repay.php";
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("keyCode", "");
		paramMap.put("rePayDateS", "");
		paramMap.put("rePayDateE", "");
		paramMap.put("page", "");

		String result = httpURLConnectionPOST(paramMap, url);
		updateRepayPlan(result);
		System.out.println("批处理test：" + result + "批处理id：" + batchId);// TODO
	}

	private void updateRepayPlan(String result) {
		JSONObject jsonObject = new JSONObject(result);
		JSONArray jsonArray = jsonObject.getJSONArray("data");
		int count = jsonArray.length();
		if (count == 0) {
			// error
		} else {
			for (int i = 0; i < count; i++) {
				JSONObject obj = jsonArray.getJSONObject(i);
				String orderId = obj.getString("orderID");
				String period = obj.getString("loan_tenor");
				String status = obj.getString("State");
				if ("0".equals(status) || "2".equals(status)) {
					insertWaring("订单：" + orderId + "的第" + period + "期还款已逾期");
				}

				RepaymentPlanInfoExample example = new RepaymentPlanInfoExample();
				com.ut.scf.pojo.auto.RepaymentPlanInfoExample.Criteria criteria = example
						.createCriteria();
				criteria.andOrderIdEqualTo(orderId);
				criteria.andPeriodEqualTo(new Byte(period));
				RepaymentPlanInfo repaymentPlanInfo = new RepaymentPlanInfo();
				repaymentPlanInfo.setStudentRepayStatus(status);
				repaymentPlanInfoMapper.updateByExampleSelective(
						repaymentPlanInfo, example)

				;

			}
		}
	}

	private void insertWaring(String msg) {
		WarningInfo warn = new WarningInfo();

		warn.setRecUid(ScfUUID.generate());
		warn.setWarnType((byte) 1);
		warn.setSendTime(new Date());
		warn.setWarnStatus("0");
		warn.setWarnMsg(msg);
		// warn.setWarnMsg("融资编号为" + financeId + "的融资即将到期");
		warningInfoMapper.insertSelective(warn);
	}

	private int insertOrderInfo(String orderInfoStr) throws Exception {
		JSONObject jsonObject = new JSONObject(orderInfoStr);
		JSONArray jsonArray = jsonObject.getJSONArray("data");
		int count = jsonArray.length();
		if (count == 0) {
			// error
			return 0;
		} else {
			Map<String, List<OrderInfo>> orderBatchinfoMap = new LinkedHashMap<>();
			for (int i = 0; i < count; i++) {
				JSONObject obj = jsonArray.getJSONObject(i);
				IdcardInfoExtractor(obj.getString("IDcard"));// 解析身份证号码

				// 大学生信息表
				String stuId = ScfUUID.generate();// 学生信息id
				insertStuInfo(obj, stuId);
				// 大学生附件表
				// 身份证正面
				inserStuFileInfo(stuId, obj.getString("idcard_face"));
				// 身份证反面
				inserStuFileInfo(stuId, obj.getString("idcard_back"));
				// 身份证手持
				inserStuFileInfo(stuId, obj.getString("idcard_zm"));
				// 额外图片
				JSONArray picExtendArray = obj.getJSONArray("pic_extend");
				if (picExtendArray.length() > 0) {
					for (int j = 0; j < picExtendArray.length(); j++) {
						inserStuFileInfo(stuId, picExtendArray.getString(j));
					}
				}
				// 获得订单信息
				OrderInfo orderInfo = getOrderInfo(obj, stuId);

				// 添加订单到批次集合
				String batchId = orderInfo.getOrderBatchId();
				if (orderBatchinfoMap.containsKey(batchId)) {
					orderBatchinfoMap.get(batchId).add(orderInfo);
				} else {
					List<OrderInfo> orderInfos = new ArrayList<>();
					orderInfos.add(orderInfo);
					orderBatchinfoMap.put(batchId, orderInfos);
				}
			}
			// 插入订单 批次 信息
			return insertOrderInfo(orderBatchinfoMap);
		}
	}

	// 插入订单 批次 信息
	private int insertOrderInfo(Map<String, List<OrderInfo>> orderBatchinfoMap)
			throws Exception {
		int result = 0;
		for (Map.Entry<String, List<OrderInfo>> entry : orderBatchinfoMap
				.entrySet()) {
			OrderBatchInfo batchInfo = new OrderBatchInfo();
			List<OrderInfo> values = entry.getValue();
			BigDecimal orderTotalAmt = new BigDecimal(0); // 订单总金额
			int recOrderNum = 0; // 接收订单数量
			BigDecimal recOrderAmt = new BigDecimal(0); // 接收订单金额
			int rejOrderNum = 0; // 拒绝订单数量
			BigDecimal rejOrderAmt = new BigDecimal(0); // 拒绝订单金额
			BigDecimal crReqTotalAmt = new BigDecimal(0); // 超人所需费用总额

			batchInfo.setOrderBatchId(entry.getKey()); // 订单批次号
			batchInfo.setOrderTotalNum(values.size()); // 订单总数

			for (OrderInfo order : values) {
				orderTotalAmt = orderTotalAmt.add(order.getProductAmt());
				crReqTotalAmt = crReqTotalAmt.add(order.getCrReqAmt());

				if (order.getOrderStatus() == 1) { // 接受
					recOrderNum++;
					recOrderAmt = recOrderAmt.add(order.getProductAmt());
				} else { // 拒绝
					rejOrderNum++;
					rejOrderAmt = rejOrderAmt.add(order.getProductAmt());
				}

				result += orderInfoMapper.insert(order);
			}

			batchInfo.setOrderTotalAmt(orderTotalAmt);
			batchInfo.setRecOrderNum(recOrderNum);
			batchInfo.setRecOrderAmt(recOrderAmt);
			batchInfo.setRejOrderNum(rejOrderNum);
			batchInfo.setRejOrderAmt(rejOrderAmt);
			batchInfo.setCrReqTotalAmt(crReqTotalAmt);
			batchInfo.setSyncDate(new Date());
			orderBatchInfoMapper.insert(batchInfo);
			// 发起订单同步流程 一个批次一个
			startProcess(entry.getKey());
		}
		return result;
	}

	// 获得订单信息
	private OrderInfo getOrderInfo(JSONObject obj, String stuId)
			throws Exception {
		// 订单信息
		OrderInfo orderInfo = new OrderInfo();
		// 预筛选条件：少数名族+成人订单+大三以上的学生的订单除外
		String nation = obj.getString("idcard_nation");// 名族
		String grade = obj.getString("t_univs_grade");// 年级
		if ("汉".equals(nation) || Integer.parseInt(grade) >= 3) {
			orderInfo.setOrderStatus((byte) 0);// 拒绝
		} else {
			orderInfo.setOrderStatus((byte) 1);// 同意
		}
		orderInfo.setOrderBatchId(obj.getString("p2p_bidding_id")); // 资金方系统中每批次转给资金方的id，（每批次含多个订单）
		orderInfo.setOrderId(obj.getString("orderID")); // 订单ID号唯一
		orderInfo.setStuId(stuId);// 学生ID（关联学生信息表）
		orderInfo.setProductId(obj.getString("goods_id")); // 产品ID
		orderInfo.setProductName(obj.getString("goodsName")); // 产品名称
		orderInfo.setProductAmt(new BigDecimal(obj.getString("Loan"))); // 产品金额
		orderInfo.setPeriod(Byte.parseByte(obj.getString("Period"))); // 分期期数期数
		orderInfo.setLoan(new BigDecimal(obj.getString("Loan"))); // 分期总金额
		orderInfo.setCrReqAmt(new BigDecimal(obj.getString("fqcrM"))); // 超人所需费用
		orderInfo.setStartPayAmt(BigDecimal.ZERO); // 首期还款金额
		orderInfo.setPayM(new BigDecimal(obj.getString("PayM"))); // 每期还款金额
		orderInfo
				.setStartPayDay(dateFormat.parse(obj.getString("StartPayDay"))); // 首期还款日期
		orderInfo.setSellerId(obj.getString("sellerID")); // 商家ID
		orderInfo.setSellerName(obj.getString("sellerNmae")); // 商家名称
		return orderInfo;
	}

	// 大学生信息
	private void insertStuInfo(JSONObject obj, String stuId) {
		// 大学生信息表
		StuInfo stuInfo = new StuInfo();

		stuInfo.setStuId(stuId);
		stuInfo.setStuName(obj.getString("Name"));
		stuInfo.setGender(this.gender);
		stuInfo.setAge((byte) this.age);
		stuInfo.setBirthDate(this.birthday);
		stuInfo.setIdCard(obj.getString("IDcard"));
		stuInfo.setNation(obj.getString("idcard_nation"));
		stuInfo.setMobilePhone(obj.getString("mobile"));
		stuInfo.setSchoolName(obj.getString("univs"));
		stuInfo.setGrade(obj.getString("t_univs_grade"));
		stuInfo.setDorm(obj.getString("univsRoom"));
		stuInfo.setGraduateDate(obj.getString("finishTime"));
		stuInfoMapper.insert(stuInfo);
	}

	// 大学生附件
	private void inserStuFileInfo(String stuId, String file) {
		if (StringUtils.isNotEmpty(file)) {
			StuFileInfo stuFileInfo = new StuFileInfo();
			stuFileInfo.setRecUid(ScfUUID.generate());
			stuFileInfo.setStuId(stuId);
			stuFileInfo.setStuFile(file);
			stuFileInfoMapper.insert(stuFileInfo);
		}

	}

	// 根据订单生成还款计划
	public void generateRepayPlan(OrderInfo orderInfo) {
		int period = orderInfo.getPeriod();// 分期期数
		BigDecimal crReqAmt = orderInfo.getCrReqAmt();// 申请金额
		BigDecimal money = paymentCalc(12, period, new BigDecimal(0.12),
				crReqAmt);// 每月应付
		BigDecimal principal = crReqAmt.divide(new BigDecimal(period), 2);// 每月应还本金
		BigDecimal interest = money.subtract(principal);// 每月应还利息

		RepaymentPlanInfo planInfo = new RepaymentPlanInfo();
		planInfo.setOrderBatchId(orderInfo.getOrderBatchId());
		planInfo.setOrderId(orderInfo.getOrderId());
		planInfo.setSuperRepayStatus("0");
		for (int i = 0; i < period; i++) {
			Date date = addMonth(orderInfo.getStartPayDay(), i);
			planInfo.setPeriod(new Byte(i + 1 + ""));
			planInfo.setCurrentRepayDate(date);

			if (i == period - 1) {
				// 最后一期 解决 本金四舍五入
				principal = crReqAmt.subtract(principal
						.multiply(new BigDecimal(i - 1)));
				interest = money.subtract(principal);
			}
			planInfo.setCurrentPayableInterest(interest);
			planInfo.setCurrentPayablePrincipal(principal);
			repaymentPlanInfoMapper.insert(planInfo);
		}

	}

	// 传入具体日期和n ，返回具体日期减n个月
	public Date addMonth(Date date, int n) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.MONTH, n);
		return calendar.getTime();
	}

	// 从身份证号码中解析 性别 出生年月 年龄
	public void IdcardInfoExtractor(String idcard) {
		try {
			// 获取性别
			String id17 = idcard.substring(16, 17);
			if (Integer.parseInt(id17) % 2 != 0) {
				this.gender = "男";
			} else {
				this.gender = "女";
			}
			// 获取出生日期
			String birthday = idcard.substring(6, 14);
			Date birthdate = dateFormat.parse(birthday);
			this.birthday = dateFormat.format(birthdate);
			GregorianCalendar currentDay = new GregorianCalendar();
			currentDay.setTime(birthdate);

			// 获取年龄
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy");
			String year = simpleDateFormat.format(new Date());
			this.age = Integer.parseInt(year) - currentDay.get(Calendar.YEAR);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 计算 还款计划
	// 第一个m固定值12|n分期期数|r利率0.12|p金额 计算商家还款计划表的公式
	public BigDecimal paymentCalc(int m, int n, BigDecimal r,
			BigDecimal principal) {
		BigDecimal top = r.divide(new BigDecimal(m));
		top = new BigDecimal(1).add(top);
		top = new BigDecimal(1).divide(top);
		BigDecimal resultTop = new BigDecimal(1).subtract(top);
		resultTop = resultTop.multiply(resultTop);
		BigDecimal resultBtm = top.pow(n);
		resultBtm = new BigDecimal(1).subtract(resultBtm);
		resultBtm = top.multiply(resultBtm);
		BigDecimal result = resultTop.divide(resultBtm, 2);
		return result;
	}

	// @Scheduled(cron="*/5 * * * * ?")
	/*
	 * 计息处理
	 * 
	 * batchId 批处理id
	 */
	public void calInterest() {
		FinanceInfoExample example = new FinanceInfoExample();
		Criteria criteria = example.createCriteria();
		criteria.andFinanceStatusEqualTo("2"); // 融资状态:已放款
		List<FinanceInfo> list = financeInfoMapper.selectByExample(example);
		if (!CollectionUtils.isEmpty(list)) {
			BigDecimal dykRate = null;
			BigDecimal dykRate1 = null;
			BigDecimal dykRate2 = null;
			BigDecimal dykRate3 = null;
			int diffDays = 0;

			// dyk利率取得
			DykRateExample dykRateExample = new DykRateExample();
			com.ut.scf.pojo.auto.DykRateExample.Criteria criteria2 = dykRateExample
					.createCriteria();
			criteria2.andProductIdEqualTo("product01");
			List<DykRate> dykRates = dykRateMapper
					.selectByExample(dykRateExample);
			if (!CollectionUtils.isEmpty(dykRates)) {
				for (DykRate rate : dykRates) {
					if ("dyk0002".equals(rate.getRecUid())) {
						dykRate1 = rate.getDykRate();
					} else if ("dyk0003".equals(rate.getRecUid())) {
						dykRate2 = rate.getDykRate();
					} else if ("dyk0004".equals(rate.getRecUid())) {
						dykRate3 = rate.getDykRate();
					}
				}
			}

			try {
				for (FinanceInfo financeInfo : list) {
					diffDays = diffDays(new Date(),
							financeInfo.getFinanceEndDate());
					if (diffDays >= 1 && diffDays <= 60) {// 年化12%
						dykRate = dykRate1;
					} else if (diffDays >= 61 && diffDays <= 120) {// 年化18%
						dykRate = dykRate2;
					} else if (diffDays >= 121) {// 年化8.8%
						dykRate = dykRate3;
					}
					if (dykRate != null) {
						RevenueManagement management = revenueManagementMapper
								.selectByPrimaryKey(financeInfo.getFinanceId());
						BigDecimal thisInterest = null;
						BigDecimal interestSum = null;
						BigDecimal notPayInterest = null;
						if (management == null) {
							// 本次利息金额：付款余额*利率*（当前业务日期 - 上一计息日）/360
							thisInterest = financeInfo.getPayAmt()
									.multiply(dykRate)
									.multiply(new BigDecimal(diffDays));
							thisInterest = thisInterest.divide(new BigDecimal(
									360), 2, RoundingMode.HALF_UP);

							management = new RevenueManagement();
							management.setFinanceId(financeInfo.getFinanceId());
							management.setThisInterest(thisInterest);
							management.setInterestSum(thisInterest);
							management.setHasPayInterest(BigDecimal.ZERO);
							management.setNotPayInterest(thisInterest);
							management.setLastCalDate(new Date());
							management.setCreateTime(new Date());
							revenueManagementMapper.insertSelective(management);
						} else {
							diffDays = diffDays(new Date(),
									management.getLastCalDate());
							thisInterest = financeInfo.getPayAmt()
									.multiply(dykRate)
									.multiply(new BigDecimal(diffDays));
							thisInterest = thisInterest.divide(new BigDecimal(
									360), 2, RoundingMode.HALF_UP);

							interestSum = management.getInterestSum();
							notPayInterest = management.getNotPayInterest();
							interestSum = interestSum.add(thisInterest);
							notPayInterest = notPayInterest.add(thisInterest);
							management.setThisInterest(thisInterest);
							management.setInterestSum(interestSum);
							management.setNotPayInterest(notPayInterest);
							management.setLastCalDate(new Date());
							revenueManagementMapper
									.updateByPrimaryKeySelective(management);
						}
					}
				}
			} catch (Exception e) {

			}
		}
	}

	private int diffDays(Date bDate, Date eDate) throws ParseException {
		bDate = dateFormat.parse(dateFormat.format(bDate));
		eDate = dateFormat.parse(dateFormat.format(eDate));
		return (int) ((bDate.getTime() - eDate.getTime()) / (24 * 3600 * 1000));
	}

	private String httpURLConnectionPOST(Map<String, String> paramMap,
			String paramUrl) {

		try {
			URL url = null;
			HttpURLConnection connection = null;
			BufferedReader bufferedReader = null; // 接受连接受的参数
			StringBuffer result = new StringBuffer(); // 用来接受返回值
			String parm = "";
			Iterator<String> iterator = paramMap.keySet().iterator();
			while (iterator.hasNext()) {
				String it = iterator.next();
				parm += it + "=" + URLEncoder.encode(paramMap.get(it), "utf-8")
						+ "&";
			}
			parm = parm.substring(0, parm.length() - 1);
			paramUrl += "?" + parm;

			// 创建URL
			url = new URL(paramUrl);
			// 建立连接
			connection = (HttpURLConnection) url.openConnection();
			connection.setRequestProperty("accept", "text/json");
			connection.setRequestProperty("connection", "keep-alive");
			connection
					.setRequestProperty("user-agent",
							"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:34.0) Gecko/20100101 Firefox/34.0");
			connection.connect();

			// 接受连接返回参数
			bufferedReader = new BufferedReader(new InputStreamReader(
					connection.getInputStream()));
			String line;
			while ((line = bufferedReader.readLine()) != null) {
				result.append(line);
			}
			bufferedReader.close();
			return result.toString();

		} catch (Exception e) {
			log.error(e.getMessage());
		}
		return "";
	}

	// // @Scheduled(cron="*/5 * * * * ?")
	/*
	 * 收息预警通知
	 * 
	 * batchId 批处理id
	 */
	public void warnRevenue() {
		FinanceInfoExample example = new FinanceInfoExample();
		Criteria criteria = example.createCriteria();
		criteria.andFinanceStatusEqualTo("2"); // 融资状态:已放款
		List<FinanceInfo> list = financeInfoMapper.selectByExample(example);

		if (!CollectionUtils.isEmpty(list)) {

			int diffDays = 0;
			String financeId = null;

			try {
				for (FinanceInfo financeInfo : list) {
					diffDays = diffDays(new Date(),
							financeInfo.getFinanceEndDate());
					if (diffDays <= 0 && diffDays >= -3) {// 提前3天以及当天推预警

						financeId = financeInfo.getFinanceId();

						insertWaring("融资编号为" + financeId + "的融资即将到期");

					} else if (diffDays >= 61 && diffDays <= 120) {// 年化18%
						financeId = financeInfo.getFinanceId();

						insertWaring("融资编号为" + financeId + "的融资应还利息已过期"
								+ diffDays + "天");

					} else if (diffDays >= 121) {// 年化8.8%
						financeId = financeInfo.getFinanceId();

						insertWaring("融资编号为" + financeId + "的融资应还利息已过期"
								+ diffDays + "天");

					}
				}
			} catch (Exception e) {

			}
		}

	}

}

package com.ut.scf.web.controller.project;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.imageio.stream.FileImageOutputStream;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.activiti.engine.impl.util.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.itextpdf.text.Document;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.ut.scf.core.dict.PageInfoBean;
import com.ut.scf.core.dict.ScfConsts;
import com.ut.scf.core.util.BeanUtil;
import com.ut.scf.core.util.PDFUtil;
import com.ut.scf.core.util.ScfDateUtil;
import com.ut.scf.pojo.auto.OrderBatchInfo;
import com.ut.scf.reqbean.project.ContractReqBean;
import com.ut.scf.reqbean.project.OrderManagerReqBean;
import com.ut.scf.reqbean.project.SignContractReqBean;
import com.ut.scf.respbean.BaseRespBean;
import com.ut.scf.service.project.IActivitiService;
import com.ut.scf.service.project.IContractMagagerService;
import com.ut.scf.service.project.ISignContractService;
import com.ut.scf.web.controller.BaseJsonController;

/**
 * 合同
 * 
 * @author liwd
 *
 */
@Controller
@RequestMapping("/sign")
public class SignContractController extends BaseJsonController {
	private static final Logger log = LoggerFactory
			.getLogger(SignContractController.class);
	@Resource
	private IContractMagagerService iContractMagagerService;
	@Resource
	private ISignContractService iSignContractService;
	@Resource
	private IActivitiService activitiService;

	// 1.签署合同 并 发起流程
	@RequestMapping(value = "/startProcess")
	@ResponseBody
	public BaseRespBean startProcess(HttpSession httpSession,
			@RequestBody SignContractReqBean reqBean) throws Exception {
		// 签署合同
		iSignContractService.autoSignFopp(reqBean.getSignId());
		// 发起流程
		BaseRespBean respBean = new BaseRespBean();
		// 获取当前用户
		String userName = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USERNAME);
		reqBean.setUserId(userName);
		reqBean.setActivitiKey("contractSign");
		JSONObject contactInfo = new JSONObject(reqBean);
		log.debug("corpInfoStr: {}", contactInfo);
		activitiService.startProcess(contactInfo);
		return respBean;
	}

	// 添加合同
	@RequestMapping(value = "/add")
	@ResponseBody
	public BaseRespBean AddRevenue(@Valid @RequestBody ContractReqBean reqBean)
			throws IOException {
		BaseRespBean respBean = new BaseRespBean();
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		respBean = iSignContractService.insertContract(paramMap);
		return respBean;
	}

	// 签合同 并 审核是否同意
	@RequestMapping(value = "/agreeAndSign")
	@ResponseBody
	public BaseRespBean doAgreeAndSign(HttpSession httpSession,
			@RequestBody SignContractReqBean reqBean) throws Exception {
		// 签合同
		iSignContractService.autoSignFopp(reqBean.getSignId());
		// 审核
		BaseRespBean respBean = new BaseRespBean();
		// 获取当前用户
		String userName = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USERNAME);
		reqBean.setUserId(userName);
		JSONObject jsonObject = new JSONObject(reqBean);
		respBean = activitiService.doAgree(jsonObject);
		return respBean;
	}

	// 5.审核是否同意
	@RequestMapping(value = "/doAgree")
	@ResponseBody
	public BaseRespBean doAgree(HttpSession httpSession,
			@RequestBody SignContractReqBean reqBean) {
		BaseRespBean respBean = new BaseRespBean();
		// 获取当前用户
		String userName = (String) httpSession
				.getAttribute(ScfConsts.SESSION_USERNAME);
		reqBean.setUserId(userName);
		JSONObject jsonObject = new JSONObject(reqBean);
		respBean = activitiService.doAgree(jsonObject);
		return respBean;
	}

	// 获取批次信息
	@RequestMapping(value = "/batchList")
	@ResponseBody
	public BaseRespBean batchInfoList(HttpSession httpSession,
			@RequestBody SignContractReqBean reqBean) {
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		return iSignContractService.batchInfoList(page);

	}

	@RequestMapping(value = "/batchInfo")
	@ResponseBody
	public OrderBatchInfo batchInfoById(HttpSession httpSession,
			@RequestBody SignContractReqBean reqBean) {
		return iSignContractService.batchInfoById(reqBean.getOrderBatchId());

	}

	// 获取订单信息
	@RequestMapping(value = "/orderList")
	@ResponseBody
	public BaseRespBean orderInfoList(HttpSession httpSession,
			@RequestBody OrderManagerReqBean reqBean) {
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		PageInfoBean page = new PageInfoBean();
		page.setPageNumber(reqBean.getPageNumber());
		page.setPageSize(reqBean.getPageSize());
		return iSignContractService.orderInfoByBatchId(paramMap, page);

	}

	// 获取超人所需费用 getCrReqAmtByBatchId
	@RequestMapping(value = "/crReqAmt")
	@ResponseBody
	public String crReqAmtByBatchId(HttpSession httpSession,
			@RequestBody SignContractReqBean reqBean) {
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		return iSignContractService.getCrReqAmtByBatchId(paramMap);
	}

	// 获取超人保证金比例
	@RequestMapping(value = "/rate")
	@ResponseBody
	public String getGuaranteeRate(HttpSession httpSession,
			@RequestBody SignContractReqBean reqBean) {
		return iSignContractService.getGuaranteeRate(reqBean.getProductId())
				+ "";
	}

	// 获取还款信息
	@RequestMapping(value = "/repayList")
	@ResponseBody
	public BaseRespBean repayInfoList(HttpSession httpSession,
			@RequestBody SignContractReqBean reqBean) {
		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);
		return iSignContractService.repaymentInfoList(paramMap);
	}

	// 导出文件并发送合同
	// @RequestMapping(value = "/send")
	// @ResponseBody
	// public Map<String, String> sendContract(
	// MultipartHttpServletRequest multipartHttpServletRequest,
	// HttpServletResponse response, HttpServletRequest request)
	// throws Exception {
	// // 导出合同
	// String path = exportPdf(multipartHttpServletRequest, response, request);
	// // 上传合同 返回合同signid
	// return iSignContractService.sendContract(path);
	//
	// }

	// 返回超人合同视图
	@RequestMapping(value = "/view")
	@ResponseBody
	public String viewContract(@RequestBody SignContractReqBean reqBean)
			throws Exception {
		return iSignContractService.viewContract(reqBean.getSignId(),
				reqBean.getFileId());

	}

	// 根据模板 生成订单合同
	@RequestMapping(value = "/send")
	@ResponseBody
	public Map<String, String> sendContract(HttpServletRequest request,
			@RequestBody SignContractReqBean reqBean) {

		Map<String, Object> paramMap = BeanUtil.beanToMap(reqBean);

		List<Map<String, Object>> respBean = iSignContractService
				.repayPlanInfoList(paramMap);
		String no = iContractMagagerService.getContractNo();
		String money1 = iSignContractService.getCrReqAmtByBatchId(paramMap);
		double rate = iSignContractService.getGuaranteeRate(reqBean
				.getProductId());
		BigDecimal bigRate = new BigDecimal(rate).divide(new BigDecimal(100),
				2, BigDecimal.ROUND_HALF_UP);
		try {
			BigDecimal money2 = new BigDecimal(money1).multiply(bigRate);
			String date = ScfDateUtil.format(new Date(), "yyyy-MM-dd");

			String filePath = "/importTemp/订单合同模板.pdf";
			filePath = request.getSession().getServletContext()
					.getRealPath(filePath);
			String toPath = "/sign/订单合同.pdf";
			toPath = request.getSession().getServletContext()
					.getRealPath(toPath);

			String path = "/sign/订单合同-" + no + ".pdf";
			path = request.getSession().getServletContext().getRealPath(path);

			File tempFile = new File(toPath);
			File fileParent = tempFile.getParentFile();
			if (!fileParent.exists()) {
				fileParent.mkdirs();
			}

			Map<String, String> map = new HashMap<String, String>();
			map.put("NO", no);
			map.put("money1", money1);
			map.put("money2", money2.toString());
			map.put("date", date);
			PDFUtil.exportToPDF(filePath, toPath, map);
			List<String> list = new ArrayList<String>();
			list.add("订单号");
			list.add("学生姓名");
			list.add("身份证号");
			list.add("联系方式");
			list.add("应收账款总额");
			list.add("保理融资投放金额");
			list.add("每期应收账款金额");
			list.add("每期应收账款到期日");
			list.add("期数");
			list.add("每期保理融资到账日");
			list.add("每期保理融资本金到账金额");
			list.add("每期保理融资利息到账金额");
			List<String> fieldName = new ArrayList<String>();
			fieldName.add("orderId");
			fieldName.add("stuName");
			fieldName.add("idCard");
			fieldName.add("mobilePhone");
			fieldName.add("productAmt");
			fieldName.add("crReqAmt");
			fieldName.add("payM");
			fieldName.add("currentRepayDate");
			fieldName.add("period");
			fieldName.add("currentRepayDate");
			fieldName.add("currentPayablePrincipal");
			fieldName.add("currentPayableInterest");
			List<String> testList = new ArrayList<String>();
			testList.add("orderId");
			testList.add("stuName");
			testList.add("mobilePhone");
			testList.add("idCard");
			testList.add("productAmt");
			testList.add("crReqAmt");
			testList.add("payM");
			PdfPTable table = PDFUtil.setTable("应收账款转让管理同意协议附件", list,
					fieldName, respBean, testList);
			float[] width = { 58, 60, 60, 60, 60, 75, 75, 85, 30, 85, 88, 88 };
			table.setTotalWidth(width);
			table.setLockedWidth(true);
			PDFUtil.exportTableToPDF(toPath, path, table);
			return iSignContractService.sendContract(path);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

	// 导出 pdf
	private String exportPdf(
			MultipartHttpServletRequest multipartHttpServletRequest,
			HttpServletResponse response, HttpServletRequest request)
			throws ServletException, IOException {

		String uploadFilePath = "uploadFile/ht/";

		String path = request.getSession().getServletContext()
				.getRealPath(uploadFilePath);
		// 得到文件服务器存储目录

		String filePath = path + "/ht.pdf";
		String imagePath = path + "/ht.bmp";

		File tempFile = new File(filePath);
		File fileParent = tempFile.getParentFile();
		if (!fileParent.exists()) {
			fileParent.mkdirs();
		}

		Document document = new Document();
		try {
			Map getMap = multipartHttpServletRequest.getFileMap();
			MultipartFile mfile = (MultipartFile) getMap.get("imgData"); // 获取数据
			InputStream file = mfile.getInputStream();
			byte[] fileByte = FileCopyUtils.copyToByteArray(file);

			FileImageOutputStream imageOutput = new FileImageOutputStream(
					new File(imagePath));// 打开输入流
			imageOutput.write(fileByte, 0, fileByte.length);// 生成本地图片文件
			imageOutput.close();

			PdfWriter.getInstance(document, new FileOutputStream(filePath)); // itextpdf文件
			document.setPageSize(PageSize.A4);
			document.setPageCount(2);
			document.open();
			Image image = Image.getInstance(imagePath); // itext-pdf-image
			float heigth = image.getHeight();
			float width = image.getWidth();
			int percent = getPercent2(heigth, width); // 按比例缩小图片
			image.setAlignment(Image.MIDDLE);
			image.scalePercent(percent + 3);
			document.add(image);
			document.close();
			return filePath;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "error";

	}

	private int getPercent2(float h, float w) {
		int p = 0;
		float p2 = 0.0f;
		p2 = 530 / w * 100;
		p = Math.round(p2);
		return p;
	}

	// 获取合同号
	@RequestMapping(value = "/no")
	@ResponseBody
	public String contractNO() throws Exception {
		return iContractMagagerService.getContractNo();
	}
}

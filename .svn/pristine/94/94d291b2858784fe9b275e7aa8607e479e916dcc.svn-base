package com.ut.scf.core.util;

import java.io.FileOutputStream;
import java.util.Map;

import com.itextpdf.text.pdf.AcroFields;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfStamper;

/**
 * pdf相关操作类，填pdf模板
 * 
 * @author liwd
 *
 */
public class PDFUtil {

	/**
	 * 填pdf 模板
	 * 
	 * @param templetPath
	 *            模板路径 包含文件名
	 * 
	 * @param toPath
	 *            输出的pdf文件 包含文件名
	 * 
	 * 
	 * 
	 * @param param
	 *            填入的key 和 value key表示pdf的文本域名 value表示要填入的值
	 *
	 *            融资承诺函：
	 * 
	 *            financeNo:编号 agencyName:经销商名称 money:融资金额 year：年 month：月 day：日
	 * 
	 *            付款承诺函：
	 * 
	 *            payNo：付款承诺函编号 agencyName：经销商名称 yearPay monthPay dayPay 付款年月日
	 *            money:付款金额 BLContractNo：保理合同编号 carFileNo：车辆信息文件编号 year month
	 *            day ：年月日
	 * @return
	 * @throws Exception
	 */

	public static void exportToPDF(String templetPath, String toPath,
			Map<String, String> param) throws Exception {

		PdfReader reader = new PdfReader(templetPath); // 模版文件目录
		PdfStamper ps = new PdfStamper(reader, new FileOutputStream(toPath)); // 生成的输出流
		AcroFields s = ps.getAcroFields();
		for (String str : param.keySet()) {
			s.setField(str, param.get(str));
		}
		ps.setFormFlattening(true);
		ps.close();
		reader.close();
	}

}

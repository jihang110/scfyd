package com.ut.scf.core.util;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.ut.scf.core.dict.ScfCacheDict;

/**
 * excel相关操作类，如导入导出
 * 
 * @author sunll
 *
 */
public class ExcelUtil {

	/**
	 * 对list数据源将其里面的数据导入到excel表单
	 * 
	 * @param request
	 * 
	 * @param list
	 *            要导入excel的数据
	 * 
	 * @param alias
	 *            导出到excel文件里的表头名
	 * 
	 * @param names
	 *            导出到excel文件里的表头名对应顺序的取数据源中Map key值
	 * 
	 * @return
	 * @throws IOException
	 */
	public static String exportToCsv(HttpServletRequest request,
			List<Map<String, Object>> dataList, List<String> aliasList,
			List<String> keyNames) throws IOException {
		// 获取文件路径
		String uploadFilePath = "exportTemp/";
		String path = request.getSession().getServletContext()
				.getRealPath(uploadFilePath);
		String fileName = ScfUUID.generate() + ".csv";

		BufferedWriter bw = new BufferedWriter(new FileWriter(new File(path,
				fileName)));

		// 写入表头标题
		StringBuffer sbTempLine = new StringBuffer();
		for (String alias : aliasList) {
			sbTempLine.append("\"" + alias + "\",");
		}
		bw.write(sbTempLine.substring(0, sbTempLine.length() - 1));
		bw.write("\r\n");

		// 写入数据
		for (Map<String, Object> data : dataList) {
			sbTempLine = new StringBuffer();
			for (String keyName : keyNames) {
				sbTempLine.append("\"" + data.get(keyName) + "\",");
			}
			bw.write(sbTempLine.substring(0, sbTempLine.length() - 1));
			bw.write("\r\n");
		}

		bw.close();

		return ScfCacheDict.sysConfigMap.get("scfcloudDomain")
				+ request.getContextPath() + "/" + uploadFilePath + fileName;
	}

}

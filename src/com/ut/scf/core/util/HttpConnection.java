package com.ut.scf.core.util;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Iterator;
import java.util.Map;

/**
 * 发送http请求
 * 
 * @author liwd
 *
 */
public class HttpConnection {

	public static String httpURLConnection(Map<String, String> paramMap,
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
			e.printStackTrace();
		}
		return "";
	}
}

package com.ut.scf.core.util;

import java.util.Calendar;
import java.util.Date;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.time.DateFormatUtils;
import org.apache.commons.lang.time.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ut.scf.core.dict.ScfConsts;

/**
 * 日期工具类
 * 
 * @author sunll
 *
 */
public class ScfDateUtil {

	private static final Logger log = LoggerFactory
			.getLogger(ScfDateUtil.class);

	/**
	 * 从字符串中解析时间
	 * @param dateStr
	 * @return
	 */
	public static Date parseDate(String dateStr) {
		try {
			return DateUtils.parseDate(dateStr, ScfConsts.DATE_FORMAT_PATTERNS);
		} catch (Exception e) {
			log.error("Exception : ", e);
			return null;
		}
	}

	/**
	 * 格式化时间
	 * @param date
	 * @param pattern
	 * @return
	 */
	public static String format(Date date, String pattern) {
		if (date == null || StringUtils.isBlank(pattern)) {
			return null;
		}
		return DateFormatUtils.format(date, pattern);
	}

	/**
	 * 得到前一天的日期字符串
	 * @return
	 */
	public static String getBeforeDateStr() {
		return format(DateUtils.addDays(Calendar.getInstance().getTime(), -1), ScfConsts.DATE_FORMAT);
	}
}

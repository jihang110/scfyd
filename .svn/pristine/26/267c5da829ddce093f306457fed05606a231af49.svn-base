package com.ut.scf.core.util;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Random;

/**
 * 加密工具类
 * 
 * @author sunll
 *
 */
public class EncryptUtil {

	static char hexDigits[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8',
			'9', 'a', 'b', 'c', 'd', 'e', 'f' };

	private static String byteToHexString(byte[] tmp) {
		String s;
		char str[] = new char[16 * 2];
		int k = 0;
		for (int i = 0; i < 16; i++) {
			byte byte0 = tmp[i];
			str[k++] = hexDigits[byte0 >>> 4 & 0xf];
			str[k++] = hexDigits[byte0 & 0xf];
		}
		s = new String(str);
		return s;
	}

	/**
	 * MD5加密
	 * 
	 * @param sourc
	 * @return
	 */
	public static String md5(String sourc) {
		if (sourc == null) {
			return sourc;
		}
		MessageDigest md = null;
		byte[] b = null;
		try {
			md = MessageDigest.getInstance("MD5");
			try {
				b = md.digest(sourc.getBytes("UTF-8"));
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return byteToHexString(b);

	}

	/**
	 * 生成思维随机数
	 * 
	 * @return
	 */
	public static String generalVerifyCode() {
		String arr[] = new String[] { "0", "1", "2", "3", "4", "5", "6", "7",
				"8", "9" };

		Random rm = new Random(
				new Double(Math.random() * 10000 * 59).longValue());

		String strRand = "";
		for (int i = 0; i < 4; i++) {
			String rand = arr[rm.nextInt(arr.length)];
			strRand += rand;
		}
		return strRand;
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		System.out.println(EncryptUtil.md5("000000"));
		System.out.println(EncryptUtil.md5("123456"));
		System.out.println(generalVerifyCode());
	}

}

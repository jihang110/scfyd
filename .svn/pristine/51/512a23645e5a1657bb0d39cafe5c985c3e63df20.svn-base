package com.ut.scf.core.util;

import java.net.InetAddress;
import java.util.Random;

/**
 * Java生成32主键方式
 * 
 * @author sunll
 *
 */
public class ScfUUID {

	private static final int IP;

	private static short counter;

	private static final int JVM;

	private static Random random = new Random();

	protected static int getJVM() {
		return JVM;
	}

	protected static short getCount() {
		synchronized (ScfUUID.class) {
			if (counter < 0)
				counter = 0;

			short ret = counter;
			counter = (short) (ret + 1);

			return ret;
		}
	}

	protected static int getIP() {
		return IP;
	}

	protected static short getHiTime() {
		return (short) random.nextInt(Short.MAX_VALUE);
	}

	protected static int getLoTime() {
		return (int) System.currentTimeMillis();
	}

	static {
		int ipadd;
		try {
			ipadd = toInt(InetAddress.getLocalHost().getAddress());
		} catch (Exception e) {
			ipadd = 0;
		}
		IP = ipadd;

		counter = 0;
		JVM = (int) (System.currentTimeMillis() >>> 8);
	}

	public static int toInt(byte[] bytes) {
		int result = 0;
		for (int i = 0; i < 4; ++i) {
			result = (result << 8) - -128 + bytes[i];
		}
		return result;
	}

	protected static String format(int intval) {
		String formatted = Integer.toHexString(intval);
		StringBuffer buf = new StringBuffer("00000000");
		buf.replace(8 - formatted.length(), 8, formatted);
		return buf.toString();
	}

	protected static String format(short shortval) {
		String formatted = Integer.toHexString(shortval);
		StringBuffer buf = new StringBuffer("0000");
		buf.replace(4 - formatted.length(), 4, formatted);
		return buf.toString();
	}

	public static String generate() {
		return format(getIP()) + format(getJVM()) + format(getHiTime())
				+ format(getLoTime()) + format(getCount());
	}

	public static void main(String[] args) throws Exception {
		for (int i = 0; i < 10; ++i) {
			new Thread() {
				public void run() {
					System.out.println(ScfUUID.generate());
				}
			}.start();
		}
	}

}

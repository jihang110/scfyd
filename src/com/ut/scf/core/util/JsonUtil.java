package com.ut.scf.core.util;

import java.io.IOException;
import java.io.OutputStream;
import java.io.Writer;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

/**
 * Json工具类
 * 
 * @author sunll
 *
 */
public class JsonUtil {
	
	private static final Logger log = LoggerFactory.getLogger(JsonUtil.class);

	/**
	 * jackson的ObjectMapper对象，用于pojo和json之间相互转化
	 */
	private static ObjectMapper mapper = new ObjectMapper();

	/**
	 * @param jsonStr
	 * @param valueType
	 * @return
	 * @throws JsonParseException
	 * @throws JsonMappingException
	 * @throws IOException
	 */
	public static <T> T readValue(String jsonStr, Class<T> valueType)
			throws JsonParseException, JsonMappingException, IOException {
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
				false);
		return mapper.readValue(jsonStr, valueType);
	}

	/**
	 * @param w
	 * @param value
	 * @throws JsonGenerationException
	 * @throws JsonMappingException
	 * @throws IOException
	 */
	public static void writeValue(Writer w, Object value)
			throws JsonGenerationException, JsonMappingException, IOException {
		mapper.writeValue(w, value);
		w.close();
	}

	/**
	 * @param out
	 * @param value
	 * @throws JsonGenerationException
	 * @throws JsonMappingException
	 * @throws IOException
	 */
	public static void writeValue(OutputStream out, Object value)
			throws JsonGenerationException, JsonMappingException, IOException {
		mapper.writeValue(out, value);
		out.close();
	}

	/**
	 * @param value
	 * @return
	 * @throws JsonProcessingException
	 */
	public static String writeValueAsString(Object value)
			throws JsonProcessingException {
		mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
		return mapper.writeValueAsString(value);
	}

	/**
	 * 对bean的属性进行初始化
	 * 
	 * @param value
	 * @return
	 */
	public static Object initBean(Object value) {
		// 初始化
		initObject(value.getClass(), value);

		// 初始化父类
		Class<?> superBeanClass = value.getClass().getSuperclass();
		if (superBeanClass != null && superBeanClass != Object.class) {
			initObject(superBeanClass, value);
		}

		return value;
	}

	@SuppressWarnings("rawtypes")
	private static void initObject(Class<?> objectClass, Object value) {
		// 得到bean的所有声明字段
		Field[] fields = objectClass.getDeclaredFields();
		try {
			for (Field field : fields) {
				String getMethodName = "get"
						+ StringUtils.capitalize(field.getName());
				Method getMethod = objectClass.getDeclaredMethod(getMethodName);
				if (getMethod.invoke(value) != null) {
					continue;
				}

				String setMethodName = "set"
						+ StringUtils.capitalize(field.getName());
				Method method = objectClass.getDeclaredMethod(setMethodName,
						field.getType());
				// 如果字段类型是String或，初始化为空字符串
				if (field.getType() == String.class) {
					method.invoke(value, "");
				} else if (field.getType() == Integer.class
						|| field.getType() == Long.class
						|| field.getType() == Double.class
						|| field.getType() == Float.class) {
					method.invoke(value, 0);
				} else if (field.getType() == BigDecimal.class) {
					method.invoke(value, new BigDecimal(0));
				} else if (field.getType() == List.class
						|| field.getType() == Collection.class) {
					List<Object> list = new ArrayList<>();

					// 得到集合中的泛型，进行初始化
					Type ft = field.getGenericType();
					if (ft instanceof ParameterizedType) {
						Type fpt = ((ParameterizedType) ft)
								.getActualTypeArguments()[0];
						if (fpt instanceof Class) {
							Class cl = (Class) fpt;
							if (cl == String.class || cl == Object.class) {
								list.add("");
							} else {
								list.add(initBean(cl.newInstance()));
							}
						}
					}
					method.invoke(value, list);
				} else if (field.getType() == Map.class) {
					method.invoke(value, new HashMap());
				}
			}
		} catch (Exception e) {
			log.error("initObject Exception : ", e);
		}
	}

}

package com.ut.scf.core.util;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * bean工具类
 * 
 * @author sunll
 * 
 */
public class BeanUtil
{
    
    private static final Logger log = LoggerFactory.getLogger(BeanUtil.class);
    
    private static final String STR_GET = "get";
    
    private static final String STR_SET = "set";
    
    /**
     * bean及其父类所有的属性转化为map，属性必须有set、get方法
     * 
     * @param bean
     * @return
     */
    public static Map<String, Object> beanToMap(Object bean)
    {
        Map<String, Object> result = new HashMap<>();
        
        Field[] fields = bean.getClass().getDeclaredFields();
        
        try
        {
            String getMethodName;
            for (Field field : fields)
            {
                getMethodName = STR_GET + StringUtils.capitalize(field.getName());
                result.put(field.getName(),
                        bean.getClass()
                                .getDeclaredMethod(getMethodName)
                                .invoke(bean));
            }
            
            Class<?> superBeanClass = bean.getClass().getSuperclass();
            if (superBeanClass != Object.class)
            {
                fields = superBeanClass.getDeclaredFields();
                
                for (Field field : fields)
                {
                    getMethodName = STR_GET
                            + StringUtils.capitalize(field.getName());
                    result.put(field.getName(),
                            superBeanClass.getDeclaredMethod(getMethodName)
                                    .invoke(bean));
                }
            }
        }
        catch (Exception e)
        {
            log.warn("beanToMap Exception: ", e);
        }
        
        return result;
    }
    
    /**
     * map转化为bean及其父类所有的属性，属性必须有set、get方法
     * 
     * @param map
     * @param bean
     * @return
     */
    public static void mapToBean(Map<String, Object> map, Object bean)
    {
        Field[] fields = bean.getClass().getDeclaredFields();
        
        try
        {
            String setMethodName;
            for (Field field : fields)
            {
                if (map.containsKey(field.getName())
                        && map.get(field.getName()) != null)
                {
                    setMethodName = STR_SET
                            + StringUtils.capitalize(field.getName());
                    Method method = bean.getClass()
                            .getDeclaredMethod(setMethodName, field.getType());
                    method.invoke(bean, map.get(field.getName()));
                }
            }
            
            Class<?> superBeanClass = bean.getClass().getSuperclass();
            if (superBeanClass != null && superBeanClass != Object.class)
            {
                fields = superBeanClass.getDeclaredFields();
                
                for (Field field : fields)
                {
                    if (map.containsKey(field.getName())
                            && map.get(field.getName()) != null)
                    {
                        setMethodName = STR_SET
                                + StringUtils.capitalize(field.getName());
                        Method method = superBeanClass.getDeclaredMethod(setMethodName,
                                field.getType());
                        method.invoke(bean, map.get(field.getName()));
                    }
                }
            }
        }
        catch (Exception e)
        {
            log.warn("mapToBean Exception: ", e);
        }
    }
    
    /**
     * Bean与Bean之间同属性复制
     * 
     * @param destBean
     * @param origBean
     */
    public static void BeanToBean(Object destBean, Object origBean)
    {
        try
        {
            BeanUtils.copyProperties(destBean, origBean);
        }
        catch (Exception e)
        {
            log.warn("BeanToBean Exception: ", e);
        }
    }
    
    public static String getValue(Map<String, Object> map, String key)
    {
        return map.containsKey(key) ? String.valueOf(map.get(key)) : "";
    }
    
    public static String getValue(Map<String, Object> map, String key,
            String defaultValue)
    {
        return map.containsKey(key) ? String.valueOf(map.get(key))
                : defaultValue;
    }
    
}

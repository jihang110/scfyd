package com.ut.scf.core.dict;

/**
 * scf公共常量
 * 
 * @author sll
 */
public interface ScfConsts
{
    
    /******************************** 以下是时间类常量 **************************************/
    /**
     * 系统结束时间
     */
    public final static String SYS_ENDTIME = "2100-01-01 00:00:00";
    
    /**
     * 年月日时分秒，时间格式
     */
    public final static String DATETIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
    
    /**
     * 年月日时分，时间格式
     */
    public final static String DATETIME_NO_SEC_FORMAT = "yyyy-MM-dd HH:mm";
    
    /**
     * 年月日，时间格式
     */
    public final static String DATE_FORMAT = "yyyy-MM-dd";
    
    /**
     * 年月，时间格式
     */
    public final static String MONTH_FORMAT = "yyyy-MM";
    
    /**
     * 年，时间格式
     */
    public final static String YEAR_FORMAT = "yyyy";
    
    /**
     * 时分秒，时间格式
     */
    public final static String TIME_FORMAT = "HH:mm:ss";
    
    public final static String[] DATE_FORMAT_PATTERNS = new String[] {
            "yyyy-MM", "yyyyMM", "yyyy/MM", "yyyyMMdd", "yyyy-MM-dd",
            "yyyy/MM/dd", "yyyyMMddHHmmss", "yyyy-MM-dd HH:mm:ss",
            "yyyy/MM/dd HH:mm:ss", "yyyyMMddHHmm", "yyyy-MM-dd HH:mm",
            "yyyy/MM/dd HH:mm", "yyyy-MM-dd HH:mm:ss.SSS" };
    
    /******************************** 以下是时间类常量 **************************************/
    
    /**
     * 年月日，时间格式的正则表达式
     */
    public final static String REGEX_DATE = "^\\d{4}-\\d{2}-\\d{2}$";
    
    /**
     * 年月日时分秒，时间格式的正则表达式
     */
    public final static String REGEX_DATETIME = "^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}$";
    
    /**
     * 年月日时分，时间格式的正则表达式
     */
    public final static String REGEX_DATETIME_NO_SEC = "^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}$";
    
    /**
     * 时间格式的正则表达式
     */
    public final static String REGEX_DATE_OR_DATETIME = "^\\d{4}-\\d{2}-\\d{2}(( \\d{2}:\\d{2}:\\d{2})|( \\d{2}:\\d{2}))?$";
    
    /**
     * 整数的正则表达式
     */
    public final static String REGEX_INT = "^-?\\d+$";
    
    /**
     * 正整数的正则表达式
     */
    public final static String REGEX_INT_POSITIVE = "^[0-9]*[1-9][0-9]*$";
    
    /**
     * 非负整数（正整数 + 0）的正则表达式
     */
    public final static String REGEX_INT_NONNEGATIVE = "^\\d+$";
    
    /**
     * 浮点数的正则表达式
     */
    public final static String REGEX_DOUBLE = "^(-?\\d+)(\\.\\d+)?$";
    
    /**
     * 正浮点数的正则表达式
     */
    public final static String REGEX_DOUBLE_POSITIVE = "^(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*))$";
    /**
     * 正浮点及整数数字的表达式
     */
    public final static String REGEX_DOU_INT_POSTIVE=  "^(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*)|-?\\d+$)$";
    /**
     * 非负浮点数（正浮点数 + 0）的正则表达式
     */
    public final static String REGEX_DOUBLE_NONNEGATIVE = "^\\d+(\\.\\d+)?$";
    
    /**
     * email地址的正则表达式
     */
    public final static String REGEX_EMAIL = "^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$";
    
    /**
     * url的正则表达式
     */
    public final static String REGEX_URL = "^[a-zA-z]+:\\(\\w+(-\\w+)*)(\\.(\\w+(-\\w+)*))*(\\?\\S*)?$";
    
    /**
     * 手机号的正则表达式
     */
    public final static String REGEX_MOBILE_PHONE = "^[0-9]{11}$";
    
    /******************************** 以下是编码常量 **************************************/
    /**
     * utf8编码
     */
    public final static String UTF8_ENCODING = "UTF-8";
    
    /**
     * gbk编码
     */
    public final static String GBK_ENCODING = "GBK";
    
    /******************************** 以下是HTTP状态码 、content type**************************************/
    public final static String CONTENT_TYPE_JSON_UTF8 = "application/json;charset=UTF-8";
    
    public final static int HTTP_STATUS_OK = 200;
    public final static int HTTP_STATUS_NOT_FOUND = 404;
    
    /******************************** 以下是命令配置的常量 **************************************/
    
    // 保存在session中的用户信息标签
    public final static String SESSION_LOGIN_CODE = "loginCode";
    public final static String SESSION_LOGIN_CODE_EXPIRE_TIME = "loginCodeExpireTime";
    public final static String SESSION_LOGIN_PHONE_CODE = "loginPhoneCode";
    public final static String SESSION_LOGIN_PHONE_CODE_EXPIRE_TIME = "loginPhoneCodeExpireTime";
    public final static String SESSION_SIGN_PHONE_CODE = "signPhoneCode";
    public final static String SESSION_SIGN_PHONE_CODE_EXPIRE_TIME = "signPhoneCodeExpireTime";
    public final static String SESSION_USER_ID = "userId";
    public final static String SESSION_USERNAME = "username";
    public final static String SESSION_ROLE_ID = "roleId";
    public final static String SESSION_ROLE_NAME = "roleName";
    public final static String SESSION_ROLE_TYPE = "roleType";
    public final static String SESSION_CORP_ID = "corpId";
    public final static String SESSION_DEPT_ID = "deptId";
    public final static String SESSION_MENU_LIST = "menuList";
    
}

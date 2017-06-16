package com.ut.scf.mybatis.interceptor;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.scripting.defaults.DefaultParameterHandler;
import org.apache.ibatis.executor.parameter.ParameterHandler;
import org.apache.ibatis.executor.statement.RoutingStatementHandler;
import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.ParameterMapping;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.RowBounds;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import com.ut.scf.core.dict.PageInfoBean;

/**
*
* 分页拦截器，用于拦截需要进行分页查询的操作，然后对其进行分页处理。
* 利用拦截器实现Mybatis分页的原理：
* 要利用JDBC对数据库进行操作就必须要有一个对应的Statement对象，Mybatis在执行Sql语句前就会产生一个包含Sql语句的Statement对象，而且对应的Sql语句
* 是在Statement之前产生的，所以我们就可以在它生成Statement之前对用来生成Statement的Sql语句下手。在Mybatis中Statement语句是通过RoutingStatementHandler对象的
* prepare方法生成的。所以利用拦截器实现Mybatis分页的一个思路就是拦截StatementHandler接口的prepare方法，然后在拦截器方法中把Sql语句改成对应的分页查询Sql语句，之后再调用
* StatementHandler对象的prepare方法，即调用invocation.proceed()。
* 对于分页而言，在拦截器里面我们还需要做的一个操作就是统计满足当前条件的记录一共有多少，这是通过获取到了原始的Sql语句后，把它改为对应的统计语句再利用Mybatis封装好的参数和设
* 置参数的功能把Sql语句中的参数进行替换，之后再执行查询记录数的Sql语句进行总记录数的统计。
*
*/

@Intercepts({ @Signature(method = "prepare", type = StatementHandler.class, args = { Connection.class}),
		@Signature(method = "query", type = Executor.class, args = { MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class }) })
public class MybatisSpringPageInterceptor implements Interceptor {
	private static final Logger log = LoggerFactory.getLogger(MybatisSpringPageInterceptor.class);

	public static final String MYSQL = "mysql";
	public static final String ORACLE = "oracle";

	protected String databaseType;// 数据库类型，不同的数据库有不同的分页方法

	protected ThreadLocal<PageInfoBean> pageThreadLocal = new ThreadLocal<PageInfoBean>();

	public String getDatabaseType() {
		return databaseType;
	}

	public void setDatabaseType(String databaseType) {
		if (!databaseType.equalsIgnoreCase(MYSQL) && !databaseType.equalsIgnoreCase(ORACLE)) {
			throw new PageNotSupportException("Page not support for the type of database, database type [" + databaseType + "]");
		}
		this.databaseType = databaseType;
	}

	/**
	 * 拦截器对应的封装原始对象的方法
	 */
	@Override
	public Object plugin(Object target) {
		return Plugin.wrap(target, this);
	}

    /**
     * 设置注册拦截器时设定的属性
     */
	@Override
	public void setProperties(Properties properties) {
		String databaseType = properties.getProperty("databaseType");
		if (databaseType != null) {
			setDatabaseType(databaseType);
		}
	}

	@Override
	public Object intercept(Invocation invocation) throws Throwable {
		if (invocation.getTarget() instanceof StatementHandler) { // 控制SQL和查询总数的地方
			PageInfoBean page = pageThreadLocal.get();
			if (page == null) { //不是分页查询
				return invocation.proceed();
			}
			/*
			 * StatementHandler只有两个实现类，一个是RoutingStatementHandler，另一个是抽象类BaseStatementHandler，
			 * BaseStatementHandler有三个子类，分别是:
			 *   	1.SimpleStatementHandler,是用于处理Statement的;
			 *   	2.PreparedStatementHandler,是处理PreparedStatement的;
			 *   	3.CallableStatementHandler,是处理CallableStatement的。
			 *   
			 * Mybatis在进行Sql语句处理的时候都是建立的RoutingStatementHandler，
			 * 而在RoutingStatementHandler里面拥有一个StatementHandler类型的delegate属性，
			 * RoutingStatementHandler会依据Statement的不同建立对应的BaseStatementHandler，
			 * 即SimpleStatementHandler、PreparedStatementHandler或CallableStatementHandler，
			 * 在RoutingStatementHandler里面所有StatementHandler接口方法的实现都是调用的delegate对应的方法。
			 * 
			 * 我们在MybatisSpringPageInterceptor类上已经用@Signature标记了该Interceptor只拦截StatementHandler接口的prepare方法，
			 * 又因为Mybatis只有在建立RoutingStatementHandler的时候是通过Interceptor的plugin方法进行包裹的，
			 * 所以我们这里拦截到的目标对象肯定是RoutingStatementHandler对象。
			 * 
			 */
			RoutingStatementHandler handler = (RoutingStatementHandler) invocation.getTarget();
			
			//通过反射获取到当前RoutingStatementHandler对象的delegate属性
			StatementHandler delegate = (StatementHandler) ReflectUtil.getFieldValue(handler, "delegate");
			
			//获取到当前StatementHandler的 boundSql
			BoundSql boundSql = delegate.getBoundSql();
			
			//拦截到的prepare方法参数是一个Connection对象
			Connection connection = (Connection) invocation.getArgs()[0];
			prepareAndCheckDatabaseType(connection); // 准备数据库类型

			if (page.getTotalPage() > -1) {
				if (log.isTraceEnabled()) {
					log.trace("已经设置了总页数, 不需要再查询总数.");
				}
			} else {
				//拿到当前绑定Sql的参数对象，就是我们在调用对应的Mapper映射语句时所传入的参数对象
				Object parameterObj = boundSql.getParameterObject();
				
				//通过反射获取delegate父类BaseStatementHandler的mappedStatement属性
				MappedStatement mappedStatement = (MappedStatement) ReflectUtil.getFieldValue(delegate, "mappedStatement");
				queryTotalRecord(page, parameterObj, mappedStatement, connection);
			}
			
			//获取当前要执行的Sql语句，也就是我们直接在Mapper映射语句中写的Sql语句
			String sql = boundSql.getSql();
			
			//获取分页Sql语句
			String pageSql = buildPageSql(page, sql);
			if (log.isDebugEnabled()) {
				log.debug("分页时, 生成分页pageSql: " + pageSql);
			}
			
			//利用反射设置当前BoundSql对应的sql属性为我们建立好的分页Sql语句
			ReflectUtil.setFieldValue(boundSql, "sql", pageSql);

			return invocation.proceed();
		} else { // 查询结果的地方
			
			// 获取是否有分页Page对象
			PageInfoBean page = findPageObject(invocation.getArgs()[1]);
			if (page == null) {
				if (log.isTraceEnabled()) {
					log.trace("没有Page对象作为参数, 不是分页查询.");
				}
				return invocation.proceed();
			} else {
				if (log.isTraceEnabled()) {
					log.trace("检测到分页Page对象, 使用分页查询.");
				}
			}
			
			//设置真正的parameterObj
			invocation.getArgs()[1] = extractRealParameterObject(invocation.getArgs()[1]);

			pageThreadLocal.set(page);
			try {
				return invocation.proceed(); // Executor.query(..)
			} finally {
				pageThreadLocal.remove();
			}
		}
	}

	protected PageInfoBean findPageObject(Object parameterObj) {
		if (parameterObj instanceof PageInfoBean) {
			return (PageInfoBean) parameterObj;
		} else if (parameterObj instanceof Map) {
			for (Object val : ((Map<?, ?>) parameterObj).values()) {
				if (val instanceof PageInfoBean) {
					return (PageInfoBean) val;
				}
			}
		}
		return null;
	}

	/**
	 * <pre>
	 * 把真正的参数对象解析出来
	 * Spring会自动封装对个参数对象为Map<String, Object>对象
	 * 对于通过@Param指定key值参数我们不做处理，因为XML文件需要该KEY值
	 * 而对于没有@Param指定时，Spring会使用0,1作为主键
	 * 对于没有@Param指定名称的参数,一般XML文件会直接对真正的参数对象解析，
	 * 此时解析出真正的参数作为根对象
	 * </pre>
	 * @param parameterObj
	 * @return
	 */
	protected Object extractRealParameterObject(Object parameterObj) {
		if (parameterObj instanceof Map<?, ?>) {
			Map<?, ?> parameterMap = (Map<?, ?>) parameterObj;
			if (parameterMap.size() == 4) {
				for (Object value : parameterMap.values()) {
					if (!(value instanceof PageInfoBean)) {
						return value;
					}
				}
				/*boolean springMapWithNoParamName = true;
				for (Object key : parameterMap.keySet()) {
					if (!(key instanceof String)) {
						springMapWithNoParamName = false;
						break;
					}
					String keyStr = (String) key;
					if (!"0".equals(keyStr) && !"1".equals(keyStr)) {
						springMapWithNoParamName = false;
						break;
					}
				}
				if (springMapWithNoParamName) {
					for (Object value : parameterMap.values()) {
						if (!(value instanceof PageInfoBean)) {
							return value;
						}
					}
				}*/
			}
		}
		return parameterObj;
	}

	protected void prepareAndCheckDatabaseType(Connection connection) throws SQLException {
		if (databaseType == null) {
			String productName = connection.getMetaData().getDatabaseProductName();
			if (log.isTraceEnabled()) {
				log.trace("Database productName: " + productName);
			}
			productName = productName.toLowerCase();
			if (productName.indexOf(MYSQL) != -1) {
				databaseType = MYSQL;
			} else if (productName.indexOf(ORACLE) != -1) {
				databaseType = ORACLE;
			} else {
				throw new PageNotSupportException("Page not support for the type of database, database product name [" + productName + "]");
			}
			if (log.isDebugEnabled()) {
				log.debug("自动检测到的数据库类型为: " + databaseType);
			}
		}
	}

	/**
	 * <pre>
	 * 生成分页SQL
	 * </pre>
	 * 
	 * @param page
	 * @param sql
	 * @return
	 */
	protected String buildPageSql(PageInfoBean page, String sql) {
		if (MYSQL.equalsIgnoreCase(databaseType)) {
			return buildMysqlPageSql(page, sql);
		} else if (ORACLE.equalsIgnoreCase(databaseType)) {
			return buildOraclePageSql(page, sql);
		}
		return sql;
	}

	/**
	 * <pre>
	 * 生成Mysql分页查询SQL
	 * </pre>
	 * 
	 * @param page
	 * @param sql
	 * @return
	 */
	protected String buildMysqlPageSql(PageInfoBean page, String sql) {
		// 计算第一条记录的位置，Mysql中记录的位置是从0开始的。
		int offset = (page.getPageNumber() - 1) * page.getPageSize();
		return new StringBuilder(sql).append(" limit ").append(offset).append(",").append(page.getPageSize()).toString();
	}

	/**
	 * <pre>
	 * 生成Oracle分页查询SQL
	 * </pre>
	 * 
	 * @param page
	 * @param sql
	 * @return
	 */
	protected String buildOraclePageSql(PageInfoBean page, String sql) {
		// 计算第一条记录的位置，Oracle分页是通过rownum进行的，而rownum是从1开始的
		int offset = (page.getPageNumber() - 1) * page.getPageSize() + 1;
		StringBuilder sb = new StringBuilder(sql);
		sb.insert(0, "select u.*, rownum r from (").append(") u where rownum < ").append(offset + page.getPageSize());
		sb.insert(0, "select * from (").append(") where r >= ").append(offset);
		return sb.toString();
	}

	/**
	 * <pre>
	 * 查询总数
	 * </pre>
	 * 
	 * @param page
	 * @param parameterObject
	 * @param mappedStatement
	 * @param connection
	 * @throws SQLException
	 */
	protected void queryTotalRecord(PageInfoBean page, Object parameterObject, MappedStatement mappedStatement, Connection connection) throws SQLException {
		BoundSql boundSql = mappedStatement.getBoundSql(parameterObject);
		String sql = boundSql.getSql();
		String countSql = this.buildCountSql(sql);
		if (log.isDebugEnabled()) {
			log.debug("分页时, 生成countSql: " + countSql);
		}

		List<ParameterMapping> parameterMappings = boundSql.getParameterMappings();
		BoundSql countBoundSql = new BoundSql(mappedStatement.getConfiguration(), countSql, parameterMappings, parameterObject);
		ParameterHandler parameterHandler = new DefaultParameterHandler(mappedStatement, parameterObject, countBoundSql);
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		try {
			pstmt = connection.prepareStatement(countSql);
			parameterHandler.setParameters(pstmt);
			rs = pstmt.executeQuery();
			if (rs.next()) {
				int totalRecord = rs.getInt(1);
				page.setTotalRecord(totalRecord);
			}
		} finally {
			if (rs != null)
				try {
					rs.close();
				} catch (Exception e) {
					if (log.isWarnEnabled()) {
						log.warn("关闭ResultSet时异常.", e);
					}
				}
			if (pstmt != null)
				try {
					pstmt.close();
				} catch (Exception e) {
					if (log.isWarnEnabled()) {
						log.warn("关闭PreparedStatement时异常.", e);
					}
				}
		}
	}

	/**
	 * 根据原Sql语句获取对应的查询总记录数的Sql语句
	 * 
	 * @param sql
	 * @return
	 */
	protected String buildCountSql(String sql) {
		// sql中包含union的联合查询
		if (sql.toLowerCase().contains("union"))
		{
			return "select count(0) from (" + sql + ") temp";
		}
		else
		{
			return "select count(*) " + sql.substring(sql.indexOf("from"));
		}
		
	}

	/**
	 * 利用反射进行操作的一个工具类
	 * 
	 */
	private static class ReflectUtil {
		/**
		 * 利用反射获取指定对象的指定属性
		 * 
		 * @param obj 目标对象
		 * @param fieldName 目标属性
		 * @return 目标属性的值
		 */
		public static Object getFieldValue(Object obj, String fieldName) {
			Object result = null;
			Field field = ReflectUtil.getField(obj, fieldName);
			if (field != null) {
				field.setAccessible(true);
				try {
					result = field.get(obj);
				} catch (IllegalArgumentException e) {
					log.warn("IllegalArgumentException", e);
				} catch (IllegalAccessException e) {
					log.warn("IllegalAccessException", e);
				}
			}
			return result;
		}

		/**
		 * 利用反射获取指定对象里面的指定属性
		 * 
		 * @param obj 目标对象
		 * @param fieldName 目标属性
		 * @return 目标字段
		 */
		private static Field getField(Object obj, String fieldName) {
			Field field = null;
			for (Class<?> clazz = obj.getClass(); clazz != Object.class; clazz = clazz.getSuperclass()) {
				try {
					field = clazz.getDeclaredField(fieldName);
					break;
				} catch (NoSuchFieldException e) {
					// 这里不用做处理，子类没有该字段可能对应的父类有，都没有就返回null。
				}
			}
			return field;
		}

		/**
		 * 利用反射设置指定对象的指定属性为指定的值
		 * 
		 * @param obj 目标对象
		 * @param fieldName 目标属性
		 * @param fieldValue 目标值
		 */
		public static void setFieldValue(Object obj, String fieldName, String fieldValue) {
			Field field = ReflectUtil.getField(obj, fieldName);
			if (field != null) {
				try {
					field.setAccessible(true);
					field.set(obj, fieldValue);
				} catch (IllegalArgumentException e) {
					log.warn("IllegalArgumentException", e);
				} catch (IllegalAccessException e) {
					log.warn("IllegalAccessException", e);
				}
			}
		}
	}

	public static class PageNotSupportException extends RuntimeException {

		/**
		 * 
		 */
		private static final long serialVersionUID = 1L;

		public PageNotSupportException() {
			super();
		}

		public PageNotSupportException(String message, Throwable cause) {
			super(message, cause);
		}

		public PageNotSupportException(String message) {
			super(message);
		}

		public PageNotSupportException(Throwable cause) {
			super(cause);
		}
		
	}

}
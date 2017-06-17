package com.ut.scf.dao.auto;

import com.ut.scf.pojo.auto.AgencyProcessInfo;
import com.ut.scf.pojo.auto.AgencyProcessInfoExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface AgencyProcessInfoMapper {

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table agency_process_info
	 * @mbggenerated  Fri Jun 16 16:02:31 CST 2017
	 */
	int countByExample(AgencyProcessInfoExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table agency_process_info
	 * @mbggenerated  Fri Jun 16 16:02:31 CST 2017
	 */
	int deleteByExample(AgencyProcessInfoExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table agency_process_info
	 * @mbggenerated  Fri Jun 16 16:02:31 CST 2017
	 */
	int deleteByPrimaryKey(String corpId);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table agency_process_info
	 * @mbggenerated  Fri Jun 16 16:02:31 CST 2017
	 */
	int insert(AgencyProcessInfo record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table agency_process_info
	 * @mbggenerated  Fri Jun 16 16:02:31 CST 2017
	 */
	int insertSelective(AgencyProcessInfo record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table agency_process_info
	 * @mbggenerated  Fri Jun 16 16:02:31 CST 2017
	 */
	List<AgencyProcessInfo> selectByExample(AgencyProcessInfoExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table agency_process_info
	 * @mbggenerated  Fri Jun 16 16:02:31 CST 2017
	 */
	AgencyProcessInfo selectByPrimaryKey(String corpId);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table agency_process_info
	 * @mbggenerated  Fri Jun 16 16:02:31 CST 2017
	 */
	int updateByExampleSelective(@Param("record") AgencyProcessInfo record,
			@Param("example") AgencyProcessInfoExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table agency_process_info
	 * @mbggenerated  Fri Jun 16 16:02:31 CST 2017
	 */
	int updateByExample(@Param("record") AgencyProcessInfo record,
			@Param("example") AgencyProcessInfoExample example);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table agency_process_info
	 * @mbggenerated  Fri Jun 16 16:02:31 CST 2017
	 */
	int updateByPrimaryKeySelective(AgencyProcessInfo record);

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table agency_process_info
	 * @mbggenerated  Fri Jun 16 16:02:31 CST 2017
	 */
	int updateByPrimaryKey(AgencyProcessInfo record);
}
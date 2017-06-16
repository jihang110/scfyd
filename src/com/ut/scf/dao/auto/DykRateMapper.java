package com.ut.scf.dao.auto;

import com.ut.scf.pojo.auto.DykRate;
import com.ut.scf.pojo.auto.DykRateExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface DykRateMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table dyk_rate
     *
     * @mbggenerated Thu May 25 19:28:42 CST 2017
     */
    int countByExample(DykRateExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table dyk_rate
     *
     * @mbggenerated Thu May 25 19:28:42 CST 2017
     */
    int deleteByExample(DykRateExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table dyk_rate
     *
     * @mbggenerated Thu May 25 19:28:42 CST 2017
     */
    int deleteByPrimaryKey(String recUid);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table dyk_rate
     *
     * @mbggenerated Thu May 25 19:28:42 CST 2017
     */
    int insert(DykRate record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table dyk_rate
     *
     * @mbggenerated Thu May 25 19:28:42 CST 2017
     */
    int insertSelective(DykRate record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table dyk_rate
     *
     * @mbggenerated Thu May 25 19:28:42 CST 2017
     */
    List<DykRate> selectByExample(DykRateExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table dyk_rate
     *
     * @mbggenerated Thu May 25 19:28:42 CST 2017
     */
    DykRate selectByPrimaryKey(String recUid);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table dyk_rate
     *
     * @mbggenerated Thu May 25 19:28:42 CST 2017
     */
    int updateByExampleSelective(@Param("record") DykRate record, @Param("example") DykRateExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table dyk_rate
     *
     * @mbggenerated Thu May 25 19:28:42 CST 2017
     */
    int updateByExample(@Param("record") DykRate record, @Param("example") DykRateExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table dyk_rate
     *
     * @mbggenerated Thu May 25 19:28:42 CST 2017
     */
    int updateByPrimaryKeySelective(DykRate record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table dyk_rate
     *
     * @mbggenerated Thu May 25 19:28:42 CST 2017
     */
    int updateByPrimaryKey(DykRate record);
}
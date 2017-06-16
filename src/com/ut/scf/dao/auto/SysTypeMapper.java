package com.ut.scf.dao.auto;

import com.ut.scf.pojo.auto.SysType;
import com.ut.scf.pojo.auto.SysTypeExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface SysTypeMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sys_type
     *
     * @mbggenerated Tue May 16 16:37:24 CST 2017
     */
    int countByExample(SysTypeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sys_type
     *
     * @mbggenerated Tue May 16 16:37:24 CST 2017
     */
    int deleteByExample(SysTypeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sys_type
     *
     * @mbggenerated Tue May 16 16:37:24 CST 2017
     */
    int deleteByPrimaryKey(Short typeId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sys_type
     *
     * @mbggenerated Tue May 16 16:37:24 CST 2017
     */
    int insert(SysType record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sys_type
     *
     * @mbggenerated Tue May 16 16:37:24 CST 2017
     */
    int insertSelective(SysType record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sys_type
     *
     * @mbggenerated Tue May 16 16:37:24 CST 2017
     */
    List<SysType> selectByExample(SysTypeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sys_type
     *
     * @mbggenerated Tue May 16 16:37:24 CST 2017
     */
    SysType selectByPrimaryKey(Short typeId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sys_type
     *
     * @mbggenerated Tue May 16 16:37:24 CST 2017
     */
    int updateByExampleSelective(@Param("record") SysType record, @Param("example") SysTypeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sys_type
     *
     * @mbggenerated Tue May 16 16:37:24 CST 2017
     */
    int updateByExample(@Param("record") SysType record, @Param("example") SysTypeExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sys_type
     *
     * @mbggenerated Tue May 16 16:37:24 CST 2017
     */
    int updateByPrimaryKeySelective(SysType record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sys_type
     *
     * @mbggenerated Tue May 16 16:37:24 CST 2017
     */
    int updateByPrimaryKey(SysType record);
}
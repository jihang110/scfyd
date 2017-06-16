package com.ut.scf.dao.auto;

import com.ut.scf.pojo.auto.CorpInfo;
import com.ut.scf.pojo.auto.CorpInfoExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface CorpInfoMapper {
    int countByExample(CorpInfoExample example);

    int deleteByExample(CorpInfoExample example);

    int deleteByPrimaryKey(String corpId);

    int insert(CorpInfo record);

    int insertSelective(CorpInfo record);

    List<CorpInfo> selectByExample(CorpInfoExample example);

    CorpInfo selectByPrimaryKey(String corpId);

    int updateByExampleSelective(@Param("record") CorpInfo record, @Param("example") CorpInfoExample example);

    int updateByExample(@Param("record") CorpInfo record, @Param("example") CorpInfoExample example);

    int updateByPrimaryKeySelective(CorpInfo record);

    int updateByPrimaryKey(CorpInfo record);
}
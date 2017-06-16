package com.ut.scf.service.sys.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ut.scf.dao.auto.AgencySequenceMapper;
import com.ut.scf.pojo.auto.AgencySequence;
import com.ut.scf.pojo.auto.AgencySequenceExample;
import com.ut.scf.service.sys.ISequenceService;

@Service("sequenceService")
public class SequenceServiceImpl implements ISequenceService {
	@Resource
	private AgencySequenceMapper agencySequenceMapper;

	private static final String rz = "YDBL2017RZ0017-";
	private static final String yw = "YDBL2017YW0017-";
	private static final String fk = "YDBL2017FK0017-";

	/***
	 * agencyNum:经销商id type：编号类型 rz：融资管理 yw：合同管理 fk:付款承诺函
	 * 
	 */
	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public String getNextSequence(String corpId, String type) {
		String agencySequence = findSequence(corpId, type);
		if ("rz".equalsIgnoreCase(type)) {
			agencySequence = rz + agencySequence;
		} else if ("yw".equalsIgnoreCase(type)) {
			agencySequence = yw + agencySequence;
		} else if ("fk".equalsIgnoreCase(type)) {
			agencySequence = fk + agencySequence;
		}

		return agencySequence;
	}

	private String findSequence(String corpId, String type) {
		AgencySequence agencySequence = agencySequenceMapper
				.selectByPrimaryKey(corpId);
		if (agencySequence == null) {
			AgencySequenceExample example = new AgencySequenceExample();
			example.setOrderByClause("agency_first desc");
			List<AgencySequence> list = agencySequenceMapper
					.selectByExample(example);

			AgencySequence sequence = new AgencySequence();
			int agencyFirst = 1;
			sequence.setCorpId(corpId);
			if (!CollectionUtils.isEmpty(list)) {
				agencyFirst = list.get(0).getAgencyFirst() + 1;
			}
			sequence.setAgencyFirst((byte) agencyFirst);
			sequence.setAgencySecend((byte) 0);
			sequence.setAgencySecendFk((byte) 0);
			agencySequenceMapper.insert(sequence);
			agencySequence = sequence;
		}

		String strFirst = String
				.format("%02d", agencySequence.getAgencyFirst());
		if ("rz".equalsIgnoreCase(type)) {
			int secend = agencySequence.getAgencySecend();
			secend += 1;
			if (secend > 99) {
				secend = 1;
			}
			String strSecend = String.format("%02d", secend);
			agencySequence.setAgencySecend((byte) secend);
			agencySequenceMapper.updateByPrimaryKeySelective(agencySequence);
			return strFirst + "-" + strSecend;
		} else if ("fk".equalsIgnoreCase(type)) {
			int secendFK = agencySequence.getAgencySecendFk();
			secendFK += 1;
			if (secendFK > 99) {
				secendFK = 1;
			}
			String strSecend = String.format("%02d", secendFK);
			agencySequence.setAgencySecendFk((byte) secendFK);
			agencySequenceMapper.updateByPrimaryKeySelective(agencySequence);
			return strFirst + "-" + strSecend;
		}

		return strFirst;
	}
}

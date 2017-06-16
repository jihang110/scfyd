package com.scf.service.test.pub;

import org.activiti.engine.impl.util.json.JSONObject;
import org.junit.Test;

import com.ut.scf.pojo.auto.CorpInfo;

public class activiti {

	@Test
	public void bean2String() {
		CorpInfo corpInfo = new CorpInfo();
		corpInfo.setAgencyNum("1");
		corpInfo.setCorpId("dfdfdfdee");
		corpInfo.setCorpName("到机房后后");
		JSONObject jsonObject = new JSONObject(corpInfo);
		String str = jsonObject.toString();
		System.out.println(str);
	}

}

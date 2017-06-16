package com.ut.scf.web.scheduled;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.ut.scf.dao.sys.IUserDao;

/**
 * @author sll
 * 
 * 费用到期预警定时任务
 *
 */
@Service("expenseExpireJob")
public class ExpenseExpireJob {

	@Resource
	private IUserDao userDao;
	
	private static final Logger log = LoggerFactory
			.getLogger(ExpenseExpireJob.class);
	
	public void job() {
        log.info("ExpenseExpireJob start......");
        log.info(userDao.callExpenseExpireProcedure().toString());
        log.info("ExpenseExpireJob end......");
    }

}

package com.ut.scf.pojo.auto;

import java.util.ArrayList;
import java.util.List;

public class RepaymentFinanceBatchExample {
    /**
	 * This field was generated by MyBatis Generator. This field corresponds to the database table repayment_finance_batch
	 * @mbggenerated  Sat Jun 10 10:51:56 CST 2017
	 */
	protected String orderByClause;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database table repayment_finance_batch
	 * @mbggenerated  Sat Jun 10 10:51:56 CST 2017
	 */
	protected boolean distinct;
	/**
	 * This field was generated by MyBatis Generator. This field corresponds to the database table repayment_finance_batch
	 * @mbggenerated  Sat Jun 10 10:51:56 CST 2017
	 */
	protected List<Criteria> oredCriteria;

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table repayment_finance_batch
	 * @mbggenerated  Sat Jun 10 10:51:56 CST 2017
	 */
	public RepaymentFinanceBatchExample() {
		oredCriteria = new ArrayList<Criteria>();
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table repayment_finance_batch
	 * @mbggenerated  Sat Jun 10 10:51:56 CST 2017
	 */
	public void setOrderByClause(String orderByClause) {
		this.orderByClause = orderByClause;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table repayment_finance_batch
	 * @mbggenerated  Sat Jun 10 10:51:56 CST 2017
	 */
	public String getOrderByClause() {
		return orderByClause;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table repayment_finance_batch
	 * @mbggenerated  Sat Jun 10 10:51:56 CST 2017
	 */
	public void setDistinct(boolean distinct) {
		this.distinct = distinct;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table repayment_finance_batch
	 * @mbggenerated  Sat Jun 10 10:51:56 CST 2017
	 */
	public boolean isDistinct() {
		return distinct;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table repayment_finance_batch
	 * @mbggenerated  Sat Jun 10 10:51:56 CST 2017
	 */
	public List<Criteria> getOredCriteria() {
		return oredCriteria;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table repayment_finance_batch
	 * @mbggenerated  Sat Jun 10 10:51:56 CST 2017
	 */
	public void or(Criteria criteria) {
		oredCriteria.add(criteria);
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table repayment_finance_batch
	 * @mbggenerated  Sat Jun 10 10:51:56 CST 2017
	 */
	public Criteria or() {
		Criteria criteria = createCriteriaInternal();
		oredCriteria.add(criteria);
		return criteria;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table repayment_finance_batch
	 * @mbggenerated  Sat Jun 10 10:51:56 CST 2017
	 */
	public Criteria createCriteria() {
		Criteria criteria = createCriteriaInternal();
		if (oredCriteria.size() == 0) {
			oredCriteria.add(criteria);
		}
		return criteria;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table repayment_finance_batch
	 * @mbggenerated  Sat Jun 10 10:51:56 CST 2017
	 */
	protected Criteria createCriteriaInternal() {
		Criteria criteria = new Criteria();
		return criteria;
	}

	/**
	 * This method was generated by MyBatis Generator. This method corresponds to the database table repayment_finance_batch
	 * @mbggenerated  Sat Jun 10 10:51:56 CST 2017
	 */
	public void clear() {
		oredCriteria.clear();
		orderByClause = null;
		distinct = false;
	}

	/**
	 * This class was generated by MyBatis Generator. This class corresponds to the database table repayment_finance_batch
	 * @mbggenerated  Sat Jun 10 10:51:56 CST 2017
	 */
	protected abstract static class GeneratedCriteria {
		protected List<Criterion> criteria;

		protected GeneratedCriteria() {
			super();
			criteria = new ArrayList<Criterion>();
		}

		public boolean isValid() {
			return criteria.size() > 0;
		}

		public List<Criterion> getAllCriteria() {
			return criteria;
		}

		public List<Criterion> getCriteria() {
			return criteria;
		}

		protected void addCriterion(String condition) {
			if (condition == null) {
				throw new RuntimeException("Value for condition cannot be null");
			}
			criteria.add(new Criterion(condition));
		}

		protected void addCriterion(String condition, Object value,
				String property) {
			if (value == null) {
				throw new RuntimeException("Value for " + property
						+ " cannot be null");
			}
			criteria.add(new Criterion(condition, value));
		}

		protected void addCriterion(String condition, Object value1,
				Object value2, String property) {
			if (value1 == null || value2 == null) {
				throw new RuntimeException("Between values for " + property
						+ " cannot be null");
			}
			criteria.add(new Criterion(condition, value1, value2));
		}

		public Criteria andRecUidIsNull() {
			addCriterion("rec_uid is null");
			return (Criteria) this;
		}

		public Criteria andRecUidIsNotNull() {
			addCriterion("rec_uid is not null");
			return (Criteria) this;
		}

		public Criteria andRecUidEqualTo(String value) {
			addCriterion("rec_uid =", value, "recUid");
			return (Criteria) this;
		}

		public Criteria andRecUidNotEqualTo(String value) {
			addCriterion("rec_uid <>", value, "recUid");
			return (Criteria) this;
		}

		public Criteria andRecUidGreaterThan(String value) {
			addCriterion("rec_uid >", value, "recUid");
			return (Criteria) this;
		}

		public Criteria andRecUidGreaterThanOrEqualTo(String value) {
			addCriterion("rec_uid >=", value, "recUid");
			return (Criteria) this;
		}

		public Criteria andRecUidLessThan(String value) {
			addCriterion("rec_uid <", value, "recUid");
			return (Criteria) this;
		}

		public Criteria andRecUidLessThanOrEqualTo(String value) {
			addCriterion("rec_uid <=", value, "recUid");
			return (Criteria) this;
		}

		public Criteria andRecUidLike(String value) {
			addCriterion("rec_uid like", value, "recUid");
			return (Criteria) this;
		}

		public Criteria andRecUidNotLike(String value) {
			addCriterion("rec_uid not like", value, "recUid");
			return (Criteria) this;
		}

		public Criteria andRecUidIn(List<String> values) {
			addCriterion("rec_uid in", values, "recUid");
			return (Criteria) this;
		}

		public Criteria andRecUidNotIn(List<String> values) {
			addCriterion("rec_uid not in", values, "recUid");
			return (Criteria) this;
		}

		public Criteria andRecUidBetween(String value1, String value2) {
			addCriterion("rec_uid between", value1, value2, "recUid");
			return (Criteria) this;
		}

		public Criteria andRecUidNotBetween(String value1, String value2) {
			addCriterion("rec_uid not between", value1, value2, "recUid");
			return (Criteria) this;
		}

		public Criteria andRepaymentIdIsNull() {
			addCriterion("repayment_id is null");
			return (Criteria) this;
		}

		public Criteria andRepaymentIdIsNotNull() {
			addCriterion("repayment_id is not null");
			return (Criteria) this;
		}

		public Criteria andRepaymentIdEqualTo(String value) {
			addCriterion("repayment_id =", value, "repaymentId");
			return (Criteria) this;
		}

		public Criteria andRepaymentIdNotEqualTo(String value) {
			addCriterion("repayment_id <>", value, "repaymentId");
			return (Criteria) this;
		}

		public Criteria andRepaymentIdGreaterThan(String value) {
			addCriterion("repayment_id >", value, "repaymentId");
			return (Criteria) this;
		}

		public Criteria andRepaymentIdGreaterThanOrEqualTo(String value) {
			addCriterion("repayment_id >=", value, "repaymentId");
			return (Criteria) this;
		}

		public Criteria andRepaymentIdLessThan(String value) {
			addCriterion("repayment_id <", value, "repaymentId");
			return (Criteria) this;
		}

		public Criteria andRepaymentIdLessThanOrEqualTo(String value) {
			addCriterion("repayment_id <=", value, "repaymentId");
			return (Criteria) this;
		}

		public Criteria andRepaymentIdLike(String value) {
			addCriterion("repayment_id like", value, "repaymentId");
			return (Criteria) this;
		}

		public Criteria andRepaymentIdNotLike(String value) {
			addCriterion("repayment_id not like", value, "repaymentId");
			return (Criteria) this;
		}

		public Criteria andRepaymentIdIn(List<String> values) {
			addCriterion("repayment_id in", values, "repaymentId");
			return (Criteria) this;
		}

		public Criteria andRepaymentIdNotIn(List<String> values) {
			addCriterion("repayment_id not in", values, "repaymentId");
			return (Criteria) this;
		}

		public Criteria andRepaymentIdBetween(String value1, String value2) {
			addCriterion("repayment_id between", value1, value2, "repaymentId");
			return (Criteria) this;
		}

		public Criteria andRepaymentIdNotBetween(String value1, String value2) {
			addCriterion("repayment_id not between", value1, value2,
					"repaymentId");
			return (Criteria) this;
		}

		public Criteria andFinanceIdIsNull() {
			addCriterion("finance_id is null");
			return (Criteria) this;
		}

		public Criteria andFinanceIdIsNotNull() {
			addCriterion("finance_id is not null");
			return (Criteria) this;
		}

		public Criteria andFinanceIdEqualTo(String value) {
			addCriterion("finance_id =", value, "financeId");
			return (Criteria) this;
		}

		public Criteria andFinanceIdNotEqualTo(String value) {
			addCriterion("finance_id <>", value, "financeId");
			return (Criteria) this;
		}

		public Criteria andFinanceIdGreaterThan(String value) {
			addCriterion("finance_id >", value, "financeId");
			return (Criteria) this;
		}

		public Criteria andFinanceIdGreaterThanOrEqualTo(String value) {
			addCriterion("finance_id >=", value, "financeId");
			return (Criteria) this;
		}

		public Criteria andFinanceIdLessThan(String value) {
			addCriterion("finance_id <", value, "financeId");
			return (Criteria) this;
		}

		public Criteria andFinanceIdLessThanOrEqualTo(String value) {
			addCriterion("finance_id <=", value, "financeId");
			return (Criteria) this;
		}

		public Criteria andFinanceIdLike(String value) {
			addCriterion("finance_id like", value, "financeId");
			return (Criteria) this;
		}

		public Criteria andFinanceIdNotLike(String value) {
			addCriterion("finance_id not like", value, "financeId");
			return (Criteria) this;
		}

		public Criteria andFinanceIdIn(List<String> values) {
			addCriterion("finance_id in", values, "financeId");
			return (Criteria) this;
		}

		public Criteria andFinanceIdNotIn(List<String> values) {
			addCriterion("finance_id not in", values, "financeId");
			return (Criteria) this;
		}

		public Criteria andFinanceIdBetween(String value1, String value2) {
			addCriterion("finance_id between", value1, value2, "financeId");
			return (Criteria) this;
		}

		public Criteria andFinanceIdNotBetween(String value1, String value2) {
			addCriterion("finance_id not between", value1, value2, "financeId");
			return (Criteria) this;
		}

		public Criteria andCarFrameNumIsNull() {
			addCriterion("car_frame_num is null");
			return (Criteria) this;
		}

		public Criteria andCarFrameNumIsNotNull() {
			addCriterion("car_frame_num is not null");
			return (Criteria) this;
		}

		public Criteria andCarFrameNumEqualTo(String value) {
			addCriterion("car_frame_num =", value, "carFrameNum");
			return (Criteria) this;
		}

		public Criteria andCarFrameNumNotEqualTo(String value) {
			addCriterion("car_frame_num <>", value, "carFrameNum");
			return (Criteria) this;
		}

		public Criteria andCarFrameNumGreaterThan(String value) {
			addCriterion("car_frame_num >", value, "carFrameNum");
			return (Criteria) this;
		}

		public Criteria andCarFrameNumGreaterThanOrEqualTo(String value) {
			addCriterion("car_frame_num >=", value, "carFrameNum");
			return (Criteria) this;
		}

		public Criteria andCarFrameNumLessThan(String value) {
			addCriterion("car_frame_num <", value, "carFrameNum");
			return (Criteria) this;
		}

		public Criteria andCarFrameNumLessThanOrEqualTo(String value) {
			addCriterion("car_frame_num <=", value, "carFrameNum");
			return (Criteria) this;
		}

		public Criteria andCarFrameNumLike(String value) {
			addCriterion("car_frame_num like", value, "carFrameNum");
			return (Criteria) this;
		}

		public Criteria andCarFrameNumNotLike(String value) {
			addCriterion("car_frame_num not like", value, "carFrameNum");
			return (Criteria) this;
		}

		public Criteria andCarFrameNumIn(List<String> values) {
			addCriterion("car_frame_num in", values, "carFrameNum");
			return (Criteria) this;
		}

		public Criteria andCarFrameNumNotIn(List<String> values) {
			addCriterion("car_frame_num not in", values, "carFrameNum");
			return (Criteria) this;
		}

		public Criteria andCarFrameNumBetween(String value1, String value2) {
			addCriterion("car_frame_num between", value1, value2, "carFrameNum");
			return (Criteria) this;
		}

		public Criteria andCarFrameNumNotBetween(String value1, String value2) {
			addCriterion("car_frame_num not between", value1, value2,
					"carFrameNum");
			return (Criteria) this;
		}
	}

	/**
	 * This class was generated by MyBatis Generator. This class corresponds to the database table repayment_finance_batch
	 * @mbggenerated  Sat Jun 10 10:51:56 CST 2017
	 */
	public static class Criterion {
		private String condition;
		private Object value;
		private Object secondValue;
		private boolean noValue;
		private boolean singleValue;
		private boolean betweenValue;
		private boolean listValue;
		private String typeHandler;

		public String getCondition() {
			return condition;
		}

		public Object getValue() {
			return value;
		}

		public Object getSecondValue() {
			return secondValue;
		}

		public boolean isNoValue() {
			return noValue;
		}

		public boolean isSingleValue() {
			return singleValue;
		}

		public boolean isBetweenValue() {
			return betweenValue;
		}

		public boolean isListValue() {
			return listValue;
		}

		public String getTypeHandler() {
			return typeHandler;
		}

		protected Criterion(String condition) {
			super();
			this.condition = condition;
			this.typeHandler = null;
			this.noValue = true;
		}

		protected Criterion(String condition, Object value, String typeHandler) {
			super();
			this.condition = condition;
			this.value = value;
			this.typeHandler = typeHandler;
			if (value instanceof List<?>) {
				this.listValue = true;
			} else {
				this.singleValue = true;
			}
		}

		protected Criterion(String condition, Object value) {
			this(condition, value, null);
		}

		protected Criterion(String condition, Object value, Object secondValue,
				String typeHandler) {
			super();
			this.condition = condition;
			this.value = value;
			this.secondValue = secondValue;
			this.typeHandler = typeHandler;
			this.betweenValue = true;
		}

		protected Criterion(String condition, Object value, Object secondValue) {
			this(condition, value, secondValue, null);
		}
	}

	/**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table repayment_finance_batch
     *
     * @mbggenerated do_not_delete_during_merge Fri Jun 09 13:24:52 CST 2017
     */
    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }
}
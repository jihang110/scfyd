/** 
 * 流程管理前端公共js
 * @author jiangl
 * @date:  2016-12-22 
 */
(function ($){
    //全局对象
    window['FlowMngCommon'] = {};
    
    /**
	 * 流程一览初始化（未结、已结）
	 * 
	 * @param tableId
	 *            列表ID
	 * @param method
	 *            后台执行方法
	 * @param flowType
	 *            流程类别：'NOT'-未结流程;'OVER'-已结流程
	 */
    FlowMngCommon.initTable = function(tableId, method, flowType) {
    	$('#' + tableId)
    		.bootstrapTable('destroy')
    		.bootstrapTable({
	             method: "post", 
	             url: "../../workflow/" + method, 
	             striped: false,  //表格显示条纹  
	             pagination: true, //启动分页  
	             pageSize: 5,  //每页显示的记录数  
	             pageNumber:1, //当前第几页  
	             pageList: [5, 10, 15, 20, 25],  //记录数可选列表  
	             search: false,  //是否启用查询  
	             showColumns: false,  //显示下拉框勾选要显示的列  
	             showRefresh: false,  //显示刷新按钮  
	             sidePagination: "server", //表示服务端请求  
	             //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
	             //设置为limit可以获取limit, offset, search, sort, order  
	             queryParamsType : "undefined",   
	             queryParams: function queryParams(params) {   //设置查询参数 
	               var procInsName;
	               var startTime;
	               var endTime;
	               var v_procInsName = $("#procInsName").val();
	               var v_createTime = $("#createTime").val();
	               // 流程实例名称
	               if (CloudUtils.isEmpty(v_procInsName)) {
	            	   procInsName = "";
	               } else {
	            	   procInsName = $("#procInsName").find("option:selected").text();
	               }
	               // 创建时间from-to
	               if (CloudUtils.isEmpty(v_createTime)) {
	            	   startTime = "";
	            	   endTime = "";
	               } else {
	            	   var array = v_createTime.split(' - ');
	            	   startTime = array[0];
	            	   endTime = array[1];
	               }
	               var param = {    
	                   pageNumber: params.pageNumber,
	                   pageSize: params.pageSize,
	                   username: store.get('username'),
	                   corpId: store.get('corpId'),
	                   projectName: $("#projectName").val(),
	                   procInsName: procInsName,
	                   startTime: startTime,
	                   endTime: endTime
	               }
	               if (flowType == "OVER") {
	            	   param.priState = $("#priState").val();
	               }
	               return JSON.stringify(param);
	             },  
	             responseHandler:function responseHandler(res) {
	            	 if (res.result==0) {
	    	        	 return {
	    	        		 "rows": res.dataList,
	    	        		 "total": res.records
	    	        	 };
	
	            	 } else {
	            		 bootbox.alert(res.resultNote);
	            		 return {
	    			        	 "rows": [],
	    			        	 "total": 0
	    			        	 };
	            	 }
	             },
	             columns: [{
	     	        field: 'procInsId',
	     	        title: '流程实例ID',
	     	        align: 'center',
	                valign: 'middle',
	                visible: false
	     	     }, {
	     	        field: 'proName',
	     	        title: '项目名称',
	     	        align: 'center',
	                valign: 'middle',
	                formatter:function(value, row, index) {
	     	            return '<a class="procDetail" style="color:#a9d86e;padding:0px 5px;" title="详情" href="javascript:void(0)">'+value+'</a>';
	     	        },
	     	        events: 'operateEvents'
	     	     }, {
	     	        field: 'procInsName',
	     	        title: '流程定义',
	     	        align: 'center',
	                valign: 'middle'
	     	     }, {
	     	        field: 'createDate',
	     	        title: '创建时间',
	     	        align: 'center',
	                valign: 'middle'
	     	     }, {
	     	        field: 'endDate',
	     	        title: '结束时间',
	     	        align: 'center',
	                valign: 'middle',
	                visible: flowType == 'OVER'
	     	     }, {
	     	        field: 'continueDate',
	     	        title: '持续时间',
	     	        align: 'center',
	                valign: 'middle',
	                visible: flowType == 'OVER',
	                formatter:function(value, row, index) {
	                	return CloudUtils.dateSub(row.createDate, row.endDate);
	                }
	     	     }, {
	     	        field: 'status',
	     	        title: '项目状态',
	     	        align: 'center',
	                valign: 'middle'
	     	     }, {
	     	        field: 'monitorUrl',
	     	        title: '状态图',
	     	        align: 'center',
	                valign: 'middle',
	                formatter:function(value, row, index) {
	     	            return '<a class = "fa fa-eye" style="color:#1c4efa;padding:0px 5px;" title="预览" href="'+ value + row.procInsId +'" target="_blank"></a>';
	     	        },
	     	        events: 'operateEvents'
	     	     }, {
	     	        field: 'operation',
	     	        title: '操作',
	     	        align: 'center',
	                valign: 'middle',
	                visible: flowType == 'NOT',
	                formatter:function(value, row, index) {
	     	            return '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" title="终止" href="javascript:void(0)"></a>';
	     	        },
	     	        events: 'operateEvents'
	     	     }]
        });
    };
    
    /**
	 * 项目详情一览初始化
	 * 
	 * @param procInsId
	 *            流程实例ID
	 * @param flowType
	 *            流程类别：'NOT'-未结流程;'OVER'-已结流程
	 */
    FlowMngCommon.initDetailTable = function(modalId, procInsId, flowType) {
    	$('#'+modalId+'Table')
    		.bootstrapTable('destroy')
    		.bootstrapTable({
	             method: "post", 
	             url: "../../workflow/detail",
	             striped: false,  //表格显示条纹  
	             pagination: false, //启动分页  
	             search: false,  //是否启用查询  
	             showColumns: false,  //显示下拉框勾选要显示的列  
	             showRefresh: false,  //显示刷新按钮  
	             sidePagination: "server", //表示服务端请求  
	             //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
	             //设置为limit可以获取limit, offset, search, sort, order  
	             queryParamsType : "undefined",   
	             queryParams: function queryParams() {   //设置查询参数  
	               var param = {
	            	   procInsId : procInsId
	               };    
	               return JSON.stringify(param);
	             },  
	             responseHandler:function responseHandler(res) {
	            	 if (res.result==0) {
	            		 if (flowType == 'NOT') {
	            			 if (res.operateFlg == 1) {
	                			 $("#"+modalId+"Modal #operateFooter").show();
	                			 $("#"+modalId+"Modal #procInsId").val(procInsId);
	                			 $("#"+modalId+"Modal #workItemId").val(res.workItemId);
	                			 $("#"+modalId+"Modal #stepId").val(res.stepId);
	                		 } else {
	                			 $("#"+modalId+"Modal #operateFooter").hide();
	                		 }
	            		 }
	    	        	 return {
	    	        		 "rows": res.dataList,
	    	        		 "total": res.records
	    	        	 };
	            	 } else {
	            		 if (flowType == 'NOT') {
	            			 $("#operateFooter").hide();
	            		 }
	            		 bootbox.alert(res.resultNote);
	            		 return {
	    			        	 "rows": [],
	    			        	 "total": 0
	    			        	 };
	            	 }
	             },
	             columns: [{
	     	        field: 'workItemId',
	     	        title: '工作项ID',
	     	        align: 'center',
	                valign: 'middle',
	                visible: false
	     	     }, {
	     	        field: 'procInsId',
	     	        title: '流程ID',
	     	        align: 'center',
	                valign: 'middle',
	                visible: false
	     	     }, {
	     	        field: 'advice',
	     	        title: '意见',
	     	        align: 'center',
	                valign: 'middle',
	                visible: false
	     	     }, {
	     	        field: 'stepId',
	     	        title: '步骤ID',
	     	        align: 'center',
	                valign: 'middle',
	                visible: false
	     	     }, {
	     	        field: 'name',
	     	        title: '名称',
	     	        align: 'center',
	                valign: 'middle'
	     	     }, {
	     	        field: 'startDate',
	     	        title: '开始时间',
	     	        align: 'center',
	                valign: 'middle'
	     	     },{
	     	        field: 'endDate',
	     	        title: '结束时间',
	     	        align: 'center',
	                valign: 'middle'
	     	     }, {
	     	        field: 'user',
	     	        title: '负责人',
	     	        align: 'center',
	                valign: 'middle'
	     	     }, {
	     	        field: 'status',
	     	        title: '状态',
	     	        align: 'center',
	                valign: 'middle',
	                formatter:function(value, row, index) {
	                	var content;
	                	if (value == "0") {
	                		content = '同意';
	                	} else if (value == "1") {
	                		content = '不同意';
	                	} else if (value == "2") {
	                		content = '申请';
	                	} else if (value == "3") {
	                		content = '<font color="red">待办</font>';
	                	} else if (value == "4") {
	                		content = '<font color="red">终止</font>';
	                	}
	     	            return content;
	     	        }
	     	     }, {
	     	        field: 'details',
	     	        title: '详情',
	     	        align: 'center',
	                valign: 'middle',
	                formatter:function(value, row, index) {
	                	// 待办以外的场合可以查看详情
	                	if (row.status != "3" && row.status != "4") {
	                		return '<a class="workDetail" style="color:#a9d86e;padding:0px 5px;" title="详情" href="javascript:void(0)">详情</a>';
	                	}
	                	
	                	return '';
	     	        },
	     	        events: 'operateEvents'
	     	     }]
        });
    };
    
    /**
	 * 详情点击事件
	 * 
	 * @param row
	 *            详情所在行
	 */
    FlowMngCommon.clickDetail = function(row) {
    	var modalId;
		var formId;
		var stepId = row.stepId
		var flowType = stepId.slice(0, 1);
		
		// 标准流程
		if (flowType === "N") {
			// 项目立项
			if (stepId === "N1" || stepId === "N2" || stepId === "N3") {
				modalId = "normalLblModal";
				formId = "normalLblForm";
				
				// 授信申请
			} else if (stepId === "N4") {
				modalId = "creditLblModal";
				formId = "creditLblForm";
				
				// 风控报告
			} else if (stepId === "N5" || stepId === "N6") {
				modalId = "riskCtrlLblModal";
				formId = "riskCtrlLblForm";
				
				// 合同申请
			} else if (stepId === "N7" || stepId === "N8"
				|| stepId === "N9" || stepId === "N10" || stepId === "N11") {
				modalId = "contractLblModal";
				formId = "contractLblForm";
				
				// 放款申请
			} else if (stepId === "N12" || stepId === "N13") {
				modalId = "loanLblModal";
				formId = "loanLblForm";
			}
			// 特殊事项审批,特殊事项快速审批
		} else if (flowType === "S" || flowType === "A") {
			modalId = "spMatterLblModal";
			formId = "spMatterLblForm";
			//在线申请 签约
		} else if (flowType === "O") {
			modalId = "onLineLblModal";
			formId = "onLineLblForm";
			// 融资直通车
		} else if (flowType === "B") {
			modalId = "financeLblModal";
		}
		
		$("#" + modalId).modal({backdrop: 'static', keyboard: false});
		// 意见栏
		if (modalId == "financeLblModal") {
			if (row.status == "0" || row.status == "1") {
				$("#tab6LblForm #advice").text(row.advice)
				$("#financeLblModal").find("#myTabLbl li:eq(5)").show();
			} else {
				$("#tab6LblForm #advice").text("")
				$("#financeLblModal").find("#myTabLbl li:eq(5)").hide();
			}
		} else {
			if (row.status == "0" || row.status == "1") {
				$("#" + formId + " #advice").val(row.advice);
				$("#" + formId + " #fsAdvice").show();
			} else {
				$("#" + formId + " #advice").val("");
				$("#" + formId + " #fsAdvice").hide();
			}
		}
		
		// 项目详情取得
		var options = {
				url : '../../workflow/info',
				data : JSON.stringify({
					workItemId : row.workItemId,
					procInsId : row.procInsId,
					stepId : row.stepId
				}),
				callBackFun : function(data) {
					if(data.result==0){
						// 标准流程
						if (flowType === "N") {
							// 项目立项
							if (stepId === "N1" || stepId === "N2" || stepId === "N3") {
								FlowMngCommon.detailProEst(formId, data);
								
								// 授信申请
							} else if (stepId === "N4") {
								FlowMngCommon.detailCredit(formId, data);
								
								// 风控报告
							} else if (stepId === "N5" || stepId === "N6") {
								FlowMngCommon.detailRiskCtrl(formId, data);
								
								// 合同申请
							} else if (stepId === "N7" || stepId === "N8"
								|| stepId === "N9" || stepId === "N10" || stepId === "N11") {
								FlowMngCommon.detailContract(formId, data);
								
								// 放款申请
							} else if (stepId === "N12" || stepId === "N13") {
								FlowMngCommon.detailLoan(formId, data);
							}
							// 特殊事项审批,特殊事项快速审批
						} else if (flowType === "S" || flowType === "A") {
							FlowMngCommon.detailSpMatter(formId, data);
							// 在线申请、签约
						} else if (flowType === "O") {
							FlowMngCommon.detailOnlineContract(formId, data);
							// 融资直通车
						} else if (flowType === "B") {
							FlowMngCommon.detailFinance(data);
						}
					}else{
						bootbox.alert(data.resultNote);
						return false;
					}
				},
				errorCallback:function(data){
					bootbox.alert("error");
				}
		};
		CloudUtils.ajax(options);
    };
    
    /**
     * 详情_特殊事项审批
     * @param formId 表单ID
     * @param data 详情展示用数据
     */
    FlowMngCommon.detailSpMatter = function(formId, data) {
    	var targetLbl;
    	var applyItem;
    	$.each(data, function(name, value) {
    		targetLbl = $("#" + formId + " #" + name + "Lbl");
    		// 是否有追
    		if (name == "chaseFlg") {
    			if (value == "1") {
    				targetLbl.text("是");
    			} else {
    				targetLbl.text("否");
    			}
    			// 保理类型
    		} else if (name == "factorType") {
    			if (value == "1") {
    				targetLbl.text("明保");
    			} else {
    				targetLbl.text("暗保");
    			}
    			// 申请事项
    		} else if (name == "applyItem") {
    			applyItem = value;
    			if (value == "1") {
    				targetLbl.text("展期");
    			} else if (value == "2") {
    				targetLbl.text("费用减免");
    			} else if (value == "3") {
    				targetLbl.text("转法务");
    			} else if (value == "4") {
    				targetLbl.text("其他");
    			}
    			// 还款类型
    		} else if (name == "repayType") {
    			if (value == "1") {
    				targetLbl.text("买方");
    			} else if (value == "2") {
    				targetLbl.text("卖方");
    			} else if (value == "3") {
    				targetLbl.text("间接");
    			}
    			// 是否转法务
    		} else if (name == "chgForensicFlg") {
    			if (value == "1") {
    				targetLbl.text("是");
    			} else {
    				targetLbl.text("否");
    			}
    		} else if (name == "repayAmount" || name == "reduceAmount") {
    			targetLbl.text($.number(value, 2));
    		} else {
    			targetLbl.text(value);
    		}
    	});
    	FlowMngCommon.changeApplyItemLbl(applyItem);
    };

    /**
     * 详情_融资直通车
     * @param formId 表单ID
     * @param data 详情展示用数据
     */
    FlowMngCommon.detailFinance = function(data) {
    	// 详情_立项管理
    	FlowMngCommon.detailProEst("tab1LblForm", data);
    	// 详情_授信申请
    	FlowMngCommon.detailCredit("tab2LblForm", data);
    	// 详情_风控报告
    	FlowMngCommon.detailRiskCtrl("tab3LblForm", data);
    	// 详情_合同申请
    	FlowMngCommon.detailContract("tab4LblForm", data);
    	// 详情_放款申请
    	FlowMngCommon.detailLoan("tab5LblForm", data);
    }
    
    /**
     * 详情_立项管理
     * @param formId 表单ID
     * @param data 详情展示用数据
     */
    FlowMngCommon.detailProEst = function(formId, data) {
    	var targetLbl;
    	var invNoArr = new Array();
    	var invAmtArr = new Array();
    	var invoiceArr = new Array();
    	$.each(data, function(name, value) {
    		targetLbl = $("#" + formId + " #" + name + "Lbl");
    		// 是否有追
    		if (name == "chaseFlg") {
    			if (value == "1") {
    				targetLbl.text("是");
    			} else {
    				targetLbl.text("否");
    			}
    			// 保理类型
    		} else if (name == "factorType") {
    			if (value == "1") {
    				targetLbl.text("明保");
    			} else {
    				targetLbl.text("暗保");
    			}
    			// 是否开立发票
    		} else if (name == "hasInv") {
    			if (value == "1") {
    				targetLbl.text("是");
    			} else {
    				targetLbl.text("否");
    			}
    		} else if (name == "invNo") {
    			if (!CloudUtils.isEmpty(value)) {
    				invNoArr = value.split(",");
    			}
    		} else if (name == "invAmt") {
    			if (!CloudUtils.isEmpty(value)) {
    				invAmtArr = value.split(",");
    			}
    		} else if (name == "invoice") {
    			if (!CloudUtils.isEmpty(value)) {
    				invoiceArr = value.split(",");
    			}
    		} else if (name == "billAmount"
    				|| name == "arBal" || name == "aplFacAmt") {
    			targetLbl.text($.number(value, 2));
    		} else {
    			FlowMngCommon.setFileUrl(targetLbl, value);
    		}
    	});
    	$("#" + formId + " #detailInvcDiv").empty();
    	if (invNoArr.length > 0) {
    		var invNoNum = invNoArr.length;
    		for (var i = 1; i < invNoNum + 1; i++){
    			var invoiceUrl = invoiceArr[i-1];
    			var invNoLb = invNoArr[i-1];
    			var invAmtLb = invAmtArr[i-1];
    			// 发票追加
    			var invHtml='<div class="form-group">';
    			invHtml +=	'	<label class="col-sm-4 control-label">发票'+i+'</label>';
    			if (CloudUtils.isEmpty(invoiceUrl)) {
    				invHtml +=	'	<label class="col-sm-6 control-label left"></label>';
    			} else {
    				var suffix = invoiceUrl.substring(invoiceUrl.lastIndexOf("."), invoiceUrl.length);
    				var target;
    				// 图片格式
    				if (/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(suffix)) {
    					target = "_blank";
    				} else {
    					target = "_self";
    				}
    				invHtml +=	'	<a class = "fa fa-eye" style="color:#1c4efa;padding:10px 5px;margin-left:10px;" title="附件" href="' + invoiceUrl + '" target="' + target + '"></a>';
    			}
    			invHtml +=	'</div>';
    			invHtml +=	'<div class="form-group">';
    			invHtml +=	'	<label class="col-sm-4 control-label">发票编号'+i+'</label>';
    			invHtml +=	'	<label id="invNoLbl'+i+'" class="col-sm-6 control-label left">'+invNoLb+'</label>';
    			invHtml +=	'</div>';
    			invHtml +=	'<div class="form-group">';
    			invHtml +=	'	<label class="col-sm-4 control-label">发票金额'+i+'</label>';
    			invHtml +=	'	<label id="invAmtLbl'+i+'" class="col-sm-6 control-label left">'+$.number(invAmtLb, 2)+'</label>';
    			invHtml +=	'</div>';
    			$("#" + formId + " #detailInvcDiv").append(invHtml);
    		}
    	}
    };

    /**
     * 详情_授信申请
     * @param formId 表单ID
     * @param data 详情展示用数据
     */
    FlowMngCommon.detailCredit = function(formId, data) {
    	var targetLbl;
    	// 备注_厂房/经营场所
    	var facAddrTypeOther;
    	// 备注_主要车间建造时间(适用制造业及自有)
    	var mainWorkShopBuildTimeOther;
    	// 备注_备注_车间/仓库安全生产配置
    	var workShopSafeConfigOther;
    	// 备注_存货存放
    	var inventoryStorageOther;
    	// 备注_仓库是否有存放较久的原材料或产品
    	var hasLongTimeStoredGoodsOther;
    	// 备注_仓库进出库管理是出入库管理系统
    	var hasOutStorageManagementSystemOther;
    	// 备注_公司货物运输方式及比率
    	var deliverMethodOther;
    	// 备注_是否有任何机器闲置
    	var hasAnyMachineIdleOther;
    	// 备注_企业是否有配套设施（如排污设施、净化设施等）
    	var hasSupportingFacilitiesOther;
    	// 备注_企业主要能耗
    	var mainEnergyConsumptionOther;
    	// 备注_工人忙碌程度
    	var isBusyOther;
    	// 备注_每天开工班次
    	var orderOfClassesOther;
    	// 备注_生产情况（如日产量、开工程度、产品单价等）与报告中营业额的80%
    	var productionStatusOther;
    	// 备注_公司是否有自有研发人员
    	var hasOwnRDOther;
    	// 备注_是否有严格的质量保证体系
    	var hasQASOther;
    	// 备注_业务来源
    	var busiSourceOther;
    	// 备注_股东在过去或未来6个月是否有变动
    	var hasShareHolderChangeInSixMonthOther;
    	// 备注_公司最近12个月是否涉及诉讼或被执行
    	var hasLawsuitRecentYearOther;
    	// 备注_公司业务近期是否遇到了麻烦
    	var hasTroubleOther;
    	// 备注_公司最近12个月内是否有拖欠员工工资或福利
    	var hasArrearsOfWagesOther;
    	
    	$.each(data, function(name, value) {
    		if (name === "facAddrTypeOther") {
    			facAddrTypeOther = value;
    		} else if (name === "mainWorkShopBuildTimeOther") {
    			mainWorkShopBuildTimeOther = value;
    		} else if (name === "workShopSafeConfigOther") {
    			workShopSafeConfigOther = value;
    		} else if (name === "inventoryStorageOther") {
    			inventoryStorageOther = value;
    		} else if (name === "hasLongTimeStoredGoodsOther") {
    			hasLongTimeStoredGoodsOther = value;
    		} else if (name === "hasOutStorageManagementSystemOther") {
    			hasOutStorageManagementSystemOther = value;
    		} else if (name === "deliverMethodOther") {
    			deliverMethodOther = value;
    		} else if (name === "hasAnyMachineIdleOther") {
    			hasAnyMachineIdleOther = value;
    		} else if (name === "hasSupportingFacilitiesOther") {
    			hasSupportingFacilitiesOther = value;
    		} else if (name === "mainEnergyConsumptionOther") {
    			mainEnergyConsumptionOther = value;
    		} else if (name === "isBusyOther") {
    			isBusyOther = value;
    		} else if (name === "orderOfClassesOther") {
    			orderOfClassesOther = value;
    		} else if (name === "productionStatusOther") {
    			productionStatusOther = value;
    		} else if (name === "hasOwnRDOther") {
    			hasOwnRDOther = value;
    		} else if (name === "hasQASOther") {
    			hasQASOther = value;
    		} else if (name === "busiSourceOther") {
    			busiSourceOther = value;
    		} else if (name === "hasShareHolderChangeInSixMonthOther") {
    			hasShareHolderChangeInSixMonthOther = value;
    		} else if (name === "hasLawsuitRecentYearOther") {
    			hasLawsuitRecentYearOther = value;
    		} else if (name === "hasTroubleOther") {
    			hasTroubleOther = value;
    		} else if (name === "hasArrearsOfWagesOther") {
    			hasArrearsOfWagesOther = value;
    		}
    	});
    	
    	$.each(data, function(name, value) {
    		targetLbl = $("#" + formId + " #" + name + "Lbl");
    		// 是否有追
    		if (name == "chaseFlg") {
    			if (value == "1") {
    				targetLbl.text("是");
    			} else {
    				targetLbl.text("否");
    			}
    			// 保理类型
    		} else if (name == "factorType") {
    			if (value == "1") {
    				targetLbl.text("明保");
    			} else {
    				targetLbl.text("暗保");
    			}
    			// 三个地址是否一致
    		} else if (name == "isAddrSame") {
    			if (value == "1") {
    				targetLbl.text("是");
    			} else {
    				targetLbl.text("否");
    			}
    			// 厂区（经营场所）处于
    		} else if (name == "facAddrArea") {
    			if (value == "1") {
    				targetLbl.text("城镇中心");
    			} else if (value == "2") {
    				targetLbl.text("工业区");
    			} else if (value == "3") {
    				targetLbl.text("主干道");
    			} else {
    				targetLbl.text("支路");
    			}
    			// 厂房/经营场所
    		} else if (name == "facAddrType") {
    			if (value == "1") {
    				targetLbl.text("独立厂区/经营场所");
    			} else if (value == "2") {
    				targetLbl.text("共同使用");
    			} else {
    				targetLbl.text(facAddrTypeOther);
    			}
    			// 经营场所为
    		} else if (name == "busiPlaceType") {
    			if (value == "1") {
    				targetLbl.text("自有");
    			} else {
    				targetLbl.text("租赁");
    			}
    			// 经营场所是否为本次授信担保品
    		} else if (name == "isFacGuarantee") {
    			if (value == "1") {
    				targetLbl.text("是");
    			} else {
    				targetLbl.text("否");
    			}
    			// 主要经营场所建造时间
    		} else if (name == "mainFacBuildTime") {
    			if (value == "1") {
    				targetLbl.text("3年内");
    			} else if (value == "2") {
    				targetLbl.text("3-6年");
    			} else {
    				targetLbl.text("6年以上");
    			}
    			// 主要车间建造时间(适用制造业及自有)
    		} else if (name == "mainWorkShopBuildTime") {
    			if (value == "1") {
    				targetLbl.text("3年内");
    			} else if (value == "2") {
    				targetLbl.text("3-6年");
    			} else if (value == "3") {
    				targetLbl.text("6年以上");
    			} else {
    				targetLbl.text(mainWorkShopBuildTimeOther);
    			}
    			// 车间/仓库安全生产配置
    		} else if (name == "workShopSafeConfig") {
    			if (value == "1") {
    				targetLbl.text(workShopSafeConfigOther);
    			} else {
    				targetLbl.text("无");
    			}
    			// 存货存放
    		} else if (name == "inventoryStorage") {
    			if (value == "1") {
    				targetLbl.text("自有仓库");
    			} else if (value == "2") {
    				targetLbl.text("租用仓库");
    			} else {
    				targetLbl.text(inventoryStorageOther);
    			}
    			// 仓库是否有存放较久的原材料或产品
    		} else if (name == "hasLongTimeStoredGoods") {
    			if (value == "1") {
    				targetLbl.text(hasLongTimeStoredGoodsOther);
    			} else {
    				targetLbl.text("否");
    			}
    			// 仓库进出库管理是出入库管理系统
    		} else if (name == "hasOutStorageManagementSystem") {
    			if (value == "1") {
    				targetLbl.text(hasOutStorageManagementSystemOther);
    			} else {
    				targetLbl.text("否");
    			}
    			// 公司货物运输方式及比率
    		} else if (name == "deliverMethod") {
    			if (value == "1") {
    				targetLbl.text("货运公司");
    			} else if (value == "2") {
    				targetLbl.text("公司送货");
    			} else if (value == "3") {
    				targetLbl.text("客户自提");
    			} else {
    				targetLbl.text(deliverMethodOther);
    			}
    			// 公司产能利用
    		} else if (name == "prdCapUtil") {
    			if (value == "1") {
    				targetLbl.text("100%");
    			} else if (value == "2") {
    				targetLbl.text("80%-100%");
    			} else if (value == "3") {
    				targetLbl.text("80%以内");
    			} else {
    				targetLbl.text("60%以内");
    			}
    			// 是否有任何机器闲置
    		} else if (name == "hasAnyMachineIdle") {
    			if (value == "1") {
    				targetLbl.text(hasAnyMachineIdleOther);
    			} else {
    				targetLbl.text("否");
    			}
    			// 企业是否有配套设施（如排污设施、净化设施等）
    		} else if (name == "hasSupportingFacilities") {
    			if (value == "1") {
    				targetLbl.text(hasSupportingFacilitiesOther);
    			} else {
    				targetLbl.text("否");
    			}
    			// 企业主要能耗
    		} else if (name == "mainEnergyConsumption") {
    			if (value == "1") {
    				targetLbl.text("电");
    			} else if (value == "2") {
    				targetLbl.text("水");
    			} else if (value == "3") {
    				targetLbl.text("蒸气");
    			} else {
    				targetLbl.text(mainEnergyConsumptionOther);
    			}
    			// 工人忙碌程度
    		} else if (name == "isBusy") {
    			if (value == "1") {
    				targetLbl.text("忙碌");
    			} else if (value == "2") {
    				targetLbl.text("一般");
    			} else {
    				targetLbl.text(isBusyOther);
    			}
    			// 每天开工班次
    		} else if (name == "orderOfClasses") {
    			if (value == "1") {
    				targetLbl.text("1*8小时");
    			} else if (value == "2") {
    				targetLbl.text("2*8小时");
    			} else if (value == "3") {
    				targetLbl.text("3*8小时");
    			} else {
    				targetLbl.text(orderOfClassesOther);
    			}
    			// 生产情况（如日产量、开工程度、产品单价等）与报告中营业额的80%
    		} else if (name == "productionStatus") {
    			if (value == "1" || value == "2") {
    				targetLbl.text(productionStatusOther);
    			} else {
    				targetLbl.text("不确定");
    			}
    			// 企业是否有专门的质检人员（适用制造业）
    		} else if (name == "hasQC") {
    			if (value == "1") {
    				targetLbl.text("是");
    			} else {
    				targetLbl.text("否");
    			}
    			// 公司是否有自有研发人员
    		} else if (name == "hasOwnRD") {
    			if (value == "1") {
    				targetLbl.text(hasOwnRDOther);
    			} else {
    				targetLbl.text("否");
    			}
    			// 是否有严格的质量保证体系
    		} else if (name == "hasQAS") {
    			if (value == "1") {
    				targetLbl.text(hasQASOther);
    			} else {
    				targetLbl.text("否");
    			}
    			// 机器的平均使用年限
    		} else if (name == "machineAvgUseLife") {
    			if (value == "1") {
    				targetLbl.text("三年以内");
    			} else if (value == "2") {
    				targetLbl.text("三至七年");
    			} else {
    				targetLbl.text("七年以上");
    			}
    			// 业务来源
    		} else if (name == "busiSource") {
    			if (value == "1") {
    				targetLbl.text("法定代表人");
    			} else if (value == "2") {
    				targetLbl.text("股东");
    			} else if (value == "3") {
    				targetLbl.text("业务员");
    			} else if (value == "4") {
    				targetLbl.text("实际控制人");
    			} else {
    				targetLbl.text(busiSourceOther);
    			}
    			// 股东在过去或未来6个月是否有变动
    		} else if (name == "hasShareHolderChangeInSixMonth") {
    			if (value == "1") {
    				targetLbl.text(hasShareHolderChangeInSixMonthOther);
    			} else {
    				targetLbl.text("否");
    			}
    			// 公司资金回笼的主要方式(如有多选，请备注比率)
    		} else if (name == "capitalReturnMethod") {
    			if (value == "1") {
    				targetLbl.text("银行帐户");
    			} else if (value == "2") {
    				targetLbl.text("银行承兑");
    			} else if (value == "3") {
    				targetLbl.text("个人账户");
    			} else {
    				targetLbl.text("现金");
    			}
    			// 公司最近12个月是否涉及诉讼或被执行
    		} else if (name == "hasLawsuitRecentYear") {
    			if (value == "1") {
    				targetLbl.hide();
    				targetLbl.prev().show();
    				
    				if (!CloudUtils.isEmpty(hasLawsuitRecentYearOther)) {
    					$("#" + formId + " #hasLawsuitRecentYearA").attr("href", hasLawsuitRecentYearOther);
    					var suffix = hasLawsuitRecentYearOther.substring(
    							hasLawsuitRecentYearOther.lastIndexOf("."), hasLawsuitRecentYearOther.length);
    					// 图片格式
    					if (/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(suffix)) {
    						$("#" + formId + " #hasLawsuitRecentYearA").attr("target", "_blank");
    					} else {
    						$("#" + formId + " #hasLawsuitRecentYearA").attr("target", "_self");
    					}
    				}
    			} else {
    				targetLbl.show();
    				targetLbl.text("否");
    				targetLbl.prev().hide();
    			}
    			// 公司业务近期是否遇到了麻烦（包括但不限于重要人员/合约的流失、关键人员患重大疾病、应收帐款回收困难、债务纠纷等）
    		} else if (name == "hasTrouble") {
    			if (value == "1") {
    				targetLbl.text(hasTroubleOther);
    			} else {
    				targetLbl.text("否");
    			}
    			// 公司最近12个月内是否有拖欠员工工资或福利
    		} else if (name == "hasArrearsOfWages") {
    			if (value == "1") {
    				targetLbl.text(hasArrearsOfWagesOther);
    			} else {
    				targetLbl.text("否");
    			}
    			// 公司是否涉及外销
    		} else if (name == "hasExport") {
    			if (value == "1") {
    				targetLbl.text("是");
    			} else {
    				targetLbl.text("否");
    			}
    			// 企业财报与税报差异
    		} else if (name == "diffEarningsTax") {
    			if (value == "1") {
    				targetLbl.text("<30%");
    			} else if (value == "2") {
    				targetLbl.text("≥30%");
    			} else if (value == "3") {
    				targetLbl.text("≥50%");
    			} else {
    				targetLbl.text("≥70%");
    			}
    			// 公司材料采购频率
    		} else if (name == "materialStockFrequency") {
    			if (value == "1") {
    				targetLbl.text("1次/月");
    			} else if (value == "2") {
    				targetLbl.text("2次/月");
    			} else {
    				targetLbl.text("3次及以上/月");
    			}
    		} else {
    			targetLbl.text(value);
    		}
    	});
    };

    /**
     * 详情_风控报告
     * @param formId 表单ID
     * @param data 详情展示用数据
     */
    FlowMngCommon.detailRiskCtrl = function(formId, data) {
    	var targetLbl;
    	$.each(data, function(name, value) {
    		targetLbl = $("#" + formId + " #" + name + "Lbl");
    		// 是否有追
    		if (name == "chaseFlg") {
    			if (value == "1") {
    				targetLbl.text("是");
    			} else {
    				targetLbl.text("否");
    			}
    			// 保理类型
    		} else if (name == "factorType") {
    			if (value == "1") {
    				targetLbl.text("明保");
    			} else {
    				targetLbl.text("暗保");
    			}
    			// 是否存量客户
    		} else if (name == "isStockCustomer") {
    			if (value == "1") {
    				targetLbl.text("是");
    			} else {
    				targetLbl.text("否");
    			}
    			// 授信额度类型
    		} else if (name == "reditLineType") {
    			if (value == "1") {
    				targetLbl.text("循环额度");
    			} else {
    				targetLbl.text("单次");
    			}
    			// 千分位表示
    		} else if (name == "reditLine" || name == "aplFacAmt") {
    			targetLbl.text($.number(value, 2));
    		} else {
    			FlowMngCommon.setFileUrl(targetLbl, value);
    		}
    	});
    };

    /**
     * 详情_合同申请
     * @param formId 表单ID
     * @param data 详情展示用数据
     */
    FlowMngCommon.detailContract = function(formId, data) {
    	var targetLbl;
    	var invNoArr = new Array();
    	var invAmtArr = new Array();
    	$.each(data, function(name, value) {
    		targetLbl = $("#" + formId + " #" + name + "Lbl");
    		// 是否有追
    		if (name == "chaseFlg") {
    			if (value == "1") {
    				targetLbl.text("是");
    			} else {
    				targetLbl.text("否");
    			}
    			// 保理类型
    		} else if (name == "factorType") {
    			if (value == "1") {
    				targetLbl.text("明保");
    			} else {
    				targetLbl.text("暗保");
    			}
    			// 买卖关系
    		} else if (name == "busiRela") {
    			if (value == "1") {
    				targetLbl.text("一对一");
    			} else {
    				targetLbl.text("多对多");
    			}
    			// 币种
    		} else if (name == "ccy") {
    			if (value == "0") {
    				targetLbl.text("人民币");
    			} else {
    				targetLbl.text("美元");
    			}
    			// 还款计划
    		} else if (name == "repaymentPlan") {
    			if (value == "1") {
    				targetLbl.text("年");
    			} else if (value == "2") {
    				targetLbl.text("季度");
    			} else if (value == "3") {
    				targetLbl.text("月");
    			} else {
    				targetLbl.text("天");
    			}
    			// 还款类型
    		} else if (name == "repaymentType") {
    			if (value == "1") {
    				targetLbl.text("买方");
    			} else {
    				targetLbl.text("卖方");
    			}
    		} else if (name == "invNo") {
    			if (!CloudUtils.isEmpty(value)) {
    				invNoArr = value.split(",");
    			}
    		} else if (name == "invAmt") {
    			if (!CloudUtils.isEmpty(value)) {
    				invAmtArr = value.split(",");
    			}
    		} else if (name == "arAmt"
    			|| name == "arTransfAmt" || name == "earnestMoney"
    			|| name == "serviceAmt" || name == "guaranteeValue"
    			|| name == "inComeMakeUp" || name == "loanAmt"
    			|| name == "commission" || name == "otherCost"
    			|| name == "managementFee" || name == "penalty"
    			|| name == "repaymentAmt") {
    			targetLbl.text($.number(value, 2));
    		} else {
    			FlowMngCommon.setFileUrl(targetLbl, value);
    		}
    	});
    	$("#" + formId + " #invcDiv").empty();
    	if (invNoArr.length > 0) {
    		for (var i = 1; i <= invNoArr.length; i++){
    			var invHtml='<div class="form-group">';
    			invHtml +=	'	<label class="col-sm-4 control-label">发票编号'+i+'</label>';
    			invHtml +=	'	<label class="col-sm-6 control-label left">'+invNoArr[i-1]+'</label>';
    			invHtml +=	'</div>';
    			invHtml +=	'<div class="form-group">';
    			invHtml +=	'	<label class="col-sm-4 control-label">发票金额'+i+'</label>';
    			invHtml +=	'	<label class="col-sm-6 control-label left">'+$.number(invAmtArr[i-1], 2)+'</label>';
    			invHtml +=	'</div>';
    			$("#" + formId + " #invcDiv").append(invHtml);
    		}
    	}
    };
    
    /**
     * 详情_在线申请、签约
     * @param formId 表单ID
     * @param data 详情展示用数据
     */
    FlowMngCommon.detailOnlineContract = function(formId, data) {
    	var targetLbl;
    	var invNoArr = new Array();
    	var invAmtArr = new Array();
    	$.each(data, function(name, value) {
    		targetLbl = $("#" + formId + " #" + name + "Lbl");
    			// 买卖关系
    		if (name == "busiRela") {
    			if (value == "1") {
    				targetLbl.text("一对一");
    			} else {
    				targetLbl.text("多对多");
    			}
    			// 还款计划
    		} else if (name == "repaymentPlan") {
    			if (value == "1") {
    				targetLbl.text("年");
    			} else if (value == "2") {
    				targetLbl.text("季度");
    			} else if (value == "3") {
    				targetLbl.text("月");
    			} else {
    				targetLbl.text("天");
    			}
    			// 还款类型
    		} else if (name == "repaymentType") {
    			if (value == "1") {
    				targetLbl.text("买方");
    			} else {
    				targetLbl.text("卖方");
    			}
    			// 币种
    		} else if (name == "ccy") {
    			if (value == "0") {
    				targetLbl.text("人民币");
    			} else {
    				targetLbl.text("美元");
    			}
    			// 千分位表示
    		} else if (name == "arAmt"
				|| name == "arTransfAmt" || name == "earnestMoney"
    			|| name == "serviceAmt" || name == "guaranteeValue"
    			|| name == "inComeMakeUp" || name == "loanAmt"
    			|| name == "commission" || name == "otherCost"
    			|| name == "managementFee" || name == "penalty"
    			|| name == "repaymentAmt") {
    			targetLbl.text($.number(value, 2));
        	} else {
    			FlowMngCommon.setFileUrl(targetLbl, value);
    		}
    	});
    };
    
    /**
     * 详情_放款申请
     * @param formId 表单ID
     * @param data 详情展示用数据
     */
    FlowMngCommon.detailLoan = function(formId, data) {
    	var targetLbl;
    	var lendBathNoArr;
    	var lendAmtArr;
    	var lendDateArr;
    	var lendPersonArr;
    	var lendCorpArr;
    	var lendStateArr;
    	$.each(data, function(name, value) {
    		targetLbl = $("#" + formId + " #" + name + "Lbl");
    		// 放款批次号
    		if (name == "lendBathNo") {
    			lendBathNoArr = value.split(",");
    			// 放款金额
    		} else if (name == "lendAmt") {
    			lendAmtArr = value.split(",");
    			// 放款时间
    		} else if (name == "lendDate") {
    			lendDateArr = value.split(",");
    			// 放款人
    		} else if (name == "lendPerson") {
    			lendPersonArr = value.split(",");
    			// 放款企业
    		} else if (name == "lendCorp") {
    			lendCorpArr = value.split(",");
    			// 放款状态
    		} else if (name == "lendState") {
    			lendStateArr = value.split(",");
    		} else {
    			targetLbl.text(value);
    		}
    	});
    	$("#" + formId + " #detailLend").empty();
    	var lendHtml = '';
    	var lendState = '';
    	var lendNum = lendBathNoArr.length;
    	for (var i = 1; i <= lendNum; i++) {
    		if (lendStateArr[i-1] == '1') {
    			lendState = '已放款';
    		} else if (lendStateArr[i-1] == '2') {
    			lendState = '未放款';
    		} else {
    			lendState = '';
    		}
    		
    		lendHtml += '<div class="form-group">';
    		lendHtml += '	<label class="col-sm-4 control-label">放款批次号'+i+'</label>';
    		lendHtml += '	<label class="col-sm-6 control-label left">'+lendBathNoArr[i-1]+'</label>';
    		lendHtml += '</div>';
    		lendHtml += '<div class="form-group">';
    		lendHtml += '	<label class="col-sm-4 control-label">放款金额'+i+'</label>';
    		lendHtml += '	<label class="col-sm-6 control-label left">'+$.number(lendAmtArr[i-1], 2)+'</label>';
    		lendHtml += '</div>';
    		lendHtml += '<div class="form-group">';
    		lendHtml += '	<label class="col-sm-4 control-label">放款时间'+i+'</label>';
    		lendHtml += '	<label class="col-sm-6 control-label left">'+lendDateArr[i-1]+'</label>';
    		lendHtml += '</div>';
    		lendHtml += '<div class="form-group">';
    		lendHtml += '	<label class="col-sm-4 control-label">放款人'+i+'</label>';
    		lendHtml += '	<label class="col-sm-6 control-label left">'+lendPersonArr[i-1]+'</label>';
    		lendHtml += '</div>';
    		lendHtml += '<div class="form-group">';
    		lendHtml += '	<label class="col-sm-4 control-label">放款企业'+i+'</label>';
    		lendHtml += '	<label class="col-sm-6 control-label left">'+FlowMngCommon.getLendCorpNameDetail(lendCorpArr[i-1])+'</label>';
            lendHtml += '</div>';
            lendHtml += '<div class="form-group">';
            lendHtml += '	<label class="col-sm-4 control-label">放款状态'+i+'</label>';
            lendHtml += '	<label class="col-sm-6 control-label left">'+lendState+'</label>';
            lendHtml += '</div>';
    	}
    	$("#" + formId + " #detailLend").append(lendHtml);
    };
    
    /**
     * 申请事项change事件_详情展示用
     * @param applyItem
     *  	"1"->只表示展期
     *  	"2"->只表示费用减免
     *  	"3"->只表示转法务
     *  	"4"->只表示其他
     */
    FlowMngCommon.changeApplyItemLbl = function(applyItem) {
    	$("#spMatterLblForm")
    		.find("#applyItem1, #applyItem2, #applyItem3, #applyItem4")
			.each(function(index) {
				if (index + 1 === parseInt(applyItem)) {
					$(this).show();
				} else {
					$(this).hide();
					$(this).find("label").each(function() {
						if ($(this).attr("id")) {
							$(this).text("");
						}
					});
				}
			});
    };
    
    /**
     * 申请事项change事件_申请用
     * @param applyItem
     *  	"1"->只表示展期
     *  	"2"->只表示费用减免
     *  	"3"->只表示转法务
     *  	"4"->只表示其他
     */
    FlowMngCommon.changeApplyItem = function(applyItem) {
    	$("#spMatterForm")
    		.find("#applyItem1, #applyItem2, #applyItem3, #applyItem4")
    		.each(function(index) {
    			if (index + 1 === parseInt(applyItem)) {
    				$(this).show();
    			} else {
    				$(this).hide();
    				$(this).find("input").each(function() {
    					if ($(this).attr("type") == "radio") {
    						var name = $(this).attr("name");
    						$("#spMatterForm").find("[name="+name+"]").get(0).checked = true;
    					} else {
    						$(this).val("");
    					}
    				});
    				$(this).find("select").each(function() {
    					$(this).find("option:first").attr("selected", true);
    				});
    			}
    		});
    };
    
    /**
     * 附件url设定
     * @param targetLbl 附件表示label
     * @param value 附件地址
     */
    FlowMngCommon.setFileUrl = function(targetLbl, value) {
    	if (targetLbl.prop("tagName") == "INPUT") {
    		var a_file = targetLbl.next();
    		if (CloudUtils.isEmpty(value)) {
    			a_file.hide();
    		} else {
    			a_file.show();
    			a_file.attr("href", value);
    			var suffix = value.substring(value.lastIndexOf("."), value.length);
    			// 图片格式
    			if (/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(suffix)) {
    				a_file.attr("target", "_blank");
    			} else {
    				a_file.attr("target", "_self");
    			}
    		}
    	} else {
    		targetLbl.text(value);
    	}
    };
    
    /**
     * 附件上传
     * @param obj <i>元素对象
     */
    FlowMngCommon.fileSelect = function(obj) {
    	$(obj).next().click();
    };

    /**
     * 附件上传
     * @param obj <file>元素对象
     */
    FlowMngCommon.ajaxFileUpload = function(obj) {
    	var target = $(obj).parent().prev();
    	if ($(obj).val().length > 0) {
    		$.ajaxFileUpload({
    	        url : '../../file/binUpload?pathId=2',
    	        secureuri : false,
    	        fileElementId : $(obj).attr("id"),
    	        dataType : 'json',
    	        success : function(data, status) {
    	            if (data.result == 0) {
    	            	target.val(data.fileUrl);
    	            	target.focus();
    	            }else{
    	            	bootbox.alert("上传失败！");
    	            } 
    	        },
    	        error : function(data, status, e) {
    	        	bootbox.alert(e);
    	        }
    	    });
        } else {
        	bootbox.alert("请选择附件");
        }
    };
    
    /**
     * 检索条件日期控件初始化
     * @param createTime 检索条件日期项目
     */
    FlowMngCommon.dateload_createTime = function(createTime) {
    	// 检索
    	$('#' + createTime).daterangepicker(
            {
                //startDate: moment().startOf('day'),
                //endDate: moment(),
                //minDate: '01/01/2012',    //最小时间
                maxDate : moment(), //最大时间
                dateLimit : { days : 90 }, //起止时间的最大间隔
                showDropdowns : true,
                showWeekNumbers : false, //是否显示第几周
                timePicker : false, //是否显示小时和分钟
                //timePickerIncrement : 60, //时间的增量，单位为分钟
                //timePicker12Hour : false, //是否使用12小时制来显示时间
//    	            ranges : {
//    	                //'最近1小时': [moment().subtract('hours',1), moment()],
//    	                '今日': [moment().startOf('day'), moment()],
//    	                '昨日': [moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day')],
//    	                '最近7日': [moment().subtract('days', 6), moment()],
//    	                '最近30日': [moment().subtract('days', 29), moment()]
//    	            },
                opens : 'right', //日期选择框的弹出位置
                buttonClasses : [ 'btn btn-default' ],
//                applyClass : 'btn-small btn-primary blue',
//    	            cancelClass : 'btn-small',
                format : 'yyyy-MM-dd', //控件中from和to显示的日期格式
                separator : ' - ',
                locale : {
                    applyLabel : '确定',
    	            cancelLabel : '取消',
                    fromLabel : '起始时间',
                    toLabel : '结束时间',
                    //customRangeLabel : '自定义',
                    daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],
                    monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',
                                   '七月', '八月', '九月', '十月', '十一月', '十二月' ],
                    firstDay : 1
                }
            },
            function(start, end, label) {//格式化日期显示框
            	$('#' + createTime).val(start.toString('yyyy-MM-dd') + ' - ' + end.toString('yyyy-MM-dd'));
            }
    	);
    };
    
    /**
     * 授信申请_事件绑定
     * @param formId
     */
    FlowMngCommon.bindCreditEvent = function(formId) {
    	// 厂房/经营场所
    	$("#" + formId + " #facAddrType").change(function() {FlowMngCommon.disRemark(formId, $(this))});
    	// 主要车间建造时间(适用制造业及自有)
    	$("#" + formId + " #mainWorkShopBuildTime").change(function() {FlowMngCommon.disRemark(formId, $(this))});
    	// 车间/仓库安全生产配置
    	$("#" + formId + " [name='workShopSafeConfig']").click(function() {FlowMngCommon.disRemark(formId, $(this))});
    	// 存货存放
    	$("#" + formId + " #inventoryStorage").change(function() {FlowMngCommon.disRemark(formId, $(this))});
    	// 仓库是否有存放较久的原材料或产品
    	$("#" + formId + " [name='hasLongTimeStoredGoods']").click(function() {FlowMngCommon.disRemark(formId, $(this))});
    	// 仓库进出库管理是出入库管理系统
    	$("#" + formId + " [name='hasOutStorageManagementSystem']").click(function() {FlowMngCommon.disRemark(formId, $(this))});
    	// 公司货物运输方式及比率
    	$("#" + formId + " #deliverMethod").change(function() {FlowMngCommon.disRemark(formId, $(this))});
    	// 是否有任何机器闲置
    	$("#" + formId + " [name='hasAnyMachineIdle']").click(function() {FlowMngCommon.disRemark(formId, $(this))});
    	// 企业是否有配套设施（如排污设施、净化设施等）
    	$("#" + formId + " [name='hasSupportingFacilities']").click(function() {FlowMngCommon.disRemark(formId, $(this))});
    	// 企业主要能耗
    	$("#" + formId + " #mainEnergyConsumption").change(function() {FlowMngCommon.disRemark(formId, $(this))});
    	// 工人忙碌程度
    	$("#" + formId + " #isBusy").change(function() {FlowMngCommon.disRemark(formId, $(this))});
    	// 每天开工班次
    	$("#" + formId + " #orderOfClasses").change(function() {FlowMngCommon.disRemark(formId, $(this))});
    	// 生产情况（如日产量、开工程度、产品单价等）与报告中营业额的80%
    	$("#" + formId + " #productionStatus").change(function() {FlowMngCommon.disRemark(formId, $(this))});
    	// 公司是否有自有研发人员
    	$("#" + formId + " [name='hasOwnRD']").click(function() {FlowMngCommon.disRemark(formId, $(this))});
    	// 是否有严格的质量保证体系
    	$("#" + formId + " [name='hasQAS']").click(function() {FlowMngCommon.disRemark(formId, $(this))});
    	// 业务来源
    	$("#" + formId + " #busiSource").change(function() {FlowMngCommon.disRemark(formId, $(this))});
    	// 股东在过去或未来6个月是否有变动
    	$("#" + formId + " [name='hasShareHolderChangeInSixMonth']").click(function() {FlowMngCommon.disRemark(formId, $(this))});
    	// 公司最近12个月是否涉及诉讼或被执行
    	$("#" + formId + " [name='hasLawsuitRecentYear']").click(function() {FlowMngCommon.disRemark(formId, $(this))});
    	// 公司业务近期是否遇到了麻烦
    	$("#" + formId + " [name='hasTrouble']").click(function() {FlowMngCommon.disRemark(formId, $(this))});
    	// 公司最近12个月内是否有拖欠员工工资或福利
    	$("#" + formId + " [name='hasArrearsOfWages']").click(function() {FlowMngCommon.disRemark(formId, $(this))});
    	// 公司是否涉及外销
    	$("#" + formId + " [name='hasExport']").click(function() {FlowMngCommon.hasExportChg(formId)});
    }

    /**
     * 授信申请_初始化事件触发
     * @param formId
     */
    FlowMngCommon.initCreditEvent = function(formId) {
    	// 厂房/经营场所
    	FlowMngCommon.disRemark(formId, $("#" + formId + " #facAddrType"), "init");
    	// 主要车间建造时间(适用制造业及自有)
    	FlowMngCommon.disRemark(formId, $("#" + formId + " #mainWorkShopBuildTime"), "init");
    	// 车间/仓库安全生产配置
    	FlowMngCommon.disRemark(formId, $("#" + formId + " [name='workShopSafeConfig']:checked"), "init");
    	// 存货存放
    	FlowMngCommon.disRemark(formId, $("#" + formId + " #inventoryStorage"), "init");
    	// 仓库是否有存放较久的原材料或产品
    	FlowMngCommon.disRemark(formId, $("#" + formId + " [name='hasLongTimeStoredGoods']:checked"), "init");
    	// 仓库进出库管理是出入库管理系统
    	FlowMngCommon.disRemark(formId, $("#" + formId + " [name='hasOutStorageManagementSystem']:checked"), "init");
    	// 公司货物运输方式及比率
    	FlowMngCommon.disRemark(formId, $("#" + formId + " #deliverMethod"), "init");
    	// 是否有任何机器闲置
    	FlowMngCommon.disRemark(formId, $("#" + formId + " [name='hasAnyMachineIdle']:checked"), "init");
    	// 企业是否有配套设施（如排污设施、净化设施等）
    	FlowMngCommon.disRemark(formId, $("#" + formId + " [name='hasSupportingFacilities']:checked"), "init");
    	// 企业主要能耗
    	FlowMngCommon.disRemark(formId, $("#" + formId + " #mainEnergyConsumption"), "init");
    	// 工人忙碌程度
    	FlowMngCommon.disRemark(formId, $("#" + formId + " #isBusy"), "init");
    	// 每天开工班次
    	FlowMngCommon.disRemark(formId, $("#" + formId + " #orderOfClasses"), "init");
    	// 生产情况（如日产量、开工程度、产品单价等）与报告中营业额的80%
    	FlowMngCommon.disRemark(formId, $("#" + formId + " #productionStatus"), "init");
    	// 公司是否有自有研发人员
    	FlowMngCommon.disRemark(formId, $("#" + formId + " [name='hasOwnRD']:checked"), "init");
    	// 是否有严格的质量保证体系
    	FlowMngCommon.disRemark(formId, $("#" + formId + " [name='hasQAS']:checked"), "init");
    	// 业务来源
    	FlowMngCommon.disRemark(formId, $("#" + formId + " #busiSource"), "init");
    	// 股东在过去或未来6个月是否有变动
    	FlowMngCommon.disRemark(formId, $("#" + formId + " [name='hasShareHolderChangeInSixMonth']:checked"), "init");
    	// 公司最近12个月是否涉及诉讼或被执行
    	FlowMngCommon.disRemark(formId, $("#" + formId + " [name='hasLawsuitRecentYear']:checked"), "init");
    	// 公司业务近期是否遇到了麻烦
    	FlowMngCommon.disRemark(formId, $("#" + formId + " [name='hasTrouble']:checked"), "init");
    	// 公司最近12个月内是否有拖欠员工工资或福利
    	FlowMngCommon.disRemark(formId, $("#" + formId + " [name='hasArrearsOfWages']:checked"), "init");
    }

    /**
     * 备注显示与否
     * @param formId
     * @param obj
     * @param type
     */
    FlowMngCommon.disRemark = function(formId, obj, type) {
    	var name = obj.attr("name");
    	var value;

    	// select
    	if (obj[0].tagName == "SELECT") {
    		value = obj.find("option:selected").text();
    		// radio
    	} else {
    		value = obj.val();
    	}

    	if (value == "其他" || value == "不适用" || value == "相匹配"
    		|| value == "不匹配" || value == "1") {
    		$("#" + formId).find("#" + name + "Div").show();
    		
    		// 初期表示不触发验证
    		if (type != 'init') {
    			// 重置备注验证
        		$("#" + formId)
        			.data("bootstrapValidator")
        			.updateStatus(name + "Other", "NOT_VALIDATED", null)
        			.validateField(name + "Other");
    		}
    	} else {
    		$("#" + formId).find("#" + name + "Div").hide();
    		$("#" + formId).find("#" + name + "Other").val("");
    		
    		// 初期表示的时候不触发验证
    		if (type != 'init') {
    			// 重置备注验证
        		$("#" + formId)
        			.data("bootstrapValidator")
        			.updateStatus(name + "Other", "NOT_VALIDATED", null);
    		}
    	}
    }
    
    /**
     * 公司是否涉及外销change事件
     * @param formId
     */
    FlowMngCommon.hasExportChg = function(formId) {
    	// 重置比率验证
    	$("#" + formId)
    		.data("bootstrapValidator")
    		.updateStatus('ratioOfExport', 'NOT_VALIDATED', null)
    		.validateField('ratioOfExport');
    }
    
    /**
     * 还款类型改变自动带出还款企业
     * @param obj
     * @param formId
     */
    FlowMngCommon.setRepaymentCorp = function(obj, formId) {
    	var repayCorp;
    	// 买方
    	if ($(obj).val() == "1") {
    		repayCorp = $("#" + formId).find("#relBuyName").val();
    		// 卖方
    	} else {
    		repayCorp = $("#" + formId).find("#relSaleName").val();
    	}
    	
    	// 特殊事项
    	if (formId == "spMatterForm") {
    		$("#spMatterForm #repayCorp").val(repayCorp);
    		
    		// 标准流程_合同申请
    	} else if (formId == "contractForm") {
    		$("#contractForm #repaymentCorp").val(repayCorp);
    		
    		// 融资直通车_合同申请
    	} else if (formId == "financeForm") {
    		$("#financeForm #repaymentCorp").val(repayCorp);
    	}
    }
    
    /**
     * 放款企业下拉框取得
     * @param formId
     * @param lendCorpId
     */
    FlowMngCommon.getLendCorpNameList = function(formId, lendCorpId) {
    	// 参数
    	var param = {
    			relaCorpId : store.get('corpId'),
    			isPage : 0  //是否分页，0：否，1：是，默认为0.
    	};
    	var options = {
    			url : '../../corp/list',
    			data : JSON.stringify(param),
    			callBackFun : function(data) {
    				if(data.result==0){
//    					var jsonStringData = JSON.stringify(data.dataList);
//    					jsonStringData = jsonStringData.replace(/corpName/g, 'label');
//    					var jsonData = eval('('+ jsonStringData +')');
//    					var obj = {
//    							highlightMatches: true,
//    					        source: jsonData,
//    					        // show hint
//    					        hint: false,
//    					        empty: false,
//    					        // max resultsv
//    					        limit: 5
//    					};
//    					$("#" + formId).find("#" + lendCorpId).autocompleter(obj);
    					$.each(data.dataList, function(index, rec) {
    						$("#" + formId)
    						.find("#" + lendCorpId)
    						.append("<option value="+rec.corpId+">"+rec.corpName+"</option>");
    					});
    				}else{
    					bootbox.alert(data.resultNote);
    				}
    			},
    			errorCallback:function(data){
    				bootbox.alert("error");  
    			}
    	};
    	CloudUtils.ajax(options);
    }
    
    /**
     * 放款企业名称取得（详情用）
     * @param p_corpId
     */
    FlowMngCommon.getLendCorpNameDetail = function(p_corpId) {
    	var ret = "";
    	// 参数
    	var param = {
    			corpId : p_corpId,
    			relaCorpId : store.get('corpId'),
    			isPage : 0  //是否分页，0：否，1：是，默认为0.
    	};
    	var options = {
    			url : '../../corp/list',
    			data : JSON.stringify(param),
    			callBackFun : function(data) {
    				if(data.result==0){
    					if (data.dataList.length > 0) {
    						ret = data.dataList[0].corpName;
    					}
    				}else{
    					bootbox.alert(data.resultNote);
    				}
    			},
    			errorCallback:function(data){
    				bootbox.alert("error");  
    			}
    	};
    	CloudUtils.ajax(options);
    	
    	return ret;
    }
    
    /**
     * 计算手续费/管理费/利息 
     * 
     * 利息interest  F=P（1+r*n)   p是本金（融资金额） r是利率 n是年数/月数/天数
     * 管理费manageFee  F=P1（1+r1*n1)   p1是发票金额(应收账款) r1是管理费率 n1是年数/月数/天数
     * 
     * @param formId
     */
    FlowMngCommon.countFees = function(formId) {
    	var days = 0;
    	var repaymentPlan = $("#" + formId + " #repaymentPlan").val();
    	var times = $("#" + formId + " #repaymentTimes").val();
    	if(repaymentPlan=="1"){//年
    		var paramStr = times + ",360" ;
    		days =  CloudUtils.MathArray(paramStr,"mul");
    	}else if(repaymentPlan=="2"){//季
    		var paramStr = times + ",90";
    		days =  CloudUtils.MathArray(paramStr,"mul");
    	}else if(repaymentPlan=="3"){//月
    		var paramStr = times + ",30";
    		days =  CloudUtils.MathArray(paramStr,"mul");
    	}else if(repaymentPlan=="4"){//天
    		days = times;
    	}
    	//计算利率
    	var standardRateTmp = $("#" + formId + " #standardRate").val() ==""?0:$("#" + formId + " #standardRate").val();
    	var standardRateStr = standardRateTmp +",100";
    	var standardRate = CloudUtils.MathArray(standardRateStr,"div");//基准利率
    	var rateFloatPctTmp = $("#" + formId + " #rateFloatPct").val() ==""?0:$("#" + formId + " #rateFloatPct").val();
    	var rateFloatPctStr = rateFloatPctTmp +",100";
    	var rateFloatPct = CloudUtils.MathArray(rateFloatPctStr,"div");//上浮比例
    	
    	var step1str = "1,"+rateFloatPct;
    	var step2str = CloudUtils.MathArray(step1str,"add") +","+standardRate;
    	var rate = CloudUtils.MathArray(step2str,"mul");
    	$("#" + formId + " #interestRate").val(rate);
    	
    	//计算利息
    	var interestStrStep1 = rate + "," + days;
    	var interestResultStep1 = CloudUtils.MathArray(interestStrStep1,"mul");
    	var interestStrStep2 = interestResultStep1 + ",1";
    	var interestResultStep2 = CloudUtils.MathArray(interestStrStep2,"add");
    	var loanAmt = $("#" + formId + " #loanAmt").val();//融资金额
    	var interestStrStep3 = interestResultStep2 + "," +loanAmt;
    	
    	var interest = CloudUtils.MathArray(interestStrStep3,"mul");
    	$("#" + formId + " #interest").val(interest);
    	
    	//计算管理费
    	var manageFeeRateTmp = $("#" + formId + " #managementFeeRate").val() ==""?0:$("#" + formId + " #managementFeeRate").val();
    	var manageFeeRateStr = manageFeeRateTmp +",100";
    	var manageFeeRate = CloudUtils.MathArray(manageFeeRateStr,"div");//管理费率
    	
    	var manageFeeStrStep1 = manageFeeRate + "," + days;
    	var manageFeeResultStep1 = CloudUtils.MathArray(manageFeeStrStep1,"mul");
    	var manageFeeStrStep2 = manageFeeResultStep1 + ",1";
    	var manageFeeResultStep2 = CloudUtils.MathArray(manageFeeStrStep2,"add");
    	var arAmt = $("#" + formId + " #arAmt").val();//应收账款
    	var manageFeeResultStep3 = manageFeeResultStep2 + "," +arAmt;
    	
    	var manageFee = CloudUtils.MathArray(manageFeeResultStep3,"mul");
    	$("#" + formId + " #managementFee").val(manageFee);
    }
    
    /**
     * 特殊事项表单验证规则
     */
    FlowMngCommon.spFormValidator = function() {
    	$('#spMatterForm').bootstrapValidator({
    	      message: 'This value is not valid',
    	      feedbackIcons: {
    	          valid: 'glyphicon glyphicon-ok',
    	          invalid: 'glyphicon glyphicon-remove',
    	          validating: 'glyphicon glyphicon-refresh'
    	      },
    	      fields: {
    	    	  proName: {
    	              validators: {
    	                  notEmpty: {
    	                      message: '项目名称不能为空'
    	                  }
    	              }
    	          },
    	          note: {
    	              validators: {
    	            	  notEmpty: {
    	                      message: '备注不能为空'
    	                  }
    	              }
    	          },
    	          repayCorpAccount: {
    	              validators: {
    	            	  notEmpty: {
    	                      message: '还款企业账户不能为空'
    	                  }
    	              }
    	          },
    	          repayPlan: {
    	              validators: {
    	            	  notEmpty: {
    	                      message: '还款计划不能为空'
    	                  }
    	              }
    	          },
    	          repayAmount: {
    	              validators: {
    	            	  notEmpty: {
    	                      message: '还款金额不能为空'
    	                  },
    	                  numeric: {
    	                	  message: '还款金额请输入数字'
    	                  },
    	                  callback: {
      	                	  message: '还款金额要在0-1,000,000,000之间',
      	                	  callback: function(value, validator) {
      	                		  return parseFloat(value) >= 0 && parseFloat(value) <= 1000000000;
      	                	  }
      	                  }
    	              }
    	          },
    	          reduceAmount: {
    	              validators: {
    	            	  numeric: {
    	                	  message: '减免金额请输入数字'
    	                  },
    	                  callback: {
      	                	  message: '减免金额要在0-1,000,000,000之间',
      	                	  callback: function(value, validator) {
      	                		  return value == "" || (parseFloat(value) >= 0 && parseFloat(value) <= 1000000000);
      	                	  }
      	                  }
    	              }
    	          },
    	          repayType: {
    	              validators: {
    	            	  notEmpty: {
    	                      message: '还款类型不能为空'
    	                  }
    	              }
    	          }
    	      }
    		})
    		.on('success.form.bv', function (e) {
    			e.preventDefault();
    		});	
    };

    /**
     * 立项管理表单验证规则
     * @param formId
     */
    FlowMngCommon.nmFormValidator = function(formId) {
    	$('#' + formId).bootstrapValidator({
    	      message: 'This value is not valid',
    	      feedbackIcons: {
    	          valid: 'glyphicon glyphicon-ok',
    	          invalid: 'glyphicon glyphicon-remove',
    	          validating: 'glyphicon glyphicon-refresh'
    	      },
    	      fields: {
    	    	  proName: {
    	              validators: {
    	                  notEmpty: {
    	                      message: '项目名称不能为空'
    	                  }
    	              }
    	          },
    	          proMakeDate: {
    	              validators: {
    	                  notEmpty: {
    	                      message: '发起日期不能为空'
    	                  }
    	              }
    	          },
    	          relBuyName: {
    	              validators: {
    	                  notEmpty: {
    	                      message: '关联买方名称不能为空'
    	                  }
    	              }
    	          },
    	          relSaleName: {
    	              validators: {
    	                  notEmpty: {
    	                      message: '关联卖方名称不能为空'
    	                  }
    	              }
    	          },
    	          relSaleCorpName: {
    	              validators: {
    	                  notEmpty: {
    	                      message: '关联企业名称不能为空'
    	                  }
    	              }
    	          },
    	          note: {
    	              validators: {
    	                  notEmpty: {
    	                      message: '备注不能为空'
    	                  }
    	              }
    	          },
    	          order: {
    	        	  trigger: 'focus',
    	              validators: {
    	                  notEmpty: {
    	                      message: '订单不能为空'
    	                  }
    	              }
    	          },
    	          delivery: {
    	        	  trigger: 'focus',
    	              validators: {
    	                  notEmpty: {
    	                      message: '发货单不能为空'
    	                  }
    	              }
    	          },
    	          receipt: {
    	        	  trigger: 'focus',
    	              validators: {
    	                  notEmpty: {
    	                      message: '收货单不能为空'
    	                  }
    	              }
    	          },
    	          godownEntry: {
    	        	  trigger: 'focus',
    	              validators: {
    	                  notEmpty: {
    	                      message: '入库单不能为空'
    	                  }
    	              }
    	          },
    	          list: {
    	        	  trigger: 'focus',
    	              validators: {
    	                  notEmpty: {
    	                      message: '榜单(保险)不能为空'
    	                  }
    	              }
    	          },
    	          storage: {
    	        	  trigger: 'focus',
    	              validators: {
    	                  notEmpty: {
    	                      message: '仓储单不能为空'
    	                  }
    	              }
    	          },
    	          billNo: {
    	              validators: {
    	                  notEmpty: {
    	                      message: '合同/订单编号不能为空'
    	                  }
    	              }
    	          },
    	          billName: {
    	              validators: {
    	                  notEmpty: {
    	                      message: '合同名称/订单不能为空'
    	                  }
    	              }
    	          },
    	          billAmount: {
    	              validators: {
    	                  notEmpty: {
    	                      message: '合同/订单金额不能为空'
    	                  },
    	                  numeric: {
    	                	  message: '合同/订单金额请输入数字'
    	                  },
    	                  callback: {
      	                	  message: '合同/订单金额要在0-1,000,000,000之间',
      	                	  callback: function(value, validator) {
      	                		  return parseFloat(value) >= 0 && parseFloat(value) <= 1000000000;
      	                	  }
      	                  }
    	              }
    	          },
    	          payType: {
    	              validators: {
    	                  notEmpty: {
    	                      message: '付款方式不能为空'
    	                  }
    	              }
    	          },
    	          accountPeriod: {
    	              validators: {
    	                  notEmpty: {
    	                      message: '合同/订单约定账期不能为空'
    	                  },
    	                  numeric: {
    	                	  message: '合同/订单约定账期请输入数字'
    	                  }
    	              }
    	          },
    	          hasInv: {
    	        	  validators: {
    	        		  callback: {
    	        			  message: '开立发票选择是的场合，至少要添加一张发票',
    	        			  callback: function(value, validator) {
    	        				  var val = $("#" + formId).find("input[name='hasInv']:checked").val();
    	        				  if (val === "1") {
    	        					  return $("#" + formId).find("input[name='invoice']").length > 0;
    	        				  } else {
    	        					  return true;
    	        				  }
    	        			  }
    	        		  }
    	        	  }
    	          },
    	          arBal: {
    	              validators: {
    	                  notEmpty: {
    	                      message: '应收账款余额不能为空'
    	                  },
    	                  numeric: {
    	                	  message: '应收账款余额请输入数字'
    	                  },
    	                  callback: {
      	                	  message: '应收账款余额要在-1,000,000,000-1,000,000,000之间',
      	                	  callback: function(value, validator) {
      	                		  return parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000;
      	                	  }
      	                  }
    	              }
    	          },
    	          aplFacAmt: {
    	              validators: {
    	                  notEmpty: {
    	                      message: '拟申请保理金额不能为空'
    	                  },
    	                  numeric: {
    	                	  message: '拟申请保理金额请输入数字'
    	                  },
    	                  callback: {
      	                	  message: '拟申请保理金额要在0-1,000,000,000之间',
      	                	  callback: function(value, validator) {
      	                		  return parseFloat(value) >= 0 && parseFloat(value) <= 1000000000;
      	                	  }
      	                  }
    	              }
    	          },
    	          aplPeriod: {
    	              validators: {
    	                  notEmpty: {
    	                      message: '申请账期不能为空'
    	                  },
    	                  numeric: {
    	                	  message: '申请账期请输入数字'
    	                  }
    	              }
    	          },
    	          arPct: {
    	              validators: {
    	                  notEmpty: {
    	                      message: '应收账款受让比例不能为空'
    	                  },
    	                  numeric: {
    	                	  message: '应收账款受让比例请输入数字'
    	                  }
    	              }
    	          },
    	          srchPrtSc: {
    	        	  trigger: 'focus',
    	              validators: {
    	                  notEmpty: {
    	                      message: '中登网查询截屏不能为空'
    	                  }
    	              }
    	          }
    	      }
    		})
    		.on('success.form.bv', function (e) {
    			e.preventDefault();
    		});
    };
    
    /**
     * 授信申请表单验证规则
     * @param formId
     */
    FlowMngCommon.creditFormValidator = function(formId) {
    	$('#' + formId).bootstrapValidator({
  	      message: 'This value is not valid',
  	      feedbackIcons: {
  	          valid: 'glyphicon glyphicon-ok',
  	          invalid: 'glyphicon glyphicon-remove',
  	          validating: 'glyphicon glyphicon-refresh'
  	      },
  	      fields: {
  	    	  licenseRegAddr: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '营业执照注册地址不能为空'
  	                  }
  	              }
  	          },
  	          relPrdBusiAddr: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '实际生产经营地址不能为空'
  	                  }
  	              }
  	          },
  	          visiAddr: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '访厂地址不能为空'
  	                  }
  	              }
  	          },
  	          mainVisiPerson1: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '主要访谈对象1不能为空'
  	                  }
  	              }
  	          },
  	          position1: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '职务不能为空'
  	                  }
  	              }
  	          },
  	          phone1: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '电话不能为空'
  	                  },
  	                  stringLength: {
  			              min: 1,
  			              max: 11,
  			              message: '电话长度不超过11'
  			          },
  			          regexp: {
  	                      regexp: /^[0-9]*$/,
  	                      message: '电话只能是数字'
  	                  }
  	              }
  	          },
  	          facAddrArea: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '厂区（经营场所）处于不能为空'
  	                  }
  	              }
  	          },
  	          facAddrType: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '厂房/经营场所不能为空'
  	                  }
  	              }
  	          },
  	          mainFacBuildTime: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '主要经营场所建造时间不能为空'
  	                  }
  	              }
  	          },
  	          inventoryStorage: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '存货存放不能为空'
  	                  }
  	              }
  	          },
  	          deliverMethod: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '公司货物运输方式及比率不能为空'
  	                  }
  	              }
  	          },
  	          mainEquipment: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '公司主要生产设备不能为空'
  	                  }
  	              }
  	          },
  	          equNum: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '数量不能为空'
  	                  },
  	                  regexp: {
	                      regexp: /^[0-9]*$/,
	                      message: '请输入正整数'
	                  }
  	              }
  	          },
  	          prdCapUtil: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '公司产能利用不能为空'
  	                  }
  	              }
  	          },
  	          mainEnergyConsumption: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '企业主要能耗不能为空'
  	                  }
  	              }
  	          },
  	          postsStaffOnSite: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '现场员工上岗人数不能为空'
  	                  },
  	                  regexp: {
	                      regexp: /^[0-9]*$/,
	                      message: '请输入正整数'
	                  }
  	              }
  	          },
  	          isBusy: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '工人忙碌程度不能为空'
  	                  }
  	              }
  	          },
  	          orderOfClasses: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '每天开工班次不能为空'
  	                  }
  	              }
  	          },
  	          productionStatus: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '生产情况不能为空'
  	                  }
  	              }
  	          },
  	          machineAvgUseLife: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '机器的平均使用年限不能为空'
  	                  }
  	              }
  	          },
  	          mainPrdServCont: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '公司主要产品或服务内容不能为空'
  	                  }
  	              }
  	          },
  	          busiSource: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '业务来源不能为空'
  	                  }
  	              }
  	          },
  	          ratio: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '比率不能为空'
  	                  },
  	                  regexp: {
                          regexp: /^\d+(\.\d{1,2})?$/,
                          message: '只能输入最多两位小数的非负数'
                      },
  	                  callback: {
  	                	  message: '比率要在0-100之间',
  	                	  callback: function(value, validator) {
  	                		  return parseFloat(value) >= 0 && parseFloat(value) <= 100;
  	                	  }
  	                  }
  	              }
  	          },
  	          capitalReturnMethod: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '公司资金回笼的主要方式不能为空'
  	                  }
  	              }
  	          },
  	          biggestBuyer: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '公司最大采购商名称不能为空'
  	                  }
  	              }
  	          },
  	          ratioOfBiggestBuyer: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '比率不能为空'
  	                  },
  	                  regexp: {
						  regexp: /^\d+(\.\d{1,2})?$/,
						  message: '只能输入最多两位小数的非负数'
					  },
  	                  callback: {
  	                	  message: '比率要在0-100之间',
  	                	  callback: function(value, validator) {
  	                		  return parseFloat(value) >= 0 && parseFloat(value) <= 100;
  	                	  }
  	                  }
  	              }
  	          },
  	          biggestSupplier: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '公司最大供应商名称不能为空'
  	                  }
  	              }
  	          },
  	          ratioOfBiggestSupplier: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '比率不能为空'
  	                  },
  	                  regexp: {
						  regexp: /^\d+(\.\d{1,2})?$/,
						  message: '只能输入最多两位小数的非负数'
					  },
  	                  callback: {
  	                	  message: '比率要在0-100之间',
  	                	  callback: function(value, validator) {
  	                		  return parseFloat(value) >= 0 && parseFloat(value) <= 100;
  	                	  }
  	                  }
  	              }
  	          },
  	          diffEarningsTax: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '企业财报与税报差异不能为空'
  	                  }
  	              }
  	          },
  	          arAvgPeriod: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '公司应收帐款平均帐期不能为空'
  	                  },
  	                  regexp: {
	                      regexp: /^[0-9]*$/,
	                      message: '请输入正整数'
	                  }
  	              }
  	          },
  	          apAvgPeriod: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '公司应付帐款平均帐期不能为空'
  	                  },
  	                  regexp: {
  	                      regexp: /^[0-9]*$/,
  	                      message: '请输入正整数'
  	                  }
  	              }
  	          },
  	          materialStockFrequency: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '公司材料采购频率不能为空'
  	                  }
  	              }
  	          },
  	          nearly3yAvgGrossMarginTrend: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '公司近3年平均毛利率趋势不能为空'
  	                  }
  	              }
  	          },
  	          nowGrossMargin: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '公司目前毛利率不能为空'
  	                  },
  	                  regexp: {
                          regexp: /^(-)?\d+(\.\d{1,2})?$/,
                          message: '只能输入最多两位小数的数字'
                      },
  	                  callback: {
  	                	  message: '毛利率要在-100-100之间',
  	                	  callback: function(value, validator) {
  	                		  return parseFloat(value) >= -100 && parseFloat(value) <= 100;
  	                	  }
  	                  }
  	              }
  	          },
  	          processDisc: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          relLoanDemand: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          otherNoteEvaluation: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          taxInvSysChk: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '纳税开票系统查核不能为空'
  	                  }
  	              }
  	          },
  	          bankWaterSysChk: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '银行流水系统查核不能为空'
  	                  }
  	              }
  	          },
  	          financeSysChk: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '财务系统查核不能为空'
  	                  }
  	              }
  	          },
  	          facAddrTypeOther: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '备注不能为空'
  	                  }
  	              }
  	          },
  	          mainWorkShopBuildTimeOther: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '备注不能为空'
  	                  }
  	              }
  	          },
  	          workShopSafeConfigOther: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '备注不能为空'
  	                  }
  	              }
  	          },
  	          inventoryStorageOther: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '备注不能为空'
  	                  }
  	              }
  	          },
  	          hasLongTimeStoredGoodsOther: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '备注不能为空'
  	                  }
  	              }
  	          },
  	          hasOutStorageManagementSystemOther: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '备注不能为空'
  	                  }
  	              }
  	          },
  	          deliverMethodOther: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '备注不能为空'
  	                  }
  	              }
  	          },
  	          hasAnyMachineIdleOther: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '备注不能为空'
  	                  }
  	              }
  	          },
  	          hasSupportingFacilitiesOther: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '备注不能为空'
  	                  }
  	              }
  	          },
  	          mainEnergyConsumptionOther: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '备注不能为空'
  	                  }
  	              }
  	          },
  	          isBusyOther: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '备注不能为空'
  	                  }
  	              }
  	          },
  	          orderOfClassesOther: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '备注不能为空'
  	                  }
  	              }
  	          },
  	          productionStatusOther: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '备注不能为空'
  	                  }
  	              }
  	          },
  	          hasOwnRDOther: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '备注不能为空'
  	                  }
  	              }
  	          },
  	          hasQASOther: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '备注不能为空'
  	                  }
  	              }
  	          },
  	          busiSourceOther: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '备注不能为空'
  	                  }
  	              }
  	          },
  	          hasShareHolderChangeInSixMonthOther: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '备注不能为空'
  	                  }
  	              }
  	          },
  	          hasLawsuitRecentYearOther: {
  	        	  trigger: 'focus',
  	              validators: {
  	                  notEmpty: {
  	                      message: '附件不能为空'
  	                  }
  	              }
  	          },
  	          hasTroubleOther: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '备注不能为空'
  	                  }
  	              }
  	          },
  	          hasArrearsOfWagesOther: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '备注不能为空'
  	                  }
  	              }
  	          },
  	          ratioOfExport: {
  	        	  validators: {
  	        		  regexp: {
						  regexp: /^\d+(\.\d{1,2})?$/,
						  message: '只能输入最多两位小数的非负数'
					  },
  	        		  callback: {
  	        			  callback: function(value, validator) {
  	        				  var hasExport = $("#" + formId).find("input[name='hasExport']:checked").val();
  	        				  if (hasExport === '1') {
  	        					  if (CloudUtils.isEmpty(value)) {
	        						  return {
	  	        						  valid: false,
	  	        						  message: '公司是否涉及外销选择是的场合，比率不能为空'
	  	        					  }
	        					  }
  	        				  }
  	        				  return {
  	        					  valid: value == "" || (parseFloat(value) >= 0 && parseFloat(value) <= 100),
        						  message: '比率要在0-100之间'
  	        				  };
  	        			  }
  	        		  }
  	        	  }
  	          }
  	      }
  		})
  		.on('success.form.bv', function (e) {
  			e.preventDefault();
  		});
    };
    
    /**
     * 融资直通车单验证规则
     * @param formId
     */
    FlowMngCommon.financeFormValidator = function(formId) {
    	$('#' + formId).bootstrapValidator({
    	  excluded: [':disabled'],
  	      message: 'This value is not valid',
  	      feedbackIcons: {
  	          valid: 'glyphicon glyphicon-ok',
  	          invalid: 'glyphicon glyphicon-remove',
  	          validating: 'glyphicon glyphicon-refresh'
  	      },
  	      fields: {
  	    	  proName: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '项目名称不能为空'
  	                  }
  	              }
  	          },
  	          proMakeDate: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '发起日期不能为空'
  	                  }
  	              }
  	          },
  	          relBuyName: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '关联买方名称不能为空'
  	                  }
  	              }
  	          },
  	          relSaleName: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '关联卖方名称不能为空'
  	                  }
  	              }
  	          },
  	          relSaleCorpName: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '关联企业名称不能为空'
  	                  }
  	              }
  	          },
  	          note: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '备注不能为空'
  	                  }
  	              }
  	          },
  	          order: {
  	        	  trigger: 'focus',
  	              validators: {
  	                  notEmpty: {
  	                      message: '订单不能为空'
  	                  }
  	              }
  	          },
  	          delivery: {
  	        	  trigger: 'focus',
  	              validators: {
  	                  notEmpty: {
  	                      message: '发货单不能为空'
  	                  }
  	              }
  	          },
  	          receipt: {
  	        	  trigger: 'focus',
  	              validators: {
  	                  notEmpty: {
  	                      message: '收货单不能为空'
  	                  }
  	              }
  	          },
  	          godownEntry: {
  	        	  trigger: 'focus',
  	              validators: {
  	                  notEmpty: {
  	                      message: '入库单不能为空'
  	                  }
  	              }
  	          },
  	          list: {
  	        	  trigger: 'focus',
  	              validators: {
  	                  notEmpty: {
  	                      message: '榜单(保险)不能为空'
  	                  }
  	              }
  	          },
  	          storage: {
  	        	  trigger: 'focus',
  	              validators: {
  	                  notEmpty: {
  	                      message: '仓储单不能为空'
  	                  }
  	              }
  	          },
  	          billNo: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '合同/订单编号不能为空'
  	                  }
  	              }
  	          },
  	          billName: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '合同名称/订单不能为空'
  	                  }
  	              }
  	          },
  	          billAmount: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '合同/订单金额不能为空'
  	                  },
  	                  numeric: {
  	                	  message: '合同/订单金额请输入数字'
  	                  },
	                  callback: {
  	                	  message: '合同/订单金额要在0-1,000,000,000之间',
  	                	  callback: function(value, validator) {
  	                		  return parseFloat(value) >= 0 && parseFloat(value) <= 1000000000;
  	                	  }
  	                  }
  	              }
  	          },
  	          payType: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '付款方式不能为空'
  	                  }
  	              }
  	          },
  	          accountPeriod: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '合同/订单约定账期不能为空'
  	                  },
  	                  numeric: {
  	                	  message: '合同/订单约定账期请输入数字'
  	                  }
  	              }
  	          },
  	          hasInv: {
  	        	  validators: {
  	        		  callback: {
  	        			  message: '开立发票选择是的场合，至少要添加一张发票',
  	        			  callback: function(value, validator) {
  	        				  var val = $("#" + formId).find("input[name='hasInv']:checked").val();
  	        				  if (val === "1") {
  	        					  return $("#" + formId).find("input[name='invoice']").length > 0;
  	        				  } else {
  	        					  return true;
  	        				  }
  	        			  }
  	        		  }
  	        	  }
  	          },
  	          arBal: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '应收账款余额不能为空'
  	                  },
  	                  numeric: {
  	                	  message: '应收账款余额请输入数字'
  	                  },
	                  callback: {
  	                	  message: '应收账款余额要在-1,000,000,000-1,000,000,000之间',
  	                	  callback: function(value, validator) {
  	                		  return parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000;
  	                	  }
  	                  }
  	              }
  	          },
  	          aplFacAmt: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '拟申请保理金额不能为空'
  	                  },
  	                  numeric: {
  	                	  message: '拟申请保理金额请输入数字'
  	                  },
	                  callback: {
  	                	  message: '拟申请保理金额要在0-1,000,000,000之间',
  	                	  callback: function(value, validator) {
  	                		  return parseFloat(value) >= 0 && parseFloat(value) <= 1000000000;
  	                	  }
  	                  }
  	              }
  	          },
  	          aplPeriod: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '申请账期不能为空'
  	                  },
  	                  numeric: {
  	                	  message: '申请账期请输入数字'
  	                  }
  	              }
  	          },
  	          arPct: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '应收账款受让比例不能为空'
  	                  },
  	                  numeric: {
  	                	  message: '应收账款受让比例请输入数字'
  	                  }
  	              }
  	          },
  	          srchPrtSc: {
  	        	  trigger: 'focus',
  	              validators: {
  	                  notEmpty: {
  	                      message: '中登网查询截屏不能为空'
  	                  }
  	              }
  	          },
  	          licenseRegAddr: {
	              validators: {
	                  notEmpty: {
	                      message: '营业执照注册地址不能为空'
	                  }
	              }
	          },
	          relPrdBusiAddr: {
	              validators: {
	                  notEmpty: {
	                      message: '实际生产经营地址不能为空'
	                  }
	              }
	          },
	          visiAddr: {
	              validators: {
	                  notEmpty: {
	                      message: '访厂地址不能为空'
	                  }
	              }
	          },
	          mainVisiPerson1: {
	              validators: {
	                  notEmpty: {
	                      message: '主要访谈对象1不能为空'
	                  }
	              }
	          },
	          position1: {
	              validators: {
	                  notEmpty: {
	                      message: '职务不能为空'
	                  }
	              }
	          },
	          phone1: {
	              validators: {
	                  notEmpty: {
	                      message: '电话不能为空'
	                  },
	                  stringLength: {
			              min: 1,
			              max: 11,
			              message: '电话长度不超过11'
			          },
			          regexp: {
	                      regexp: /^[0-9]*$/,
	                      message: '电话只能是数字'
	                  }
	              }
	          },
	          facAddrArea: {
	              validators: {
	                  notEmpty: {
	                      message: '厂区（经营场所）处于不能为空'
	                  }
	              }
	          },
	          facAddrType: {
	              validators: {
	                  notEmpty: {
	                      message: '厂房/经营场所不能为空'
	                  }
	              }
	          },
	          mainFacBuildTime: {
	              validators: {
	                  notEmpty: {
	                      message: '主要经营场所建造时间不能为空'
	                  }
	              }
	          },
	          inventoryStorage: {
	              validators: {
	                  notEmpty: {
	                      message: '存货存放不能为空'
	                  }
	              }
	          },
	          deliverMethod: {
	              validators: {
	                  notEmpty: {
	                      message: '公司货物运输方式及比率不能为空'
	                  }
	              }
	          },
	          mainEquipment: {
	              validators: {
	                  notEmpty: {
	                      message: '公司主要生产设备不能为空'
	                  }
	              }
	          },
	          equNum: {
	              validators: {
	                  notEmpty: {
	                      message: '数量不能为空'
	                  },
  	                  regexp: {
	                      regexp: /^[0-9]*$/,
	                      message: '请输入正整数'
	                  }
	              }
	          },
	          prdCapUtil: {
	              validators: {
	                  notEmpty: {
	                      message: '公司产能利用不能为空'
	                  }
	              }
	          },
	          mainEnergyConsumption: {
	              validators: {
	                  notEmpty: {
	                      message: '企业主要能耗不能为空'
	                  }
	              }
	          },
	          postsStaffOnSite: {
	              validators: {
	                  notEmpty: {
	                      message: '现场员工上岗人数不能为空'
	                  },
  	                  regexp: {
	                      regexp: /^[0-9]*$/,
	                      message: '请输入正整数'
	                  }
	              }
	          },
	          isBusy: {
	              validators: {
	                  notEmpty: {
	                      message: '工人忙碌程度不能为空'
	                  }
	              }
	          },
	          orderOfClasses: {
	              validators: {
	                  notEmpty: {
	                      message: '每天开工班次不能为空'
	                  }
	              }
	          },
	          productionStatus: {
	              validators: {
	                  notEmpty: {
	                      message: '生产情况不能为空'
	                  }
	              }
	          },
	          machineAvgUseLife: {
	              validators: {
	                  notEmpty: {
	                      message: '机器的平均使用年限不能为空'
	                  }
	              }
	          },
	          mainPrdServCont: {
	              validators: {
	                  notEmpty: {
	                      message: '公司主要产品或服务内容不能为空'
	                  }
	              }
	          },
	          busiSource: {
	              validators: {
	                  notEmpty: {
	                      message: '业务来源不能为空'
	                  }
	              }
	          },
	          ratio: {
	              validators: {
	                  notEmpty: {
	                      message: '比率不能为空'
	                  },
  	                  regexp: {
						  regexp: /^\d+(\.\d{1,2})?$/,
						  message: '只能输入最多两位小数的非负数'
					  },
  	                  callback: {
  	                	  message: '比率要在0-100之间',
  	                	  callback: function(value, validator) {
  	                		  return parseFloat(value) >= 0 && parseFloat(value) <= 100;
  	                	  }
  	                  }
	              }
	          },
	          capitalReturnMethod: {
	              validators: {
	                  notEmpty: {
	                      message: '公司资金回笼的主要方式不能为空'
	                  }
	              }
	          },
	          biggestBuyer: {
	              validators: {
	                  notEmpty: {
	                      message: '公司最大采购商名称不能为空'
	                  }
	              }
	          },
	          ratioOfBiggestBuyer: {
	              validators: {
	                  notEmpty: {
	                      message: '比率不能为空'
	                  },
  	                  regexp: {
						  regexp: /^\d+(\.\d{1,2})?$/,
						  message: '只能输入最多两位小数的非负数'
					  },
  	                  callback: {
  	                	  message: '比率要在0-100之间',
  	                	  callback: function(value, validator) {
  	                		  return parseFloat(value) >= 0 && parseFloat(value) <= 100;
  	                	  }
  	                  }
	              }
	          },
	          biggestSupplier: {
	              validators: {
	                  notEmpty: {
	                      message: '公司最大供应商名称不能为空'
	                  }
	              }
	          },
	          ratioOfBiggestSupplier: {
	              validators: {
	                  notEmpty: {
	                      message: '比率不能为空'
	                  },
  	                  regexp: {
						  regexp: /^\d+(\.\d{1,2})?$/,
						  message: '只能输入最多两位小数的非负数'
					  },
  	                  callback: {
  	                	  message: '比率要在0-100之间',
  	                	  callback: function(value, validator) {
  	                		  return parseFloat(value) >= 0 && parseFloat(value) <= 100;
  	                	  }
  	                  }
	              }
	          },
	          diffEarningsTax: {
	              validators: {
	                  notEmpty: {
	                      message: '企业财报与税报差异不能为空'
	                  }
	              }
	          },
	          arAvgPeriod: {
	              validators: {
	                  notEmpty: {
	                      message: '公司应收帐款平均帐期不能为空'
	                  },
  	                  regexp: {
	                      regexp: /^[0-9]*$/,
	                      message: '请输入正整数'
	                  }
	              }
	          },
	          apAvgPeriod: {
	              validators: {
	                  notEmpty: {
	                      message: '公司应付帐款平均帐期不能为空'
	                  },
	                  regexp: {
	                      regexp: /^[0-9]*$/,
	                      message: '请输入正整数'
	                  }
	              }
	          },
	          materialStockFrequency: {
	              validators: {
	                  notEmpty: {
	                      message: '公司材料采购频率不能为空'
	                  }
	              }
	          },
	          nearly3yAvgGrossMarginTrend: {
	              validators: {
	                  notEmpty: {
	                      message: '公司近3年平均毛利率趋势不能为空'
	                  }
	              }
	          },
	          nowGrossMargin: {
	              validators: {
	                  notEmpty: {
	                      message: '公司目前毛利率不能为空'
	                  },
  	                  regexp: {
                          regexp: /^(-)?\d+(\.\d{1,2})?$/,
                          message: '只能输入最多两位小数的数字'
                      },
  	                  callback: {
  	                	  message: '毛利率要在-100-100之间',
  	                	  callback: function(value, validator) {
  	                		  return parseFloat(value) >= -100 && parseFloat(value) <= 100;
  	                	  }
  	                  }
	              }
	          },
	          processDisc: {
	              validators: {
	                  notEmpty: {
	                      message: '此项不能为空'
	                  }
	              }
	          },
	          relLoanDemand: {
	              validators: {
	                  notEmpty: {
	                      message: '此项不能为空'
	                  }
	              }
	          },
	          otherNoteEvaluation: {
	              validators: {
	                  notEmpty: {
	                      message: '此项不能为空'
	                  }
	              }
	          },
	          taxInvSysChk: {
	              validators: {
	                  notEmpty: {
	                      message: '纳税开票系统查核不能为空'
	                  }
	              }
	          },
	          bankWaterSysChk: {
	              validators: {
	                  notEmpty: {
	                      message: '银行流水系统查核不能为空'
	                  }
	              }
	          },
	          financeSysChk: {
	              validators: {
	                  notEmpty: {
	                      message: '财务系统查核不能为空'
	                  }
	              }
	          },
	          facAddrTypeOther: {
	              validators: {
			          callback: {
		    			  message: '备注不能为空',
		    			  callback: function(value, validator) {
		    				  var selVal = $("#" + formId).find("#facAddrType").val();
		    				  if (selVal === '3') {
		    					  return !CloudUtils.isEmpty(value);
		    				  }
		    				  return true;
		    			  }
		    		  }
	              }
	          },
	          mainWorkShopBuildTimeOther: {
	              validators: {
	            	  callback: {
		    			  message: '备注不能为空',
		    			  callback: function(value, validator) {
		    				  var selVal = $("#" + formId).find("#mainWorkShopBuildTime").val();
		    				  if (selVal === '4') {
		    					  return !CloudUtils.isEmpty(value);
		    				  }
		    				  return true;
		    			  }
		    		  }
	              }
	          },
	          workShopSafeConfigOther: {
	              validators: {
	            	  callback: {
		    			  message: '备注不能为空',
		    			  callback: function(value, validator) {
		    				  var selVal = $("#" + formId).find("input[name='workShopSafeConfig']:checked").val();
		    				  if (selVal === '1') {
		    					  return !CloudUtils.isEmpty(value);
		    				  }
		    				  return true;
		    			  }
		    		  }
	              }
	          },
	          inventoryStorageOther: {
	              validators: {
	            	  callback: {
		    			  message: '备注不能为空',
		    			  callback: function(value, validator) {
		    				  var selVal = $("#" + formId).find("#inventoryStorage").val();
		    				  if (selVal === '3') {
		    					  return !CloudUtils.isEmpty(value);
		    				  }
		    				  return true;
		    			  }
		    		  }
	              }
	          },
	          hasLongTimeStoredGoodsOther: {
	              validators: {
	            	  callback: {
	        			  message: '备注不能为空',
	        			  callback: function(value, validator) {
	        				  var selVal = $("#" + formId).find("input[name='hasLongTimeStoredGoods']:checked").val();
		    				  if (selVal === '1') {
		    					  return !CloudUtils.isEmpty(value);
		    				  }
		    				  return true;
	        			  }
	        		  }
	              }
	          },
	          hasOutStorageManagementSystemOther: {
	              validators: {
	            	  callback: {
	        			  message: '备注不能为空',
	        			  callback: function(value, validator) {
	        				  var selVal = $("#" + formId).find("input[name='hasOutStorageManagementSystem']:checked").val();
		    				  if (selVal === '1') {
		    					  return !CloudUtils.isEmpty(value);
		    				  }
		    				  return true;
	        			  }
	        		  }
	              }
	          },
	          deliverMethodOther: {
	              validators: {
	            	  callback: {
		    			  message: '备注不能为空',
		    			  callback: function(value, validator) {
		    				  var selVal = $("#" + formId).find("#deliverMethod").val();
		    				  if (selVal === '4') {
		    					  return !CloudUtils.isEmpty(value);
		    				  }
		    				  return true;
		    			  }
		    		  }
	              }
	          },
	          hasAnyMachineIdleOther: {
	              validators: {
	            	  callback: {
	        			  message: '备注不能为空',
	        			  callback: function(value, validator) {
	        				  var selVal = $("#" + formId).find("input[name='hasAnyMachineIdle']:checked").val();
		    				  if (selVal === '1') {
		    					  return !CloudUtils.isEmpty(value);
		    				  }
		    				  return true;
	        			  }
	        		  }
	              }
	          },
	          hasSupportingFacilitiesOther: {
	              validators: {
	            	  callback: {
	        			  message: '备注不能为空',
	        			  callback: function(value, validator) {
	        				  var selVal = $("#" + formId).find("input[name='hasSupportingFacilities']:checked").val();
		    				  if (selVal === '1') {
		    					  return !CloudUtils.isEmpty(value);
		    				  }
		    				  return true;
	        			  }
	        		  }
	              }
	          },
	          mainEnergyConsumptionOther: {
	              validators: {
	            	  callback: {
		    			  message: '备注不能为空',
		    			  callback: function(value, validator) {
		    				  var selVal = $("#" + formId).find("#mainEnergyConsumption").val();
		    				  if (selVal === '4') {
		    					  return !CloudUtils.isEmpty(value);
		    				  }
		    				  return true;
		    			  }
		    		  }
	              }
	          },
	          isBusyOther: {
	              validators: {
	            	  callback: {
		    			  message: '备注不能为空',
		    			  callback: function(value, validator) {
		    				  var selVal = $("#" + formId).find("#isBusy").val();
		    				  if (selVal === '3') {
		    					  return !CloudUtils.isEmpty(value);
		    				  }
		    				  return true;
		    			  }
		    		  }
	              }
	          },
	          orderOfClassesOther: {
	              validators: {
	            	  callback: {
		    			  message: '备注不能为空',
		    			  callback: function(value, validator) {
		    				  var selVal = $("#" + formId).find("#orderOfClasses").val();
		    				  if (selVal === '4') {
		    					  return !CloudUtils.isEmpty(value);
		    				  }
		    				  return true;
		    			  }
		    		  }
	              }
	          },
	          productionStatusOther: {
	              validators: {
	            	  callback: {
		    			  message: '备注不能为空',
		    			  callback: function(value, validator) {
		    				  var selVal = $("#" + formId).find("#productionStatus").val();
		    				  if (selVal === '1' || selVal === '2') {
		    					  return !CloudUtils.isEmpty(value);
		    				  }
		    				  return true;
		    			  }
		    		  }
	              }
	          },
	          hasOwnRDOther: {
	              validators: {
	            	  callback: {
	        			  message: '备注不能为空',
	        			  callback: function(value, validator) {
	        				  var selVal = $("#" + formId).find("input[name='hasOwnRD']:checked").val();
		    				  if (selVal === '1') {
		    					  return !CloudUtils.isEmpty(value);
		    				  }
		    				  return true;
	        			  }
	        		  }
	              }
	          },
	          hasQASOther: {
	              validators: {
	            	  callback: {
	        			  message: '备注不能为空',
	        			  callback: function(value, validator) {
	        				  var selVal = $("#" + formId).find("input[name='hasQAS']:checked").val();
		    				  if (selVal === '1') {
		    					  return !CloudUtils.isEmpty(value);
		    				  }
		    				  return true;
	        			  }
	        		  }
	              }
	          },
	          busiSourceOther: {
	              validators: {
	            	  callback: {
		    			  message: '备注不能为空',
		    			  callback: function(value, validator) {
		    				  var selVal = $("#" + formId).find("#busiSource").val();
		    				  if (selVal === '5') {
		    					  return !CloudUtils.isEmpty(value);
		    				  }
		    				  return true;
		    			  }
		    		  }
	              }
	          },
	          hasShareHolderChangeInSixMonthOther: {
	              validators: {
	            	  callback: {
	        			  message: '备注不能为空',
	        			  callback: function(value, validator) {
	        				  var selVal = $("#" + formId).find("input[name='hasShareHolderChangeInSixMonth']:checked").val();
		    				  if (selVal === '1') {
		    					  return !CloudUtils.isEmpty(value);
		    				  }
		    				  return true;
	        			  }
	        		  }
	              }
	          },
	          hasLawsuitRecentYearOther: {
	        	  trigger: 'focus',
	              validators: {
	            	  callback: {
	        			  message: '备注不能为空',
	        			  callback: function(value, validator) {
	        				  var selVal = $("#" + formId).find("input[name='hasLawsuitRecentYear']:checked").val();
		    				  if (selVal === '1') {
		    					  return !CloudUtils.isEmpty(value);
		    				  }
		    				  return true;
	        			  }
	        		  }
	              }
	          },
	          hasTroubleOther: {
	              validators: {
	            	  callback: {
	        			  message: '备注不能为空',
	        			  callback: function(value, validator) {
	        				  var selVal = $("#" + formId).find("input[name='hasTrouble']:checked").val();
		    				  if (selVal === '1') {
		    					  return !CloudUtils.isEmpty(value);
		    				  }
		    				  return true;
	        			  }
	        		  }
	              }
	          },
	          hasArrearsOfWagesOther: {
	              validators: {
	            	  callback: {
	        			  message: '备注不能为空',
	        			  callback: function(value, validator) {
	        				  var selVal = $("#" + formId).find("input[name='hasArrearsOfWages']:checked").val();
		    				  if (selVal === '1') {
		    					  return !CloudUtils.isEmpty(value);
		    				  }
		    				  return true;
	        			  }
	        		  }
	              }
	          },
	          ratioOfExport: {
	        	  validators: {
	        		  regexp: {
						  regexp: /^\d+(\.\d{1,2})?$/,
						  message: '只能输入最多两位小数的非负数'
					  },
  	        		  callback: {
  	        			  callback: function(value, validator) {
  	        				  var hasExport = $("#" + formId).find("input[name='hasExport']:checked").val();
  	        				  if (hasExport === '1') {
  	        					  if (CloudUtils.isEmpty(value)) {
  	        						  return {
    	        						  valid: false,
    	        						  message: '公司是否涉及外销选择是的场合，比率不能为空'
    	        					  }
  	        					  }
  	        				  }
  	        				  return {
  	        					  valid: value == "" || (parseFloat(value) >= 0 && parseFloat(value) <= 100),
        						  message: '比率要在0-100之间'
  	        				  };
  	        			  }
  	        		  }
	        	  }
	          },
	          area: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          custManager: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          isIndustryRipe: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          riskPoints: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          shortageAndPositionInIndustry: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          webSearchInfo: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          zhongdengSearch: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          foreignInvestment: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          busiRisk: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          insideOperationAnalysis: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          changeMore20perAnalysis: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          finacialRtAnalysis: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          incomeVerifMethod: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          incomeAuthenticityEvaluate: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          profitLevel: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          profitQuality: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          rigidLiabilityAnalysis: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          hiddenLiabilities: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          contingentLiabilities: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          historicalRecordsAnalysis: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          turnoverRate: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          receivableConcentration: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          survivalScale: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          advanceFundingPressure: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          survivalPriceChanges: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          mobilityTest: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          whetherContractTransferred: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          businessDisputeAgreement: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          contractValidity: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          cntValuationMethod: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          settlementMethod: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          billing: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          invoiceCorrespondsContract: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          invoiceBillContract: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          invoiceCorrespondsSettlementMethod: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          confirmArProportionReceivable: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  },
  	                  regexp: {
						  regexp: /^\d+(\.\d{1,2})?$/,
						  message: '只能输入最多两位小数的非负数'
					  },
  	                  callback: {
  	                	  message: '比率要在0-100之间',
  	                	  callback: function(value, validator) {
  	                		  return parseFloat(value) >= 0 && parseFloat(value) <= 100;
  	                	  }
  	                  }
  	              }
  	          },
  	          informFactoring: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          recourse: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          unInformFactoring: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          industryRiskAcceptanceAnalysis: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          introductionOtherIncreaseCreditMethod: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          associatedRiskMatchingMeasures: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          assetLiabilityRatioHigh: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          mortgageGuaranteeAnalysis: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          reditLine: {
  	              validators: {
  	            	  notEmpty: {
	                      message: '授信额度不能为空'
	                  },
	                  numeric: {
	                	  message: '授信额度请输入数字'
	                  },
	                  callback: {
	                	  message: '授信额度要在0-1,000,000,000之间',
	                	  callback: function(value, validator) {
	                		  return parseFloat(value) >= 0 && parseFloat(value) <= 1000000000;
	                	  }
	                  }
  	              }
  	          },
  	          reditLineType: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          deadline: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          arFarmInRatio: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  },
  	                  regexp: {
						  regexp: /^\d+(\.\d{1,2})?$/,
						  message: '只能输入最多两位小数的非负数'
					  },
  	                  callback: {
  	                	  message: '比率要在0-100之间',
  	                	  callback: function(value, validator) {
  	                		  return parseFloat(value) >= 0 && parseFloat(value) <= 100;
  	                	  }
  	                  }
  	              }
  	          },
  	          busiDeadline: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          serviceFeeCollection: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          reviewConclusion: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	        loanPct : {
	              validators: {
	            	notEmpty: {message: '融资比例不能为空'},
	            	numeric: {message: '只能输入数字'},
	              	callback: {  
	                       message: '融资比例要在0-100之间',  
	                       callback: function(value, validator) { 
	                      	 return parseFloat(value)>=0&&parseFloat(value)<=100;
	                       }  
	                   }  
	              }
	    	  },
	          standardRate : {
	              validators: {
	            	    notEmpty: {message: '基准利率不能为空'},
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                         message: '基准利率要在0-100之间',  
	                         callback: function(value, validator) { 
	                        	 return parseFloat(value)>=0&&parseFloat(value)<=100;
	                         }  
	                     }  
	                }
	      	  },
	          rateFloatPct : {
	              validators: {
	            	    notEmpty: {message: '利率上浮比例不能为空'},
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                         message: '利率上浮比例要在0-50之间',  
	                         callback: function(value, validator) { 
	                        	 return parseFloat(value)>=0&&parseFloat(value)<=50;
	                         }  
	                     }  
	                }
	      	  },
	          penaltyIntRate : {
	              validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                         message: '罚息率要在0-200之间',  
	                         callback: function(value, validator) { 
	                        	 return value == "" || (parseFloat(value)>=0&&parseFloat(value)<=200);
	                         }  
	                     }  
	                }
	      	  },
	      	  managementFeeRate : {
	              validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                         message: '管理费率要在0-100之间',  
	                         callback: function(value, validator) { 
	                        	 return value == "" || (parseFloat(value)>=0&&parseFloat(value)<=100);
	                         }  
	                     }  
	                }
	      	  },
		      contractNo: {
		          validators: {
		              notEmpty: {
		                  message: '合同编号不能为空'
		              }
		          }
		      },
		      arAmt: {
		          validators: {
		              notEmpty: {
		                  message: '应收账款不能为空'
		              },
		              regexp: {
	                      regexp: /^\d+(\.\d{1,2})?$/,
	                      message: '只能输入最多两位小数的非负数'
	                  },
	                  callback: {
	                	  message: '应收账款要在0-1,000,000,000之间',
	                	  callback: function(value, validator, $field) {
	                		  return parseFloat(value) >= 0 && parseFloat(value) <= 1000000000;
	                	  }
	                  }
		          }
		      },
		      arTransfAmt: {
		          validators: {
		              notEmpty: {
		                  message: '应收账款受让款不能为空'
		              },
		              regexp: {
	                      regexp: /^\d+(\.\d{1,2})?$/,
	                      message: '只能输入最多两位小数的非负数'
	                  },
	                  callback: {
	                	  message: '应收账款受让款要在0-1,000,000,000之间',
	                	  callback: function(value, validator, $field) {
	                		  return parseFloat(value) >= 0 && parseFloat(value) <= 1000000000;
	                	  }
	                  }
		          }
		      },
		      earnestMoney: {
		          validators: {
		              notEmpty: {
		                  message: '保证金不能为空'
		              },
		              regexp: {
	                      regexp: /^\d+(\.\d{1,2})?$/,
	                      message: '只能输入最多两位小数的非负数'
	                  },
	                  callback: {
	                	  message: '保证金要在0-1,000,000,000之间',
	                	  callback: function(value, validator, $field) {
	                		  return parseFloat(value) >= 0 && parseFloat(value) <= 1000000000;
	                	  }
	                  }
		          }
		      },
		      serviceAmt: {
		          validators: {
		              notEmpty: {
		                  message: '服务费不能为空'
		              },
		              regexp: {
	                      regexp: /^\d+(\.\d{1,2})?$/,
	                      message: '只能输入最多两位小数的非负数'
	                  },
	                  callback: {
	                	  message: '服务费要在0-1,000,000,000之间',
	                	  callback: function(value, validator, $field) {
	                		  return parseFloat(value) >= 0 && parseFloat(value) <= 1000000000;
	                	  }
	                  }
		          }
		      },
		      arTransfNotice: {
		          validators: {
		              notEmpty: {
		                  message: '应收账款转让通知不能为空'
		              }
		          }
		      },
		      guaranteeValue: {
		          validators: {
		        	  regexp: {
	                      regexp: /^\d+(\.\d{1,2})?$/,
	                      message: '只能输入最多两位小数的非负数'
	                  },
	                  callback: {
  	                	  message: '担保价值要在0-1,000,000,000之间',
  	                	  callback: function(value, validator) {
  	                		  return value == "" || (parseFloat(value) >= 0 && parseFloat(value) <= 1000000000);
  	                	  }
  	                  }
		          }
		      },
		      inComeMakeUp: {
		          validators: {
		        	  regexp: {
	                      regexp: /^(-)?\d+(\.\d{1,2})?$/,
	                      message: '只能输入最多两位小数的非负数'
	                  },
	                  callback: {
  	                	  message: '收益补偿要在-1,000,000,000-1,000,000,000之间',
  	                	  callback: function(value, validator) {
  	                		  return value == "" || (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
  	                	  }
  	                  }
		          }
		      },
		      cntVersion: {
		          validators: {
		              notEmpty: {
		                  message: '合同版本不能为空'
		              },
		              regexp: {
	                      regexp: /^\d+(\.\d+)?$/,
	                      message: '请输入数字'
	                  }
		          }
		      },
		      cntEffectDate: {
		          validators: {
		              notEmpty: {
		                  message: '合同生效日期不能为空'
		              },
		              callback: {
		            	  message: "合同生效日期不能大于合同结束日期",
		            	  callback: function(value, validator) {
		            		  var end = validator.getFieldElements('cntEndDate').val();
		            		  return end == "" || value <= end;
		            	  }
		              }
		          }
		      },
		      cntEndDate: {
		          validators: {
		              notEmpty: {
		                  message: '合同结束日期不能为空'
		              },
		              callback: {
		            	  message: "合同结束日期不能小于合同生效日期",
		            	  callback: function(value, validator) {
		            		  var begin = validator.getFieldElements('cntEffectDate').val();
		            		  return begin == "" || value >= begin;
		            	  }
		              }
		          }
		      },
		      cntFiles: {
		    	  trigger: 'focus',
		          validators: {
		              notEmpty: {
		                  message: '合同附件不能为空'
		              }
		          }
		      },
		      loanLimit: {
		          validators: {
		              notEmpty: {
		                  message: '融资期限不能为空'
		              },
		              regexp: {
	                      regexp: /^[0-9]*$/,
	                      message: '请输入正整数'
	                  }
		          }
		      },
		      loanAmt: {
		          validators: {
		              notEmpty: {
		                  message: '融资金额不能为空'
		              },
		              regexp: {
	                      regexp: /^\d+(\.\d{1,2})?$/,
	                      message: '只能输入最多两位小数的非负数'
	                  },
	                  callback: {
	                	  message: '融资金额要在0-1,000,000,000之间',
	                	  callback: function(value, validator, $field) {
	                		  return parseFloat(value) >= 0 && parseFloat(value) <= 1000000000;
	                	  }
	                  }
		          }
		      },
		      commission: {
		          validators: {
		        	  regexp: {
	                      regexp: /^\d+(\.\d{1,2})?$/,
	                      message: '只能输入最多两位小数的非负数'
	                  },
	                  callback: {
	                	  message: '手续费要在0-1,000,000,000之间',
	                	  callback: function(value, validator, $field) {
	                		  return value == "" || (parseFloat(value) >= 0 && parseFloat(value) <= 1000000000);
	                	  }
	                  }
		          }
		      },
		      otherCost: {
		          validators: {
		        	  regexp: {
	                      regexp: /^(-)?\d+(\.\d{1,2})?$/,
	                      message: '只能输入最多两位小数的非负数'
	                  },
	                  callback: {
	                	  message: '其他费用要在-1,000,000,000-1,000,000,000之间',
	                	  callback: function(value, validator, $field) {
	                		  return value == "" || (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
	                	  }
	                  }
		          }
		      },
		      penalty: {
		          validators: {
		        	  regexp: {
	                      regexp: /^\d+(\.\d{1,2})?$/,
	                      message: '只能输入最多两位小数的非负数'
	                  },
	                  callback: {
	                	  message: '违约金要在0-1,000,000,000之间',
	                	  callback: function(value, validator, $field) {
	                		  return value == "" || (parseFloat(value) >= 0 && parseFloat(value) <= 1000000000);
	                	  }
	                  }
		          }
		      },
		      loanPeriod: {
		          validators: {
		        	  regexp: {
	                      regexp: /^[0-9]*$/,
	                      message: '请输入正整数'
	                  }
		          }
		      },
		      repaymentCorpAcount: {
		          validators: {
		        	  notEmpty: {
	                	  message: '还款企业账户不能为空'
	                  }
		          }
		      },
		      repaymentPlan: {
		          validators: {
		        	  notEmpty: {
	                	  message: '还款计划不能为空'
	                  }
		          }
		      },
		      repaymentTimes: {
		          validators: {
		        	  notEmpty: {
	                	  message: '还款时长不能为空'
	                  },
	                  regexp: {
	                      regexp: /^[0-9]*$/,
	                      message: '请输入正整数'
	                  },
	                  callback: {
	                	  callback: function(value, validator, $field) {
	                		  var repaymentPlan = validator.getFieldElements('repaymentPlan').val();
	                		  var valid, message;
	                		  // 年
	                		  if (repaymentPlan == '1') {
	                			  valid = parseInt(value) >= 0 && parseInt(value) <= 5;
	                			  message = "还款时长要小于5年";
	                			  // 季度
	                		  } else if (repaymentPlan == '2') {
	                			  valid = parseInt(value) >= 0 && parseInt(value) <= 20;
	                			  message = "还款时长要小于20个季度";
	                			  // 月
	                		  } else if (repaymentPlan == '3') {
	                			  valid = parseInt(value) >= 0 && parseInt(value) <= 60;
	                			  message = "还款时长要小于60个月";
	                			  // 天
	                		  } else if (repaymentPlan == '4') {
	                			  valid = parseInt(value) >= 0 && parseInt(value) <= 1800;
	                			  message = "还款时长要小于1800天";
	                		  }
	                		  
	                		  return {
	                			  valid: valid,
	                			  message: message
	                		  }
	                      }
	                  }
		          }
		      },
		      repaymentAmt: {
		          validators: {
		        	  notEmpty: {
	                	  message: '还款金额不能为空'
	                  },
	                  regexp: {
	                      regexp: /^\d+(\.\d{1,2})?$/,
	                      message: '只能输入最多两位小数的非负数'
	                  },
	                  callback: {
  	                	  message: '还款金额要在0-1,000,000,000之间',
  	                	  callback: function(value, validator) {
  	                		  return parseFloat(value) >= 0 && parseFloat(value) <= 1000000000;
  	                	  }
  	                  }
		          }
		      },
		      repaymentType: {
		          validators: {
		        	  notEmpty: {
	                	  message: '还款类型不能为空'
	                  }
		          }
		      },
		      lendBathNo: {
  	              validators: {
  	            	  numeric: {
  	                      message: '请输入数字'
  	                  }
  	              }
  	          },
  	          lendAmt: {
  	              validators: {
  	            	  numeric: {
  	                      message: '放款金额请输入数字'
  	                  },
	                  callback: {
  	                	  message: '放款金额要在0-1,000,000,000之间',
  	                	  callback: function(value, validator) {
  	                		  return value == "" || (parseFloat(value) >= 0 && parseFloat(value) <= 1000000000);
  	                	  }
  	                  }
  	              }
  	          },
  	          lendPerson: {
  	              validators: {
  	            	  notEmpty: {
  	                      message: '放款人不能为空'
  	                  }
  	              }
  	          },
  	          lendCorp: {
  	              validators: {
  	            	  notEmpty: {
  	                      message: '放款企业不能为空'
  	                  }
  	              }
  	          },
  	          lendState: {
  	              validators: {
  	            	  notEmpty: {
  	                      message: '放款状态不能为空'
  	                  }
  	              }
  	          }
  	      }
  		})
  		.on('success.form.bv', function (e) {
  			e.preventDefault();
  		});
    }
    
    /**
     * 风控报告表单验证规则
     * @param formId
     */
    FlowMngCommon.riskCtrlFormValidator = function(formId) {
    	$("#" + formId).bootstrapValidator({
  	      message: 'This value is not valid',
  	      feedbackIcons: {
  	          valid: 'glyphicon glyphicon-ok',
  	          invalid: 'glyphicon glyphicon-remove',
  	          validating: 'glyphicon glyphicon-refresh'
  	      },
  	      fields: {
  	    	  area: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          custManager: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          isIndustryRipe: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          riskPoints: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          shortageAndPositionInIndustry: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          webSearchInfo: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          zhongdengSearch: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          foreignInvestment: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          busiRisk: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          insideOperationAnalysis: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          changeMore20perAnalysis: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          finacialRtAnalysis: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          incomeVerifMethod: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          incomeAuthenticityEvaluate: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          profitLevel: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          profitQuality: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          rigidLiabilityAnalysis: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          hiddenLiabilities: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          contingentLiabilities: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          historicalRecordsAnalysis: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          turnoverRate: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          receivableConcentration: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          survivalScale: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          advanceFundingPressure: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          survivalPriceChanges: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          mobilityTest: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          whetherContractTransferred: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          businessDisputeAgreement: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          contractValidity: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          cntValuationMethod: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          settlementMethod: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          billing: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          order: {
  	        	  trigger: 'focus',
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          delivery: {
  	        	  trigger: 'focus',
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          receipt: {
  	        	  trigger: 'focus',
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          godownEntry: {
  	        	  trigger: 'focus',
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          list: {
  	        	  trigger: 'focus',
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          storage: {
  	        	  trigger: 'focus',
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          invoiceCorrespondsContract: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          invoiceBillContract: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          invoiceCorrespondsSettlementMethod: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          confirmArProportionReceivable: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  },
  	                  regexp: {
						  regexp: /^\d+(\.\d{1,2})?$/,
						  message: '只能输入最多两位小数的非负数'
					  },
  	                  callback: {
  	                	  message: '比率要在0-100之间',
  	                	  callback: function(value, validator) {
  	                		  return parseFloat(value) >= 0 && parseFloat(value) <= 100;
  	                	  }
  	                  }
  	              }
  	          },
  	          informFactoring: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          recourse: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          unInformFactoring: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          industryRiskAcceptanceAnalysis: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          introductionOtherIncreaseCreditMethod: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          associatedRiskMatchingMeasures: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          assetLiabilityRatioHigh: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          mortgageGuaranteeAnalysis: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          reditLine: {
  	              validators: {
  	            	  notEmpty: {
	                      message: '授信额度不能为空'
	                  },
	                  numeric: {
	                	  message: '授信额度请输入数字'
	                  },
	                  callback: {
	                	  message: '授信额度要在0-1,000,000,000之间',
	                	  callback: function(value, validator) {
	                		  return parseFloat(value) >= 0 && parseFloat(value) <= 1000000000;
	                	  }
	                  }
  	              }
  	          },
  	          reditLineType: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          deadline: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          arFarmInRatio: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  },
  	                  regexp: {
						  regexp: /^\d+(\.\d{1,2})?$/,
						  message: '只能输入最多两位小数的非负数'
					  },
  	                  callback: {
  	                	  message: '比率要在0-100之间',
  	                	  callback: function(value, validator) {
  	                		  return parseFloat(value) >= 0 && parseFloat(value) <= 100;
  	                	  }
  	                  }
  	              }
  	          },
  	          busiDeadline: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          serviceFeeCollection: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          },
  	          reviewConclusion: {
  	              validators: {
  	                  notEmpty: {
  	                      message: '此项不能为空'
  	                  }
  	              }
  	          }
  	      }
  		})
  		.on('success.form.bv', function (e) {
  			e.preventDefault();
  		});
    };
    
    /**
     * 合同申请表单验证规则
     * @param formId
     */
    FlowMngCommon.contractFormValidator = function(formId) {
    	$('#' + formId).bootstrapValidator({
	      message: 'This value is not valid',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  proName: {
		          validators: {
		              notEmpty: {
		                  message: '项目名称不能为空'
		              }
		          }
		      },
	    	  corpNm: {
		          validators: {
		              notEmpty: {
		                  message: '公司名称不能为空'
		              }
		          }
		      },
	    	  busiLicenceNo: {
		          validators: {
		              notEmpty: {
		                  message: '营业执照号码不能为空'
		              }
		          }
		      },
		      repaymentCorp: {
		          validators: {
		              notEmpty: {
		                  message: '还款企业不能为空'
		              }
		          }
		      },
	    	  loanPct : {
	              validators: {
	            	notEmpty: {message: '融资比例不能为空'},
	            	numeric: {message: '只能输入数字'},
	              	callback: {  
	                       message: '融资比例要在0-100之间',  
	                       callback: function(value, validator) { 
	                      	 return parseFloat(value)>=0&&parseFloat(value)<=100;
	                       }  
	                   }  
	              }
	    	  },
	          standardRate : {
	              validators: {
	            	    notEmpty: {message: '基准利率不能为空'},
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                         message: '基准利率要在0-100之间',  
	                         callback: function(value, validator) { 
	                        	 return parseFloat(value)>=0&&parseFloat(value)<=100;
	                         }  
	                     }  
	                }
	      	  },
	          rateFloatPct : {
	              validators: {
	            	    notEmpty: {message: '利率上浮比例不能为空'},
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                         message: '利率上浮比例要在0-50之间',  
	                         callback: function(value, validator) { 
	                        	 return parseFloat(value)>=0&&parseFloat(value)<=50;
	                         }  
	                     }  
	                }
	      	  },
	          penaltyIntRate : {
	              validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                         message: '罚息率要在0-200之间',  
	                         callback: function(value, validator) { 
	                        	 return value == "" || (parseFloat(value)>=0&&parseFloat(value)<=200);
	                         }  
	                     }  
	                }
	      	  },
	      	  managementFeeRate : {
	              validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                         message: '管理费率要在0-100之间',  
	                         callback: function(value, validator) { 
	                        	 return value == "" || (parseFloat(value)>=0&&parseFloat(value)<=100);
	                         }  
	                     }  
	                }
	      	  },
		      contractNo: {
		          validators: {
		              notEmpty: {
		                  message: '合同编号不能为空'
		              }
		          }
		      },
		      arAmt: {
		          validators: {
		              notEmpty: {
		                  message: '应收账款不能为空'
		              },
		              regexp: {
	                      regexp: /^\d+(\.\d{1,2})?$/,
	                      message: '只能输入最多两位小数的非负数'
	                  },
	                  callback: {
	                	  message: '应收账款要在0-1,000,000,000之间',
	                	  callback: function(value, validator, $field) {
	                		  return parseFloat(value) >= 0 && parseFloat(value) <= 1000000000;
	                	  }
	                  }
		          }
		      },
		      arTransfAmt: {
		          validators: {
		              notEmpty: {
		                  message: '应收账款受让款不能为空'
		              },
		              regexp: {
	                      regexp: /^\d+(\.\d{1,2})?$/,
	                      message: '只能输入最多两位小数的非负数'
	                  },
	                  callback: {
	                	  message: '应收账款受让款要在0-1,000,000,000之间',
	                	  callback: function(value, validator, $field) {
	                		  return parseFloat(value) >= 0 && parseFloat(value) <= 1000000000;
	                	  }
	                  }
		          }
		      },
		      earnestMoney: {
		          validators: {
		              notEmpty: {
		                  message: '保证金不能为空'
		              },
		              regexp: {
	                      regexp: /^\d+(\.\d{1,2})?$/,
	                      message: '只能输入最多两位小数的非负数'
	                  },
	                  callback: {
	                	  message: '保证金要在0-1,000,000,000之间',
	                	  callback: function(value, validator, $field) {
	                		  return parseFloat(value) >= 0 && parseFloat(value) <= 1000000000;
	                	  }
	                  }
		          }
		      },
		      serviceAmt: {
		          validators: {
		              notEmpty: {
		                  message: '服务费不能为空'
		              },
		              regexp: {
	                      regexp: /^\d+(\.\d{1,2})?$/,
	                      message: '只能输入最多两位小数的非负数'
	                  },
	                  callback: {
	                	  message: '服务费要在0-1,000,000,000之间',
	                	  callback: function(value, validator, $field) {
	                		  return parseFloat(value) >= 0 && parseFloat(value) <= 1000000000;
	                	  }
	                  }
		          }
		      },
		      arTransfNotice: {
		          validators: {
		              notEmpty: {
		                  message: '应收账款转让通知不能为空'
		              }
		          }
		      },
		      guaranteeValue: {
		          validators: {
		        	  regexp: {
	                      regexp: /^\d+(\.\d{1,2})?$/,
	                      message: '只能输入最多两位小数的非负数'
	                  },
	                  callback: {
  	                	  message: '担保价值要在0-1,000,000,000之间',
  	                	  callback: function(value, validator) {
  	                		  return value == "" || (parseFloat(value) >= 0 && parseFloat(value) <= 1000000000);
  	                	  }
  	                  }
		          }
		      },
		      inComeMakeUp: {
		          validators: {
		        	  regexp: {
	                      regexp: /^(-)?\d+(\.\d{1,2})?$/,
	                      message: '只能输入最多两位小数的非负数'
	                  },
	                  callback: {
  	                	  message: '收益补偿要在-1,000,000,000-1,000,000,000之间',
  	                	  callback: function(value, validator) {
  	                		  return value == "" || (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
  	                	  }
  	                  }
		          }
		      },
		      cntVersion: {
		          validators: {
		              notEmpty: {
		                  message: '合同版本不能为空'
		              },
		              regexp: {
	                      regexp: /^\d+(\.\d+)?$/,
	                      message: '请输入数字'
	                  }
		          }
		      },
		      cntEffectDate: {
		          validators: {
		              notEmpty: {
		                  message: '合同生效日期不能为空'
		              },
		              callback: {
		            	  message: "合同生效日期不能大于合同结束日期",
		            	  callback: function(value, validator) {
		            		  var end = validator.getFieldElements('cntEndDate').val();
		            		  return end == "" || value <= end;
		            	  }
		              }
		          }
		      },
		      cntEndDate: {
		          validators: {
		              notEmpty: {
		                  message: '合同结束日期不能为空'
		              },
		              callback: {
		            	  message: "合同结束日期不能小于合同生效日期",
		            	  callback: function(value, validator) {
		            		  var begin = validator.getFieldElements('cntEffectDate').val();
		            		  return begin == "" || value >= begin;
		            	  }
		              }
		          }
		      },
		      cntFiles: {
		    	  trigger: 'focus',
		          validators: {
		              notEmpty: {
		                  message: '合同附件不能为空'
		              }
		          }
		      },
		      loanLimit: {
		          validators: {
		              notEmpty: {
		                  message: '融资期限不能为空'
		              },
		              regexp: {
	                      regexp: /^[0-9]*$/,
	                      message: '请输入正整数'
	                  }
		          }
		      },
		      loanAmt: {
		          validators: {
		              notEmpty: {
		                  message: '融资金额不能为空'
		              },
		              regexp: {
	                      regexp: /^\d+(\.\d{1,2})?$/,
	                      message: '只能输入最多两位小数的非负数'
	                  },
	                  callback: {
	                	  message: '融资金额要在0-1,000,000,000之间',
	                	  callback: function(value, validator, $field) {
	                		  return parseFloat(value) >= 0 && parseFloat(value) <= 1000000000;
	                	  }
	                  }
		          }
		      },
		      commission: {
		          validators: {
		        	  regexp: {
	                      regexp: /^\d+(\.\d{1,2})?$/,
	                      message: '只能输入最多两位小数的非负数'
	                  },
	                  callback: {
	                	  message: '手续费要在0-1,000,000,000之间',
	                	  callback: function(value, validator, $field) {
	                		  return value == "" || (parseFloat(value) >= 0 && parseFloat(value) <= 1000000000);
	                	  }
	                  }
		          }
		      },
		      otherCost: {
		          validators: {
		        	  regexp: {
	                      regexp: /^(-)?\d+(\.\d{1,2})?$/,
	                      message: '只能输入最多两位小数的非负数'
	                  },
	                  callback: {
	                	  message: '其他费用要在-1,000,000,000-1,000,000,000之间',
	                	  callback: function(value, validator, $field) {
	                		  return value == "" || (parseFloat(value) >= -1000000000 && parseFloat(value) <= 1000000000);
	                	  }
	                  }
		          }
		      },
		      penalty: {
		          validators: {
		        	  regexp: {
	                      regexp: /^\d+(\.\d{1,2})?$/,
	                      message: '只能输入最多两位小数的非负数'
	                  },
	                  callback: {
	                	  message: '违约金要在0-1,000,000,000之间',
	                	  callback: function(value, validator, $field) {
	                		  return value == "" || (parseFloat(value) >= 0 && parseFloat(value) <= 1000000000);
	                	  }
	                  }
		          }
		      },
		      loanPeriod: {
		          validators: {
		        	  regexp: {
	                      regexp: /^[0-9]*$/,
	                      message: '请输入正整数'
	                  }
		          }
		      },
		      repaymentCorpAcount: {
		          validators: {
		        	  notEmpty: {
	                	  message: '还款企业账户不能为空'
	                  }
		          }
		      },
		      repaymentPlan: {
		          validators: {
		        	  notEmpty: {
	                	  message: '还款计划不能为空'
	                  }
		          }
		      },
		      repaymentTimes: {
		          validators: {
		        	  notEmpty: {
	                	  message: '还款时长不能为空'
	                  },
	                  regexp: {
	                      regexp: /^[0-9]*$/,
	                      message: '请输入正整数'
	                  },
	                  callback: {
	                	  callback: function(value, validator, $field) {
	                		  var repaymentPlan = validator.getFieldElements('repaymentPlan').val();
	                		  var valid, message;
	                		  // 年
	                		  if (repaymentPlan == '1') {
	                			  valid = parseInt(value) >= 0 && parseInt(value) <= 5;
	                			  message = "还款时长要小于5年";
	                			  // 季度
	                		  } else if (repaymentPlan == '2') {
	                			  valid = parseInt(value) >= 0 && parseInt(value) <= 20;
	                			  message = "还款时长要小于20个季度";
	                			  // 月
	                		  } else if (repaymentPlan == '3') {
	                			  valid = parseInt(value) >= 0 && parseInt(value) <= 60;
	                			  message = "还款时长要小于60个月";
	                			  // 天
	                		  } else if (repaymentPlan == '4') {
	                			  valid = parseInt(value) >= 0 && parseInt(value) <= 1800;
	                			  message = "还款时长要小于1800天";
	                		  }
	                		  
	                		  return {
	                			  valid: valid,
	                			  message: message
	                		  }
	                      }
	                  }
		          }
		      },
		      repaymentAmt: {
		          validators: {
		        	  notEmpty: {
	                	  message: '还款金额不能为空'
	                  },
	                  regexp: {
	                      regexp: /^\d+(\.\d{1,2})?$/,
	                      message: '只能输入最多两位小数的非负数'
	                  },
	                  callback: {
  	                	  message: '还款金额要在0-1,000,000,000之间',
  	                	  callback: function(value, validator) {
  	                		  return parseFloat(value) >= 0 && parseFloat(value) <= 1000000000;
  	                	  }
  	                  }
		          }
		      },
		      repaymentType: {
		          validators: {
		        	  notEmpty: {
	                	  message: '还款类型不能为空'
	                  }
		          }
		      }
	      }
	    	 
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
		});
    };
    
    /**
     * 放款申请表单验证规则
     * @param formId
     */
    FlowMngCommon.loanFormValidator = function(formId) {
    	$('#' + formId).bootstrapValidator({
  	      message: 'This value is not valid',
  	      feedbackIcons: {
  	          valid: 'glyphicon glyphicon-ok',
  	          invalid: 'glyphicon glyphicon-remove',
  	          validating: 'glyphicon glyphicon-refresh'
  	      },
  	      fields: {
  	    	  lendBathNo: {
  	              validators: {
  	            	  numeric: {
  	                      message: '请输入数字'
  	                  }
  	              }
  	          },
  	          lendAmt: {
  	              validators: {
  	            	  numeric: {
  	                      message: '放款金额请输入数字'
  	                  },
	                  callback: {
  	                	  message: '放款金额要在0-1,000,000,000之间',
  	                	  callback: function(value, validator) {
  	                		  return value == "" || (parseFloat(value) >= 0 && parseFloat(value) <= 1000000000);
  	                	  }
  	                  }
  	              }
  	          },
  	          lendPerson: {
  	              validators: {
  	            	  notEmpty: {
  	                      message: '放款人不能为空'
  	                  }
  	              }
  	          },
  	          lendCorp: {
  	              validators: {
  	            	  notEmpty: {
  	                      message: '放款企业不能为空'
  	                  }
  	              }
  	          },
  	          lendState: {
  	              validators: {
  	            	  notEmpty: {
  	                      message: '放款状态不能为空'
  	                  }
  	              }
  	          }
  	      }
  		})
  		.on('success.form.bv', function (e) {
  			e.preventDefault();
  		});
    };
    
    /**
     * 合同申请_还款计划change事件
     * @param formId
     */
    FlowMngCommon.changeRepaymentPlan = function(formId) {
    	$("#" + formId)
    		.data("bootstrapValidator")
    		.updateStatus("repaymentTimes", "NOT_VALIDATED", null)
    		.validateField("repaymentTimes");
    }

    /**
     * 在线申请_公司名称
     */
    FlowMngCommon.ajaxSelCorps = function(){
    	var param = {
    			sysType : 5,  //类型有2保理商/3资方/4买方/5卖方
    			relaCorpId : store.get('corpId'),
    			isPage : 0  //是否分页，0：否，1：是，默认为0.
    	};
    	var options = {
    			url : '../../corp/list',
    			data :JSON.stringify(param),
    			callBackFun : function(data) {
    				if(data.result==0){
    					$("#selCorpId").html('');
    					$.each(data.dataList, function (index, units) {  
    						$("#selCorpId").append("<option value="+units.corpId+">" + units.corpName + "</option>");  
    					});
    					$("#onlineForm #corpNm").val($('#selCorpId  option:selected').text());
    				}else{
    					bootbox.alert(data.resultNote);
    				}
    			},
    			errorCallback:function(data){
    				bootbox.alert("error");  
    			}
    	};
    	CloudUtils.ajax(options);
    }
    
    /**
     * 在线签约-卖方确认表单验证
     * @param formId
     */
    FlowMngCommon.confirmFormValidator = function(formId) {
    	$('#' + formId).bootstrapValidator({
    	      message: 'This value is not valid',
    	      feedbackIcons: {
    	          validating: 'glyphicon glyphicon-refresh'
    	      },
    	      fields: {
    	    	  phone: {
    	    		  validators: {
    	                  notEmpty: {
    	                      message: '手机号不能为空'
    	                  },
    			          stringLength: {
    			              min: 11,
    			              max: 11,
    			              message: '手机号长度为11'
    			          },
    			          regexp: {
    	                      regexp: /^[0-9]*$/,
    	                      message: '手机号只能是数字'
    	                  }
    	              }
    	          },
    	          code: {
    	              validators: {
    	            	  notEmpty: {
    	                      message: '验证码不能为空'
    	                  }
    	              }
    	          }
    	      }
    		})
    		.on('success.form.bv', function (e) {
    			e.preventDefault();
    		});	
    };
})(jQuery);
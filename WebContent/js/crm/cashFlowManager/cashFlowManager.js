var canExp = true;
$(document).ready(function() {
	initTable();
	initRiskTable();
	downloadTemp();
	loadDate();
	formValidator();
	formValidatorRisk();
	// modal绑定事件
	$('#addModal').on('hidden.bs.modal', function() {
		$("#addForm")[0].reset();
		$("#addForm").data('bootstrapValidator').destroy();
		$("#addForm").data('bootstrapValidator', null);
		formValidator();
		document.getElementById("field").disabled = false;
		document.getElementById("btn_save").style.display = "";
	});
	// 去掉modal上的验证缓存
	$('#addModal').on('hide.bs.modal', function() {
		$("#addForm").data('bootstrapValidator').resetForm();
	});

	// modal绑定事件
	$('#riskModal').on('hidden.bs.modal', function() {
		$("#riskForm")[0].reset();
		$("#riskForm").data('bootstrapValidator').destroy();
		$("#riskForm").data('bootstrapValidator', null);
		formValidatorRisk();
		document.getElementById("field2").disabled = false;
		document.getElementById("btn_risk_submit").style.display = "";
	});
	// 去掉modal上的验证缓存

	loadcount();
	ajaxRelaCorps("txt_corpId", "corpId", "r_corpId","relaCorpId");
	numFormat();
	/*
	 * $('#addModal').on('hide.bs.modal', function () {
	 * $("#addForm").data('bootstrapValidator').resetForm(); })
	 */


});


function loadDate(){
	 var initDate = new Date();
	  $('#operYear').val(initDate.getFullYear());
	$('#operYear').datetimepicker({
		language: 'zh-CN',
		autoclose: true,
		todayHighlight: true,
		format: 'yyyy',
		startView: 4,
        minView: 4,
		todayBtn: true,
		initialDate : new Date() ,
		pickerPosition: "bottom-left"
	});
	$('#operYear').datetimepicker('setEndDate', new Date());
}

window.operateEvents = {
	'click .detail' : function(e, value, row, index) {
		detailFun(row, 0);
	},
	'click .modify' : function(e, value, row, index) {
		modFun(row, 2);
	},
	'click .remove' : function(e, value, row, index) {
		bootbox.confirm("确定删除此条记录?", function(result) {
			if (result) {
				var options = {
					url : '../../cashflow/delete',
					data : '{"recUid":"' + row.recUid + '"}',
					callBackFun : function(data) {
						if (data.result == 0) {
							searchFun();
						} else {
							bootbox.alert(data.resultNote);
							return false;
						}
					},
					errorCallback : function(data) {
						alert("error");
					}
				};
				CloudUtils.ajax(options);
			}
		});
	},
	'click .riskmod' : function(e, value, row, index) {
		riskModFun(row, 2);
	},
	'click .riskremove' : function(e, value, row, index) {
		bootbox.confirm("确定删除此条记录?", function(result) {
			if (result) {
				var options = {
					url : '../../corpOperateAnaly/delete',
					data : '{"recUid":"' + row.recUid + '"}',
					callBackFun : function(data) {
						if (data.result == 0) {
							searchFun();
						} else {
							bootbox.alert(data.resultNote);
							return false;
						}
					},
					errorCallback : function(data) {
						bootbox.alert("error");
					}
				};
				CloudUtils.ajax(options);
			}
		});
	}
};

function initTable() {
	$('#cashflowList').bootstrapTable('destroy');
	$("#cashflowList")
			.bootstrapTable(
					{
						method : "post",
						url : "../../cashflow/list",
						striped : false, // 表格显示条纹
						pagination : true, // 启动分页
						pageSize : 5, // 每页显示的记录数
						pageNumber : 1, // 当前第几页
						pageList : [ 5, 10, 15, 20, 25 ], // 记录数可选列表
						search : false, // 是否启用查询
						showColumns : false, // 显示下拉框勾选要显示的列
						showRefresh : false, // 显示刷新按钮
						sidePagination : "server", // 表示服务端请求
						// 设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
						// 设置为limit可以获取limit, offset, search, sort, order
						queryParamsType : "undefined",
						queryParams : function queryParams(params) { // 设置查询参数
							var data = CloudUtils
									.convertStringJson('searchForm');
							var jsonData = eval("(" + data + ")");
							 if(jsonData.txt_corpId ==""){
					        	   jsonData.txt_corpId = null;
					           }
							var param = {
								pageNumber : params.pageNumber,
								pageSize : params.pageSize,
								corpId : jsonData.txt_corpId,
							};
							return JSON.stringify(param);
						},
						responseHandler : function responseHandler(res) {
							if (res.result == 0) {
								 var size = res.records;
				        		 if(size>50000){//限制5w条不允许导出
				        			 canExp = false;
				        		 }else{
				        			 canExp = true;
				        		 }
								return {
									"rows" : res.dataList,
									"total" : res.records
								};

							} else {
				        		 bootbox.alert(res.resultNote);
								return {
									"rows" : [],
									"total" : 0
								};
							}
						},
						columns : [
								{
									field : 'recUid',
									title : 'Item ID',
									align : 'center',
									valign : 'middle',
									visible : false
								},{
									field : 'corpId',
									title : '企业Id',
									align : 'center',
									valign : 'middle',
									visible : false
								},{
									field : 'corpName',
									title : '企业名称',
									align : 'center',
									valign : 'middle'
								},{
									field : 'operYear',
									title : '时间(年)',
									align : 'center',
									valign : 'middle'
								},{
									field : 'netAmountOfCashFlow',
									title : '经营活动产生的现金流量净额',
									align : 'center',
									formatter:function(value,row,index){
							 	    	return $.number(value,2);
								        },
									valign : 'middle'
								},{
									field : 'investmentAmountOfCashFlow',
									title : '投资活动产生的现金流量净额',
									align : 'center',
									formatter:function(value,row,index){
							 	    	return $.number(value,2);
								        },
									valign : 'middle'
								},{
									field : 'financingAmountOfCashFlow',
									title : '筹资活动产生的现金流量净额',
									align : 'center',
									formatter:function(value,row,index){
							 	    	return $.number(value,2);
								        },
									valign : 'middle'
								},{
									field : 'increaseCashEquivalent',
									title : '现金及现金等价物净增加额',
									align : 'center',
									formatter:function(value,row,index){
							 	    	return $.number(value,2);
								        },
									valign : 'middle'
								},{
									field : 'cashAndCashEquivalents',
									title : '现金及现金等价物净增加额(补充)',
									align : 'center',
									formatter:function(value,row,index){
							 	    	return $.number(value,2);
								        },
									valign : 'middle',
									visible : false
								},{ field: 'otherAmountOfCashFlow', 
									title: '其他经营活动产生的现金流量净额', 
									align: 'center',
									formatter:function(value,row,index){
							 	    	return $.number(value,2);
								        },
									valign: 'middle' 
								},{
									field : 'operation',
									title : '操作',
									formatter : function(value, row, index) {
										var d = '<a class = "fa fa-list-ul detail" style="color:#a9d86e;padding:0px 5px;" title="详情" href="javascript:void(0)"></a>';
										var s = '<a class = "fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
										var r = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
										return d + ' ' + s + ' ' + r;
									},
									align : 'center',
									valign : 'middle',
									display: 'inline-flex',
									events : 'operateEvents'
								} ]
					});
}

function searchFun() {
	initTable();
	initRiskTable();
}

function addFun() {
	var initDate = new Date();
	$("#corpId").attr("disabled",false);
	$('#operYear').val(initDate.getFullYear());
	$("#btn_blank").removeClass('col-sm-7').addClass('col-sm-4');
	$("#addModalLabel").text("添加");
    $('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
    $('#isEdit').val(1); //新增1；修改2
}

function impFun() {
	$("#btn_blank").removeClass('col-sm-7').addClass('col-sm-4');
	$("#importModalLabel").text("导入");
    $('#importModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
}

function expFun() {
	if(!canExp){
		bootbox.alert("记录超过五万条，请联系管理人员导出。");
	}else{
		var data = CloudUtils.convertStringJson('searchForm');
		var jsonData = eval("(" + data + ")");
		var param = {    
				corpId: jsonData.txt_corpId
		};    
		var options = {
				url : '../../cashFlowExcel/export',
				data :  param,
				callBackFun : function(data) {
					if(data.result==0){
						var str = data.excelPath;     
						window.location.href   =   str;   
					}else{
						bootbox.alert(data.resultNote);
						return false;
					}
				},
				errorCallback:function(data){
					bootbox.alert(data.resultNote);
					return false;
				}
		};
		CloudUtils.ajax(options);
	}
}

function detailFun(row, isEdit) {
	modFun(row, isEdit);
	document.getElementById("field").disabled = true;
	document.getElementById("btn_save").style.display = "none";
	$("#btn_blank").removeClass('col-sm-4').addClass('col-sm-7');
}
var oldYear;
function modFun(row,isEdit) {
	$("#btn_blank").removeClass('col-sm-7').addClass('col-sm-4');
	if(isEdit==0){
		$("#addModalLabel").text("详情");
	}
	if(isEdit==2){
		oldYear = null;
		$("#addModalLabel").text("修改");
		oldYear = row.operYear;
	}
	$("#corpId").attr("disabled",true);
	$('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
	$('#isEdit').val(isEdit); //新增1;修改2;详情0
    $('#addModal').modal();
    var options = {
			url : '../../cashflow/detail',
			data :  '{"recUid":"'+row.recUid+'"}',
			callBackFun : function(data) {
				if(data.result==0){
					CloudUtils.setForm(data,'addForm');
				}else{
					bootbox.alert(data.resultNote);
					return false;
				}
			},
			errorCallback:function(data){
				bootbox.alert(data.resultNote);
				return false;
			}
	};
	CloudUtils.ajax(options);
}

function saveUser() {
	var modal = $('#addModal');
	var data = CloudUtils.convertStringJson('addForm');
	var isEdit = $('#isEdit').val();
	if (isEdit == 1) {// 新增1；修改2
		var options = {
			url : '../../cashflow/add',
			data : data,
			callBackFun : function(data) {
				bootbox.alert(data.resultNote);
				if (data.result == 0) {
					searchFun();
				} else {
					return false;
				}
			},
			errorCallback : function(data) {
				bootbox.alert(data.resultNote);
				return false;
			}
		};
		CloudUtils.ajax(options);
	} else {
		var jsonData = eval("(" + data + ")");
			if(oldYear == jsonData.operYear){
				jsonData.operYear = null;
			}
		var options = {
			url : '../../cashflow/mod',
			data : JSON.stringify(jsonData),
			callBackFun : function(data) {
				bootbox.alert(data.resultNote);
				if (data.result == 0) {
					searchFun();
				} else {
					return false;
				}
			},
			errorCallback : function(data) {
				bootbox.alert(data.resultNote);
				return false;
			}
		};
		CloudUtils.ajax(options);
	}
	modal.modal("hide");
}

function downloadTemp(){
	var options = {
			url : '../../user/configKey',
			data :'{"itemKey":"cashFlowExcelTemp"}',
			callBackFun : function(data) {
				if (data.result == 0) {
					var excelUrl = "../../"+data.itemValue;
					$('#downloadTemp').attr('href',excelUrl);
				} else {
					bootbox.alert(data.resultNote);
					return false;
				}
			},
			errorCallback : function(data) {
				bootbox.alert(data.resultNote);
				return false;
			}
		};
		CloudUtils.ajax(options);
}

function fileSelect() {
    document.getElementById("file").click(); 
}

function ajaxFileUpload(){
	if ($("#file").val().length > 0) {
		$.ajaxFileUpload({  
	        url : '../../file/binUpload?pathId=2',  
	        secureuri : false,  
	        fileElementId : 'file',  
	        dataType : 'json',  
	        success : function(data, status) {  
	            if (data.result == 0) { 
	            	var path=data.fileUrl;
	            	var filename;
	            	if(path.indexOf("/")>0)//如果包含有"/"号 从最后一个"/"号+1的位置开始截取字符串
	            	{
	            	    filename=path.substring(path.lastIndexOf("/")+1,path.length);
	            	}
	            	else
	            	{
	            	    filename=path;
	            	}
	                $("#operateFlowFile").val( data.fileUrl); 
	                bootbox.alert("上传成功！");  
	            }else{
	            	bootbox.alert("上传失败！"); 
	            } 
	        },  
	        error : function(data, status, e) {  
	        	bootbox.alert(e);  
	        }  
	    });  
    }
    else {
    	bootbox.alert("请选择图片");
    }
	
}


function ajaxFileUpload1(){
	$("#importModal").modal("hide");
	if ($("#file1").val().length > 0) {
		if(check()){
		$.ajaxFileUpload({  
	        url : '../../cashFlowExcel/import?pathId=0&corpId='+$("#relaCorpId").val(),  
	        secureuri : false,  
	        fileElementId : 'file1',  
	        dataType : 'json',  
	        success : function(data, status) {  
	            if (data.result == 0) { 
	            	searchFun();
	                bootbox.alert("上传成功！");  
	            }else{
	            	bootbox.alert("上传失败！"+data.resultNote); 
	            } 
	        },  
	        error : function(data, status, e) {  
	        	bootbox.alert(e);  
	        }  
	    });
		}
    }
    else {
    	bootbox.alert("请选择文件");
    }
}

function check(){
	var aa=document.getElementById("file1").value.toLowerCase().split('.');//以“.”分隔上传文件字符串
	if(aa[aa.length-1]!='xls'&&aa[aa.length-1]!='xlsx'){
		bootbox.alert('请选择格式为*.xls或*.xlsx的Excel文件');
		return false;
	}else{
		return true;
	}
}

function ajaxRelaCorps(Id1, Id2, Id3,Id4) {
	var relaCorpId = store.get('corpId');
	var options = {
		url : '../../corp/list',
		data : '{"relaCorpId": "' + relaCorpId + '","isPage":0}',
		callBackFun : function(data) {
			var control1 = $('#' + Id1);
			var control2 = $('#' + Id2);
			var control3 = $('#' + Id3);
			var control4 = $('#' + Id4);
			control1.append("<option value=''>全部</option>");
			$.each(data.dataList, function(index, units) {
				control1.append("<option value=" + units.corpId + ">"
						+ units.corpName + "</option>");
				control2.append("<option value=" + units.corpId + ">"
						+ units.corpName + "</option>");
				control3.append("<option value=" + units.corpId + ">"
						+ units.corpName + "</option>");
				control4.append("<option value=" + units.corpId + ">"
						+ units.corpName + "</option>");

			});
			$('#txt_corpId').selectOrDie({
				placeholder : '企业名称'
			});
		},
		errorCallback : function(data) {
			alert("error");
		}
	};
	CloudUtils.ajax(options);
}

function loadcount(){
	$('input').bind('input propertychange', function() {		
		//经营活动现金流入小计
		var incomeFromSellingAndOffering = $("#incomeFromSellingAndOffering").val();//销售商品、提供劳务收到的现金
		var taxBeReturned = $("#taxBeReturned").val();//收到的税费返还
		var otherCapitalAboutTheActivity = $("#otherCapitalAboutTheActivity").val();//收到其他与经营活动有关的资金
		
		//经营活动现金流出小计
		var expendOfSellCommodity = $("#expendOfSellCommodity").val();//购买商品、接受劳务支付的现金
		var expendOfPayToStaffs = $("#expendOfPayToStaffs").val();//支付给职工以及为职工支付的现金
		var paymentsOfTaxes = $("#paymentsOfTaxes").val();//支付的各项税费
		var therExpendOfActivity = $("#therExpendOfActivity").val();//支付其他与经营活动有关的现金
		
		//投资活动现金流入小计
		var incomeFromWithdrawInvestment = $("#incomeFromWithdrawInvestment").val();//收回投资收到的现金
		var otherCashReceivedInvestActivity = $("#otherCashReceivedInvestActivity").val();//收到其他与投资活动有关的现金
		var cashOfFixedIntangibleOtherLong = $("#cashOfFixedIntangibleOtherLong").val();//处置固定资产、无形资产和其他长期资产收回的现金净额
		var cashFromDisposalOtherBusiness = $("#cashFromDisposalOtherBusiness").val();//处置子公司及其他营业单位收到的现金净额
		var cashFromInvestIncome = $("#cashFromInvestIncome").val();//取得投资收益收到的现金
		
		//投资活动现金流出小计
		var cashOfFixedIntangibleLong = $("#cashOfFixedIntangibleLong").val();//购建固定资产、无形资产和其他长期资产支付的现金
		var expenditureOfInvest = $("#expenditureOfInvest").val();//投资支付的现金
		var cashPaidForBusinessSubsidiaries = $("#cashPaidForBusinessSubsidiaries").val();//取得子公司及其他营业单位支付的现金净额
		var expendOfActivityAboutInvestment = $("#expendOfActivityAboutInvestment").val();//支付其他与投资活动有关的现金
		
		//筹资活动现金流入小计
		var incomeFromAbsorbInvestment = $("#incomeFromAbsorbInvestment").val();//吸收投资收到的现金
		var incomeFromObtainBorrowMoney = $("#incomeFromObtainBorrowMoney").val();//取得借款收到的现金
		var otherIncomeFromRaiseMoney = $("#otherIncomeFromRaiseMoney").val();//收到其他与筹资活动有关的现金
		
		//筹资活动现金流出小计
		var expendOfRepaymentOfDept = $("#expendOfRepaymentOfDept").val();//偿还债务支付的现金
		var cashOfDividendsProfitInterest = $("#cashOfDividendsProfitInterest").val();//分配股利、利润或偿付利息支付的现金
		var otherExpendActivityRaiseMoney = $("#otherExpendActivityRaiseMoney").val();//支付其他与筹资活动有关的现金
		
		//其他经营活动产生的现金流量净额
		var margin = $("#margin").val();//净利润
		var preparationOfDevaluation = $("#preparationOfDevaluation").val();//资产减值准备
		var depreciationOfFixed = $("#depreciationOfFixed").val();//固定资产折旧、油气资产折耗、生产性生物资产折旧
		var amortizationOfIntangible = $("#amortizationOfIntangible").val();//无形资产摊销
		var amortizationOfLong = $("#amortizationOfLong").val();//长期待摊费用摊销
		var lossFromDisposal = $("#lossFromDisposal").val();//处置固定资产、无形资产和其他长期资产的损失
		var lossOfFixed = $("#lossOfFixed").val();//固定资产报废损失
		var changeInFairValueLoss = $("#changeInFairValueLoss").val();//公允价值变动损失
		var financialExpenses = $("#financialExpenses").val();//财务费用
		var investmentLoss = $("#investmentLoss").val();//投资损失
		var decreaseInDeferredTax = $("#decreaseInDeferredTax").val();//递延所得税资产减少
		var increaseInDeferredTaxLiabilities = $("#increaseInDeferredTaxLiabilities").val();//递延所得税负债增加
		var decreaseInInventories = $("#decreaseInInventories").val();//存货的减少
		var decreaseInOperatingReceivables = $("#decreaseInOperatingReceivables").val();//经营性应收项目的减少
		var increaseInOperatingPayables = $("#increaseInOperatingPayables").val();//经营性应付项目的增加
		var other = $("#other").val();//其他
	
		//现金及现金等价物净增加额
		var closeBalanceOfCash = $("#closeBalanceOfCash").val();//现金的期末余额
		var openBalanceOfCash = $("#openBalanceOfCash").val();//现金的期初余额

		/*******************************************计算规则******************************************/
		
		//经营活动现金流入小计=SUM(销售商品,提供劳务收到的现金,收到其他与经营活动有关的资金)
		var incomeSubtotalOfOperatActivityStr = incomeFromSellingAndOffering+","+taxBeReturned+","+otherCapitalAboutTheActivity;
		//grossProfitRate = isNaN(grossProfitRate)==true?0:grossProfitRate;
		var incomeSubtotalOfOperatActivity = CloudUtils.MathArray(incomeSubtotalOfOperatActivityStr,"add,add");
		incomeSubtotalOfOperatActivity = transform(incomeSubtotalOfOperatActivity);
		 $("#incomeSubtotalOfOperatActivity").val(incomeSubtotalOfOperatActivity);
		
		 //经营活动现金流出小计=购买商品、接受劳务支付的现金+支付给职工以及为职工支付的现金+支付的各项税费+支付其他与经营活动有关的现金
		var outcomeSubtotalOfOperatActivityStr = expendOfSellCommodity+","+expendOfPayToStaffs+","+paymentsOfTaxes+","+therExpendOfActivity;
		var outcomeSubtotalOfOperatActivity = CloudUtils.MathArray(outcomeSubtotalOfOperatActivityStr,"add,add,add");
		outcomeSubtotalOfOperatActivity = transform(outcomeSubtotalOfOperatActivity);
		$("#outcomeSubtotalOfOperatActivity").val(outcomeSubtotalOfOperatActivity);
		
		//经营活动产生的现金流量净额=经营活动现金流入小计-经营活动现金流出小计
		var netAmountOfCashFlow = CloudUtils.Math(incomeSubtotalOfOperatActivity,outcomeSubtotalOfOperatActivity,"sub");
		netAmountOfCashFlow = transform(netAmountOfCashFlow);
		$("#netAmountOfCashFlow").val(netAmountOfCashFlow);
		
		//投资活动现金流入小计=SUM(收回投资收到的现金:收到其他与投资活动有关的现金)
		var incomeSubtotalOfInvestmentActivitiesStr = incomeFromWithdrawInvestment+","+otherCashReceivedInvestActivity+","+cashOfFixedIntangibleOtherLong+","+cashFromDisposalOtherBusiness+","+cashFromInvestIncome;
		var incomeSubtotalOfInvestmentActivities = CloudUtils.MathArray(incomeSubtotalOfInvestmentActivitiesStr,"add,add,add,add");
		incomeSubtotalOfInvestmentActivities = transform(incomeSubtotalOfInvestmentActivities);
		 $("#incomeSubtotalOfInvestmentActivities").val(incomeSubtotalOfInvestmentActivities);
		
		//投资活动现金流出小计=SUM(购建固定资产、无形资产和其他长期资产支付的现金:支付其他与投资活动有关的现金)
		var outcomeSubtotalOfInvestmentActivitiesStr = cashOfFixedIntangibleLong+","+expenditureOfInvest+","+cashPaidForBusinessSubsidiaries+","+expendOfActivityAboutInvestment;
		var outcomeSubtotalOfInvestmentActivities = CloudUtils.MathArray(outcomeSubtotalOfInvestmentActivitiesStr,"add,add,add");
		outcomeSubtotalOfInvestmentActivities = transform(outcomeSubtotalOfInvestmentActivities);
		$("#outcomeSubtotalOfInvestmentActivities").val(outcomeSubtotalOfInvestmentActivities);
		
		//投资活动产生的现金流量净额=投资活动现金流入小计-投资活动现金流出小计
		var investmentAmountOfCashFlow = CloudUtils.Math(incomeSubtotalOfInvestmentActivities,outcomeSubtotalOfInvestmentActivities,"sub");
		investmentAmountOfCashFlow = transform(investmentAmountOfCashFlow);
		$("#investmentAmountOfCashFlow").val(investmentAmountOfCashFlow);
		
		//筹资活动现金流入小计=SUM(吸收投资收到的现金:收到其他与筹资活动有关的现金)
		var incomeSubtotalOfFinanceActivitiesStr = incomeFromAbsorbInvestment+","+incomeFromObtainBorrowMoney+","+otherIncomeFromRaiseMoney;
		var incomeSubtotalOfFinanceActivities =CloudUtils.MathArray(incomeSubtotalOfFinanceActivitiesStr,"add,add");
		incomeSubtotalOfFinanceActivities = transform(incomeSubtotalOfFinanceActivities);
		$("#incomeSubtotalOfFinanceActivities").val(incomeSubtotalOfFinanceActivities);
		
		//筹资活动现金流出小计=SUM(偿还债务支付的现金:支付其他与筹资活动有关的现金)
		var outcomeSubtotalOfFinancingActivitiesStr = expendOfRepaymentOfDept+","+cashOfDividendsProfitInterest+","+otherExpendActivityRaiseMoney;
		var outcomeSubtotalOfFinancingActivities =CloudUtils.MathArray(outcomeSubtotalOfFinancingActivitiesStr,"add,add");
		outcomeSubtotalOfFinancingActivities = transform(outcomeSubtotalOfFinancingActivities);
		$("#outcomeSubtotalOfFinancingActivities").val(outcomeSubtotalOfFinancingActivities);
		
		//筹资活动产生的现金流量净额=筹资活动现金流入小计-筹资活动现金流出小计
		var financingAmountOfCashFlow = CloudUtils.Math(incomeSubtotalOfFinanceActivities,outcomeSubtotalOfFinancingActivities,"sub");
		financingAmountOfCashFlow = transform(financingAmountOfCashFlow);
		$("#financingAmountOfCashFlow").val(financingAmountOfCashFlow);
		
		//现金及现金等价物净增加额=经营活动产生的现金流量净额+投资活动产生的现金流量净额+筹资活动产生的现金流量净额
		var increaseCashEquivalentStr = netAmountOfCashFlow+","+investmentAmountOfCashFlow+","+financingAmountOfCashFlow;
		var increaseCashEquivalent =CloudUtils.MathArray(increaseCashEquivalentStr,"add,add");
		increaseCashEquivalent = transform(increaseCashEquivalent);
		$("#increaseCashEquivalent").val(increaseCashEquivalent);
		
		//其他经营活动产生的现金流量净额=SUM(净利润:其他)
		var otherAmountOfCashFlowStr = margin+","+preparationOfDevaluation+","+depreciationOfFixed+","+amortizationOfIntangible+","+amortizationOfLong+","+lossFromDisposal+","+lossOfFixed+","+changeInFairValueLoss+","+financialExpenses+","+investmentLoss+","+decreaseInDeferredTax+","+increaseInDeferredTaxLiabilities+","+decreaseInInventories+","+decreaseInOperatingReceivables+","+increaseInOperatingPayables+","+other;
		var otherAmountOfCashFlow =CloudUtils.MathArray(otherAmountOfCashFlowStr,"add,add,add,add,add,add,add,add,add,add,add,add,add,add,add");
		otherAmountOfCashFlow = transform(otherAmountOfCashFlow);
		$("#otherAmountOfCashFlow").val(otherAmountOfCashFlow);
		
		//现金及现金等价物净增加额=现金的期末余额-现金的期初余额
		var cashAndCashEquivalentsStr = closeBalanceOfCash+","+openBalanceOfCash;
		var cashAndCashEquivalents =CloudUtils.MathArray(cashAndCashEquivalentsStr,"sub");
		cashAndCashEquivalents = transform(cashAndCashEquivalents);
		$("#cashAndCashEquivalents").val(cashAndCashEquivalents);
	});
}

//当取的的值为NaN时转换为0
function transform(value){
	var newvalue = isNaN(value)==true?0:value;
	return newvalue;
}

function initRiskTable() {
	$('#riskAnalyList').bootstrapTable('destroy');
	$("#riskAnalyList")
			.bootstrapTable(
					{
						method : "post",
						url : "../../corpOperateAnaly/list",
						toolbar : '#toolbar2',
						striped : false, // 表格显示条纹
						pagination : true, // 启动分页
						pageSize : 5, // 每页显示的记录数
						pageNumber : 1, // 当前第几页
						pageList : [ 5, 10, 15, 20, 25 ], // 记录数可选列表
						search : false, // 是否启用查询
						showColumns : false, // 显示下拉框勾选要显示的列
						showRefresh : false, // 显示刷新按钮
						sidePagination : "server", // 表示服务端请求
						// 设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
						// 设置为limit可以获取limit, offset, search, sort, order
						queryParamsType : "undefined",
						queryParams : function queryParams(params) { // 设置查询参数
							var data = CloudUtils
									.convertStringJson('searchForm');
							var jsonData = eval("(" + data + ")");
							 if(jsonData.txt_corpId ==""){
					        	   jsonData.txt_corpId = null;
					           }
							var param = {
								pageNumber : params.pageNumber,
								pageSize : params.pageSize,
								corpId : jsonData.txt_corpId,
							};
							return JSON.stringify(param);
						},
						responseHandler : function responseHandler(res) {
							if (res.result == 0) {
								return {
									"rows" : res.dataList,
									"total" : res.records
								};
							} else {
								bootbox.alert(res.resultNote);
								return {
									"rows" : [],
									"total" : 0
								};
							}
						},
						columns : [
								{
									field : 'recUid',
									title : 'Item ID',
									align : 'center',
									valign : 'middle',
									visible : false
								},
								{
									field : 'r_corpId',
									title : '企业Id',
									align : 'center',
									valign : 'middle',
									visible : false
								},
								{
									field : 'corpName',
									title : '企业名称',
									align : 'center',
									valign : 'middle',
									width : 180
								},
								{
									field : 'environmentPolicyRegulationAnaly',
									title : '宏观、行业、区域环境及政策法规分析',
									align : 'center',
									valign : 'middle'
								},
								{
									field : 'marketPositionAnaly',
									title : '所在区域市场及行业市场地位分析',
									align : 'center',
									valign : 'middle'
								},
								{
									field : 'competitorGeneralizeAnaly',
									title : '同业竞争对手、所在区域竞争对手的概括及评价',
									align : 'center',
									valign : 'middle'
								},
								{
									field : 'productAnaly',
									title : '产品分析',
									align : 'center',
									valign : 'middle'
								},
								{
									field : 'operateFlowChart',
									title : '经营流程图',
									align : 'center',
									valign : 'middle',
								},{
									field : 'operateFlowFile',
									title : '经营流程关键文件',
									align : 'center',
									valign : 'middle', 
									formatter:function(value,row,index){
										if(row.operateFlowFile == ''){
											return '-';
										}else { 
											var s = '<a href="'+value+'">'+'附件下载'+'</a>';
								            return s;
										}
						           
									}
								},{
									field : 'operateFlowRiskAnaly',
									title : '经营流程风险点分析',
									align : 'center',
									valign : 'middle'
								},
								{
									field : 'operation',
									title : '操作',
									align : 'center',
									formatter : function(value, row, index) {
										var m = '<a class = "fa fa-edit riskmod" style="color:#d864fd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
										var d = '<a class = "fa fa-trash-o riskremove" style="color:#fa8564;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
										return m + ' ' + d;
									},
									events : 'operateEvents',
									align : 'center',
									valign : 'middle',
									width : 100
								} ]
					});
}

function riskModFun(row) {
	$("#r_corpId").attr("disabled",true);
	$("#riskModalLabel").text("修改");
	$('#riskModal').modal();
	$('#riskEdit').val(2); // 新增1；修改2
	row.r_corpId = row.corpId;
	CloudUtils.setForm(row, 'riskForm');
}

function riskAnalyAdd() {
	$("#r_corpId").attr("disabled",false);
	$("#riskModalLabel").text("新增");
	$('#riskModal').modal({
		backdrop : 'static',
		keyboard : false
	});// 防止点击空白/ESC 关闭
	$('#riskEdit').val(1); // 新增1；修改2
}

function saveRiskAnaly() {
	var modal = $('#riskModal');
	var data = CloudUtils.convertStringJson('riskForm');
	var jsonData = eval("(" + data + ")");
	var param = {
		corpId : jsonData.r_corpId,
		environmentPolicyRegulationAnaly : jsonData.environmentPolicyRegulationAnaly,
		marketPositionAnaly : jsonData.marketPositionAnaly,
		competitorGeneralizeAnaly : jsonData.competitorGeneralizeAnaly,
		productAnaly : jsonData.productAnaly,
		operateFlowChart : jsonData.operateFlowChart,
		operateFlowFile : jsonData.operateFlowFile,
		operateFlowRiskAnaly : jsonData.operateFlowRiskAnaly
	};
	var isEdit = $('#riskEdit').val();
	if (isEdit == 1) {// 新增1；修改2
		var options = {
			url : '../../corpOperateAnaly/add',
			data : JSON.stringify(param),
			callBackFun : function(data) {
				if (data.result == 0) {
					searchFun();
				} else {
					bootbox.alert(data.resultNote);
					return false;
				}
			},
			errorCallback : function(data) {
				bootbox.alert("error");
			}
		};
		CloudUtils.ajax(options);
	} else {
		var options = {
			url : '../../corpOperateAnaly/mod',
			data : data,
			callBackFun : function(data) {
				if (data.result == 0) {
					searchFun();
				} else {
					bootbox.alert(data.resultNote);
					return false;
				}
			},
			errorCallback : function(data) {
				bootbox.alert("error");
			}
		};
		CloudUtils.ajax(options);
	}
	modal.modal("hide");
}

// form验证规则
function formValidator() {
	$('#addForm').bootstrapValidator({
		message : 'This value is not valid',
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			incomeFromSellingAndOffering : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },
			
	         taxBeReturned : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },otherCapitalAboutTheActivity : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },incomeSubtotalOfOperatActivity : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },expendOfSellCommodity : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },expendOfPayToStaffs : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },paymentsOfTaxes : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },therExpendOfActivity : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },outcomeSubtotalOfOperatActivity : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },netAmountOfCashFlow : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },incomeFromWithdrawInvestment : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },otherCashReceivedInvestActivity : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },cashOfFixedIntangibleOtherLong : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },cashFromDisposalOtherBusiness : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },cashFromInvestIncome : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },incomeSubtotalOfInvestmentActivities : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },cashOfFixedIntangibleLong : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },expenditureOfInvest : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },cashPaidForBusinessSubsidiaries : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },expendOfActivityAboutInvestment : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },outcomeSubtotalOfInvestmentActivities : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },investmentAmountOfCashFlow : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },incomeFromAbsorbInvestment : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },incomeFromObtainBorrowMoney : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },otherIncomeFromRaiseMoney : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },incomeSubtotalOfFinanceActivities : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },expendOfRepaymentOfDept : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },cashOfDividendsProfitInterest : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },otherExpendActivityRaiseMoney : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },outcomeSubtotalOfFinancingActivities : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },financingAmountOfCashFlow : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },influenceFluctuationCash : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },influenceFluctuationCash : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },increaseCashEquivalent : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },margin : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },preparationOfDevaluation : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },depreciationOfFixed : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },amortizationOfIntangible : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },amortizationOfLong : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },lossFromDisposal : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },lossOfFixed : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },changeInFairValueLoss : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },financialExpenses : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },investmentLoss : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },decreaseInDeferredTax : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },increaseInDeferredTaxLiabilities : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },decreaseInInventories : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },decreaseInOperatingReceivables : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },increaseInOperatingPayables : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },other : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },otherAmountOfCashFlow : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },debtTurnIntoCapital : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },convertibleBonds : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },theLeasedAssets : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },closeBalanceOfCash : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },openBalanceOfCash : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },closeBalanceOfCashEquivalents : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },openBalanceOfCashEquivalents : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },cashAndCashEquivalents : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '金额在-1000000000.00~1000000000.00之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         }
		}
	}).on('success.form.bv', function(e) {
		e.preventDefault();

	});

}


function numFormat(){
	$("#incomeFromSellingAndOffering").number(true, 2);
	$("#taxBeReturned").number(true, 2);
	$("#otherCapitalAboutTheActivity").number(true, 2);
	$("#incomeSubtotalOfOperatActivity").number(true, 2);
	$("#expendOfSellCommodity").number(true, 2);
	$("#expendOfPayToStaffs").number(true, 2);
	$("#paymentsOfTaxes").number(true, 2);
	$("#therExpendOfActivity").number(true, 2);
	$("#outcomeSubtotalOfOperatActivity").number(true, 2);
	$("#netAmountOfCashFlow").number(true, 2);
	$("#incomeFromWithdrawInvestment").number(true, 2);
	$("#otherCashReceivedInvestActivity").number(true, 2);
	$("#cashOfFixedIntangibleOtherLong").number(true, 2);
	$("#cashFromDisposalOtherBusiness").number(true, 2);
	$("#cashFromInvestIncome").number(true, 2);
	$("#incomeSubtotalOfInvestmentActivities").number(true, 2);
	$("#cashOfFixedIntangibleLong").number(true, 2);
	$("#expenditureOfInvest").number(true, 2);
	$("#cashPaidForBusinessSubsidiaries").number(true, 2);
	$("#expendOfActivityAboutInvestment").number(true, 2);
	$("#outcomeSubtotalOfInvestmentActivities").number(true, 2);
	$("#investmentAmountOfCashFlow").number(true, 2);
	$("#incomeFromAbsorbInvestment").number(true, 2);
	$("#incomeFromObtainBorrowMoney").number(true, 2);
	$("#otherIncomeFromRaiseMoney").number(true, 2);
	$("#incomeSubtotalOfFinanceActivities").number(true, 2);
	$("#expendOfRepaymentOfDept").number(true, 2);
	$("#cashOfDividendsProfitInterest").number(true, 2);
	$("#otherExpendActivityRaiseMoney").number(true, 2);
	$("#outcomeSubtotalOfFinancingActivities").number(true, 2);
	$("#financingAmountOfCashFlow").number(true, 2);
	$("#influenceFluctuationCash").number(true, 2);
	$("#influenceFluctuationCash").number(true, 2);
	$("#increaseCashEquivalent").number(true, 2);
	$("#margin").number(true, 2);
	$("#preparationOfDevaluation").number(true, 2);
	$("#depreciationOfFixed").number(true, 2);
	$("#amortizationOfIntangible").number(true, 2);
	$("#amortizationOfLong").number(true, 2);
	$("#lossFromDisposal").number(true, 2);
	$("#lossOfFixed").number(true, 2);
	$("#changeInFairValueLoss").number(true, 2);
	$("#financialExpenses").number(true, 2);
	$("#investmentLoss").number(true, 2);
	$("#decreaseInDeferredTax").number(true, 2);
	$("#increaseInDeferredTaxLiabilities").number(true, 2);
	$("#decreaseInInventories").number(true, 2);
	$("#decreaseInOperatingReceivables").number(true, 2);
	$("#increaseInOperatingPayables").number(true, 2);
	$("#other").number(true, 2);
	$("#otherAmountOfCashFlow").number(true, 2);
	$("#debtTurnIntoCapital").number(true, 2);
	$("#convertibleBonds").number(true, 2);
	$("#theLeasedAssets").number(true, 2);
	$("#closeBalanceOfCash").number(true, 2);
	$("#openBalanceOfCash").number(true, 2);
	$("#closeBalanceOfCashEquivalents").number(true, 2);
	$("#openBalanceOfCashEquivalents").number(true, 2);
	$("#cashAndCashEquivalents").number(true, 2);

}



function formValidatorRisk(){
	$('#riskForm').bootstrapValidator({
	      message: 'This value is not valid',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  environmentPolicyRegulationAnaly : {
	        	 validators: {
						stringLength: {
		                      min: 1,
		                      max: 2000,
		                      message: '长度为1-2000'
		                  }
					}	        	 
	         },
	         marketPositionAnaly : {
	        	 validators: {
						stringLength: {
		                      min: 1,
		                      max: 2000,
		                      message: '长度为1-2000'
		                  }
					}	        	 
	         },
	         competitorGeneralizeAnaly : {
	        	 validators: {
						stringLength: {
		                      min: 1,
		                      max: 2000,
		                      message: '长度为1-2000'
		                  }
					}	        	 
	         },
	         productAnaly : {
	        	 validators: {
						stringLength: {
		                      min: 1,
		                      max: 2000,
		                      message: '长度为1-2000'
		                  }
					}	        	 
	         },
	         operateFlowChart : {
	        	 validators: {
						stringLength: {
		                      min: 1,
		                      max: 2000,
		                      message: '长度为1-2000'
		                  }
					}	        	 
	         },
	         operateFlowRiskAnaly : {
	        	 validators: {
						stringLength: {
		                      min: 1,
		                      max: 2000,
		                      message: '长度为1-2000'
		                  }
					}	        	 
	         }
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
		});	
}
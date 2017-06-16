$(document).ready(function() {
	initTable(); 
	initTableAnaly();
	loadDate();
	ajaxRelaCorps("txt_corpId", "corpId", "r_corpId");
	loadcount();
	formValidator();
	formValidatorAnaly();
	numFormat();
	//modal绑定事件
	$('#addModal').on('hidden.bs.modal', function(){
		$("#addForm")[0].reset();
		$("#addForm").data('bootstrapValidator').destroy();
		$("#addForm").data('bootstrapValidator', null);
		formValidator();
		document.getElementById("field").disabled=false;
		document.getElementById("btn_save").style.display="";
	});
	//去掉modal上的验证缓存
	$('#addModal').on('hide.bs.modal', function () {
		$("#addForm").data('bootstrapValidator').resetForm();
	});
	
	$('#ModalAnaly').on('hidden.bs.modal', function(){
		$("#addFormAnaly")[0].reset();
		$("#addFormAnaly").data('bootstrapValidator').destroy();
		$("#addFormAnaly").data('bootstrapValidator', null);
		formValidatorAnaly();
	});
} );

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
		'click .modAnaly': function (e, value, row, index) {
			modFunAnaly(row);
	    },
		'click .detail': function (e, value, row, index) {
			detailFun(row,0);
			},
		'click .mod': function (e, value, row, index) {
				modFun(row,2);
		    },
	    'click .remove': function (e, value, row, index) {
	    	bootbox.confirm("确定删除此条记录?", function(result) {  
	            if (result) {  
	            	var options = {
	    					url : '../../corpCondition/delete',
	    					data : '{"recUid":"'+row.recUid+'"}',
	    					callBackFun : function(data) {
	    						if(data.result==0){
	    							searchFun();
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
	            } 
	    	 });
	    }
	};

function searchFun() {
	initTable();
	initTableAnaly();
}

function initTable() { 
	$('#corpConditionList').bootstrapTable('destroy');  
	$("#corpConditionList").bootstrapTable({  
         method: "post", 
         url: "../../corpCondition/list", 
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
           var data = CloudUtils.convertStringJson('searchForm');
           var jsonData = eval("(" + data + ")");
           if(jsonData.txt_corpId ==""){
        	   jsonData.txt_corpId = null;
           }
           var param = {    
               pageNumber: params.pageNumber,    
               pageSize: params.pageSize,
               corpId: jsonData.txt_corpId
           };    
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
				field : 'proportionOfFixedAssets',
				title : '固定资产比重(%)',
				align : 'center',
				valign : 'middle',
	            formatter:function(value,row,index){
	 	 	    	return $.number(value,2);
	 		        }
			},{
				field : 'shareholderRate',
				title : '股东权益比率(%)',
				align : 'center',
				valign : 'middle',
	            formatter:function(value,row,index){
	 	 	    	return $.number(value,2);
	 		        }
			},{
				field : 'longtermDebtRate',
				title : '长期负债比率(%)',
				align : 'center',
				valign : 'middle',
	            formatter:function(value,row,index){
	 	 	    	return $.number(value,2);
	 		        }
			},{
				field : 'fixedAssetsAndEquityRate',
				title : '股东权益与固定资产比率(%)',
				align : 'center',
				valign : 'middle',
	            formatter:function(value,row,index){
	 	 	    	return $.number(value,2);
	 		        }
			},{
				field : 'mainBusinessProfitRate',
				title : '主营业务利润比重(%)',
				align : 'center',
				valign : 'middle',
	            formatter:function(value,row,index){
	 	 	    	return $.number(value,2);
	 		        }
			},{ 
				field: 'accountsReceivableIncomeRate', 
				title: '应收账款占收入比重(%)', 
				align: 'center',
				valign: 'middle' ,
	            formatter:function(value,row,index){
	 	 	    	return $.number(value,2);
	 		        }
			}, {
	 	        field: 'operation',
	 	        title: '操作',
	 	        align: 'center',
	 	        formatter:function(value,row,index){
		        	var d = '<a class = "fa fa-list-ul detail" style="color:#a9d86e;padding:0px 5px;" title="详情" href="javascript:void(0)"></a>';
	 	        	var m = '<a class = "fa fa-edit mod" style="color:#d864fd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
		 	         var r = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
		 	        return d+' '+m+' '+r;
	 	        },
	 	        events: 'operateEvents'
 	    }]
       });  
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

function detailFun(row,isEdit) {
	modFun(row,isEdit);
    document.getElementById("field").disabled=true;
    document.getElementById("btn_save").style.display="none";
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
			url : '../../corpCondition/detail',
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
	var isEdit =  $('#isEdit').val(); 
	if(isEdit == 1){//新增1；修改2
		var options = {
				url : '../../corpCondition/add',
				data : data,
				callBackFun : function(data) {
					bootbox.alert(data.resultNote);
					if(data.result==0){
						searchFun();
					}else{
						return false;
					}
				},
				errorCallback:function(data){
					bootbox.alert("error");
				}
		};
		CloudUtils.ajax(options);
	}else{
		var jsonData = eval("(" + data + ")");
		if(oldYear == jsonData.operYear){
			jsonData.operYear = null;
		}
		var options = {
				url : '../../corpCondition/mod',
				data :JSON.stringify(jsonData),
				callBackFun : function(data) {
					bootbox.alert(data.resultNote);
					if(data.result==0){
						searchFun();
					}else{
						return false;
					}
				},
				errorCallback:function(data){
					bootbox.alert("error");
				}
		};
		CloudUtils.ajax(options);
	}
	modal.modal("hide");
}

function calculateData(){
	var operYear=$("#operYear").val();
	var corpId=$("#corpId").val();
	var param = {    
			operYear:operYear,
			corpId:corpId
	      };    
	var options = {
				url : '../../corpCondition/calculateData',
				data : JSON.stringify(param),
				callBackFun : function(data) {
					$("#currentRate").val(data.currentRate);//流动比率 
					$("#quickRate").val(data.quickRate);//速动比率 
					$("#interestCoverage").val(data.interestCoverage);//利息保障倍数 
					$("#cashRate").val(data.cashRate);//现金比率
					$("#assetsAndLiabilities").val(data.assetsAndLiabilities);//资产负债率
					$("#equityRate").val(data.equityRate);//产权比例
					$("#receivableTurnoverRate").val(data.receivableTurnoverRate);//应收账款周转率（次/年）
					$("#inventoryTurnover").val(data.inventoryTurnover);//存货周转率（次/年）
					$("#currentAssetsTurnover").val(data.currentAssetsTurnover);//流动资产周转率（次/年 )
					$("#fixedAssetsTurnover").val(data.fixedAssetsTurnover);//固定资产周转率（次/年）
					$("#totalAssetTurnover").val(data.totalAssetTurnover);//总资产周转率（次/年）
					$("#accountsPayableTurnover").val(data.accountsPayableTurnover);//应付账款周转率（次/年）
					$("#cashTurnover").val(data.cashTurnover);//现金周转率（次/年）
					$("#operatingMargin").val(data.operatingMargin);//营业利润率
					$("#operatingNetProfit").val(data.operatingNetProfit);//营业净利率
					$("#operatingGrossProfit").val(data.operatingGrossProfit);//营业毛利率
					$("#costMargins").val(data.costMargins);//成本费用利润率
					$("#costRate").val(data.costRate);//成本费用率
					$("#returnTotalAssets").val(data.returnTotalAssets);//总资产报酬率
					$("#returnNetAssets").val(data.returnNetAssets);//净资产收益率
					$("#mainBusinessRevenueGrowth").val(data.mainBusinessRevenueGrowth);//主营业务收入增长率
					$("#mainBusinessProfitGrowth").val(data.mainBusinessProfitGrowth);//主营业务利润增长率
					$("#netProfitGrowth").val(data.netProfitGrowth);//净利润增长率
					$("#totalAssetGrowth").val(data.totalAssetGrowth);//总资产增长率
					$("#capitalMaintenanceAndAppreciation").val(data.capitalMaintenanceAndAppreciation);//资本保值增值率
					$("#cashOfSales").val(data.cashOfSales);//销售收现比率
					$("#cashOfPurchase").val(data.cashOfPurchase);//购货付现比率
					$("#netOperatingCashToSales").val(data.netOperatingCashToSales);//经营现金净流量对销售收入比率
					$("#operatingCashRateOfReturn").val(data.operatingCashRateOfReturn);//资产的经营现金流量回报率 
					$("#netOperatingCashToProfit").val(data.netOperatingCashToProfit);//经营现金净流量对净利润的比率
					$("#netOperatingCashToDebt").val(data.netOperatingCashToDebt);//经营现金净流量对负债比率
					$("#proportionOfFixedAssets").val(data.proportionOfFixedAssets);//固定资产比重
					$("#shareholderRate").val(data.shareholderRate);//股东权益比率
					$("#longtermDebtRate").val(data.longtermDebtRate);//长期负债比率
					$("#fixedAssetsAndEquityRate").val(data.fixedAssetsAndEquityRate);//股东权益与固定资产比率
					$("#mainBusinessProfitRate").val(data.mainBusinessProfitRate);//主营业务利润比重
					$("#accountsReceivableIncomeRate").val(data.accountsReceivableIncomeRate);//应收账款占收入比重
					$("#liquidityIncomeRate").val(data.liquidityIncomeRate);//流动资金创收率
					$("#totalAssetsProfitMargin").val(data.totalAssetsProfitMargin);//总资产利润率
					
					var receivableTurnoverRate = $("#receivableTurnoverRate").val();//应收账款周转率（次/年）
					var inventoryTurnover = $("#inventoryTurnover").val();//存货周转率（次/年）
					var currentAssetsTurnover = $("#currentAssetsTurnover").val();//流动资产周转率（次/年）
					var fixedAssetsTurnover = $("#fixedAssetsTurnover").val();//固定资产周转率（次/年）
					var totalAssetTurnover = $("#totalAssetTurnover").val();//总资产周转率（次/年）
					var accountsPayableTurnover = $("#accountsPayableTurnover").val();//应付账款周转率（次/年）
					var cashTurnover = $("#cashTurnover").val();//现金周转率（次/年）
					
					/*******************************************计算规则******************************************/
					
					//应收账款周转天数（天/次）=360/应收账款周转率（次/年）
					var receivableTurnoverRateDays = CloudUtils.Math(360,receivableTurnoverRate,'div');
					receivableTurnoverRateDays = transform(receivableTurnoverRateDays);
					$("#receivableTurnoverRateDays").val(receivableTurnoverRateDays);
					
					//存货周转期（天/次）=360/存货周转期（次/年）
					var inventoryTurnoverDays = CloudUtils.Math(360,inventoryTurnover,'div');
					inventoryTurnoverDays = transform(inventoryTurnoverDays);
					$("#inventoryTurnoverDays").val(inventoryTurnoverDays);
					
					//流动资产周转期（天/次）=360/流动资产周转期（次/年）
					var currentAssetsTurnoverDays = CloudUtils.Math(360,currentAssetsTurnover,'div');
					currentAssetsTurnoverDays = transform(currentAssetsTurnoverDays);
					$("#currentAssetsTurnoverDays").val(currentAssetsTurnoverDays);
					
					//固定资产周转率（天/次）=360/固定资产周转率（次/年）
					var fixedAssetsTurnoverDays = CloudUtils.Math(360,fixedAssetsTurnover,'div');
					fixedAssetsTurnoverDays = transform(fixedAssetsTurnoverDays);
					$("#fixedAssetsTurnoverDays").val(fixedAssetsTurnoverDays);
					
					//固定资产周转率（天/次）=360/固定资产周转率（次/年）
					var fixedAssetsTurnoverDays = CloudUtils.Math(360,fixedAssetsTurnover,'div');
					fixedAssetsTurnoverDays = transform(fixedAssetsTurnoverDays);
					$("#fixedAssetsTurnoverDays").val(fixedAssetsTurnoverDays);
					
					//总资产周转率（天/次）=360/总资产周转率（次/年）
					var totalAssetTurnoverDays = CloudUtils.Math(360,totalAssetTurnover,'div');
					totalAssetTurnoverDays = transform(totalAssetTurnoverDays);
					$("#totalAssetTurnoverDays").val(totalAssetTurnoverDays);
					
					//应付账款周转率（天/次）=360/应付账款周转率（次/年）
					var accountsPayableTurnoverDays = CloudUtils.Math(360,accountsPayableTurnover,'div');
					accountsPayableTurnoverDays = transform(accountsPayableTurnoverDays);
					$("#accountsPayableTurnoverDays").val(accountsPayableTurnoverDays);
					
					//现金周转率（天/次）=360/现金周转率（次/年）
					var cashTurnoverDays = CloudUtils.Math(360,cashTurnover,'div');
					cashTurnoverDays = transform(cashTurnoverDays);
					$("#cashTurnoverDays").val(cashTurnoverDays);
				},
				errorCallback:function(data){
					bootbox.alert("error");  
				}
		};
		CloudUtils.ajax(options);
}

function loadcount(){
	$('input').bind('input propertychange', function() {		
		//流动资产周转 （天/次）的计算
		var receivableTurnoverRate = $("#receivableTurnoverRate").val();//应收账款周转率（次/年）
		var inventoryTurnover = $("#inventoryTurnover").val();//存货周转率（次/年）
		var currentAssetsTurnover = $("#currentAssetsTurnover").val();//流动资产周转率（次/年）
		var fixedAssetsTurnover = $("#fixedAssetsTurnover").val();//固定资产周转率（次/年）
		var totalAssetTurnover = $("#totalAssetTurnover").val();//总资产周转率（次/年）
		var accountsPayableTurnover = $("#accountsPayableTurnover").val();//应付账款周转率（次/年）
		var cashTurnover = $("#cashTurnover").val();//现金周转率（次/年）
		
		/*******************************************计算规则******************************************/
		
		//应收账款周转天数（天/次）=360/应收账款周转率（次/年）
		var receivableTurnoverRateDays = CloudUtils.Math(360,receivableTurnoverRate,'div');
		receivableTurnoverRateDays = transform(receivableTurnoverRateDays);
		$("#receivableTurnoverRateDays").val(receivableTurnoverRateDays);
		
		//存货周转期（天/次）=360/存货周转期（次/年）
		var inventoryTurnoverDays = CloudUtils.Math(360,inventoryTurnover,'div');
		inventoryTurnoverDays = transform(inventoryTurnoverDays);
		$("#inventoryTurnoverDays").val(inventoryTurnoverDays);
		
		//流动资产周转期（天/次）=360/流动资产周转期（次/年）
		var currentAssetsTurnoverDays = CloudUtils.Math(360,currentAssetsTurnover,'div');
		currentAssetsTurnoverDays = transform(currentAssetsTurnoverDays);
		$("#currentAssetsTurnoverDays").val(currentAssetsTurnoverDays);
		
		//固定资产周转率（天/次）=360/固定资产周转率（次/年）
		var fixedAssetsTurnoverDays = CloudUtils.Math(360,fixedAssetsTurnover,'div');
		fixedAssetsTurnoverDays = transform(fixedAssetsTurnoverDays);
		$("#fixedAssetsTurnoverDays").val(fixedAssetsTurnoverDays);
		
		//固定资产周转率（天/次）=360/固定资产周转率（次/年）
		var fixedAssetsTurnoverDays = CloudUtils.Math(360,fixedAssetsTurnover,'div');
		fixedAssetsTurnoverDays = transform(fixedAssetsTurnoverDays);
		$("#fixedAssetsTurnoverDays").val(fixedAssetsTurnoverDays);
		
		//总资产周转率（天/次）=360/总资产周转率（次/年）
		var totalAssetTurnoverDays = CloudUtils.Math(360,totalAssetTurnover,'div');
		totalAssetTurnoverDays = transform(totalAssetTurnoverDays);
		$("#totalAssetTurnoverDays").val(totalAssetTurnoverDays);
		
		//应付账款周转率（天/次）=360/应付账款周转率（次/年）
		var accountsPayableTurnoverDays = CloudUtils.Math(360,accountsPayableTurnover,'div');
		accountsPayableTurnoverDays = transform(accountsPayableTurnoverDays);
		$("#accountsPayableTurnoverDays").val(accountsPayableTurnoverDays);
		
		//现金周转率（天/次）=360/现金周转率（次/年）
		var cashTurnoverDays = CloudUtils.Math(360,cashTurnover,'div');
		cashTurnoverDays = transform(cashTurnoverDays);
		$("#cashTurnoverDays").val(cashTurnoverDays);
	});
}

//当取的的值为NaN时转换为0
function transform(value){
	var newvalue = isNaN(value)==true?0:value;
	return newvalue;
}

//动态下拉框
function ajaxRelaCorps(Id1, Id2, Id3) {
	var relaCorpId = store.get('corpId');
	var options = {
		url : '../../corp/list',
		data : '{"relaCorpId": "' + relaCorpId + '","isPage":0}',
		callBackFun : function(data) {
			var control1 = $('#' + Id1);
			var control2 = $('#' + Id2);
			var control3 = $('#' + Id3);
			control1.append("<option value=''>全部</option>");
			$.each(data.dataList, function(index, units) {
				control1.append("<option value=" + units.corpId + ">"
						+ units.corpName + "</option>");
				control2.append("<option value=" + units.corpId + ">"
						+ units.corpName + "</option>");
				control3.append("<option value=" + units.corpId + ">"
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

//form验证规则
function formValidator(){
	$('#addForm').bootstrapValidator({
	      message: 'This value is not valid',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  currentRate : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '流动比率不能为空'
		                  },
			              callback: {  
		                       message: '流动比率在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  quickRate : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '速动比率不能为空'
		                  },
			              callback: {  
		                       message: '速动比率在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  interestCoverage : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '利息保障倍数不能为空'
		                  },
			              callback: {  
		                       message: '利息保障倍数在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  cashRate : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '现金比率不能为空'
		                  },
			              callback: {  
		                       message: '现金比率在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  assetsAndLiabilities : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '资产负债率不能为空'
		                  },
			              callback: {  
		                       message: '资产负债率在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  equityRate : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '产权比例不能为空'
		                  },
			              callback: {  
		                       message: '产权比例在0-100%之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=0&&parseFloat(value)<=100;
		                         }  
		                     } 
	                }
	         },  receivableTurnoverRate : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '应收账款周转率（次/年）不能为空'
		                  },
			              callback: {  
		                       message: '应收账款周转率（次/年）在-100000~100000之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  receivableTurnoverRateDays : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '应收账款周转天数（天/次）不能为空'
		                  },
			              callback: {  
		                       message: '应收账款周转天数（天/次）在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  inventoryTurnover : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '存货周转率（次/年）不能为空'
		                  },
			              callback: {  
		                       message: '存货周转率（次/年）在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  inventoryTurnoverDays : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '存货周转期（天/次）不能为空'
		                  },
			              callback: {  
		                       message: '存货周转期（天/次）在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  currentAssetsTurnover : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '流动资产周转率（次/年）不能为空'
		                  },
			              callback: {  
		                       message: '流动资产周转率（次/年）在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<=99999999;
		                         }  
		                     } 
	                }
	         },  currentAssetsTurnoverDays : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '流动资产周转期（天/次）不能为空'
		                  },
			              callback: {  
		                       message: '流动资产周转期（天/次）在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  fixedAssetsTurnover : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '固定资产周转率（次/年）不能为空'
		                  },
			              callback: {  
		                       message: '固定资产周转率（次/年）在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  fixedAssetsTurnoverDays : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '固定资产周转期（天/次）不能为空'
		                  },
			              callback: {  
		                       message: '固定资产周转期（天/次）在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  totalAssetTurnover : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '总资产周转率（次/年）不能为空'
		                  },
			              callback: {  
		                       message: '总资产周转率（次/年）在10000-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  totalAssetTurnoverDays : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '总资产周转期（天/次）不能为空'
		                  },
			              callback: {  
		                       message: '总资产周转期（天/次）在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  accountsPayableTurnover : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '应付账款周转率（次/年）不能为空'
		                  },
			              callback: {  
		                       message: '应付账款周转率（次/年）在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  accountsPayableTurnoverDays : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '应付账款周转天数（天/次）不能为空'
		                  },
			              callback: {  
		                       message: '应付账款周转天数（天/次）在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  cashTurnover : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '现金周转率（次/年）不能为空'
		                  },
			              callback: {  
		                       message: '现金周转率（次/年）在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  cashTurnoverDays : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '现金周转天数（天/次）不能为空'
		                  },
			              callback: {  
		                       message: '现金周转天数（天/次）在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  operatingMargin : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '营业利润率不能为空'
		                  },
			              callback: {  
		                       message: '营业利润率在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  operatingNetProfit : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '营业净利率不能为空'
		                  },
			              callback: {  
		                       message: '营业净利率在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  operatingGrossProfit : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '营业毛利率不能为空'
		                  },
			              callback: {  
		                       message: '营业毛利率在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  costMargins : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '成本费用利润率不能为空'
		                  },
			              callback: {  
		                       message: '成本费用利润率在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  costRate : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '成本费用率不能为空'
		                  },
			              callback: {  
		                       message: '成本费用率在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  returnTotalAssets : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '总资产报酬率不能为空'
		                  },
			              callback: {  
		                       message: '总资产报酬率在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  returnNetAssets : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '净资产收益率不能为空'
		                  },
			              callback: {  
		                       message: '净资产收益率在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  mainBusinessRevenueGrowth : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '主营业务收入增长率不能为空'
		                  },
			              callback: {  
		                       message: '主营业务收入增长率在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  mainBusinessProfitGrowth : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '主营业务利润增长率不能为空'
		                  },
			              callback: {  
		                       message: '主营业务利润增长率在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  netProfitGrowth : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '净利润增长率不能为空'
		                  },
			              callback: {  
		                       message: '净利润增长率在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  totalAssetGrowth : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '总资产增长率不能为空'
		                  },
			              callback: {  
		                       message: '总资产增长率在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  capitalMaintenanceAndAppreciation : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '资本保值增值率不能为空'
		                  },
			              callback: {  
		                       message: '资本保值增值率在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  cashOfSales : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '销售收现比率不能为空'
		                  },
			              callback: {  
		                       message: '销售收现比率在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  cashOfPurchase : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '购货付现比率不能为空'
		                  },
			              callback: {  
		                       message: '购货付现比率在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  netOperatingCashToSales : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '经营现金净流量对销售收入比率不能为空'
		                  },
			              callback: {  
		                       message: '经营现金净流量对销售收入比率在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  operatingCashRateOfReturn: {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '资产的经营现金流量回报率不能为空'
		                  },
			              callback: {  
		                       message: '资产的经营现金流量回报率在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  netOperatingCashToProfit : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '经营现金净流量对净利润的比率不能为空'
		                  },
			              callback: {  
		                       message: '经营现金净流量对净利润的比率在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  netOperatingCashToDebt : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '经营现金净流量对负债比率不能为空'
		                  },
			              callback: {  
		                       message: '经营现金净流量对负债比率在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  proportionOfFixedAssets : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '固定资产比重不能为空'
		                  },
			              callback: {  
		                       message: '固定资产比重在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  shareholderRate : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '股东权益比率不能为空'
		                  },
			              callback: {  
		                       message: '股东权益比率在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  longtermDebtRate : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '长期负债比率不能为空'
		                  },
			              callback: {  
		                       message: '长期负债比率在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  fixedAssetsAndEquityRate : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '股东权益与固定资产比率不能为空'
		                  },
			              callback: {  
		                       message: '股东权益与固定资产比率在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  mainBusinessProfitRate : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '主营业务利润比重不能为空'
		                  },
			              callback: {  
		                       message: '主营业务利润比重在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  accountsReceivableIncomeRate : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '应收账款占收入比重不能为空'
		                  },
			              callback: {  
		                       message: '应收账款占收入比重在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  liquidityIncomeRate : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '流动资金创收率不能为空'
		                  },
			              callback: {  
		                       message: '流动资金创收率在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  totalAssetsProfitMargin : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '总资产利润率不能为空'
		                  },
			              callback: {  
		                       message: '总资产利润率在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
		                     } 
	                }
	         },  loanRecoveryDuringReportingPeriod : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '报告期内货款回收率不能为空'
		                  },
			              callback: {  
		                       message: '报告期内货款回收率在-100000~100000(不包括)之间',  
		                       callback: function(value, validator) { 
		                        	return parseFloat(value)>=-100000&&parseFloat(value)<100000;
		                         }  
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
 * *****************************************企业经营分析********************************************
 */

function initTableAnaly() {
	$('#corpEvalListTable').bootstrapTable('destroy');
	$("#corpEvalListTable").bootstrapTable({
		method : "post",
		url : "../../corpEval/list",
		toolbar : '#toolbar',
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
			var data = CloudUtils.convertStringJson('searchForm');
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
		columns : [ {
			field : 'recUid',
			title : 'Item ID',
			align : 'center',
			valign : 'middle',
			visible : false
		}, {
			field : 'corpId',
			title : '企业Id',
			align : 'center',
			valign : 'middle',
			visible : false
		}, {
			field : 'corpName',
			title : '企业名称',
			align : 'center',
			valign : 'middle'
		}, {
			field : 'financeComprehensiveEval',
			title : '财务综合评定',
			align : 'center',
			valign : 'middle'
		}, {
			field : 'financeIndicatorsAnaly',
			title : '财务指标分析',
			align : 'center',
			valign : 'middle'
		}, {
			field : 'wholeRiskEval',
			title : '企业整体风险评价',
			align : 'center',
			valign : 'middle'
		}, {
			field : 'operation',
			title : '操作',
			align : 'center',
			formatter : function(value, row, index) {
	        	 var m = '<a class = "fa fa-edit modAnaly" style="color:#d864fd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
				return m;
			},
			events : 'operateEvents'
		} ]
	});
}

function addFunAnaly() {
	$("#r_corpId").attr("disabled",false);
	$("#addModalAnaly").text("添加");
    $('#ModalAnaly').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
    $('#AnalyEdit').val(1); //新增1；修改2
}

function modFunAnaly(row) {
		$("#r_corpId").attr("disabled",true);
    	$("#addModalAnaly").text("修改");
        $('#ModalAnaly').modal();
        $('#AnalyEdit').val(2); //新增1；修改2
        row.r_corpId = row.corpId;
        CloudUtils.setForm(row,'addFormAnaly');
    }

function saveUserAnaly() {
    	var modal = $('#ModalAnaly');
    	var data = CloudUtils.convertStringJson('addFormAnaly');
    	 var jsonData = eval("(" + data + ")");
         var param = {    
             corpId: jsonData.r_corpId,
             financeComprehensiveEval:jsonData.financeComprehensiveEval,
             financeIndicatorsAnaly:jsonData.financeIndicatorsAnaly,
             wholeRiskEval:jsonData.wholeRiskEval,
         };  
    	var isEdit =  $('#AnalyEdit').val(); 
    	if(isEdit == 1){//新增1；修改2
    		var options = {
    				url : '../../corpEval/add',
    				data : JSON.stringify(param),
    				callBackFun : function(data) {
    					bootbox.alert(data.resultNote);
    					if(data.result==0){
    						searchFun();
    					}else{
    						return false;
    					}
    				},
    				errorCallback:function(data){
    					bootbox.alert("error");
    				}
    		};
    		CloudUtils.ajax(options);
    	}else{
    		var options = {
    				url : '../../corpEval/mod',
    				data : data,
    				callBackFun : function(data) {
    					bootbox.alert(data.resultNote);
    					if(data.result==0){
    						searchFun();
    					}else{
    						return false;
    					}
    				},
    				errorCallback:function(data){
    					bootbox.alert("error");
    				}
    		};
    		CloudUtils.ajax(options);
    	}
    	modal.modal("hide");
    }





// form验证规则
function formValidatorAnaly() {
	$('#addFormAnaly').bootstrapValidator({
		message : 'This value is not valid',
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			financeComprehensiveEval : {
				validators : {
					stringLength: {
	                      min: 1,
	                      max: 2000,
	                      message: '长度为1-2000'
	                  }
				}
			},
			financeIndicatorsAnaly : {
				validators : {
					stringLength: {
	                      min: 1,
	                      max: 2000,
	                      message: '长度为1-2000'
	                  }
				}
			},
			wholeRiskEval : {
				validators : {
					stringLength: {
	                      min: 1,
	                      max: 2000,
	                      message: '长度为1-2000'
	                  }
				}
			}
		}
	}).on('success.form.bv', function(e) {
		e.preventDefault();
	});
}

function numFormat(){
	$("#staffNum").number(true, 0);
	$("#proportionOfFixedAssets").number(true,2);
	$("#shareholderRate").number(true,2);
	$("#longtermDebtRate").number(true,2);
	$("#fixedAssetsAndEquityRate").number(true,2);
	$("#mainBusinessProfitRate").number(true,2);
	$("#accountsReceivableIncomeRate").number(true,2);
	$("#currentRate").number(true,2);
	$("#quickRate").number(true,2);
	$("#cashRate").number(true,2);
	$("#assetsAndLiabilities").number(true,2);
	$("#equityRate").number(true,2);
	$("#receivableTurnoverRate").number(true,2);
	$("#operatingMargin").number(true,2);
	$("#operatingNetProfit").number(true,2);
	$("#operatingGrossProfit").number(true,2);
	$("#costMargins").number(true,2);
	$("#costRate").number(true,2);
	$("#returnTotalAssets").number(true,2);
	$("#returnNetAssets").number(true,2);
	$("#mainBusinessRevenueGrowth").number(true,2);
	$("#mainBusinessProfitGrowth").number(true,2);
	$("#netProfitGrowth").number(true,2);
	$("#totalAssetGrowth").number(true,2);
	$("#capitalMaintenanceAndAppreciation").number(true,2);
	$("#cashOfSales").number(true,2);
	$("#cashOfPurchase").number(true,2);
	$("#netOperatingCashToSales").number(true,2);
	$("#operatingCashRateOfReturn").number(true,2);
	$("#netOperatingCashToProfit").number(true,2);
	$("#netOperatingCashToDebt").number(true,2);
	$("#liquidityIncomeRate").number(true,2);
	$("#totalAssetsProfitMargin").number(true,2);
	$("#loanRecoveryDuringReportingPeriod").number(true,2);
	$("#receivableTurnoverRateDays").number(true,2);
	$("#inventoryTurnover").number(true,2);
	$("#inventoryTurnoverDays").number(true,2);
	$("#currentAssetsTurnover").number(true,2);
	$("#currentAssetsTurnoverDays").number(true,2);
	$("#fixedAssetsTurnover").number(true,2);
	$("#fixedAssetsTurnoverDays").number(true,2);
	$("#totalAssetTurnover").number(true,2);
	$("#totalAssetTurnoverDays").number(true,2);
	$("#accountsPayableTurnover").number(true,2);
	$("#accountsPayableTurnoverDays").number(true,2);
	$("#cashTurnover").number(true,2);
	$("#cashTurnoverDays").number(true,2);
	$("#interestCoverage").number(true,2);
}
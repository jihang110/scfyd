
var canExp = true;
$(document).ready(function() {
	initTable(); 
	ajaxRelaCorps();
	downloadTemp();
	formValidator();
	//modal绑定事件
	$('#addModal').on('hidden.bs.modal', function(){
		$("#addForm")[0].reset();
		$("#addForm").data('bootstrapValidator').resetForm();
		$("#field").attr("disabled",false); 
		$("#btn_save").css('display',''); 
	});
	$('#addModal').on('hide.bs.modal', function () {
		window.parent.scrollTo(0,0);
//		$("#addForm").data('bootstrapValidator').resetForm();
	});
	loadcount();
	loadDate();
	numFormat();
} );

//加上当前默认时间
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
		'click .modify': function (e, value, row, index) {
				modFun(row,2);
		},
	    'click .remove': function (e, value, row, index) {
	    	bootbox.confirm("确定删除此条记录?", function(result) {  
	            if (result) {
	            	var options = {
	    					url : '../../negativeInfoUpload/delete',
	    					data : '{"negUpId":"'+row.negUpId+'"}',
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

//平均流动资产	 流动资产合计 
function addTotalCurrentAssets(){
	var total = "";
	var idStr = "moneyFunds,otherMoneyFunds,transactionalFinancialAssets,billReceivable,accountsReceivable,prepayments," +
			"interestReceivable,dividendReceivable,otherReceivables,stock,nonCurrentAssetsDueWithinOneYear,otherCurrentAssets"; 
	var arr = idStr.split(",");
	var paramStr ="";
	for(var i in arr){
		if($("#"+arr[i]).val()==""){
			paramStr += "0,";
		}else{
			paramStr += $("#"+arr[i]).val() +",";
		}
	}
	var param = paramStr.substr(0,paramStr.length - 1) ;
	total = CloudUtils.MathArray(param,"add,add,add,add,add,add,add,add,add,add,add");
	$("#totalCurrentAssets").val(total);
	$("#averageCurrentAssets").val(total);
	
	//平均应收账款 = 应收账款+应收票据 
	var avgActRecStr = $("#billReceivable").val()+","+$("#accountsReceivable").val();
	var averageAccountsReceivable = CloudUtils.MathArray(avgActRecStr,"add");
	$("#averageAccountsReceivable").val(averageAccountsReceivable);
	
	//平均存货	 存货 
	$("#averageInventory").val($("#stock").val());
	
	//平均预付账款	 预付款项 
	$("#averagePrepayment").val($("#prepayments").val());
	
	//平均其他应收款	 其他应收款 
	$("#averageOtherReceivables").val($("#otherReceivables").val());
	
	//平均货币资金	 货币资金 
	$("#averageMoneyFunds").val($("#moneyFunds").val());
}
//非流动资产
function addTotalNonCurrentAssets(){
	var total = "";
	var idStr = "availableForSaleFinancialAssets,heldToMaturityInvestments,longTermReceivables,longTermEquityInvestment," +
			"investmentRealEstate,fixedAssets,constructionInProgress,engineerMaterial,cleanUpOfFixedAssets," +
			"productiveBiologicalAssets,oilAndGasProperties,intangibleAssets,developmentExpenditure,goodwill," +
			"longTermPrepaidExpenses,deferredTaxAssets,otherNonCurrentAssets";
	var arr = idStr.split(",");
	var paramStr ="";
	for(var i in arr){
		if($("#"+arr[i]).val()==""){
			paramStr += "0,";
		}else{
			paramStr += $("#"+arr[i]).val() +",";
		}
	}
	var param = paramStr.substr(0,paramStr.length - 1) ;
	total = CloudUtils.MathArray(param,"add,add,add,add,add,add,add,add,add,add,add,add,add,add,add,add");
	$("#totalNonCurrentAssets").val(total);
	
	//平均总资产	 资产总计 
	var totalStr = $("#totalNonCurrentAssets").val() +","+ $("#totalCurrentAssets").val();
	var totalAssets = CloudUtils.MathArray(totalStr,"add");
	$("#totalAssets").val(totalAssets);
	$("#averageTotalAssets").val(totalAssets);
	
	//平均固定资产净值	 固定资产 
	$("#averageNetFixedAssets").val($("#fixedAssets").val());
}

//平均流动负债	 流动负债合计 
function addTotalCurrentLiabilities(){
	var total = "";
	var idStr = "shortTermLoan,transactionalFinancialLiabilities,notesPayable,accountsPayable,advancePayment," +
			"employeeBenefitsPayable,taxesPayable,interestPayable,dividendPayable,otherPayables," +
			"nonCurrentLiabilitiesDueWithinOneYear,otherCurrentLiabilities";
	var arr = idStr.split(",");
	var paramStr ="";
	for(var i in arr){
		if($("#"+arr[i]).val()==""){
			paramStr += "0,";
		}else{
			paramStr += $("#"+arr[i]).val() +",";
		}
	}
	var param = paramStr.substr(0,paramStr.length - 1) ;
	total = CloudUtils.MathArray(param,"add,add,add,add,add,add,add,add,add,add,add");
	$("#totalCurrentLiabilities").val(total);
	$("#averageCurrentLiabilities").val(total);
	
	//平均应付账款= 应付账款  +应付票据 
	var avgActPayStr = $("#notesPayable").val()+","+$("#accountsPayable").val();
	var averageAccountsPayable = CloudUtils.MathArray(avgActPayStr,"add");
	$("#averageAccountsPayable").val(averageAccountsPayable);
}

//非流动负债
function addTotalNonCurrentLiabilities(){
	var total = "";
	var idStr = "longTermLoan,bondsPayable,longTermPayables,specialPayables,projectedLiabilities," +
			"deferredIncomeTaxLiabilities,otherNonCurrentLiabilities";
	var arr = idStr.split(",");
	var paramStr ="";
	for(var i in arr){
		if($("#"+arr[i]).val()==""){
			paramStr += "0,";
		}else{
			paramStr += $("#"+arr[i]).val() +",";
		}
	}
	var param = paramStr.substr(0,paramStr.length - 1) ;
	total = CloudUtils.MathArray(param,"add,add,add,add,add,add");
	$("#totalNonCurrentLiabilities").val(total);
	
	//平均总负债	 负债合计 
	var totalStr = $("#totalCurrentLiabilities").val() +","+ $("#totalNonCurrentLiabilities").val();
	var totalLiabilities = CloudUtils.MathArray(totalStr,"add");
	$("#totalLiabilities").val(totalLiabilities);
	$("#averageTotalLiabilities").val(totalLiabilities);
}

//平均净资产	 所有者权益（或股东权益）合计 
function addtTotalOwnersEquity(){
	var total = "";
	var idStr = "paidUpCapital,capitalReserve,treasuryStocks,surplusReserve,undistributedProfit";
	var arr = idStr.split(",");
	var paramStr ="";
	for(var i in arr){
		if($("#"+arr[i]).val()==""){
			paramStr += "0,";
		}else{
			paramStr += $("#"+arr[i]).val() +",";
		}
	}
	var param = paramStr.substr(0,paramStr.length - 1) ;
	total = CloudUtils.MathArray(param,"add,add,add,add");
	$("#totalOwnersEquity").val(total);
	$("#averageNetAssets").val(total);
	
	//负债和所有者权益（或股东权益）总计 
	var totalStr = $("#totalLiabilities").val() +","+ $("#totalOwnersEquity").val();
	var totalLiabilitiesAndOwnersEquity = CloudUtils.MathArray(totalStr,"add");
	$("#totalLiabilitiesAndOwnersEquity").val(totalLiabilitiesAndOwnersEquity);
}

function loadcount(){
	$('input').bind('keyup', function() {
		addTotalCurrentAssets();
		addTotalNonCurrentAssets();
		addTotalCurrentLiabilities();
		addTotalNonCurrentLiabilities();
		addtTotalOwnersEquity();
		ajaxTotalAssetsGrowth();
		
	});
}

function ajaxTotalAssetsGrowth(){
	var totalLiabilitiesAndOwnersEquity = $("#totalLiabilitiesAndOwnersEquity").val();
	var totalOwnersEquity = $("#totalOwnersEquity").val();
	var surplusReserve = $("#surplusReserve").val();
	var totalLiabilitiesAndOwnersEquityPre = 0;
	var totalOwnersEquityPre = 0;
	var surplusReservePre = 0;
	var earningsPerShare = 0;
	var corpId =  $("#corpId").val();
	var nowYear = $("#operYear").val();
	var yearOpStr = nowYear +",1";
	var preYear = CloudUtils.MathArray(yearOpStr,"sub");
	var data = '{"operYear":"'+preYear+'","corpId":"'+corpId+'"}';
	var options = {
			url : "../../negativeInfo/getPara",
			data : data,
			callBackFun : function(data) {
				if(data.result==0){
					if(data!=null&&data.totalLiabilitiesAndOwnersEquity!=undefined){
						totalLiabilitiesAndOwnersEquityPre = data.totalLiabilitiesAndOwnersEquity;
					}
					if(data!=null&&data.totalOwnersEquity!=undefined){
						totalOwnersEquityPre = data.totalOwnersEquity;
					}
					if(data!=null&&data.surplusReserve!=undefined){
						surplusReservePre = data.surplusReserve;
					}
					if(data!=null&&data.earningsPerShare!=undefined){
						earningsPerShare = data.earningsPerShare;
					}
				}else{
					bootbox.alert(data.resultNote);
				}
			},
			errorCallback:function(data){
				bootbox.alert(data.resultNote);
				return false;
			}
	};
	CloudUtils.ajax(options);
	
	//总资产增长额= 期末负债和所有者权益（或股东权益）总计-期初负债和所有者权益（或股东权益）总计
	var totalAssetsGrowthParaStr = totalLiabilitiesAndOwnersEquity +","+ totalLiabilitiesAndOwnersEquityPre;
	var totalAssetsGrowth = CloudUtils.MathArray(totalAssetsGrowthParaStr,"sub");
	$("#totalAssetsGrowth").val(totalAssetsGrowth);
	
	//总资产增长率= 总资产增长额/负债和所有者权益（或股东权益）总计 
	var totalAstStr = $("#totalAssetsGrowth").val() +","+ $("#totalLiabilitiesAndOwnersEquity").val();
	var totalAssetsGrowthRate = isNaN(CloudUtils.MathArray(totalAstStr,"div"))==true?0:CloudUtils.MathArray(totalAstStr,"div");
	$("#totalAssetsGrowthRate").val(CloudUtils.Math(totalAssetsGrowthRate,100,'mul'));
	//未分配利润试算表= 未分配利润+利润表中的每股收益 
	var unalStr =  $("#undistributedProfit").val()+","+ earningsPerShare;
	var unallocatedProfitSpreadsheet = CloudUtils.MathArray(unalStr,"add");
	$("#unallocatedProfitSpreadsheet").val(unallocatedProfitSpreadsheet);
	//未分配利润平衡差额= 未分配利润试算表-未分配利润 
	var balaStr = unallocatedProfitSpreadsheet +","+ $("#undistributedProfit").val();
	var balanceOfUndistributedProfit = CloudUtils.MathArray(balaStr,"sub");
	$("#balanceOfUndistributedProfit").val(balanceOfUndistributedProfit);
	//盈余资金增加额increaseInSurplusFunds=盈余公积surplusReserve期末 - surplusReserve期初
	var increaseInSurplusFundsStr = surplusReserve +","+ surplusReservePre;
	var increaseInSurplusFunds = CloudUtils.MathArray(increaseInSurplusFundsStr,"sub");
	$("#increaseInSurplusFunds").val(increaseInSurplusFunds);
	//净资产增长额increaseInNetAssets=所有者权益（或股东权益）合计totalOwnersEquity期末-totalOwnersEquity期初
	var increaseInNetAssetsStr = totalOwnersEquity +","+ totalOwnersEquityPre;
	var increaseInNetAssets = CloudUtils.MathArray(increaseInNetAssetsStr,"sub");
	$("#increaseInNetAssets").val(increaseInNetAssets);
	//净资产增长率= 净资产增长额/所有者权益（或股东权益）合计
	//netAssetsGrowthRate=increaseInNetAssets/totalOwnersEquity
	var netAssetsGrowthRateStr = increaseInNetAssets +","+ totalOwnersEquity;
	var netAssetsGrowthRate = isNaN(CloudUtils.MathArray(netAssetsGrowthRateStr,"div"))==true?0:CloudUtils.MathArray(netAssetsGrowthRateStr,"div");
	$("#netAssetsGrowthRate").val(CloudUtils.Math(netAssetsGrowthRate,100,'mul'));
}

function searchFun() {
	initTable();  
}

function initTable() { 
	$('#userListTable').bootstrapTable('destroy');
	$("#userListTable").bootstrapTable({  
         method: "post", 
         url: "../../negativeInfo/list", 
         striped: true,  //表格显示条纹  
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
           var param = {    
               pageNumber: params.pageNumber,    
               pageSize: params.pageSize,
               corpName: jsonData.s_corpName,
               corpId:jsonData.s_corpId ==""?null:jsonData.s_corpId
           };    
           return JSON.stringify(param);                   
         },  
         responseHandler:function responseHandler(res) {
        	 if (res.result==0) {
        		 var size = res.records;
        		 if(size>50000){//限制5w条不允许导出
        			 canExp = false;
        		 }else{
        			 canExp = true;
        		 }
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
 	        field: 'negId',
 	        title: 'Item ID',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    }, {
 	        field: 'corpName',
 	        title: '企业名称',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'operYear',
 	        title: '年份',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	        field: 'totalCurrentAssets',
 	        title: '流动资产合计',
 	        align: 'center',
 	        formatter:function(value,row,index){
 	 	    	return $.number(value,2);
 		        },
            valign: 'middle'
 	    },{
 	        field: 'totalNonCurrentAssets',
 	        title: '非流动资产合计',
 	        align: 'center',
 	        formatter:function(value,row,index){
	 	    	return $.number(value,2);
		        },
            valign: 'middle'
 	    },{
 	        field: 'totalAssets',
 	        title: '资产总计',
 	        align: 'center',
 	       formatter:function(value,row,index){
	 	    	return $.number(value,2);
		        },
            valign: 'middle'
 	    },{
 	        field: 'totalCurrentLiabilities',
 	        title: '流动负债合计',
 	        align: 'center',
 	       formatter:function(value,row,index){
	 	    	return $.number(value,2);
		        },
            valign: 'middle'
 	    },{
 	        field: 'totalNonCurrentLiabilities',
 	        title: '非流动负债合计',
 	        align: 'center',
 	       formatter:function(value,row,index){
	 	    	return $.number(value,2);
		        },
            valign: 'middle'
 	    },{
 	        field: 'totalLiabilities',
 	        title: '负债合计',
 	        align: 'center',
 	       formatter:function(value,row,index){
	 	    	return $.number(value,2);
		        },
            valign: 'middle'
 	    },{
 	        field: 'totalOwnersEquity',
 	        title: '所有者权益（或股东权益）合计',
 	        align: 'center',
 	       formatter:function(value,row,index){
	 	    	return $.number(value,2);
		        },
            valign: 'middle'
 	    },{
 	        field: 'totalLiabilitiesAndOwnersEquity',
 	        title: '负债和所有者权益（或股东权益）总计',
 	        align: 'center',
 	       formatter:function(value,row,index){
	 	    	return $.number(value,2);
		        },
            valign: 'middle'
 	    },{
 	        field: 'operation',
 	        title: '操作',
 	        align: 'center',
            valign: 'middle',
	        formatter:function(value,row,index){
	            var s = '<a class = "fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" title="编辑"  href="javascript:void(0)"></a>';
	            return s;
	        },
 	        events: 'operateEvents'
 	    }]
       });  
	
}
 

function addFun() {
	$("#corpId").attr("disabled",false);
	var initDate = new Date();
	$('#operYear').val(initDate.getFullYear());
	$("#addModalLabel").text("添加");
    $('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
    $('#isEdit').val(1); //添加1；修改2
}

function modFun(row,isEdit) {
	$("#corpId").attr("disabled",true);
	$("#addModalLabel").text("修改");
	$('#isEdit').val(isEdit); //添加1;修改2;详情0
    $('#addModal').modal();
    CloudUtils.setForm(row,'addForm');
    if(row.operYear!=null&&row.operYear!=''){
    	$("#operYear").val( dateFormat(row.operYear, 'yyyy'));
    }
}

function saveUser(number) {
	
	$('#addForm').data('bootstrapValidator').validate();
	if(!$('#addForm').data('bootstrapValidator').isValid()){  
		 	return;
    }else{
    	var modal = $('#addModal');
		var data = CloudUtils.convertStringJson('addForm');
		var isEdit =  $('#isEdit').val(); 
		var addUrl = '../../negativeInfo/add';
		var modUrl = '../../negativeInfo/mod';
		if(isEdit == 1){//添加1；修改2
			var options = {
					url : addUrl,
					data : data,
					callBackFun : function(data) {
						if(data.result==0){
							searchFun();
							bootbox.alert(data.resultNote);
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
		}else{
			var options = {
					url : modUrl,
					data : data,
					callBackFun : function(data) {
						if(data.result==0){
							searchFun();
							bootbox.alert(data.resultNote);
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
		modal.modal("hide");
    	window.parent.scrollTo(0,0);
    }
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
				corpName: jsonData.s_corpName
		};    
		var options = {
				url : '../../negativeInfoExcel/export',
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

function downloadTemp(){
	var options = {
			url : '../../user/configKey',
			data :'{"itemKey":"debtExcelTemp"}',
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

function ajaxFileUpload(){
	$("#importModal").modal("hide");
	if ($("#file").val().length > 0) {
		if(check()){
		$.ajaxFileUpload({  
	        url : '../../negativeInfoExcel/import?pathId=0&corpId='+$("#relaCorpId").val(),  
	        secureuri : false,  
	        fileElementId : 'file',  
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
	var aa=document.getElementById("file").value.toLowerCase().split('.');//以“.”分隔上传文件字符串
	if(aa[aa.length-1]!='xls'&&aa[aa.length-1]!='xlsx'){
		bootbox.alert('请选择格式为*.xls或*.xlsx的Excel文件');
		return false;
	}else{
		return true;
	}
}

function  ajaxRelaCorps(){
	var relaCorpId = store.get('corpId');
	var options = {
			url : '../../corp/list',
			data : '{"relaCorpId":"'+relaCorpId+'","isPage": 0}',
			callBackFun : function(data) {
				if(data.result==0){
					$("#s_corpName").html('');
					$("#corpId").html('');
					$("#relaCorpId").html('');
					$("#s_corpId").append("<option value=''>全部</option>");
					$.each(data.dataList, function (index, units) {  
						$("#s_corpId").append("<option value="+units.corpId+">" + units.corpName + "</option>");
						$("#s_corpName").append("<option value="+units.corpName+">" + units.corpName + "</option>");
						$("#corpId").append("<option value="+units.corpId+">" + units.corpName + "</option>");
						$("#relaCorpId").append("<option value="+units.corpId+">" + units.corpName + "</option>");
					}); 
					$('#s_corpId').selectOrDie({
						placeholder: '企业名称'
							
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

//form验证规则
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
	          corpId: {
	              validators: {
	                  notEmpty: {
	                      message: '企业不能为空'
	                  }
	              }
	          },
		      moneyFunds: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '货币资金在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      otherMoneyFunds: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '其它货币资金在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      transactionalFinancialAssets: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '交易性金融资产在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      billReceivable: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
	            	  callback: {  
	                       message: '应收票据在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      accountsReceivable: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '应收账款在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      prepayments: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '预付款项在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      interestReceivable: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '应收利息在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      dividendReceivable: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '应收股利在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      otherReceivables: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '其他应收款在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      stock: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '存货在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      nonCurrentAssetsDueWithinOneYear: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '一年内到期的非流动资产在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      otherCurrentAssets: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '其他流动资产在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      availableForSaleFinancialAssets: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '可供出售金融资产在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      heldToMaturityInvestments: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '持有至到期投资在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      longTermReceivables: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '长期应收款在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      longTermEquityInvestment: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '长期股权投资在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      investmentRealEstate: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '投资性房地产在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      fixedAssets: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '固定资产在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      constructionInProgress: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '在建工程在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      engineerMaterial: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '工程物资在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      cleanUpOfFixedAssets: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '固定资产清理在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      productiveBiologicalAssets: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '生产性生物资产在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      oilAndGasProperties: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '油气资产在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      intangibleAssets: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '无形资产在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      developmentExpenditure: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '开发支出在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      goodwill: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '商誉在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      longTermPrepaidExpenses: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '长期待摊费用在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      deferredTaxAssets: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '递延所得税资产在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      otherNonCurrentAssets: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '其他非流动资产在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      shortTermLoan: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '短期借款在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      transactionalFinancialLiabilities: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '交易性金融负债在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      notesPayable: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '应付票据在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      accountsPayable: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '应付账款在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      advancePayment: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '预收款项在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      employeeBenefitsPayable: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '应付职工薪酬在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      taxesPayable: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '应交税费在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      interestPayable: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '应付利息在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      dividendPayable: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '应付股利在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      otherPayables: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '其他应付款在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      nonCurrentLiabilitiesDueWithinOneYear: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '一年内到期的非流动负债在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      otherCurrentLiabilities: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '其他流动负债在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      longTermLoan: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '长期借款在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      bondsPayable: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '应付债券在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      longTermPayables: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '长期应付款在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      specialPayables: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '专项应付款在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      projectedLiabilities: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '预计负债在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      deferredIncomeTaxLiabilities: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '递延所得税负债在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      otherNonCurrentLiabilities: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '其他非流动负债在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      paidUpCapital: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '实收资本（或股本）在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      capitalReserve: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '资本公积在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      treasuryStocks: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '库存股在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      surplusReserve: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '盈余公积在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
		      undistributedProfit: {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
		              callback: {  
	                       message: '未分配利润在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
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

var dateFormat = function(time, format){
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : '') + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
        switch(a){
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    })
}

function numFormat(){
	$("#moneyFunds").number(true, 2);
	$("#otherMoneyFunds").number(true, 2);
	$("#transactionalFinancialAssets").number(true, 2);
	$("#billReceivable").number(true, 2);
	$("#accountsReceivable").number(true, 2);
	$("#prepayments").number(true, 2);
	$("#interestReceivable").number(true, 2);
	$("#dividendReceivable").number(true, 2);
	$("#otherReceivables").number(true, 2);
	$("#stock").number(true, 2);
	$("#nonCurrentAssetsDueWithinOneYear").number(true, 2);
	$("#otherCurrentAssets").number(true, 2);
	$("#totalCurrentAssets").number(true, 2);
	$("#availableForSaleFinancialAssets").number(true, 2);
	$("#heldToMaturityInvestments").number(true, 2);
	$("#longTermReceivables").number(true, 2);
	$("#longTermEquityInvestment").number(true, 2);
	$("#investmentRealEstate").number(true, 2);
	$("#fixedAssets").number(true, 2);
	$("#constructionInProgress").number(true, 2);
	$("#engineerMaterial").number(true, 2);
	$("#cleanUpOfFixedAssets").number(true, 2);
	$("#productiveBiologicalAssets").number(true, 2);
	$("#oilAndGasProperties").number(true, 2);
	$("#intangibleAssets").number(true, 2);
	$("#developmentExpenditure").number(true, 2);
	$("#goodwill").number(true, 2);
	$("#longTermPrepaidExpenses").number(true, 2);
	$("#deferredTaxAssets").number(true, 2);
	$("#otherNonCurrentAssets").number(true, 2);
	$("#totalNonCurrentAssets").number(true, 2);
	$("#totalAssets").number(true, 2);
	$("#shortTermLoan").number(true, 2);
	$("#transactionalFinancialLiabilities").number(true, 2);
	$("#notesPayable").number(true, 2);
	$("#accountsPayable").number(true, 2);
	$("#advancePayment").number(true, 2);
	$("#employeeBenefitsPayable").number(true, 2);
	$("#taxesPayable").number(true, 2);
	$("#interestPayable").number(true, 2);
	$("#dividendPayable").number(true, 2);
	$("#otherPayables").number(true, 2);
	$("#nonCurrentLiabilitiesDueWithinOneYear").number(true, 2);
	$("#otherCurrentLiabilities").number(true, 2);
	$("#totalCurrentLiabilities").number(true, 2);
	$("#longTermLoan").number(true, 2);
	$("#bondsPayable").number(true, 2);
	$("#longTermPayables").number(true, 2);
	$("#specialPayables").number(true, 2);
	$("#projectedLiabilities").number(true, 2);
	$("#deferredIncomeTaxLiabilities").number(true, 2);
	$("#otherNonCurrentLiabilities").number(true, 2);
	$("#totalNonCurrentLiabilities").number(true, 2);
	$("#totalLiabilities").number(true, 2);
	$("#paidUpCapital").number(true, 2);
	$("#capitalReserve").number(true, 2);
	$("#treasuryStocks").number(true, 2);
	$("#surplusReserve").number(true, 2);
	$("#undistributedProfit").number(true, 2);
	$("#totalOwnersEquity").number(true, 2);
	$("#totalLiabilitiesAndOwnersEquity").number(true, 2);
	$("#averageCurrentAssets").number(true, 2);
	$("#averageCurrentLiabilities").number(true, 2);
	$("#averageTotalAssets").number(true, 2);
	$("#averageTotalLiabilities").number(true, 2);
	$("#averageNetAssets").number(true, 2);
	$("#averageNetFixedAssets").number(true, 2);
	$("#averageAccountsReceivable").number(true, 2);
	$("#averageAccountsPayable").number(true, 2);
	$("#averageInventory").number(true, 2);
	$("#averagePrepayment").number(true, 2);
	$("#averageOtherReceivables").number(true, 2);
	$("#totalAssetsGrowth").number(true, 2);
	$("#totalAssetsGrowthRate").number(true, 2);
	$("#averageMoneyFunds").number(true, 2);
	$("#unallocatedProfitSpreadsheet").number(true, 2);
	$("#balanceOfUndistributedProfit").number(true, 2);
	$("#increaseInSurplusFunds").number(true, 2);
	$("#increaseInNetAssets").number(true, 2);
	$("#netAssetsGrowthRate").number(true, 2);
}
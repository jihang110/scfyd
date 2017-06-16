var canExp = true;
$(document).ready(function() {
	initTable();
	downloadTemp();
	formValidator();
	loadDate();
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
	loadcount();
	ajaxRelaCorps("txt_corpId","corpId","relaCorpId");
	numFormat();
/*	$('#addModal').on('hide.bs.modal', function () {
		$("#addForm").data('bootstrapValidator').resetForm();
	})*/

} );

window.operateEvents = {
		'click .detail': function (e, value, row, index) {
			detailFun(row,0);
		},
		'click .modify': function (e, value, row, index) {
				modFun(row,2);
		    },
	    'click .remove': function (e, value, row, index) {
	    	bootbox.confirm("确定删除此条记录?", function(result) {  
	            if (result) {  
	            	var options = {
	    					url : '../../profit/delete',
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

function initTable() { 
	$('#profitList').bootstrapTable('destroy');  
	$("#profitList").bootstrapTable({  
         method: "post", 
         url: "../../profit/list", 
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
 	        field: 'recUid',
 	        title: 'Item ID',
 	        align: 'center',
             valign: 'middle',
             visible: false
 	    }, {
 	        field: 'corpId',
 	        title: '企业Id',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    }, {
 	        field: 'operYear',
 	        title: '时间(年)',
 	        align: 'center',
            valign: 'middle',
 	    },{
 	        field: 'corpName',
 	        title: '企业名称',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'grossProfitRate',
 	        title: '毛利率(%)',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
	 	    	return $.number(value,2);
		        }
 	    }, {
 	        field: 'expenseRate',
 	        title: '费用率(%)',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
	 	    	return $.number(value,2);
		        }
 	    }, {
 	        field: 'totalProfit',
 	        title: '利润总额',
 	        align: 'center',
 	        formatter:function(value,row,index){
	 	    	return $.number(value,2);
		        },
             valign: 'middle'
 	    }, {
 	        field: 'netProfit',
 	        title: '净利润',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
	 	    	return $.number(value,2);
		        }
 	    }, {
 	        field: 'netProfitGrowthRate',
 	        title: '净利润增长率(%)',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
 	 	    	return $.number(value,2);
 		        }
 	    }, {
 	        field: 'mainCostRate',
 	        title: '主营业务成本率(%)',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
	 	    	return $.number(value,2);
		        }
 	    }, {
 	        field: 'operation',
 	        title: '操作',
 	       formatter:function(value,row,index){
 	    	  var d = '<a class = "fa fa-list-ul detail" style="color:#a9d86e;padding:0px 5px;" title="详情" href="javascript:void(0)"></a>';
 	    	  var s = '<a class = "fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
	 	      var r = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
	          return d+' '+s+' '+r;
	        },
 	       align: 'center',
           valign: 'middle',
 	       events: 'operateEvents'
 	    }]
       });  
}

function searchFun() {
	initTable();  
}

function addFun() {
	$("#corpId").attr("disabled",false);
	var initDate = new Date();
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

function fileSelect() {
    document.getElementById("file").click(); 
}


function ajaxFileUpload(){
	if ($("#file").val().length > 0) {
		if(check()){
		$.ajaxFileUpload({  
	        url : '../../profitExcel/import?pathId=0&corpId='+$("#relaCorpId").val(),  
	        secureuri : false,  
	        fileElementId : 'file',  
	        dataType : 'json',  
	        success : function(data, status) {  
	            if (data.result == 0) { 
	            	$('#importModal').modal("hide");
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
	if(aa[aa.length-1]!='xlsx'){
		bootbox.alert('请选择格式为*.xlsx的Excel文件');
		return false;
	}else{
		return true;
	}
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
				url : '../../profitExcel/export',
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
			data :'{"itemKey":"profitExcelTemp"}',
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

function detailFun(row,isEdit) {
	modFun(row,isEdit);
    document.getElementById("field").disabled=true;
    document.getElementById("btn_save").style.display="none";
    $("#btn_blank").removeClass('col-sm-4').addClass('col-sm-7');
}

var oldYear;
function modFun(row,isEdit) {
	$("#corpId").attr("disabled",true);
	$("#btn_blank").removeClass('col-sm-7').addClass('col-sm-4');
	if(isEdit==0){
		$("#addModalLabel").text("详情");
	}
	if(isEdit==2){
		oldYear = null;
		$("#addModalLabel").text("修改");
		oldYear = row.operYear;
	}
	$('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
	$('#isEdit').val(isEdit); //新增1;修改2;详情0
    $('#addModal').modal();
    var options = {
			url : '../../profit/details',
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
//	var modal = $('#addModal');
$('#addForm').data('bootstrapValidator').validate();
	
	if(!$('#addForm').data('bootstrapValidator').isValid()){  
		 	return;
    }else{
    var modal = $('#addModal');
    modal.modal("hide");
	var data = CloudUtils.convertStringJson('addForm');
	var isEdit =  $('#isEdit').val(); 
	if(isEdit == 1){//新增1；修改2
		var options = {
				url : '../../profit/add',
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
					bootbox.alert(data.resultNote);
					return false;
				}
		};
		CloudUtils.ajax(options);
	}else{
		  var jsonData = eval("(" + data + ")");
			if(oldYear == jsonData.operYear){
				jsonData.operYear = null;
			}
		var options = {
				url : '../../profit/mod',
				data : JSON.stringify(jsonData),
				callBackFun : function(data) {
					bootbox.alert(data.resultNote);
					if(data.result==0){
						searchFun();
    				}else{
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
}

function  ajaxRelaCorps(Id1,Id2,Id3){
	var relaCorpId = store.get('corpId');
	var options = {
			url : '../../corp/list',
			data : '{"relaCorpId": "'+relaCorpId+'","isPage":0}',
			callBackFun : function(data) {
				var control1 = $('#' + Id1);
				var control2 = $('#' + Id2);
				var control3 = $('#' + Id3);
				if(data.result==0){
					control1.html('');
					control2.html('');
					control1.append("<option value=''>全部</option>"); 
					$.each(data.dataList, function (index, units) {  
		            	control1.append("<option value="+units.corpId+">" + units.corpName + "</option>"); 
		            	control2.append("<option value="+units.corpId+">" + units.corpName + "</option>"); 
		            	control3.append("<option value="+units.corpId+">" + units.corpName + "</option>"); 
		            });
				}else{
					bootbox.alert(data.resultNote);
					return false;
				}
	            $('#txt_corpId').selectOrDie({
			        placeholder: '企业名称'
			    });
			},
			errorCallback:function(data){
				 bootbox.alert("error");  
			}
	};
	CloudUtils.ajax(options);
}

function loadcount(){
	$('input').bind('keyup', function() {
		var operatingGain = $("#operatingGain").val();
		var operatingCost = $("#operatingCost").val();
		var salesExpense = $("#salesExpense").val();
		var managementExpense = $("#managementExpense").val();
		var financialExpense = $("#financialExpense").val();
		var changesInFairValueGain = $("#changesInFairValueGain").val();
		var impairmentLosses = $("#impairmentLosses").val();
		var investmentGain = $("#investmentGain").val();
		var taxAndSurcharges = $("#taxAndSurcharges").val();
		var nonOperatingGain = $("#nonOperatingGain").val();
		var nonOperatingExpense = $("#nonOperatingExpense").val();
		var incomeTaxExpense = $("#incomeTaxExpense").val();
	//毛利率=(营业收入-营业成本)/营业收入
		var grossProfitRate = CloudUtils.Math(CloudUtils.Math(operatingGain,operatingCost,'sub'),operatingGain,'div');
		//grossProfitRate = isNaN(grossProfitRate)==true?0:grossProfitRate;
		grossProfitRate = transform(grossProfitRate);
		 $("#grossProfitRate").val(CloudUtils.formatNumber(CloudUtils.Math(grossProfitRate,100,'mul')));
	//费用率=(销售费用+管理费用+财务费用)/营业收入
		var expenseRate = CloudUtils.Math(CloudUtils.Math(CloudUtils.Math(salesExpense,financialExpense,'add'),managementExpense,'add'),operatingGain,'div');
		expenseRate = transform(expenseRate);
		$("#expenseRate").val(CloudUtils.Math(expenseRate,100,'mul'));
	//营业利润 = 营业收入-营业成本-营业税金及附加-销售费用-管理费用-财务费用+公允价值变动收益-资产减值损失+投资收益
		//var operatingProfit = operatingGain - operatingCost - taxAndSurcharges - salesExpense - managementExpense - financialExpense 
		//+ changesInFairValueGain - impairmentLosses + investmentGain; 
		var operatingProfitstr = operatingGain + ","+operatingCost+","+taxAndSurcharges+","+salesExpense+","+managementExpense+","+financialExpense+","+
		changesInFairValueGain+","+impairmentLosses+","+investmentGain;
		//var operatingProfit = CloudUtils.MathArray(operatingProfitstr,"sub,sub,sub,sub,sub,add,sub,add");
		var operatingProfit = operatingGain*1 - operatingCost*1 - taxAndSurcharges*1 - salesExpense*1 - managementExpense*1 - financialExpense*1 + changesInFairValueGain*1 - impairmentLosses*1 + investmentGain*1;
		operatingProfit = transform(operatingProfit);
		$("#operatingProfit").val(CloudUtils.formatNumber(operatingProfit));
	//利润总额 = 营业利润+营业外收入-营业外支出
		var totalProfit = CloudUtils.Math(CloudUtils.Math(operatingProfit,nonOperatingGain,'add'),nonOperatingExpense,'sub');
		totalProfit = transform(totalProfit);
		$("#totalProfit").val(totalProfit);
	//净利润 = 利润总额-所得税费用
		var netProfit = CloudUtils.Math(totalProfit,incomeTaxExpense,'sub');
		netProfit = transform(netProfit);
		$("#netProfit").val(netProfit);
	//净利润率 = 净利润/营业收入
		var netProfitRate = CloudUtils.Math(netProfit,operatingGain,'div');
		netProfitRate = transform(netProfitRate);
		$("#netProfitRate").val(CloudUtils.Math(netProfitRate,100,'mul'));
	//成本费用总额 = 营业成本+ 营业税金及附加+ 销售费用+管理费用+ 财务费用+资产减值损失 
		//var totalCost = operatingCost+taxAndSurcharges+salesExpense+managementExpense+financialExpense+impairmentLosses;
		var totalCoststr = operatingCost +","+taxAndSurcharges+","+salesExpense+","+managementExpense+","+financialExpense+","+impairmentLosses;
		var totalCost = CloudUtils.MathArray(totalCoststr,"add,add,add,add,add");
		totalCost = transform(totalCost);
		$("#totalCost").val(totalCost);
	//成本费用率 = 成本费用总额/营业收入
		var costExpenseRate = CloudUtils.Math(totalCost,operatingGain,'div');
		costExpenseRate = transform(costExpenseRate);
		$("#costExpenseRate").val(CloudUtils.Math(costExpenseRate,100,'mul'));
	//计税基数（即应付增值税）=  营业税金及附加/0.04 taxAndSurcharges
		var taxBase = CloudUtils.Math(taxAndSurcharges,"0.04",'div');
		taxBase = transform(taxBase);
		$("#taxBase").val(taxBase);
	//付税率 = 计税基数（即应付增值税）/营业收入
		var taxRate = CloudUtils.Math(taxBase,operatingGain,'div');
		taxRate = transform(taxRate);
		$("#taxRate").val(CloudUtils.Math(taxRate,100,'mul'));
	//主营业务成本率 = 	营业成本/营业收入
		var mainCostRate = CloudUtils.Math(operatingCost,operatingGain,'div');
		mainCostRate = transform(mainCostRate);
		$("#mainCostRate").val(CloudUtils.Math(mainCostRate,100,'mul'));
	//期间费用率 = 成本费用率-主营业务成本率
		var periodExpenseRate = CloudUtils.Math(costExpenseRate,mainCostRate,'sub');
		periodExpenseRate = transform(periodExpenseRate);
		$("#periodExpenseRate").val(CloudUtils.Math(periodExpenseRate,100,'mul'));
	});
}

//当取的的值为NaN或infinity时转换为0
function transform(value){
	var newvalue = 0;
	if(!isFinite(value)){
		newvalue = 0
	}else{
		newvalue = isNaN(value)==true?0:value;
	}
	return newvalue;
}

function loadDate(){
	$('#operYear').datetimepicker({
		language: 'zh-CN',
		autoclose: true,
		todayHighlight: true,
		format: 'yyyy',
		startView: 4,
        minView: 4,
		todayBtn: true,
		initialDate : new Date(),
		pickerPosition: "bottom-left"
	});
	$('#operYear').datetimepicker('setEndDate', new Date());
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
	    	  operYear: {
	              validators: {
	                  stringLength: {
	                      min: 4,
	                      max: 4,
	                      message: '时间(年)长度为4'
	                  },
	                  numeric: {message: '只能输入数字'},
	                  notEmpty: {
	                      message: '年份不能为空'
	                  }
	              }
	          },
	          operatingGain : {
	              validators: {
	            	 numeric: {message: '只能输入数字'},
	                  notEmpty: {
	                      message: '营业收入不能为空'
	                  },
	                  callback: {  
	                         message: '营业收入在-1000000000~1000000000之间',  
	                         callback: function(value, validator) { 
	                        	 return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	          
	              }
	          }, 
	          operatingCost : {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
	                  notEmpty: {
	                      message: '营业成本不能为空'
	                  },
	                  callback: {  
	                         message: '营业成本在-1000000000~1000000000之间',  
	                         callback: function(value, validator) { 
	                        	 return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
	          taxAndSurcharges : {
                validators: {
                	numeric: {message: '只能输入数字'},
	                  notEmpty: {
	                      message: '营业税金及附加不能为空'
	                  },
	                  callback: {  
	                         message: '营业税金及附加在-1000000000~1000000000之间',  
	                         callback: function(value, validator) { 
	                        	 return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
                }
            },
            salesExpense : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '销售费用不能为空'
		                  },
			                callback: {  
		                        message: '销售费用在-1000000000~1000000000之间',  
		                        callback: function(value, validator) { 
		                       	 return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
		                        }  
		                    } 
	                }
	         },
	         managementExpense : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '管理费用不能为空'
		                  },
			                callback: {  
		                        message: '管理费用在-1000000000~1000000000之间',  
		                        callback: function(value, validator) { 
		                       	 return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
		                        }  
		                    }
	                } 
	         },
	         financialExpense : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '财务费用不能为空'
		                  },
			                callback: {  
		                        message: '财务费用在-1000000000~1000000000之间',  
		                        callback: function(value, validator) { 
		                       	 return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
		                        }  
		                    } 
	                }
	         },
	         impairmentLosses : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '资产减值损失不能为空'
		                  },
			                callback: {  
		                        message: '资产减值损失在-1000000000~1000000000之间',  
		                        callback: function(value, validator) { 
		                       	 return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
		                        }  
		                    } 
	                }
	         },
	         changesInFairValueGain : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '公允价值变动收益不能为空'
		                  },
			                callback: {  
		                        message: '公允价值变动收益在-1000000000~1000000000之间',  
		                        callback: function(value, validator) { 
		                       	 return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
		                        }  
		                    } 
	                }
	         },
	         investmentGain : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '投资收益不能为空'
		                  },
		                  callback: {  
		                         message: '投资收益在-1000000000~1000000000之间',  
		                         callback: function(value, validator) { 
		                        	 return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
		                         }  
		                     } 
	                }
	         },
	         associatesAndJointVenturesGain : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '对联营企业和合营企业的投资收益不能为空'
		                  },
		                  callback: {  
		                         message: '对联营企业和合营企业的投资收益在-1000000000~1000000000之间',  
		                         callback: function(value, validator) { 
		                        	 return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
		                         }  
		                     } 
	                }
	         },
	         nonOperatingGain : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '营业外收入不能为空'
		                  },
		                  callback: {  
		                         message: '营业外收入在-1000000000~1000000000之间',  
		                         callback: function(value, validator) { 
		                        	 return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
		                         }  
		                     } 
	                }
	         },
	         nonOperatingExpense : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '营业外支出不能为空'
		                  },
		                  callback: {  
		                         message: '营业外支出在-1000000000~1000000000之间',  
		                         callback: function(value, validator) { 
		                        	 return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
		                         }  
		                     } 
	                }
	         },
	         nonCurrentAssetsLoss : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '非流动资产处置净损失不能为空'
		                  },
			                 callback: {  
		                         message: '非流动资产处置净损失在-1000000000~1000000000之间',  
		                         callback: function(value, validator) { 
		                        	 return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
		                         }  
		                     } 
	                }
	         },
	         incomeTaxExpense : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '所得税费用不能为空'
		                  },
			              callback: {  
		                       message: '所得税费用在-1000000000~1000000000之间',  
		                       callback: function(value, validator) { 
		                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
		                         }  
		                     } 
	                }
	         },
	         earningsPerShare : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '每股收益不能为空'
		                  },
			              callback: {  
		                       message: '每股收益在-1000000000~1000000000之间',  
		                       callback: function(value, validator) { 
		                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
		                         }  
		                     } 
	                }
	         },
	         basicEarningsPerShare : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '基本每股收益不能为空'
		                  },
			              callback: {  
		                       message: '基本每股收益在-1000000000~1000000000之间',  
		                       callback: function(value, validator) { 
		                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
		                         }  
		                     } 
	                }
	         },
	         dilutedEarningsPerShare : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '稀释每股收益不能为空'
		                  },
			              callback: {  
		                       message: '稀释每股收益在-1000000000~1000000000之间',  
		                       callback: function(value, validator) { 
		                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
		                         }  
		                     } 
	                }
	         },
	         mainRevenueGrowthAmount : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '主营业务收入增长额不能为空'
		                  },
			              callback: {  
		                       message: '主营业务收入增长额在-1000000000~1000000000之间',  
		                       callback: function(value, validator) { 
		                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
		                         }  
		                     } 
	                }
	         },
	         growthRate : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '增长率不能为空'
		                  },
			              callback: {  
		                       message: '增长率在-10000-10000之间',  
		                       callback: function(value, validator) { 
		                    	   return value =="" ||( parseFloat(value)>=-10000&&parseFloat(value)<=10000);
		                         }  
		                     } 
	                }
	         },
	         operatingProfitGrowthAmount : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '营业利润增长额不能为空'
		                  },
			              callback: {  
		                       message: '营业利润增长额在-1000000000~1000000000之间',  
		                       callback: function(value, validator) { 
		                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
		                         }  
		                     } 
	                }
	         },
	         operatingProfitGrowthRate : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '营业利润增长率不能为空'
		                  },
			              callback: {  
		                       message: '营业利润增长率在-10000~10000之间',  
		                       callback: function(value, validator) { 
		                        	return value =="" || (parseFloat(value)>=-10000&&parseFloat(value)<=10000);
		                         }  
		                     } 
	                }
	         },
	         netProfitGrowthAmount : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '净利润增长额不能为空'
		                  },
			              callback: {  
		                       message: '净利润增长额在-1000000000~1000000000之间',  
		                       callback: function(value, validator) { 
		                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
		                         }  
		                     } 
	                }
	         },
	         netProfitGrowthRate : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
		                  notEmpty: {
		                      message: '净利润增长率不能为空'
		                  },
			              callback: {  
		                       message: '净利润增长率在-10000~10000之间',  
		                       callback: function(value, validator) { 
		                    	   return value =="" || (parseFloat(value)>=-10000&&parseFloat(value)<=10000);
		                         }  
		                     } 
	                }
	         },
	         financialPhone : {
	                validators: {
		                  notEmpty: {
		                      message: '手机号码不能为空'
		                  },
	                	 regexp: {
	                         regexp: /^1[3|5|8|4|7]{1}[0-9]{9}$/,
	                         message: '请输入正确的11位手机号码'
	                     }
	                }
	         }
	          
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
			
		});	
	
}


function numFormat(){
	$("#operatingGain").number(true, 2);
	$("#operatingCost").number(true, 2);
	$("#taxAndSurcharges").number(true, 2);
	$("#salesExpense").number(true, 2);
	$("#managementExpense").number(true, 2);
	$("#financialExpense").number(true, 2);
	$("#impairmentLosses").number(true, 2);
	$("#changesInFairValueGain").number(true, 2);
	$("#investmentGain").number(true, 2);
	$("#associatesAndJointVenturesGain").number(true, 2);
	$("#nonOperatingGain").number(true, 2);
	$("#nonOperatingExpense").number(true, 2);
	$("#nonCurrentAssetsLoss").number(true, 2);
	$("#incomeTaxExpense").number(true, 2);
	$("#earningsPerShare").number(true, 2);
	$("#basicEarningsPerShare").number(true, 2);
	$("#dilutedEarningsPerShare").number(true, 2);
	$("#mainRevenueGrowthAmount").number(true, 2);	
	$("#growthRate").number(true, 2);
	$("#operatingProfitGrowthAmount").number(true, 2);
	$("#operatingProfitGrowthRate").number(true, 2);
	$("#netProfitGrowthAmount").number(true, 2);
	$("#netProfitGrowthRate").number(true, 2);
	$("#operatingProfit").number(true, 2);
	$("#grossProfitRate").number(true, 2);
	$("#expenseRate").number(true, 2);
	$("#totalProfit").number(true, 2);
	$("#netProfit").number(true, 2);
	$("#netProfitRate").number(true, 2);
	$("#totalCost").number(true, 2);
	$("#costExpenseRate").number(true, 2);
	$("#taxBase").number(true, 2);
	$("#taxRate").number(true, 2);
	$("#mainCostRate").number(true, 2);
	$("#periodExpenseRate").number(true, 2);
}
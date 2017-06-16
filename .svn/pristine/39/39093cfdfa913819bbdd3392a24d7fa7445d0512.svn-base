$(document).ready(function() {
	initTable(); 
	initRiskTable();
	formValidator();
	riskformValidator();
	loadDate();
	//modal绑定事件
	$('#addModal').on('hidden.bs.modal', function(){
		$("#addForm")[0].reset();
		$("#addForm").data('bootstrapValidator').destroy();
		$("#addForm").data('bootstrapValidator', null);
		formValidator();
	});
	$('#riskModal').on('hidden.bs.modal', function(){
		$("#riskForm")[0].reset();
		$("#riskForm").data('bootstrapValidator').destroy();
		$("#riskForm").data('bootstrapValidator', null);
		riskformValidator();
	});
	//去掉modal上的验证缓存
	$('#addModal').on('hide.bs.modal', function () {
		$("#addForm").data('bootstrapValidator').resetForm();
	});
	$('#riskModal').on('hide.bs.modal', function () {
		$("#riskForm").data('bootstrapValidator').resetForm(); 
	});

	ajaxRelaCorps("txt_corpId","corpId","r_corpId");
/*	$('#addModal').on('hide.bs.modal', function () {
		$("#addForm").data('bootstrapValidator').resetForm();
	})*/
	numFormat();
} );

window.operateEvents = {
		'click .modify': function (e, value, row, index) {
				modFun(row);
		    },
	    'click .remove': function (e, value, row, index) {
	    	bootbox.confirm("确定删除此条记录?", function(result) {  
	            if (result) {  
	            	var options = {
	    					url : '../../supplierTrade/delete',
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
	    },'click .riskmodify': function (e, value, row, index) {
	    	riskModFun(row);
	    },
	    'click .riskremove': function (e, value, row, index) {
	    	bootbox.confirm("确定删除此条记录?", function(result) {  
	    		if (result) {  
            	var options = {
    					url : '../../supplierTrade/riskAnalyDelete',
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
    						alert("error");
    					}
    			};
    			CloudUtils.ajax(options);
            } 
    	 });
    }
		    
		    
	};

function initTable() { 
	$('#supplierTradeList').bootstrapTable('destroy');  
	$("#supplierTradeList").bootstrapTable({  
         method: "post", 
         url: "../../supplierTrade/list", 
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
 	        field: 'recUid',
 	        title: 'Item ID',
 	        align: 'center',
             valign: 'middle',
             visible: false
 	    },{
 	        field: 'corpName',
 	        title: '企业名称',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'supplierName',
 	        title: '供应商名称',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'products',
 	        title: '采购产品',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'corpId',
 	        title: '企业Id',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    }, {
 	        field: 'operTime',
 	        title: '年月',
 	        align: 'center',
            valign: 'middle',
            formatter: function(value,row,index){
            	var year = value.substring(0,4);
            	var day = value.substring(4,6);
            	row.operTime = year+"-"+day;
 	        	return year+"-"+day;
            }
 	    }, {
 	        field: 'currentBuy',
 	        title: '当月采购(元)',
 	        align: 'center',
 	       formatter:function(value,row,index){
	 	    	return $.number(value,2);
		        },
             valign: 'middle'
 	    }, {
 	        field: 'currentPay',
 	        title: '当月付款(元)',
 	        align: 'center',
 	       formatter:function(value,row,index){
	 	    	return $.number(value,2);
		        },
             valign: 'middle'
 	    }, {
 	        field: 'balance',
 	        title: '余额(元)',
 	        align: 'center',
 	       formatter:function(value,row,index){
	 	    	return $.number(value,2);
		        },
            valign: 'middle'
 	    }, {
 	        field: 'accountAndSettlement',
 	        title: '账期和结算方式',
 	        align: 'center',
             valign: 'middle',
             visible: false
 	    }, {
 	        field: 'firstHalfTransaction',
 	        title: '上半年交易额(元)',
 	        align: 'center',
 	       formatter:function(value,row,index){
	 	    	return $.number(value,2);
		        },
             valign: 'middle'
 	    }, {
 	        field: 'totalAnnualPurchases',
 	        title: '占全年总采购额(%)',
 	        align: 'center',
             valign: 'middle',
             visible: false
 	    }, {
 	        field: 'financialPhone',
 	        title: '供应商财务电话',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'operation',
 	        title: '操作',
 	       align: 'center',
           valign: 'middle',
 	        formatter:function(value,row,index){
 	 	    	var m = '<a class = "fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
 		 	    var d = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
 	            return m+' '+d;
 	        },
 	        events: 'operateEvents'
 	    }]
       });  
}

function searchFun() {
	initTable();
	initRiskTable();
}

function addFun() {
	$("#corpId").attr("disabled",false);
	 var initDate = new Date();
	 $('#operTime').val(dateFormat(initDate, 'yyyy-MM'));
	$("#addModalLabel").text("添加");
    $('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
    $('#isEdit').val(1); //新增1；修改2
}

function modFun(row) {
	$("#corpId").attr("disabled",true);
	$("#addModalLabel").text("修改");
    $('#addModal').modal();
    $('#isEdit').val(2); //新增1；修改2
    CloudUtils.setForm(row,'addForm');
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
	var jsonData = eval("(" + data + ")");
	var time = jsonData.operTime.split("-");
	jsonData.operTime = time[0]+time[1];
	var isEdit =  $('#isEdit').val(); 
	if(isEdit == 1){//新增1；修改2
		var options = {
				url : '../../supplierTrade/add',
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
	}else{
		var options = {
				url : '../../supplierTrade/mod',
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
				control1.append("<option value="+''+">" +"全部"+ "</option>");
				if(data.result==0){
					 $.each(data.dataList, function (index, units) {  
			            	control1.append("<option value="+units.corpId+">" + units.corpName + "</option>");
			            	control2.append("<option value="+units.corpId+">" + units.corpName + "</option>");
			            	control3.append("<option value="+units.corpId+">" + units.corpName + "</option>");
			            });
				}else{
					bootbox.alert(data.resultNote);
					return false;
				}
	            control1.selectOrDie({
			        placeholder: '企业名称'
			        
			    });
			},
			errorCallback:function(data){
				 bootbox.alert("error");  
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
	    	  supplierName: {
	              validators: {
	            	  notEmpty: {message: '供应商名称不能为空'},
	                  stringLength: {
	                      min: 3,
	                      max: 32,
	                      message: '供应商名称长度为3-32'
	                  }
	              }
	          },
	          products: {
	              validators: {
	            	  stringLength: {
	                      max: 32,
	                      message: '采购产品长度不大于32'
	                  }
	              }
	          },
	    	  operTime: {
	              validators: {
	            	  notEmpty: {message: '年月不能为空'} 
	              }
	          },
	          currentBuy : {
	              validators: {
	            	 numeric: {message: '只能输入数字'},
	            	 callback: {  
                         message: '当月采购在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
                     } 
	              }
	          }, 
	          currentPay : {
	              validators: {
	            	  numeric: {message: '只能输入数字'},
	            	  callback: {  
	                         message: '当月付款在-1000000000~1000000000之间',  
		                       callback: function(value, validator) { 
		                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
		                         }  
	                     } 
	              }
	          },
	          balance : {
                validators: {
                	numeric: {message: '只能输入数字'},
                	callback: {  
                        message: '余额在-1000000000~1000000000之间',  
	                       callback: function(value, validator) { 
	                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
	                         }  
                    } 
                }
            },
            accountAndSettlement : {
	                validators: {
	                	stringLength: {
		                      max: 32,
		                      message: '账期和结算方式长度不能大于32'
		                  }
	                }
	         },
            firstHalfTransaction : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                         message: '上半年交易额在-1000000000~1000000000之间',  
		                       callback: function(value, validator) { 
		                        	return value =="" || (parseFloat(value)>=-1000000000&&parseFloat(value)<=1000000000);
		                         }  
	                     } 
	                }
	         },
	         totalAnnualPurchases : {
	                validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                         message: '占全年总采购额要在0~100之间',  
	                         callback: function(value, validator) { 
	                        	 return value =="" ||(parseFloat(value)>=0&&parseFloat(value)<=100);
	                         }  
	                     }  
	                }
	         },
	         financialPhone : {
	                validators: {
	                	notEmpty: {message: '财务电话不能为空'},
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

function loadDate(){
	 var initDate = new Date();
	 $('#operTime').val(dateFormat(initDate, 'yyyy-MM'));
	$('#operTime').datetimepicker({
		language: 'zh-CN',
		autoclose: true,
		todayHighlight: true,
		format: 'yyyy-mm',
		startView: 4,
        minView: "year",
		todayBtn: true,
		initialDate : new Date(),
		pickerPosition: "bottom-left"
	});
	 $('#operTime').datetimepicker('setEndDate', new Date());	
}


/*
 * 采购风险分析*********************************************************************************************************
 * 
 */
function initRiskTable() { 
	$('#riskAnalyList').bootstrapTable('destroy');  
	$("#riskAnalyList").bootstrapTable({  
         method: "post", 
         url: "../../supplierTrade/riskAnalyList", 
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
           var param = {    
               pageNumber: params.pageNumber,    
               pageSize: params.pageSize,
               corpId: jsonData.txt_corpId,
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
 	    },{
 	        field: 'corpName',
 	        title: '企业名称',
 	        align: 'center',
            valign: 'middle',
            width:180
 	    }, {
 	        field: 'purchaseRiskPoint',
 	        title: '采购风险点分析',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'generateAnalysis',
 	        title: '生成分析',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'multipleAnalysis',
 	        title: '生产设备、产能、EHS等分析',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'operation',
 	        title: '操作',
 	        formatter:function(value,row,index){
 	        	var m = '<a class = "fa fa-edit riskmodify" style="color:#d864fd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
 		 	    var d = '<a class = "fa fa-trash-o riskremove" style="color:#fa8564;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
 	            return m+' '+d;
 	        },
 	        events: 'operateEvents',
 	        align: 'center',
 	        valign: 'middle',
            width:100
 	    }]
       });  
}

function riskModFun(row){
	$("#r_corpId").attr("disabled",true);
	$("#riskModalLabel").text("修改");
    $('#riskModal').modal();
    $('#riskEdit').val(2); //新增1；修改2
    row.r_corpId = row.corpId;
    CloudUtils.setForm(row,'riskForm');
}

function riskAnalyAdd(){
	$("#r_corpId").attr("disabled",false);
	$("#riskModalLabel").text("添加");
    $('#riskModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
    $('#riskEdit').val(1); //新增1；修改2
}

function saveRiskAnaly(){
//	var modal = $('#addModal');
$('#riskForm').data('bootstrapValidator').validate();
	
	if(!$('#riskForm').data('bootstrapValidator').isValid()){  
		 	return;
    }else{
    	$("#riskModal").modal("hide");
    	var data = CloudUtils.convertStringJson('riskForm');
    	var jsonData = eval("(" + data + ")");
     var param = {    
         corpId: jsonData.r_corpId,
         purchaseRiskPoint:jsonData.purchaseRiskPoint,
         generateAnalysis:jsonData.generateAnalysis,
         multipleAnalysis:jsonData.multipleAnalysis
     };    
	var isEdit =  $('#riskEdit').val(); 
	if(isEdit == 1){//新增1；修改2
		var options = {
				url : '../../supplierTrade/riskAnalyAdd',
				data : JSON.stringify(param),
				callBackFun : function(data) {
					if(data.result==0){
						searchFun();
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
				url : '../../supplierTrade/riskAnalyMod',
				data : data,
				callBackFun : function(data) {
					if(data.result==0){
						searchFun();
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
}

function riskformValidator(){
	$('#riskForm').bootstrapValidator({
	      message: 'This value is not valid',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  purchaseRiskPoint: {
	              validators: {
	            	  notEmpty: {message: '采购风险点分析不能为空'},
	            	  stringLength: {
	                      max: 2000,
	                      message: '采购风险点分析长度不能大于2000'
	                  }
	              }
	          },
	          generateAnalysis: {
	              validators: {
	            	  notEmpty: {message: '生成分析不能为空'},
	            	  stringLength: {
	                      max: 2000,
	                      message: '生成分析长度不能大于2000'
	                  }
	              }
	          },
	          multipleAnalysis: {
	              validators: {
	            	  notEmpty: {message: '生产设备、产能、EHS等分析不能为空'},
	            	  stringLength: {
	                      max: 2000,
	                      message: '生产设备、产能、EHS等分析长度不能大于2000'
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
	$("#currentBuy").number(true, 2);
	$("#currentPay").number(true, 2);
	$("#balance").number(true, 2);
	$("#firstHalfTransaction").number(true, 2);
}
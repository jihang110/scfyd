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
	ajaxRelaCorps("txt_corpId","corpId","r_corpId");
	numFormat();
} );

window.operateEvents = {
		'click .mod': function (e, value, row, index) {
				modFun(row);
		    },
	    'click .remove': function (e, value, row, index) {
	    	bootbox.confirm("确定删除此条记录?", function(result) {  
	            if (result) {  
	            	var options = {
	    					url : '../../fixedExpend/delete',
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
	    },'click .riskmod': function (e, value, row, index) {
	    	riskModFun(row);
	    },
	    'click .riskremove': function (e, value, row, index) {
	    	bootbox.confirm("确定删除此条记录?", function(result) {  
	    		if (result) {  
            	var options = {
    					url : '../../fixedExpendAnaly/delete',
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
	$('#fixedExpendList').bootstrapTable('destroy');  
	$("#fixedExpendList").bootstrapTable({  
         method: "post", 
         url: "../../fixedExpend/list", 
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
 	        field: 'recUid',
 	        title: 'Item ID',
 	        align: 'center',
             valign: 'middle',
             visible: false
 	    }, {
			field : 'corpId',
			title : '企业Id',
			align : 'center',
			valign : 'middle',
			visible : false
		}, {
 	        field: 'corpName',
 	        title: '企业名称',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'operTime',
 	        title: '年月',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'waterAmount',
 	        title: '用水量',
 	        align: 'center',
            valign: 'middle',
             formatter:function(value,row,index){
  	 	    	return $.number(value,2);
  		        }
            /*visible: false*/
 	    },{
 	        field: 'waterMoney',
 	        title: '用水金额',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
  	 	    	return $.number(value,2);
  		    }
 	    }, {
 	        field: 'electricityAmount',
 	        title: '用电量',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
  	 	    	return $.number(value,2);
            }
 	    }, {
 	        field: 'electricityMoney',
 	        title: '用电金额',
 	        align: 'center',
             valign: 'middle',
             formatter:function(value,row,index){
   	 	    	return $.number(value,2);
             }
 	    }, {
 	        field: 'gasAmount',
 	        title: '用气量',
 	        align: 'center',
             valign: 'middle',
             formatter:function(value,row,index){
   	 	    	return $.number(value,2);
             }
 	    }, {
 	        field: 'gasMoney',
 	        title: '用气金额',
 	        align: 'center',
             valign: 'middle',
             formatter:function(value,row,index){
   	 	    	return $.number(value,2);
             }
 	    }, {
 	        field: 'paymentSituation',
 	        title: '缴费情况',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
               	if(value==0){
               		return "未缴费";
               	}else{
               		return "已缴费";
               	}
               }
 	    }, {
 	        field: 'operation',
 	        title: '操作',
 	        align: 'center',
 	        formatter:function(value,row,index){
 	        	var m = '<a class = "fa fa-edit mod" style="color:#d864fd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
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
	$("#operTime").attr("disabled",false);
	$("#addModalLabel").text("添加");
    $('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
    $('#isEdit').val(1); //新增1；修改2
}

var oldYear;
function modFun(row) {
	oldYear = null;
	$("#addModalLabel").text("修改");
	oldYear = row.operTime;
	$("#corpId").attr("disabled",true);
//	$("#operTime").attr("disabled",true);
    $('#addModal').modal();
    $('#isEdit').val(2); //新增1；修改2
    CloudUtils.setForm(row,'addForm');
}

function saveUser() {
	var modal = $('#addModal');
	var data = CloudUtils.convertStringJson('addForm');
	var jsonData = eval("(" + data + ")");
	var time = jsonData.operTime.split("-");
	jsonData.operTime = time[0]+time[1];
	var isEdit =  $('#isEdit').val(); 
	if(isEdit == 1){//新增1；修改2
		var options = {
				url : '../../fixedExpend/add',
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
					bootbox.alert("error");
				}
		};
		CloudUtils.ajax(options);
	}else{
		  var jsonData = eval("(" + data + ")");
			if(oldYear == jsonData.operTime){
				jsonData.operTime = null;
			}
		var options = {
				url : '../../fixedExpend/mod',
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
					bootbox.alert("error");
				}
		};
		CloudUtils.ajax(options);
	}
	modal.modal("hide");
}

function loadDate(){
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
	$('#startOperTime').datetimepicker({
		language: 'zh-CN',
		autoclose: true,
		todayHighlight: true,
		format: 'yyyy-mm',
		startView: 4,
        minView: "year",
		todayBtn: true,
		initialDate : new Date(),
		pickerPosition: "bottom-left"
	});$('#endOperTime').datetimepicker({
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
	$('#endOperTime').datetimepicker('setEndDate', new Date());
}


function  ajaxRelaCorps(Id1, Id2, Id3){
	var relaCorpId = store.get('corpId');
	var options = {
			url : '../../corp/list',
			data : '{"relaCorpId": "'+relaCorpId+'","isPage":0}',
			callBackFun : function(data) {
				var control1 = $('#' + Id1);
				var control2 = $('#' + Id2);
				var control3 = $('#' + Id3);
				control1.append("<option value=''>全部</option>"); 
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
	            $('#txt_corpId').selectOrDie({
					placeholder : '企业名称'
				});
			},
			errorCallback:function(data){
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
	    	 waterAmount : {
	    		  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '用水量在0-999999.99之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)>=0&&parseFloat(value)<=999999.99;
	                        }  
	                    } 
					}
	         },
	          waterMoney : {
	        	  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '用水金额在-1000000000.00~1000000000.00之间',  
	      						callback: function(value, validator) { 
	      						return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	          },
	          electricityAmount : {
	        	  validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '用电量在0-99999999.99之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)>=0&&parseFloat(value)<=99999999.99;
	                        }  
	                    } 
					}
            },
            electricityMoney : {
            	 validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '用电金额在-1000000000.00~1000000000.00之间',  
	      						callback: function(value, validator) { 
	      						return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },
	         gasAmount : {
	        	 validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '用气量在0-99999999.99之间',  
	                        callback: function(value, validator) { 
	                        	 return parseFloat(value)>=0&&parseFloat(value)<=99999999.99;
	                        }  
	                    } 
					}
	         },
	         gasMoney : {
	        	 validators: {
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                        message: '用气金额在-1000000000.00~1000000000.00之间',  
	      						callback: function(value, validator) { 
	      						return parseFloat(value)> -1000000000&&parseFloat(value)<1000000000;
	                        }  
	                    } 
					}
	         },
	         rest: {
	    		  validators: {
						
				stringLength: {
              min: 1,
              max: 100,
              message: '长度为1-100'
						}
					}
	          }
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
		});	
}
	
/*
 * *******************************************采购风险分析**************************************************************
 * 
 */
function initRiskTable() { 
	$('#riskAnalyList').bootstrapTable('destroy');  
	$("#riskAnalyList").bootstrapTable({  
         method: "post", 
         url: "../../fixedExpendAnaly/list", 
         toolbar: '#toolbar2',
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
 	        field: 'r_corpId',
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
 	        field: 'generatRiskPointAnaly',
 	        title: '生成风险点分析',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'startOperTime',
 	        title: '开始年月',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'endOperTime',
 	        title: '结算年月',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'operation',
 	        title: '操作',
 	        align: 'center',
 	        formatter:function(value,row,index){
 	        	var m = '<a class = "fa fa-edit riskmod" style="color:#d864fd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
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
	var modal = $('#riskModal');
	var data = CloudUtils.convertStringJson('riskForm');
     var jsonData = eval("(" + data + ")");
 	var time1 = jsonData.endOperTime.split("-");
 	endOperTime = time1[0]+time1[1];
 	var time2 = jsonData.startOperTime.split("-");
 	startOperTime = time2[0]+time2[1];
     var param = {    
         corpId: jsonData.r_corpId,
         generatRiskPointAnaly:jsonData.generatRiskPointAnaly,
         startOperTime:startOperTime,
         endOperTime:endOperTime
     };    
     if(CompareDate(jsonData.startOperTime,jsonData.endOperTime))
     {
    	 bootbox.alert("结算日不能在开始日期之前！");
         return false;
     }
	var isEdit =  $('#riskEdit').val(); 
	if(isEdit == 1){//新增1；修改2
		var options = {
				url : '../../fixedExpendAnaly/add',
				data : JSON.stringify(param),
				callBackFun : function(data) {
					searchFun();
				},
				errorCallback:function(data){
					bootbox.alert(data.resultNote);
					return false;
				}
		};
		CloudUtils.ajax(options);
	}else{
		var options = {
				url : '../../fixedExpendAnaly/mod',
				data : data,
				callBackFun : function(data) {
					searchFun();
				},
				errorCallback:function(data){
					bootbox.alert(data.resultNote);
					return false;
				}
		};
		CloudUtils.ajax(options);
	}
	modal.modal("hide");
}

function CompareDate(d1,d2)
{
//将所有的短横线替换为斜杠
return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
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
	    	  generatRiskPointAnaly: {
	    		  validators: {
						
				stringLength: {
               min: 1,
               max: 2000,
               message: '风险分析长度为1-2000'
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
	$("#waterMoney").number(true, 2);
	$("#waterAmount").number(true, 2);
	$("#electricityAmount").number(true, 2);
	$("#gasAmount").number(true, 2);
	$("#electricityMoney").number(true, 2);
	$("#gasMoney").number(true, 2);
	
}
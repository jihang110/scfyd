$(document).ready(function() {
	initTable(); 
	formValidator();
	dateload();
	//modal绑定事件
	$('#addModal').on('hidden.bs.modal', function(){
		$("#addForm")[0].reset();
		$("#addForm").data('bootstrapValidator').resetForm();
		document.getElementById("field").disabled=false;
		document.getElementById("btn_save").style.display="";
	});
	//去掉modal上的验证缓存
	$('#addModal').on('hide.bs.modal', function () {
		$("#addForm").data('bootstrapValidator').resetForm();
	});
	ajaxRelaCorps("txt_corpId","corpId");
	numFormat();
} );

window.operateEvents = {
		'click .mod': function (e, value, row, index) {
				modFun(row);
		    },
	    'click .remove': function (e, value, row, index) {
	    	bootbox.setLocale("zh_CN");
	    	bootbox.confirm("确定删除此条记录?", function(result) {  
	            if (result) {  
	            	var options = {
	    					url : '../../overdueManage/delete',
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
	$('#dunManageList').bootstrapTable('destroy');  
	$("#dunManageList").bootstrapTable({  
         method: "post", 
         url: "../../overdueManage/badDebt", 
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
              // corpId: jsonData.txt_corpId,
               projectName:jsonData.txt_projectName,
               contractNo:jsonData.txt_contractNo
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
 	        field: 'projectName',
 	        title: '项目名称',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	        field: 'contractNo',
 	        title: '合同编号',
 	        align: 'center',
            valign: 'middle'
 	    },  {
 	        field: 'startDate',
 	        title: '发起日期',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'createUserName',
 	        title: '立项创建人',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'loanAmt',
 	        title: '融资金额',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
   	 	    	return $.number(value,2);
   		        }
 	    },{
 	        field: 'shouldRepayAmount',
 	        title: '应还金额',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
   	 	    	return $.number(value,2);
   		        }
 	    },{
 	        field: 'actualAmount',
 	        title: '实还金额',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
   	 	    	return $.number(value,2);
   		        }
 	    },{
 	        field: 'repayTime',
 	        title: '还款时间',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	        field: 'isBadDebt',
 	        title: '是否坏账',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
  				if(value==1){
  					return "是";
  				}else{
  					return "否";
  				}
  			} 
             
 	    }/*,
 	    {
 	        field: 'operation',
 	        title: '操作',
 	        align: 'center',
 	        formatter:function(value,row,index){
 	        	var m = '<a class = "fa fa-edit mod" style="color:#d864fd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
	 	         var r = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
	 	        return m+' '+r;
 	        },
 	        events: 'operateEvents'
 	    }*/]
       });  
}

function searchFun() {
	initTable();
}

function addFun() {
	$("#addModalLabel").text("添加");
    $('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
    $('#isEdit').val(1); //新增1；修改2
}


function modFun(row) {

	if(isEdit==2){
		$("#addModalLabel").text("修改");
	}
	$("#addModalLabel").text("修改");
    $('#addModal').modal();
    $('#isEdit').val(isEdit); //新增1；修改2
    CloudUtils.setForm(row,'addForm');
}

function saveUser() {
$('#addForm').data('bootstrapValidator').validate();
	
	if(!$('#addForm').data('bootstrapValidator').isValid()){  
		 	return;
    }else{
 	var modal = $('#addModal');
	var data = CloudUtils.convertStringJson('addForm');
	 var jsonData = eval("(" + data + ")");
	var isEdit =  $('#isEdit').val(); 
	if(isEdit == 1){//新增1；修改2
		var options = {
				url : '../../overdueManage/add',
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
		var options = {
				url : '../../overdueManage/mod',
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
    }
}

//动态下拉框
function  ajaxRelaCorps(Id1,Id2){
	var relaCorpId = store.get('corpId');
	var options = {
			url : '../../corp/list',
			data : '{"relaCorpId":"'+relaCorpId+'","isPage": 0}',
			callBackFun : function(data) {
				var control1 = $('#' + Id1);
				var control2 = $('#' + Id2);
	            $.each(data.dataList, function (index, units) {  
	            	control1.append("<option value="+units.corpId+">" + units.corpName + "</option>");
	            	control2.append("<option value="+units.corpId+">" + units.corpName + "</option>");
	            });  
			},
			errorCallback:function(data){
				 alert("error");  
			}
	};
	CloudUtils.ajax(options);
}

function dateload(){
	 $('#startDate').datetimepicker({
       language: 'zh-CN',
       autoclose: 1,
       todayBtn: true,// 显示今天时间
       pickerPosition: "bottom-left",
       minuteStep: 5,
       format: 'yyyy-mm-dd',
       minView: 'month'　　　　// 日期时间选择器所能够提供的最精确的时间选择视图。
      });
	 $('#startDate').datetimepicker('setEndDate', new Date());
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
	    	  projectName : {
	                validators: {
	                	notEmpty: {message: '项目名称不能为空'},
	                	stringLength: {
		                      min: 1,
		                      max: 32,
		                      message: '项目名称长度为1-32'
		                  }
	                	//numeric: {message: '只能输入数字'}
	                }
	         },
	         buyerId : {
	                validators: {
	                	stringLength: {
		                      min: 1,
		                      max: 32,
		                      message: '买方名称长度为1-32'
		                  }
	                }
	         },
	         sellerId : {
	                validators: {
	                	stringLength: {
		                      min: 1,
		                      max: 32,
		                      message: '卖方名称长度为1-32'
		                  }
	                }
	         },
	         contacts : {
	                validators: {
	                	stringLength: {
		                      max: 32,
		                      message: '联系人长度不能超过32'
		                  }
	                }
	         },
	         address : {
	                validators: {
	                	stringLength: {
		                      max: 32,
		                      message: '地址长度不能超过32'
		                  }
	                }
	         },
	         startDate : {
	        	 validators: {
	                	notEmpty: {message: '发起日期不能为空'},
	                }
	         },
	         note : {
	                validators: {
	                	stringLength: {
		                      max: 128,
		                      message: '备注长度长度不能超过128'
		                  }
	                }
	         },
	         operationNote  : {
	                validators: {
	                	stringLength: {
		                      max: 128,
		                      message: '操作记录长度不能超过128'
		                  }
	                }
	         },
	         contractNo : {
	                validators: {
	                	notEmpty: {message: '合同编号不能为空'},
		                stringLength: {
		                	  min: 3,
		                      max: 128,
		                      message: '合同编号长度为3-32'
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
//TODO	$("#subscribedCapital").number(true, 2);
//	$("#paidInCapital").number(true, 2);
	
}
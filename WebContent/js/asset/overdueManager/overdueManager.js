$(document).ready(function() {
	initTable(); 
	formValidator();
	dateload();
	assoInput();
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
	ajaxRelaCorps("corpId");
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
         url: "../../overdueManage/list", 
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
           var corpId = store.get("corpId");
           var param = {    
               pageNumber: params.pageNumber,    
               pageSize: params.pageSize,
               corpId: corpId,
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
			title: '收款企业',
			align: 'center',
			valign: 'middle',
			visible: false
		},{
 	        field: 'projectName',
 	        title: '项目名称',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	        field: 'contractNo',
 	        title: '合同编号',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'isRecourse',
 	        title: '是否有追',
 	        align: 'center',
             valign: 'middle',
             formatter:function(value,row,index){
 				if(value==1){
 					return "是";
 				}else{
 					return "否";
 				}
 			} 
 	    },{
 	        field: 'factorType',
 	        title: '保理类型',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
 				if(value==1){
 					return "明保";
 				}else{
 					return "暗保";
 				}
 			} 
 	    },  {
 	        field: 'startDate',
 	        title: '发起日期',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'buyerId',
 	        title: '关联买方名称',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'sellerId',
 	        title: '关联卖方名称',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'overdueDocuments',
 	        title: '逾期单据图片预览',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
 	            var s = '<img src="'+row.overdueDocuments+'" width="50"/>';
 	            return s;
 	        }
 	    }, {
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
             
 	    }/*,{
 	        field: 'taskPerson',
 	        title: '任务人',
 	        align: 'center',
             valign: 'middle'
 	    }*/,{
 	        field: 'urgedCollectionLog',
 	        title: '催收日志',
 	        align: 'center',
             valign: 'middle'
 	    },{
 	        field: 'urgedCollectionDaily',
 	        title: '催收日报',
 	        align: 'center',
             valign: 'middle'
 	    },{
 	        field: 'penaltyRelief',
 	        title: '罚息减免',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
  	 	    	return $.number(value,2);
  		        }
 	    },{
 	        field: 'discount',
 	        title: '贴息',
 	        align: 'center',
            valign: 'middle', 
            formatter:function(value,row,index){
   	 	    	return $.number(value,2);
		        }
 	    },{
 	        field: 'status',
 	        title: '状态',
 	        align: 'center',
             valign: 'middle',
             formatter:function(value,row,index){
   				if(value==1){
   					return "启用";
   				}else{
   					return "销毁";
   				}
   			} 
 	    },
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
 	    }]
       });  
}

function searchFun() {
	initTable();
}

function addFun() {
	$("#addModalLabel").text("添加");
    $('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
    $('#isEdit').val(1); //新增1；修改2
    var username = store.get("username");
    $('#taskPerson').val(username);
    $('#documentOperatorId').val(username);
    $('#taskPerson').val(username);
    $("input[name='isRecourse']").attr("disabled",true);
    $("#factorType").attr("disabled",true);
    $("input[name='startDate']").attr("disabled",true);
}


function modFun(row) {

	if(isEdit==2){
		$("#addModalLabel").text("修改");
	}
	$("#addModalLabel").text("修改");
    $('#addModal').modal();
    $('#isEdit').val(isEdit); //新增1；修改2
    CloudUtils.setForm(row,'addForm');
    $("input[name='isRecourse']").attr("disabled",true);
    $("#factorType").attr("disabled",true);
    $("input[name='startDate']").attr("disabled",true);
}

function saveUser() {
$('#addForm').data('bootstrapValidator').validate();
	
	if(!$('#addForm').data('bootstrapValidator').isValid()){  
		 	return;
    }else{
    $("input[name='isRecourse']").attr("disabled",false);
    $("#factorType").attr("disabled",false);
    $("input[name='startDate']").attr("disabled",false);
 	var modal = $('#addModal');
	var data = CloudUtils.convertStringJson('addForm');
	 var data = eval("(" + data + ")");
	 var corpId = store.get("corpId");
	 data.corpId = corpId;
	 data = JSON.stringify(data);
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
	modal.modal("hide");
    }
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
	                $("#overdueDocuments").val( data.fileUrl); 
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
				bootbox.alert("error");  
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
	 $('#expenseCreateTime').datetimepicker({
	       language: 'zh-CN',
	       autoclose: 1,
	       todayBtn: true,// 显示今天时间
	       pickerPosition: "bottom-left",
	       minuteStep: 5,
	       format: 'yyyy-mm-dd',
	       minView: 'month'　　　　// 日期时间选择器所能够提供的最精确的时间选择视图。
	      });
	$('#expenseCreateTime').datetimepicker('setEndDate', new Date());
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
	         },
	         discount : {
	        	 validators: {
						numeric: {message: '只能输入数字'},
	                	callback: {  
	                         message: '贴息在0-999999999.99之间',  
	                         callback: function(value, validator) { 
	                        	 return value == "" || (parseFloat(value)>=0&&parseFloat(value)<=999999999.99);
	                         }  
	                     } 
					}
	         },
	         penaltyRelief : {
	        	 validators: {
						numeric: {message: '只能输入数字'},
	                	callback: {  
	                         message: '罚息减免在0-999999999.99之间',  
	                         callback: function(value, validator) { 
	                        	 return value == "" || (parseFloat(value)>=0&&parseFloat(value)<=999999999.99);
	                         }  
	                     } 
					}
	         },
	         urgedCollectionLog : {
	        	 validators: {
	        		 stringLength: {
	                      max: 2000,
	                      message: '催收日志长度不能超过2000'
	                  }	
					}
	         },
	         urgedCollectionDaily : {
	        	 validators: {
	        		 stringLength: {
	                      max: 2000,
	                      message: '催收日报长度不能超过2000'
	                  }	
					}
	         },
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
	         }
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
		});	
}

/*
 * 联想输入
 */
function assoInput(){
	var options = {
			url : '../../expense/list',
			data : "{}",
			callBackFun : function(data) {
			/*	var div1 = document.getElementById('browsers');
				var code = '';
				$.each(data.dataList, function(i, value) {
					code +='<option value="'+value.projectName+'">'
				});
				 div1.innerHTML = code + '';*/
				var jsonStringData = JSON.stringify(data.dataList);
				jsonStringData=jsonStringData.replace(/projectName/g,'label');
				var jsonData=eval('('+ jsonStringData +')');
				$('#projectName').autocompleter({
			        highlightMatches: true,
			        source: jsonData,
			        // show hint
			        hint: false,
			        empty: false,
			        // max results
			        limit: 5,
			        callback: function (value, index, selected) {
			        	 var param = {    
			   	              projectName:value
			   	          };    
			   		var options = {
			   				url : '../../expense/list',
			   				data : JSON.stringify(param),
			   				callBackFun : function(data) {
			   					if(data.dataList.length!=0){
			   					$("#contractNo").val(data.dataList[0].contractNo);
			   					$("#buyerId").val(data.dataList[0].relBuyName);
			   					$("#sellerId").val(data.dataList[0].relSaleName);
			   					/*
			   					 * 单选
			   					 */
			   					var rObj = document.getElementsByName("isRecourse");
			   	                for(var i = 0;i < rObj.length;i++){
			   	                    if(rObj[i].value == data.dataList[0].chaseFlg){
			   	                        rObj[i].checked =  'checked';
			   	                    }
			   	                }
			   					$("#factorType").val(data.dataList[0].factorType);
			   					$("#createUserName").val(data.dataList[0].username);
			   					$("#startDate").val(data.dataList[0].proMakeDate);
			   					$("#relSaleCorpName").val(data.dataList[0].relSaleCorpName);
			   					}
			   				},
			   				errorCallback:function(data){
			   					bootbox.alert("error");  
			   				}
			   		};
			   		CloudUtils.ajax(options);
			        }
			    });
			},
			errorCallback:function(data){
				bootbox.alert("error");  
			}
	};
	CloudUtils.ajax(options);
}



/*
 * 改变名字触发事件
 */
function changeName(){
		var projectName = $("#projectName").val();
		if(projectName==""){
			$("#contractNo").val("");
			$("#buyerId").val("");
			$("#sellerId").val("");
			$("#factorType").val("");
			$("#createUserName").val("");
			$("#startDate").val("");
			$("#relSaleCorpName").val("");
		}else{
			 var param = {    
		              projectName:projectName,
		          };    
			var options = {
					url : '../../expense/list',
					data : JSON.stringify(param),
					callBackFun : function(data) {
						if(data.dataList.length ==0){
						$("#contractNo").val("");
						$("#buyerId").val("");
						$("#sellerId").val("");
						$("#factorType").val("");
						$("#createUserName").val("");
						$("#startDate").val("");
						$("#relSaleCorpName").val("");
						}else{
							$("#contractNo").val(data.dataList[0].contractNo);
		   					$("#buyerId").val(data.dataList[0].relBuyName);
		   					$("#sellerId").val(data.dataList[0].relSaleName);
		   					/*
		   					 * 单选
		   					 */
		   					var rObj = document.getElementsByName("isRecourse");
		   	                for(var i = 0;i < rObj.length;i++){
		   	                    if(rObj[i].value == data.dataList[0].chaseFlg){
		   	                        rObj[i].checked =  'checked';
		   	                    }
		   	                }
		   					$("#factorType").val(data.dataList[0].factorType);
		   					$("#createUserName").val(data.dataList[0].username);
		   					$("#startDate").val(data.dataList[0].proMakeDate);
		   					$("#relSaleCorpName").val(data.dataList[0].relSaleCorpName);
		   					}
					},
					errorCallback:function(data){
						bootbox.alert("error");  
					}
			};
			CloudUtils.ajax(options);
		}
}

function numFormat(){
	$("#penaltyRelief").number(true, 2);
	$("#discount").number(true, 2);
	
}
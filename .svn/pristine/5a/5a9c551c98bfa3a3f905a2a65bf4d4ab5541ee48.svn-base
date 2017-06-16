var canExp = true;
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
	    					url : '../../invoiceManager/delete',
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
	$('#invoiceManagerList').bootstrapTable('destroy');  
	$("#invoiceManagerList").bootstrapTable({  
         method: "post", 
         url: "../../invoiceManager/list", 
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
               projectName:jsonData.txt_projectName,
               contractNo:jsonData.txt_contractNo
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
 	    }, /*{
 	        field: 'corpId',
 	        title: '企业Id',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    },*/{
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
 	        field: 'invoiceNo',
 	        title: '发票编号',
 	        align: 'center',
             valign: 'middle'
 	    },{
 	        field: 'invoiceUrl',
 	        title: '付款单据',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
	            var s = '<img src="'+row.invoiceUrl+'" width="50"/>';
	            return s;
	        },
 	    },{
 	        field: 'invoiceCurrency',
 	        title: '发票币种',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value, row, index) {
            	var content;
            	if (value == "0") {
            		content = '人民币';
            	} else if (value == "1") {
            		content = '美元';
            	}
 	            return content;
 	        } 
 	    },{
 	        field: 'invoiceAmt',
 	        title: '发票金额',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
  	 	    	return $.number(value,2);
  		        }
 	    },  {
 	        field: 'invoiceBalance',
 	        title: '发票余额',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
  	 	    	return $.number(value,2);
  		        }
 	    },{
 	        field: 'invoiceDate',
 	        title: '发票开立日期',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'invoiceStartDate',
 	        title: '发票起算日',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'invoiceEndDate',
 	        title: '发票结算日',
 	        align: 'center',
             valign: 'middle'
 	    },  {
 	        field: 'billUnit',
 	        title: '开票单位',
 	        align: 'center',
             valign: 'middle'
 	    },{
 	        field: 'invoiceStatus',
 	        title: '发票状态',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value, row, index) {
            	var content;
            	if (value == "0") {
            		content = '未过期';
            	} else if (value == "1") {
            		content = '已过期';
            	}
 	            return content;
 	        } 
 	    }, {
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
	//$('input').val("");
	$("#addForm").data('bootstrapValidator').destroy();
	$("#addForm").data('bootstrapValidator', null);
	formValidator();
	$("#projectName").attr("disabled",false);
	$("#addModalLabel").text("添加");
    $('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
    $('#isEdit').val(1); //新增1；修改2
}


function modFun(row) {
	$("#projectName").attr("disabled",true);
	$("#addModalLabel").text("修改");
    $('#addModal').modal();
    $('#isEdit').val("2"); //新增1；修改2
    CloudUtils.setForm(row,'addForm');
}

function saveUser() {
$('#addForm').data('bootstrapValidator').validate();
	
	if(!$('#addForm').data('bootstrapValidator').isValid()){  
		 	return;
    }else{
 	var modal = $('#addModal');
 	modal.modal("hide");
	var data = CloudUtils.convertStringJson('addForm');
	 var data = eval("(" + data + ")");
	 var date = new Date();
     var today=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
     /*比较开立日期和当前日期*/
     if(CompareDate(data.invoiceDate,today))
     {
    	 bootbox.alert("发票开立日期不能大于当前时间！");
         return false;
     }
    /*判断到期日和开始日期*/ 
/*     if(data.invoiceStartDate==""){
    	 data.invoiceStartDate = null;
     }
     if(data.invoiceEndDate==""){
    	 data.invoiceEndDate = null;
     }*/
     
     if(CompareDate(data.invoiceStartDate,data.invoiceEndDate))
     {
    	 bootbox.alert("发票到期日不能在发票起算日之前！");
         return false;
     }
     /*判断发票金额*/
     if(data.invoiceBalance>data.invoiceAmt){
    	 bootbox.alert("发票余额不能大于发票金额！");
    	 return false;
     }
     
     
     data = JSON.stringify(data);
     /*新增修改*/
	var isEdit =  $('#isEdit').val(); 
	if(isEdit == 1){//新增1；修改2
		var options = {
				url : '../../invoiceManager/add',
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
				url : '../../invoiceManager/mod',
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

function CompareDate(d1,d2)
{
//将所有的短横线替换为斜杠
return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
}


function expFun() {
	if(!canExp){
		bootbox.alert("记录超过五万条，请联系管理人员导出。");
	}else{
		var data = CloudUtils.convertStringJson('searchForm');
		var jsonData = eval("(" + data + ")");
		var param = {    
				projectName:jsonData.txt_projectName,
	            contractNo:jsonData.txt_contractNo
		};    
		var options = {
				url : '../../invoiceExcel/export',
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
	 $('#invoiceDate').datetimepicker({
       language: 'zh-CN',
       autoclose: 1,
       todayBtn: true,// 显示今天时间
       pickerPosition: "bottom-left",
       minuteStep: 5,
       format: 'yyyy-mm-dd',
       minView: 'month'　　　　// 日期时间选择器所能够提供的最精确的时间选择视图。
      });
	 $('#invoiceDate').datetimepicker('setEndDate', new Date());
	 $('#invoiceStartDate').datetimepicker({
	       language: 'zh-CN',
	       autoclose: 1,
	       todayBtn: true,// 显示今天时间
	       pickerPosition: "bottom-left",
	       minuteStep: 5,
	       format: 'yyyy-mm-dd',
	       minView: 'month'　　　　// 日期时间选择器所能够提供的最精确的时间选择视图。
	      });
		 //$('#collectionDate').datetimepicker('setEndDate', new Date());
		 $('#invoiceEndDate').datetimepicker({
		       language: 'zh-CN',
		       autoclose: 1,
		       todayBtn: true,// 显示今天时间
		       pickerPosition: "bottom-left",
		       minuteStep: 5,
		       format: 'yyyy-mm-dd',
		       minView: 'month'　　　　// 日期时间选择器所能够提供的最精确的时间选择视图。
		      });
			// $('#collectionDate').datetimepicker('setEndDate', new Date());
}

//比较字符串日期大小
//by-jihang
function CompareDate(d1,d2)
{
//将所有的短横线替换为斜杠
return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
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
	                $("#invoiceUrl").val( data.fileUrl); 
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
			   					$("#buyerId").val(data.dataList[0].relBuyId);
			   					$("#sellerId").val(data.dataList[0].relSaleId);
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
	   					$("#buyerId").val(data.dataList[0].relBuyId);
	   					$("#sellerId").val(data.dataList[0].relSaleId);
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
	         contractNo : {
	                validators: {
	                	notEmpty: {message: '合同编号不能为空'},
	                	stringLength: {
		                      min: 1,
		                      max: 32,
		                      message: '项目名称长度为1-32'
		                  }
	                	//numeric: {message: '只能输入数字'}
	                }
	         },
	         invoiceNo : {
	                validators: {
	                	notEmpty: {message: '发票编号不能为空'},
	                	stringLength: {
		                      min: 1,
		                      max: 20,
		                      message: '发票编号长度为1-20'
		                  }
	                }
	         },
	         collectionCompanyAccount : {
	                validators: {
	                	stringLength: {
		                      min: 1,
		                      max: 32,
		                      message: '收款企业账户长度为1-32'
		                  },
	                	notEmpty: {message: '收款企业账户不能为空'}
	                	//numeric: {message: '只能输入数字'}
	                }
	         },
	         invoiceAmt : {
	                validators: {
	                	notEmpty: {message: '发票金额不能为空'},
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                         message: '发票金额在0-999999999.99之间',  
	                         callback: function(value, validator) { 
	                        	 return parseFloat(value)>=0&&parseFloat(value)<=999999999.99;
	                         }  
	                     } 
	                }
	         },
	       
	         invoiceBalance : {
	                validators: {
	                	notEmpty: {message: '发票余额不能为空'},
	                	numeric: {message: '只能输入数字'},
	                	callback: {  
	                         message: '发票余额在0-999999999.99之间',  
	                         callback: function(value, validator) { 
	                        	 return parseFloat(value)>=0&&parseFloat(value)<=999999999.99;
	                         }  
	                     } 
	                }
	         }, 
	         invoiceDate : {
	        	 validators: {
	                	notEmpty: {message: '发票日期不能为空'}
	                }
	         },
	         invoiceStartDate : {
	        	 validators: {
	                	notEmpty: {message: '发票起算日不能为空'}
	                }
	         },
	         invoiceEndDate : {
	        	 validators: {
	                	notEmpty: {message: '发票结算日不能为空'}
	                }
	         },
	         invoiceStatus : {
	        	 validators: {
	                	notEmpty: {message: '来源说明不能为空'}
	                }
	         },
	       
	         billUnit  : {
	                validators: {
	                	stringLength: {
		                      min: 1,
		                      max: 32,
		                      message: '开票单位长度为1-32'
		                  },
	                	notEmpty: {message: '开票单位不能为空'}
	                }
	         }
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
		});	
}

function numFormat(){
	$("#invoiceAmt").number(true, 2);
	$("#invoiceBalance").number(true, 2);
	
}
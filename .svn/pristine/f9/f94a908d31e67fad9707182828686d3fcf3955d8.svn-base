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
		$("#addForm")[0].reset();
		$("#addForm").data('bootstrapValidator').resetForm();
	});
	ajaxRelaCorps("corpId");
} );

window.operateEvents = {
		'click .mod': function (e, value, row, index) {
				modFun(row);
		    },
	    'click .remove': function (e, value, row, index) {
	    	bootbox.confirm("确定删除此条记录?", function(result) {  
	            if (result) {  
	            	var options = {
	    					url : '../../dunManage/delete',
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
         url: "../../dunManage/list", 
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
 	        field: 'contacts',
 	        title: '联系人',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'telephoneNumber',
 	        title: '电话',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'address',
 	        title: '地址',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'note',
 	        title: '备注',
 	        align: 'center',
             valign: 'middle'
 	    },{
 	        field: 'operationNote',
 	        title: '操作记录',
 	        align: 'center',
             valign: 'middle'
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
	$("#addModalLabel").text("添加");
    $('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
    $('#isEdit').val(1); //新增1；修改2
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
				url : '../../dunManage/add',
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
				url : '../../dunManage/mod',
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
	    	  contacts : {
	                validators: {
	                	notEmpty: {message: '联系人不能为空'},
	                	stringLength: {
		                      min: 1,
		                      max: 32,
		                      message: '联系人长度为1-32'
		                  }
	                }
	         },
	         telephoneNumber : {
	                validators: {
	                	notEmpty: {message: '电话不能为空'},
	                	regexp: {
	                         regexp: /^1[3|5|8|4|7]{1}[0-9]{9}$/,
	                         message: '请输入正确的11位手机号码'
	                     }
	                }
	         },
	         telephoneNumber1 : {
	                validators: {
	                	regexp: {
	                         regexp: /^1[3|5|8|4|7]{1}[0-9]{9}$/,
	                         message: '请输入正确的11位手机号码'
	                     }
	                }
	         },
	         telephoneNumber2 : {
	                validators: {
	                	regexp: {
	                         regexp: /^1[3|5|8|4|7]{1}[0-9]{9}$/,
	                         message: '请输入正确的11位手机号码'
	                     }
	                }
	         },
	         address : {
	                validators: {
	                	notEmpty: {message: '地址不能为空'},
	                	stringLength: {
		                      min: 1,
		                      max: 32,
		                      message: '地址长度为1-32'
		                  }
	                }
	         },
	         note : {
	                validators: {
	                	notEmpty: {message: '备注不能为空'},
	                	stringLength: {
		                      max: 128,
		                      message: '备注长度长度不能超过128'
		                  }
	                }
	         },
	         operationNote  : {
	                validators: {
	                	notEmpty: {message: '操作记录不能为空'},
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


function fileSelect(obj) {
	$(obj).next().click();
}

function ajaxFileUpload(obj) {
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
	                bootbox.alert("上传成功！");
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

var contactsNum = 0;
function addcontacts(){
	contactsNum++;
	if(contactsNum>=3){
		//bootbox.alert("最多新增2个");
		contactsNum = 2;
		return;
	}else{
	var contactsHtml='<div class="form-group" id="contactsDiv'+contactsNum+'">';
	contactsHtml +=	'	<label class="col-sm-4 control-label"  for="contacts'+contactsNum+'">联系人'+contactsNum+'</label>';
	contactsHtml +=	'	<div class="col-sm-6">';
	contactsHtml +=	'		<input type="text" name="contacts'+contactsNum+'" class="form-control" id="contacts'+contactsNum+'" placeholder="联系人'+contactsNum+'">';
	contactsHtml +=	'	</div>';
	contactsHtml +=	'</div>';
	var phoneHtml='<div class="form-group" id="telephoneNumberDiv'+contactsNum+'">';
	phoneHtml +=	'	<label class="col-sm-4 control-label"  for="telephoneNumber'+contactsNum+'">电话'+contactsNum+'</label>';
	phoneHtml +=	'	<div class="col-sm-6">';
	phoneHtml +=	'		<input type="text" name="telephoneNumber'+contactsNum+'" class="form-control" id="telephoneNumber'+contactsNum+'" placeholder="电话'+contactsNum+'">';
	phoneHtml +=	'	</div>';
	phoneHtml +=	'</div>';
	}
	contactsHtml += phoneHtml;
	$("#contactshide").append(contactsHtml);
}

function delcontacts(){
	if(contactsNum>0){
		$("div#contactsDiv"+contactsNum).remove();
		$("div#telephoneNumberDiv"+contactsNum).remove();
		contactsNum--;
	}
}

var operationNoteNum = 0;
function addOperationNote(){
	operationNoteNum++;
	if(operationNoteNum>=3){
		//bootbox.alert("最多新增2个");
		operationNoteNum = 2;
		return;
	}else{
	var invHtml='<div class="form-group" id="operationNoteDiv'+operationNoteNum+'">';
	invHtml +=	'	<label class="col-sm-4 control-label"  for="operationNote'+operationNoteNum+'">操作记录'+operationNoteNum+'</label>';
	invHtml +=	'	<div class="col-sm-6">';
	invHtml +=	'		<input type="text" name="operationNote'+operationNoteNum+'" class="form-control" id="operationNote'+operationNoteNum+'" placeholder="操作记录'+operationNoteNum+'">';
	invHtml +=	'	</div>';
	invHtml +=	'</div>';
	}
	$("#operationNotehide").append(invHtml);
}

function delOperationNote(){
	if(operationNoteNum>0){
		$("div#operationNoteDiv"+operationNoteNum).remove();
		operationNoteNum--;
	}
}

var returnVisitMaterialNum = 0;
function addReturnVisitMaterial(){
	returnVisitMaterialNum++;
	if(returnVisitMaterialNum>=3){
		//bootbox.alert("最多新增2个");
		returnVisitMaterialNum = 2;
		return;
	}else{
		var invHtml='<div class="form-group" id="returnVisitMaterialDiv'+returnVisitMaterialNum+'">';
		invHtml +=	'	<label class="col-sm-4 control-label"  for="returnVisitMaterial'+returnVisitMaterialNum+'">回访材料'+returnVisitMaterialNum+'</label>';
		invHtml +=	'	<div class="col-sm-6">';
		invHtml +=	'		<div class="input-group">';
		invHtml +=	'			<input type="text" readonly class="form-control" id="returnVisitMaterial'+returnVisitMaterialNum+'" name="returnVisitMaterial'+returnVisitMaterialNum+'" placeholder="上传附件">';
		invHtml +=	'			<span class="input-group-addon">';
		invHtml +=	'			<i class="fa fa-ellipsis-h" aria-hidden="true"  onclick="fileSelect(this);"></i>';
		invHtml +=	'			<input type="file" name="file" id="file'+returnVisitMaterialNum+'" onchange="ajaxFileUpload(this);" style="display:none;">';
		invHtml +=	'			</span>';
		invHtml +=	'		</div>';
		invHtml +=	'	</div>';
		invHtml +=	'</div>';;
	}
	$("#returnVisitMaterialhide").append(invHtml);
}

function delReturnVisitMaterial(){
	if(returnVisitMaterialNum>0){
		$("div#returnVisitMaterialDiv"+returnVisitMaterialNum).remove();
		returnVisitMaterialNum--;
	}
}
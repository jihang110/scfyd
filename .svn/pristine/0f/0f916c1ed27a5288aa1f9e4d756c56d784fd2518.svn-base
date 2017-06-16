

$(document).ready(function() {
	initTable(); 
	$('#txt_userType').selectOrDie({
		placeholder: '员工类型'
			
	});
	$('#txt_hasBadCredit').selectOrDie({
		placeholder: '有无不良信用记录'
			
	});
	ajaxRelaCorps();
	formValidator();
	//modal绑定事件
	$('#addModal').on('hidden.bs.modal', function(){
		$("#addForm")[0].reset();
		$("#addForm").data('bootstrapValidator').destroy();
		$("#addForm").data('bootstrapValidator', null);
		formValidator();
		document.getElementById("field").disabled=false;
		document.getElementById("btn_save").style.display="";
	});
	
	$('#addModal').on('hide.bs.modal', function () {
		window.parent.scrollTo(0,0);
		$("#addForm").data('bootstrapValidator').resetForm();
	})
	
	$('#birthday').datetimepicker({
		language: 'zh-CN',
		autoclose: true,
		todayHighlight: true,
		format: 'yyyy-mm-dd',
		minView:'month',
		todayBtn: true,
		initialDate : new Date() ,
		pickerPosition: "bottom-left"
	});
	$('#corpServiceStartTime').datetimepicker({
		language: 'zh-CN',
		autoclose: true,
		todayHighlight: true,
		format: 'yyyy-mm-dd',
		minView:'month',
		todayBtn: true,
		initialDate : new Date() ,
		pickerPosition: "bottom-left"
	});
	$('#corpServiceEndTime').datetimepicker({
		language: 'zh-CN',
		autoclose: true,
		todayHighlight: true,
		format: 'yyyy-mm-dd',
		minView:'month',
		todayBtn: true,
		initialDate : new Date() ,
		pickerPosition: "bottom-left"
	});
	$('#birthday').datetimepicker('setEndDate', new Date());
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
	            			url : '../../corpManagerUserInfo/delete',
	    					data : '{"corpManagerId":"'+row.corpManagerId+'"}',
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
}

function initTable() { 
	$('#userListTable').bootstrapTable('destroy');  
	$("#userListTable").bootstrapTable({  
         method: "post", 
         url: "../../corpManagerUserInfo/list", 
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
               userName: jsonData.txt_userName,
               education: jsonData.txt_education,
               userType: jsonData.txt_userType,
               hasBadCredit: jsonData.txt_hasBadCredit
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
 	        field: 'corpManagerId',
 	        title: 'Item ID',
 	        align: 'center',
             valign: 'middle',
             visible: false
 	    }, {
 	        field: 'userName',
 	        title: '姓名',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'hasBadCredit',
 	        title: '有无不良信用记录',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
            	if(value==1){
            		return "有";
            	}else{
            		return "无";
            	}
            }
 	    },{
 	        field: 'badRecord',
 	        title: '不良记录',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'userType',
 	        title: '员工类型',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
             	if(value==1){
             		return "实际控制人";
             	}else if(value==2){
             		return "经营负责人";
             	}else{
             		return "财务负责人";
             	}
             }
 	    }, {
 	        field: 'residenceAddr',
 	        title: '户口所在地',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'corpName',
 	        title: '所属企业',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'education',
 	        title: '文化程度',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'nationality',
 	        title: '国籍',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'birthAddr',
 	        title: '籍贯',
 	        align: 'center',
            valign: 'middle'
 	    },  {
 	        field: 'operation',
 	        title: '操作',
 	        align: 'center',
            valign: 'middle',
 	        formatter:function(value,row,index){
 	        	var d = '<a class = "fa fa-list-ul detail" style="color:#a9d86e;padding:0px 5px;" title="详情" href="javascript:void(0)"></a>';
 	            var s = '<a class = "fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
 	            var r = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
 	            return d+' '+s+' '+r;
 	        },
 	        events: 'operateEvents'
 	    }]
       });  
}
 
function addFun() {
	$("#corpId").attr("disabled",false);
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

function modFun(row,isEdit) {
	$("#btn_blank").removeClass('col-sm-7').addClass('col-sm-4');
    if(isEdit==0){
		$("#addModalLabel").text("详情");
	}
	if(isEdit==2){
		$("#corpId").attr("disabled",true);
		$("#addModalLabel").text("修改");
	}
	$('#isEdit').val(isEdit); //新增1;修改2;详情0
    $('#addModal').modal();
    CloudUtils.setForm(row,'addForm');
    if(row.birthday!=null&&row.birthday!=''){
    	$("#birthday").val( dateFormat(row.birthday, 'yyyy-MM-dd'));
    }
    if(row.corpServiceStartTime!=null&&row.corpServiceStartTime!=''){
    	$("#corpServiceStartTime").val( dateFormat(row.corpServiceStartTime, 'yyyy-MM-dd'));
    }
    if(row.corpServiceEndTime!=null&&row.corpServiceEndTime!=''){
    	$("#corpServiceEndTime").val( dateFormat(row.corpServiceEndTime, 'yyyy-MM-dd'));
    }
}

function saveUser() {
$('#addForm').data('bootstrapValidator').validate();
	
	if(!$('#addForm').data('bootstrapValidator').isValid()){  
		 	return;
    }else{
		var modal = $('#addModal');
		var data = CloudUtils.convertStringJson('addForm');
		var jsonData = eval("(" + data + ")");
		if(CompareDate(jsonData.corpServiceStartTime,jsonData.corpServiceEndTime))
	    {
	   	 bootbox.alert("结束时间不能在开始时间之前！");
	        return false;
	    }
		var isEdit =  $('#isEdit').val(); 
		if(isEdit == 1){//新增1；修改2
			var options = {
					url : '../../corpManagerUserInfo/add',
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
			var options = {
					url : '../../corpManagerUserInfo/mod',
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
		}
		modal.modal("hide");
    }
}


function  ajaxRelaCorps(){
	var relaCorpId = store.get('corpId');
	var options = {
			url : '../../corp/list',
			data : '{"relaCorpId":"'+relaCorpId+'","isPage":0}',
			callBackFun : function(data) {
				if(data.result==0){
					$("#corpId").html('');
					$.each(data.dataList, function (index, units) {  
						$("#corpId").append("<option value="+units.corpId+">" + units.corpName + "</option>");  
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
function formValidator(){
	$('#addForm').bootstrapValidator({
	      message: 'This value is not valid',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	          position: {
	              validators: {
	                  stringLength: {
	                      max: 16,
	                      message: '长度不能超过16'
	                  }
	              }
	          },
	          identityCardNo: {
	              validators: {
	            	  regexp: {
	                        regexp: /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/,
	                        message: '只能输入正确的身份证'
	                  }
	              }
	          },
	          telephone: {
	              validators: {
	                  stringLength: {
	                      max: 16,
	                      message: '长度不能超过16'
	                  }
	              }
	          },
	          birthAddr: {
	              validators: {
	                  stringLength: {
	                      max: 16,
	                      message: '长度不能超过16'
	                  }
	              }
	          },
	          nationality: {
	              validators: {
	                  stringLength: {
	                      max: 16,
	                      message: '长度不能超过16'
	                  }
	              }
	          },
	          education: {
	              validators: {
	                  stringLength: {
	                      max: 16,
	                      message: '长度不能超过16'
	                  }
	              }
	          },
	          residenceAddr: {
	              validators: {
	                  stringLength: {
	                      max: 32,
	                      message: '长度不能超过32'
	                  }
	              }
	          },
	          homeAddr: {
	              validators: {
	                  stringLength: {
	                      max: 32,
	                      message: '长度不能超过32'
	                  }
	              }
	          },
	          industryAge: {
	              validators: {
	                  stringLength: {
	                      max: 2,
	                      message: '长度不能超过2'
	                  },
	                  regexp: {
	                        regexp: /^[1-9]\d*$/,
	                        message: '只能输入正整数'
	                  }
	              }
	          },
	          badRecord: {
	              validators: {
	                  stringLength: {
	                      max: 255,
	                      message: '长度不能超过255'
	                  }
	              }
	          },
	          note: {
	              validators: {
	                  stringLength: {
	                      max: 255,
	                      message: '长度不能超过255'
	                  }
	              }
	          },	
	          userName: {
	              validators: {
	                  notEmpty: {
	                      message: '用户名不能为空'
	                  },
	                  stringLength: {
	                      min: 2,
	                      max: 30,
	                      message: '用户名长度为3-30'
	                  }
	              }
	          },
	          corpId: {
	              validators: {
	                  notEmpty: {
	                      message: '所属企业不能为空'
	                  }
	              }
	          }
	          
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
		});	
}

//比较字符串日期大小
//by-jihang
function CompareDate(d1,d2)
{
//将所有的短横线替换为斜杠
return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
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


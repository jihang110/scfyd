

$(document).ready(function() {
	checkUser();
	ajaxRelaCorps("s_corpId");
	initTable(); 
	//modal绑定事件
	$('#addModal').on('hidden.bs.modal', function(){
		$("#field").attr("disabled",false); 
		$("#btn_save").css('display',''); 
		$("#addForm")[0].reset();
		$("#addForm").data('bootstrapValidator').destroy();
		$("#addForm").data('bootstrapValidator', null);
		formValidator();
	});
	$('#addModal').on('hide.bs.modal', function () {
		window.parent.scrollTo(0,0);
		$("#addForm").data('bootstrapValidator').resetForm();
	});
	$('#regDate').datetimepicker({
		language: 'zh-CN',
		autoclose: true,
		todayHighlight: true,
		format: 'yyyy-mm-dd',
		minView:'month',
		todayBtn: true,
		initialDate : new Date() ,
		endDate:new Date() ,
		pickerPosition: "bottom-left"
	});
	formValidator();
	numFormat();
} );

function  ajaxRelaCorps(Id1){
	var control1 = $('#' + Id1);
	control1.empty();
	var relaCorpId = store.get('corpId');
	var options = {
			url : '../../corp/list',
			data : '{"relaCorpId": "'+relaCorpId+'","isPage":0}',
			callBackFun : function(data) {
				control1.append("<option value="+''+">" +"全部"+ "</option>");
				if(data.result==0){
					 $.each(data.dataList, function (index, units) {  
			            	control1.append("<option value="+units.corpId+">" + units.corpName + "</option>");
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

function fileSelect() {
    document.getElementById("file").click(); 
}

function ajaxFileUpload(){
	if ($("#file").val().length > 0) {
		$.ajaxFileUpload({  
	        url : '../../file/binUpload?pathId=1',  
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
	                $("#logoUrl").val( data.fileUrl);
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
	    					url : '../../corp/delete',
	    					data : '{"corpId":"'+row.corpId+'"}',
	    					callBackFun : function(data) {
	    						if(data.result==0){
	    							searchFun();
	    							window.location.reload();
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
         url: "../../corp/list", 
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
           var corpId = store.get('corpId');
           var userId = store.get('userId');
           if(corpId==null||corpId=='null'){
        	   corpId = '';
           }
           var param = {    
               pageNumber: params.pageNumber,    
               pageSize: params.pageSize,
               isPage : 1,
               sysType: jsonData.s_sysType==null?"":jsonData.s_sysType,
               controlPerson:jsonData.s_contactPerson,
               legalPerson:jsonData.s_legalPerson,
               relaCorpId: corpId,
               userId: userId,
               corpId:jsonData.s_corpId
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
 	        field: 'corpId',
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
 	        field: 'relaCorpName',
 	        title: '关联企业',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    }, {
 	        field: 'realPayCap',
 	        title: '实缴资本',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
 	 	    	return $.number(value,2);
 		        }
 	    }, {
 	        field: 'regDate',
 	        title: '注册时间',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
        		if(row.regDate!=null&&row.regDate!=''){
        			return dateFormat(row.regDate, 'yyyy-MM-dd')
        		}
 	        }
 	    }, {
 	        field: 'legalPerson',
 	        title: '法定代表人',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'controlPerson',
 	        title: '联系人',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    },{
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
	$("#btn_blank").removeClass('col-sm-7').addClass('col-sm-4');
	$("#addModalLabel").text("添加");
    $('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
    $('#isEdit').val(1); //新增1；修改2
    $("#sysType").attr("disabled",false);
}

function detailFun(row,isEdit) {
	modFun(row,isEdit);
	$("#field").attr("disabled",true); 
	$("#btn_save").css('display','none');
	$("#btn_blank").removeClass('col-sm-4').addClass('col-sm-7');
}

function modFun(row,isEdit) {
	$("#btn_blank").removeClass('col-sm-7').addClass('col-sm-4');
	if(isEdit==0){
		$("#addModalLabel").text("详情");
	}
	if(isEdit==2){
		$("#addModalLabel").text("修改");
	}
	$('#isEdit').val(isEdit); //新增1;修改2;详情0
	CloudUtils.setForm(row,'addForm');
    $('#addModal').modal();
    if($("#sysType").val()=='0'){
    	$("#sysType").attr("disabled",false);
    }else{
    	$("#sysType").attr("disabled",true);
    }
    
    if(row.regDate!=null&&row.regDate!=''){
    	$("#regDate").val( dateFormat(row.regDate, 'yyyy-MM-dd'));
    }
}

function saveUser() {
	var da = $('#addForm').data('bootstrapValidator');
	da.validate();
	
	if(!da.isValid()){  
		 	return false;
    }else{
    	var modal = $('#addModal');
    	var data = CloudUtils.convertStringJson('addForm');
    	var isEdit =  $('#isEdit').val(); 
    	if(isEdit == 1){//新增1；修改2
    		var options = {
					url : '../../corp/add',
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
    	}else if(isEdit == 2){
    		var options = {
					url : '../../corp/mod',
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
    	window.location.reload();
    	modal.modal("hide");
    	window.parent.scrollTo(0,0);
    }
}

//检查登录用户，限制功能
function checkUser(){
	if(store.get('roleType')==1){
		 $("#s_sysType").html("");
		 $("#s_sysType").append("<option value=''>-请选择-</option>");
		 $("#s_sysType").append("<option value='2'>保理商</option>");  
		 $("#s_sysType").append("<option value='3'>资方</option>");  
		 $("#sysType").html("");
		 $("#sysType").append("<option value='2'>保理商</option>");  
		 $("#sysType").append("<option value='3'>资方</option>");
		 $('#s_sysType').selectOrDie({
					
		 });
     }else{
    	 $("#s_sysType").html("");
    	 $("#s_sysType").append("<option value='0'>-请选择-</option>");
      	 $("#s_sysType").append("<option value='4'>买方</option>");  
      	 $("#s_sysType").append("<option value='5'>卖方</option>");  
    	 $("#sysType").html("");
    	 $("#sysType").append("<option value='0'>-请选择-</option>");
    	 $("#sysType").append("<option value='4'>买方</option>");  
    	 $("#sysType").append("<option value='5'>卖方</option>");
    	 $('#s_sysType').selectOrDie({
					
		 });
     }
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
	    	  corpType: {
	              validators: {
	                  notEmpty: {
	                      message: '企业类型不能为空'
	                  }
	              }
	          },
	          sysType: {
	              validators: {
	                  notEmpty: {
	                      message: '系统类型不能为空'
	                  }
	              }
	          },
	          isCountry: {
	              validators: {
	                  notEmpty: {
	                      message: '是否国有不能为空'
	                  }
	              }
	          },
	          legalPerson: {
	              validators: {
	                  notEmpty: {
	                      message: '法定代表人不能为空'
	                  },
	                  stringLength: {
	                      min: 1,
	                      max: 32,
	                      message: '长度为1-32'
	                  }
	              }
	          },
	          realPayCap: {
	              validators: {
	            	  numeric: {
	            		  message: '实缴资本只能输入数字'
	            	  },
//	                  stringLength: {
//	                      max: 11,
//	                      message: '长度为1-11'
//	                  },
	                  regexp: {
	                	  regexp: /^[1-9]\d*$/,
	                        message: '只能输入正整数'
	                  },
	                  callback: {  
	                         message: '实缴资本在0-1000000000之间',  
	                         callback: function(value, validator) { 
	                        	 return value =="" || (parseFloat(value)>=0&&parseFloat(value)<=1000000000);
	                         }  
	                     } 
	              }
	          },
	          regCap: {
	              validators: {
	            	  numeric: {
	            		  message: '注册资本只能输入数字'
	            	  },
//	                  stringLength: {
//	                      max: 11,
//	                      message: '长度为1-11'
//	                  },
	                  regexp: {
	                	  regexp: /^[1-9]\d*$/,
	                        message: '只能输入正整数'
	                  },
	            	  callback: {  
	                         message: '注册资本在0-1000000000之间',  
	                         callback: function(value, validator) { 
	                        	 return value =="" || (parseFloat(value)>=0&&parseFloat(value)<=1000000000);
	                         }  
	                     }
	              }
	          },
	          staffNum: {
	              validators: {
	            	  numeric: {
	            		  message: '员工人数只能输入数字'
	            	  },
//	                  stringLength: {
//	                      max: 11,
//	                      message: '长度为1-11'
//	                  },
	                  regexp: {
	                        regexp: /^[1-9]\d*$/,
	                        message: '只能输入正整数'
	                  },
	            	  callback: {  
	                         message: '员工人数在0-1000000之间',  
	                         callback: function(value, validator) { 
	                        	 return value =="" || (parseFloat(value)<=1000000);
	                         }  
	                     } 
	              }
	          },
	          industry: {
	              validators: {
	                  stringLength: {
	                      max: 32,
	                      message: '长度为1-32'
	                  }
	              }
	          },
	          officeAddress: {
	              validators: {
	                  stringLength: {
	                      max: 32,
	                      message: '长度为1-32'
	                  }
	              }
	          },
	          specNatural: {
	              validators: {
	                  stringLength: {
	                      max: 32,
	                      message: '长度为1-32'
	                  }
	              }
	          },
	          regAddress: {
	              validators: {
	                  stringLength: {
	                      max: 32,
	                      message: '长度为1-32'
	                  }
	              }
	          },
	          busiScope: {
	              validators: {
	                  stringLength: {
	                      max: 32,
	                      message: '长度为1-32'
	                  }
	              }
	          },
	          historyEvc: {
	              validators: {
	                  stringLength: {
	                      max: 1000,
	                      message: '长度为1-1000'
	                  }
	              }
	          },
	          note: {
	              validators: {
	                  stringLength: {
	                      max: 256,
	                      message: '长度为1-256'
	                  }
	              }
	          },
	          controlPerson: {
	              validators: {
	                  notEmpty: {
	                      message: '实际控制人不能为空'
	                  },
	                  stringLength: {
	                      min: 1,
	                      max: 32,
	                      message: '长度为1-32'
	                  }
	              }
	          },
	          corpName: {
	              validators: {
	                  notEmpty: {
	                      message: '企业名称不能为空'
	                  },
	                  stringLength: {
	                      min: 1,
	                      max: 32,
	                      message: '长度为1-32'
	                  }
	              }
	          }
	      }
		})
		.on('success.form.bv', function (e) {
        // Prevent form submission
        e.preventDefault();
        // Get the form instance
        var $form = $(e.target);
        // Get the BootstrapValidator instance
        var bv = $form.data('bootstrapValidator')
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
	$("#realPayCap").number(true, 0);
	$("#regCap").number(true, 0);
	$("#staffNum").number(true, 0);
	
}

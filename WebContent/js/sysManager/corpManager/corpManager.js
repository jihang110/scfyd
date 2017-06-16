

$(document).ready(function() {
	//modal绑定事件
	$('#addModal').on('hidden.bs.modal', function(){
		$("#addForm")[0].reset();
		$("#addForm").data('bootstrapValidator').destroy();
		$("#addForm").data('bootstrapValidator', null);
		formValidator();
		$("#field").attr("disabled",false); 
		$("#btn_save").css('display',''); 
	});
	
	$('#addModal').on('hide.bs.modal', function () {
		$("#addForm").data('bootstrapValidator').resetForm();
		window.parent.scrollTo(0,0);
	});
	
	initTable(); 
	checkUser();
	ajaxRelaCorps();
	formValidator();
	numFormat();
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
} );

function fileSelect() {
    document.getElementById("file").click(); 
}

/**
 * by-jh
 * 动态刷新logo图片
 * @param path logo路径
 */
function refreshLogo(path){
	var obj = parent.document.getElementById("logo");
	obj.src=path;
}

function ajaxFileUpload(){
	if ($("#file").val().length > 0) {
		if(check()){
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
    }
    else {
    	bootbox.alert("请选择图片");
    }
	
}

/*
 * 图片大小限制和图片类型限制
 * by-jihang
 */
function check(){
	var aa=document.getElementById("file").value.toLowerCase().split('.');//以“.”分隔上传文件字符串
	if(aa[aa.length-1]=='gif'||aa[aa.length-1]=='jpg'||aa[aa.length-1]=='bmp'
		||aa[aa.length-1]=='png'||aa[aa.length-1]=='jpeg')//判断图片格式
	{
		var imagSize =  document.getElementById("file").files[0].size;
//		alert("图片大小："+imagSize+"B")
		if(imagSize<40*1024){
			return true;
		}else{
			bootbox.alert("图片大小在40KB以内，现在图片大小为："+imagSize/1024+"KB");
			return false;
		}
	}
	else
	{
		bootbox.alert('请选择格式为*.jpg、*.gif、*.bmp、*.png、*.jpeg 的图片');//jpg和jpeg格式是一样的只是系统Windows认jpg，Mac OS认jpeg，
		return false;
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
           if(corpId==null||corpId=='null'){
        	   corpId = '';
           }
           var sysType = jsonData.s_sysType==null?"":jsonData.s_sysType;
//           if(store.get('roleType')!=1){
//        	   sysType = 2;
//           }
           var param = {    
               pageNumber: params.pageNumber,    
               pageSize: params.pageSize,
               isPage : 1,
               sysType: sysType,
               corpName: jsonData.s_corpName,
               legalPerson:jsonData.s_legalPerson,
               corpId: corpId
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
 	    },{
 	        field: 'regCap',
 	        title: '注册资本',
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
 	        	var d = '<a class = "fa fa-list-ul detail" style="color:#a9d86e;padding:0px 5px;" title="详情"  href="javascript:void(0)"></a>';
 	            var s = '<a class = "fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
 	            if(store.get('roleType')==1){
 	            	var r = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
 	            	return d+' '+s+' '+r;
 	            }
 	            return d+' '+s;
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
    $("#logoUrl").attr("disabled",true); 
    $("#sysType").attr("disabled",false);
}

function detailFun(row,isEdit) {
	modFun(row,isEdit);
    $("#field").attr("disabled",true);
//    $('#logoUrl').attr("disabled",false);
//    $("#logoUrl").attr("readonly",true);	
	$("#btn_save").css('display','none');
	$("#btn_blank").removeClass('col-sm-4').addClass('col-sm-7');
	$("#")
}

function modFun(row,isEdit) {
	$("#btn_blank").removeClass('col-sm-7').addClass('col-sm-4');
	if(isEdit==0){
		$("#addModalLabel").text("详情");
	}
	if(isEdit==2){
		$("#addModalLabel").text("修改");
	}
	$('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭

	$('#isEdit').val(isEdit); //新增1;修改2;详情0
    $('#addModal').modal();
    $("#logoUrl").attr("readonly",true); 
    CloudUtils.setForm(row,'addForm');
    $("#sysType").attr("disabled",true);
    if(row.regDate!=null&&row.regDate!=''){
    	$("#regDate").val( dateFormat(row.regDate, 'yyyy-MM-dd'));
    }
//    $('#logoUrl').mouseover(function () {
//		document.getElementById("logoUrl").style.width = 900 + "px";
//    });
//	$('#logoUrl').mouseout(function () {
//		var width = document.getElementById("controlPerson").offsetWidth;
//		document.getElementById("logoUrl").style.width =(width-36)+"px";
//    });
}

function saveUser() {
	var da = $('#addForm').data('bootstrapValidator');
	da.validate();
	
	if(!da.isValid()){  
		 	return false;
    }else{
    	var modal = $('#addModal');
    	var data = CloudUtils.convertStringJson('addForm');
    	var data = eval("(" + data + ")");
    	data.sysType = $('#sysType').val();
    	data.logoUrl = $('#logoUrl').val();
    	refreshLogo($('#logoUrl').val());
    	data = JSON.stringify(data);
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
    	modal.modal("hide");
    	window.parent.scrollTo(0,0);
    }
}


function  ajaxRelaCorps(){
	var relaCorpId = store.get('corpId');
	var options = {
			url : '../../corp/list',
			data : '{"relaCorpId":"'+relaCorpId+'","isPage": 0}',
			callBackFun : function(data) {
				if(data.result==0){
					$("#relaCorpId").html('');
					$.each(data.dataList, function (index, units) {  
						$("#relaCorpId").append("<option value="+units.corpId+">" + units.corpName + "</option>");  
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

//检查登录用户，限制功能
function checkUser(){
	if(store.get('roleType')==1){
		 $("#btnGroup").show();
		 $("#btn_add").attr("disabled", false); 
		 $("#s_sysType").html("");
		 $("#s_sysType").append("<option value='2'>保理商</option>");  
		 $("#s_sysType").append("<option value='3'>资方</option>");  
		 $("#sysType").html("");
		 $("#sysType").append("<option value='2'>保理商</option>");  
		 $("#sysType").append("<option value='3'>资方</option>");
		 $('#s_sysType').selectOrDie({
				placeholder: '系统类型'
					
		 });
     }else{
    	 $("#btnGroup").hide();
    	 $("#corpTitle").css({"margin":"0px 15px 0px 15px"});
    	 $("#sysType").html("");
    	 $("#sysType").append("<option value='2'>保理商</option>");  
		 $("#sysType").append("<option value='3'>资方</option>");
    	 $("#s_sysType").append("<option value='2'>保理商</option>");  
		 $("#s_sysType").append("<option value='3'>资方</option>"); 
    	 $("#sysType").append("<option value='4'>买方</option>");  
    	 $("#sysType").append("<option value='5'>卖方</option>");  
    	 $('#s_sysType').selectOrDie({
				placeholder: '系统类型'
					
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
	                         message: '实缴资本在0~1000000000之间',  
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
	                         message: '注册资本在0~1000000000之间',  
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
	                         message: '员工人数在0~1000000000之间',  
	                         callback: function(value, validator) { 
	                        	 return value =="" || (parseFloat(value)<=1000000000);
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
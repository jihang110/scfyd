

$(document).ready(function() {
	initTable(); 
	ajaxRelaCorps();
	//modal绑定事件
	$('#addModal').on('hidden.bs.modal', function(){
		$("#addForm")[0].reset();
		$("#addForm").data('bootstrapValidator').resetForm();
		document.getElementById("field").disabled=false;
		document.getElementById("btn_save").style.display="";
	});
	$('#addModal').on('hide.bs.modal', function () {
		window.parent.scrollTo(0,0);
		$("#addForm").data('bootstrapValidator').resetForm();
	})
	formValidator();
	$('#ratingTime').datetimepicker({
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
	$('#inquiryTime').datetimepicker({
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
	                $("#creditSituation").val( data.fileUrl); 
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

function initPortrait(ctrlName, id) {
    var control = $('#' + ctrlName);
    var imageurl = '/PictureAlbum/GetPortrait?id=' + id + '&r=' + Math.random();

    //重要，需要更新控件的附加参数内容，以及图片初始化显示
    control.fileinput('refresh', {
        uploadExtraData: { id: id },
        initialPreview: [ //预览图片的设置
            "<img src='" + imageurl + "' class='file-preview-image' alt='肖像图片' title='肖像图片'>",
        ],
    });
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
	            			url : '../../creditReport/delete',
	    					data : '{"creditId":"'+row.creditId+'"}',
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
         url: "../../creditReport/list", 
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
               corpName: jsonData.s_corpName,
               corpId:jsonData.s_corpId ==""?null:jsonData.s_corpId
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
 	        field: 'creditId',
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
 	        field: 'creditSituation',
 	        title: '信用情况',
 	        align: 'center',
            valign: 'middle',
	        formatter:function(value,row,index){
	            var s = '<img src="'+row.creditSituation+'" width="50"/>';
	            return s;
	        }
 	    },{
 	        field: 'ratingType',
 	        title: '评级类型',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'ratingAgency',
 	        title: '评级机构',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'ratingTime',
 	        title: '评级时间',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
        		if(row.ratingTime!=null&&row.ratingTime!=''){
        			return dateFormat(row.ratingTime, 'yyyy-MM-dd')
        		}
 	        }
 	    }, {
 	        field: 'ratingResult',
 	        title: '评级结果',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'summaryOfCreditReport',
 	        title: '征信报告内容小结',
 	        align: 'center',
            valign: 'middle'
 	    }, {
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
    $('#isEdit').val(1); //添加1；修改2
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
	$('#isEdit').val(isEdit); //添加1;修改2;详情0
    $('#addModal').modal();
    CloudUtils.setForm(row,'addForm');
    if(row.ratingTime!=null&&row.ratingTime!=''){
    	$("#ratingTime").val( dateFormat(row.ratingTime, 'yyyy-MM-dd'));
    }
    if(row.inquiryTime!=null&&row.inquiryTime!=''){
    	$("#inquiryTime").val( dateFormat(row.inquiryTime, 'yyyy-MM-dd'));
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
					url : '../../creditReport/add',
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
					url : '../../creditReport/mod',
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
			data : '{"relaCorpId":"'+relaCorpId+'","isPage": 0}',
			callBackFun : function(data) {
				if(data.result==0){
					$("#corpId").html('');
					$("#s_corpName").html('');
					$("#s_corpId").append("<option value=''>全部</option>");
					$.each(data.dataList, function (index, units) {
						$("#s_corpId").append("<option value="+units.corpId+">" + units.corpName + "</option>");
						$("#corpId").append("<option value="+units.corpId+">" + units.corpName + "</option>");  
						$("#s_corpName").append("<option value="+units.corpName+">" + units.corpName + "</option>");  
					});
					$("#s_corpId").selectOrDie({
				        placeholder: '企业名称'
				        
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

function fileSelect() {
    document.getElementById("file").click(); 
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
	    	  corpId: {
	              validators: {
	                  notEmpty: {
	                      message: '企业名称不能为空'
	                  }
	              }
	          },
	      	  ratingType: {
	              validators: {
	            	  stringLength: {
	                      max: 5,
	                      message: '评级类型长度不能大于5'
	                  }
	              }
	          },
	          ratingAgency: {
	              validators: {
	            	  stringLength: {
	                      max: 100,
	                      message: '评级机构长度不能大于100'
	                  }
	              }
	          },
	      	  ratingResult: {
	              validators: {
	            	  stringLength: {
	                      max: 2000,
	                      message: '评级结果长度不能大于2000'
	                  }
	              }
	          },
	      	  note: {
	              validators: {
	            	  stringLength: {
	                      max: 2000,
	                      message: '其他长度不能大于2000'
	                  }
	              }
	          },
	      	  loanCardNo: {
	              validators: {
	            	  stringLength: {
	                      max: 16,
	                      message: '贷款卡号长度不能大于16'
	                  }
	              }
	          },
	      	  inquiryPassword: {
	              validators: {
	            	  stringLength: {
	                      max: 16,
	                      message: '查询密码长度不能大于16'
	                  }
	              }
	          },
	      	  summaryOfCreditReport: {
	              validators: {
	            	  stringLength: {
	                      max: 2000,
	                      message: '征信报告内容小结长度不能大于2000'
	                  }
	              }
	          },
	      	  otherChannelInfo: {
	              validators: {
	            	  stringLength: {
	                      max: 2000,
	                      message: '其他渠道信息长度不能大于2000'
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

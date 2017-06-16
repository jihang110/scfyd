

$(document).ready(function() {
	initTable2(); 
	initTable3(); 
	ajaxRelaCorps();
	
	formValidator2();
	formValidator3();
	//modal绑定事件
	$('#addModal2').on('hidden.bs.modal', function(){
		$("#addForm2")[0].reset();
		$("#addForm2").data('bootstrapValidator').resetForm();
		$("#field2").attr("disabled",false); 
		$("#btn_save2").css('display',''); 
	});
	$('#addModal3').on('hidden.bs.modal', function(){
		$("#addForm3")[0].reset();
		$("#addForm3").data('bootstrapValidator').resetForm();
		$("#field3").attr("disabled",false); 
		$("#btn_save3").css('display',''); 
	});
	$('#addModal2').on('hide.bs.modal', function () {
		window.parent.scrollTo(0,0);
		$("#addForm2").data('bootstrapValidator').resetForm();
	});
	$('#addModal3').on('hide.bs.modal', function () {
		window.parent.scrollTo(0,0);
		$("#addForm3").data('bootstrapValidator').resetForm();
	});
	loadDate();
	
} );

function loadDate(){
	 var initDate = new Date();
	 $('#operYear').val(initDate.getFullYear());
	$('#operYear').datetimepicker({
		language: 'zh-CN',
		autoclose: true,
		todayHighlight: true,
		format: 'yyyy',
		startView: 4,
        minView: 4,
		todayBtn: true,
		initialDate : new Date() ,
		pickerPosition: "bottom-left"
	});
}

window.operateEvents = {
		'click .modify': function (e, value, row, index) {
				modFun(row,2);
		},
	    'click .remove': function (e, value, row, index) {
	    	bootbox.confirm("确定删除此条记录?", function(result) {  
	            if (result) {
	            	var options = {
	    					url : '../../negativeInfoUpload/delete',
	    					data : '{"negUpId":"'+row.negUpId+'"}',
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

function checknum(obj){
	if (isNaN(obj.value)) {  
        obj.value = "";  
    }  
    if (obj != null) {  
        if (obj.value.toString().split(".").length > 1 && obj.value.toString().split(".")[1].length > 2) {  
//            alert("小数点后多于两位！");  
            obj.value = "";  
        }  
    }  
}

//平均流动资产	 流动资产合计 

function searchFun() {
	initTable2();
	initTable3();
}

 

function initTable2() { 
	$('#userListTable2').bootstrapTable('destroy');  
	$("#userListTable2").bootstrapTable({  
        method: "post", 
        url: "../../negativeInfoUpload/list", 
        toolbar: '#toolbar2',
        striped: true,  //表格显示条纹  
        pagination: true, //启动分页  
        pageSize: 5,  //每页显示的记录数  
        pageNumber:1, //当前第几页  
        pageList: [5, 10, 15, 20, 25],  //记录数可选列表  
        search: false,  //是否启用查询  
        showColumns: false,  //显示下拉框勾选要显示的列  
        showRefresh: false,  //显示刷新按钮  
        sidePagination: "server", //表示服务端请求  
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
	        field: 'negUpId',
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
	        field: 'negativeInfoSource',
	        title: '负面信息来源',
	        align: 'center',
           valign: 'middle'
	    }, {
	        field: 'negativeInfoSummary',
	        title: '小结',
	        align: 'center',
           valign: 'middle'
	    },{
	        field: 'mainSiteNegativeInfoPic',
	        title: '截屏图片预览',
	        align: 'center',
	        valign: 'middle',
	        formatter:function(value,row,index){
	            var s = '<a href="'+row.mainSiteNegativeInfoPic+'"><img src="'+row.mainSiteNegativeInfoPic+'" width="50"/></a>';
	            return s;
	        },
	    },{
	        field: 'webAddr',
	        title: '主要网站',
	        align: 'center',
           valign: 'middle'
	    },{
	        field: 'operation',
	        title: '操作',
 	        align: 'center',
            valign: 'middle',
	        formatter:function(value,row,index){
	            var s = '<a class = "fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
	            var r = '<a class = "fa fa-trash-o remove" style="color:#fa8564;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
	            return s+' '+r;
	        },
	        events: 'operateEvents'
	    }]
      });
      
}

function initTable3() { 
	$('#userListTable3').bootstrapTable('destroy');  
    $("#userListTable3").bootstrapTable({  
         method: "post", 
         url: "../../debtVerificationAnalysis/list", 
         toolbar: '#toolbar3',
         striped: true,  //表格显示条纹  
         pagination: true, //启动分页  
         pageSize: 5,  //每页显示的记录数  
         pageNumber:1, //当前第几页  
         pageList: [5, 10, 15, 20, 25],  //记录数可选列表  
         search: false,  //是否启用查询  
         showColumns: false,  //显示下拉框勾选要显示的列  
         showRefresh: false,  //显示刷新按钮  
         sidePagination: "server", //表示服务端请求  
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
 	        field: 'debtVaId',
 	        title: 'Item ID',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    }, {
 	        field: 'operYear',
 	        title: '年份',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'rigidDebtAnalysis',
 	        title: '刚性负债分析',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	    	field: 'implicitDebtAnalysis',
 	    	title: '隐性负债分析',
 	    	align: 'center',
 	    	valign: 'middle'
 	    },{
 	        field: 'corpName',
 	        title: '企业名称',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	        field: 'comprehensiveEvaluation',
 	        title: '综合评价',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	        field: 'operation',
 	        title: '操作',
 	        align: 'center',
            valign: 'middle',
	        formatter:function(value,row,index){
	            var s = '<a class = "fa fa-edit modify" style="color:#d864fd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
	            return s;
	        },
 	        events: 'operateEvents'
 	    }]
       });
}

function addPicFun() {
	$("#corpId").attr("disabled",false);
	$("#addModalLabel2").text("添加");
    $('#addModal2').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
    $('#isEdit2').val(1); //添加1；修改2
}

function addNoteFun() {
	$("#corpId3").attr("disabled",false);
	$("#addModalLabel3").text("添加");
    $('#addModal3').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
    $('#isEdit3').val(1); //添加1；修改2
}


function modFun(row,isEdit) {
		if(row.hasOwnProperty('debtVaId')){
			$("#corpId3").attr("disabled",true);
			$("#addModalLabel3").text("修改");
			$("#addModalLabel3").text("修改");
			$('#isEdit3').val(isEdit); //添加1;修改2;详情0
		    $('#addModal3').modal();
		    CloudUtils.setForm(row,'addForm3');
		    if(row.operYear!=null&&row.operYear!=''){
		    	$("#operYear").val( dateFormat(row.operYear, 'yyyy'));
		    }
		}
		else if(row.hasOwnProperty('negUpId')){
			$("#corpId").attr("disabled",true);
			$("#addModalLabel2").text("修改");
			$("#addModalLabel2").text("修改");
			$('#isEdit2').val(isEdit); //添加1;修改2;详情0
		    $('#addModal2').modal();
		    CloudUtils.setForm(row,'addForm2');
		}
	
}

function saveUser(number) {
	
	$('#addForm2').data('bootstrapValidator').validate();
	$('#addForm3').data('bootstrapValidator').validate();
	if(!$('#addForm2').data('bootstrapValidator').isValid()){  
		 	return;
    }else if(!$('#addForm3').data('bootstrapValidator').isValid()){  
		 	return;
    }else{
    	var modal = $('#addModal');
		var data = CloudUtils.convertStringJson('addForm');
		var isEdit =  $('#isEdit').val(); 
		var addUrl = '../../negativeInfo/add';
		var modUrl = '../../negativeInfo/mod';
    	if(number==2){
    		modal = $('#addModal2');
    		data = CloudUtils.convertStringJson('addForm2');
    		isEdit =  $('#isEdit2').val(); 
    		addUrl = '../../negativeInfoUpload/add';
    		modUrl = '../../negativeInfoUpload/mod';
    	}else if(number==3){
    		modal = $('#addModal3');
    		data = CloudUtils.convertStringJson('addForm3');
    		isEdit =  $('#isEdit3').val(); 
    		addUrl = '../../debtVerificationAnalysis/add';
    		modUrl = '../../debtVerificationAnalysis/mod';
    	}
		
		if(isEdit == 1){//添加1；修改2
			var options = {
					url : addUrl,
					data : data,
					callBackFun : function(data) {
						if(data.result==0){
							searchFun();
							bootbox.alert(data.resultNote);
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
					url : modUrl,
					data : data,
					callBackFun : function(data) {
						if(data.result==0){
							searchFun();
							bootbox.alert(data.resultNote);
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
		modal.modal("hide");
    	window.parent.scrollTo(0,0);
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
	                $("#mainSiteNegativeInfoPic").val( data.fileUrl); 
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

function  ajaxRelaCorps(){
	var relaCorpId = store.get('corpId');
	var options = {
			url : '../../corp/list',
			data : '{"relaCorpId":"'+relaCorpId+'","isPage": 0}',
			callBackFun : function(data) {
				if(data.result==0){
					$("#s_corpName").html('');
					$("#corpId").html('');
					$("#corpId3").html('');
					$("#s_corpId").append("<option value=''>全部</option>");
					$.each(data.dataList, function (index, units) {
						$("#s_corpId").append("<option value="+units.corpId+">" + units.corpName + "</option>");
						$("#s_corpName").append("<option value="+units.corpName+">" + units.corpName + "</option>");
						$("#corpId").append("<option value="+units.corpId+">" + units.corpName + "</option>");
						$("#corpId3").append("<option value="+units.corpId+">" + units.corpName + "</option>");
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

//form验证规则
function formValidator2(){
	$('#addForm2').bootstrapValidator({
	      message: 'This value is not valid',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	          corpName: {
	              validators: {
	                  notEmpty: {
	                      message: '企业不能为空'
	                  }
	              }
	          },
	          negativeInfoSource: {
		        	 validators: {
							stringLength: {
			                      min: 1,
			                      max: 512,
			                      message: '长度为1-512'
			                  }
						}	        	 
		      },
	          webAddr: {
		        	 validators: {
							stringLength: {
			                      min: 1,
			                      max: 512,
			                      message: '长度为1-512'
			                  }
						}	        	 
		      },
	          negativeInfoSummary: {
		        	 validators: {
							stringLength: {
			                      min: 1,
			                      max: 2000,
			                      message: '长度为1-2000'
			                  }
						}	        	 
		      }
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
			
		});	
}
function formValidator3(){
	$('#addForm3').bootstrapValidator({
	      message: 'This value is not valid',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	    	  corpName: {
	              validators: {
	                  notEmpty: {
	                      message: '企业不能为空'
	                  }
	              }
	          },
	          rigidDebtAnalysis: {
		        	 validators: {
							stringLength: {
			                      min: 1,
			                      max: 2000,
			                      message: '长度为1-2000'
			                  }
						}	        	 
		      },
	          implicitDebtAnalysis: {
		        	 validators: {
							stringLength: {
			                      min: 1,
			                      max: 2000,
			                      message: '长度为1-2000'
			                  }
						}	        	 
		      },
	          comprehensiveEvaluation: {
		        	 validators: {
							stringLength: {
			                      min: 1,
			                      max: 2000,
			                      message: '长度为1-2000'
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


var isReview;//0:再申请,1:审批

$(document).ready(function() {
	$("form").attr("autocomplete","off");
	if (taskDefKey == 'usertask1') {
		isReview = '0';
	} else {
		isReview = '1';
	}
	//modal绑定事件
	$('#addModal').on('hidden.bs.modal', function(){
		$("#addForm")[0].reset();
	});
	$('#addModal').on('hide.bs.modal', function () {
		$("#addForm").data('bootstrapValidator').resetForm();
	})
	initTable();
	formValidator();
	setForm();
	// 金额项目千分位符表示 
	numFormat();
	if (isReview == '1') {
		$("#noteForm").find('textarea').attr('disabled', true);
		$("#btn_add").hide();
	}
} );

function setForm(){
	var data = {};
	data.taskId = taskId;
	var options = {
		url : '../../activiti/getTaskDataByTaskId',
		data : JSON.stringify(data),
		callBackFun : function(data) {
			if (data.result == 0) {
				var jsonData =  eval("(" + data.str + ")");
				CloudUtils.setForm(jsonData, "noteForm");
				var agencyListInfo = jsonData.agencyListInfo;
				if (agencyListInfo != null && agencyListInfo != '') {
					$.each(JSON.parse(agencyListInfo), function(i, row) {
						$("#agencyListTable").bootstrapTable('append', row);
					});
				}
			} else {
				return false;
			}
		},
		errorCallback : function(data) {
			bootbox.alert(data.resultNote);
			return false;
		}
	};
	CloudUtils.ajax(options);
}

window.operateEvents = {
		'click .modify': function (e, value, row, index) {
			modify(row, index);
		},
		
		'click .remove': function (e, value, row, index) {
			$("#agencyListTable").bootstrapTable("remove", {
				field: "agencyNum",
				values: [row.agencyNum]
			});
		},
		
		'click .detail': function (e, value, row, index) {
			detail(row);
		},
};

function initTable() { 
	$('#agencyListTable')
	.bootstrapTable('destroy')
	.bootstrapTable({  
         method: "post", 
         url: "", 
         striped: false,  //表格显示条纹  
         pagination: false, //启动分页  
         search: false,  //是否启用查询  
         showColumns: false,  //显示下拉框勾选要显示的列  
         showRefresh: false,  //显示刷新按钮  
         sidePagination: "server", //表示服务端请求  
         //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
         //设置为limit可以获取limit, offset, search, sort, order  
         queryParamsType : "undefined",   
         queryParams: function queryParams(params) {   //设置查询参数  
        	 return null;
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
 	        field: 'corpName',
 	        title: '经销商名称',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'agencyNum',
 	        title: '经销商代码',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	        field: 'maxCreditAmount',
 	        title: '最高授信额度',
 	        align: 'center',
            valign: 'middle',
            formatter: function(value,row,index){
 	            return $.number(value, 2);
 	        }
 	    }, {
 	        field: 'officeAddress',
 	        title: '公司地址',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'contactInfo',
 	        title: '联系方式',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'fixedPhone',
 	        title: '固定电话',
 	        align: 'center',
            valign: 'middle'
 	    }, {
 	        field: 'area',
 	        title: '所属区域',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    }, {
 	        field: 'represent',
 	        title: '所属商代处',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    }, {
 	        field: 'firstTwoYearsPickupNum',
 	        title: '前2年度提车数量',
 	        align: 'center',
            valign: 'middle',
            visible: false,
            formatter: function(value,row,index){
 	            return $.number(value, 0);
 	        }
 	    }, {
 	        field: 'firstTwoYearsRetailNum',
 	        title: '前2年度零售数量',
 	        align: 'center',
            valign: 'middle',
            visible: false,
            formatter: function(value,row,index){
 	            return $.number(value, 0);
 	        }
 	    }, {
 	        field: 'firstTwoYearsSaleRank',
 	        title: '前2年度销售排名',
 	        align: 'center',
            valign: 'middle',
            visible: false,
            formatter: function(value,row,index){
 	            return $.number(value, 0);
 	        }
 	    }, {
 	        field: 'thisYearPlanPickupNum',
 	        title: '本年度计划提车数量',
 	        align: 'center',
            valign: 'middle',
            visible: false,
            formatter: function(value,row,index){
 	            return $.number(value, 0);
 	        }
 	    }, {
 	        field: 'thisYearPlanSales',
 	        title: '本年度计划销售额',
 	        align: 'center',
            valign: 'middle',
            visible: false,
            formatter: function(value,row,index){
 	            return $.number(value, 2);
 	        }
 	    }, {
 	        field: 'note',
 	        title: '备注',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    }, {
 	        field: 'operation',
 	        title: '操作',
 	        align: 'center',
            valign: 'middle',
 	        formatter:function(value,row,index){
 	        	var s = '<a class = "fa fa-edit modify" style="color:#278bdd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
				var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
 	            var d = '<a class = "fa fa-list-ul detail" style="color:#278bdd;padding:0px 5px;" title="详情" href="javascript:void(0)"></a>';
 	            if (isReview == '1') {
 	            	return d;
 	            } else {
 	            	return s + ' ' + r + ' ' + d;
 	            }
 	        },
 	        events: 'operateEvents'
 	    }]
       });
}

function add(){
	$("#represent").empty();
	$('#isEdit').val("0"); //新增0；修改1
	$("#addForm").find('input,select').attr("disabled", false);
	$("#btn_blank").removeClass('col-sm-7').addClass('col-sm-4');
	$("#btn_save").show();
    $('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
}

function detail(row) {
	changeArea(row.area);
	CloudUtils.setForm(row, "addForm");
	$("#addForm").find('input,select').attr("disabled", true);
	$("#btn_save").hide();
	$("#btn_blank").removeClass('col-sm-4').addClass('col-sm-7');
	$("#addModal").modal({backdrop: 'static', keyboard: false});
}

function modify(row, index) {
	changeArea(row.area);
	CloudUtils.setForm(row, "addForm");
	$('#isEdit').val("1"); //新增0；修改1
	$('#index').val(index);
	$("#addForm").find('input,select').attr("disabled", false);
	$("#btn_blank").removeClass('col-sm-7').addClass('col-sm-4');
	$("#btn_save").show();
	$("#addModal").modal({backdrop: 'static', keyboard: false});
}

function changeArea(areaVal) {
	$("#represent").empty();
	if (areaVal == '0') {
		$("#represent").append("<option value='0'>南京</option>")
						.append("<option value='1'>上海</option>");
	} else if (areaVal == '1') {
		$("#represent").append("<option value='2'>西安</option>")
						.append("<option value='3'>成都</option>");
	} else if (areaVal == '2') {
		$("#represent").append("<option value='4'>广州</option>")
						.append("<option value='5'>武汉</option>")
						.append("<option value='6'>郑州</option>");
	} else if (areaVal == '3') {
		$("#represent").append("<option value='7'>北京</option>")
						.append("<option value='8'>沈阳</option>")
						.append("<option value='9'>济南</option>");
	}
}

function addAgency() {
	var isEdit = $('#isEdit').val(); //新增0；修改1
	var index = $("#index").val();
	var data = CloudUtils.convertStringJson("addForm");
	if (isEdit == '0') {
		$("#agencyListTable").bootstrapTable('append', JSON.parse(data));
	} else {
		$("#agencyListTable").bootstrapTable('updateRow', {
			index: index,
			row: JSON.parse(data)
		});
	}
	$('#addModal').modal('hide');
}

function reapply() {
	saveFun();
}

function saveFun() {
	var data = CloudUtils.convertAllJson('noteForm');
	var agencyListData = $("#agencyListTable").bootstrapTable('getData');
	var url
	
	data = eval("(" + data + ")");
	data.taskId = taskId;
	data.procInstId = procInstId;
	data.agencyListInfo = JSON.stringify(agencyListData);
	if (isReview == '0') {
		url = "../../agency/reApply";
	} else {
		url = "../../agency/doAgree";
		data.agree = $("#agree").val();
		data.advice = $("#advice").val();
	}
	
	var options = {
		url : url,
		data : JSON.stringify(data),
		callBackFun : function(data) {
			if(data.result==0){
				bootbox.alert(data.resultNote, function() {
					window.location.href = '../../project/agencyTask/agencyTask.html';
				});
			}else{
				bootbox.alert(data.resultNote);
				return false;
			}
		},
		errorCallback : function(data) {
			bootbox.alert(data.resultNote);
			return false;
		}
	};
	CloudUtils.ajax(options);
}

/**
 * 金额项目千分位符表示
 */
function numFormat(){
	$("input[name='maxCreditAmount']").number(true, 2);
	$("input[name='firstTwoYearsPickupNum']").number(true, 0);
	$("input[name='firstTwoYearsRetailNum']").number(true, 0);
	$("input[name='firstTwoYearsSaleRank']").number(true, 0);
	$('input[name="thisYearPlanPickupNum"]').number(true, 0);
	$('input[name="thisYearPlanSales"]').number(true, 2);
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
	    	  realname: {
	              validators: {
	                  notEmpty: {
	                      message: '真实姓名不能为空'
	                  },
	                  stringLength: {
	                      min: 1,
	                      max: 10,
	                      message: '用户名长度为1-10'
	                  }
	              }
	          },
	          email: {
	              validators: {
	            	  stringLength: {
			              max: 32,
			              message: '邮箱长度不能超过32'
			          },
	            	  regexp: {
	                      regexp: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
	                      message: '邮箱格式不正确'
	                  }
	              }
	          },
	          mobilephone: {
	              validators: {
	                  notEmpty: {
	                      message: '手机号不能为空'
	                  },
			          stringLength: {
			              min: 11,
			              max: 11,
			              message: '手机号长度为11'
			          },
			          regexp: {
	                      regexp: /^[0-9]*$/,
	                      message: '手机号只能是数字'
	                  }
	              }
	          },
	          roleId: {
	              validators: {
	                  notEmpty: {
	                      message: '角色不能为空'
	                  }
	              }
	          },
	          fixedPhone: {
	              validators: {
	            	  stringLength: {
			              max: 20,
			              message: '固定电话长度不能超过20'
			          },
	              }
	          },
	          note: {
	              validators: {
	            	  stringLength: {
			              max: 128,
			              message: '用户描述长度不能超过128'
			          },
	              }
	          },
	          username: {
	              message: '用户名格式不正确',
	              validators: {
	                  notEmpty: {
	                      message: '用户名不能为空'
	                  },
	                  stringLength: {
	                      min: 3,
	                      max: 20,
	                      message: '用户名长度为3-20'
	                  },
	                  regexp: {
	                      regexp: /^[a-zA-Z0-9_\.]+$/,
	                      message: '只能使用字母、数字、.和_'
	                  },
	                  different: {
	                      field: 'password',
	                      message: '用户名不能和密码相同'
	                  }
	              }
	          }
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
		});	
}
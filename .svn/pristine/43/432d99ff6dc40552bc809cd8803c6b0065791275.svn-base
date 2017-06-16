$(document).ready(function() {
	$("form").attr("autocomplete","off");
	CloudUtils.getMenuNames("nav");
	formValidator();
	
	//modal绑定事件
	$('#addModal').on('hidden.bs.modal', function(){
		$("#addForm").bootstrapValidator('resetForm', true);
		$("#addForm")[0].reset();
		window.parent.scrollTo(0,0);
	});
	$('#addModal').on('hide.bs.modal', function () {
		$("#addForm").data('bootstrapValidator').resetForm();
	})
	initTable();
	// 金额项目千分位符表示 
	numFormat();
} );

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
         striped: true,  //表格显示条纹  
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
 	            return s + ' ' + r + ' ' + d;
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
	var val = $("#area option:selected").val();
	if(val ==""){
		$("#area_div").append('<i class="form-control-feedback glyphicon glyphicon-remove" data-bv-icon-for="area"></i>');
	}else{
		$("#area_div").find('i').remove('i');
	}
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
    window.parent.scrollTo(0,0);
}

function apply() {
	var data = CloudUtils.convertStringJson('noteForm');
	var jsonData = eval("(" + data + ")");
	var agencyListData = $("#agencyListTable").bootstrapTable('getData');
	jsonData.agencyListInfo = JSON.stringify(agencyListData);
	
	var options = {
			url : '../../agency/apply',
			data : JSON.stringify(jsonData),
			callBackFun : function(data) {
				if(data.result==0){
					bootbox.alert(data.resultNote, function() {
						window.location.href = '../../project/dykManager/agencyManager.html';
					});
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
	    	  corpName: {
	              validators: {
	                  notEmpty: {
	                      message: '经销商名称不能为空'
	                  }
	              }
	          },
	          agencyNum: {
	              validators: {
	            	  notEmpty: {
	                      message: '经销商代码不能为空'
	                  },
	              }
	          },
	          maxCreditAmount: {
	              validators: {
	                  notEmpty: {
	                      message: '最高授信额度不能为空'
	                  },
	              }
	          },
	          officeAddress: {
	              validators: {
	                  notEmpty: {
	                      message: '公司地址不能为空'
	                  }
	              }
	          },
	          contactInfo: {
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
	          fixedPhone: {
	              validators: {
	            	  stringLength: {
			              max: 20,
			              message: '固定电话长度不能超过20'
			          },
	              }
	          },
	          area: {
	              validators: {
	                  notEmpty: {
	                      message: '所属区域不能为空'
	                  }
	              }
	          },
	          firstTwoYearsPickupNum: {
	              validators: {
	                  notEmpty: {
	                      message: '前2年度提车数量不能为空'
	                  },
	              }
	          },
	          firstTwoYearsRetailNum: {
	              validators: {
	                  notEmpty: {
	                      message: '前2年度零售数量不能为空'
	                  },
	              }
	          },
	          firstTwoYearsSaleRank: {
	              validators: {
	                  notEmpty: {
	                      message: '前2年度销售排名不能为空'
	                  },
	              }
	          },
	          thisYearPlanPickupNum: {
	              validators: {
	                  notEmpty: {
	                      message: '本年度计划提车数量不能为空'
	                  },
	              }
	          },
	          thisYearPlanSales: {
	              validators: {
	                  notEmpty: {
	                      message: '本年度计划销售额不能为空'
	                  },
	              }
	          },
	          note: {
	              validators: {
	            	  notEmpty: {
	                      message: '备注不能为空'
	                  },
	            	  stringLength: {
			              max: 128,
			              message: '用户描述长度不能超过128'
			          },
	              }
	          }
	      }
		})
		.on('success.form.bv', function (e) {
			e.preventDefault();
			addAgency();
			$(e.target).bootstrapValidator('resetForm', true);e.preventDefault();
		});	
}
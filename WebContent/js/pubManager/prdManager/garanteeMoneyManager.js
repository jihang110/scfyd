$(document).ready(function() {
	$("form").attr("autocomplete","off");
	 CloudUtils.getMenuNames("nav");
	//modal绑定事件
	formValidator();
	$('#addModal').on('hidden.bs.modal', function() {
		$("#addForm").bootstrapValidator('resetForm', true);
		$("#addForm")[0].reset();
		window.parent.scrollTo(0,0);
	});
	initTable(); 
	//dataSearch();
	numFormat();
	ajaxRelaCorps("productId");
} );

window.operateEvents = {
		'click .detail': function (e, value, row, index) {
				detailFun(row);
	    },
		'click .modify': function (e, value, row, index) {
				modFun(row,2);
		},
	    'click .remove': function (e, value, row, index) {
	    	bootbox.confirm("确定删除此条记录?", function(result) {  
	            if (result) {
	            	var options = {
	    					url : '../../garantee/delete',
	    					data : '{"productId":"'+row.productId+'"}',
	    					callBackFun : function(data) {
	    						if(data.result==0){
	    							initTable();
	    							bootbox.alert(data.resultNote);
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


function addFun() {
	$("#btn_blank").removeClass('col-sm-7').addClass('col-sm-4');
	$("#addModalLabel").text("添加");
    $('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
    $('#isEdit').val(1); //新增1；修改2
	$('input').attr("readonly",false);
	$("#productId").attr("disabled",false);
}

function changeProduct(){
	var productName = $('#productId option:checked').text();
	$('#addForm #productName').val(productName);
}

function dataSearch(){
	var url = "../../product/list";
	var data = {'isPage':0};
	var options = {
		url : url,
		data : JSON.stringify(data),
		callBackFun : function(data) {
			if(data.result==0){
				fuzzySearch(data);
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

function  ajaxRelaCorps(Id1){
	var relaCorpId = store.get('productId');
	var options = {
			url : '../../product/list',
			data : '{"relaCorpId":"'+relaCorpId+'","isPage": 0}',
			callBackFun : function(data) {
				var control1 = $('#addForm #' + Id1);
	            $.each(data.dataList, function (index, units) {  
	            	control1.append("<option value="+units.productId+">" + units.productName + "</option>");
	            }); 
			},
			errorCallback:function(data){
				 alert("error");  
			}
	};
	CloudUtils.ajax(options);
}

function detailFun(row) {
	$('#detailModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
	CloudUtils.setForm(row,'detailForm');
    $("#detailForm input").attr("disabled",true);
}

function modFun(row,isEdit) {
	$("#productId").attr("disabled",true);
	$("#btn_blank").removeClass('col-sm-7').addClass('col-sm-4');
	if(isEdit==2){
		$("#addModalLabel").text("修改");
	}
	$('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
	$('#prdName').attr("readonly",true);
	$('#isEdit').val(isEdit); //新增1;修改2;详情0
    $('#addModal').modal();
    CloudUtils.setForm(row,'addForm');
}

function saveProduct() {
	var productId = $('#productId option:checked').val();
	var modal = $('#addModal');
	var data = CloudUtils.convertStringJson('addForm');
	var data = eval("(" + data + ")");
	data.productId = productId;
	data = JSON.stringify(data);
	var isEdit =  $('#isEdit').val(); 
	if(isEdit == 1){//新增1；修改2
		var options = {
				url : '../../garantee/add',
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
				url : '../../garantee/mod',
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

function initTable() { 
	$('#garanteeMoneyListTable').bootstrapTable('destroy');  
	$("#garanteeMoneyListTable").bootstrapTable({  
         method: "post", 
         url: "../../garantee/list", 
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
               isPage : 1,
               productName: jsonData.productName
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
 	        field: 'productId',
 	        title: '产品ID',
 	        align: 'center',
            valign: 'middle',
            visible: false
 	    }, {
 	        field: 'productName',
 	        title: '产品名称',
 	        align: 'center',
            valign: 'middle'
 	    },{
 	        field: 'guaranteeMoneyRate',
 	        title: '保证金收取比例',
 	        align: 'center',
            valign: 'middle',
            formatter:function(value,row,index){
            	return $.number(value, 2);
            }
 	    },  {
 	        field: 'operation',
 	        title: '操作',
 	       align: 'center',
           valign: 'middle',
 	        formatter:function(value,row,index){
 	        	var d = '<a class = "fa fa-list-ul detail" style="color:#278bdd;padding:0px 5px;" title="详情"  href="javascript:void(0)"></a>';
 	            var s = '<a class = "fa fa-edit modify" style="color:#278bdd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
 	            var r = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
 	            return d+' '+s+' '+r;
 	        },
 	        events: 'operateEvents'
 	    }]
       });  
}


//form验证规则
function formValidator(){
	$('#addForm').bootstrapValidator({
	      message: 'This value is not valid',
	      excluded: ':disabled',
	      feedbackIcons: {
	          valid: 'glyphicon glyphicon-ok',
	          invalid: 'glyphicon glyphicon-remove',
	          validating: 'glyphicon glyphicon-refresh'
	      },
	      fields: {
	          guaranteeMoneyRate: {
	              validators: {
	                  notEmpty: {message: '保证金收取比例不能为空'},
	                  numeric: {message: '只能输入数字'},
	                  callback: {  
	                        message: '保证金收取比例在0.00~100.00之间',  
	      						callback: function(value, validator) { 
	      						return parseFloat(value)>= 0&&parseFloat(value)<=100;
	                        }  
	                    } 
	              }
	          }
	      }
		}).on('success.form.bv', function (e) {
			e.preventDefault();
			saveProduct();
			$(e.target).bootstrapValidator('resetForm', true);
		    
		});
}

function numFormat(){
	$("#guaranteeMoneyRate").number(true, 2);
	
}

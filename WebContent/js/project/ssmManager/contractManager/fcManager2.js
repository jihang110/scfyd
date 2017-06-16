$(document).ready(function() {
	$("form").attr("autocomplete","off");
	 dateload();
	 initTable();
	 initFileTable();
	
} );


window.operateEvents = {
	    'click .remove': function (e, value, row, index) {
	    	bootbox.confirm("确定删除此条记录?", function(result) {  
	            if (result) {
	            	var values = [];
			    	values.push(row.fileUrl);
	            	$("#fileListTable").bootstrapTable("remove", {field: 'fileUrl', values: values});
	            } 
	    	 });
	    },
	    'click .modify': function (e, value, row, index) {
			modFun(row);
	    },
		
	};




function initTable(){
	 
	$('#repayInfoListTable').bootstrapTable('destroy');  
	$("#repayInfoListTable").bootstrapTable({  
         method: "post", 
         url:  '../../../contract/list',
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
        	 
        	 var param = {    
        			 
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
 	        field: 'signDate',
 	        title: '签约日期',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'contractValDate',
 	        title: '合同生效日期',
 	        align: 'center',
             valign: 'middle'
 	    },{
 	        field: 'contractDueDate',
 	        title: '合同到期日期',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'contractType',
 	        title: '合同类型',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'fileNum',
 	        title: '附件数',
 	        align: 'center',
             valign: 'middle'
 	    },{
 	        field: 'operation',
 	        title: '操作',
 	       align: 'center',
           valign: 'middle',
 	        formatter:function(value,row,index){
 	            var d = '<a class = "fa fa-list-ul modify" style="color:#278bdd;padding:0px 5px;" title="详情" href="javascript:void(0)"></a>';
 	            return d;
 	        },
 	        events: 'operateEvents'
 	    }]
       });  

}


function initFileTable(contractNo){
	 
	$('#fileListTable').bootstrapTable('destroy');  
	$("#fileListTable").bootstrapTable({  
         method: "post", 
         url:  '../../../contract/fileList', 
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
        	 var param = {    
        			 contractNo:contractNo	 
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
 	        field: 'fileName',
 	        title: '文件名称',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'fileType',
 	        title: '文件类型',
 	        align: 'center',
             valign: 'middle'
 	    },{
 	        field: 'fileSize',
 	        title: '文件大小',
 	        align: 'center',
             valign: 'middle'
 	    },{
 	        field: 'operation',
 	        title: '操作',
 	       align: 'center',
           valign: 'middle',
 	        formatter:function(value,row,index){
 	        	var d = '<a class = "fa fa-trash-o remove" style="color:#278bdd;padding:0px 5px;" title="删除" href="javascript:void(0)"></a>';
 	            return d;
 	        },
 	        events: 'operateEvents'
 	    }]
       });  

}


function ajaxFileUpload(obj) {
	
	if ($(obj).val().length > 0) {
		$.ajaxFileUpload({
	        url : '../../../file/binUpload?pathId=2',
	        secureuri : false,
	        fileElementId : $(obj).attr("id"),
	        dataType : 'json',
	        success : function(data, status) {
	        	debugger;
	            if (data.result == 0) {
	            	$("#fileListTable").bootstrapTable("append", data);
	            	debugger;
	            	var num= $("#fileNum").val();
	            	if(num==""){
	            		num=0;
	            	}
	            	var fileNum = parseInt(num);
	            	$("#fileNum").val(fileNum+1);
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
};


function dateload(){
	 $('#contractValDate').datetimepicker({
      language: 'zh-CN',
      autoclose: 1,
      todayBtn: true,// 显示今天时间
      pickerPosition: "bottom-left",
      minuteStep: 5,
      format: 'yyyy-mm-dd',
      minView: 'month'　　　　// 日期时间选择器所能够提供的最精确的时间选择视图。
     });
	 $('#contractDueDate').datetimepicker({
	      language: 'zh-CN',
	      autoclose: 1,
	      todayBtn: true,// 显示今天时间
	      pickerPosition: "bottom-left",
	      minuteStep: 5,
	      format: 'yyyy-mm-dd',
	      minView: 'month'　　　　// 日期时间选择器所能够提供的最精确的时间选择视图。
	     });
	 $('#signDate').datetimepicker({
	      language: 'zh-CN',
	      autoclose: 1,
	      todayBtn: true,// 显示今天时间
	      initialDate: new Date(),//初始化当前日期
	      pickerPosition: "bottom-left",
	      minuteStep: 5,
	      format: 'yyyy-mm-dd',
	      minView: 'month'　　　　// 日期时间选择器所能够提供的最精确的时间选择视图。
	     });
	 
	 $('#signDate').datetimepicker('setStartDate', new Date());
	 
	 
}

function save(){
	var allTableData = $("#fileListTable").bootstrapTable('getData');
	$("#fileInfo").val(JSON.stringify(allTableData));
 	var data = CloudUtils.convertStringJson('addForm');
 	data = eval("(" + data + ")");
	data = JSON.stringify(data);
	if($('#isEdit').val()==1){
		var options = {
				url : '../../../contract/add',
				data : data,
				callBackFun : function(data) {
					if(data.result==0){
					
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
	}else{
		var options = {
				url : '../../../contract/mod',
				data : data,
				callBackFun : function(data) {
					if(data.result==0){
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
	
}


function modFun(row) {
	$("#addModalLabel").text("修改");
	initFileTable(row.contractNo);
    $('#addModal').modal();
    $('#isEdit').val(2); //新增1；修改2
//    $("#contractValDate").attr("disabled", true);
//    $("#contractDueDate").attr("disabled", true);
    CloudUtils.setForm(row,'addForm');

}

function addFun() {
	$("#addModalLabel").text("添加");
	initFileTable("1");
    $('#addModal').modal({backdrop: 'static', keyboard: false});//防止点击空白/ESC 关闭
    $('#isEdit').val(1); //新增1；修改2
    $("#contractValDate").attr("disabled", false);
    $("#contractValDate").val("");
    $("#contractDueDate").attr("disabled", false);
    $("#contractDueDate").val("");
    $("#fileNum").val("");
    $("#signDate").val("");
}


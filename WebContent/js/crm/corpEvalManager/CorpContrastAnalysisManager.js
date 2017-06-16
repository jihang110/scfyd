var canExp = true;
$(document).ready(function() {
	ajaxRelaCorps("txt_corpId","corpId");
	loadDate();
});


window.operateEvents = {
		'click .mod': function (e, value, row, index) {
				modFun(row);
		    }
	};

function expFun() {
	if(!canExp){
		bootbox.alert("记录超过五万条，请联系管理人员导出。");
	}else{
		var data = CloudUtils.convertStringJson('searchForm');
		var jsonData = eval("(" + data + ")");
		var param = {    
				corpId: jsonData.txt_corpId,
				operYear:jsonData.txt_operYear
		};    
		var options = {
				url : '../../corpContrastAnalysisExcel/export',
				data :  JSON.stringify(param),
				callBackFun : function(data) {
					if(data.result==0){
						var str = data.excelPath;     
						window.location.href   =   str;   
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
}


function initTable() { 
	$('#corpConditionList').bootstrapTable('destroy');  
	$("#corpConditionList").bootstrapTable({  
         method: "post", 
         url: "../../corpContrastAnalysis/list", 
         striped: false,  // 表格显示条纹
         pagination: false, // 启动分页
         pageSize: 5,  // 每页显示的记录数
         pageNumber:1, // 当前第几页
         pageList: [5, 10, 15, 20, 25],  // 记录数可选列表
         search: false,  // 是否启用查询
         showColumns: false,  // 显示下拉框勾选要显示的列
         showRefresh: false,  // 显示刷新按钮
         sidePagination: "server", // 表示服务端请求
         // 设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
         // 设置为limit可以获取limit, offset, search, sort, order
         queryParamsType : "undefined",   
         queryParams: function queryParams(params) {   // 设置查询参数
           var data = CloudUtils.convertStringJson('searchForm');
           var jsonData = eval("(" + data + ")");
           if(jsonData.txt_corpId ==""){
        	   jsonData.txt_corpId = null;
           }
           var param = {    
               corpId: jsonData.txt_corpId,
               operYear:jsonData.txt_operYear
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
        	 field: 'analysisName',
  	         title: '项目名称',
  	         align: 'center',
             valign: 'middle'
         }, {
        	 field: 'lastYear',
  	         title: "去年",
  	         align: 'center',
             valign: 'middle',
             formatter:function(value,row,index){
  	 	    	return $.number(value,2);
  		        }
         },
         {
        	 field: 'currentYear',
  	         title: '今年',
  	         align: 'center',
             valign: 'middle',
             formatter:function(value,row,index){
  	 	    	return $.number(value,2);
  		        }
         },{
        	 field: 'anlysisResult',
  	         title: '分析',
  	         align: 'center',
             valign: 'middle'
         },{
 	        field: 'operation',
 	        title: '编辑',
 	        align: 'center',
 	        formatter:function(value,row,index){
 	        	var m = '<a class = "fa fa-edit mod" style="color:#d864fd;padding:0px 5px;" title="编辑" href="javascript:void(0)"></a>';
	 	        return m;
 	        },
 	        events: 'operateEvents'
 	    }]
       });  
}

function searchFun() {
	initTable();
}

var analysisKey = null;
function modFun(row) {
	//$("#corpId").attr("disabled",true);
	$("#addModalLabel").text("修改");
	$("#contentLabel").html(row.analysisName+"对比分析");
	$("#content").val(row.anlysisResult);
	analysisKey = row.analysisKey;
    $('#addModal').modal();
}


function saveUser(){
	var content = $("#content").val();
	 var data = CloudUtils.convertStringJson('searchForm');
	 var jsonData = eval("(" + data + ")");
	var modal = $('#addModal');
	var data = CloudUtils.convertStringJson('addForm');
	var options = {
			url : '../../corpContrastAnalysis/add',
			data : '{"operYear": "'+jsonData.txt_operYear+'","corpId": "'+jsonData.txt_corpId+'","'+analysisKey+'": "'+content+'"}',
			callBackFun : function(data) {
				if(data.result==0){
					initTable();
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
	$('#addModal').modal("hide");
}




function  ajaxRelaCorps(Id1,Id2){
	var relaCorpId = store.get('corpId');
	var options = {
			url : '../../corp/list',
			data : '{"relaCorpId": "'+relaCorpId+'","isPage":0}',
			callBackFun : function(data) {
				var control1 = $('#' + Id1);
				var control2 = $('#' + Id2);
				if(data.result==0){
		            $.each(data.dataList, function (index, units) {  
		            	control1.append("<option value="+units.corpId+">" + units.corpName + "</option>"); 
		            	control2.append("<option value="+units.corpId+">" + units.corpName + "</option>");
		            });
				}else{
					bootbox.alert(data.resultNote);
					return false;
				}
	            $('#txt_corpId').selectOrDie({
			        placeholder: '企业名称'
			    });
			},
			errorCallback:function(data){
				bootbox.alert("error");
			}
	};
	CloudUtils.ajax(options);
}


function loadDate(){
	var initDate = new Date();
	$('#txt_operYear').val(initDate.getFullYear());
	$('#txt_operYear').datetimepicker({
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
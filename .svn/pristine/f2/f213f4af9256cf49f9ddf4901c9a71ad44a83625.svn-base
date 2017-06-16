$(function(){
	getVariableByTaskId();
});
function getVariableByTaskId(){
	var row = store.get('agencyRow');//从缓存中获取数据
	var taskId = row.taskId;
	 var options = {
				url : '../../activiti/findDataByTaskId',
				data : '{"taskId":"'+taskId+'"}',
				callBackFun : function(data) {
					if (data.result == 0) {
						 $("#taskInfoModal").modal();
						 var jsonData =  eval("(" + data.str + ")");
						 CloudUtils.setForm(jsonData,"detailHisForm");
						 custManage.initShareHolderTable(jsonData.shareInfoList);
						custManage.attachInfoTable(jsonData.attachInfoList);
					} else {
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
var custManage = new Object({
　　　　initShareHolderTable : function (data){
　　　　　　$('#shareHolderInfoTableHis').bootstrapTable('destroy');  
		$("#shareHolderInfoTableHis").bootstrapTable({  
		    method: "post", 
		    data : data, 
		    striped: false,  //表格显示条纹  
		    search: false,  //是否启用查询  
		    showColumns: false,  //显示下拉框勾选要显示的列  
		    showRefresh: false,  //显示刷新按钮  
		    sidePagination: "server", //表示服务端请求  
		    //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
		    //设置为limit可以获取limit, offset, search, sort, order  
		    queryParamsType : "undefined", 
		    responseHandler:function responseHandler(res) {
		   	 if (res.result==0) {
		       	 return {
		       		 "rows": res.dataList,
		       		 "total": res.records
		       	 };
		
		   	 } else {
		   		 alert(res.resultNote);
		   		 return {
				        	 "rows": [],
				        	 "total": 0
				        	 };
		   	 }
		    },
		    columns: [{
			        field: 'shareName',
			        title: '股东名称',
			        align: 'center',
		            valign: 'middle'
			    }, {
			        field: 'shareProportion',
			        title: '持股比例',
			        align: 'center',
		            valign: 'middle'
			    }, {
			        field: 'registeredCapital',
			        title: '注册资本份额',
			        align: 'center',
		            valign: 'middle'
			    }, {
			        field: 'registeredCapitalProportion',
			        title: '注册资本占比',
			        align: 'center',
		            valign: 'middle'
			    }]
		  });  
　　　　},
　　　　attachInfoTable : function (data){
	 $('#attachInfoTableHis').bootstrapTable('destroy'); 
		$("#attachInfoTableHis").bootstrapTable({  
			 method: "post", 
		     data : data, 
		     striped: false,  //表格显示条纹  
		     search: false,  //是否启用查询  
		     showColumns: false,  //显示下拉框勾选要显示的列  
		     showRefresh: false,  //显示刷新按钮  
		     sidePagination: "server", //表示服务端请求  
		     //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
		     //设置为limit可以获取limit, offset, search, sort, order  
		     queryParamsType : "undefined",    
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
	 	        field: 'fileUrl',
	 	        title: '附件地址',
	 	        align: 'center',
	            valign: 'middle',
	            visible: false
		 	}, {
	 	        field: 'fileName',
	 	        title: '附件名称',
	 	        align: 'center',
	            valign: 'middle',
	            formatter:function(value,row,index){
					 var s = '<a href="/../..'+row.fileUrl+'" download="'+value+'">'+value+'</a>';
			         return s;
		           
		        }
	 	    }, {
	 	        field: 'attachType',
	 	        title: '附件格式',
	 	        align: 'center',
	             valign: 'middle'
	 	    }, {
	 	        field: 'attachSize',
	 	        title: '附件大小',
	 	        align: 'center',
	             valign: 'middle'
	 	    }
	 	    ]
	       }); 
　　　　}
　　});


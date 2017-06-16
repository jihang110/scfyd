
$(function () {
	InitTable();
 });

function warningDetail(){
	  var param = {    
			  recUid:$("#recUid").val()
	       };       
	  var options = {
			url : '../../warning/detail',
			data : JSON.stringify(param) ,
			callBackFun : function(data) {
				if(data.result==0){
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


function InitTable(){
	$('#warningInfoList').bootstrapTable('destroy');  
	$("#warningInfoList").bootstrapTable({  
	     method: "post", 
	     url: "../../warning/list", 
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
	           pageNumber: params.pageNumber,    
	           pageSize: params.pageSize
	       };    
	       return JSON.stringify(param);                   
	     },  
	     responseHandler:function responseHandler(res) {
	    	 debugger
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
		        field: 'recUid',
		        title: '主键',
		        align: 'center',
	            valign: 'middle',
	            visible: false
		    },{
		        field: 'warnType',
		        title: '通知类型',
		        align: 'center',
	            valign: 'middle',
	            formatter:function(value){
	            	if(value=="1"){
	            		return "收息预警";
	            	}else if(value=="2"){
	            		return "融资逾期预警";
	            	}else if(value=="3"){
	            		return "订单逾期预警";
	            	}else if(value=="4"){
	            		return "融资承诺函";
	            	}else if(value=="5"){
	            		return "付款承诺函";
	            	}
	            }
		    },{
		        field: 'sendTime',
		        title: '发送时间',
		        align: 'center',
	            valign: 'middle'
		    }, {
		        field: 'warnStatus',
		        title: '通知状态',
		        align: 'center',
	            valign: 'middle',
	            formatter:function(value){
	            	if(value=="1"){
	            		return "已读";
	            	}else{
	            		return "未读";
	            	}
	            }
		    }, {
		        field: 'warnMsg',
		        title: '通知内容',
		        align: 'center',
	            valign: 'middle'
		    },{
	 	        field: 'operation',
	 	        title: '操作',
	 	        align: 'center',
	 	        formatter:function(value,row,index){
	 	        	var m = '<a class = "mod" style="color:#278bdd;padding:0px 5px;" title="查阅" href="javascript:void(0)">查阅</a>';
	 	        	return m;
	 	        },
	 	        events: 'operateEvents'
	 	    }]
	   });  
		window.operateEvents = {
			'click .mod': function (e, value, row, index) {
				  CloudUtils.setForm(row,'detailForm');
				  $('#detailModal').modal();
				  if(row.warnStatus=="1"){
					  $("#btn_detail").attr("disabled", true)
				  }else{
					  $("#btn_detail").attr("disabled", false)
				  }
				
			}
		};
}	
		

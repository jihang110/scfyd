 $(function() {
	 CloudUtils.getMenuNames("nav");
	 initTable();
 });
 
 window.operateEvents = {
			'click .detail': function (e, value, row, index) {
				detailFun(row,0);
				$.ajax({
					url:'../../stuInfo/detail',
					contentType: "application/json",
					type: 'post',
					cache:false,
					async: false,
					dataType:'json',
					timeout: 5000,
					data: '{"stuId":'+row.stuId+'}',
					error: function(result){bootbox.alert("error")},
					success: function(data){
						if(data.result==0){
							var i=1;
							var arr = data.dataList;	//获取集合
							for(index in arr){		//index初始值为0,自增数,直到arr遍历结束
								var str ='#img';
								str += i;				//img标签ID
								if(arr[index].stuFile){  //判断对应的记录是否存在附件
									$(str).show();		//附件存在就显示,不存在就隐藏缩略图
									$(str).attr('src',arr[index].stuFile); //给img标签的src属性赋值
								}else{
									$(str).hide();
								}
								i++;
							}
							$("img").click(function(){
								 window.open(this.src);
							});
						}else{
							bootbox.alert(data.resultNote);
							return false;
						}
					}
					
				});
		    }
 };
 
 function searchFun(){
	 initTable("");
 }
 
 function detailFun(row) {
 	$('#detailModal').modal();
 	CloudUtils.setForm(row,'detailForm');
 	$('#detailForm input').attr('readonly',true);
    $("#btn_blank").removeClass('col-sm-4').addClass('col-sm-7');
}
 
 function initTable(data) {
		$('#stuInfoList').bootstrapTable('destroy'); 
		$("#stuInfoList").bootstrapTable({  
	         method: "post", 
	         url: "../../stuInfo/list", 
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
	        	 var stuName = '';
	        	 var mobilePhone = '';
	        	 var idCard = '';
	             var data = CloudUtils.convertStringJson('searchForm');
	             var jsonData = eval("(" + data + ")");
	             if(!data){
	            	 stuName=jsonData.stuName;
	            	 mobilePhone=jsonData.mobilePhone;
	            	 idCard=jsonData.idCard;
	        	 }else{
	        		 stuName=$("#stuName").val();
	        		 mobilePhone=$("#mobilePhone").val();
	        		 idCard=$("#idCard").val();
	        	 }
	             var param = {    
	                 pageNumber: params.pageNumber,    
	                 pageSize: params.pageSize,
	                 stuName:stuName,
	            	 mobilePhone:mobilePhone,
	            	 idCard:idCard
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
	 	        field: 'stuId',
	 	        title: '学生号',
	 	        align: 'center',
	             valign: 'middle',
	             visible: false
	 	    }, {
	 	        field: 'stuName',
	 	        title: '客户姓名',
	 	        align: 'center',
	            valign: 'middle',
	 	    }, {
	 	        field: 'idCard',
	 	        title: '证件号',
	 	        align: 'center',
	            valign: 'middle',
	 	    }, {
	 	        field: 'mobilePhone',
	 	        title: '手机号码',
	 	       align: 'center',
	           valign: 'middle'
	 	    },{
	 	        field: 'schoolName',
	 	        title: '学校',
	 	        align: 'center',
	 	        valign: 'middle'
	 	    },{
	 	        field: 'dorm',
	 	        title: '宿舍',
	 	        align: 'center',
	 	        valign: 'middle'
	 	    },{
	 	        field: 'operation',
	 	        title: '操作',
	 	        align: 'center',
	            valign: 'middle',
	 	        formatter:function(value,row,index){
	 	        	var d = '<a class = "fa fa-list-ul detail" style="color:#278bdd;padding:0px 5px;" data-type="custInfo" title="详情" href="javascript:void(0)"></a>';
	 	            return d;
	 	        },
	 	        events: 'operateEvents'
	 	    }
	 	    ]
	       });  
	}

 
 
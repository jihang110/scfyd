$(function() {
	CloudUtils.getMenuNames("nav");
	initTable();
});
function addFun(type){
	$('#mainFrame',top.document).attr('src','pubManager/custManager/custAdd.html?isEdit=1');
 }
function searchFun(){
	 initTable("");
}

function initTable() { 
	$('#custInfoList').bootstrapTable('destroy'); 
	$("#custInfoList").bootstrapTable({  
         method: "post", 
         url: "../../custInfo/list", 
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
                 corpName:jsonData.txt_corpName,
                 legalPerson:jsonData.txt_legalPerson,
                 sysType:jsonData.txt_sysType,
                 corpType:jsonData.txt_corpType
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
 	        field: 'corpId',
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
 	        field: 'corpType',
 	        title: '企业类型',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'legalPerson',
 	        title: '法定人代表',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: 'officeAddress',
 	        title: '公司地址',
 	        align: 'center',
             valign: 'middle'
 	    }, {
 	        field: '固定电话',
 	        title: '联系方式',
 	        align: 'center',
             valign: 'middle'
 	    },{
 	        field: 'operation',
 	        title: '操作',
 	        align: 'center',
            valign: 'middle',
 	        formatter:function(value,row,index){
 	        	var d = '<a class = "fa fa-list-ul detail" style="color:#278bdd;padding:0px 5px;" data-type="custInfo" title="详情" href="javascript:void(0)"></a>';
 	        	var m = '<a class = "fa fa-edit modify" style="color:#278bdd;padding:0px 5px;" data-type="custInfo" title="编辑" href="javascript:void(0)"></a>';
 	            return d +' '+ m;
 	        },
 	        events: 'operateEvents'
 	    }
 	    ]
       });  
}

window.operateEvents = {
		
		'click .detail': function (e, value, row, index) {
			store.set('custRow',row);//把数据存储在缓存中
			$('#mainFrame',top.document).attr('src','pubManager/custManager/custAdd.html?isEdit=3');
	    },
	    'click .modify': function (e, value, row, index) {
	    	store.set('custRow',row);//把数据存储在缓存中
			$('#mainFrame',top.document).attr('src','pubManager/custManager/custAdd.html?isEdit=2');
	    }
};
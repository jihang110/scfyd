$(function () {
	CloudUtils.getMenuNames("nav");
	"use strict";
	dateload();
//	CloudUtils.ajax(CloudUtils.options);
   /* var startDate =  new Date();
    startDate.setMonth(startDate.getMonth()-1);
    $('#startDate').val(dateFormat(startDate, 'yyyy-MM-dd'));
    var endDate = new Date();
    $('#endDate').val(dateFormat(endDate, 'yyyy-MM-dd'));
    $('#startDate').datetimepicker({
         language: 'zh-CN',
         autoclose: 1,
         todayBtn: true,// 显示今天时间
         pickerPosition: "bottom-left",
         minuteStep: 5,
         format: 'yyyy-mm-dd',
         minView: 'month'　　　　// 日期时间选择器所能够提供的最精确的时间选择视图。
        });
    $('#endDate').datetimepicker({
         language: 'zh-CN',
         autoclose: 1,
         todayBtn: true,
         pickerPosition: "bottom-left",
         minuteStep: 5,
         format: 'yyyy-mm-dd',
         minView: 'month'　　　　// 日期时间选择器所能够提供的最精确的时间选择视图。
       });
    $('#startDate').datetimepicker('setEndDate', new Date());
    $('#endDate').datetimepicker('setEndDate', new Date());*/
    InitTable();
 });

//初始化table
function InitTable(){
	$('#logListTable').bootstrapTable('destroy');
	$('#logListTable').bootstrapTable({
		method: "post",
		url: "../../user/bizLogList",
		striped: false,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination: true,
		 sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
         pageNumber:1,                       //初始化加载第一页，默认第一页
         pageSize: 5,                       //每页的记录行数（*）
         pageList: [5,10,15,20,25],        //可供选择的每页的行数（*）
         search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
         strictSearch: true,
         showColumns: true,                  //是否显示所有的列
         showRefresh: false,                  //是否显示刷新按钮
//         minimumCountColumns: 2,             //最少允许的列数
         clickToSelect: true,                //是否启用点击选中行
         showColumns: false,                  //是否显示所有的列
         showRefresh: false,                  //是否显示刷新按钮
         sortable: false,                     //是否启用排序
         sortOrder: "asc",                   //排序方式
         showToggle:false,                    //是否显示详细视图和列表视图的切换按钮
         cardView: false,                    //是否显示详细视图
         queryParamsType : "undefined",   
         queryParams: function queryParams(params) {   //设置查询参数  
           var data = CloudUtils.convertStringJson('searchForm');
           var jsonData = eval("(" + data + ")");
           var roleName = store.get("roleName");
           if(roleName=="保理商管理员"){
	       	   jsonData.corpId = null;
	       }else{
	    	   var corpId = store.get("corpId");
	           jsonData.corpId = corpId;
	       }
           var v_createTime = $("#createTime").val();
           // 创建时间from-to
           if (CloudUtils.isEmpty(v_createTime)) {
        	   jsonData.startDate = null;
        	   jsonData.endDate = null;
           } else {
        	   var array = v_createTime.split(' - ');
        	   jsonData.startDate = array[0];
        	   jsonData.endDate = array[1];
           }
           if(jsonData.username==""){
        	   jsonData.username = null;
           }
           var paramTemp = {    
               pageNumber: params.pageNumber,    
               pageSize: params.pageSize
           };    
           var param = $.extend({}, jsonData,paramTemp);
           return JSON.stringify(param);                   
         },  
         responseHandler:function responseHandler(res) {
        	 if (res.result==0) {
	        	 return {
	        		 "rows": res.dataList,
	        		 "total": res.records
	        	 };

        	 } else {
        		 //bootbox.alert(res.resultNote);
        		 return {
			        	 "rows": [],
			        	 "total": 0
			        	 };
        	 }
         },columns: [{
	        field: 'logId',
	        title: '日志Id',
	        align: 'center',
	        valign: 'middle',
	        visible:false
	    } , {
	        field: 'username',
	        title: '用户名称',
	        align: 'center',
	        valign: 'middle'
	    },{
	        field: 'corpName',
	        title: '企业名称',
	        align: 'center',
	        valign: 'middle'
	    },{
	        field: 'logTypeName',
	        title: '操作类型',
	        align: 'center',
		    valign: 'middle',
		  //  visible:false
	    }
	    ,{
	        field: 'ip',
	        title: '访问ip',
	        align: 'center',
	        valign: 'middle'
	    },
	    {
	    	field:'operTime',
	    	title:'日志操作时间',
	    	align:'center',
	    	valign:'middle'
	    },
	    {
		    field:'content',
		    title:'日志内容 ',
		    align:'center',
		    valign:'middle'
		   }]
	    });
}

function searchFun(){
	InitTable();
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

function dateload() {
	// 检索
	$('#createTime').daterangepicker(
        {
            startDate: moment().subtract(30, 'days').calendar,
            //endDate: moment(),
            //minDate: '01/01/2012',    //最小时间
            maxDate : moment(), //最大时间
            dateLimit : { days : 30 }, //起止时间的最大间隔
            showDropdowns : true,
            showWeekNumbers : false, //是否显示第几周
            timePicker : false, //是否显示小时和分钟
            //timePickerIncrement : 60, //时间的增量，单位为分钟
            //timePicker12Hour : false, //是否使用12小时制来显示时间
//	            ranges : {
//	                //'最近1小时': [moment().subtract('hours',1), moment()],
//	                '今日': [moment().startOf('day'), moment()],
//	                '昨日': [moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day')],
//	                '最近7日': [moment().subtract('days', 6), moment()],
//	                '最近30日': [moment().subtract('days', 29), moment()]
//	            },
            opens : 'right', //日期选择框的弹出位置
            buttonClasses : [ 'btn btn-default' ],
//            applyClass : 'btn-small btn-primary blue',
//	            cancelClass : 'btn-small',
            format : 'yyyy-MM-dd', //控件中from和to显示的日期格式
            separator : ' - ',
            locale : {
                applyLabel : '确定',
                cancelLabel : '取消',
                fromLabel : '起始时间',
                toLabel : '结束时间',
                //customRangeLabel : '自定义',
                daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],
                monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',
                               '七月', '八月', '九月', '十月', '十一月', '十二月' ],
                firstDay : 1
            }
        },
        function(start, end, label) {//格式化日期显示框
        	$('#createTime').val(start.toString('yyyy-MM-dd') + ' - ' + end.toString('yyyy-MM-dd'));
        }
    );	

}
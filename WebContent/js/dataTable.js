/****
 * 
 * 案例如此，还有其他不懂的细节。请自行查看bootstrapt-table.js的使用
 */
/**
	 * 将String数据转换为json
	 */

window.operateEvents = {
	'click .search': function (e, value, row, index) {
	        $.ajax({
	        	contentType: "application/json",
	        	cache:false,
	 	        async: false,
	            type: "post",
	            dataType:'json',
	            data:'{"id":"'+row.id+'","name":"'+row.name+'"}',
	            url: 'login/test',
	            success: function (data) {
	                alert('修改成功');
	            }
	        });
	    },
    'click .remove': function (e, value, row, index) {
    	$('#example').bootstrapTable('remove', {
            field: 'id',
            values: [row.id]
        });
    }
};

$(document).ready(function() {
	$('#example').bootstrapTable({
//        toolbar: '#toolbar',                //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,                   //是否显示分页（*）
        sortable: false,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
	    columns: [{
	        field: 'id',
	        title: 'Item ID'
	    }, {
	        field: 'name',
	        title: 'Item Name'
	    }, {
	        field: 'price',
	        title: 'Item Price'
	    }, {
	        field: 'operation',
	        title: 'Item Operation',
	        formatter:function(value,row,index){
	            var s = '<a class = "search" href="javascript:void(0)">查询</a>';
	            var d = '<a class = "remove" href="javascript:void(0)">删除</a>';
	            return s+' '+d;
	        },
	        events: 'operateEvents'
	    }],
	    data: [{
	        id: 1,
	        name: 'Item 1',
	        price: '$1',
	    }, {
	        id: 2,
	        name: 'Item 2',
	        price: '$2',
	    }, {
	        id: 3,
	        name: 'Item 2',
	        price: '$2',
	    }, {
	        id: 4,
	        name: 'Item 2',
	        price: '$2',
	    }, {
	        id: 5,
	        name: 'Item 2',
	        price: '$2'
	    }, {
	        id: 6,
	        name: 'Item 2',
	        price: '$2'
	    }, {
	        id: 7,
	        name: 'Item 2',
	        price: '$2'
	    }, {
	        id: 8,
	        name: 'Item 2',
	        price: '$2'
	    }, {
	        id: 9,
	        name: 'Item 2',
	        price: '$2'
	    }, {
	        id: 10,
	        name: 'Item 2',
	        price: '$2'
	    }, {
	        id: 11,
	        name: 'Item 2',
	        price: '$2'
	    }, {
	        id: 12,
	        name: 'Item 2',
	        price: '$2'
	    }, {
	        id: 13,
	        name: 'Item 2',
	        price: '$2'
	    }, {
	        id: 14,
	        name: 'Item 2',
	        price: '$2'
	    }, {
	        id: 15,
	        name: 'Item 2',
	        price: '$2'
	    }]
	});
} );

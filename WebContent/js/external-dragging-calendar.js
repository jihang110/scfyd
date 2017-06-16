$(document).ready(function() {
	out();
})

var eventId = null;
var Script = function () {


    /* initialize the calendar
     -----------------------------------------------------------------*/

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    
    var corpId =  store.get("corpId");
    var params = {
    	 corpId: corpId
   };
    //查找标签信息
    var options = {
			url : "userMark/list",
			data : JSON.stringify(params),
			callBackFun : function(data) {
				if(data.result==0){
					var div1 = document.getElementById('external-events');
					var code = '';
					$.each(data.dataList, function(i, value) {
						code += '<div class="external-event label label-success" id="'+value.recUid+'">'+value.markName+'</div>';
					});
					 div1.innerHTML = code + '';
				}else if(data.result!=6){
					bootbox.alert(data.resultNote);
					return false;
				}
			},
			errorCallback:function(data){
			bootbox.alert("error");
			}
		};
   		CloudUtils.ajax(options);
    //更新日期行程
   	function modFlowFun(params){
   	 var options = {
  			url : "notepadFlow/mod",
  			data : JSON.stringify(params),
  			callBackFun : function(data) {
  				if(data.result==0){
  					ajaxExpenseExpireCount();
  				}else if(data.result!=6){
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
  
    
    $('#external-events div.external-event').each(function() {

        // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
        // it doesn't need to have a start or end
        var eventObject = {
            title: $.trim($(this).text()), // use the element's text as the event title
            markid:$.trim($(this).attr("id"))
        };
       
        // store the Event Object in the DOM element so we can get to it later
        $(this).data('eventObject', eventObject);

        // make the event draggable using jQuery UI
        $(this).draggable({
            zIndex: 99999,
            revert: true,
            helper: "clone",
            revertDuration: 0  //  original position after the drag
        });

    });

    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,basicWeek,basicDay'
        },
        buttonText:{
        	 prev:     '<',
        	 next:     '>',
        	 prevYear: '去年',
        	 nextYear: '明年',
        	 today:    '今天',
        	 month:    '月',
        	 week:     '周',
        	 day:      '日'
        	 },
        	 titleFormat:{
        		    month: 'yyyy MMMM',                             // September 2009
        		    week: "yyyy MMM d{ '&#8212;'d}", // Sep 7 - 13 2009
        		    day: 'yyyy, MMM d,dddd'                  // Tuesday, Sep 8, 2009
        		},        
        dayClick: function(date, allDay, jsEvent, view) {
        	/*bootbox.alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
            bootbox.alert('Current view: ' + view.name);
            $(this).css('background-color', 'red');*/
        },
        eventClick: function(calEvent, jsEvent, view) {
        	 	     	
        },
        //拖拽事件
        eventDragStop:function(event,jsEvent,ui,view) {
            /*$("#calendar").mouseleave(function(){
            	 var params = {
            		recUid:event.id
                };
            	 var options = {
            	  			url : "notepadFlow/delete",
            	  			data : JSON.stringify(params),
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
            	});	*/
        },
        //在原来地点拖拽
        eventResize:function( event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view ) { 
        	if(event.end==null){
        		event.end=event.start;
        	}
        	var params = {
        			 startDate: $.fullCalendar.formatDate(event.start, "yyyy-MM-dd"),//开始时间
              		 endDate:$.fullCalendar.formatDate(event.end, "yyyy-MM-dd"),
              		 recUid: event.id
              };
        	modFlowFun(params);
        },
        //当拖拽完成并且时间改变
        eventDrop:function( event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view ) {
        	if(event.end==null){
        		var params = {
           			 	 startDate: $.fullCalendar.formatDate(event.start, "yyyy-MM-dd"),//开始时间
                 		 endDate:$.fullCalendar.formatDate(event.start, "yyyy-MM-dd"),
                		 recUid: event.id
                 };
        	}else{
        		var params = {
              			 startDate: $.fullCalendar.formatDate(event.start, "yyyy-MM-dd"),//开始时间
              			 endDate:$.fullCalendar.formatDate(event.end, "yyyy-MM-dd"),
                   		 recUid: event.id
                    };
        	}
        	modFlowFun(params);
        },
        eventDragStart:function(event,jsEvent,ui,view) {
        	eventId = event.id;
        },
/*        eventMouseout:function( event, jsEvent, view ) {
        	 $(this).css('background-color', 'green');
        },*/
        editable: true,
        height:100,
        dayNames:['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        dayNamesShort:['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        monthNames:['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthNamesShort:['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        droppable: true, // this allows things to be dropped onto the calendar !!!
        drop: function(date, allDay) { // this function is called when something is dropped
            // retrieve the dropped element's stored Event Object
            var originalEventObject = $(this).data('eventObject');

            // we need to copy it, so that multiple events don't have a reference to the same object
            var copiedEventObject = $.extend({}, originalEventObject);

            // assign it the date that was reported
            copiedEventObject.start = date;
            copiedEventObject.allDay = allDay;

            // render the event on the calendar
            // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
            //$('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

            // is the "remove after drop" checkbox checked?
            if ($('#drop-remove').is(':checked')) {
                // if so, remove the element from the "Draggable Events" list
                $(this).remove();
            }
            
            starttime = $.fullCalendar.formatDate(date, "yyyy-MM-dd")
        	var params = {
           		 startDate: starttime,//开始时间
           		 endDate:starttime,
           		 markId: copiedEventObject.markid
           };
            var options = {
    				url : "notepadFlow/add",
    				data : JSON.stringify(params),
    				callBackFun : function(data) {
    					if(data.result==0){
    						//document.location.reload();
    						ajaxExpenseExpireCount();
    						$('#calendar').fullCalendar('refetchEvents');
    					}else if(data.result!=6){
    						bootbox.alert(data.resultNote);
    						return false;
    					}
    				},
    				errorCallback:function(data){
    				bootbox.alert("error");
    				}
    			};
            CloudUtils.ajax(options);
           
        },
        events: function(start,end,callback){
        	var userId =  store.get("userId");
            var params = {
            		 userId: userId,
            		 startDate: null,//开始时间
            		 endDate:null	
            };
            var options = {
    				url : "notepadFlow/list",
    				data : JSON.stringify(params),
    				callBackFun : function(data) {
    					if(data.result==0){
    						var events =[];
    						$.each(data.dataList, function(i, o) {
    							 events.push({ 
                                     id:o.recUid,
                                     title:o.markName,
                                     start:new Date(o.startDate),
                                     end:new Date(o.endDate)
             		 		 });
    						 });
    					}else if(data.result!=6){
    						bootbox.alert(data.resultNote);
    						return false;
    					}
    					 callback(events);
    				},
    				errorCallback:function(data){
    				bootbox.alert("error");
    				}
    			};
            CloudUtils.ajax(options);
          }
    });


}();

/**
 * 拖动删除
 * out退出指定位置触发事件
 */
function out(){
	 $( ".fc-content" ).droppable({
	      out: function( event, ui ) {
	        
	        var params = {
             		recUid:eventId
                 };
     
             	 var options = {
             	  			url : "notepadFlow/delete",
             	  			data : JSON.stringify(params),
             	  			callBackFun : function(data) {
             	  				if(data.result==0){
             	  					ajaxExpenseExpireCount();
             	  				}else if(data.result!=6){
             						bootbox.alert(data.resultNote);
             						return false;
             					}
             	  			},
             	  			errorCallback:function(data){
             	  			bootbox.alert("error");
             	  			}
             	  		};
             	     		CloudUtils.ajax(options);
             $('#calendar').fullCalendar('removeEvents', [eventId]);
	        eventId = null;
	      }
	    });
}

/*
 * 预警通知接口调用
 */
function ajaxExpenseExpireCount(){
	var data = '{"recUid":""}';
	var options = {
			url : 'notepadFlow/expenseExpireCount',
			data : "{}",
			callBackFun : function(data) {
				if(data.result==0){
					$("#expenseExpireCount").html(data.expenseExpireCount);
				}else{
					return false;
				}
			}
	};
	CloudUtils.ajax(options);
}
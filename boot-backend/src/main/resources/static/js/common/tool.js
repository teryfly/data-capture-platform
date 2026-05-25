Date.prototype.format = function(fmt) {
	var o = {
		"M+" : this.getMonth() + 1,
		"d+" : this.getDate(),
		"h+" : this.getHours(),
		"m+" : this.getMinutes(),
		"s+" : this.getSeconds(),
		"q+" : Math.floor((this.getMonth() + 3) / 3),
		"S" : this.getMilliseconds()
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};
function isn(obj){
	if(obj==""||obj==null||obj==undefined){
		return true;
	}
	return false;
}
function isnn(obj){
	if(obj==""||obj==null||obj==undefined){
		return false;
	}
	return true;
}
var tools={
		basePath:"",
		//提示弹窗
		alert:function(msg,type){
			if(type==1){
				layer.msg(msg, {icon: 1,time:1500});
			}else if(type==2){
				layer.alert(msg, {icon: 2});
			}
			else if(type==0){
				layer.msg(msg, {icon: 0,time:1500});
			}
		},
		//判断为空
		isn:function(obj){
	    	if(obj==""||obj==null||obj==undefined){
	    		return true;
	    	}
	    	return false;
	    },
	   // 判断不为空
	    isnn:function(obj){
	    	if(obj==""||obj==null||obj==undefined){
	    		return false;
	    	}
	    	return true;
	    },
		getTimes : function (day) {
			var date = new Date(this.zdate.getTime() - day * 24 * 3600 * 1000);
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();
			var hour = date.getHours();
			var minute = date.getMinutes();
			var second = date.getSeconds();
			return {time:year + '-' + (month<10?"0"+month:month) + '-' + (day<10?"0"+day:day)};
		} ,
		getPageSize : function () {	// 获取页面的高度、宽度
			var xScroll, yScroll;
		    if (window.innerHeight && window.scrollMaxY) {
		        xScroll = window.innerWidth + window.scrollMaxX;
		        yScroll = window.innerHeight + window.scrollMaxY;
		    } else {
		        if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac    
		            xScroll = document.body.scrollWidth;
		            yScroll = document.body.scrollHeight;
		        } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari    
		            xScroll = document.body.offsetWidth;
		            yScroll = document.body.offsetHeight;
		        }
		    }
		    var windowWidth, windowHeight;
		    if (self.innerHeight) { // all except Explorer    
		        if (document.documentElement.clientWidth) {
		            windowWidth = document.documentElement.clientWidth;
		        } else {
		            windowWidth = self.innerWidth;
		        }
		        windowHeight = self.innerHeight;
		    } else {
		        if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode    
		            windowWidth = document.documentElement.clientWidth;
		            windowHeight = document.documentElement.clientHeight;
		        } else {
		            if (document.body) { // other Explorers    
		                windowWidth = document.body.clientWidth;
		                windowHeight = document.body.clientHeight;
		            }
		        }
		    }       
		    if (yScroll < windowHeight) {		// for small pages with total height less then height of the viewport    
		        pageHeight = windowHeight;
		    } else {
		        pageHeight = yScroll;
		    }    
		    if (xScroll < windowWidth) {		//for small pages with total width less then width of the viewport
		        pageWidth = xScroll;
		    } else {
		        pageWidth = windowWidth;
		    }
		    arrayPageSize = new Array(pageWidth, pageHeight, windowWidth, windowHeight);
//		    return arrayPageSize;
		    return {pageWidth : pageWidth, pageHeight : pageHeight, windowWidth : windowWidth, windowHeight : windowHeight};
		},
		formData:function(formId){
		  	  var data=$('#'+formId).serialize();
		  	  //序列化获得表单数据
		  	  var submitData=decodeURIComponent(data,true);
            	console.log("submitDate:"+submitData);
		  	 // 将数据转换为json数据
		  	  var dataArr=submitData.split("&");
		  	  var dataJson="{"
		  	  $.each(dataArr,function(i,v){
		  		  var d=v.split("=");
		  		  if(d.length==2){
		  			  var value=d[1];
		  			value=value.replace(/\\/g,"\\\\");
		  			value=value.replace(/\+/g," ")
		  			  if(i==0){
		  				  dataJson+='"'+d[0]+'":"'+value+'"';
		  			  }else{
		  				  dataJson+=',"'+d[0]+'":"'+value+'"';
		  			  }
		  		  }
		  	  });
		  	  dataJson+="}";
		  	var result={};
		  	try {
		  		result=JSON.parse(dataJson)
			} catch (e) {
				tools.alert("数据需要转义！",0)
			}
		  	  return result;
		    },
		    isNull:function(obj){
		    	if(obj==""||obj==null||obj==undefined){
		    		return true;
		    	}
		    	return false;
		    },
		    encrypt : function(Str) { // 加密
				this.arr = "";
				for ( var i = 0; i < Str.length; i += 1) {
					this.arr += Str.charCodeAt(i) + "rc";
				}
				return this.arr;
			},
			decode : function(Str) {// 解密
				this.arr = Str.split("Vz");
				this.TStr = "";
				for ( var i = 0; i < this.arr.length; i += 1) {
					this.TStr += String.fromCharCode(this.arr[i]);
				}
				return this.TStr;
			},
		    jqgridExport:function(option) {
		    	var grid={
		    			title:"",
		    			names:[],
		    			indexs:[],
		    			datas:[]
		    	};
		    	if(isn(option.id)){
		    		alert("表格id为空");
		    		return false;
		    	}
		    	grid.title=$("#gbox_"+option.id+" .ui-jqgrid-title").text();
		    	console.log($("#gbox_"+option.id+" table thead tr th").length)
		        $.each($("#gbox_listScheduling thead tr th"),function(i,th){
		        	if($(th).is(':visible')){
		        		grid.indexs.push($(th).attr("id").replace(option.id+"_",""));
			        	grid.names.push($(th).find("div").text());
		        	}
		        });
	    		 $.each($("table[id='"+option.id+"'] tbody .jqgrow"),function(i,tr){
	    			 var trData=[];
			        	if($(tr).is(':visible')){
			        		 $.each($(tr).find("td"),function(j,td){
			 		        	if($(td).is(':visible')){
			 		        		trData.push($(td).text().trim())
			 		        	}
			 		        });
			        		 grid.datas.push(trData)
			        	}
			        });
		        console.log(grid);
		        $.ajax({
	                url: Feng.ctxPath + "/export/jqgridExport",
	                type: "post",
	                data:{grid:JSON.stringify(grid)},
	                dataType: "json",
	                success: function (data) {
	                	var Str = data.data;
	            		if (Str == "") {
	            			layer.confirm("导出Excel失败... ...", {btn: ["关闭"]}, function(){layer.closeAll(); });
	            			return ;
	            		}
	            		try {
	            			if (Str == "false") {
	            				alert("导出Excel失败,请查看日志！");
	            				return ;
	            			} else {
	            				var path=$.base64.encode(Str)
	            				console.log(path)
	            				var a = $("#downLink")[0];
	            				if(a == null||a==undefined){
	            					var a = document.createElement('a');
	            					 a.id = "downLink";
	            					 a.href = Feng.ctxPath+"/export/download?path="+path;
	            					document.body.appendChild(a);
	            				}else{
	            					a.href = Feng.ctxPath+"/export/download?path="+path;
	            				}
	            				a.click();
	            			}
	            		} finally {
	            			layer.closeAll('loading');
	            		}
	                }
	            });
		        
		    }
}


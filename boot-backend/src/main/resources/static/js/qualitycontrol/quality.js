var columns = [

];
var node;

var Quality = {
    database_name : null,
    table_name : null,
    time_stamp : null,
    task_id :null
};

/**
 * 树的点击事件
 * @param e
 * @param treeId
 * @param treeNode
 */
Quality.onClickDept = function (e, treeId, treeNode) {
    node = treeNode;
    if (treeNode.text == 1) {//异步查询后台该任务有哪些表头
        //根据任务id查询拼接sql所需要的字段
        var index = layer.load(1, {
      	  shade: [0.1,'#fff'] //0.1透明度的白色背景
      	});
    	try {
    		$.ajax({
                url : Feng.ctxPath + "/quality/selectTaskById",    //请求的url地址
                dataType : "json",   //返回格式为json
                data : {uniqe_id : treeNode.uniqeId},    //参数值
                type : "post",   //请求方式
                success:function(data){
                	Quality.task_id = data.id;
                    Quality.database_name = data.database_name;
                    Quality.table_name = data.table_name;
                    Quality.time_stamp = data.time_stamp;
                }
            });
            $.ajax({
                url : Feng.ctxPath + "/quality/tableHead",    //请求的url地址
                dataType : "json",   //返回格式为json
                data : {task_id : treeNode.uniqeId},    //参数值
                type : "post",   //请求方式
                success:function(data){
                    //初始化表头
                    columns = [

                    ];
                    //请求成功时处理
                    $(data).each(function () {
                    	var titleName = this.china_name == "" ? this.field_name:this.china_name;
                    	var Width = this.width ? 120 : this.width;
                        columns.push({title: titleName, field: this.field_name, align: 'center', valign: 'middle', sortable: true, width: this.width,cellStyle : function cellStyle (value,row,index){
                                return {css:{"background-color":"#FFF"}};
                            }
                        },);
                    });
                    //重绘表格
                    $("#qualityTable").bootstrapTable("destroy");
                    var table = new BSTable("qualityTable", "", columns);
                    table.setPaginationType("client");//分页
                    QualityTable.table = table.init();
                    //隐藏radio
//                    $(".bs-checkbox").hide();
                    /**
                     * 获取行index
                     */
                    $('#qualityTable').on('click-cell.bs.table', function ($event, field, value, row, target) {

                    });
                    //隐藏第一列
                    //$("#qualityTable").bootstrapTable("hideColumn","selectItem");
                }
            });
		} catch (e) {
			
		} finally {
            layer.close(index);
		}        
    }else {
        //不操作
    }

};

var QualityTable = {
    id: "qualityTable",//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
QualityTable.initColumn = function () {
    var column = columns;
    return column;
};
QualityTable.cxcq = function (){
	//加载层-风格3
	layer.load(2);
	//此处演示关闭
	setTimeout(function(){
	    layer.closeAll('loading');
	    layer.alert('抽取成功... ...', {icon: 6});
	}, 2000);
};
QualityTable.xgsj = function () {
	if (this.isChecked()) {
		var index = layer.open({
	        type: 2,
	        title: '修改数据',
	        area: ['838px', '750px'], //宽高
	        fix: false, //不固定
	        maxmin: true,
	        content: Feng.ctxPath + '/pages/collection/qualitycontrol/update.html',
	        btn: ['提交', '取消'],
	        btnAlign: 'c',
	        btn1: function (index, layero) {
	        	layer.alert("修改成功... ...");
	        	layer.close(index);
	        },
	        btn2: function (index, layero) {
	            //按钮【按钮二】的回调
	        }
	    });
	}
};
/**
 * 检查是否选中
 */
QualityTable.isChecked = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if (selected.length == 0) {
        Feng.info("请先选中表格中的某一记录！");
        return false;
    } else {
    	QualityTable.seItem = selected[0];
        return true;
    }
};
/**
 * 校验   加载数据
 */
QualityTable.check = function () {
    if ($("#time").val() == "") {
        layer.msg("没有选择时间区间");
        return;
    }
    if (node == undefined) {
        layer.msg("没有选择任务");
        return;
    }
    if (node.text != 1) {
        layer.msg("改任务无法检验");
        return;
    }
    console.log("::::" + Quality.task_id);
    //异步查询数据
    $.ajax({
        url : Feng.ctxPath + "/quality/splicingSql",    //请求的url地址
        dataType : "json",   //返回格式为json
        data : {
        	task_id:Quality.task_id,
        	database_name : Quality.database_name,
                table_name : Quality.table_name,
                time_stamp : Quality.time_stamp,
                time : $("#time").val()},    //参数值
        type : "post",   //请求方式
        success : function(data){
            $('#qualityTable').bootstrapTable('load',data);
            //隐藏radio
//            $(".bs-checkbox").hide();
        }
    });
};

laydate.render({
    elem: '#time'
    //,range: true //或 range: '~' 来自定义分割字符
    ,range: '~',
    value:"2018-08-01 ~ 2018-08-02",
    theme: 'grid'
});

$(function () {
    //生成树
    var ztree = new $ZTree("deptTree", "/task/list");
    ztree.bindOnClick(Quality.onClickDept);
    ztree.init();

    var table = new BSTable("qualityTable", "", columns);
    table.setPaginationType("client");//分页
    QualityTable.table = table.init();

    //隐藏radio
//    $(".bs-checkbox").hide();
});
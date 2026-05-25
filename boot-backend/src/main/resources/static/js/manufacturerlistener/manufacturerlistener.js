var MftListener = {
    mftId: '',//点击的厂商id
    name: '',//选中的厂商名称
    time: '',//时间
    type: '1',//任务类型
    layerIndex: -1,
};
MftListener.init = function (param) {
    $.ajax({
        type: 'POST',
        url: Feng.ctxPath + "/mft/selectMftCount",
        dataType: 'json',
        data: param,
        success: function (data) {
            if (data.success) {
                $.each(data.data, function (i, task) {
                    var html =
                        '<div class="col-sm-3 col-lg-3 col-md-3 ">'
                        + '<div class="thumbnail thirdParty" fag="' + task.third_party_name + '" tag="' + task.sys_id + '">'
                        + ' 	<div class="panel panel-primary">'
                        + '	    <div class="panel-heading app">'
                        + '	        <h3 class="panel-title" style="font-size:10px;">'
                        + '<td>' + task.third_party_name + '</td>'
                        + '</h3>'
                        + '	    </div>'
                        + '   	<div class="panel-body app">'
                        + '   		<table class="table">'
                        + '		        <tr><td>任务包个数:</td><td>'
                        + task.task_count
                        + '</td></tr>'
                        + '		        <tr><td>成功次数:</td><td>'
                        + task.success
                        + '</td></tr>'
                        + '		        <tr><td style="color: red;">失败次数:</td><td style="color: red;">'
                        + task.failed
                        + '</td></tr>'
                        + '		        <tr><td>健康度:</td><td>'
                        + (task.success * 100 / (task.success + task.failed)).toFixed(2)
                        + '%</td></tr>'
                        + '		    </table>'
                        + '   	</div>'
                        + '	</div>'
                        + '</div>'
                        + '</div>';
                    $("#container").append(html);
                });
                /**
                 * 厂商名称点击事件
                 */
                $(".thirdParty").click(function () {
                    MftListener.mftId = $(this).attr("tag");
                    MftListener.name = $(this).attr("fag");
                    MftListener.time = $("#time").val();
                    //MftListener.type = $("#type").val();
                    var index = layer.open({
                        type: 2,
                        title: MftListener.name + '-任务统计',
                        area: ['90%', '90%'], //宽高
                        fix: false, //不固定
                        maxmin: true,
                        content: Feng.ctxPath + '/pages/collection/collectionlog/mfttasktable.html'
                    });
                    MftListener.layerIndex = index;
                    document.activeElement.blur();
                });
            } else {
                tools.alert(data.msg, 0)
            }

        }
    });
};

MftListener.formParams = function () {
    var queryData = {};
    queryData['name'] = $("#name").val();
    if ($("#time").val() != "" && $("#time").val() != null) {
        var time = $("#time").val().replace(/\s+/g, "").split("~");
        queryData['beginTime'] = time[0];
        queryData['endTime'] = time[1];
    }
    queryData['type'] = $("#type").val();
    return queryData;
};

MftListener.search = function () {
    this.type = $("#type").val();
    var data = MftListener.formParams();
    $("#container").children().remove();
    MftListener.init(data);
};

MftListener.refresh = function (data) {
    $("#taskName").val('');
    $("#time").val('');
    MftListener.search();
};

laydate.render({
    elem: "#time",
    range: "~"
});


$(function () {
    $("#container").height(tools.getPageSize().pageHeight - 50);
    MftListener.search();
});
var CollectionListener = {};
CollectionListener.init = function (param) {
    $.ajax({
        type: 'POST',
        url: Feng.ctxPath + "/collectionlistener/list",
        dataType: 'json',
        data: param,
        success: function (data) {
            if (data.success) {
                $.each(data.data, function (i, task) {
                    var url = param.type;
                    if (url == 1) {//实时
                        url = '/pages/collection/collectionlog/realtimelog.html';
                    } else if (url == 2) {//定时
                        url = '/pages/collection/collectionlog/timinglog.html';
                    }
                    var html =
                        '<div class="col-sm-3 col-lg-3 col-md-3 ">'
                        + '<div class="thumbnail">'
                        + ' 	<div class="panel panel-primary">'
                        + '	    <div class="panel-heading app">'
                        + '	        <h3 class="panel-title" style="font-size:10px;">'
                        + '<a class="taskNameUrl" href="' + url + '?id=' + task.task_id + '&time=' + $("#time").val() + '">' + task.taskName + '</a>'
                        + '</h3>'
                        + '	    </div>'
                        + '   	<div class="panel-body app">'
                        + '   		<table class="table">'
                        + '		        <tr><td>厂商名称:</td><td>'
                        + task.ThirdPartyName
                        + '</td></tr>'
                        + '		        <tr><td>任务名称:</td><td>'
                        + task.tranName
                        + '</td></tr>'
                        + '		        <tr><td>成功次数:</td><td>'
                        + '<a class="successUrl" href="' + url + '?id=' + task.task_id + '&success=1&time=' + $("#time").val() + '">' + task.success + '</a>'
                        + '</td></tr>'
                        + '		        <tr><td style="color: red;">失败次数:</td><td>'
                        + '<a class="failedUrl" href="' + url + '?id=' + task.task_id  + '&success=0&time=' + $("#time").val() + '" style="color: red;">' + task.failed + '</a>'
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
            } else {
                tools.alert(data.msg, 0)
            }

        }
    });
};

CollectionListener.formParams = function () {
    var queryData = {};
    queryData['taskName'] = $("#taskName").val();
    if ($("#time").val() != "" && $("#time").val() != null) {
        var time = $("#time").val().replace(/\s+/g, "").split("~");
        queryData['beginTime'] = time[0];
        queryData['endTime'] = time[1];
    }
    queryData['type'] = $("#type").val();
    return queryData;
};

CollectionListener.search = function () {
    var data = CollectionListener.formParams();
    $("#container").children().remove();
    CollectionListener.init(data);
};

CollectionListener.refresh = function (data) {
    $("#taskName").val('');
    $("#time").val('');
    CollectionListener.search();
};

laydate.render({
    elem: "#time",
    range: "~",
    change: function (value, date) {
        urlStr("taskNameUrl", value);
        urlStr("failedUrl", value);
        urlStr("successUrl", value);
    }
});

function urlStr(clazz, value) {
    $("." + clazz).each(function () {
        var url = $(this).attr("href");
        $(this).attr("href", url + value);
    });
}


$(function () {
    $("#container").height(tools.getPageSize().pageHeight - 50);
    CollectionListener.search();
});
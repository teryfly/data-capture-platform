$(function () {
    var keyId = parent.Collectionlog.log_id;
    $.ajax({
        url: "/collectionlog/one",    //请求的url地址
        dataType: "json",   //返回格式为json
        data: {keyId: keyId},    //参数值
        type: "POST",   //请求方式
        success: function (data) {
            //请求成功时处理
            $("#condition").empty();
            var status = data.status;
            if (status == 1) {
                status = '执行中';
            } else if (status == 2) {
                status = '执行失败';
            } else if (status == 3) {
                status = '执行成功';
            }
            var success = data.success;
            if (success == 0) {
                success = '失败';
            } else if (success == 1) {
                success = '成功';
            }
            var monitoring_events_name = data.monitoring_events_name;//监听事件
            var broadcast_events_name = data.broadcast_events_name;//广播事件
            var sending_broadcast_events_name = data.sending_broadcast_events_name;//发送广播事件
            var eventType = '';
            if (typeof(monitoring_events_name) == undefined || monitoring_events_name == null || monitoring_events_name == '') {
                eventType = '广播事件';
                monitoring_events_name = '';
                sending_broadcast_events_name = '';
            } else {
                eventType = '监听事件';
                broadcast_events_name = '';
            }
            var html =
                '<tr>' +
                '<td>任务包名称</td>' +
                '<td>' + data.work_untis_name + '</td>' +
                '<td>任务包代码</td>' +
                '<td>' + data.work_untis_code + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>Kettle包名称</td>' +
                '<td>' + data.tran_name + '</td>' +
                '<td>厂商名称</td>' +
                '<td>' + data.third_party_name + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>事件类型</td>' +
                '<td>' + eventType + '</td>' +
                '<td>广播事件名称</td>' +
                '<td>' + broadcast_events_name + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>监听事件名称</td>' +
                '<td>' + monitoring_events_name + '</td>' +
                '<td>发送广播事件名称</td>' +
                '<td>' + sending_broadcast_events_name + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>开始时间</td>' +
                '<td>' + data.begin_time + '</td>' +
                '<td>结束时间</td>' +
                '<td>' + data.end_time + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>执行状态</td>' +
                '<td>' + status + '</td>' +
                '<td>执行结果</td>' +
                '<td>' + success + '</td>' +
                '</tr>' +
                '<tr><td>执行耗时</td>' +
                '<td>' + data.excute_time + 'ms</td>' +
                '</tr>' +
                '<tr>' +
                '<td>错误详情</td>' +
                '<td colspan="3">' + data.condition + '</td></tr>';
            $("#condition").append(html);
        }
    });
});
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
            var cron = data.cron;
            if (cron == '[0 0 0 1/1 * ?]') {
                cron = '每天凌晨执行一次';
            } else if (cron == '[0 0 0/1 * * ? *]') {
                cron = '1小时执行一次';
            } else if (cron == '[0 0 0/12 * * ? *]') {
                cron = '12小时执行一次';
            } else if (cron == '[0 0 0/3 * * ? *]') {
                cron = '3小时执行一次';
            } else if (cron == '[0 0 0/6 * * ? *]') {
                cron = '6小时执行一次';
            } else if (cron == '[0 0/1 * * * ? *]') {
                cron = '1分钟执行一次';
            } else if (cron == '[0 0/10 * * * ? *]') {
                cron = '10分钟执行一次';
            } else if (cron == '[0 0/15 * * * ? *]') {
                cron = '15分钟执行一次';
            } else if (cron == '[0 0/30 * * * ? *]') {
                cron = '30分钟执行一次';
            } else if (cron == '[0 0/5 * * * ? *]') {
                cron = '5分钟执行一次';
            } else if (cron == '[0/30 * * * * ? *]') {
                cron = '30秒执行一次';
            }
            var html =
                '<tr>' +
                '<td>任务包名称</td>' +
                '<td>' + data.work_untis_name + '</td>' +
                '<td>任务包代码</td><td>' + data.work_untis_code + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>Kettle包名称</td>' +
                '<td>' + data.tran_name + '</td>' +
                '<td>厂商名称</td>' +
                '<td>' + data.third_party_name + '</td>' +
                '</tr>' +
                '<tr>' +
                '<td>时间戳字段</td>' +
                '<td>' + data.time_stamp + '</td>' +
                '<td>执行频率</td>' +
                '<td>' + cron + '</td>' +
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
var TaskUpdate = {
    id: 'paraTable',
    row_index: 0,//点击的行数
    taskInfoData: {
        data: [],
    },
    validateFields: {
        work_untis_name: {
            validators: {
                notEmpty: {
                    message: '任务包名称不能为空'
                },
                stringLength: {
                    max: 50,
                    message: '长度不能超过50位'
                }
            }
        },
        work_untis_code: {
            validators: {
                notEmpty: {
                    message: '任务包代码不能为空'
                },
                stringLength: {
                    max: 50,
                    message: '长度不能超过50位'
                },
                remote: {
                    type: 'POST',
                    url: '/taskMag/byWorkUntisCode',
                    data: {
                        work_untis_code: $('#work_untis_code').val(),
                        type: function () {
                            return $('#type').val();
                        },
                        old_name_code: function () {
                            return $('#old_name_code').val();
                        },
                    },
                    dataType: "json",
                    message: "不能出现相同",
                },
            }
        },
        time_stamp: {
            validators: {
                notEmpty: {
                    message: '时间戳不能为空'
                }
            }
        },
        remark: {
            validators: {
                stringLength: {
                    max: 100,
                    message: '备注长度不能超过100位'
                }
            }
        },
        tran_id: {
            validators: {
                notEmpty: {
                    message: '任务包编号不能为空'
                }
            }
        },
        work_untis_name2: {
            validators: {
                notEmpty: {
                    message: '任务包名称不能为空'
                },
                stringLength: {
                    max: 50,
                    message: '长度不能超过50位'
                }
            }
        },
        work_untis_code2: {
            validators: {
                notEmpty: {
                    message: '任务包代码不能为空'
                },
                stringLength: {
                    max: 50,
                    message: '长度不能超过50位'
                },
                remote: {
                    type: 'POST',
                    url: '/taskMag/byWorkUntisCode',
                    data: {
                        work_untis_code2: $('#work_untis_code2').val(),
                        type: function () {
                            return $('#type').val();
                        },
                        old_name_code: function () {
                            return $('#old_name_code').val();
                        },
                        dataType: "json",
                        message: "不能出现相同",
                    },
                }
            },
            remark2: {
                validators: {
                    stringLength: {
                        max: 100,
                        message: '备注长度不能超过100位'
                    }
                }
            },
            tran_id2: {
                validators: {
                    notEmpty: {
                        message: '任务包编号不能为空'
                    }
                }
            }
        }
    }
};

/**
 * 清除数据
 */
TaskUpdate.clearData = function () {
    this.taskInfoData = {};
};

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
TaskUpdate.set = function (key, val) {
    this.taskInfoData[key] = (typeof value == "undefined") ? $("#" + key).val() : value;
    return this;
};

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
TaskUpdate.get = function (key) {
    return $("#" + key).val();
};

/**
 * 关闭此对话框
 */
TaskUpdate.close = function () {
    parent.layer.close(parent.TaskMag.layerIndex);
};

/**
 * 收集数据
 */
TaskUpdate.collectData = function () {
    this.set('id').set('task_id').set('work_untis_name').set('work_untis_code')
        .set('type').set('company_id').set('time_stamp')
        .set('cron').set('status').set('tran_id').set('remark')
        .set('work_untis_code2').set('company_id2').set('status2')
        .set('monitoring_events').set('broadcast_events').set('work_untis_name2')
        .set('tran_id2').set('sending_broadcast_events').set('event');
};

/**
 * 验证数据是否为空
 */
TaskUpdate.validate = function () {
    //$('#taskForm').data("bootstrapValidator").resetForm();
    $('#taskForm').bootstrapValidator('validate');
    return $("#taskForm").data('bootstrapValidator').isValid();
};

/**
 * 初始化表格的列
 */
TaskUpdate.initColumn = function () {
    var columns = [
        {field: 'selectItem', checkbox: true},
        {
            title: '参数名称', field: 'para_name', align: 'center', valign: 'middle', editable: {
                type: 'text',
                title: '参数名称',
                validate: function (value) {
                    if (value.length >= 100) return {newValue: 0, msg: '最大长度100'};
                    else if (value.length <= 0) return {newValue: 0, msg: '最小长度0'};
                }
            }
        },
        {
            title: '参数代码', field: 'para_code', align: 'center', valign: 'middle', editable: {
                type: 'text',
                title: '参数代码',
                validate: function (value) {
                    if (value.length >= 100) return {newValue: 0, msg: '最大长度100'};
                    else if (value.length <= 0) return {newValue: 0, msg: '最小长度0'};
                }
            }
        },
        {
            title: '参数类型', field: 'para_type', align: 'center', valign: 'middle', editable: {
                type: 'text',
                title: '参数类型',
                validate: function (value) {
                    if (value.length >= 100) return {newValue: 0, msg: '最大长度100'};
                    else if (value.length <= 0) return {newValue: 0, msg: '最小长度0'};
                }
            }
        },
        {
            title: '参数值', field: 'para_var', align: 'center', valign: 'middle', editable: {
                type: 'text',
                title: '参数值',
                validate: function (value) {
                    if (value.length >= 100) return {newValue: 0, msg: '最大长度100'};
                    else if (value.length <= 0) return {newValue: 0, msg: '最小长度0'};
                }
            }
        },
        {
            title: '备注', field: 'remark', align: 'center', valign: 'middle', editable: {
                type: 'text',
                title: '备注',
                validate: function (value) {
                    if (value.length >= 200) return {newValue: 0, msg: '最大长度200'};
                    else if (value.length <= 0) return {newValue: 0, msg: '最小长度0'};
                }
            }
        },
    ];
    return columns;
};

/**
 * 检查是否选中
 */
TaskUpdate.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if (selected.length == 0) {
        Feng.info("请先选中表格中的某一记录！");
        return false;
    } else {
        TaskUpdate.seItem = selected[0];
        return true;
    }
};

/**
 * 新增行
 */
TaskUpdate.addRow = function () {
    TaskUpdate.taskInfoData.data.push({row: this.row_index, para_name: "", para_code: "", para_type: "", para_var: "", remark: ""});
    $('#paraTable').bootstrapTable('load', TaskUpdate.taskInfoData.data);
    TaskUpdate.row_index += 1;
};

/**
 * 删除行
 */
TaskUpdate.removeRow = function () {
    if (this.check()) {
        var rows = $('#paraTable').bootstrapTable('getSelections');
        var data = TaskUpdate.taskInfoData.data;
        for (var i = 0; i < rows.length; i++) {
            for (var j = 0; j < data.length; j++) {
                if (rows[i].row == data[j].row) {
                    if (rows[i].id != null && rows[i].id != "") {
                        $.ajax({
                            url: "/taskMag/delPara",    //请求的url地址
                            dataType: "json",   //返回格式为json
                            data: {id: rows[i].id},    //参数值
                            type: "POST",   //请求方式
                            success: function (data) {
                                //请求成功时处理
                            }
                        });
                    }
                    this.taskInfoData.data.splice(j, 1);
                    continue;
                }
            }
        }
        $('#paraTable').bootstrapTable('load', TaskUpdate.taskInfoData.data);
    }
};

TaskUpdate.selectPara = function (id) {
    //查询参数列表
    $.ajax({
        url: "/taskMag/selectParaList",    //请求的url地址
        dataType: "json",   //返回格式为json
        data: {work_units_id: id},    //参数值
        type: "POST",   //请求方式
        success: function (req) {
            if (req != null) {
                for (var i = 0; i < req.length; i++) {
                    req[i].row = TaskUpdate.row_index;
                    TaskUpdate.row_index += 1;
                }
            }
            //请求成功时处理
            TaskUpdate.taskInfoData.data = req;
            $('#paraTable').bootstrapTable('load', TaskUpdate.taskInfoData.data);
        }
    });
};

//菜单修改
TaskUpdate.updateSubmit = function () {
    this.collectData();
    if (!this.validate()) {
        return;
    }
    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/taskMag/update", function (data) {
        Feng.success("修改成功!");
        TaskUpdate.close();
        parent.TaskMag.search();
    }, function (data) {
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.taskInfoData);
    ajax.start();
};

/**
 * 定时实时下拉变化隐藏
 */
$("#type").change(function () {
    if ($(this).val() == 1) {//选中实时的时候 定时div隐藏 实时显示
        $(".timing").addClass("hide");
        $(".realTime").removeClass("hide");
    } else if ($(this).val() == 2) {//选中定时的时候 实时div隐藏 定时显示
        $(".realTime").addClass("hide");
        $(".timing").removeClass("hide");
    }
});

/**
 * 事件下拉变化隐藏
 */
$("#event").change(function () {
    if ($(this).val() == 1) {//监听事件 保留监听事件和发送广播事件 隐藏广播事件
        $(".monitoring_events").removeClass("hide");
        $(".sending_broadcast_events").removeClass("hide");
        $(".broadcast_events").addClass("hide");
    } else if ($(this).val() == 0) {//广播事件 保留广播事件 隐藏监听事件和发送广播事件
        $(".monitoring_events").addClass("hide");
        $(".sending_broadcast_events").addClass("hide");
        $(".broadcast_events").removeClass("hide");
    }
});

$(function () {
    Feng.initValidator("taskForm", TaskUpdate.validateFields);
    //初始化参数表格
    var defaultColunms = TaskUpdate.initColumn();
    var table = new BSTable("paraTable", "", defaultColunms);
    table.setPaginationType("client");//分页
    table.setHeight(300);
    TaskUpdate.table = table.init();
    //id值
    var id = parent.TaskMag.taskId;
    $("#id").val(id);//要修改任务的id
    $.ajax({
        url: "/taskMag/selectTaskOnly",    //请求的url地址
        dataType: "json",   //返回格式为json
        data: {id: id},    //参数值
        type: "POST",   //请求方式
        success: function (data) {
            $("#old_name_code").val(data.work_untis_code);
            //请求成功时处理
            if (data.type == 2) {//定时任务
                $("#type").val(data.type);
                //隐藏实时的div
                $(".timing").removeClass("hide");
                $(".realTime").addClass("hide");

                //监听事件下拉
                Create.createEvent({id: "monitoring_events", placeholder: "请选择监听事件", type: "1", max: "1", min: "1", multiple: false});
                //广播事件下拉
                Create.createEvent({id: "broadcast_events", placeholder: "请选择广播事件", type: "5", max: "1", min: "1", multiple: false});
                //发送广播事件下拉
                Create.createEvent({id: "sending_broadcast_events", placeholder: "请选择发送广播事件", type: "5", max: "1", min: "1", multiple: false});
                Create.createThridParty({id: "company_id2", placeholder: "请选择厂商", max: "1", min: "1", multiple: false});
                Create.createTransformation({id: "tran_id2", placeholder: "请选择任务包", max: "1", min: "1", multiple: false});

                Create.createThridParty({id: "company_id", placeholder: "请选择厂商", max: "1", min: "1", multiple: false, value: data.company_id, formId: "taskForm"});
                Create.createTransformation({id: "tran_id", placeholder: "请选择任务包", max: "1", min: "1", multiple: false, value: data.tran_id, formId: "taskForm"});
                $("#work_untis_code").val(data.work_untis_code);
                $("#work_untis_name").val(data.work_untis_name);
                $("#time_stamp").val(data.time_stamp);
                $("#cron").val(data.cron);
                $("#status").val(data.status);
                $("#remark").val(data.remark);
            } else if (data.type == 1) {//实时任务
                $("#type").val(data.type);
                //隐藏实时的div
                $(".realTime").removeClass("hide");
                $(".timing").addClass("hide");
                $("#work_untis_code2").val(data.work_untis_code);
                $("#work_untis_name2").val(data.work_untis_name);
                $("#status2").val(data.status);
                $("#remark2").val(data.remark);
                if (data.monitoring_events == "" || data.monitoring_events == null || typeof(data.monitoring_events) == undefined) {//监听事件等于""证明是广播事件
                    $("#event").val(0);
                    $(".monitoring_events").addClass("hide");
                    $(".sending_broadcast_events").addClass("hide");
                    $(".broadcast_events").removeClass("hide");
                } else {
                    $("#event").val(1);
                    $(".monitoring_events").removeClass("hide");
                    $(".sending_broadcast_events").removeClass("hide");
                    $(".broadcast_events").addClass("hide");
                }
                Create.createThridParty({id: "company_id2", placeholder: "请选择厂商", max: "1", min: "1", multiple: false, value: data.company_id, formId: "taskForm"});
                Create.createTransformation({id: "tran_id2", placeholder: "请选择任务包", max: "1", min: "1", multiple: false, value: data.tran_id, formId: "taskForm"});
                //监听事件下拉
                Create.createEvent({
                    id: "monitoring_events",
                    placeholder: "请选择监听事件",
                    type: "1",
                    max: "1",
                    min: "1",
                    multiple: false,
                    value: data.monitoring_events,
                    formId: "taskForm"
                });
                //广播事件下拉
                Create.createEvent({
                    id: "broadcast_events",
                    placeholder: "请选择广播事件",
                    type: "5",
                    max: "1",
                    min: "1",
                    multiple: false,
                    value: data.broadcast_events,
                    formId: "taskForm"
                });
                //发送广播事件下拉
                Create.createEvent({
                    id: "sending_broadcast_events",
                    placeholder: "请选择发送广播事件",
                    type: "5",
                    max: "1",
                    min: "1",
                    multiple: false,
                    value: data.sending_broadcast_events,
                    formId: "taskForm"
                });
                TaskUpdate.selectPara(id);
                Create.createThridParty({id: "company_id", placeholder: "请选择厂商", max: "1", min: "1", multiple: false});
                Create.createTransformation({id: "tran_id", placeholder: "请选择任务包", max: "1", min: "1", multiple: false});
            }
        }
    });
});
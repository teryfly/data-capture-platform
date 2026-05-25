$(function () {
    Feng.initValidator("taskForm", TaskAdd.validateFields);
    Create.createThridParty({id: "company_id", placeholder: "请选择厂商", max: "1", min: "1", multiple: false});
    Create.createTransformation({id: "tran_id", placeholder: "请选择任务包", max: "1", min: "1", multiple: false});
    Create.createThridParty({id: "company_id2", placeholder: "请选择厂商", max: "1", min: "1", multiple: false});
    Create.createTransformation({id: "tran_id2", placeholder: "请选择任务包", max: "1", min: "1", multiple: false});
    //监听事件下拉
    Create.createEvent({id: "monitoring_events", placeholder: "请选择监听事件", type: "1", max: "1", min: "1", multiple: false});
    //广播事件下拉
    Create.createEvent({id: "broadcast_events", placeholder: "请选择广播事件", type: "5", max: "1", min: "1", multiple: false});
    //发送广播事件下拉
    Create.createEvent({id: "sending_broadcast_events", placeholder: "请选择发送广播事件", type: "5", max: "1", min: "1", multiple: false});
    //初始化参数表格
    var defaultColunms = TaskAdd.initColumn();
    var table = new BSTable("paraTable", "", defaultColunms);
    table.setPaginationType("client");//分页
    table.setHeight(300);
    TaskAdd.table = table.init();
});

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

var TaskAdd = {
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
                        }
                    },
                    dataType: "json",
                    message: "不能出现相同"
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
                        }
                    },
                    dataType: "json",
                    message: "不能出现相同"
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
};

/**
 * 初始化表格的列
 */
TaskAdd.initColumn = function () {
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
TaskAdd.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if (selected.length == 0) {
        Feng.info("请先选中表格中的某一记录！");
        return false;
    } else {
        TaskAdd.seItem = selected[0];
        return true;
    }
};

/**
 * 新增行
 */
TaskAdd.addRow = function () {
    TaskAdd.taskInfoData.data.push({row: this.row_index, para_name: "", para_code: "", para_type: "", para_var: "", remark: ""});
    $('#paraTable').bootstrapTable('load', TaskAdd.taskInfoData.data);
    TaskAdd.row_index += 1;
};

/**
 * 删除行
 */
TaskAdd.removeRow = function () {
    if (this.check()) {
        var rows = $('#paraTable').bootstrapTable('getSelections');
        var data = this.taskInfoData.data;
        for (var i = 0; i < rows.length; i++) {
            for (var j = 0; j < data.length; j++) {
                if (rows[i].row == data[j].row) {
                    this.taskInfoData.data.splice(j, 1);
                    continue;
                }
            }
        }
    }
    $('#paraTable').bootstrapTable('load', this.taskInfoData.data);
};

/**
 * 清除数据
 */
TaskAdd.clearData = function () {
    this.taskInfoData = {};
};

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
TaskAdd.set = function (key, val) {
    this.taskInfoData[key] = (typeof value == "undefined") ? $("#" + key).val() : value;
    return this;
};

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
TaskAdd.get = function (key) {
    return $("#" + key).val();
};

/**
 * 关闭此对话框
 */
TaskAdd.close = function () {
    parent.layer.close(parent.TaskMag.layerIndex);
};

/**
 * 收集数据
 */
TaskAdd.collectData = function () {
    this.set('task_id').set('work_untis_name').set('work_untis_code')
        .set('type').set('company_id').set('time_stamp')
        .set('cron').set('status').set('tran_id').set('remark')
        .set('work_untis_code2').set('company_id2').set('status2')
        .set('monitoring_events').set('broadcast_events').set('work_untis_name2')
        .set('tran_id2').set('sending_broadcast_events').set('event');
};

/**
 * 验证数据是否为空
 */
TaskAdd.validate = function () {
    //$('#taskForm').data("bootstrapValidator").resetForm();
    $('#taskForm').bootstrapValidator('validate');
    return $("#taskForm").data('bootstrapValidator').isValid();
};

//菜单新增
TaskAdd.addSubmit = function () {
    this.collectData();
    if (!this.validate()) {
        return;
    }
    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/taskMag/insert", function (data) {
        Feng.success("添加成功!");
        TaskAdd.close();
        parent.TaskMag.search();
    }, function (data) {
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.taskInfoData);
    ajax.start();
};
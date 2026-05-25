/**
 * 菜单详情对话框
 */
var RuleInfoDlg = {
    ruleInfoData: {},
    validateFields: {
        column_name: {
            validators: {
                notEmpty: {
                    message: '字段名称不能为空'
                },
                stringLength: {
                    max: 50,
                    message: '长度不能超过50位'
                }
            }
        },
        column_code: {
            validators: {
                notEmpty: {
                    message: '字段编码不能为空'
                },
                stringLength: {
                    max: 50,
                    message: '长度不能超过50位'
                },
                remote: {
                    type: 'POST',
                    url: '/rule/selectRuleByTaskIdAndFieldName',
                    data: {
                        task_id: parent.TreeOperation.id, column_code: function () {
                            return $('#column_code').val();
                        }, old_name: function () {
                            return $('#old_name').val();
                        }
                    },
                    dataType: "json",
                    message: "字段已经存在",
                },
            }
        },
        remark: {
            validators: {
                stringLength: {
                    max: 100,
                    message: '备注不能超过100位'
                }
            }
        }
    }
};

/**
 * 清除数据
 */
RuleInfoDlg.clearData = function () {
    this.ruleInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
RuleInfoDlg.set = function (key, val) {
    this.ruleInfoData[key] = (typeof value == "undefined") ? $("#" + key).val() : value;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
RuleInfoDlg.get = function (key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
RuleInfoDlg.close = function () {
    parent.layer.close(parent.MgrUser.layerIndex);
}

/**
 * 收集数据
 */
RuleInfoDlg.collectData = function () {
    this.set('id').set('task_id').set('column_name').set('column_code').set('is_null').set('regular').set("remark").set('is_pk').set('data_id').set('data_name').set('data_code').set('status').set('old_name');
};

/**
 * 验证数据是否为空
 */
RuleInfoDlg.validate = function () {
    //$('#menuInfoForm').data("bootstrapValidator").resetForm();
    $('#menuInfoForm').bootstrapValidator('validate');
    return $("#menuInfoForm").data('bootstrapValidator').isValid();
};

/**
 * 提交修改
 */
RuleInfoDlg.editSubmit = function () {
    this.clearData();
    this.collectData();
    if (!this.validate()) {
        return;
    }
    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/rule/edit", function (data) {
        Feng.success("修改成功!");
        parent.MgrUser.search();
        RuleInfoDlg.close();
    }, function (data) {
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.ruleInfoData);
    ajax.start();
};

/**
 * 树点击事件
 */
RuleInfoDlg.onClickDept = function (e, treeId, treeNode) {
    $('#menuContent').hide();//数据元树的div隐藏
    //查询树点击节点的详细信息
    if (treeNode.Level != 1) {
        var ajax = new $ax(Feng.ctxPath + "/rule/selectDataElementsOne", function (data) {
            if ($("#column_name").val() == '') {
                $("#column_name").val(data.Name);
                $('#menuInfoForm').data("bootstrapValidator").resetForm();
            }
        }, function (data) {
            Feng.error("查询失败!");
        });
        ajax.set({id: treeNode.id});
        ajax.start();
        $('#data_id').val(treeNode.id);
        $('#data_name').val(treeNode.name);
        $('#data_code').val(treeNode.Identifier);
    } else {
        layer.msg('请选择具体的数据元');
    }
};

/**
 * 显示部门选择的树
 *
 * @returns
 */
RuleInfoDlg.showDeptSelectTree = function () {
    var cityObj = $("#data_name");
    var cityOffset = $("#data_name").offset();
    var width = $("#data_name").width() + 24;
    $("#dataTree").css({
        width: width + "px"
    });
    $("#menuContent").css({
        width: width + "px",
        left: cityOffset.left + "px",
        top: cityOffset.top + cityObj.outerHeight() + "px"
    }).slideDown("fast");
    $("body").bind("mousedown", onBodyDown);
};

/**
 * 隐藏部门选择的树
 */
RuleInfoDlg.hideDeptSelectTree = function () {
    $("#menuContent").fadeOut("fast");
    $("body").unbind("mousedown", onBodyDown);// mousedown当鼠标按下就可以触发，不用弹起
};

function onBodyDown(event) {
    if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(
            event.target).parents("#menuContent").length > 0)) {
        RuleInfoDlg.hideDeptSelectTree();
    }
}

/**
 * 数据元查询框输入值的时候动态查询
 */
$('#select_data_name').keyup(function () {
    var name = $(this).val();
    //生成树
    var ztree = new $ZTree("dataTree", "/rule/dataTree?name=" + name);
    ztree.bindOnClick(RuleInfoDlg.onClickDept);
    ztree.init();
});

$(function () {
    //初始化
    $.ajax({
        type: 'post',
        url: '/rule/rule_edit/' + parent.MgrUser.column_id,
        async: true,
        success: function (data) {
            //赋值
            $("#task_id").val(data.task_id);
            $("#column_name").val(data.column_name);
            $("#old_name").val(data.column_code);
            $("#column_code").val(data.column_code);
            $("#is_null").val(data.is_null);
            $("#regular").val(data.regular);
            $("#remark").val(data.remark);
            $("#is_pk").val(data.is_pk);
            $("#data_id").val(data.data_id);
            $("#data_name").val(data.data_name);
            $("#data_code").val(data.data_code);
            $("#status").val(data.status);
        }
    });
    Feng.initValidator("menuInfoForm", RuleInfoDlg.validateFields);
    $("#id").val(parent.MgrUser.column_id);
    //生成树
    var ztree = new $ZTree("dataTree", "/rule/dataTree");
    ztree.bindOnClick(RuleInfoDlg.onClickDept);
    ztree.init();
});

/**
 * 菜单详情对话框
 */
var MenuInfoDlg = {
    menuInfoData: {},
    ztreeInstance: null,
    validateFields: {
        field_name: {
            validators: {
                notEmpty: {
                    message: '字段名称不能为空'
                },
                stringLength: {
                    min: 2,
                    max: 100,
                    message: '字段名称长度不能小于2位或超过100位'
                }
            }
        },
        china_name: {
            validators: {
                notEmpty: {
                    message: '中文名称不能为空'
                },
                stringLength: {
                    min: 2,
                    max: 100,
                    message: '中文名称长度不能小于2位或超过100位'
                }
            }

        },
        field_type: {
            validators: {
                notEmpty: {
                    message: '字段类型不能为空'
                }
            }
        },
        field_length: {
            validators: {
                notEmpty: {
                    message: '字段长度不能为空'
                },
                digits: {
                    message: '该值只能包含数字'
                },
                stringLength: {
                    max: 5,
                    message: '字段长度的长度不能超过5位'
                }
            }
        },
        is_null: {
            validators: {
                notEmpty: {
                    message: '是否必填不能为空'
                }
            }
        },
//        regular_id: {
//            validators: {
//                stringLength: {
//                    max: 6,
//                    message: '正则表达式长度不能超过6位'
//                }
//            }
//        },
        dictionary_id: {
            validators: {
                stringLength: {
                    max: 6,
                    message: '值域代码长度不能超过6位'
                }
            }
        },
        format: {
            validators: {
                stringLength: {
                    max: 50,
                    message: '格式长度不能超过50位'
                }
            }
        },
        is_zero: {
            validators: {

            }
        },
        identifier_code: {
            validators: {
                stringLength: {
                    max: 20,
                    message: '标识符编码不能超过20位'
                }
            }
        },
        remark: {
            validators: {
                stringLength: {
                    max: 200,
                    message: '备注不能超过200位'
                }
            }
        }
    }
};

/**
 * 清除数据
 */
MenuInfoDlg.clearData = function () {
    this.menuInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
MenuInfoDlg.set = function (key, val) {
    this.menuInfoData[key] = (typeof value == "undefined") ? $("#" + key).val() : value;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
MenuInfoDlg.get = function (key) {
    return $("#" + key).val();
}

/**
 * 关闭此对话框
 */
MenuInfoDlg.close = function () {
    parent.layer.close(window.parent.MgrUser.layerIndex);
}

/**
 * 收集数据
 */
MenuInfoDlg.collectData = function () {
    this.set('field_name').set('china_name').set('field_type').set('field_length').
    set('is_null').set('regular_id').set('dictionary_id').set('format').
    set("is_zero").set("identifier_code").set("remark");
}

/**
 * 验证数据是否为空
 */
MenuInfoDlg.validate = function () {
    $('#menuInfoForm').data("bootstrapValidator").resetForm();
    $('#menuInfoForm').bootstrapValidator('validate');
    return $("#menuInfoForm").data('bootstrapValidator').isValid();
}

/**
 * 提交添加用户
 */
MenuInfoDlg.addSubmit = function () {

    this.clearData();
    this.collectData();

    if (!this.validate()) {
        return;
    }

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/rule/add/"+window.parent.tempUniqeId, function (data) {
        Feng.success("添加成功!");
        //刷新当前系统表格
        var queryData = {};
        queryData['unique_id'] = window.parent.tempUniqeId;
        queryData['url'] = "/rule/list";
        window.parent.MgrUser.table.refresh({query: queryData});
        MenuInfoDlg.close();
    }, function (data) {
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.menuInfoData);
    ajax.start();
}

/**
 * 提交修改
 */
MenuInfoDlg.editSubmit = function () {

    this.clearData();
    this.collectData();

    if (!this.validate()) {
        return;
    }

    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/rule/edit/"+window.parent.tempUniqeId, function (data) {
        Feng.success("修改成功!");
        //刷新当前系统表格
        var queryData = {};
        queryData['unique_id'] = window.parent.tempUniqeId;
        queryData['url'] = "/rule/list";
        window.parent.MgrUser.table.refresh({query: queryData});
        MenuInfoDlg.close();
    }, function (data) {
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.menuInfoData);
    ajax.start();
}

/**
 * 点击父级编号input框时
 */
MenuInfoDlg.onClickDept = function (e, treeId, treeNode) {
    $("#pcodeName").attr("value", MenuInfoDlg.ztreeInstance.getSelectedVal());
    $("#pcode").attr("value", treeNode.id);
};


/**
 * 显示父级菜单选择的树
 */
MenuInfoDlg.showMenuSelectTree = function () {
    Feng.showInputTree("pcodeName", "pcodeTreeDiv", 15, 34);
};



$(function () {
    Feng.initValidator("menuInfoForm", MenuInfoDlg.validateFields);

    //判断当前的操作
    if (window.parent.current_operation == 'add'){
        //添加时不初始化
    } else if (window.parent.current_operation == 'edit'){
        //初始化
        $.ajax({
            type : 'post',
            url : '/rule/rule_edit/'+ window.parent.tempUniqeId + "/" + window.parent.tempFieldName,
            async : true,
            success : function(data) {
                console.log(data);
                //赋值
                $("#field_name").val(data.field_name);
                $("#china_name").val(data.china_name);
                $("#field_type").val(data.field_type);
                $("#field_length").val(data.field_length);
                $("#is_null").val(data.is_null);
                $("#regular_id").val(data.regular_id);
                $("#dictionary_id").val(data.dictionary_id);
                $("#format").val(data.format);
                $("#is_zero").val(data.is_zero);
                $("#identifier_code").val(data.identifier_code);
                $("#remark").val(data.remark);
            }
        });
    }

});

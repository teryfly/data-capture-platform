let treeData = JSON.parse(sessionStorage.getItem('treeData'))
let handleNode = JSON.parse(sessionStorage.getItem('handleNode'))
$(function () {
    //隐藏表名称输入框
    // $("#id").val(parent.TreeOperation.id);
    // //提交信息
    // var ajax = new $ax(Feng.ctxPath + "/task/child", function (data) {
    //     $("#type").val(data.type);
    //     $("#old_pid").val(data.pid);
    //     Create.createPid({id: "pid", placeholder: "请选择父节点", max: 1, min: 1, multiple: false, vType: $("#type").val(), value: data.pid});
    //     $("#hdr_name").val(data.hdr_name);
    //     $("#hdr_code").val(data.hdr_code);
    //     $("#old_name").val(data.hdr_code);//记住旧的HDR管理代码
    //     $("#status").val(data.status);
    //     $("#remark").val(data.remark);
    //     $("#is_test").val(data.is_test);
    // }, function (data) {
    //     Feng.error("修改失败!" + data.responseJSON.message + "!");
    // });
    // ajax.set({id: $("#id").val()});
    // ajax.start();
    // Feng.initValidator("taskForm", TaskUpdate.validateFields);
    let option = '';
    for (const key in treeData) {
        option += `<option value="${treeData[key].id}">${treeData[key].name}</option>`
    }
    option += `<option value="0">顶级节点</option>`
    $('#pid').empty().append(option)
    handleNode.pid ? $('#pid').val(handleNode.pid) : $('#pid').val(0)
    $('#nodeName').val(handleNode.nodeName)
    $('#nodeCode').val(handleNode.nodeCode)
    $('#remark').val(handleNode.remark)
    $('#nodeType').val(handleNode.nodeType)
});


var TaskUpdate = {
    taskInfoData: {},
    validateFields: {
        nodeType: {
            validators: {
                notEmpty: {
                    message: '节点类型不能为空'
                },
                // stringLength: {
                //     max: 50,
                //     message: '长度不能超过50位'
                // }
            }
        },
        pid: {
            validators: {
                notEmpty: {
                    message: '父节点不能为空'
                },
                // stringLength: {
                //     max: 50,
                //     message: '长度不能超过50位'
                // },
                // remote: {
                //     type: 'POST',
                //     url: '/task/selectTaskByNameAndPid',
                //     data: {
                //         pid: function () {
                //             return $('#pid').val();
                //         },
                //         hdr_code: function () {
                //             return $('#hdr_code').val();
                //         }
                //     },
                //     dataType: "json",
                //     message: "同级不能出现相同"
                // },
            }
        },
        nodeName: {
            validators: {
                notEmpty: {
                    message: '节点名字不能为空'
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
    parent.layer.close(parent.TreeOperation.layerIndex);
};

/**
 * 收集数据
 */
TaskUpdate.collectData = function () {
    this.set('id').set('type').set('hdr_name').set('hdr_code').set('is_test').set('status').set('remark').set('pid');
};

/**
 * 验证数据是否为空
 */
TaskUpdate.validate = function () {
    //$('#taskForm').data("bootstrapValidator").resetForm();
    $('#taskForm').bootstrapValidator('validate');
    return $("#taskForm").data('bootstrapValidator').isValid();
};

//文件夹分类下拉变化
$("#type").change(function () {
    Create.createPid({id: "pid", placeholder: "请选择父节点", max: 1, min: 1, multiple: false, vType: $(this).val()});
});

/**
 * loading 效果
 */

function loading(msg) {
    layer.msg(msg, {
        icon: 16,
        shade: [0.6, '#000005'],//遮罩的颜色与透明度
        time: false  //取消自动关闭
    })
}

//菜单修改
TaskUpdate.updateSubmit = function () {
    //提交信息
    // var ajax = new $ax(Feng.ctxPath + "/task/save", function (data) {
    //     Feng.success("修改成功!");
    //     parent.TreeOperation.getChildData(parent.TreeOperation.id);
    //     TaskUpdate.close();
    //     parent.MgrUser.init();
    // }, function (data) {
    //     Feng.error("修改失败!" + data.responseJSON.message + "!");
    // });
    // ajax.set(this.taskInfoData);
    // ajax.start();
    if (!$('#nodeType').val()){
        layer.msg('节点类型不能为空')
    }
    if (!$('#nodeName').val()){
        layer.msg('节点名字不能为空')
    }
    if (!$('#pid').val()){
        layer.msg('父节点不能为空')
    }
    return new  Promise((resolve, reject) => {
        this.clearData();
        this.collectData();
        if (!this.validate()) {
            return;
        }
        //提交信息
        let data = {
            pid:$('#pid').val(),
            nodeName:$('#nodeName').val(),
            nodeCode:$('#nodeCode').val(),
            remark:$('#remark').val(),
            treeType:handleNode?handleNode.treeType:1,
            nodeType:$('#nodeType').val(),
            id:handleNode.id
        }
        $.ajax({
            url: '/tree/updateNode',
            data: JSON.stringify(data),
            contentType: 'application/json',
            type: 'post',
            beforeSend:()=>{
                loading('正在修改')
            },
            success: res => {
                layer.closeAll()
                resolve(res)
            },
            error:err=>{
                layer.closeAll()
                layer.msg(err.responseJSON.message)
                reject(err)
            }
        })
    })

};
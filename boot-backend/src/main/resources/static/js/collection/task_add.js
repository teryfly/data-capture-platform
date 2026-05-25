let treeData = JSON.parse(sessionStorage.getItem('treeData'))
let handleNode = JSON.parse(sessionStorage.getItem('handleNode'))
$(function () {
    // Feng.initValidator("taskForm", TaskAdd.validateFields);
    // Create.createPid({id: "pid", placeholder: "请选择父节点", max: 1, min: 1, multiple: false, vType: $("#type").val(), value: parent.TreeOperation.id});
    // let option = '';
    // for (const key in treeData) {
    //     option += `<option value="${treeData[key].id}">${treeData[key].name}</option>`
    // }
    let option = `<option value="0">顶级节点</option>`
    if (handleNode){
        option += `<option value=${handleNode.id}>${handleNode.nodeName}</option>`
    }
    $('#pid').empty().append(option)
    handleNode? $('#pid').val(handleNode.id?handleNode.id:0):$('#pid').val(0)
});

var TaskAdd = {
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
    parent.layer.close(parent.TreeOperation.layerIndex);
};

/**
 * 收集数据
 */
TaskAdd.collectData = function () {
    this.set('pid').set('treeType').set('nodeName').set('nodeCode').set('remark');
};

/**
 * 验证数据是否为空
 */
TaskAdd.validate = function () {
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

//菜单新增
TaskAdd.addSubmit = function () {

    // //提交信息
    // var ajax = new $ax(Feng.ctxPath + "/task/submit", function (data) {
    //     Feng.success("新增成功!");
    //     TaskAdd.close();
    //     parent.MgrUser.init();
    // }, function (data) {
    //     Feng.error("新增失败!" + data.responseJSON.message + "!");
    // });
    // ajax.set(this.taskInfoData);
    // ajax.start();
    let treeType = JSON.parse(sessionStorage.getItem('treeType')).treeType

    if (!$('#nodeType').val()){
        layer.msg('节点类型不能为空')
        return
    }
    if (!$('#nodeName').val()){
        layer.msg('节点名字不能为空')
        return
    }
    if (!$('#pid').val()){
        layer.msg('父节点不能为空')
        return
    }
    // if (!handleNode.treeType){
    //     layer.msg('请选择类别')
    //     return
    // }
    return new Promise((resolve, reject) => {
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
            treeType:treeType,
            nodeType:$('#nodeType').val(),
        }
        $.ajax({
            type:'post',
            url:'/tree/insertNode',
            contentType:'application/json',
            data:JSON.stringify(data),
            beforeSend:()=>{
                loading('正在新增')
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
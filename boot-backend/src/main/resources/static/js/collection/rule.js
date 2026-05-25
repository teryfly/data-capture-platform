var mechanismId;         //定义变量
var isMenu;              //变量记录改节点是否是菜单，为“1”是最小子节点，为“0”是菜单
var tempUniqeId;        //临时保存主键id
var cid;                //临时保存当前的cid
var tempFieldName;      //临时保存当前选中的字段名
var current_operation;  //记录当前的操作

/**
 * 单例
 */
var Menu = {
    id: "menuTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1
};

/**
 * 任务管理
 */
var MgrUser = {
    id: "menuTable",//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1,
    hospital_id: 0,
    validateFields: {}
};

/**
 * 初始化表格的列
 */
MgrUser.initColumn = function () {
    var columns = [
        {field: 'selectItem', radio: true},
        {title: 'id', field: 'id', visible: false, align: 'center', valign: 'middle'},
        {title: '模板名称', field: 'title', align: 'center', valign: 'middle'},
        {title: '发送对象', field: 'recipient', align: 'center', valign: 'middle'},
        {title: '创建时间', field: 'createtime', align: 'center', valign: 'middle'},
        {title: '创建人', field: 'userid', align: 'center', valign: 'middle'},
        {
            title: '状态', field: 'status', align: 'center', valign: 'middle', formatter: function (value, options, rowData) {
                if (value == 1) {
                    return '启用';
                } else {
                    return '禁用';
                }
            }
        }];
    return columns;
};

/**
 * 验证数据是否为空
 */
MgrUser.validate = function () {
    $('#taskForm').data("bootstrapValidator").resetForm();
    $('#taskForm').bootstrapValidator('validate');
    return $("#taskForm").data('bootstrapValidator').isValid();
}


/**
 * 树的点击事件
 * @param e
 * @param treeId
 * @param treeNode
 */
MgrUser.onClickDept = function (e, treeId, treeNode) {

    mechanismId = treeNode.id;
    MgrUser.hospital_id = treeNode.id;
    isMenu = treeNode.text;
    if (isMenu == "1") {
        tempUniqeId = treeNode.uniqeId;
        MgrUser.search();
    } else {
        //不操作
    }

};

MgrUser.search = function () {
    var queryData = {};

    queryData['unique_id'] = tempUniqeId;
    queryData['url'] = "/rule/list";
    queryData['field_name'] = $("#field_name").val();
    $("#field_name").val("");

    MgrUser.table.refresh({query: queryData});
};


/**
 * 点击子节点
 * 查询子节点数据并赋值到右边框中显示
 * @param uniqeId
 */
MgrUser.getChildData = function (unique_id) {
    //刷新表格
    Menu.updateData(unique_id);
};

//初始化页面
MgrUser.init = function () {
    //生成树
    var ztree = new $ZTree("deptTree", "/task/list");
    ztree.bindOnClick(MgrUser.onClickDept);
    ztree.init();
};


//================================================分割线======上面为左边树======下面为右边表格的===========================


/**
 * 初始化表格的列
 */
MgrUser.initColumn2 = function () {
    var columns = [
        {field: 'selectItem', radio: true},
        {title: '字段名称', field: 'field_name', align: 'center', valign: 'middle'},
        {title: '中文名称', field: 'china_name', align: 'center', valign: 'middle', width: '17%'},
        {
            title: '字段类型', field: 'field_type', align: 'center', valign: 'middle', width: '10%', formatter: function (value, options, rowData) {
                if (value == "0") {
                    return '字符串';
                } else if (value == "1") {
                    return '时间';
                } else if (value == "2") {
                    return '浮点';
                } else if (value == "3") {
                    return '整型';
                }
            }
        },
        {title: '字段长度', field: 'field_length', align: 'center', valign: 'middle'},
        {
            title: '是否必填', field: 'is_null', align: 'center', valign: 'middle', width: '10%', formatter: function (value, options, rowData) {
                if (value == 1) {
                    return '必填';
                } else if (value == 0) {
                    return '不必填';
                }
            }
        },
        {title: '数据规则', field: 'regular_id', align: 'center', valign: 'middle'},
        {title: '值域代码', field: 'dictionary_id', align: 'center', valign: 'middle'},
        {title: '格式', field: 'format', align: 'center', valign: 'middle'},
        {
            title: '是否允许为0', field: 'is_zero', align: 'center', valign: 'middle', width: '10%', formatter: function (value, options, rowData) {
                if (value == 1) {
                    return '允许';
                } else if (value == 0) {
                    return '不允许';
                }
            }
        },
        {title: '标识符编码', field: 'identifier_code', align: 'center', valign: 'middle'},
        {title: '备注', field: 'remark', align: 'center', valign: 'middle', width: '40%'}
    ];
    return columns;
};

/**
 * 检查是否选中
 */
MgrUser.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if (selected.length == 0) {
        Feng.info("请先选中表格中的某一记录！");
        return false;
    } else {
        MgrUser.seItem = selected[0];
        return true;
    }
};

/**
 * 点击添加规则
 */
MgrUser.add = function () {
    if (isMenu == "0") {
        layer.alert('不是任务... ...', {
            skin: 'layui-layer-molv' //样式类名
            , closeBtn: 0
        });
        return;
    }

    current_operation = 'add';
    if (mechanismId != null) {
        var index = layer.open({
            type: 2,
            title: '添加规则',
            area: ['838px', '750px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/pages/collection/datadocking/rule_add.html',
            btn: ['提交', '取消'],
            btnAlign: 'c',
            btn1: function (index, layero) {
                var iframeWin = layero.find('iframe')[0]; //得到iframe页的窗口对象
                iframeWin.contentWindow.MenuInfoDlg.addSubmit();//doSubmit 是你在弹出层的那个jsp里写的表单提交方法
            },
            btn2: function (index, layero) {
                //按钮【按钮二】的回调

            }
        });
        this.layerIndex = index;
    }
};

/**
 * 点击修改按钮时
 * @param userId 管理员id
 */
MgrUser.openChangeUser = function () {
    if (this.check()) {
        //将当前选中行的名称赋值给临时变量
        tempFieldName = this.seItem.field_name;
        current_operation = 'edit';

        var index = layer.open({
            type: 2,
            title: '修改规则',
            area: ['838px', '750px'], //宽高
            fix: false, //不固定
            maxmin: true,
            //content: Feng.ctxPath + '/rule/rule_edit/' + tempUniqeId+"/"+this.seItem.field_name,
            content: Feng.ctxPath + '/pages/collection/datadocking/rule_edit.html',
            btn: ['保存', '取消'],
            btnAlign: 'c',
            btn1: function (index, layero) {
                var iframeWin = layero.find('iframe')[0]; //得到iframe页的窗口对象
                iframeWin.contentWindow.MenuInfoDlg.editSubmit();//doSubmit 是你在弹出层的那个jsp里写的表单提交方法
            },
            btn2: function (index, layero) {
                //按钮【按钮二】的回调

            }
        });
        this.layerIndex = index;
        document.activeElement.blur();
    }
};

/**
 * 点击角色分配
 * @param
 */
MgrUser.roleAssign = function () {
    if (this.check()) {
        var index = layer.open({
            type: 2,
            title: '角色分配',
            area: ['300px', '400px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/mgr/role_assign/' + this.seItem.id
        });
        this.layerIndex = index;
    }
};

/**
 * 删除用户
 */
MgrUser.delRule = function () {
    if (this.check()) {
        var operation = function () {
            var field_name = MgrUser.seItem.field_name;
            var ajax = new $ax(Feng.ctxPath + "/rule/delete/" + tempUniqeId, function () {
                Feng.success("删除成功!");
                //刷新当前系统表格
                var queryData = {};
                queryData['unique_id'] = tempUniqeId;
                queryData['url'] = "/rule/list";
                MgrUser.table.refresh({query: queryData});
            }, function (data) {
                Feng.error("删除失败!" + data.responseJSON.message + "!");
            });
            ajax.set("field_name", field_name);
            ajax.start();
        };

        Feng.confirm("是否删除规则：" + MgrUser.seItem.field_name + "?", operation);
    }
};

/**
 * 冻结用户账户
 * @param userId
 */
MgrUser.freezeAccount = function () {
    if (this.check()) {
        var userId = this.seItem.id;
        var ajax = new $ax(Feng.ctxPath + "/sys_doctor/freeze", function (data) {
            Feng.success("冻结成功!");
            MgrUser.table.refresh();
        }, function (data) {
            Feng.error("冻结失败!" + data.responseJSON.message + "!");
        });
        ajax.set("userId", userId);
        ajax.start();
    }
};

/**
 * 解除冻结用户账户
 * @param userId
 */
MgrUser.unfreeze = function () {
    if (this.check()) {
        var userId = this.seItem.id;
        var ajax = new $ax(Feng.ctxPath + "/sys_doctor/unfreeze", function (data) {
            Feng.success("解除冻结成功!");
            MgrUser.table.refresh();
        }, function (data) {
            Feng.error("解除冻结失败!");
        });
        ajax.set("userId", userId);
        ajax.start();
    }
}

MgrUser.resetSearch = function () {
    $("#name").val("");
    $("#beginTime").val("");
    $("#endTime").val("");

    MgrUser.search();
}

var pagesize = tools.getPageSize();

$(function () {

    MgrUser.init();

    var defaultColunms = MgrUser.initColumn2();
    var table = new BSTable("menuTable", "/rule/list", defaultColunms);
    table.setPaginationType("client");//分页
    table.setPagination(false);

    MgrUser.table = table.init();

});


sessionStorage.removeItem('treeData')
sessionStorage.removeItem('handleNode')
sessionStorage.setItem('treeType',JSON.stringify({treeType: 1}))

/**
 *
 * @type {number} 请求厂商：1 医院：2
 */
let tabType = 1

/**
 * tab事件
 */

layui.use(['layer', 'element'], function () {
    var $ = layui.jquery,
        layer = layui.layer;
    var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
    element.on('tab(tabSelect)', function (data) {
        //初始化数据
        $('#deptTree').empty()
        $('#newTree').empty()
        handleNode = {}
        TreeOperation.id = ''
        TreeOperation.text = ''
        TreeOperation.layerIndex = -1
        sessionStorage.removeItem('handleNode')
        if (data.index) {
            tabType = 2
            sessionStorage.setItem('treeType', JSON.stringify({treeType: 2}))
            MgrUser.init(tabType)
        } else {
            tabType = 1
            sessionStorage.setItem('treeType', JSON.stringify({treeType: 1}))
            MgrUser.init(tabType)
        }

    });
})

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

/**
 * 规则管理
 */
var MgrUser = {
    id: "managerTable",//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1,
    field_name: "",
    column_id: ""
};


/**
 * 编辑器设置
 *
 */
let editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,	//显示行号
    theme: "ayu-mirage",	//设置主题
    lineWrapping: true,	//代码折叠
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    matchBrackets: true,	//括号匹配
    mode: 'xml'
});
//设置编辑器的宽高
editor.setSize('auto', '600px')
//修改背景
// editor.setOption("theme", theme);
/**
 * xml 文件失焦提交
 */
editor.on('blur', () => {
    let xml = editor.getValue()
    console.log(handleNode)
    if (handleNode.id && handleNode.nodeType == 2) {
        if (!xml) {
            layer.msg('不能提交空文件')
            return false
        }
        $.ajax({
            url: '/tree/leaf/save',
            contentType: 'application/json',
            type: 'post',
            data: JSON.stringify({
                treeId: handleNode.id,
                xml: xml,
            }),
            success: result => {
                if (result.code == 200) {
                    layer.msg('xml文件上传成功')
                } else {
                    layer.msg(result.message)
                }
            }
        })
    } else {
        layer.msg('请选择叶节点')
        return false
    }

})

/**
 * 多选框数据渲染
 */
let multipleSelect = xmSelect.render({
    // 这里绑定css选择器
    el: '#multipleSelect',
    filterable: true,
    autoRow: true,
    // paging: true,
    // 渲染的数据
    data: [],
})
let selectData = async () => {
    let data = await mechanism()
    let arr = []
    for (const dataKey in data) {
        let obj = {
            name: data[dataKey].name,
            value: data[dataKey].name
        }
        arr.push(obj)
    }
    multipleSelect.update({
        data: arr
    })
}
selectData()
// 变量, demo1 可以通过API操作
// 获取选中值, demo1.getValue();
// 设置选中值, demo1.setValue([{ name: '动态值', value: 999 }])
// ...

/**
 * 上传修改的xml文件
 */
function getEditText() {
    let tree = $.fn.zTree.getZTreeObj('deptTree')
    let editValue = editor.getValue()
    let selectValue = multipleSelect.getValue()
    let checkedValue = tree.getCheckedNodes()
    let rootNode = []
    for (const arrKey in checkedValue) {
        if (!checkedValue[arrKey].pId && checkedValue[arrKey].checked) {
            rootNode.push(checkedValue[arrKey])
        }
    }
    let result = []
    for (const key in rootNode) {
        result.push(getPath([rootNode[key]], '', []))
    }
    let orgNames = []
    let nodeIds = []
    for (const key in selectValue) {
        let item = selectValue[key]
        orgNames.push(item.name)
    }
    for (const key in checkedValue) {
        let item = checkedValue[key]
        if (item.nodeType == 2) {
            nodeIds.push(item.id)
        }
    }
    if (!nodeIds.length) {
        layer.msg('请选择叶节点')
        return
    }
    $.ajax({
        url: ExternalConfig.pentaho.url + "/pentaho/importFolderAndFile",
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({
            url: ExternalConfig.pentaho.url,
            username: ExternalConfig.pentaho.username,
            password: ExternalConfig.pentaho.password,
            orgNames: orgNames,
            nodeIds: nodeIds
        }),
        beforeSend: () => {
            loading('正在上传')
        },
        success: (result) => {
            if (result.code = 200) {
                layer.msg('上传成功')
            } else {
                layer.msg(result.message)
            }
        },
        error: err => {
            layer.closeAll()
            layer.msg('上传失败')
        }
    })
}

/**
 * 获取path路径
 */

function getPath(arr, str, newArr) {
    // let obj = {}
    // let newArr = []
    // for (const arrKey in arr) {
    //     //判断是否有父节点id
    //
    //     //判断是否为根节点
    //    if (!arr[arrKey].pId){
    //         newArr.push({
    //             id:arr[arrKey].id,
    //             name:[arr[arrKey].name]
    //         })
    //         obj[arr[arrKey].pId] = arr[arrKey].pId
    //         continue
    //     }
    //     if (!obj[arr[arrKey].pId]){
    //         newArr.push({
    //             pId:arr[arrKey].pId,
    //             name:[arr[arrKey].name]
    //         })
    //         obj[arr[arrKey].pId] = arr[arrKey].pId
    //     }else {
    //         for (const newArrKey in newArr) {
    //             if (newArr[newArrKey].pId == arr[arrKey].pId){
    //                 newArr[newArrKey].name.push(arr[arrKey].name)
    //                 break
    //             }
    //         }
    //     }
    // }
    for (const arrKey in arr) {
        if (arr[arrKey].children && arr[arrKey].checked) {
            str = str + `/${arr[arrKey].name}`
            getPath(arr[arrKey].children, str, newArr)
        } else {
            if (arr[arrKey].checked) {
                let item = {...arr[arrKey]}
                let newStr = str.split('/')
                newStr.splice(0, 1)
                if (newStr.length > arr[arrKey].level) {
                    let array = [];
                    let level = arr[arrKey].level
                    array = newStr.slice(0, level - 1)
                    array.push(newStr[newStr.length - 1])
                    newStr = array
                }
                let name = ''
                for (const key in newStr) {
                    name += `/${newStr[key]}`
                }
                item.name = `${name}/${item.name}`
                newArr.push(item)
            }
        }
    }
    return newArr
}

/**
 * 机构列表
 */

function mechanism() {
    return $.ajax({
        url: '/fhir/global/base/mechanismList',
        contentType: 'application/json',
        type: 'post',
        dataType: 'json',
        async: true,
        data: JSON.stringify({searchKey: ''}),
        processData: false,
        success: function (res) {
            return res
        }
    })

}


/**
 * 下拉框度多选
 */
// $('#multipleSelect').

/**
 * xml文件请求
 */

/**
 * 初始化表格的列
 */
MgrUser.initColumn = function () {
    var columns = [
        {field: 'selectItem', radio: true, visible: false},
        {title: '字段名称', field: 'column_name', align: 'center', valign: 'middle'},
        {title: '字段编码', field: 'column_code', align: 'center', valign: 'middle'},
        {title: '数据类型', field: 'DataType', align: 'center', valign: 'middle'},
        {title: '数据长度', field: 'DataLength', align: 'center', valign: 'middle'},
        {
            title: '是否必填',
            field: 'is_null',
            align: 'center',
            valign: 'middle',
            formatter: function (value, options, rowData) {
                if (value == 1) {
                    return '必填';
                } else if (value == 0) {
                    return '不必填';
                }
            }
        },
        {
            title: '是否主键',
            field: 'is_pk',
            align: 'center',
            valign: 'middle',
            formatter: function (value, options, rowData) {
                if (value == 1) {
                    return '是';
                } else if (value == 0) {
                    return '否';
                }
            }
        },
        {title: '数据规则', field: 'regular', align: 'center', valign: 'middle'},
        {title: '表示格式', field: 'DataFormat', align: 'center', valign: 'middle'},
        {title: '备注', field: 'remark', align: 'center', valign: 'middle', width: '30%'},
        {
            field: 'operate',
            title: '操作',
            width: '10%',
            align: 'center',
            valign: 'middle',
            events: operateEvents1,
            formatter: operateFormatter
        },
    ];
    return columns;
};

/**
 * 实现按钮
 * @type {{"click .tabUpdate": Window.operateEvents1.click .tabUpdate, "click .tabDel": Window.operateEvents1.click .tabDel}}
 */
window.operateEvents1 = {
    'click .tabUpdate': function (e, value, row, index) {
        MgrUser.column_id = row.id;
        MgrUser.field_name = row.field_name;
        var index = layer.open({
            type: 2,
            title: '修改字段',
            area: ['50%', '80%'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/pages/collection/datadocking/rule_edit.html',
            btn: ['修改', '取消'],
            btnAlign: 'c',
            btn1: function (index, layero) {
                var iframeWin = layero.find('iframe')[0]; //得到iframe页的窗口对象
                iframeWin.contentWindow.RuleInfoDlg.editSubmit();//doSubmit 是你在弹出层的那个jsp里写的表单提交方法
            },
            btn2: function (index, layero) {
                //按钮【按钮二】的回调
            }
        });
        MgrUser.layerIndex = index;
        document.activeElement.blur();
    },
    'click .tabDel': function (e, value, row, index) {
        //询问框
        layer.confirm('确定删除' + row.column_name + '字段', {
            btn: ['确定', '取消'], //按钮
            btnAlign: 'c',
        }, function () {
            var ajax = new $ax(Feng.ctxPath + "/rule/delete", function (data) {
                layer.msg(data.message);
                MgrUser.search();
            });
            ajax.set({id: row.id});
            ajax.start();
        }, function () {
        });
    }
};

/**
 * 实现按钮
 * @param value
 * @param row
 * @param index
 * @returns {string}
 */
function operateFormatter(value, row, index) {
    return [
        '<button id="tabUpdate" type="button" class="tabUpdate btn btn-info btn-xs">修改</button><button id="tabDel" type="button" class="tabDel btn btn-info btn-xs">d</button>',
    ].join('');
};

MgrUser.search = function () {
    var queryData = {};
    queryData['task_id'] = TreeOperation.id;
    MgrUser.table.refresh({query: queryData});
};

//点击新增字段按钮
MgrUser.addTab = function () {
    if (TreeOperation.id == '') {
        layer.msg('请选择要操作的表');
        return;
    } else if (TreeOperation.text != 3) {
        layer.msg("只能对表进行添加字段");
        return;
    }
    var index = layer.open({
        type: 2,
        title: '添加字段',
        area: ['50%', '80%'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/pages/collection/datadocking/rule_add.html',
        btn: ['添加', '取消'],
        btnAlign: 'c',
        btn1: function (index, layero) {
            var iframeWin = layero.find('iframe')[0]; //得到iframe页的窗口对象
            iframeWin.contentWindow.RuleInfoDlg.addSubmit();//doSubmit 是你在弹出层的那个jsp里写的表单提交方法
        },
        btn2: function (index, layero) {
            //按钮【按钮二】的回调
        }
    });
    this.layerIndex = index;
    document.activeElement.blur();
};
/**
 * 节点树数据
 */
let treeData = []

//初始化页面
MgrUser.init = function (type) {
    //验证输入框
    Feng.initValidator("taskForm", MgrUser.validateFields);
    //生成树
    var ztree = new $ZTree("deptTree", "/tree/load");
    ztree.bindOnClick(TreeOperation.onClickDept);
    ztree.bindBeforeDrag(TreeOperation.beforeDrag);
    ztree.bindBeforeDrop(TreeOperation.beforeDrop);
    ztree.bindOnDblClick(TreeOperation.bindOnDblClick)
    ztree.loadNodes().then(res => {
        treeData = res
        sessionStorage.setItem('treeData', JSON.stringify(treeData))
    })
    ztree.init({check: true, edit: true}, type, extend())
    // var treeObj = $.fn.zTree.getZTreeObj("deptTree");
    // treeObj.checkAllNodes(false)
    var defaultColunms = MgrUser.initColumn();
    var table = new BSTable("managerTable", "/rule/list", defaultColunms);
    table.setPaginationType("client");//分页
    MgrUser.table = table.init();

    var defaultColunms2 = TimingData.initColumn();
    var table2 = new BSTable("matchingTable", "/timingData/selectTaskDepByTableId", defaultColunms2);
    table2.setPaginationType("client");//分页
    TimingData.table = table2.init();
};

$(function () {
    MgrUser.init(tabType);
});

/******************************************************左边树操作*************************************************************/
var TreeOperation = {
    id: '',//当前节点id
    text: '',//当前文件分类
    layerIndex: -1,
    nodeType: '',//文件或文件夹
};

let handleNode = {
    pid: "",
    nodeName: "",
    nodeCode: "",
    remark: "",
    treeType: "",
    nodeType: "",
    pidName: ''
}

/**
 * 获取展开项的节点
 */

function extend() {
    let treeObj = $.fn.zTree.getZTreeObj('deptTree');
    if (!treeObj) {
        return null
    }
    let node = treeObj.getNodes();
    // let arr = []
    // for (const key in node) {
    //     let item = node[key]
    //     if (item.open) {
    //         arr.push(item)
    //     }
    // }
    let arr = selectOpen(node, [])
    return arr
}

/**
 * 递归查询展开的节点
 */
function selectOpen(nodeArr, nodeId = []) {
    for (const key in nodeArr) {
        let item = nodeArr[key]
        if (item.open) {
            nodeId.push(item)
            if (item.children) {
                selectOpen(item.children, nodeId)
            }
        }
    }
    return nodeId
}

TreeOperation.addTree = function () {
    // if (this.id == '') {
    //     layer.msg('请选择要操作的节点');
    //     return;
    // }
    if (this.nodeType == 2) {
        layer.msg('叶节点不能新增')
        return;
    }
    var index = layer.open({
        type: 2,
        title: '添加菜单',
        area: ['50%', '60%'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/pages/collection/datadocking/task_add.html',
        btn: ['添加', '取消'],
        btnAlign: 'c',
        btn1: async function (index, layero) {
            var iframeWin = layero.find('iframe')[0]; //得到iframe页的窗口对象
            let result = await iframeWin.contentWindow.TaskAdd.addSubmit();//doSubmit 是你在弹出层的那个jsp里写的表单提交方法
            if (result.code == 200) {
                layer.msg('新增成功')
            } else {
                layer.msg(result.message)
            }
            layer.close(index)
            MgrUser.init(tabType)
        },
        btn2: function (index, layero) {
            //按钮【按钮二】的回调
        },
        // end:function () {
        // }
    });
    this.layerIndex = index;
    document.activeElement.blur();
};

TreeOperation.updateTree = function () {
    if (this.id == '') {
        layer.msg('请选择要操作的节点');
        return;
    }
    var index = layer.open({
        type: 2,
        title: '修改菜单',
        area: ['50%', '60%'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/pages/collection/datadocking/task_edit.html',
        btn: ['修改', '取消'],
        btnAlign: 'c',
        btn1: async function (index, layero) {
            var iframeWin = layero.find('iframe')[0]; //得到iframe页的窗口对象
            let result = await iframeWin.contentWindow.TaskUpdate.updateSubmit();//doSubmit 是你在弹出层的那个jsp里写的表单提交方法
            if (result.code == 200) {
                layer.msg('修改成功')
            } else {
                layer.msg(result.message)
            }
            layer.close(index)
            MgrUser.init(tabType)
        },
        btn2: function (index, layero) {
            //按钮【按钮二】的回调
        }
    });
    this.layerIndex = index;
    document.activeElement.blur();
};

TreeOperation.deleteTree = function () {
    // if (this.text == 0) {
    //     layer.msg("不能删除顶级菜单");
    //     return;
    // }
    //询问框
    layer.confirm('确定删除该节点？ 该节点下的所有信息都将被删除', {
        btn: ['确定', '取消'], //按钮
        btnAlign: 'c',
    }, function () {
        // var ajax = new $ax(Feng.ctxPath + "/task/delete", function (data) {
        //     layer.msg(data.message);
        //     MgrUser.init();
        // });
        // ajax.set({id: TreeOperation.id});
        // ajax.start();
        $.ajax({
            url: `/tree/${handleNode.id}`,
            type: 'delete',
            success: res => {
                layer.msg(res.message)
                MgrUser.init(tabType)
                sessionStorage.removeItem('handleNode')
                TreeOperation.id = ''
                TreeOperation.nodeType = ''
            }

        })
    }, function () {
    });
};

/**
 * 树的点击事件
 * @param e
 * @param treeId
 * @param treeNode
 */
TreeOperation.onClickDept = function (e, treeId, treeNode) {
    handleNode = {}
    TreeOperation.id = treeNode.id;
    TreeOperation.nodeType = treeNode.nodeType;
    handleNode.nodeCode = treeNode.nodeCode ? treeNode.nodeCode : '';
    handleNode.nodeName = treeNode.name;
    handleNode.pid = treeNode.pId
    handleNode.treeType = treeNode.treeType
    handleNode.remark = treeNode.remark
    handleNode.nodeType = treeNode.nodeType
    handleNode.id = treeNode.id
    sessionStorage.setItem('handleNode', JSON.stringify(handleNode))
    // TreeOperation.getChildData(TreeOperation.id);
    // MgrUser.search();
    // TimingData.search();
};

/**
 * 点击子节点
 * 查询子节点数据并赋值到右边框中显示
 * @param uniqeId
 */
TreeOperation.getChildData = function (id) {
    if (id != 0) {
        //提交信息
        var ajax = new $ax(Feng.ctxPath + "/task/child", function (data) {
            $("#type").val(data.type);
            $("#hdr_code").val(data.hdr_code);
            $("#status").val(data.status);
            $("#is_test").val(data.is_test);
        });
        ajax.set({id: id});
        ajax.start();
    }
};

TreeOperation.treeSearch = function () {
    var name = $("#name").val();
    //生成树
    var ztree = new $ZTree("deptTree", "/task/list?name=" + name);
    ztree.bindOnClick(TreeOperation.onClickDept);
    ztree.init();
};

TreeOperation.beforeDrag = function (nodeId, node) {
    return true
}

TreeOperation.beforeDrop = function (nodeId, node, targetNode, type, isCopy) {
    let pid = ''
    if (!targetNode) {
        pid = 0
    } else {
        if (type == 'inner') {
            pid = targetNode.id
        } else {
            pid = targetNode.pId
        }
    }

    //判断是否复制节点
    if (isCopy) {
        let data = {
            pid: pid,
            nodeName: node[0].name,
            nodeCode: node[0].nodeCode,
            remark: node[0].remark,
            treeType: node[0].treeType,
            nodeType: node[0].nodeType,
        }
        $.ajax({
            type: 'post',
            url: '/tree/insertNode',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: res => {
                layer.msg(res.message)
                MgrUser.init(tabType)
            }
        })
    } else {
        let data = {
            pid: pid,
            nodeName: node[0].name,
            nodeCode: node[0].nodeCode,
            remark: node[0].remark,
            treeType: node[0].treeType,
            nodeType: node[0].nodeType,
            id: node[0].id
        }
        $.ajax({
            url: '/tree/updateNode',
            data: JSON.stringify(data),
            contentType: 'application/json',
            type: 'post',
            success: res => {
                layer.msg(res.message)
                MgrUser.init(tabType)
            }
        })
    }
}

TreeOperation.bindOnDblClick = function (event, treeId, treeNode) {
    if (!treeNode) {
        return false
    }

    if (treeNode.nodeType == 1) {
        return false
    }
    editor.setValue('');
    $.ajax({
        type: 'get',
        url: `/tree/leaf/${treeNode.id}`,
        beforeSend: () => {
            loading('正在查询')
        },
        success: (result) => {
            layer.closeAll()
            if (result) {
                layer.msg('查询成功')
            } else {
                layer.msg(result.message)
            }
            editor.setValue(result.xml)
        },
        error: result => {
            layer.closeAll()
            layer.msg('查询失败')
        }
    })
}

/**************************************************隐藏tag内容*******************************************************/

var TimingData = {
    id: "matchingTable",//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1,
    timingDataId: "",
    workId: ""
};

TimingData.search = function () {
    var queryData = {};
    queryData['table_id'] = TreeOperation.id;
    TimingData.table.refresh({query: queryData});
};

/**
 * 初始化表格的列
 */
TimingData.initColumn = function () {
    var columns = [
        {field: 'selectItem', checkbox: true},
        {title: '表名称', field: 'hdr_name', align: 'center', valign: 'middle'},
        {title: '任务包名称', field: 'work_untis_name', align: 'center', valign: 'middle'},
        {title: '任务包代码', field: 'work_untis_code', align: 'center', valign: 'middle'},
        {title: '厂商', field: 'third_party_name', align: 'center', valign: 'middle'},
        {title: '时间戳', field: 'time_stamp', align: 'center', valign: 'middle'},
        {title: '执行频率', field: 'cron', align: 'center', valign: 'middle'},
        {title: 'kettle包名称', field: 'transformation_name', align: 'center', valign: 'middle'},
        {
            title: '任务类别',
            field: 'type3',
            align: 'center',
            valign: 'middle',
            formatter: function (value, options, rowData) {
                if (value == 1) {
                    return '实时';
                } else if (value == 2) {
                    return '定时';
                }
            }
        },
        {
            title: '状态',
            field: 'status',
            align: 'center',
            valign: 'middle',
            formatter: function (value, options, rowData) {
                if (value == 1) {
                    return '启用';
                } else if (value == 0) {
                    return '禁用';
                }
            }
        },
        {
            field: 'operate',
            title: '操作',
            width: '10%',
            align: 'center',
            valign: 'middle',
            events: operateEvents2,
            formatter: operateFormatter2
        },
    ];
    return columns;
};

//点击新增任务按钮
TimingData.addTab = function () {
    if (TreeOperation.id == '') {
        layer.msg('请选择要操作的表');
        return;
    } else if (TreeOperation.text != 3) {
        layer.msg("只能对表进行添加");
        return;
    }
    var index = layer.open({
        type: 2,
        title: '匹配任务',
        area: ['50%', '80%'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/pages/collection/timingdata/data_add.html',
        btn: ['匹配', '取消'],
        btnAlign: 'c',
        btn1: function (index, layero) {
            var iframeWin = layero.find('iframe')[0]; //得到iframe页的窗口对象
            iframeWin.contentWindow.TaskDep.addSubmit();//doSubmit 是你在弹出层的那个jsp里写的表单提交方法
        },
        btn2: function (index, layero) {
            //按钮【按钮二】的回调
        }
    });
    this.layerIndex = index;
    document.activeElement.blur();
};

/**
 * 检查是否选中
 */
TimingData.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if (selected.length == 0) {
        Feng.info("请先选中表格中的某一记录！");
        return false;
    } else {
        TimingData.seItem = selected[0];
        return true;
    }
};

/**
 * 批量删除按钮
 */
TimingData.delTab = function () {
    if (this.check()) {
        //询问框
        layer.confirm('是否确定删除？', {
            btn: ['确定', '取消'], //按钮
            btnAlign: 'c',
        }, function () {
            var rows = $('#matchingTable').bootstrapTable('getSelections');
            var ids = "";
            for (var i = 0; i < rows.length; i++) {
                ids += rows[i].id + ",";
            }
            ids = ids.substring(0, ids.length - 1);
            var ajax = new $ax(Feng.ctxPath + "/timingData/delTaskDepList", function (data) {
                layer.msg(data.message);
                TimingData.search();
            });
            ajax.set({ids: ids, status: 2});
            ajax.start();
        }, function () {

        });
    }
};

window.operateEvents2 = {
    'click .tabUpdate2': function (e, value, row, index) {
        TimingData.timingDataId = row.id;
        TimingData.workId = row.work_id;
        var index = layer.open({
            type: 2,
            title: '修改匹配关系',
            area: ['50%', '80%'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: Feng.ctxPath + '/pages/collection/timingdata/data_edit.html',
            btn: ['修改', '取消'],
            btnAlign: 'c',
            btn1: function (index, layero) {
                var iframeWin = layero.find('iframe')[0]; //得到iframe页的窗口对象
                iframeWin.contentWindow.TaskDep.updateSubmit();//doSubmit 是你在弹出层的那个jsp里写的表单提交方法
            },
            btn2: function (index, layero) {
                //按钮【按钮二】的回调
            }
        });
        TimingData.layerIndex = index;
        document.activeElement.blur();
    },
    'click .tabDel2': function (e, value, row, index) {
        //询问框
        layer.confirm('确定删除该项', {
            btn: ['确定', '取消'], //按钮
            btnAlign: 'c',
        }, function () {
            var ajax = new $ax(Feng.ctxPath + "/timingData/del", function (data) {
                layer.msg(data.message);
                TimingData.search();
            });
            ajax.set({id: row.id, status: 2});
            ajax.start();
        }, function () {
        });
    }
};

function operateFormatter2(value, row, index) {
    return [
        '<button id="tabUpdate2" type="button" class="tabUpdate2 btn btn-info btn-xs">修改</button><button id="tabDel2" type="button" class="tabDel2 btn btn-info' +
        ' btn-xs">删除</button>',
    ].join('');
};
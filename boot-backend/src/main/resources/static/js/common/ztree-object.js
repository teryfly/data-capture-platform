/**
 * ztree插件的封装
 */
(function () {

    var $ZTree = function (id, url) {
        this.id = id;
        this.url = url;
        this.onClick = null;
        this.settings = null;
        this.onDblClick = null;
        this.onCheck = null
    };

    $ZTree.prototype = {
        /**
         * 初始化ztree的设置
         */
        initSetting: function (setting) {
            var settings = {
                view: {
                    dblClickExpand: true,
                    selectedMulti: true
                },
                check: {
                    enable: false || setting ? setting.check : false,
                    chkboxType: {"Y": "ps", "N": "ps"}
                },
                edit: {
                    drag: {
                        isCopy: true,
                        isMove: true,
                        isprev: true,
                        isinner: true,
                        isnext: true
                    },
                    showRemoveBtn: false,
                    showRenameBtn: false,
                    removeTitle: '删除',
                    renameTitle: '重命名',
                    enable: false || setting ? setting.edit : false,
                },
                data: {
                    key: {
                        title: "title"
                    },
                    simpleData: {enable: true}
                },
                callback: {
                    onClick: this.onClick,
                    onDblClick: this.onDblClick,
                    beforeDrag: this.beforeDrag,
                    beforeDrop: this.beforeDrop,
                    onCheck: this.onCheck,
                },
                // async:{
                //     enable:true,
                //     url:"../../collection/datadocking/task.html",
                //     autoParam:["id"],
                //     dataType:"json",
                //     type:'get'
                // }
            };
            return settings;
        },

        /**
         * 手动设置ztree的设置
         */
        setSettings: function (val) {
            this.settings = val;
        },

        /**
         * 初始化ztree
         */
        init: async function (setting, type, extendNode) {
            var zNodeSeting = null;
            if (this.settings != null) {
                zNodeSeting = this.settings;
            } else {
                zNodeSeting = this.initSetting(setting);
            }
            var zNodes = await this.loadNodes();
            let arr = [] //
            let extendId = []//展开项id
            for (const key in extendNode) {
                let item = extendNode[key]
                extendId.push(item.id)
            }
            for (const key in zNodes) {
                let item = zNodes[key]
                // if (extendId.includes(item.id)) {
                //     item.open = true
                // }
                item.checked = false
                if (item.treeType == type) {
                    arr.push(item)
                }
            }
            this.selectOpen(zNodes,extendId)

            var ztree = $.fn.zTree.init($("#" + this.id), zNodeSeting, arr);
            return {ztree, zNodes}
        },

        selectOpen: function (nodeArr, nodeId = []) {
            for (const key in nodeArr) {
                let item = nodeArr[key]
                if (nodeId.includes(item.id)){
                    item.open = true
                    if (item.children){
                        this.selectOpen(item.children,nodeId)
                    }
                }
            }
        },

        /**
         * 绑定onclick事件
         */
        bindOnClick: function (func) {
            this.onClick = func;
        },
        /**
         * 绑定双击事件
         */
        bindOnDblClick: function (func) {
            this.onDblClick = func;
        },

        /**
         *绑定拖拽事件
         */
        bindBeforeDrag: function (func) {
            this.beforeDrag = func
        },

        /**
         * 绑定放下事件
         */
        bindBeforeDrop: function (func) {
            this.beforeDrop = func
        },

        /**
         * 绑定选择事件
         */

        bindOnCheck: function (func) {
            this.onCheck = func
        },

        /**
         * 加载节点
         */
        loadNodes: function () {
            return new Promise((resolve, reject) => {
                // var zNodes = null;
                // var ajax = new $ax(Feng.ctxPath + this.url, function (data) {
                //     zNodes = data
                // }, function (data) {
                //     Feng.error("加载ztree信息失败!");
                // });
                $.ajax({
                    type: 'get',
                    url: this.url,
                    async: true,
                }).then(res => {
                    resolve(res)
                })
                // ajax.start();
                // console.log(zNodes)
                // zNodes = data
                // return zNodes;
            })

        },

        /**
         * 获取选中的值
         */
        getSelectedVal: function () {
            var zTree = $.fn.zTree.getZTreeObj(this.id);
            var nodes = zTree.getSelectedNodes();
            return nodes[0].name;
        }
    };

    window.$ZTree = $ZTree;

}());
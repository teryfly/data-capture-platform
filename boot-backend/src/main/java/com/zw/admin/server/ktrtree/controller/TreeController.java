package com.zw.admin.server.ktrtree.controller;

import com.zw.admin.server.base.controller.BaseController;
import com.zw.admin.server.ktrtree.entity.Tree;
import com.zw.admin.server.ktrtree.entity.TreePath;
import com.zw.admin.server.ktrtree.service.TreeService;
import com.zw.admin.server.tips.SuccessTip;
import com.zw.admin.server.utils.ZTreeNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Controller
@RequestMapping("tree")
public class TreeController extends BaseController {
    @Autowired
    TreeService treeService;

    /**
     * 新增节点
     * @param tree
     * @return
     */
    @ResponseBody
    @PostMapping("insertNode")
    public Object insertNode(@RequestBody Tree tree) {
        boolean flag = treeService.insertNode(tree);
        if (!flag) {
            return new SuccessTip(500, "新增节点失败");
        }
        return SUCCESS_TIP;
    }

    /**
     * 修改节点
     * @param tree
     * @return
     */
    @ResponseBody
    @PostMapping("updateNode")
    public Object updateNode(@RequestBody Tree tree) {
        boolean flag = treeService.updateNodeById(tree);
        if (!flag) {
            return new SuccessTip(500, "更新节点失败");
        }
        return SUCCESS_TIP;
    }

    /**
     * 根据节点id查询
     * @param id
     * @return
     */
    @ResponseBody
    @GetMapping("{id}")
    public Object getNodeById(@PathVariable("id") String id) {
        Tree tree = treeService.getNodeById(id);
        if (tree == null) {
            return new SuccessTip(400, "所查询节点不存在");
        }
        return tree;
    }

    /**
     * 删除指定节点以及其所有子节点
     * @param id
     * @return
     */
    @ResponseBody
    @DeleteMapping("{id}")
    public Object deleteById(@PathVariable("id") String id) {
        boolean flag = treeService.deleteById(id);
        if (!flag) {
            return new SuccessTip(500, "删除节点失败");
        }
        return SUCCESS_TIP;
    }

    /**
     * 加载树
     * @return
     */
    @ResponseBody
    @GetMapping("load")
    public Object loadTree() {
        List<Tree> trees = treeService.loadTree();
        //初始化树的集合
        List<ZTreeNode> zTreeNodes = new ArrayList<>();
        for (Tree tree : trees) {
            ZTreeNode zTreeNode = new ZTreeNode();
            zTreeNode.setUniqeId(tree.getId());
            zTreeNode.setId(tree.getId());
            zTreeNode.setpId(tree.getPid());
            zTreeNode.setName(tree.getNodeName());
            zTreeNode.setTitle(tree.getNodeName());
            //zTreeNode.setText(tree.getNodeType());
            zTreeNode.setNodeCode(tree.getNodeCode());
            zTreeNode.setChecked(true);
            zTreeNode.setOpen(false);
            zTreeNode.setIsOpen(false);
            zTreeNode.setNodeType(tree.getNodeType());
            zTreeNode.setTreeType(tree.getTreeType());
            if ("1".equals(tree.getNodeType())) {
                zTreeNode.setIcon("/img/tree/分类.png");
            } else if ("2".equals(tree.getNodeType())) {
                zTreeNode.setIcon("/img/tree/表.png");
            }
            zTreeNodes.add(zTreeNode);
        }
        return zTreeNodes;
    }

    /**
     * 根据所选节点获取节点的绝对路径，以及叶节点的内容（xml）
     * @param nodeIds
     * @return
     */
    @ResponseBody
    @PostMapping("/loadPath")
    public Object loadTreePathsById(@RequestBody Set<String> nodeIds) {
        Set<TreePath> result=new HashSet<>();
        for (String id:nodeIds) {
            List<TreePath> treePathList = new ArrayList<>();
            treeService.loadTreePathsById(id, treePathList).stream().forEach(treePath -> result.add(treePath));
        }
        return result;
    }


}

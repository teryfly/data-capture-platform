package com.zw.admin.server.ktrtree.service;

import com.zw.admin.server.ktrtree.entity.Tree;
import com.zw.admin.server.ktrtree.entity.TreePath;

import java.util.List;

public interface TreeService {
    boolean insertNode(Tree tree);

    boolean updateNodeById(Tree tree);

    Tree getNodeById(String id);

    boolean deleteById(String id);

    List<Tree> loadTree();

    /**
     * 根据所选节点获取全路径，从顶级节点到叶节点
     * 以及叶节点的treeId
     * @param id
     * @return
     */
    List<TreePath> loadTreePathsById(String id,List<TreePath> treePathList);
}

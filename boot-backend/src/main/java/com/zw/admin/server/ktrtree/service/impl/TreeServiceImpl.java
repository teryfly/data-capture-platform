package com.zw.admin.server.ktrtree.service.impl;

import com.zw.admin.server.ktrtree.entity.Tree;
import com.zw.admin.server.ktrtree.entity.TreePath;
import com.zw.admin.server.ktrtree.mapper.KettleXMLMapper;
import com.zw.admin.server.ktrtree.mapper.TreeMapper;
import com.zw.admin.server.ktrtree.service.TreeService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
public class TreeServiceImpl implements TreeService {
    /*private List<String> pathList=new ArrayList<>();

    private List<TreePath> treePathList=new ArrayList<>();*/

    @Autowired
    TreeMapper treeMapper;

    @Autowired
    KettleXMLMapper kettleXMLMapper;

    @Override
    public boolean insertNode(Tree tree) {
        //判断节点名称是否重复
        Integer sameNameCount = treeMapper.getSameNameCount(tree.getNodeName(), tree.getPid(), tree.getTreeType());
        if (sameNameCount > 0) {
            throw new RuntimeException("节点名称不能重复");
        }
        tree.setId(UUID.randomUUID().toString());
        tree.setSerialNum(treeMapper.getSerialNum(tree.getPid(), tree.getTreeType())+1);
        tree.setStatus(1);
        return treeMapper.insertNode(tree);
    }

    @Override
    public boolean updateNodeById(Tree tree) {
        //判断节点名称是否重复
        Integer sameNameCount = treeMapper.getSameNameCount(tree.getNodeName(), tree.getPid(), tree.getTreeType());
        if (sameNameCount > 0) {
            throw new RuntimeException("节点名称不能重复");
        }
        return treeMapper.updateNodeById(tree);
    }

    @Override
    public Tree getNodeById(String id) {
        return treeMapper.getNodeById(id);
    }

    @Override
    public boolean deleteById(String id) {
        Tree tree = treeMapper.getNodeById(id);
        if (tree == null) {
            throw new RuntimeException("该节点不存在");
        }
        if (!"2".equals(tree.getNodeType())) {//非叶子节点
            List<Tree> trees = treeMapper.loadChildren(id);
            treeMapper.deleteById(id);
            for (Tree singleTree : trees) {
                deleteById(singleTree.getId());
            }
        } else {
            kettleXMLMapper.deleteContentByTreeId(id);
            treeMapper.deleteById(id);
        }
        return true;
    }

    @Override
    public List<Tree> loadTree() {
        return treeMapper.loadTree();
    }

    @Override
    public List<TreePath> loadTreePathsById(String id,List<TreePath> treePathList) {
        //List<TreePath> treePathList=new ArrayList<>();
        //获取当前节点信息
        Tree currentNode = treeMapper.getNodeById(id);
        //当所选节点是叶节点
        if("2".equals(currentNode.getNodeType())){
            TreePath treePath=new TreePath();
            treePath.setLeafId(currentNode.getId());
            treePath.setKettleXML(kettleXMLMapper.getContentByTreeId(id));
            List<String> pathList=new ArrayList<>();
            treePath.setTreePath(getCurrentNodePath(id,pathList));
            treePathList.add(treePath);
        }else{//非叶节点
            List<Tree> trees = treeMapper.loadChildren(id);
            for (Tree tree:trees) {
                loadTreePathsById(tree.getId(),treePathList);
            }
        }
        return treePathList;
    }


    private String getCurrentNodePath(String id,List<String> pathList){
        //List<String> pathList=new ArrayList<>();
        Tree currentNode = treeMapper.getNodeById(id);
        if("0".equals(currentNode.getPid())){
            pathList.add(currentNode.getNodeName());
        }else{
            pathList.add(currentNode.getNodeName());
            getCurrentNodePath(currentNode.getPid(),pathList);
        }
        Collections.reverse(pathList);
        return StringUtils.join(pathList, "/");
    }

}

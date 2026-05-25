package com.zw.admin.server.ktrtree.service.impl;

import com.zw.admin.server.ktrtree.entity.KettleXML;
import com.zw.admin.server.ktrtree.entity.Tree;
import com.zw.admin.server.ktrtree.mapper.KettleXMLMapper;
import com.zw.admin.server.ktrtree.mapper.TreeMapper;
import com.zw.admin.server.ktrtree.service.KettleXMLService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class KettleXMLServiceImpl implements KettleXMLService {
    @Autowired
    KettleXMLMapper kettleXMLMapper;

    @Autowired
    TreeMapper treeMapper;

    @Override
    public KettleXML getContentByTreeId(String treeId) {
        return kettleXMLMapper.getContentByTreeId(treeId);
    }

    @Override
    public boolean insertKettleXML(KettleXML kettleXML) {
        //判断是否存在这样的节点
        //判断传入的节点是否是叶节点
        Tree treeNode = treeMapper.getNodeById(kettleXML.getTreeId());
        if(treeNode==null){
            throw new RuntimeException("入参错误，节点不存在");
        }
        if(!"2".equals(treeNode.getNodeType())){
            throw new RuntimeException("入参错误，该节点非叶节点");
        }
        //判断该叶节点是否有值
        Integer sameTreeIdCount = kettleXMLMapper.getSameTreeIdCount(kettleXML.getTreeId());
        if(sameTreeIdCount>0){
            return kettleXMLMapper.updateKettleXML(kettleXML);
            //throw new RuntimeException("该叶节点已存在值，不能再次新增");
        }
        kettleXML.setId(UUID.randomUUID().toString());
        kettleXML.setStatus(1);
        return kettleXMLMapper.insertKettleXML(kettleXML);
    }

    @Override
    public boolean updateKettleXML(KettleXML kettleXML) {
        return kettleXMLMapper.updateKettleXML(kettleXML);
    }

}

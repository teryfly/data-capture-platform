package com.zw.admin.server.ktrtree.mapper;

import com.zw.admin.server.ktrtree.entity.Tree;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface TreeMapper {

    boolean insertNode(Tree tree);

    boolean updateNodeById(Tree tree);

    Integer getSerialNum(@Param("pid") String pid,@Param("treeType") String treeType);

    Integer getSameNameCount(@Param("nodeName") String nodeName,@Param("pid") String pid,@Param("treeType") String treeType);

    Tree getNodeById(@Param("id") String id);

    boolean deleteById(@Param("id") String id);

    List<Tree> loadTree();

    List<Tree> loadChildren(@Param("pid") String pid);


}

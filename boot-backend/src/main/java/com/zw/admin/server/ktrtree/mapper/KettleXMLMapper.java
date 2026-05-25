package com.zw.admin.server.ktrtree.mapper;

import com.zw.admin.server.ktrtree.entity.KettleXML;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface KettleXMLMapper {
    /**
     * 根据treeId获取KettleXML
     * @param treeId
     * @return
     */
    KettleXML  getContentByTreeId(@Param("treeId") String treeId);

    Integer getSameTreeIdCount(@Param("treeId")String treeId);

    boolean insertKettleXML(KettleXML kettleXML);

    boolean updateKettleXML(KettleXML kettleXML);

    boolean deleteContentByTreeId(@Param("treeId") String treeId);

}

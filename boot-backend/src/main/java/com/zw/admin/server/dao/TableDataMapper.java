package com.zw.admin.server.dao;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface TableDataMapper {
    /**
     * 根据表ID查询其数据库名称以及表名称
     * @param param
     * @return
     */
    Map<String,Object> findTableName(Map<String,Object> param);

    List<Map<String,Object>> findTableData(Map<String,Object> param);
}

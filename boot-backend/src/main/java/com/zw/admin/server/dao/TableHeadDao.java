package com.zw.admin.server.dao;

import com.zw.admin.server.model.Rule;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

@Mapper
public interface TableHeadDao {
    /**
     *  查询数据库表的字段信息
     * @param taskId
     * @return
     */
    @Select("select * from VzDataQuality.[dbo].[tb_collectionrule] where task_id=#{taskId}")
   List<Map<String,Object>> listByHdrId(String taskId);
}

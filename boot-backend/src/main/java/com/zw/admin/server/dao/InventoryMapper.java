package com.zw.admin.server.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 *
 * @author: 刘子沛
 * @date: 2018/12/18 10:51
 */
@Mapper
public interface InventoryMapper {

    /**
     * 分页查询某一个表某一个字段某一个时间段有问题的日志
     *
     * @param map
     * @param offset
     * @param limit
     * @return
     */
    List<Map<String, Object>> selectInventoryLog(@Param("map") Map<String, Object> map,
                                                 @Param("offset") Integer offset,
                                                 @Param("limit") Integer limit);

    /**
     * 分页查询某一个表某一个字段某一个时间段有问题的日志有多少条数
     *
     * @param map
     * @return
     */
    Integer selectInventoryCount(@Param("map") Map<String, Object> map);

}

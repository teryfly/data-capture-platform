package com.zw.admin.server.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface TimingDataMapper {

    /**
     * 查询所有厂商下拉
     *
     * @return
     */
    List<Map<String, Object>> selectThridParty();

    /**
     * 查询所有任务包下拉
     *
     * @return
     */
    List<Map<String, Object>> selectTransformation();

    /******************************************************************************/

    /**
     * 任务调配中间表以table_id查询该表对应的任务
     *
     * @param map
     * @return
     */
    List<Map<String, Object>> selectTaskDepByTableId(@Param("map") Map<String, Object> map);

    /**
     * 批量插入匹配的任务
     *
     * @param map
     * @return
     */
    int insertTaskDep(@Param("map") List<Map<String, Object>> map);

    /**
     * 修改匹配的任务
     *
     * @param map
     * @return
     */
    int updateTaskDep(@Param("map") Map<String, Object> map);
}
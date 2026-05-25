package com.zw.admin.server.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 *
 * @author: 刘子沛
 * @date: 2018/12/3 17:49
 */
@Mapper
public interface ParaMapper {

    /**
     * 批量插入参数
     *
     * @param map
     * @return
     */
    int insertPara(@Param("map") List<Map<String, Object>> map);

    /**
     * 插入单个参数
     *
     * @param map
     * @return
     */
    int insertParaOnly(@Param("map") Map<String, Object> map);

    /**
     * 修改单个参数
     *
     * @param map
     * @return
     */
    int updateParaOnly(@Param("map") Map<String, Object> map);

    /**
     * 查询参数列表
     *
     * @param map
     * @return
     */
    List<Map<String, Object>> selectParaList(@Param("map") Map<String, Object> map);

    /**
     * 删除参数
     *
     * @param map
     * @return
     */
    int delPara(@Param("map") Map<String, Object> map);

    /**
     * 根据任务编号删除对应的参数
     *
     * @param map
     * @return
     */
    int delParaByWorkId(@Param("map") Map<String, Object> map);

}

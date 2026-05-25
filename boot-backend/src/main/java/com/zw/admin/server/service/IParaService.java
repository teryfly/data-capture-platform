package com.zw.admin.server.service;

import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 *
 * @author: 刘子沛
 * @date: 2018/12/3 17:55
 */
public interface IParaService {

    /**
     * 批量插入参数
     *
     * @param map
     * @param id work_units_id tb_collectiontimingdata主键
     * @return
     */
    boolean insertPara(List<Map<String, Object>> map, String id);

    /**
     * 查询参数列表
     *
     * @param work_units_id
     * @return
     */
    List<Map<String, Object>> selectParaList(String work_units_id);

    /**
     * 删除参数
     *
     * @param id
     * @return
     */
    boolean delPara(String id);

    /**
     * 根据任务编号删除对应的参数
     *
     * @param work_units_id
     * @return
     */
    boolean delParaByWorkId(String work_units_id);

    /**
     * 插入单个参数
     *
     * @param map
     * @return
     */
    boolean insertParaOnly(@Param("map") Map<String, Object> map);

    /**
     * 修改单个参数
     *
     * @param map
     * @return
     */
    boolean updateParaOnly(@Param("map") Map<String, Object> map);

}

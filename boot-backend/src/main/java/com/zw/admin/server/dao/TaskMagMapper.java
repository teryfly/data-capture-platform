package com.zw.admin.server.dao;

import com.zw.admin.server.model.TimingData;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 *
 * @author: 刘子沛
 * @date: 2018/12/3 9:48
 */
@Mapper
public interface TaskMagMapper {

    /**
     * 查询任务列表
     *
     * @param map
     * @return
     */
    List<Map<String, Object>> selectTaskList(@Param("map") Map<String, Object> map);

    /**
     * 添加定时任务
     *
     * @param data
     * @return
     */
    int insertTimingTask(@Param("data") TimingData data);

    /**
     * 修改定时任务
     *
     * @param data
     * @return
     */
    int updateTimingTask(@Param("data") TimingData data);

    /**
     * 添加实时任务
     *
     * @param data
     * @return
     */
    int inserTrealTimeTask(@Param("data") TimingData data);

    /**
     * 修改实时任务
     *
     * @param data
     * @return
     */
    int updateTrealTimeTask(@Param("data") TimingData data);

    /**
     * 根据事件类别查询事件列表
     *
     * @param map
     * @return
     */
    List<Map<String, Object>> selectEventList(@Param("map") Map<String, Object> map);

    /**
     * 根据id查询任务的详细信息
     *
     * @return
     */
    Map<String, Object> selectTaskOnly(@Param("id") String id);

    /**
     * 逻辑删除任务
     *
     * @param map
     * @return
     */
    int updateStatus(@Param("map") Map<String, Object> map);

    /**
     * 根據任務code查詢是否有任務(任務code不能重名)
     *
     * @param map
     * @return
     */
    Map<String, Object> selectTaskByWorkUntisCode(@Param("map") Map<String, Object> map);

}

package com.zw.admin.server.service;

import com.zw.admin.server.model.TimingData;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 *
 * @author: 刘子沛
 * @date: 2018/12/3 10:08
 */
public interface ITaskMagService {

    /**
     * 查询任务列表
     *
     * @return
     */
    List<Map<String, Object>> selectTaskList(String work_untis_name, String type);

    /**
     * 添加定时任务
     *
     * @param data
     * @return
     */
    boolean insertTimingTask(@Param("data") TimingData data);

    /**
     * 修改定时任务
     *
     * @param data
     * @return
     */
    boolean updateTimingTask(@Param("data") TimingData data);

    /**
     * 添加实时任务
     *
     * @param data
     * @return
     */
    boolean inserTrealTimeTask(@Param("data") TimingData data);

    /**
     * 修改实时任务
     *
     * @param data
     * @return
     */
    boolean updateTrealTimeTask(@Param("data") TimingData data);

    /**
     * 根据事件类别查询事件列表
     *
     * @param type
     * @return
     */
    List<Map<String, Object>> selectEventList(String type);

    /**
     * 根据id查询任务的详细信息
     *
     * @return
     */
    Map<String, Object> selectTaskOnly(@Param("id") String id);

    /**
     * 逻辑删除任务
     *
     * @param status
     * @param id
     * @return
     */
    boolean updateStatus(String status, String id);

    /**
     * 根據任務code查詢是否有任務(任務code不能重名)
     *
     * @param work_untis_code
     * @return
     */
    boolean selectTaskByWorkUntisCode(String work_untis_code, String old_name_code);
}

package com.zw.admin.server.service;

import com.zw.admin.server.model.TimingData;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 *
 * @author: 刘子沛
 * @date: 2018/11/22 11:26
 */
public interface ITimingDataService {

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

    /*****************************************************************************/

    /**
     * 任务调配中间表以table_id查询该表对应的任务
     *
     * @param table_id
     * @return
     */
    List<Map<String, Object>> selectTaskDepByTableId(String table_id, String id);

    /**
     * 批量插入匹配的任务
     *
     * @param ids
     * @param table_id
     * @return
     */
    boolean insertTaskDep(String ids, String table_id);

    /**
     * 修改匹配的任务
     *
     * @param id
     * @param status
     * @return
     */
    boolean updateTaskDep(String id, String status, String work_id);
}

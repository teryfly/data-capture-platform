package com.zw.admin.server.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.zw.admin.server.model.Task;
import com.zw.admin.server.model.Transformation;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface TaskMapper extends BaseMapper<Task> {

    /**
     * 查询没有table_name数据的task
     *
     * @return
     */
    List<Task> selectTaskMenu();

    /**
     * 查询有table_name数据的task
     *
     * @return
     */
    List<Task> selectTaskChildren();

    /**
     * 通过id查询task的数据
     *
     * @return
     */
    Task selectTaskById(String uniqe_id);

    /**
     * 通过id更新task信息
     *
     * @param task
     * @return
     */
    boolean updateTaskById(Task task);

    /**
     * 通过id改变status进行伪删除
     *
     * @param unique_id
     * @return
     */
    boolean deleteByIdPretend(String unique_id);

    /**
     * 添加任务
     *
     * @param task
     * @return
     */
    boolean insertTask(Task task);

    /**
     * 查询所有的任务包
     *
     * @return
     */
    List<Transformation> selectTransList();

    /**
     * 通过任务包id获取任务包名称
     *
     * @param tran_id
     * @return
     */
    String selectNameByTranId(String tran_id);

    /**
     * 查询全部菜单形成树的形式
     *
     * @return
     */
    List<Task> selectTreeTask(@Param("map") Map<String, Object> map);

    /**
     * 查询是否有库和表有其中一个不能删除(根据id来查询)
     *
     * @return
     */
    List<Task> selectChildTask(@Param("id") String id);

    /**
     * 根据pid和名字查分类是否存在
     *
     * @param map
     * @return
     */
    Task selectTaskByNameAndPid(@Param("map") Map<String, Object> map);

    /**
     * 根据id批量修改状态
     *
     * @param tasks
     * @return
     */
    int updateBatchTask(List<Task> tasks);

    /**
     * 查询父级数据库的名称
     *
     * @param id
     * @return
     */
    Map<String, Object> selectDataBase(@Param("id") String id);

    /**
     * 查询当前pid下的子集最大排序数 为下一个新增的排序做准备
     * select case when max(serial_num) is null then 0 else max(serial_num) end as serial_num from VzThreeMedicalSupervision.dbo.tb_collectiontask where
     * pid='96b31e65-d6aa-4e26-a00f-c1b48a481c1a'
     *
     * @param pid
     * @return
     */
    Integer selectSerialNum(@Param("pid") String pid);

    /**
     * 查询该节点可以选择的父级节点
     *
     * @param map
     * @return
     */
    List<Map<String, Object>> selectTaskPidList(@Param("map") Map<String, Object> map);

}
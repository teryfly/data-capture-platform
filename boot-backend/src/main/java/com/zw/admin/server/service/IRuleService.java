package com.zw.admin.server.service;

import com.baomidou.mybatisplus.service.IService;
import com.zw.admin.server.model.Rule;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 *
 * @author: 徐佳飞
 * @date: 2018/7/13 14:56
 */
public interface IRuleService extends IService<Rule> {

    /**
     * 通过id查询规则列表
     *
     * @param task_id
     * @return
     */
    List<Map<String, Object>> selectRules(@Param("task_id") String task_id, @Param("name") String name);

    /**
     * 添加规则
     *
     * @param rule
     * @return
     */
    boolean insertRule(Rule rule);

    /**
     * 通过id和field_name查询规则
     *
     * @param column_id
     * @return
     */
    Rule selectByIdAndName(String column_id);

    /**
     * 通过id和以前的field_name来更新规则
     *
     * @param rule
     * @return
     */
    boolean updateRule(Rule rule);

    /**
     * 通过task_id和field_name删除规则
     *
     * @param id
     * @return
     */
    boolean deleteRule(String id);

    /**
     * 根据任务名称主键查询前端表格的表头
     *
     * @param task_id
     * @return
     */
    List<Rule> selectListByTaskId(String task_id);

    Map<String, Object> getRegexById(@Param("code") String code);

    List<Map<String, Object>> getRegexList();

    /**
     * 根据task_id表id删除下面所有字段规则
     *
     * @param task_id
     * @return
     */
    boolean deleteRuleByTaskId(@Param("task_id") String task_id);

    /**
     * 根据表task_id和字段英文名字查询该规则是否存在
     *
     * @param map
     * @return
     */
    Rule selectRuleByTaskIdAndFieldName(String task_id, String column_code, String old_name);

    /**
     * 查询数据元顶级分类
     *
     * @return
     */
    List<Map<String, Object>> selectDataElementClassifies(String name);

    /**
     * 查询数据元下面所有的分类
     * @return
     */
    List<Map<String,Object>> selectDataElements(String name);

    /**
     * 查询单个数据元的详细信息
     *
     * @param id
     * @return
     */
    Map<String, Object> selectDataElementsOne(@Param("id") String id);

    /**
     * 根据task_id和field_type=1查该表下的所有时间字段
     *
     * @param map
     * @return
     */
    List<Map<String, Object>> selectTimeRule(@Param("map") Map<String, Object> map);
}

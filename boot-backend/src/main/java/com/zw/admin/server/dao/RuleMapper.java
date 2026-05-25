package com.zw.admin.server.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.zw.admin.server.model.Rule;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface RuleMapper extends BaseMapper<Rule> {
    int deleteByPrimaryKey(Rule key);

    //int insert(Rule record);

    int insertSelective(Rule record);

    Rule selectByPrimaryKey(Rule key);

    int updateByPrimaryKeySelective(Rule record);

    int updateByPrimaryKey(Rule record);

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
    int updateRule(@Param("rule") Rule rule);

    /**
     * 通过task_id和field_name删除规则
     *
     * @param id
     * @return
     */
    int deleteRule(@Param("id") String id);

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
    int deleteRuleByTaskId(@Param("task_id") String task_id);

    /**
     * 根据表task_id和字段英文名字查询该规则是否存在
     *
     * @param map
     * @return
     */
    Rule selectRuleByTaskIdAndFieldName(@Param("map") Map<String, Object> map);

    /**
     * 查询数据元顶级分类
     *
     * @return
     */
    List<Map<String, Object>> selectDataElementClassifies(@Param("name") String name);

    /**
     * 查询数据元下面所有的分类
     *
     * @return
     */
    List<Map<String, Object>> selectDataElements(@Param("name") String name);

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
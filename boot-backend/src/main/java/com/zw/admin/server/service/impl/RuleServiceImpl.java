package com.zw.admin.server.service.impl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.zw.admin.server.dao.RuleMapper;
import com.zw.admin.server.model.Rule;
import com.zw.admin.server.service.IRuleService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 *
 * @author: 徐佳飞
 * @date: 2018/7/13 14:57
 */
@Service
public class RuleServiceImpl extends ServiceImpl<RuleMapper, Rule> implements IRuleService {

    @Autowired
    private RuleMapper ruleMapper;

    @Override
    public List<Map<String, Object>> selectRules(@Param("task_id") String task_id, @Param("name") String name) {
        return this.ruleMapper.selectRules(task_id, name);
    }

    @Override
    public boolean insertRule(Rule rule) {
        return this.ruleMapper.insertRule(rule);
    }

    @Override
    public Rule selectByIdAndName(String column_id) {
        return this.ruleMapper.selectByIdAndName(column_id);
    }

    @Override
    public boolean updateRule(Rule rule) {
        boolean tag = false;
        if (this.ruleMapper.updateRule(rule) > 0 ) {
            tag = true;
        }
        return tag;
    }

    @Override
    public boolean deleteRule(String id) {
        boolean tag = false;
        if (this.ruleMapper.deleteRule(id) > 0) {
            tag = true;
        }
        return tag;
    }

    @Override
    public List<Rule> selectListByTaskId(String task_id) {
        return this.ruleMapper.selectListByTaskId(task_id);
    }

    @Override
    public Map<String, Object> getRegexById(@Param("code") String code) {
        return ruleMapper.getRegexById(code);
    }

    @Override
    public List<Map<String, Object>> getRegexList() {
        return ruleMapper.getRegexList();
    }

    @Override
    public boolean deleteRuleByTaskId(String task_id) {
        boolean tag = false;
        if (this.baseMapper.deleteRuleByTaskId(task_id) > 0) {
            tag = true;
        }
        return tag;
    }

    @Override
    public Rule selectRuleByTaskIdAndFieldName(String task_id, String column_code, String old_name) {
        Map<String, Object> map = new HashMap<>();
        map.put("task_id", task_id);
        map.put("column_code", column_code);
        map.put("old_name", old_name);
        return this.baseMapper.selectRuleByTaskIdAndFieldName(map);
    }

    @Override
    public List<Map<String, Object>> selectDataElementClassifies(String name) {
        return this.baseMapper.selectDataElementClassifies(name);
    }

    @Override
    public List<Map<String, Object>> selectDataElements(String name) {
        return this.baseMapper.selectDataElements(name);
    }

    @Override
    public Map<String, Object> selectDataElementsOne(String id) {
        return this.baseMapper.selectDataElementsOne(id);
    }

    @Override
    public List<Map<String, Object>> selectTimeRule(Map<String, Object> map) {
        return this.baseMapper.selectTimeRule(map);
    }
}

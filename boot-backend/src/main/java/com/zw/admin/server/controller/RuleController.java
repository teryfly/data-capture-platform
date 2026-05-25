package com.zw.admin.server.controller;


import com.zw.admin.server.base.controller.BaseController;
import com.zw.admin.server.base.warpper.RuleWarpper;
import com.zw.admin.server.model.Rule;
import com.zw.admin.server.service.IRuleService;
import com.zw.admin.server.tips.Tip;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Created with IntelliJ IDEA.
 *
 * @author: 徐佳飞
 * @date: 2018/7/12 9:18
 */
@Controller
@RequestMapping(value = "/rule")
public class RuleController extends BaseController {
    private static String PREFIX = "/collection/datadocking/";
    private String temp_field_name = null;      //临时保存规则的字段名称

    @Autowired
    private IRuleService ruleService;

    /**
     * 跳转到规则管理首页
     *
     * @return
     */
    @ApiOperation("跳转到规则管理首页")
    @RequestMapping(value = "", method = RequestMethod.GET)
    public String index() {
        return PREFIX + "rule.html";
    }

    /**
     * 获取规则列表
     */
    @ApiOperation("获取规则列表")
    @RequestMapping(value = "/list", method = RequestMethod.POST)
    @ResponseBody
    public Object list(@RequestParam(required = false) String task_id,
                       @RequestParam(required = false) String name) {
        List<Map<String, Object>> rules = this.ruleService.selectRules(task_id, name);
        return super.warpObject(new RuleWarpper(rules));
    }


    /**
     * 跳转到规则添加页面
     *
     * @return
     */
    @ApiOperation("跳转到规则添加页面")
    @RequestMapping(value = "/rule_add", method = RequestMethod.GET)
    public String toAdd() {
        return PREFIX + "rule_add.html";
    }

    /**
     * 新增规则
     */
    @ApiOperation("新增规则")
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    @ResponseBody
    public Tip add(@Valid Rule rule) {
        rule.setId(UUID.randomUUID().toString());
        this.ruleService.insertRule(rule);
        return SUCCESS_TIP;
    }

    /**
     * 获取要修改的数据
     *
     * @param column_id
     * @return
     */
    @ApiOperation("获取要修改的数据")
    @RequestMapping(value = "/rule_edit/{column_id}", method = RequestMethod.POST)
    @ResponseBody
    public Object editData(@PathVariable String column_id) {
        //根据id查询到该系统信息
        Rule rule = this.ruleService.selectByIdAndName(column_id);
        //将field_name保存到临时变量中
        //temp_field_name = rule.getField_name();
        return rule;
    }

    /**
     * 修改规则
     */
    @ApiOperation("修改规则")
    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    @ResponseBody
    public Tip edit(@Valid Rule rule) {
        this.ruleService.updateRule(rule);
        return SUCCESS_TIP;
    }

    /**
     * 删除规则
     *
     * @param id
     * @return
     */
    @ApiOperation("删除规则")
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public Tip delete(@RequestParam String id) {
        this.ruleService.deleteRule(id);
        return SUCCESS_TIP;
    }

    /**
     * 判断同一张表task_id中是否有相同的字段名存在
     *
     * @param task_id
     * @param column_code
     * @return
     */
    @ApiOperation("是否有相同的字段名存在")
    @RequestMapping(value = "/selectRuleByTaskIdAndFieldName", method = RequestMethod.POST)
    @ResponseBody
    public Object selectRuleByTaskIdAndFieldName(String task_id, String column_code, String old_name) {
        Rule rule = this.ruleService.selectRuleByTaskIdAndFieldName(task_id, column_code, old_name);
        Map<String, Object> ret = new HashMap<>();
        if (rule != null) {
            ret.put("valid", false);
            return ret;
        }
        ret.put("valid", true);
        return ret;
    }

    /**
     * 生成数据元树
     *
     * @return
     */
    @ApiOperation("生成数据元树")
    @RequestMapping(value = "/dataTree", method = RequestMethod.POST)
    @ResponseBody
    public List<Map<String, Object>> dataTree(@RequestParam(required = false) String name) {
        List<Map<String, Object>> dataElementClassifies = this.ruleService.selectDataElementClassifies(name);
        List<Map<String, Object>> dataElements = this.ruleService.selectDataElements(name);
        dataElementClassifies.addAll(dataElements);
        return dataElementClassifies;
    }

    @ApiOperation("查询单个数据元的详细信息")
    @RequestMapping(value = "/selectDataElementsOne", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectDataElementsOne(@RequestParam(required = true) String id) {
        return this.ruleService.selectDataElementsOne(id);
    }

    /**
     * 根据task_id和field_type=1查该表下的所有时间字段
     *
     * @param map
     * @return
     */
    @ApiOperation("查询时机字段")
    @RequestMapping(value = "/selectTimeRule", method = RequestMethod.POST)
    @ResponseBody
    public List<Map<String, Object>> selectTimeRule(@RequestParam Map<String, Object> map) {
        return this.ruleService.selectTimeRule(map);
    }
}

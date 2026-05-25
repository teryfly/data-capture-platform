package com.zw.admin.server.controller;

import com.zw.admin.server.base.controller.BaseController;
import com.zw.admin.server.model.Rule;
import com.zw.admin.server.model.Task;
import com.zw.admin.server.service.IRuleService;
import com.zw.admin.server.service.ITaskService;
import com.zw.admin.server.service.impl.QualityServiceImpl;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 *
 * @author: 徐佳飞
 * @date: 2018/8/2 10:42
 */
@Controller
@RequestMapping(value = "/quality")
public class QualityController extends BaseController {

	private static String PREFIX = "/collection/qualitycontrol/";

	@Autowired
	private IRuleService ruleService;

	@Autowired
	private ITaskService taskService;

	@Autowired
	private QualityServiceImpl qualityService;

	/**
	 * 跳转到质量监控首页
	 * 
	 * @return
	 */
	@ApiOperation("质量监控主页")
	@RequestMapping(value = "", method = RequestMethod.GET)
	public String index() {
		return PREFIX + "quality.html";
	}

	/**
	 * 查询该任务有哪些表头(生成表头数据)
	 */
	@ApiOperation("生成表头数据")
	@RequestMapping(value = "/tableHead", method = RequestMethod.POST)
	@ResponseBody
	public List<Rule> selectListByTaskId(String task_id) {
		return this.ruleService.selectListByTaskId(task_id);
	}

	/**
	 * 根据任务主键查询任务详细信息
	 * 
	 * @param uniqe_id
	 * @return
	 */
	@ApiOperation("任务详细信息")
	@RequestMapping(value = "/selectTaskById", method = RequestMethod.POST)
	@ResponseBody
	public Task selectTaskById(String uniqe_id) {
		return this.taskService.selectTaskById(uniqe_id);
	}

	@ApiOperation("获取行数据")
	@RequestMapping(value = "/selectDataByKey", method = RequestMethod.POST)
	@ResponseBody
	public Object selectDataByKey(String key){
		return qualityService.selectDataByKey(key);
	}

	/**
	 * 拼接sql语句查询表内容
	 * 
	 * @param database_name
	 * @param table_name
	 * @param time_stamp
	 * @param time
	 */
	@ApiOperation("质量监控列表数据")
	@RequestMapping(value = "/splicingSql", method = RequestMethod.POST)
	@ResponseBody
	public Object splicingSql(String task_id, String database_name, String table_name, String time_stamp, String time) {
		if (StringUtils.isEmpty(database_name) || StringUtils.isEmpty(table_name) || StringUtils.isEmpty(time_stamp)
				|| StringUtils.isEmpty(time)) {
			return null;
		}
		String[] strs = time.replace(" ", "").split("~");
		String beginTime = strs[0];
		String endTime = strs[1];
		List<Map<String, Object>> list = this.qualityService.selectTaskData(database_name, table_name, time_stamp, beginTime, endTime);

		List<Rule> ruleList = ruleService.selectListByTaskId(task_id);

		Iterator<Map<String, Object>> dataIter = list.iterator(); // 数据
		while (dataIter.hasNext()) {
			Map<String, Object> data = dataIter.next();
			Iterator<Rule> ruleIter = ruleList.iterator();
			while (ruleIter.hasNext()) {
				Rule rule = ruleIter.next();
				/*if ("0".equals(rule.getField_type())) {// 字符串
					String dataValue = (String) data.get(rule.getField_name());
					if (rule.getIs_null() != null && rule.getIs_null().equals("1")) { // 不能为空
						if (dataValue == null || dataValue.equals("-")) { // 当值为null 或者 为 -时
							data.put(rule.getField_name(), "<div style='color:red;'>" + dataValue + "</div>");
						} else {
							int Length = Integer.valueOf(rule.getField_length());
							if (dataValue != null && dataValue.length() > Length) {
								data.put(rule.getField_name(), "<div style='color:red;'>" + dataValue + "</div>");
								continue;
							}
//							Map<String, Object> regexMap = ruleService.getRegexById(rule.getRegular_id());
							if (rule.getRegular_id() == null)
								continue;
//							String Regex = (String) regexMap.get("Expression");
							if (!dataValue.matches(rule.getRegular_id())) {
								data.put(rule.getField_name(), "<div style='color:red;'>" + dataValue + "</div>");
								continue;
							}
						}
					} else {
					}
				} else if ("1".equals(rule.getField_type())) {// 时间类型
					String dateValue = data.get(rule.getField_name()).toString();
					if (rule.getFormat() != null) {
						if (dateValue.length() > rule.getFormat().length() || dateValue.length() < rule.getFormat().length()) {
							data.put(rule.getField_name(), "<div style='color:red;'>" + dateValue + "</div>");
						}
					}
				} else if ("2".equals(rule.getField_type())) {// 浮点类型

				}*/
			}
		}
		return list;
	}
	
	@ApiOperation("质量监控列表数据2")
	@RequestMapping(value = "/splicingSql2", method = RequestMethod.POST)
	@ResponseBody
	public Object splicingSql2(String task_id, String database_name, String table_name, String time_stamp, String time) {
		if (StringUtils.isEmpty(database_name) || StringUtils.isEmpty(table_name) || StringUtils.isEmpty(time_stamp)
				|| StringUtils.isEmpty(time)) {
			return null;
		}
		String[] strs = time.replace(" ", "").split("~");
		String beginTime = strs[0];
		String endTime = strs[1];
		List<Map<String, Object>> list = this.qualityService.selectTaskData2(database_name, table_name, time_stamp, beginTime, endTime);
		System.out.println(list);
		return list;
	}	
}
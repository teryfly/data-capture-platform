package com.zw.admin.server.controller;

import com.zw.admin.server.base.controller.BaseController;
import com.zw.admin.server.model.TimingData;
import com.zw.admin.server.service.ITaskMagService;
import com.zw.admin.server.service.ITimingDataService;
import com.zw.admin.server.tips.Tip;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 *
 * @author: 刘子沛
 * @date: 2018/11/22 11:29
 */
@Controller
@RequestMapping("/timingData")
public class TimingDataController extends BaseController {

    @Autowired
    private ITimingDataService timingDataService;

    @Autowired
    private ITaskMagService taskMagService;

    /**
     * 查询厂商下拉
     *
     * @return
     */
    @RequestMapping(value = "/thridPartyList", method = RequestMethod.POST)
    @ResponseBody
    public List<Map<String, Object>> selectThridParty() {
        return this.timingDataService.selectThridParty();
    }

    /**
     * 查询所有任务包下拉
     *
     * @return
     */
    @RequestMapping(value = "/transformation", method = RequestMethod.POST)
    @ResponseBody
    public List<Map<String, Object>> selectTransformation() {
        return this.timingDataService.selectTransformation();
    }

    /***************************************************************************/

    /**
     * 任务调配中间表以table_id查询该表对应的任务
     *
     * @param table_id
     * @return
     */
    @RequestMapping(value = "/selectTaskDepByTableId", method = RequestMethod.POST)
    @ResponseBody
    public List<Map<String, Object>> selectTaskDepByTableId(@RequestParam(required = true) String table_id) {
        return this.timingDataService.selectTaskDepByTableId(table_id, null);
    }

    /**
     * 批量插入调配的任务
     *
     * @return
     */
    @RequestMapping(value = "/insertTaskDep", method = RequestMethod.POST)
    @ResponseBody
    public Object insertTaskDep(String ids, String table_id) {
        this.timingDataService.insertTaskDep(ids, table_id);
        return SUCCESS_TIP;
    }

    /**
     * 修改调配的任务
     *
     * @return
     */
    @RequestMapping(value = "/updateTaskDep", method = RequestMethod.POST)
    @ResponseBody
    public Object updateTaskDep(String id, String work_id, String status) {
        this.timingDataService.updateTaskDep(id, status, work_id);
        return SUCCESS_TIP;
    }

    /**
     * 查询任务匹配修改下拉
     *
     * @return
     */
    @RequestMapping(value = "/selectTaskDepEdit", method = RequestMethod.POST)
    @ResponseBody
    public List<Map<String, Object>> selectTaskDepEdit(String id) {
        List<Map<String, Object>> map = this.timingDataService.selectTaskDepByTableId(null, id);
        String work_id = (String) map.get(0).get("work_id");
        String table_id = (String) map.get(0).get("table_id");
        //已调配的任务列表
        List<Map<String, Object>> m1 = this.timingDataService.selectTaskDepByTableId(table_id, null);
        //已有任务(包含全部)
        List<Map<String, Object>> m2 = this.taskMagService.selectTaskList(null, null);
        //要返回的集合
        List<Map<String, Object>> m4 = new ArrayList<>();
        //过滤出自身任务id以外已调配的任务列表
        List<Map<String, Object>> m3 = new ArrayList<>();
        for (Map<String, Object> o : m1) {
            String worked_id = (String) o.get("work_id");
            if (!work_id.equals(worked_id)) {
                m3.add(o);
            }
        }
        List<String> work_ids = new ArrayList<>();
        if (m3 != null) {
            for (Map<String, Object> o : m3) {
                work_ids.add((String) o.get("work_id"));
            }
            for (Map<String, Object> obj : m2) {
                if (!work_ids.contains((String) obj.get("id"))) {
                    if (!"0".equals((String) obj.get("status"))) {
                        m4.add(obj);
                    }
                }
            }
        } else {
            return m2;
        }
        return m4;
    }

    /**
     * 该表可以调配的任务列表
     *
     * @return
     */
    @RequestMapping(value = "/selectTaskDepList", method = RequestMethod.POST)
    @ResponseBody
    public List<Map<String, Object>> selectTaskDepList(@RequestParam(required = true) String table_id,
                                                       @RequestParam(required = true) String type) {
        //对应前端传参过来的表id查询已调配的任务列表
        List<Map<String, Object>> m1 = this.timingDataService.selectTaskDepByTableId(table_id, null);
        //已调配的任务id
        List<String> work_ids = new ArrayList<>();
        //已有任务 包括调配和没有调配(根据实时 定时类别来查询)
        List<Map<String, Object>> m2 = this.taskMagService.selectTaskList(null, type);
        //可以调配的任务
        List<Map<String, Object>> m3 = new ArrayList<>();
        if (m2 != null) {
            if (m1 == null || m1.size() == 0) {
                m3 = m2;
            } else {
                for (Map<String, Object> map : m1) {
                    String work_id = (String) map.get("work_id");
                    work_ids.add(work_id);
                }
                for (Map<String, Object> map : m2) {
                    String id = (String) map.get("id");
                    if (!work_ids.contains(id)) {
                        m3.add(map);
                    }
                }
            }
        }
        return m3;
    }

    @RequestMapping(value = "/del", method = RequestMethod.POST)
    @ResponseBody
    public Tip delTaskDep(String id, String status) {
        this.timingDataService.updateTaskDep(id, status, null);
        return SUCCESS_TIP;
    }

    /**
     * 批量删除匹配任务
     *
     * @param ids
     * @return
     */
    @RequestMapping(value = "/delTaskDepList", method = RequestMethod.POST)
    @ResponseBody
    public Tip delTaskDepList(String ids, String status) {
        if (!ids.isEmpty()) {
            String[] str = ids.split(",");
            for (String o : str) {
                this.timingDataService.updateTaskDep(o, status, null);
            }
        }
        return SUCCESS_TIP;
    }

}

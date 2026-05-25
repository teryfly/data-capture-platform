package com.zw.admin.server.controller;

import com.zw.admin.server.base.controller.BaseController;
import com.zw.admin.server.model.TimingData;
import com.zw.admin.server.service.IParaService;
import com.zw.admin.server.service.ITaskMagService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * Created with IntelliJ IDEA.
 *
 * @author: 刘子沛
 * @date: 2018/12/3 10:11
 */
@Controller
@RequestMapping("/taskMag")
public class TaskMagController extends BaseController {

    @Autowired
    private ITaskMagService taskMagService;

    @Autowired
    private IParaService paraService;

    /**
     * 查询任务列表
     *
     * @param work_untis_name 任务名称
     * @return
     */
    @ApiOperation("查询任务列表")
    @RequestMapping(value = "/selectTaskList", method = RequestMethod.POST)
    @ResponseBody
    public List<Map<String, Object>> selectTaskList(@RequestParam(required = false) String work_untis_name,
                                                    @RequestParam(required = false) String type) {
        List<Map<String, Object>> maps = this.taskMagService.selectTaskList(work_untis_name, type);
        return maps;
    }

    @ApiOperation("修改任务状态")
    @RequestMapping(value = "/updateList", method = RequestMethod.POST)
    @Transactional(rollbackFor = Exception.class)
    @ResponseBody
    public Object updateList(String ids, String status) {
        String[] str = ids.split(",");
        for (String o : str) {
            TimingData data = new TimingData();
            data.setStatus2(status);
            data.setId(o);
            this.taskMagService.updateTrealTimeTask(data);
        }
        return SUCCESS_TIP;
    }

    /**
     * 修改任务
     *
     * @param data
     * @return
     */
    @ApiOperation("修改任务")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @Transactional(rollbackFor = Exception.class)
    @ResponseBody
    public Object update(TimingData data) {
        //实时任务
        if ("1".equals(data.getType())) {
            try {
                //监听事件
                if ("1".equals(data.getEvent())) {
                    //广播事件清空
                    data.setBroadcast_events("");
                } else if ("0".equals(data.getEvent())) {//广播事件
                    //监听事件和发送广播事件清空
                    data.setSending_broadcast_events("");
                    data.setMonitoring_events("");
                }
                this.taskMagService.updateTrealTimeTask(data);
                if (data.getData() != null) {
                    for (Map<String, Object> o : data.getData()) {
                        //id存在 修改
                        if (o.get("id") != null) {
                            this.paraService.updateParaOnly(o);
                        } else {
                            o.put("id", UUID.randomUUID().toString());
                            o.put("work_units_id", data.getId());
                            this.paraService.insertParaOnly(o);
                        }
                    }
                }
            } catch (Exception e) {
                throw new RuntimeException();
            }
        } else {//定时任务
            //删除这个任务下的所有参数
            this.paraService.delParaByWorkId(data.getId());
            //修改定时任务
            this.taskMagService.updateTimingTask(data);
        }
        return SUCCESS_TIP;
    }

    /**
     * 添加任务
     *
     * @param data
     * @return
     */
    @ApiOperation("添加任务")
    @RequestMapping(value = "/insert", method = RequestMethod.POST)
    @Transactional(rollbackFor = Exception.class)
    @ResponseBody
    public Object insert(TimingData data) {
        //定时任务添加
        if ("2".equals(data.getType())) {
            try {
                this.taskMagService.insertTimingTask(data);
            } catch (Exception e) {
                throw new RuntimeException();
            }
        } else {//实时任务添加
            //监听事件
            if ("1".equals(data.getEvent())) {
                //广播事件清空
                data.setBroadcast_events("");
            } else if ("0".equals(data.getEvent())) {//广播事件
                //监听事件和发送广播事件清空
                data.setSending_broadcast_events("");
                data.setMonitoring_events("");
            }
            String id = UUID.randomUUID().toString();
            try {
                data.setId(id);
                this.taskMagService.inserTrealTimeTask(data);
            } catch (Exception e) {
                throw new RuntimeException();
            }
            List<Map<String, Object>> map = data.getData();
            this.paraService.insertPara(map, id);
        }
        return SUCCESS_TIP;
    }

    /**
     * 根据事件类别查询事件列表
     *
     * @param type
     * @return
     */
    @ApiOperation("根据事件类别查询事件列表")
    @RequestMapping(value = "/selectEventList", method = RequestMethod.POST)
    @ResponseBody
    public List<Map<String, Object>> selectEventList(@RequestParam(required = false) String type) {
        List<Map<String, Object>> maps = new ArrayList<>();
        try {
            maps = this.taskMagService.selectEventList(type);
        } catch (Exception e) {
            throw new RuntimeException();
        }
        return maps;
    }

    /**
     * 根据id查询任务的详细信息
     *
     * @param id
     * @return
     */
    @ApiOperation("根据id查询任务的详细信息")
    @RequestMapping(value = "/selectTaskOnly", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectTaskOnly(@RequestParam(required = true) String id) {
        return this.taskMagService.selectTaskOnly(id);
    }

    /**
     * 逻辑删除任务
     *
     * @param status
     * @param id
     * @return
     */
    @ApiOperation("逻辑删除任务")
    @RequestMapping(value = "/updateStatus", method = RequestMethod.POST)
    @ResponseBody
    public Object updateStatus(@RequestParam(required = false) String status,
                               @RequestParam(required = false) String id) {
        this.taskMagService.updateStatus(status, id);
        return SUCCESS_TIP;
    }

    /**
     * 查询参数列表
     *
     * @param work_units_id
     * @return
     */
    @ApiOperation("查询参数列表")
    @RequestMapping(value = "/selectParaList", method = RequestMethod.POST)
    @ResponseBody
    public List<Map<String, Object>> selectParaList(@RequestParam(required = false) String work_units_id) {
        return this.paraService.selectParaList(work_units_id);
    }

    /**
     * 删除参数
     *
     * @param id
     * @return
     */
    @ApiOperation("删除参数")
    @RequestMapping(value = "/delPara", method = RequestMethod.POST)
    @ResponseBody
    public Object delPara(String id) {
        try {
            this.paraService.delPara(id);
        } catch (Exception e) {
            throw new RuntimeException();
        }
        return SUCCESS_TIP;
    }

    /**
     * 验证任务包是否重名
     *
     * @param work_untis_code
     * @return
     */
    @ApiOperation("验证任务包是否重名")
    @RequestMapping(value = "/byWorkUntisCode", method = RequestMethod.POST)
    @ResponseBody
    public Object selectTaskByWorkUntisCode(String type, String work_untis_code, String work_untis_code2, String old_name_code) {
        Map<String, Object> ret = new HashMap<>();
        //定時任務的時候
        if ("2".equals(type)) {
            if (this.taskMagService.selectTaskByWorkUntisCode(work_untis_code, old_name_code)) {
                ret.put("valid", true);
            } else {
                ret.put("valid", false);
            }
        } else if ("1".equals(type)) {//實時任務
            if (this.taskMagService.selectTaskByWorkUntisCode(work_untis_code2, old_name_code)) {
                ret.put("valid", true);
            } else {
                ret.put("valid", false);
            }
        }
        return ret;
    }

}

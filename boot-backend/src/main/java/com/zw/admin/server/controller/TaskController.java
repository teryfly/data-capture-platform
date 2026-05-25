package com.zw.admin.server.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.zw.admin.server.base.controller.BaseController;
import com.zw.admin.server.model.Task;
import com.zw.admin.server.model.Transformation;
import com.zw.admin.server.service.IRuleService;
import com.zw.admin.server.service.ITaskService;
import com.zw.admin.server.tips.ErrorTip;
import com.zw.admin.server.tips.Tip;
import com.zw.admin.server.utils.UserUtil;
import com.zw.admin.server.utils.ZTreeNode;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.*;

/**
 * HDR库管理
 * Created with IntelliJ IDEA.
 *
 * @author: 徐佳飞
 * @date: 2018/7/12 9:14
 */
@Controller
@RequestMapping(value = "/task")
public class TaskController extends BaseController {

    @Autowired
    private ITaskService taskService;

    @Autowired
    private IRuleService ruleService;

    private static String PREFIX = "/collection/datadocking/";

    /**
     * 跳转到任务管理的首页
     *
     * @return
     */
    @ApiOperation("转到任务管理的首页")
    @RequestMapping(value = "", method = RequestMethod.GET)
    public String index() {
        return PREFIX + "task.html";
    }

    /**
     * 获取任务树
     *
     * @return
     */
    @ApiOperation("获取任务树")
    @RequestMapping(value = "/list", method = RequestMethod.POST)
    @ResponseBody
    public List<ZTreeNode> taskList(@RequestParam(required = false) String name) {
        //初始化树的集合
        List<ZTreeNode> zTreeNodes = new ArrayList<>();
        List<Task> tasks = this.taskService.selectTreeTask(name);
        //组装树节点
        for (Task task : tasks) {
            ZTreeNode zTreeNode = new ZTreeNode();
            zTreeNode.setUniqeId(task.getId());
            zTreeNode.setId(task.getId());
            zTreeNode.setpId(task.getPid());
            zTreeNode.setName(task.getHdr_name());
            zTreeNode.setTitle(task.getHdr_code());
            zTreeNode.setText(task.getType());
            zTreeNode.setChecked(true);
            zTreeNode.setOpen(false);
            zTreeNode.setIsOpen(false);
            if ("2".equals(task.getType())) {
                zTreeNode.setIcon("/img/tree/数据库.png");
            } else if ("3".equals(task.getType())) {
                zTreeNode.setIcon("/img/tree/表.png");
            } else {
                zTreeNode.setIcon("/img/tree/分类.png");
            }
            zTreeNodes.add(zTreeNode);
        }
        return zTreeNodes;
    }

    /**
     * 通过主键id获取子节点信息
     *
     * @param id
     * @return
     */
    @ApiOperation("通过主键id获取子节点信息")
    @RequestMapping(value = "/child", method = RequestMethod.POST)
    @ResponseBody
    public Object getChild(String id) {
        Task childTask = this.taskService.selectTaskById(id);
        return childTask;
    }

    /**
     * 进行保存操作时更新
     *
     * @param task
     * @return
     */
    @ApiOperation("进行保存操作时更新")
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public Tip save(Task task) {
        //更新task信息
        this.taskService.updateTaskById(task);
        return SUCCESS_TIP;
    }

    /**
     * 通过id改变status进行伪删除
     *
     * @param id
     * @return
     */
    @ApiOperation("通过id改变status进行伪删除")
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @Transactional(rollbackFor = Exception.class)
    @ResponseBody
    public Tip delete(String id) {
        childTask = new ArrayList<>();
        //首先先把自身加入childTask
        Task task = this.taskService.selectTaskById(id);
        childTask.add(task);
        //所有待删除所有节点
        List<Task> tasks = selectChildTask(this.taskService.selectTreeTask(null), id);
        System.out.println(tasks);
        //只有一个节点的时候直接伪删除
        if (tasks.size() == 1) {
            if ("3".equals(tasks.get(0).getType())) {
                //删除表的时候把字段全部删除
                this.ruleService.deleteRuleByTaskId(tasks.get(0).getId());
            }
        } else {
            for (Task o : tasks) {
                if ("2".equals(o.getType()) || "3".equals(o.getType())) {
                    return new ErrorTip(500, "请先删除子菜单");
                }
            }
        }
        this.taskService.updateBatchTask(tasks);
        return SUCCESS_TIP;
    }

    //所有子节点
    private List<Task> childTask = new ArrayList<>();

    private List<Task> selectChildTask(List<Task> tasks, String pid) {
        for (Task task : tasks) {
            //遍历出父id等于参数的id，add进子节点集合
            if (task.getPid().equals(pid)) {
                //递归遍历下一级
                selectChildTask(tasks, task.getId());
                childTask.add(task);
            }
        }
        return childTask;
    }

    /**
     * 在当前菜单下添加子级
     *
     * @param task
     * @return
     */
    @ApiOperation("在当前菜单下添加子级")
    @RequestMapping(value = "/submit", method = RequestMethod.POST)
    @ResponseBody
    public Tip submit(Task task) {
        //添加相应的属性
        //id
        task.setId(UUID.randomUUID().toString());
        //当前父节点排序
        task.setSerial_num(this.taskService.selectSerialNum(task.getPid()) + 1);
        this.taskService.insertTask(task);
        return SUCCESS_TIP;
    }

    /**
     * 判断同级菜单是否存在
     *
     * @param pid
     * @param hdr_code
     * @return
     */
    @ApiOperation("判断同级菜单是否存在")
    @RequestMapping(value = "/selectTaskByNameAndPid", method = RequestMethod.POST)
    @ResponseBody
    public Object selectTaskByNameAndPid(String pid, String hdr_code, String old_name) {
        Task task = this.taskService.selectTaskByNameAndPid(pid, hdr_code, old_name);
        Map<String, Object> ret = new HashMap<>();
        if (task != null) {
            ret.put("valid", false);
            return ret;
        }
        ret.put("valid", true);
        return ret;
    }

    /**
     * 获取任务包信息
     *
     * @return
     */
    @ApiOperation("获取任务包信息")
    @RequestMapping(value = "/getTransformation", method = RequestMethod.GET)
    @ResponseBody
    public Object getMechanism() {
        //查询所有任务包
        List<Transformation> transformations = this.taskService.selectTransList();

        String json = JSON.toJSONString(transformations);
        json = "{\"value\":" + json + "}";

        JSONObject jsonObject = JSONObject.parseObject(json);


        return jsonObject;
    }

    /**
     * 通过任务包id获取任务包名称
     *
     * @param tran_id
     * @return
     */
    @ApiOperation("通过任务包id获取任务包名称")
    @RequestMapping(value = "/getTran_name", method = RequestMethod.GET)
    @ResponseBody
    public Object getTran_name(@RequestParam String tran_id) {
        System.out.println("tran_id:" + tran_id);
        String tran_name = this.taskService.selectNameByTranId(tran_id);

        return tran_name;
    }

    @RequestMapping(value = "/selectDataBase", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> selectDataBase(String id) {
        return this.taskService.selectDataBase(id);
    }

    @RequestMapping(value = "/selectTaskPidList", method = RequestMethod.POST)
    @ResponseBody
    public List<Map<String, Object>> selectTaskPidList(@RequestParam(required = false) String type) {
        return this.taskService.selectTaskPidList(type);
    }
}

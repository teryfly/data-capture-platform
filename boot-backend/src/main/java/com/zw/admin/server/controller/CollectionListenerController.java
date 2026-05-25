package com.zw.admin.server.controller;


import com.zw.admin.server.base.controller.BaseController;
import com.zw.admin.server.service.ICollectionlogService;
import com.zw.admin.server.utils.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

/**
 * 采集日志控制器
 *
 * @Date 2018-08-16 16:57:48
 */
@Controller
@RequestMapping("/collectionlistener")
public class CollectionListenerController extends BaseController {

    private String PREFIX = "/collection/collectionlog/";

    @Autowired
    private ICollectionlogService collectionlogService;
    private String defaultIp = "";

    /**
     * 跳转到采集日志首页
     */
    @RequestMapping("")
    public String index() {
        return PREFIX + "collectionlistener.html";
    }

    /**
     * 跳转到采集日志首页
     */
    @RequestMapping("/list")
    @ResponseBody
    public Object list(@RequestParam(required = false) String taskName,
                       @RequestParam(required = false) String beginTime,
                       @RequestParam(required = false) String endTime,
                       @RequestParam(required = false) String type) {
        Message<List<Map<String, Object>>> msg = new Message<>();
        try {
            List<Map<String, Object>> result = collectionlogService.statistics(beginTime, endTime, taskName, "task_id", true, type);
            msg.setSuccess(true);
            msg.setData(result);
        } catch (Exception e) {
            msg.setSuccess(false);
            msg.setMsg("加载数据异常！");
        }
        return msg;
    }

    @RequestMapping("/setIp")
    @ResponseBody
    public String managerPage(String ip, Map<String, Object> front) {
        defaultIp = ip;
        front.put("defaultIp", defaultIp);
        return "success";

    }
}

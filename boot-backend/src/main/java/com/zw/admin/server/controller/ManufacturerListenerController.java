package com.zw.admin.server.controller;

import com.zw.admin.server.base.controller.BaseController;
import com.zw.admin.server.service.IManufacturerListenerService;
import com.zw.admin.server.utils.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 *
 * @author: 刘子沛
 * @date: 2018/12/12 15:54
 */
@Controller
@RequestMapping("/mft")
public class ManufacturerListenerController extends BaseController {

    @Autowired
    private IManufacturerListenerService listenerService;

    /**
     * 根据条件查询厂商列表
     *
     * @param name 厂商名称
     * @return
     */
    @RequestMapping(value = "/selectMftList", method = RequestMethod.POST)
    @ResponseBody
    public List<Map<String, Object>> selectMftList(@RequestParam(required = false) String name) {
        return this.listenerService.selectMftList(name);
    }

    /**
     * 查询厂商一共执行多少任务包 成功次数 失败次数
     *
     * @param name      厂商名称
     * @param beginTime 开始时间
     * @param endTime   结束时间
     * @param type      任务类型
     * @return
     */
    @RequestMapping(value = "/selectMftCount", method = RequestMethod.POST)
    @ResponseBody
    public Object selectMftCount(@RequestParam(required = false) String name,
                                 @RequestParam(required = false) String beginTime,
                                 @RequestParam(required = false) String endTime,
                                 @RequestParam(required = true) String type) {
        Message<List<Map<String, Object>>> msg = new Message<>();
        try {
            List<Map<String, Object>> result = this.listenerService.selectMftCount(name, beginTime, endTime, type);
            msg.setSuccess(true);
            msg.setData(result);
        } catch (Exception e) {
            msg.setSuccess(false);
            msg.setMsg("加载数据异常！");
        }
        return msg;
    }

    /**
     * 根据厂商然后根据任务包编号的第二次分类
     *
     * @param company_id
     * @param beginTime
     * @param endTime
     * @param type
     * @return
     */
    @RequestMapping(value = "/selectTaskCountByMft", method = RequestMethod.POST)
    @ResponseBody
    public List<Map<String, Object>> selectTaskCountByMft(@RequestParam(required = false) String company_id,
                                                          @RequestParam(required = false) String beginTime,
                                                          @RequestParam(required = false) String endTime,
                                                          @RequestParam(required = false) String type) {
        return this.listenerService.selectTaskCountByMft(company_id, beginTime, endTime, type);
    }

}

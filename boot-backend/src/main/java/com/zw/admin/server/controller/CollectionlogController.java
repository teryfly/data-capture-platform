package com.zw.admin.server.controller;

import com.baomidou.mybatisplus.plugins.Page;
import com.zw.admin.server.base.controller.BaseController;
import com.zw.admin.server.page.PageFactory;
import com.zw.admin.server.service.ICollectionlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 采集日志控制器
 *
 * @Date 2018-08-16 16:57:48
 */
@Controller
@RequestMapping("/collectionlog")
public class CollectionlogController extends BaseController {

    private String PREFIX = "/collection/collectionlog/";

    @Autowired
    private ICollectionlogService collectionlogService;

    /**
     * 获取采集日志列表
     */
    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list(@RequestParam(required = false) String beginTime,
                       @RequestParam(required = false) String endTime,
                       @RequestParam(required = false) String id,
                       @RequestParam(required = false) String name,
                       @RequestParam(required = false) String success,
                       @RequestParam(required = false) String company_name,
                       @RequestParam(required = false) String company_id,
                       @RequestParam String type,
                       int limit,
                       int offset) {
        Map<String, Object> map = new HashMap<>();
        map.put("beginTime", beginTime);
        map.put("endTime", endTime);
        map.put("id", id);
        map.put("name", name);
        map.put("success", success);
        map.put("company_name", company_name);
        map.put("company_id", company_id);
        map.put("type", type);
        Page<Map<String, Object>> page = new PageFactory<Map<String, Object>>().defaultPage();
        page.setTotal(this.collectionlogService.selectCollectionlogsCount(map));
        List<Map<String, Object>> result = this.collectionlogService.list(map, offset, limit);
        page.setRecords(result);
        return super.packForBT(page);
    }

    /**
     * 采集日志详情
     */
    @RequestMapping(value = "/one")
    @ResponseBody
    public Object one(String keyId) {
        return collectionlogService.one(keyId);
    }

    /**
     * 跳转到采集日志首页
     */
    /*@RequestMapping("")
    public String index() {
        return PREFIX + "collectionlog.html";
    }*/

    /**
     * 跳转到添加采集日志
     */
    /*@RequestMapping("/collectionlog_add")
    public String collectionlogAdd() {
        return PREFIX + "collectionlog_add.html";
    }*/

    /**
     * 跳转到修改采集日志
     */
    /*@RequestMapping("/collectionlog_update/{collectionlogId}")
    public String collectionlogUpdate(@PathVariable Integer collectionlogId, Model model) {
        CollectionLog collectionLog = collectionlogService.selectById(collectionlogId);
        model.addAttribute("item", collectionLog);
        //LogObjectHolder.me().set(collectionLog);
        return PREFIX + "collectionlog_edit.html";
    }*/

    /**
     * 新增采集日志
     */
    /*@RequestMapping(value = "/add")
    @ResponseBody
    public Object add(CollectionLog collectionLog) {
        collectionlogService.insert(collectionLog);
        return SUCCESS_TIP;
    }*/

    /**
     * 删除采集日志
     */
    /*@RequestMapping(value = "/delete")
    @ResponseBody
    public Object delete(@RequestParam Integer collectionlogId) {
        collectionlogService.deleteById(collectionlogId);
        return SUCCESS_TIP;
    }*/

    /**
     * 修改采集日志
     */
    /*@RequestMapping(value = "/update")
    @ResponseBody
    public Object update(CollectionLog collectionLog) {
        collectionlogService.updateById(collectionLog);
        return SUCCESS_TIP;
    }*/
}

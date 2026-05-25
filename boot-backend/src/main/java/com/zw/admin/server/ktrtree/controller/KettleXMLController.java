package com.zw.admin.server.ktrtree.controller;

import com.zw.admin.server.base.controller.BaseController;
import com.zw.admin.server.ktrtree.entity.KettleXML;
import com.zw.admin.server.ktrtree.service.KettleXMLService;
import com.zw.admin.server.tips.SuccessTip;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/tree/leaf")
public class KettleXMLController extends BaseController {
    @Autowired
    KettleXMLService kettleXMLService;

    /**
     * 新增更新叶节点内容
     * @param kettleXML
     * @return
     */
    @ResponseBody
    @PostMapping("save")
    public Object insertContent(@RequestBody KettleXML kettleXML){
        boolean flag = kettleXMLService.insertKettleXML(kettleXML);
        if(!flag){
            return new SuccessTip(500,"操作失败");
        }
        return SUCCESS_TIP;
    }

    /*@ResponseBody
    @PostMapping("updateContent")
    public Object updateContent(@RequestBody KettleXML kettleXML){
        boolean flag=kettleXMLService.updateKettleXML(kettleXML);
        if(!flag){
            return new SuccessTip(500,"操作失败");
        }
        return SUCCESS_TIP;
    }*/

    @ResponseBody
    @GetMapping("{treeId}")
    public Object getContent(@PathVariable("treeId") String treeId){
        KettleXML kettleXML = kettleXMLService.getContentByTreeId(treeId);
        if(kettleXML==null){
            return new SuccessTip(400,"该节点不存在数据");
        }
        return kettleXML;
    }



}

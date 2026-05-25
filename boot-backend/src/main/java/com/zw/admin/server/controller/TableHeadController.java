package com.zw.admin.server.controller;

import com.zw.admin.server.base.controller.BaseController;
import com.zw.admin.server.model.Rule;
import com.zw.admin.server.service.TableHeadService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;


/**
 * 根据表ID查询表字段信息
 *
 * @author daiqingxiu
 */
@Controller
@RequestMapping("/table")
public class TableHeadController extends BaseController {
    private static final Logger logger = LoggerFactory.getLogger(TableHeadController.class);
    @Autowired
    TableHeadService tableHeadService;

    @RequestMapping("/findTableHead")
    @ResponseBody
    public List<Map<String,Object>> findTableHead(@RequestParam("taskId") String taskId) {
        List<Map<String,Object>> data = null;
        try {
            data = tableHeadService.listByHdrId(taskId);
        } catch (Exception e) {
            logger.error("TableHeadController.findTableHead", e);
        }
        return data;
    }


}

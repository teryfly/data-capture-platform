package com.zw.admin.server.controller;

import com.zw.admin.server.base.controller.BaseController;
import com.zw.admin.server.service.TableDataService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/check")
public class TableDataController extends BaseController {
    private static final Logger logger=LoggerFactory.getLogger(TableDataController.class);
    @Autowired
    TableDataService tableDataService;

    @RequestMapping(value = "/findTableData")
    @ResponseBody
    public List<Map<String,Object>> findTableData(@RequestParam Map<String,Object> queryData){
        return tableDataService.findTableData(queryData);
    }


}

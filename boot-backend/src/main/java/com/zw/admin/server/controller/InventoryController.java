package com.zw.admin.server.controller;

import com.baomidou.mybatisplus.plugins.Page;
import com.zw.admin.server.base.controller.BaseController;
import com.zw.admin.server.page.PageFactory;
import com.zw.admin.server.service.IInventoryService;
import io.swagger.annotations.ApiOperation;
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
 * @date: 2018/12/18 13:39
 */
@Controller
@RequestMapping("/inventory")
public class InventoryController extends BaseController {

    @Autowired
    private IInventoryService inventoryService;

    @ApiOperation("分页查询有误数据")
    @RequestMapping(value = "/list", method = RequestMethod.POST)
    @ResponseBody
    public Object selectInventoryLog(@RequestParam(required = false) String hdr_id,
                                     @RequestParam(required = false) String column_id,
                                     @RequestParam(required = false) String beginTime,
                                     @RequestParam(required = false) String endTime,
                                     int limit,
                                     int offset) {
        Page<Map<String, Object>> page = new PageFactory<Map<String, Object>>().defaultPage();
        page.setTotal(this.inventoryService.selectInventoryCount(hdr_id, column_id, beginTime, endTime));
        List<Map<String, Object>> result = this.inventoryService.selectInventoryLog(hdr_id, column_id, beginTime, endTime, offset, limit);
        page.setRecords(result);
        return super.packForBT(page);
    }

}

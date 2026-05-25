package com.zw.admin.server.service.impl;

import com.zw.admin.server.dao.InventoryMapper;
import com.zw.admin.server.service.IInventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 *
 * @author: 刘子沛
 * @date: 2018/12/18 11:36
 */
@Service
public class InventoryServiceImpl implements IInventoryService {

    @Autowired
    private InventoryMapper inventoryMapper;

    @Override
    public List<Map<String, Object>> selectInventoryLog(String hdr_id, String column_id, String beginTime, String endTime, Integer offset, Integer limit) {
        Map<String, Object> map = new HashMap<>();
        map.put("hdr_id", hdr_id);
        map.put("column_id", column_id);
        map.put("beginTime", beginTime);
        map.put("endTime", endTime);
        return this.inventoryMapper.selectInventoryLog(map, offset, limit);
    }

    @Override
    public Integer selectInventoryCount(String hdr_id, String column_id, String beginTime, String endTime) {
        Map<String, Object> map = new HashMap<>();
        map.put("hdr_id", hdr_id);
        map.put("column_id", column_id);
        map.put("beginTime", beginTime);
        map.put("endTime", endTime);
        return this.inventoryMapper.selectInventoryCount(map);
    }
}

package com.zw.admin.server.service.impl;

import com.zw.admin.server.dao.ManufacturerListenerMapper;
import com.zw.admin.server.service.IManufacturerListenerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 *
 * @author: 刘子沛
 * @date: 2018/12/12 16:16
 */
@Service
public class ManufacturerListenerServiceImpl implements IManufacturerListenerService {

    @Autowired
    private ManufacturerListenerMapper listenerMapper;

    @Override
    public List<Map<String, Object>> selectMftList(String name) {
        Map<String, Object> map = new HashMap<>();
        map.put("name", name);
        return this.listenerMapper.selectMftList(map);
    }

    @Override
    public List<Map<String, Object>> selectMftCount(String name, String beginTime, String endTime, String type) {
        Map<String, Object> map = new HashMap<>();
        map.put("name", name);
        map.put("beginTime", beginTime);
        map.put("endTime", endTime);
        map.put("type", type);
        return this.listenerMapper.selectMftCount(map);
    }

    @Override
    public List<Map<String, Object>> selectTaskCountByMft(String company_id, String beginTime, String endTime, String type) {
        Map<String, Object> map = new HashMap<>();
        map.put("company_id", company_id);
        map.put("beginTime", beginTime);
        map.put("endTime", endTime);
        map.put("type", type);
        List<Map<String, Object>> maps = this.listenerMapper.selectTaskCountByMft(map);
        return maps;
    }

}

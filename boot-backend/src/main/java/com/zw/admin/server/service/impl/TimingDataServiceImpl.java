package com.zw.admin.server.service.impl;

import com.zw.admin.server.dao.TimingDataMapper;
import com.zw.admin.server.model.TimingData;
import com.zw.admin.server.service.ITimingDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.*;

/**
 * Created with IntelliJ IDEA.
 *
 * @author: 刘子沛
 * @date: 2018/11/22 11:27
 */
@Service
public class TimingDataServiceImpl implements ITimingDataService {

    @Autowired
    private TimingDataMapper timingData;

    @Override
    public List<Map<String, Object>> selectThridParty() {
        return this.timingData.selectThridParty();
    }

    @Override
    public List<Map<String, Object>> selectTransformation() {
        return this.timingData.selectTransformation();
    }

    /**********************************************************************************************/

    @Override
    public List<Map<String, Object>> selectTaskDepByTableId(String table_id, String id) {
        Map<String, Object> map = new HashMap<>();
        map.put("table_id", table_id);
        map.put("id", id);
        return this.timingData.selectTaskDepByTableId(map);
    }

    @Override
    public boolean insertTaskDep(String ids, String table_id) {
        List<Map<String, Object>> map = new ArrayList<>();
        if (!ids.isEmpty()) {
            String[] id = ids.split(",");
            for (String o : id) {
                Map<String, Object> m = new HashMap<>();
                m.put("id", UUID.randomUUID().toString());
                m.put("table_id", table_id);
                m.put("work_id", o);
                m.put("status", 1);
                m.put("create_time", new Date(System.currentTimeMillis()));
                map.add(m);
            }
        }
        boolean tag = true;
        try {
            this.timingData.insertTaskDep(map);
        } catch (Exception e) {
            tag = false;
        }
        return tag;
    }

    @Override
    public boolean updateTaskDep(String id, String status, String work_id) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", id);
        map.put("status", status);
        map.put("work_id", work_id);
        map.put("update_time", new Date(System.currentTimeMillis()));
        boolean tag = true;
        try {
            this.timingData.updateTaskDep(map);
        } catch (Exception e) {
            tag = false;
        }
        return tag;
    }

}

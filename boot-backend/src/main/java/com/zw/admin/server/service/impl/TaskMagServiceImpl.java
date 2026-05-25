package com.zw.admin.server.service.impl;

import com.zw.admin.server.dao.TaskMagMapper;
import com.zw.admin.server.model.TimingData;
import com.zw.admin.server.service.ITaskMagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Created with IntelliJ IDEA.
 *
 * @author: 刘子沛
 * @date: 2018/12/3 10:09
 */
@Service
public class TaskMagServiceImpl implements ITaskMagService {

    @Autowired
    private TaskMagMapper taskMagMapper;

    @Override
    public List<Map<String, Object>> selectTaskList(String work_untis_name, String type) {
        Map<String, Object> map = new HashMap<>();
        map.put("work_untis_name", work_untis_name);
        map.put("type", type);
        return this.taskMagMapper.selectTaskList(map);
    }

    @Override
    public boolean insertTimingTask(TimingData data) {
        boolean tag = true;
        data.setId(UUID.randomUUID().toString());
        data.setCreate_time(new Date(System.currentTimeMillis()));
        try {
            this.taskMagMapper.insertTimingTask(data);
        } catch (Exception e) {
            tag = false;
        }
        return tag;
    }

    @Override
    public boolean updateTimingTask(TimingData data) {
        if ("0".equals(data.getStatus())) {
            data.setProhibit_time(new Date(System.currentTimeMillis()));
        }
        data.setUpdate_time(new Date(System.currentTimeMillis()));
        boolean tag = true;
        try {
            this.taskMagMapper.updateTimingTask(data);
        } catch (Exception e) {
            tag = false;
        }
        return tag;
    }

    @Override
    public boolean inserTrealTimeTask(TimingData data) {
        boolean tag = true;
        data.setCreate_time(new Date(System.currentTimeMillis()));
        try {
            this.taskMagMapper.inserTrealTimeTask(data);
        } catch (Exception e) {
            tag = false;
        }
        return tag;
    }

    @Override
    public boolean updateTrealTimeTask(TimingData data) {
        if ("0".equals(data.getStatus())) {
            data.setProhibit_time(new Date(System.currentTimeMillis()));
        }
        data.setUpdate_time(new Date(System.currentTimeMillis()));
        boolean tag = true;
        try {
            this.taskMagMapper.updateTrealTimeTask(data);
        } catch (Exception e) {
            tag = false;
        }
        return tag;
    }

    @Override
    public List<Map<String, Object>> selectEventList(String type) {
        Map<String, Object> map = new HashMap<>();
        map.put("type", type);
        return this.taskMagMapper.selectEventList(map);
    }

    @Override
    public Map<String, Object> selectTaskOnly(String id) {
        return this.taskMagMapper.selectTaskOnly(id);
    }

    @Override
    public boolean updateStatus(String status, String id) {
        boolean tag = true;
        try {
            Map<String, Object> map = new HashMap<>();
            map.put("status", status);
            map.put("id", id);
            this.taskMagMapper.updateStatus(map);
        } catch (Exception e) {
            tag = false;
        }
        return tag;
    }

    @Override
    public boolean selectTaskByWorkUntisCode(String work_untis_code, String old_name_code) {
        boolean tag = true;
        Map<String, Object> map = new HashMap<>();
        map.put("work_untis_code", work_untis_code);
        map.put("old_name_code", old_name_code);
        if (this.taskMagMapper.selectTaskByWorkUntisCode(map) != null) {
            tag = false;
        }
        return tag;
    }

}

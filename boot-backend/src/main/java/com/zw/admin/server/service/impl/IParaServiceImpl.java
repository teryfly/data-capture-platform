package com.zw.admin.server.service.impl;

import com.zw.admin.server.dao.ParaMapper;
import com.zw.admin.server.service.IParaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Created with IntelliJ IDEA.
 *
 * @author: 刘子沛
 * @date: 2018/12/3 17:55
 */
@Service
public class IParaServiceImpl implements IParaService {

    @Autowired
    private ParaMapper paraMapper;

    @Override
    public boolean insertPara(List<Map<String, Object>> map, String id) {
        boolean tag = true;
        if (map != null && map.size() != 0) {
            for (Map<String, Object> o : map) {
                o.put("id", UUID.randomUUID().toString());
                o.put("work_units_id", id);
            }
            try {
                this.paraMapper.insertPara(map);
            } catch (Exception e) {
                tag = false;
            }
        }
        return tag;
    }

    @Override
    public List<Map<String, Object>> selectParaList(String work_units_id) {
        Map<String, Object> map = new HashMap<>();
        map.put("work_units_id", work_units_id);
        return this.paraMapper.selectParaList(map);
    }

    @Override
    public boolean delPara(String id) {
        boolean tag = true;
        try {
            Map<String, Object> map = new HashMap<>();
            map.put("id", id);
            this.paraMapper.delPara(map);
        } catch (Exception e) {
            tag = false;
        }
        return tag;
    }

    @Override
    public boolean delParaByWorkId(String work_units_id) {
        boolean tag = true;
        try {
            Map<String, Object> map = new HashMap<>();
            map.put("work_units_id", work_units_id);
            this.paraMapper.delParaByWorkId(map);
        } catch (Exception e) {
            tag = false;
        }
        return tag;
    }

    @Override
    public boolean insertParaOnly(Map<String, Object> map) {
        boolean tag = true;
        try {
            this.paraMapper.insertParaOnly(map);
        } catch (Exception e) {
            tag = false;
        }
        return tag;
    }

    @Override
    public boolean updateParaOnly(Map<String, Object> map) {
        boolean tag = true;
        try {
            this.paraMapper.updateParaOnly(map);
        } catch (Exception e) {
            tag = false;
        }
        return tag;
    }

}

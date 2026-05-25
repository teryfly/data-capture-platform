package com.zw.admin.server.service.impl;

import com.zw.admin.server.dao.QualityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 *
 * @author: 刘子沛
 * @date: 2018/8/25 10:50
 */
@Service
public class QualityServiceImpl implements QualityMapper {

    @Autowired
    private QualityMapper qualityMapper;

    @Override
    public List<Map<String, Object>> selectTaskData(String database_name, String table_name, String time_stamp, String beginTime, String endTime) {
        return this.qualityMapper.selectTaskData(database_name, table_name, time_stamp, beginTime, endTime);
    }
    
    
    public Map<String, Object> selectDataByKey(String key){
    	return this.qualityMapper.selectDataByKey(key);
    }
    
    public List<Map<String, Object>> selectTaskData2(String database_name, String table_name, String time_stamp, String beginTime, String endTime) {
        return this.qualityMapper.selectTaskData2(database_name, table_name, time_stamp, beginTime, endTime);
    }    
}

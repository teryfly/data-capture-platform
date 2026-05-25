package com.zw.admin.server.service.impl;

import com.zw.admin.server.dao.TableHeadDao;
import com.zw.admin.server.model.Rule;
import com.zw.admin.server.service.TableHeadService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class TableHeadServiceImpl implements TableHeadService {
    private static final Logger logger=LoggerFactory.getLogger(TableHeadServiceImpl.class);
    @Autowired
    TableHeadDao tableHeadDao;
    @Override
    public List<Map<String,Object>> listByHdrId(String taskId) {
        List<Map<String,Object>> data=null;
        try{
            data=tableHeadDao.listByHdrId(taskId);
        }catch (Exception e){
            logger.debug("TableHeadServiceImpl",e);
        }
        return data;
    }
}

package com.zw.admin.server.service.impl;

import com.zw.admin.server.dao.TableDataMapper;
import com.zw.admin.server.dao.TableHeadDao;
import com.zw.admin.server.service.TableDataService;
import com.zw.admin.server.service.TableHeadService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class TableDataServiceImpl implements TableDataService {
    private static final Logger logger=LoggerFactory.getLogger(TableDataServiceImpl.class);
    @Autowired
    TableDataMapper tableDataMapper;
    @Autowired
    TableHeadService tableHeadService;

    @Override
    public List<Map<String, Object>> findTableData(Map<String, Object> param) {
        //获取数据库名称以及表名称
        Map<String, Object> tableNameMap = tableDataMapper.findTableName(param);
        param.put("dataBaseName",tableNameMap.get("dataBaseName"));
        param.put("tableName",tableNameMap.get("tableName"));
        /*param.put("taskId",tableNameMap.get("tableId"));
        Map<String,Object> tableHead=tableHeadService.listByHdrId((String) param.get("taskId"));
        //查询表头是否有createdTime字段
        if(!tableHead.containsValue("createdTime")){
            param.put("createdTime",null);
        }*/
        List<Map<String,Object>> tableDataList=null;
        try {
            tableDataList=tableDataMapper.findTableData(param);
           /* System.out.println("========================="+tableDataList);*/
        }catch (Exception e){
            logger.error("数据库查询语句异常:"+e);
        }
        return tableDataList;
    }
}

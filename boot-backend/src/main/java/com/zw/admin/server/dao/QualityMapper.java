package com.zw.admin.server.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 *
 * @author: 刘子沛
 * @date: 2018/8/25 10:38
 */
@Mapper
public interface QualityMapper {

    List<Map<String,Object>> selectTaskData(@Param("database_name") String database_name,
                                            @Param("table_name") String table_name,
                                            @Param("time_stamp") String time_stamp,
                                            @Param("beginTime") String beginTime,
                                            @Param("endTime") String endTime);
    
    Map<String, Object> selectDataByKey(@Param("key") String key);

    List<Map<String,Object>> selectTaskData2(@Param("database_name") String database_name,
                                             @Param("table_name") String table_name,
                                             @Param("time_stamp") String time_stamp,
                                             @Param("beginTime") String beginTime,
                                             @Param("endTime") String endTime);
    
}

package com.zw.admin.server.service;

import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 *
 * @author: 刘子沛
 * @date: 2018/12/18 11:19
 */
public interface IInventoryService {

    /**
     * 分页查询某一个表某一个字段某一个时间段有问题的日志
     *
     * @param hdr_id    hdr表id
     * @param column_id 字段id
     * @param beginTime 开始时间
     * @param endTime   结束时间
     * @param offset
     * @param limit
     * @return
     */
    List<Map<String, Object>> selectInventoryLog(String hdr_id, String column_id,
                                                 String beginTime, String endTime,
                                                 Integer offset, Integer limit);

    /**
     * 分页查询某一个表某一个字段某一个时间段有问题的日志有多少条数
     *
     * @param hdr_id
     * @param column_id
     * @param beginTime
     * @param endTime
     * @return
     */
    Integer selectInventoryCount(String hdr_id, String column_id,
                                 String beginTime, String endTime);

}

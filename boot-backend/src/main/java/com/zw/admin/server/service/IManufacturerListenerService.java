package com.zw.admin.server.service;

import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 *
 * @author: 刘子沛
 * @date: 2018/12/12 16:14
 */
public interface IManufacturerListenerService {

    /**
     * 根据条件查询厂商列表
     *
     * @param name 厂商名称
     * @return
     */
    List<Map<String, Object>> selectMftList(String name);

    /**
     * 查询厂商一共执行多少任务包 成功次数 失败次数
     *
     * @param name      厂商名称
     * @param beginTime 开始时间
     * @param endTime   结束时间
     * @param type      任务类型
     * @return
     */
    List<Map<String, Object>> selectMftCount(String name, String beginTime, String endTime, String type);

    /**
     * 根据厂商 时间  任务类型查询统计任务包下的成功次数  失败次数
     *
     * @param company_id 厂商id
     * @param beginTime  开始时间
     * @param endTime    结束时间
     * @param type       任务类型
     * @return
     */
    List<Map<String, Object>> selectTaskCountByMft(String company_id, String beginTime, String endTime, String type);
}

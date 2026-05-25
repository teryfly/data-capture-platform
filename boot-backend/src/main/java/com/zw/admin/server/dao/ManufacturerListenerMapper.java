package com.zw.admin.server.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 *
 * @author: 刘子沛
 * @date: 2018/12/12 16:02
 */
@Mapper
public interface ManufacturerListenerMapper {

    /**
     * 根据条件查询厂商列表
     *
     * @param map
     * @return
     */
    List<Map<String, Object>> selectMftList(@Param("map") Map<String, Object> map);

    /**
     * 查询厂商一共执行多少任务包 成功次数 失败次数
     *
     * @param map 厂商名称    时间     任务类型
     * @return
     */
    List<Map<String, Object>> selectMftCount(@Param("map") Map<String, Object> map);

    /**
     * 根据厂商 时间  任务类型查询统计任务包下的成功次数  失败次数
     *
     * @param map
     * @return
     */
    List<Map<String, Object>> selectTaskCountByMft(@Param("map") Map<String, Object> map);

}

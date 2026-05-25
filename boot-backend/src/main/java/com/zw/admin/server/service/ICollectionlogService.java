package com.zw.admin.server.service;

import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.service.IService;
import com.zw.admin.server.model.CollectionLog;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 服务类
 * </p>
 *
 * @author lanxuyu123
 * @since 2018-08-16
 */
public interface ICollectionlogService extends IService<CollectionLog> {

    /*
     * description  TODO
     * author       lanxuyu
     * CreateTime   2018年8月16日 下午6:01:27
     * @param page
     * @param beginTime
     * @param endTime
     * @param taskName
     * @param orderByField
     * @param asc
     * @return
     */
    List<CollectionLog> getCollectionlogs(Page<CollectionLog> page,
                                          String beginTime, String endTime, String taskName, Integer logType,
                                          String orderByField, boolean asc);

    /**
     * 任务视图
     * author lanxuyu
     *
     * @param beginTime
     * @param endTime
     * @param taskName
     * @param orderByField
     * @param asc
     * @param type
     * @return
     */
    List<Map<String, Object>> statistics(String beginTime, String endTime,
                                         String taskName, String orderByField, boolean asc, String type);

    /**
     * 查询日志条数
     *
     * @param params
     * @return
     */
    int selectCollectionlogsCount(@Param("params") Map<String, Object> params);

    /**
     * 分页查询定时数据抽取
     *
     * @param params
     * @param offset
     * @param limit
     * @return
     */
    List<Map<String, Object>> list(@Param("params") Map<String, Object> params, @Param("offset") Integer offset,
                                   @Param("limit") Integer limit);

    /**
     * 根据日志主键查询日志详情
     *
     * @param KeyId
     * @return
     */
    Map<String, Object> one(@Param("keyId") String KeyId);

}

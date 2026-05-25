package com.zw.admin.server.dao;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.zw.admin.server.model.CollectionLog;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * Mapper 接口
 * </p>
 *
 * @author lanxuyu123
 * @since 2018-08-16
 */
@Mapper
public interface CollectionlogMapper extends BaseMapper<CollectionLog> {

    /**
     * author lanxuyu
     *
     * @param page
     * @param beginTime
     * @param endTime
     * @param taskName
     * @param logType
     * @param orderByField
     * @param isAsc
     * @return
     */
    List<CollectionLog> getCollectionlogs(@Param("page") Page<CollectionLog> page,
                                          @Param("beginTime") String beginTime,
                                          @Param("endTime") String endTime,
                                          @Param("taskName") String taskName,
                                          @Param("logType") Integer logType,
                                          @Param("orderByField") String orderByField,
                                          @Param("isAsc") boolean isAsc);

    /**
     * 任务视图
     * author lanxuyu
     *
     * @param beginTime
     * @param endTime
     * @param taskName
     * @param orderByField
     * @param isAsc
     * @param type
     * @return
     */
    List<Map<String, Object>> statistics(@Param("beginTime") String beginTime,
                                         @Param("endTime") String endTime,
                                         @Param("taskName") String taskName,
                                         @Param("orderByField") String orderByField,
                                         @Param("isAsc") boolean isAsc,
                                         @Param("type") String type);

    /**
     * 查询日志条数
     *
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
    List<Map<String, Object>> list(@Param("params") Map<String, Object> params,
                                   @Param("offset") Integer offset,
                                   @Param("limit") Integer limit);

    /**
     * 根据日志主键查询日志详情
     *
     * @param KeyId
     * @return
     */
    Map<String, Object> one(@Param("keyId") String KeyId);

}

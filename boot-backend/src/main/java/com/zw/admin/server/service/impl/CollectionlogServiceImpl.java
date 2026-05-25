package com.zw.admin.server.service.impl;

import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.zw.admin.server.dao.CollectionlogMapper;
import com.zw.admin.server.model.CollectionLog;
import com.zw.admin.server.service.ICollectionlogService;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author lanxuyu123
 * @since 2018-08-16
 */
@Service
public class CollectionlogServiceImpl extends ServiceImpl<CollectionlogMapper, CollectionLog> implements ICollectionlogService {

    @Override
    public List<CollectionLog> getCollectionlogs(Page<CollectionLog> page,
                                                 String beginTime, String endTime, String taskName, Integer logType,
                                                 String orderByField, boolean asc) {
        List<CollectionLog> list = this.baseMapper.getCollectionlogs(page, beginTime, endTime, taskName, logType, orderByField, asc);
        return list;
    }

    @Override
    public List<Map<String, Object>> statistics(String beginTime, String endTime,
                                                String taskName, String orderByField, boolean asc, String type) {
        List<Map<String, Object>> list = this.baseMapper.statistics(beginTime, endTime, taskName, orderByField, asc, type);
        return list;
    }

    @Override
    public int selectCollectionlogsCount(Map<String, Object> params) {
        return this.baseMapper.selectCollectionlogsCount(params);
    }

    @Override
    public List<Map<String, Object>> list(Map<String, Object> params, Integer offset, Integer limit) {
        return this.baseMapper.list(params, offset, limit);
    }

    @Override
    public Map<String, Object> one(String KeyId) {
        return this.baseMapper.one(KeyId);
    }

}

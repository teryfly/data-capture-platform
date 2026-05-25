package com.zw.admin.server.base.warpper;

import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 *
 * @author: 徐佳飞
 * @date: 2018/7/13 14:51
 */
public class RuleWarpper extends BaseControllerWarpper {

    public RuleWarpper(List<Map<String, Object>> list){
        super(list);
    }

    @Override
    protected void warpTheMap(Map<String, Object> map) {

    }
}

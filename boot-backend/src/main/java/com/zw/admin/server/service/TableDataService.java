package com.zw.admin.server.service;

import java.util.List;
import java.util.Map;

public interface TableDataService {
    /**
     *
     * @param param
     * @return
     */
    List<Map<String,Object>> findTableData(Map<String,Object> param);
}

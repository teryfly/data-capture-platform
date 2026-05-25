package com.zw.admin.server.service;

import java.util.List;
import java.util.Map;

public interface TableHeadService {
    List<Map<String,Object>> listByHdrId(String taskId);
}

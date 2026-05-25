package com.zw.admin.server.service;

import com.alibaba.fastjson.JSONObject;

public interface IFhirService {

    JSONObject getMechanismList(String searchKey);
}

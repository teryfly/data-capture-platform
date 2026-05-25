package com.zw.admin.server.controller;

import com.alibaba.fastjson.JSONObject;
import com.zw.admin.server.service.IFhirService;
import com.zw.admin.server.tips.SuccessTip;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/fhir")
public class FhirProxyController {

    private static final Logger logger = LoggerFactory.getLogger(FhirProxyController.class);

    @Autowired
    private IFhirService fhirService;

    @PostMapping("/global/base/mechanismList")
    public SuccessTip getMechanismList(@RequestBody Map<String, Object> requestBody) {
        try {
            String searchKey = requestBody != null ? (String) requestBody.get("searchKey") : "";
            JSONObject result = fhirService.getMechanismList(searchKey);
            return SuccessTip.success(result);
        } catch (Exception e) {
            logger.error("Failed to get mechanism list: {}", e.getMessage(), e);
            return SuccessTip.error("获取机构列表失败：" + e.getMessage());
        }
    }
}

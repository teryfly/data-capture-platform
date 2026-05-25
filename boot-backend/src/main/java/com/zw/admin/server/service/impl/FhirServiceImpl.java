package com.zw.admin.server.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.zw.admin.server.config.ExternalServiceProperties;
import com.zw.admin.server.service IFhirService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class FhirServiceImpl implements IFhirService {

    private static final Logger logger = LoggerFactory.getLogger(FhirServiceImpl.class);

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ExternalServiceProperties externalServiceProperties;

    @Override
    public JSONObject getMechanismList(String searchKey) {
        String fhirHost = externalServiceProperties.getFhir().getHost();
        String url = "http://" + fhirHost + "/global/base/mechanismList";

        logger.info("Calling FHIR API: {}", url);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        JSONObject requestBody = new JSONObject();
        requestBody.put("searchKey", searchKey);

        HttpEntity<String> entity = new HttpEntity<>(requestBody.toJSONString(), headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    String.class
            );
            String responseBody = response.getBody();
            if (responseBody != null) {
                return JSON.parseObject(responseBody);
            }
            return null;
        } catch (Exception e) {
            logger.error("Failed to call FHIR API: {}", e.getMessage(), e);
            throw new RuntimeException("FHIR 服务调用失败：" + e.getMessage(), e);
        }
    }
}

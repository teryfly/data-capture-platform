package com.zw.admin.server.controller;

import com.zw.admin.server.config.ExternalServiceProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/config")
public class ConfigController {

    @Autowired
    private ExternalServiceProperties externalServiceProperties;

    @GetMapping
    public Map<String, Object> getConfig() {
        Map<String, Object> config = new HashMap<>();

        Map<String, Object> pentaho = new HashMap<>();
        pentaho.put("url", externalServiceProperties.getPentaho().getUrl());
        pentaho.put("username", externalServiceProperties.getPentaho().getUsername());
        pentaho.put("password", externalServiceProperties.getPentaho().getPassword());
        config.put("pentaho", pentaho);

        return config;
    }
}

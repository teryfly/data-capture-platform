package com.zw.admin.server;

import com.zw.admin.server.utils.UserConstants;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.xerces.jaxp.DocumentBuilderImpl;
import org.junit.Test;

import javax.xml.XMLConstants;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

public class CommonTest {
    @Test
    public void test(){//password加密算法
        String password="123456";
        String salt="87e03afa1f0122531f729c9a7453f475";
        Object object = new SimpleHash("MD5", password, salt, UserConstants.HASH_ITERATIONS);
        System.out.println(object.toString());
    }

    @Test
    public void xml() throws Exception{
        String path="C:\\Users\\yoshihigo\\Desktop\\门诊人次.xml";
        //InputStream inputStream = new ByteArrayInputStream(xml.getBytes());
       /* SAXReader saxReader = new SAXReader();
        saxReader.read(new File(path)).getRootElement();*/



        DocumentBuilderFactory docBuilderFactory = DocumentBuilderFactory.newInstance();
        docBuilderFactory.setFeature( XMLConstants.FEATURE_SECURE_PROCESSING, true );
        docBuilderFactory.setFeature( "http://apache.org/xml/features/disallow-doctype-decl", true );

        docBuilderFactory.newDocumentBuilder().parse(new FileInputStream(new File(path))).getDocumentElement();
        //docBuilderFactory.newDocumentBuilder().parse(new ByteArrayInputStream(str.getBytes())).getDocumentElement();
    }
}

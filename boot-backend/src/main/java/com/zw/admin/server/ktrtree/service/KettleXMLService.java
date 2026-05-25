package com.zw.admin.server.ktrtree.service;

import com.zw.admin.server.ktrtree.entity.KettleXML;

public interface KettleXMLService {
    KettleXML getContentByTreeId(String treeId);

    boolean insertKettleXML(KettleXML kettleXML);

    boolean updateKettleXML(KettleXML kettleXML);
}

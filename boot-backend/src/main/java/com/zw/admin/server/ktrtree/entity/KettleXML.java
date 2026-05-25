package com.zw.admin.server.ktrtree.entity;

import java.io.Serializable;
import java.util.Objects;

public class KettleXML implements Serializable {
  private String id;
  private String treeId;
  private String xml;
  private String remark;
  private Integer status;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTreeId() {
        return treeId;
    }

    public void setTreeId(String treeId) {
        this.treeId = treeId;
    }

    public String getXml() {
        return xml;
    }

    public void setXml(String xml) {
        this.xml = xml;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        KettleXML kettleXML = (KettleXML) o;
        return Objects.equals(id, kettleXML.id) &&
                Objects.equals(treeId, kettleXML.treeId) &&
                Objects.equals(xml, kettleXML.xml) &&
                Objects.equals(remark, kettleXML.remark) &&
                Objects.equals(status, kettleXML.status);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, treeId, xml, remark, status);
    }

    @Override
    public String toString() {
        return "KettleXML{" +
                "id='" + id + '\'' +
                ", treeId='" + treeId + '\'' +
                ", xml='" + xml + '\'' +
                ", remark='" + remark + '\'' +
                ", status=" + status +
                '}';
    }
}

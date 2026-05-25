package com.zw.admin.server.ktrtree.entity;

import java.io.Serializable;
import java.util.Objects;

public class TreePath implements Serializable {
    private String leafId;//叶节点ID

    private String treePath;// /顶级节点/层级1/层级2/叶节点名称

    private KettleXML kettleXML;

    public String getLeafId() {
        return leafId;
    }

    public void setLeafId(String leafId) {
        this.leafId = leafId;
    }

    public String getTreePath() {
        return treePath;
    }

    public void setTreePath(String treePath) {
        this.treePath = treePath;
    }

    public KettleXML getKettleXML() {
        return kettleXML;
    }

    public void setKettleXML(KettleXML kettleXML) {
        this.kettleXML = kettleXML;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TreePath treePath1 = (TreePath) o;
        return Objects.equals(leafId, treePath1.leafId) &&
                Objects.equals(treePath, treePath1.treePath) &&
                Objects.equals(kettleXML, treePath1.kettleXML);
    }

    @Override
    public String toString() {
        return "TreePath{" +
                "leafId='" + leafId + '\'' +
                ", treePath='" + treePath + '\'' +
                ", kettleXML=" + kettleXML +
                '}';
    }

    @Override
    public int hashCode() {

        return Objects.hash(leafId, treePath, kettleXML);
    }

}

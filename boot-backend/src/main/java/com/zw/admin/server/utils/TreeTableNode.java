package com.zw.admin.server.utils;

/**
 * Created with IntelliJ IDEA.
 *
 * @author: 徐佳飞
 * @date: 2018/7/30 20:57
 */
public class TreeTableNode {
    /**
     * 节点id
     */
    private String id;

    /**
     * 节点code
     */
    private String code;

    /**
     * 父节点code
     */
    private String pcode;

    /**
     * 节点名称
     */
    private String name;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getPcode() {
        return pcode;
    }

    public void setPcode(String pcode) {
        this.pcode = pcode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

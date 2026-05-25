package com.zw.admin.server.utils;

/**
 * @Description 菜单的节点
 * @date 2016年12月6日 上午11:34:17
 */
public class TreeGridNode {

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

    /**
     * 状态
     */
    private Byte status;

    /**
     * 状态名称
     */
    private String statusName;

    /**
     * 描述
     */
    private String description;

    /**
     * 模式(1:独立访客,2:独立IP,3:独立用户)
     */
    private String mode;

    /**
     * 模式名称
     */
    private String modeName;

    /**
     * 间隔时间（天）
     */
    private String interval;

    /**
     * 标记0医疗机构  1问卷
     */
    private Integer text;

    /**
     * 总票数
     */
    private String total;

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

    public Byte getStatus() {
        return status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public String getInterval() {
        return interval;
    }

    public void setInterval(String interval) {
        this.interval = interval;
    }

    public Integer getText() {
        return text;
    }

    public void setText(Integer text) {
        this.text = text;
    }

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    public String getStatusName() {
        return statusName;
    }

    public void setStatusName(String statusName) {
        this.statusName = statusName;
    }

    public String getModeName() {
        return modeName;
    }

    public void setModeName(String modeName) {
        this.modeName = modeName;
    }

    @Override
    public String toString() {
        return "TreeGridNode{" +
                "id='" + id + '\'' +
                ", code='" + code + '\'' +
                ", pcode='" + pcode + '\'' +
                ", name='" + name + '\'' +
                ", status=" + status +
                ", statusName='" + statusName + '\'' +
                ", description='" + description + '\'' +
                ", mode='" + mode + '\'' +
                ", modeName='" + modeName + '\'' +
                ", interval='" + interval + '\'' +
                ", text=" + text +
                ", total='" + total + '\'' +
                '}';
    }
}

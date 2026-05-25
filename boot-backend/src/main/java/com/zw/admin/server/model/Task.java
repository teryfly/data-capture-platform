package com.zw.admin.server.model;

public class Task {
    private String id;

    private String hdr_name;

    private String hdr_code;

    private String pid;

    private Integer status;

    private String remark;

    private String type;

    private Integer serial_num;

    private String is_test;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getHdr_name() {
        return hdr_name;
    }

    public void setHdr_name(String hdr_name) {
        this.hdr_name = hdr_name;
    }

    public String getHdr_code() {
        return hdr_code;
    }

    public void setHdr_code(String hdr_code) {
        this.hdr_code = hdr_code;
    }

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getSerial_num() {
        return serial_num;
    }

    public void setSerial_num(Integer serial_num) {
        this.serial_num = serial_num;
    }

    public String getIs_test() {
        return is_test;
    }

    public void setIs_test(String is_test) {
        this.is_test = is_test;
    }

    @Override
    public String toString() {
        return "Task{" +
                "id='" + id + '\'' +
                ", hdr_name='" + hdr_name + '\'' +
                ", hdr_code='" + hdr_code + '\'' +
                ", pid='" + pid + '\'' +
                ", status=" + status +
                ", remark='" + remark + '\'' +
                ", type='" + type + '\'' +
                ", serial_num=" + serial_num +
                ", is_test='" + is_test + '\'' +
                '}';
    }
}
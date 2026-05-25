package com.zw.admin.server.model;

public class Rule {
    private String id;

    private String task_id;

    private String column_name;

    private String column_code;

    private String is_null;

    private String regular;

    private String remark;

    private String is_pk;

    private String data_id;

    private String data_name;

    private String data_code;

    private String status;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTask_id() {
        return task_id;
    }

    public void setTask_id(String task_id) {
        this.task_id = task_id;
    }

    public String getColumn_name() {
        return column_name;
    }

    public void setColumn_name(String column_name) {
        this.column_name = column_name;
    }

    public String getColumn_code() {
        return column_code;
    }

    public void setColumn_code(String column_code) {
        this.column_code = column_code;
    }

    public String getIs_null() {
        return is_null;
    }

    public void setIs_null(String is_null) {
        this.is_null = is_null;
    }

    public String getRegular() {
        return regular;
    }

    public void setRegular(String regular) {
        this.regular = regular;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getIs_pk() {
        return is_pk;
    }

    public void setIs_pk(String is_pk) {
        this.is_pk = is_pk;
    }

    public String getData_id() {
        return data_id;
    }

    public void setData_id(String data_id) {
        this.data_id = data_id;
    }

    public String getData_name() {
        return data_name;
    }

    public void setData_name(String data_name) {
        this.data_name = data_name;
    }

    public String getData_code() {
        return data_code;
    }

    public void setData_code(String data_code) {
        this.data_code = data_code;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Rule{" +
                "id='" + id + '\'' +
                ", task_id='" + task_id + '\'' +
                ", column_name='" + column_name + '\'' +
                ", column_code='" + column_code + '\'' +
                ", is_null='" + is_null + '\'' +
                ", regular='" + regular + '\'' +
                ", remark='" + remark + '\'' +
                ", is_pk='" + is_pk + '\'' +
                ", data_id='" + data_id + '\'' +
                ", data_name='" + data_name + '\'' +
                ", data_code='" + data_code + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
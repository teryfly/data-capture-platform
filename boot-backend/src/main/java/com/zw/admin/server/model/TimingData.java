package com.zw.admin.server.model;

import java.sql.Date;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 *
 * @author: 刘子沛
 * @date: 2018/11/22 11:41
 */
public class TimingData {

    private String id;//任务包id

    private String task_id;//关联表id

    private String company_id;//厂商编号

    private String time_stamp;//时间戳字段

    private String data_base;//数据库名称

    private String status;//0:禁用,1:启用,2:删除

    private String tran_id;//kettle包代码

    private String remark;//备注

    private Date update_time;//修改时间

    private Date create_time;//创建时间

    private Date prohibit_time;//禁用时间

    private String cron;//cron表达式 执行频率

    private String work_untis_name;//任务包名称

    private String work_untis_code;//任务包代码

    private String type;//1:实时2:定时

    private String work_untis_code2;//实时任务包编码

    private String company_id2;//实时厂商

    private String status2;//实时状态

    private String monitoring_events;//实时监听事件

    private String broadcast_events;//实时广播事件

    private String work_untis_name2;//实时任务包名称

    private String tran_id2;//实时kettle包

    private String sending_broadcast_events;//实时发送广播事件

    private String remark2;//实时备注

    private String event;

    private List<Map<String, Object>> data;

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

    public String getCompany_id() {
        return company_id;
    }

    public void setCompany_id(String company_id) {
        this.company_id = company_id;
    }

    public String getTime_stamp() {
        return time_stamp;
    }

    public void setTime_stamp(String time_stamp) {
        this.time_stamp = time_stamp;
    }

    public String getData_base() {
        return data_base;
    }

    public void setData_base(String data_base) {
        this.data_base = data_base;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTran_id() {
        return tran_id;
    }

    public void setTran_id(String tran_id) {
        this.tran_id = tran_id;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Date getUpdate_time() {
        return update_time;
    }

    public void setUpdate_time(Date update_time) {
        this.update_time = update_time;
    }

    public Date getCreate_time() {
        return create_time;
    }

    public void setCreate_time(Date create_time) {
        this.create_time = create_time;
    }

    public Date getProhibit_time() {
        return prohibit_time;
    }

    public void setProhibit_time(Date prohibit_time) {
        this.prohibit_time = prohibit_time;
    }

    public String getCron() {
        return cron;
    }

    public void setCron(String cron) {
        this.cron = cron;
    }

    public String getWork_untis_name() {
        return work_untis_name;
    }

    public void setWork_untis_name(String work_untis_name) {
        this.work_untis_name = work_untis_name;
    }

    public String getWork_untis_code() {
        return work_untis_code;
    }

    public void setWork_untis_code(String work_untis_code) {
        this.work_untis_code = work_untis_code;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getWork_untis_code2() {
        return work_untis_code2;
    }

    public void setWork_untis_code2(String work_untis_code2) {
        this.work_untis_code2 = work_untis_code2;
    }

    public String getCompany_id2() {
        return company_id2;
    }

    public void setCompany_id2(String company_id2) {
        this.company_id2 = company_id2;
    }

    public String getStatus2() {
        return status2;
    }

    public void setStatus2(String status2) {
        this.status2 = status2;
    }

    public String getMonitoring_events() {
        return monitoring_events;
    }

    public void setMonitoring_events(String monitoring_events) {
        this.monitoring_events = monitoring_events;
    }

    public String getBroadcast_events() {
        return broadcast_events;
    }

    public void setBroadcast_events(String broadcast_events) {
        this.broadcast_events = broadcast_events;
    }

    public String getWork_untis_name2() {
        return work_untis_name2;
    }

    public void setWork_untis_name2(String work_untis_name2) {
        this.work_untis_name2 = work_untis_name2;
    }

    public String getTran_id2() {
        return tran_id2;
    }

    public void setTran_id2(String tran_id2) {
        this.tran_id2 = tran_id2;
    }

    public String getSending_broadcast_events() {
        return sending_broadcast_events;
    }

    public void setSending_broadcast_events(String sending_broadcast_events) {
        this.sending_broadcast_events = sending_broadcast_events;
    }

    public List<Map<String, Object>> getData() {
        return data;
    }

    public void setData(List<Map<String, Object>> data) {
        this.data = data;
    }

    public String getEvent() {
        return event;
    }

    public void setEvent(String event) {
        this.event = event;
    }

    public String getRemark2() {
        return remark2;
    }

    public void setRemark2(String remark2) {
        this.remark2 = remark2;
    }

    @Override
    public String toString() {
        return "TimingData{" +
                "id='" + id + '\'' +
                ", task_id='" + task_id + '\'' +
                ", company_id='" + company_id + '\'' +
                ", time_stamp='" + time_stamp + '\'' +
                ", data_base='" + data_base + '\'' +
                ", status='" + status + '\'' +
                ", tran_id='" + tran_id + '\'' +
                ", remark='" + remark + '\'' +
                ", update_time=" + update_time +
                ", create_time=" + create_time +
                ", prohibit_time=" + prohibit_time +
                ", cron='" + cron + '\'' +
                ", work_untis_name='" + work_untis_name + '\'' +
                ", work_untis_code='" + work_untis_code + '\'' +
                ", type='" + type + '\'' +
                ", work_untis_code2='" + work_untis_code2 + '\'' +
                ", company_id2='" + company_id2 + '\'' +
                ", status2='" + status2 + '\'' +
                ", monitoring_events='" + monitoring_events + '\'' +
                ", broadcast_events='" + broadcast_events + '\'' +
                ", work_untis_name2='" + work_untis_name2 + '\'' +
                ", tran_id2='" + tran_id2 + '\'' +
                ", sending_broadcast_events='" + sending_broadcast_events + '\'' +
                ", remark2='" + remark2 + '\'' +
                ", event='" + event + '\'' +
                ", data=" + data +
                '}';
    }
}

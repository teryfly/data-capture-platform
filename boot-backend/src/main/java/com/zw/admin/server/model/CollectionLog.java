package com.zw.admin.server.model;

import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * <p>
 * </p>
 *
 * @author lanxuyu123
 * @since 2018-08-16
 */
@TableName("rcloud_collection.tb_collectionlog")
public class CollectionLog extends Model<CollectionLog> {

    private static final long serialVersionUID = 1L;
    @TableId("id")
    private String id;
    @TableField("task_id")
    private String task_id;
    @TableField("task_name")
    private String task_name;
    @TableField("tran_id")
    private String tran_id;
    /**
     * 开始时间
     */
    @TableField("begin_time")
    private Date begin_time;
    /**
     * 结束时间
     */
    @TableField("end_time")
    private Date end_time;
    /**
     * 1(执行中，start)，2（执行失败，stop）,3（执行成功，end）
     */
    private String status;
    /**
     * 0失败(stop)，1成功(end)
     */
    private String success;
    /**
     * 执行时间
     */
    @TableField("excute_time")
    private Long excute_time;

    @TableField("condition")
    private String condition;//执行情况

    @TableField("remark")
    private String remark;//备注

    @Override
    protected Serializable pkVal() {
        return this.id;
    }

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

    public String getTask_name() {
        return task_name;
    }

    public void setTask_name(String task_name) {
        this.task_name = task_name;
    }

    public String getTran_id() {
        return tran_id;
    }

    public void setTran_id(String tran_id) {
        this.tran_id = tran_id;
    }

    public Date getBegin_time() {
        return begin_time;
    }

    public void setBegin_time(Date begin_time) {
        this.begin_time = begin_time;
    }

    public Date getEnd_time() {
        return end_time;
    }

    public void setEnd_time(Date end_time) {
        this.end_time = end_time;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSuccess() {
        return success;
    }

    public void setSuccess(String success) {
        this.success = success;
    }

    public Long getExcute_time() {
        return excute_time;
    }

    public void setExcute_time(Long excute_time) {
        this.excute_time = excute_time;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Override
    public String toString() {
        return "CollectionLog{" +
                "id='" + id + '\'' +
                ", task_id='" + task_id + '\'' +
                ", task_name='" + task_name + '\'' +
                ", tran_id='" + tran_id + '\'' +
                ", begin_time=" + begin_time +
                ", end_time=" + end_time +
                ", status=" + status +
                ", success=" + success +
                ", excute_time=" + excute_time +
                ", condition='" + condition + '\'' +
                ", remark='" + remark + '\'' +
                '}';
    }
}

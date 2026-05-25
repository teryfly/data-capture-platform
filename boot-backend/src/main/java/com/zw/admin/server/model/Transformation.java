package com.zw.admin.server.model;

import java.util.Date;

public class Transformation {
    private Long ID_TRANSFORMATION;

    private Integer ID_DIRECTORY;

    private String NAME;

    private String TRANS_VERSION;

    private Integer TRANS_STATUS;

    private Integer ID_STEP_READ;

    private Integer ID_STEP_WRITE;

    private Integer ID_STEP_INPUT;

    private Integer ID_STEP_OUTPUT;

    private Integer ID_STEP_UPDATE;

    private Integer ID_DATABASE_LOG;

    private String TABLE_NAME_LOG;

    private Boolean USE_BATCHID;

    private Boolean USE_LOGFIELD;

    private Integer ID_DATABASE_MAXDATE;

    private String TABLE_NAME_MAXDATE;

    private String FIELD_NAME_MAXDATE;

    private Double OFFSET_MAXDATE;

    private Double DIFF_MAXDATE;

    private String CREATED_USER;

    private Date CREATED_DATE;

    private String MODIFIED_USER;

    private Date MODIFIED_DATE;

    private Integer SIZE_ROWSET;

    private String DESCRIPTION;

    private String EXTENDED_DESCRIPTION;

    public String getDESCRIPTION() {
        return DESCRIPTION;
    }

    public void setDESCRIPTION(String DESCRIPTION) {
        this.DESCRIPTION = DESCRIPTION == null ? null : DESCRIPTION.trim();
    }

    public String getEXTENDED_DESCRIPTION() {
        return EXTENDED_DESCRIPTION;
    }

    public void setEXTENDED_DESCRIPTION(String EXTENDED_DESCRIPTION) {
        this.EXTENDED_DESCRIPTION = EXTENDED_DESCRIPTION == null ? null : EXTENDED_DESCRIPTION.trim();
    }

    public Long getID_TRANSFORMATION() {
        return ID_TRANSFORMATION;
    }

    public void setID_TRANSFORMATION(Long ID_TRANSFORMATION) {
        this.ID_TRANSFORMATION = ID_TRANSFORMATION;
    }

    public Integer getID_DIRECTORY() {
        return ID_DIRECTORY;
    }

    public void setID_DIRECTORY(Integer ID_DIRECTORY) {
        this.ID_DIRECTORY = ID_DIRECTORY;
    }

    public String getNAME() {
        return NAME;
    }

    public void setNAME(String NAME) {
        this.NAME = NAME == null ? null : NAME.trim();
    }

    public String getTRANS_VERSION() {
        return TRANS_VERSION;
    }

    public void setTRANS_VERSION(String TRANS_VERSION) {
        this.TRANS_VERSION = TRANS_VERSION == null ? null : TRANS_VERSION.trim();
    }

    public Integer getTRANS_STATUS() {
        return TRANS_STATUS;
    }

    public void setTRANS_STATUS(Integer TRANS_STATUS) {
        this.TRANS_STATUS = TRANS_STATUS;
    }

    public Integer getID_STEP_READ() {
        return ID_STEP_READ;
    }

    public void setID_STEP_READ(Integer ID_STEP_READ) {
        this.ID_STEP_READ = ID_STEP_READ;
    }

    public Integer getID_STEP_WRITE() {
        return ID_STEP_WRITE;
    }

    public void setID_STEP_WRITE(Integer ID_STEP_WRITE) {
        this.ID_STEP_WRITE = ID_STEP_WRITE;
    }

    public Integer getID_STEP_INPUT() {
        return ID_STEP_INPUT;
    }

    public void setID_STEP_INPUT(Integer ID_STEP_INPUT) {
        this.ID_STEP_INPUT = ID_STEP_INPUT;
    }

    public Integer getID_STEP_OUTPUT() {
        return ID_STEP_OUTPUT;
    }

    public void setID_STEP_OUTPUT(Integer ID_STEP_OUTPUT) {
        this.ID_STEP_OUTPUT = ID_STEP_OUTPUT;
    }

    public Integer getID_STEP_UPDATE() {
        return ID_STEP_UPDATE;
    }

    public void setID_STEP_UPDATE(Integer ID_STEP_UPDATE) {
        this.ID_STEP_UPDATE = ID_STEP_UPDATE;
    }

    public Integer getID_DATABASE_LOG() {
        return ID_DATABASE_LOG;
    }

    public void setID_DATABASE_LOG(Integer ID_DATABASE_LOG) {
        this.ID_DATABASE_LOG = ID_DATABASE_LOG;
    }

    public String getTABLE_NAME_LOG() {
        return TABLE_NAME_LOG;
    }

    public void setTABLE_NAME_LOG(String TABLE_NAME_LOG) {
        this.TABLE_NAME_LOG = TABLE_NAME_LOG == null ? null : TABLE_NAME_LOG.trim();
    }

    public Boolean getUSE_BATCHID() {
        return USE_BATCHID;
    }

    public void setUSE_BATCHID(Boolean USE_BATCHID) {
        this.USE_BATCHID = USE_BATCHID;
    }

    public Boolean getUSE_LOGFIELD() {
        return USE_LOGFIELD;
    }

    public void setUSE_LOGFIELD(Boolean USE_LOGFIELD) {
        this.USE_LOGFIELD = USE_LOGFIELD;
    }

    public Integer getID_DATABASE_MAXDATE() {
        return ID_DATABASE_MAXDATE;
    }

    public void setID_DATABASE_MAXDATE(Integer ID_DATABASE_MAXDATE) {
        this.ID_DATABASE_MAXDATE = ID_DATABASE_MAXDATE;
    }

    public String getTABLE_NAME_MAXDATE() {
        return TABLE_NAME_MAXDATE;
    }

    public void setTABLE_NAME_MAXDATE(String TABLE_NAME_MAXDATE) {
        this.TABLE_NAME_MAXDATE = TABLE_NAME_MAXDATE == null ? null : TABLE_NAME_MAXDATE.trim();
    }

    public String getFIELD_NAME_MAXDATE() {
        return FIELD_NAME_MAXDATE;
    }

    public void setFIELD_NAME_MAXDATE(String FIELD_NAME_MAXDATE) {
        this.FIELD_NAME_MAXDATE = FIELD_NAME_MAXDATE == null ? null : FIELD_NAME_MAXDATE.trim();
    }

    public Double getOFFSET_MAXDATE() {
        return OFFSET_MAXDATE;
    }

    public void setOFFSET_MAXDATE(Double OFFSET_MAXDATE) {
        this.OFFSET_MAXDATE = OFFSET_MAXDATE;
    }

    public Double getDIFF_MAXDATE() {
        return DIFF_MAXDATE;
    }

    public void setDIFF_MAXDATE(Double DIFF_MAXDATE) {
        this.DIFF_MAXDATE = DIFF_MAXDATE;
    }

    public String getCREATED_USER() {
        return CREATED_USER;
    }

    public void setCREATED_USER(String CREATED_USER) {
        this.CREATED_USER = CREATED_USER == null ? null : CREATED_USER.trim();
    }

    public Date getCREATED_DATE() {
        return CREATED_DATE;
    }

    public void setCREATED_DATE(Date CREATED_DATE) {
        this.CREATED_DATE = CREATED_DATE;
    }

    public String getMODIFIED_USER() {
        return MODIFIED_USER;
    }

    public void setMODIFIED_USER(String MODIFIED_USER) {
        this.MODIFIED_USER = MODIFIED_USER == null ? null : MODIFIED_USER.trim();
    }

    public Date getMODIFIED_DATE() {
        return MODIFIED_DATE;
    }

    public void setMODIFIED_DATE(Date MODIFIED_DATE) {
        this.MODIFIED_DATE = MODIFIED_DATE;
    }

    public Integer getSIZE_ROWSET() {
        return SIZE_ROWSET;
    }

    public void setSIZE_ROWSET(Integer SIZE_ROWSET) {
        this.SIZE_ROWSET = SIZE_ROWSET;
    }
}
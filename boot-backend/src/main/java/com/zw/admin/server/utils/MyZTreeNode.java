package com.zw.admin.server.utils;

/**
 * 
 * jquery ztree 插件的节点
 * @date 2017年2月17日 下午8:25:14
 */
public class MyZTreeNode {
	private String uniqeId;		//主键的唯一id

	public String getUniqeId() {
		return uniqeId;
	}

	public void setUniqeId(String uniqeId) {
		this.uniqeId = uniqeId;
	}

	private String id;	//节点id
	
	private String pId;//父节点id
	
	private String name;//节点名称
	
	private Boolean open;//是否打开节点
	
	private Boolean checked;//是否被选中

	private boolean chkDisabled;//是否禁用选中

	public boolean isChkDisabled() {
		return chkDisabled;
	}

	public void setChkDisabled(boolean chkDisabled) {
		this.chkDisabled = chkDisabled;
	}



    private String text ;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getpId() {
		return pId;
	}

	public void setpId(String pId) {
		this.pId = pId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Boolean getOpen() {
		return open;
	}

	public void setOpen(Boolean open) {
		this.open = open;
	}

	public Boolean getIsOpen() {
		return open;
	}

	public void setIsOpen(Boolean open) {
		this.open = open;
	}

	public Boolean getChecked() {
		return checked;
	}

	public void setChecked(Boolean checked) {
		this.checked = checked;
	}
	
	public static MyZTreeNode createParent(){
		MyZTreeNode zTreeNode = new MyZTreeNode();
		zTreeNode.setChecked(true);
		zTreeNode.setId("0");
		zTreeNode.setName("顶级");
		zTreeNode.setOpen(true);
		zTreeNode.setpId("0");
		return zTreeNode;
	}

    @Override
    public String toString() {
        return "ZTreeNode{" +
                "id=" + id +
                ", pId=" + pId +
                ", name='" + name + '\'' +
                ", open=" + open +
                ", checked=" + checked +
                ", text='" + text + '\'' +
                '}';
    }
}

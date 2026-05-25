package com.zw.admin.server.utils;

/**
 * 
 * jquery ztree 插件的节点
 * @date 2017年2月17日 下午8:25:14
 */
public class ZTreeNode {
	private String uniqeId;		//主键的唯一id

	private String id;	//节点id
	
	private String pId;//父节点id
	
	private String name;//节点名称

    private String title;
	
	private Boolean open;//是否打开节点
	
	private Boolean checked;//是否被选中

	private boolean chkDisabled;//是否禁用选中

	private String nodeType;//节点类型，1=文件夹，2=叶节点

	private String treeType;//树类型，1=厂商,2=机构

	private String nodeCode;

	private boolean nocheck;

    private String text;

    private String icon;

	public String getUniqeId() {
		return uniqeId;
	}

	public void setUniqeId(String uniqeId) {
		this.uniqeId = uniqeId;
	}

	public boolean isChkDisabled() {
		return chkDisabled;
	}

	public void setChkDisabled(boolean chkDisabled) {
		this.chkDisabled = chkDisabled;
	}

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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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
	
	public boolean getNocheck() {
		return nocheck;
	}

	public void setNocheck(boolean nocheck) {
		this.nocheck = nocheck;
	}

    public boolean isNocheck() {
        return nocheck;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

	public String getNodeType() {
		return nodeType;
	}

	public void setNodeType(String nodeType) {
		this.nodeType = nodeType;
	}

	public String getTreeType() {
		return treeType;
	}

	public void setTreeType(String treeType) {
		this.treeType = treeType;
	}

	public String getNodeCode() {
		return nodeCode;
	}

	public void setNodeCode(String nodeCode) {
		this.nodeCode = nodeCode;
	}

	public static ZTreeNode createParent(){
		ZTreeNode zTreeNode = new ZTreeNode();
		zTreeNode.setChecked(true);
		zTreeNode.setId("0");
		zTreeNode.setName("顶级");
		zTreeNode.setTitle("DJ");
		zTreeNode.setOpen(true);
		zTreeNode.setpId("0");
		zTreeNode.setText("0");
		zTreeNode.setNocheck(true);
		return zTreeNode;
	}

	@Override
	public String toString() {
		return "ZTreeNode{" +
				"uniqeId='" + uniqeId + '\'' +
				", id='" + id + '\'' +
				", pId='" + pId + '\'' +
				", name='" + name + '\'' +
				", title='" + title + '\'' +
				", open=" + open +
				", checked=" + checked +
				", chkDisabled=" + chkDisabled +
				", nodeType='" + nodeType + '\'' +
				", treeType='" + treeType + '\'' +
				", nodeCode='" + nodeCode + '\'' +
				", nocheck=" + nocheck +
				", text='" + text + '\'' +
				", icon='" + icon + '\'' +
				'}';
	}
}

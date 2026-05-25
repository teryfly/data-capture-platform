package com.zw.admin.server.dao;

import com.zw.admin.server.model.Permission;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface PermissionDao {

	@Select("select * from VzDataQuality.dbo.sys_permission t order by t.sort")
	List<Permission> listAll();

	@Select("select * from VzDataQuality.dbo.sys_permission t where t.type = 1 order by t.sort")
	List<Permission> listParents();

	@Select("select distinct p.* from VzDataQuality.dbo.sys_permission p inner join VzDataQuality.dbo.sys_role_permission rp on p.id = rp.permissionId inner join VzDataQuality.dbo.sys_role_user ru on ru.roleId = rp.roleId where ru.userId = #{userId} order by p.sort")
	List<Permission> listByUserId(Long userId);

	@Select("select p.* from VzDataQuality.dbo.sys_permission p inner join VzDataQuality.dbo.sys_role_permission rp on p.id = rp.permissionId where rp.roleId = #{roleId} order by p.sort")
	List<Permission> listByRoleId(Long roleId);

	@Select("select * from VzDataQuality.dbo.sys_permission t where t.id = #{id}")
	Permission getById(Long id);

	@Insert("insert into VzDataQuality.dbo.sys_permission(parentId, name, css, href, type, permission, sort) values(#{parentId}, #{name}, #{css}, #{href}, #{type}, #{permission}, #{sort})")
	int save(Permission permission);

	@Update("update VzDataQuality.dbo.sys_permission set parentId = #{parentId}, name = #{name}, css = #{css}, href = #{href}, type = #{type}, permission = #{permission}, sort = #{sort} where id = #{id}")
	int update(Permission permission);

	@Delete("delete from VzDataQuality.dbo.sys_permission where id = #{id}")
	int delete(Long id);
	
	@Delete("delete from VzDataQuality.dbo.sys_permission where parentId = #{id}")
	int deleteByParentId(Long id);

	@Delete("delete from VzDataQuality.dbo.sys_role_permission where permissionId = #{permissionId}")
	int deleteRolePermission(Long permissionId);
}

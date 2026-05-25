package com.zw.admin.server.dao;

import com.zw.admin.server.model.Role;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

@Mapper
public interface RoleDao {

	@Options(useGeneratedKeys = true, keyProperty = "id")
	@Insert("insert into VzDataQuality.dbo.sys_role(name, description, createTime, updateTime) values(#{name}, #{description}, getdate(),getdate())")
	int save(Role role);

	int count(@Param("params") Map<String, Object> params);

	List<Role> list(@Param("params") Map<String, Object> params, @Param("offset") Integer offset,
                    @Param("limit") Integer limit);

	@Select("select * from VzDataQuality.dbo.sys_role t where t.id = #{id}")
    Role getById(Long id);

	@Select("select * from VzDataQuality.dbo.sys_role t where t.name = #{name}")
    Role getRole(String name);

	@Update("update VzDataQuality.dbo.sys_role set name = #{name}, description = #{description}, updateTime = getdate() where id = #{id}")
	int update(Role role);

	@Select("select * from VzDataQuality.dbo.sys_role r inner join VzDataQuality.dbo.sys_role_user ru on r.id = ru.roleId where ru.userId = #{userId}")
	List<Role> listByUserId(Long userId);

	@Delete("delete from VzDataQuality.dbo.sys_role_permission where roleId = #{roleId}")
	int deleteRolePermission(Long roleId);

	int saveRolePermission(@Param("roleId") Long roleId, @Param("permissionIds") List<Long> permissionIds);

	@Delete("delete from VzDataQuality.dbo.sys_role where id = #{id}")
	int delete(Long id);
	
	@Delete("delete from VzDataQuality.dbo.sys_role_user where roleId = #{roleId}")
	int deleteRoleUser(Long roleId);
}

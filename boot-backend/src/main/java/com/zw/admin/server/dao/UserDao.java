package com.zw.admin.server.dao;

import com.zw.admin.server.model.User;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserDao {

	@Options(useGeneratedKeys = true, keyProperty = "id")
	@Insert("insert into VzDataQuality.dbo.sys_user(username, password, salt, nickname, headImgUrl, phone, telephone, email, birthday, sex, status, createTime, updateTime) values(#{username}, #{password}, #{salt}, #{nickname}, #{headImgUrl}, #{phone}, #{telephone}, #{email}, #{birthday}, #{sex}, #{status}, getdate(), getdate())")
	int save(User user);

	@Select("select * from VzDataQuality.dbo.sys_user t where t.id = #{id}")
	User getById(Long id);

	@Select("select * from VzDataQuality.dbo.sys_user t where t.username = #{username}")
	User getUser(String username);

	@Update("update VzDataQuality.dbo.sys_user set password = #{password} where id = #{id}")
	int changePassword(@Param("id") Long id, @Param("password") String password);

	Integer count(@Param("params") Map<String, Object> params);

	List<User> list(@Param("params") Map<String, Object> params, @Param("offset") Integer offset,
                    @Param("limit") Integer limit);

	@Delete("delete from VzDataQuality.dbo.sys_role_user where userId = #{userId}")
	int deleteUserRole(Long userId);

	int saveUserRoles(@Param("userId") Long userId, @Param("roleIds") List<Long> roleIds);

	int update(User user);
}

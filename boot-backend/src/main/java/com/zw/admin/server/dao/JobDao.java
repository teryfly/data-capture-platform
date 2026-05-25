package com.zw.admin.server.dao;

import com.zw.admin.server.model.JobModel;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

@Mapper
public interface JobDao {

	@Options(useGeneratedKeys = true, keyProperty = "id")
	@Insert("insert into VzDataQuality.dbo.t_job(jobName, description, cron, springBeanName, methodName, isSysJob, status, createTime, updateTime) values(#{jobName}, #{description}, #{cron}, #{springBeanName}, #{methodName}, #{isSysJob}, 1, getdate(), getdate())")
	int save(JobModel jobModel);

	@Select("select * from VzDataQuality.dbo.t_job t where t.id = #{id}")
    JobModel getById(Long id);

	@Select("select * from VzDataQuality.dbo.t_job t where t.jobName = #{jobName}")
    JobModel getByName(String jobName);

	int update(JobModel jobModel);

	int count(@Param("params") Map<String, Object> params);

	List<JobModel> list(@Param("params") Map<String, Object> params, @Param("offset") Integer offset,
                        @Param("limit") Integer limit);
}

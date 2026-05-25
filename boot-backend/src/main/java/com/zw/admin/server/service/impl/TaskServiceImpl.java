package com.zw.admin.server.service.impl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.zw.admin.server.dao.TaskMapper;
import com.zw.admin.server.model.Task;
import com.zw.admin.server.model.Transformation;
import com.zw.admin.server.service.ITaskService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 *
 * @author: 徐佳飞
 * @date: 2018/7/12 10:07
 */
@Service
public class TaskServiceImpl extends ServiceImpl<TaskMapper, Task> implements ITaskService {
    @Override
    public List<Task> selectTaskMenu() {
        return this.baseMapper.selectTaskMenu();
    }

    @Override
    public List<Task> selectTaskChildren() {
        return this.baseMapper.selectTaskChildren();
    }

    @Override
    public Task selectTaskById(String uniqe_id) {
        return this.baseMapper.selectTaskById(uniqe_id);
    }

    @Override
    public boolean updateTaskById(Task task) {
        return this.baseMapper.updateTaskById(task);
    }

    @Override
    public boolean deleteByIdPretend(String unique_id) {
        return this.baseMapper.deleteByIdPretend(unique_id);
    }

    @Override
    public boolean insertTask(Task task) {
        return this.baseMapper.insertTask(task);
    }

    @Override
    public List<Transformation> selectTransList() {
        return this.baseMapper.selectTransList();
    }

    @Override
    public String selectNameByTranId(String tran_id) {
        return this.baseMapper.selectNameByTranId(tran_id);
    }

    @Override
    public List<Task> selectTreeTask(String name) {
        Map<String, Object> map = new HashMap<>();
        map.put("name", name);
        return this.baseMapper.selectTreeTask(map);
    }

    @Override
    public List<Task> selectChildTask(String id) {
        return this.baseMapper.selectChildTask(id);
    }

    @Override
    public Task selectTaskByNameAndPid(String pid, String hdr_code, String old_name) {
        Map<String, Object> map = new HashMap<>();
        map.put("pid", pid);
        map.put("hdr_code", hdr_code);
        map.put("old_name", old_name);
        return this.baseMapper.selectTaskByNameAndPid(map);
    }

    @Override
    public boolean updateBatchTask(List<Task> tasks) {
        boolean tag = false;
        if (this.baseMapper.updateBatchTask(tasks) > 0) {
            tag = true;
        }
        return tag;
    }

    @Override
    public Map<String, Object> selectDataBase(String id) {
        return this.baseMapper.selectDataBase(id);
    }

    @Override
    public Integer selectSerialNum(String pid) {
        return this.baseMapper.selectSerialNum(pid);
    }

    @Override
    public List<Map<String, Object>> selectTaskPidList(String type) {
        List<Map<String, Object>> maps = new ArrayList<>();
        Map<String, Object> map = new HashMap<>();
        //如果操作的节点是分类只能查询出分类作为他的父节点
        if ("1".equals(type)) {
            type = "1";
        } else if ("2".equals(type)) {//如果操作的节点是库只能查询出分类作为他的父节点
            type = "1";
        } else if ("3".equals(type)) {//如果操作的节点是表只能查询出库作为他的父节点
            type = "2";
        }
        map.put("type", type);
        maps = this.baseMapper.selectTaskPidList(map);
        return maps;
    }
}

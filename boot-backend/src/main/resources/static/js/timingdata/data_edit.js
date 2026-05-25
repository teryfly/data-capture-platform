var TaskDep = {
    taskInfoData: {},
    validateFields: {}
};
/**
 * 清除数据
 */
TaskDep.clearData = function () {
    this.taskInfoData = {};
};

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
TaskDep.set = function (key, val) {
    this.taskInfoData[key] = (typeof value == "undefined") ? $("#" + key).val() : value;
    return this;
};

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
TaskDep.get = function (key) {
    return $("#" + key).val();
};

/**
 * 关闭此对话框
 */
TaskDep.close = function () {
    parent.layer.close(parent.TaskMag.layerIndex);
};

/**
 * 收集数据
 */
TaskDep.collectData = function () {
    this.set('id').set('work_id').set('status');
};

/**
 * 验证数据是否为空
 */
TaskDep.validate = function () {
    //$('#taskForm').data("bootstrapValidator").resetForm();
    $('#taskForm').bootstrapValidator('validate');
    return $("#taskForm").data('bootstrapValidator').isValid();
};

/**
 * 关闭此对话框
 */
TaskDep.close = function () {
    parent.layer.close(parent.TimingData.layerIndex);
};

TaskDep.updateSubmit = function () {
    this.collectData();
    if (!this.validate()) {
        return;
    }
    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/timingData/updateTaskDep", function (data) {
        Feng.success("修改成功!");
        TaskDep.close();
        parent.TimingData.search();
    }, function (data) {
        Feng.error("修改失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.taskInfoData);
    ajax.start();
};

$(function () {
    var id = parent.TimingData.timingDataId;
    $("#id").val(id);
    Feng.initValidator("taskForm", TaskDep.validateFields);
    Create.createSelectTaskDepEdit({
        id: "work_id",
        placeholder: "请选择任务",
        max: "1",
        min: "1",
        varId: id,
        multiple: false,
        value: parent.TimingData.workId,
        formId: "taskForm"
    });
});


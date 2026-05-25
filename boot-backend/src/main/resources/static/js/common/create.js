var Create = {
    createThridParty: function (o) {
        if (tools.isn(o.id)) {
            alert("下拉列表id为空");
        }
        if (tools.isn(o.placeholder)) {
            o.placeholder = "";
        }
        if (tools.isn(o.max)) {
            o.max = 1;
        }
        if (tools.isn(o.min)) {
            o.min = 0;
        }
        if (tools.isn(o.multiple)) {
            o.multiple = false;
        }

        $.ajax({
            type: 'POST',
            url: Feng.ctxPath + "/timingData/thridPartyList",
            dataType: 'json',
            success: function (data) {
                $.each(data, function () {
                    $("#" + o.id).append('<option value="' + this.SysId + '">' + this.ThirdPartyName + '</option>');
                })
                $("#" + o.id).select2({
                    placeholder: o.placeholder,
                    language: "zh-CN",//汉化
                    multiple: o.multiple,
                    tags: false,
                });
                if (o.value != "" && o.value != null) {
                    $("#" + o.id).val(o.value).trigger("change");
                }
                if (o.formId != "" && o.formId != null) {
                    $("#" + o.formId).data("bootstrapValidator").resetForm();
                }
            }
        });
    },
    createTransformation: function (o) {
        if (tools.isn(o.id)) {
            alert("下拉列表id为空");
        }
        if (tools.isn(o.placeholder)) {
            o.placeholder = "";
        }
        if (tools.isn(o.max)) {
            o.max = 1;
        }
        if (tools.isn(o.min)) {
            o.min = 0;
        }
        if (tools.isn(o.multiple)) {
            o.multiple = false;
        }

        $.ajax({
            type: 'POST',
            url: Feng.ctxPath + "/timingData/transformation",
            dataType: 'json',
            success: function (data) {
                $.each(data, function () {
                    $("#" + o.id).append('<option value="' + this.ID_TRANSFORMATION + '">' + this.NAME + '</option>');
                })
                $("#" + o.id).select2({
                    placeholder: o.placeholder,
                    language: "zh-CN",//汉化
                    multiple: o.multiple,
                    tags: false,
                });
                if (o.value != "" && o.value != null) {
                    $("#" + o.id).val(o.value).trigger("change");
                }
                if (o.formId != "" && o.formId != null) {
                    $("#" + o.formId).data("bootstrapValidator").resetForm();
                }
            }
        });
    },
    createEvent: function (o) {
        if (tools.isn(o.id)) {
            alert("下拉列表id为空");
        }
        if (tools.isn(o.placeholder)) {
            o.placeholder = "";
        }
        if (tools.isn(o.max)) {
            o.max = 1;
        }
        if (tools.isn(o.min)) {
            o.min = 0;
        }
        if (tools.isn(o.multiple)) {
            o.multiple = false;
        }

        $.ajax({
            type: 'POST',
            data: {type: o.type},
            async: false,
            url: Feng.ctxPath + "/taskMag/selectEventList",
            dataType: 'json',
            success: function (data) {
                $.each(data, function () {
                    $("#" + o.id).append('<option value="' + this.EventId + '">' + this.EventCN + '</option>');
                })
                $("#" + o.id).select2({
                    placeholder: o.placeholder,
                    language: "zh-CN",//汉化
                    multiple: o.multiple,
                    tags: false,
                });
                if (o.value != "" && o.value != null) {
                    $("#" + o.id).val(o.value).trigger("change");
                }
                if (o.formId != "" && o.formId != null) {
                    $("#" + o.formId).data("bootstrapValidator").resetForm();
                }
            }
        });
    },
    createSelectTaskDepEdit: function (o) {
        if (tools.isn(o.id)) {
            alert("下拉列表id为空");
        }
        if (tools.isn(o.placeholder)) {
            o.placeholder = "";
        }
        if (tools.isn(o.max)) {
            o.max = 1;
        }
        if (tools.isn(o.min)) {
            o.min = 0;
        }
        if (tools.isn(o.multiple)) {
            o.multiple = false;
        }

        $.ajax({
            type: 'POST',
            data: {id: o.varId},
            async: false,
            url: Feng.ctxPath + "/timingData/selectTaskDepEdit",
            dataType: 'json',
            success: function (data) {
                $.each(data, function () {
                    $("#" + o.id).append('<option value="' + this.id + '">' + this.work_untis_name + '</option>');
                })
                $("#" + o.id).select2({
                    placeholder: o.placeholder,
                    language: "zh-CN",//汉化
                    multiple: o.multiple,
                    tags: false,
                });
                if (o.value != "" && o.value != null) {
                    $("#" + o.id).val(o.value).trigger("change");
                }
                if (o.formId != "" && o.formId != null) {
                    $("#" + o.formId).data("bootstrapValidator").resetForm();
                }
            }
        });
    },
    createPid: function (o) {
        if (tools.isn(o.id)) {
            alert("下拉列表id为空");
        }
        if (tools.isn(o.placeholder)) {
            o.placeholder = "";
        }
        if (tools.isn(o.max)) {
            o.max = 1;
        }
        if (tools.isn(o.min)) {
            o.min = 0;
        }
        if (tools.isn(o.multiple)) {
            o.multiple = false;
        }

        $.ajax({
            type: 'POST',
            data: {type: o.vType},
            async: false,
            url: Feng.ctxPath + "/task/selectTaskPidList",
            dataType: 'json',
            success: function (data) {
                $("#" + o.id).empty();
                if (o.vType == 1) {
                    $("#" + o.id).append('<option value="0" selected>顶级</option>');
                }
                if (data != null || data != "") {
                    $.each(data, function () {
                        $("#" + o.id).append('<option value="' + this.id + '">' + this.hdr_name + '</option>');
                    });
                }
                $("#" + o.id).select2({
                    placeholder: o.placeholder,
                    language: "zh-CN",//汉化
                    multiple: o.multiple,
                    tags: false,
                });
                if (o.value != "" && o.value != null) {
                    $("#" + o.id).val(o.value).trigger("change");
                }
                if (o.formId != "" && o.formId != null) {
                    $("#" + o.formId).data("bootstrapValidator").resetForm();
                }
            }
        });
    },
}
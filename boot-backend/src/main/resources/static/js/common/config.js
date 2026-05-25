/**
 * 外部服务配置 - 从后端动态加载
 */
var ExternalConfig = {};

// 页面加载时获取配置
(function() {
    $.ajax({
        url: '/config',
        async: false,
        success: function(data) {
            ExternalConfig = data || {};
        },
        error: function() {
            console.warn('Failed to load external config, using defaults');
        }
    });
})();

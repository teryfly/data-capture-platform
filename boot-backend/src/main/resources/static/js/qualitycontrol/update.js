$(function() {
	var data = window.parent.QualityTable.seItem;
	for (var name in data) {
		var dataValue = data[name];
		console.log("====="+dataValue);
		try {
			if (dataValue.indexOf("div") > 0) {
				$("#" + name).val($(dataValue).text());
			} else {
				$("#" + name).val(dataValue);
			}
		} catch (e) {
			$("#" + name).val(dataValue);
		}			
	}
});

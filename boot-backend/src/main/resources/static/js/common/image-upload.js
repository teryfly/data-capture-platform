var ImageUpload={
	init:function(pathInputId,cvsId,folder,width,heigth){
		$.ajax({
	        type: "POST",
	        url: Feng.ctxPath+"/pmt/getImgUploadUrl",
	        cache: false,
	        dataType:"json",
	        success: function(data) {
	        	var imgUrl=data.imgUrl;
	        	ImageUpload.cvsId=cvsId;
	    		//获取上传按钮
	    	    var input = document.getElementById(cvsId+"ipt");
	    	    if (typeof FileReader === 'undefined') {
	    	        //result.innerHTML = "抱歉，你的浏览器不支持 FileReader";
	    	        input.setAttribute('disabled', 'disabled');
	    	    } else {
	    	    	$(cvsId+"ipt").change(function(){
	    	    		ImageUpload.readFile(cvsId);
	    	    	})
	    	    }
	    	    if(tools.isnn($("#"+pathInputId).val())){
	    	    	var cvs = document.getElementById(cvsId+"cvs");
	                //创建image对象
	                var imgObj = new Image();
	                imgObj.src = $("#"+pathInputId).val()+"?"+Math.random();
	                //待图片加载完后，将其显示在canvas上
	                imgObj.onload = function(){
	                        var ctx = cvs.getContext('2d');
	                        ctx.save();
	                        ctx.setTransform(1,0,0,1,0,0);
	                        ctx.clearRect(0,0,width,heigth);
	                        ctx.drawImage(this, 0, 0,width,heigth);//改变图片的大小到1024*768
	                        ctx.restore();
	                    }
	    	    }
	    	    $("#"+ cvsId+"ipt").change(function(){
	    	    	ImageUpload.setImg(pathInputId,this,imgUrl,folder,cvsId,width,heigth)
	    	    });
	        },
	        error: function(XMLHttpRequest, textStatus, errorThrown) {
	            tools.alert("获取图片上传地址失败，请检查网络后重试!",0);
	        }
	    });
		
	},
	setImg:function(pathInputId,obj,imgUrl,folder,cvsId,width,heigth){//用于进行图片上传，返回地址
	    var f=$(obj).val();
	    if(f == null || f ==undefined || f == ''){
	        return false;
	    }
	    if(!/\.(?:png|jpg|bmp|gif|PNG|JPG|BMP|GIF)$/.test(f))
	    {
	        tools.alert("类型必须是图片(.png|jpg|bmp|gif|PNG|JPG|BMP|GIF)",0);
	        $(obj).val('');
	        return false;
	    }
	    var data = new FormData();
	    $.each($(obj)[0].files,function(i,file){
	        data.append('upfile', file);
	    });
	    data.append('oldName', $("#"+pathInputId).val());
	    console.log(folder)
	    data.append('folder', folder);
	    $.ajax({
	        type: "POST",
	        url: imgUrl,
	        data: data,
	        cache: false,
	        contentType: false,    //不可缺
	        processData: false,    //不可缺
	        dataType:"json",
	        success: function(data) {
	            if(data.state=="SUCCESS"){
	            	var cvs = document.getElementById(cvsId+"cvs");
	                //创建image对象
	                var imgObj = new Image();
	                imgObj.src = data.url+"?"+Math.random();
	                //待图片加载完后，将其显示在canvas上
	                imgObj.onload = function(){
	                        var ctx = cvs.getContext('2d');
	                        ctx.save();
	                        ctx.setTransform(1,0,0,1,0,0);
	                        ctx.clearRect(0,0,width,heigth);
	                        //ctx.drawImage(this, 0, 0);//this即是imgObj,保持图片的原始大小：470*480
	                        ctx.drawImage(this, 0, 0,width,heigth);//改变图片的大小到1024*768
	                        ctx.restore();
	                    }
	                $("#"+pathInputId).val(data.url);//将地址存储好
                    if (pathInputId == "certificate") {
                        if ($("#"+pathInputId).val() != null && $("#"+pathInputId).val() != undefined) {
                            $("#cfcImg").val($("#" + pathInputId).val().split("/")[5]);
                        }
                    }
                }else{
	            	 tools.alert("上传失败",2);
	                $(obj).val('');
	            }
	        },
	        error: function(XMLHttpRequest, textStatus, errorThrown) {
	            tools.alert("上传失败，请检查网络后重试!",0);
	            $(obj).val('');
	        }
	    });
	},
	readFile:function(cvsId) {
	    var file = this.files[0]; //获取上传文件列表中第一个文件
	    if (!/image\/\w+/.test(file.type)) {
	        //图片文件的type值为image/png或image/jpg
	        alert("文件必须为图片！");
	        return false;
	    }
	    // console.log(file);
	    var reader = new FileReader(); //实例一个文件对象
	    reader.readAsDataURL(file); //把上传的文件转换成url
	    //当文件读取成功便可以调取上传的接口
	    reader.onload = function(e) {
	        var image = new Image();
	        // 设置src属性
	        image.src = e.target.result;
	        var max = 200;
	        // 绑定load事件处理器，加载完成后执行，避免同步问题
	        image.onload = function() {
	            // 获取 canvas DOM 对象
	            var canvas = document.getElementById(cvsId+"cvs");
	            // 如果高度超标 宽度等比例缩放 *=
	            /*if(image.height > max) {
	        image.width *= max / image.height;
	        image.height = max;
	    } */
	            // 获取 canvas的 2d 环境对象,
	            var ctx = canvas.getContext("2d");
	            // canvas清屏
	            ctx.clearRect(0, 0, canvas.width, canvas.height);
	        };
	    }
	},
}
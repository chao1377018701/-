$(function(){
    //展示商品
    function showProduct(){
		$.ajax({
			url: '/product/queryProductDetailList',
			type: 'get',
			data: {
				page: 1,
				pageSize: 20
			},
			success: function(res){
				// console.log(res);
				var html = template("productTpl", res);
				$('#productBox').html(html);
			}
		});
	}
	showProduct();

	//获取二级分类并展示在选择框中
	$.ajax({
		url:'/category/querySecondCategoryPaging',
		type:'get',
		data:{
			page:1,
			pageSize: 100
		},
		success:function(res){
			$('#secondBox').html(template("secondTpl", res));
		}
	});

	//实现图片上传
	var imageArray = [];
	$('#fileUpload').fileupload({
		dataType:'json',
		done:function(e,data){
			imageArray.push(data.result);
		}
	});

	//添加商品
	$('#addProduct').on('click',function(){
		var proName = $.trim($("[name='proName']").val());
		var oldPrice = $.trim($("[name='oldPrice']").val());
		var price = $.trim($("[name='price']").val());
		var proDesc = $.trim($("[name='proDesc']").val());
		var size = $.trim($("[name='size']").val());
		var num = $.trim($("[name='num']").val());
		var brandId = $.trim($("[name='brandId']").val());
		$.ajax({
			url:'/product/addProduct',
			type:'post',
			data:{
				proName: proName,
				oldPrice: oldPrice,
				price: price,
				proDesc: proDesc,
				size: size,
				num: num,
				brandId: brandId,
				statu: 1,
				pic: imageArray
			},
			success:function(res){
				if(res.success){
					showProduct();
					$('.close').click();
				}else{
					alert(res.message);	
				}
			}
		})
	})
})
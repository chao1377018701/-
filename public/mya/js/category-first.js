$(function(){
    var page=1;
    var pageSize = 10;
    var totalPage = 0;
    function getData(){
        $.ajax({
            url:'/category/queryTopCategoryPaging',
            type:'get',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(res){
                totalPage=Math.ceil(res.total / pageSize);//总页数
                $('#categoryFirstBox').html(template("categoryFirstTpl", res));
            }
        })
    }
    getData();
    $('#next').on('click',function(){
		page++;
		if(page > totalPage){
			page = totalPage;
			alert('已经是最后一页了');
			return;
		}
		getData();
	});
    $('#prev').on('click',function(){
        page--;
        if(page<1){
            page=1;
            alert('这已经是第一页了')
            return;
        }
        getData();
    })

    //添加一级分类
    $('#save').on('click',function(){
        var categoryFirstName = $.trim($("[name='categoryFirstName']").val());
        if(!categoryFirstName){
            alert('请输入以及分类名称');
            return;
        }
        $.ajax({
            url:'/category/addTopCategory',
            type:'post',
            data:{
                categoryName: categoryFirstName
            },
            success:function(res){
                if(res.success){
                    location.reload();
                }
            }
        })
    })
})
$(function () {
    var page = 1;
    var pageSize = 10;
    var totalPage = 0;
    // 封装函数获取数据渲染在页面
    function getData() {
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            type: 'get',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (res) {
                totalPage = Math.ceil(res.total / pageSize);// 总页数
                var html = template("categorySecondTpl", res);
                $('#categorySecondBox').html(html);
            }
        });
    };
    getData();
    $('#nextBtn').on('click',function(){
        page++;
        if(page>totalPage){
            page = totalPage;
            alert ('这已经是最后一页了');
            return;  
        }
        getData();
    });
    $('#prevBtn').on('click',function(){
        page--;
        if(page<1){
            page=1;
            alert('这已经是第一页了');
            return;
        }
        getData();
    })


    // 二级分类添加
    //先获取一级分类的数据显示在选择框中
    $.ajax({
        url: '/category/queryTopCategoryPaging',
        type:'get',
        data:{
            page:1,
            pageSize:100
        },
        success:function(res){
            var html=template("categoryFirstTpl",res);
            $('#categoryFirstBox').html(html);
        }
    })
    //上传图片
    var previewImg = "";
    $('#fileUpload').fileupload({
        dataType:'json',
        done:function(e,data){
            // console.log(data.result.picAddr);
            //图片预览
            $('#preview').attr('src',data.result.picAddr);
            previewImg = data.result.picAddr;
        }
    })
    //二级分类添加的实现
    $('#save').on('click',function(){
        var categoryId = $.trim($("[name='categoryId']").val());
        var brandName = $.trim($("[name='brandName']").val());
        if (!brandName){
            alert('请输入商品品牌');
            return;
        }
        if(!previewImg){
            alert(请上传图片展示);
            return;
        }
        $.ajax({
            url: '/category/addSecondCategory',
   			type: 'post',
   			data: {
   				brandName: brandName,
   				categoryId: categoryId,
   				brandLogo: previewImg,
   				hot: 0
               },
               success:function(res){
                   if(res.success){
                        getData();
                        $('.close').click();
                   }
               }
        })
    })
})

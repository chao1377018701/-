$(function(){
    //实现底部点击可跳转,因为MUI默认阻止了默认行为
	mui('.footer').on('tap','a',function(){
		window.top.location.href=this.href;
    });
    
    var keyArr=[];
    $('#search-btn').on('click',function(){
        var keyword=$(this).siblings('input').val();
        if(keyword){
            keyArr.unshift(keyword);
            localStorage.setItem('keyArr',JSON.stringify(keyArr));
            location.href="search-result.html?keyword="+keyword;
        }
    }) 
    if(localStorage.getItem('keyArr')){
        keyArr=JSON.parse(localStorage.getItem('keyArr'));
        var  html=template('historyTpl',{result:keyArr});
        $('#history-box').html(html)
    }

    $('#clearBtn').on('click',function(){
		$('#history-box').html("");
		localStorage.removeItem("keyArr");
    });
    $('#search-btn').siblings('input').val('');
})
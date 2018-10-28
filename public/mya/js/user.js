$(function () {
    function reload() {
        $.ajax({
            url: '/user/queryUser',
            type: 'get',
            data: {
                page: 1,
                pageSize: 10
            },
            success: function (res) {
                // console.log(res);
                $('#userBox').html(template('userTpl',  res ))
            }
        });
    }
    reload();


    $('#userBox').on('click', '.edit-btn', function () {
        var id = $(this).data('id');
        var isDelete = parseInt($(this).attr('data-isDelete')) ? 0 : 1;
        $.ajax({
            url: '/user/updateUser',
            type: 'post',
            data: {
                id: id,
                isDelete: isDelete
            },
            success: function (res) {
                if (res.success) {
                    reload();
                }else {
                    if(res.error){
                        alert(res.message);
                    }
                }
            }
        })
    })

})
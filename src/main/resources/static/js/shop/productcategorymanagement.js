$(function() {
    var listUrl = '/o2o/shopadmin/getproductcategorylist';
    var addUrl = '/o2o/shopadmin/addproductcategories';
    var deleteUrl = '/o2o/shopadmin/removeproductcategory';
    getList();
    function getList() {
        $.getJSON(
                listUrl,
                function(data) {
                    if (data.success) {
                        var dataList = data.data;
                        // $('.category-wrap').html('');

                        var tempHtml = '<table class="ui celled striped table">' +
                            '<thead>' +
                            '<tr><th>Category</th>' +
                            '<th>Priority</th>' +
                            '<th>Operation</th>' +
                            '</tr></thead>' +
                            '<tbody>';

                        dataList.map(function(item, index) {
                                tempHtml += ''
                                    + '<tr>'
                                    + '<td>'
                                    + item.productCategoryName
                                    + '</td>'
                                    + '<td>'
                                    + item.priority
                                    + '</td>'
                                    + '<td><a href="/o2o/shopadmin/removeproductcategory" class="button delete" data-id="'
                                    + item.productCategoryId
                                    + '">delete</a></td>'
                                    + '</tr>';
                            });
                        tempHtml += '</tbody>'
                        $('.category-wrap').html(tempHtml);
                    }
                });
    }
    $('#new')
        .click(
            function() {
                var tempHtml = '<div class="row row-product-category temp">'
                    + '<div class="col-33"><input class="category-input category" type="text" placeholder="分类名"></div>'
                    + '<div class="col-33"><input class="category-input priority" type="number" placeholder="优先级"></div>'
                    + '<div class="col-33"><a href="#" class="button delete">删除</a></div>'
                    + '</div>';
                $('.category-wrap').append(tempHtml);
            });
    $('#submit').click(function() {
        var tempArr = $('.temp');
        var productCategoryList = [];
        tempArr.map(function(index, item) {
            var tempObj = {};
            tempObj.productCategoryName = $(item).find('.category').val();
            tempObj.priority = $(item).find('.priority').val();
            if (tempObj.productCategoryName && tempObj.priority) {
                productCategoryList.push(tempObj);
            }
        });
        $.ajax({
            url : addUrl,
            type : 'POST',
            data : JSON.stringify(productCategoryList),
            contentType : 'application/json',
            success : function(data) {
                if (data.success) {
                    alert('success！');
                    getList();
                } else {
                    alert('failure！');
                }
            }
        });
    });

    $('.category-wrap').on('click', '.row-product-category.temp .delete',
        function(e) {
            console.log($(this).parent().parent());
            $(this).parent().parent().remove();

        });
    $('.category-wrap').on('click', '.row-product-category.now .delete',
        function(e) {
            var target = e.currentTarget;
            var reply = confirm('do you want to delete it?');
            if (reply == true) {
                $.ajax({
                    url : deleteUrl,
                    type : 'POST',
                    data : {
                        productCategoryId : target.dataset.id
                    },
                    dataType : 'json',
                    success : function(data) {
                        if (data.success) {
                            alert('sucessfully deleted it！');
                            getList();
                        } else {
                            alert('cannot delete it！');
                        }
                    }
                });
            }

            // $.confirm('do you confirm to delete it?', function() {
            //     $.ajax({
            //         url : deleteUrl,
            //         type : 'POST',
            //         data : {
            //             productCategoryId : target.dataset.id
            //         },
            //         dataType : 'json',
            //         success : function(data) {
            //             if (data.success) {
            //                 $.toast('删除成功！');
            //                 getList();
            //             } else {
            //                 $.toast('删除失败！');
            //             }
            //         }
            //     });
            // });
        });
});
/**
 * Created by Administrator on 2016/2/5.
 */
$(window).on('load', function () {
    waterfall();
    var dataInt=new Array();
    $.ajax({
        type:"GET",
        url:"../package.json",
        dataType:"json",
        success:function(data){
            $.each(data.srcs,function(index,item){
                dataInt.push(item.src);
            });

        }
    });
    window.onresize=function(){
        waterfall();
    }
    $(window).on('scroll',function(){
        if(ckeckScrollSlide){
            $.each(dataInt,function(key,value){
                var item='<div class="box">'+
                    '<div class="pic">'+
                    '<img src="../'+value+'">'+
                    '</div>'+
                    '</div>'
                $('#main').append(item);
                waterfall();
            })
        }
    })
})
function waterfall(){
    var $boxs=$('#main>div');
    var w=$boxs.eq(0).outerWidth();
    var cols=Math.floor($(window).width()/w);
    $('#main').width(w*cols).css('margin','0 auto');
    var hArr=[];
    $boxs.each(function(index,value){
        var h=$boxs.eq(index).outerHeight();
        if(index<cols){
            hArr[index]=h;
        }else{
            var minH=Math.min.apply(null,hArr);
            var minHIndex= $.inArray(minH,hArr);
            $(value).css({
                'position':'absolute',
                'top':minH+'px',
                'left':+minHIndex*w+'px'
            })
            hArr[minHIndex]+=$boxs.eq(index).outerHeight();
        }
    })
}
function ckeckScrollSlide(){
    var $lastBox=$('#main>div').last();
    var lastBoxDis=$lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
    var scrollTop=$(window).scrollTop;
    var documentH=$(window).height();
    return (lastBoxDis<scrollTop+documentH)?true:false;
}
/**
 * Created by Administrator on 2016/2/4.
 */
window.onload=function(){
    var dataInt=new Array();
    waterfall('main','box');
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
        waterfall('main','box');
    }
    window.onscroll=function(){
        if(checkScrollSlide()){
            var oParent=document.getElementById('main');
            //将数据块渲染到当前页面
            for(var i=0;i<dataInt.length;i++){
                var oBox=document.createElement('div');
                oBox.className='box';
                oParent.appendChild(oBox);
                var oPic=document.createElement('div');
                oPic.className='pic';
                oBox.appendChild(oPic);
                var oImg=document.createElement('img');
                oImg.src="../"+dataInt[i];
                oPic.appendChild(oImg);
                waterfall('main','box');
            }
        }
    }
}
function waterfall(parent,box){
    //将main下的所有class为box的元素取出来
    var oParent=document.getElementById(parent);
    var oBoxs=getClass(oParent,box);
   //计算整个页面显示的列数（页面宽/box宽）
    var oBoxW=oBoxs[0].offsetWidth;
    var cols=Math.floor(document.documentElement.clientWidth/oBoxW);
    //设置main的宽度
    oParent.style.cssText='width:'+oBoxW*cols+'px;margin:0 auto';
    var hArr=[];
    for(var i=0;i<oBoxs.length;i++){
        if(i<cols){
            hArr.push(oBoxs[i].offsetHeight);
        }else{
            var minH=Math.min.apply(null,hArr);
            var index=getMinhIndex(hArr,minH);
            oBoxs[i].style.position='absolute';
            oBoxs[i].style.top=minH+'px';
           // oBoxs[i].style.left=oBoxW*index+'px';
            oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';
            hArr[index]+=oBoxs[i].offsetHeight;
        }
    }
}
//根据class获取元素
function getClass(parent,clsName){
   var boxArr=new Array(),//用来存储获取到的所有class为clsName的元素
    oElements=parent.getElementsByTagName('*');
    for(var i=0;i<oElements.length;i++){
        if(oElements[i].className==clsName){
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
}
function getMinhIndex(arr,val){
    for(var i in arr){
        if(arr[i]==val){
            return i;
        }
    }
}

//检测是否具备了加载数据块的条件
function checkScrollSlide(){
    var oParent=document.getElementById('main');
    var oBoxs=getClass(oParent,'box');
    var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
    var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
    var height=document.body.clientHeight||document.documentElement.clientHeight;
    return (lastBoxH<(scrollTop+height))?true:false;
}
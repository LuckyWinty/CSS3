//;(function(){
//    var clientX;
//    var clientY;
//    var body;
//    var wrap;
//    window.onload=function(){
//        body=document.getElementById("body");
//        wrap=document.getElementById("wrap");
//        updateBody();
//    }
//    window.onresize=function(){
//        updateBody();
//    };
//
//    function updateBody(){
//        updateClient();
//        body.style.width=clientX+'px';
//        body.style.height=clientY+'px';
//        console.log(clientY);
//        //wrap.style.top=(clientY-500)+'px';
//    }
//    function updateClient(){
//        clientX=document.documentElement.clientWidth|document.body.clientWidth;
//        clientY=document.documentElement.clientHeight|document.body.clientHeight;
//    }
//})()
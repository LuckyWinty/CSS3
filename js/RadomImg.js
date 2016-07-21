;(function($,window,document,undefined){
    var imgObj=function(el,opt){
        this.$element = el,
        this.defaults = {
            'width':'0',
            'height':'0',
            'left':'0',
            'top':'0',
            'src':''
        },
        this.options = $.extend({}, this.defaults, opt)
    }
    imgObj.prototype= {
        appendToPanel: function () {
            var img = document.createElement('img');
            var RealW = RadomNum(Number(this.options.width));
            var RealH = RadomNum(Number(this.options.height));
            var min=150;

            if (RealW < min) {
                img.style.width = min + 'px';
            } else {
                img.style.width = RealW+'px';
            }
            if (RealH < min) {
                img.style.height = min + 'px';
            } else {
                img.style.height = RealH+'px';
            }
            img.style.left = RadomNum(Number(this.options.left))+'px';
            img.style.top = RadomNum(Number(this.options.top))+'px';
            img.className = "pic";
            img.src = this.options.src;
            this.$element.append(img);
        }
    }
    //产生随机数（0~max）
    function RadomNum(max){
        return Math.floor(Math.random()*max);
    }
    $.fn.RadomShowPicture = function(options) {
        //创建imgObj的实体
        var Obj = new imgObj(this, options);
        //调用其方法
        return Obj.appendToPanel();
    }
})(jQuery,window,document)
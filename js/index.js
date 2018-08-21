window.onload =function () {
    search();
    banner();
    downTime();
};
var search = function () {
    /*1. 默认固定顶部， 背景透明*/
    var searBox = document.querySelector('.jd_search_box');
    var banner = document.querySelector('.jd_banner');
    var bannerHeight = banner.offsetHeight;

    window.onscroll = function() {
        var scrollTop = window.pageYOffset;
        // console.log('1:'+document.body.scrollTop);
        // console.log('2:'+window.pageYOffset);
        // console.log('3:'+document.documentElement.scrollTop);
         var opacity = 0;

         if(scrollTop < bannerHeight){
             /*2.当页面滚动 随着页面滚动距离变更透明度*/
             opacity = scrollTop / bannerHeight * 0.85
         } else {
             /*3.超过高度时 背景色不变*/
             opacity = 0.85
         }
         searBox.style.background = 'rgba(201,21,35,'+opacity+')'
     }
};

var banner = function () {

    /*轮播图容器*/
    var banner = document.querySelector('.jd_banner');
    /*屏幕宽度*/
    var bannerWidth = banner.offsetWidth;
    /*图片容器*/
    var imgBox = banner.querySelector('ul:first-child');
    /*点容器*/
    var pointBox = banner.querySelector('ul:last-child');
    /*点集合*/
    var points = pointBox.querySelectorAll('li');

    var addTransition = function () {
        imgBox.style.transition = 'all 0.2s';
        imgBox.style.webkitTransition = 'all 0.2s';
    };

    var removeTransition = function () {
        imgBox.style.transition = 'none';
        imgBox.style.webkitTransition = 'none';
    };

    var setTranslateX = function (x) {
        imgBox.style.transform = 'translateX(' + x + 'px)';
        imgBox.style.transform = 'webkitTranslateX(' + x + 'px)';
    };

    var index = 1;

    var timer = setInterval(function () {
        index ++ ;
        addTransition();
        setTranslateX(-index * bannerWidth);
    },2000);


    imgBox.addEventListener('transitionend',function () {
            if (index >= 9){
            index = 1;
                removeTransition();
                setTranslateX(-index * bannerWidth);
        } else if ( index <= 0 ){
                index = 8;
                removeTransition();
                setTranslateX(-index * bannerWidth);
            }
        setPoint();
    });

    var setPoint = function () {
        for (var i = 0; i<points.length; i++){
            var obj = points[i];
            obj.classList.remove('now');
        }
        points[index - 1].classList.add('now');
    };

    /*
    * 触摸选项
    * */

    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    imgBox.addEventListener('touchstart',function (e) {
         /*获取当前触屏起始点*/
        startX = e.touches[0].clientX;
        /*清楚定时器设置*/
        clearInterval(timer);
    });

     imgBox.addEventListener('touchmove',function (e) {
        /*获取触屏移动点*/
         var moveX = e.touches[0].clientX;
         /*获取触屏移动距离*/
         distanceX = moveX - startX;
         /*元素将要移动的定位 = 当前距离 + 手指移动的距离*/
         var translateX = -index * bannerWidth + distanceX;

         /*
         * 1. 清楚过渡效果
         * 2. 根据手指移动距离进行滑动
         * */
         removeTransition();
         setTranslateX(translateX);
        isMove = true;
     });

     imgBox.addEventListener('touchend',function (e) {
        if (isMove){
            if (Math.abs(distanceX) < bannerWidth / 3){
                addTransition();
                setTranslateX(-index * bannerWidth);
            } else {
                if (distanceX > 0) {
                    index --
                } else {
                    index ++
                }
                addTransition();
                setTranslateX(-index * bannerWidth);
            }
        }

     });
    /*加上定时器*/
    startX = 0;
    distanceX = 0;
    clearInterval(timer);
    timer = setInterval(function () {
        index++;
        addTransition();
        setTranslateX(-index * bannerWidth);
    },2000)
};

var downTime = function () {
    var spans = document.querySelectorAll('.sk_time span');
    var time = 4 * 60 *60;

    var timer = setInterval(function () {
        time --;
        var h  = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = Math.floor(time%60);
        spans[0].innerHTML = Math.floor(h/10);
        spans[1] .innerHTML = h%10;
        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;
        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;

        if (timer <= 0) {
            clearInterval(timer)
        }
    },1000);


};
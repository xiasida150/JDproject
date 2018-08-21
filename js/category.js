window.onload = function (){
    document.querySelector('.cy_main_left').addEventListener('touchmove',function (e) {
        e.preventDefault();
    });
    document.querySelector('.cy_main_right').addEventListener('touchmove',function (e) {
        e.preventDefault();
    });


    new IScroll(document.querySelector('.cy_main_left'),{
        scrollX:false,
        scrollY:true
    });
    new IScroll(document.querySelector('.cy_main_right'),{
        scrollX: false,
        scrollY: true
    })
};

function  startMove(node,cssObj,complete){
    clearInterval(node.timer);
    node.timer = setInterval(function (){
        var isEnd = true;//定时器清除条件
        for(var i in cssObj){//遍历所有的对象元素，进行操作。
            var iTarget = cssObj[i];//对象中属性名为i的属性值
            var iCur = null;
            if(i =='opacity'){
                iCur = parseInt(parseFloat(getStyle(node,'opacity'))*100);
            }else {
                iCur = parseInt(getStyle(node,i));
            }
            var speed = (iTarget-iCur)/8;
            speed = speed>0?Math.ceil(speed):Math.floor(speed);
            if(i=='opacity'){
                iCur +=speed;
                node.style.opacity = iCur/100;
                node.style.filter ='alpha(opacity='+iCur+')';
            }else {
                node.style[i] = iCur+speed+'px';
            }
            if(iCur !=iTarget){
                isEnd = false;
            }
            if(isEnd){
                clearInterval(node.timer);
                if(complete){
                    complete.call(node);
                }
            }
        }
    },30);
}

function  getStyle(node, cssStyle){
    return window.getComputedStyle(node)[cssStyle] ? window.getComputedStyle(node)[cssStyle] :Element.runtimeStyle(node)[cssStyle];
}

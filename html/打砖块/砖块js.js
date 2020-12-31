function randomColor(){
    let str = "rgba("+parseInt(Math.random()*255)+','+parseInt(Math.random()*255)+','+parseInt(Math.random()*255)+',1)';
    return str;
}

function  createBrick(n,tag){
    for(let i=0 ;i<n;i++){
        let node = document.createElement('div');
        node.style.backgroundColor = randomColor();
        tag.appendChild(node);
    }
}
function layoutBrick(aDivs){
    for(let i=0;i<aDivs.length;i++){
        aDivs[i].style.left = aDivs[i].offsetLeft +'px';
        aDivs[i].style.top = aDivs[i].offsetTop+'px';
    }
    for(let i=0;i<aDivs.length;i++){
        aDivs[i].style.position = 'absolute';
    }
}


function konck(node1,node2) {
    let l1 = node1.offsetLeft;
    let r1 = node1.offsetLeft + node1.offsetWidth;
    let t1 = node1.offsetTop;
    let b1 = node1.offsetTop + node1.offsetHeight;

    let l2 = node2.offsetLeft;
    let r2 = node2.offsetLeft + node2.offsetWidth;
    let t2 = node2.offsetTop;
    let b2 = node2.offsetTop + node2.offsetHeight;
    if (l2 > r1 || r2 < l1 || t2 > b1 || b2 < t1) {
        return false;
    } else {
        return true;
    }
}

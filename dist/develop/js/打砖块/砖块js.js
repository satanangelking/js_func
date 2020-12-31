"use strict";

function randomColor() {
  var str = "rgba(" + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',1)';
  return str;
}

function createBrick(n, tag) {
  for (var i = 0; i < n; i++) {
    var node = document.createElement('div');
    node.style.backgroundColor = randomColor();
    tag.appendChild(node);
  }
}

function layoutBrick(aDivs) {
  for (var i = 0; i < aDivs.length; i++) {
    aDivs[i].style.left = aDivs[i].offsetLeft + 'px';
    aDivs[i].style.top = aDivs[i].offsetTop + 'px';
  }

  for (var _i = 0; _i < aDivs.length; _i++) {
    aDivs[_i].style.position = 'absolute';
  }
}

function konck(node1, node2) {
  var l1 = node1.offsetLeft;
  var r1 = node1.offsetLeft + node1.offsetWidth;
  var t1 = node1.offsetTop;
  var b1 = node1.offsetTop + node1.offsetHeight;
  var l2 = node2.offsetLeft;
  var r2 = node2.offsetLeft + node2.offsetWidth;
  var t2 = node2.offsetTop;
  var b2 = node2.offsetTop + node2.offsetHeight;

  if (l2 > r1 || r2 < l1 || t2 > b1 || b2 < t1) {
    return false;
  } else {
    return true;
  }
}
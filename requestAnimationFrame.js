const element = document.getElementById('some-element-you-want-to-animate');
let start;

function step (timestamp) {
  console.log('开始动画')
  if (start === undefined)
    start = timestamp;
  const elapsed = timestamp - start;
  console.log(elapsed)

  //这里使用`Math.min()`确保元素刚好停在200px的位置。
  element.style.transform = 'translateX(' + Math.min(0.1 * elapsed) + 'px)';
  element.style.background = '#' + Math.random().toString(16).substring(2, 8).toUpperCase();

  if (elapsed < 2000) { // 在两秒后停止动画
    window.requestAnimationFrame(step);
  }
  console.log('结束动画')
}

window.requestAnimationFrame(step);
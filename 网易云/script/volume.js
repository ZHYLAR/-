
/*音量*/
let volumeWrap = document.querySelector('.volumeWrap')
let volume = document.querySelector('.volume');
let flag = 0;

volume.addEventListener('click', () => {
  flag++;
  if (flag % 2) {
    volumeWrap.style.display = 'block';
  } else {
    volumeWrap.style.display = 'none';
  }
})

/*调节音量*/
let soundBg = document.querySelector(".soundBg");
let btnVolume = document.querySelector(".btnVolume");
let currentTop = 0;

btnVolume.onmousedown = function (event) {
  let currentVolume = document.querySelector('.currentVolume');
  let startY = event.clientY;
  let offsetTop = soundBg.offsetTop;
  let soundBgHeight = soundBg.offsetHeight;

  // save the current top position of the button
  currentTop = parseInt(btnVolume.style.top) || 0;

  document.onmousemove = function (event) {
    let endY = event.clientY;
    let offset = endY - startY;
    let top = currentTop + offset;
    if (top < 0) {
      top = 0;
    } else if (top > soundBgHeight) {
      top = soundBgHeight;
    }
    btnVolume.style.top = top + "px";
    currentVolume.style.top = top + 10 + 'px';
    let volume = (soundBgHeight - top) / soundBgHeight * 100;
    //console.log("Volume: " + volume + "%");
    /*音量改变*/
    let audio = document.querySelector('audio');
    audio.volume = volume / 100;
  }
  document.onmouseup = function () {
    document.onmousemove = null;
    currentTop = parseInt(btnVolume.style.top);
    
  }

}

let thisSongduration = 0;//初始化歌曲时长

/*播放音乐*/
let playBtn = document.querySelector('a.play');
let playFlag = 0;
let audio = document.getElementById('audioInnerPlayer');

/*播放按钮功能*/
playBtn.addEventListener('click', () => {
    playFlag++;
    if (playFlag % 2) {
        audio.play();
        playBtn.style.backgroundPosition = '0px -165px';
    } else {
        audio.pause();
        playBtn.style.backgroundPosition = '0 -204px';
    }
    //console.log(audio.currentTime);
})

/*时间线*/
let current = document.querySelector('.cur');

/*拖动进度条*/
const handle = document.querySelector(".btn");//控制点
const progressbar = document.querySelector(".progressBar");//进度条
//按下监听移动，松开移除监听
handle.addEventListener("mousedown", function (e) {
    e.preventDefault();
    document.addEventListener("mousemove", moveHandle);
    document.addEventListener("mouseup", function () {
        document.removeEventListener("mousemove", moveHandle);
    });
});


function moveHandle(e) {
    const currentProgress = document.querySelector('.cur')//红条
    const handleWidth = handle.offsetWidth;
    const progressbarWidth = progressbar.offsetWidth;//获取宽度
    let left = e.clientX - progressbar.getBoundingClientRect().left;
    if (left < 0) {
        left = 0;
    } else if (left > progressbarWidth - handleWidth) {
        left = progressbarWidth - handleWidth;
    }//获取移动距离

    const percent = (left / (progressbarWidth - handleWidth)) * 100;
    handle.style.left = percent / 100 * progressbarWidth - 15 + 'px'
    currentProgress.style.width = percent + '%';


    /*播放测试*/
    audio.currentTime = thisSongduration / 1000 * percent / 100;
}


/*进度条随播放移动*/
const currentProgress = document.querySelector('.cur')//红条
const progressbarWidth = progressbar.offsetWidth;//获取宽度
setInterval(() => {
    currentProgress.style.width = audio.currentTime * 1000 / thisSongduration * 100 + '%';
    handle.style.left = (audio.currentTime * 1000 / thisSongduration * 100) / 100 * progressbarWidth - 15 + 'px'
}, 200);


/*时长数字显示*/
let playTime = document.getElementById('Total_song_duration');
let playTimeMin;
let playTimeSec;
let Current_duration = document.getElementById('Current_duration');

let au = document.getElementById('audioInnerPlayer');
thisSongduration = au.duration * 1000;


/*歌曲更改后更改时间*/ 
setInterval(() => {
    if(thisSongduration!=au.duration){
    thisSongduration = au.duration * 1000;//更新歌曲时长
    playTimeMin = (Math.floor(thisSongduration / 1000 / 60) > 10) ? Math.floor(thisSongduration / 1000 / 60) : ('0' + Math.floor(thisSongduration / 1000 / 60))
    playTimeSec = Math.floor(thisSongduration / 1000 % 60) > 10 ? Math.floor(thisSongduration / 1000 % 60) : '0' + Math.floor(thisSongduration / 1000 % 60)
    playTime.innerHTML = '/' + playTimeMin + ':' + playTimeSec;
    }
}, 100);


/*刷新当前时间*/
setInterval(() => {
    let currentTimeMin = Math.floor(audio.currentTime / 60) > 10 ? Math.floor(audio.currentTime / 60) : '0' + Math.floor(audio.currentTime / 60);
    let currentTimeSec = Math.floor(audio.currentTime % 60) > 10 ? Math.floor(audio.currentTime % 60) : '0' + Math.floor(audio.currentTime % 60);
    Current_duration.innerHTML = currentTimeMin + ':' + currentTimeSec;
}, 300);






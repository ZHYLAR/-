let searchResultList_item = document.querySelectorAll('.searchResultList_item');

//全部搜索歌曲名
let searchResultList_songName_text = document.querySelectorAll('.searchResultList_songName_text');

//全部搜索歌手名
let searchResultList_singer_text = document.querySelectorAll('.searchResultList_singer_text')

//全部专辑名
let searchResultList_al_text = document.querySelectorAll('.searchResultList_al_text');

//全部时长
let searchResultList_duration = document.querySelectorAll('.searchResultList_duration');

//播放按钮
let searchResultList_item_play = document.querySelectorAll('.searchResultList_item_play');


for (var index = 0; index < 20; index++) {
    if (index % 2 == 1) {
        searchResultList_item[index].classList.add('resultEven');//搜索结果设置黑白相间
    }
}


//点击搜索结果
for (let i = 0; i < 20; i++) {

    //歌名点击
    searchResultList_songName_text[i].addEventListener('click', () => {
        //歌曲id  searchResultList_songName_text[i].title
        
       

        let playingSongName = document.getElementById('playingSongName');
        let audioInnerPlayer = document.getElementById('audioInnerPlayer');
        let playingSongSinger = document.getElementById('playingSongSinger');
        let songCoverImg = document.getElementById('songCoverImg');
        //console.log(searchResultList_songName_text[i].title);


        audioInnerPlayer.setAttribute('src', 'http://music.163.com/song/media/outer/url?id=' + searchResultList_songName_text[i].title + '.mp3');

        fetch("http://localhost:3000/song/detail?ids=" + searchResultList_songName_text[i].title)
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                playingSongName.innerHTML = data.songs[0].name;
                playingSongName.title = data.songs[0].name;
                songCoverImg.setAttribute('src', data.songs[0].al.picUrl);

                //清空歌手名
                playingSongSinger.innerHTML = '';
                playingSongSinger.title = '';
                for (let j = 0; j < data.songs[0].ar.length; j++) {
                    //循环添加所有歌手
                    playingSongSinger.innerHTML += '&nbsp;' + data.songs[0].ar[j].name;
                    playingSongSinger.title += data.songs[0].ar[j].name + ' ';

                }
            })


            //模拟点击播放栏歌名，展开页面
            let e = document.createEvent('MouseEvents');
            e.initEvent('click', true, true);
            playingSongName.dispatchEvent(e);
            
    })


    //播放按钮点击
    searchResultList_item_play[i].addEventListener('click', () => {
        //歌曲id  searchResultList_songName_text[i].title
        let playingSongName = document.getElementById('playingSongName');
        let audioInnerPlayer = document.getElementById('audioInnerPlayer');
        let playingSongSinger = document.getElementById('playingSongSinger');
        let songCoverImg = document.getElementById('songCoverImg');
        //console.log(searchResultList_songName_text[i].title);
        audioInnerPlayer.setAttribute('src', 'http://music.163.com/song/media/outer/url?id=' + searchResultList_songName_text[i].title + '.mp3');
        fetch("http://localhost:3000/song/detail?ids=" + searchResultList_songName_text[i].title)
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                playingSongName.innerHTML = data.songs[0].name;
                playingSongName.title = data.songs[0].name;
                songCoverImg.setAttribute('src', data.songs[0].al.picUrl);
                //清空歌手名
                playingSongSinger.innerHTML = '';
                playingSongSinger.title = '';
                for (let j = 0; j < data.songs[0].ar.length; j++) {
                    //循环添加所有歌手
                    playingSongSinger.innerHTML += '&nbsp;' + data.songs[0].ar[j].name;
                    playingSongSinger.title += data.songs[0].ar[j].name + ' ';
                }
            })
    })

}
fetch("http://localhost:3000/top/playlist/highquality?")
    .then(res => res.json())
    .then(data => {
        //console.log(data)
        /*获取li标签*/
        let rmtj1 = document.getElementById('rmtj1');
        let rmtj2 = document.getElementById('rmtj2');
        let rmtj3 = document.getElementById('rmtj3');
        let rmtj4 = document.getElementById('rmtj4');
        let rmtj5 = document.getElementById('rmtj5');
        let rmtj6 = document.getElementById('rmtj6');
        let rmtj7 = document.getElementById('rmtj7');
        let rmtj8 = document.getElementById('rmtj8');
        let rmtjList = [rmtj1, rmtj2, rmtj3, rmtj4, rmtj5, rmtj6, rmtj7, rmtj8];



        /*对每个热门推荐li标签进行操作*/
        rmtjList.forEach(element => {
            let index = rmtjList.indexOf(element, 0);//索引
            let img = element.querySelector('img');//封面图片
            let name = element.querySelector('p')//歌单名
            let playNumber = element.querySelector('.playNumber');//播放数

            /*
            let tit_listName = document.querySelector('tit-listName');//歌单详情页的歌单名
            let list_cover = document.querySelector('list-cover');//歌单详情页封面
            list_cover.img.setAttribute('src', data.playlists[index].coverImgUrl);
            tit_listName.innerHTML = data.playlists[index].name;*/


            img.setAttribute('src', data.playlists[index].coverImgUrl);
            name.innerHTML = data.playlists[index].name;//歌单名

            //console.log(data.playlists[index].playCount);

            /*播放数简洁显示*/
            if (data.playlists[index].playCount > 10000) {
                playNumber.innerHTML = Math.floor(data.playlists[index].playCount / 10000) + '万';
            } else {
                playNumber.innerHTML = data.playlists[index].playCount;
            }
        })


       
        /*对每个热门推荐li标签进行操作*/
        /*添加点击播放按钮操作*/
        rmtjList.forEach(element => {
            let index = rmtjList.indexOf(element, 0);//索引

            /*play按钮点击事件*/
            rmtjList[index].querySelector('.icon_play').addEventListener('click', () => {
                //请求该歌单limit内的歌曲相关信息，id，时长等
                fetch("http://localhost:3000/playlist/track/all?id=" + data.playlists[index].id + "&limit=10&offset=0")
                    .then(res => res.json())
                    .then(data => {

                        audio.pause();/*暂停音乐*/
                        playBtn.style.backgroundPosition = '0 -204px';//播放图标变化

                        //作者data.songs[index].ar[0].name
                        //歌曲id data.songs[index].id
                        //歌曲名data.songs[index].name
                        //console.log(data.songs[index].al.picUrl)//歌曲图
                        let songImg = document.getElementById('songCoverImg');
                        let songName = document.getElementById('playingSongName');
                        let playingSongSinger = document.getElementById('playingSongSinger');
                        let songIndex = 0;
                        let playlistNext = document.querySelector('.next');
                        let playlistprev = document.querySelector('.prev')


                        //console.log(data)
                        songImg.src = data.songs[songIndex].al.picUrl;//换歌曲封面
                        songName.innerHTML = data.songs[songIndex].name;//换歌名
                        songName.title = data.songs[songIndex].name; //hover之后显示的title歌名
                        playingSongSinger.innerHTML = data.songs[songIndex].ar[0].name;//换歌手名
                        playingSongSinger.title = data.songs[songIndex].ar[0].name;//hover之后显示的title歌手
                        /*请求时长 dt为时长
                        fetch("http://localhost:3000/song/detail?ids=" + data.songs[index].id)
                            .then(res => res.json())
                            .then(data => {
                                console.log('dt:' + data.songs[index].dt); 
                            })*/

                        /*时长数字显示*/
                        let playTime = document.getElementById('Total_song_duration');
                        let playTimeMin = (Math.floor(thisSongduration / 1000 / 60) > 10) ? Math.floor(thisSongduration / 1000 / 60) : ('0' + Math.floor(thisSongduration / 1000 / 60));
                        let playTimeSec = Math.floor(thisSongduration / 1000 % 60) > 10 ? Math.floor(thisSongduration / 1000 % 60) : '0' + Math.floor(thisSongduration / 1000 % 60);
                        playTime.innerHTML = '/' + playTimeMin + ':' + playTimeSec;
                        //let audio = document.getElementById('audioInnerPlayer');
                        audio.src = 'http://music.163.com/song/media/outer/url?id=' + data.songs[songIndex].id + '.mp3';


                        /*下一首点击后，全部换一遍*/
                        playlistNext.addEventListener('click', () => {
                            songIndex++;
                            /*暂停音乐*/
                            audio.pause();
                            playBtn.style.backgroundPosition = '0 -204px';

                            songImg.src = data.songs[songIndex].al.picUrl;//换歌曲封面
                            songName.innerHTML = data.songs[songIndex].name;//换歌名
                            songName.title = data.songs[songIndex].name; //hover之后显示的title歌名
                            playingSongSinger.innerHTML = data.songs[songIndex].ar[0].name;//换歌手名
                            playingSongSinger.title = data.songs[songIndex].ar[0].name;//hover之后显示的title歌手
                            audio.src = 'http://music.163.com/song/media/outer/url?id=' + data.songs[songIndex].id + '.mp3';
                        })


                        /*上一首点击后，全部换一遍*/
                        playlistprev.addEventListener('click', () => {
                            if (songIndex != 0) {
                                songIndex--;
                            }

                            /*暂停音乐*/
                            audio.pause();
                            playBtn.style.backgroundPosition = '0 -204px';

                            songImg.src = data.songs[songIndex].al.picUrl;//换歌曲封面
                            songName.innerHTML = data.songs[songIndex].name;//换歌名
                            songName.title = data.songs[songIndex].name; //hover之后显示的title歌名
                            playingSongSinger.innerHTML = data.songs[songIndex].ar[0].name;//换歌手名
                            playingSongSinger.title = data.songs[songIndex].ar[0].name;//hover之后显示的title歌手
                            audio.src = 'http://music.163.com/song/media/outer/url?id=' + data.songs[songIndex].id + '.mp3';
                        })
                    })
            })
        })
        /*获取一首歌相关信息样例*/
        /*rmtj1.querySelector('.icon_play').addEventListener('click', () => {
            //console.log(data.playlists[0].id) //歌单id
            fetch("http://localhost:3000/playlist/track/all?id="+data.playlists[0].id+"&limit=10&offset=0")
                .then(res => res.json())
                .then(data => {
                    //console.log(data)
                    console.log(data.songs[0].al.id);//歌曲id
                    console.log(data.songs[0].name)//歌曲名
                    console.log(data.songs[0].al.picUrl)//歌曲图   
                })
        })*/
    })



/*获取单曲时长
fetch("http://localhost:3000/song/detail?ids=347230")
.then(res => res.json())
.then(data => {
     console.log(data.songs[0].dt);
})*/
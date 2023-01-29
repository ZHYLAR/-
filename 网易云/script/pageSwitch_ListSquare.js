const lists_pageSwitch_Btn = document.getElementById('lists_pageSwitch_Btn');//歌单按钮
const listsSquare = document.getElementById('listsSquare');
let song_cover = document.querySelectorAll('.u_cover .song_cover img');//分类歌单页的cover
let dec_name = document.querySelectorAll('.u_cover .song_cover .dec');//歌单名
let playNumber = document.querySelectorAll('.u_cover .song_cover .playNumber');//播放数
const chooseBtn = document.querySelector('.chooseBtn');
const chooseType = document.querySelector('.chooseType');
let display_flag = 0;//控制菜单显示与否的flag
chooseBtn.addEventListener('click', () => {

    if (display_flag % 2 == 0) {
        chooseType.style.display = 'block';
    }
    else {
        chooseType.style.display = 'none';
    }
    display_flag++;
}
)
/*
recommendPage = document.getElementById('recommendPage');//推荐页
m_playlist = document.getElementById('m-playlist');//歌单页
*/

//点击关闭其他页面 换页
lists_pageSwitch_Btn.addEventListener('click', () => {
    recommendPage.style.display = 'none';
    userPage.style.display = 'none';
    m_playlist.style.display = 'none';
    detailsOfSong.style.display = 'none';
    listsSquare.style.display = 'block';
    searchResult.style.display = 'none';
    //lists_pageSwitch_Btn.classList.add('emBg');//选择效果
})

let moreBtn = document.querySelector('.more'); 
moreBtn.addEventListener('click', () => {
    recommendPage.style.display = 'none';
    m_playlist.style.display = 'none';
    detailsOfSong.style.display = 'none';
    listsSquare.style.display = 'block';
    //lists_pageSwitch_Btn.classList.add('emBg');//选择效果
})


/*进入页面第一次操作 一页35个*/
fetch("http://localhost:3000/top/playlist/highquality")
    .then(res => res.json())
    .then(data => {
        //console.log(data);
        //相关操作
        for (let index = 0; index < 28; index++) {
            song_cover[index].setAttribute('src', data.playlists[index].coverImgUrl);
            dec_name[index].innerHTML = data.playlists[index].name;//歌单名

            if (data.playlists[index].playCount > 10000) {
                playNumber[index].innerHTML = Math.floor(data.playlists[index].playCount / 10000) + '万';
            } else {
                playNumber[index].innerHTML = data.playlists[index].playCount;
            }

            //播放按钮事件
            let squareUl_li = document.querySelectorAll('.u_cover');
            squareUl_li[index].querySelector('.icon_play').addEventListener('click', () => {
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
                        let playlistprev = document.querySelector('.prev');


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
                        
                        /*歌曲链接更换*/
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
            //播放按钮事件结束
        }
    })




/*对每个热门推荐li标签进行操作*/
let cat_content = ' ';//储存分类的变量
let squareUl_li = document.querySelectorAll('.u_cover');
let rmtjList_2 = [];
for (let index = 0; index < 28; index++) {
    rmtjList_2.push(squareUl_li[index]);
}
rmtjList_2.forEach(Element => {
    Element.addEventListener('click', () => {
        listsSquare.style.display = 'none';
        recommendPage.style.display = 'none';
        m_playlist.style.display = 'block';//换页
        userPage.style.display = 'none';
        detailsOfSong.style.display = 'none';
        searchResult.style.display = 'none';
        m_playlist.style.height = '5000px'//增加页面高度

        /*填充内容*/
        fetch("http://localhost:3000/top/playlist/highquality" + cat_content)
            .then(res => res.json())
            .then(data => {
                //data是热门歌单
                /*歌单信息部分*/
                //console.log(data);
                //rmtjList_2.indexOf(Element); 表示选中的第几个歌单  
                const tit_listName = document.querySelector('.tit-listName');//歌单详情页的歌单名
                tit_listName.innerHTML = data.playlists[rmtjList_2.indexOf(Element)].name;

                const list_cover = document.querySelector('.list-cover img');//歌单详情页封面
                list_cover.setAttribute('src', data.playlists[rmtjList_2.indexOf(Element)].coverImgUrl);

                const list_playNum = document.querySelector('.countNum');//播放数
                list_playNum.innerHTML = data.playlists[rmtjList_2.indexOf(Element)].playCount;/*播放数显示*/

                const playlist_track_count = document.getElementById('playlist-track-count');//歌曲数
                playlist_track_count.innerHTML = data.playlists[rmtjList_2.indexOf(Element)].trackCount + '首歌';

                const avatarimg = document.querySelector('.creator img');
                avatarimg.setAttribute('src', data.playlists[rmtjList_2.indexOf(Element)].creator.avatarUrl);

                const avatarNickname = document.querySelector('.creator span');
                avatarNickname.innerHTML = data.playlists[rmtjList_2.indexOf(Element)].creator.nickname;

                const list_description = document.querySelector('.brief_introduction');
                list_description.innerHTML = '介绍：' + data.playlists[rmtjList_2.indexOf(Element)].description;



                /*歌曲信息部分*/
                //歌曲与基本信息
                //歌单id: data.playlists[rmtjList_2.indexOf(Element)].id 
                fetch("http://localhost:3000/playlist/track/all?id=" + data.playlists[rmtjList_2.indexOf(Element)].id + "&limit=10&offset=0")
                    .then(res => res.json())
                    .then(data => {
                        //console.log(data);
                        const song_inf = document.querySelectorAll('tbody tr');//歌单每一行
                        /*修改元素模板：
                        song_inf[0].querySelector('.each-song-album').innerHTML = '哈哈哈哈'
                        */

                        for (let song_index = 0; song_index < 10; song_index++) {

                            //编号
                            song_inf[song_index].querySelector('.each-song-index').innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" + Number(song_index + 1);


                            //专辑
                            song_inf[song_index].querySelector('.each-song-album').innerHTML = tit_listName.innerHTML;


                            //歌手
                            for (let num = 0; num < data.songs[song_index].ar.length; num++) {
                                song_inf[song_index].querySelector('.each-song-singer').innerHTML = data.songs[song_index].ar[0].name;
                            }

                            //歌曲名
                            song_inf[song_index].querySelector('.each-song-title').innerHTML = data.songs[song_index].name;
                            
                            //歌曲id，储存在title中
                            song_inf[song_index].querySelector('.each-song-title').title = data.songs[song_index].id;

                        }

                        //填入时长
                        function GetDuration() {
                            fetch("http://localhost:3000/song/detail?ids=" + data.songs[0].id)
                                .then(res => res.json())
                                .then(data => {
                                    min = Math.floor(data.songs[0].dt / 1000 / 60);
                                    sec = Math.floor(data.songs[0].dt / 1000 % 60) >= 10 ? Math.floor(data.songs[0].dt / 1000 % 60) : '0' + Math.floor(data.songs[0].dt / 1000 % 60);
                                    song_inf[0].querySelector('.each-song-duration').innerHTML = min + ':' + sec;
                                })
                            fetch("http://localhost:3000/song/detail?ids=" + data.songs[1].id)
                                .then(res => res.json())
                                .then(data => {
                                    min = Math.floor(data.songs[0].dt / 1000 / 60);
                                    sec = Math.floor(data.songs[0].dt / 1000 % 60) >= 10 ? Math.floor(data.songs[0].dt / 1000 % 60) : '0' + Math.floor(data.songs[0].dt / 1000 % 60);
                                    song_inf[1].querySelector('.each-song-duration').innerHTML = min + ':' + sec;
                                })
                            fetch("http://localhost:3000/song/detail?ids=" + data.songs[2].id)
                                .then(res => res.json())
                                .then(data => {
                                    min = Math.floor(data.songs[0].dt / 1000 / 60);
                                    sec = Math.floor(data.songs[0].dt / 1000 % 60) >= 10 ? Math.floor(data.songs[0].dt / 1000 % 60) : '0' + Math.floor(data.songs[0].dt / 1000 % 60);
                                    song_inf[2].querySelector('.each-song-duration').innerHTML = min + ':' + sec;
                                })
                            fetch("http://localhost:3000/song/detail?ids=" + data.songs[3].id)
                                .then(res => res.json())
                                .then(data => {
                                    min = Math.floor(data.songs[0].dt / 1000 / 60);
                                    sec = Math.floor(data.songs[0].dt / 1000 % 60) >= 10 ? Math.floor(data.songs[0].dt / 1000 % 60) : '0' + Math.floor(data.songs[0].dt / 1000 % 60);
                                    song_inf[3].querySelector('.each-song-duration').innerHTML = min + ':' + sec;
                                })
                            fetch("http://localhost:3000/song/detail?ids=" + data.songs[4].id)
                                .then(res => res.json())
                                .then(data => {
                                    min = Math.floor(data.songs[0].dt / 1000 / 60);
                                    sec = Math.floor(data.songs[0].dt / 1000 % 60) >= 10 ? Math.floor(data.songs[0].dt / 1000 % 60) : '0' + Math.floor(data.songs[0].dt / 1000 % 60);
                                    song_inf[4].querySelector('.each-song-duration').innerHTML = min + ':' + sec;
                                })
                            fetch("http://localhost:3000/song/detail?ids=" + data.songs[5].id)
                                .then(res => res.json())
                                .then(data => {
                                    min = Math.floor(data.songs[0].dt / 1000 / 60);
                                    sec = Math.floor(data.songs[0].dt / 1000 % 60) >= 10 ? Math.floor(data.songs[0].dt / 1000 % 60) : '0' + Math.floor(data.songs[0].dt / 1000 % 60);
                                    song_inf[5].querySelector('.each-song-duration').innerHTML = min + ':' + sec;
                                })

                            fetch("http://localhost:3000/song/detail?ids=" + data.songs[6].id)
                                .then(res => res.json())
                                .then(data => {
                                    min = Math.floor(data.songs[0].dt / 1000 / 60);
                                    sec = Math.floor(data.songs[0].dt / 1000 % 60) >= 10 ? Math.floor(data.songs[0].dt / 1000 % 60) : '0' + Math.floor(data.songs[0].dt / 1000 % 60);
                                    song_inf[6].querySelector('.each-song-duration').innerHTML = min + ':' + sec;
                                })
                            fetch("http://localhost:3000/song/detail?ids=" + data.songs[7].id)
                                .then(res => res.json())
                                .then(data => {
                                    min = Math.floor(data.songs[0].dt / 1000 / 60);
                                    sec = Math.floor(data.songs[0].dt / 1000 % 60) >= 10 ? Math.floor(data.songs[0].dt / 1000 % 60) : '0' + Math.floor(data.songs[0].dt / 1000 % 60);
                                    song_inf[7].querySelector('.each-song-duration').innerHTML = min + ':' + sec;
                                })
                            fetch("http://localhost:3000/song/detail?ids=" + data.songs[8].id)
                                .then(res => res.json())
                                .then(data => {
                                    min = Math.floor(data.songs[0].dt / 1000 / 60);
                                    sec = Math.floor(data.songs[0].dt / 1000 % 60) >= 10 ? Math.floor(data.songs[0].dt / 1000 % 60) : '0' + Math.floor(data.songs[0].dt / 1000 % 60);
                                    song_inf[8].querySelector('.each-song-duration').innerHTML = min + ':' + sec;
                                })
                            fetch("http://localhost:3000/song/detail?ids=" + data.songs[9].id)
                                .then(res => res.json())
                                .then(data => {
                                    min = Math.floor(data.songs[0].dt / 1000 / 60);
                                    sec = Math.floor(data.songs[0].dt / 1000 % 60) >= 10 ? Math.floor(data.songs[0].dt / 1000 % 60) : '0' + Math.floor(data.songs[0].dt / 1000 % 60);
                                    song_inf[9].querySelector('.each-song-duration').innerHTML = min + ':' + sec;
                                })
                        }
                        GetDuration();
                    })

                //评论
                fetch("http://localhost:3000/comment/playlist?id=" + data.playlists[rmtjList_2.indexOf(Element)].id + cat_content)
                    .then(res => res.json())
                    .then(data => {
                       // console.log(data);
                        /*最热评论*/
                        const usersImgInComment = document.querySelectorAll('.oneRemark img');//头像
                        const usersNameInComment = document.querySelectorAll('.remark-username');//用户名
                        const usersContentInComment = document.querySelectorAll('.remark-content');//评论内容
                        const replyDiv = document.querySelectorAll('.comments-reply');//回复
                        const replyUser = document.querySelectorAll('.reply-userName');
                        const replyContent = document.querySelectorAll('.reply-content');//回复内容
                        for (var i = 0; i < data.hotComments.length; i++) {
                            usersImgInComment[i].setAttribute('src', data.hotComments[i].user.avatarUrl);
                            usersNameInComment[i].innerHTML = data.hotComments[i].user.nickname;
                            usersContentInComment[i].innerHTML = "&nbsp;&nbsp;" + data.hotComments[i].content;

                            if (data.hotComments[i].beReplied.length) {//回复
                                replyUser[i].innerHTML = data.hotComments[i].beReplied[0].user.nickname;
                                replyContent[i].innerHTML = data.hotComments[i].beReplied[0].content;
                                replyDiv[i].style.display = 'block';

                                //data.hotComments[i].beReplied[0].user.nickname
                            } else {
                                replyUser[i].innerHTML = 'nobody';
                                replyContent[i].innerHTML = '无回复';//防卡死。先填上内容，循环结束再设置不显示                      
                            }
                            if (data.hotComments[i].beReplied.length == 0) {
                                replyDiv[i].style.display = 'none';
                            }
                        }

                        /*最热评论结束*/


                    })

                //最新评论
                fetch("http://localhost:3000/comment/playlist?id=" + data.playlists[rmtjList_2.indexOf(Element)].id)
                    .then(res => res.json())
                    .then(data => {

                        const new_usersImgInComment = document.querySelectorAll('.new-oneRemark img');//头像
                        const new_usersNameInComment = document.querySelectorAll('.new-remark-username');//用户名
                        const new_usersContentInComment = document.querySelectorAll('.new-remark-content');//评论内容
                        const new_replyDiv = document.querySelectorAll('.new-comments-reply');//回复
                        const new_replyUser = document.querySelectorAll('.new-reply-userName');
                        const new_replyContent = document.querySelectorAll('.new-reply-content');//回复内容

                        for (var i = 0; i < data.comments.length; i++) {
                            new_usersImgInComment[i].setAttribute('src', data.comments[i].user.avatarUrl);
                            new_usersNameInComment[i].innerHTML = data.comments[i].user.nickname;
                            new_usersContentInComment[i].innerHTML = "&nbsp;&nbsp;" + data.comments[i].content;

                            if (data.comments[i].beReplied.length) {//回复
                                new_replyUser[i].innerHTML = data.comments[i].beReplied[0].user.nickname;
                                new_replyContent[i].innerHTML = data.comments[i].beReplied[0].content;
                                new_replyDiv[i].style.display = 'block';

                                //data.comments[i].beReplied[0].user.nickname
                            } else {
                                new_replyUser[i].innerHTML = 'nobody';
                                new_replyContent[i].innerHTML = '无回复';//防卡死。先填上内容，循环结束再设置不显示                      
                            }
                            if (data.comments[i].beReplied.length == 0) {
                                new_replyDiv[i].style.display = 'none';
                            }
                        }
                    })

            })
    })
})



//分类选项 选中后改变页面显示
s_fc1 = document.querySelectorAll('.s-fc1');
all_h3 = document.querySelector('.all_h3');
for (let index = 0; index < 71; index++) {
    s_fc1[index].addEventListener('click', () => {
        //alert(s_fc1[index].title);
        //获取对应类型、
        cat_content = s_fc1[index].title;//存储分类词条
        all_h3.innerHTML = s_fc1[index].innerHTML;
        //播放按钮功能
        fetch("http://localhost:3000/top/playlist/highquality" + s_fc1[index].title)
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                for (let index = 0; index < 28; index++) {
                    song_cover[index].setAttribute('src', data.playlists[index].coverImgUrl);
                    dec_name[index].innerHTML = data.playlists[index].name;//歌单名

                    if (data.playlists[index].playCount > 10000) {
                        playNumber[index].innerHTML = Math.floor(data.playlists[index].playCount / 10000) + '万';
                    } else {
                        playNumber[index].innerHTML = data.playlists[index].playCount;
                    }
                    //播放按钮事件
                    let squareUl_li = document.querySelectorAll('.u_cover');
                    squareUl_li[index].querySelector('.icon_play').addEventListener('click', () => {
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
                    //播放按钮事件结束
                }
            })
    })

}

/*
fetch("http://localhost:3000/top/playlist/highquality?cat=古风")
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })*/








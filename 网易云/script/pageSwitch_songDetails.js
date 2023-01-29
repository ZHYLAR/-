let detailPage_songName = document.getElementById('detailPage_songName');
let detailPage_singer = document.getElementById('detailPage_singer');
let detailPage_songCover = document.getElementById('detailPage_songCover');
let detailPage_album = document.getElementById('detailPage_album');
let detailPage_lyric_content = document.getElementById('lyric-content');




//去除时间
let pattern = /\[\d\d:\d\d\.\d\d\d\]/g;
let pattern2 = /\[\d\d:\d\d\.\d\d\]/g;


let playingSongName = document.getElementById('playingSongName');
let songHead = document.querySelector('.songHead');

//点击歌名
playingSongName.addEventListener('click', () => {
    recommendPage.style.display = 'none';//换页
    m_playlist.style.display = 'none';
    detailsOfSong.style.display = 'block';
    listsSquare.style.display = 'none';
    searchResult.style.display = 'none';
    userPage.style.display = 'none';
    let targetSongID = audio.src;
    targetSongID = targetSongID.slice(45);
    targetSongID = targetSongID.substring(0, targetSongID.length - 4);
    //console.log(targetSongID);

    fetch("http://localhost:3000/song/detail?ids=" + targetSongID)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            detailPage_songName.innerHTML = data.songs[0].name;
            detailPage_singer.innerHTML = data.songs[0].ar[0].name;
            detailPage_songCover.setAttribute('src', data.songs[0].al.picUrl);
            detailPage_album.innerHTML = data.songs[0].al.name;

            //歌词
            
            fetch("http://localhost:3000/lyric?id=" + targetSongID)
                .then(res => res.json())
                .then(data => {
                    
                    //console.log(data.lrc.lyric)
                    let lrc_str = data.lrc.lyric;
                    lrc_str = lrc_str.replace(pattern, "");
                    lrc_str = lrc_str.replace(pattern2, "");
                    detailPage_lyric_content.innerHTML = lrc_str;

                })

            //评论
            fetch("http://localhost:3000/comment/music?id=" + targetSongID)
                .then(res => res.json())
                .then(data => {
                    //console.log(data);
                    let new_usersImgInComment_song = document.querySelectorAll('.songCommentsStart .new-oneRemark img');//头像
                    let new_usersNameInComment_song = document.querySelectorAll('.songCommentsStart .new-remark-username');//用户名
                    let new_usersContentInComment_song = document.querySelectorAll('.songCommentsStart .new-remark-content');//评论内容
                    let new_replyDiv_song = document.querySelectorAll('.songCommentsStart .new-comments-reply');//回复
                    let new_replyUser_song = document.querySelectorAll('.songCommentsStart .new-reply-userName');
                    let new_replyContent_song = document.querySelectorAll('.songCommentsStart .new-reply-content');//回复内容

                    for (var i = 0; i < data.comments.length; i++) {
                        new_usersImgInComment_song[i].setAttribute('src', data.comments[i].user.avatarUrl);
                        new_usersNameInComment_song[i].innerHTML = data.comments[i].user.nickname;
                        new_usersContentInComment_song[i].innerHTML = "&nbsp;&nbsp;" + data.comments[i].content;

                        if (data.comments[i].beReplied.length) {//回复
                            new_replyUser_song[i].innerHTML = data.comments[i].beReplied[0].user.nickname;
                            new_replyContent_song[i].innerHTML = data.comments[i].beReplied[0].content;
                            new_replyDiv_song[i].style.display = 'block';

                            //data.comments[i].beReplied[0].user.nickname
                        } else {
                            new_replyUser_song[i].innerHTML = 'nobody';
                            new_replyContent_song[i].innerHTML = '无回复';//防卡死。先填上内容，循环结束再设置不显示                      
                        }
                        if (data.comments[i].beReplied.length == 0) {
                            new_replyDiv_song[i].style.display = 'none';
                        }
                    }
                })

        })
})

//点击图片
songHead.addEventListener('click', () => {
    recommendPage.style.display = 'none';//换页
    m_playlist.style.display = 'none';
    detailsOfSong.style.display = 'block';
    listsSquare.style.display = 'none';
    searchResult.style.display = 'none';
    userPage.style.display = 'none';
    let targetSongID = audio.src;
    targetSongID = targetSongID.slice(45);
    targetSongID = targetSongID.substring(0, targetSongID.length - 4);
    //console.log(targetSongID);

    fetch("http://localhost:3000/song/detail?ids=" + targetSongID)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            detailPage_songName.innerHTML = data.songs[0].name;
            detailPage_singer.innerHTML = data.songs[0].ar[0].name;
            detailPage_songCover.setAttribute('src', data.songs[0].al.picUrl);
            detailPage_album.innerHTML = data.songs[0].al.name;

            //歌词
            fetch("http://localhost:3000/lyric?id=" + targetSongID)
                .then(res => res.json())
                .then(data => {

                    //console.log(data.lrc.lyric)
                    let lrc_str = data.lrc.lyric;
                    lrc_str = lrc_str.replace(pattern, "");
                    lrc_str = lrc_str.replace(pattern2, "");
                    detailPage_lyric_content.innerHTML = lrc_str;
                })

            //评论
            fetch("http://localhost:3000/comment/music?id=" + targetSongID)
                .then(res => res.json())
                .then(data => {
                    //  console.log(data);
                    let new_usersImgInComment_song = document.querySelectorAll('.songCommentsStart .new-oneRemark img');//头像
                    let new_usersNameInComment_song = document.querySelectorAll('.songCommentsStart .new-remark-username');//用户名
                    let new_usersContentInComment_song = document.querySelectorAll('.songCommentsStart .new-remark-content');//评论内容
                    let new_replyDiv_song = document.querySelectorAll('.songCommentsStart .new-comments-reply');//回复
                    let new_replyUser_song = document.querySelectorAll('.songCommentsStart .new-reply-userName');
                    let new_replyContent_song = document.querySelectorAll('.songCommentsStart .new-reply-content');//回复内容

                    for (var i = 0; i < data.comments.length; i++) {
                        new_usersImgInComment_song[i].setAttribute('src', data.comments[i].user.avatarUrl);
                        new_usersNameInComment_song[i].innerHTML = data.comments[i].user.nickname;
                        new_usersContentInComment_song[i].innerHTML = "&nbsp;&nbsp;" + data.comments[i].content;

                        if (data.comments[i].beReplied.length) {//回复
                            new_replyUser_song[i].innerHTML = data.comments[i].beReplied[0].user.nickname;
                            new_replyContent_song[i].innerHTML = data.comments[i].beReplied[0].content;
                            new_replyDiv_song[i].style.display = 'block';

                            //data.comments[i].beReplied[0].user.nickname
                        } else {
                            new_replyUser_song[i].innerHTML = 'nobody';
                            new_replyContent_song[i].innerHTML = '无回复';//防卡死。先填上内容，循环结束再设置不显示                      
                        }
                        if (data.comments[i].beReplied.length == 0) {
                            new_replyDiv_song[i].style.display = 'none';
                        }
                    }
                })

        })
})






//let audio = document.getElementById('audioInnerPlayer');
//获取目标歌曲id

/*
setInterval(() => {
    
}, 1000);*/


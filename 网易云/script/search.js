const input = document.querySelector('.serachInput');
const suggestions = document.querySelector('.suggestions');
let searchResult = document.getElementById('searchResult');
let serachInput = document.querySelector('.serachInput');
let recommend_ul = document.querySelectorAll('.suggestions ul');//推荐歌曲
let userSearch = document.querySelector('.userSearch');//搜用户
let m_search_input = document.querySelector('.m_search_input');//页内搜索框
/*显示容器*/
input.addEventListener('input', e => {
    //显示建议容器
    suggestions.style.display = 'block';
});
document.addEventListener('click', e => {
    //如果单击事件目标不是输入或建议容器，隐藏建议容器
    if (e.target !== input && e.target !== suggestions) {
        suggestions.style.display = 'none';
    }
});

input.addEventListener('keydown', e => {

    // 如果用户按下enter键，则隐藏建议容器

    if (e.keyCode === 13) {
        suggestions.style.display = 'none';
        /*请求搜索建议结果*/

        //换页
        recommendPage.style.display = 'none';
        m_playlist.style.display = 'none';
        detailsOfSong.style.display = 'none';
        listsSquare.style.display = 'none';
        searchResult.style.display = 'block';
        userPage.style.display = 'none';


        searchResult.style.height = '1600px';
        m_search_input.value = serachInput.value;//小搜索框
        //let m_search_input = document.querySelector('.m_search_input');//页内搜索框

        //填充搜索内容
        fetch("http://localhost:3000/search?keywords=" + m_search_input.value)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                for (var index = 0; index < 20; index++) {
                    //歌名
                    searchResultList_songName_text[index].innerHTML = data.result.songs[index].name;


                    searchResultList_songName_text[index].title = data.result.songs[index].id;//储存id


                    //console.log(searchResultList_songName_text[index].songId);
                    searchResultList_singer_text[index].innerHTML = '';
                    searchResultList_singer_text[index].title = '';
                    for (let j = 0; j < data.result.songs[index].artists.length; j++) {
                        searchResultList_singer_text[index].innerHTML += '&nbsp;' + data.result.songs[index].artists[j].name;
                        searchResultList_singer_text[index].title += ' ' + data.result.songs[index].artists[j].name;
                    }

                    searchResultList_al_text[index].innerHTML = '《' + data.result.songs[index].album.name + '》';
                    searchResultList_al_text[index].title = '《' + data.result.songs[index].album.name + '》';

                    let minOfDur = Math.floor(data.result.songs[index].duration / 1000 / 60);
                    let secOfDur = Math.floor(data.result.songs[index].duration / 1000 % 60) >= 10 ? Math.floor(data.result.songs[index].duration / 1000 % 60) : '0' + Math.floor(data.result.songs[index].duration / 1000 % 60);
                    searchResultList_duration[index].innerHTML = minOfDur + ':' + secOfDur;
                }
                //console.log(data.result.songs);
                //console.log(data.result.songs[1].id);
                //console.log(data.result.songs[1].duration);//时长
                //data.result.songs[1].artists[3].name

            })
    }
});

let searchBtnInPageTop = document.querySelector('.searchBtnInPageTop');
searchBtnInPageTop.addEventListener('click', () => {
    serachInput.value = m_search_input.value;
    //填充搜索内容
    fetch("http://localhost:3000/search?keywords=" + m_search_input.value)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        for (var index = 0; index < 20; index++) {
            //歌名
            searchResultList_songName_text[index].innerHTML = data.result.songs[index].name;


            searchResultList_songName_text[index].title = data.result.songs[index].id;//储存id


            //console.log(searchResultList_songName_text[index].songId);
            searchResultList_singer_text[index].innerHTML = '';
            searchResultList_singer_text[index].title = '';
            for (let j = 0; j < data.result.songs[index].artists.length; j++) {
                searchResultList_singer_text[index].innerHTML += '&nbsp;' + data.result.songs[index].artists[j].name;
                searchResultList_singer_text[index].title += ' ' + data.result.songs[index].artists[j].name;
            }

            searchResultList_al_text[index].innerHTML = '《' + data.result.songs[index].album.name + '》';
            searchResultList_al_text[index].title = '《' + data.result.songs[index].album.name + '》';

            let minOfDur = Math.floor(data.result.songs[index].duration / 1000 / 60);
            let secOfDur = Math.floor(data.result.songs[index].duration / 1000 % 60) >= 10 ? Math.floor(data.result.songs[index].duration / 1000 % 60) : '0' + Math.floor(data.result.songs[index].duration / 1000 % 60);
            searchResultList_duration[index].innerHTML = minOfDur + ':' + secOfDur;
        }
        //console.log(data.result.songs);
        //console.log(data.result.songs[1].id);
        //console.log(data.result.songs[1].duration);//时长
        //data.result.songs[1].artists[3].name

    })
    
})

//页内搜索框回车
m_search_input.addEventListener('keydown', e => {

    // 如果用户按下enter键，则隐藏建议容器

    if (e.keyCode === 13) {
        suggestions.style.display = 'none';
        /*请求搜索建议结果*/

        //换页
        recommendPage.style.display = 'none';
        m_playlist.style.display = 'none';
        detailsOfSong.style.display = 'none';
        listsSquare.style.display = 'none';
        searchResult.style.display = 'block';
        userPage.style.display = 'none';
        searchResult.style.height = '1600px';
        //m_search_input.value = serachInput.value;//小搜索框
        //let m_search_input = document.querySelector('.m_search_input');//页内搜索框

        //填充搜索内容
        fetch("http://localhost:3000/search?keywords=" + m_search_input.value)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                for (var index = 0; index < 20; index++) {
                    //歌名
                    searchResultList_songName_text[index].innerHTML = data.result.songs[index].name;


                    searchResultList_songName_text[index].title = data.result.songs[index].id;//储存id


                    //console.log(searchResultList_songName_text[index].songId);
                    searchResultList_singer_text[index].innerHTML = '';
                    searchResultList_singer_text[index].title = '';
                    for (let j = 0; j < data.result.songs[index].artists.length; j++) {
                        searchResultList_singer_text[index].innerHTML += '&nbsp;' + data.result.songs[index].artists[j].name;
                        searchResultList_singer_text[index].title += ' ' + data.result.songs[index].artists[j].name;
                    }

                    searchResultList_al_text[index].innerHTML = '《' + data.result.songs[index].album.name + '》';
                    searchResultList_al_text[index].title = '《' + data.result.songs[index].album.name + '》';

                    let minOfDur = Math.floor(data.result.songs[index].duration / 1000 / 60);
                    let secOfDur = Math.floor(data.result.songs[index].duration / 1000 % 60) >= 10 ? Math.floor(data.result.songs[index].duration / 1000 % 60) : '0' + Math.floor(data.result.songs[index].duration / 1000 % 60);
                    searchResultList_duration[index].innerHTML = minOfDur + ':' + secOfDur;
                }
                //console.log(data.result.songs);
                //console.log(data.result.songs[1].id);
                //console.log(data.result.songs[1].duration);//时长
                //data.result.songs[1].artists[3].name

            })
    }
});

let inputTemp;//临时存储搜索字段
setInterval(() => {//每0.8秒检查一次字段是否改变
    if (inputTemp != serachInput.value) {//搜索字段改变时
        inputTemp = serachInput.value;//更新临时存储搜索字段
        userSearch.innerHTML = '搜“' + serachInput.value + '”相关用户';//搜用户名
        fetch("http://localhost:3000/search?keywords=" + serachInput.value)//请求搜索结果
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                for (var index = 0; index < 4; index++) {
                    recommend_ul[index].innerHTML = data.result.songs[index].name + '-' + data.result.songs[index].artists[0].name;
                    //添加所有歌手
                    for (var nameIndex = 1; nameIndex < data.result.songs[index].artists.length; nameIndex++) {
                        recommend_ul[index].innerHTML += ' ' + data.result.songs[index].artists[nameIndex].name;
                    }
                }
            })
    }
}, 800);



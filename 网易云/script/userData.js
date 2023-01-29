let userNkN_input = document.querySelector('.userNkN_input');//输入昵称
let submitIntroNkn_Btn = document.querySelector('.submitIntroNkn_Btn');
let warningDuplicated = document.getElementById('warningDuplicated');
let menu_item_text = document.querySelector('.menu-item-text');
let userPage = document.querySelector('.userPage');
//let login = document.querySelector('.login');
menu_item_text.addEventListener('click', () => {
    recommendPage.style.display = 'none';//换页
    m_playlist.style.display = 'none';
    detailsOfSong.style.display = 'none';
    listsSquare.style.display = 'none';
    searchResult.style.display = 'none';
    userPage.style.display = 'block';
})


submitIntroNkn_Btn.addEventListener('click', () => {
    fetch("http://localhost:3000/nickname/check?nickname=" + userNkN_input.value)
        .then(res => res.json())
        .then(data => {
            //console.log(data);
            if (data.duplicated) {//如果重复
                //alert('该昵称已被注册');
                warningDuplicated.style.color = 'red';
                userNkN_input.style.border = '1px solid red';
            }
            else {
                warningDuplicated.style.color = 'white';
                userNkN_input.style.border = '1px solid #cdcdcd';

            }
        })

    /*
            fetch("http://localhost:3000/user/update?gender=0&signature=测试签名&city=440300&nickname=binary&birthday=1525918298004&province=440000")
    
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                        })
        
            fetch("http://localhost:3000/user/update?nickname=" + userNkN_input.value)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })*/
})

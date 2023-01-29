/*登录*/
var login = document.getElementById('login');
var bg = document.getElementById('bg');
var nameHolder = document.getElementById('nameHolder');


// 出登陆窗口和遮盖层
var adminBtn = document.getElementById('adminBtn');
adminBtn.onclick = function () {
    login.style.display = "block";
    bg.style.display = "block";
    
}
// 隐藏登陆窗口和遮盖层
var closeBtn = document.getElementById('closeBtn');
closeBtn.onclick = function () {
    login.style.display = "none";
    bg.style.display = "none";
 
}


/*监听submit登录事件*/
let submit = document.getElementById('loginSubmit');
submit.addEventListener('click', () => {
    let phoneNum = document.getElementById('phoneNum').value;
    let password = document.getElementById('password').value;

    /*登录请求*/
    fetch("http://localhost:3000/login/cellphone?email=" + phoneNum + "&password=" + password)
        .then(res => res.json())
        .then(data => {
            loginstate = 1;
            /*登录成功*/
            if (data.code == 200) {
                /*隐藏登录弹窗*/
                loginstate = 1;
                login.style.display = "none";
                bg.style.display = "none";
                let userId = data.account.id;
                fetch("http://localhost:3000/user/detail?uid=" + userId)
                    .then(res => res.json())
                    .then(data => {
                        /*昵称*/
                        nameHolder.innerHTML = data.profile.nickname;
                    })
                return false;
            }
            else if(data.code == 10004) {
                alert('当前登录存在安全风险，请稍后再试');
            }else{
                //login.style.display = "none";
                alert('登录失败');
            }
        })
})






/*登录后菜单元素*/
const loginBtn = document.getElementById("adminBtn");
const menu = document.getElementById("menu");
const exit = document.getElementById('exit');
/*行为监控*/
loginBtn.addEventListener("mouseenter", function () {
    menu.style.display = "block";
});

loginBtn.addEventListener("mouseleave", function () {
    menu.style.display = "none";
});

menu.addEventListener("mouseenter", function () {
    menu.style.display = "block";
});

menu.addEventListener("mouseleave", function () {
    menu.style.display = "none";
});
/*退出*/
exit.addEventListener('click', () => {
    fetch("http://localhost:3000/logout")
        .then(res => res.json())
        .then(data => {
            login.style.display = "none";
            bg.style.display = "none";
            console.log(data);
        })
})

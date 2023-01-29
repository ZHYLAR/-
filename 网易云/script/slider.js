fetch("http://localhost:3000/banner?type=0")
    .then(res => res.json())
    .then(data => {
        let pic = document.getElementById('current_slider');//轮播图
        let bg_pic = document.getElementById('slider_wrap_id');//背景图
        let dot1 = document.getElementById('dot1');//点
        let dot2 = document.getElementById('dot2');
        let dot3 = document.getElementById('dot3');
        let dot4 = document.getElementById('dot4');
        let dot5 = document.getElementById('dot5');
        let dot6 = document.getElementById('dot6');
        let dot7 = document.getElementById('dot7');
        let dot8 = document.getElementById('dot8');
        let btn = [document.getElementById('leftBtnId'), document.getElementById('rightBtnId')]
        let dot_list = [dot1, dot2, dot3, dot4, dot5, dot6, dot7, dot8]
        const sliders = data.banners;

        //初始化图片、背景图和红点，始终从第0张开始
        let index = 0;
        pic.src = sliders[0].imageUrl;
        bg_pic.style.backgroundImage = "url('" + sliders[0].imageUrl + '?imageView&blur=40x20' + "')";
        dot_list[0].style.backgroundPosition = '-15px -343px';

        function change() {//换图
            if(index==8){
                index=0;
            }
            if(index==-1){
                index=7;
            }
            //所有点都初始化为白点
            for (let x = 0; x < 8; x++) {
                dot_list[x].style.backgroundPosition = '3px -343px';
            }
            //图片改变
            pic.src = sliders[index].imageUrl;
            bg_pic.style.backgroundImage = "url('" + sliders[index].imageUrl + '?imageView&blur=40x20' + "')";
            //变成红点
            dot_list[index].style.backgroundPosition = '-15px -343px';
        }
        

        //左右按钮功能
        btn[0].addEventListener("click", function () {
            index--;
            change();
        })
        btn[1].addEventListener("click", function () { 
            index++;
            change();
        })

        //点击白点切换 
        dot_list.forEach(element => {
            element.addEventListener("click", function () {
                index = dot_list.indexOf(element, 0);//元素下标
                change();
            })
        });

        //自动换图
        setInterval(() => {
            index++;
            change();
        }, 5000);
    })
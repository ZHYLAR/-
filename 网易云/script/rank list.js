var songList = ['财神到','爱的尽头','我的美丽feat.海洋Bo','爱如火','是妈妈是女儿','我愿','Kiliglar','寂寞烟火','凌乱的脚步','Slow Down','乌云','寂寞烟火','合拍','寂寞烟火','1 AM','我不曾忘记','寂寞烟火·2023','Time Stop','是妈妈是女儿','就要做挑战','只有一个你的世界','又到天黑','新春蹦蹦','回家的崽','心年快乐','当你们忘了你们相遇的起点','我们互相隐瞒','跨','Chill We Chill We','Pink Flavor',]
let List1 = document.getElementById("List1");
let List2 = document.getElementById("List2");
let List3 = document.getElementById("List3");
let Lists = [List1,List2,List3]
//console.log(Lists)
let liLis1 = List1.querySelectorAll('.songHotLista');
let liLis2 = List2.querySelectorAll('.songHotLista');
let liLis3 = List3.querySelectorAll('.songHotLista');

for(let index=0;index<10;index++){
    liLis1[index].innerHTML = songList[index];
}

for(let index=10;index<20;index++){
    liLis2[index-10].innerHTML = songList[index];
}

for(let index=20;index<30;index++){
    liLis3[index-20].innerHTML = songList[index];
}
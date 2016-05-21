//监听器
var addEvent=function (node,event,handler){
    if (node.addEventListener){
        node.addEventListener(event,handler,!1);
    }else{
        node.attachEvent('on'+event,handler);
    }
};
var citys=[
    {text:'北京',value:"0"},
    {text:'河南',value:"1"},
];
var colleges={
    0:[
        {text:'清华大学',value:'0.0'},
        {text:'北京大学',value:'0.1'},
    ],
    1:[
        {text:'郑州大学',value:'1.0'},
        {text:'河南大学',value:'1.1'},
    ]
};
var demoForm=document.forms.demoForm;
// 填充选择器
var fillSelect=function (select,list) {
    for(var i=select.length-1;i>0;i--){
        select.remove(i);
    };
    for(var i=0,data,l=list.length;i<l;i++){
        data=list[i];
        var option=new Option(
            data.text,data.value
        );
        select.add(option);
    }
};
//切换学校
addEvent(
    demoForm.city,
    "change",
    function (event) {
        var value=demoForm.city.value,//切换选项的VALUE
            list=colleges[value]||[];//对应的数组
        fillSelect(demoForm.school,list);
    }
);
fillSelect(demoForm.city,citys);
//
var isStu=document.getElementsByClassName("radiobox");
for(var i=0;i<isStu.length;i++){
    isStu[i].addEventListener("click",function (event) {
        var flag=event.target.value;
        if(flag=="yes"){
            document.getElementById("select").style.display="block";
            document.getElementById("input").style.display="none";
        }else{
            document.getElementById("select").style.display="none";
            document.getElementById("input").style.display="block";
        }
    },false);
}



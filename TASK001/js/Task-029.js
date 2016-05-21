
document.getElementById("submit").addEventListener("click",function () {
    var input=document.getElementById("username");
    var name=input.value.trim();
    var tips=document.getElementsByClassName("tips")[0];
    if(name==""||name==null){
        input.style.border="2px solid #df0110";
        tips.innerHTML="姓名不能为空";
        tips.style.color="#df0110";
    }else if(getLength(name)<4||getLength(name)>16){

        tips.innerHTML="字符数应为4~16位";
        tips.style.color="#df0110";
    }else {
        input.style.border="2px solid #61bc45";
        tips.innerHTML="格式正确";
        tips.style.color="#5bc23f";
    }
},false);
var getLength=function (str) {
    var realLength = 0;
    for (var i = 0; i < str.length; i++)
    {
        var charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128)
            realLength += 1;
        else
            realLength += 2;
    }
    return realLength;
}
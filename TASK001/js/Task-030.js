var normalTips=["必填，长度为4~16个字符","密码长度为8~16个字符","再次输入密码","输入正确邮箱","输入11位手机号码",];
var warningTips=["名称格式错误","密码强度较弱","两次密码输入不一致","邮箱格式错误","手机格式错误",];
var rightTips=["名称可用","密码可用","密码输入一致","邮箱格式正确","手机格式正确",];
var tips=document.getElementsByClassName("tips");
var elements=document.getElementsByTagName("input");

function focusOn(index) {
    tips[index].className="tips normalTips"
    tips[index].innerHTML=normalTips[index];
}
function changeOn(index) {
    var tip=document.getElementsByClassName("tips")[index];
    var input=document.getElementsByTagName("input")[index];
    var flag=false;
    switch (index){
        case 0:
            flag=isName();
            break;
        case 1:
            flag=isPassword();
            break;
        case 2:
            flag=isSameKey();
            break;
        case 3:
            flag=isEmail();
            break;
        case 4:
            flag=isTel();
            break;
    }
    if(flag){
        //改变TIP样式
        if(tip.className.search("normalTips")!=-1){
            tip.className=tip.className.replace("normalTips","rightTips");
        }
        if(tip.className.search("wrongTips")!=-1){
            tip.className=tip.className.replace("wrongTips","rightTips");
        }
        tip.innerHTML=rightTips[index];
        //改变INPUToutline
        if(input.className.search("normalInput")!=-1){
            input.className=input.className.replace("normalInput","rightInput");
        }
        if(input.className.search("wrongInput")!=-1){
            input.className=input.className.replace("wrongInput","rightInput");
        }
        
    }else{
        //改变TIP样式
        if(tip.className.search("normalTips")!=-1){
            tip.className=tip.className.replace("normalTips","wrongTips");
        }
        if(tip.className.search("rightTips")!=-1){
            tip.className=tip.className.replace("rightTips","searchTips");
        }
        tip.innerHTML=warningTips[index];
        //改变INPUToutline
        if(input.className.search("normalInput")!=-1){
            input.className=input.className.replace("normalInput","wrongInput");
        }
        if(input.className.search("rightInput")!=-1){
            input.className=input.className.replace("rightInput","wrongInput");
        }
    }
    return false;
}
var isName=function () {
    var name=document.getElementById("name").value.trim();
    var length=getLength(name);
    if(name==""||name==null){
        return false;
    }else if(length<4||length>16){
        return false;
    }else {
        return true;
    }

    function getLength(str){
        var realLength = 0;
        for (var i = 0; i < str.length; i++){
            var charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128){
                realLength += 1;
            }else{
                realLength += 2;
            }
        }
        return realLength;
    }

};

var isPassword=function () {
    var passWord=document.getElementById("password").value.trim();
    var length=getLength(passWord);
    if(length<8||length>16){
        return false;
    }else{
        return true;
    }
    function getLength(str){
        var realLength = 0;
        for (var i = 0; i < str.length; i++){
            var charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128){
                realLength += 1;
            }else{
                realLength += 2;
            }
        }
        return realLength;
    }

};

var isSameKey=function () {
    var firstKey=document.getElementById("password").value.trim();
    var secondKey=document.getElementById("secondPassword").value.trim();
    if(firstKey===secondKey){
        return true;
    }else{
        return false;
    }
};

var isEmail=function () {
    var email=document.getElementById("email").value.trim();
    var apos=email.indexOf("@")
    var dotpos=email.lastIndexOf(".")
    if (apos<1||dotpos-apos<2){
        return false;
    }else{
        return true;
    }
};

var isTel=function () {
    var tel=document.getElementById("tel").value.trim();
    var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
    if (reg.test(tel)) {
        return true;
    }else{
        return false;
    };
};
// 全局校检
var verifyAll=function () {
    for(var i=0;i<elements.length-1;i++){
        if(!changeOn(i)){
            alert("输入有误");
        }
    }
}





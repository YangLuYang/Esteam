var addEvent=function (node,event,handler) {
    if (node.addEventListener){
        node.addEventListener(event,handler,!1);
    }else{
        node.attachEvent('on'+event,handler);
    }
};
var form=document.forms.form;
addEvent(
    form.submit,
    "click",
    function (event) {
        var order=form.input.value.trim().toUpperCase();
        carryOrder(order);
    }
);
var carryOrder=function (order) {
    switch (order){
        case "GO":
            go(40);
            break;
        case "TUN LEF":
            turn(-90);
            break;
        case "TUN RIG":
            turn(90);
            break;
        case "TUN BAC":
            turn(180);
            break;
        default:
            alert("命令错误，请重新输入");
    }
};
var turn=function (deg) {
    var box=document.getElementById("box");
    var array=["top","right","bottom","left"];
    var index,newIndex;
    var rightWay=direction(box);
    var tb=new String(rightWay).substr(0,1);
    var lr=new String(rightWay).substr(1,1);
    if(tb=="r"&&lr=="+"){
        index=1;
    }else if(tb=="r"&&lr=="-"){
        index=3;
    }else if(tb=="t"&&lr=="+"){
        index=0;
    }else if(tb=="t"&&lr=="-"){
        index=2;
    }
    newIndex=index;
    switch (deg){
        case 90:
            if(newIndex!=array.length-1){
                newIndex++;
            }else{
                newIndex=0
            }
            break;
        case -90:
            if(newIndex!=0){
                newIndex--;
            }else{
                newIndex=array.length-1;
            }
            break;
        case 180:
            if(newIndex<=1){
                newIndex+=2;
            }else if(newIndex==2){
                newIndex=0;
            }else if(newIndex==3){
                newIndex=1
            }
            break;
    }
    var str2=array[newIndex];
    alert(str2);
    box.className=str2;
};
// 确定小方块正方向
var direction=function (box) {
    if(box.className=="right"){
        return "r+";
    }else if(box.className=="left"){
        return "r-";
    }else if(box.className=="top"){
        return "t+";
    }else if(box.className=="bottom"){
        return "t-";
    }
}
var go=function (range) {
    var box=document.getElementById("box");
    var xpos=parseInt(box.style.left);
    var ypos=parseInt(box.style.top);
        var rightWay=direction(box);
        var tb=rightWay.substr(0,1);
        var lr=rightWay.substr(1,1);
       if(range>0){
           if(tb=="r"&&lr=="+"){
               if(xpos<400){
                   xpos++;
                   box.style.left=new String(xpos+"px");
                   range--;
               }
           }else if(tb=="r"&&lr=="-"){
               if(xpos>40){
                   xpos--;
                   box.style.left=new String(xpos+"px");
                   range--;
               }
           }else if(tb=="t"&&lr=="+"){
               if(ypos>40){
                   ypos--;
                   box.style.top=new String(ypos+"px");
                   range--;
               }
           }else if(tb=="t"&&lr=="-"){
               if(ypos<400){
                   ypos++;
                   box.style.top=new String(ypos+"px");
                   range--;
               }
           }
       }else{
        return;
    }
    var repeat="go("+range+")";
    setTimeout(repeat,20);
};

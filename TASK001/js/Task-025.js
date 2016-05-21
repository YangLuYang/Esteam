// ship采用工厂模式生成
//命令也通过工厂模式生成
//commander与mediator使用单例模式
var informPanel=document.getElementById("informPanel");
//飞船工厂
function createShip(id,battery,node) {
    var obj=new Object();
    obj.id=id;
    obj.battery=battery;
    obj.state=false;//表示停止状态
    obj.node=node;
    obj.node.innerHTML="<div class='id'>"+obj.id+"</div> <div class='battery' title='100'>100</div>";
    document.getElementById("canves").appendChild(obj.node);
    //动力系统
    obj.flight=function () {
        if(obj.battery>=10){
            obj.state=true;
            obj.node.style.webkitAnimationPlayState="running";
            obj.node.style.top="230px";
            obj.node.style.left="420px";
            obj.node.style.animation="action 10s linear infinite";
            createLog("ship: id: "+obj.id+" in flight");
        }
        if(obj.battery<10){
            obj.stopFlight();
        }



    };
    obj.stopFlight=function () {
        obj.state=false;
        obj.node.style.webkitAnimationPlayState="paused";
        createLog("ship: id: "+obj.id+" in paused");
    };
    //自爆系统
    obj.destruction=function () {
        obj.node.parentNode.removeChild(obj.node);
        createLog("ship: id: "+obj.id+" has destruction");
    };
    //能源系统
    obj.batterySystem=function () {
        if(obj.state==false){
            obj.chargeBattery();
        }
        if(obj.battery<10){
            obj.stopFlight();
        }else if(obj.state==true){
            obj.useBattery();
            obj.chargeBattery();
        }
        obj.node.lastChild.title=obj.battery;
        obj.node.lastChild.innerHTML=obj.battery;

    };
    obj.useBattery=function () {
        obj.battery-=10;
    };
    obj.chargeBattery=function() {
        if(obj.battery<=95){
            obj.battery+=5;
        }
    };
    //信号处理系统
    obj.collectSignal=function () {
        // alert("ship is collecting signal");
        var order=mediator.spreadOrder();
        obj.commond=null;
        var orderList=new String(order).split(",");
        if(orderList[0]==obj.id){
            mediator.clearOrder();
            obj.commond=orderList[1];
        };
        switch (obj.commond){
            case "flight":
                obj.flight();
                break;
            case "stop":
                obj.stopFlight();
                break;
            case "destruction":
                obj.destruction();
                break;
            default:
                break;
        }

    };
    var charge=setInterval(obj.batterySystem,500);
    setInterval(obj.collectSignal,100);
    return obj;
}
//指挥官,使用单利模式
var commander={
    order: undefined,
    cont: 0,
    sendOrder: function () {
        mediator.getOrder(this.order);
    },
    launchShip: function () {
        var shipNode=document.createElement("div");
        shipNode.className="ship";
        var newShip=createShip(++this.cont,100,shipNode);
        createLog("commander: Launch a ship, id "+this.cont);
        return newShip;
    }
};
//介质，使用单例模式
var mediator={
    inform: null,
    getOrder: function (order) {
        var r=Math.random();
        if(r<=0.1){
            createLog("BUS: order is missimg");
        }else{
            this.inform=order;
            createLog("commander: Send  an order, "+this.inform);
        }
    },
    spreadOrder: function () {
        return this.inform;
    },
    clearOrder: function () {
        this.inform=null;
    },
};
function showPanel() {
    if(commander.cont<=3){
        commander.launchShip();
        var ul=document.getElementsByClassName("list")[0];
        var newLi=document.createElement("li");
        newLi.title=commander.cont;
        newLi.innerHTML="对"+commander.cont+"号飞船下指令 "+"<button type='button' onclick=command('"+commander.cont+",flight')>开始飞行</button>"+
            "<button type='button' onclick=command('"+commander.cont+",stop')>停止飞行</button>"+
            "<button type='button' onclick=command('"+commander.cont+",destruction')>销毁</button>";
        ul.appendChild(newLi);
    }else {
        alert("can't launch");
    }

}
function command(order) {
    commander.order=order;
    var orderList=order.split(",",2);
    if(orderList[1]=="destruction"){
        commander.cont--;
    }
    commander.sendOrder();
}
function createLog(log) {
    var p=document.createElement("p");
    p.innerHTML=log;
    informPanel.appendChild(p);
}
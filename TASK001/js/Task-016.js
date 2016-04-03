/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city=document.getElementById("aqi-city-input").value.trim();
	var value=document.getElementById("aqi-value-input").value.trim();
	var cityReg = /[^\u4e00-\u9fa5_a-zA-Z]/g;
	var airReg = /[^0-9]/g;
	if(city.search(cityReg) == -1){
		if(value.search(airReg) == -1){
		aqiData[city]=value;
    }else{ alert("空气质量指数必须为整数"); }
  }else{ alert("城市名必须为中英文字符"); }
		
	
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table=document.getElementById('aqi-table');
    var res="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for(var city in aqiData){
        res+="<tr> <td>"+city+"</td><td>"+aqiData[city].toString()+"</td><td><button data-city="+city+">删除</button></td></tr>";
    }
	table.innerHTML=res;

    
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	addAqiData();
	console.log(aqiData);
	renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
	// do sth.
	delete aqiData[city];
	renderAqiList();
}

function init() {

	// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	document.getElementById("add-btn").addEventListener("click",addBtnHandle,false);
	// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	var table = document.getElementById("aqi-table");
	table.addEventListener("click", function(event){
    if(event.target.nodeName.toLowerCase() === 'button')
      delBtnHandle.call(null, event.target.dataset.city);
	},false);
}
window.onload=function(){
	init();
}


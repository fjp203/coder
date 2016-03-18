
var myApp=angular.module('myApp', ['ngMessages']);


	myApp.controller('gzmCtrl',  function($scope){
		//清除
		$scope.n=null;
		$scope.gzVal="";
		$scope.cClear=function(){
			$scope.SPN='';
			$scope.FMI='';
			$scope.have=false;
			$scope.gz=null;
			$scope.gzVal="";
			$scope.n=false;
		}
			//查询故障码
		$scope.gzm=function(){
			if($scope.SPN!='' & $scope.FMI!=''){
				$scope.gz=$.grep(gzmTable, function(n,i){
  				return n.SPN==$scope.SPN & n.FMI==$scope.FMI;
			});
		for(var i=0;i<$scope.gz.length;i++){
			$scope.gzVal=$scope.gzVal+"FMI:"+$scope.gz[i].FMI+",SPN:"+$scope.gz[i].SPN+"；当系统为："+$scope.gz[i].system+"，分类为："+$scope.gz[i].classify+" 时，故障描述为："+$scope.gz[i].description;
		}
			
			
		$scope.have=false;
		$scope.n=$scope.gz.length;
		if($scope.n>0){
			$scope.have=false;
		}else{
			$scope.have=true;
		}
			}
		
		//console.log($scope.gz);
		}	
	
});

// VIN码计算
	myApp.controller('vinCtrl',  function($scope){
		$scope.q='';
			$scope.lsh='';
		$scope.ctt=function(){
			if($scope.q!='' & $scope.lsh!=''){
				$scope.count='';
				$scope.count= vinP($scope.cx,$scope.q,$scope.lsh,$scope.rwh);	
			}
			
		}
		$scope.cVin=function(){
			$scope.q='';
			$scope.lsh='';
			$scope.count=null;
		}
		$scope.VINwx=function(){
			console.log('微信');
		}
	});



	// K值计算
		myApp.controller('kCtrl',  function($scope){
		
		$scope.lts=[{xh:'10.00R20|1055',zj:1055},
{xh:'11.00-20|1085',zj:1085},
{xh:'11.00R22.5|1050',zj:1050},
{xh:'12.00-20|1125',zj:1125},
{xh:'12.00R22.5|1084',zj:1084},
{xh:'12.00-24|1225',zj:1225},
{xh:'13.00-20|1177',zj:1177},
{xh:'14.00-20|1240',zj:1240},
{xh:'315/80R22.5|1088',zj:1088},
{xh:'275/70R22.5|971',zj:971}, 
{xh:'12R22.5|1082',zj:1082}];

		$scope.sbs=[3.08,3.364,3.7,3.866,4.111,4.262,4.266,4.42,4.625,4.769,4.8,5.262,5.73,5.92,6.72,6.733,9.49];


		$scope.sbVal=$scope.sbs[0];
		$scope.ws=8;
		$scope.xs=1;
$scope.ltVal=$scope.lts[0];


		$scope.ck=function(){
		$scope.k=Math.round((8*1000000*$scope.sbVal)/($scope.xs*3.1415926*$scope.ltVal.zj));
		$scope.txj=Math.round((8*1000000*$scope.sbVal)/($scope.xs*3.1415926*$scope.ltVal.zj)/8);
		$scope.bmV="";
		$scope.bmV1="";
		$scope.Kresult="";
		$scope.bm=$.grep(bmtable, function(n,i){
  				return n.k1<=$scope.k & n.k2>=$scope.k & n.ws==$scope.ws;
			});
		if($scope.bm.length==1){
			for (x in $scope.bm[0])
{
	if(x!='ID' & x!='ws' & x!='k1' & x!='k2'){
	$scope.bmV=$scope.bmV + $scope.bm[0][x];
	}

}
for(var i=1;i<=$scope.bmV.length;i++){
	if($scope.bmV.substr(i-1,1)=='Y'){
		$scope.bmV1=$scope.bmV1+i.toString();
	}
}	}
		$scope.Kresult="当系数为："+$scope.xs+",位数："+$scope.ws+",轮胎直径："+$scope.ltVal.zj+"，桥速比："+$scope.sbVal+"时，K值："+$scope.k+",天行健K值："+$scope.txj+",拨码："+$scope.bmV1;
		//$scope.Kresult="asda";
		};
		
		$scope.cClear=function(){
				$scope.sbVal=$scope.sbs[0];
		$scope.ws=8;
		$scope.xs=1;
$scope.ltVal=$scope.lts[0];

		$scope.k="";
		$scope.txj="";
		$scope.bmV1="";
		};
		$scope.ltc=false;
	$scope.ltChange=function(){
		$scope.ltc=!$scope.ltc;
		//清零
		$scope.sbVal=$scope.sbs[0];				
		$scope.ws=8;
		$scope.xs=1;
		$scope.ltVal.zj=$scope.lts[0].zj;
		$scope.k="";
		$scope.txj="";
		$scope.bmV1="";
	}

	});


// 初始化
mui.init({
	keyEventBind : {
		backbutton : false,
		menubutton : false,
		
	},
	gestureConfig : {
		longtap:true
	}
});
var tapId = null;
// 所有的方法都放到这里


mui.plusReady(function(){
	
	

	// 获取列表
	initHelp();
	
	// 右滑菜单
	window.addEventListener('swiperight', function(){
		fjp.h.indexPage().evalJS("opMenu();");
	});








	// 添加

});

// H5 plus事件处理
function plusReady(){
//	updateSerivces();
	if(plus.os.name=="Android"){
		
		//导入java类对象
		Intent = plus.android.importClass("android.content.Intent");
		File = plus.android.importClass("java.io.File");
		Uri = plus.android.importClass("android.net.Uri");
		main = plus.android.runtimeMainActivity();
	}
	
	
}
if(window.plus){
	plusReady();
}else{
	document.addEventListener("plusready",plusReady,false);
}

mui.ready(function(){
mui('#slider').slider({
                        interval: 5000//轮播
                    });
});

function shareSystem(cc) {
	var Txtval=document.getElementById(cc).value;
	if(plus.os.name!=="Android"){
		plus.nativeUI.alert("此平台暂不支持系统分享功能!");
		return;
	}
	var intent=new Intent(Intent.ACTION_SEND);
	var p = "";

	var f = new File(p);
	var uri = Uri.fromFile(f);
	if(f.exists()&&f.isFile()){
		console.log("image/*");
		intent.setType("image/*");
		intent.putExtra(Intent.EXTRA_STREAM,uri);
	}else{
		console.log("text/plain");
		intent.setType("text/plain");
	}
	intent.putExtra(Intent.EXTRA_SUBJECT,"HBuilder");
	intent.putExtra(Intent.EXTRA_TEXT,Txtval);
	intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
	main.startActivity(Intent.createChooser(intent,"系统分享"));
}




function initHelp(){
//	var help = fjp.h.getItem('help');
//	if(help == null){
//		fjp.h.update(db, 'create table if not exists t_trouble (id unique, description, SPN,FMI,system,classify)');
//		fjp.h.update(db, 'create table if not exists t_trouble_mark (id unique, description, SPN,FMI,system,classify)');
//		
//
//		for(var i=0;i<gzmTable.length;i++){
//			fjp.h.update(db, getSql(datas[i].id, datas[i].description,datas[i].SPN,datas[i].FMI,datas[i].system,datas[i].classify));
//		}
//		fjp.h.insertItem('help','notfirst');
//	}	

}
function getSql(id, description, SPN,FMI,system,classify){
    return 'insert into t_trouble (id, description, SPN,FMI,system,classify) values (' + id + ', "' + description + '", "' + SPN + '", "' + FMI + '", "' + system + '", "' + classify + '")';
}

function initList(){
	
	
	var $ul = $('#todolist').empty();
	fjp.h.query(db, 'select * from t_trouble order by id desc', function(res){
		for (i = 0; i < res.rows.length; i++) {
			$ul.append(genLi(res.rows.item(i)));
		}

		showList($ul);
	});
	
	//qmask.hide();
}


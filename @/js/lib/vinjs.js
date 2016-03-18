// VIN批量计算函数,cx:车型,q前8位,lsh1：流水号区间,rwh：附带信息，如任务号等
function vinP(cx,q,lsh1,rwh){
       if(!arguments[3]){
        flag = "";
       }
       if(!arguments[0]){
        cx = "";
       }
      var lshA=new Array;
      lshA=lsh(lsh1);
      var vinR=new Array;
      for(var i=0;i<lshA.length;i++){
           vinR[i]=vin(q,lshA[i]);     
      }
return [cx,vinR,rwh,lshA.length];
  }
var zmb = [
    ['0', 0],
    ['1', 1],
    ['2', 2],
    ['3', 3],
    ['4', 4],
    ['5', 5],
    ['6', 6],
    ['7', 7],
    ['8', 8],
    ['9', 9],
    ['A', 1],
    ['B', 2],
    ['C', 3],
    ['D', 4],
    ['E', 5],
    ['F', 6],
    ['G', 7],
    ['H', 8],
    ['J', 1],
    ['K', 2],
    ['L', 3],
    ['M', 4],
    ['N', 5],
    ['P', 7],
    ['R', 9],
    ['S', 2],
    ['T', 3],
    ['U', 4],
    ['V', 5],
    ['W', 6],
    ['X', 7],
    ['Y', 8],
    ['Z', 9]
];
var jqb=[8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];

        // 计算VIN,q为前8位,lsh为流水号，输出数组
        function vin(q,lsh){
            var sum=0;
          var vin=q+'X'+lsh;           
          for(i=0;i<17;i++){                
              for(j=0;j<33;j++){             
                  if(vin.substr(i,1)==zmb[j][0]){                   
                   sum=sum+ zmb[j][1] * jqb[i];
                  }
              }
          }
          	if(sum % 11==10){
				return q+'X'+lsh;
          	}else{
          		return q+sum % 11+lsh;	
          	}
            
        }
        // 将流水号段改为数组
        function lsh(lsh){
            if(lsh.length==17){
                if(lsh.substr(0,2)==lsh.substr(9,2)){
                   var nf=lsh.substr(0,2);
                var fir=Number(lsh.substr(2,6));
                var lat=Number(lsh.substr(11,6));
                var n= lat-fir+1;
                var lshsz=new Array;
                 for (var i=0;i<n;i++){
                  var h=(i+fir).toString();
                   lshsz[i]=nf +ling(h)+h;
                 }
                 return lshsz;
                }
            }else{
            	var lshsz=new Array;
            	lshsz[0]=lsh;
            	 return lshsz;
            }
        }

        // 补0
        function ling(a){
          var n=6-a.length;
          var re="";
          for(var i=0;i<n;i++){
              re=re+'0';
          }
          return re;

        }

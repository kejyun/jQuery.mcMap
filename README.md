# jQuery.mcMap (jQuery Manage Control Map) v 1.0
============
## 功能

可以動態管理在Google Map API地圖上的繪圖資訊

## 網址
http://kejyun.github.com/jQuery.mcMap

## 如何使用

```JavaScript
$('#mapContainer').mcmap({
  onAfter : function(){   // 建立後處理
    alert('後處理');
  },
	onBefore : function(){  // 建立前處理
    alert('前處理');
  },
	center: {               // 中心點位置
    x: '25.05673992011185', 
    y: '121.56005178833004'
  },
	zoom: 12,	            // 地圖縮放大小
	control: true,
	draggable: true,		  // 是否可以拖曳
	mapTypeId: 'ROADMAP',	// 地圖類型
	mapTypeControl: true,	// 地圖類型控制
	polyline : [
    {
      coords: [         // 折線點
        [25.05176, 121.54683],
        [25.05876, 121.55301],
        [25.05673, 121.56005]
      ],
      key:'折線1',      // 折線Key
      color: '#008800', // 線顏色
      width: 2,         // 線寬
      opacity:1         // 透明度
    },
    {
      coords: [         // 折線點
        [25.056739, 121.560051],
        [25.041088, 121.576381]
      ],
      key:'折線2',      // 折線Key
      color: '#008800', // 線顏色
      width: 5,         // 線寬
      opacity:0.8       // 透明度
    }
  ],  // 折線
	route:{},				// 路徑群組
	marker:{}				// 標記
});
```

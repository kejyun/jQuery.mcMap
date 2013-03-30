# jQuery.mcMap (jQuery Manage Control Map) v 1.0
============
## 功能

可以動態管理在Google Map API地圖上的繪圖資訊

## 網址
http://kejyun.github.com/jQuery.mcMap

## 如何使用

### 引用Google Map API及jQuery

```HTML
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
<script type="text/javascript" src="jquery.mcmap.js"></script>
```


## 參數選項(Option)

* function : onAfter 建立後處理函式
* function : onBefore 建立前處理函式
* object : center 中心點位置
  * string : x
  * string : y
* integer : zoom 地圖縮放大小
* bool : draggable 是否可以拖曳
* string : mapTypeId 地圖類型(預設ROADMAP)
* bool : mapTypeControl 地圖類型控制
* object : polyline 繪製折線
  * array : coords 折線點
  * string : key 主鍵值
  * string : color 線顏色
  * float : width 線寬
  * float : opacity 透明度
* object : marker 標記
  * string : position.x 標記位置X
  * string : position.y 標記位置Y
  * string : key 主鍵值
  * string : title alt文字
  * string : icon 標記圖片
  * string : infoWindow.text 訊息文字
  * string : infoWindow.evt 訊息觸發事件(預設click)
* object : route 路徑
  * string : key : 路徑主鍵值
  * object : polyline物件
  * object : marker物件

## 功能函數

* 路徑顯示控制(MapContainer.ToggleRoute(routeKey))
* 路徑標記顯示控制(MapContainer.ToggleRouteMarker(routeKey))
* 折線顯示控制(MapContainer.TogglePolyline(polylineKey))
* 標記顯示控制(MapContainer.ToggleMarker(markerKey))
* 新增折線(MapContainer.AddPolyline(option))
* 新增標記(MapContainer.AddMarker(option))
* 新增路徑(MapContainer.AddRoute(option))


```JavaScript
// 建立地圖物件
var MapContainer = $('#map_canvas').mcMap(option);

// 切換路徑顯示(Switch Route Display)
MapContainer.ToggleRoute(routeKey);

// 切換路徑標記顯示(Switch Route Marker Display)
MapContainer.ToggleRouteMarker(routeKey);

// 切換折線顯示(Switch Polyline Display)
MapContainer.TogglePolyline(polylineKey);

// 切換標記顯示(Switch Marker Display)
MapContainer.ToggleMarker(markerKey);

// 新增折線(Add New Polyline)
MapContainer.AddPolyline(option);

// 新增標記(Add New Marker)
MapContainer.AddMarker(option);

// 新增路徑(Add New Route)
MapContainer.AddRoute(option);
```


## 完整範例
```JavaScript
var MapContainer = $('#map_canvas').mcMap({
  onAfter : function(){   // 建立後處理
    console.log('後處理');
  },
  onBefore : function(){  // 建立前處理
    console.log('前處理');
  },
  center: {               // 中心點位置
    x: '25.025884', 
    y: '121.53780'
  },
  zoom: 12,               // 地圖縮放大小
  control: true,
  draggable: true,          // 是否可以拖曳
  mapTypeId: 'ROADMAP',   // 地圖類型
  mapTypeControl: true,   // 地圖類型控制
  polyline : 
  [
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
      color: '#FF8800', // 線顏色
      width: 2,         // 線寬
      opacity:0.8       // 透明度
    }
  ],
  marker:               // 標記
  [
    {
      position:{          //標記位置
        x:'25.041088', 
        y:'121.576381'
      },
      key:'標記1',
      title:'標記1',      // alt文字
      icon:'img/bus.png', // 標記圖片
      infoWindow : {      // 訊息視窗
        text:'標記1',     // 訊息文字
        evt:'click'       // 訊息觸發事件
      }
    },
    {
      position:{          //標記位置
        x:'25.024095', 
        y:'121.552949'
      },
      key:'標記2',
      title:'標記1',      // alt文字
      icon:'img/bus.png', // 標記圖片
      infoWindow : {      // 訊息視窗
        text:'標記1',     // 訊息文字
        evt:'click'       // 訊息觸發事件
      }
    }
  ],
  // 路徑群組
  route:
  [
    {
      key:'路徑1',
      polyline : [
        {
          coords: [
            [24.993993,121.505013],
            [25.045948,121.476688],
            [25.091351,121.463985]
          ],
          key:'路徑1',
          color: '#0088FF',
          width: 2,
          opacity:1
        }
      ],
      marker:               // 標記
      [
        {
          position:{          //標記位置
            x:'25.993993', 
            y:'121.505013'
          },
          key:'路徑1-標記1',
          title:'路徑1-標記1',      // alt文字
          icon:'img/bus.png', // 標記圖片
          infoWindow : {      // 訊息視窗
            text:'路徑1-標記1',     // 訊息文字
            evt:'click'       // 訊息觸發事件
          }
        },
        {
          position:{          //標記位置
            x:'25.091351', 
            y:'121.463985'
          },
          key:'路徑1-標記2',
          title:'路徑1-標記2',      // alt文字
          icon:'img/bus.png', // 標記圖片
          infoWindow : {      // 訊息視窗
            text:'路徑標記1',     // 訊息文字
            evt:'click'       // 訊息觸發事件
          }
        }
      ]
    },
    {
      key:'路徑2',
      polyline : [
        {
          coords: [
            [25.040815,121.565437],
            [25.020284,121.560459],
            [24.998194,121.580029]
          ],
          key:'路徑2',
          color: '#FF00FF',
          width: 2,
          opacity:1
        }
      ],
      marker:               // 標記
      [
        {
          position:{          //標記位置
            x:'25.040815', 
            y:'121.565437'
          },
          key:'路徑2-標記1',
          title:'路徑2-標記1',      // alt文字
          icon:'img/bus.png', // 標記圖片
          infoWindow : {      // 訊息視窗
            text:'路徑標記1',     // 訊息文字
            evt:'click'       // 訊息觸發事件
          }
        },
        {
          position:{          //標記位置
            x:'25.998194', 
            y:'121.580029'
          },
          key:'路徑2-標記2',
          title:'路徑2-標記2',      // alt文字
          icon:'img/bus.png', // 標記圖片
          infoWindow : {      // 訊息視窗
            text:'路徑2-標記2',     // 訊息文字
            evt:'click'       // 訊息觸發事件
          }
        }
      ]
    }
  ]
});
```

var markerImg = 'images/bus.png';
var MapContainerDefault = $('#map_canvas_default').mcMap();
var MapContainerAdd = $('#map_canvas_add').mcMap();
// 加入折線
$('.add_polyline').click(function(){
  MapContainerAdd.AddPolyline({
    polyline : 
    [
      {
        coords: [         // 折線點
          [25.035294,121.499691],
          [25.063054,121.518831],
          [25.021062,121.527929]
        ],
        key:'加入的折線',   // 折線Key
        color: '#EA4F54', // 線顏色
        width: 5,         // 線寬
        opacity:1         // 透明度
      }
    ]
  });
  $(this).attr("disabled",true);
});
// 折線顯示控制
$('.add_polyline_display').click(function(){
  var $this = $(this),
      $icon = $this.find('i')
      polyline_key = $this.data('key');
  MapContainerAdd.TogglePolyline(polyline_key);
  iconControl($icon);
});
// 加入標記
$('.add_marker').click(function(){
  MapContainerAdd.AddMarker({
    marker:               // 標記
    [
      {
        position:{          //標記位置
          x:'25.041515', 
          y:'121.543293'
        },
        key:'加入的標記',
        title:'加入的標記',      // alt文字
        icon:markerImg, // 標記圖片
        infoWindow : {      // 訊息視窗
          text:'加入的標記',     // 訊息文字
          evt:'click'       // 訊息觸發事件
        }
      }
    ]
  });
  $(this).attr("disabled",true);
});

// 標記顯示控制
$('.add_marker_display').click(function(){
  var $this = $(this),
      $icon = $this.find('i')
      marker_key = $this.data('key');
  MapContainerAdd.ToggleMarker(marker_key);
  iconControl($icon);
});

// 加入折線
$('.add_route').click(function(){
  MapContainerAdd.AddRoute({
    route:
    [
      {
        key:'加入的路徑',
        polyline : [
          {
            coords: [
              [25.063209,121.551275],
              [25.084044,121.594362],
              [25.055512,121.617365]
            ],
            key:'折線',
            color: '#0088FF',
            width: 5,
            opacity:1
          }
        ],
        marker:               // 標記
        [
          {
            position:{          //標記位置
              x:'25.084044', 
              y:'121.594362'
            },
            key:'加入的路徑-標記1',
            title:'加入的路徑-標記1',      // alt文字
            icon:markerImg, // 標記圖片
            infoWindow : {      // 訊息視窗
              text:'加入的路徑-標記1',     // 訊息文字
              evt:'click'       // 訊息觸發事件
            }
          }
        ]
      }
    ]
  });
  $(this).attr("disabled",true);
});
// 路徑顯示控制
$('.add_route_display').click(function(){
  var $this = $(this),
      $icon = $this.find('i')
      route_key = $this.data('key');
  MapContainerAdd.ToggleRoute(route_key);
  iconControl($icon);
});
// 路徑標記顯示控制
$('.add_route_marker_display').click(function(){
  var $this = $(this),
      $icon = $this.find('i')
      route_key = $this.data('key');
  MapContainerAdd.ToggleRouteMarker(route_key);
  iconControl($icon);
});

var MapContainerPolyline = $('#map_canvas_polyline').mcMap({
  center: {               // 中心點位置
    x: '25.040893', 
    y: '121.515827'
  },
  polyline : 
  [
    {
      coords: [         // 折線點
        [25.05176, 121.54683],
        [25.05876, 121.55301],
        [25.05673, 121.56005]
      ],
      key:'折線1',      // 折線Key
      color: '#EA4F54', // 線顏色
      width: 5,         // 線寬
      opacity:1         // 透明度
    },
    {
      coords: [         // 折線點
        [25.02394, 121.552734],
        [25.041088, 121.576381]
      ],
      key:'折線2',      // 折線Key
      color: '#924CE8', // 線顏色
      width: 5,         // 線寬
      opacity:0.8       // 透明度
    }
  ]
});

var MapContainerMarker = $('#map_canvas_marker').mcMap({
  center: {               // 中心點位置
    x: '25.040893', 
    y: '121.515827'
  },
  marker:               // 標記
  [
    {
      position:{          //標記位置
        x:'25.042293', 
        y:'121.532736'
      },
      key:'標記1',
      title:'標記1',      // alt文字
      icon:markerImg, // 標記圖片
      infoWindow : {      // 訊息視窗
        text:'標記1',     // 訊息文字
        evt:'click'       // 訊息觸發事件
      }
    },
    {
      position:{          //標記位置
        x:'25.084899', 
        y:'121.524839'
      },
      key:'標記2',
      title:'標記2',      // alt文字
      icon:markerImg, // 標記圖片
      infoWindow : {      // 訊息視窗
        text:'標記2',     // 訊息文字
        evt:'click'       // 訊息觸發事件
      }
    }
  ]
});

var MapContainerRoute = $('#map_canvas_route').mcMap({
  center: {               // 中心點位置
    x: '25.040893', 
    y: '121.515827'
  },
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
          width: 5,
          opacity:1
        }
      ],
      marker:               // 標記
      [
        {
          position:{          //標記位置
            x:'24.993993', 
            y:'121.505013'
          },
          key:'路徑1-標記1',
          title:'路徑1-標記1',      // alt文字
          icon:markerImg, // 標記圖片
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
          icon:markerImg, // 標記圖片
          infoWindow : {      // 訊息視窗
            text:'路徑1-標記2',     // 訊息文字
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
            [25.021062,121.527758],
            [24.992904,121.540976],
            [24.998194,121.580029]
          ],
          key:'路徑2',
          color: '#749631',
          width: 5,
          opacity:1
        }
      ],
      marker:               // 標記
      [
        {
          position:{          //標記位置
            x:'25.021062', 
            y:'121.527758'
          },
          key:'路徑2-標記1',
          title:'路徑2-標記1',      // alt文字
          icon:markerImg, // 標記圖片
          infoWindow : {      // 訊息視窗
            text:'路徑2-標記1',     // 訊息文字
            evt:'click'       // 訊息觸發事件
          }
        },
        {
          position:{          //標記位置
            x:'24.998194', 
            y:'121.580029'
          },
          key:'路徑2-標記2',
          title:'路徑2-標記2',      // alt文字
          icon:markerImg, // 標記圖片
          infoWindow : {      // 訊息視窗
            text:'路徑2-標記2',     // 訊息文字
            evt:'click'       // 訊息觸發事件
          }
        }
      ]
    }
  ]
});

var MapContainer = $('#map_canvas_full').mcMap({
  onAfter : function(){   // 建立後處理
    console.log('後處理');
  },
  onBefore : function(){  // 建立前處理
    console.log('前處理');
  },
  center: {               // 中心點位置
    x: '25.040893', 
    y: '121.515827'
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
      color: '#EA4F54', // 線顏色
      width: 5,         // 線寬
      opacity:1         // 透明度
    },
    {
      coords: [         // 折線點
        [25.02394, 121.552734],
        [25.041088, 121.576381]
      ],
      key:'折線2',      // 折線Key
      color: '#924CE8', // 線顏色
      width: 5,         // 線寬
      opacity:0.8       // 透明度
    }
  ],
  marker:               // 標記
  [
    {
      position:{          //標記位置
        x:'25.042293', 
        y:'121.532736'
      },
      key:'標記1',
      title:'標記1',      // alt文字
      icon:markerImg, // 標記圖片
      infoWindow : {      // 訊息視窗
        text:'標記1',     // 訊息文字
        evt:'click'       // 訊息觸發事件
      }
    },
    {
      position:{          //標記位置
        x:'25.084899', 
        y:'121.524839'
      },
      key:'標記2',
      title:'標記2',      // alt文字
      icon:markerImg, // 標記圖片
      infoWindow : {      // 訊息視窗
        text:'標記2',     // 訊息文字
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
          width: 5,
          opacity:1
        }
      ],
      marker:               // 標記
      [
        {
          position:{          //標記位置
            x:'24.993993', 
            y:'121.505013'
          },
          key:'路徑1-標記1',
          title:'路徑1-標記1',      // alt文字
          icon:markerImg, // 標記圖片
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
          icon:markerImg, // 標記圖片
          infoWindow : {      // 訊息視窗
            text:'路徑1-標記2',     // 訊息文字
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
            [25.021062,121.527758],
            [24.992904,121.540976],
            [24.998194,121.580029]
          ],
          key:'路徑2',
          color: '#749631',
          width: 5,
          opacity:1
        }
      ],
      marker:               // 標記
      [
        {
          position:{          //標記位置
            x:'25.021062', 
            y:'121.527758'
          },
          key:'路徑2-標記1',
          title:'路徑2-標記1',      // alt文字
          icon:markerImg, // 標記圖片
          infoWindow : {      // 訊息視窗
            text:'路徑2-標記1',     // 訊息文字
            evt:'click'       // 訊息觸發事件
          }
        },
        {
          position:{          //標記位置
            x:'24.998194', 
            y:'121.580029'
          },
          key:'路徑2-標記2',
          title:'路徑2-標記2',      // alt文字
          icon:markerImg, // 標記圖片
          infoWindow : {      // 訊息視窗
            text:'路徑2-標記2',     // 訊息文字
            evt:'click'       // 訊息觸發事件
          }
        }
      ]
    }
  ]
});

// 折線顯示控制
$('.polyline').click(function(){
  var $this = $(this),
      $icon = $this.find('i')
      polyline_key = $this.data('key');
  MapContainerPolyline.TogglePolyline(polyline_key);
  iconControl($icon);
});
// 標記顯示控制
$('.marker').click(function(){
  var $this = $(this),
      $icon = $this.find('i')
      marker_key = $this.data('key');
  MapContainerMarker.ToggleMarker(marker_key);
  iconControl($icon);
});


// 路徑顯示控制
$('.route').click(function(){
  var $this = $(this),
      $icon = $this.find('i')
      route_key = $this.data('key');
  MapContainerRoute.ToggleRoute(route_key);
  iconControl($icon);
});
// 路徑標記顯示控制
$('.route_marker').click(function(){
  var $this = $(this),
      $icon = $this.find('i')
      route_key = $this.data('key');
  MapContainerRoute.ToggleRouteMarker(route_key);
  iconControl($icon);
});


// 折線顯示控制
$('.polyline_full').click(function(){
  var $this = $(this),
      $icon = $this.find('i')
      polyline_key = $this.data('key');
  MapContainer.TogglePolyline(polyline_key);
  iconControl($icon);
});
// 標記顯示控制
$('.marker_full').click(function(){
  var $this = $(this),
      $icon = $this.find('i')
      marker_key = $this.data('key');
  MapContainer.ToggleMarker(marker_key);
  iconControl($icon);
});
// 路徑顯示控制
$('.route_full').click(function(){
  var $this = $(this),
      $icon = $this.find('i')
      route_key = $this.data('key');
  MapContainer.ToggleRoute(route_key);
  iconControl($icon);
});
// 路徑標記顯示控制
$('.route_marker_full').click(function(){
  var $this = $(this),
      $icon = $this.find('i')
      route_key = $this.data('key');
  MapContainer.ToggleRouteMarker(route_key);
  iconControl($icon);
});
// icon顯示控制
var iconControl = function($icon){
  if ($icon.hasClass('icon-eye-open')) {
    $icon.removeClass('icon-eye-open').addClass('icon-eye-close');
  }
  else{
    $icon.removeClass('icon-eye-close').addClass('icon-eye-open');
  }
}


$('.code_display').click(function(){
  var $this = $(this),
      code_key = $this.data('key');
  $('.'+code_key).toggle('slow');
});
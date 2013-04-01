/**
 * **********************************************************
 * jQuery mcMap (jQuery Manage Control Map) v 1.0
 * **********************************************************
 * 
 * @修改日期(modify): 2013/03/30
 * @網址(url): http://code.kejyun.com/app/mcmap
 * @作者(Author):KeJyun Hong
 *  	動態管理在Google Map API地圖上的繪圖資訊
 *		
 * **********************************************************
 * [修改紀錄(changelog)]
 *	加入功能
 *		地圖初始化(MapContainer.init(option))
 *		路徑顯示控制(MapContainer.ToggleRoute(routeKey))
 *		路徑標記顯示控制(MapContainer.ToggleRouteMarker(routeKey))
 *		折線顯示控制(MapContainer.TogglePolyline(polylineKey))
 *		標記顯示控制(MapContainer.ToggleMarker(markerKey))
 *		新增折線(MapContainer.AddPolyline(option))
 *		新增標記(MapContainer.AddMarker(option))
 *		新增路徑(MapContainer.AddRoute(option))
 * **********************************************************
 */
(function ($) {
	'use strict';
	// GoogleMapFunc.prototype.
	$.fn.mcMap = function(option){
		// 地圖資料
		this.map = [];
		// 地圖繪圖資訊
		this.mapInfo = {
			Polyline : [],
			PolylineDisplay : [],
			PolylineKey : [],
			Marker : [],
			MarkerDisplay : [],
			MarkerKey : [],
			Route : [],
			RouteDisplay : [],
			RouteKey : []
		};
		// 容器
		var container = this,		//地圖物件
			mapPolyline = [],		//折線
			mapPolylineKey = [],	//折線Key
			opt,					//參數選項
			GoogleMapOptions;		//Google地圖參數選項
		/**
		 * 方法宣告
		 */
		var mapAPI = {
			MarkerEventBind : function(EventOpt , mark){
				var mapInfoWindow = new google.maps.InfoWindow({content: EventOpt.text});
				google.maps.event.addListener(mark, EventOpt.evt, function () {
					mapInfoWindow.open(container.map, mark);
				});
			}
		};
		// 繪製地圖
		this.drawMap = {
			// 折線
			Polyline : function(pline){
				var mapPoly = {
						line : [],
						key : []
					},
					keyCounter;
				if('undefined' !== typeof this.Polyline && this.Polyline.length > 0){
					// 原本有紀錄值
					keyCounter = this.Polyline.length+1;
				}
				else{
					keyCounter = 1;
				}
				for(var line in pline){
					if ('undefined' !== typeof pline[line].coords) {
						var coords = [] ,
							point = 0 ,
							c;
						// 轉換所有繪製點
						for (point in pline[line].coords) {
							c = pline[line].coords;
							if ('undefined' !== typeof c[point]) {
								coords.push(new google.maps.LatLng(c[point][0], c[point][1]));
							}
						}
						// 繪製折線
						mapPoly.line.push(new google.maps.Polyline({
							path: coords,
							strokeColor: pline[line].color || '#FF0000',	// 顏色
							strokeOpacity: pline[line].opacity || 1.0,		// 透明度
							strokeWeight: pline[line].width || 2,			// 粗細
							map: container.map								// 目標地圖
						}));
						// Key
						if ('undefined' !== typeof pline[line].key && ('string' === typeof pline[line].key || 'number' === typeof pline[line].key)) {
							mapPoly.key.push(pline[line].key);
						}
						else{
							mapPoly.key.push(keyCounter);
							keyCounter++;
						}
					}
				}
				return mapPoly;
			},
			Marker : function(markOpt){
				var MarkerOpt ,			// 標記預設選項
					mMark,				// 暫存標記紀錄
					mapMarker  = {		// 標記紀錄
						mark : [],
						key : []
					},
					keyCounter,
					infoWindowOpt,		// 訊息視窗預設選項
					mapInfoWindow,		// 訊息視窗紀錄
					infoWindowEvent,	// 訊息視窗事件
					IndexMapMarker;		// 標記索引
				if('undefined' !== typeof this.Marker && this.Marker.length > 0){
					// 原本有紀錄值
					keyCounter = this.Marker.length+1;
				}
				else{
					keyCounter = 1;
				}
				for(var mk in markOpt){
					if ('undefined' !== typeof markOpt[mk].position) {
						// 設定標記選項
						MarkerOpt = {
							position: new google.maps.LatLng(markOpt[mk].position.x, markOpt[mk].position.y),
							map: container.map,
							title: markOpt[mk].title || ""
						};
						if ('string' === typeof markOpt[mk].icon) {
							MarkerOpt.icon = markOpt[mk].icon;
						}
						// 產生標記
						mapMarker.mark.push(new google.maps.Marker(MarkerOpt));
						// 設定視窗訊息
						if ('object' === typeof markOpt[mk].infoWindow && markOpt[mk].infoWindow.text.length > 0) {
							infoWindowOpt = {
								text : markOpt[mk].infoWindow.text,
								evt : markOpt[mk].infoWindow.evt || 'click'
							};
							// 綁定訊息視窗事件
							mapAPI.MarkerEventBind(infoWindowOpt , mapMarker.mark[mapMarker.mark.length-1]);
						}
						// Key
						if ('undefined' !== typeof markOpt[mk].key && ('string' === typeof markOpt[mk].key || 'number' === typeof markOpt[mk].key)) {
							mapMarker.key.push(markOpt[mk].key);
						}
						else{
							mapMarker.key.push(keyCounter);
							keyCounter++;
						}
					}
				}
				return mapMarker;
			}
		};
		// 切換繪圖顯示
		this.toggleDraw = {
			// 折線
			Polyline : function(lineKey){
				if ('undefined' !== typeof lineKey && ('string' === typeof lineKey || 'number' === typeof lineKey)) {
					var index = container.mapInfo.PolylineKey.indexOf(lineKey);
					if (index !== -1) {
						var display = container.mapInfo.PolylineDisplay[index];
						// 變更顯示
						container.mapInfo.PolylineDisplay[index] = display ? 0 : 1;
						display = container.mapInfo.PolylineDisplay[index];
						container.mapInfo.Polyline[index].set('strokeOpacity',display);
					}
				}
			},
			// 標記
			Marker : function(markerKey){
				if ('undefined' !== typeof markerKey && ('string' === typeof markerKey || 'number' === typeof markerKey)) {
					var index = container.mapInfo.MarkerKey.indexOf(markerKey);
					if (index !== -1) {
						var display = container.mapInfo.MarkerDisplay[index];
						// 變更顯示
						container.mapInfo.MarkerDisplay[index] = display ? 0 : 1;
						display = container.mapInfo.MarkerDisplay[index] ? container.map : null;
						container.mapInfo.Marker[index].setMap(display);
					}
				}
			},
			// 路徑
			Route : function(routeKey){
				if ('undefined' !== typeof routeKey && ('string' === typeof routeKey || 'number' === typeof routeKey)) {
					var index = container.mapInfo.RouteKey.indexOf(routeKey),
						display,
						setMark,
						p, mk;
					if (index !== -1) {
						display = container.mapInfo.RouteDisplay[index];
						// 變更顯示
						container.mapInfo.RouteDisplay[index] = display ? 0 : 1;
						display = container.mapInfo.RouteDisplay[index];
						// 折線
						if('undefined' !== typeof container.mapInfo.Route[index].PolylineKey && container.mapInfo.Route[index].PolylineKey.length > 0){
							for(p in container.mapInfo.Route[index].Polyline){
								container.mapInfo.Route[index].Polyline[p].set('strokeOpacity',display);
								container.mapInfo.Route[index].PolylineDisplay[p] = display;
							}
						}
						// 標記
						container.toggleDraw.RouteMarker(routeKey, display);
					}
				}
			},
			// 路徑標記
			RouteMarker : function(routeKey , assignDisplay){
				if ('undefined' !== typeof routeKey && ('string' === typeof routeKey || 'number' === typeof routeKey)) {
					var index = container.mapInfo.RouteKey.indexOf(routeKey),
						display,
						mk;
					if (index !== -1) {
						// 標記
						if('undefined' !== typeof container.mapInfo.Route[index].MarkerKey && container.mapInfo.Route[index].MarkerKey.length > 0){
							for(mk in container.mapInfo.Route[index].Marker){
								if('undefined' !== typeof assignDisplay){
									// 有傳入指定顯示方式
									display = assignDisplay ? container.map : null;
									container.mapInfo.Route[index].Marker[mk].setMap(display);
									container.mapInfo.Route[index].MarkerDisplay[mk] = display;
								}
								else{
									display = container.mapInfo.Route[index].MarkerDisplay[mk];
									// 變更顯示
									container.mapInfo.Route[index].MarkerDisplay[mk] = display ? 0 : 1;
									display = container.mapInfo.Route[index].MarkerDisplay[mk] ? container.map : null;
									container.mapInfo.Route[index].Marker[mk].setMap(display);
								}
							}
						}
					}
				}
			}
		};
		// 紀錄繪製結果
		this.recordDraw = {
			// 折線 : Polyline
			Polyline : function(mpline){
				if ('undefined' !== typeof mpline && 'object' === typeof mpline) {
					// 記錄折線資訊及顯示控制
					for(var l in mpline.line){
						if ('undefined' !== typeof mpline.line[l] && 'object' === typeof mpline.line[l]) {
							container.mapInfo.Polyline.push(mpline.line[l]);
							container.mapInfo.PolylineDisplay.push(1);
						}
					}
					// 紀錄Key
					for(var k in mpline.key){
						if ('undefined' !== typeof mpline.key[k] && ('string' === typeof mpline.key[k] || 'number' === typeof mpline.key[k])) {
							container.mapInfo.PolylineKey.push(mpline.key[k]);
						}
					}
				}
			},
			// 標記 : Marker
			Marker : function(mmarker){
				if ('undefined' !== typeof mmarker && 'object' === typeof mmarker) {
					// 記錄折線資訊及顯示控制
					for(var mk in mmarker.mark){
						if ('undefined' !== typeof mmarker.mark[mk] && 'object' === typeof mmarker.mark[mk]) {
							container.mapInfo.Marker.push(mmarker.mark[mk]);
							container.mapInfo.MarkerDisplay.push(1);
						}
					}
					// 紀錄Key
					for(var k in mmarker.key){
						if ('undefined' !== typeof mmarker.key[k] && ('string' === typeof mmarker.key[k] || 'number' === typeof mmarker.key[k])) {
							container.mapInfo.MarkerKey.push(mmarker.key[k]);
						}
					}
				}
			},
			// 路徑 : Route
			Route : function(mroute){
				if ('undefined' !== typeof mroute && 'object' === typeof mroute) {
					// 路徑資訊
					var routeInfo = {
						Polyline : [],
						PolylineDisplay : [],
						PolylineKey : [],
						Marker : [],
						MarkerDisplay : [],
						MarkerKey : []
					};
					var k, l, mk;
					// 折線
					if ('undefined' !== typeof mroute.mpline && 'object' === typeof mroute.mpline) {
						// 記錄折線資訊及顯示控制
						for(l in mroute.mpline.line){
							if ('undefined' !== typeof mroute.mpline.line[l] && 'object' === typeof mroute.mpline.line[l]) {
								routeInfo.Polyline.push(mroute.mpline.line[l]);
								routeInfo.PolylineDisplay.push(1);
							}
						}
						// 紀錄Key
						for(k in mroute.mpline.key){
							if ('undefined' !== typeof mroute.mpline.key[k] && ('string' === typeof mroute.mpline.key[k] || 'number' === typeof mroute.mpline.key[k])) {
								routeInfo.PolylineKey.push(mroute.mpline.key[k]);
							}
						}
					}
					// 標記
					if ('undefined' !== typeof mroute.mmarker && 'object' === typeof mroute.mmarker) {
						// 記錄折線資訊及顯示控制
						for(mk in mroute.mmarker.mark){
							if ('undefined' !== typeof mroute.mmarker.mark[mk] && 'object' === typeof mroute.mmarker.mark[mk]) {
								routeInfo.Marker.push(mroute.mmarker.mark[mk]);
								routeInfo.MarkerDisplay.push(1);
							}
						}
						// 紀錄Key
						for(k in mroute.mmarker.key){
							if ('undefined' !== typeof mroute.mmarker.key[k] && ('string' === typeof mroute.mmarker.key[k] || 'number' === typeof mroute.mmarker.key[k])) {
								routeInfo.MarkerKey.push(mroute.mmarker.key[k]);
							}
						}
					}
					// 紀錄路徑資訊
					container.mapInfo.Route.push(routeInfo);
					container.mapInfo.RouteDisplay.push(1);
					// Key
					if ('undefined' !== typeof mroute.key && 'string' === typeof mroute.key) {
						container.mapInfo.RouteKey.push(mroute.key);
					}
					else{
						container.mapInfo.RouteKey.push(container.mapInfo.Route.length);
					}
				}
			}
		};
		// 設定參數選項
		this.setOpt = function(option){
			var targetOpt;
			if ('undefined' === typeof opt || opt.length === 0) {
				// 未設定參數
				targetOpt = {
					onAfter : function(){},	// 建構子
					onBefore : function(){},// 解構子
					center: {x: '25.05673992011185', y: '121.56005178833004'},	// 中心點位置
					zoom: 12,	// 縮放大小
					control: true,
					draggable: true,		// 是否可以拖曳
					mapTypeId: 'ROADMAP',	// 地圖類型
					mapTypeControl: true,	// 地圖類型控制
					polyline : {},			// 折線
					route:{},				// 路徑群組
					marker:{}				// 標記
				};
			}
			else{
				targetOpt = opt;
			}
			opt = $.extend( targetOpt , option);
		};
		// 設定地圖參數選項
		this.setGoogleMapOpt = function(){
			// Google Map 控制選項
			GoogleMapOptions = {
				center: new google.maps.LatLng(opt.center.x, opt.center.y),
				control: opt.control,
				draggable: opt.draggable,
				zoom: opt.zoom,
				mapTypeId: google.maps.MapTypeId[opt.mapTypeId.toUpperCase()],
				mapTypeControl: opt.mapTypeControl
			};
		};
		// 初始化
		this.init = function(){
			var lineDraw ,
				markDraw ,
				routeDraw ,
				m ,
				r ;
			// 建立地圖
			if (('undefined' === typeof this.map || 'object' === typeof this.map) && this.map.length===0) {
				this.map = new google.maps.Map($(container).get(0), GoogleMapOptions);
			}

			// 非路徑:折線
			if ('undefined' !== typeof opt.polyline && 'object' === typeof opt.polyline && opt.polyline.length > 0) {
				lineDraw = this.drawMap.Polyline.call(this.mapInfo, opt.polyline);
				// 紀錄繪製點
				this.recordDraw.Polyline(lineDraw);
				opt.polyline = {};
			}
			// 非路徑:標記
			if ('undefined' !== typeof opt.marker && 'object' === typeof opt.marker && opt.marker.length > 0) {
				markDraw = this.drawMap.Marker.call(this.mapInfo, opt.marker);
				this.recordDraw.Marker(markDraw);
				opt.marker = {};
			}
			// 路徑
			if ('undefined' !== typeof opt.route && 'object' === typeof opt.route && opt.route.length > 0) {
				for(r in opt.route){
					routeDraw = {
						mpline : [],	// 折線
						mmarker : []	// 標記
					};
					// 折線
					if ('undefined' !== typeof opt.route[r].polyline && 'object' === typeof opt.route[r].polyline && opt.route[r].polyline.length > 0) {
						routeDraw.mpline = this.drawMap.Polyline.call(this.mapInfo.Route, opt.route[r].polyline);
					}
					// 標記
					if ('undefined' !== typeof opt.route[r].marker && 'object' === typeof opt.route[r].marker && opt.route[r].marker.length > 0) {
						routeDraw.mmarker = this.drawMap.Marker.call(this.mapInfo.Route, opt.route[r].marker);
					}
					// key
					if ('undefined' !== typeof opt.route[r].key && 'string' === typeof opt.route[r].key) {
						routeDraw.key = opt.route[r].key;
					}
					// 紀錄路徑
					this.recordDraw.Route(routeDraw);
				}
				opt.route = {};
			}

		};
		// 路徑顯示控制
		this.ToggleRoute = function(routeKey){
			this.toggleDraw.Route(routeKey);
		};
		// 路徑標記顯示控制
		this.ToggleRouteMarker = function(routeKey){
			this.toggleDraw.RouteMarker(routeKey);
		};
		// 折線顯示控制
		this.TogglePolyline = function(lineKey){
			this.toggleDraw.Polyline(lineKey);
		};
		// 標記顯示控制
		this.ToggleMarker = function(markerKey){
			this.toggleDraw.Marker(markerKey);
		};
		// 新增折線
		this.AddPolyline = function (option){
			this.setOpt(option);
			var lineDraw;
			// 非路徑:折線
			if ('undefined' !== typeof opt.polyline && 'object' === typeof opt.polyline && opt.polyline.length > 0) {
				lineDraw = this.drawMap.Polyline.call(this.mapInfo, opt.polyline);
				// 紀錄繪製點
				this.recordDraw.Polyline(lineDraw);
				opt.polyline = {};
			}
		};
		// 新增標記
		this.AddMarker = function (option){
			this.setOpt(option);
			var markDraw;
			// 非路徑:標記
			if ('undefined' !== typeof opt.marker && 'object' === typeof opt.marker && opt.marker.length > 0) {
				markDraw = this.drawMap.Marker.call(this.mapInfo, opt.marker);
				this.recordDraw.Marker(markDraw);
				opt.marker = {};
			}
		};
		// 新增路徑
		this.AddRoute = function (option){
			this.setOpt(option);
			var r, routeDraw;
			// 路徑
			if ('undefined' !== typeof opt.route && 'object' === typeof opt.route && opt.route.length > 0) {
				for(r in opt.route){
					routeDraw = {
						mpline : [],	// 折線
						mmarker : []	// 標記
					};
					// 折線
					if ('undefined' !== typeof opt.route[r].polyline && 'object' === typeof opt.route[r].polyline && opt.route[r].polyline.length > 0) {
						routeDraw.mpline = this.drawMap.Polyline.call(this.mapInfo.Route, opt.route[r].polyline);
					}
					// 標記
					if ('undefined' !== typeof opt.route[r].marker && 'object' === typeof opt.route[r].marker && opt.route[r].marker.length > 0) {
						routeDraw.mmarker = this.drawMap.Marker.call(this.mapInfo.Route, opt.route[r].marker);
					}
					// key
					if ('undefined' !== typeof opt.route[r].key && 'string' === typeof opt.route[r].key) {
						routeDraw.key = opt.route[r].key;
					}
					// 紀錄路徑
					this.recordDraw.Route(routeDraw);
				}
				opt.route = {};
			}
		};
		// 設定參數選項
		this.setOpt(option);
		// 設定Google地圖參數選項
		this.setGoogleMapOpt();
		// 處理前
		if (opt.onBefore && typeof opt.onBefore ==='function') {
			opt.onBefore();
		}
		/**
		 * 程式處理
		 */
		this.init();
		// 處理後
		if (opt.onAfter && typeof opt.onAfter ==='function') {
			opt.onAfter();
		}
		return this;
	};
}(jQuery));

myView.controller('popupcompCtrl', ["$scope", "$rootScope", "appService", "$sce", function ($scope, $rootScope, appService, $sce) {
    
    $scope.state = {};
    $scope.popupOn = false;
    $scope.autoClose = 0;
    var CONFIG_DATA;
    var disablePopupClick = false;

    $scope.fetchComponentData = function (strCompId) {
        CONFIG_DATA = appService.getConfigData().data[strCompId];        
    };

    $scope.initComp = function (strCompId) {
        $scope.state = CONFIG_DATA[$scope.contentid];
        $scope.hideHeader = $scope.state.hideHeader || false;        
        $scope.type = $scope.state.type; 
        $scope.headerText = $scope.state.headerText || '';       
        $scope.textContent = $sce.trustAsHtml($scope.state.textContent) || '';
        $scope.imageCaption = $scope.state.imageCaption || '';
        if($scope.dynamicpopuptext) {
            $scope.textContent = $scope.dynamicpopuptext;
        }
        $scope.imagePath = $scope.state.imagePath;
        $scope.imageHeight = $scope.state.imageHeight || 100;
        $scope.imageWidth = $scope.state.imageWidth || 150;            
        $scope.audioPath = $scope.state.audioPath || '';
        $scope.hideClose  = $scope.state.hideClose || false;
        $scope.containerDiv = $scope.state.container || '';  
        $scope.confirmBtns = $scope.state.confirmBtns || false;
        $scope.okTxt = $scope.state.okTxt || "ok";
        $scope.cancelTxt = $scope.state.cancelTxt || "cancel";
        if($scope.state.autoClose) {
            $scope.autoClose = $scope.state.autoClose * 1000;
        } else {
            $scope.autoClose = 0;
        }
    }

    $scope.closePopup = function (e) {
        $scope.popupOn = false;
        $scope.$emit("popupClosed", $scope.contentid);
    };

    $scope.closeBtnClick = function() {
        if(disablePopupClick == true) {
            return;
        }        
        $scope.closePopup();
    };

    $scope.cancelClick = function() {
        if(disablePopupClick == true) {
            return;
        }        
        $scope.closePopup();
    };

    $scope.okClick = function() {
		if($scope.contentid.indexOf("_")){
			$scope.contentid= $scope.contentid.split('_');
			$scope.contentid = $scope.contentid[0];
		}
        if(disablePopupClick == true) {
            return;
        }        
        $scope.popupOn = false;
        $scope.$emit("popupConfirm", $scope.contentid);
    };

    $scope.$on('closePopup', function(e) {
        $scope.popupOn = false;
    });

    $scope.$on("showPopup", function(evt, type, txt) {        
        if(type && CONFIG_DATA[type]) {
            $scope.contentid = type;            
        } else {
            console.warn('Popup data not found. Check JSON. Type --- ', type);
            return;
        }
        if(txt) {
            $scope.dynamicpopuptext = txt;
        }
        $scope.initComp();
        $scope.popupOn = true;
        if(($scope.popupOn == true) && ($scope.autoClose > 0)) {
            $timeout(function (argument) {
                $scope.closePopup();
            }, $scope.autoClose);
        }
        if($scope.containerDiv) {
            $(".popupParent").appendTo($scope.containerDiv);
        }            
    });

    $scope.$on("togglepopup", function(evt, type, txt) {        
        if(type && CONFIG_DATA[type]) {
            $scope.contentid = type;            
        } else {
            console.warn('Popup data not found. Check JSON. Type --- ', type);
            return;
        }
        if(txt) {
            $scope.dynamicpopuptext = txt;
        }
        $scope.initComp();
        $scope.popupOn = !$scope.popupOn;
        if(($scope.popupOn == true) && ($scope.autoClose > 0)) {
            $timeout(function (argument) {
                $scope.closePopup();
            }, $scope.autoClose);
        }
        if($scope.containerDiv) {
            $(".popupParent").appendTo($scope.containerDiv);
        }            
    });

    $scope.$on("disablePopupClicks", function() {
        disablePopupClick = true;
    });

    $scope.$on("enablePopupClicks", function() {
        disablePopupClick = false;
    });
    
}]);
myView.directive('popupcompDirective', function () {

    return {

        retrict: "E",

        replace: true,

        scope: { },

        controller: "popupcompCtrl",

        templateUrl: "templates/popupcompTemplate.html",

        link: function (scope, el, attrs) {            
            if(attrs.id) {
                scope.fetchComponentData(attrs.id);
                scope.compId = attrs.id;                
            } else {
                console.log("Provide id and json to component");
            } 
        }

    };

});
myView.controller('audioplayerCtrl', ["$scope", "$rootScope", "appService", "$timeout", function ($scope, $rootScope, appService, $timeout) {
    
    $scope.state = null;
    $scope.lang = "en";
    $scope.audioType = "audio/mp3";
    
    $scope.audioSrc = null;
    
    $scope.active = true;
    $scope.playingState = false;    // playingState is used to show/hide play button or pause button
    $scope.pauseState = false;      
    $scope.replyState = false;

    $scope.source = "";
    $scope.sourceArr = [];
    $scope.sourceIndex = 0;

    $scope.endCallback = null;
    $scope.audioCurrentTime = 0;
    
    $scope.fetchComponentData = function (strCompId) {
        $scope.state = appService.getConfigData().data[strCompId];
        $scope.lang = appService.getConfigData().language || "en";
        var str = appService.getConfigData().type || "mp3";
        $scope.audioType = "audio/" + str;
        $scope.source = $scope.state["default"] ? $scope.state["default"] : "";
        $scope.preCacheAudio();
    };

    $scope.preCacheAudio = function() {
        
        for(var key in $scope.state) {
            if($scope.state[key][$scope.lang]) {
                preloadAudio($scope.state[key][$scope.lang]);
            }
        }

        function preloadAudio(url) {
            var audio = new Audio();
            // once this file loads, it will call loadedAudio()
            // the file will be kept by the browser as cache
            audio.addEventListener('canplaythrough', loadedAudio, false);
            audio.src = url;
        }           
        
        function loadedAudio() {         
            //console.log("Loaded ----> ", this);
        }
    };

    $scope.initComp = function() {

    };

    // On click of play button
    $scope.playAudio =function(){
        //$scope.stopAudio();
        $scope.audioControl.src = $scope.source;                
        if($scope.audioControl) {                            
            
            $scope.audioControl.currentTime = $scope.audioCurrentTime;
            // $scope.audioControl.load(); 
            try{
                $scope.audioControl.play();
                $scope.playingState = true;
                $scope.pauseState = false;
                $scope.replyState = true;
                $scope.active = false;  
                
                if($scope.audioControl.paused){
                    $scope.audioEndHandler();
                };
                $scope.$emit("audioStarted", $scope.audioSrc, $scope.endCallback);  
            }
            catch(err){
                debugger;
                /*console.log("audio error");
                $scope.audioControl.currentTime = 0;
                $scope.playingState = false;
                $scope.pauseState = false;
                $scope.replyState = false;
                $scope.active = true;*/
            }
        }
    };

    // On click of pause button
    $scope.pauseAudio = function(){
         $scope.playingState = false;
         $scope.pauseState = true;
         $scope.replyState = true;
         $scope.audioControl.pause();
         $scope.active = true;  
         $scope.audioCurrentTime = $scope.audioControl.currentTime;
     };

    // On click of replay button
    $scope.replayAudio = function(){
        // $scope.audioControl.currentTime = 0;
        $scope.playAudio();       
    };

    $scope.stopAudio = function() {
        if($scope.audioControl){
            
            // $scope.audioControl.currentTime = 0;
            $scope.playingState = false;
            $scope.pauseState = false;
            $scope.replyState = false;
            $scope.active = true;
            $scope.audioControl.src = "";
            //$scope.audioCurrentTime = 0;
            $scope.$emit("audioStop", $scope.audioSrc);
            // if (!$scope.$$phase) {
            //     $scope.$apply();
            // }
            $scope.audioControl.pause();
        }
    }

    $scope.$on("playAudio", function(evt, data, callback) {        
        if(!$scope.active) {
            return;
        }         
        $scope.triggerAudio(data, callback);       
    });

    $scope.triggerAudio = function(data, callback) {        
        if($scope.state && $scope.state[data]) {            
            $scope.audioSrc = data;
            $scope.source = $scope.state[$scope.audioSrc][$scope.lang];
        } else {
            $scope.audioSrc = data;
            $scope.source = data;
        }        
        if(callback) {
            $scope.endCallback = callback;
        } else {
            $scope.endCallback = null;
        }         
        $scope.playAudio(); 
    };

    $scope.$on("pauseAudio", function(evt, data) {        
        $scope.pauseAudio();
    });

    $scope.$on("replayAudio", function(evt, data) {        
        $scope.replayAudio();
    });

    $scope.$on("stopAudio", function(){
        $scope.sourceArr = [];
        $scope.stopAudio();
    });

    $scope.$on("playAudioArray", function(evt, data, callback){
        if(!$scope.active) {
            return;
        }
        $scope.sourceArr = data;
        $scope.sourceIndex = 0; 
        $scope.arrCallback = callback;

        var cb = $scope.arrCallback;
        if(cb && cb.arrIndex >= 0 && $scope.sourceIndex != cb.arrIndex) {
            cb = null;
        }         
        $scope.triggerAudio($scope.sourceArr[$scope.sourceIndex], cb);

    });
    
}]);
myView.directive('audioplayerDirective', function () {

    return {

        retrict: "EA",

        replace: true,

        scope: {},

        controller: "audioplayerCtrl",

        templateUrl: "templates/audioplayerTemplate.html",

        link: function (scope, elem, attrs) {            
            if(attrs.id) {
                scope.fetchComponentData(attrs.id);
                scope.compId = attrs.id;
                scope.audioControl = elem.find("#audioTag")[0];
                               
                scope.$watch('source',function(){
                   // console.log("MP3=> "+scope.source);
                    // scope.audioControl = angular.element(scope.element.children()[0])[0];
                    // scope.init();
                });

                elem.ready(function(){
                    scope.initComp();
                });
                
                scope.audioControl.addEventListener("timeupdate", function (e) {
                    var currentTime = scope.audioControl.currentTime.toFixed(1);
                    currentTime = parseFloat(currentTime);
                    var duration = scope.audioControl.duration.toFixed(2);
                    duration = parseFloat(duration);
                    if(currentTime >= duration){                        
                        scope.playingState = false;
                        scope.pauseState = false;
                        scope.replyState = false;
                        scope.$apply();
                    }
                }, false);

                // On Audio finish ....
                scope.audioControl.addEventListener("ended",function(evt){ 
                    scope.audioEndHandler();
                });

                // scope.audioControl.addEventListener("loadeddata", function(evt) {
                //     this.play(); 
                //     if(this.paused){
                //         scope.audioEndHandler();
                //     };
                // });

                scope.audioControl.addEventListener("error", function(evt) {                      
                    if($(evt.target).attr("src") != "") {                       
                        scope.audioEndHandler();
                    }
                });

                scope.audioEndHandler = function() {
                    // scope.audioControl.currentTime = 0;
                    scope.playingState = false;
                    scope.pauseState = false;
                    scope.replyState = false;
                    scope.active = true;
                    scope.audioControl.src = "";
                    scope.$emit("audioEnd", scope.audioSrc, scope.endCallback);
                    scope.audioCurrentTime = 0;
                    if(scope.sourceArr.length >= 0) {
                        scope.sourceIndex++;
                    }
                    scope.$apply();
                    
                    if(scope.sourceIndex < scope.sourceArr.length) {
                        var cb = scope.arrCallback;
                        if(cb && cb.arrIndex >= 0 && scope.sourceIndex != cb.arrIndex) {
                            cb = null;
                        }                        
                        scope.triggerAudio(scope.sourceArr[scope.sourceIndex], cb);
                    }            
                    if(scope.sourceIndex >= scope.sourceArr.length) {
                        scope.sourceArr = [];
                    }
                };

            } else {
                console.log("Provide id and json to component");
            }
        }
    };

});
myView.controller('closecaptionsCtrl', ["$scope", "$rootScope", "appService", "$timeout", function ($scope, $rootScope, appService, $timeout) {
    
    $scope.state = {};
    $scope.showCaption= false;
    $scope.captionText = "";
    $scope.lang = "en";    
    
    $scope.fetchComponentData = function (strCompId) {
        $scope.state = appService.getConfigData().data[strCompId];
        $scope.lang = appService.getConfigData().language || "en";
    };

    $scope.initComp = function() {

    };

    $scope.$on("showCaption", function(evt, data, dynamicTxt) {       
        if($scope.state && $scope.state[data]) {
            $scope.captionText = $scope.state[data][$scope.lang];            
        }
        if(dynamicTxt) {
            $scope.captionText = $scope.captionText + dynamicTxt;
        }
        if($scope.captionText != "") {            
            $scope.showCaption = true;
        }
    });

    $scope.$on("hideCaption", function(evt, data, time){        
        if(!$scope.showCaption) {
            return;
        }
        if(time) {
            $timeout(function() {
                $scope.captionText = "";
                $scope.showCaption = false;
            }, time);
        } else {
            $scope.captionText = "";
            $scope.showCaption = false;
        }
        
    });
    
}]);
myView.directive('closecaptionsDirective', function () {

    return {

        retrict: "E",

        replace: true,

        scope: true,

        controller: "closecaptionsCtrl",

        templateUrl: "templates/closecaptionsTemplate.html",

        link: function (scope, el, attrs) {            
            if(attrs.id) {
                scope.fetchComponentData(attrs.id);
                scope.compId = attrs.id;
                el.ready(function(){
                    scope.initComp();
                });
            } else {
                console.log("Provide id and json to component");
            } 
        }

    };

});
myView.controller("dndcompCtrl", ["$scope", "appService", "APPCONSTANT", "$timeout", function($scope, appService, APPCONSTANT, $timeout) {

        var dragItems = {};
        var dropTargets = {};
        var containerDims = {};
        var objectDims = {};
        var dragStartPos = { x: 0, y: 0 };
        var depth = 10;
        var scalingFactor = 1;
        var applyScaleFix = false;

        $scope.$on(APPCONSTANT.ACTIVITY_LOADED, function() {
            if($scope.state && $scope.state.scaleFix && ($scope.tabIndex == $scope.state.tabIndex)) {
                applyScaleFix = true;
                scalingFactor = $($scope.state.scaleFix.parent).height()/ $($scope.state.scaleFix.content).height();
                $.ui.ddmanager.prepareOffsets = function(t, event) {
                    var i, j, m = $.ui.ddmanager.droppables[t.options.scope] || [],
                        type = event ? event.type : null,
                        list = (t.currentItem || t.element).find(":data(ui-droppable)").addBack();
                    droppablesLoop: for (i = 0; i < m.length; i++) {
                        if (m[i].options.disabled || (t && !m[i].accept.call(m[i].element[0], (t.currentItem || t.element)))) {
                            continue;
                        }
                        for (j = 0; j < list.length; j++) {
                            if (list[j] === m[i].element[0]) {
                                m[i].proportions().height = 0;
                                continue droppablesLoop;
                            }
                        }
                        m[i].visible = m[i].element.css("display") !== "none";
                        if (!m[i].visible) {
                            continue;
                        }
                        if (type === "mousedown") {
                            m[i]._activate.call(m[i], event);
                        }
                        m[i].offset = m[i].element.offset();
                        m[i].proportions({
                            width: m[i].element[0].offsetWidth * scalingFactor,
                            height: m[i].element[0].offsetHeight * scalingFactor
                        });
                    }
                };
            }
        });

        /**
        * This is called from drag and drop directive
        * used to get state of drag and drop component.
        **/
        $scope.fetchComponentData = function (strId) {
            $scope.state = appService.getConfigData().data[strId];
        }

        /**
         * methd initDnD invoked when controller init itself
         * @param {Object} objInitData dnd data
         * @return none
         */
        $scope.initDnD = function (id) {
            var data = {
                "dndcompJson" : $scope.state
            };

            $scope.$emit("DnDInitialized", data);
        };

        /**
         * Each Drag item register itself with its controller
         */
        $scope.registerDragItems = function (el, attrs) {
            var obj = {};
            obj.id = el[0].id;
            obj.pos = {};
            obj.pos.left = el[0].getBoundingClientRect().left;
            obj.pos.top = el[0].getBoundingClientRect().top;
            dragItems[el[0].id] = obj;
        };

        /**
         * Each Drag item register itself with its controller
         */
        $scope.registerDropTargets = function (el, attrs) {
            var obj = {};
            obj.id = el[0].id;
            obj.pos = {};
            obj.pos.left = el[0].getBoundingClientRect().left;
            obj.pos.top = el[0].getBoundingClientRect().top;
            dropTargets[el[0].id] = obj;
        };

        /**
         * Invoked everytime when dragging start
         * param {Object} event
         * param {Object} ui jquery drag object
         * return {none}
         */
        $scope.onItemDragStart = function (event, ui, optionObj) {
            if(applyScaleFix && optionObj && optionObj.containment) {
                ui.position.left = 0;
                ui.position.top = 0;

                containerDims = {};
                containerDims.width = $(optionObj.containment).width();
                containerDims.height = $(optionObj.containment).height();
                objectDims = {};
                objectDims.width = $(event.target).outerWidth();
                objectDims.height = $(event.target).outerHeight();
            }

            //angular.element(event.target).css('z-index', depth++);

            var data = {
                "event": event,
                "ui": ui,
                "optionObj":optionObj
            };

            $scope.$emit("ItemDragStarted", data);
        };

        /**
         * Invoked everytime when dragging
         * param {Object} event
         * param {Object} ui jquery drag  object
         * return {none}
         * Can not emit at the time of dragging as there will be many emits.
         */
        $scope.onItemDrag = function (event, ui, optionObj) {
            if(applyScaleFix && optionObj && optionObj.containment) {
                var
                boundReached = false,
                scale = scalingFactor,
                changeLeft = ui.position.left - ui.originalPosition.left,
                newLeft = ui.originalPosition.left + changeLeft / scale,
                changeTop = ui.position.top - ui.originalPosition.top,
                newTop = ui.originalPosition.top + changeTop / scale;

                ui.position.left = newLeft;
                ui.position.top = newTop;

                if (ui.position.left > (containerDims.width - objectDims.width)) {
                    newLeft = (containerDims.width - objectDims.width)
                    boundReached = true;
                }

                // left bound check
                if (newLeft < 0) {
                    newLeft = 0;
                    boundReached = true;
                }

                // bottom bound check
                if (ui.position.top > (containerDims.height - objectDims.height)) {
                    newTop = (containerDims.height - objectDims.height)
                    boundReached = true;
                }

                // top bound check
                if (newTop < 0) {
                    newTop = 0;
                    boundReached = true;
                }

                // fix position
                ui.position.left = newLeft;
                ui.position.top = newTop;

                // inside bounds
                if (!boundReached) {
                    // do stuff when element is dragged inside bounds
                }
            }

            var data = {
                "event": event,
                "ui": ui,
                "optionObj":optionObj
            };

            $scope.$emit("ItemDragging", data);
        }

        /**
         * Invoked everytime when dragging stop
         * param {Object} event
         * param {Object} ui jquery drag object
         * return {none}
         */
        $scope.onItemDragStop = function (event, ui, optionsObj) {
            var data = {
                "event": event,
                "ui": ui,
                "optionsObj":optionsObj
            };

            $scope.$emit("ItemDragStopped", data);
        };

        /**
         * Invoked when drop event triggred
         * @param {Object} event drop event reference
         * @param {Object} ui jqueryUI
         * @return {NONE}
         */
        $scope.onItemDrop = function (event, ui, optionsObj) {

            var data = {
                "event": event,
                "ui": ui,
                "optionsObj":optionsObj
            };
            if(!$(ui.draggable).hasClass('droppedItem')) {
                $scope.$emit("ItemDropped", data);
                $(event.target).find('[draggable-directive]').addClass('droppedItem');
            } else {
                $scope.$emit("againDropped", data);
            }
        };

        /**
         * Invoked when drag element is over the drop element
         * @param {Object} event drop event reference
         * @param {Object} ui jqueryUI
         * @return {NONE}
         */
        $scope.onItemDragOver = function(event,ui){
            var data = {
                "event": event,
                "ui": ui
            };

            $scope.$emit("ItemDraggedOver", data);
        }

         /**
         * Invoked everytime when dragging out
         * param {Object} event
         * param {Object} ui jquery drag out object
         * return {none}
         */
        $scope.onItemDragOut = function (event, ui) {
            var data = {
                "event": event,
                "ui": ui
            };

            $scope.$emit("ItemDraggedOut", data);
        };

        $scope.$on("initDragOnDrop", function(event, data){
            if($scope.state.dragAfterDrop) {
                var elem = $(data.event.target).find('[draggable-directive]');
                if(data.isResizable) {
                    elem = $(data.event.target).find('[draggable-directive]').parent();
                }
                $(data.event.target).find('[draggable-directive]').removeAttr('draggable-directive');
                elem.draggable($scope.state.dragAfterDrop);
                elem.draggable("option", {
                    start: function (event, ui) {
                        $scope.onItemDragStart(event, ui, $scope.state.customDragOptionsDropped);
                    },
                    drag : function(event,ui)  {
                        $scope.onItemDrag(event, ui, $scope.state.customDragOptionsDropped);
                    },
                    stop: function (event, ui) {
                        $scope.onItemDragStop(event, ui, $scope.state.customDragOptionsDropped);
                    }
                });
            }
        });

        $scope.$on('initResizeOnDrop', function(event, data) {
            if($scope.state.resizeAfterDrop) {
                data.isResizable = true;
                var elem = $(data.event.target).find("[draggable-directive]");
                elem.resizable($scope.state.resizeAfterDrop);
                elem.resizable("option", {
                    start: function(event, ui) {
                        $scope.onResizeStart(event, ui);
                    },
                    resize: function(event, ui) {
                        $scope.onResize(event, ui);
                    }
                });
            }
        });

        $scope.onResizeStart = function(event, ui) {
            if(applyScaleFix) {
                ui.position.left = 0; ui.position.top = 0;
            }
        };

        $scope.onResize = function(event, ui) {
            if(applyScaleFix) {
                var
                changeWidth = ui.size.width - ui.originalSize.width,
                newWidth = ui.originalSize.width + changeWidth / percent,
                changeHeight = ui.size.height - ui.originalSize.height,
                newHeight = ui.originalSize.height + changeHeight / percent;
                ui.size.width = newWidth;
                ui.size.height = newHeight;
            }
        };

        /**
         * Reset the screen
         */
        $scope.reset = function () {
            depth = 10;

            var data = {
                "scope": $scope
            };

            $scope.$emit("DnDReset", data);
        };

        $scope.$on('resetDnd', function(){
            $scope.reset();
        });

        $scope.$on('toggleDnd', function(event, data) {
            if(data.disable == true) {
                angular.element(data.elemRef).draggable("option", "disabled", true);
            } else {
                angular.element(data.elemRef).draggable("option", "disabled", false);
            }
        });

    }]);

myView.directive('dndcompDirective', [function () {
    return {
        retrict: "A",
        controller: "dndcompCtrl",
        link: function (scope, elem, attr) {
            if(attr.id) {
                scope.fetchComponentData(attr.id);
                scope.compId = attr.id;
                elem.ready(function(){
                    scope.initDnD(scope.compId);
                });
            } else {
                console.log("Provide id and json to component");
            }
        }
    };
}]);

myView.directive('draggableDirective', [function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attr) {
            elem.ready(function() {
                scope.registerDragItems(elem, attr);
                elem.draggable(scope.state.dragOptions);
                var helperStr = "original";
                if(scope.state.dragOptions && scope.state.dragOptions.helper) {
                    helperStr = scope.state.dragOptions.helper;
                } else if(scope.state.customDragOptions && scope.state.customDragOptions.helper) {
                    helperStr = scope.state.customDragOptions.helper;
                } else if(scope.state.customDragOptions && scope.state.customDragOptions.containment) {
                    helperStr = function() {
                        return $(this).clone().appendTo(scope.state.customDragOptions.containment).css("zIndex", 2).show();
                    }
                } else {
                    helperStr = "original";
                }
                elem.draggable("option", {
                    cancel: false,
                    helper: helperStr,
                    start: function (event, ui) {
                        scope.onItemDragStart(event, ui, scope.state.customDragOptions);
                    },
                    drag : function(event,ui)  {
                        scope.onItemDrag(event, ui, scope.state.customDragOptions);
                    },
                    stop: function (event, ui) {
                        scope.onItemDragStop(event, ui, scope.state.customDragOptions);
                    }
                });
            });
        }
    };
}]);

myView.directive('droppableDirective', [function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attr) {
            elem.ready(function() {
                scope.registerDropTargets(elem, attr);
                elem.droppable(scope.state.dropOptions);
                elem.droppable( "option", {
                    drop: function (event, ui) {
                        scope.onItemDrop(event, ui, scope.state.customDropOptions);
                    },
                    out: function (event, ui) {
                        scope.onItemDragOut(event, ui, scope.state.customDropOptions);
                    },
                    over: function(event,ui){
                        scope.onItemDragOver(event, ui, scope.state.customDropOptions);
                    }
                });
            })
        }
    };
}]);

myView.controller('VideoPlayerCtrl', ["$scope", function ($scope) {
	$scope.isEnablePlayBtn = false;
	$scope.showTaskbar = true;
	$scope.enable_AD_btn = true;
	$scope.enable_dropdown = false;
	$scope.setting_dropdown = false;
	$scope.speed_dropdown = false;
	$scope.enable_settingOption = false;
	$scope.is_fullscreen = true;
	$scope.percentage = 0;
	$scope.videoTime = 0.00;
	$scope.audio_volume = 3;
	$scope.speeds = [0.5, 1, 1.25, 1.5, 2];
	$scope.myPopup = true;
	$scope.centre_playing = true;
	var range = document.getElementsByClassName('slider');
	var video = "";
	var fullScreenVisible = "";
	$scope.videoSrc = '';
	document.addEventListener("fullscreenchange", function () {
		$scope.is_fullscreen = !$scope.is_fullscreen;
	});

	$scope.renderFunctions = function () {
		video = document.getElementById("video");
		fullScreenVisible = document.getElementById("fullScreenBtn");
		var placeholder_1 = document.getElementById("placeholder_1");
		placeholder_1.style.top = video.offsetTop + "px";
		placeholder_1.style.left = video.offsetLeft + "px";

		video.onwaiting = function () {
			showPlaceholder(placeholder_1, this);
		};
		video.onplaying = function () {
			hidePlaceholder(placeholder_1, this);
		};

		function showPlaceholder(img, vid) {
			img.style.height = vid.scrollHeight + "px";
			img.style.width = vid.scrollWidth + "px";
			img.style.display = "block";
		}

		function hidePlaceholder(img, vid) {
			img.style.display = "none";
		}
		if ((navigator.userAgent.indexOf('iPhone') != -1) || (navigator.userAgent.indexOf('iPod') != -1) || (navigator.userAgent.indexOf('iPad') != -1)) {
			fullScreenVisible.style.display = "none";
		} else {
			fullScreenVisible.style.display = "block";
		}
		$scope.videoTime = secondsToTime(video.currentTime);
		$scope.videoDuration = secondsToTime(video.duration);
		video.src = $scope.videoSrc;
		video.addEventListener('timeupdate', updateProgressBar, false);
		video.addEventListener('loadedmetadata', function () {
			$scope.videoDuration = secondsToTime(video.duration);
			if ($scope.videoTime == 0) {
				$scope.videoTime = '0.00';
			}
			$scope.$apply();
		});
	}


	$scope.toggle = function () {
		$scope.myPopup = !$scope.myPopup;
		$scope.playing = false;
		video.pause();
		$scope.centre_playing = true;
	}

	$scope.playing = false;
	/*Mute*/
	$scope.ad = true;
	$scope.add = function () {
		$scope.ad = false;
	}

	$scope.unadd = function () {
		$scope.ad = true;
	}

	/*Audio*/
	$scope.audio = true;
	$scope.mute = function () {
		$scope.audio = false;
		video.muted = true;
	}
	$scope.unmute = function () {
		$scope.audio = true;
		video.muted = false;
	}

	$scope.playVideo = function () {
		$scope.centre_playing = false;
		$scope.playing = true;
		video.play();
		video.onended = function (e) {
			$(".control-box").removeClass("mystyle");
			$scope.playing = false;
			$scope.centre_playing = true;
			$scope.videoTime = 0.00;
			//video.load();
			//$scope.percentage = 0;
			$scope.videoDuration = secondsToTime(video.duration);
			$scope.videoTime = '0.00';
			$scope.$apply();
		};
		setTimeout(function () {
			$(".control-box").addClass("mystyle");
		}, 1000);

		return false;
	}
	$scope.pauseVideo = function () {
		$scope.playing = false;
		video.pause();
		console.log("paused");
	}

	$("#video").hover(function () {
		$(".control-box").removeClass("mystyle");
	}, function () {
		$(".control-box").addClass("mystyle");
	});

	$scope.seek = function (event) {
		var percent = event.offsetX / range[0].offsetWidth;
		var curr = percent * video.duration;
		video.currentTime = curr;
		$scope.percentage = Math.floor((100 / video.duration) * curr);
		$scope.videoTime = secondsToTime(video.currentTime);
	}

	$scope.setVolume = function () {
		if ($scope.audio_volume == 0) {
			$scope.audio_volume = currVolume;
		}
		else {
			currVolume = $scope.audio_volume;
			$scope.audio_volume = 0;
		}
	}

	$scope.enable_AD = function () {
		$scope.enable_AD_btn = !$scope.enable_AD_btn;
	}

	$scope.settingBtn = function () {
		$scope.enable_dropdown = !$scope.enable_dropdown;
		if ($scope.enable_dropdown) {
			$scope.enable_settingOption = true;
		}
		else {
			$scope.enable_settingOption = false;
			$scope.speed_dropdown = false;
		}
	}

	$scope.settingOption = function (option_type) {
		$scope.enable_settingOption = false;
		if (option_type === "speed") {
			$scope.speed_dropdown = true;

		}
	}

	$scope.changeSpeed = function (speed) {
		if (speed === 'setting') {
			$scope.enable_settingOption = true;
			$scope.speed_dropdown = false;
		}
		else {
			video.playbackRate = speed;
		}
	}

	function secondsToTime(seconds) {
		var mins = '0',
			secs = '0';
		var totalTime = parseInt(seconds);
		if (totalTime >= 60 && totalTime < 3600) {
			var mins = ("0" + Math.floor(totalTime / 60)).slice(-2);
			totalTime %= 60;
		}
		if (totalTime < 60) {
			var secs = ("0" + Math.floor(totalTime)).slice(-2);
		}
		return mins + ":" + secs;
	}

	function updateProgressBar() {
		if (isNaN(video.duration)) {
			$scope.percentage = 0;
		} else {
			video.volume = 0;
			$scope.videoTime = secondsToTime(video.currentTime);
			$scope.videoDuration = secondsToTime(video.duration);
			$scope.percentage = Math.floor((100 / video.duration) * video.currentTime);
		}
		$scope.$apply();
	}

	function secondsToHms(d) {
		d = Number(d);
		var h = Math.floor(d / 3600);
		var m = Math.floor(d % 3600 / 60);
		var s = Math.floor(d % 3600 % 60);
		return m + ":" + s;
	}
	$scope.$on("playVideo", function (evt, data) {
		$scope.videoSrc = data;
		$scope.renderFunctions();
		$scope.percentage = 0;
	});

	$scope.$on("stopVideo", function (evt, data) {
		$scope.playing = false;
		video && video.pause();
		$scope.centre_playing = true;
	});
	$scope.fullScreen = function () {
		if ($scope.is_fullscreen) {
			if (video.requestFullscreen) {
				video.requestFullscreen();
				console.log(video.requestFullscreen());
			} else if (video.mozRequestFullScreen) { /* Firefox */
				video.mozRequestFullScreen();
			} else if (video.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
				video.webkitRequestFullscreen();
			} else if (video.msRequestFullscreen) { /* IE/Edge */
				video.msRequestFullscreen();
			}
		}
		else {
			if (document.exitFullscreen) {
				document.exitFullscreen(); // Standard
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen(); // Blink
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen(); // Gecko
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen(); // Old IE
			}
		}
	}
}]);
myView.directive("videoplayerDirective", function () {
    return {
        retrict: "E",
        replace: true,
        controller: "VideoPlayerCtrl",
        templateUrl: "templates/videoControl.html"
    };
});
myView.controller('VideoPlayerIntroInstructionCtrl', ["$scope", function ($scope) {
	$scope.isEnablePlayBtn = false;
	$scope.showTaskbar = true;
	$scope.enable_AD_btn = true;
	$scope.enable_dropdown = false;
	$scope.setting_dropdown = false;
	$scope.speed_dropdown = false;
	$scope.enable_settingOption = false;
	$scope.is_fullscreen = true;
	$scope.percentage = 0;
	$scope.videoTime = 0.00;
	$scope.audio_volume = 3;
	$scope.speeds = [0.5, 1, 1.25, 1.5, 2];
	$scope.myPopup = true;
	$scope.centre_playing = true;
	var range = document.getElementsByClassName('slider');
	var video = "";
	var fullScreenVisible = "";
	$scope.videoSrc = '';
	document.addEventListener("fullscreenchange", function () {
		$scope.is_fullscreen = !$scope.is_fullscreen;
	});

	$scope.renderFunctions2 = function () {
		video = document.getElementById("videoIntroInstruction");
		fullScreenVisible = document.getElementById("fullScreenBtn");
		var placeholder_1 = document.getElementById("placeholder_1");
		placeholder_1.style.top = video.offsetTop + "px";
		placeholder_1.style.left = video.offsetLeft + "px";

		video.onwaiting = function () {
			showPlaceholder(placeholder_1, this);
		};
		video.onplaying = function () {
			hidePlaceholder(placeholder_1, this);
		};

		function showPlaceholder(img, vid) {
			img.style.height = vid.scrollHeight + "px";
			img.style.width = vid.scrollWidth + "px";
			img.style.display = "block";
		}

		function hidePlaceholder(img, vid) {
			img.style.display = "none";
		}
		if ((navigator.userAgent.indexOf('iPhone') != -1) || (navigator.userAgent.indexOf('iPod') != -1) || (navigator.userAgent.indexOf('iPad') != -1)) {
			fullScreenVisible.style.display = "none";
		} else {
			fullScreenVisible.style.display = "block";
		}
		$scope.videoTime = secondsToTime(video.currentTime);
		$scope.videoDuration = secondsToTime(video.duration);
		video.src = $scope.videoSrc;
		video.addEventListener('timeupdate', updateProgressBar, false);
		video.addEventListener('loadedmetadata', function () {
			$scope.videoDuration = secondsToTime(video.duration);
			if ($scope.videoTime == 0) {
				$scope.videoTime = '0.00';
			}
			$scope.$apply();
		});
	}




	$scope.toggle = function () {
		$scope.myPopup = !$scope.myPopup;
		$scope.playing = false;
		video.pause();
		$scope.centre_playing = true;
	}

	$scope.playing = false;
	/*Mute*/
	$scope.ad = true;
	$scope.add = function () {
		$scope.ad = false;
	}

	$scope.unadd = function () {
		$scope.ad = true;
	}

	/*Audio*/
	$scope.audio = true;
	$scope.mute = function () {
		$scope.audio = false;
		video.muted = true;
	}
	$scope.unmute = function () {
		$scope.audio = true;
		video.muted = false;
	}

	$scope.playIntroInstructionVideo = function () {
		$scope.centre_playing = false;
		$scope.playing = true;
		video.play();
		video.onended = function (e) {
			$(".control-box").removeClass("mystyle");
			$scope.playing = false;
			$scope.centre_playing = true;
			$scope.videoTime = 0.00;
			//video.load();
			//$scope.percentage = 0;
			$scope.videoDuration = secondsToTime(video.duration);
			$scope.videoTime = '0.00';
			$scope.$apply();
		};
		setTimeout(function () {
			$(".control-box").addClass("mystyle");
		}, 1000);

		return false;
	}

	$scope.$on("playIntroInstructionVideo", function (evt, data) {
		$scope.videoSrc = data;
		console.log("data", data);
		$scope.renderFunctions2();
		$scope.percentage = 0;
	});
	// $scope.playInstructionVideo = function () {
	// 	//	alert()
	// 	video.play();
	// }

	$scope.pauseIntroInstructionVideo = function () {
		$scope.playing = false;
		video.pause();
	}


	$("#videoIntroInstruction").hover(function () {
		$(".control-box").removeClass("mystyle");
	}, function () {
		$(".control-box").addClass("mystyle");
	});

	$scope.seek = function (event) {
		var percent = event.offsetX / range[0].offsetWidth;
		var curr = percent * video.duration;
		video.currentTime = curr;
		$scope.percentage = Math.floor((100 / video.duration) * curr);
		$scope.videoTime = secondsToTime(video.currentTime);
	}

	$scope.setVolume = function () {
		if ($scope.audio_volume == 0) {
			$scope.audio_volume = currVolume;
		}
		else {
			currVolume = $scope.audio_volume;
			$scope.audio_volume = 0;
		}
	}

	$scope.enable_AD = function () {
		$scope.enable_AD_btn = !$scope.enable_AD_btn;
	}

	$scope.settingBtn = function () {
		$scope.enable_dropdown = !$scope.enable_dropdown;
		if ($scope.enable_dropdown) {
			$scope.enable_settingOption = true;
		}
		else {
			$scope.enable_settingOption = false;
			$scope.speed_dropdown = false;
		}
	}

	$scope.settingOption = function (option_type) {
		$scope.enable_settingOption = false;
		if (option_type === "speed") {
			$scope.speed_dropdown = true;

		}
	}

	$scope.changeSpeed = function (speed) {
		if (speed === 'setting') {
			$scope.enable_settingOption = true;
			$scope.speed_dropdown = false;
		}
		else {
			video.playbackRate = speed;
		}
	}

	function secondsToTime(seconds) {
		var mins = '0',
			secs = '0';
		var totalTime = parseInt(seconds);
		if (totalTime >= 60 && totalTime < 3600) {
			var mins = ("0" + Math.floor(totalTime / 60)).slice(-2);
			totalTime %= 60;
		}
		if (totalTime < 60) {
			var secs = ("0" + Math.floor(totalTime)).slice(-2);
		}
		return mins + ":" + secs;
	}

	function updateProgressBar() {
		if (isNaN(video.duration)) {
			$scope.percentage = 0;
		} else {
			video.volume = 0;
			$scope.videoTime = secondsToTime(video.currentTime);
			$scope.videoDuration = secondsToTime(video.duration);
			$scope.percentage = Math.floor((100 / video.duration) * video.currentTime);
		}
		$scope.$apply();
	}

	function secondsToHms(d) {
		d = Number(d);
		var h = Math.floor(d / 3600);
		var m = Math.floor(d % 3600 / 60);
		var s = Math.floor(d % 3600 % 60);
		return m + ":" + s;
	}
	// $scope.$on("playVideo", function (evt, data) {
	// 	$scope.videoSrc = data;
	// 	$scope.renderFunctions();
	// 	$scope.percentage = 0;
	// });

	$scope.$on("stopVideo", function (evt, data) {
		$scope.videoSrc = '';
		$scope.playing = false;
		video && video.pause();
		$scope.centre_playing = true;
	});

	$scope.fullScreen2 = function () {
		if ($scope.is_fullscreen) {
			if (video.requestFullscreen) {
				video.requestFullscreen();
				console.log(video.requestFullscreen());
			} else if (video.mozRequestFullScreen) { /* Firefox */
				video.mozRequestFullScreen();
			} else if (video.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
				video.webkitRequestFullscreen();
			} else if (video.msRequestFullscreen) { /* IE/Edge */
				video.msRequestFullscreen();
			}
		}
		else {
			if (document.exitFullscreen) {
				document.exitFullscreen(); // Standard
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen(); // Blink
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen(); // Gecko
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen(); // Old IE
			}
		}
	}
}]);
myView.directive("videoplayerintroinstructionDirective", function () {
    return {
        retrict: "E",
        replace: true,
        controller: "VideoPlayerIntroInstructionCtrl",
        templateUrl: "templates/videoControlIntroInstruction.html"
    };
});

var myView = angular.module("myView", ["templateUrls", "ngSanitize", "ngAnimate"]);

myView.constant('APPCONSTANT', (function() {
	return {
		ACTIVITY_LOADED: "activity_loaded",
		FINAL_DATA_SUBMISSION: "final_data_submission",
        AUDIO_STARTED:"audio_started",
        UPDATE_TINCAN_DATA:"updateTincanData",
        SAVE_TINCAN_DATA : "save_tincan_data",
        ORIENTATION: "orientation",
        RESIZE: "resize",
		INIT_DRAG: "init_drag"
    }
})());

// angular.element(document).ready(function() {
//   deferredBootstrapper.bootstrap({
//     element: 'html',
//     module: 'myView',
//     resolve: {
//       APP_DATA: ['$http', function($http) {
//         return $http.get('data/config.json?v=' + Math.random());
//       }]
//     }
//   });
// });

var ActionManager = {};

ActionManager.actions = {};

ActionManager.registerAction = function(strAction)
{
	if(ActionManager.actions[strAction] == undefined)
	{
		ActionManager.actions[strAction] = [];
	}
}

ActionManager.registerActionHandler = function(strAction, actionCallback)
{
	if(ActionManager.actions[strAction] == undefined)
	{
		ActionManager.actions[strAction] = [];
	}
	ActionManager.actions[strAction].push(actionCallback);
}

ActionManager.dispatchAction = function(strAction, data)
{
	if(ActionManager.actions[strAction] != undefined)
	{
		ActionManager.actions[strAction].map(function(func){
			func(data);
		})
	}
}
myView.factory('TincanAPIService', ['$rootScope', '$http', '$sce', function($rootScope, $http, $sce) {
    var TincanService = {};
    TincanService.scoId = "";
    
    var tcConfig = {}; //tcConfig would store the value received from initial handshake event
    var DCATUrl = 'http://dcat.pearson.com/dcatweb/view/'; // DCAT URL prefix for activityId

    var winPostMsgPromise = null;
    var winPostMsgPromiseResolveFunc = null;
    var winCommitPostMsgListener = null;
    var winGetGADetailsPostMsgListener = null;
    var hostWindow = null;

    TincanService.getURL = function()
    {
        var objagent = { objectType:"Agent", account:tcConfig.account };
        var stragent = encodeURI(JSON.stringify(objagent));

        var url = encodeURI(tcConfig.endpoint + '/activities/state/?activityId=https://' + TincanService.scoId + '&');
        //url += 'activityId=https://' + TincanService.scoId + '&';
        url += encodeURI('stateId=state&agent=' + stragent + '&registration=' + tcConfig.registration);
        //url   +=  "agent={'objectType':'Agent','account' :"+JSON.stringify(tcConfig.account)+"}&";
        //url += 'agent=' + stragent + '&'
        //url += 'registration=' + tcConfig.registration;

        return url;
    }

    TincanService.getRequestHeader = function()
    {   
        var obj = {headers:  {
                            'Authorization': tcConfig.authorization.header[0].value,
                            'Accept': 'application/json;charset=utf-8'/*,
                            'Content-Type': 'application/json',
                            'X-Experience-API-Version' : '1.0.1'*/
                        }
                    };

        return obj;
    }
    
    TincanService.postSCOSaveData = function(objData) {

       // console.log("-------calling TincanService.postSCOSaveData");
       // console.log(objData);

        var url = TincanService.getURL();
        var config = TincanService.getRequestHeader();/*{headers:  {
                            'Authorization': tcConfig.authorization.header[0].value,
                            'Accept': 'application/json;charset=utf-8',
                            'Content-Type': 'application/json'
                        }
                    };*/

        return $http.post(url, objData, config);
    };

    /*TincanService.postSCOSubmitData = function(obj) {

        console.log("-------calling TincanService.postSCOSubmitData")

        var url = TincanService.getURL();

        var objData = {
                
                            result: {
                                score: {
                                    scaled: 1,
                                    raw: 1,
                                    max: 1
                                },
                                successStatus: 'passed',
                                progressMeasure: 1,
                                completionStatus: 'incomplete',
                                location: 'abc',
                                totalTime: 30,
                                exit : 'normal'
                                
                            },
                            body: obj
                        }
        if(tcConfig.session)
        {
            if(tcConfig.session.id)
            {
                objData.session = {id:tcConfig.session.id};
            }

        }
 
        var config = TincanService.getRequestHeader();

        return $http.post(url, objData, config);
    };*/

    TincanService.getSCOData = function(strToken) {
        
        var url = TincanService.getURL();

       // console.log("tcConfig inside getSCOData: ");
       // console.log(tcConfig);

        var config = TincanService.getRequestHeader();/*{headers:  {
                            'Authorization': tcConfig.authorization.header[0].value,
                            'Accept': 'application/json;charset=utf-8',
                            'Content-Type': 'application/json'//,
                            //'X-Experience-API-Version' : '1.0.1'
                        }
                    };*/

      //  console.log("----call for getSCOData--------------");
      //  console.log("url: ", url);
      //  console.log("config: ", config);
      //  console.log("scoId ", TincanService.scoId);

        

        return $http.get(url, config);
    };

    TincanService.validateTCConfigData = function(objTCData)
    {
        var isValidData = true;
        if(objTCData.account == undefined || objTCData.mode == undefined || objTCData.registration == undefined ||
            objTCData.endpoint == undefined || objTCData.authorization == undefined)
        {
         //   console.log('1');
            isValidData = false;
        }
        if(isValidData == true)
        {
            if(objTCData.authorization.header == undefined || objTCData.authorization.expiration == undefined)
            {
           //     console.log('2');
                isValidData = false;
            }
        }
        if(isValidData == true)
        {
            if(objTCData.authorization.header[0].value == undefined)
            {
             //   console.log('3');
                isValidData = false;
            }
        }

        

        if(isValidData == false)
        {
            console.log("Invalid TCConfig Data");

        }

        return isValidData;
    }

    TincanService.receiveTCConfig = function(event)
    {
        //console.log("event.source: ", event.source);
        if(event.data.action == "tcConfig")
        {
          //  console.log("----event.data.action--------------------------");
          //  console.log("response received from initial handshake:");

            //console.log(event.data);
            hostWindow = event.source;

            tcConfig = event.data;
            //if(TincanService.validateTCConfigData(event.data)){
                //STORES TC CONFIG DATA IN tcConfig VARIABLE
                
                if(tcConfig.scaledPassingScore == undefined)
                {
                    tcConfig.scaledPassingScore = 0.6;
                }
                if(tcConfig.completionThreshold == undefined)
                {
                    tcConfig.completionThreshold = 1;
                }

                winPostMsgPromiseResolveFunc(tcConfig);
           // }


            //MOdify tcconfig to set default values.
           
            

            winPostMsgPromise = null;
        }
        else if(event.data.action == "authorization")
        {
          //  console.log("----event.data.action--------------------------");
          //  console.log("response received from authorization:");
          //  console.log(event.data);
            
            winPostMsgPromiseResolveFunc(event.data);

            winPostMsgPromise = null;
        }
        else if(event.data.action == "commit")
        {
         //   console.log("----event.data.action--------------------------");
         //   console.log("response received from commit request:");
         //   console.log(event.data);
            //tcConfig = event.data; //STORES TC CONFIG DATA IN tcConfig VARIABLE
            
            //winPostMsgPromiseResolveFunc(event.data);
            winCommitPostMsgListener();

            winPostMsgPromise = null;
        }
        else if(event.data.action == "GADetails")
        {

            //console.log("----getGADetails event.data.action--------------------------");
         //   console.log("response received from commit request:");
            //console.log(event.data);
            winGetGADetailsPostMsgListener(event.data);
            //tcConfig = event.data; //STORES TC CONFIG DATA IN tcConfig VARIABLE
            
            //winPostMsgPromiseResolveFunc(event.data);
            //winCommitPostMsgListener();

            //winPostMsgPromise = null;
        }
        
    }

    TincanService.addGADetailsWindowMessageEventListener = function(funcListener)
    {
        //EVENT LISTENER TO RECEIVE CONFIG SETTINGS FROM PARENT WINDOW
        winGetGADetailsPostMsgListener = funcListener;
        //window.addEventListener("message", TincanService.receiveTCConfig);
    }

    TincanService.addWindowMessageEventListener = function(funcListener)
    {
        //EVENT LISTENER TO RECEIVE CONFIG SETTINGS FROM PARENT WINDOW
        winCommitPostMsgListener = funcListener;
        window.addEventListener("message", TincanService.receiveTCConfig);
    }


    TincanService.sendWindowPostMessage = function(objData, scoId) {
        if(scoId != undefined)
        {
            TincanService.scoId = scoId;
        }
        
        var openerWindow = null;
        var nWinCounter = 0;

        // console.log("----------sendWindowPostMessage---------------");
        // console.log("objData: ", objData);

        winPostMsgPromise = new Promise(function(resolve, reject){
            winPostMsgPromiseResolveFunc = resolve;

            if(hostWindow != null)
            {
             //   console.log("sendWindowPostMessage hostWindow: ", hostWindow);
                hostWindow.postMessage(objData, "*");
            }
            else
            {
                var currentWindow = window

                //SENDS WINDOW.POSTMESSAGE EVENT TO PARENT WINDOWS UPTO 5 LEVELS RECURSIVELY AND 
                //WINDOW.OPENER WINDOW
                var sendMessageToParentWindow = function(win, isOpener)
                {
                    if(win !== currentWindow)
                    {
                        currentWindow = win;
                        nWinCounter++;
                        if(win != null)
                        {        
                            win.postMessage(objData, "*");
                            //win.postMessage({ action: 'getTCConfig', scoId: scoId }, "*");
                        }
                        
                        if(nWinCounter < 5 && isOpener == undefined)
                        {
                            sendMessageToParentWindow(win.parent);
                            
                        }
                    }
                }
                sendMessageToParentWindow(window.parent);
                if(window.opener !== currentWindow)
                {
                    sendMessageToParentWindow(window.opener, true);
                }
            }
            
        });
        return winPostMsgPromise; 
    };
    TincanService.updateTincanConfig = function(objConfig)
    {
        tcConfig = objConfig;
    }
    return TincanService;
}]);

var TincanManager = {};

TincanManager.startTime;
TincanManager.endTime;
TincanManager.spentTime;
TincanManager.mode = "normal";

var previousTime = appConfig.data.tincan.total_time_spent;

TincanManager.initAfterAppLoad = function(obj) {
    previousTime = obj.total_time_spent;
}
/**
 * This method is calculating the spent time on a view.
 * View is section0 to section4, notebook and instruction panel.
 **/
TincanManager.recordElapsedTime = function (obj, blaunch) {
    if(TincanManager.mode == "normal")
    {
        if (blaunch) {
            TincanManager.startTime = new Date();
        } else {            
            TincanManager.endTime = new Date();
            TincanManager.spentTime = TincanManager.endTime - TincanManager.startTime;            
            obj.total_time_spent = previousTime + parseInt(TincanManager.spentTime/1000);
            obj.time_in_units  = TincanManager.msToTime(obj.total_time_spent * 1000);
        }
    }
}

TincanManager.msToTime = function (duration) {
    var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);


    // hours = (hours < 10) ? "0" + hours : hours;
    // minutes = (minutes < 10) ? "0" + minutes : minutes;
    // seconds = (seconds < 10) ? "0" + seconds : seconds;

    //return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    // return parseInt(duration/1000);    
    return hours + ":" + minutes + ":" + seconds;   
}

TincanManager.getTimeInWords = function(timeStr) {
    var arr = timeStr.split(":");
    var h  = parseInt(arr[0]) == 1 ? "Hour" : "Hours";
    var m = parseInt(arr[1]) == 1 ? "Minute": "Minutes";
    var s = parseInt(arr[2]) == 1 ? "Second" : "Seconds";
    var reqStr = "";
    if(parseInt(arr[0]) > 0) {
        reqStr = reqStr + arr[0] + ' ' + h + ',';
    }

    if(parseInt(arr[1]) > 0) {
        reqStr =  reqStr + ' ' + arr[1] + ' ' + m + ',';
    }

    reqStr = reqStr + ' ' + arr[2] + ' ' + s;

    return reqStr;
}

TincanManager.updateTincanData = function (obj, key, value) {
    if(TincanManager.mode == "normal")
    {
        obj[key] = value;
        TincanManager.calculateTotalScore(obj);
        TincanManager.calculatePercentageCompleted(obj);
        TincanManager.recordElapsedTime(obj, false);
    }    
}

TincanManager.calculateTotalScore = function(obj) {
    // console.table(JSON.parse(JSON.stringify(cardReducer.bottomAnswerText)))
    obj.total_score = Math.min(parseInt(obj.max_score), parseInt(obj.total_score));
}

TincanManager.calculatePercentageCompleted = function(obj) {
    // console.log("obj.total_score", obj.savedState.gameReport.percentCorrect);
    var pct = (100 * parseInt(obj.total_score) / parseInt(obj.max_score));
    pct = (Math.round(pct * 100) / 100) + "%";
    // obj.percentage_completion = obj.savedState.gameReport.percentCorrect;
    // obj.percentage_completion = pct;
}

myView.factory('appService', ['$rootScope', '$http', '$window', '$timeout', function ($rootScope, $http, $window, $timeout) {
  
    var appService = {};
    var orientation;

    appService.getConfigData = function () {
        return appConfig;
    };

    appService.isDevice = function () {
        return (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    };

    appService.isIpadDevice = function () {
        return navigator.userAgent.match(/iPad/i) != null;
    };

    appService.isAndroidDevice = function () {
        return /(android)/i.test(navigator.userAgent);
    };
    
    appService.getOrientation = function (val) {
        return orientation;
    };

    appService.setOrientation = function (val) {
        orientation = val;
    };

    appService.getWindowDimensions = function () {
        var w = angular.element($window);
        return {
            'h': w.height(),
            'w': w.width()
        };
    };

    return appService;
}]);
myView.controller('mainCtrl', ['$scope', '$timeout', '$window', 'appService', 'APPCONSTANT', 'TincanAPIService', function ($scope, $timeout, $window, appService, APPCONSTANT, TincanAPIService) {

    const IS_IPAD = appService.isIpadDevice();
    const IS_ANDROID = appService.isAndroidDevice();
    var APP_DATA = appConfig;

    var localPersistence = false;
    var authorizationTimeout = null;
    var isCommitRequestRaised = false;
    var userDetails = null;

    $scope.reviewMode = false;
    $scope.tcConfigData = {};
    $scope.appData = null;

    $scope.commitPostMsgListener = function () {
        isCommitRequestRaised = true;
        $scope.saveTincanData();
    }

    $scope.getGADetailsDataHandler = function (data) {
        console.log('getGADetails: ', data);
        userDetails = data.GADetails;
    }

    $scope.init = function () {
        console.log("Main view init");

        if (APP_DATA && APP_DATA.title) {
            document.title = APP_DATA.title;
        }

        if (APP_DATA && APP_DATA.precacheimages) {
            $scope.precacheImages();
        } else {
            $scope.loadStateInitView();
        }
        if(top.contentPlayerIframe){
            var gameiframe = top.contentPlayerIframe.contentDocument.querySelectorAll("iframe")[1];
            if(gameiframe){
                gameiframe.setAttribute("title",APP_DATA.title)
            }
        }
    }

    $scope.precacheImages = function () {
        var imagesArr = APP_DATA.precacheimages;
        var imgCtr = 0;
        for (var i = 0; i < imagesArr.length; i++) {
            (function (j) {
                var imageObj = new Image();
                imageObj.src = imagesArr[j];
                imageObj.addEventListener('load', function () {
                    imgCtr++;
                    if (imgCtr == imagesArr.length) {
                        $scope.loadStateInitView();
                        $scope.$broadcast("LoadingComplete", true)
                    }
                }, false);
            })(i);
        }
    }

    $scope.loadStateInitView = function () {
        TincanAPIService.addWindowMessageEventListener($scope.commitPostMsgListener);

        var arr = window.location.search.substring(1).split("&");
        if (arr.indexOf("localpersistence=true") > -1) {
            localPersistence = true;
        }

        if (arr.indexOf("tc=y") > -1) {

            TincanAPIService.addGADetailsWindowMessageEventListener($scope.getGADetailsDataHandler);
            TincanAPIService.sendWindowPostMessage({ action: 'getGADetails', scoId: APP_DATA.scoId }, APP_DATA.scoId).then(function (data) {
                // console.log('Resolve promise GADetails: ', data);
            });

            TincanAPIService.sendWindowPostMessage({ action: 'getTCConfig', scoId: APP_DATA.scoId }, APP_DATA.scoId).then(function (data) {
                $scope.tcConfigData = data;
                TincanManager.mode = $scope.tcConfigData.mode;

                if ($scope.tcConfigData.mode == "review") {
                    $scope.reviewMode = true;
                }

                if ($scope.tcConfigData.mode == "normal" || $scope.tcConfigData.mode == "review") {
                    $scope.runAuthorizationTimer();
                    $scope.getTincanData();
                } else {
                    $scope.initializeAppData();
                }
            });
        } else {
            $scope.initializeAppData();
        }
    };

    $scope.runAuthorizationTimer = function () {
        if ($scope.tcConfigData.authorization != undefined) {
            if ($scope.tcConfigData.authorization.expiration != undefined) {
                var intTime = (parseInt($scope.tcConfigData.authorization.expiration) * 1000) - 300000;
                authorizationTimeout = setTimeout(function () {
                    TincanAPIService.sendWindowPostMessage({ action: 'getAuthorization' }).then(function (data) {
                        $scope.$apply(function () {
                            $scope.tcConfigData.authorization = data.authorization;
                            $scope.tcConfigData.session = data.session;
                            TincanAPIService.updateTincanConfig($scope.tcConfigData);
                        })
                        $scope.runAuthorizationTimer();
                        clearTimeout(authorizationTimeout);
                        authorizationTimeout = null;
                    })
                }, intTime);
                setTimeout(function () {
                    TincanAPIService.sendWindowPostMessage({ action: 'getAuthorization' }).then(function (data) {
                        //console.log("--response received from getAuthorization request----");
                    })
                }, 10000);
            }
        }
    }

    $scope.getTincanData = function () {
        if (localPersistence) {
            var objLocalS = localStorage.getItem(APP_DATA.scoId);
            objLocalS = JSON.parse(objLocalS);

            if (objLocalS) {
                if (objLocalS.data != undefined) {
                    if (objLocalS.data.body != undefined) {
                        APP_DATA.data.tincan = objLocalS.data.body;
                    }
                }
            }
            $scope.initializeAppData();
        } else {
            TincanAPIService.getSCOData().then(function (response) {
                if (response != undefined && response != null) {
                    if (response.data != undefined) {
                        if (response.data.body != undefined) {
                            APP_DATA.data.tincan = response.data.body;
                        }
                    }
                }
                $scope.initializeAppData();

            }, function (err) {

                $scope.initializeAppData();
            })

        }
    };

    $scope.initializeAppData = function () {
        APP_DATA.data.tincan.userDetails = userDetails;
        $scope.appData = APP_DATA;
        $scope.initializeApp();
    };

    $scope.initializeApp = function () {

        ActionManager.registerActionHandler(APPCONSTANT.SAVE_TINCAN_DATA, $scope.saveTincanData);

        angular.element(window).on('orientationchange', function (e) {
            $scope.orientation = $scope.getOrientation();
            if (IS_ANDROID) {
                if ($scope.orientation == 'portrait') {
                    $scope.orientation = 'landscape';
                } else {
                    $scope.orientation = 'portrait';
                }
            }
            appService.setOrientation($scope.orientation);
            $scope.$broadcast(APPCONSTANT.ORIENTATION);
        });

        angular.element(window).on('resize', function (e) {
            if (!appService.isDevice()) {
                $scope.$broadcast(APPCONSTANT.RESIZE);
            }
        });

        $scope.$on(APPCONSTANT.SAVE_TINCAN_DATA, function () {
            $scope.saveTincanData();
        });

        TincanManager.initAfterAppLoad($scope.appData.data.tincan);

        TincanManager.recordElapsedTime($scope.appData.data.tincan, true);

        $timeout(function () {
            $scope.$broadcast(APPCONSTANT.ACTIVITY_LOADED);
        }, 100);
    };

    $scope.$on("initAccessibility", function (evt, callback) {
        $scope.initAcs(callback);
    });

    $scope.initAcs = function (callback) {
        var acsObj = $scope.appData.data.acs;
        $.extend(elementsJSON['elemSeq']["view_level"], acsObj);
        var acsOptions = {
            "language": $scope.appData.language
        }
        // AccessibilityManager.init(elementsJSON, acsOptions, callback);
    };

    $scope.getOrientation = function () {
        var orientation;

        if (window.matchMedia("(orientation: portrait)").matches) {
            orientation = 'portrait';
        }

        if (window.matchMedia("(orientation: landscape)").matches) {
            orientation = 'landscape';
        }
        return orientation;
    };

    $scope.getPOSTData = function (mode) {
        var objTincanData = $scope.appData.data.tincan;
        var scaledVal = 0;
        if (Number(objTincanData.total_score) > 0) {
            scaledVal = Number(objTincanData.total_score) / Number(objTincanData.max_score);
            scaledVal = Math.round((scaledVal + 0.00001) * 100) / 100
        }

        var strSuccessStatus = "failed";

        if (scaledVal >= Number($scope.tcConfigData.scaledPassingScore)) {
            strSuccessStatus = "passed";
        }

        var strCompletionStatus = "incomplete";

        /* //// Code below commented as game was not moving into completion stage when student scoring marks less than 100%. //// */
        // if ((Number(objTincanData.total_score) / Number(objTincanData.max_score)) == Number($scope.tcConfigData.completionThreshold)) {
        //     strCompletionStatus = "completed";
        // }

        /* //// Code below addded to move the game into completion stage when we click on save and exit button. //// */
        if (mode === 'normal') {
            strCompletionStatus = "completed";
        }


        var objData = {
            result: {
                score: {
                    scaled: scaledVal,
                    raw: Number(objTincanData.total_score),
                    max: Number(objTincanData.max_score)
                },
                successStatus: strSuccessStatus,
                progressMeasure: scaledVal,
                completionStatus: strCompletionStatus,
                location: "",
                totalTime: Number(objTincanData.total_time_spent),
                exit: mode
            },
            body: objTincanData
        }
        if ($scope.tcConfigData.session) {
            if ($scope.tcConfigData.session.id) {
                objData.session = { id: $scope.tcConfigData.session.id };
            }
        }

        return objData;
    }

    $scope.sendCommitPostMessage = function (stat) {
        TincanAPIService.sendWindowPostMessage({
            action: 'commit',
            result: stat
        }, $scope.appData.scoId);
    }

    $scope.saveTincanData = function () {
        $timeout(function () {
            $scope.$broadcast("saveViewTincanData");
            if ($scope.tcConfigData.mode == "normal") {
                if (localPersistence) {
                    var objDataToSave = {
                        data: {
                            result: {},
                            body: $scope.appData.data.tincan
                        }

                    }
                    localStorage.setItem($scope.appData.scoId, JSON.stringify(objDataToSave));
                } else {
                    var objPostData = $scope.getPOSTData("suspend");
                    TincanAPIService.postSCOSaveData(objPostData).then(function (data) {
                        if (isCommitRequestRaised) {
                            isCommitRequestRaised = false;
                            $scope.sendCommitPostMessage("succeeded");
                        }

                    }, function (err) {
                        if (isCommitRequestRaised) {
                            isCommitRequestRaised = false;
                            $scope.sendCommitPostMessage("failed");
                        }
                    })
                }
            }
        }, 100);
    }

    $scope.submitTincanData = function () {
        $scope.$broadcast("saveViewTincanData", true);
        if ($scope.tcConfigData.mode == "normal") {
            if (localPersistence) {
                var objDataToSave = {
                    data: {
                        result: {

                        },
                        body: $scope.appData.data.tincan
                    }
                }
                localStorage.setItem($scope.appData.scoId, JSON.stringify($scope.appData.data.tincan));
            } else {
                var objPostData = $scope.getPOSTData("normal");
                TincanAPIService.postSCOSaveData(objPostData).then(function (data) {
                    //console.log("submit success");
                    //$scope.sendCommitPostMessage("succeeded");
                }, function (err) {
                    //$scope.sendCommitPostMessage("failed");
                    //console.log("err submit");
                })
            }
            $scope.reviewMode = true;
        }
    }

    $scope.$on("SUBMIT_TINCAN_DATA", function () {
        // console.log('SUBMIT_TINCAN_DATA')
        $scope.submitTincanData();
    });

    $window.onbeforeunload = function () {
        $scope.saveTincanData();
    }
}]);

myView.directive('mainDirective', function () {
    return {
        retrict: "E",
        replace: true,
        templateUrl: "templates/main.html",
        link: function (scope, el, attrs) {
            el.ready(function() {
                scope.init();
            })
        }
    };
});

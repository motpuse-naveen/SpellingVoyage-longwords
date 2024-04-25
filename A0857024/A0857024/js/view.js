myView.controller('viewCtrl', ['$scope', 'APPCONSTANT', '$timeout', 'appService', function ($scope, APPCONSTANT, $timeout, appService) {

    $scope.languageTxt = null;
    $scope.screenType = 0;
    $scope.isLowerCase = true;
    $scope.isQuerty = true;
    $scope.gameRule = '';
    $scope.showLevelInfo = false;
    $scope.levelInfoAudioActive = false;
    $scope.levelGroups = {};
    $scope.totalGroups = 0;
    $scope.totalLevels = 0;
    $scope.currentLevelGroup = 1;
    $scope.currentLevel = 0;
    $scope.zoomedLevel = 0;
    $scope.levelScore = 0;
    $scope.currentLvlPoints = 0;
    $scope.levelLaunched=1;
    $scope.capsLock = false;
    $scope.totalScore = 0;
    $scope.userScore = 0;
    $scope.userName = "";
    $scope.userRole = "";
    $scope.scorePoints = [60, 80, 95];
    $scope.unlockThresh = 70;
    $scope.parseInt = parseInt;
    $scope.TurnedIn = false;
    $scope.playMode = "easy";
    $scope.ansType = "letters";
    $scope.levelAttemptCount = 0;
    $scope.leafData;
    $scope.wordSet;
    $scope.currentActiveLeaves = [];
    $scope.currentOptions = -1;
    $scope.correctOption;
    $scope.progress;
    $scope.creatures;
    $scope.isReload = false;
    $scope.popupType;
    $scope.myPopup = true;

    $scope.leafHoverAnim = false;
    $scope.IsVisible = false;
    $scope.audioCallback = {
        thisRef: $scope,
        params: [],
        type: "end",
        delay: -1,
        arrIndex: -1,
        callbackRef: null
    };

    $scope.midLevelState = null;
    $scope.showReport = false;
    $scope.autoCorrectAnim = false;

    var attempts = 2;
    var currentWordAud = [];
    var disableAllClicks = true;
    var levelWordList = [];
    var correctWordsArr = [];
    var incorrectWordsArr = [];

    var gameState = null;
    var tincanScore = 0;

    $scope.devDesignMode = false;
    /*Updated code starts here*/
    $scope.showInstBtn = false;
    $scope.correctOptionsArr = [];
    $scope.puzzleWord = [];
    $scope.keyboardData;
    $scope.showCheckAnswerBtn = false;
    $scope.userAttempts = -1;
    $scope.highlightPos = [];
    $scope.level2Flag = false;
    $scope.showInstructionCaption = false;
    $scope.showRepeatWordBtn = false;
    $scope.showInstOverlay = false;
    $scope.currentDropIdx = -1;
    var dropAttempts = 0;

    $scope.isAudioPlaying = false;
    $scope.repeatWordAudioPlaying = false;
    $scope.showEndPopup = false;
    $scope.disableDrop = false;
    $scope.showAllView = false;
    $scope.isLevelClicked = false;
    $scope.showFishAnimation = false;
    $scope.autoFillDropZones = false;
    $scope.responseArrIndex = 0;
    $scope.livetxt = "";
    $scope.showOutline = false;
    //APT: Veriable setup for default focus.
    $scope.defaultFocus = "INSTR"
    $scope.endFloatingBubbles = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];

    var isSecondVisit = false;
    var backupResponses = [];
    var configGrade = "2";
    console.log('code updated on 14-02-2021 Spelling_Voyage_GK');

    /*Updated code ends here*/

    angular.element('.repeatAudIcon11').hover(function () {
        $('.repeatAudIcon11 .imgHov').removeClass('svgIcon');
        $('.repeatAudIcon11 .imgHov').addClass('svgIconHover');
    }, function () {
        $('.repeatAudIcon11 .imgHov').removeClass('svgIconHover');
        $('.repeatAudIcon11 .imgHov').addClass('svgIcon');
    });

    $scope.$on(APPCONSTANT.ACTIVITY_LOADED, function () {
        $scope.init();
        resizeHandler();
    });

    $scope.$on(APPCONSTANT.RESIZE, function () {
        resizeHandler();
    });

    $scope.$on(APPCONSTANT.ORIENTATION, function () {
        $timeout(function () {
            resizeHandler();
        }, 500);
    });
    $scope.ShowHide = function () {
        //If DIV is visible it will be hidden and vice versa.
        // $scope.IsVisible = $scope.IsVisible ? false : true;
        $scope.IsVisible = true;
    };

    function resizeHandler() {
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var hRatio = 1;
        var wRatio = 1;
        if (windowWidth < 710) {
            wRatio = windowWidth / 1280;
        }
        if (windowHeight > 1080) {
            hRatio = windowHeight / 1080;
        }
        // if(windowHeight <= 800) {
        //     hRatio = windowHeight/800;
        // }        
        var str = 'scale(' + wRatio + ',' + hRatio + ')';
        $(".levelBg").css({
            '-webkit-transform': str,
            'transform': str
        });

        var scaleFix = Math.min(windowWidth / 1920, windowHeight / 1080);
        var str = 'scale(' + scaleFix + ') translate(-50%, -50%)';
        $(".allLevelsView").css({
            '-webkit-transform': str,
            'transform': str
        });
    }

    $scope.init = function () {
        // console.log("View init - ");
        configGrade = $scope.$parent.appData.grade;
        $scope.gameGrade = configGrade;
        if ($scope.$parent.appData.data.tincan.userDetails != undefined) {
            $scope.userRole = $scope.$parent.appData.data.tincan.userDetails.userRole;
        }

        $scope.language = $scope.$parent.appData.language;
        $scope.languageTxt = $scope.$parent.appData.lang_txt[$scope.$parent.appData.language];
        $scope.gameAnsType = $scope.$parent.appData.ansType;

        $scope.processRawDB();
        disableAllClicks = false;
        // $scope.$emit("initAccessibility");
        if (configGrade == 2) {
            //TincanManager.updateTincanData($scope.$parent.appData.data.tincan, "max_score", 96);
            TincanManager.updateTincanData($scope.$parent.appData.data.tincan, "max_score", 3);
        }
        $scope.activeLeafSet = {
            "easy": [1, 1, 1],
            "challenge": [1, 1, 1, 1, 1]
        };

        $scope.keysAllowed = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
            'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
            'u', 'v', 'w', 'x', 'y', 'z', 'bs', 'left', 'right',
            'SingleQuote', 'FullStop',
            "A", "B", "C", "D", "E", "F", "G", "H", "I",
            "J", "K", "L", "M", "N", "O", "P", "Q", "R",
            "S", "T", "U", "V", "W", "X", "Y", "Z"
        ];

        //Restrict the user to enter letters in between A to Z only
        $(window).on('keydown', function (evt) {
            $scope.onKeyDownEvent(evt);
            if ($scope.playMode == "challenge") {
                if ($scope.disableDrop) {
                    return;
                }
                // evt.preventDefault();
                var keyPressed = evt.key;
                if (evt.originalEvent.getModifierState('CapsLock')) {
                    if ($scope.isLowerCase){
                        $scope.capsBtnClick();
                    }
                }
                // check if backspace key
                if (evt.keyCode == 8 || evt.keyCode == '8' || evt.keyCode == 46 || evt.keyCode == '46') {
                    keyPressed = 'bs';
                }
                if (evt.keyCode == 37 || evt.keyCode == '37') {
                    keyPressed = 'left';
                }
                if (evt.keyCode == 39 || evt.keyCode == '39') {
                    keyPressed = 'right';
                }
                if (evt.keyCode == 222 || evt.keyCode == '222') {
                    keyPressed = 'SingleQuote';
                }
                if (evt.keyCode == 190 || evt.keyCode == '190') {
                    keyPressed = 'FullStop';
                }
                //console.log("$scope.keysAllowed.indexOf(keyPressed)",$scope.keysAllowed.indexOf(keyPressed))
                if ($scope.keysAllowed.indexOf(keyPressed) >= 0) {

                    if (keyPressed == 'bs') {
                        if (dropAttempts < 2) {
                            $scope.deleteLetter();
                        }
                    } else if (keyPressed == 'left') {
                        $scope.currentDropIdx = Math.max(0, $scope.currentDropIdx - 1);
                    } else if (keyPressed == 'right') {
                        $scope.currentDropIdx = Math.min(($scope.puzzleWord.length - 1), ($scope.currentDropIdx + 1));
                    } else {
                        $scope.showLetterInDropBox("", "", keyPressed);
                    }
                }
                if (evt.keyCode == 13 && $('.checkAnserBtn').is(":visible") && angular.element('.view').hasClass('hide-focus-outline')) {
                    $scope.checkAnswerClick();
                }
                $scope.$apply();
            }

        });
        $(window).on('keyup', function (evt) {
            if (!evt.originalEvent.getModifierState('CapsLock')) {
                if (!$scope.isLowerCase){
                    $scope.capsBtnClick();
                }
            }
        });

        if ($scope.$parent.appData.data.tincan.restoreGame) {
            $scope.restoreGameState();
            $scope.isReload = true;
            $scope.showInstBtn = true;
            if ($scope.isQuerty === false) {
                $timeout(function () {
                    angular.element(".onscreenKeyboard .row1 .dragItems").removeClass("querty_" + $scope.language + "_row1");
                    angular.element(".onscreenKeyboard .row2").removeClass("querty_" + $scope.language + "_row2");
                    angular.element(".onscreenKeyboard .row3").removeClass("querty_" + $scope.language + "_row3");
                    angular.element(".onscreenKeyboard .row4").removeClass("querty_" + $scope.language + "_row4");
                }, 500);
            }
            
        } else {
            $scope.setupLevelGroups();
            // Only required during redesigning of levelscreen
            // $scope.createLevelNodePosData();
            $scope.showHomeScreen();
        }
        if (!$scope.$parent.appData.data.tincan.restoreGame) {
            $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"]["challenge"]["active"] = false;
        }

        AccessibilityManager.trapPopupFocus();
        AccessibilityManager.addEscapeEvent();
        setTimeout(function(){
            if(!$scope.TurnedIn){
                $elem = $('.levelMode.challenge.locked')
                $elem.on("mouseenter", function (e) {
                    //e.stopImmediatePropagation();
                });
                $elem .tooltip({
                    items: 'button.levelMode.challenge.locked',
                    content: $scope.languageTxt.level2BtnTooltip,
                    position: {
                        my: "center top ",
                        at: "center bottom+10"
                    },
                    open: function( event, ui ) {
                        setTimeout(function(){
                            $(".ui-tooltip-content").mouseout(function() {
                                $('.levelMode.challenge.locked').tooltip("close");
                            });
                        },500)
                    }
                })

                $elem.on("click", function (e) {
                    $elem.tooltip("open");
                });
                $elem.on("mouseleave", function (e) {
                    e.stopImmediatePropagation();
                });
                $(document).mouseup(function (e) {
                    var container = $(".ui-tooltip");
                    if (! container.is(e.target) && 
                        container.has(e.target).length === 0)
                    {
                        $elem.tooltip("close");
                    }
                });
            }
        }, 1000)
    };

    $scope.instructionText = function () {
        var instructionStr = "";
        if (Object.keys($scope.levelGroups).length != 0) {
            if ($scope.playMode == "easy") {
                //if (configGrade == 'K' && parseInt($scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['level']) <= 10) {
                if ($scope.gameAnsType == "letters") {
                    instructionStr = $scope.languageTxt.level1Info_gK;
                } else if (configGrade == 2 && $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['name'] == 'Lesson 36') {
                    instructionStr = $scope.languageTxt.level1Info_g2_l36;
                } else {
                    instructionStr = $scope.languageTxt.level1Info_gK12;
                }
            } else {
                //if (configGrade == 'K' && parseInt($scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['level']) <= 10) {
                if ($scope.gameAnsType == "letters") {
                    instructionStr = $scope.languageTxt.level2Info_gK;
                } else if (configGrade == 2 && $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['name'] == 'Lesson 36') {
                    instructionStr = $scope.languageTxt.level2Info_g2_l36;
                } else {
                    instructionStr = $scope.languageTxt.level2Info_gK12;
                }
            }
        }
        return instructionStr;
    };

    /*
    $scope.playClick = function () {
        if (disableAllClicks === true) {
            return;
        }
        $scope.$broadcast("stopAudio");
        $scope.refreshAudioCallbackObj();
        $scope.audioCallback.type = "end";
        $scope.audioCallback.delay = 0;
        $scope.gameStartTime = new Date();
        $scope.audioCallback.callbackRef = function () {
            $scope.enableFirstLevel();
            // $scope.screenType = 2;
            $scope.showAllView = true;
                
            $scope.setLiveText($scope.languageTxt.liveText.animationStart);
            
        };
        //APT: decide and launch playmode 
        var mode_data = $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]
        if(mode_data.complete && $scope.playMode=="easy"){
            $scope.levelClick('', $scope.levelLaunched, "challenge", '', $scope.currentLevel);
        }
        else{
            $scope.levelClick('', $scope.levelLaunched, $scope.playMode, '', $scope.currentLevel);
        }
        
        $scope.$broadcast("playAudio", "click", $scope.audioCallback);
    };
    */

    $scope.splashAudioClick = function () {
        if(!$scope.TurnedIn){
            if($scope.isAudioPlaying){
                $scope.$broadcast("pauseAudio");
                $scope.isAudioPlaying = false;
                disableAllClicks = false;
            }
            else{
                $scope.$broadcast("stopAudio");
                //$scope.refreshAudioCallbackObj();
                $scope.$broadcast("playAudio", "intro", null);
                $scope.isAudioPlaying = true;
            }
        }
    };

    $scope.allViewClick = function (group) {
        $scope.currentLevelGroup = group;
        // if(angular.element(evt.currentTarget.children).hasClass('locked')) {
        //     return;
        // }else{
        $scope.showAllView = false;
        $timeout(function () {
            $scope.showInstructionsAfterAnim = false;
        });
        $scope.showLevelScreen();
        // }
        // $(".lastLevelAnim").removeClass("lastLevelAnim");
    };

    $scope.showHomeScreen = function (disableIntroPlay) {
        disableAllClicks = false;
        $scope.screenType = 1;
        var allViewPos = configGrade == 2 ? $scope.$parent.appData.allViewPos_g2 : $scope.$parent.appData.allViewPos_gK1;
        angular.forEach(allViewPos, function (elem, idx) {
            $scope.allLevels[idx + 1]['pos'] = {};
            $scope.allLevels[idx + 1]['pos']['top'] = elem.top;
            $scope.allLevels[idx + 1]['pos']['left'] = elem.left;
        });
        // AccessibilityManager.updateTabOrder("splashScreen", function () {
        //     AccessibilityManager.setFocus(".splashScreen .playBtn");
        // });
        $timeout(function () {
            if (appService.isDevice()) {
                angular.element(".splashScreen .splashScreenAudioBtn").trigger("focus");
            } else {
                angular.element(".show-focus-outline .splashScreen .splashScreenAudioBtn").trigger("focus");
            }
        }, 200);
        $scope.refreshAudioCallbackObj();
        if(!$scope.TurnedIn){
            if (!disableIntroPlay) {
                $scope.isAudioPlaying = false
                $scope.$broadcast("playAudio", "intro", null);
                $scope.isAudioPlaying = true;
            }
        }
        $scope.$emit(APPCONSTANT.SAVE_TINCAN_DATA);
        $scope.setAllLevelData();
        $scope.setupHomeScreenAriaAttr();
    };
    $scope.setupHomeScreenAriaAttr = function(){
        if(angular.element(".splashScreen .levelMode.easy").hasClass("completed")){
            if($scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['modes']['easy'].attempts 
            && $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['modes']['easy'].attempts.length>=3){
                angular.element(".splashScreen .levelMode.easy").attr({ "aria-disabled": true });
            }
            //If the level 2 is already started.
            if($scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['modes']['challenge'].attempt){
                angular.element(".splashScreen .levelMode.easy").attr({ "aria-disabled": true});
            }
        }
        angular.element(".splashScreen .levelMode.challenge").attr({ "aria-disabled": false});
        if(angular.element(".splashScreen .levelMode.challenge").hasClass("completed")){
            if($scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['modes']['challenge'].attempts 
            && $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['modes']['challenge'].attempts.length>=3){
                angular.element(".splashScreen .levelMode.challenge").attr({ "aria-disabled": true});
            }
        }
        //If the level 1 is not completed.
        if(!$scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['modes']['easy'].complete){
            angular.element(".splashScreen .levelMode.challenge").attr({ "aria-disabled": true});
        }
    }

    $scope.showLevelScreen = function () {
        $scope.screenType = 2;
        if (isSecondVisit == true) {
            $scope.showInstBtn = true;
            $scope.showInstOverlay = false;
            $scope.showInstructionCaption = false;
            isSecondVisit = false;
        } else {
            $scope.showInstBtn = false;
            $scope.refreshAudioCallbackObj();
            // disableAllClicks = true;
            $scope.audioCallback.type = "end";
            $scope.showInstOverlay = true;
            $scope.showInstructionCaption = true;
            $scope.audioCallback.callbackRef = function () {
                $scope.showInstBtn = true;
                $scope.IsVisible = false;
                $scope.showInstOverlay = false;
                $scope.showInstructionCaption = false;
                $scope.closeScreenOverlay();
                $timeout(function () {
                    angular.element(".levelScreen .levelInstructionBtn").trigger("focus");
                }, 200);
                // disableAllClicks = false;
            };
            $scope.$broadcast('playAudio', 'letsgo', $scope.audioCallback);
        }
        $timeout(function () {
            if ($scope.showInstBtn) {
                angular.element(".levelScreen .levelInstructionBtn").trigger("focus");
            } else {
                angular.element(".instructionOverlay .closeLevelInfo").trigger("focus");
            }
        }, 200);
        // AccessibilityManager.updateTabOrder("levelScreen", function () {
        //     AccessibilityManager.setFocus($(".levelMode")[0]);
        // });
        $scope.$emit(APPCONSTANT.SAVE_TINCAN_DATA);
        $scope.setAllLevelData();
        resizeHandler();
    };

    $scope.showQnsScreen = function () {
        $scope.screenType = 3;
        $scope.restoreMidLevelState();

        $scope.leafData = $scope.$parent.appData.leafData[$scope.playMode];
        // if( $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["wordset"].length == ( $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["correctWords"].length + $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["incorrectWords"].length) ){
        //     $scope.levelCompleteHandle();
        // }

        // if( $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["responses"].length == $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["wordset"].length ) {
        //     $scope.levelCompleteHandle();
        // } 
        // else {
        $scope.loadNextQuestion();
        // }
        $scope.$emit(APPCONSTANT.SAVE_TINCAN_DATA);
        $scope.setAllLevelData();
    };

    $scope.backToLevelScreen = function () {
        if (disableAllClicks == true) {
            return;
        }
        disableAllClicks = false;
        $scope.$broadcast("stopAudio");
        // $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["responses"] = backupResponses;
        isSecondVisit = true;
        $scope.showLevelScreen();
    };

    $scope.setupLevelGroups = function () {
        $scope.totalGroups = 0;
        $scope.totalLevels = 0;
        $scope.levelGroups = {};
        if (configGrade == 2) {
            var levelDataObj = {};
            angular.forEach($scope.$parent.appData.levelData, function (val, key) {
                if (key > 32) return;
                levelDataObj[key] = val;
            });
            $scope.allLevels = levelDataObj;
        } else {
            $scope.allLevels = $scope.$parent.appData.levelData;
        }
        angular.forEach($scope.allLevels, function (val, key) {
            val['rule'] = $scope.ruleSet[key - 1];
            //console.log("val['rule']",val['rule'])
            if (!val['group']) {
                console.log('Invalid JSON. Level group missing --- ' + key + ' --- ' + val);
                return;
            }
            if (!$scope.levelGroups.hasOwnProperty(val['group'])) {
                $scope.totalGroups = $scope.totalGroups + 1;
                $scope.levelGroups[val['group']] = [];
                val['level'] = key; // Island number
                //console.log("$scope.languageTxt",$scope.languageTxt)
                val['name'] = $scope.languageTxt.islands[parseInt(key) - 1];
                angular.forEach(val['modes'], function (v, k) {
                    v['modeName'] = $scope.languageTxt.modeName[k];
                    // v['rule'] = $scope.$parent.appData.levelData.rule;
                    v['date'] = '';
                    v['timeSpent'] = '';
                    v['percentComplete'] = '0%';
                    v['isPass'] = "No";
                    // v['grade'] = configGrade;
                    v['responses'] = [];
                    v['currentQuestion'] = -1;
                    v['correctOptionsArr'] = [];
                });
                $scope.levelGroups[val['group']].push(val);
                $scope.totalLevels = $scope.totalLevels + 1;
            } else {
                val['level'] = key;
                val['name'] = $scope.languageTxt.islands[parseInt(key) - 1];
                angular.forEach(val['modes'], function (v, k) {
                    v['modeName'] = $scope.languageTxt.modeName[k];
                    // v['rule'] = $scope.$parent.appData.levelData.rule;
                    v['date'] = '';
                    v['timeSpent'] = '';
                    v['percentComplete'] = '0%';
                    v['isPass'] = "No";
                    // v['grade'] = $scope.$parent.appData.levelData.grade;
                    v['responses'] = [];
                    v['currentQuestion'] = -1;
                    v['correctOptionsArr'] = [];
                });
                $scope.levelGroups[val['group']].push(val);
                $scope.totalLevels = $scope.totalLevels + 1;
            }
        });
    };
    
    /*
    $scope.enableFirstLevel = function () {
        // $scope.currentLevelGroup = 1;
        // $scope.currentLevel = 0;
        if ($scope.currentLevelGroup == 1 && $scope.currentLevel == 0) {
            $scope.totalScore = $scope.totalScore + ($scope.scorePoints.length * 3);
            $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"]["easy"]["active"] = true;
        }
    };
    */

    $scope.restoreGameState = function () {
        // console.log('$scope.$parent.appData.data.tincan --- > ', $scope.$parent.appData.data.tincan);
        tincanScore = $scope.$parent.appData.data.tincan.total_score;
        gameState = $scope.$parent.appData.data.tincan.savedState;
        $scope.currentLevelGroup = gameState.levelGroup;
        $scope.currentLevel = parseInt(gameState.level) - 1;
        $scope.totalGroups = gameState.totalGroups;
        $scope.totalLevels = gameState.totalLevels;
        $scope.totalScore = gameState.totalScore;
        $scope.userScore = gameState.userScore;
        $scope.levelGroups = gameState.levelGroups;
        $scope.midLevelState = gameState.midLevelState;
        $scope.allLevels = gameState.allViewState;

        $scope.currentOptions = gameState.currentIndex;
        $scope.wordSet = gameState.wordSet;
        $scope.playMode = gameState.mode;
        $scope.TurnedIn = gameState.turnedIn;
        $scope.gameStartTime = new Date(gameState.gameStartTime);
        $scope.levelEndTime = new Date(gameState.levelEndTime);
        levelWordList = $scope.wordSet;
        $scope.leafData = gameState.leafData;
        $scope.puzzleWord = gameState.puzzleWord;
        $scope.correctOptionsArr = gameState.correctOptionArray;
        $scope.levelScore = gameState.levelScore;
        $scope.levelLaunched = gameState.levelLaunched;
        $scope.isQuerty = gameState.isQuerty;

        try {
            if ($scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["responses"]) {
                backupResponses = $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["responses"];
            }
        } catch (error) {

        }
        console.log("restoreGameState >> currentLevel >> completionStatus:" + $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["complete"])
        
        if($scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["complete"]){
            gameState.screenType = 1
        }

        $timeout(function () {
            if (TincanManager.mode === 'review') {
                $scope.showHomeScreen();
            } else {
                switch (gameState.screenType) {
                    case 1:
                        $scope.showHomeScreen();
                        break;
                    case 2:
                        $scope.showHomeScreen();
                        break;
                    case 3:
                        //APT: As per the latest client update display homw screen with resume state of level.
                        //$scope.showQnsScreen();
                        $scope.showHomeScreen()
                        break;
                }
            }
        }, 500);
    };

    // $scope.$watch('levelGroups', function () {
    //     console.log('@@@@@ levelGroups', $scope.levelGroups);
    // });
    // $scope.$watch('userScore', function () {
    //     console.log('@@@@@ userScore', $scope.userScore);
    // });

    $scope.saveGameState = function () {
        $scope.setupMidLevelStateObj();
        $scope.$parent.appData.data.tincan.savedState = {
            "screenType": $scope.screenType,
            "levelGroup": $scope.currentLevelGroup,
            "level": parseInt($scope.currentLevel) + 1,
            "totalGroups": $scope.totalGroups,
            "totalLevels": $scope.totalLevels,
            "totalScore": $scope.totalScore,
            "userScore": $scope.userScore,
            "levelGroups": $scope.levelGroups,
            "midLevelState": $scope.midLevelState,
            "allViewState": $scope.allLevels,
            // "midLevelState": $scope.midLevelState,
            "currentIndex": $scope.currentOptions,
            "wordSet": $scope.wordSet,
            "levelScore": $scope.levelScore,
            "score": $scope.levelScore,
            "levelLaunched": $scope.levelLaunched,
            "mode": $scope.playMode,
            "turnedIn": $scope.TurnedIn,
            "gameStartTime": $scope.gameStartTime,
            "levelEndTime": $scope.levelEndTime,
            "leafData": $scope.leafData,
            "puzzleWord": $scope.puzzleWord,
            "correctOptionArray": $scope.correctOptionsArr,
            "isQuerty": $scope.isQuerty,
        }
    };

    $scope.setupMidLevelStateObj = function () {
        if ($scope.screenType == 3) {
            $scope.midLevelState = {
                "levelLaunched": $scope.levelLaunched,
                "points": $scope.currentLvlPoints,
                "score": $scope.levelScore,
                "levelScore": $scope.levelScore,
                "mode": $scope.playMode,
                "turnedIn": $scope.TurnedIn,
                "wordset": $scope.wordSet,
                "currentIndex": parseInt($scope.currentOptions) - 1,
                "progress": $scope.progress,
                "timeLimit": $scope.timeLimit,
                "correctOptionArray": $scope.correctOptionsArr,
                "puzzleWord": $scope.puzzleWord,
                "keyboardData": $scope.keyboardData,
                "wordSets": $scope.wordSet,
                "gameStartTime": $scope.gameStartTime,
                "userScore": $scope.userScore,
                "levelEndTime": $scope.levelEndTime,
                "leafData": $scope.leafData,
                "levelGroups": $scope.levelGroups,
                "isQuerty": $scope.isQuerty,
                "totalScore": $scope.totalScore,
            }
        } else {
            $scope.midLevelState = null;
        }
    };

    $scope.restoreMidLevelState = function () {
        $scope.levelLaunched = $scope.midLevelState["levelLaunched"];
        $scope.currentLvlPoints = $scope.midLevelState["points"];
        $scope.levelScore = $scope.midLevelState["score"];
        $scope.playMode = $scope.midLevelState["mode"];
        $scope.TurnedIn = $scope.midLevelState["turnedIn"];
        $scope.wordSet = $scope.midLevelState["wordset"];
        $scope.currentOptions = $scope.midLevelState["currentIndex"];
        $scope.progress = $scope.midLevelState["progress"];
        $scope.timeLimit = $scope.midLevelState["timeLimit"];
        $scope.correctOptionsArr = $scope.midLevelState["correctOptionArray"];
        $scope.puzzleWord = $scope.midLevelState["puzzleWord"];
        $scope.keyboardData = $scope.midLevelState["keyboardData"];
        $scope.wordSet = $scope.midLevelState["wordSets"];
        $scope.gameStartTime = new Date($scope.midLevelState["gameStartTime"]);
        $scope.userScore = $scope.midLevelState["userScore"];
        $scope.levelEndTime = new Date($scope.midLevelState["levelEndTime"]);
        $scope.leafData = $scope.midLevelState["leafData"];
        $scope.levelGroups = $scope.midLevelState["levelGroups"];
        $scope.levelScore = $scope.midLevelState["levelScore"];
        $scope.isQuerty = $scope.midLevelState["isQuerty"];
        $scope.totalScore = $scope.midLevelState["totalScore"];
    };

    //APT level = according to old logic it is "island"
    //APT mode = "easy" or "challenge".
    //APT levelIndex = "island" index - it should be 0 as each gamelet has only one island logic. 
    //APT level = "island" number - it should be 1 as each gamelet has only one island logic. 
    $scope.startLevel = function (evt, level, mode, data, levelIndex) {
        if (angular.element(evt.currentTarget).hasClass('exhaustAttempts') 
        || angular.element(evt.currentTarget).hasClass('locked')
        || angular.element(evt.currentTarget).hasClass('turnedinlocked')) {
            return;
        }
        if(data.complete){
            $scope.resetAttemptData();
        }
        $scope.levelClick(evt, level, mode, data, levelIndex);
    }

    $scope.levelClick = function (evt, level, mode, data, levelIndex) {
        //APT: Multiple attempt - locked logic to enable button if only completed.
        /*if (angular.element(evt.currentTarget).hasClass('locked') || angular.element(evt.currentTarget).hasClass('completed')) {
            return;
        }*/
        if (angular.element(evt.currentTarget).hasClass('exhaustAttempts') 
        || angular.element(evt.currentTarget).hasClass('locked')
        || angular.element(evt.currentTarget).hasClass('turnedinlocked')) {
            return;
        }
        if(!$scope.isAudioPlaying){
            $scope.$broadcast("stopAudio");
            $scope.refreshAudioCallbackObj();
        }
        $scope.currentLevel = levelIndex;
        $scope.playMode = mode;
        $scope.defaultFocus = "INSTR";
        $scope.currentOptions = $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode].currentQuestion;
        if (!(angular.element(evt.target).hasClass('locked')) && $scope.currentOptions == -1) {
            $scope.gameStartTime = new Date();
            $scope.zoomedLevel = levelIndex;
            $scope.isLevelClicked = true;
            $scope.showFishAnimation = false;
            if (mode == "challenge")
                angular.element(".wordContainer").find(".leaf").remove();

            angular.element('.endLevelFishes').css('display', 'none');

            if ((evt && angular.element(evt.currentTarget).hasClass('locked')) || (disableAllClicks === true)) {
                return;
            }
            if (disableAllClicks === true) {
                return;
            }

            $scope.levelLaunched = level;
            // $scope.currentLevel = levelIndex;
            $scope.levelScore = 0;
            $scope.currentLvlPoints = 0;
            $scope.percentComplete = 0;
            // $scope.playMode = mode;
            $scope.time = "";
            $scope.pauseTimer = false;
            //APT: Set the word list count//limit the no. of words to be attempt by student. 
            $scope.wordSet = shuffleArray($scope.$parent.appData.data.dataset[$scope.$parent.appData.language][level].slice());
            //APT: Remove this line // it is for testing purpose to limit word set to 2. 
            //$scope.wordSet.splice(0,8)
            //APT: End Remove
            $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["wordset"] = $scope.wordSet;
            if ($scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["responses"]) {
                backupResponses = $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["responses"];
            } else {
                backupResponses = [];
            }
            $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["responses"] = [];
            $scope.startLevelTime = new Date();
            //Creating correct options array for feedback table
            $scope.correctOptionsArr = [];
            for (var i = 0; i < $scope.wordSet.length; i++) {
                $scope.correctOptionsArr.push({
                    "word": "",
                    "attempts": -1
                });
                $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["responses"].push({
                    "target": "",
                    "attempt1": "-",
                    "attempt2": "-"
                });
            }
            $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["correctOptionsArr"] = $scope.correctOptionsArr;
            $scope.showEndPopup = false;
            $scope.refreshAudioCallbackObj();
            $scope.audioCallback.type = "end";
            $scope.audioCallback.callbackRef = function () {
                disableAllClicks = false;
                $scope.startGamePlay();
            };
            $scope.$emit(APPCONSTANT.SAVE_TINCAN_DATA);
            $scope.setAllLevelData();
            $scope.$broadcast("playAudio", "click", $scope.audioCallback);
            // $timeout(function () {
            //     AccessibilityManager.setTabGroup('playScreenInstruction');
            //     AccessibilityManager.updateTabOrder('playScreenInstruction', function () {
            //         AccessibilityManager.setFocus('.playscreenIns span');
            //     });
            // }, 400);
        } else {
            $scope.levelLaunched = level;
            $scope.wordSet = $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["wordset"];
            $scope.correctOptionsArr = $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["correctOptionsArr"];
            $scope.startGamePlay();
            // AccessibilityManager.setTabGroup('playScreenInstruction');
            // AccessibilityManager.updateTabOrder('playScreenInstruction', function () {
            //     AccessibilityManager.setFocus('.playscreenIns span');
            // });
        }
        //APT: Reset Level attempt count.
        if($scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["attempts"]){
            $scope.levelAttemptCount = $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["attempts"].length;
        }
        else{
            $scope.levelAttemptCount = 0;
        }
    };

    $scope.startGamePlay = function () {
        $scope.leafData = $scope.$parent.appData.leafData[$scope.playMode];
        $scope.keyboardData = $scope.$parent.appData["keyboardData_" + $scope.language + "_lowerCase_querty"];
        $timeout(function () {
            angular.element(".onscreenKeyboard .row1 .dragItems").addClass("querty_" + $scope.language + "_row1");
            angular.element(".onscreenKeyboard .row2").addClass("querty_" + $scope.language + "_row2");
            angular.element(".onscreenKeyboard .row3").addClass("querty_" + $scope.language + "_row3");
            angular.element(".onscreenKeyboard .row4").addClass("querty_" + $scope.language + "_row4");
        }, 100);
        $timeout(function () {
            $(".bubbleTxt").hide();
        });
        $scope.screenType = 3;
        $timeout(function () {
            angular.element(".instructionOverlay .playScreenclose").trigger("focus");
            $scope.openScreenOverlay();
        }, 200);

        if ($scope.currentOptions == -1) {
            $scope.currentOptions = -1;
            $scope.progress = 0;
            levelWordList = [];
            correctWordsArr = [];
            incorrectWordsArr = [];
            angular.forEach($scope.wordSet, function (elem) {
                levelWordList.push(elem[0]);
            });
            $scope.doActionBeforeAudio = false;
        }

        if ($scope.playMode == "challenge") {
            $scope.currentDropIdx = 0;
            $scope.showInstBtn = false;
            $scope.doActionBeforeAudio = true;
            $scope.refreshAudioCallbackObj();
            disableAllClicks = true;
            $scope.audioCallback.type = "end";
            $timeout(function () {
                if (appService.isDevice()) {
                    angular.element('.row4 .dragItems').off('touchstart').on('touchstart', function (e) {
                        $scope.letterClick(e);
                    });
                } else {
                    angular.element('.row4 .dragItems').off('click').on('click', function (e) {
                        $scope.letterClick(e);
                    });
                }
            }, 100);
            $scope.audioCallback.callbackRef = function () {
                disableAllClicks = false;
                // $scope.timeLimit = 75;
                $scope.showInstBtn = true;
                $scope.doActionBeforeAudio = false;
                // $scope.loadNextQuestion();

                if ($scope.currentOptions == -1) {
                    $scope.loadNextQuestion();
                } else {
                    // disableAllClicks = true;
                    $scope.refreshAudioCallbackObj();
                    $scope.audioCallback.type = "end";
                    $scope.audioCallback.callbackRef = $scope.closePopUpAudioWord;
                    $scope.audioCallback.delay = -1;
                    $scope.$broadcast("stopAudio");
                    $scope.$broadcast("playAudio", "appear", $scope.audioCallback);
                }
                $(".bubbleTxt").show();
            }
            //if (configGrade == "K" && parseInt($scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['level']) <= 10) {
            if ($scope.gameAnsType == "letters") {    
                $scope.$broadcast("playAudio", "level2Info_gK", $scope.audioCallback);
            } else if (configGrade == 2 && $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['name'] == 'Lesson 36') {
                $scope.$broadcast("playAudio", "level2Info_g2_l36", $scope.audioCallback);
            } else {
                $scope.$broadcast("playAudio", "level2Info_gK12", $scope.audioCallback);
            }
            // $scope.$broadcast("playAudio", "level2Info", $scope.audioCallback);
        } else {
            $scope.currentDropIdx = -1;
            $scope.doActionBeforeAudio = true;
            $scope.refreshAudioCallbackObj();
            $scope.showInstructionCaption = true;
            $scope.showInstBtn = false;
            $scope.showInstOverlay = true;
            disableAllClicks = true;
            $scope.audioCallback.callbackRef = function () {
                if ($scope.gameGrade < 5) {
                    angular.element('#3').hide();
                }
                $scope.showInstructionCaption = false;
                $scope.showRepeatWordBtn = true;
                $scope.showInstBtn = true;
                $scope.IsVisible = false;
                $scope.showInstOverlay = false;
                disableAllClicks = false;
                $scope.doActionBeforeAudio = false;

                if ($scope.currentOptions == -1)
                    $scope.loadNextQuestion();
                else {
                    // disableAllClicks = false
                    // disableAllClicks = true;
                    $scope.refreshAudioCallbackObj();
                    $scope.audioCallback.type = "end";
                    $scope.audioCallback.callbackRef = $scope.setupNextQns;
                    $scope.audioCallback.delay = -1;
                    $scope.$broadcast("stopAudio");
                    $scope.$broadcast("playAudio", "appear", $scope.audioCallback);
                }
                $(".bubbleTxt").show();
            }
            //if (configGrade == "K" && parseInt($scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['level']) <= 10) {
            if ($scope.gameAnsType == "letters") {
                $scope.$broadcast("playAudio", "level1Info_gK", $scope.audioCallback);
            } else if (configGrade == 2 && $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['name'] == 'Lesson 36') {
                $scope.$broadcast("playAudio", "level1Info_g2_l36", $scope.audioCallback);
            } else {
                $scope.$broadcast("playAudio", "level1Info_gK12", $scope.audioCallback);
            }
            // $scope.$broadcast("playAudio", "level1Info", $scope.audioCallback);
        }
        $scope.$emit(APPCONSTANT.SAVE_TINCAN_DATA);
        $scope.setAllLevelData();
    };

    $scope.capsBtnClick = function () {
        angular.element(".onscreenKeyboard").fadeOut(50);
        if (!$scope.isQuerty) {
            if ($scope.isLowerCase)
                $scope.keyboardData = $scope.$parent.appData["keyboardData_" + $scope.language];
            else
                $scope.keyboardData = $scope.$parent.appData["keyboardData_" + $scope.language + "_lowerCase"];
            $timeout(function () {
                angular.element(".onscreenKeyboard .row1 .dragItems").removeClass("querty_" + $scope.language + "_row1");
                angular.element(".onscreenKeyboard .row2").removeClass("querty_" + $scope.language + "_row2");
                angular.element(".onscreenKeyboard .row3").removeClass("querty_" + $scope.language + "_row3");
                angular.element(".onscreenKeyboard .row4").removeClass("querty_" + $scope.language + "_row4");
            }, 100);
        } else {
            if ($scope.isLowerCase)
                $scope.keyboardData = $scope.$parent.appData["keyboardData_" + $scope.language + "_querty"];
            else
                $scope.keyboardData = $scope.$parent.appData["keyboardData_" + $scope.language + "_lowerCase_querty"];
            $timeout(function () {
                angular.element(".onscreenKeyboard .row1 .dragItems").addClass("querty_" + $scope.language + "_row1");
                angular.element(".onscreenKeyboard .row2").addClass("querty_" + $scope.language + "_row2");
                angular.element(".onscreenKeyboard .row3").addClass("querty_" + $scope.language + "_row3");
                angular.element(".onscreenKeyboard .row4").addClass("querty_" + $scope.language + "_row4");
            }, 100);
        }
        $scope.isLowerCase = !$scope.isLowerCase;
        angular.element(".onscreenKeyboard").fadeIn(200);
        $scope.$emit(APPCONSTANT.SAVE_TINCAN_DATA);
        $scope.setAllLevelData();
    };

    $scope.changeKeypad = function () {
        angular.element(".onscreenKeyboard").fadeOut(50);
        if ($scope.isQuerty) {
            if (!$scope.isLowerCase)
                $scope.keyboardData = $scope.$parent.appData["keyboardData_" + $scope.language];
            else
                $scope.keyboardData = $scope.$parent.appData["keyboardData_" + $scope.language + "_lowerCase"];
            $timeout(function () {
                angular.element(".onscreenKeyboard .row1 .dragItems").removeClass("querty_" + $scope.language + "_row1");
                angular.element(".onscreenKeyboard .row2").removeClass("querty_" + $scope.language + "_row2");
                angular.element(".onscreenKeyboard .row3").removeClass("querty_" + $scope.language + "_row3");
                angular.element(".onscreenKeyboard .row4").removeClass("querty_" + $scope.language + "_row4");
            }, 100);
        } else {
            if (!$scope.isLowerCase)
                $scope.keyboardData = $scope.$parent.appData["keyboardData_" + $scope.language + "_querty"];
            else
                $scope.keyboardData = $scope.$parent.appData["keyboardData_" + $scope.language + "_lowerCase_querty"];
            $timeout(function () {
                angular.element(".onscreenKeyboard .row1 .dragItems").addClass("querty_" + $scope.language + "_row1");
                angular.element(".onscreenKeyboard .row2").addClass("querty_" + $scope.language + "_row2");
                angular.element(".onscreenKeyboard .row3").addClass("querty_" + $scope.language + "_row3");
                angular.element(".onscreenKeyboard .row4").addClass("querty_" + $scope.language + "_row4");
            }, 100);

        }
        $scope.isQuerty = !$scope.isQuerty;
        angular.element(".onscreenKeyboard").fadeIn(200);
        $scope.$emit(APPCONSTANT.SAVE_TINCAN_DATA);
        $scope.setAllLevelData();
    };

    $scope.closeInstructionPanelOutside = function (evt) {
        //Not restricting user to listen the complete instruction auido for the 1st time.    
        $scope.IsVisible = false;
        if ($(evt.target).hasClass("ignoreClose")) {
            return;
        }
        $scope.showInstructionCaption = false;
        $scope.showRepeatWordBtn = true;
        $scope.showInstBtn = true;
        $scope.showInstOverlay = false;
        $scope.$broadcast("stopAudio");
        disableAllClicks = false;
        if ($scope.doActionBeforeAudio == true) {
            $scope.doActionBeforeAudio = false;
            var callback = $scope.audioCallback;
            if (callback && callback.callbackRef && (callback.type == "end")) {
                if (callback.delay >= 0) {
                    $timeout(function () {
                        callback.callbackRef.apply(callback.thisRef, callback.params);
                    }, callback.delay)
                } else {
                    callback.callbackRef.apply(callback.thisRef, callback.params);
                }
            }
        }
        $timeout(function () {
            $scope.closeScreenOverlay();
            angular.element(".levelScreen .levelInstructionBtn").trigger("focus");
        }, 200);
        // AccessibilityManager.panelCloseHandler();
        // $timeout(function(){
        // AccessibilityManager.updateTabOrder('levelScreen', function () {
        //     AccessibilityManager.setFocus('.levelScreenNav .levelInstructionBtn');
        // });
        // }, 400);
    }

    $scope.closeInstructionPanel = function (evt) {
        //Not restricting user to listen the complete instruction auido for the 1st time. 
        if ($scope.gameGrade < 5) {
            angular.element('#3').hide();
        }
        $scope.IsVisible = false;
        if ($(evt.target).hasClass("ignoreClose")) {
            return;
        }
        $scope.showInstructionCaption = false;
        $scope.showRepeatWordBtn = true;
        $scope.showInstBtn = true;
        $scope.showInstOverlay = false;
        $scope.$broadcast("stopAudio");
        disableAllClicks = false;
        if ($scope.doActionBeforeAudio == true) {
            $scope.doActionBeforeAudio = false;
            var callback = $scope.audioCallback;
            if (callback && callback.callbackRef && (callback.type == "end")) {
                if (callback.delay >= 0) {
                    $timeout(function () {
                        callback.callbackRef.apply(callback.thisRef, callback.params);
                    }, callback.delay)
                } else {
                    callback.callbackRef.apply(callback.thisRef, callback.params);
                }
            }
        }
        $timeout(function () {
            $scope.closeScreenOverlay();
            angular.element(".playScreen .levelInstructionBtn").trigger("focus");
        }, 200);
        // AccessibilityManager.panelCloseHandler();
        // $timeout(function(){
        // AccessibilityManager.updateTabOrder('levelScreen', function () {
        //     AccessibilityManager.setFocus('.levelScreenNav .levelInstructionBtn');
        // });
        // }, 400);

        // disableAllClicks = true;
        /*
        $scope.refreshAudioCallbackObj();
        $scope.audioCallback.type = "end";
        $scope.audioCallback.callbackRef = $scope.closePopUpAudioWord;
        $scope.audioCallback.delay = -1;
        $scope.$broadcast("stopAudio");
        $scope.$broadcast("playAudio", "appear", $scope.audioCallback);
        */
    }


    $scope.closePopUpAudioWord = function () {
        $scope.currentActiveLeaves = $scope.activeLeafSet[$scope.playMode].slice();
        $scope.correctOption = $scope.wordSet[$scope.currentOptions][0];
        $scope.puzzleWord = $scope.wordSet[$scope.currentOptions][0].split('');

        var i = 0;
        while (i < $scope.currentActiveLeaves.length) {
            if ($scope.currentActiveLeaves[i] == 1) {
                $scope.currentActiveLeaves[i] = $scope.wordSet[$scope.currentOptions][i];
            }
            /*else {
                $scope.currentActiveLeaves[i] = "";
            }*/
            i++;
        }
        shuffleArray($scope.currentActiveLeaves);
        $scope.generateCreatures();
        dropAttempts = 0;
        // AccessibilityManager.updateTabOrder("playScreen");
        // $scope.$emit(APPCONSTANT.SAVE_TINCAN_DATA);
        $timeout(function () {
            $scope.$broadcast("stopAudio");
            var audioFile;
            if ($scope.playMode == "easy") {
                if (configGrade == 2 && $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['name'] == 'Lesson 36') {
                    audioFile = "find_abrv236";
                } else {
                    audioFile = "find";
                }
            } else {
                //if (configGrade == "K" && parseInt($scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['level']) <= 10) {
                if ($scope.gameAnsType == "letters") {
                    audioFile = "spell_letter";
                } else if (configGrade == 2 && $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['name'] == 'Lesson 36') {
                    audioFile = "spell_abrv236";
                } else {
                    audioFile = "spell";
                }
            }
            currentWordAud = [audioFile, getWordAudioPath($scope.correctOption)];
            $scope.playCurrentWord();
            // AccessibilityManager.updateTabOrder("playScreen", function () {
            //     AccessibilityManager.setFocus($(".leafCover.active")[0]);
            // });
            $scope.$emit(APPCONSTANT.SAVE_TINCAN_DATA);
            $scope.setAllLevelData();
        }, 200)
    };

    $scope.instructionAudioBtnClick = function () {
        if (disableAllClicks == true) {
            return;
        }
        

        if($scope.isAudioPlaying){
            $scope.$broadcast("pauseAudio");
            $scope.isAudioPlaying = false;
            disableAllClicks = false;
        }
        else{
            $scope.$broadcast("stopAudio");
            //disableAllClicks = false;
            //$scope.refreshAudioCallbackObj();
            if ($scope.screenType == "2") {
                $scope.$broadcast("playAudio", "letsgo");
            }
            if ($scope.playMode == "easy") {
                //if (configGrade == "K" && parseInt($scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['level']) <= 10) {
                if ($scope.gameAnsType == "letters") {
                    $scope.$broadcast("playAudio", "level1Info_gK");
                } else if (configGrade == 2 && $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['name'] == 'Lesson 36') {
                    $scope.$broadcast("playAudio", "level1Info_g2_l36");
                } else {
                    $scope.$broadcast("playAudio", "level1Info_gK12");
                }
            }
            if ($scope.playMode == "challenge") {
                //if (configGrade == "K" && parseInt($scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['level']) <= 10) {
                if ($scope.gameAnsType == "letters") {
                    $scope.$broadcast("playAudio", "level2Info_gK");
                } else {
                    $scope.$broadcast("playAudio", "level2Info_gK12");
                }
            }
            $scope.isAudioPlaying = true;
        }
    }

    $scope.instructBtnClickHandler = function (screenType) {
        if (disableAllClicks == true) {
            return;
        }
        $scope.IsVisible = false;
        $scope.$broadcast("stopAudio");
        disableAllClicks = false;
        $scope.showInstOverlay = true;
        $scope.refreshAudioCallbackObj();
        $scope.showInstructionCaption = true;
        $scope.showInstBtn = false;
        // if($scope.screenType == "2"){
        //     $scope.$broadcast("playAudio", "letsgo");
        // }
        // if($scope.playMode == "easy"){
        //     $scope.$broadcast("playAudio", "level1Info");
        // }
        // if($scope.playMode == "challenge"){
        //     $scope.$broadcast("playAudio", "level2Info");
        // }
        $timeout(function () {
            if ($scope.screenType == 2) {
                angular.element(".instructionOverlay .closeLevelInfo").trigger("focus");
            } else if ($scope.screenType == 3) {
                angular.element(".instructionOverlay .playScreenclose").trigger("focus");
            }
            $scope.openScreenOverlay();
            AccessibilityManager.trapInstrPopupFocus();
        }, 200);

    }

    $scope.loadNextQuestion = function () {
        $scope.highlightPos = [];
        $scope.currentOptions++;
        $scope.autoCorrectAnim = false;
        $scope.showCheckAnswerBtn = false;
        $scope.isLetterPresent = false;
        $scope.isLevelClicked = false;
        $scope.autoFillDropZones = false;
        $scope.showFishAnimation = false;
        $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode].currentQuestion++;
        angular.element('.endLevelFishes').css('display', 'none');
        $scope.allowOptionClick = true;
        $(".leaf").show();
        $(".active").show();
        $('.leafCover').removeClass('bubbleBustAnim');
        $(".leaf").removeClass("selectedLeaf");
        $(".wordDrops").removeClass("letterDroppedIn disableDiv transparentDiv");
        angular.element('.wordContainer .leafCover').removeClass('disableOptions');

        $scope.currentDropIdx = 0;
        if ($scope.currentOptions >= $scope.wordSet.length) {
            $scope.levelCompleteHandle();
        } else {
            // remove special characters
            if ($scope.currentOptions === -1) {
                $scope.currentOptions = 0;
            }
            var tempWord = $scope.wordSet[$scope.currentOptions][0];

            $scope.puzzleWord = tempWord.split('');
            $scope.userAttempts = -1;
            for (var i = 0; i < $(".wordDrops").length; i++) {
                $($(".wordDrops")[i]).empty().attr('aria-label', $scope.languageTxt.liveText.dropzone + ' ' + (i + 1));
            }
            angular.forEach($scope.currentActiveLeaves, function (elem, index) {
                $scope.currentActiveLeaves[index] = "";
            });
            $scope.creatures = [];
            $scope.setupNextQns();
            function countScore(attempts, arr) {
                var occurs = 0;
                for (var i = 0; i < arr.length; i++) {
                    if ('attempts' in arr[i] && arr[i].attempts === attempts) occurs++;
                }
                return occurs;
            }
            $scope.levelScore = countScore(2, $scope.correctOptionsArr);
            var prevScore = $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["score"];
            if ($scope.levelScore > prevScore) {
                $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["score"] = $scope.levelScore;
                $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["percentComplete"] = (100 * $scope.levelScore / $scope.wordSet.length) + "%";
                $scope.userScore = $scope.userScore + ($scope.levelScore - prevScore);
            }
        }
        $scope.$emit(APPCONSTANT.SAVE_TINCAN_DATA);
        $scope.setAllLevelData();
    };

    $scope.setupNextQns = function () {
        $scope.currentActiveLeaves = $scope.activeLeafSet[$scope.playMode].slice();
        $scope.correctOption = $scope.wordSet[$scope.currentOptions][0];

        var i = 0;
        while (i < $scope.currentActiveLeaves.length) {
            if ($scope.currentActiveLeaves[i] == 1) {
                $scope.currentActiveLeaves[i] = $scope.wordSet[$scope.currentOptions][i];
            }
            /*else {
                $scope.currentActiveLeaves[i] = "";
            }*/
            i++;
        }
        shuffleArray($scope.currentActiveLeaves);
        $scope.generateCreatures();
        attempts = 2;
        dropAttempts = 0;
        // AccessibilityManager.updateTabOrder("playScreen");
        // $scope.$emit(APPCONSTANT.SAVE_TINCAN_DATA);
        
        $timeout(function () {
            $scope.$broadcast("stopAudio");
            var audioFile;
            if ($scope.playMode == "easy") {
                if (configGrade == 2 && $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['name'] == 'Lesson 36') {
                    audioFile = "find_abrv236";
                } else {
                    audioFile = "find";
                }
            } else {
                //if (configGrade == "K" && parseInt($scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['level']) <= 10) {
                if ($scope.gameAnsType == "letters") {
                    audioFile = "spell_letter";
                } else if (configGrade == 2 && $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['name'] == 'Lesson 36') {
                    audioFile = "spell_abrv236";
                } else {
                    audioFile = "spell";
                }
            }

            currentWordAud = [audioFile, getWordAudioPath($scope.correctOption)];
            $scope.playCurrentWord();
            // AccessibilityManager.updateTabOrder("playScreen", function () {
            //     AccessibilityManager.setFocus($(".leafCover.active")[0]);
            // });
            $scope.$emit(APPCONSTANT.SAVE_TINCAN_DATA);
            $scope.setAllLevelData();
        }, 200)

        $timeout(function () {
            $scope.closeScreenOverlay();
            //angular.element(".playScreen .levelInstructionBtn").trigger("focus");
            //APT: shift focus to audio or instruction.
            if($scope.defaultFocus == "WORDAUDIO"){
                angular.element(".playScreen .repeatWordAudio").trigger("focus");
            }
            else{
                angular.element(".playScreen .levelInstructionBtn").trigger("focus");
            }
        }, 200);
    };

    $scope.repeatWordAudioClick = function () {
        if($scope.repeatWordAudioPlaying){
            $scope.$broadcast("pauseAudio");
            $scope.repeatWordAudioPlaying = false;
            disableAllClicks = false;
        }
        else{
            $scope.repeatWordAudioPlaying = true;
            $scope.refreshAudioCallbackObj();
            $scope.audioCallback.type = "end";
            var repeatAudArr = [];
            //if ($scope.playMode == "challenge" && configGrade == "K" && parseInt($scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['level']) <= 10) {
            if ($scope.playMode == "challenge" &&  $scope.gameAnsType == "letters") {
                repeatAudArr = ["spell_letter_repeat", getWordAudioPath($scope.correctOption)];
            } else {
                repeatAudArr = currentWordAud;
            }
            $scope.audioCallback.arrIndex = repeatAudArr.length - 1;
            $scope.$broadcast("playAudioArray", repeatAudArr, $scope.audioCallback);
        }
    }

    $scope.playCurrentWord = function () {
        $scope.refreshAudioCallbackObj();
        // disableAllClicks = true;
        $scope.audioCallback.type = "end";
        $scope.audioCallback.callbackRef = function () {
            // disableAllClicks = false;
        };
        $scope.audioCallback.arrIndex = currentWordAud.length - 1;
        $scope.$broadcast("playAudioArray", currentWordAud, $scope.audioCallback);
    };

    $scope.generateCreatures = function () {
        $scope.creatures = [];
        angular.forEach($scope.currentActiveLeaves, function (elem, idx) {
            if (elem == '') {
                $scope.creatures.push(0);
            } else {
                var rNum = Math.floor(Math.random() * 3) + 1;
                $scope.creatures.push(rNum);
            }
        });
    };

    $scope.optionClick = function (evt, idx) {
        if ((evt && angular.element(evt.currentTarget).hasClass("selectedLeaf")) || $scope.currentOptions == -1) {
            return;
        }
        var correctAudio = getWordAudioPath($scope.correctOption);
        $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["responses"][$scope.currentOptions].target = $scope.correctOption;

        var currentResponseWord = "";
        var currBubbleAnim;
        $scope.defaultFocus = "WORDAUDIO";
        if (evt != undefined) {
            if (disableAllClicks == true) {
                if ($scope.allowOptionClick == true) {
                    $scope.$broadcast("stopAudio");
                    $scope.allowOptionClick = false;
                    disableAllClicks = false;
                    var eventRef = evt;
                    var indexRef = idx;
                    var callback = $scope.audioCallback;
                    if (callback && callback.callbackRef && (callback.type == "end")) {
                        if (callback.delay >= 0) {
                            $timeout(function () {
                                callback.callbackRef.apply(callback.thisRef, callback.params);
                                $scope.optionClick(eventRef, indexRef);
                            }, 0)
                        } else {
                            callback.callbackRef.apply(callback.thisRef, callback.params);
                            $scope.optionClick(eventRef, indexRef);
                        }
                    }
                }
                return;
            }
            if (angular.element(evt.currentTarget).hasClass('disabledOption')) {
                return;
            }
            var currentTargetBubble = evt.currentTarget;
            $(currentTargetBubble).addClass("selectedLeaf");
            currentResponseWord = $scope.currentActiveLeaves[idx];

        } else if ($scope.droppedLetter != undefined) {
            var word = $scope.wordSet[$scope.currentOptions][0];
            currentResponseWord = $scope.droppedLetter.toLowerCase();
            if (!(configGrade == "2" && $scope.levelLaunched == 29 && (word == "Mon." || word == "Tues." || word == "Dr." || word == "Rd." || word == "Feb." || word == "Mr." || word == "St." || word == "Sept." || word == "ft." || word == "in.")) && ($scope.droppedLetter.toLowerCase() == $scope.puzzleWord.join('').toLowerCase())) {
                $scope.level2Flag = true;
            }
            if (configGrade == "2" && $scope.levelLaunched == 29 && (word == "Mon." || word == "Tues." || word == "Dr." || word == "Rd." || word == "Feb." || word == "Mr." || word == "St." || word == "Sept." || word == "ft." || word == "in.") && ($scope.droppedLetter == $scope.puzzleWord.join(''))) {
                $scope.level2Flag = true;
            }
        }
        $scope.$broadcast("stopAudio");

        if (attempts == 2) {
            $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["responses"][$scope.currentOptions].attempt1 = currentResponseWord;
        } else if (attempts == 1) {
            $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["responses"][$scope.currentOptions].attempt2 = currentResponseWord;
        }

        if (($scope.currentActiveLeaves[idx] == $scope.correctOption) || $scope.level2Flag) {
            $scope.allowOptionClick = false;
            $scope.setLiveText($scope.languageTxt.correct);
            angular.element('.wordContainer .leafCover').addClass('disableOptions');
            $scope.level2Flag = false;
            correctWordsArr.push($scope.correctOption);
            $scope.progress = $scope.progress + 100 / $scope.wordSet.length;
            if (attempts == 2) {
                $scope.levelScore++;
            }

            $scope.correctOptionsArr[$scope.currentOptions].word = $scope.correctOption;
            $scope.correctOptionsArr[$scope.currentOptions].attempts = attempts;
            $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["correctOptionsArr"] = $scope.correctOptionsArr;

            $scope.refreshAudioCallbackObj();
            disableAllClicks = true;
            $scope.audioCallback.type = "end";
            $scope.audioCallback.callbackRef = function () {

                $(currentTargetBubble).find('.leafCover').addClass("bubbleBustAnim");
                $timeout(function () {
                    $scope.loadNextQuestion();
                    $timeout(function () {
                        disableAllClicks = false;
                    }, 300);
                }, 800);
            };
            $scope.$broadcast("playAudio", "correct", $scope.audioCallback);
        } else {
            $scope.setLiveText($scope.languageTxt.incorrect);
            
            $scope.refreshAudioCallbackObj();

            $scope.audioCallback.arrIndex = 1;
            $scope.audioCallback.type = "end";

            if (attempts == 2) {

                $timeout(function () {
                    $(currentTargetBubble).hide();
                    //angular.element('.playScreen .levelInstructionBtn').trigger("focus");
                    if($scope.defaultFocus == "WORDAUDIO"){
                        angular.element(".playScreen .repeatWordAudio").trigger("focus");
                    }
                    else{
                        angular.element(".playScreen .levelInstructionBtn").trigger("focus");
                    }
                }, 1000);
                if ($scope.playMode == "easy") {
                    if (configGrade == 2 && $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['name'] == 'Lesson 36') {
                        $scope.$broadcast("playAudioArray", ["incorrect_abrv236", correctAudio], $scope.audioCallback);
                    } else {
                        $scope.$broadcast("playAudioArray", ["incorrect", correctAudio], $scope.audioCallback);
                    }
                } else {
                    //if (configGrade == "K" && parseInt($scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['level']) <= 10) {
                    if ($scope.gameAnsType == "letters") {
                        $scope.$broadcast("playAudioArray", ["incorrect_lv2k", correctAudio], $scope.audioCallback);
                    } else if (configGrade == 2 && $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['name'] == 'Lesson 36') {
                        $scope.$broadcast("playAudioArray", ["incorrect2_lv2_abrv236", correctAudio], $scope.audioCallback);
                    } else {
                        $scope.$broadcast("playAudioArray", ["incorrect_lv2", correctAudio], $scope.audioCallback);
                    }
                }
                $scope.correctOptionsArr[$scope.currentOptions].attempts = attempts;
            } else {
                $timeout(function () {
                    var optionArray = angular.element('.wordContainer .active').children("span");

                    for (var i = 0; i < optionArray.length; i++) {
                        if (optionArray[i].innerHTML !== $scope.correctOption)
                            angular.element(optionArray[i].parentNode).hide();

                    }
                    $(currentTargetBubble).hide();
                    // AccessibilityManager.setFocus(".leafCover.active");
                }, 500);
                // $scope.showLetterInDropBox();
                $scope.$broadcast("playAudioArray", ["incorrect2", correctAudio], $scope.audioCallback);
                $scope.correctOptionsArr[$scope.currentOptions].attempts = attempts;
            }


            disableAllClicks = true;
            attempts--;
            if (attempts > 0) {
                $scope.allowOptionClick = true;
            } else {
                angular.element('.wordContainer .leafCover').addClass('disableOptions');
                $scope.allowOptionClick = false;
            }
            $scope.audioCallback.callbackRef = function () {
                $scope.allowOptionClick = true;
                // disableAllClicks = false;
                angular.element('.wordContainer .leafCover').removeClass('disableOptions');

                $scope.userAttempts = 0;
                if (attempts == 0) {
                    $scope.allowOptionClick = false;
                    $scope.correctOptionsArr[$scope.currentOptions].word = $scope.correctOption;
                    $scope.correctOptionsArr[$scope.currentOptions].attempts = attempts;
                    incorrectWordsArr.push($scope.correctOption);
                    $scope.loadNextQuestion();
                    $timeout(function () {
                        disableAllClicks = false;
                    }, 300);
                } else {
                    disableAllClicks = false;
                }
                $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["correctOptionsArr"] = $scope.correctOptionsArr;
            }

        }
        $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["attempt"] = true;
        $scope.$emit(APPCONSTANT.SAVE_TINCAN_DATA);
        $scope.setAllLevelData();
    };

    $scope.inactiveCorrectLetterPlacement = function () {
        var correctOptArr = $scope.puzzleWord;
        var word = $scope.wordSet[$scope.currentOptions][0];
        if (!(configGrade == "2" && $scope.levelLaunched == 29 && (word == "Mon." || word == "Tues." || word == "Dr." || word == "Rd." || word == "Feb." || word == "Mr." || word == "St." || word == "Sept." || word == "ft." || word == "in.")))
            var droopedLetterArr = $scope.droppedLetter.toLowerCase().split('');
        else
            var droopedLetterArr = $scope.droppedLetter.split('');

        var lastMisspelledIndex;

        $scope.highlightPos = [];
        var correctCounter = 0;

        for (var i = 0; i < $scope.puzzleWord.length; i++) {

            if (!(configGrade == "2" && $scope.levelLaunched == 29 && (word == "Mon." || word == "Tues." || word == "Dr." || word == "Rd." || word == "Feb." || word == "Mr." || word == "St." || word == "Sept." || word == "ft." || word == "in.")))
                correctOptArr[i] = correctOptArr[i].toLocaleLowerCase();
            if (correctOptArr[i] == droopedLetterArr[i]) {
                let ariaLabel = $($(".wordDrops")[i]).attr('aria-label');
                ariaLabel += ', ' + $scope.languageTxt.correct;
                $($(".wordDrops")[i]).addClass("disableDiv").attr('aria-label', ariaLabel);
                correctCounter = correctCounter + 1;
                var elemStr = '<span class="correctTickLevel2"><img src="./assets/images/icons/svg/green-check.svg"></span>'
                $($(".wordDrops")[i]).prepend(elemStr);
            } else {
                let ariaLabel = $($(".wordDrops")[i]).attr('aria-label');
                ariaLabel += ', ' + $scope.languageTxt.incorrect;
                $($(".wordDrops")[i]).addClass("transparentDiv").attr('aria-label', ariaLabel);
                if (attempts > 1 && $scope.highlightPos.length == 0) {
                    $scope.highlightPos.push(i);
                    $scope.currentDropIdx = i;
                }
            }
        }
        if (dropAttempts == 2) {
            $(".correctTickLevel2").css("opacity", "1");
        }
        if (dropAttempts == 2) {
            for (var j = 0; j < $scope.puzzleWord.length; j++) {

                if ($($(".wordDrops")[j]).hasClass("transparentDiv")) {
                    $($(".wordDrops")[j]).empty();
                    if (correctOptArr[j] == "'")
                        correctOptArr[j] = "SingleQuote";
                    if (correctOptArr[j] == ",")
                        correctOptArr[j] = "Comma";
                    if (correctOptArr[j] == ".")
                        correctOptArr[j] = "FullStop";


                    var clone = $($(".key_" + correctOptArr[j]).clone())[0];

                    if (clone == undefined) {
                        if (!$scope.isLowerCase)
                            correctOptArr[j] = correctOptArr[j].toUpperCase();
                        else
                            correctOptArr[j] = correctOptArr[j].toLowerCase();
                        clone = $($(".key_" + correctOptArr[j]).clone())[0];
                        if (configGrade == "2" && $scope.levelLaunched == 29 && (word == "Mon." || word == "Tues." || word == "Dr." || word == "Rd." || word == "Feb." || word == "Mr." || word == "St." || word == "Sept." || word == "ft." || word == "in.")) {
                            if (!$scope.isLowerCase)
                                clone.innerText = clone.innerText.toLowerCase();
                            else
                                clone.innerText = clone.innerText.toUpperCase();
                        }
                    }

                    $($(".wordDrops")[j]).prepend(clone);
                }
            }
            $scope.autoFillDropZones = true;
        }

        //For highlighting the last misspelled letter
        // if(!$scope.autoFillDropZones){
        //     for(var i = 0 ; i < $scope.puzzleWord.length ; i++){
        //         if(droopedLetterArr.indexOf(i) < 0 && correctOptArr[i] !== droopedLetterArr[i]){
        //             lastMisspelledIndex = null;
        //             lastMisspelledIndex = i;
        //         }
        //     }
        //     $scope.currentDropIdx = lastMisspelledIndex;
        // }else{
        //     $scope.currentDropIdx = -1;
        // }
    }

    $scope.deleteLetter = function () {
        dropId = "#letter_" + $scope.currentDropIdx;
        if($.trim($(dropId).text())!=''){
            $scope.setLiveText($scope.languageTxt.liveText.letterDeleted + ' ' + ($scope.currentDropIdx + 1));
            if ($(dropId).hasClass('disableDiv')) {
                $scope.currentDropIdx = Math.max(0, $scope.currentDropIdx - 1);
                return;
            }
            $(dropId).empty();
            $(dropId).removeClass("letterDroppedIn transparentDiv").attr('aria-label', $scope.languageTxt.liveText.dropzone + ' ' + ($scope.currentDropIdx + 1));
            $scope.showCheckAnswerBtn = false;
            if ($scope.highlightPos.indexOf($scope.currentDropIdx) >= 0) {
                $scope.highlightPos.splice($scope.highlightPos.indexOf($scope.currentDropIdx), 1);
            }
        }
        else{
            $scope.currentDropIdx = Math.max(0, $scope.currentDropIdx - 1);
        }
    }

    $scope.letterClick = function (evt) {
        var clickedLetterClass = $(evt.currentTarget)[0].classList;

        var key = "";
        if ($(evt.currentTarget).hasClass('backspace')) {
            $scope.deleteLetter();
        } else {
            for (var i = 0; i < clickedLetterClass.length - 1; i++) {
                if (clickedLetterClass[i].indexOf("key_") !== -1) {
                    var temp = clickedLetterClass[i].split("_");
                    key = temp[temp.length - 1];
                }
            }
            $scope.showLetterInDropBox("", "", key);

            var liveText = "";
            if ($(evt.currentTarget).hasClass('key_SingleQuote')) {
                liveText = $scope.languageTxt.liveText.singleQuote + ' ' + $scope.languageTxt.liveText.addedIn + ' ' + ($scope.currentDropIdx + 1);
            } else if ($(evt.currentTarget).hasClass('key_FullStop')) {
                liveText = $scope.languageTxt.liveText.fullstop + ' ' + $scope.languageTxt.liveText.addedIn + ' ' + ($scope.currentDropIdx + 1);
            } else {
                liveText = $scope.languageTxt.liveText.letter + ' ' + $(evt.currentTarget).text() + ' ' + $scope.languageTxt.liveText.addedIn + ' ' + ($scope.currentDropIdx + 1);
            }

            // console.log("liveText>>>", liveText);
            $scope.setLiveText(liveText);
        }
    }

    $scope.droppableClickHandler = function (nIndex) {
        $scope.currentDropIdx = nIndex;
        const txt = $scope.languageTxt.liveText.dropzone + ` ${nIndex + 1} ` + $scope.languageTxt.liveText.selected;
        $scope.setLiveText(txt);
    }

    $scope.$on("ItemDropped", function (evt, data) {
        $scope.showLetterInDropBox(evt, data);
    });

    $scope.showLetterInDropBox = function (evt, data, key) {
        if ($scope.disableDrop) {
            return;
        }
        var counter = 0;
        var clone;
        var dropId;
        $scope.userAttempts = -1;
        var isDragDrop = false;

        if (data) {
            clone = $(data.ui.draggable).clone();
            $scope.currentDroppedID = data.event.target.id.split("_");
            $scope.currentDropIdx = parseInt($scope.currentDroppedID[$scope.currentDroppedID.length - 1]);
            if(!key || key == ""){
                key =  $(clone).text()
                isDragDrop = true;
            }
        } else {
            clone = $(".key_" + key).clone();
            if (!$scope.isLowerCase && clone.length == 0) {
                key = key.toUpperCase();
                clone = $(".key_" + key).clone();
            }
            if ($scope.isLowerCase && clone.length == 0) {
                key = key.toLowerCase();
                clone = $(".key_" + key).clone();
            }
        }
        var liveText = "";
        if ($(clone).hasClass('key_SingleQuote')) {
            liveText = $scope.languageTxt.liveText.singleQuote + ' ' + $scope.languageTxt.liveText.addedIn + ' ' + ($scope.currentDropIdx + 1);
        } else if ($(clone).hasClass('key_FullStop')) {
            liveText = $scope.languageTxt.liveText.fullstop + ' ' + $scope.languageTxt.liveText.addedIn + ' ' + ($scope.currentDropIdx + 1);
        } else {
            liveText = $scope.languageTxt.liveText.letter + ' ' + $(clone).text() + ' ' + $scope.languageTxt.liveText.addedIn + ' ' + ($scope.currentDropIdx + 1);
        }

        // console.log("liveText>>>", liveText);
        $scope.setLiveText(liveText);

        dropId = "#letter_" + $scope.currentDropIdx;
        clone.addClass('droppedItem');
        if ($(dropId).hasClass('disableDiv')) {
            return;
        }
        $scope.disableDrop = true;
        if ($(clone[0]).hasClass('backspace')) {
            $scope.deleteLetter();
        } else {
            if (!$scope.autoFillDropZones) {
                $($(clone)[0]).attr({ 'tabindex': '-1', 'aria-hidden': true });
                $(dropId).empty();
                if(window.event.shiftKey){
                    if(!isDragDrop){
                        var inputChar = $(clone)[0].textContent;
                        if (inputChar >= 'A' && inputChar <= 'Z'){
                            if($scope.isLowerCase){
                                inputChar = inputChar.toUpperCase();
                            }
                            else{
                                inputChar = inputChar.toLowerCase();
                            }
                        }
                        else{
                            if($scope.isLowerCase){
                                inputChar = inputChar.toUpperCase();
                            }
                            else{
                                inputChar = inputChar.toLowerCase();
                            }
                        }
                        $(clone).find("span.ng-binding").html(inputChar);
                    }
                }
                $(dropId).prepend($(clone)[0]);
                $(dropId).removeClass("transparentDiv").addClass("letterDroppedIn");
                let dzAriaLable = $scope.languageTxt.liveText.dropzone + ' ' + ($scope.currentDropIdx + 1);
                dzAriaLable += ', ' + (key == 'SingleQuote' || key == 'FullStop' ? key : $scope.languageTxt.liveText.letter + ' ' + key);
                $(dropId).attr('aria-label', dzAriaLable);
                console.log(dzAriaLable);
            }
        }
        //Show checkAnswer button if all the dropzones are filled
        $timeout(function () {
            for (var i = 0; i < $scope.puzzleWord.length; i++) {
                if ($(".wordDrops")[i].children.length != 0 && !$("#letter_" + i).hasClass("transparentDiv")) {
                    counter++;
                }
                if (counter >= $scope.puzzleWord.length) {
                    $scope.showCheckAnswerBtn = true;
                    $timeout(function () {
                        angular.element('.checkAnserBtn').trigger('focus');
                    }, 200);
                }
            }

            if ($scope.highlightPos.indexOf($scope.currentDropIdx) < 0) {
                $scope.highlightPos.push($scope.currentDropIdx);
            }
            var i = 0;
            for (i = ($scope.currentDropIdx + 1); i < $scope.puzzleWord.length; i++) {
                if ($scope.highlightPos.indexOf(i) < 0 && !$("#letter_" + i).hasClass("disableDiv")) {
                    $scope.currentDropIdx = i;
                    break;
                }
            }
            if (i >= $scope.puzzleWord.length) {
                for (var j = 0; j < $scope.currentDropIdx; j++) {
                    if ($scope.highlightPos.indexOf(j) < 0 && !$("#letter_" + i).hasClass("disableDiv")) {
                        $scope.currentDropIdx = j;
                        break;
                    }
                }
            }
            $timeout(function () {
                $scope.disableDrop = false;
            }, 200);

        }, 200);
    }

    $scope.checkAnswerClick = function () {
        $scope.isReload = false;
        $scope.userAttempts = attempts;
        if (disableAllClicks == true) {
            return;
        }
        dropAttempts++;
        $scope.showCheckAnswerBtn = false;
        // AccessibilityManager.setFocus('.feedbackTable .tableData');
        $scope.droppedLetter = "";
        for (var i = 0; i < $scope.puzzleWord.length; i++) {
            var addLetter = $($(".wordDrops")[i]).find(".droppedItem span").text().split("")[0];
            if (!addLetter || addLetter == "" || addLetter == " ") {
                if ($($(".wordDrops")[i]).find(".droppedItem").hasClass("key_SingleQuote"))
                    addLetter = "'";
                if ($($(".wordDrops")[i]).find(".droppedItem").hasClass("key_Comma"))
                    addLetter = ",";
                if ($($(".wordDrops")[i]).find(".droppedItem").hasClass("key_FullStop"))
                    addLetter = ".";
            }
            //console.log("addLetter",addLetter)
            $scope.droppedLetter = $scope.droppedLetter + addLetter;
        }

        $scope.optionClick();
        $scope.inactiveCorrectLetterPlacement();
    }

    $scope.backBtnClick = function () {
        if (disableAllClicks === true) {
            return;
        }
        $scope.$broadcast("stopAudio");
        $scope.$broadcast("togglepopup", "back_" + $scope.language);
        // AccessibilityManager.disableElements([".playScreen"]);
    };

    $scope.checkAllLevelPass = function () {
        /*var isAllLevelPass = true;
        angular.forEach($scope.levelGroups, function (value) {
            angular.forEach(value, function (val) {
                angular.forEach(val['modes'], function (v, k) {
                    if (v['isPass'] == "No") {
                        isAllLevelPass = false;
                    }
                });
            });
        });*/
        var isAllLevelPass = false;
        var l1pass = $scope.IsLevel1PassedOnce();
        var l2pass = $scope.IsLevel2PassedOnce();
        if(l1pass && l2pass){
            isAllLevelPass = true;
        }
        return isAllLevelPass;
    }

    $scope.IsLevel1AllAttemptsFailed = function () {
        var allFailed = false;
        if($scope.levelGroups[$scope.currentLevelGroup]!=undefined){
            var attempts = $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"]['easy']["attempts"];
            if(attempts != undefined && attempts != null && attempts.length>=3){
                allFailed = true;
                for(var i=0;i<attempts.length;i++) {
                    //console.log("attempts[i].percentComplete: " + attempts[i].percentComplete)
                    if (attempts[i].isPass == "Yes") {
                        allFailed = false;
                        break;
                    }
                }
            }
        }
        //console.log("oncePassed: " + oncePassed)
        return allFailed;
    }

    $scope.IsLevel1PassedOnce = function () {
        var oncePassed = false;
        if($scope.levelGroups[$scope.currentLevelGroup]!=undefined){
            var attempts = $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"]['easy']["attempts"];
            if(attempts != undefined && attempts != null && attempts.length>0){
                for(var i=0;i<attempts.length;i++) {
                    //console.log("attempts[i].percentComplete: " + attempts[i].percentComplete)
                    if (attempts[i].isPass == "Yes") {
                        oncePassed = true;
                        break;
                    }
                }
            }
        }
        //console.log("oncePassed: " + oncePassed)
        return oncePassed;
    }

    $scope.IsLevel2PassedOnce = function () {
        var oncePassed = false;
        if($scope.levelGroups[$scope.currentLevelGroup]!=undefined){
            var attempts = $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"]['challenge']["attempts"];
            if(attempts != undefined && attempts != null && attempts.length>0){
                for(var i=0;i<attempts.length;i++) {
                    //console.log("attempts[i].percentComplete: " + attempts[i].percentComplete)
                    if (attempts[i].isPass == "Yes") {
                        oncePassed = true;
                        break;
                    }
                }
            }
        }
        //console.log("oncePassed: " + oncePassed)
        return oncePassed;
    }

    $scope.$on("popupConfirm", function (evt, type) {
        if (type == "back") {
            $scope.showHomeScreen();
        }
        if (type == "end") {
            disableAllClicks = true;
            $scope.refreshAudioCallbackObj();
            $scope.audioCallback.type = "end";
            $scope.audioCallback.callbackRef = function () {
                disableAllClicks = false;
                $scope.gotoLevelScreen();
            };
            $scope.$broadcast('playAudio', 'click', $scope.audioCallback);
        }
        if (type == "reload" || type == "submit") {
            $scope.showFishAnimation = false;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
            $scope.$broadcast('stopAudio');
            $scope.showEndPopup = false;
            if (type == "submit") {
                //APT: Save tincan data on Submit//below two lines need to uncomment if need to submit score on platform.
                $scope.$emit("SUBMIT_TINCAN_DATA"); // To Submit data on Realize
                console.log("SUBMIT_TINCAN_DATA...!!!");
            } else {
                $scope.$emit(APPCONSTANT.SAVE_TINCAN_DATA); // To update score on save
                console.log("SAVE_TINCAN_DATA...!!!");
            }    
            $timeout(function () {
                $scope.closeScreenOverlay();
                $scope.setupHomeScreenAriaAttr();
                angular.element(".splashScreen .splashScreenAudioBtn").trigger("focus");

                //APT: Code to close Platform Player window.
                $scope.ClosePlayerAndGotoRealisePlatform();

            }, 200);
        }
    });

    $scope.ClosePlayerAndGotoRealisePlatform = function(evet, type){
        var platformBackButton = top.document.querySelector(".back-button .hydrated");
        if(platformBackButton!=undefined && platformBackButton != null){
            var shadowrootnm1 = top.document.querySelector(".back-button .hydrated").shadowRoot;
            shadowrootnm1.querySelector('button.icon-button').click();
        }
        else{
            platformBackButton = top.document.querySelector(".backButton__wrapper .hydrated")
            if(platformBackButton!=undefined && platformBackButton != null){
                var shadowrootnm2 =  top.document.querySelector(".backButton__wrapper .hydrated").shadowRoot;
                //shadowrootnm2.querySelector('button.icon-button').click()
                shadowrootnm2.querySelector('.icon-inner').click();
            }
        }  
        if(platformBackButton==null || platformBackButton == undefined){
            $scope.screenType = 1;
        } 
    }

    $scope.$on("popupClosed", function (evt, type) {
        if (type == "back") {
            
        }
        if (type == "reload" || type == "reload_en") {
            
            $timeout(function () {
                if ($scope.showEndPopup) {
                    angular.element(".endMsgOverlay, .endMsgOverlay button").removeAttr("aria-hidden tabindex");
                    angular.element(".levelEndPopup .turninlink").trigger("focus");
                } else {
                    $scope.closeScreenOverlay();
                    if(angular.element(".playScreen .levelexitBtn:visible").length>0){
                        angular.element(".playScreen .levelexitBtn").trigger("focus");
                    }
                    else{
                        angular.element(".splashScreen .turninlink").trigger("focus");
                    }
                }
            }, 200);
        }
        if (type == "submit" || type == "submit_en") {
            $timeout(function () {
                if ($scope.showEndPopup) {
                    angular.element(".endMsgOverlay, .endMsgOverlay button").removeAttr("aria-hidden tabindex");
                    angular.element(".levelEndPopup .turninbutton").trigger("focus");
                } else {
                    $scope.closeScreenOverlay();
                    //angular.element(".levelScreen .levelexitBtn").trigger("focus");
                    if(angular.element(".playScreen .levelexitBtn:visible").length>0){
                        angular.element(".playScreen .levelexitBtn").trigger("focus");
                    }
                    else{
                        angular.element(".splashScreen .turninbutton").trigger("focus");
                    }
                }
            }, 200);
        }
    });

    $scope.audioBtnClick = function () {
        if (disableAllClicks === true) {
            return;
        }
        // disableAllClicks = true;
        $scope.$broadcast("stopAudio");
        $scope.playCurrentWord();
    };

    $scope.levelCompleteHandle = function () {
        // $scope.currentOptions = -1;
        $scope.updateScore();
        $scope.levelEndTime = new Date();
        var feedbackStr = $scope.languageTxt["feedbacks"][$scope.currentLvlPoints];
        angular.element(".popupContainer").scope().cancelTxt = feedbackStr;

        var rewardAudArr = [];
        var userScore = $scope.levelScore.toString();
        var totalScore = $scope.wordSet.length;
        $scope.puzzleWord = "";
        totalScore = totalScore.toString();
        //APT: Multiple Attempts
        $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["complete"] = true;
        $scope.addToAttempts();
        if ($scope.percentComplete >= $scope.unlockThresh) {
            
            $scope.showFishAnimation = true;
            angular.element('.endLevelFishes').css('display', 'block');
            
            if ($scope.checkAllLevelPass()){
                //if (configGrade == "K" && parseInt($scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['level']) <= 10) {
                if ($scope.gameAnsType == "letters") {
                    rewardAudArr = ["r6", "r1_l2_pass", userScore, "r2", totalScore, "r3_k"];
                }
                else{
                    rewardAudArr = ["r6", "r1_l2_pass", userScore, "r2", totalScore, "r3_k12"];
                }
            }   
            else {
                if ($scope.playMode == "challenge") {
                    //if (configGrade == "K" && parseInt($scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['level']) <= 10) {
                    if ($scope.gameAnsType == "letters") {
                        rewardAudArr = ["r1_l2_pass", userScore, "r2", totalScore, "r3_k"];
                    } else {
                        rewardAudArr = ["r1_l2_pass", userScore, "r2", totalScore, "r3_k12"];
                    }
                } else {
                    //if (configGrade == "K" && parseInt($scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['level']) <= 10) {
                    if ($scope.gameAnsType == "letters") {
                        rewardAudArr = ["r1", userScore, "r2", totalScore, "r3_k"];
                    } else {
                        rewardAudArr = ["r1", userScore, "r2", totalScore, "r3_k12"];
                    }
                }
                // rewardAudArr = ["r1", userScore, "r2", totalScore, "r3"];
            }

        } else {
            if ($scope.playMode == "challenge") {
                //if (configGrade == "K" && parseInt($scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['level']) <= 10) {
                var attempts = $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["attempts"];
                if(attempts != undefined && attempts != null && attempts.length>=3){
                    if ($scope.gameAnsType == "letters") {
                        rewardAudArr = ["r4_l2_fail", userScore, "r2", totalScore, "r5_k_lastatt"];
                    } else {
                        rewardAudArr = ["r4_l2_fail", userScore, "r2", totalScore, "r5_k12_lastatt"];
                    }
                }
                else{
                    if ($scope.gameAnsType == "letters") {
                        rewardAudArr = ["r4_l2_fail", userScore, "r2", totalScore, "r5_k"];
                    } else {
                        rewardAudArr = ["r4_l2_fail", userScore, "r2", totalScore, "r5_k12"];
                    }
                }
            } else {
                //if (configGrade == "K" && parseInt($scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['level']) <= 10) {
                var attempts = $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["attempts"];
                if(attempts != undefined && attempts != null && attempts.length>=3){
                    if ($scope.gameAnsType == "letters") {
                        rewardAudArr = ["r4", userScore, "r2", totalScore, "r5_k_lastatt"];
                    } else {
                        rewardAudArr = ["r4", userScore, "r2", totalScore, "r5_k12_lastatt"];
                    }
                }
                else{
                    if ($scope.gameAnsType == "letters") {
                        rewardAudArr = ["r4", userScore, "r2", totalScore, "r5_k"];
                    } else {
                        rewardAudArr = ["r4", userScore, "r2", totalScore, "r5_k12"];
                    }
                }
            }
            // rewardAudArr = ["r4", userScore, "r2", totalScore, "r5"];
            $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode].currentQuestion = -1;
        }
        if (!$scope.$$phase) {
            $scope.$apply();
        }
        $scope.$broadcast('stopAudio');
        $scope.showEndPopup = true;
        $scope.refreshAudioCallbackObj();
        // disableAllClicks = true;
        $scope.audioCallback.type = "end";
        $scope.audioCallback.arrIndex = rewardAudArr.length - 1;
        $scope.audioCallback.callbackRef = function () {
            // disableAllClicks = false;
        };
        $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["date"] = $scope.getDateString($scope.gameStartTime) + ' ' + $scope.getTimeString($scope.levelEndTime);
        $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["timeSpent"] = $scope.millisToMinutesAndSeconds(new Date($scope.levelEndTime) - new Date($scope.gameStartTime));
        $timeout(function () {
            $scope.$broadcast("playAudioArray", rewardAudArr, $scope.audioCallback);
            angular.element(".buttonInnerWrap button:first").trigger("focus");
            $scope.openScreenOverlay();
        }, 500);

        $scope.$emit(APPCONSTANT.SAVE_TINCAN_DATA); // to update score on save
        $scope.setAllLevelData();
    };

    $scope.updateScore = function () {
        var prevScore = $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["score"];
        $scope.percentComplete = 100 * $scope.levelScore / $scope.wordSet.length;
        var newScore = $scope.levelScore;
        // $scope.currentLvlPoints = newScore;
        if ($scope.percentComplete >= $scope.unlockThresh) {
            $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["isPass"] = $scope.languageTxt.yesTxt;
        } else {
            $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["isPass"] = $scope.languageTxt.noTxt;
        }
        if (newScore > prevScore) {
            $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["score"] = newScore;
            // console.log("$scope.userScore inside update score function", $scope.userScore);
            $scope.userScore = $scope.userScore + (newScore - prevScore);
            //APT - Why WordSet is assigned here??. //Commented Below line as not required.
            $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["wordset"] = levelWordList;
            $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["incorrectWords"] = incorrectWordsArr;
            $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["correctWords"] = correctWordsArr;
        }
        $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["percentComplete"] = $scope.percentComplete + "%";
    };


    $scope.gotoLevelScreen = function () {
        var newUnlockType = "none";
        var insufficientPoints = false;

        // set state of current level
        $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["attempt"] = true;

        if ($scope.percentComplete >= $scope.unlockThresh) {
            $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["complete"] = true;
        }

        // unlock next level 
        if (
            $scope.playMode == "easy" &&
            !$scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"]["challenge"]["active"]
        ) {
            if ($scope.percentComplete >= $scope.unlockThresh) {
                $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"]["challenge"]["active"] = true;
                newUnlockType = "node";
            } else {
                insufficientPoints = true;
            }
        }

        // check for next level unlock
        // Change from original logic. Check for medium and unlock only easy of next level
        if ($scope.playMode == "challenge") {

            if (
                $scope.currentLevel < $scope.levelGroups[$scope.currentLevelGroup].length - 1 &&
                !$scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel + 1]["modes"]["easy"]["active"]
            ) {
                if ($scope.percentComplete >= $scope.unlockThresh) {
                    $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel + 1]["modes"]["easy"]["active"] = true;
                    $scope.zoomedLevel++;
                    newUnlockType = "level";
                } else {
                    insufficientPoints = true;
                }
            } else if (
                $scope.currentLevel >= $scope.levelGroups[$scope.currentLevelGroup].length - 1 &&
                $scope.currentLevelGroup < $scope.totalGroups &&
                !$scope.levelGroups[$scope.currentLevelGroup + 1][0]["modes"]["easy"]["active"]
            ) {
                if ($scope.percentComplete >= $scope.unlockThresh) {
                    $scope.levelGroups[$scope.currentLevelGroup + 1][0]["modes"]["easy"]["active"] = true;
                    newUnlockType = "level";
                } else {
                    insufficientPoints = true;
                }
            } else {
                // all levels active and attempted
            }

        }

        // $scope.screenType = 2;
        disableAllClicks = false;
        $timeout(function () {
            $scope.$emit(APPCONSTANT.SAVE_TINCAN_DATA);
            $scope.setAllLevelData();
        }, 500)
    };

    $scope.levelPageNav = function (evt, dir) {
        if (angular.element(evt.currentTarget).hasClass('disable')) {
            return;
        }
        switch (dir) {
            case 1:
                $scope.currentLevelGroup = $scope.currentLevelGroup - 1;
                break;
            case 2:
                $scope.currentLevelGroup = $scope.currentLevelGroup + 1;
                break;
        }
        $timeout(function () {
            angular.element(angular.element(".levelMode")[0]).trigger("focus");
        }, 200);
    };

    function shuffleArray(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };

    $scope.$on("audioStarted", function (evt, data, callback) {
        //$scope.isAudioPlaying = true;
        //$scope.repeatWordAudioPlaying = true;
        if (callback && callback.callbackRef && (callback.type == "start")) {
            if (callback.delay >= 0) {
                $timeout(function () {
                    callback.callbackRef.apply(callback.thisRef, callback.params);
                }, callback.delay)
            } else {
                callback.callbackRef.apply(callback.thisRef, callback.params);
            }
        }
    });

    $scope.$on("audioEnd", function (evt, data, callback) {
        $scope.isAudioPlaying = false;
        $scope.repeatWordAudioPlaying = false;
        if (callback && callback.callbackRef && (callback.type == "end")) {
            if (callback.delay >= 0) {
                $timeout(function () {
                    callback.callbackRef.apply(callback.thisRef, callback.params);
                }, callback.delay)
            } else {
                callback.callbackRef.apply(callback.thisRef, callback.params);
            }
        }
    });

    $scope.gameParentClick = function (evt) {
        if ($(evt.target).hasClass('gameInfoContainer') || $(evt.target).hasClass('infoAudio') || $(evt.target).hasClass('infoTxt') || $(evt.target).hasClass('gameInfoBtn')) {
            return;
        }

        if ($scope.showLevelInfo == true) {
            $scope.closeLevelInfo();
        }
    };

    $scope.$on("saveViewTincanData", function(evt, turnedIn) {
        //TincanManager.updateTincanData($scope.$parent.appData.data.tincan, "total_score", tincanScore);
        TincanManager.updateTincanData($scope.$parent.appData.data.tincan, "total_score", $scope.getUserScore());
        TincanManager.updateTincanData($scope.$parent.appData.data.tincan, "restoreGame", true);
        if(turnedIn == true){
            $scope.TurnedIn = true;
        }
        $scope.saveGameState();
    });

    $scope.getUserScore = function () {
        var totalScore = 0;
        var l1pass = $scope.IsLevel1PassedOnce();
        var l2pass = $scope.IsLevel2PassedOnce();
        if(l1pass){
            totalScore = totalScore + 1;
        }
        if(l2pass){
            totalScore = totalScore + 2;
        }
        //console.log(totalScore);
        return totalScore;
    }

    $scope.reportHeadClick = function (type) {
        if (type == 1) {
            $scope.showOverall = true;
        }
        if (type == 2) {
            $scope.showOverall = false;
            setTimeout(function () {
                $($(".reportHeading")[1]).focus();
            }, 300);
        }
    };

    $scope.generateReport = function () {
        $scope.$emit(APPCONSTANT.SAVE_TINCAN_DATA);
        $scope.setAllLevelData();
        if ($scope.$parent.appData.data.tincan.userDetails != undefined)
            $scope.userName = $scope.$parent.appData.data.tincan.userDetails.userId;
        var masterWordList = [];
        var masterResponseList = [];
        var lvlObj;
        $scope.reportLevels = [];
        $scope.currentReportLevel = 0;
        $scope.showOverall = true;
        $scope.reportTableHeading = [$scope.languageTxt.island.toUpperCase(), $scope.languageTxt.levelTxt.toUpperCase(), $scope.languageTxt.timeSpentTxt.toUpperCase(), $scope.languageTxt.percentCorrectTxt.toUpperCase(), $scope.languageTxt.targetWordTxt.toUpperCase(), $scope.languageTxt.ans1.toUpperCase(), $scope.languageTxt.ans2.toUpperCase()];
        angular.element(".splashScreen .splashReportBtn").addClass('disableReportBtn');
        angular.forEach($scope.levelGroups, function (group) {
            angular.forEach(group, function (level) {
                var lvlObj = null;
                //angular.forEach(level['modes'], function (currmode, mode) {
                var loclevels = ['easy','challenge'];
                angular.forEach(loclevels, function (mode) {
                    var currmode = level['modes'][mode];
                    if (currmode.active || (currmode.attempts &&  currmode.attempts.length>0)) {
                        if (!lvlObj && currmode['wordset'] && currmode['wordset'].length > 0) {
                            lvlObj = {
                                number: level.level,
                                words: currmode['wordset'],
                                correct: [],
                                levelRef: level,
                                levelRef: JSON.parse(JSON.stringify(level))
                            };
                        }
                        //if(!currmode.complete){
                        var attempts = level["modes"][mode]["attempts"];
                        if(attempts!=undefined &&  attempts!=null && attempts.length>0){
                            var bestAttIndex = -1;
                            var bestscore = 0;
                            for(var i=0;i<attempts.length;i++){
                                if(attempts[i]["score"]>=bestscore){
                                    bestscore = attempts[i]["score"];
                                    bestAttIndex = i;
                                }
                            }
                            if(bestAttIndex!=-1){
                                if(attempts[bestAttIndex]["correctOptionsArr"]){
                                    lvlObj.levelRef["modes"][mode]["correctOptionsArr"] = [...attempts[bestAttIndex]["correctOptionsArr"]];
                                }
                                else{
                                    lvlObj.levelRef["modes"][mode]["correctOptionsArr"] = [];
                                }
                                if(attempts[bestAttIndex]["correctWords"]){
                                    lvlObj.levelRef["modes"][mode]["correctWords"] = [...attempts[bestAttIndex]["correctWords"]];
                                }
                                else{
                                    lvlObj.levelRef["modes"][mode]["correctWords"] = [];
                                }
                                lvlObj.levelRef["modes"][mode]["date"] = attempts[bestAttIndex]["date"];
                                if(attempts[bestAttIndex]["incorrectWords"]){
                                    lvlObj.levelRef["modes"][mode]["incorrectWords"] = [...attempts[bestAttIndex]["incorrectWords"]];
                                }
                                else{
                                    lvlObj.levelRef["modes"][mode]["incorrectWords"] = [];
                                }
                                if(attempts[bestAttIndex]["responses"]){
                                    lvlObj.levelRef["modes"][mode]["responses"] = [...attempts[bestAttIndex]["responses"]];
                                }
                                else{
                                    lvlObj.levelRef["modes"][mode]["responses"] = [];
                                }
                                lvlObj.levelRef["modes"][mode]["score"] = attempts[bestAttIndex]["score"];
                                lvlObj.levelRef["modes"][mode]["timeSpent"] = attempts[bestAttIndex]["timeSpent"];
                                if(attempts[bestAttIndex]["wordset"]){
                                    lvlObj.levelRef["modes"][mode]["wordset"] = [...attempts[bestAttIndex]["wordset"]];
                                }
                                else{
                                    lvlObj.levelRef["modes"][mode]["wordset"] = [];
                                }
                                lvlObj.levelRef["modes"][mode]["percentComplete"] = attempts[bestAttIndex]["percentComplete"];
                                lvlObj.levelRef["modes"][mode]["currentQuestion"] = attempts[bestAttIndex]["currentQuestion"];
                                lvlObj.levelRef["modes"][mode]["isPass"] = attempts[bestAttIndex]["isPass"];
                            }
                        }
                        else{
                            if(lvlObj && lvlObj.levelRef["modes"][mode]){
                                lvlObj.levelRef["modes"][mode]["correctOptionsArr"] = [];
                                lvlObj.levelRef["modes"][mode]["correctWords"] = [];
                                lvlObj.levelRef["modes"][mode]["incorrectWords"] = [];
                                lvlObj.levelRef["modes"][mode]["responses"] = [];
                                lvlObj.levelRef["modes"][mode]["wordset"] = [];
                            }
                        }
                    }
                    else{
                        if(lvlObj && lvlObj.levelRef["modes"][mode]){
                            lvlObj.levelRef["modes"][mode]["correctOptionsArr"] = [];
                            lvlObj.levelRef["modes"][mode]["correctWords"] = [];
                            lvlObj.levelRef["modes"][mode]["incorrectWords"] = [];
                            lvlObj.levelRef["modes"][mode]["responses"] = [];
                            lvlObj.levelRef["modes"][mode]["wordset"] = [];
                        }
                    }
                });
                if (lvlObj) {
                    // console.log("lvlObj==", lvlObj)
                    $scope.reportLevels.push(lvlObj);
                }
            })
        });
        // if($scope.reportLevels.length >= 2){
        //     $(".reportDataTable .gameReportContent").css('width', 'calc(100% + 17px)');
        // }else{
        //     $(".reportDataTable .gameReportContent").css('width', '100%');
        // }
        var timeStr = $scope.$parent.appData.data.tincan.time_in_units;
        $scope.totalTime = TincanManager.getTimeInWords(timeStr);

        $scope.totalWordsAttempted = masterWordList.length;
        $scope.correctWordsAnswered = masterResponseList.length;
        // console.log("$scope.reportLevels", $scope.reportLevels)
        if ($scope.reportLevels == undefined || $scope.reportLevels == null || $scope.reportLevels.length == 0) {
            $scope.blankReport = true;
            $timeout(function () {
                angular.element(".blankGameReport .reportCloseIcon").trigger("focus");
                AccessibilityManager.trapBlankReportFocus();
            }, 200);
        } else {
            // console.log("$scope.reportLevels", $scope.reportLevels[0].levelRef.modes["easy"].score, $scope.reportLevels[0].levelRef.modes["challenge"].score)
            if ($scope.reportLevels[0].levelRef.modes["easy"]["responses"].length > 0 
            || $scope.reportLevels[0].levelRef.modes["challenge"]["responses"].length > 0) {
                $scope.showReport = true;
                $timeout(function () {
                    AccessibilityManager.trapGameReportFocus();
                    angular.element(".gameReportContainer .reportCloseIcon").trigger("focus");
                    angular.element(".reportDataTable table thead").addClass("tableHead");
                }, 500);
            } else {
                $scope.blankReport = true;
                $timeout(function () {
                    angular.element(".blankGameReport .reportCloseIcon").trigger("focus");
                }, 200);
            }
        }
        $scope.openScreenOverlay();
    };

    $scope.downloadReport = function (evt) {
        // var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
        var arrData = $scope.reportLevels;
        var CSV = '';
        //Set Report title in first row or line

        var ReportTitle = $scope.languageTxt.spellingVoyageTxt;
        var ReportSubtitle = $scope.languageTxt.passingTxt + $scope.unlockThresh + "%";
        var StudentId = "";
        if ($scope.$parent.appData.data.tincan.userDetails != undefined){
            StudentId = $scope.languageTxt.studentIdTxt + ": " + $scope.$parent.appData.data.tincan.userDetails.userId;
        } 
        else{
            StudentId = $scope.languageTxt.studentIdTxt + ": ";
        }

        CSV += ReportTitle + '\r\n' + ReportSubtitle + '\r\n' + StudentId + '\r\n\n';

        var MainHeading = [$scope.languageTxt.island, $scope.languageTxt.levelTxt, $scope.languageTxt.dateNtimeTxt, $scope.languageTxt.comNpassTxt, $scope.languageTxt.timeSpentLvl, $scope.languageTxt.perCompTxt, $scope.languageTxt.patternNrule, $scope.languageTxt.targetWordTxt, $scope.languageTxt.studentAns1, $scope.languageTxt.studentAns2];

        //This condition will generate the Label/Header
        var row = "";
        for (var index = 0; index < MainHeading.length; ++index) {
            row += MainHeading[index] + ',';
        }
        row = row.slice(0, -1);
        CSV += row + '\r\n';

        //1st loop is to extract each row
        for (var i = 0; i < arrData.length; i++) {
            //2nd loop will extract each column and convert it in string comma-seprated
            // for (var index in arrData[i]) {
            //     row += '"' + arrData[i][index] + '",';
            // }            

            var currentObj = arrData[i].levelRef;

            //var modes = Object.keys(currentObj.modes);
            var modes = ['easy','challenge'];

            for (var j = 0; j < modes.length; ++j) {
                var modeObj = currentObj['modes'][modes[j]];
                //                if(j > 0){
                //                    var previousObj = currentObj['modes'][modes[j-1]];
                //                    var timeSpent = $scope.calculateLevelTime(modeObj['timeSpent'],previousObj['timeSpent']);
                //                    console.log("modeObj['timeSpent']",previousObj['timeSpent'],modeObj['timeSpent'])
                //                }
                if (j == 0) {
                    $scope.numOfWordsInLevel = modeObj['responses'].length;
                }

                for (var ctr = 0; ctr < modeObj['responses'].length; ++ctr) {

                    var row = "";
                    if (ctr == 0) {
                        var currentRule = currentObj.rule;
                        currentRule = currentRule.replace(/,/g, '');
                        row = row + currentObj.name + ',' + modeObj['modeName'] + ',' + modeObj['date'] + "," + modeObj['isPass'] + ',' +
                            modeObj['timeSpent'] + ',' + modeObj['percentComplete'] + "," + currentRule + "," + " " + "," + " " + "," + " " + ","

                        row = row + '\r\n' + currentObj.name + "," + modeObj['modeName'] + "," + " " + "," + " " + "," + " " + "," + " " + "," + " " + "," + modeObj['responses'][ctr]['target'] + ',' + modeObj['responses'][ctr]['attempt1'] + ',' + modeObj['responses'][ctr]['attempt2'] + ",";
                    } else {
                        row = row + currentObj.name + "," + modeObj['modeName'] + "," + " " + "," + " " + "," + " " + "," + " " + "," + " " + "," + modeObj['responses'][ctr]['target'] + ',' + modeObj['responses'][ctr]['attempt1'] + ',' + modeObj['responses'][ctr]['attempt2'] + ",";
                    }
                    // row = row + modeObj['responses'][ctr]['target'] + ',' + modeObj['responses'][ctr]['attempt1'] + ',' + modeObj['responses'][ctr]['attempt2'] + ",";
                    if (modeObj['correctWords'] && modeObj['correctWords'].indexOf(modeObj['responses'][ctr]['target']) >= 0) {
                        row = row + "Correct";
                    } else {
                        row = row + "Incorrect";
                    }
                    row.slice(0, row.length - 1);
                    //add a line break after each row
                    CSV += row + '\r\n';

                    if (ctr == modeObj['responses'].length - 1) {
                        row = " " + "," + " " + "," + " " + "," + " " + "," + " " + "," + " " + "," + " " + "," + " " + "," + " " + "," + " " + "," + " " + ",";
                        CSV += row + '\r\n';
                    }
                }
            }

            // CSV += '\r\n';
        }

        if (CSV == '') {
            alert("Invalid data");
            return;
        }

        //Generate a file name
        var fileName = "MyReport_";

        //this will remove the blank-spaces from the title and replace it with an underscore
        fileName += ReportTitle.replace(/ /g, "_");
        fileName += ".xlsx";
        $scope.createXLS(CSV, fileName);
    };

    $scope.createXLS = function (csv, fileName) {
        // Library source: https://www.codeproject.com/Articles/1197349/Excel-files-in-Javascript-the-simple-way

        var rowArr = csv.split("\n");
        var excel = $JExcel.new("Calibri 10 #000000"); // Default font

        

        excel.set({
            sheet: 0,
            value: "Report"
        });
        excel.addSheet("Sheet 2");


        var gametitleStyle = excel.addStyle({
            font: "Calibri 14 #000000 B",
            align: "L L",
            fill: "#F0F0F0"
        });
        var passStyle = excel.addStyle({
            font: "Calibri 14 #000000 B",
            align: "L L",
            fill: "#F0F0F0"
        });
        var nameStyle = excel.addStyle({
            font: "Calibri 14 #000000 B",
            align: "L L",
            fill: "#F0F0F0"
        });


        var headers = rowArr[4].split(",");
        var formatHeader = excel.addStyle({
            border: "thin,thin,thin,thin #333333",
            font: "Calibri 12 #000 B",
            fill: "#F0F0F0",
            align: "L L"
        });

        for (var i = 0; i < headers.length; i++) {
            excel.set(0, i, 3, headers[i].trim(), formatHeader);
            excel.set(0, i, undefined, "auto");
            if (i < headers.length - 2) {
                excel.set(0, i, undefined, 22);
            } else {
                excel.set(0, i, undefined, 37);
            }

            excel.set(0, i, 0, "", gametitleStyle);
            excel.set(0, i, 1, "", passStyle);
            excel.set(0, i, 2, "", nameStyle);

        }
        excel.set(0, 0, 0, rowArr[0].trim(), gametitleStyle);
        excel.set(0, 0, 1, rowArr[1].trim(), passStyle);
        excel.set(0, 0, 2, rowArr[2].trim(), nameStyle);

        var cellStyleLeft = excel.addStyle({
            border: "thin,none,none,none #333333"
        });
        var cellStyleRight = excel.addStyle({
            border: "none,thin,none,none #333333"
        });
        var cellStyleTop = excel.addStyle({
            border: "none,none,thin,none #333333",
            fill: "#F0F0F0"
        });
        var cellStyleBottom = excel.addStyle({
            border: "none,none,none,thin #333333",
            fill: "#F0F0F0"
        });

        var cellStyle = excel.addStyle({
            border: "thin,thin,thin,thin #333333",
            align: "L L"
        });

        var targetWord2ndAttemptCorrect = excel.addStyle({
            border: "thin,thin,thin,thin #333333",
            fill: "#FAFAD2",
            align: "L L"
        });

        var correctAttemptStyle = excel.addStyle({
            border: "thin,thin,thin,thin #333333",
            fill: "#B3F39E",
            align: "L L"
        });

        var incorrectAttemptStyle = excel.addStyle({
            border: "thin,thin,thin,thin #333333",
            fill: "#F79898",
            align: "L L"
        });

        var levelHeadStyle = excel.addStyle({
            border: "thin,thin,thin,thin #ffffff",
            fill: "#3d3d3d",
            font: "Calibri 10 #ffffff B",
            align: "L L",
        });

        var blankRowStyle = excel.addStyle({
            border: "thin,thin,thin,thin #333333",
            fill: "#a09898",
            align: "L L",
        });
        
        var numOfWords = 10 + 2;
        if (configGrade == "4" || configGrade == "5"){
            numOfWords = 20 + 2;
        }
        //console.log('numOfWords', numOfWords);
        for (var i = 4; i < rowArr.length; i++) {
            var currRow = rowArr[i].split(",");
            var fillHeader = false;
            var fillFooter = false;
            var rowCtr = i - 5 + 1;
            if ((rowCtr - 1) % numOfWords == 0) {
                fillHeader = true;
            }
            if (rowCtr % numOfWords == 0) {
                fillFooter = true;
            }
            if (currRow.length >= headers.length) {
                for (var j = 0; j < headers.length; j++) {

                    excel.set(0, j, i - 1, currRow[j].trim(), cellStyle);
                    if (currRow[j] && j >= headers.length - 2) {
                        if (currRow[j].trim().toLowerCase() == currRow[headers.length - 3].trim().toLowerCase() && currRow[headers.length - 3].trim().toLowerCase() != " ") {
                            excel.set(0, j, i - 1, currRow[j].trim(), correctAttemptStyle);
                        } else if (currRow[j].trim().toLowerCase() !== '-') {
                            excel.set(0, j, i - 1, currRow[j].trim(), incorrectAttemptStyle);
                        }

                    }
                    if (currRow[j] && j == headers.length - 3) {
                        if (currRow[j].trim().toLowerCase() == currRow[headers.length - 2].trim().toLowerCase() && currRow[headers.length - 2].trim().toLowerCase() != " ") {
                            excel.set(0, j, i - 1, currRow[j].trim(), correctAttemptStyle);
                        } else if (currRow[j].trim().toLowerCase() == currRow[headers.length - 1].trim().toLowerCase()) {
                            excel.set(0, j, i - 1, currRow[j].trim(), targetWord2ndAttemptCorrect);
                        } else {
                            excel.set(0, j, i - 1, currRow[j].trim(), incorrectAttemptStyle);
                        }
                    }
                    if (fillHeader == true) {
                        excel.set(0, j, i - 1, currRow[j].trim(), levelHeadStyle);
                    }
                    if (fillFooter == true) {
                        excel.set(0, j, i - 1, currRow[j].trim(), blankRowStyle);
                    }
                }
            }
        }

        excel.generate(fileName);
    };

    // AccessibilityManager.registerActionHandler('closeReport', '', '', function () {
    //     $scope.closeReport();
    // });

    $scope.closeReport = function () {
        $scope.showReport = false;
        $timeout(function () {
            $scope.closeScreenOverlay();
            angular.element(".splashScreen .splashReportBtn").removeClass('disableReportBtn').trigger("focus");
        }, 200);
        // AccessibilityManager.setFocus(".splashScreen .splashReportBtn");
    };

    $scope.closeBlankReport = function () {
        $scope.blankReport = false;
        $timeout(function () {
            $scope.closeScreenOverlay();
            angular.element(".splashScreen .splashReportBtn").removeClass('disableReportBtn').trigger("focus");
        }, 200);
        // AccessibilityManager.setFocus(".splashScreen .splashReportBtn");
    };

    $scope.closeLevelInfo = function () {
        $scope.showLevelInfo = false;
        $scope.levelInfoAudioActive = false;
        disableAllClicks = false;
    }

    $scope.saveandexit = function (isturnin) {
        //$scope.currentOptions = -1;
        if(isturnin){
            $scope.$broadcast("togglepopup", "submit_" + $scope.language);
        }
        else{
            $scope.$broadcast("togglepopup", "reload_" + $scope.language);
        }
        $timeout(function () {
            angular.element(".popupParent .cancelBtn").trigger("focus");
            $scope.openScreenOverlay();
            if ($scope.showEndPopup) {
                angular.element(".endMsgOverlay, .endMsgOverlay button").attr({ "aria-hidden": true, "tabindex": '-1' });
            }
            AccessibilityManager.trapConfirmPopupFocus();
        }, 200);
    }

    $scope.endLevelHandler = function (levelno) {
        if ($(event.target).hasClass("exhaustAttempts")) return;
        $scope.currentOptions = -1;
        $scope.showFishAnimation = false;
        angular.element('.endLevelFishes').css('display', 'none');
        if (!$scope.$$phase) {
            $scope.$apply();
        }
        $scope.$broadcast('stopAudio');
        $scope.showEndPopup = false;
        $scope.gotoLevelScreen();
        levelno = Number(levelno);
        $scope.resetAttemptData();
        if(levelno==1){
            $scope.levelClick('', parseInt($scope.levelLaunched), "easy", '', $scope.currentLevel);
        }
        else if(levelno==2){
            $scope.levelClick('', parseInt($scope.levelLaunched), "challenge", '', $scope.currentLevel);
        }
    }

    $scope.endLevelHandler_old = function (levelno) {
        $scope.currentOptions = -1;
        $scope.showFishAnimation = false;
        angular.element('.endLevelFishes').css('display', 'none');
        if (!$scope.$$phase) {
            $scope.$apply();
        }
        // if (disableAllClicks == true) {
        //     return;
        // }
        $scope.$broadcast('stopAudio');
        $scope.showEndPopup = false;
        $scope.gotoLevelScreen();
        if ($scope.percentComplete >= $scope.unlockThresh) {
            if ($scope.playMode == "easy") {
                $scope.levelClick('', parseInt($scope.levelLaunched), "challenge", '', $scope.currentLevel);
            } else {
                if (parseInt($scope.levelLaunched) <= $scope.totalLevels) {
                    var check = true;
                    angular.forEach($scope.levelGroups, function (value) {
                        angular.forEach(value, function (val) {
                            if (parseInt(val.level) >= parseInt($scope.levelLaunched)) {
                                for (var i = 0; i < Object.keys(val['modes']).length; i++) {
                                    if (i === 0 && val['modes']['easy']['isPass'] == "No" && check) {
                                        check = false;
                                        $scope.currentLevelGroup = val.group;
                                        $scope.currentLevel = (val.name.split(" ")[1] % 5) - 1;
                                        $scope.levelClick('', parseInt(val.level), "easy", '', $scope.currentLevel);
                                    }
                                    if (i === 1 && val['modes']['challenge']['isPass'] == "No" && check) {
                                        check = false;
                                        $scope.currentLevelGroup = val.group;
                                        $scope.currentLevel = (val.name.split(" ")[1] % 5) - 1;
                                        $scope.levelClick('', parseInt(val.level), "challenge", '', $scope.currentLevel);
                                    }
                                    if (i === 1 && check && $scope.totalLevels === parseInt(val.level)) {
                                        angular.forEach($scope.levelGroups, function (value1) {
                                            angular.forEach(value1, function (val1) {
                                                if (parseInt(val1.level) < parseInt($scope.levelLaunched)) {
                                                    for (var j = 0; j < Object.keys(val1['modes']).length; j++) {
                                                        if (j === 0 && val1['modes']['easy']['isPass'] == "No" && check) {
                                                            check = false;
                                                            $scope.currentLevelGroup = val1.group;
                                                            $scope.currentLevel = (val1.name.split(" ")[1] % 5) - 1;
                                                            $scope.levelClick('', parseInt(val1.level), "easy", '', $scope.currentLevel);
                                                        }
                                                        if (j === 1 && val1['modes']['challenge']['isPass'] == "No" && check) {
                                                            check = false;
                                                            $scope.currentLevelGroup = val1.group;
                                                            $scope.currentLevel = (val1.name.split(" ")[1] % 5) - 1;
                                                            $scope.levelClick('', parseInt(val1.level), "challenge", '', $scope.currentLevel);
                                                        }
                                                    }
                                                }
                                            });
                                        });
                                    }
                                }
                            }
                        });
                    });
                }
            }
        } else {
            $scope.userScore = $scope.userScore - $scope.levelScore;
            $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["score"] = 0;
            $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["percentComplete"] = 0 + "%";
            $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["timeSpent"] = '';
            
            $scope.levelClick('', $scope.levelLaunched, $scope.playMode, '', $scope.currentLevel);
        }
    }

    $scope.playAgainHandler = function(evt){
        //console.log("endLevelHandler")
        if (angular.element(evt.currentTarget).hasClass('exhaustAttempts')) {
            return;
        }
        $scope.resetAttemptData();
        $scope.levelClick('', $scope.levelLaunched, $scope.playMode, '', $scope.currentLevel);
    }

    $scope.resetAttemptData = function(){
        console.log("call to reset attempt data.")
        $scope.currentOptions = -1;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
        // if (disableAllClicks == true) {
        //     return;
        // }
        $scope.$broadcast('stopAudio');
        $scope.dancingurchin = false;
        $scope.showEndPopup = false;
        
        
        $scope.gotoLevelScreen();
        $scope.userScore = $scope.userScore - $scope.levelScore;
        $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["score"] = 0;
        $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["percentComplete"] = 0 + "%";
        $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["timeSpent"] = '';
        $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["active"] = true;
        //$scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["attempt"] = false;
        $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["complete"] = false;
        $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["isPass"] = "No";
        $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode].currentQuestion = -1;
        
    }

    $scope.addToAttempts = function(){
        var attempts = $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["attempts"];
        if(attempts == undefined || attempts == null || attempts.length<3){
            if(attempts == undefined || attempts == null || attempts.length == 0){
                $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["attempts"] = [];
            }

            var attempt = {};
            //attempt["correctOptionsArr"] = [...$scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["correctOptionsArr"]];
            if($scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["correctOptionsArr"]){
                attempt["correctOptionsArr"] = [...$scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["correctOptionsArr"]];
            }
            if($scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["correctWords"]){
                attempt["correctWords"] = [...$scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["correctWords"]];
            }
            if($scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["incorrectWords"]){
                attempt["incorrectWords"] = [...$scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["incorrectWords"]];
            }
            if($scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["responses"]){
                attempt["responses"] = [...$scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["responses"]];
            }
            if($scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["wordset"]){
                attempt["wordset"] = [...$scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["wordset"]];
            }
            attempt["date"] = $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["date"];
            //attempt["responses"] = [...$scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["responses"]];
            attempt["score"] = $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["score"];
            attempt["timeSpent"] = $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["timeSpent"];
            //attempt["wordset"] = [...$scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["wordset"]];
            attempt["percentComplete"] = $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["percentComplete"];
            attempt["currentQuestion"] = $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["currentQuestion"];
            attempt["isPass"] = $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["isPass"];

            $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["attempts"].push(attempt);

            $scope.levelAttemptCount = $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["attempts"].length;

            //APT : Check and Update Best Attempt
            var bestscore = $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["score"]
            var bestAttIndex = -1;
            attempts = $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["attempts"]
            for(var i=0;i<attempts.length;i++){
                if(attempts[i]["score"]>=bestscore){
                    bestscore = attempts[i]["score"];
                    bestAttIndex = i;
                }
            }
            if(bestAttIndex!=-1){
                //$scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["correctOptionsArr"] = [...attempts[bestAttIndex]["correctOptionsArr"]];
                if(attempts[bestAttIndex]["correctOptionsArr"]){
                    $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["correctOptionsArr"] = [...attempts[bestAttIndex]["correctOptionsArr"]];
                }
                else{
                    $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["correctOptionsArr"] = [];
                }
                if(attempts[bestAttIndex]["correctWords"]){
                    $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["correctWords"] = [...attempts[bestAttIndex]["correctWords"]];
                }
                else{
                    $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["correctWords"] = [];
                }
                if(attempts[bestAttIndex]["incorrectWords"]){
                    $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["incorrectWords"] = [...attempts[bestAttIndex]["incorrectWords"]];
                }
                else{
                    $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["incorrectWords"] = [];
                }
                if(attempts[bestAttIndex]["responses"]){
                    $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["responses"] = [...attempts[bestAttIndex]["responses"]];
                }
                else{
                    $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["responses"] = [];
                }
                if(attempts[bestAttIndex]["wordset"]){
                    $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["wordset"] = [...attempts[bestAttIndex]["wordset"]];
                }
                else{
                    $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["wordset"] = [];
                }
                $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["date"] = attempts[bestAttIndex]["date"];
                //$scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["incorrectWords"] = [...attempts[bestAttIndex]["incorrectWords"]];
                //$scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["responses"] = [...attempts[bestAttIndex]["responses"]];
                $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["score"] = attempts[bestAttIndex]["score"];
                $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["timeSpent"] = attempts[bestAttIndex]["timeSpent"];
                //$scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["wordset"] = [...attempts[bestAttIndex]["wordset"]];
                $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["percentComplete"] = attempts[bestAttIndex]["percentComplete"];
                $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["currentQuestion"] = attempts[bestAttIndex]["currentQuestion"];
                $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["modes"][$scope.playMode]["isPass"] = attempts[bestAttIndex]["isPass"];
            }
        }
    }

    $scope.setAllLevelData = function () {
        var level = {};
        angular.forEach($scope.levelGroups, function (value, key) {
            angular.forEach(value, function (v, k) {
                level[(key - 1) * 4 + (k + 1)] = v;
            });
        });
        $scope.allLevels = level;
    }

    $scope.openScreenOverlay = function () {
        angular.element(".fullBackground, .fullBackground button").attr({ "aria-hidden": true, "tabindex": '-1' });
    }

    $scope.closeScreenOverlay = function () {
        angular.element(".fullBackground, .fullBackground button").removeAttr("aria-hidden tabindex");
    }

    $scope.setLiveText = function (txt) {
        $scope.livetxt = txt;
        $timeout(function () {
            $scope.livetxt = "";
        }, 1000);
    }

    $scope.onKeyDownEvent = function (evt) {
        /*if ($scope.showOutline) {
            return;
        }*/
        if (evt.which === 9) {
            $scope.showOutline = true;
            angular.element('.view').removeClass('hide-focus-outline').addClass('show-focus-outline');
        }
    }

    $scope.onMouseDownEvent = function (evt) {
        /*if (!$scope.showOutline) {
            return;
        }*/
        $scope.showOutline = false;
        angular.element('.view').removeClass('show-focus-outline').addClass('hide-focus-outline');
    }

    function getWordAudioPath(word) {
        var type = ".mp3";
        word = word.toLowerCase();
        word = word.replace("'", "");
        word = word.replace(".", "");
        // word = word.replace(".", "");
        // word = word.replace("'", "");
        // word = word.replace(/ñ/g, "n");
        // word = word.replace(/á/g, "a");
        // word = word.replace(/ú/g, "u");
        // word = word.replace(/í/g, "i");
        // word = word.replace(/é/g, "e");
        // word = word.replace(/ó/g, "o");
        // word = word.replace(/ü/g, "u");
        word = word.replace(/ /g, "");
        // if ($scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]["rule"] == "Homophones")
        //     word = word + "_example";
        //if (configGrade == "K" && parseInt($scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['level']) <= 10) {
        if ($scope.gameAnsType == "letters") {
            word = "SV_letter_" + word + type;
        } else if (configGrade == 2 && $scope.levelGroups[$scope.currentLevelGroup][$scope.currentLevel]['name'] == 'Lesson 36') {
            if (word == 'dr') { word = 'doctor'; }
            if (word == 'ft') { word = 'foot'; }
            if (word == 'st') { word = 'street'; }
            if (word == 'in') { word = 'inch'; }
            word = "SV_abbr_" + word + type;
        } else {
            word = "SV_" + word + type;
        }
        return "assets/audios/words/" + word;
    }

    $scope.refreshAudioCallbackObj = function () {
        $scope.audioCallback = {
            thisRef: $scope,
            params: [],
            type: "end",
            delay: -1,
            arrIndex: -1,
            callbackRef: null
        };
    };

    $scope.generateJsonData = function () {
        var ruleSet = ['Letter Recognition: Cc, Oo, Ss', 'Letter Recognition: Ll, Mm, Pp', 'Letter Recognition: Ii, Jj, Kk, Nn', 'Letter Recognition: Tt, Uu, Yy', 'Letter Recognition: Aa, Bb, Ee', 'Letter Recognition: Ff, Gg, Hh', 'Letter Recognition: Dd, Rr, Qq', 'Letter Recognition: Vv, Ww, Xx, Zz', 'Consonant Mm /m/', 'Consonant Tt /t/', 'Consonant Ss /s/, Vowel Aa /a/', 'Consonant Bb /b/', 'Consonant Pp /p/', 'Consonant Nn /n/, Vowel Ii /i/', 'Word Families -at, -an', 'Word Families -in, -it ', 'Consonant Cc /k/', 'Consonant Rr /r/', 'Consonant Dd /d/; Vowel Oo /o/', 'Word Families -op, -ip, -ot ', 'Consonant Kk /k/', 'Consonant Ff /f/', 'Consonant Gg /g/, Vowel Ee /e/', 'Word Families -en, -et', 'Consonant Hh /h/', 'Consonant Ll /l/', 'Consonant Ww /w/; Vowel Uu /u/', 'Word Families -ug, -ig, -og', 'Consonant Yy /y/', 'Consonant Jj /j/', 'Consonants Vv /v/, Zz /z/', 'Final Xx /ks/, Qu, qu /kw/', 'Initial Consonant Blends', 'Final Consonant Blends', 'Similarly Spelled Words', 'Long i, o, e: CV Syllable Pattern', 'Long a: VCe', 'Long i: VCe', 'Long o: VCe', 'Long u, Long e: VCe'];
        var wordsArr = ["c, o, s", "S, C, O", "s, o, c", "o, c, s", "C, O, S", "O, C, S", "c, o, s", "S, C, O", "o, s, c", "s, o, c", "l, m, p", "m, l, o", "M, S, P", "P, M, L", "L, M, O", "p, l, c", "m, l, p", "l, m, s", "P, M, C", "M, P, L", "i, j, k", "I, K, S", "K, p, I", "n, j, i", "J, I, N", "i, n, c", "K, M, J", "N, I, C", "j, m, k", "k, o, p", "T, Y, c", "u, n, t", "y, P, l", "T, t, K", "U, o, C", "y, s, U", "t, j, m", "u, I, M", "T, y, L", "Y, t, S", "a, b, K", "A, m, J", "b, E , N", "e, k, b", "A, a, J", "b, i, O", "a, L, p", "E, e, C", "e, i, s", "B, A, t", "H, o, L", "g, K, m", "f, g, F", "G, B, b", "h, e, S", "f, a, N", "F, f, O", "G, u, y", "H, T, f", "f, M, p", "r, B, l", "Q, i, R", "R, j, k", "D, d, M", "d, n, F", "r, t, S", "q, c, L", "R, p, G", "Q, B, O", "D, h, r", "v, W, w", "W, F, p", "x, i, T", "V, n, O", "X, V, s", "w, R, k", "Z, X, D", "x, m, L", "V, a, C", "z, e, x", "m, c, T", "m, M, r", "M, o, O", "m, w, V", "m, F, L", "M, k, S", "M, N, p", "m, I, q", "M, m, n", "m, H, D", "T, W, t", "t, f, R", "t, O, j", "T, A, B", "t, s, C", "T, L, g", "t, x, E", "T, S, t", "T, m, K", "t, v, P", "mat, at, am", "at, am, Sam", "am, mat, sat", "sat, Tam, at", "Sam, am, Tam", "Tam, at, mat", "at, sat, mat", "sat, at, Sam", "am, sat, Sam", "mat, Tam, am", "bat, at, bam", "tab, bat, at", "bam, Sam, tab", "tab, am, sat", "bam, mat, Tam", "bat, bam, sat", "bat, tab, mat", "bam, bat, at", "tab, Sam, bam", "bat, am, sat", "pat, pass, tap", "Pam, map, mat", "tap, sat, tab", "sap, tap, bat", "pass, pat, miss", "map, Pam, at", "pat, tab, Sam", "sap, am, tap", "map, pass, pat", "tap, pat, Tam", "bit, nip, bat", "in, it, am", "it, sit, nab", "man, mat, Pam", "nip, pin, tip", "bin, an, in", "tan, tap, pan", "pin, sip, pat", "pan, man, pass", "tip, tap, it", "pat, pit, tap", "pan, man, tan", "mat, man, Tim", "sat, Sam, at", "tan, tip, nap", "bat, tab, ban", "man, pan, pit", "pan, an, tan", "sat, sit, at", "tan, pan, tin", "tin, tan, tip", "pin, pit, tin", "pit, tap, pat", "sit, it, mat", "bin, bit, man", "bit, tap, sit", "pin, bat, sip", "sit, sat, pan", "bit, bin, bam", "tin, in, tip", "cat, cap, mat", "can, man, pin", "cap, tap, can", "cab, bat, bib", "cab, cat, cap", "can, pan, tin", "cat, at, map", "cap, pit, pat", "can, cab, pan", "cat, it, at", "rap, map, tap", "rat, ran, tip", "ran, pan, rap", "rip, tip, bat", "ram, am, cap", "rib, bib, rat", "rim, ram, bat", "ran, can, sit", "rip, sat, tap", "rat, tan, pat", "dot, pot, dip", "not, nap, nip", "pad, pan, pat", "pot, top, man", "mad, bad, did", "top, can, tip", "nod, mop, not", "did, tin, cap", "bad, bat, nab", "mop, top, pod", "mop, top, pit", "tip, pit, tap", "pot, at, cap", "sip, sit, pop", "top, cat, nod", "nip, rip, dim", "cot, can, rap", " pop, pot, in", "not, bin, sod", "rip, bat, pit", "kid, kiss, cot", "Kim, Tim, mad", "kin, in, kit", "kit, pit, pat", "kid, miss, tip", "kit, cat, not", "kiss, rap, pin", "Kim, mat, kid", "kit, dot, it", "kin, sit, sat", "fin, pin, tab", "fat, sit, mat", "fit, tip, top", "fib, bib, fat", "fan, pan, man", "fad, dad, mom", "fat, kit, fan", "fin, ran, bit", "fan, fat, not", "if, fin, fit", "get, tag, bet", "bet, bed, sip", "rag, rat, ran", "bed, peg, gap", "pet, pit, pot", "men, nap, miss", "big, bag, kit", "got, dog, mad", "bag, gab, at", "dig, did, fan", "ten, net, set", "get, tag, rib", "pen, pan, tin", "met, tip, mat", "men, tab, man", "pet, set, pen", "bet, bed, dot", "den, top, bam", "set, tap, fat", "net, kid, ten", "hen, hit, map", "hot, top, hop", "hiss, bed, pass", "hop, tip, mom", "hat, pat, fan", "had, hip, bad", "hid, tot, set", "hot, pot, bat", "him, in, kit", "hit, cat, beg", "lap, fat, pet", "let, get, mill", "bell, bill, bag", "lot, top, pen", "lip, lap, lab", "lit, fin, mop", "pal, pan, lap", "fill, fell, fib", "leg, gal, let", "tell, bet, pod", "wet, hen, wed", "fun, nut, bun", "bus, web, tan", "wag, can, did", "cut, cup, kit", "web, wet, bag", "run, rub, rug", "bud, big, nod", "win, pin, sit", "will, top, wag", "rug, run, wig", "dig, bin, tag", "bug, hill, bun", "dog, log, dad", "tug, nut, bug", "rig, rid, dip", "big, bet, pop", "mug, gum, egg", "fog, got, fan", "log, leg, cab", "yet, wet, tip", "yap, yip, cap", "yes, beg, yet", "yip, pit, bill", "yak, kid, man", "yam, pan, fun", "yell, till, ran", "yum, mud, pet", "yes, den, sap", "yet, hot, bat", "jam, jab, met", "jag, gap, lot", "job, dot, bog", "jig, web, tin", "jab, jam, tub", "jug, but, rug", "jot, cot, will", "jog, got, if", "jet, ten, jog", "job, dig, pot", "vet, net, bag", "zip, zig, bill", "zap, cat, cup", "fuzz, fun, fog", "van, nap, vet", "buzz, bun, bug", "zig, sit, tag", "jazz, jet, mad", "fizz, big, top", "zag, zap, hat", "quit, quiz, kit", "fox, pot, fin", "fix, fox, bit", "quill, can, bill", "ox, ax, cot", "six, sit, fix", "quiz, cub, zip", "max, mat, let", "mix, mud, sip", "box, bed, ox", "plan, pan, lap", "drop, drip, pod", "step, pet, stop", "crab, cab, cat", "trip, rip, pit", "grab, bad, brag", "plum, plus, rim", "spot, stop, pit", "flip, fill, pin", "slug, glob, gull", "and, am, sand", "list, lit, pest", "ask, dusk, skip", "lamp, limp, tap", "dump, bud, mat", "held, hen, led", "bend, bed, band", "best, bet, bat", "help, held, plan", "left, felt, lug", "pin, pan, pen", "bed, bad, bud", "cat, can, sat", "stop, step, pots", "top, pot, stop", "hat, hut, hit", "hand, had, and", "grip, rip, gap", "am, an, jam", "jet, jets, jest", "hi, him, egg", "go, tug, got", "we, me, web", "me, bam, rip", "so, glass, it", "be, bin, band", "no, not, top", "hi, melt, hip", "me, cap, rub", "so, still, gas", "cape, cap, came", "tame, same, tap", "lake, lot, cave", "sale, save, sill", "wave, wet, we", "crane, cram, tug", "pave, pet, van", "take, tap, kid", "late, ten, lap", "snake, snap, jade", "bike, bit, bake", "hive, had, vine", "time, mile, met", "pile, pin, lap", "like, spike, lift", "fine, fin, fuzz", "spine, sip, so", "life, fill, lip", "bite, rib, skate", "wide, will, den", "bone, band, bin", "dome, dug, dim", "hope, pop, step", "smoke, mole, quilt", "stove, stone, vest", "rope, rip, past", "rode, rod, rub", "home, hope, him", "joke, go, quiz", "pole, lap, note", "tune, note, nut", "eve, vet, he", "rule, run, ran", "mule, mess, tune", "dune, did, drip", "Steve, stove, stop", "dude, dad, bad", "flute, flop, flat", "Zeke, buzz, kiss", "tube, bit, tub"];
        var lessonArr = [1, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 19, 21, 22, 23, 24, 26, 27, 28, 29, 31, 32, 33, 34, 36, 37, 38, 39, 41, 42, 43, 44, 46, 47, 48, 49];
        for (var i = 1; i <= 40; i++) {
            for (var j = 1; j <= 10; j++) {
                console.log('{"Grade": "K", "Week":', lessonArr[i - 1], ', "Unit":', j, ', "Words": "', wordsArr[((i - 1) * 10 + j) - 1], '", "rule": "', ruleSet[i - 1], '"},');
            }
        }
    }

    $scope.processRawDB = function () {
        //console.log("$scope.$parent.appData.data.rawDB",$scope.$parent.appData.data.rawDB[$scope.language][0][configGrade])
        var rawObj = $scope.$parent.appData.data.rawDB[$scope.language][0][configGrade];
        //console.log("rawObj",rawObj)
        var wordsRequiredPerLevel = rawObj.length;
        var distractors = 2;
        var totalLevels = 1;
        $scope.ruleSet = [];
        if (!rawObj) {
            console.log("DB file not not found. Game will use backup DB");
            $scope.$parent.appData.data.dataset = $scope.$parent.appData.data.dataset_bk;
            return;
        }
        var mainArr = [];
        var ruleArr = [];

        //For Garde 3
        angular.forEach(rawObj, function (elem) {
            //console.log("elem",elem)
            var str = elem.Words.split(', ');
            var str1 = elem.rule;
            // mainArr = mainArr.concat(str);
            str1 = str1.replace(/,/g, '');
            //console.log("str1",str1);
            mainArr.push(str[0]);
            ruleArr.push(str1);
        });
        // wordsRequiredPerLevel = 10;
        // distractors = 2;
        if (configGrade == 2) {
            totalLevels = 1;
        }
        // if (configGrade == "3") {
        //     wordsRequiredPerLevel = 10;
        //     distractors = 2;
        // }
        // if (configGrade == "4") {
        //     wordsRequiredPerLevel = 10;
        //     distractors = 2;
        // }
        // if (configGrade == "5") {
        //     wordsRequiredPerLevel = 10;
        //     distractors = 2;
        // }
        // var totalLevels = 32;
        var wordsAvailablePerLevel = Math.floor(mainArr.length / totalLevels);
        var shortage = wordsRequiredPerLevel - wordsAvailablePerLevel;
        var extraWordsLeft = mainArr.length - (totalLevels * wordsAvailablePerLevel);
        var extraWordsArr = mainArr.slice(-extraWordsLeft);

        if (shortage <= 0) {
            shortage = 0;
            extraWordsArr = [];
            extraWordsLeft = 0;
        }

        // Create base structure of DB
        var mainDB = {};
        mainDB[$scope.$parent.appData.language] = {};
        for (var i = 1; i <= totalLevels; ++i) {
            mainDB[$scope.$parent.appData.language][i] = [];
            var thisLevelWords = [];
            var tempArr = [];
            var thisLevelRule = [];
            for (var j = 1; j <= wordsRequiredPerLevel; ++j) {
                var word = [];
                var rule = [];

                if (j <= wordsAvailablePerLevel) {
                    var idx = wordsAvailablePerLevel * (i - 1) + (j - 1);
                    word.push(mainArr[idx]);
                    rule.push(ruleArr[idx]);
                } else {
                    word.push(fillupShortage(thisLevelWords));
                    rule.push(fillupShortage(thisLevelRule));
                }
                thisLevelWords.push(word[0]);
                thisLevelRule.push(rule[0]);
                // if(j==1) {
                //     tempArr = createDistractorsArray(thisLevelWords[0]);
                // }

                // var k = 1;
                // while(k<=distractors) {
                //     var num = Math.floor(Math.random() * tempArr.length);
                //     var dist = tempArr.splice(num, 1);
                //     if(word.indexOf(dist[0]) < 0) {
                //         word.push(dist[0]);
                //         k++;
                //     } else {
                //         continue;
                //     }                        
                // }
                // var distArr = rawObj[mainArr.indexOf(word[0])]['Words'].split(',');
                var distArr = rawObj[((i - 1) * wordsRequiredPerLevel + j) - 1]['Words'].split(',');
                var spellRullArr = rawObj[mainArr.indexOf(word[0])]['rule'];
                for (var ctr = 0; ctr < distArr.length; ++ctr) {
                    var temp = distArr[ctr].trim();
                    distArr[ctr] = temp;
                }
                for (var ctr1 = 0; ctr1 < spellRullArr.length; ++ctr1) {
                    var temp1 = spellRullArr[ctr1].trim();
                    spellRullArr[ctr1] = temp1;
                }
                mainDB[$scope.$parent.appData.language][i].push(distArr);
            }
            $scope.ruleSet.push(spellRullArr);
            //console.log('thisLevelWords__', thisLevelWords);
        }
        // fit extra words starting from last level
        var lvlNum = totalLevels;
        var i = extraWordsLeft - 1;
        while (i >= 0) {
            for (var k = 0; k < shortage; ++k) {
                if (i >= 0) {
                    mainDB[$scope.$parent.appData.language][lvlNum][wordsAvailablePerLevel + k][0] = extraWordsArr[i--];
                }
            }
            lvlNum--;
        };
        $scope.$parent.appData.data.dataset[$scope.$parent.appData.language] = mainDB[$scope.$parent.appData.language];
        console.log("processed Data - ", mainDB);

        function createDistractorsArray(word) {
            var idx = mainArr.indexOf(word);
            var interval = 2 * Math.floor(0.15 * mainArr.length);
            var tempArr = [];

            // Go backward
            var curr = idx - 1;
            var rem = 0;
            var ctr = 0;

            while (ctr <= interval / 2 && curr > 0) {
                tempArr.push(mainArr[curr--]);
                ctr++;
            }

            rem = interval - ctr;
            ctr = 0;
            curr = idx + 1;
            while (ctr <= rem && curr < (mainArr.length - 1)) {
                tempArr.push(mainArr[curr++]);
                ctr++;
            }
            return tempArr;
        };

        function fillupShortage(thisLevelWords) {
            var tempArr = mainArr.slice();
            var reqWord = "";
            var k = 0;
            while (k <= 1) {
                var num = Math.floor(Math.random() * tempArr.length);
                var dist = tempArr.splice(num, 1);
                if (thisLevelWords.indexOf(dist[0]) < 0) {
                    reqWord = dist[0];
                    k++;
                } else {
                    continue;
                }
            }

            return reqWord;
        }
    };

    /**
     * The functions below are used to generate json for level nodes position. 
     * Only required during development.
     * set devdesignmode to true. Elements having dev design class will be draggable
     * place elements to desired location and generate and copy JSON from console.
     */
    $scope.createLevelNodePosData = function () {
        for (var i in $scope.levelGroups) {
            var mainObj = $scope.$parent.appData.screentype2;
            // if(i == '1') {
            //     mainObj = $scope.$parent.appData.screentype1;
            // }
            // if(i == '9') {
            //     mainObj = $scope.$parent.appData.screentype3;
            // }             
            angular.forEach($scope.levelGroups[i], function (grp, idx) {
                // console.log(i, " >>>>> ",$scope.$parent.appData.levelData[grp.level], " --- ",mainObj[idx*4 + 4]);                   
                $scope.$parent.appData.levelData[grp.level].labelPos.bottom = mainObj[idx * 4].bottom;
                $scope.$parent.appData.levelData[grp.level].labelPos.top = 'initial';
                $scope.$parent.appData.levelData[grp.level].labelPos.left = mainObj[idx * 4].left;

                // $scope.$parent.appData.levelData[grp.level].ribbon.bottom = mainObj[idx*4 + 1].bottom;
                // $scope.$parent.appData.levelData[grp.level].ribbon.top = 'initial';
                // $scope.$parent.appData.levelData[grp.level].ribbon.left = mainObj[idx*4 + 1].left;

                $scope.$parent.appData.levelData[grp.level].modes.easy.pos.bottom = mainObj[idx * 4 + 1].bottom;
                $scope.$parent.appData.levelData[grp.level].modes.easy.pos.top = 'initial';
                $scope.$parent.appData.levelData[grp.level].modes.easy.pos.left = mainObj[idx * 4 + 1].left;

                // $scope.$parent.appData.levelData[grp.level].modes.medium.pos.bottom = mainObj[idx*4 + 2].bottom;
                // $scope.$parent.appData.levelData[grp.level].modes.medium.pos.top = 'initial';
                // $scope.$parent.appData.levelData[grp.level].modes.medium.pos.left = mainObj[idx*4 + 2].left;

                $scope.$parent.appData.levelData[grp.level].modes.challenge.pos.bottom = mainObj[idx * 4 + 2].bottom;
                $scope.$parent.appData.levelData[grp.level].modes.challenge.pos.top = 'initial';
                $scope.$parent.appData.levelData[grp.level].modes.challenge.pos.left = mainObj[idx * 4 + 2].left;
                if ($scope.$parent.appData.levelData[grp.level].island && mainObj[idx * 4 + 3]) {
                    $scope.$parent.appData.levelData[grp.level].island.bottom = mainObj[idx * 4 + 3].bottom;
                    $scope.$parent.appData.levelData[grp.level].island.top = 'initial';
                    $scope.$parent.appData.levelData[grp.level].island.left = mainObj[idx * 4 + 3].left;
                    $scope.$parent.appData.levelData[grp.level].island.height = mainObj[idx * 4 + 3].height;
                    $scope.$parent.appData.levelData[grp.level].island.width = mainObj[idx * 4 + 3].width;
                }

            });
        }

        // Copy this JSON to config. No need to call this function again.
        console.log("-------------------- COPY THIS IN CONFIG JSON ------------------");
        // console.log("appData.levelData --- ", $scope.$parent.appData.levelData);
    };

    $scope.enableDevDesign = function () {
        $('.devDesign').each(function (idx, elem) {
            $(elem).css('height', $(elem).height() + 'px');
        })
        $('.devDesign').draggable();
        $(".devDesign.devResize").resizable();
        $('.devDesign').off('click').on('click', function () {
            return false;
        })
    };

    $scope.generateJson = function () {
        var objArr = [];
        $('.devDesign').each(function (idx, elem) {
            // console.log(elem, " ----- ", $('.fixedNodeContainer').height(), " ---- ", parseInt($(elem).css('top')), " --- ", $(elem).height());
            var containerHeight = $('.fixedNodeContainer').height();
            var obj = {
                name: elem.className + " " + idx,
                top: elem.style.top,
                left: elem.style.left,
                bottom: (containerHeight - (parseInt($(elem).css('top')) + $(elem).height())) + "px"
            }
            if (elem.className.indexOf('levelMode') >= 0) {
                var cssheight = $(elem).height();
                var actualheight = $(elem).height() * 0.6;
                var hdiff = cssheight - actualheight;
                obj.bottom = (containerHeight - hdiff - (parseInt($(elem).css('top')) + actualheight)) + "px";
            }
            if (elem.className.indexOf('devResize') >= 0) {
                obj.height = $(elem).css('height');
                obj.width = $(elem).css('width');
            }
            objArr.push(obj);
        });
        // console.log('Copy JSON in config - ', objArr);
    };

    $scope.getDateString = function (date) {
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!

        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var str = mm + '/' + dd + '/' + yyyy;
        return str;
    }

    $scope.getTimeString = function (date) {
        date = new Date(date);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    $scope.millisToMinutesAndSeconds = function (date) {
        date = new Date(date);
        var minutes = Math.floor(date / 60000);
        var seconds = ((date % 60000) / 1000).toFixed(0);
        seconds = seconds.replace(/^0+/, '');
        var strSeconds = minutes + " min " + seconds + " " + $scope.languageTxt.secondText;
        return strSeconds;
    }
}]);
myView.directive('viewDirective', function () {

    return {

        retrict: "E",

        replace: true,

        scope: true,

        controller: "viewCtrl",

        templateUrl: "templates/view.html",

        link: function (scope, el, attrs) {
            
        }

    };

});
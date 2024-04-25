var appConfig = {
  title: "Spelling Voyage",
  scoId: "A0857024",
  language: "en",
  grade: 5,
  ansType: "Words",
  components: [
    "popupcomp",
    "audioplayer",
    "closecaptions",
    "dndcomp",
    "videoplayer",
    "videoplayerIntroInstruction",
  ],
  lang_txt: {
    en: {
      playbtn: "Play",
      totalLvl: "Total Islands ",
      urchinsFound: "Total Urchins Collected ",
      moveUp: "Right arrow",
      moveDown: "Left arrow",
      mode: "Mode",
      easy: "Easy",
      medium: "Medium",
      mapIntro:
        "Set sail on a Spelling Voyage! Visit each island on the map. Pop the right bubbles to unlock a second level.",
      challenge: "Challenge",
      levelTxt: "Level",
      backBtn: "Exit Island",
      infoBtn: "Audio",
      gameInfo: "Get ready to pop some bubbles!",
      ccBtn: "Closed Captions",
      quitPopup: "Quit",
      cancelBtn: "Cancel",
      confirmBtn: "Confirm",
      score: "Score",
      result: "Result",
      feedbacks: {
        0: "Play Again",
        1: "You can do better!",
        2: "Nice going!",
        3: "New high score!",
      },
      level1Info_gK: "Pop the bubble with the letter you hear.",
      level1Info_gK12: "Pop the bubble with the word you hear.",
      level1Info_g2_l36:
        "Pop the bubble with the abbreviation for the word you hear.",
      level2Info_gK: "Select or type the letter you hear.",
      level2Info_gK12: "Select or type the letters to spell the word.",
      level2Info_g2_l36:
        "Select or type the letters to spell the abbreviation for the word you hear.",
      words: "Words Found",
      reportBtn: "Progress Report",
      instructions: "Instructions",
      lvlbackBtn: "Back to Home screen",
      prevLevel: "Previous Island",
      nextLevel: "Next Island",
      closeReport: "Close Report",
      disabled: "Disabled",
      locked: "locked",
      unlocked: "unlocked",
      attempted: "attempted",
      completed: "completed",
      modelabels: {
        easy: "1",
        medium: "2",
        challenge: "2",
      },
      starthere: "Start here",
      instructionBtn: "Instructions",
      exitBtn: "Save & Exit",
      submitBtn: "Submit & Exit",
      playAgainBtn: "Play Again",
      repeatLetter: "Repeat Letter",
      repeatWord: "Repeat Word",
      modeNames: {
        easy: "Level 1",
        challenge: "Level 2",
      },
      endPopupHeading: {
        low: "Try again!",
        high: "Awesome!",
      },
      liveText: {
        animationStart: "Animation",
        dropzone: "Drop zone",
        selected: "selected",
        letter: "Letter",
        letterDeleted: "Letter deleted from drop zone",
        singleQuote: "Single quote",
        fullstop: "Full stop",
        backspace: "Back space",
        addedIn: "added in drop zone",
        checkAnswer: "Check Answer button active",
      },
      keepgoing: "Keep going!",
      correct: "Correct",
      incorrect: "Incorrect",
      quertyKeyboard: "QWERTY keyboard",
      abcKeyboard: "ABC keyboard",
      CAPSon: "CAPS On",
      CAPSoff: "CAPS Off",
      youfound: "You found",
      youfoundNew: "You spelled",
      of: "of",
      endPopupLetters: "letters",
      endPopupWords: "words",
      endPopupCorrectly: ".",
      tryagain: "Try Again",
      nextlevel: "Next Level",
      nextIsland: "Next Island",
      endPopupTertiary: "Return to Island Map",
      chkAns: "Check Answer",
      spellingletters: "Letters",
      spellingwords: "Words",
      reportText: {
        tab1: "Overall progress",
        tab2: "Island wise progress",
        tab11: "Total time spent",
        tab12: "Total words attempted",
        tab13: "Correct words identified",
        tab21: "S.no.",
        tab22: "Words",
        tab23: "Correct",
        tab24: "Incorrect",
        tab25: "Not Attempted",
        empty:
          "You haven't visited any island yet.<br/><b>Start collecting urchins now.</b>",
      },
      scoring: "Scoring",
      islands: [
        "Unit 3 Week 2",
      ],
      modeName: {
        easy: "Level 1",
        medium: "Level 2",
        challenge: "Level 2",
      },
      downloadFullReport: "Download Full Report",
      island: "Title",
      timeSpentTxt: "Time spent",
      percentCorrectTxt: "% Correct",
      targetWordTxt: "Target Answer",
      ans1: "1st Answer",
      ans2: "2nd Answer",
      spellingVoyageTxt: "Spelling Voyage",
      totalScore: "Total Score:",
      passingTxt: "Passing = ",
      dateNtimeTxt: "Date & Time",
      comNpassTxt: "Complete/Pass Status",
      timeSpentLvl: "Time Spent on Level",
      perCompTxt: "Percent Correct",
      patternNrule: "Phonics Skill",
      studentAns1: "Student Answer on 1st Attempt",
      studentAns2: "Student Answer on 2nd Attempt",
      yesTxt: "Yes",
      noTxt: "No",
      sketch: "Created with Sketch.",
      closeTxt: "close",
      rightTxt: "right",
      leftTxt: "left",
      checkTxt: "check",
      circleTxt: "circle",
      gameCompleted: "You have completed the game!",
      secondText: "secs",
      reportEmptyMsg: "Report empty.",
      reportEmptyMsg2: "Student must first play the game.",
      capsTxt: "CAP",
      videoErrorMsg: "Your browser does not support the video tag.",
      mapScreenMsg: "Lesson Map Screens",
      playScreenMsg: "Game play Screen",
      level2BtnTooltip: "Pass Level 1 to unlock",
      turnInLater: "Save for Later",
      turnIn: "Turn In",
      studentIdTxt: "Student Id",
      audioPlayTxt: "Audio Playing",
      audioPauseTxt: "Audio Paused"
    },
    es: {},
  },
  levelData: {
    1: {
      group: 1,
      labelPos: {
        top: "initial",
        left: "38px",
        bottom: "238px",
      },
      ribbon: {
        top: "initial",
        left: "397px",
        "background-image":
          "url('assets/images/progression/ribbons/ribbonL1_1.png')",
        bottom: "232.95657348632812px",
      },
      modes: {
        easy: {
          pos: {
            top: "initial",
            left: "18px",
            bottom: "286px",
          },
          active: true,
          attempt: false,
          complete: false,
          score: 0,
        },
        challenge: {
          pos: {
            top: "initial",
            left: "64.375px",
            bottom: "302px",
          },
          active: false,
          attempt: false,
          complete: false,
          score: 0,
        },
      },
      island: {
        top: "initial",
        left: "-1px",
        "background-image":
          "url('assets/images/progression/islands/type1.png')",
        bottom: "264px",
        height: "92px",
        width: "141px",
      },
      level: "1",
      name: "Cod Island",
      $$hashKey: "object:7",
    },

  },
  leafData: {
    easy: [
      {
        pos: {
          top: "29%",
          left: "calc(50% - 313px)",
        },
      },
      {
        pos: {
          top: "14%",
          left: "calc(50% - 90px)",
        },
      },
      {
        pos: {
          top: "39%",
          left: "calc(50% - -25px)",
        },
      },
    ],
  },
  
  extra_words_audio_fix: [
    "white",
    "want",
    "his",
    "goes",
    "all",
    "words",
    "does",
    "sentence",
    "house",
    "through",
    "picture",
    "each",
    "than",
    "called",
    "sound",
    "means",
    "form",
    "between",
    "air",
    "animal",
    "study",
    "letter",
    "page",
    "near",
    "food",
    "earth",
    "eyes",
    "thought",
    "something",
    "example",
    "paper",
    "important",
    "took",
    "hear",
    "idea",
    "group",
    "book",
    "almost",
    "sometimes",
    "mountains",
    "talk",
    "song",
    "being",
    "family",
    "music",
    "color",
    "questions",
    "area",
    "horse",
    "problem",
    "complete",
    "since",
    "usually",
    "friends",
    "door",
    "become",
    "during",
    "products",
    "happened",
    "measure",
    "remember",
    "covered",
    "several",
    "against",
    "numeral",
  ],
  keyboardData_en: {
    row1: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
    row2: ["J", "K", "L", "M", "N", "O", "P", "Q", "R"],
    row3: ["S", "T", "U", "V", "W", "X", "Y", "Z"],
    row4: ["", " ", "   "],
  },
  keyboardData_en_lowerCase: {
    row1: ["a", "b", "c", "d", "e", "f", "g", "h", "i"],
    row2: ["j", "k", "l", "m", "n", "o", "p", "q", "r"],
    row3: ["s", "t", "u", "v", "w", "x", "y", "z"],
    row4: ["", " ", "   "],
  },
  keyboardData_en_querty: {
    row1: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    row2: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    row3: ["Z", "X", "C", "V", "B", "N", "M"],
    row4: ["", " ", "   "],
  },
  keyboardData_en_lowerCase_querty: {
    row1: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    row2: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    row3: ["z", "x", "c", "v", "b", "n", "m"],
    row4: ["", " ", "   "],
  },
  keyboardData_es: {
    row1: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
    row2: ["J", "K", "L", "M", "N", "capNÑ", "O", "P", "Q"],
    row3: ["R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    row4: [
      "capAÁ",
      "capEÉ",
      "capIÍ",
      "capOÓ",
      "capUÚ",
      "capUUÜ",
      "",
      " ",
      "   ",
    ],
  },
  keyboardData_es_lowerCase: {
    row1: ["a", "b", "c", "d", "e", "f", "g", "h", "i"],
    row2: ["j", "k", "l", "m", "n", "smallnñ", "o", "p", "q"],
    row3: ["r", "s", "t", "u", "v", "w", "x", "y", "z"],
    row4: [
      "smallaá",
      "smalleé",
      "smallií",
      "smalloó",
      "smalluú",
      "smalluuü",
      "",
      " ",
      "   ",
    ],
  },
  keyboardData_es_querty: {
    row1: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    row2: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    row3: ["Z", "X", "C", "V", "B", "N", "capNÑ", "M"],
    row4: [
      "capAÁ",
      "capEÉ",
      "capIÍ",
      "capOÓ",
      "capUÚ",
      "capUUÜ",
      "",
      " ",
      "   ",
    ],
  },
  keyboardData_es_lowerCase_querty: {
    row1: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    row2: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    row3: ["z", "x", "c", "v", "b", "n", "smallnñ", "m"],
    row4: [
      "smallaá",
      "smalleé",
      "smallií",
      "smalloó",
      "smalluú",
      "smalluuü",
      "",
      " ",
      "   ",
    ],
  },
  allViewPos_gK1: [
    {
      name: "levelIsland devDesign devResize ng-scope type1 lastLevelAnim ui-draggable ui-draggable-handle ui-resizable 0",
      top: "-680px",
      left: "150px",
      bottom: "311px",
      height: "250px",
      width: "250px",
    },
  ],
  allViewPos_g2: [
    {
      name: "levelIsland devDesign devResize ng-scope type1 lastLevelAnim ui-draggable ui-draggable-handle ui-resizable 0",
      top: "-680px",
      left: "150px",
      bottom: "311px",
      height: "250px",
      width: "250px",
    },
  ],
  data: {
    acs: {
      selector: ".appContainer .view",
      attributes: {},
      ignoreTab: true,
      children: {
        splashScreen: {
          selector: ".splashScreen",
          attributes: {},
          ignoreTab: true,
          data: {
            isCyclicTabTrap: "splashScreen",
          },
          children: {
            ss1: {
              selector: ".playBtn",
              attributes: {
                role: "button",
                "aria-label": {
                  en: "Play",
                  es: "Jugar",
                },
                data: {
                  keys: {
                    enter: {
                      action: "click",
                    },
                  },
                },
              },
            },
            ss2: {
              selector: ".splashScreen .gameInfoContainer",
              attributes: {
                role: "article",
              },
            },
            ss3: {
              selector: ".splashScreen .splashReportBtn",
              attributes: {
                role: "button",
                "aria-label": {
                  en: "Teacher Report",
                  es: "Informe del maestro",
                },
              },
              data: {
                keys: {
                  enter: {
                    action: "click",
                  },
                },
              },
            },
          },
        },
        teacherReport: {
          selector: ".gameReportContainer",
          attributes: {},
          ignoreTab: true,
          data: {
            isCyclicTabTrap: "teacherReport",
          },
          children: {
            tr1: {
              selector: ".gameReportContainer .gameReport",
              attributes: {
                role: "article",
                "aria-label": {
                  en: "Report",
                  es: "Informe",
                },
              },
            },
            tr2: {
              selector: ".gameReportContainer .downloadReportBtn",
              attributes: {
                role: "button",
                "aria-label": {
                  en: "download report",
                  es: "Descarga el informe completo",
                },
              },
              data: {
                keys: {
                  enter: {
                    action: "click",
                  },
                },
              },
            },
            tr3: {
              selector: ".gameReportContainer .reportCloseIcon",
              attributes: {
                role: "button",
                "aria-label": {
                  en: "close report",
                  es: "cerrar informe",
                },
              },
              data: {
                keys: {
                  enter: {
                    action: "click",
                  },
                },
              },
            },
          },
        },
        levelScreenInstruction: {
          selector: ".view",
          attributes: {},
          ignoreTab: true,
          data: {
            isCyclicTabTrap: "levelScreenInstruction",
          },
          children: {
            sInst1: {
              selector: ".view .playLevelInformation .ignoreClose",
              attributes: {
                role: "article",
              },
            },
            sInst2: {
              selector: ".view .playLevelInformation .closeLevelInfo",
              attributes: {
                role: "button",
                "aria-label": {
                  en: "close",
                  es: "Cerrar",
                },
              },
              data: {
                keys: {
                  enter: {
                    action: "click",
                  },
                },
              },
              focusTgt: ".levelScreenNav .levelInstructionBtn",
            },
            sInst3: {
              selector: ".view .playLevelInformation .infoAudioBtn",
              attributes: {
                role: "button",
                "aria-label": {
                  en: "audio",
                  es: "Audio",
                },
              },
              data: {
                keys: {
                  enter: {
                    action: "click",
                  },
                },
              },
            },
          },
        },
        aslScreenInstruction: {
          selector: ".view",
          attributes: {},
          ignoreTab: true,
          data: {
            isCyclicTabTrap: "aslScreenInstruction",
          },
          children: {
            alsInst1: {
              selector: ".aslvideopop",
              attributes: {
                role: "button",
                "aria-label": "close",
              },
            },
          },
        },
        playScreenInstruction: {
          selector: ".playScreen",
          attributes: {},
          ignoreTab: true,
          data: {
            isCyclicTabTrap: "playScreenInstruction",
          },
          children: {
            pls1: {
              selector: ".playscreenIns span",
              attributes: {
                role: "article",
              },
            },
            pls2: {
              selector: ".playscreenIns .infoCloseGlobal",
              attributes: {
                role: "button",
                "aria-label": {
                  en: "close",
                  es: "Cerrar",
                },
              },
              data: {
                keys: {
                  enter: {
                    action: "click",
                  },
                },
              },
            },
            pls3: {
              selector: ".playscreenIns .popupAud",
              attributes: {
                role: "button",
                "aria-label": {
                  en: "audio",
                  es: "Audio",
                },
              },
              data: {
                keys: {
                  enter: {
                    action: "click",
                  },
                },
              },
            },
          },
        },
        levelScreen: {
          selector: ".levelScreen",
          attributes: {},
          ignoreTab: true,
          children: {
            ls1: {
              selector: ".levelInstructionBtn",
              attributes: {
                role: "button",
                "aria-label": {
                  en: "instructions",
                  es: "Instrucciones",
                },
              },
              data: {
                keys: {
                  enter: {
                    action: "click",
                  },
                },
              },
            },
            ls2: {
              selector: ".aslIntroInstructionVideoBtn",
              attributes: {
                role: "button",
                "aria-label": {
                  en: "ASL Instruction is used only for hearing impairment users, press enter or space to launch",
                  es: "asl instrucción",
                },
              },
              data: {
                keys: {
                  enter: {
                    action: "click",
                  },
                },
              },
            },
            ls3: {
              selector: ".levelexitBtn",
              attributes: {
                role: "button",
                "aria-label": {
                  en: "save and exit",
                  es: "Guardar y salir",
                },
              },
              data: {},
            },
            ls4: {
              selector: ".levelScreen .gameTotalScore span",
              attributes: {},
            },
            ls5: {
              selector: ".levelScreen .lvlDown",
              attributes: {
                "aria-label": {
                  en: "previous button",
                  es: "botón anterior",
                },
                role: "button",
              },
              data: {
                keys: {
                  enter: {
                    action: "click",
                  },
                },
              },
            },
            ls6: {
              selector: ".levelScreen .lvlUp",
              attributes: {
                "aria-label": {
                  en: "next button",
                  es: "Próximo botón",
                },
                role: "button",
              },
              data: {
                keys: {
                  enter: {
                    action: "click",
                  },
                },
              },
            },
            ls8: {
              selector: ".levelMode.easy",
              attributes: {
                "aria-label": {
                  en: "<1>",
                  es: "<1>",
                },
                role: "button",
              },
              dynamicLabel: ["span"],
              naturalTabOrder: true,
              data: {
                keys: {
                  enter: {
                    action: "click",
                  },
                },
              },
            },
            ls10: {
              selector: ".levelMode.challenger",
              attributes: {
                "aria-label": {
                  en: "<1>",
                  es: "<1>",
                },
                role: "button",
              },
              dynamicLabel: ["span"],
              data: {
                keys: {
                  enter: {
                    action: "click",
                  },
                },
              },
            },
          },
        },
        playScreen: {
          selector: ".playScreen",
          attributes: {},
          ignoreTab: true,
          children: {
            ps5: {
              selector: ".playScreen .levelInstructionBtn",
              attributes: {
                role: "button",
              },
              naturalTabOrder: true,
              data: {
                keys: {
                  enter: {
                    action: "click",
                  },
                },
              },
            },
            ps6: {
              selector: ".playScreen .repeatWordAudio",
              attributes: {
                role: "button",
              },
              "aria-label": {
                en: "repeat word",
                es: "Repetir la palabra",
              },
              data: {
                keys: {
                  enter: {
                    action: "click",
                  },
                },
              },
            },
            ps6_1_1: {
              selector: ".aslInstructionVideoBtn",
              attributes: {
                role: "button",
              },
              naturalTabOrder: true,
              data: {
                keys: {
                  enter: {
                    action: "click",
                  },
                },
              },
            },
            ps6_1_2: {
              selector: ".aslVideoBtn",
              attributes: {
                role: "button",
              },
              naturalTabOrder: true,
              data: {
                keys: {
                  enter: {
                    action: "click",
                  },
                },
              },
            },
            ps6_1: {
              selector: ".playScreen .progressLevel",
              "aria-label": {
                en: "island name",
                es: "nombre de la isla",
              },
            },
            ps6_2: {
              selector: ".playScreen .levelName",
              "aria-label": {
                en: "level name",
                es: "nombre de nivel",
              },
            },
            ps7: {
              selector: ".leafCover.active",
              attributes: {
                role: "button",
                "aria-label": {
                  en: "<1>",
                  es: "<1>",
                },
              },
              dynamicLabel: ["span"],
              data: {
                keys: {
                  enter: {
                    action: "click",
                  },
                },
              },
            },
            ps8: {
              selector: ".leafCover.inactive",
              attributes: {
                role: "",
                "aria-label": {
                  en: "",
                  es: "",
                },
              },
              ignoreTab: "true",
              data: {
                keys: {
                  enter: {
                    action: "click",
                  },
                },
              },
            },
            ps10: {
              selector: ".dnd-wrapper .checkAnserBtn",
              attributes: {
                "aria-label": {
                  en: "<1>",
                  es: "<1>",
                },
              },
              dynamicLabel: [".dnd-wrapper .checkAnserBtn"],
              data: {
                keys: {
                  enter: {
                    action: "click",
                  },
                },
              },
            },
            ps9: {
              selector: ".feedbackTable .tableData",
              attributes: {
                "aria-label": {
                  en: "spelling word <1>",
                  es: "Palabra de ortografía <1>",
                },
              },
              dynamicLabel: ["span"],
              naturalTabOrder: true,
            },
          },
        },
        rewardPopup: {
          selector: ".levelEndPopup",
          attributes: {
            role: "dialog",
          },
          ignoreTab: true,
          data: {
            isCyclicTabTrap: "rewardPopup",
          },
          children: {
            pc0: {
              selector: ".levelEndPopup .endHeading",
              attributes: {
                role: "article",
                "aria-label": {
                  en: "<1>",
                  es: "<1>",
                },
              },
              dynamicLabel: [".levelEndPopup .endHeading"],
            },
            pc1: {
              selector: ".levelEndPopup .endMsg",
              attributes: {
                role: "article",
                "aria-label": {
                  en: "<1>",
                  es: "<1>",
                },
              },
              dynamicLabel: [".levelEndPopup .endMsg"],
            },
            pc1_1: {
              selector: ".levelEndPopup .endExitBtn",
              attributes: {
                role: "button",
                "aria-label": {
                  en: "save and exit",
                  es: "Guardar y salir",
                },
              },
              data: {
                keys: {
                  enter: {
                    action: "slectSaveAndExit",
                    target: "self",
                    autoFocus: "",
                  },
                },
              },
            },
            pc1_2: {
              selector: ".levelEndPopup .endLvlBtn",
              attributes: {
                role: "button",
                "aria-label": {
                  en: "next level",
                  es: "Próximo nivel",
                },
              },
              data: {
                keys: {
                  enter: {
                    action: "click",
                  },
                },
              },
            },
            pc2: {
              selector: ".levelEndPopup .btnTertiary",
              attributes: {
                role: "button",
                "aria-label": {
                  en: "return to island map",
                  es: "Volver al Mapa de las islas",
                },
              },
              data: {
                keys: {
                  enter: {
                    action: "click",
                  },
                },
              },
            },
          },
        },
        savestatePopup: {
          selector: ".popupContainer",
          attributes: {
            role: "dialog",
          },
          ignoreTab: true,
          data: {
            isCyclicTabTrap: "savestatePopup",
          },
          children: {
            pc1: {
              selector: ".popupContainer .textContainer",
              attributes: {
                role: "heading",
              },
            },
            pc2: {
              selector: ".popupContainer .cancelBtn",
              attributes: {
                role: "button",
                "aria-label": {
                  en: "Resume Game",
                  es: "Reanudar juego",
                },
              },
              data: {
                keys: {
                  enter: {
                    action: "click",
                  },
                },
              },
            },
            pc3: {
              selector: ".popupContainer .okBtn",
              attributes: {
                role: "button",
                "aria-label": {
                  en: "Start a new game",
                  es: "Comience un juego nuevo",
                },
              },
              data: {
                keys: {
                  enter: {
                    action: "click",
                  },
                },
              },
            },
          },
        },
        saveAndExitPopup: {
          selector: ".popupContainer",
          attributes: {
            role: "dialog",
          },
          ignoreTab: true,
          data: {
            isCyclicTabTrap: "saveAndExitPopup",
          },
          children: {
            se0: {
              selector: ".popupContainer .textContainer .innerText",
            },
            se1: {
              selector: ".popupContainer .confirmBtns .cancelBtn",
              attributes: {
                role: "button",
                "aria-label": {
                  en: "Cancel",
                  es: "Cancelar",
                },
              },
              data: {
                keys: {
                  enter: {
                    action: "click",
                  },
                },
              },
            },
            se2: {
              selector: ".popupContainer .confirmBtns .okBtn",
              attributes: {
                role: "button",
                "aria-label": {
                  en: "Yes",
                  es: "Aceptar",
                },
              },
              data: {
                keys: {
                  enter: {
                    action: "click",
                  },
                },
              },
            },
          },
        },
      },
    },
    audioplayer: {
      0: {
        en: "assets/audios/numbers/0.mp3",
        es: "",
      },
      1: {
        en: "assets/audios/numbers/1.mp3",
        es: "",
      },
      2: {
        en: "assets/audios/numbers/2.mp3",
        es: "",
      },
      3: {
        en: "assets/audios/numbers/3.mp3",
        es: "",
      },
      4: {
        en: "assets/audios/numbers/4.mp3",
        es: "",
      },
      5: {
        en: "assets/audios/numbers/5.mp3",
        es: "",
      },
      6: {
        en: "assets/audios/numbers/6.mp3",
        es: "",
      },
      7: {
        en: "assets/audios/numbers/7.mp3",
        es: "",
      },
      8: {
        en: "assets/audios/numbers/8.mp3",
        es: "",
      },
      9: {
        en: "assets/audios/numbers/9.mp3",
        es: "",
      },
      10: {
        en: "assets/audios/numbers/10.mp3",
        es: "",
      },
      11: {
        en: "assets/audios/numbers/11.mp3",
        es: "",
      },
      12: {
        en: "assets/audios/numbers/12.mp3",
        es: "",
      },
      13: {
        en: "assets/audios/numbers/13.mp3",
        es: "",
      },
      14: {
        en: "assets/audios/numbers/14.mp3",
        es: "",
      },
      15: {
        en: "assets/audios/numbers/15.mp3",
        es: "",
      },
      16: {
        en: "assets/audios/numbers/16.mp3",
        es: "",
      },
      17: {
        en: "assets/audios/numbers/17.mp3",
        es: "",
      },
      18: {
        en: "assets/audios/numbers/18.mp3",
        es: "",
      },
      19: {
        en: "assets/audios/numbers/19.mp3",
        es: "",
      },
      20: {
        en: "assets/audios/numbers/20.mp3",
        es: "",
      },
      controls: false,
      default: "",
      intro: {
        en: "assets/audios/vo_sfx/SV_splash.mp3",
        es: "",
      },
      letsgo: {
        en: "assets/audios/vo_sfx/SV_intro.mp3",
        es: "",
      },
      click: {
        en: "assets/audios/vo_sfx/SFX_CLICK.mp3",
        es: "",
      },
      appear: {
        en: "assets/audios/SFX_APPEAR.mp3",
        es: "",
      },
      correct: {
        en: "assets/audios/vo_sfx/SV_correctSFX.mp3",
        es: "",
      },
      incorrect: {
        en: "assets/audios/vo_sfx/SV_lv1_incrt1st_SFX.mp3",
        es: "",
      },
      incorrect2: {
        en: "assets/audios/vo_sfx/SV_incrt2nd_SFX.mp3",
        es: "",
      },
      incorrect_abrv236: {
        en: "assets/audios/vo_sfx/SV_lv1_abrv236_incrt1st.mp3",
        es: "",
      },
      incorrect_lv2k: {
        en: "assets/audios/vo_sfx/SV_lv2k_incrt1st_SFX.mp3",
        es: "",
      },
      incorrect_lv2: {
        en: "assets/audios/vo_sfx/SV_lv2_incrt1st_SFX.mp3",
        es: "",
      },
      incorrect2_lv2_abrv236: {
        en: "assets/audios/vo_sfx/SV_lv2_abrv236_incrt1st.mp3",
        es: "",
      },
      find: {
        en: "assets/audios/vo_sfx/SV_lv1_find.mp3",
        es: "",
      },
      find_abrv236: {
        en: "assets/audios/vo_sfx/SV_lv1_abrv236.mp3",
        es: "",
      },
      level1Info_gK: {
        en: "assets/audios/vo_sfx/SV_lv1_infok.mp3",
        es: "",
      },
      level1Info_gK12: {
        en: "assets/audios/vo_sfx/SV_lv1_infok12.mp3",
        es: "",
      },
      level1Info_g2_l36: {
        en: "assets/audios/vo_sfx/SV_lv1_info236.mp3",
        es: "",
      },
      level2Info_gK: {
        en: "assets/audios/vo_sfx/SV_lv2_infok.mp3",
        es: "",
      },
      level2Info_gK12: {
        en: "assets/audios/vo_sfx/SV_lv2_infok12.mp3",
        es: "",
      },
      level2Info_g2_l36: {
        en: "assets/audios/vo_sfx/SV_lv2_info236.mp3",
        es: "",
      },
      spell: {
        en: "assets/audios/vo_sfx/SV_lv2_spell.mp3",
        es: "",
      },
      spell_abrv236: {
        en: "assets/audios/vo_sfx/SV_lv2_abrv236.mp3",
        es: "",
      },
      spell_letter: {
        en: "assets/audios/vo_sfx/SV_lv2_repeat.mp3",
        es: "",
      },
      spell_letter_repeat: {
        en: "assets/audios/vo_sfx/SV_lv2_repeat.mp3",
        es: "",
      },
      r1: {
        en: "assets/audios/vo_sfx/SV_EOL1k12a.mp3",
        es: "",
      },
      r1_l2_pass: {
        en: "assets/audios/vo_sfx/SS_EOL1.mp3",
        es: "",
      },
      r2: {
        en: "assets/audios/vo_sfx/SV_EOLk12b.mp3",
        es: "",
      },
      r3_k: {
        en: "assets/audios/vo_sfx/SV_EOLkc.mp3",
        es: "",
      },
      r3_k12: {
        en: "assets/audios/vo_sfx/SV_EOLk12c.mp3",
        es: "",
      },
      r4: {
        en: "assets/audios/vo_sfx/SV_TryAgnk12a.mp3",
        es: "",
      },
      r4_l2_fail: {
        en: "assets/audios/vo_sfx/SS_EOL4.mp3",
        es: "",
      },
      r5_k: {
        en: "assets/audios/vo_sfx/SV_TryAgnkc.mp3",
        es: "",
      },
      r5_k12: {
        en: "assets/audios/vo_sfx/SV_TryAgnk12c.mp3",
        es: "",
      },
      r5_k_lastatt: {
        en: "assets/audios/vo_sfx/SV_TryAgnkc_lastAtt.mp3",
        es: "",
      },
      r5_k12_lastatt: {
        en: "assets/audios/vo_sfx/SV_TryAgnk12c_lastAtt.mp3",
        es: "",
      },
      r6: {
        en: "assets/audios/vo_sfx/WA_Complete.mp3",
        es: "",
      },
    },
    captions: {
      0: {
        en: "0",
        es: "0",
      },
      1: {
        en: "1",
        es: "1",
      },
      2: {
        en: "2",
        es: "2",
      },
      3: {
        en: "3",
        es: "3",
      },
      4: {
        en: "4",
        es: "4",
      },
      5: {
        en: "5",
        es: "5",
      },
      6: {
        en: "6",
        es: "6",
      },
      7: {
        en: "7",
        es: "7",
      },
      8: {
        en: "8",
        es: "8",
      },
      9: {
        en: "9",
        es: "9",
      },
      10: {
        en: "10",
        es: "10",
      },
      intro: {
        en: "Hello! Welcome to Urchin Search. Identify the correct high-frequency words to collect urchins. Keep scoring your best to collect as many urchins as you can. There is a sun at the last island waiting to give you a high 5! <br/> So, are you ready to set a new high score? <br/> Click on “play” to begin the adventure.",
        es: "Hello! Welcome to Urchin Search. Identify the correct high-frequency words to collect urchins. Keep scoring your best to collect as many urchins as you can. There is a sun at the last island waiting to give you a high 5! <br/> So, are you ready to set a new high score? <br/> Click on “play” to begin the adventure.",
      },
      letsgo: {
        en: "Let’s go collect some Urchins! Choose an  island!",
        es: "Let’s go collect some Urchins! Choose an  island!",
      },
      correct: {
        en: "Correct",
        es: "Correct",
      },
      incorrect: {
        en: "Incorrect",
        es: "Incorrect",
      },
      find: {
        en: "Find ",
        es: "Find ",
      },
      correctans: {
        en: "The correct answer is ",
        es: "The correct answer is ",
      },
      lvlUnlock: {
        en: "You have unlocked a new level.",
        es: "You have unlocked a new level.",
      },
      lowreward: {
        en: "You can do it. Try again.",
        es: "You can do it. Try again.",
      },
      medreward: {
        en: "Nice going. Come back and try again.",
        es: "Nice going. Come back and try again.",
      },
      endreward: {
        en: "Congratulations!",
        es: "Congratulations!",
      },
      timerstart: {
        en: "Find as many words as you can before the time runs out!",
        es: "Find as many words as you can before the time runs out!",
      },
      timerend: {
        en: "Time up.",
        es: "Time up.",
      },
      tryagain: {
        en: "Try Again!",
        es: "Try Again!",
      },
      twomorewords: {
        en: "You have 2 more sight words to find after this.",
        es: "You have 2 more sight words to find after this.",
      },
      goahead: {
        en: "Go ahead. You can do it.",
        es: "Go ahead. You can do it.",
      },
      keepgoing: {
        en: "Keep going!",
        es: "Keep going!",
      },
      chooselevel: {
        en: "Let's go! Choose the next level.",
        es: "Let's go! Choose the next level.",
      },
      youfound: {
        en: "You spelled",
        es: "You spelled",
      },
      wordsandthus: {
        en: "words and thus you collected",
        es: "words and thus you collected",
      },
      urchins: {
        en: "urchins",
        es: "urchins",
      },
      congratulations: {
        en: "Congratulations!",
        es: "Congratulations!",
      },
      nicegoing: {
        en: "Nice going!",
        es: "Nice going!",
      },
      awesomejob: {
        en: "You did an awesome job.",
        es: "You did an awesome job.",
      },
      awesome: {
        en: "Awesome!",
        es: "Awesome!",
      },
      fantastic: {
        en: "Fantastic!",
        es: "Fantastic!",
      },
      greatgoing: {
        en: "Great going!",
        es: "Great going!",
      },
      unlocklevel: {
        en: "You have unlocked the next level.",
        es: "You have unlocked the next level.",
      },
      unlocknode: {
        en: "You have unlocked the next difficulty node.",
        es: "You have unlocked the next difficulty node.",
      },
      nounlock: {
        en: "You need to collect at least 1 urchin to unlock to the next difficulty node. You can do it. Play the level again.",
        es: "You need to collect at least 1 urchin to unlock to the next difficulty node. You can do it. Play the level again.",
      },
      choosechlg: {
        en: "Let’s go collect some Urchins! You may now choose the challenge node of the island!",
        es: "Let’s go collect some Urchins! You may now choose the challenge node of the island!",
      },
      chlg1: {
        en: "You need to find at least 7 words in challenge node to unlock the next island. Play again.",
        es: "You need to find at least 7 words in challenge node to unlock the next island. Play again.",
      },
      chlg2: {
        en: "Congratulations! You have unlocked the next island.",
        es: "Congratulations! You have unlocked the next island.",
      },
      chlg3: {
        en: "Awesome! You have unlocked the next island.",
        es: "Awesome! You have unlocked the next island.",
      },
      welcomeback: {
        en: "Welcome back",
        es: "Welcome back",
      },
    },
    dataset: {
      en: {},
      es: {},
    },
    dataset_bk: {
      en: {
        1: [
          ["c", "o", "s"],
          ["S", "C", "O"],
          ["s", "o", "c"],
          ["o", "c", "s"],
          ["C", "O", "S"],
          ["O", "C", "S"],
          ["c", "o", "s"],
          ["S", "C", "O"],
          ["o", "s", "c"],
          ["s", "o", "c"],
        ],
      },
      es: {},
    },
    dndcomp: {
      dragOptions: {
        cursor: "move",
        helper: "clone",
      },
      customDragOptions: {
        containment: "#dndcomp",
      },
      dropOptions: {
        accept: ".draggable",
        tolerance: "pointer",
        greedy: true,
        hoverClass: "highlightActive",
      },
      customDropOptions: {
        dropAtMouse: true,
        dropContainer: ".wordDrops",
      },
    },
    popup: {
      back_en: {
        type: "text",
        hideHeader: true,
        confirmBtns: true,
        okTxt: " ",
        cancelTxt: " ",
        textContent: "Quit?",
      },
      end_en: {
        type: "text",
        hideHeader: true,
        confirmBtns: true,
        okTxt: "Save & Exit",
        cancelTxt: "Next Level",
        textContent:
          "<div class='popupUrchins'><div class='scoreUrchin'></div><div class='scoreUrchin'></div><div class='scoreUrchin'></div></div>",
      },
      reload_en: {
        type: "text",
        hideHeader: true,
        confirmBtns: true,
        okTxt: "Yes",
        cancelTxt: "Cancel",
        textContent:
          "<div class='saveAndExitText'><h2 id='dialog_label'>Save for Later</h2><div id='dialog_desc' class='innerText'>Are you sure you want to end this game?</div></div>",
      },
      submit_en: {
        type: "text",
        hideHeader: true,
        confirmBtns: true,
        okTxt: "Yes",
        cancelTxt: "Cancel",
        textContent:
          "<div class='saveAndExitText'><h2 id='dialog_label'>Submit & Exit</h2><div id='dialog_desc' class='innerText'>Are you sure you want to end this game?</div></div>",
      },
    },
    rawDB: {
      en: [
        {
          1: [],
          2: [],
          3: [],
          4: [],
          5: [
            {
              Grade: 5,
              Week: 2,
              Unit: 3,
              Words: "pessimist, pesimist, pessimest",
              rule: "Suffixes -ize, -ance, -ence, -ist",
          },
          {
              Grade: 5,
              Week: 2,
              Unit: 3,
              Words: "optimist, optumist, optimissed",
              rule: "Suffixes -ize, -ance, -ence, -ist",
          },
          {
              Grade: 5,
              Week: 2,
              Unit: 3,
              Words: "physicist, physisist, physicest",
              rule: "Suffixes -ize, -ance, -ence, -ist",
          },
          {
              Grade: 5,
              Week: 2,
              Unit: 3,
              Words: "protagonist, protagunist, protagonest",
              rule: "Suffixes -ize, -ance, -ence, -ist",
          },
          {
              Grade: 5,
              Week: 2,
              Unit: 3,
              Words: "antagonist, antaginist, antagonest",
              rule: "Suffixes -ize, -ance, -ence, -ist",
          },
          {
              Grade: 5,
              Week: 2,
              Unit: 3,
              Words: "clearance, clearanse, clearince",
              rule: "Suffixes -ize, -ance, -ence, -ist",
          },
          {
              Grade: 5,
              Week: 2,
              Unit: 3,
              Words: "brilliance, brillianse, brillience",
              rule: "Suffixes -ize, -ance, -ence, -ist",
          },
          {
              Grade: 5,
              Week: 2,
              Unit: 3,
              Words: "performance, performanse, performence",
              rule: "Suffixes -ize, -ance, -ence, -ist",
          },
          {
              Grade: 5,
              Week: 2,
              Unit: 3,
              Words: "appearance, appearanse, appearence",
              rule: "Suffixes -ize, -ance, -ence, -ist",
          },
          {
              Grade: 5,
              Week: 2,
              Unit: 3,
              Words: "disappearance, disappearanse, disappearance",
              rule: "Suffixes -ize, -ance, -ence, -ist",
          },
          {
              Grade: 5,
              Week: 2,
              Unit: 3,
              Words: "insurance, insurence, insuranse",
              rule: "Suffixes -ize, -ance, -ence, -ist",
          },
          {
              Grade: 5,
              Week: 2,
              Unit: 3,
              Words: "preference, preferance, preferense",
              rule: "Suffixes -ize, -ance, -ence, -ist",
          },
          {
              Grade: 5,
              Week: 2,
              Unit: 3,
              Words: "existence, existance, existince",
              rule: "Suffixes -ize, -ance, -ence, -ist",
          },
          {
              Grade: 5,
              Week: 2,
              Unit: 3,
              Words: "coherence, cohearance, coherance",
              rule: "Suffixes -ize, -ance, -ence, -ist",
          },
          {
              Grade: 5,
              Week: 2,
              Unit: 3,
              Words: "influence, influance, influense",
              rule: "Suffixes -ize, -ance, -ence, -ist",
          },
          {
              Grade: 5,
              Week: 2,
              Unit: 3,
              Words: "familiarize, familiaraze, familiareze",
              rule: "Suffixes -ize, -ance, -ence, -ist",
          },
          {
              Grade: 5,
              Week: 2,
              Unit: 3,
              Words: "memorize, memorise, memorice",
              rule: "Suffixes -ize, -ance, -ence, -ist",
          },
          {
              Grade: 5,
              Week: 2,
              Unit: 3,
              Words: "colonize, colonise, coloniz",
              rule: "Suffixes -ize, -ance, -ence, -ist",
          },
          {
              Grade: 5,
              Week: 2,
              Unit: 3,
              Words: "sanitize, sanitice, sanitise",
              rule: "Suffixes -ize, -ance, -ence, -ist",
          },
          {
              Grade: 5,
              Week: 2,
              Unit: 3,
              Words: "italicize, italacize, italicise",
              rule: "Suffixes -ize, -ance, -ence, -ist",
          },
          ],
          K: []
        },
      ],
      es: [],
    },
    rawDB_bk: [
      {
        Grade: "K",
        Week: 1,
        Unit: 3,
        Words: "J, F, G",
        rule: "Consonant Jj /j/, Xx /ks/",
      },
    ],
    tincan: {
      activity_name: "Spelling Voyage",
      grade: 5,
      //max_score: 120,
      max_score: 3,
      total_score: 0,
      total_time_spent: 0,
      time_in_units: "00:00:00",
      percentage_completion: "0%",
      isFirstTime: true,
      restoreGame: false,
      savedState: {
        screenType: 1,
        levelGroup: 1,
        level: 1,
        totalGroups: 0,
        totalLevels: 0,
        totalScore: 0,
        userScore: 0,
        levelGroups: null,
        midLevelState: null,
      },
      userDetails: {
        userId: "SAVVAS",
        userRole: "ADMIN",
        userOrg: "SAVVAS",
      },
    },
  },
  precacheimages: [
    "assets/images/fillwords/back.png",
    "assets/images/fillwords/bg.png",
    "assets/images/fillwords/filling_box0001.png",
    "assets/images/fillwords/key_Comma.png",
    "assets/images/fillwords/key_FullStop.png",
    "assets/images/fillwords/key_SingleQuote.png",
    "assets/images/hud/backBtn.png",
    "assets/images/hud/cancelBtn.png",
    "assets/images/hud/confirmBtn.png",
    "assets/images/hud/confirm_bg.png",
    "assets/images/hud/icons/CC_button.png",
    "assets/images/hud/icons/Lock.png",
    "assets/images/hud/icons/blobstack.png",
    "assets/images/hud/icons/blue_cloud.png",
    "assets/images/hud/icons/info_button.png",
    "assets/images/hud/icons/levelnodes1.png",
    "assets/images/hud/icons/levelnodes10.png",
    "assets/images/hud/icons/levelnodes11.png",
    "assets/images/hud/icons/levelnodes12.png",
    "assets/images/hud/icons/levelnodes13.png",
    "assets/images/hud/icons/levelnodes14.png",
    "assets/images/hud/icons/levelnodes15.png",
    "assets/images/hud/icons/levelnodes2.png",
    "assets/images/hud/icons/levelnodes3.png",
    "assets/images/hud/icons/levelnodes4.png",
    "assets/images/hud/icons/levelnodes5.png",
    "assets/images/hud/icons/levelnodes6.png",
    "assets/images/hud/icons/levelnodes7.png",
    "assets/images/hud/icons/levelnodes8.png",
    "assets/images/hud/icons/levelnodes9.png",
    "assets/images/hud/icons/lock_progressbar.png",
    "assets/images/hud/icons/progressbar_meter.png",
    "assets/images/hud/icons/speaker_button.png",
    "assets/images/hud/newhighscore.png",
    "assets/images/hud/nextBtn.png",
    "assets/images/hud/popup_bg.png",
    "assets/images/hud/returnBtn_up.png",
    "assets/images/icons/Island_silhouette.png",
    "assets/images/icons/arrowleft.png",
    "assets/images/icons/arrowleftactive.png",
    "assets/images/icons/arrowright.png",
    "assets/images/icons/arrowrightactive.png",
    "assets/images/icons/arrows0003.png",
    "assets/images/icons/arrows0004.png",
    "assets/images/icons/arrows0009.png",
    "assets/images/icons/arrows0010.png",
    "assets/images/icons/audio_repeat.png",
    "assets/images/icons/back_btn.png",
    "assets/images/icons/buttons0003.png",
    "assets/images/icons/buttons0004.png",
    "assets/images/icons/buttons0009.png",
    "assets/images/icons/buttons0010.png",
    "assets/images/icons/correct1.png",
    "assets/images/icons/info_pop_up_box.png",
    "assets/images/icons/keyboard_pink.png",
    "assets/images/icons/keyboard_white.png",
    "assets/images/icons/lock_dark.png",
    "assets/images/icons/lock_white.png",
    "assets/images/icons/sign_onwhitebox0001.png",
    "assets/images/icons/sign_onwhitebox0002.png",
    "assets/images/icons/sign_onwhitebox0003.png",
    "assets/images/icons/svg/aslicon.svg",
    "assets/images/icons/svg/asliconHov.svg",
    "assets/images/icons/svg/audio.svg",
    "assets/images/icons/svg/audioIns.svg",
    "assets/images/icons/svg/audioInsHov.svg",
    "assets/images/icons/svg/check.svg",
    "assets/images/icons/svg/circle.svg",
    "assets/images/icons/svg/close.svg",
    "assets/images/icons/svg/correct.svg",
    "assets/images/icons/svg/incorrect.svg",
    "assets/images/icons/svg/left.svg",
    "assets/images/icons/svg/locked.svg",
    "assets/images/icons/svg/right.svg",
    "assets/images/icons/svg/x.svg",
    "assets/images/icons/tickmark.png",
    "assets/images/icons/wrong1.png",
    "assets/images/popups/b1.png",
    "assets/images/popups/b2.png",
    "assets/images/popups/b3.png",
    "assets/images/popups/b4.png",
    "assets/images/popups/b5.png",
    "assets/images/popups/b6.png",
    "assets/images/popups/bubble_burst.png",
    "assets/images/popups/confirm_bg.png",
    "assets/images/popups/fish1_open_sprite.png",
    "assets/images/popups/fish2_open_sprite.png",
    "assets/images/popups/fish3_open_sprite.png",
    "assets/images/popups/fish_sprite.png",
    "assets/images/popups/pp_2.png",
    "assets/images/popups/pp_3.png",
    "assets/images/progression/bg_2_new.png",
    "assets/images/progression/checked.png",
    "assets/images/progression/islands/type1.png",
    "assets/images/progression/islands/type1h.png",
    "assets/images/progression/islands/type2.png",
    "assets/images/progression/islands/type2h.png",
    "assets/images/progression/islands/type3.png",
    "assets/images/progression/islands/type3h.png",
    "assets/images/progression/islands/type4.png",
    "assets/images/progression/islands/type4h.png",
    "assets/images/progression/lock.png",
    "assets/images/progression/pageDownBtn.png",
    "assets/images/progression/pageUpBtn.png",
    "assets/images/progression/r1_big.png",
    "assets/images/progression/r2_big.png",
    "assets/images/progression/screens/sv_bg_1a.png",
    "assets/images/progression/screens/sv_bg_1b.png",
    "assets/images/progression/screens/sv_bg_2.png",
    "assets/images/progression/screens/sv_bg_3.png",
    "assets/images/progression/screens/sv_bg_4.png",
    "assets/images/progression/screens/sv_bg_5a.png",
    "assets/images/progression/screens/sv_bg_5b.png",
    "assets/images/progression/sv_allview2_line.png",
    "assets/images/progression/sv_allviewk1_line.png",
    "assets/images/sightwords/backdrop.png",
    "assets/images/sightwords/bubble.png",
    "assets/images/sightwords/octo_sprite.png",
    "assets/images/splash/loading.png",
    "assets/images/splash/play_button_anim.png",
    "assets/images/splash/spelling_voyage_title.png",
    "assets/images/splash/splash_screen_bg.png",
  ],
  precacheassets: {},
};

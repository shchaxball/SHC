var Room = {
    commandPrefix: "?",
    _jXNz: "",
    s: null,
    roomHeadless: null,
    _bjZn: [],
    zxn: ![],
    _jBB: null,
    l: null,
    h: null,
    as: null,
    _xNzjsd: false,
    _zhnxb: false,
    _NXB: false,
    Create: function(_cf) {
        var config = _cf;
        let lastCF = {};
        if (config) {
            if (config.botName) {
                lastCF.playerName = config.botName;
            }
            if (config.name) {
                lastCF.roomName = config.name;
            }
            if (config.roomPassword) {
                lastCF.password = config.roomPassword
            }
            if (config.maxUsers) {
                lastCF.maxPlayers = config.maxUsers;
            }
            if (config.private) {
                lastCF.public = config.private;
            }
            if (config.token) {
                lastCF.token = config.token;
            }
            if (config.isBotShow) {
                lastCF.noPlayer = config.isBotShow;
            }
            if (config.location) {
                lastCF.geo = config.location;
            }
            if (config.commandPrefix) {
                Room.commandPrefix = config.commandPrefix;
            }
        }
        _jBB = _cf;
        return new Promise((_rs, _rj) => {            
            const _rm = HBInit(lastCF);
            Room.roomHeadless = _rm;
            _rs(_rm);
            _rm.onRoomLink = function(_lkURL) {
                Room._zhnxb = true;
                console.log(_lkURL);
                Room.onLink(_lkURL);
                setTimeout(() => { Room.afterRoomLink(_lkURL) }, 1000);
            };
            _rm.onPlayerJoin = function(_pl) {
                Room.onUserJoin(_pl);
                setTimeout(() => {
                    Room.onAfterUserJoin(_pl);
                }, 5000);
                Room.At.A[_pl.id] = _pl.auth;
                Room.At.C[_pl.id] = _pl.conn;
                Room.At.An[_pl.name] = _pl.auth;
                Room.At.Cn[_pl.name] = _pl.conn;
            };
            _rm.onPlayerLeave = function(_pl) {
                Room.onUserLeave(_pl);
                setTimeout(() => {
                    Room.onAfterUserLeave(_pl);
                }, 5000);
            };
            _rm.onGameStart = function(_pl) {
                Room.onStart(_pl);
                Room.zxn = ![];
                setTimeout(() => {
                    Room.onAfterStart(_pl);
                }, 5000);
                Room.s = Room.states().KICKOFF;
            };
            _rm.onGameStop = function(_pl) {
                Room.onStop(_pl);
                Room.zxn = ![];
                setTimeout(() => {
                    Room.onAfterStop(_pl);
                }, 5000);
                Room.s = Room.states().STOP;
                Room.onEndGame();
            };
            _rm.onGameTick = function() {
                Room.everyTick();
                if (_rm.getScores().time == (_rm.getScores().timeLimit * 60 - 5) && _rm.getScores().timeLimit != 0 && Room.zxn == ![]) {
                    Room.zxn = !![];
                    Room.onAfterTimeIsUp(_rm.getScores().time);
                }
                if (_rm.getScores().time == (_rm.getScores().timeLimit * 60) && _rm.getScores().timeLimit != 0 && Room.zxn == ![]) {
                    Room.zxn = !![];
                    Room.onTimeIsUp(_rm.getScores().time);
                }
                let userList = Room.getUserList();
                if (userList.length > 0 && (Room.getUserListByTeam(1).length > 0 || Room.getUserListByTeam(2).length > 0)) {
                    for (var i = 0; i < userList.length; i++) {
                        let userPosition = userList[i].position;
                        let ballPosition = Room.getBallPosition();
                        
                        if (userPosition && ballPosition) { // Asegurarse de que ambas posiciones estén definidas
                            var distance = Math.sqrt(Math.pow(userPosition.x - ballPosition.x, 2) + Math.pow(userPosition.y - ballPosition.y, 2));
                            
                            // Suponiendo que deseas hacer algo si la distancia cumple cierto criterio, por ejemplo:
                            if (distance < 30) {
                                Room.onBallTouch(userList[i]);
                                if (Room.s === Room.states().KICKOFF) {
                                    Room.s = Room.states().PLAY;
                                }
                                Room.l = userList[i];
                            }
                        }
                    }
                }
            };
            _rm.onPlayerChat = Room.onUserChat;
            _rm.onTeamVictory = function(_sc) {
                Room.onGameVictory(_sc);
                Room.zxn = ![];
                setTimeout(() => {
                    Room.onAfterGameVictory(_sc);
                }, 5000);
                Room.s = Room.states().STOP;
            };
            _rm.onPlayerBallKick = function(_pl) {
                Room.onBallKick(_pl);
                Room.as = Room.h;
                Room.h = _pl;
                setTimeout(() => {
                    Room.onAfterBallKick(_pl);
                }, 1000);
                if (Room.s = Room.states().KICKOFF) Room.s = Room.states().PLAY;
            };
            _rm.onPlayerTeamChange = function(_cp, _bp) {
                Room.onUserTeamChange(_cp, _bp);               
                setTimeout(() => {
                    Room.onAfterUserTeamChange(_cp, _bp);
                }, 5000);
            };
            _rm.onPlayerAdminChange = function(_cp, _bp) {
                Room.onUserAdmin(_cp, _bp);
                setTimeout(() => {
                    Room.onAfterUserAdmin(_cp, _bp);
                }, 5000);
            };
            _rm.onTeamGoal = function(_tm) {
                Room.onGoalScored(Room.h, Room.as, _tm);
                setTimeout(() => {
                    Room.onAfterGoalScored(Room.h);
                }, 5000);
            };
            _rm.onPlayerKicked = function(_kp, _re, _ba, _bp) {
                Room.onUserKicked(_kp, _re, _ba, _bp);
                if (_bp === !![]) {
                    Room._bjZn.push(_kp.id);
                }
                setTimeout(() => {
                    Room.onAfterUserKicked(_kp, _re, _ba, _bp);
                }, 5000);
            };
            _rm.onGamePause = function(_bp) {
                Room.onPause(_bp);
                setTimeout(() =>  {
                    Room.onAfterPause(_bp);
                }, 5000);
                Room._NXB = true;
            };
            _rm.onGameUnpause = function(_bp) {
                Room.onUnpause(_bp);
                setTimeout(() =>  {
                    Room.onAfterUnPause(_bp);
                }, 5000);
                Room._NXB = false;
            };
            _rm.onPositionsReset = function() {
                Room.onPositions();
                setTimeout(() => {
                    Room.onAfterPositions();
                }, 5000);
                Room.s = Room.states().KICKOFF;
            };
            _rm.onStadiumChange = function(_sn, _bp) {
                Room.onAllStadiumChange(_sn, _bp);
                Room._jXNz = _sn;
                setTimeout(() => {
                    Room.onAfterAllStadiumChange(_sn, _bp);
                }, 5000);
            };
            _rm.onTeamsLockChange = function(_lk, _bp) {
                Room.onAllStadiumChange(_lk, _bp);
                setTimeout(() => {
                    Room.onAfterTeamLock(_lk, _bp);
                }, 5000);
            };
        });
    },    _nzxBN: null,
    setCustomStadium: function(_jXBML) {
        Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].setCustomStadium(_jXBML);
        Room.onCustomStadium(_jXBML);
        Room._nzxBN = _jXBML;
    },
    setDefaultStadium: function(_jxN) {
        Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].setDefaultStadium(_jxN);
        Room.onDefaultStadium();
    },
    onLink: function(_jxNB) {
    },
    afterRoomLink: function(_jGX) {
    },
    onAfterTimeIsUp: function(_JKzx) {

    },
    onBallTouch: function(_xuz) {

    },
    onTimeIsUp: function(_XHbz) {

    },
    onUserJoin: function(_QgZXB) {

    },
    onAfterUserJoin: function(_QgZXB) {

    },
    onStart: function(_PQOW) {

    },
    onAfterStart: function(_PQOW) {

    },
    onStop: function(_XBNZ) {

    },
    onAfterStop: function(_XBNZ) {

    },
    onUserLeave: function(_JXNZ) {
        
    },
    onAfterUserLeave: function(_JXNZ) {
        
    },
    everyTick: function() {

    },
    onUserChat: function(_jLZZ, _JGSBW) {
    },
    onAfterUserChat: function(_jLZZ, _JGSBW) {
    },
    onCustomStadium: function(_JZ){

    },
    onAfterCustomStadium: function(_JZ){

    },
    onDefaultStadium: function(){

    },
    onAfterDefaultStadium: function(){

    },
    onUserAdmin: function(_jZ, _BY){

    },
    onAfterUserAdmin: function(_jZ, _BY){

    },
    onGameVictory: function(_gZ){

    },
    onAfterGameVictory: function(_gZ){

    },
    onGoalScored: function(_ZX, _X, _TM) {

    },    
    onAfterGoalScored: function(_ZX) {

    },    
    onBallKick: function(_oBl) {

    },
    onAfterBallKick: function(_oBl) {

    },
    onUserTeamChange: function(_cHn, _njZ) {

    },
    onAfterUserTeamChange: function(_cHn, _njZ) {

    },
    onUserKicked: function(_jSnQ,_HBXBX, _HBINI, _XZW) {
        
    },
    onAfterUserKicked: function(_jSnQ, _XZW) {
        
    },
    onPause: function(_hjX) {

    },
    onAfterPause: function(_hjX) {

    },
    onUnpause: function(_jhZ) {

    },
    onAfterUnpause: function(_jhZ) {

    },
    onPositions: function() {

    },
    onAfterPositions: function() {

    },
    onAllStadiumChange: function(_jHX, _BY) {

    },
    onAfterAllStadiumChange: function(_jHX, _BY) {

    },
    onTeamLock: function(_IS, _BZ) {

    },
    onAfterTeamLock: function(_IS, _BZ) {

    },
    banList: function() {
        return Room._bjZn;
    },
    sendAnnouncement: function(_a, _b, _c, _d, _e) {
        var _f = _a;
        var _g = _b;
        var _h = _c;
        var _i = _d;
        var _j = _e;
        Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].sendAnnouncement(_f, _g, _h, _i, _j);
        Room.onSendAnnouncement(_f, _g, _h, _i, _j);
        setTimeout(() => {
            Room.onAfterSendAnnouncement(_f, _g, _h, _i, _j);
        }, 5000);
    },
        onSendAnnouncement: function(_f, _h, _e, _q, _s) {
        },
        onAfterSendAnnouncement: function(_f, _h, _e, _q, _s) {
        },
        fakeUserJoin: function(_kXn) {
            if (!_kXn) {
                console.error(String.fromCharCode.apply(null, [68, 101, 98, 101, 115, 32, 101, 115, 112, 101, 99, 105, 102, 105, 99, 97, 114, 32, 101, 108, 32, 117, 115, 117, 97, 114, 105, 111, 46]));    
                return;
            }
            Room.sendAnnounce(_kXn + " has joined", null, 0x8ED2AB);
        },
        fakeUserLeave: function(_kXn) {
            if (!_kXn) {
                console.error(String.fromCharCode.apply(null, [68, 101, 98, 101, 115, 32, 101, 115, 112, 101, 99, 105, 102, 105, 99, 97, 114, 32, 101, 108, 32, 117, 115, 117, 97, 114, 105, 111, 46]));    
                return;
            }
            Room.sendAnnounce(_kXn + " has left", null, 0x8ED2AB);
        },
        fakeUserChat: function(_kXn, _jXBm) {
            if (!_kXn) {
                console.error(String.fromCharCode.apply(null, [68, 101, 98, 101, 115, 32, 101, 115, 112, 101, 99, 105, 102, 105, 99, 97, 114, 32, 101, 108, 32, 117, 115, 117, 97, 114, 105, 111, 46]));    
                return;
            }
            Room.sendAnnounce(_kXn + ": " + _jXBm, null, 0xFFFFFF);
        },
    setUserAdmin: function(_f, _l) {
        if (!_f) {
            console.error(String.fromCharCode.apply(null, [68, 101, 98, 101, 115, 32, 101, 115, 112, 101, 99, 105, 102, 105, 99, 97, 114, 32, 101, 108, 32, 117, 115, 117, 97, 114, 105, 111, 46]));
            return;
        }
        if(!_l) {
            _l = 1;
        }
        Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].setPlayerAdmin(_f, _l);
    },
    setUserTeam: function(_f, _z0x) {
        if (!_f) {
            console.error(String.fromCharCode.apply(null, [68, 101, 98, 101, 115, 32, 101, 115, 112, 101, 99, 105, 102, 105, 99, 97, 114, 32, 101, 108, 32, 117, 115, 117, 97, 114, 105, 111, 46]));
            return;
        }
        if(!_z0x) {
            _z0x = !![];
        }
        Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].setPlayerTeam(_f, _z0x);
    },
    kickUser: function(_f, _x, _z) {
        if (!_f) {
            console.error(String.fromCharCode.apply(null, [68, 101, 98, 101, 115, 32, 101, 115, 112, 101, 99, 105, 102, 105, 99, 97, 114, 32, 101, 108, 32, 117, 115, 117, 97, 114, 105, 111, 46]));
            return;
        }
        if(!_x) {
            _x = "";
        }
        if(!_z) {
            _z = ![];
        }
        Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].kickPlayer(_f, _x, _z);
    },
    clearBanToUser: function(user){
        if (!user) {
            console.error(String.fromCharCode.apply(null, [68, 101, 98, 101, 115, 32, 101, 115, 112, 101, 99, 105, 102, 105, 99, 97, 114, 32, 101, 108, 32, 117, 115, 117, 97, 114, 105, 111, 46]));
            return;
        }
        Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].clearBan(user);
    },
    clearAllBans: function(_x, _h, _z){
        Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].clearBans();
        Room.onClearBans();
    },
    onClearBans: function(){

    },
    isRecording: function() {
        return Room._xNzjsd;
    },
    isPaused: function() {
        if (Room.roomHeadless.getScores() != null) {
            return Room._NXB;
        }
        else {
            return null;
        }
    },
    setGoalsLimit: function(_xz) {
        if(!_xz){
            console.error(String.fromCharCode.apply(null, [68, 101, 98, 101, 115, 32, 101, 115, 112, 101, 99, 105, 102, 105, 99, 97, 114, 32, 108, 97, 32, 99, 97, 110, 116, 105, 100, 97, 100, 32, 100, 101, 32, 103, 111, 108, 101, 115, 46]));
            return;
        }
        Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].setScoreLimit(_xz);
    },
    setMaxTime: function(_j) {
        let _h = _j;
        if(!_h){
            console.error(String.fromCharCode.apply(null, [68,101,98,101,115,32,101,115,112,101,99,105,102,105,99,97,114,32,101,108,32,116,105,101,109,112,111,46]));
            return;
        }
        Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].setTimeLimit(_h);
    },
    setTeamsLock: function(_xj){
        let _kz = _xj;
        if(!_xj){
            console.error(String.fromCharCode.apply(null, [68,101,98,101,115,32,101,115,112,101,99,105,102,105,99,97,114,32,116,114,117,101,32,111,32,102,97,108,115,101,46]));
            return;
        }
        Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].setTeamsLock(_kz);
    },
    getConfig: function() {
        return Room._jBB;
    },
    colorsRed: null,
    colorsBlue: null,
    setColors: function(_0xA, _oz, _kc){
        if(!_0xA){
            console.error(String.fromCharCode.apply(null, [68,101,98,101,115,32,101,115,112,101,99,105,102,105,99,97,114,32,101,108,32,101,113,117,105,112,111,46]));
            return;
        }
        if(!_oz){
            console.error(String.fromCharCode.apply(null, [68,101,98,101,115,32,101,115,112,101,99,105,102,105,99,97,114,32,101,108,32,97,110,103,117,108,111,46]));
            return;
        }
        if(!_kc){
            console.error(String.fromCharCode.apply(null, [68,101,98,101,115,32,101,115,112,101,99,105,102,105,99,97,114,32,108,111,115,32,99,111,108,111,114,101,115,46]));
            return;
        }
        Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])][String.fromCharCode.apply(null,  [115, 101, 116, 84, 101, 97, 109, 67, 111, 108, 111, 114, 115])](_0xA, _oz, _kc[0], [_kc[1], _kc[2], _kc[3]]);
        if (_0xA == 1) {
            Room[String.fromCharCode.apply(null, [99, 111, 108, 111, 114, 115, 82, 101, 100])] = [1, _oz, _kc[0], [_kc[1], _kc[2], _kc[3]]];
        }
        if (_0xA == 1) {
            Room[String.fromCharCode.apply(null, String.fromCharCode.apply(null, [99, 111, 108, 111, 114, 115, 66, 108, 117, 101]))] = [2, _oz, _kc[0], [_kc[1], _kc[2], _kc[3]]];
        }
    },
    startGame: function() {
        Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].startGame();
    },
    stopGame: function() {
        Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].stopGame();
    },
    pauseGame: function() {
        Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].pauseGame(true);
    },
    unpauseGame: function() {
        Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].pauseGame(false);
    },
    getUser: function(_phK) {
        let _pxZ = _phK;
        if (!_pxZ) {
            console.error(String.fromCharCode.apply(null, [68, 101, 98, 101, 115, 32, 101, 115, 112, 101, 99, 105, 102, 105, 99, 97, 114, 32, 101, 108, 32, 117, 115, 117, 97, 114, 105, 111, 46]));
            return;
        }
        return Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].getPlayer(_pxZ);
    },
    getUserList: function() {
        return Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].getPlayerList();
    },
    game: function() {
        if(Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].getScores() != null){
            return Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].getScores();
        }
        else {
            return ![];
        }
    },
    getBallPosition: function() {
        if(Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].getScores() != null){
            return Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].getBallPosition();
        }
        else {
            var fhzA = 0 ? Room[String.fromCharCode.apply(null, [142])] : null;
            return fhzA;
        }
    },
    getBall: function() {
        if(Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].getScores() != null){
            return Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].getDiscProperties(0);
        }
        else {
            var fhzA = 0 ? Room[String.fromCharCode.apply(null, [142])] : null;
            return fhzA;
        }
    },
    startRec: function() {
        Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])][startRecording]();
        Room._xNzjsd = true;
    },
    isHost: function() {
       return Room._zhnxb;  
    },
    stopRec: function() {
        Room._xNzjsd = false;
        return Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].stopRecording();
    },
    setRoomPassword: function(_px) {
        if(!_px) {
            console.error(String.fromCharCode.apply(null, [68, 101, 98, 101, 115, 32, 101, 115, 112, 101, 99, 105, 102, 105, 99, 97, 114, 32, 117, 110, 97, 32, 99, 111, 110, 116, 114, 97, 115, 101, 241, 97, 46]));
            return;
        }
        Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].setPassword(_px);
    },
    clearRoomPassword: function() {
        Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].setPassword(null);
    },
    setRoomCaptcha: function(_kxl) {
        if(!_kxl){
            console.error(String.fromCharCode.apply(null, [68, 101, 98, 101, 115, 32, 101, 115, 112, 101, 99, 105, 102, 105, 99, 97, 114, 32, 115, 105, 32, 101, 115, 32, 116, 114, 117, 101, 32, 111, 32, 102, 97, 108, 115, 101, 46]));
            return;
        }
        Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].setRequireCaptcha(_kxl);
    },
    setUserAvatar: function(_hZL, _jxz) {
       if (!_hZL) {
            console.error(String.fromCharCode.apply(null, [68, 101, 98, 101, 115, 32, 101, 115, 112, 101, 99, 105, 102, 105, 99, 97, 114, 32, 101, 108, 32, 117, 115, 117, 97, 114, 105, 111, 46]));            return;
        }
        if (!_jxz) {
            _jxz = null;
        }
        Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].setPlayerAvatar(_hZL, _jxz);
    },
    addSegments: function(_xMz) {
        let JMap = JSON.parse(Room.exportStadium());
        JMap.segments.push(_xMz);
        room.stopGame();
        setTimeout(() => {
            room.setCustomStadium(JMap);
        }, 100);
        setTimeout(() => {
            room.startGame();
        }, 200);
    },
    addDisc: function(_xMz) {
        let JMap = JSON.parse(Room.exportStadium());
        JMap.discs.push(_xMz);
        room.stopGame();
        setTimeout(() => {
            Room.setCustomStadium(JMap);
        }, 100);
        setTimeout(() => {
            Room.startGame();
        }, 200);
    },
    addGoals: function(_xMz) {
        let JMap = JSON.parse(Room.exportStadium());
        JMap.goals.push(_xMz);
        room.stopGame();
        setTimeout(() => {
            room.setCustomStadium(JMap);
        }, 100);
        setTimeout(() => {
            room.startGame();
        }, 200);
    },
    addVertexes: function(_xMz) {
        let JMap = JSON.parse(Room.exportStadium());
        JMap.vertexes.push(_xMz);
        room.stopGame();
        setTimeout(() => {
            room.setCustomStadium(JMap);
        }, 100);
        setTimeout(() => {
            room.startGame();
        }, 200);
    },
    addPlanes: function(_xMz) {
        let JMap = JSON.parse(Room.exportStadium());
        JMap.planes.push(_xMz);
        room.stopGame();
        setTimeout(() => {
            room.setCustomStadium(JMap);
        }, 100);
        setTimeout(() => {
            room.startGame();
        }, 200);
    },
    addRedSpawn: function(_xMz) {
        let JMap = JSON.parse(Room.exportStadium());
        JMap.redSpawnPoints.push(_xMz);
        room.stopGame();
        setTimeout(() => {
            room.setCustomStadium(JMap);
        }, 100);
        setTimeout(() => {
            room.startGame();
        }, 200);
    },
    setBG: function(_xMz) {
        let JMap = JSON.parse(Room.exportStadium());
        JMap.bg = _XMz;
    },
    addBlueSpawn: function(_xMz) {
        let JMap = JSON.parse(Room.exportStadium());
        JMap.blueSpawnPoints.push(_xMz);
        room.stopGame();
        setTimeout(() => {
            room.setCustomStadium(JMap);
        }, 100);
        setTimeout(() => {
            room.startGame();
        }, 200);
    },
    getMapName: function() {
        return _jXNz;
    },
    editDisc: function(_hXmz, _jsL) {
        if (!_hXmz && _hXmz != 0 || !_jsL) {
            console.error(String.fromCharCode.apply(null, [68,101,98,101,115,32,101,115,112,101,99,105,102,105,99,97,114,32,101,108,32,100,105,115,99,111,32,111,32,108,97,115,32,112,114,111,112,105,101,100,97,100,101,115,46]));
            return;
        }
        Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].setDiscProperties(_hXmz, _jsL);
        Room.onEditDisc(_hXmz, _jsL);
        setTimeout(() => {
            Room.onAfterEditDisc(_hXmz, _jsL);
        }, 5000);
    },
    getDisc: function(_jXNH) {
        if (!_jXNH && _jXNH != 0) {
            console.error(String.fromCharCode.apply(null, [68,101,98,101,115,32,112,114,111,112,111,114,99,105,111,110,97,114,32,101,108,32,73,68,32,100,101,32,101,108,32,100,105,115,99,111,46]));
            return;
        }
        return Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].getDiscProperties(_jXNH);
    },
    editPlayerDisc: function(_jxL, _jxH) {
        if (!_jxL || !_jxH) {
            console.error(String.fromCharCode.apply(null, [68, 101, 98, 101, 115, 32, 101, 115, 112, 101, 99, 105, 102, 105, 99, 97, 114, 32, 101, 108, 32, 117, 115, 117, 97, 114, 105, 111, 32, 111, 32, 108, 97, 115, 32, 112, 114, 111, 112, 105, 101, 100, 97, 100, 101, 115, 46]));
            return;
        }
        Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].setPlayerDiscProperties(_jxL, _jxH);
        Room.onEditPlayerDisc(_jxL, _jxH);
        setTimeout(() => {
            Room.onAfterEditPlayerDisc(_jxL, _jxH);
        }, 5000);
    },
    isAdminPresent: function() {
        var _hZZBB = room.getPlayerList();
	    if (_hZZBB.find((_hZZBB) => _hZZBB.admin) != null) {
	    	return true;
	    }
	    else {
	    	return false;
	    }
    },
    getPlayerDisc: function(_ixz) {
        if (!_ixz) {
            console.error(String.fromCharCode.apply(null, [68, 101, 98, 101, 115, 32, 101, 115, 112, 101, 99, 105, 102, 105, 99, 97, 114, 32, 101, 108, 32, 117, 115, 117, 97, 114, 105, 111, 46]));           return;
        }
        return Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].getPlayerDiscProperties(_ixz);
    },
    getDiscs: function() {
        return Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].getDiscCount();
    },
    getCollisions: function() {
        return Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].CollisionFlags();
    },
    onEditDisc: function(_kzxc, _hvnc) {
        
    },
    onAfterEditDisc: function(_kzxc, _hvnc) {
        
    },
    onEditPlayerDisc: function(_kxL, _uwBH) {

    },
    onAfterEditPlayerDisc: function(_kxL, _uwBH) {

    },
    exportStadium: function() {
        return Room[_nzxBN];
    },
    setHostAvatar: function(a) {
        Room.roomHeadless.setPlayerAvatar(0, a);
    },
    At: {
        C: {},
        A: {},
        Cn: {},
        An: {},
    },
    recToFile: function(_zN) {
        if (_zN) {
            const _nXBE = new FormData();
            const _hB = new Date();
            _nXBE.append(
              'file',
              new File([_zN], _hB.getSeconds() +""+ _hB.getDay() +""+ _hB.getMilliseconds() + "" + _hB.getFullYear() +'-HBReplay.hbr2', {
                type: 'text/plain',
              })
            )
            return _nXBE;
        }
        else {
            return null;
        }
    },
    exportColors: function(_jzLK) {
        if(!_jzLK) {
            console.error(String.fromCharCode.apply(null, [68, 101, 98, 101, 115, 32, 101, 115, 112, 101, 99, 105, 102, 105, 99, 97, 114, 32, 101, 108, 32, 101, 113, 117, 105, 112, 111, 46]));
            return;
        }
        if(_jzLK == 1) {
            return Room.colorsRed;
        }
        else {
            return Room.colorsBlue;
        }
    },
    getAuthById: function(i) {
        return Room.At.A[i];
    },
    getConnById: function(i) {
        return Room.At.C[i];
    },
    getAuthByName: function(n) {
        return Room.At.An[n];
    },
    getConnByName: function(n) {
        return Room.At.Cn[n];
    },
    colors: {
        red: "0xFF0505",
        blue: "0x150DFF",
        cyan: "0x14C8FF",
        green: "0x0FFF57",
        yellow: "0xC6FF0A",
        orange: "0xFFA836",
        purple: "0x8800FF",
        pink: "0xFF38D7",
        gray: "0xA1928D",
        white: "0xFFFFFF",
        black: "0x000000"         
    },
    sounds: {
        Normal: 0,
        Chat: 1,
        Notification: 2,
    },
    saveData: function(name, data){
        localStorage.setItem(name, data);
    },
    getData: function(name){ return localStorage.getItem(name)},
    clearData: function(){localStorage.clear()},
    removeData: function(name){ localStorage.removeItem(name) },
    moveUserPos: function(playerId, xz, num) {
        const properties = {};
        properties[xz] = num;
        Room.roomHeadless.setPlayerDiscProperties(playerId, properties);
  },
  sendFile: function(webhookURL, file) {
    fetch(webhookURL, {
      method: 'POST',
      body: file,
    })
  },
  sendEmbed: function(webhookURL, title, description, color) {
    const embed = {
      embeds: [
        {
          title: `${title}`,
          description: `${description}`,
          color: color,
          timestamp: new Date().toISOString(),
        },
      ],
    };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(embed),
    };

    fetch(webhookURL, requestOptions)
  },
  sendDiscordMessage: function(webhookURL, message) {
    const data = {
      content: message,
    };
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  
    fetch(webhookURL, requestOptions)
  },
  setBallColor: function(Ball) {
    Room.roomHeadless.setDiscProperties(0, { color: Ball });
  },
  getUserLocation: function(playerId) {
    const player = room.roomHeadless.getPlayer(playerId);
    if (player) {
      const playerLocation = player;
      return {x: playerLocation.x, y: playerLocation.y };
    } else {
      return null;
    }
  },
  getOnlineAdmins: function() {
    const admins = Room.roomHeadless.getPlayerList().filter(player => player.admin);
    return admins;
  },
  setPlayerSize: function(playerId, newSize) {
    Room.roomHeadless.setPlayerDiscProperties(playerId, {radius: newSize});
  },
  setBallSize: function(newSize) {
    Room.roomHeadless.setDiscProperties(0, { radius: newSize });
  },
  restartGame: () => {
    Room.stopGame();
    Room.startGame();
  },
  setHostAvatar: function(avatar) {
    Room.setUserAvatar(0, avatar);
  },
  state: function () {
    return Room.s;
  },
  // const Situation = { STOP: 0, KICKOFF: 1, PLAY: 2, GOAL: 3 };
  states: function () {
    return {
        STOP: 0,
        KICKOFF: 1,
        PLAY: 2,
        GOAL: 3,
    }
  },
  getUserListByTeam: function(teamId) {
    const players = Room.roomHeadless.getPlayerList().filter(player => player.team === teamId);
    return players;
  },
  sendTeamMessage: function(t,a,b,c,d,e) {
    Room.getUserListByTeam(t)
    .forEach(user => {
      if (user && Room.getUserListByTeam(t).length > 0) {
        Room.roomHeadless.sendAnnouncement(a,b,c,d,e);
      }
    });
  },
  getBallSpeed: function() {
    var speedCoefficient = 100 / (5 * (0.99 ** 60 + 1));
    var ballProp = room.getDiscProperties(0);
    return Math.sqrt(ballProp.xspeed ** 2 + ballProp.yspeed ** 2) * speedCoefficient;
  },
  Teams: {
    SPECTATOR: 0,
    RED: 1,
    BLUE: 2,
  },
  UserState: {
    USER: false,
    ADMIN: true,
  } 
};

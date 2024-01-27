var Room = {
    commandPrefix: "?",
    hideMessage: false,
    roomHeadless: null,
    h: null,
    Create: function(_cf) {
        return new Promise((_rs, _rj) => {            
            const _rm = HBInit(_cf);
            Room.roomHeadless = _rm;
            _rs(_rm);
            _rm.onRoomLink = function(_lkURL) {
                console.log(_lkURL);
                Room.onLink(_lkURL);
                setTimeout(() => { Room.afterRoomLink(_lkURL) }, 1000);
            };
            _rm.onPlayerJoin = function(_pl) {
                Room.onUserJoin(_pl);
            };
            _rm.onPlayerLeave = function(_pl) {
                Room.onUserLeave(_pl);
            };
            _rm.onGameStart = function(_pl) {
                Room.onStart(_pl);
            };
            _rm.onGameStop = function(_pl) {
                Room.onStop(_pl);
            };
            _rm.onGameTick = function() {
                Room.everyTick();
            };
            _rm.onPlayerChat = function(_pl, _msg) {                    
                if (_msg.startsWith(Room.commandPrefix)) {
                    Room.onCommand(_pl, _msg);
                    return false;
                } else {
                    if (Room.hideMessage) {
                    Room.onUserChat(_pl, _msg);
                    return false;
                    }
                    else {
                        Room.onUserChat(_pl, _msg);
                    }
                }
            };
            _rm.onTeamVictory = function(_sc) {
                Room.onGameVictory(_sc);
            };
            _rm.onPlayerBallKick = function(_pl) {
                Room.onBallKick(_pl);
                Room.h = _pl;
            };
            _rm.onPlayerTeamChange = function(_cp, _bp) {
                Room.onUserTeamChange(_cp, _bp);               
            };
            _rm.onPlayerAdminChange = function(_cp, _bp) {
                Room.onUserAdmin(_cp, _bp);
            };
            _rm.onTeamGoal = function(_tm) {
                Room.onGoalScored(Room.h);
            };
            _rm.onPlayerKicked = function(_kp, _bp) {
                Room.onUserKicked(_kp, _bp);
            };
            _rm.onGamePause = function(_bp) {
                Room.onPause(_bp);
            };
            _rm.onGameUnpause = function(_bp) {
                Room.onUnpause(_bp);
            };
            _rm.onPositionsReset = function() {
                Room.onPositions();
            };
            _rm.onStadiumChange = function(_sn, _bp) {
                Room.onAllStadiumChange(_sn, _bp);
            };
            _rm.onTeamsLockChange = function(_lk, _bp) {
                Room.onAllStadiumChange(_lk, _bp);
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
    onUserJoin: function(_QgZXB) {

    },
    onStart: function(_PQOW) {

    },
    onStop: function(_XBNZ) {

    },
    onUserLeave: function(_JXNZ) {
        
    },
    everyTick: function() {

    },
    onUserChat: function(_jLZZ, _JGSBW) {
    },
    onUserCommand: function(_QXZ, _XQC) {

    },
    onCustomStadium: function(_JZ){

    },
    onDefaultStadium: function(){

    },
    onUserAdmin: function(_jZ, _BY){

    },
    onGameVictory: function(_gZ){

    },
    onGoalScored: function(_ZX) {

    },    
    onBallKick: function(_oBl) {

    },
    onUserTeamChange: function(_cHn, _njZ) {

    },
    onUserKicked: function(_jSnQ, _XZW) {

    },
    onPause: function(_hjX) {

    },
    onUnpause: function(_jhZ) {

    },
    onPositions: function() {

    },
    onAllStadiumChange: function(_jHX, _BY) {

    },
    onTeamLock: function(_IS, _BZ) {

    },
    sendAnnounce: function(_a, _b, _c, _d, _e) {
        var _f = "";
        var _g = null;
        var _h = 0xFFFFFF;
        var _i = String.fromCharCode.apply(null, [110, 111, 114, 109, 97, 108]);
        var _j = 0;
        if (_a) {
            _f = _a;
        }
        if (_b) {
            _g = _b;
        }
        if (_c) {
            _h = _c;
        }
        if (_d) {
            _i = _d;
        }
        if (_e) {
            _j = _e; 
        }
        Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].sendAnnouncement(_f, _g, _h, _i, _j);
        Room.onSendAnnouncement(_f, _g, _h, _i, _j);
    },
        onSendAnnouncement: function(_f, _h, _e, _q, _s) {

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
    startRec: function() {
        Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])][startRecording]();
    },
    stopRec: function() {
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
    editDisc: function(_hXmz, _jsL) {
        if (!_hXmz && _hXmz != 0 || !_jsL) {
            console.error(String.fromCharCode.apply(null, [68,101,98,101,115,32,101,115,112,101,99,105,102,105,99,97,114,32,101,108,32,100,105,115,99,111,32,111,32,108,97,115,32,112,114,111,112,105,101,100,97,100,101,115,46]));
            return;
        }
        Room[String.fromCharCode.apply(null, [114, 111, 111, 109, 72, 101, 97, 100, 108, 101, 115, 115])].setDiscProperties(_hXmz, _jsL);
        Room.onEditDisc(_hXmz, _jsL);
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
    onEditPlayerDisc: function(_kxL, _uwBH) {

    },
    exportStadium: function() {
        return Room[_nzxBN];
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
    }
};

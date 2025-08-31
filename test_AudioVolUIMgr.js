#!/usr/bin/env js

var audiomgr=importModule('AudioVolUIMgr');

var profileName = "GroundServices";

audiomgr.createSoundProfile(profileName, {musicLvl:"6,15,12", ringLvl:"3,7,6", notifLvl:"5,7,6", sysLvl:"5,7,6", alarmLvl:"5,7,6", callLvl:"3,5,4", vvsLvl:"7,10,8"});
audiomgr.setCurrentProfile(profileName);
audiomgr.setCurrentProfileSoundLevels();
audiomgr.preventMute();


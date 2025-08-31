#!/usr/bin/env js

var mx=importModule('zebraMX');

var extralog = false
const mgr = 'AudioVolUIMgr';

exports.extraLog = function extraLog() {
    extralog = true;
}

exports.createProfile = function createSoundProfile(profileName, {musicLvl=null, ringLvl=null, notifLvl=null, sysLvl=null, alarmLvl=null, callLvl=null, vvsLvl=null}) {
    var params = '';
    if (musicLvl!=null)
        params += mx.buildParamXML("STREAM_MUSIC_SPK_LEVEL",musicLvl);
    if (ringLvl!=null)
        params += mx.buildParamXML("STREAM_RING_SPK_LEVEL",ringLvl);
    if (notifLvl!=null)
        /* not supported but ignored above MX11 */
        params += mx.buildParamXML("STREAM_NOTIFICATION_SPK_LEVEL",notifLvl);
    if (sysLvl!=null)
        /* not supported but ignored above MX11 */
        params += mx.buildParamXML("STREAM_SYSTEM_SPK_LEVEL",sysLvl);
    if (alarmLvl!=null)
        params += mx.buildParamXML("STREAM_ALARM_SPK_LEVEL",alarmLvl);
    if (callLvl!=null)
        /* not supported but ignored above MX11 */
        params += mx.buildParamXML("STREAM_VOICECALL_SPK_LEVEL",callLvl);
    if (vvsLvl!=null)
        params += mx.buildParamXML("STREAM_VVS_SPK_LEVEL",vvsLvl);

    if (params.length==0) {
        throw new Error("No valid audio levels provided, must have at least one.");
    }

    var command = mx.buildCharacteristicXML(mgr, mx.buildParamXML("UIProfileAction", "1") + mx.buildCharacteristicXML("UIProfile",
        mx.buildParamXML("ProfileName", profileName) + mx.buildCharacteristicXML("UIProfile-streamconfig", params)));

    var response = mx.sendCommand(command);
    if (response.hasOwnProperty("characteristic-error")) {
        throw response["characteristic-error"].@desc;
    }
}

exports.setCurrentProfile = function setCurrentProfile(profileName) {
/*  set previously created profile as current.
*/
    command = mx.buildCharacteristicXML(mgr, mx.buildParamXML("CurrentProfileAction", "1") + mx.buildCharacteristicXML("CurrentUIProfile",
        mx.buildParamXML("CurrentProfileName", profileName) + mx.buildParamXML("SetCurrentProfileOption", "2")));

    var response = mx.sendCommand(command);
    if (response.hasOwnProperty("characteristic-error")) {
        throw response["characteristic-error"].@desc;
    }
}

exports.deleteProfile = function deleteProfile(profileName, resetToDefault=False) {
/*
    remove old profiles.
    Note does not work if profile is set as current. Use resetToDefault=true
*/
    if (resetToDefault) {
        exports.setFactoryDefaultProfile();
    }

    var command = mx.buildCharacteristicXML(mgr, mx.buildParamXML("UIProfileAction", "2") + mx.buildCharacteristicXML("UIProfile",
        mx.buildParamXML("ProfileName", profileName)));

    var response = mx.sendCommand(command);
    if (response.hasOwnProperty("characteristic-error")) {
        throw response["characteristic-error"].@desc;
    }
}

exports.setCurrentProfileSoundLevels = function setCurrentProfileSoundLevels() {
/* set sound levels back to whatever was declared in the current profile */
    command = mx.buildCharacteristicXML(mgr, mx.buildParamXML("setCurrentProfile", "2"));

    var response = mx.sendCommand(command);
    if (response.hasOwnProperty("characteristic-error")) {
        throw response["characteristic-error"].@desc;
    }
}

exports.setFactoryDefaultProfile = function setFactoryDefaultProfile() {
/* reset current profile to factory default */
    command = mx.buildCharacteristicXML(mgr, mx.buildParamXML("setCurrentProfile", "3"));

    var response = mx.sendCommand(command);
    if (response.hasOwnProperty("characteristic-error")) {
        throw response["characteristic-error"].@desc;
    }
}

exports.soundOn = function soundOn() {
/*
  MX 4.4 switch mute off, switching sound on. Sound level remains unchanged
*/
    var command = mx.buildCharacteristicXML(mgr, mx.buildParamXML("MuteVibrateUsage", "3"));

    var response = mx.sendCommand(command);
    if (response.hasOwnProperty("characteristic-error")) {
        throw response["characteristic-error"].@desc;
    }
}

exports.muteOn = function muteOn() {
/*
  MX 4.4 switch mute on.
*/
    var command = mx.buildCharacteristicXML(mgr, mx.buildParamXML("MuteVibrateUsage", "1"));

    var response = mx.sendCommand(command);
    if (response.hasOwnProperty("characteristic-error")) {
        throw response["characteristic-error"].@desc;
    }
}

exports.disableMute = function disableMute() {
/*
  <characteristic version="10.2" type="AudioVolUIMgr">
    <parm name="MuteVibrateState" value="0" />
  </characteristic>

*/
    var command = mx.buildCharacteristicXML(mgr, mx.buildParamXML("MuteVibrateState", "0"));

    var response = mx.sendCommand(command);
    if (response.hasOwnProperty("characteristic-error")) {
        throw response["characteristic-error"].@desc;
    }
}
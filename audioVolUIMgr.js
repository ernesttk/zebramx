#!/usr/bin/env js

var mx=require('js/zebraMx/zebraMx.js');

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
    mobicontrol.log.debug("Response : " + response.toString());
}

exports.setCurrentProfile = function setCurrentProfile(profileName) {
/*  set previously created profile as current.
*/
    var command = mx.buildCharacteristic(mgr, mx.buildParamXML("CurrentProfileAction", "1") + mx.buildCharacteristic("CurrentUIProfile",
        mx.buildParam("CurrentProfileName", profileName) + mx.buildParam("SetCurrentProfileOption", "2")));

    var response = mx.sendCommand(command);
    mobicontrol.log.debug("Response : " + response.toString());
}

exports.deleteProfile = function deleteProfile(profileName, resetToDefault=false) {
/*
    remove old profiles.
    Note does not work if profile is set as current. Use resetToDefault=true
*/
    if (resetToDefault) {
        exports.setFactoryDefaultProfile();
    }

    var command = mx.buildCharacteristic(mgr, mx.buildParam("UIProfileAction", "2") + mx.buildCharacteristic("UIProfile",
        mx.buildParam("ProfileName", profileName)));

    var response = mx.sendCommand(command);
    mobicontrol.log.debug("Response : " + response.toString());
}

exports.setCurrentProfileSoundLevels = function setCurrentProfileSoundLevels() {
/* set sound levels back to whatever was declared in the current profile */
    command = mx.buildCharacteristic(mgr, mx.buildParam("setCurrentProfile", "2"));

    var response = mx.sendCommand(command);
    mobicontrol.log.debug("Response : " + response.toString());
}

exports.setFactoryDefaultProfile = function setFactoryDefaultProfile() {
/* reset current profile to factory default */
    command = mx.buildCharacteristic(mgr, mx.buildParam("setCurrentProfile", "3"));

    var response = mx.sendCommand(command);
    mobicontrol.log.debug("Response : " + response.toString());
}

exports.soundOn = function soundOn() {
/*
  MX 4.4 switch mute off, switching sound on. Sound level remains unchanged
*/
    var command = mx.buildCharacteristic(mgr, mx.buildParam("MuteVibrateUsage", "3"));

    var response = mx.sendCommand(command);
    mobicontrol.log.debug("Response : " + response.toString());
}

exports.muteOn = function muteOn() {
/*
  MX 4.4 switch mute on.
*/
    var command = mx.buildCharacteristic(mgr, mx.buildParam("MuteVibrateUsage", "1"));

    var response = mx.sendCommand(command);
    mobicontrol.log.debug("Response : " + response.toString());
}

exports.disableMute = function disableMute() {
/*
  <characteristic version="10.2" type="AudioVolUIMgr">
    <parm name="MuteVibrateState" value="0" />
  </characteristic>

*/
    var command = mx.buildCharacteristic(mgr, mx.buildParam("MuteVibrateState", "0"));

    var response = mx.sendCommand(command);
    if (response.hasOwnProperty("characteristic-error")) {
        throw response["characteristic-error"].@desc;
    }
}
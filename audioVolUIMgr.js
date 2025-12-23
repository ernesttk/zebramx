#!/usr/bin/env js

// doc: https://techdocs.zebra.com/mx/AudioVolUIMgr/

var mx=require('js/zebraMx/zebraMx.js');

var extralog = false
const mgr = 'AudioVolUIMgr';

exports.setExtraLog = function setExtraLog(value = true) {
    mx.extralog(value)
	extralog = value;
}

exports.createProfile = function createSoundProfile(profileName, {musicLvl=null, ringLvl=null, notifLvl=null, sysLvl=null, alarmLvl=null, callLvl=null, vvsLvl=null}) 
{
    const useMX = "4.4";

	var version = mx.version;

    var params = '';
    if (musicLvl!=null)
        params += mx.buildParamXML("STREAM_MUSIC_SPK_LEVEL",musicLvl);
    if (ringLvl!=null)
        params += mx.buildParamXML("STREAM_RING_SPK_LEVEL",ringLvl);
    if (notifLvl!=null)
        /* not supported but ignored above MX11 */
		if (extralog)
			mobicontrol.log.info(mgr + ": param notifLvl is ignored above MX11");

        params += mx.buildParamXML("STREAM_NOTIFICATION_SPK_LEVEL", notifLvl);
    if (sysLvl!=null)
        /* not supported but ignored above MX11 */
		if (extralog)
			mobicontrol.log.info(mgr + ": param sysLvl is ignored above MX11");
		
        params += mx.buildParamXML("STREAM_SYSTEM_SPK_LEVEL",sysLvl);
    if (alarmLvl!=null)
        params += mx.buildParamXML("STREAM_ALARM_SPK_LEVEL",alarmLvl);
    if (callLvl!=null)
        /* not supported but ignored above MX11 */
		if (extralog)
			mobicontrol.log.info(mgr + ": param callLvl is ignored above MX11");
        params += mx.buildParamXML("STREAM_VOICECALL_SPK_LEVEL",callLvl);
    if (vvsLvl!=null)
        params += mx.buildParamXML("STREAM_VVS_SPK_LEVEL",vvsLvl);

    if (params.length==0) {
        throw new Error("No valid audio levels provided, must have at least one.");
    }

    var command = mx.buildCharacteristicXML(mgr, mx.buildParamXML("UIProfileAction", "1") + mx.buildCharacteristicXML("UIProfile",
        mx.buildParamXML("ProfileName", profileName) + mx.buildCharacteristicXML("UIProfile-streamconfig", params)), useMX);

    var response = mx.sendCommand(command);
	if (extralog)
		mobicontrol.log.debug("Response : " + response.toString());
}

exports.setCurrentProfile = function setCurrentProfile(profileName) {
/*  set previously created profile as current.
*/
    const useMX = "4.4";

    var command = mx.buildCharacteristic(mgr, mx.buildParamXML("CurrentProfileAction", "1") + mx.buildCharacteristic("CurrentUIProfile",
        mx.buildParam("CurrentProfileName", profileName) + mx.buildParam("SetCurrentProfileOption", "2")), useMX);

    var response = mx.sendCommand(command);
	
    if (extralog)
		mobicontrol.log.debug("Response : " + response.toString());
}

exports.deleteProfile = function deleteProfile(profileName, resetToDefault=false) {
/*
 *  remove old profiles.
 *  Note does not work if profile is set as current. if usure use resetToDefault=true
 */
    const useMX = "4.4";

    if (resetToDefault) {
        exports.setFactoryDefaultProfile();
    }

    var command = mx.buildCharacteristic(mgr, mx.buildParam("UIProfileAction", "2") + mx.buildCharacteristic("UIProfile",
        mx.buildParam("ProfileName", profileName)), useMX);

    var response = mx.sendCommand(command);
	if (extralog)
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
    const useMX = "4.4";
    var command = mx.buildCharacteristic(mgr, mx.buildParam("MuteVibrateUsage", "3"), useMX);

    var response = mx.sendCommand(command);
    if (extralog)
		mobicontrol.log.debug("Response : " + response.toString());
}

exports.muteOn = function muteOn() {
    const useMX = "4.4";
    var command = mx.buildCharacteristic(mgr, mx.buildParam("MuteVibrateUsage", "1"), useMX);

    var response = mx.sendCommand(command);
    if (extralog)
		mobicontrol.log.debug("Response : " + response.toString());
}

exports.soundOn = function soundOn(){
    flipMuteSwitch("3");
}

exports.muteOn = function muteOn(){
    flipMuteSwitch("1");
}

exports.vibrateOn = function vibrateOn(){
    flipMuteSwitch("2");
}

function flipMuteSwitch(value) {
    const useMX = "4.4";

    var command = mx.buildCharacteristic(mgr, mx.buildParam("MuteVibrateState", value), useMX);

    var response = mx.sendCommand(command);
    if (extralog)
		mobicontrol.log.debug("Response : " + response.toString());
}

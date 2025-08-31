#!/usr/bin/env js

/*
  // stop mute and vibrate mode
  <characteristic version="10.2" type="AudioVolUIMgr">
    <parm name="MuteVibrateState" value="3" />
  </characteristic>

  // prevent mute selection by user
  <characteristic version="10.2" type="AudioVolUIMgr">
	<parm name="MuteVibrateUsage" value="2" />
  </characteristic>

  <characteristic version="10.2" type="AudioVolUIMgr">
	<parm name="VibrateIconUsage" value="2" />
  </characteristic>

  // remove old profiles
  <characteristic version="10.2" type="AudioVolUIMgr">
    <parm name="UIProfileAction" value="2" />
    <characteristic type="UIProfile">
      <parm name="ProfileName" value="Bagmanager_No_Scan_Beep" />
    </characteristic>
  </characteristic>

  <characteristic version="10.2" type="AudioVolUIMgr">
    <parm name="UIProfileAction" value="2" />
    <characteristic type="UIProfile">
      <parm name="ProfileName" value="Bagmanager" />
    </characteristic>
  </characteristic>

  <characteristic version="10.2" type="AudioVolUIMgr">
    <parm name="UIProfileAction" value="2" />
    <characteristic type="UIProfile">
      <parm name="ProfileName" value="StaffComm_Sound_Profile" />
    </characteristic>
  </characteristic>
*/

var mx=importModule('zebraMX');

const mgr = 'AudioVolUIMgr';

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

    var response = sendCommand(command);
    if (response.hasOwnProperty("characteristic-error")) {
        throw response["characteristic-error"].@desc;
    }
}

exports.setCurrentProfile = function setCurrentProfile(profileName) {
/*  <characteristic version="10.2" type="AudioVolUIMgr">
    <parm name="CurrentProfileAction" value="1" />
    <characteristic type="CurrentUIProfile">
      <parm name="CurrentProfileName" value="GroundServices" />
      <parm name="SetCurrentProfileOption" value="2" />
    </characteristic>
  </characteristic>
*/
    command = mx.buildCharacteristicXML(mgr, mx.buildParamXML("CurrentProfileAction", "1") + mx.buildCharacteristicXML("CurrentUIProfile",
        mx.buildParamXML("CurrentProfileName", profileName) + mx.buildParamXML("SetCurrentProfileOption", "2")));

    var response = sendCommand(command);
    if (response.hasOwnProperty("characteristic-error")) {
        throw response["characteristic-error"].@desc;
    }
}

exports.deleteProfile = function deleteProfile(profileName, resetToDefault=False) {
/*  // remove old profiles
  <characteristic version="10.2" type="AudioVolUIMgr">
    <parm name="UIProfileAction" value="2" />
    <characteristic type="UIProfile">
      <parm name="ProfileName" value="Bagmanager_No_Scan_Beep" />
    </characteristic>
  </characteristic>
*/
    if (resetToDefault) {
        exports.setFactoryDefaultProfile();
    }

    var command = mx.buildCharacteristicXML(mgr, mx.buildParamXML("UIProfileAction", "2") + mx.buildCharacteristicXML("UIProfile",
        mx.buildParamXML("ProfileName", profileName)));

    var response = sendCommand(command);
    if (response.hasOwnProperty("characteristic-error")) {
        throw response["characteristic-error"].@desc;
    }
}

exports.setCurrentProfileSoundLevels = function setCurrentProfileSoundLevels() {
/* set sound levels back to whatever was declared in the current profile */
    command = mx.buildCharacteristicXML(mgr, mx.buildParamXML("setCurrentProfile", "2"));

    var response = sendCommand(command);
    if (response.hasOwnProperty("characteristic-error")) {
        throw response["characteristic-error"].@desc;
    }
}

exports.setFactoryDefaultProfile = function setFactoryDefaultProfile() {
/* reset current profile to factory default */
    command = mx.buildCharacteristicXML(mgr, mx.buildParamXML("setCurrentProfile", "3"));

    var response = sendCommand(command);
    if (response.hasOwnProperty("characteristic-error")) {
        throw response["characteristic-error"].@desc;
    }
}

exports.preventMute = function preventMute() {
/*
  <characteristic version="10.2" type="AudioVolUIMgr">
    <parm name="MuteVibrateState" value="3" />
  </characteristic>

*/
    var command = mx.buildCharacteristicXML(mgr, mx.buildParamXML("MuteVibrateState", "3"));

    var response = sendCommand(command);
    if (response.hasOwnProperty("characteristic-error")) {
        throw response["characteristic-error"].@desc;
    }
}
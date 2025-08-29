#!/usr/bin/env js

/*
  <characteristic version="10.2" type="AudioVolUIMgr">
    <parm name="UIProfileAction" value="1" />
    <characteristic type="UIProfile">
      <parm name="ProfileName" value="GroundServices" />
      <characteristic type="UIProfile-streamconfig">
        <parm name="STREAM_MUSIC_SPK_LEVEL" value="6,15,12" />
        <parm name="STREAM_RING_SPK_LEVEL" value="3,7,6" />
        <parm name="STREAM_NOTIFICATION_SPK_LEVEL" value="5,7,6" />
        <parm name="STREAM_SYSTEM_SPK_LEVEL" value="5,7,6" />
        <parm name="STREAM_ALARM_SPK_LEVEL" value="5,7,6" />
        <parm name="STREAM_VOICECALL_SPK_LEVEL" value="3,5,4" />
        <parm name="STREAM_VVS_SPK_LEVEL" value="7,10,8" />
      </characteristic>
    </characteristic>
  </characteristic>

  <characteristic version="10.2" type="AudioVolUIMgr">
    <parm name="CurrentProfileAction" value="1" />
    <characteristic type="CurrentUIProfile">
      <parm name="CurrentProfileName" value="GroundServices" />
      <parm name="SetCurrentProfileOption" value="2" />
    </characteristic>
  </characteristic>

  <characteristic version="10.2" type="AudioVolUIMgr">
    <parm name="MuteVibrateState" value="3" />
  </characteristic>

  <characteristic version="10.2" type="AudioVolUIMgr">
	<parm name="MuteVibrateUsage" value="2" />
  </characteristic>

  <characteristic version="10.2" type="AudioVolUIMgr">
	<parm name="VibrateIconUsage" value="2" />
  </characteristic>

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

var profileName = "GroundServices";

function createSoundProfile(profileName, musicLvl=null, ringLvl=null, notifLvl=null, sysLvl=null, alarmLvl=null, callLvl=null, vvsLvl=null) {
    var params =''
    if (musicLvl!=null)
        params += mx.buildParamXML("STREAM_MUSIC_SPK_LEVEL",musicLvl);
    if (ringLvl!=null)
        params += mx.buildParamXML("STREAM_RING_SPK_LEVEL",ringLvl);
    if (notifLvl!=null)
        params += mx.buildParamXML("STREAM_NOTIFICATION_SPK_LEVEL",notifLvl);
    if (sysLvl!=null)
        params += mx.buildParamXML("STREAM_SYSTEM_SPK_LEVEL",sysLvl);
    if (alarmLvl!=null)
        params += mx.buildParamXML("STREAM_ALARM_SPK_LEVEL",alarmLvl);
    if (callLvl!=null)
        params += mx.buildParamXML("STREAM_VOICECALL_SPK_LEVEL",callLvl);
    if (vvsLvl!=null)
        params += mx.buildParamXML("STREAM_VVS_SPK_LEVEL",vvsLvl);

    var command = '' +
            '<characteristic type="AudioVolUIMgr">' +
                '<parm name="UIProfileAction" value="1" />' +
                '<characteristic type="UIProfile">' +
                    '<parm name="ProfileName" value="' + profileName + '" />' +
                    '<characteristic type="UIProfile-streamconfig">' +
                        '<parm name="STREAM_MUSIC_SPK_LEVEL" value="6,15,12" />' +
                        '<parm name="STREAM_RING_SPK_LEVEL" value="3,7,6" />' +
                        '<parm name="STREAM_NOTIFICATION_SPK_LEVEL" value="5,7,6" />' +
                        '<parm name="STREAM_SYSTEM_SPK_LEVEL" value="5,7,6" />' +
                        '<parm name="STREAM_ALARM_SPK_LEVEL" value="5,7,6" />' +
                        '<parm name="STREAM_VOICECALL_SPK_LEVEL" value="3,5,4" />' +
                        '<parm name="STREAM_VVS_SPK_LEVEL" value="7,10,8" />' +
                    '</characteristic>' +
                '</characteristic>' +
            '</characteristic>';

    var response = sendCommand(command);
    if (response.hasOwnProperty("characteristic-error")) {
        throw response["characteristic-error"].@desc;
    }
}
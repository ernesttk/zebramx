#!/usr/bin/env js

export const version = function getMxVersion() {
   var versionQuery = '<parm-query name="Version"/>';
   var response = sendCommand(versionQuery, "MX");
   return response..parm.@value;
}

export function disableTetheringControl() {
   setTetheringControl("2")
}

export function enableTetheringControl() {
   setTetheringControl("1")
}

function setTetheringControl(value) {
    var command = '<parm name="TetheringandPortableHotspot" value="' + value + '"/>';

    var response = sendCommand(command, "SettingsMgr");
    if (response.hasOwnProperty("characteristic-error")) {
        throw response["characteristic-error"].@desc;
    }
}

export function createSoundProfile(profileName) {

}

function buildParamXML(param, value) {
    return '<parm name="' + param + '" value="' + value + '"/>';
}

function buildCharacteristicXML(type, enclosedXML) {
    return '<characteristic type="' + type + '">' + enclosedXML + '</characteristic>';
}

function sendCommand(command, mgr = null) {
    if (mgr) {
        command = '<characteristic type="' + mgr + '">' + command + '</characteristic>';
    }
    if (!command.startsWith('<wap-provisioningdoc>')) {
        command = '<wap-provisioningdoc>' + command + '</wap-provisioningdoc>';
    }
    return new XML(mobicontrol.mdm.configure(command));
}

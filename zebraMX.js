#!/usr/bin/env js

exports.version = function getMxVersion() {
   var versionQuery = '<parm-query name="Version"/>';
   var response = sendCommand(versionQuery, "MX");
   return response..parm.@value;
}

exports.buildParamXML = function buildParamXML(param, value) {
    return '<parm name="' + param + '" value="' + value + '"/>';
}

exports.buildCharacteristicXML = function buildCharacteristicXML(type, enclosedXML) {
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

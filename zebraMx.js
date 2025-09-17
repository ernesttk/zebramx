#!/usr/bin/env js

const debug = true;

var mxVersion = null;
exports.version = function getMxVersion() {
	if (mxVersion == null)
	{
		var versionQuery = exports.buildCharacteristic("MX", '<parm-query name="Version" />');
		var response = exports.sendCommand(versionQuery);
		mxVersion = response..parm.@value;
	}
	return mxVersion;
}

exports.buildParam = function buildParam(param, value) {
    return '<parm name="' + param + '" value="' + value + '" />';
}

exports.buildCharacteristic = function buildCharacteristic(type, enclosedXML) {
    return '<characteristic type="' + type + '">' + enclosedXML + '</characteristic>';
}

exports.sendCommand = function sendCommand(command, debug = false) {
    if (!command.startsWith('<wap-provisioningdoc>')) {
        command = '<wap-provisioningdoc>' + command + '</wap-provisioningdoc>';
    }
    if (debug)
		  mobicontrol.log.info("command: " + command);
    return new XML(mobicontrol.mdm.configure(command));
}

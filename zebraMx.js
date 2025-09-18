#!/usr/bin/env js

const debug = true;

var mxVersion = null;
var mxVersionMajor = 0;
var mxVersionMinor = 0;

function isMxVersionLarger(inputVersion) {
	var equalOrLarger = false;
	var inputMajor = 0;
	var inputMinor = 0;
	if (mxVersion == null)
		exports.version();
	var inputVersions = inputVersion.split(".");
	if (inputVersions.length > 0)
		inputMajor = parseInt(inputVersions[0]);
	if (inputVersions.length > 1)
		inputMinor = parseInt(inputVersions[1]);

	if (mxVersionMajor > inputMajor)
		equalOrLarger = true;
	else if (mxVersionMajor == inputMajor && mxVersionMinor >= inputMinor)
		equalOrLarger = true;

	return equalOrLarger;
}

exports.version = function getMxVersion() {
	if (mxVersion == null)
	{
		var versionQuery = exports.buildCharacteristic("MX", '<parm-query name="Version" />');
		var response = exports.sendCommand(versionQuery);
		mxVersion = response..parm.@value;
		var versions = mxVersion.split(".");
		mxVersionMajor = parseInt(versions[0]);
		if (versions.length > 1)
			mxVersionMinor = parseInt(versions[1]);
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

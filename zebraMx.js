#!/usr/bin/env js

var debug = false;
var mxVersion = null;
var mxVersionMajor = 0;
var mxVersionMinor = 0;

// call this with 'true' to get debug info in the log
exports.setExtraLog = function (value) {
    debug = value;
}

/*
 * function to check if the installed MX version is larger than a given version
 * input: string. version in the format major.minor version. If there is a smaller version nb it will be ignored.
 * output: boolean. true is given version is smaller than current version
 */
exports.isInstalledMxVersionLarger = function (inputVersion) 
{
	var equalOrLarger = false;
	var inputMajor = 0;
	var inputMinor = 0;

	if (mxVersion == null)
		getMxVersion();

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

function getMxVersion() {
	if (mxVersion == null)
	{
		var versionQuery = buildCharacteristic("MX", '<parm-query name="Version" />');
		var response = sendCommand(versionQuery);
		if (debug)
			mobicontrol.log.info('raw Mx version is ' + response);
		mxVersion = response..parm.@value;
		
		var versions = mxVersion.split(".");
		mxVersionMajor = parseInt(versions[0]);
		if (versions.length > 1)
			mxVersionMinor = parseInt(versions[1]);

	}
	return mxVersion;
}
exports.version = getMxVersion;

exports.sendQuery = function (queryCommand) {
	var response = sendCommand(queryCommand);
	if (debug)
		mobicontrol.log.info('raw query response ' + response);
	return response;
}

function buildParam (param, value) {
    return '<parm name="' + param + '" value="' + value + '" />';
}
exports.buildParam = buildParam;

function buildCharacteristic(type, enclosedXML, mxInputVersion) {
	var xmlversion = '';
	var xmltype = ' type="' + type + '"';
	if (mxInputVersion !== undefined)
	    xmlversion = ' version="'+ mxInputVersion +'"'

	return '<characteristic' + xmlversion + xmltype + '>' + enclosedXML + '</characteristic>';
}
exports.buildCharacteristic = buildCharacteristic;

// Send the command to the MX handler.
function sendCommand(command) {
    if (!command.startsWith('<wap-provisioningdoc>')) {
        command = '<wap-provisioningdoc>' + command + '</wap-provisioningdoc>';
    }
    if (debug)
		  mobicontrol.log.info("command: " + command);
    
	var response = new XML(mobicontrol.mdm.configure(command));
	if (response.hasOwnProperty("characteristic-error")) {
	    if (debug)
		  	mobicontrol.log.error("raw response: " + response.toString());

		throw response["characteristic-error"].@desc;
	}
	
	// return the XML. 
	return response;
}
exports.sendCommand = sendCommand;

function simpleMXMessage (mgr, param, mxValue, value) {
	const useMX = mxValue;
	var command = buildCharacteristic(mgr, buildParam(param, value), useMX);
	var response = sendCommand(command);
	if (debug)
		mobicontrol.log.debug("Response : " + response.toString());
}
exports.simpleMXMessage = simpleMXMessage;

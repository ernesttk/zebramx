#!/usr/bin/env js

var debug = false;
var mxVersion = null;

// call this with 'true' to get debug info in the log
exports.setExtraLog = function setExtraLog(value) {
    debug = value;
}

exports.version = function getMxVersion() {
	if (mxVersion == null)
	{
		var versionQuery = exports.buildCharacteristic("MX", '<parm-query name="Version" />');
		var response = exports.sendCommand(versionQuery);
		if (debug)
			mobicontrol.log.info('raw Mx version is ' + response);
		mxVersion = response..parm.@value;
	}
	return mxVersion;
}

exports.buildParam = function buildParam(param, value) {
    return '<parm name="' + param + '" value="' + value + '" />';
}

exports.buildCharacteristic = function buildCharacteristic(type, enclosedXML, mxInputVersion) {
	var xmlversion = '';
	var xmltype = ' type="' + type + '"';
	if (mxInputVersion !== undefined)
	    xmlversion = ' version="'+ mxInputVersion +'"'

	return '<characteristic' + xmlversion + xmltype + '>' + enclosedXML + '</characteristic>';
}

// Send the command to the MX handler.
exports.sendCommand = function sendCommand(command) {
    if (!command.startsWith('<wap-provisioningdoc>')) {
        command = '<wap-provisioningdoc>' + command + '</wap-provisioningdoc>';
    }
    if (debug)
		  mobicontrol.log.info("command: " + command);
    
	var response = new XML(mobicontrol.mdm.configure(command));
	if (response.hasOwnProperty("characteristic-error")) {
	    if (debug)
		  	mobicontrol.log.error("response: " + response.toString());

		throw response["characteristic-error"].@desc;
	}
	
	// return the XML. 
	return response;
}

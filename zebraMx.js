#!/usr/bin/env js

// set to true to get debug info in the log
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

exports.buildCharacteristic = function buildCharacteristic(type, enclosedXML, mxInputVersion) {
	var xmlversion = '';
	var xmltype = ' type="' + type + '"';
	if (mxInputVersion !== undefined)
	    xmlversion = ' version="'+ mxInputVersion +'"'

	mobicontrol.log.info("xmlversion: " + xmlversion);
	mobicontrol.log.info("xmltype: " + xmltype);

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

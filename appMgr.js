
// doc: https://techdocs.zebra.com/mx/appmgr/

var mx = require('js/zebraMx/zebraMx.js');
const mgr = 'AppMgr';

var debug = false;
exports.setExtraLog = function setExtraLog(value) {
    debug = value;
    mx.setExtraLog (value);
}

function isAppInstalled(appID) {
    // uses mobicontrol API to check if app is installed
    var returnValue = false;
    try {
        var result = mobicontrol.app.getInstalledApp(appID);
        mobicontrol.app.stop(appID);
        if (debug)
			mobicontrol.log.info(result.packageName + ' seems to be installed. Version: ' + result.versionName);
        returnValue = true;
    }
    catch (err) {
        mobicontrol.log.info(err.message);
    }
    return returnValue;
}

exports.uninstallApplication = function (appID) {
    if (isAppInstalled(appID)) {
        var command = mx.buildCharacteristic(mgr, mx.buildParam("Action", "Uninstall") + mx.buildParam("Package", appID));
        var response = mx.sendCommand(command);
        if (debug)
            mobicontrol.log.info("Response : " + response.toString());
    }
    else {
        mobicontrol.log.info(appID + ' is not installed.');
    }
}

exports.disableApplication = function (appID) {
    try {
        doAction (appID, "DisableApplication");
    } catch (err) {
        mobicontrol.log.info(appID + ' was already disabled. Message was: ' + err.message);
    }
}

exports.enableApplication = function (appID) {
    try {
        doAction (appID, "EnableApplication");
    } catch (err) {
		mobicontrol.log.info(appID + ' was already enabled. Message was: ' + err.message);
    }
}

exports.clearApplicationCache = function (appID) {
    try {
        doAction (appID, "ClearApplicationCache");
    } catch (err) {
        mobicontrol.log.warn(appID + ' clear failed. Message was: ' + err.message);
    }
}

exports.clearApplicationUserData = function (appID) {
    try {
        doAction (appID, "ClearApplicationUserData");
    } catch (err) {
        mobicontrol.log.warn(appID + ' clear failed. Message was: ' + err.message);
    }
}

exports.setDefaultLauncher = function (appID) {
    try {
        doAction (appID, "SetDefaultLauncher");
    } catch (err) {
        mobicontrol.log.warn('failed to set ' + appID + ' as default launcher. Message was: ' + err.message);
    }
}


function doAction (appID, action) {
    // this function throws an error in some case if the action was already done.
    if (isAppInstalled(appID)) {
        var command = mx.buildCharacteristic(mgr, mx.buildParam("Action", action) + mx.buildParam("Package", appID));
        var response = mx.sendCommand(command);
        if (debug)
            mobicontrol.log.info("Response : " + response.toString());
    }
    else {
        mobicontrol.log.info(appID + ' is not installed.');
    }
}

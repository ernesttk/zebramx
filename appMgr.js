
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

exports.disableApplication = function disableApplication(appID) {
    const useMX = "4.2";
    if (isAppInstalled(appID)) {
        var command = mx.buildCharacteristic(mgr, mx.buildParam("Action", "DisableApplication") + mx.buildParam("Package", appID), useMX);
        try {
			var response = mx.sendCommand(command);
			if (debug)
				mobicontrol.log.info("Response : " + response.toString());
		} catch {
			mobicontrol.log.warn(appID + ' was already disabled.');
		}
    }
}

exports.enableApplication = function enableApplication(appID) {
    const useMX = "4.2";
    if (isAppInstalled(appID)) {
        var command = mx.buildCharacteristic(mgr, mx.buildParam("Action", "EnableApplication") + mx.buildParam("Package", appID), useMX);
		try {
			var response = mx.sendCommand(command); 
			if (debug)
				mobicontrol.log.info("Response : " + response.toString());
		} catch {
			mobicontrol.log.warn(appID + ' was already enabled.');
		}
    }
}


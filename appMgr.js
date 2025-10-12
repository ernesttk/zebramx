
// doc: https://techdocs.zebra.com/mx/appmgr/

var mx = require('js/zebraMx/zebraMx.js');
const mgr = 'AppMgr';
const debug = true; // set to true to get debug info in the log

function isAppInstalled(appID) {
    // uses mobicontrol API to check if app is installed
    var returnValue = false;
    try {
        var result = mobicontrol.app.getInstalledApp(appID);
        mobicontrol.app.stop(appID);
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
        var response = mx.sendCommand(command);
        if (debug)
            mobicontrol.log.info("Response : " + response.toString());
    }
}

exports.enableApplication = function enableApplication(appID) {
    const useMX = "4.2";
    if (isAppInstalled(appID)) {
        var command = mx.buildCharacteristic(mgr, mx.buildParam("Action", "EnableApplication") + mx.buildParam("Package", appID), useMX);
        var response = mx.sendCommand(command); 
        if (debug)
            mobicontrol.log.info("Response : " + response.toString());
    }
}


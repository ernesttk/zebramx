
// doc: https://techdocs.zebra.com/mx/touchmgr/

var mx = require('js/zebraMx/zebraMx.js');
const mgr = 'TouchMgr';

const enable = "1";
const disable = "2";
var debug = false;

exports.setExtraLog = function (value) {
    mx.setExtraLog (value)
    debug = value;
}

exports.setTouchGloveFinger = function() {
    setTouchForDevice("Glove and Finger");
}
exports.setTouchFingerOnly = function() {
    setTouchForDevice("Finger Only");
}

function getDeviceType() {
    var model = mobicontrol.device.model;
    var deviceType = "0";
    if (model.includes("ET51") || model.includes("ET56") || model.includes("MC93") || model.includes("TC52") || model.includes("TC57") || model.includes("TC72") || model.includes("TC77") || model.includes("TC501") || model.includes("TC701")) {
        deviceType = "5";
    } else if (model.includes("TC8000") || model.includes("TC8300") || model.includes("MC20")) {
        deviceType = "2";
    } else if (model.includes("ET56") || model.includes("KC50") || model.includes("L10")) {
        deviceType = "8";
    } else {
        mobicontrol.log.info("Device model " + model + " is not recognized as compatible with touch settings, using default values which should work on most devices but might not be optimal.");
    }
    return deviceType;
}

function getTouchActionForDevice(deviceType) {
    switch (deviceType) {
        case "5":
            return "TouchActionSDM660";
        case "2":
            return "TouchAction8000";
        case "8":
            return "TouchActionL10";
        default:
            return "TouchActionAny";
    }
}

function translateTouchValue(deviceType, value) {
    if (value === "Glove and Finger") {
        switch (deviceType) {
            case "5": // SDM600.
                return "Glove and Finger";
            case "2": // TC8000, TC8300, MC20.
                mobicontrol.log.info("Glove and Finger mode is not supported on device type " + mobicontrol.device.model + ", using Stylus, Glove and Finger mode instead");
                return "6";
            case "8":  // L10 and KC50.
                return "18";
            default:
                return "2";
        }
    }
    else if (value === "Finger Only") {
        switch (deviceType) {
            case "5": // SDM600.
                return "Finger";
            case "2": // TC8000, TC8300, MC20.
                return "5";
            case "8":  // L10 and KC50.
                return "19";
            default:
                return "3";
        }
    }
    return value;
}

function setTouchForDevice(value) {
    var deviceType = getDeviceType();
    var touchAction = getTouchActionForDevice(deviceType);
    var touchValue = translateTouchValue(deviceType, value);

    var command = mx.buildCharacteristic(mgr, mx.buildParam("DeviceType", deviceType) + mx.buildParam(touchAction, touchValue));
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.debug("Response : " + response.toString());
}
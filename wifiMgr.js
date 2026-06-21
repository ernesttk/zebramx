
// doc: https://techdocs.zebra.com/mx/wifi

var mx = require('js/zebraMx/zebraMx.js');

const mgr = 'Wi-Fi';

var debug = false;

// set to true to get debug info in the log
exports.setExtraLog = function (value) {
	mx.setExtraLog (value);
    debug = value;
}

exports.wiFiEnable = function () { systemCharacteristics ("WiFiAction", "Enable"); }
exports.wiFiDisable = function () { systemCharacteristics ("WiFiAction", "Disable"); }

exports.networkNotificationEnable = function () { systemCharacteristics ("NetworkNotification", "true"); }
exports.networkNotificationDisable = function () { systemCharacteristics ("NetworkNotification", "false"); }

exports.wifiWakeupEnable = function () { systemCharacteristics ("WifiWakeup", "Enable"); }
exports.wifiWakeupDisable = function () { systemCharacteristics ("WifiWakeup", "Disable"); }

function systemCharacteristics (action, value){
    var systemCmd = mx.buildCharacteristic("System", mx.buildParam(action, value));
    var command = mx.buildCharacteristic (mgr, systemCmd);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.info("Response : " + response.toString());
}

exports.captivePortalDetectionEnable = function () { advancedOptions ("CaptivePortalDetection", "Enable"); }
exports.captivePortalDetectionDisable = function () { advancedOptions ("CaptivePortalDetection", "Disable"); }

exports.macRandomizationEnable = function () { advancedOptions ("MACRandomization", "Enable"); }
exports.macRandomizationDisable = function () { advancedOptions ("MACRandomization", "Disable"); }

function advancedOptions (action, value){
    const useAdvanceOptions = mx.buildParam ("UseAdvancedOptions", "1");
    var advanceCmd = mx.buildCharacteristic("AdvancedOptions", mx.buildParam(action, value));
    var command = mx.buildCharacteristic (mgr, useAdvanceOptions + advanceCmd);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.info("Response : " + response.toString());
}

exports.hotspotEnable = function () { hotspotOptions ("Hotspot", "1"); }
exports.hotspotDisable = function () { hotspotOptions ("Hotspot", "0"); }

exports.toggleHotSpotOn = function () { hotspotOptions ("ToggleHotspot", "1"); }
exports.toggleHotSpotOff = function () { hotspotOptions ("ToggleHotspot", "0"); }

// MX 14 or higher
exports.preventNetworkTethering = function () { hotspotOptions ("RestrictedTethering", "1"); }
exports.allowNetworkTethering = function () { hotspotOptions ("RestrictedTethering", "0"); }

function hotspotOptions (action, value){
    const useHotspotOptions = mx.buildParam ("UseHotspotOptions", "1");
    var advanceCmd = mx.buildCharacteristic("HotspotConfiguration", mx.buildParam(action, value));
    var command = mx.buildCharacteristic (mgr, useHotspotOptions + advanceCmd);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.info("Response : " + response.toString());
}

exports.autoBandSelection = function () { radioOptions("BandSelection", "Auto"); }
exports.bandSelection24GHzOnly = function () { radioOptions("BandSelection", "2.4GHz"); }
exports.bandSelection5GHzOnly = function () { radioOptions("BandSelection", "5.0GHz"); }
exports.bandSelection6GHzOnly = function () { radioOptions("BandSelection", "6.0GHz"); }

function radioOptions (action, value){
    var radioCmd = mx.buildCharacteristic("Radio", mx.buildParam(action, value));
    var command = mx.buildCharacteristic (mgr, radioCmd);
    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.info("Response : " + response.toString());
}


exports.disconnectSSID = function (SSID) { networkAction(SSID, "Disconnect"); }
exports.disableSSID = function (SSID) { networkAction(SSID, "Disable"); }
exports.removeSSID = function (SSID) { networkAction(SSID, "Remove"); } 

function networkAction (SSID, action)
{
    var networkAction = mx.buildCharacteristic("network-profile", mx.buildParam("SSID", SSID));
    var command = mx.buildCharacteristic(mgr, mx.buildParam("NetworkAction", action) + networkAction);

    var response = mx.sendCommand(command);
    if (debug)
        mobicontrol.log.info("Response : " + response.toString());
}

exports.removeAllSSID = function () { mx.simpleMXMessage (mgr, "NetworkAction", "RemoveAll"); }
exports.disableAllSSID = function () { mx.simpleMXMessage (mgr, "NetworkAction", "DisableAll"); }

exports.roamRssithreshold = function (value) 
// This parameter is supported only on 4490-, 5430-, 6490- and 6690-platform devices. 
// ie: not the TC77, but the TC78, TC701 yes
// On the TC77, reply is always 99. 
{
    if (value == undefined)
        // set default value
        value = '98'; 
    
    if ((value < 0 && (value < -55 || value > -75)) || (value >= 0 && value <= 21))
    {
        var enableAdvanced = mx.buildParam("UseAdvancedOptions", "1");
        var roamRssithresholdParam = mx.buildCharacteristic ("AdvancedOptions", mx.buildParam("RoamRssithreshold", value.toString()));

        var command = mx.buildCharacteristic(mgr, enableAdvanced + roamRssithresholdParam);

        var response = mx.sendCommand(command);
        if (debug)
            mobicontrol.log.info("Response : " + response.toString());
    }
    else {
        throw ("Invalid RSSI value. Value between 0 (-55 db) and 21 (-75 db); def")
    }
}

exports.roamRssiDelta = function (value) 
// This parameter is supported only on 4490-, 5430-, 6490- and 6690-platform devices. 
// ie: not the TC77, but the TC78, TC701 yes
// On the TC77, reply is always 99. 
{
    if (value == undefined)
        // set default value
        value = '98'; 
    
    if ((value >= 0 && value <= 10) || value == '98')
    {
        var enableAdvanced = mx.buildParam("UseAdvancedOptions", "1");
        var roamRssithresholdParam = mx.buildCharacteristic ("AdvancedOptions", mx.buildParam("RoamRssiDelta", value.toString()));

        var command = mx.buildCharacteristic(mgr, enableAdvanced + roamRssithresholdParam);

        var response = mx.sendCommand(command);
        if (debug)
            mobicontrol.log.info("Response : " + response.toString());
    }
    else {
        throw ("Invalid RSSI value. Value between 0 (-55 db) and 21 (-75 db); def")
    }
}


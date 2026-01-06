
var mx = require('js/zebraMx/zebraMx.js'); 

mx.setExtraLog(true);

var version = mx.version(); 

mobicontrol.log.info('Installed Mx version is ' + version);

var requestedVersion = "9.1";

mobicontrol.log.info('Is the installed Mx version larger than ' + requestedVersion + '? ' + mx.isInstalledMxVersionLarger(requestedVersion));


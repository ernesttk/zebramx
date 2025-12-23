
var mx = require('js/zebraMx/zebraMx.js'); 

mx.setExtraLog(true);

var version = mx.version().split("."); 
var majorVersion = version[0];
var minorVersion = 0
var releaseVersion = 0
if (version.length > 1) {
	minorVersion = version[1];
	if (version.length > 2)
		releaseVersion = version[2];
}
mobicontrol.log.info('Mx version is ' + majorVersion + ";" + minorVersion + ";" + releaseVersion);


// Disable unwanted apps. Check is done if app is in fact installed
// note fonction fails if app was already disabled/enabled, but does not return a value (to be corrected).

var appMgr = require('js/appMgr/appMgr.js');


appMgr.disableApplication('com.android.chrome');
appMgr.enableApplication('com.android.chrome');

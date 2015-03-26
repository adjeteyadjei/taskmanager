var application = require("application");

/*
 * Define which is the main page of the app.
 */
application.mainModule = "app/main/index";

/*
 * Define constants which we will use across the application
 */
global.ANDROID_OS_NAME = "Android";
global.IOS_OS_NAME = "iOS";

/*
 * Start application
 */
application.start();

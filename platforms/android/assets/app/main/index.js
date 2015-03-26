// Imports
var observableModule = require("data/observable");
var observableArray = require("data/observable-array");
var viewModule = require("ui/core/view");
var dialogs = require("ui/dialogs");
var frameModule = require("ui/frame");
var localSettings = require("local-settings");
var gestures = require("ui/gestures");
var platformModule = require("platform");
var absoluteLayoutModule = require("ui/layouts/absolute-layout");

//View Objects
var tasks = new observableArray.ObservableArray([]);
var pageData = new observableModule.Observable();
var page;

exports.onPageLoaded = function(args) {
  page = args.object;
  pageData.set("task", "");
  pageData.set("tasks", tasks);
  page.bindingContext = pageData;
  initFAB();
};

exports.add = function() {
  var todo = pageData.get("task");
  if (!todo) {
    dialogs.alert({
      title: "Create Task",
      message: "Please enter task name.",
      okButtonText: "Okay",
    }).then(function() {
      return;
      console.log("Dialog closed.")
    });
  } else {
    tasks.push({
      name: todo
    });
    pageData.set("task", "");
    viewModule.getViewById(page, "task").dismissSoftInput();
  }
};

exports.addTask = function() {
  dialogs.prompt({
    title: "Enter Task",
    okButtonText: "Add",
    cancelButtonText: "Cancel",
  }).then(function(res) {
    if(res.result && res.text){
      tasks.push({
        name: res.text
      });
    }
  });
}

function initFAB() {
  var FABContainer = page.getViewById("FABContainer");
  //var addTaskButton= page.getViewById("addTaskButton");
  if (platformModule.device.os == ANDROID_OS_NAME) {
    // this code should be revisited
    var FABelement = page.getViewById("FAB");

    FABContainer.style.visibility = "visible";
    //addTaskButton.style.visibility = "collapsed";
    var widthDIP = platformModule.screen.mainScreen.widthPixels / platformModule.screen.mainScreen.scale;
    var heightDIP = platformModule.screen.mainScreen.heightPixels / platformModule.screen.mainScreen.scale;
    var FABSize = 150;
    var FABMargin = 16;

    absoluteLayoutModule.AbsoluteLayout.setLeft(FABelement, widthDIP - 70 - FABMargin);
    absoluteLayoutModule.AbsoluteLayout.setTop(FABelement, heightDIP - 70 - FABSize - FABMargin);
  }
}

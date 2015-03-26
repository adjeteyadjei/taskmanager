var observableModule = require("data/observable");
var observableArray = require("data/observable-array");
var viewModule = require("ui/core/view");

var tasks = new observableArray.ObservableArray([]);
var pageData = new observableModule.Observable();
var page;

exports.onPageLoaded = function(args) {
    page = args.object;
    pageData.set("task", "");
    pageData.set("tasks", tasks);
    page.bindingContext = pageData;
};

exports.add = function() {
    tasks.push({ name: pageData.get("task") });
    pageData.set("task", "");
    viewModule.getViewById( page, "task" ).dismissSoftInput();
};

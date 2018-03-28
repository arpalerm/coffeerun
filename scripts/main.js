//main.js lets all your scripts talk to eachother
(function (window) { //receives the window object for use inside the function body. Retrieves the constructors defined as part of the window.App namespace.
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]'; //defines the form selector
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;
  var myTruck = new Truck('Serenity', new DataStore()); //new truck instance is declared inside a function (the main module). functions protect their variables from being accessed by code outside the function.
  window.myTruck = myTruck; //exports it to the global namespace so you can interact with the instance of it.
  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck)); //lets the click handler and the deliver order scripts talk. Passes addClickHandler the deliverOrder function from truck.js
  var formHandler = new FormHandler(FORM_SELECTOR);// uses the form selector defined above and passes it to the selector in the formhandler

  formHandler.addSubmitHandler(function (data) {
    myTruck.createOrder.call(myTruck, data); // pass the truck the data from form submission
    checkList.addRow.call(checkList, data); //make a new row with this data
  });

  formHandler.addInputHandler(Validation.isCompanyEmail); // checks to see if email inputed is company email

  
})(window);

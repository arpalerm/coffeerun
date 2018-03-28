//PREVENTS THE BROWSER FROM TRYING TO SEND THE FORM DATA TO A SERVER.
//READS THE VALUES FROM THE FORM WHEN USER CLICKS SUBMIT AND SENTS DATA TO A Truck INSTANCE USING createOrder METHOD
(function (window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector) { //called a selector bc jQuery allows you to traverse the DOM by selecting what you want - using selector or html tag
    if (!selector) {
      throw new Error('No selector provided'); //Error is a built in type that lets you formally signal that there is an unexpected value or condition on your code.
    }

    this.$formElement = $(selector); //Prefixing a variable with $ is a sign the variable refers to elements selected using jQuery
                                    //jQuerys $ function does not return references to DOM elements the way document.querySelectorAll does.
                                    //It returns a single object, and the object contains references to the selected elements.
                                    //The object has special methods for manipulating the collection of references.
                                    //This object is called a jQuery-wrapped selection or jQuery-wrapped collection
    if (this.$formElement.length === 0) { //the length property of a jQuery-wrapped selection tells you how many elements were matched
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  FormHandler.prototype.addSubmitHandler = function (fn) { //listens for the submit event on the <form> element and runs a callback when it occurs. However it can also be passed any function that needs to run when the form is submitted
    console.log('Setting submit handler for form');
    this.$formElement.on('submit' , function (event) { // on accepts the name of the event and a callback to run when the event is triggered (on works like addEventListener)
      event.preventDefault(); // ensures pressing submit does not take the user away from the coffee run page

      //var data = $(this).serializeArray();THIS is a reference to teh formElement. jQuery provides a method serializeArray for getting values from the form. In order to use serializeArray you need to wrap the form using jQuery - $(this)
      var data = {};
      $(this).serializeArray().forEach(function (item) { //using forEach on serializeArray it will use the objects name and value to create a new property on the data object.
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value);
      });
      console.log(data); //serializeArray returns the form data as an array of objects, assigned to a temporary variable named data and logs it to the console.
      fn(data);
      this.reset();
      this.elements[0].focus();
    });
  }

  FormHandler.prototype.addInputHandler = function (fn) { // listens for the input event when the user enters each character to check for validation
    console.log('Setting input handler for form');
    this.$formElement.on('input', '[name=emailAddress]', function (event) { //listens for input of the email address

      var emailAddress = event.target.value;
      var message = '';
      if (fn(emailAddress)) {
        event.target.setCustomValidity(''); //method sets the custom validity message for the selection element to the specified message. Use the empty string to indicate that the element does not have a custom validity error.
      } else {
        message = emailAddress + ' is not an authorized email address!';
        event.target.setCustomValidity(message);
      }
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);

//IIFE module that creates an object literal used for organizing functions, assigns it to a variable named Validation, then exports that variable to the App namespace
(function (window){
  'use strict';
  var App = window.App || {};

  var Validation = {
    isCompanyEmail: function (email) { // checks to see if email is company email
      return /.+@bignerdranch\.com$/.test(email); // a literal regular expression nested between the // slashes
                                                  // .+ means any charachter one or more times (. means any character) (+ means one or more times)
                                                  // \.com the backslash is uses to indicate the period is a literal period
                                                  // $ at the end of a regular expression means that @bignerdranch.com should be at the end of the string, there should be no more characters after it.
                                                  // it is a regular expression with a test method attached to it. You can pass a string to the test method, and it will return a Boolean true if it matches and false if it does not.
    }
  };

  App.Validation = Validation;
  window.App = App;
})(window);

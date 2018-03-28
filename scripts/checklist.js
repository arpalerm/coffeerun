(function (window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  function CheckList(selector) {
    if (!selector) {
      throw new Error('No selector presented');
    }

    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  CheckList.prototype.addClickHandler = function (fn) { //this makes the check in the checkbox show up
    this.$element.on('click', 'input', function (event) { //registers an event handler callback. listens for a click with jQuery's on method. specifies click as the event name. passed a filtering selector as input.
                                                          //The filtering selector 'input' tells the event handler to run the cb function only if the event was triggered by an <input> element.
                                                          //This is called EVENT DELEGATION. When you need to listen to events that are dynamically created and removed you should use event delegation.
                                                          //It is easier to add a single listener to the dynamic elements' container and then run the handler function based on what element triggered the event.
      var email = event.target.value;
      this.removeRow(email);
      fn(email);
    }.bind(this));
  };

  CheckList.prototype.addRow = function (coffeeOrder) {
    this.removeRow(coffeeOrder.emailAddress) //removes any existing rows that match the email address
    var rowElement = new Row(coffeeOrder); //creates a new instance of a row, using the coffee order info
    this.$element.append(rowElement.$element);  //add the new row instance's $element property to the checklist
  };

  CheckList.prototype.removeRow = function (email) {
    this.$element //jQuery lets you write multiple method calls for an object like a list of steps (chained). the methods used must return a jQuery-wrapped selection in order for another method to be chained to it.
        .find('[value="' + email + '"]') //.find does a scoped selection. insteadof searching the whole DOM it searches the descendents of the checklist because of the this.$element
        .closest('[data-coffee-order="checkbox"]')
        .remove();
  };

  function Row(coffeeOrder) {
    var $div = $('<div></div>', {
      'data-coffee-order': 'checkbox', //you need single quotes around data-code-order because special characters such as a dash will throw a syntax error without them
      'class': 'checkbox' //you need single quotes around class because class is a JS reserved word and will throw a syntax error or try to read it as JS instead of jQuery without them
    });

    var $label = $('<label></label>');

    var $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: coffeeOrder.emailAddress
    })

    var description = '[' + coffeeOrder.strength + 'x] ';
    if (coffeeOrder.flavor) {
      description += coffeeOrder.flavor + ' '; //+= does addition and concatination in one step. It is the same as description = description + coffeeOrder.flavor + ' ';
    }

    description += coffeeOrder.coffee + ', ';
    description += ' (' + coffeeOrder.emailAddress + ') ';
    description += coffeeOrder.size + ' ';

    $label.append($checkbox); //work left to right bottom to top.
    $label.append(description);
    $div.append($label);

    this.$element = $div
  }

  App.CheckList = CheckList;
  window.App = App;
})(window);

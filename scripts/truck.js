//MANAGES THE FOOD TRUCK

(function (window) {
  'use strict';
  var App = window.App || {};

  function Truck(truckId, db) { //creates new Truck instances. Accepts two paramaters the truckId & the database (***the new App.DataStore() function is passed to the db param so the truck can access the script there?)
    this.truckId = truckId; //assigns them as properties to the newly created instances
    this.db = db;
  }

  Truck.prototype.createOrder = function (order) {
    console.log('Adding order for ' + order.emailAddress);
    this.db.add(order.emailAddress, order); //instances of truck are designed to work with anything that has the same method names as DataStore. (such as .add or .remove)
  };

  Truck.prototype.deliverOrder = function (customerId) { //when an order is delivered it should remove the order from its database
    console.log('Delivering order for ' + customerId);
    this.db.remove(customerId);
  };

  Truck.prototype.printOrders = function () {
    var customerIdArray = Object.keys(this.db.getAll()); //retrieves all the orders as KV pairs and passes them to object.keys which returns an array containing only the keys. This array is assigned the customerIdArray

    console.log('Truck #' + this.truckId + ' has pending orders:');
    customerIdArray.forEach(function (id) { //itterates over the array and trys to get the order associated with an id
      console.log(this.db.get(id));
    }.bind(this));
    //for call back functions THIS is not automatically assigned to an object. You need to use the functions .bind method. When the function is called it uses the object argument passed into bind as the value of THIS inside the functions body.
    //instead of writing .bind(this)); you could write this); because according to MDN forEach takes an optional second argument which takes the value of this in the callback
  };

  App.Truck = Truck;
  window.App = App;

})(window);

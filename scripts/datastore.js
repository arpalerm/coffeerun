//WHERE THE DATA IS STORED

(function (window) { //IIFE function that is Immediately Invoked
  'use strict';
  var App = window.App || {}; //declared a local variable named App, if there is already an App property of the window it is assigned the local App, if not App will refer to a new empty object represented by {}

  function DataStore() { //DataStore is a constructor or an object factory function. You use the keyword NEW when you call it, this tells JS to create a new object when it is called. It will return a new object without an explicit return statement in the constructor.
    this.data = {}; //creates a property named data on the new object, you can use this.data to add key value pairs to the objects. objOne.data['name'] = 'Joe';
  } //no semicolon needed after because you are only defining a function not assigning anything.

  DataStore.prototype.add = function (key, val) { //when you add a property to the ptototype and assign it a function, every instance you create with the constructor will have access to that funtion.
    this.data[key] = val;
  };

  DataStore.prototype.get = function (key) { //looks up a value based on a given key. Accepts a key, looks up the value for it in the instances data property, and returns it.
    return this.data[key];
  };

  DataStore.prototype.getAll = function () { //looks up all the keys and values. Returns a reference to the data property.
    return this.data;
  };

  DataStore.prototype.remove = function (key) { //removes a KV pair from an object
    delete this.data[key];
  };

  App.DataStore = DataStore; // adds DataStore to the App object
  window.App = App; //reassigns the global App property to the newly modified App. ***What does it mean by "if it did not already exist and you had to create it as an empty object, you must attach it" Isnt that what the or opperator is supposed to do

})(window); //the window object is the global namespace. All of its properties are available to and JS code you write, even in the console.
            //the namespace is litteral space where items are directly attached to. this can prevent things being called from other APIs by accident. ie running code with built in spotify API.

'use strict';

let throwError = null;
const mongoose = jest.createMockFromModule('mongoose');

mongoose.__setError = (error) => {
  throwError = error;
}

mongoose.connection = {
  on: jest.fn(() => {}),
 
  once: (name, cb) => {
    console.log("name", name)
    if (throwError) {
      throw throwError;
    }
    cb();
  }
}

module.exports = mongoose;

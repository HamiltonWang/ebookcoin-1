'use strict';
const mongoose = require('mongoose');
const fs = require('fs');
const EventEmitter = require('events');

module.exports = class Storage {
  constructor(opts) {
    opts = opts || {};
    this.path = opts.path;
    this.ssl = opts.ssl ? true : false;
    this.sslCA_PATH = opts.sslCA_PATH;
    this.dbOptions = opts.dbOptions;
    if (this.ssl) {
      this.dbOptions.mongos = {
        'ssl': true,
        'sslValidate': true,
        'sslCA': fs.readFileSync(this.sslCA_PATH)
      }
    }
  }

  connect() {
    //开发环境开启mongoose debug
    if (process.env.PORT) {
      mongoose.set('debug', true);
    }
    mongoose.connect(this.path, this.dbOptions);
    return mongoose.connection;
  }



}

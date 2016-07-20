const Model = require('./model');
const joi = require('joi');

module.exports = class Peer {
  constructor() {

  }

  remove() {

  }

  getPeers(query, cb) {
    let schema = {
      state: joi.number().min(0).max(3),
      os: joi.string(),
      version: joi.string(),
      limit: joi.number().min(0).max(100),
      shared: joi.number().min(0).max(1),
      orderBy: joi.string(),
      offset: joi.number().min(0),
      port: joi.number().min(1).max(65535)
    }
    joi.validate(query, schema, (err, value) => {
      if (err) return cb(err);

    });

  }

}

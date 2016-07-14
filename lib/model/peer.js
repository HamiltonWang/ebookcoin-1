const mongoose = require('mongoose');
const _ = require('lodash');
let peerObj = {
  ip: Number,
  port: Number,
  state: Number,
  sharePort: Number,
  clock: Date,
  os: String,
  version: String
};

let peerSchema = new mongoose.Schema(peerObj);


peerSchema.statics.totalPeers = function(cb) {
  return this.count({}, cb);
}

peerSchema.statics.queryPeers = function(filter, cb) {
  let fields = ['ip', 'port', 'state', 'os', 'sharePort', 'version'];
  let sortBy = "";
  let skip = filter.offset || null;
  let limit = filter.limit || null
  let sortMethod = -1;
  let query = _.pick(filter, fields);
  if (filter.shared) query.sharePort = filter.shared;
  let fn = this.find(query);

  if (filter.hasOwnProperty('orderBy')) {
    let sort = filter.orderBy.split(':');
    sortBy = sort[0].replace(/[^\w\s]/gi, '');
    if (sort.length == 2) {
      sortMethod = sort[1] == 'desc' ? '-1' : '1';
    } else {
      sortMethod = '-1';
    }
    fn.sort({
      sortBy: sortMethod
    });
  }

  if (sortBy) {
    if (fields.indexOf(sortBy) < 0) {
      return cb("Invalid sort field");
    }
  }

  if (limit !== null && skip !== null) {
    if (limit > 100) return cb("Invalid limit. Maximum is 100");
    fn.skip(skip).limit(limit);
  }

  return fn.exec(cb);

}

let peerModel = mongoose.model('yx_peer', peerSchema);

module.exports = peerModel;

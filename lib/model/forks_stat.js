const mongoose = require('mongoose');

let forks_stat_Obj = {
  delegatePublicKey: String,
  blockTimestamp: Number,
  blockId: mongoose.Schema.Types.ObjectId,
  blockHeight: Number,
  previousBlock: mongoose.Schema.Types.ObjectId,
  cause: Number
}

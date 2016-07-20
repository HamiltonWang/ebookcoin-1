const mongoose = require('mongoose');

let blockObj = {
  rowId: Number,
  version: Number,
  timestamp: Number,
  height: Number,
  previousBlock: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'blocks'
  },
  numberOfTransactions: Number,
  totalAmount: Number,
  totalFee: Number,
  reward: Number,
  payloadLength: Number,
  payloadHash: String,
  generatorPublicKey: String,
  blockSignature: String
}

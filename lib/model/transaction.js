const mongoose = require('mongoose');

let trsObj = {
  rowId: Number,
  blockId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'blocks'
  },
  type: Number,
  timestamp: Number,
  senderPublicKey: String,
  senderId: mongoose.Schema.Types.ObjectId,
  recipientId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  fee: Number,
  signature: String,
  signSignature: String,
  requesterPublicKey: String,
  signatures: String
}

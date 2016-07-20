const mongoose = require('mongoose');

let signaturesObj = {
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'trs'
  }, //transactionId
  publicKey: String
}

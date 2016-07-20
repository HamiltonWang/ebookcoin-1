const mongoose = require('mongoose');

let multisignaturesObj = {
  min: Number,
  lifetime: Number,
  keysgroup: String,
  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'trs'
  }
}

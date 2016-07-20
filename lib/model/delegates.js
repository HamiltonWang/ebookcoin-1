const mongoose = require('mongoose');

let delegatesObj = {
  username: String,
  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'trs'
  }
}

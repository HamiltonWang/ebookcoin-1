const mongoose = require('mongoose');

let votesObj = {
  votes: String,
  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'trs'
  }
}

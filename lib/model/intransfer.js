const mongoose = require('mongoose');

let intransferObj = {
  dappId: mongoose.Schema.Types.ObjectId,
  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'trs'
  },
}

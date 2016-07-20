const mongoose = require('mongoose');

let outtransferObj = {
  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'trs'
  },
  dappId: mongoose.Schema.Types.ObjectId
}

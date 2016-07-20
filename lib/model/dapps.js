const mongoose = require('mongoose');

let dapps = {
  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'trs'
  },
  name: String,
  description: String,
  tags: String,
  link: String,
  type: Number,
  category: Number,
  icon: String
}

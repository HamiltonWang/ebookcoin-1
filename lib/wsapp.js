'use strict';
const _ = require('lodash');
const async = require('async');
const $ = require('preconditions').singleton();
const messageBroker = require('./messagebroker');
const uuid = require('uuid');

module.exports = class WsApp {
  constructor() {

  }
  _unauthorized(socket) {
    socket.emit('unauthorized');
    socket.disconnect();
  }

  _handleNotification(notification) {
    let room = notification.recipientId ? this.io.to(notification.recipientId) :
      this.io
    room.emit('notification', notification);
  }

  start(server, opts, cb) {
    opts = opts || {};
    $.checkState(opts.messageBrokerOpts);
    let self = this;
    this.io = require('socket.io')(server);

    async.series([
      function(callback) {
        // self.messageBroker = new messageBroker(opts.messageBrokerOpts);
        // self.messageBroker.onMessage(_.bind(self._handleNotification,
        //   self));
        callback();
      },
      function(callback) {
        self.io.on('connection', function(socket) {
          socket.nonce = uuid.v4();
          socket.on('authorize', function(data) {
            if (data.message != socket.nonce) return self._unauthorized(
              socket);
            //@todo
            // WalletService.getInstanceWithAuth(data, function(
            //   err, service) {
            //   if (err) return self._unauthorized(socket);
            //
            //   socket.join(service.recipientId);
            //   socket.emit('authorized');
            // });
            socket.emit('authorized');
          });

          socket.emit('challenge', socket.nonce);
        });
        callback();
      }
    ], function(err) {
      if (cb) cb(err);
    });
  }

}

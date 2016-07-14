'use strict';

//消息转发机制
const events = require('events');
const log = require('npmlog');
const socketClient = require('socket.io-client');


log.debug = log.verbose;
log.disableColor();

module.exports = class MessageBroker extends events.EventEmitter {
  constructor(opts) {
    super();
    opts = opts || {};
    let url = opts.messageBrokerServer.url
    this.remote = true;
    this.mq = socketClient.connect(url);
    this.mq.on('connect', function() {
      log.info('Using message broker server at ' + url);
    });
    this.mq.on('connect_error', function() {
      log.warn('Error connecting to message broker server @ ' + url);
    });
    this.mq.on('msg', function(data) {
      this.emit('msg', data);
    });
  }

  onMessage(handler) {
    this.on('msg', handler);
  }

  send(data) {
    if (this.remote) {
      this.mq.emit('msg', data);
    } else {
      this.emit('msg', data);
    }
  }

}

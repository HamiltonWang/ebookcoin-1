#!/usr/bin/env node

const ExpressApp = require('./lib/expressapp'),
  WsApp = require('./lib/wsapp'),
  config = require('./config'),
  cluster = require('cluster'),
  sticky = require('sticky-session'),
  os = require('os'),
  http = require('http'),
  https = require('https'),
  fs = require('fs'),
  log = require('npmlog'),
  async = require('async'),
  db = require('./lib/storage');

log.debug = log.verbose;
log.disableColor();


const port = process.env.PORT || config.port || 3000;
const numCPUs = os.cpus().length;
const clusterInstances = config.clusterInstances || numCPUs;
const serverModule = config.ssl.enabled ? https : http;

let serverOpts = {};

if (config.ssl.enabled) {
  serverOpts.key = fs.readFileSync(config.ssl.options.key ||
    './ssl/privatekey.pem');
  serverOpts.cert = fs.readFileSync(config.ssl.options.cert ||
    './ssl/certificate.pem');
}

let start = function(cb) {
  let expressApp = new ExpressApp();
  let wsapp = new WsApp();
  let server = config.ssl.enabled ? serverModule.createServer(
    serverOpts,
    expressApp.app) : serverModule.Server(expressApp.app);

  function doStart(cb) {
    async.auto({
      //数据库连接
      connect_db: function(callback) {
        let mgo = new db(config.db);
        let connection = mgo.connect();
        connection.once('open', function() {
          console.log('db init success');
        });
        callback(null);
      },
      //api server init
      start_express: function(callback) {
        expressApp.start(config);
        callback(null, server);
      },
      start_socket: function(callback) {
        wsapp.start(server, config, callback);
      }
    }, function(err, results) {
      cb(err, results['start_express']);
    });
  }

  doStart(function(err, server) {
    return cb(err, server);
  });

}

start(function(err, server) {
  if (err) {
    console.log('Could not start ebc:', err);
    process.exit(0);
  } else {
    if (config.cluster) {
      if (sticky.listen(server, port, {
          workers: clusterInstances
        })) {
        log.info('ebookcoin Service running on port ' + port);
      }
    } else {
      server.listen(port, function(err) {
        if (err) console.log("ERROR: ", err);
        log.info('ebookcoin Service running on port ' + port);
      });
    }
  }
});

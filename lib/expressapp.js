'use strict';

const log = require('npmlog'),
  express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  _ = require('lodash');

log.disableColor();
log.debug = log.verbose;
log.level = 'info';

class ExpressApp {
  constructor() {
      this.app = express();
    }
    /**
     * start
     *@param {json} opts {disableLogs:'',basePath:''}
     **/
  start(opts) {
    opts = opts || {};
    this.app.use(function(req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST ,PUT');
      res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    this.app.enable('trust proxy');
    this.app.use(morgan('dev'));
    this.app.use(bodyParser.json());


    let router = express.Router();
    //错误处理
    function returnError(err, res, req) {
      let code = 500,
        message;
      if (_.isObject(err)) {
        code = err.code || err.statusCode;
        message = err.message || err.body;
      }
      let m = message || err.toString();

      if (!opts.disableLogs)
        log.error(req.url + ' :' + code + ':' + m);

      res.status(code || 500).json({
        error: m
      }).end();
    }

    router.get('/', function(req, res) {
      res.send('ok');
    });

    this.app.use(opts.basePath || '/v1/api', router);
    //404
    this.app.use(function(req, res, next) {
      let err = new Error('Not Found');
      err.code = 404;
      returnError(err, res, req);
    })
  }
}

module.exports = ExpressApp;

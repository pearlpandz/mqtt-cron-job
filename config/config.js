const path = require('path'),
    fs = require('fs');

const config = JSON.parse(fs.readFileSync(path.join(__dirname, "/config.json"), "utf8"));
const CONFIG = {}
CONFIG.ENV = (process.env.NODE_ENV || config.env);

if (config.env == 'development') {
    CONFIG.port = (process.env.VCAP_APP_PORT || config.port);
    CONFIG.DB_URL = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`;
    CONFIG.secret = "youcanfindme";
    CONFIG.mongoport = config.mongodb.port;
} else {
    CONFIG.port = (process.env.VCAP_APP_PORT || config.port);
    CONFIG.DB_URL = `mongodb://${config.live.username}:${config.live.password}@${config.live.host}:${config.live.port}/${config.live.database}`;
    CONFIG.secret = "youcanfindme";
    CONFIG.mongoport = config.live.port;
}

CONFIG.localSmsAPI = "DKybIYCWD1M-rlY9TJ2HXLt8pQTVyunck9hxLR4Ehl";
CONFIG.sender = 'LFOLKS';

module.exports = CONFIG;
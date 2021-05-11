const config = require('../../config/env');
const HunterIO = require('./hunter-io');

module.exports.hunterio = new HunterIO({ apiKey: config.hunterIoApi });

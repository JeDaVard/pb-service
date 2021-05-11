require('dotenv').config();
const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        hunterIoApi: process.env.hunterIoApi,
        port: process.env.port,
        rabbitApi: process.env.rabbitApi,
    },
};

module.exports = config[env];

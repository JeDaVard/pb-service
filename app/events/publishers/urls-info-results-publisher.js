const { Publisher } = require('../../libs/rabbit');
const { domainsResultExchange } = require('../types');

module.exports = class UrlsInfoResultsPublisher extends Publisher {
    exchange = domainsResultExchange;
    routeKey = 'urls.ready';
};

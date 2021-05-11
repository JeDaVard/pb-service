const { Listener } = require('../../libs/rabbit');
const { domainsRequestExchange } = require('../types');
const domainService = require('../../service/handlers/domain');

// THINK ITS A CONTROLLER LIKE EXPRESS CONTROLLER
// DEPENDING ON YOUR ARCHITECTURE HERE U CAN DO YOUR BUSINESS STUFF OR JUST MAKE A SERVICE CALL
// I WILL DO THE SECOND VARIANT
module.exports = class RequestUrlsInfoSubscriber extends Listener {
    onMessage(channel, data, msg) {
        // here you can call your business logic methods
        console.log('--------RECEIVED-DATA:WILL-PROCESS-NOW-------');
        console.log(data);
        console.log('--------RECEIVED-DATA:WILL-PROCESS-NOW-------');

        domainService.onUrlsInfo(data);
        channel.ack(msg);
    }
    exchange = domainsRequestExchange;
    pattern = 'urls.request';
    prefetchCount = 1;
};

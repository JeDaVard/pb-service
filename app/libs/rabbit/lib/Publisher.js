const RabbitMQ = require('./RabbitMQ');

module.exports = class Publisher extends RabbitMQ {
    routeKey;
    publishOptions;

    constructor(connection, exchangeType) {
        super(connection, exchangeType);
    }

    async publish(data, callback) {
        const res = this.channel.publish(
            this.exchange,
            this.routeKey,
            Buffer.from(JSON.stringify(data)),
            this.publishOptions
        );

        if (res && callback) {
            callback();
        }

        return res;
    }

    async close() {
        // You can write here other clean-ups
        await this.connection.close();
    }
};

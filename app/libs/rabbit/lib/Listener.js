const RabbitMQ = require('./RabbitMQ');

module.exports = class Listener extends RabbitMQ {
    pattern = '*';
    prefetchCount = 1;

    constructor(connection, exchangeType) {
        super(connection, exchangeType);
    }

    async prefetch() {
        await this.channel.prefetch(this.prefetchCount);
        return this;
    }

    async bindQueue() {
        await this.channel.bindQueue(
            this.queueName,
            this.exchange,
            this.pattern
        );
        return this;
    }

    async listen(callback) {
        await this.channel.consume(
            this.queueName,
            (msg) => {
                if (!!msg) {
                    if (callback) callback();
                    this.onMessage(this.channel, this.parseMessage(msg), msg);
                }
            },
            {
                noAck: false,
            }
        );
    }

    parseMessage(msg) {
        const data = msg.content.toString();
        return JSON.parse(data);
        // return typeof data === 'string' ? JSON.parse(data) : JSON.parse(data.toString('utf8'))
    }

    async close() {
        // You can write here other clean-ups
        await this.connection.close();
    }
};

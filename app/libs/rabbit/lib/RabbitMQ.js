module.exports = class RabbitMQ {
    exchange = '';
    exchangeOptions;
    queueName = '';

    constructor(connection, exchangeType) {
        this.connection = connection;
        this.exchangeType = exchangeType;
    }

    _channel = null;

    get channel() {
        if (!this._channel)
            throw new Error(
                'Channel is possibly not created yet. Please create it first.'
            );
        return this._channel;
    }

    async createChannel() {
        this._channel = await this.connection.createChannel();
        return this;
    }

    async assertExchange(callback) {
        const assertExchange = await this.channel.assertExchange(
            this.exchange,
            this.exchangeType || 'fanout',
            this.exchangeOptions
        );

        this.exchange = assertExchange.exchange;
        if (callback) callback();
        return this;
    }

    async assertQueue(queueName, queueOptions) {
        const assertQueue = await this.channel.assertQueue(
            queueName,
            queueOptions
        );
        this.queueName = assertQueue.queue;
        return this;
    }
};

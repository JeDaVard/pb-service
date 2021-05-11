const { connect } = require('amqplib');

class MqClient {
    _connection;

    get connection() {
        if (!this._connection) {
            throw new Error(
                '[ERROR] There is no connection. You need to connect first.'
            );
        }
        return this._connection;
    }

    async connect(url, callback) {
        if (this._connection) await this._connection.close();

        this._connection = await connect(url);

        if (callback) callback();

        return this._connection;
    }
}

module.exports = new MqClient();

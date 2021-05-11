const { createServer } = require('http');
const app = require('./app');
const db = require('./app/service/models');
const config = require('./app/config/env');
const { mqClient } = require('./app/libs/rabbit');
const { RequestUrlsInfoSubscriber } = require('./app/events');

const server = createServer(app);

db.sequelize.authenticate().then(() => {
    console.log('DB is connected');
    db.sequelize.sync({ force: true });
});

const requestUrlsInfoLogger = () => {
    console.log('[pb] received new rabbitmq request');
};

// NOT A BEST PRACTICE, JUST A FAST PRACTICE))
mqClient.connect(config.rabbitApi).then(() => {
    (async function () {
        const requestUrlsInfoSubscriber = await (
            await (
                await (
                    await (
                        await new RequestUrlsInfoSubscriber(
                            mqClient.connection
                        ).createChannel()
                    ).assertExchange()
                ).prefetch()
            ).assertQueue()
        ).bindQueue();

        await requestUrlsInfoSubscriber.listen(requestUrlsInfoLogger);
        console.log('[pb] Subscribers are ready...');
    })();

    console.log('[pb] Rabbit is connected...');
    server.listen(config.port, () => {
        console.log(`[pb] Server is up on ${config.port}`);
    });
});

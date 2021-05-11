const { hunterio } = require('../../libs/hunterio');
const { UrlsInfoResultsPublisher } = require('../../events');
const { mqClient } = require('../../libs/rabbit');
const db = require('../models');
const BadRequestError = require('../../libs/errors/bad-request-error');

// INSTEAD IF THIS U CAN HAVE A BETTER LOGGER
const urlsInfoResultsLogger = () => {
    console.log('[pb] Data sent back to rabbitmq (to pb-api service)');
};

exports.onUrlsInfo = async (data) => {
    if (!Array.isArray(data.urls)) return null;

    const promises = [];

    const uniqueUrls = Array.of(...new Set(data.urls));

    const existingDomains = await db.sequelize.models.Domain.findAll({
        raw: true,
        where: {
            domainName: uniqueUrls,
        },
    });

    const filteredUrls = uniqueUrls.filter(
        (url) => !existingDomains.find((domain) => domain.domainName === url)
    );

    filteredUrls.forEach((url) => {
        promises.push(hunterio.getInfo(url));
    });

    const res = await Promise.all(promises);

    const urlsList = await db.sequelize.models.UrlsList.create({
        name: data.name,
    });
    const domains = await db.sequelize.models.Domain.bulkCreate(
        filteredUrls.map((url) => ({ domainName: url }))
    );
    await db.sequelize.models.ListDomain.bulkCreate([
        ...domains.map((domain) => ({
            urlsListId: urlsList.id,
            domainId: domain.id,
        })),
        ...existingDomains.map((domain) => ({
            urlsListId: urlsList.id,
            domainId: domain.id,
        })),
    ]);

    const domainContactsCreation = [];

    res.forEach((res, resIdx) => {
        domainContactsCreation.push(
            db.sequelize.models.DomainContact.bulkCreate(
                res.data.emails.map((email) => ({
                    email: email.value,
                    confidence: email.confidence,
                    firstName: email.first_name,
                    lastName: email.last_name,
                    domainId: domains[resIdx].id,
                }))
            )
        );
    });

    await Promise.all(domainContactsCreation);

    const urlsInfoResultsPublisher = await (
        await new UrlsInfoResultsPublisher(mqClient.connection).createChannel()
    ).assertExchange();
    urlsInfoResultsPublisher.publish(
        {
            message:
                'Done! Check the DB, or notify the user that the result is ready!',
        },
        urlsInfoResultsLogger
    );

    return null;
};

exports.getUrlsLists = async () => db.sequelize.models.UrlsList.findAll();

exports.getDomainsByList = async (id) => {
    if (typeof parseInt(id) !== 'number')
        throw new BadRequestError('Id must be numeric!');

    return db.sequelize.models.UrlsList.findOne({
        where: { id: Number(id) },
        include: {
            model: db.sequelize.models.Domain,
            as: 'domains',
            include: {
                model: db.sequelize.models.DomainContact,
                as: 'domainContacts',
            },
        },
    });
};

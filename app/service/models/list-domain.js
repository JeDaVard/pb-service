module.exports = (client, Sequelize) => {
    const listDomain = client.define(
        'ListDomain',
        {},
        {
            timestamps: false,
            tableName: 'list_domain',
            underscored: true,
        }
    );

    return listDomain;
};

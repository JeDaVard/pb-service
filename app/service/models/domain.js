module.exports = (client, Sequelize) => {
    const domain = client.define(
        'Domain',
        {
            id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            domainName: {
                allowNull: false,
                type: Sequelize.STRING(255),
            },
        },
        {
            timestamps: false,
            tableName: 'domain',
            underscored: true,
        }
    );

    // Associations
    domain.associate = ({ UrlsList, DomainContact, ListDomain }) => {
        domain.belongsToMany(UrlsList, {
            foreignKey: {
                name: 'domainId',
                allowNull: false,
            },
            through: {
                model: ListDomain,
            },
            as: 'urlLists',
        });
        domain.hasMany(DomainContact, {
            foreignKey: {
                name: 'domainId',
                allowNull: false,
            },
            as: 'domainContacts',
            onDelete: 'CASCADE',
        });
    };

    return domain;
};

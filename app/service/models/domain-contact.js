module.exports = (client, Sequelize) => {
    const domainContact = client.define(
        'DomainContact',
        {
            id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            firstName: {
                allowNull: true,
                type: Sequelize.STRING(45),
            },
            lastName: {
                allowNull: true,
                type: Sequelize.STRING(45),
            },
            email: {
                allowNull: true,
                type: Sequelize.STRING(100),
            },
            confidence: {
                allowNull: true,
                type: Sequelize.INTEGER(2),
            },
        },
        {
            timestamps: false,
            tableName: 'domain_contact',
            underscored: true,
        }
    );

    // Associations
    domainContact.associate = ({ Domain }) => {
        domainContact.belongsTo(Domain, {
            foreignKey: {
                name: 'domainId',
                allowNull: false,
            },
            targetKey: 'id',
            as: 'domain',
        });
    };

    return domainContact;
};

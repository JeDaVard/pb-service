module.exports = (client, Sequelize) => {
    const urlsList = client.define(
        'UrlsList',
        {
            id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                allowNull: true,
                type: Sequelize.STRING(45),
            },
        },
        {
            timestamps: true,
            tableName: 'urls_list',
            underscored: true,
        }
    );

    // Associations
    urlsList.associate = ({ Domain, ListDomain }) => {
        urlsList.belongsToMany(Domain, {
            foreignKey: {
                name: 'urlsListId',
                allowNull: false,
            },
            through: {
                model: ListDomain,
            },
            as: 'domains',
        });
    };

    return urlsList;
};

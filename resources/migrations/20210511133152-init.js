'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.sequelize.query(
            'CREATE TABLE IF NOT EXISTS `domain` (`id` INTEGER NOT NULL auto_increment , `domain_name` VARCHAR(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;'
        );
        await queryInterface.sequelize.query(
            'CREATE TABLE IF NOT EXISTS `domain_contact` (`id` INTEGER NOT NULL auto_increment , `first_name` VARCHAR(45), `last_name` VARCHAR(45), `email` VARCHAR(100), `confidence` INTEGER(2), `domain_id` INTEGER NOT NULL, PRIMARY KEY (`id`), FOREIGN KEY (`domain_id`) REFERENCES `domain` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE) ENGINE=InnoDB;'
        );
        await queryInterface.sequelize.query(
            'CREATE TABLE IF NOT EXISTS `urls_list` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(45), `created_at` DATETIME NOT NULL, `updated_at` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;'
        );
        await queryInterface.sequelize.query(
            'CREATE TABLE IF NOT EXISTS `list_domain` (`domain_id` INTEGER NOT NULL , `urls_list_id` INTEGER NOT NULL , PRIMARY KEY (`domain_id`, `urls_list_id`), FOREIGN KEY (`domain_id`) REFERENCES `domain` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`urls_list_id`) REFERENCES `urls_list` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;'
        );
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.sequelize.query(
            'DROP TABLE IF EXISTS `list_domain`;'
        );
        await queryInterface.sequelize.query(
            'DROP TABLE IF EXISTS `urls_list`;'
        );
        await queryInterface.sequelize.query(
            'DROP TABLE IF EXISTS `domain_contact`;'
        );
        await queryInterface.sequelize.query('DROP TABLE IF EXISTS `domain`;');
    },
};

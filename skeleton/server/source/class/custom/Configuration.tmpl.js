/**
 * This class offers the specific properties and features to configure the ${Name} application.
 *
 * @require(guaraiba.Passport)
 */
qx.Class.define('${Namespace}.Configuration', {
    type: 'singleton',
    extend: polymita.AbstractConfiguration,

    members: {

        // override
        init: function () {
            var path = guaraiba.path,
                databasePath = path.join(guaraiba.appDataPath, 'app.db'),

                appKnexSetting = {
                    client: 'sqlite3',
                    connection: databasePath,
                    useNullAsDefault: true,
                    debug: true,
                    migrations: {
                        tableName: 'default_migrations'
                    }
                },

                polymitaKnexSetting = {
                    client: 'sqlite3',
                    connection: databasePath,
                    useNullAsDefault: true,
                    debug: true
                },

                jdbcSettings = {driver: 'org.sqlite.JDBC', connectString: 'jdbc:sqlite:' + databasePath};

            // Register database schemas.
            this.registerDBSchema(new polymita.schemas.Default(polymitaKnexSetting, jdbcSettings));
            this.registerDBSchema(new ${Namespace}.schemas.Default(appKnexSetting, jdbcSettings));
        }

    }

});
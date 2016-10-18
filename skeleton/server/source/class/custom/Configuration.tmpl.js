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
            var resourceManager = qx.util.ResourceManager.getInstance(),
                databasePath = resourceManager.toUri('data/app.db'),

                jdbcSettings = { driver: 'org.sqlite.JDBC', connectString: 'jdbc:sqlite:' + databasePath },

                appKnexSetting = {
                    client: 'sqlite3',
                    connection: databasePath,
                    useNullAsDefault: true,
                    debug: true
                },

                polymitaKnexSetting = {
                    client: 'sqlite3',
                    connection: databasePath,
                    useNullAsDefault: true,
                    debug: true
                }

            // Register database schemas.
            this.registerDBSchema(new polymita.schemas.Default(polymitaKnexSetting, jdbcSettings));
            this.registerDBSchema(new ${Namespace}.schemas.Default(appKnexSetting, jdbcSettings));
        }

    }

});
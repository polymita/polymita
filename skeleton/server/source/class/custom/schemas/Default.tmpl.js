/**
 * This class offers the specific properties and features to configure the data base schemas of ${Name} application.
 */
qx.Class.define('${Namespace}.schemas.Default', {
    extend: guaraiba.orm.DBSchema,

    /**
     * Constructor
     *
     * @param knexSetting {Object}
     * @param jdbcSettings {Object?}
     */
    construct: function (knexSetting, jdbcSettings) {
        this.setModelPrefixName('${Namespace}.models');
        this.base(arguments, 'default', knexSetting, jdbcSettings);
    },


    members: {
        /**
         * Initialize data base schemas of ${Namespace} application.
         *
         * This method is called immediately after construction of the schemes and
         * in this must be registered each of the model classes.
         */
        init: function () {
            // BEGIN REGISTER RECORD CLASS. DON'T REMOVE OR CHANGE THIS COMMENTARY.
            // END REGISTER RECORD CLASS. DON'T REMOVE OR CHANGE THIS COMMENTARY.
        }

    }
});
/**
 * Singleton instance class for define any route for application action.
 */
qx.Class.define("${Namespace}.Router", {
    type: 'singleton',
    extend: polymita.Router,

    members: {
        /**
         * Initialise the routes for any action.
         */
        init: function () {
            this.base(arguments);

            // BEGIN REGISTER RESOURCE ROUTERS. DON'T REMOVE OR CHANGE THIS COMMENTARY.
            // END REGISTER RESOURCE ROUTERS. DON'T REMOVE OR CHANGE THIS COMMENTARY.
        }
    }
});
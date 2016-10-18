/* ************************************************************************

 Copyright:

 License:

 Authors:

 ************************************************************************ */

/**
 * This is the main application class of your custom application "${Name}" gui.
 *
 * @asset(*)
 *
 * @ignore(environment)
 * @ignore(process)
 */
qx.Class.define("${Namespace}.Application", {
    extend: polymita.Application,

    members: {
        // override
        registerComponents: function () {
            this.base(arguments);

            this.registerActionComponents([
                // TODO: Set here the classes of new actions components.
            ]);

            this.registerFormFieldComponents([
                // TODO: Set here the classes of new form field components.
            ]);

            this.registerFormFieldValidators([
                // TODO: Set here the classes of new form validator components.
            ]);

            this.registerManagementComponents([
                // TODO: Set here the classes of new management components.
            ]);
        }
    }
});

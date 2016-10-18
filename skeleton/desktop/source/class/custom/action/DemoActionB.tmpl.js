/**
 * @asset(qx/icon/$${qx.icontheme}/16/categories/development.png)
 */
qx.Class.define("${Namespace}.action.DemoActionB", {
    extend: polymita.action.AbstractAction,

    construct: function (management) {
        this.base(arguments, management, 'reload', 'icon/16/categories/development.png');
    },

    members: {
        onExecute: function () {
            alert('onExecute: DemoActionB');
        }
    }
});

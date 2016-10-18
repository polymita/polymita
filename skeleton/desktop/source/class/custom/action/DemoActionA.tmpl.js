/**
 * @asset(qx/icon/$${qx.icontheme}/16/categories/engineering.png)
 */
qx.Class.define("${Namespace}.action.DemoActionA", {
    extend: polymita.action.AbstractActionWithSelectedItem,

    construct: function (management) {
        this.base(arguments, management, 'DEMO_ACTION_A', '${Namespace}/icon/16/categories/engineering.png');
    },

    members: {
        // override
        onExecute: function () {
            var currentModule = this.getSelectedItem();

            console.log('onExecute:', currentModule);
            alert('onExecute: DemoActionA');
        },

        // override
        onSelectionChange: function (data) {
            this.base(arguments, data);

            console.log('onSelectionChange:', data);
        }

    }
});

qx.Class.define("${Namespace}.request.DemoActionA", {
    extend: polymita.request.AbstractResource,

    construct: function (sync) {
        // connect with DemoActionA rest service in ${Namespace}-server.
        this.base(arguments, 'DemoActionA', sync);
    }
});

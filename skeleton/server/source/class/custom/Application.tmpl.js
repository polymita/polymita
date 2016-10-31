/**
 * This is the main application class of your custom application "${Name}" server.
 *
 * @asset(*)
 *
 * @ignore(environment)
 * @ignore(process)
 */
qx.Class.define("${Namespace}.Application", {
    extend: guaraiba.Application,

    /**
     * Constructor
     */
    construct: function () {
        this.base(arguments, ${Namespace}.Configuration.getInstance(), ${Namespace}.Router.getInstance());
    },

    members: {
        // override
        getServerStaticPaths: function () {
            var path = require('path'),
                paths = this.base(arguments);

            if (this.itIsProduction()) {
                qx.lang.Array.append(paths, [
                    { urlPattern: '/gui', resourcePath: guaraiba.appRoot },
                    { urlPattern: '/gui/qx', resourcePath: path.join(guaraiba.appRoot, 'resource/qx') },
                    { urlPattern: '/gui/polymita', resourcePath: path.join(guaraiba.appRoot, 'resource/polymita') },
                ]);
            } else {
                var module = require('module'),
                    guiSourcePath = path.resolve(path.join(guaraiba.appRoot, '../../${Name}-gui/source')),
                    polymitaPath = path.dirname(module._resolveFilename('polymita')),
                    polymitaGuiResourcePath = path.join(polymitaPath, 'node_modules/polymita-gui/source/resource/polymita'),
                    qxSourcePath = path.join(polymitaPath, 'node_modules/qooxdoo-sdk/framework/source/resource/qx');

                qx.lang.Array.append(paths, [
                    { urlPattern: '/gui', resourcePath: guiSourcePath },
                    { urlPattern: '/gui/qx', resourcePath: qxSourcePath },
                    { urlPattern: '/gui/polymita', resourcePath: polymitaGuiResourcePath },
                    { urlPattern: '/source', resourcePath: guiSourcePath }
                ]);
            }

            return paths;
        }
    }
});


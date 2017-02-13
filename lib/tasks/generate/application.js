var colors = require('../../colors');

desc(
    'Generate new Polymita application.\n' +
    '\t\t\t  Interactive mode:\n'.info +
    '\t\t\t   polymita new-app\n'.choose +
    '\t\t\t  Quiet mode:\n'.info +
    '\t\t\t   polymita new-app name=myproyect\n'.choose +
    '\t\t\t   polymita new-app n=myproyect\n'.choose
);

task('new-app', { async: true }, function () {
    var promptly = require('promptly'),
        path = require('path'),
        module = require('module'),
        spawn = require('child_process').spawn,

        outPath = process.cwd(),
        appName = process.env.name || process.env.n,
        appNamespace = String(appName).replace(/[_-]/, '.'),
        polymitaPath = path.dirname(module._resolveFilename('polymita')),
        skeletonPath = path.join(polymitaPath, 'skeleton'),
        qooxdooAppCreator = path.join(polymitaPath, 'node_modules', 'qooxdoo-sdk', 'create-application.py'),

        validateAppName = function (value) {
            if (!value.match(/^[a-z]+[a-z0-9]*([_-][a-z]+[a-z0-9]*)*$/i)) {
                throw Error('Invalid application name.'.error);
            }

            return value;
        },

        error = function (msg) {
            msg = msg.replace(/WARN/, '').trim();

            if (msg) {
                if (msg.match(/Error:/)) {
                    console.error(msg);
                    process.abort();
                } else {
                    console.warn(msg);
                }
            }
        },

        actions = {
            start: function () {
                console.log('------------------------------------------------');
                console.log('Creating new polymita application.'.info);
                actions.stepAppName();
            },

            stepAppName: function () {
                if (appName && validateAppName(appName)) {
                    actions.stepGenerateServerApp();
                } else {
                    console.log('------------------------------------------------');
                    var msg = 'Application name without spaces:'.prompt;
                    promptly.prompt(msg, { default: 'myapp', validator: validateAppName }, function (err, value) {
                        appName = value;
                        appNamespace = appName.replace(/[_-]/, '.');
                        actions.stepGenerateServerApp();
                    });
                }
            },

            stepGenerateServerApp: function () {
                console.log('--------------GENERATING SERVER APP-----------------');
                var childProcess = spawn('python', [qooxdooAppCreator,
                    '-t', 'server',
                    '-p', skeletonPath,
                    '--cache=' + polymitaPath,
                    '-n', appName,
                    '-s', appNamespace,
                    '-o', outPath
                ]);

                childProcess.stdout.addListener("data", function (data) {
                    console.info(data.toString().trim());
                });

                childProcess.stderr.addListener("data", function (data) {
                    error(data.toString());
                });

                childProcess.addListener('exit', function (code) {
                    actions.stepGenerateGUIApp();
                });
            },

            stepGenerateGUIApp: function () {
                console.log('--------------GENERATING GUI APP--------------------');
                var childProcess = spawn('python', [qooxdooAppCreator,
                    '-t', 'desktop',
                    '-p', skeletonPath,
                    '--cache=' + polymitaPath,
                    '-n', appName + '-gui',
                    '-s', appNamespace,
                    '-o', outPath
                ]);

                childProcess.stdout.addListener("data", function (data) {
                    var msg = data.toString().trim();

                    console.info(msg);

                    // Replace qooxdoo-sdk path in generate.py file.
                    if (msg.match(/generate\.py/)) {
                        var fs = require('fs'),
                            genPath = path.join(outPath, appName, 'generate.py'),
                            code = fs.readFileSync(genPath).toString();

                        code = code.replace(/QOOXDOO_PATH = '[^']+'/, "QOOXDOO_PATH = './node_modules/qooxdoo-sdk'");
                        fs.writeFileSync(genPath, code);
                    }
                });

                childProcess.stderr.addListener("data", function (data) {
                    error(data.toString());
                });

                childProcess.addListener('exit', function (code) {
                    actions.stepCopyResources();
                });
            },

            stepCopyResources: function () {
                console.log('--------------COPING RESOURCES----------------------');
                var fse = require('fs-extra'),
                    polymitaServerPath = path.join(outPath, appName, 'node_modules', 'polymita-server'),
                    sourcePath = path.join(polymitaServerPath, 'source', 'resource', 'polymita', 'data'),
                    appNamespacePath = appNamespace.replace(/\./g, path.sep),
                    targetPath = path.join(outPath, appName, 'source', 'resource', appNamespacePath, 'data');

                fse.copy(sourcePath, targetPath, function (err) {
                    if (err) console.error(err.toString());

                    complete();
                });
            }
        };

    actions.start();
});
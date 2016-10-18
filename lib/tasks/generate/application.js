var colors = require('../../colors');

desc(
    'Generate new Polymita application.\n' +
    '\t\t\t  Interactive mode:\n'.info +
    '\t\t\t   polymita new-app\n'.choose +
    '\t\t\t  Quiet mode:\n'.info +
    '\t\t\t   polymita new-app name=myproyect\n'.choose +
    '\t\t\t   polymita new-app n=myproyect\n'.choose
);

task('new-app', {async: true}, function () {
    var promptly = require('promptly'),
        path = require('path'),
        module = require('module'),
        spawn = require('child_process').spawn,

        outPath = process.cwd(),
        appName = process.env.name || process.env.n,
        appNamespace = String(appName).replace(/[_-]/, '.'),
        polymitaPath = path.dirname(module._resolveFilename('polymita')),
        skeletonPath = path.join(polymitaPath, 'skeleton'),
        qooxdooAppCreator = path.join(polymitaPath, 'bower_components/qooxdoo-5.0.1-sdk/create-application.py'),

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
                    promptly.prompt(msg, {default: 'myapp', validator: validateAppName}, function (err, value) {
                        appName = value;
                        appNamespace = appName.replace(/[_-]/, '.');
                        actions.stepGenerateServerApp();
                    });
                }
            },

            stepGenerateServerApp: function () {
                console.log('------------------------------------------------');
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
                console.log('------------------------------------------------');
                var childProcess = spawn('python', [qooxdooAppCreator,
                    '-t', 'desktop',
                    '-p', skeletonPath,
                    '--cache=' + polymitaPath,
                    '-n', appName + '-gui',
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
                    actions.stepCopyResources();
                });
            },

            stepCopyResources: function () {
                console.log('------------------------------------------------');
                var fse = require('fs-extra'),
                    polymitaServerPath = path.join(polymitaPath, 'node_modules/polymita-server'),
                    sourcePath = path.join(polymitaServerPath, 'source/resource/data'),
                    targetPath = path.join(outPath, appName, '/source/resource/data');

                fse.copy(sourcePath, targetPath, function (err) {
                    if (err) console.error(err.toString());

                    complete();
                });
            }
        };

    actions.start();
});
var colors = require('colors'),
    fs = require('fs'),
    setup = function(module){
        require(module);

        var resource = qx.util.ResourceManager.getInstance();
        require(resource.toUri('guaraiba/tasks/Jakefile.js'));
    },
    needBuid = function(err){
        if (err) {
            console.log('');
            console.log('----------------------------------------------------------------------');
            console.error(('Error: ' + err.stack).error);
            log = 'error';
        } else {
            log = 'warn';
        }
        console[log]('----------------------------------------------------------------------'[log]);
        console[log]('* Please compile project by first time with ( python generate.py )'[log]);
        console[log]('* After this you can run more jake tasks.'[log]);
        console[log]('----------------------------------------------------------------------'[log]);
    };

colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    choose: 'blue',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});

if (fs.existsSync('./${Namespace}-server.js')) {
    /**************** PRODUCTION PHASE. ****************/
    setup('./${Namespace}-server');
} else if (fs.existsSync('./source/script/${Namespace}-server.js')) {
    /**************** DEVELOPMENT PHASE. ***************/
    try {
        setup('./source/script/${Namespace}-server');
    } catch (ex) {
        needBuid(ex);
    }
} else {
    /******** DEVELOPMENT PHASE BAD NEED BUILD. ********/
    needBuid();
}

/**************** OTHER COMMON TASKS. ***************/
task('default', {async: true}, function () {
    jake.run('--tasks');
    console.log('');
    complete();
});
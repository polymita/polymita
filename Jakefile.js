require('./lib/tasks/generate/application');

/**************** OTHER COMMON TASKS. ***************/
task('default', { async: true }, function () {
    jake.run('--tasks');
    console.log('----------------------------------------------------------------------\n');
    complete();
});
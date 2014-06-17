var path = require('path');
var mach = require('mach');
var app = mach.stack();

app.use(mach.gzip);
app.use(mach.logger);
app.use(mach.contentType, 'text/html');
app.use(mach.params);

// serve our 1-page app
app.use(mach.file, {root: path.join(__dirname, 'public'), index: ['index.html']})
app.use(mach.file, {root: path.join(__dirname, 'bower_components')})

// /user(s) API
var R = require('./server/resource');
app.get('/measurements', R.Measurements.list);
// app.get(/\/user\/(.+?)\/checks/, R.Checks.list);
// app.get(/\/user\/(.+?)\/check_count/, R.Users.check_count);

mach.serve(app, 4000);

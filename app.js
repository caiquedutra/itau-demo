const app = require('./backend/server');

var ip = process.env.IP || '0.0.0.0';
var port = process.env.PORT || 8080;

app.listen(port, ip, function () {
    console.log('running at ' + ip + ':' + port);
});
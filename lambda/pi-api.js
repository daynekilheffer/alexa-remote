const http = require('http');

const post = (target, data, cb) => {
    http.request(
        {
            hostname: process.env.PI_API_DOMAIN,
            port: process.env.PI_API_PORT || 3000,
            path: target,
            method: 'POST'
        },
        (res) => {
            cb();
        }
    )
    .on('error', (err) => {
        cb(err);
    })
    .end();
}

const deviceMappings = {
    'sound bar': 'soundbar',
    'TV': 'fios',
}

module.exports = {
    power: (device, cb) => {
        var deviceCodename = deviceMappings[device] || device;
        post(`/remotes/${deviceCodename}/power`, null, cb);
    }
}

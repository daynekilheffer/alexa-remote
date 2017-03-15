const piApi = require('./pi-api');

module.exports = function (direction) {
    return function () {
        direction = direction.toLowerCase();
        piApi.volume(direction, (err, result) => {
            if (err) {
                console.log(err, result);
                this.emit(':ask', 'I had a problem changing the volume', '');
            }
            this.emit(':ask', 'volume ' + direction, '');
        });
    }
}

module.exports = {
    volume: {
        up: {
            remote: 'soundbar',
            keyCode: 'KEY_VOLUMEUP',
            iterations: 2,
        },
        down: {
            remote: 'soundbar',
            keyCode: 'KEY_VOLUMEDOWN',
            iterations: 2,
        }
    },
    source: {
        tv: {
            remote: 'fios',
            keyCode: 'KEY_FN',
        },
        soundbar: {
            keyCode: 'KEY_FN',
            iterations: 2,
        }
    }
};
